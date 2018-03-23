<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/7/24
 * Time: 9:40
 */

namespace app\soft\controller;
use think\Controller;
use think\Db;

/**
 * @desc 豆芽铺插件 | 展示分类列表
 * @type POST | GET
 * Class Hots
 * @package app\api\controller
 */

class Category extends Controller
{
     public function index()
     {
         header("Access-Control-Allow-Origin: *");
         $level = input('post.level') ? input('post.level') : 1;
         $info = [];
         /** 展示的分类级别，顶级从1开始|向上包含 */
         $allowLevel = [1, 2, 3, 4, 5, 6];

         if(isset($level) && is_numeric($level) && in_array($level , $allowLevel))
         {
             $map = [];
             $map['status'] = 1;
             $map['level'] = ['<=' , $level];
             $map['p_id'] = array('exp','is not null');
             $results = \think\Db::name('category') -> where($map) -> order(' sort DESC ') -> select();
             if(count($results) > 0)
             {
                 $catList = combineTree($results);
                 $info['status'] = 1;
                 $info['results'] = $catList;
             }
             else
             {
                 $info['status'] = 0;
                 $info['message'] = '没有对应的分类记录';
             }
         }
         else
         {
             $info['status'] = 0;
             $info['message'] = '参数错误';
         }
         echo json_encode($info);
     }


}