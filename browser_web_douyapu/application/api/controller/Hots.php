<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/7/24
 * Time: 9:40
 */

namespace app\api\controller;
use think\Controller;
use think\Db;

/**
 * @desc 豆芽铺插件 | 普通优惠券推荐 [按月销量最高返回数据，根据页码返回对应的页码记录，每次返回15条]
 * @type POST
 * Class Hots
 * @package app\api\controller
 */

class Hots extends Common
{
     public function index()
     {
         $info = [];
         $nowPage = input('post.page') ? input('post.page') : 1;
         $perPage = 15;

         if(request() -> isPost())
         {
             if(isset($nowPage) && !empty($nowPage) && isDigital($nowPage) && isDigital($perPage))
             {
                 /** redis上次请求保存的数据 */
                 $redisPerpage = $this -> redis -> get('discount:perPage');
                 $redisResults = $this -> redis -> get('discount:results:' . $nowPage);
                 $redisCount = $this -> redis -> get('discount:count:' . $nowPage);

                 /** redis存在数据 */
                 if(!empty($redisResults))
                 {
                     $info['perPage'] = $redisPerpage;
                     $info['results'] = json_decode($redisResults , true);
                     $info['status'] = 1;
                     $info['count'] = $redisCount;
                 }
                 else
                 {
                     $map['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
                     $map['amount'] = ['>' , 0];
                     $count = Db::name('coupon') -> where($map) -> count();
                     $countPage = ceil($count / $perPage);
                     if($nowPage > $countPage && 1 != $nowPage)
                     {
                         $nowPage =  $countPage;
                     }
                     $results = Db::name('coupon') -> where($map) -> order('biz30Day DESC') -> limit(($nowPage - 1) * $perPage .' , '. $perPage) -> select();
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
//                         $temp[] = $v['item'];
                     }
                     $info['perPage'] = $perPage;
                     $info['results'] = $temp;
                     $info['count'] = $count;
                     $info['status'] = 1;
                     if(count($temp) > 0)
                     {
                         /** 设置时效：单位秒*/
                         $expireTime = 5 * 3600;
                         /** 数据写入redis */
                         $this -> redis -> set('discount:perPage' , $perPage);
                         $this -> redis -> set('discount:results:' . $nowPage , json_encode($temp));
                         $this -> redis -> set('discount:count:' . $nowPage ,  $count );


                         $this -> redis -> expire('discount:perPage' , $expireTime);
                         $this -> redis -> expire('discount:results:' . $nowPage , $expireTime);
                         $this -> redis -> expire('discount:count:' . $nowPage , $expireTime);
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
             $info['message'] = '请求错误';
         }
         echo json_encode($info);
     }
}