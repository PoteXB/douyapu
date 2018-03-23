<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/11/27
 * Time: 14:28
 */

namespace app\demo\controller;

use think\Controller;

class Demo extends Controller
{
    public function index()
    {
        return $this -> fetch('index');
    }

    public function tpl()
    {
        return $this -> fetch('index');
    }
}