<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/6/19
 * Time: 14:25
 */

namespace app\index\controller;
use app\api\controller\Common; 
use think\Db;
use app\index\model;
use think\Validate;

class Feedback extends Common
{
    /** 意见反馈 */
    public function index()
    {
        return $this -> fetch();
    }

    /**
     * 
     */
    public function submit()
    {
        header('Access-Control-Allow-Origin:*');
        $feedback = new model\Feedback();
        $modelValidate = $feedback -> getValidate();
        $validate = new Validate($modelValidate['rule'], $modelValidate['msg']);
        if($validate -> check($_POST))
        {
            $feedback -> data($_POST);
            $flag = $feedback -> allowField(true) -> save();
            if($flag)
            {
                echo json_encode(['status' => 1 , 'msg' => '添加成功']);
            }
            else
            {
                echo json_encode(['status' => 0 , 'msg' => '添加失败']);
            }
        }
        else
        {
            echo json_encode(['status' => 0 , 'msg' => $validate->getError()]);
        }
    }

}