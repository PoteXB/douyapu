<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/11/22
 * Time: 11:26
 */

class TaoSdk extends BaseSdk
{
    /**
     * 获取requestCode的api接口[授权]
     * @var string
     */
    protected $getRequestCodeURL = 'https://oauth.taobao.com/authorize';

    /**
     * 获取access_token的api接口
     * @var string
     */
    protected $getAccessTokenURL = 'https://oauth.taobao.com/token';

    /**
     * API根路径
     * @var string
     */
    protected $apiBase = 'https://api.weibo.com/2/';

    /**
     * 申请scope权限所需参数
     * @var string
     */
    protected $scope = '';

    /**
     * 回收token权限
     * @var string
     */
    public $revokeTokenURL = '';

    /**
     * 获取用户信息URL[API]
     * @var string
     */
    protected $userInfoURL = '';

    /** 初始化相关的配置信息 */
    public function __construct($type)
    {
        /** 加载配置信息 */
        $config = config('THINK_SDK_' . strtoupper($type));
        if(isset($config['APP_KEY']) && isset($config['APP_SECRET']))
        {
            $this -> appKey = $config['APP_KEY'];
            $this -> appSecret = $config['APP_SECRET'];
            /** SDK类型 */
            $this -> sdkType = strtoupper($type);
            $this -> callBack = $config['CALLBACK'];
        }
        else
        {
            //throw new Exception('请配置相关的SDK信息');
            header('Location: ' . 'http://' . $_SERVER['HTTP_HOST'] . '/index/Error/errorInfo');exit();
        }
    }

    public function getAuthorizeURL( $state = NULL, $display = NULL )
    {
        $params = array();
        $params['client_id'] = $this -> appKey;
        $params['redirect_uri'] = $this -> callBack;
        $params['response_type'] = $this -> responseType;
//        $params['state'] = $state;
//        $params['display'] = $display;
//        $params['forcelogin'] = 'true';
        return $this -> getRequestCodeURL . "?" . http_build_query($params);
    }

    public function getAccessToken( $type = 'code', $keys )
    {
        $taoConfig = config('THINK_SDK_TAO');
        $params = array();
        $params['client_id'] = $this -> appKey;
        $params['client_secret'] = $this -> appSecret;
        $params['grant_type'] = 'authorization_code';
        $params['response_type'] = 'code';
        $params['code'] = $keys['code'];
        $params['redirect_uri'] = $taoConfig['CALLBACK'];
        $response = $this -> http($this -> getAccessTokenURL , $params , 'POST');
        $token = json_decode($response, true);
        if ( is_array($token) && isset($token['access_token']) && isset($token['taobao_user_id']) )
        {
            $this-> token = $token['access_token'];
            $this-> uId = $token['taobao_user_id'];
        }
        return $token;
    }

    public function getUserInfo()
    {
        $userInfo = [];
        $userInfo['idstr'] = $this-> uId;
        $userInfo['screen_name'] = '';
        $userInfo['profile_image_url'] = '';
        return $userInfo;
    }

    public function revokeToken()
    {

    }
}