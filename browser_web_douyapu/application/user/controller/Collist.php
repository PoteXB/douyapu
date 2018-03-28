<?php

namespace app\user\controller;

use app\index\controller\Base;
use think\Cookie;
use think\Loader;

class Collist extends Base
{
    public function index()
    {
        return $this -> fetch();
    } 
}