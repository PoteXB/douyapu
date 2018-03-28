<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/6/19
 * Time: 14:23
 */

namespace app\index\controller;

use think\Controller;
use think\Cookie;
use think\Db;

class Base extends Controller
{
    /**
     * @desc 所有分类
     * @type hash
     */
    public $allCat = 'allCateHash';

    public function _initialize()
    {
        parent::_initialize();
        $this -> redis = new \Redis();
        $redisConf = config('redis');
        $this -> redis -> connect($redisConf['host'], $redisConf['port']);
        $this -> redis -> auth($redisConf['pass']);
        $this -> assign('hot', []);

        /** 展示顶级分类*/
        $catList = $this -> getAllCateList();
        $list = combineTree($catList);
        sort($list);
        $this -> assign('catList' , $list);

        /** 热门推荐 */
//        $results = $this -> redis -> get('pc-detail-hots');
//        $results = json_decode($results , true);
//        $this -> assign('hots' , $results);
        if(!$this -> isLogin())
        {
            $this -> clearLoginCookie();
        }
    }

    /**
     * @desc 获取所有分类
     * @return array
     */
    public function getAllCateList()
    {
        $temp = [];
        /** 模糊匹配存放分类的key集合 */
        $cacheKeys = $this -> redis -> keys($this -> allCat . '*');
        foreach ($cacheKeys as $v)
        {
            $temp[] = $this -> redis -> hGetAll($v);
        }
        if(empty($temp))
        {
            $map['status'] = 1;
            $map['p_id'] = ['exp' , 'is not null'];
            $temp = Db::name('category') -> where($map) -> order('sort asc') -> select();
            foreach ($temp as $v)
            {
                $this -> redis -> hSet($this -> allCat . ':' . $v['cat_id'] , 'id' , $v['cat_id'] );
                $this -> redis -> hSet($this -> allCat . ':' . $v['cat_id'] , 'p_id' , $v['p_id'] );
                $this -> redis -> hSet($this -> allCat . ':' . $v['cat_id'] , 'cat_id' , $v['cat_id'] );
                $this -> redis -> hSet($this -> allCat . ':' . $v['cat_id'] , 'name' , $v['name'] );
                $this -> redis -> hSet($this -> allCat . ':' . $v['cat_id'] , 'sort' , $v['sort'] );
                $this -> redis -> hSet($this -> allCat . ':' . $v['cat_id'] , 'status' , $v['status'] );
                $this -> redis -> hSet($this -> allCat . ':' . $v['cat_id'] , 'level' , $v['level'] );
            }
        }
        return $temp;
    }

