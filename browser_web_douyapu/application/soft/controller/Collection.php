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
 * @desc 豆芽铺插件 | 收藏优惠券
 * @type POST
 * Class Hots
 * @package app\api\controller
 */

class Collection extends Common
{
     public function index()
     {
         header("Access-Control-Allow-Origin: *");
         if(request() -> isPost())
         {
             /** 主表对应的用户ID  */
             $userId = trim(input('post.userId'));
             /** 优惠券ID */
             $itemId = trim(input('post.itemId'));
             /** 取消收藏 */
             $cancel = trim(input('post.cancel')) ? trim(input('post.cancel')) : 0;
             if(isset($userId) && !empty($userId) && isset($itemId) && !empty($itemId))
             {
                 $key = $this -> collectKey;
                 /** 判断当前登陆用户是否有效 */
                 $row = Db::name('userinfo') -> where('id' , $userId) -> find();
                 if($row)
                 {
                     /** 判断当前用户是否已经收藏了该优惠券 */
                     $isColl = $this -> redis -> sContains($key . ':' . $userId , $itemId);

                     /** 取消收藏*/
                     if($cancel == 1)
                     {
                         /** 已经收藏过 */
                         if($isColl)
                         {
                             $flag = $this -> redis -> sRem($key . ':' . $userId , $itemId);
                             if($flag)
                             {
                                 $info['status'] = 1;
                                 $info['message'] = '取消收藏成功';
                             }
                             else
                             {
                                 $info['status'] = 1;
                                 $info['message'] = '取消收藏失败';
                             }
                         }
                         else
                         {
                             $info['status'] = 0;
                             $info['message'] = '用户没有收藏改优惠券';
                         }
                     }
                     else  /** 添加收藏 */
                     {
                         /** 已经收藏过 */
                         if($isColl)
                         {
                             $info['status'] = 0;
                             $info['message'] = '用户已经收藏过该优惠券';
                         }
                         else
                         { 
                             $this -> redis -> sAdd($key . ':' . $userId , $itemId);
                             $info['status'] = 1;
                             $info['message'] = '收藏成功';
                         }
                     }
                 }
                 else
                 {
                     $info['status'] = 0;
                     $info['message'] = '用户不存在或者已经被冻结';
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