<?php

namespace app\user\controller;

use app\index\controller\Base;
use think\Cookie;
use think\Loader;

class Login extends Base
{
    public function index()
    {
        if(!$this -> isLogin())
        {
            /** 当前请求的SDK类型 */
            $type = ucfirst(input('get.type'));
            /** 获取实例请求SDK对应的 CODE */
            Loader::import('.BaseSdk');
            $sdk = \BaseSdk::getInstance($type);
            $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : \think\Config::get('DEFAULT_JUMP_REFERER');
            Cookie::set('REF', $referer);
//            \think\Cookie::set('referer' , $_SERVER['HTTP_REFERER']);
            $this -> redirect($sdk -> getAuthorizeURL());
        }
        else
        {
            $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : \think\Config::get('DEFAULT_JUMP_REFERER');
            $this -> success('用户已经登陆了' , $referer);
        }
    }
    public function http($url, $params, $method = 'GET'){
        $opts = array(
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false
        );

        /* 根据请求类型设置特定参数 */
        switch(strtoupper($method)){
            case 'GET':
                $opts[CURLOPT_URL] = $url . '?' . http_build_query($params);
                break;
            case 'POST':
                //判断是否传输文件
                $params = http_build_query($params);
                $opts[CURLOPT_URL] = $url;
                $opts[CURLOPT_POST] = 1;
                $opts[CURLOPT_POSTFIELDS] = $params;
                break;
            default:
                throw new Exception('不支持的请求方式！');
        }
        /* 初始化并执行curl请求 */
        $ch = curl_init();
        curl_setopt_array($ch, $opts);
        $data  = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);
        if($error) throw new Exception('请求发生错误：' . $error);
        return  $data;
    }
 
}