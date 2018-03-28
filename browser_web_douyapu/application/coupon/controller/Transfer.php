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
use think\Config;
use think\Cookie;
use think\Db;

/**
 * @desc 豆芽铺yo
 * Class Transfer
 * @package app\coupon\controller
 */
class Transfer extends Common
{
    public function index()
    {
        $itemId = input('get.item');
        /** 跳转方式 ， type存在且等于1时跳转到PC详情页，其它情况跳转至中转页面 */
        $type = input('get.type');
        if(isset($itemId) && is_numeric($itemId))
        {
            if(isset($type) && $type == 1)
            {
                $shareUrl =  Config::get('DEFAULT_JUMP_REFERER') . '/coupon/detail?id=' . $itemId;
            }
            else
            {
                $jsonList = $this -> redis -> hGet($this -> storageHash ,  $itemId);

                /** 如果缓存不存在数据，从数据库查找 */
                if(empty($jsonList))
                {
                    $row = Db::name('coupon') -> where('itemId' , $itemId) -> value('shareUrl');
                    if(!empty($row))
                    {
                        //$row = json_decode($row , true);
                        $shareUrl = $row;
                    }
                    else
                    {
                        $this -> redirect('/index/msg');
                    }
                }
                else
                {
                    $row = json_decode($jsonList , true);
                    //$item = json_decode($row['item'] , true);
                    $shareUrl = $row['shareUrl'];
                }
            }
            $this -> assign('link' , $shareUrl);
            return $this -> fetch();
        }
        else
        {
            $this -> redirect('/index/msg');
        }
    }
}