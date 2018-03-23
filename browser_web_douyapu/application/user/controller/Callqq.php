<?php

namespace app\user\controller;

use app\index\controller\Base;
use think\Cookie;
use think\Loader;

class Callqq extends Base
{
    public function index()
    {
        if($this -> isLogin())
        {
            $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
            $this -> success('您已经登陆了' , $referer);
        }
        else
        {
            $sinaConfig = config('THINK_SDK_QQ');
            $code = input('get.code');
            if(isset($code) && !empty($code))
            {
                /** 加载SDK */
                Loader::import('.BaseSdk');
                $qq = \BaseSdk::getInstance('Qq');

                $keys = [];
                $keys['code'] = $code;
                $keys['redirect_uri'] = $sinaConfig['CALLBACK'];
                $token = $qq -> getAccessToken('code' , $keys);

                /** TOKEN有效 */
                if(isset($token['access_token']) && !empty($token['access_token']))
                { 
                    /** 获取用户[登陆用户]对应的信息 */
                    $userInfo = $qq -> getUserInfo();
                    if(isset($userInfo['ret']) && $userInfo['ret'] == 0)
                    {
                        /** 数据写入COOKIE */
                        $this -> addSdkCookie($userInfo , $token);
                        /** 数据入库 */
                        $flag = $this -> dataStorage($userInfo , 'qq');
                        if($flag)
                        {
                            $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
//                            $this -> success('登陆成功' , $referer);
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
                        $this -> error('登陆失效' , $referer);
                    }
                }
                else
                {
                    $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                    $this -> clearLoginCookie();
                    $this -> error('登陆失效' , $referer);
                }
            }
            else
            {
                $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                $this -> clearLoginCookie();
                $this -> error('操作失败' , $referer);
            }
        }
    }
}