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
 * @desc PC首页 - nav导航 - 超高折扣券
 *       返回折扣率高于60%的
 * Class Discount
 * @package app\coupon\controller
 */
class Discount extends Common
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
            $results = http('https://storage.douyapu.com/plug/discount.php' , ['page' => $nowPage] , 'POST');
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
//            if(is_numeric($nowPage) && $nowPage >= 1)
//            {
//                $results = $this -> redis -> hGet($this -> pcDiscountKey , $nowPage);
//                $results = json_decode($results , true);
//                if (count($results) > 0)
//                {
////                    $info['count'] = $this -> redis -> hlen($this -> pcDiscountKey);
//                    $info['status'] = 1;
//                    $info['results'] = $results;
//                }
//                else
//                {
//                    $info['status'] = 0;
//                    $info['results'] = [];
//                }
//            }
//            else
//            {
//                $info['status'] = 0;
//                $info['message'] = '参数错误';
//            }
        }
        else
        {
            $info['status'] = 0;
            $info['message'] = '操作错误';
        }
        return json_encode($info);
    }

}