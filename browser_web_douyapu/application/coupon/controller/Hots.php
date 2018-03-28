<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/8/23
 * Time: 15:59
 */
namespace app\coupon\controller;

use app\api\controller\Common;
use think\Db;

/**
 * @desc PC首页 - nav导航 - 豆芽热门券
 *       月销量倒序
 * Class Hots
 * @package app\plug\controller
 */
class Hots extends Common
{
    public function index()
    {
        return $this -> fetch();
    }

    public function items()
    {
        /** 已经返回的数据总条数 */
        $nowPage = input('get.page') ? input('get.page') : 1;
        if(request() -> isGet())
        {
            if(is_numeric($nowPage) && $nowPage >= 1)
            {
                $results = http('https://storage.douyapu.com/plug/hot.php' , ['page' => $nowPage] , 'POST');
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