<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/11/22
 * Time: 11:41
 */

namespace app\user\controller;


use app\index\controller\Base;
use think\Loader;
use think\Cookie;

class Calltao extends Base
{
    public function index()
    {
        if($this -> isLogin())
        {
            $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
            $this->success('您已经登陆了', $referer);
        }
        else
        {
            /** 登陆之前先清理掉上次登陆保存的COOKIE信息 */
            $this -> clearLoginCookie();
            /** 通过code获取对应的TOKEN */
            $code = input('get.code');
            if(isset($code) && !empty($code))
            {
                /** 加载SDK */
                Loader::import('.BaseSdk');
                $tao = \BaseSdk::getInstance('Tao');
                $keys = [];
                $keys['code'] = $code;
                $token = $tao -> getAccessToken('code' , $keys);
                if(isset($token['access_token']) && !empty($token['access_token']))
                {
                    $userInfo = $tao -> getUserInfo();
                    /** 数据入库 */
                    $flag = $this -> dataStorage($userInfo , 'tao'); 
                    if($flag)
                    {
                        $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                        $this -> redirect($referer);
                    }
                    else
                    {
                        /** 清除掉之前加入的COOKIE */
                        $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                        $this -> clearLoginCookie();
                        $this -> error('登陆失败' , $referer);
                    }
                }
                else
                {
                    $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                    $this -> clearLoginCookie();
                    $this -> error('登陆失败' , $referer);
                }
            }
            else
            {
                $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                $this -> clearLoginCookie();
                $this -> error('非法操作' , $referer);
            }
        }
    }
}