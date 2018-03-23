<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Config;
use think\Session;

define('__HOST__', $_SERVER['SERVER_NAME']);

/**
 * select查询出的对象转数组
 * @param [type] $arr [description]
 */
function Obj_Array($arr){
	$newArr = array();
	if(count($arr)){
		foreach ($arr as $k => $v) {
			$newArr[$k] = $v;
		}
	}
	return $newArr;
}

/**
 * 菜单数据获取
 * @param
 */
function menus(){
	$session_prefix = Config::get('zuesauth.session_prefix');
	$uid = Session::get($session_prefix.'user.uid');
	if(!empty($uid) && $uid != 1){
		$list = Obj_Array(\think\Db::name('admin')->alias('ad')->join('auth_role_user u', 'ad.id = u.user_id')->join('auth_access a' , 'u.role_id = a.role_id')->where('id',$uid)->column('a.menu_id'));
		if(count($list)){
			$map['id'] = array('in',implode(",", $list));
		}else{
			return false;
		}
	}else{
		$map = 1;
	}
	$res = array();
	$list = Obj_Array(\think\Db::name('menu')->where($map)->select());
	$menu = menu($list,$pid = 1);
	$mlist = sortArrByOneField($menu, 'list_order', 'SORT_DESC');
	return $mlist;
}

/**
 * 菜单数据转无限极分类
 * @param [type] $list 全部菜单数据
 * @param [type] $pid 顶级分类的父级ID
 */
function menu($list,$pid = 0){
	$arr = array();
	$submenu = array();
	foreach($list as $v){
		if($v['parent_id'] == $pid){
			$submenu = menu($list, $v['id']);
			if(is_array($submenu) && count($submenu)){
				$v['submenu'] = $submenu;
			}
			$arr[] = $v;
		}
	}
	return $arr;
}

/**
 * 无级分类菜单排序
 * @param [type] $array 全部菜单数据
 * @param [type] $field 排序字段
 * @param [type] $desc SORT_ASC(升序),SORT_DESC(降序)
 */
function sortArrByOneField($array, $field, $desc = false){
	$fieldArr = array();
	foreach ($array as $k => $v) {
		$fieldArr[$k] = $v[$field];
	}
	$sort = $desc == false ? SORT_ASC : SORT_DESC;
	array_multisort($fieldArr, $sort, $array);
	return $array;
}


function oneUrl($arr){
	foreach ($arr as $k => $v) {
		if($v['type'] == 1 && $v['status'] == 1){
			$url = $v['app'].'/'.$v['model'].'/'.$v['action'];
			break;
		}else{
			foreach ($v['submenu'] as $kk => $vv) {
				if($vv['type'] == 1 && $vv['status'] == 1){
					$url = $vv['app'].'/'.$vv['model'].'/'.$vv['action'];
					break;
				}
			}
		}
	}
	return $url;
}

/***************************** 豆芽铺前端 ***********************************/
/***************************** 豆芽铺前端 ***********************************/
/***************************** 豆芽铺前端 ***********************************/

// 应用公共文件
function ch_json_encode($var) {
   if (version_compare(PHP_VERSION, '5.4.0') >= 0) {
	        return json_encode($var, JSON_UNESCAPED_UNICODE);
	} else {
	        if ($var === null)
	            return 'null';
	        if ($var === true)
	            return 'true';
	        if ($var === false)
	            return 'false';
	        static $reps = array(
	            array("\\", "/", "\n", "\t", "\r", "\b", "\f", '"', ),
	            array('\\\\', '\\/', '\\n', '\\t', '\\r', '\\b', '\\f', '\"', ),
	        );
	        if (is_scalar($var))
	            return '"' . str_replace($reps[0], $reps[1], (string) $var) . '"';
	        if (!is_array($var))
	            throw new Exception('JSON encoder error!');
	        $isMap = false;
	        $i = 0;
	        foreach (array_keys($var) as $k) {
	            if (!is_int($k) || $i++ != $k) {
	                $isMap = true;
	                break;
	            }
	        }
	        $s = array();
	        if ($isMap) {
	            foreach ($var as $k => $v)
	                $s[] = '"' . $k . '":' . call_user_func(__FUNCTION__, $v);
	            return '{' . implode(',', $s) . '}';
	        } else {
	            foreach ($var as $v)
	                $s[] = call_user_func(__FUNCTION__, $v);
	            return '[' . implode(',', $s) . ']';
	        }
	}   
}

/**
 * @desc 复制一个目录下面的所有文件到另一个目录
 *
 * @param $src 源目录路径
 * @param $des 目标目录路径
 */
