<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/11/30
 * Time: 18:50
 */

namespace app\coupon\controller;


use app\index\controller\Base;

class Chain extends Base
{
    public function index()
    {
        $url = input('request.urls'); 
        $this -> assign('link' , $url);
        return $this -> fetch('index');
    }
}