<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/6/19
 * Time: 14:25
 */

namespace app\index\controller;
use app\index\controller\Base;
use think\Db;

class Index extends Base
{
    public function index()
    { 
        //$this->view->engine->layout('tpl_layout_simple');
        return $this->fetch('index');
    }

   

    /** 首页展示20条记录， 一小时更新一次 */
    public function reqMainList()
    {
//        header("Access-Control-Allow-Origin: *");
        $perPage = 20;
        if(request() -> isPost())
        {
            /**  判断redis是否存在数据 */
            if(!empty($this -> redis -> get('mainList')))
            {
                $results = ($this -> redis -> get('mainList'));
                $info['results'] = json_decode($results , true);
                $info['status'] = 1;
            }
            else
            {
                $map['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
                $results = Db::name('coupon') -> where($map) -> order(' id DESC ') -> limit($perPage) -> select(); 
                $count = count($results);

                $temp = [];
                foreach ($results as $v)
                {
                    $row = json_decode($v['item'] , true);
                    if(isset($row['item']) && !empty($row['item']))
                    {
                        $tempData = $row['item'];
                        $tempData['effectiveEndTime'] = $row['effectiveEndTime'];
                        $tempData['amount'] = $row['amount'];
                        $tempData['effectiveStartTime'] = $row['effectiveStartTime'];
                        $tempData['shopName'] = $row['shopName'];
                        $tempData['shopLogo'] = $row['shopLogo'];
                        $temp[] = json_encode($tempData);
                    }
                    else
                    {
                        $temp[] = $v['item'];
                    }
                }
                $info['results'] = $temp;
                $info['status'] = 1;
                if($count > 0)
                {
                    /** 整体数据写入redis */
                    $this -> redis -> set('mainList' , json_encode($temp));
                    $this -> redis -> expire('mainList' , 1 * 1800);
                }
            }
        }
        else
        {
            $info['status'] = 0;
            $info['msg'] = '请求失败';
        }
        echo json_encode($info);
    }

    /**
     *  首页 热门推荐 1小时清理一次缓存
     */
    public function reqHotList()
    {
//        header("Access-Control-Allow-Origin: *");
        $perPage = 6;
//        if(request() -> isPost())
        if(request() -> isPost())
        {
            /** 判断redis是否存热门优惠券数据 */
            if(!empty($this -> redis -> get('hotList')))
            {
                $results = ($this -> redis -> get('hotList'));
                $count = ($this -> redis -> get('hotCount'));
                $info['results'] = json_decode($results , true);
                $info['count'] = $count;
                $info['status'] = 1;
            }
            else
            {
                $map['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
                $map['amount'] = ['>' , 0];
                $results = Db::name('coupon') -> where($map) -> order(' biz30Day + 0 DESC ') -> limit($perPage) -> select();
                $count = count($results);
                $temp = [];
                foreach ($results as $v)
                {
                    $row = json_decode($v['item'] , true);
                    if(isset($row['item']) && !empty($row['item']))
                    {
                        $tempData = $row['item'];
                        $tempData['effectiveEndTime'] = $row['effectiveEndTime'];
                        $tempData['amount'] = $row['amount'];
                        $tempData['effectiveStartTime'] = $row['effectiveStartTime'];
                        $tempData['shopName'] = $row['shopName'];
                        $tempData['shopLogo'] = $row['shopLogo'];
                        $temp[] = json_encode($tempData);
                    }
                    else
                    {
                        $temp[] = $v['item'];
                    }
//                    $temp[] = $v['item'];
                }
                $info['results'] = $temp;
                $info['count'] = $count;
                $info['status'] = 1;

                if($count > 0)
                {
                    /** 整体数据写入redis */
                    $this -> redis -> set('hotList' , json_encode($temp));
                    $this -> redis -> set('hotCount' , $count);
                    $this -> redis -> expire('hotList' , 1 * 3600);
                    $this -> redis -> expire('hotCount' , 1 * 3600);
                }
            }
        }
        else
        {
            $info['status'] = 0;
            $info['msg'] = '请求失败';
        }
        echo json_encode($info);
    }


}