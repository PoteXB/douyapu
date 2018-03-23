<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/7/21
 * Time: 18:09
 */
namespace app\coupon\controller;

use app\index\controller\Base;
use think\Cookie;
use think\Db;

class Cate extends Base
{
    public function index()
    {
        header("Access-Control-Allow-Origin: *");
        $info = [];
        /** 淘宝分类ID */
        $catId = input('get.cid');
        //$userId = Cookie::get('TTT');
        if(request() -> isGet() && is_numeric($catId))
        {
            /** 判断分类是否有效 */
            $map = [];
            $map['status'] = 1;
            $map['cat_id'] = $catId;
            $catRow = Db::name('category') -> where($map) -> find();

            /** 分类有效且处于开启状态 */
            if($catRow)
            {
                /** 排序方式 */
                $sort = input('get.sort') ? input('get.sort') : 1;
                /** 请求条数[默认8条] */
//                $pageSize = input('get.pageSize');
                $pageSize = 48;
                /** 页码 */
                $page = input('get.page');
                /** 分页大小与请求的页码必须为数字且大于0 */
                if(is_numeric($pageSize) && $pageSize > 0 && is_numeric($page) && $page > 0 && is_numeric($sort) && $sort > 0)
                {
                    /** 判断缓存是否存有当前分类对应的数据 */
                    $results = $this -> redis -> hGet('cate:' . $catId ,'page:'. $sort .':' . $page);
                    $count = $this -> redis -> get('cateCount:' . $catId);

                    if($results && $count > 0)
                    {
                        $info['status'] = 1;
                        $info['results'] = json_decode($results , true);
                        $info['count'] = $count;
                    }
                    else
                    {
                        /** 分类约束 、 默认排序[根据过期时间]*/

                        /**
                         * @desc : 修改 | 之前的操作是以单一的分类ID作为查询条件，现在修改为多个分类ID作为查询条件
                              1：需要获取顶级分类对应的二级分类，存放到一个二维数组
                         *    2：二级分类作为查询优惠券whereIn的约束条件
                         */
                        //$map = [];
                        /** 获取分类对应的所以子分类,从当前级别开始，不包含父级 */
                        $catList = Db::name('category') -> where('status' , 1) -> select();
                        $allCateList = cateList($catList , $catId);
                        $allCateList[] = intval($catId);
                        //$map['cat_id'] = ['in' , $allCateList];
                        $maps = [];
                        $maps['amount'] = ['>' , 0];
                        $maps['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
                        $count = Db::name('coupon') -> where($maps) -> whereIn('catId' , $allCateList) -> order(sortType($sort)) -> count();

                        if($count > 0)
                        {
                            /** 最大页码控制 */
                            $countPage = ceil($count / $pageSize);
                            if($page > $countPage && 1 != $page)
                            {
                                $page = $countPage;
                            }
                            $results = Db::name('coupon') -> where($maps) -> whereIn('catId' , $allCateList) -> order(sortType($sort)) -> limit(($page - 1) * $pageSize , $pageSize) -> select();
                            /** 存放登陆用户收藏的商品ID */
//                            $tempCollect = [];
//                            if(!empty($userId) && is_numeric($userId))
//                            {
//                                /** 判断用户ID是否有效 */
//                                $row = Db::name('userinfo') -> where('id' , $userId) -> find();
//                                if($row)
//                                {
//                                    $collections = Db::name('collection') -> where('user_id' , $userId) -> select();
//                                    foreach ($collections as $v)
//                                    {
//                                        $tempCollect[] = $v['item_id'];
//                                    }
//                                }
//                            }

//                            /** 添加一个字段 用于判断是否被收藏 */
                            $temp = [];
                            foreach ($results as $v)
                            {
//                                $item = json_decode($v['item'] , true);
//                                if(in_array($v['itemId'] , $tempCollect))
//                                {
//                                    $item['collect'] = 1;
//                                }
//                                else
//                                {
//                                    $item['collect'] = 0;
//                                }
//                                $temp[] = json_encode($item);
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
//                                $temp[] = $v['item'];
                            }
                            $info['status'] = 1;
                            $info['results'] = $temp;
                            $info['count'] = $count;

                            /**
                             * @desc : 数据存入redis
                             */

                            /** 设置时效：单位秒*/
                            $expireTime = 5 * 3600;
 
                            /**
                             *  @desc : 分类数据列表存入缓存KEY组合方式
                             *  缓存类型：HSET
                             *  key1  => cate:分类ID
                             *  key2  => page:排序标识:页码
                             *  value => JSON[list]
                             */
                            /** 写入当前结果集到HSET */
                            $this -> redis -> hSet('cate:' . $catId ,'page:'. $sort .':' . $page , json_encode($temp));
                            $this -> redis -> expire('cate:' . $catId , $expireTime);


                            /**
                             *  @desc : 分类对应总条数写入缓存
                             *  缓存类型：SET
                             *  key => cateCount:分类ID
                             *  value => 分类对应的页码总数
                             */
                            $this -> redis -> setNx('cateCount:' . $catId , $count);
                            $this -> redis -> expire('cateCount:' . $catId , $expireTime);
                        }
                        else
                        {
                            $info['status'] = 0;
                            $info['messgae'] = '没有查询到对应分类的优惠券';
                        }
                    }
                }
                else
                {
                    $info['status'] = 0;
                    $info['messgae'] = '参数错误';
                }
            }
            else
            {
                $info['status'] = 0;
                $info['messgae'] = '分类不存在或者已经关闭';
            }
        }
        else
        {
            $info['status'] = 0;
            $info['messgae'] = '请求错误';
        }
        echo json_encode($info);
    }
}