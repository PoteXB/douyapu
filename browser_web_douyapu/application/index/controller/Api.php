<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/8/23
 * Time: 15:58
 */

/**
 * @desc 所有插件、客户端相关接口需要用到缓存基础该类
 */
namespace app\index\controller;

use think\Controller;
class Api extends Controller
{
    /** 失效时间 5小时 */
    protected $expLevel_1 = 18000;

    /** 失效时间 3小时 */
    protected $expLevel_2 = 10800;

    /** 失效时间 1小时 */
    protected $expLevel_3 = 3600;

    /** 失效时间 半小时 */
    protected $expLevel_4 = 1800;

    /** 排序方式 */
    protected $sortType = [1,2,3,4];

    /** 优惠券平台类型 0 => 淘宝 | 1 => 天猫 */
    protected $couponType = [0 , 1];

    public function _initialize()
    {
        parent::_initialize();
        $this -> redis = new \Redis();
        $redisConf = config('redis');
        $this -> redis -> connect($redisConf['host'], $redisConf['port']);
        $this -> redis -> auth($redisConf['pass']);
    }
}