function copyDir($src,$des)
{
	$dir = opendir($src);
	@mkdir($des);
	while(false !== ( $file = readdir($dir)) )
	{
		if (( $file != '.' ) && ( $file != '..' ))
		{
			if ( is_dir($src . '/' . $file) )
			{
				copyDir($src . '/' . $file,$des . '/' . $file);
			}
			else
			{
				copy($src . '/' . $file,$des . '/' . $file);
			}
		}
	}
	closedir($dir);
}

/**
 * @desc 模板保留字对应的内容替换
 *
 * @param $fodder 需要替换的某条记录字段
 * @param $replaceArr 替换规则
 * @param $template 作用的模板字符串
 * @return mixed|string
 */
function dataReplace($fodder , $replaceArr , $template)
{
	/** 保留字左右定界符 */
	$splitLeft = '{%';
	$splitRight = '%}';
	/** 对存入数据库的数据进行转义 */
	$template = htmlspecialchars_decode($template);
	if(is_array($fodder) && is_array($replaceArr) && !empty($template) )
	{
		foreach ($replaceArr as $k => $v)
		{
			if(isset($fodder[$k]))
			{
				/** 可能存在多个保留字共用同一个字段 */
				if(count(explode('|' , $replaceArr[$k])) > 1)
				{
					$list = explode('|' , $replaceArr[$k]);
					foreach ($list as $vv)
					{
						$template = preg_replace("/({$splitLeft}{$vv}{$splitRight})/",$fodder[$k],$template);
					}
				}
				else
				{
					$template = preg_replace("/({$splitLeft}{$replaceArr[$k]}{$splitRight})/",$fodder[$k],$template);
				}
			}
		}
	}
	else
	{
		return '';
	}
	return $template;
}
 

function put($content)
{
	file_put_contents('./1.txt',"\n" . $content,FILE_APPEND);
}

function unicode2utf8($str){
	if(!$str) return $str;
	$decode = json_decode($str);
	if($decode) return $decode;
	$str = '["' . $str . '"]';
	$decode = json_decode($str);
	if(count($decode) == 1){
		return $decode[0];
	}
	return $str;
}

function utf8Unicode($name)
{
	$name = iconv('UTF-8', 'UCS-2', $name);
	$len  = strlen($name);
	$str  = '';
	for ($i = 0; $i < $len - 1; $i = $i + 2){
		$c  = $name[$i];
		$c2 = $name[$i + 1];
		if (ord($c) > 0){   //两个字节的文字
			$str .= '\u'.base_convert(ord($c), 10, 16).str_pad(base_convert(ord($c2), 10, 16), 2, 0, STR_PAD_LEFT);
			//$str .= base_convert(ord($c), 10, 16).str_pad(base_convert(ord($c2), 10, 16), 2, 0, STR_PAD_LEFT);
		} else {
			$str .= '\u'.str_pad(base_convert(ord($c2), 10, 16), 4, 0, STR_PAD_LEFT);
			//$str .= str_pad(base_convert(ord($c2), 10, 16), 4, 0, STR_PAD_LEFT);
		}
	}
	return $str;
}


function unescape($str)
{
	$ret = '';
	$len = strlen($str);
	for ($i = 0; $i < $len; $i ++)
	{
		if ($str[$i] == '%' && $str[$i + 1] == 'u')
		{
			$val = hexdec(substr($str, $i + 2, 4));
			if ($val < 0x7f)
				$ret .= chr($val);
			else
				if ($val < 0x800)
					$ret .= chr(0xc0 | ($val >> 6)) .
						chr(0x80 | ($val & 0x3f));
				else
					$ret .= chr(0xe0 | ($val >> 12)) .
						chr(0x80 | (($val >> 6) & 0x3f)) .
						chr(0x80 | ($val & 0x3f));
			$i += 5;
		} else
			if ($str[$i] == '%')
			{
				$ret .= urldecode(substr($str, $i, 3));
				$i += 2;
			} else
				$ret .= $str[$i];
	}
	return $ret;
}

/** 判断是否为有效的页码 */
function isDigital($parm)
{
	return preg_match('/^\d{1,4}$/',$parm) ? true : false;
}


/** 过滤SQL关键字 */
function filterKeyword( $string )
{
	$keyword = 'select|insert|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|and|union|order|or|into|load_file|outfile';
	$arr = explode( '|', $keyword );
	$result = str_ireplace( $arr, '', $string );
	return $result;
}

function ipAllowVisit()
{
	return true;
	/** 允许访问的IP */
	// $allowList = ['120.25.66.178','127.0.0.1'];
	// /** 当前访问的IP */
	// $visit = getClientIp();
	// $ipList = explode('.',$visit);
	// $flag = true;
	// if(in_array($visit , $allowList))
	// {
	// 	return true;
	// }
	// else
	// {
	// 	foreach ($allowList as $v)
	// 	{
	// 		$flag = true;
	// 		$tampList = explode('.', $v);
	// 		for ($i = 0; $i < 4; $i++)
	// 		{
	// 			if($tampList[$i] == '*')
	// 			{
	// 				continue;
	// 			}
	// 			else
	// 			{
	// 				if($tampList[$i] != $ipList[$i])
	// 				{
	// 					$flag = false;
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// return $flag;
}

