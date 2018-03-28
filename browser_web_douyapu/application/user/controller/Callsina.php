<?php

namespace app\user\controller;

use app\index\controller\Base;
use think\Cookie;
use think\Loader;

class Callsina extends Base
{
    public function index()
    {
        /** 当用户点击取消第三方登录按钮重定向 */
        if(isset($_GET['error_code']) && !empty($_GET['error_code']))
        {
            $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
            $this -> redirect($referer);
        }

        if($this -> isLogin())
        {
            $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
            $this->success('您已经登陆了', $referer);
        }
        else
        {
            $sinaConfig = config('THINK_SDK_SINA');

            /** 通过code获取对应的TOKEN */
            $code = input('get.code');
            if(isset($code) && !empty($code))
            {
                /** 加载SDK */
                Loader::import('.BaseSdk');
                $sina = \BaseSdk::getInstance('Sina');

                /** 获取对应的token信息 */
                $keys = [];
                $keys['code'] = $code;
                $keys['redirect_uri'] = $sinaConfig['CALLBACK'];
                $token = $sina -> getAccessToken('code' , $keys);
                $this -> clearLoginCookie();

                /** 判断token是否有效 */
                if ( is_array($token) && !isset($token['error']) )
                {
                    /** 获取用户[登陆用户]对应的信息 */
                    $userInfo = $sina -> getUserInfo();
                    /** 没有查询到当前登陆的用户信息 */
                    if(!$userInfo)
                    {
                        $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                        $this -> error('查询不到当前登陆信息' , $referer);
                    }
                    else
                    {
                        /** 数据写入COOKIE */
                        $this -> addSdkCookie($userInfo , $token);
                        /** 默认退出时回收新浪token */
                        Cookie::set('loginUrl' , encrypt($sina -> revokeTokenURL , 'E' , config('SDK_SECRET')) , 'expire=3600&domain=douyapu.com');
                        
                        /** 数据入库 */
                        $flag = $this -> dataStorage($userInfo , 'sina');
                        $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                        if($flag)
                        {
                            $this -> redirect($referer);
//                            $this -> success('登陆成功' , $referer);
                        }
                        else
                        {
                            /** 清除掉之前加入的COOKIE */
                            $this -> clearLoginCookie();
                            $this -> error('登陆失败' , $referer);
                        }
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