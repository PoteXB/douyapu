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
 * @desc 豆芽铺插件 | 普通优惠券推荐 [按月销量最高返回数据，根据页码返回对应的页码记录，每次返回15条]
 * @type POST
 * Class Hots
 * @package app\api\controller
 */

class Coupontpl extends Controller
{
     public function index()
     {
          return $this -> fetch('index');
     }	
}