/**
 * @desc 获取当前访问的IP地址
 * @param int $type  返回类型 0 返回IP地址 1 返回IPV4地址数字
 * @return mixed
 */
function getClientIp($type = 0)
{
	$type       =  $type ? 1 : 0;
	static $ip  =   NULL;
	if ($ip !== NULL) return $ip[$type];
	if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
	{
		$arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
		$pos = array_search('unknown',$arr);
		if(false !== $pos) unset($arr[$pos]);
		$ip = trim($arr[0]);
	}
	elseif (isset($_SERVER['HTTP_CLIENT_IP']))
	{
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	}
	elseif (isset($_SERVER['REMOTE_ADDR']))
	{
		$ip = $_SERVER['REMOTE_ADDR'];
	}
	// IP地址合法验证
	$long = sprintf("%u",ip2long($ip));
	$ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
	return $ip[$type];
}

/**
 * @desc 模拟 POST/GET 请求
 * @param $url
 * @param $params
 * @param string $method
 * @return mixed
 * @throws Exception
 */
function http($url, $params, $method = 'GET')
{
	$opts = array(
		CURLOPT_TIMEOUT        => 30,
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false
	);

	/* 根据请求类型设置特定参数 */
	switch(strtoupper($method)){
		case 'GET':
			$opts[CURLOPT_URL] = $url . '?' . http_build_query($params);
			break;
		case 'POST':
			//判断是否传输文件
			$params = http_build_query($params);
			$opts[CURLOPT_URL] = $url;
			$opts[CURLOPT_POST] = 1;
			$opts[CURLOPT_POSTFIELDS] = $params;
			break;
		default:
			throw new Exception('不支持的请求方式！');
	}
	/* 初始化并执行curl请求 */
	$ch = curl_init();
	curl_setopt_array($ch, $opts);
	$data  = curl_exec($ch);
	$error = curl_error($ch);
	curl_close($ch);
	if($error) throw new Exception('请求发生错误：' . $error);
	return  $data;
}

/**
 * @desc 加密解密
 *
 * @param $string 需要加密或者解密的字符串
 * @param $operation E => 加密 D => 解密
 * @param string $key 密钥
 * @return mixed|string
 */
function encrypt($string,$operation,$key='')
{
	$key = md5($key);
	$key_length = strlen($key);
	$string = $operation == 'D' ? base64_decode($string) : substr(md5($string.$key),0,8).$string;
	$string_length = strlen($string);
	$rndkey = $box = array();
	$result = '';
	for($i = 0; $i <= 255; $i++)
	{
		$rndkey[$i] = ord($key[$i % $key_length]);
		$box[$i] = $i;
	}
	for($j = $i = 0; $i < 256; $i++)
	{
		$j = ($j + $box[$i] + $rndkey[$i]) % 256;
		$tmp = $box[$i];
		$box[$i] = $box[$j];
		$box[$j] = $tmp;
	}
	for($a = $j = $i = 0;$i < $string_length;$i++)
	{
		$a = ($a + 1) % 256;
		$j = ($j + $box[$a]) % 256;
		$tmp = $box[$a];
		$box[$a] = $box[$j];
		$box[$j] = $tmp;
		$result .= chr(ord($string[$i]) ^ ($box[($box[$a]+$box[$j]) % 256]));
	}
	if($operation == 'D')
	{
		if(substr($result,0,8) == substr(md5(substr($result,8).$key),0,8))
		{
			return substr($result,8);
		}
		else
		{
			return'';
		}
	}
	else
	{
		return str_replace('=','',base64_encode($result));
	}
}

/**
 * @desc 生成一个随机码
 * @param int $len 随机码长度
 * @return string
 */
function randChars($len = 8)
{
	$chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
	$code = '';
	for($i = 0; $i < $len; $i++)
	{
		$code .= $chars[ mt_rand(0, strlen($chars) - 1) ];
	}
	return $code;
}

/**
 * @desc 对字符串进行实体解码转义
 * @param $str
 * @return mixed|string
 */
function escapeStr($str)
{
	/** 特殊字符转义 */
	$specialChars = ['%' , '_'];
	$str = addslashes(html_entity_decode($str));
	if(is_array($specialChars) && !empty($str))
	{
		foreach ($specialChars as $v)
		{
			$str = str_replace($v,'\\'.$v , $str);
		}
	}
	return $str;
}

