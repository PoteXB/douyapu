<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/8/23
 * Time: 15:59
 */
namespace app\plug\controller;

use app\index\controller\Api;
use think\Db;

class Search extends Api
{
    /** 允许访问的版本号 */
    private $allowVersion = ['1.0' , '1.1' , '1.2' , '1.3'];

    public function index()
    {
        /** 请求的版本号,默认从1.2版本开始 */
        $version = input('post.version') ? input('post.version') : '1.1';
        if(isset($version) && !empty($version) && in_array($version , $this -> allowVersion))
        {
            switch ($version)
            {
                case '1.0' :
                case '1.1' :
                case '1.2' :
                    return $this -> version1_2();
                case '1.3' :
                    return $this -> version1_3();
            }
        }
        else
        {
            //return $this -> version1_0();
            $info['status'] = 0;
            $info['message'] = '操作失败';
            return json_encode($info);
        }
    }

    /**
     * @return string
     */
    public function version1_2()
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

    public function version1_3()
    {
        /** 搜索关键字 */
        $searchVal = trim(input('post.searchVal'));
        /** 请求条数 */
        $perPage = 8;
        /** 已经返回的数据总条数 */
        $ownNum = input('post.ownCount') ? input('post.ownCount') : 0;
        /** 排序方式 */
        $sort = input('post.sort') ? input('post.sort') : 1;
        /** 平台分类 0 => 淘宝 || 1 => 天猫 , 没有传为所有平台 */
        $type = input('post.type');
        /** <1：redis默认前缀 | HSET 第一个KEY的存储格式　 */
        $redisPrefix = 'api:';
        if(request() -> isPost())
        { 
            if(is_numeric($ownNum) && $ownNum >= 0 && is_numeric($sort) && in_array($sort , $this -> sortType))
            {
                /** <2：redis前缀增加排序 */
                $redisPrefix .= $sort;

                /**
                 * 1：截止时间大于当前时间
                 * 2：优惠券优惠额度大于0
                 */
                $map = [];
                $map['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
                $map['amount'] = ['>' , 0];

                /** <3:redis前缀增加搜索关键字*/
                if(isset($searchVal) && !empty($searchVal))
                {
                    /** 关键字过滤 */
                    $searchVal = escapeStr($searchVal);
                    $redisPrefix .= ':' . $searchVal;
                    $map['title'] = ['like' , '%'. $searchVal .'%'];
                }
                
                /** 3: 优惠券来源平台约束 */
                if(isset($type) && is_numeric($type))
                {
                    $map['type'] = $type;
                    /** [后缀添加优惠券平台] */
                    $redisPrefix .= ':' . $type;
                }

                /** redis对应的数据格式 */
                $redisResults = $this -> redis -> hGet($redisPrefix , $ownNum);
                $redisResultsCount = $this -> redis -> get($redisPrefix . ':Count');

                if(!empty($redisResults) && $redisResultsCount > 0)
                {
                    $info['status'] = 1;
                    $info['count'] = intval($redisResultsCount);
                    $info['results'] = json_decode($redisResults , true);
                    $info['pageSize'] = 8;
                }
                else
                {
                    /** 总记录条数 */
                    $count = Db::name('coupon') -> where($map) -> order(sortType($sort)) -> count();
                    $results = Db::name('coupon') -> where($map) -> order(sortType($sort)) -> limit($ownNum , $perPage) -> select();
                    if(count($results) > 0)
                    {
                        $info['status'] = 1;
                        $info['count'] = $count;
                        $info['results'] = $results;
                        $info['perPage'] = $perPage;

                        /** 数据写入redis */

                        /** 失效时间 */
                        $expireTime = $this -> expLevel_2;

                        /**
                         * @desc 格式描述
                         * key1 : api:排序编号:搜索关键字[:优惠券平台]
                         * key2 : 优惠券LIMIT分页起始位置
                         */
                        $this -> redis -> hSet($redisPrefix , $ownNum , json_encode($results));
                        $this -> redis -> expire($redisPrefix , $expireTime);

                        $this -> redis -> set($redisPrefix . ':Count' , $count);
                        $this -> redis -> expire($redisPrefix . ':Count' , $expireTime);
                    }
                    else
                    {
                        $info['status'] = 0;
                        $info['message'] = '没有搜索到对应的记录条数';
                    }
                }
            }
            else
            {
                $info['status'] = 0;
                $info['message'] = '参数错误2';
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