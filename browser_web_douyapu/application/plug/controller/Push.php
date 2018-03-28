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
 * @desc 推送优惠券，每次只推送一条，按最大折扣率推送
 *          推送之前判断优惠券有没有效果
 * @version >= 1.3
 * Class Discount
 * @package app\plug\controller
 */
class Push extends Common
{
    public function index()
    {
        return json_encode(['status' => 1  , 'result' => []]);
//        /** 今天已经推送过的 */
//        $filter = json_decode(input('post.filter') , true);
//
//        $result = $this -> coupon(null , $filter);
//        if(is_array($result))
//        {
//            $info['status'] = 1;
//            $info['result'] = $result;
//        }
//        else
//        {
//            $info['status'] = 0;
//        }
//        return json_encode($info);

        /**
         * @desc 从所有优惠券里面按月销量排序，获取前100条记录，
         *          随机获取里面的某一条数据进行推送
         */

//        $sort = array('BY'=> $this -> storageHash . ':*->biz30Day',
//            'SORT'=>'DESC',
//            'LIMIT'=>array(0,100)
//        );
//
//        $results = $this -> redis -> sort($this -> storageKey , $sort);
//        $temp = [];
//        foreach ($results as $v)
//        {
//            $temp[] = $this -> getRowByItemId($v);
//        }
//        $rand = rand(1 , count($results));
//        return json_encode(['status' => 1  , 'result' => $temp[$rand - 1]]);
    }

    /**
     * @desc 递归获取折扣率最高的优惠券,每递归一次请求一次接口判断优惠券是否有效，直到优惠券有效返回优惠券对应的数据
     * @param null $id 当前优惠券itemId
     * @return mixed
     * @throws \Exception
     */
    public function coupon($id = null , $filter)
    {
        static $avoid = [];
        $url = 'https://uland.taobao.com/cp/coupon';
        $map = [];
        $map['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
        $map['amount'] = ['>' , 0];
        if(isset($id) && is_numeric($id))
        {
            $avoid[] = $id;
        }
        $map['itemId'] = ['not in' , array_unique(array_merge($avoid , $filter))];
        $item = Db::name('coupon') -> where($map) -> order(' biz30Day DESC ') -> find();
        /** 判断item是否有效 */
        $itemId = $item['itemId'];
        $parm = [];
        $parm['pid'] = 'mm_126373193_35682056_126916323';
        $parm['itemId'] = $itemId;
        $results = http($url , $parm ,'GET');
        $results = json_decode($results , true);
        if(isset($results['result']['item']['shareUrl']) && !empty($results['result']['item']['shareUrl']))
        {
            $e = explode('e=',$results['result']['item']['shareUrl']);
            if(isset($e[1]) && !empty($e[1]))
            {
                $parm = [];
                $parm['e'] = $e[1];
                $results = http($url , $parm);
                $results = json_decode($results, true);
                $results = $results['result'];
                if(!$results['retStatus'])
                {
                    $item = json_decode($item['item'] , true);
                    if(isset($item['item']) && !empty($item['item']))
                    {
                        $tempData = $item['item'];
                        $tempData['effectiveEndTime'] = $item['effectiveEndTime'];
                        $tempData['amount'] = $item['amount'];
                        $tempData['effectiveStartTime'] = $item['effectiveStartTime'];
                        $tempData['shopName'] = $item['shopName'];
                        $tempData['shopLogo'] = $item['shopLogo'];
                        $temp = $tempData;
                    }
                    else
                    {
                        $temp = $item;
                    }
                    return $temp;
                }
                else
                {
                    return $this -> coupon($itemId , $filter);
                }
            }
            else
            {
                return $this -> coupon($itemId , $filter);
            }
        }
        else
        {
            return $this -> coupon($itemId , $filter);
        }
    }
}