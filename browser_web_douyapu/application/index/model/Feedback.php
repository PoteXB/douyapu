<?php

namespace app\index\model;
use think\Model;


/**
 * 用户模型类
 */
class Feedback extends Model
{
	/** 字段校验规则 */
	protected $validate = [
		'rule' => [
			'desc' => 'max:100',
			'option' => 'require',
			'contact' => 'require|min:5|max:50|regex:([a-zA-Z0-9_-])+(@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)?',
//			'address' => 'max:200'
		],
		'msg' => [
			'desc.require' => '具体意见描述为必填项',
			'desc.max' => '最大长度不能超过100',
			'option.require' => '意见反馈至少得选中一项',
			'contact.require' => '联系方式为必选项',
			'contact.regex' => '联系方式格式有误',
			'contact.min' => '联系方式输入长度有误',
			'contact.max' => '联系方式输入长度有误',
//			'address.max' => '商品地址长度过长',
		]
	];

	/** 获取字段的校验规则 */
	public function getValidate()
	{
		return $this -> validate;
	}
}









?>