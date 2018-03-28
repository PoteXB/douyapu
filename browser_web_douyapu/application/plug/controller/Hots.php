<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/8/23
 * Time: 15:59
 */
namespace app\plug\controller;

use app\api\controller\Common;
use app\index\controller\Api;
use think\Db;

/**
 * @desc 热门优惠券，按照优惠券的月销量返回数据
 * Class Discount
 * @package app\plug\controller
 */
class Hots extends Common
{
    public function index()
    {
        /** 请求条数 */
        $pageSize = 8;
        /** 已经返回的数据总条数 */
        $ownNum = input('post.ownCount') ? input('post.ownCount') : 1;
        if(request() -> isPost())
        {
            if(is_numeric($ownNum) && $ownNum >= 1)
            {
                $page = ceil($ownNum / $pageSize);
                $results = http('https://storage.douyapu.com/plug/hot.php' , ['page' => $page] , 'POST');
                if(!empty($results))
                {
                    $results = json_decode($results , true);
                    $info['status'] = 1;
                    $info['results'] = isset($results['results']) ? $results['results'] : [];
                }
                else
                {
                    $info['status'] = 0;
                    $info['results'] = [];
                }
            }
            else
            {
                $info['status'] = 0;
                $info['message'] = '参数错误';
            }
        }
        else
        {
            $info['status'] = 0;
            $info['message'] = '操作错误';
        }
        return json_encode($info);
    }
}