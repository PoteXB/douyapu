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
 * @desc 豆芽铺插件 | 判断优惠券是否存是否已经被收藏
 * @type POST
 * Class Hots
 * @package app\api\controller
 */

class Colltype extends Common
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

             if(!empty($userId) && is_numeric($userId) && !empty($itemId) && is_numeric($itemId))
             {
                 /** 判断用户是否有效 */
                 $row = Db::name('userinfo') -> where('id' , $userId) -> find();
                 if($row)
                 {
                     /** 判断优惠券是否被当前用户收藏 */
                     $flag = $this -> redis -> sContains($this -> collectKey . ':' . $userId , $itemId);
                     if($flag)
                     {
                         $info['status'] = 1;
                         $info['message'] = '当前用户已经收藏';
                     }
                     else
                     {
                         $info['status'] = 2;
                         $info['message'] = '当前用户没有收藏';
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