<?php

namespace app\api\controller;
use think\Controller;
use think\Db;

/**
 * @desc 豆芽铺插件搜索接口 | 豆芽铺PC首页搜索
 * @type POST
 *       key => searhVal [string] 搜索关键字
 *       key => page [int]  当前搜索的页码[默认为1，超过最大页码按最大页码对应的记录返回]
 * Class Search
 * @package app\api\controller
 */

class Search extends Common
{
    public function index()
    {
        /** 搜索关键字 */
        $searchVal = trim(input('post.searchVal'));
        /** 请求条数 */
        $perPage = 8;
        /** 请求页码 */
        $nowPage = input('post.page') ? input('post.page') : 1;
        /** 排序方式 */
        $sort = input('post.sort') ? input('post.sort') : 1;
        if(request() -> isPost())
        {
            if(isset($searchVal) && !empty($searchVal) && isDigital($nowPage) && isDigital($perPage))
            { 
                $searchVal = escapeStr($searchVal);

                $searchPage = $nowPage;
                /** redis关键字已经存在 */
                $keyId = $this -> redis -> get('keyword:' . $searchVal);
                /** 关键字对应的记录总数 */
                $totals = $this -> redis -> get('keyResultsCount:' . $keyId);

                /** 判断当前页码是否有效 */
                $countPage = ceil($totals / $perPage);
                if($searchPage > $countPage && 1 != $nowPage)
                {
                    $searchPage = $countPage;
                }
                /** 获取JSON格式的结果集合 */
                $results = $this -> redis -> hGet('keylist:' . $keyId, 'page:'. $sort .':' . $searchPage);

                /** 需要2个条件同时满足才能判断当前关键字对应的页码记录条数是否存在 */
                if(!empty($keyId) && !empty($results))
                {
                    $this -> redis -> incr('active:' . date('Y-m-d') . ':' . $searchVal);
                    $info['count'] = $totals;
                    $info['status'] = 1;
                    $info['results'] = json_decode($results , true);
                    $info['perPage'] = $perPage;
                }
                else
                {
                    $map = [];
                    $map['title'] = ['like' , '%'. $searchVal .'%'];
                    $map['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
                    $map['amount'] = ['>' , 0];
                    $count = Db::name('coupon') -> where($map) -> count(); 
                    if($count > 0)
                    {
                        $countPage = ceil($count / $perPage);
                        if($nowPage > $countPage && 1 != $nowPage)
                        {
                            $nowPage = $countPage;
                        }
                        $results = Db::name('coupon') -> field('id , itemId , item') -> where($map) -> order(sortType($sort)) -> limit(($nowPage - 1) * $perPage , $perPage) -> select();
        
                        $temp = [];
                        foreach ($results as $v)
                        {
                            $row = json_decode($v['item'] , true);
                            if(isset($row['item']) && !empty($row['item']))
                            {
                                $tempData = $row['item'];
                                $tempData['effectiveEndTime'] = $row['effectiveEndTime'];
                                $tempData['amount'] = $row['amount'];
                                $tempData['effectiveStartTime'] = $row['effectiveStartTime'];
                                $tempData['shopName'] = $row['shopName'];
                                $tempData['shopLogo'] = $row['shopLogo'];
                                $temp[] = json_encode($tempData);
                            }
                            else
                            {
                                $temp[] = $v['item'];
                            }
                        }
                        $info['status'] = 1;
                        $info['count'] = $count;
                        $info['results'] = $temp;
                        $info['perPage'] = $perPage;

                        if($count > 0)
                        {
                            // 数据写入redis
                            /** 设置时效：单位秒*/
                            $expireTime = 5 * 3600;
                            /** 搜索单条记录添加至redis */
//                            foreach ($results as $v)
//                            {
////                                $this -> redis -> hSet('list',$v['itemId'],json_encode($v));
//                                $this -> redis -> set('list:' . $v['itemId'] , ($v['item']));
//                                $this -> redis -> expire('list:' . $v['itemId'] , $expireTime);
//                            }
                            /** 设置搜索记录[单条 ]*/
//                            $this -> redis -> expire('list' , $expireTime);

                            if(!$this -> redis -> get('keyword:' . $searchVal))
                            {
                                /** 索引+1 */
                                $this -> redis -> incr('keyItem');
                            }

                            /** 往redis旧的key里面追加新的记录 */
                            if(!empty($keyId))
                            {
                                /** 写入当前结果集到HSET */
                                $this -> redis -> hSet('keylist:' . $keyId ,'page:'. $sort .':' . $nowPage , json_encode($temp));
                                $this -> redis -> expire('keylist:' . $keyId , $expireTime);
                                /** 写入结果集和对应的总记录条数 */
                                $this -> redis -> setNx('keyResultsCount:' . $keyId , $count);
                                $this -> redis -> expire('keyResultsCount:' . $keyId , $expireTime);
                            }
                            else
                            {
                                /** 用于判断关键字在redis里面对应的唯一索引 */
                                $this -> redis -> setNx('keyword:' . $searchVal , $this -> redis -> get('keyItem'));

                                /** 写入当前结果集到HSET */
                                $this -> redis -> hSet('keylist:' . $this -> redis -> get('keyItem') ,'page:'. $sort .':' . $nowPage , json_encode($temp));
                                $this -> redis -> expire('keylist:' . $this -> redis -> get('keyItem') , $expireTime);

                                /** 写入结果集和对应的总记录条数 */
                                $this -> redis -> setNx('keyResultsCount:' . $this -> redis -> get('keyItem') , $count);
                                $this -> redis -> expire('keyResultsCount:' . $this -> redis -> get('keyItem') , $expireTime);
                            }
                            $this -> redis -> incr('active:' . date('Y-m-d') . ':' . $searchVal);
                        }
                    }
                    else
                    {
                        $info['status'] = 0;
                        $info['message'] = '没有搜索到对应的数据';
                    }
                }
            }
            else
            {
                $info['status'] = 0;
                $info['message'] = '参数错误';
            }
        }
        else
        {
            $info['status'] = 0;
            $info['message'] = '操作失败';
        }
        return json_encode($info);
    }
}