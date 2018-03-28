<?php


class SinaSdk extends BaseSdk
{
    /**
     * 获取requestCode的api接口[授权]
     * @var string
     */
    protected $getRequestCodeURL = 'https://api.weibo.com/oauth2/authorize';

    /**
     * 获取access_token的api接口
     * @var string
     */
    protected $getAccessTokenURL = 'https://api.weibo.com/oauth2/access_token';

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
    public $revokeTokenURL = 'https://api.weibo.com/oauth2/revokeoauth2';

    /**
     * 获取用户信息URL[API]
     * @var string
     */
    protected $userInfoURL = 'https://api.weibo.com/2/users/show.json';

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
    
    /**
     * @desc 获取授权url,点击之后返回一个code[GET]
     * @param null $state 用于保持请求和回调的状态
     * @param null $display
     * @return string
     */
    public function getAuthorizeURL( $state = NULL, $display = NULL )
    {
        $params = array();
        $params['client_id'] = $this -> appKey;
        $params['redirect_uri'] = $this -> callBack;
        $params['response_type'] = $this -> responseType;
        $params['state'] = $state;
        $params['display'] = $display;
        $params['forcelogin'] = 'true';
        return $this -> getRequestCodeURL . "?" . http_build_query($params);
    }

    /**
     * @desc 获取token|刷新token|获取账号密码
     *
     * @param string $type
     * @param $keys 请求url追加的参数信息
     * @return mixed
     * @throws Exception
     * @throws Exception
     */
    public function getAccessToken( $type = 'code', $keys )
    {
        $params = array();
        $params['client_id'] = $this -> appKey;
        $params['client_secret'] = $this -> appSecret;
        if ( $type === 'token' ) {
            $params['grant_type'] = 'refresh_token';
            $params['refresh_token'] = $keys['refresh_token'];
        } elseif ( $type === 'code' ) {
            $params['grant_type'] = 'authorization_code';
            $params['code'] = $keys['code'];
            $params['redirect_uri'] = $keys['redirect_uri'];
        } elseif ( $type === 'password' ) {
            $params['grant_type'] = 'password';
            $params['username'] = $keys['username'];
            $params['password'] = $keys['password'];
        } else {
            header('Location: ' . 'http://' . $_SERVER['HTTP_HOST'] . '/index/Error/errorInfo');exit();
        }

        $response = $this -> http($this -> getAccessTokenURL . '?' , $params , 'POST');
        $token = json_decode($response, true);
        if ( is_array($token) && !isset($token['error']) )
        {
            $this-> token = $token['access_token'];
            $this-> uId = $token['uid'];
        }
        else
        {
            //点击取消按钮时跳转到404页面 
            header('Location: ' . 'http://' . $_SERVER['HTTP_HOST']);exit();
        }
        return $token;
    }

    /**
     * @desc 回收token权限
     * @return true | false : 权限[token]是否回收成功
     * @throws Exception
     */
    public function revokeToken()
    {
        $url = $this -> revokeTokenURL . '?access_token=' . $this -> token;
        $result = $this -> http($url , [] ,'POST');
        $flag = json_decode($result , true);
        if(isset($flag['result']) && $flag['result'])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * 获取当前登陆用户个人信息
     * @return mixed
     * @throws Exception
     */
    public function getUserInfo()
    {
        $parm['access_token'] = $this -> token;
        $parm['uid'] = $this -> uId;
        $userInfo = $this -> http($this -> userInfoURL , $parm , 'GET');
        $results = json_decode($userInfo , true);
        if(isset($results['error']) && !empty($results['error']))
        {
            return false;
        }
        else
        {
            return $results;
        } 
    }
}

