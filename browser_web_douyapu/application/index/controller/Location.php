<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/6/19
 * Time: 14:25
 */

namespace app\index\controller;
use app\api\controller\Common;
use app\index\controller\Base;
use think\Db;

class Location extends Common
{
    public function index()
    {
        if(strpos($_SERVER['HTTP_USER_AGENT'] , 'QQBrowser'))
        {
            header("Location: https://pcbrowser.dd.qq.com/pcbrowserbig/qbextension/update/20171011/gkibmngbfjccjnodhngeodolkdcjfann.crx");
            exit();
        }
        else
        {
            $type = input('get.type');
            if($type == 1)
            {
                header("Location: http://file.douyapu.com/version/1.2.0.4/guanwang.crx");
                exit();
            }
            else if($type == 3)
            {
                header("Location: http://file.douyapu.com/version/1.2.0.4/sougou.sext");
                exit();
            }
            else
            {
                header("Location: http://file.douyapu.com/version/1.2.0.4/guanwang.crx");
                exit();
            }
        }
    }
}