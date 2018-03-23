<?php

namespace app\user\controller;

use app\index\controller\Base;
use think\Cookie;

class Logout extends Base
{
    public function index()
    {
        if ($this->isLogin())
        {
            Cookie::delete('REF');
            $this->clearLoginCookie();
            $this->error('退出成功', isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : \think\Config::get('DEFAULT_JUMP_REFERER'));
        }
        else
        {
            $this->error('非法操作', '/');
        }
    }
}