/**
 * @desc 判断2个数组那些KEY对应的字段发生改变,前提条件2个数组的KEY一致
 * 		    插件api\controller\Datastorage version1.1 版本添加
 * @param $initArr 原始数组
 * @param $compareArr 待更新的数组
 * @param $field 那些字段需要判断
 * @param bool $flag true => 只返回2个数组值发生改变的KEY | false => 返回变化的值与对应KEY
 * @return array|bool
 */
function arrayChange($initArr , $compareArr , $field ,  $flag = true)
{
	if(is_array($initArr) && is_array($compareArr) && is_array($field))
	{
		if(count($initArr) == count($compareArr))
		{
			$initKeyList = array_keys($initArr);
			$compareKeys = array_keys($compareArr);
			foreach ($initKeyList as $k => $v)
			{
				if(in_array($v , $compareKeys))
				{
					unset($initKeyList[$k]);
				}
			}
			/** 一轮遍历之后，如果2个数组的KEY一样，则$initKeyList为empty */
			if(empty($initKeyList))
			{
				/** 存放不同字段的KEY ，用于组合UPDATE语句时需要的数组 */
				$temp = [];
				foreach ($compareKeys as $v)
				{
					if(isset($initArr[$v]) && isset($compareArr[$v]))
					{
						/** 不是所有的字段都需要update */
						if($initArr[$v] != $compareArr[$v] && in_array($v , $field))
						{
							/** 默认只存放value变化的KEY*/
							if($flag)
							{
								$temp[] = $v;
							}
							else /** 存放key与发生改变的value */
							{
								$temp[$v] = $compareArr[$v];
							}
						}
					}
				}
				return $temp;
			}
			else /** 两个数组的KEY不完全一样 */
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}

/**
 * @desc 排序方式，折扣排序需要插件1.1版本之后[包括1.1]才能使用
 * @param $type
 * @return string
 */
function sortType($type)
{
	$allowSortType = [1 ,2 ,3];
	/** 默人为综合排序 */
	if(!in_array($type , $allowSortType))
	{
		$type = 1;
	}
	$orderType = '';
	switch ($type)
	{
		/** 综合排序[默认] */
		case 1 :
			$orderType = ' unix_timestamp(effectiveEndTime) - now() ASC , (biz30Day + 0) DESC,  discountRate DESC  ';
			break;
		/** 热门排序 */
		case 2 :
			$orderType = ' (biz30Day + 0) DESC , unix_timestamp(effectiveEndTime) - now() ASC , discountRate DESC ';
			break;
		/** 折扣排序 */
		case 3 :
			$orderType = ' (discountRate) DESC , unix_timestamp(effectiveEndTime) - now() ASC , (biz30Day + 0) DESC ';
			break;
	}
	return $orderType;
}

/**
 * @desc 通过分类ID反推对应的整个链式结构
 * @param $array
 * @param int $cateId 当前分类的父节点
 * @return array
 */
function cateChain($array, $cateId = 0)
{ 
	static $list = array();
	foreach ($array as $k => $v)
	{
		if($v['p_id'] == 0)
		{
			$v['url'] = '/coupon/lists/?cid=' . $v['cat_id'];
		}
		else
		{
			$v['url'] = '/coupon/lists/?cid=' . $v['p_id'] . '&cat=' . $v['cat_id'];
		}
		if($v['cat_id'] == $cateId)
		{
			cateChain($array, $v['p_id']);
			$list[] = $v;
		}
	}
	return $list;
}

/**
 * @desc 递归循环获取无限分类
 *
 * @param $array 所有数组
 * @param int $pid
 * @return array
 */
function combineTree($array, $pid = 0)
{
	$list = array();
	$temp = array();
	foreach ($array as $v)
	{
		if ($v['p_id'] == $pid)
		{
			$temp = combineTree($array, $v['cat_id']);
			//判断是否存在子数组
			$temp && $v['nodes'] = $temp;
			$list[] = $v;
		}
	}
	return $list;
}

/**
 * @desc 获取当前分类对应的所有子节点分类
 * @param $array
 * @param int $pid
 * @return array
 */
function cateList($array, $pid = 0)
{
	$list = array();
	$temp = array();
	foreach ($array as $v)
	{
		if ($v['p_id'] == $pid)
		{
			$temp = cateList($array, $v['cat_id']);
			//判断是否存在子数组
			$temp && $v['nodes'] = $temp;
			$list[] = $v['cat_id'];
		}
	}
	return $list;
}

/**
 * @desc 判断字符串是否是JSON格式
 * @param $str
 * @return bool true => JSON格式 | false => 不为JSON格式
 */
function isJsonFormat($str)
{
	return !is_null(json_decode($str));
}
 
/**
 * @desc 字符串分割
 * @param $val
 * @return mixed
 */
function demo($val)
{
	$result = explode(' ' , $val);
	return $result[0];
}
 