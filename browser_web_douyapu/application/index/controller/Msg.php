<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/6/19
 * Time: 14:25
 */

namespace app\index\controller;
use app\api\controller\Common; 
use think\Db;

class Msg extends Common
{
    public function index()
    {
        return $this -> fetch();
    }

}