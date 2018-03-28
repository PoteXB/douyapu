<?php

namespace app\user\controller;

use app\index\controller\Base;
use think\Loader;
use think\Cookie;
class Callweixin extends Base
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
            /** 微信相关的配置 */
            $weiConfig = config('THINK_SDK_WEIXIN');

            /** 通过code获取对应的TOKEN */
            $code = input('get.code');
            if(isset($code) && !empty($code))
            {
                /** 加载SDK */
                Loader::import('.BaseSdk');
                $weixin = \BaseSdk::getInstance('Weixin');

                /** 获取token */
                $keys = [];
                $keys['code'] = $code;
                $token = $weixin -> getAccessToken('code' , $keys);

                /** 判断token是否有效 */
                if(isset($token['errcode']) && !empty($token['errcode']))
                {
                    $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                    $this -> clearLoginCookie();
                    $this -> error('登陆失效' , $referer);
                }
                else /** TOKEN有效 */
                {
                    $this -> clearLoginCookie();
                    /** 获取用户[登陆用户]对应的信息 */
                    $userInfo = $weixin -> getUserInfo();
                    /** 没有查询到当前登陆用户的信息 */
                    if(!$userInfo)
                    {
                        $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                        $this -> clearLoginCookie();
                        $this -> error('没有查询到当前登陆用户的信息' , $referer);
                    }
                    else
                    {
                        /** 数据写入COOKIE */
                        $this -> addSdkCookie($userInfo , $token); 
                        /** 数据入库 */
                        $flag = $this -> dataStorage($userInfo , 'weixin');
                        $referer = Cookie::get('REF') ? Cookie::get('REF') : \think\Config::get('DEFAULT_JUMP_REFERER');
                        if($flag)
                        {
//                            $this -> success('登陆成功' , $referer);
                            $this -> redirect($referer);
                        }
                        else
                        {
                            /** 清除掉之前加入的COOKIE */
                            $this -> clearLoginCookie();
                            $this -> error('登陆失败' , $referer);
                        }
                    }
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