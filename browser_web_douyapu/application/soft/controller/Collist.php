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
 * @desc 豆芽铺插件 | 展示当前用户的收藏优惠券信息
 * @type POST
 * Class Hots
 * @package app\api\controller
 */

class Collist extends Common
{
     public function index()
     {
         header("Access-Control-Allow-Origin: * ");
         if(request() -> isPost())
         {
             /** 主表对应的用户ID  */
             $userId = trim(input('post.userId'));
             /** 请求条数[默认10条] */
             $pageSize = input('post.pageSize') ? input('post.pageSize') : 10;
             /** 搜索记录limit起始位置 */
             $beign = input('post.ownNo') ? input('post.ownNo') : 0;
             
             /** 判断当前登陆用户是否有效 */
             $row = Db::name('userinfo') -> where('id' , $userId) -> find();
             if(!empty($row) && is_numeric($pageSize) && $pageSize > 0 && is_numeric($beign) && $beign >= 0)
             {
                 $key = $this -> collectKey . ':' . $userId;
                 /** 当前用户所有收藏的优惠券列表 */
                 $list = $this -> redis -> sMembers($key);
                 $count = count($list);
                 if($count > 0)
                 {
                     $temp = [];
                     foreach ($list as $v)
                     {
                         $row = json_decode($this -> redis -> hGet($this -> storageHash ,  $v ), true);
                         if(!empty($row))
                         {
                             $temp[] = $row;
                         }
                     }
                     if(count($temp) > 0)
                     {
                         $info['status'] = 1;
                         $info['results'] = $temp;
                     }
                     else
                     {
                         $info['status'] = 0;
                         $info['results'] = [];
                     }
                 }
                 else
                 {
                     $info['status'] = 0;
                     $info['results'] = [];
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