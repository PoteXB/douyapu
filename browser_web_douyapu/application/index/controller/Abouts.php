<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/6/20
 * Time: 14:19
 */

namespace app\index\controller;
use think\Request;
use think\Controller;

class Abouts extends Base
{
    public function index(Request $request)
    {
        // $this -> redirect('/index/Error/errorInfo');
        return $this->fetch('index');
    }
}