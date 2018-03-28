<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/7/24
 * Time: 9:40
 */

namespace app\statistics\controller;
use think\Controller;
use think\Db;

/**
 * @desc 豆芽铺插件 | 展示当前用户的收藏优惠券信息
 * @type POST
 * Class Hots
 * @package app\api\controller
 */

class Iframe extends Controller
{
     public function index()
     {
          return $this -> fetch('index');
     }
}