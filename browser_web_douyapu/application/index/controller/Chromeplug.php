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

class chromeplug extends Base
{
    public function index()
    {
        // $this -> redirect('/index/Error/errorInfo');
        return $this->fetch('index');
    }
}