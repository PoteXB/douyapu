<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/8/23
 * Time: 15:59
 */
namespace app\plug\controller;

use app\api\controller\Common;
use think\Db;

/**
 * @desc 刷新最新的优惠券
 * @version >= 1.3
 * Class Refresh
 * @package app\plug\controller
 */
class Refresh extends Common
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
                $results = http('https://storage.douyapu.com/plug/refresh.php' , ['page' => $page] , 'POST');
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


//    public function index()
//    {
//        if(request() -> isPost())
//        {
//            $list = $this -> redis -> keys($this -> flushHash . ':*');
//            $count = count($list);
//            /** HASH列表中存在对应的刷新数据 */
//            if($count > 0)
//            {
//                $temp = [];
//                foreach ($list as $v)
//                {
//                    $temp[] = $this -> redis -> hGetAll($v);
//                }
//
//                /** 删除对应的KEY */
//                $this -> redis -> del($this -> redis -> keys($this -> flushHash . ':*'));
//                $this -> redis -> del($this -> flushSize);
//                $info['status'] = 1;
//                $info['results'] = $temp;
//            }
//            else
//            {
//                $info['status'] = 0;
//                $info['message'] = '暂时没有数据刷新';
//            }
//        }
//        else
//        {
//            $info['status'] = 0;
//            $info['message'] = '请求失败';
//        }
//        return json_encode($info);
//    }
//    public function back()
//    {
//        /** 最后一次请求刷新数据的时间 | 单位：时间戳 */
//        $requestTime = input('post.time');
//        /** 更新的最后一条优惠券ID */
//        $lastId = input('post.id');
//        /** 默认的分页条数*/
//        $pageSize = 8;
//        /** 数据起始位置[已经返回的数据总条数] */
//        $ownCount = input('post.ownCount') ? input('post.ownCount') : 0;
//        if(request() -> isPost())
//        {
//            $map = [];
//            $map['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
//            $map['unix_timestamp(createTime)'] = ['EGT' , $requestTime];
//            $map['amount'] = ['>' , 0];
//
//            if(is_numeric($ownCount) && isset($requestTime) && is_numeric($requestTime) && strlen($requestTime) == 10)
//            {
//                /**
//                 * @desc 根据是否传递ID来判断:
//                 *          1[不存在] : 返回当前刷新的数据记录条数
//                 *          2[存在] : 返回更新的总记录条数
//                 */
//                if(isset($lastId) && is_numeric($lastId) && $lastId > 0) // 返回刷新的数据列表
//                {
//                    $map['id'] = ['>' , $lastId];
//                    $count = Db::name('coupon') -> where($map) -> count();
//                    if($count > 0)
//                    {
//                        $results = Db::name('coupon') -> where($map) -> limit($ownCount , $pageSize) -> select();
//                        $temp = [];
//                        foreach ($results as $v)
//                        {
//                            $row = json_decode($v['item'] , true);
//                            if(isset($row['item']) && !empty($row['item']))
//                            {
//                                $tempData = $row['item'];
//                                $tempData['effectiveEndTime'] = $row['effectiveEndTime'];
//                                $tempData['amount'] = $row['amount'];
//                                $tempData['effectiveStartTime'] = $row['effectiveStartTime'];
//                                $tempData['shopName'] = $row['shopName'];
//                                $tempData['shopLogo'] = $row['shopLogo'];
//                                $temp[] = json_encode($tempData);
//                            }
//                            else
//                            {
//                                $temp[] = $v['item'];
//                            }
//                        }
//                        $info['status'] = 1;
//                        $info['results'] = $temp;
//                        $info['count'] = $count;
//                    }
//                    else
//                    {
//                        $info['status'] = 0;
//                        $info['message'] = '没有更多的优惠券了，请稍后重试';
//                    }
//                }
//                else // 返回总记录条数
//                {
//                    $count = Db::name('coupon') -> where($map) -> count();
//                    $info['count'] = $count;
//                }
//            }
//            else
//            {
//                $info['status'] = 0;
//                $info['message'] = '参数错误';
//            }
//        }
//        else
//        {
//            $info['status'] = 0;
//            $info['message'] = '请求失败';
//        }
//        return json_encode($info);
//    }

}