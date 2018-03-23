<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/7/21
 * Time: 18:09
 */
namespace app\coupon\controller;

use app\api\controller\Common;
use app\index\controller\Base;
use think\Db;

class Detail extends Common
{
    public function index()
    {
        $id = input('get.id');
        if(!empty($id) && is_numeric($id))
        {
            $cacheRow = $this -> redis -> hGet($this -> storageHash , $id);
            $storageRow = $this -> redis -> hGet('copyStorage' , $id);
            if(!empty($cacheRow) && !empty($storageRow))
            {
                $row = json_decode($cacheRow , true);
                $storageRow = json_decode($storageRow , true);
                $row['shareUrl'] = $row['shareUrl'];
                $item = json_decode($row['item'] , true);
            }
            else
            {
                $coupon = Db::name('coupon') -> where('itemId' , $id) -> find();
                if(!empty($coupon))
                {
                    $item = json_decode($coupon['item'] , true);
                    $temp = [];
                    $temp['clickUrl'] = $item['item']['clickUrl'];
                    $temp['itemId'] = $item['item']['itemId'];
                    $temp['tmall'] = $coupon['type'];
                    $temp['catId'] = $coupon['catId'];
                    $temp['diff'] = intval($item['item']['tmall'] - $coupon['amount']);
                    $temp['effectiveEndTime'] = $coupon['effectiveEndTime'];
                    $temp['amount'] = $coupon['amount'];
                    $temp['biz30Day'] = $coupon['biz30Day'];
                    $temp['discountRate'] = $coupon['discountRate'];
                    $temp['item'] = $coupon['item'];
                    $temp['shareUrl'] = $item['item']['shareUrl'];
                    $temp['endTime'] = strtotime($coupon['effectiveEndTime']);
                    $row = $temp;
                    $item = json_decode($row['item'] , true);
                }
                else
                {
                    $this -> redirect('/index/msg');
                }
            }
            $this -> assign('catNav' , $this -> cateChain($row['catId']));
            $this -> assign('coupon' , $row);
            $this -> assign('item' , $item);
            return $this -> fetch();
        }
        else
        {
            $this -> redirect('/index/msg');
        }
    }

    /**
     * @desc 通过某个分类ID或者这个分类对应的面包屑
     * @type POST
     *       KEY : cateId 必选
     *
     * @return string
     */
    public function cateChain($cid)
    {
        $cateId = $cid;
        /** 1:参数有效 */
        if(isset($cateId) && is_numeric($cateId))
        {
            /** 2:分类存在 */
            if($this -> cateIsEffective($cateId))
            {
                $catList = $this -> getAllCateList();
                return cateChain($catList , $cateId);
            }
            else
            {
                return [];
            }
        }
        else
        {
            return [];
        }
    }

    /**
     * @desc 热门优惠券
     * @return string
     */
    public function reHots()
    {
        $results = $this -> redis -> get('pc-detail-hots');
        $results = json_decode($results , true);
        return json_encode($results);
    }
}