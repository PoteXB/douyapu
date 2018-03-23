<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/7/24
 * Time: 9:40
 */

namespace app\soft\controller;
use app\api\controller\Common;
use think\Controller;
use think\Db;

/**
 * @desc 豆芽铺客户端优惠券数据接口
 * Class Couponlists
 * @package app\soft\controller
 */

class Couponlists extends Common
{
     
     public function index()
     {
         header("Access-Control-Allow-Origin: *");
         /** 搜索关键字 */
         $searchVal = trim(input('post.searchVal'));
         /** 排序方式 */
         $sort = input('post.sort') ? input('post.sort') : 1;
         /** 请求条数[默认10条] */
         $pageSize = 10;
         /** 搜索记录limit起始位置 */
         $beign = input('post.ownNo') ? input('post.ownNo') : 0;
         /** 当前接口的请求时间 */
         $reqTime = input('post.time');
         /** 分类ID */
         $catId = input('post.catId');
         if(request() -> isPost())
         {
             if(is_numeric($pageSize) && $pageSize > 0 && is_numeric($beign) && $beign >= 0)
             {
                 /** 限制最大请求的条数 */
                 $pageSize = $pageSize > 50 ? 50 : $pageSize;

                 /** 此时是刷新操作 , 根据请求接口的时间与优惠券入库的时间作比较，判断是否是最新的数据 */
                 if(isset($reqTime) && is_numeric($reqTime))
                 {
                     $flushMap = [];
                     /** 优惠券约束条件： 1：有效时间大于当前请求的时间。 2：入库优惠券的时间高于用户第一步打开浏览器的时间 */
                     $flushMap['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
                     $flushMap['unix_timestamp(createTime)'] = ['EGT' , $reqTime];
                     $flushMap['amount'] = ['>' , 0];
                     $count = count(Db::name('coupon') -> where($flushMap) -> limit($beign , $pageSize) -> select());

                     if($count > 0)
                     {
                         /** 总记录条数 | 保证记录条数不重复 */
                         $results = Db::name('coupon') -> where($flushMap) -> limit($beign , $pageSize) -> order(sortType($sort)) -> select();
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
//                             $temp[] = $v['item'];
                         }

                         $info['status'] = 1;
                         $info['count'] = $count;
                         $info['results'] = $temp;
                         $info['pageSize'] = $pageSize;
                     }
                     else
                     {
                         $info['status'] = 0;
                         $info['message'] = '没有查询到对应的记录';
                     }
                 }
                 else /** 默认的数据展示[包括搜索]*/
                 {
                     /** redis redis组合结构
                      *  组合方式： limit分页起始位置:排序方式[:搜索关键字][:分类ID]
                      */
                     $redisPrefix = $beign . ':' . $sort;

                     /**
                      *  如果有搜索关键字作为筛选条件，需要把所有关键字对应的记录总条数返回给客户端，所以不需要进行limit分页
                      *  因此需要用2个变量分别保存当前请求的页码与分页大小,一个针对正常(不带关键字搜索也就是不需要返回总记录条数)流程，一个针对需要关键字筛选。
                      */
                     $searchBegin = $beign;
                     $searchPerPage = $pageSize;
                     $map = [];
                     /** 1:模糊匹配*/
                     if(isset($searchVal) && !empty($searchVal))
                     {
                         $map['title'] = ['like' , '%'. escapeStr($searchVal) .'%'];
                         /** 搜索需要返回记录总条数，所以不需要分页，分批次返回对应的记录条数 */
                         $pageSize = 0;
                         $beign = 0;
                         /** redis前缀添加一个关键字*/
                         $redisPrefix .= ':' . $searchVal;
                     }

                     /** 2:分类筛选 */
                     if(isset($catId) && is_numeric($catId))
                     {
                         $catList = Db::name('category') -> where('status' , 1) -> select();
                         /** 分类是否有效 */
                         $catMap = [];
                         $catMap['status'] = 1;
                         $catMap['cat_id'] = $catId; 
                         $row = Db::name('category') -> where($catMap) -> find();
                         /** 如果分类有效，对当前分类以及子元素分类进行筛选 */
                         if($row)
                         {
                             $pageSize = 0;
                             $beign = 0;
                             /** redis前缀添加一个分类 */
                             $redisPrefix .= ':' . $catId;
                             /** 基于当前分类ID获取这个ID对应的所有子节点ID */
                             $allCateList = cateList($catList , $catId);
                             /** 包含当前分类ID进去 */
                             $allCateList[] = intval($catId);
                             $map['catId'] = ['in' , $allCateList];
                         }
                     }

                     /** 查看redis里面是否存在对应的结果集 */
                     $redResults = $this -> redis -> hGet('soft' , $redisPrefix);
                     $redCount = $this -> redis -> get('softCount:' . $redisPrefix);
                     if($redResults && $redCount)
                     {
                         $info['status'] = 1;
                         $info['count'] = intval($redCount);
                         $info['results'] = json_decode($redResults , true);
                         $info['pageSize'] = $searchPerPage;
                     }
                     else
                     {
                         $map['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
                         $map['amount'] = ['>' , 0];
                         $count = count(Db::name('coupon') -> where($map) -> limit(0 , 5000) -> select());
//                         put(Db::name('coupon') -> getLastSql());
                         if($count > 0)
                         {
                             /** 总记录条数 */
                             $results = Db::name('coupon') -> where($map) -> limit($searchBegin , $searchPerPage) -> order(sortType($sort)) -> select(); 
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
                             $info['pageSize'] = $searchPerPage;

                             /**
                              * @desc : 数据存入redis
                              */

                             /** 设置时效：单位秒*/
                             $expireTime = 5 * 3600;
                             $this -> redis -> hSet('soft' , $redisPrefix , json_encode($temp));
                             $this -> redis -> expire('soft' , $expireTime);

                             /**
                              *  @desc : 分类对应总条数写入缓存
                              *  缓存类型：SET
                              *  key => softCount:redis组合结构
                              *  value => 分类对应的页码总数
                              */
                             $this -> redis -> setNx('softCount:' . $redisPrefix , $count);
                             $this -> redis -> expire('softCount:' . $redisPrefix , $expireTime);
                         }
                         else
                         {
                             $info['status'] = 0;
                             $info['message'] = '没有查询到对应的记录';
                         }
                     }
                 }
             }
             else /** 记录无效 */
             {
                 $info['status'] = 0;
                 $info['message'] = '操作失败';
             }
         }
         else
         {
             $info['status'] = 0;
             $info['message'] = '请求失败';
         } 
         return json_encode($info);
     }

}