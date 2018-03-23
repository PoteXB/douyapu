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
 * @desc 全网最低 每次12条
 * Class Min
 * @package app\plug\controller
 */
class Min extends Common
{
    public function index()
    {
        /** 请求条数 */
        $pageSize = 12;
        /** 已经返回的数据总条数 */
        $ownNum = input('post.ownCount') ? input('post.ownCount') : 1;
        if(request() -> isPost())
        {
            if(is_numeric($ownNum) && $ownNum >= 1)
            {
                $page = ceil($ownNum / $pageSize);
                $results = $this -> redis -> hGet('detialHotsPageList' , $page);
                $results = json_decode($results , true);
                if (count($results) > 0)
                {
                    $info['status'] = 1;
                    $info['results'] = $results;
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