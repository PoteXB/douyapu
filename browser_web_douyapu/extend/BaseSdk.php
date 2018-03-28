<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/7/12
 * Time: 10:06
 */

/**
 * @desc 所有第三方SDK的公共class,通过当前get获取的类型获取类型SDK对应的一个实例
 *
 * Class BaseSdk
 */
abstract Class BaseSdk
{
    /**
     * 申请第三方应用的app_key
     * @var string
     */
    protected $appKey = '';

    /**
     * 申请第三方应用时的app_secret
     * @var string
     */
    protected $appSecret = '';

    /**
     * 权临时票据,作为获取token的凭证 ， 默认 code
     * @var string
     */
    protected $responseType = 'code';

    /**
     * 请求的类型,默认 authorization_code
     * @var string
     */
    protected $grantType = 'authorization_code';

    /**
     * 回调页面,可以在配置文件进行不同SDK的配置
     * @var string
     */
    protected $callBack = '';

    /**
     * 授权后返回的TOKEN信息
     * @var string
     */
    protected $token = '';

    /**
     * 第三方登陆用户接口返回的uid
     * @var string
     */
    protected $uId = '';

    /**
     * 请求的SDK类型
     * @var string
     */
    protected $sdkType = '';



    /**
     * @desc 获取某个SDK的一个实例
     * @param $type SINA|WEIXIN|....
     * @return mixed
     * @throws Exception
     */
    public static function getInstance($type)
    {
        /** 错误回调地址*/
        $defaultJump = 'https://www.douyapu.com';
        $className = ucfirst($type) . 'Sdk';
        /** 文件路径 */
        $path = './extend/sdk/'.$className . '.php';
        if(file_exists($path))
        {
            require_once $path;
            if(class_exists($className))
            {
                /** 当前登陆类型 */
                \think\Cookie::set('TTT' , encrypt(strtolower($type) , 'E' , config('SDK_SECRET')) , 7200);
                return new $className($type);
            }
            else
            {
                header('Location: ' . $defaultJump);exit();
            }
        }
        else
        {
            header('Location: ' . $defaultJump);exit();
        }

    }

    /**
     * 合并默认参数和额外参数
     * @param array $params  默认参数
     * @param array $param 额外参数
     * @return array:
     */
    protected function param($params, $param){
        if(is_string($param))
            parse_str($param, $param);
        return array_merge($params, $param);
    }

    /**
     * 发送HTTP请求方法
     * @param $url string $url    请求URL
     * @param $params array  $params 请求参数
     * @param string $method string $method 请求方法GET/POST
     * @param array $header array  $data   响应数据
     * @param bool $multi
     * @return mixed
     * @throws Exception
     */
    protected function http($url, $params, $method = 'GET'){
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

    /** 通过应用的app_key、appSecret发起授权请求,请求之后会得到 code [GET] */
    abstract public function getAuthorizeURL( $state = NULL, $display = NULL );

    /** 获取TOKEN */
    abstract public function getAccessToken( $type = 'code', $keys );

    /** 回收TOKEN授权 */
    abstract public function revokeToken();

    /** 获取用户信息 */
    abstract public function getUserInfo();

}