    /**
     * @desc 判断当前用户是否已经登陆
     * @return bool
     */
    public function isLogin()
    {
        $loginKey = Cookie::get('loginKey');
        $loginUid = (Cookie::get('TTTTT'));
        $loginScreenName = Cookie::get('loginScreenName');
        $md5Str = md5($loginScreenName . ":" . $loginUid. ":" . config('SDK_SECRET'));
        if(isset($md5Str) && !empty($md5Str) && ($md5Str === $loginKey) )
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * @desc 去除当前登陆用户的cookie，回收当前登陆的授权
     */
    protected function clearLoginCookie()
    {
        /** 回收token*/
        $url = Cookie::get('loginUrl');
        $token = Cookie::get('loginToken');
        if(isset($url) && !empty($url) && isset($token) && !empty($token) )
        {
            $url = encrypt($url , 'D' , config('SDK_SECRET')) . '?access_token=' . encrypt($token , 'D' , config('SDK_SECRET'));
            $result = http($url , [] ,'POST');
        }
        /** 清除COOKIE */
//        Cookie::delete('loginKey');
//        Cookie::delete('loginToken');
//        Cookie::delete('loginUid');
//        Cookie::delete('loginScreenName');
//        Cookie::delete('loginUrl');
//        Cookie::delete('username');
//        Cookie::delete('TTTTT');
//        Cookie::delete('img_url');
          setcookie('loginScreenName' , '' , -1 , '/' , 'douyapu.com');
          setcookie('loginToken' , '' , -1 , '/' , 'douyapu.com');
          setcookie('loginUid' , '' , -1 , '/' , 'douyapu.com');
          setcookie('loginScreenName' , '' , -1 , '/' , 'douyapu.com');
          setcookie('loginUrl' , '' , -1 , '/' , 'douyapu.com');
          setcookie('username' , '' , -1 , '/' , 'douyapu.com');
          setcookie('TTTTT' , '' , -1 , '/' , 'douyapu.com');
          setcookie('img_url' , '' , -1 , '/' , 'douyapu.com');
          setcookie('loginKey' , '' , -1 , '/' , 'douyapu.com');

    }

    /**
     * @desc 添加用户信息到COOKIE
     * @param $userInfo
     * @param $token
     */
    protected function addSdkCookie($userInfo , $token)
    {

    }

    /**
     * 登陆用户信息入库
     * @param $userInfo 通过第三方接口调用返回的用户信息
     * @param $type 第三方登陆平台
     * @return bool|int|string 数据入库是否成功
     * @throws \think\Exception
     */
    protected function dataStorage($userInfo , $type)
    {
        $type = strtolower($type);
        /** 允许第三方登陆的平台列表 */
        $allowType = config('ALLOW_TYPE');
        /** 存在|允许进行入库操作 */
        if(in_array($type , $allowType))
        {
            $initType = $type;
            Cookie::set('img_url' , isset($userInfo['profile_image_url']) ? $userInfo['profile_image_url'] : '' , 'expire=3600&domain=douyapu.com');

            $type = 'login_' . $type;
            /** 用户数据入库 */
            $map = [];
            /** 判断新浪表是否存在对应的u_id */
            $map['u_id'] = trim($userInfo['idstr']);
            $result = \think\Db::name($type) -> where($map) -> find();

            /** 当前登陆用户的用户名，如果没有设置名称，则用UID取代 */
            $screenName = empty($userInfo['screen_name']) ? $userInfo['idstr'] : $userInfo['screen_name'];
            \think\Cookie::set('loginScreenName' , $screenName , 'expire=3600&domain=douyapu.com');

            /** 数据已经存在 */
            if($result)
            {
                /**  修改最后的登陆时间 \ 等陆次数+1 */
                $data = [];
                $data['login_count'] = ['exp' , 'login_count + 1'];
                $data['last_login'] = time();
                $flag = \think\Db::name($type) -> where($map) -> update($data);
                if($flag)
                {
                    /** 获取当前登陆用户字表的主键 */
                    $userId = \think\Db::name($type) -> where('u_id' , $userInfo['idstr']) -> value('id');
                    $userName = \think\Db::name('userinfo') -> where('user_id' , $userId) -> value('username');
                    $mainId = \think\Db::name('userinfo') -> where('user_id' , $userId) -> value('id');
                    Cookie::set('username' , $userName , 'expire=3600&domain=douyapu.com');
                    Cookie::set('TTTTT' , $mainId , 'expire=3600&domain=douyapu.com');
                    $md5Str = md5($screenName . ":" . $mainId . ":" . config('SDK_SECRET'));
                    \think\Cookie::set('loginKey' , $md5Str , 'expire=3600&domain=douyapu.com');
                    return true;
                }
                else
                {
                    return false;
                }

            }
            else /**  数据库没有存在对应的记录 */
            {
                /** 字表添加数据 */
                $data = [];
                $data['u_id'] = trim($userInfo['idstr']);
                $data['screen_name'] = $userInfo['screen_name'];
                $data['create_time'] = time();
                $data['last_login'] = time();
                $data['login_count'] = 1;
                $flag = \think\Db::name($type) -> insert($data);
                $userId = \think\Db::name($type) -> getLastInsID();
                if($flag)
                {
                    $userName = 'douya_' . randChars(15);
                    /** 主表插入一条记录[积分 => 0] */
                    $inc = \think\Db::name('userinfo') -> insert(['integral' => 0 , 'type' => $this -> getType($initType) , 'username' => $userName , 'user_id' => $userId]);
                    if($inc)
                    {
                        $mainId = \think\Db::name('userinfo') -> getLastInsID();
                        Cookie::set('username' , $userName , 'expire=3600&domain=douyapu.com');
                        Cookie::set('TTTTT' , $mainId , 'expire=3600&domain=douyapu.com');
                        $md5Str = md5($screenName . ":" . $mainId . ":" . config('SDK_SECRET'));
                        \think\Cookie::set('loginKey' , $md5Str , 'expire=3600&domain=douyapu.com');
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }
                else
                {
                    return false;
                }
            }
        }
        else
        {
            return false;
        }
    }

    protected function getType($type)
    {
        if(in_array($type , config('ALLOW_TYPE')))
        {
            switch ($type)
            {
                case 'qq' :
                    return 1;
                case 'sina' :
                    return 2;
                case 'weixin' :
                    return 3;
            }
        }
        else
        {
            return 0;
        }
    }

    /**
     * @desc 获取当前登陆的类型 |QQ|SINA|WEIXIN
     * @return mixed|string
     */
    protected function getUserType()
    {
        if($this -> isLogin())
        {
            $type = encrypt(Cookie::get('TTTTT') , 'D' , config('SDK_SECRET'));
            if(in_array($type , config('ALLOW_TYPE')))
            {
                return $type;
            }
            else
            {
                $this -> clearLoginCookie();
            }
        }
        else
        {
            $this -> clearLoginCookie();
        }
    }

    /**
     * @desc 获取当前第三方登陆的API返回的唯一ID
     * @return mixed|string
     */
    protected function getUniqueId()
    {
        if($this -> isLogin())
        {
            return encrypt(Cookie::get('loginUid') , 'D' , config('SDK_SECRET'));
        }
        else
        {
            $this -> clearLoginCookie();
        }
    }

    /**
     * @desc 获取当前登陆用户的主表ID
     * @return mixed
     */
    protected function getUserId()
    {
        if($this -> isLogin())
        {
            /** 第三方登陆类型[不带表前缀] */
            $type = $this -> getUserType();
            $allowType = config('ALLOW_TYPE');
            if(in_array($type , $allowType))
            {
                $tableName = 'login_' . $type;
                /** Uid*/
                $uId = $this -> getUniqueId();
                $userId = Db::name($tableName) -> where('u_id' , $uId) -> value('user_id');
                if($userId)
                {
                    return $userId;
                }
                else
                {
                    $this -> clearLoginCookie();
                }
            }
            else
            {
                $this -> clearLoginCookie();
            }
        }
        else
        {
            $this -> clearLoginCookie();
        }
    }
}
