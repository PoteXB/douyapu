<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/7/24
 * Time: 9:40
 */

namespace app\api\controller;
use app\coupon\controller\Lists;
use app\index\controller\Base;
use think\Controller;
use think\Db;


class Common extends Base
{
    /**
     * @desc 直接把原始数据[JSON]放入列表，待入库时在PUSH
     * @type LIST
     */
    protected $historyPrex = 'historyCoupon';

    /**
     * @desc 把当前优惠券对应的商品ID放入列表，用于展示数据时做排序
     *       对应的是所有优惠券
     * @type Set
     */
    protected $storageKey = 'couponSet';

    /**
     * @desc 存放具体优惠券对应的JSON格式数据的KEY
     *       对应的是所有优惠券
     *       组合方式：KEY + 优惠券编号 => 一维数组
     * @type HASH
     */
    protected $storageHash = 'couponHash';

    /**
     * @desc 把优惠券对应的商品ID放入具体分类列表，用于展示具体某个分类数据时做排序
     *       对应的是具体某个分类下的优惠券
     * @type Set
     */
    protected $catStorageKey = 'catCouponSet';

    /**
     * @desc 存放具体分类优惠券对应的JSON格式数据的KEY
     *       对应的分类下的所有优惠券
     *       组合方式：KEY + catId => 一维数组
     * @type HASH
     */
    protected $catStorageHash = 'catCouponHash';

    /**
     * @desc 把优惠券里面折扣率大于6折的itemID存入LIST
     * @type Set
     */
    protected $discountKey = 'discountSet';

    /**
     * @desc 把优惠券里面折扣率大于6折的itemID存入HASH
     *       组合方式：KEY + itemId => 一维数组
     * @type LIST
     */
    protected $discountHash = 'discountHash';

    /**
     * @desc 存放数据库里面所有的分类
     * @type HASH
     */
    protected $category = 'category';

    /**
     * @desc 存放数据数据的KEY
     * @type Set
     */
    protected $flushKey = 'flushSet';

    /**
     * @desc 随机一个长度
     * @type string
     */
    protected $flushSize = 'flushSize';

    /**
     * @desc 存放刷新数据列表
     * @type string
     */
    protected $flushHash = 'flushHash';

    /**
     * @desc 用户收藏
     * @type HASH
     */
    protected $collectKey = 'collectList';

    /**
     * @desc 顶级分类
     * @type hash
     */
    protected $topCat = 'topCateHash';

    /**
     * @desc PC存放分类的KEY前缀
     * @var string
     */
    protected $catKey = 'pc-cat';

    /**
     * @desc PC-[超高折扣率]栏目数据存放的缓存KEY
     * @type HASH
     * @var string
     */
    protected $pcDiscountKey = 'pc-discount';

    /**
     * @desc PC-[豆芽热门券]栏目数据存放的缓存KEY
     * @type HASH
     * @var string
     */
    protected $pcHotsKey = 'pc-hots';

    /**
     * @desc PC-推荐的热门优惠券
     * @type STRING
     * @var string
     */
    protected $pcDetialHot = 'pc-detial-hot';

    /** 失效时间 5小时 */
    protected $expLevel_1 = 18000;

    /** 失效时间 3小时 */
    protected $expLevel_2 = 10800;

    /** 失效时间 1小时 */
    protected $expLevel_3 = 3600;

    /** 失效时间 半小时 */
    protected $expLevel_4 = 1800;

    /** 排序方式 */
    protected $sortType = [1,2,3,4];

    /** 优惠券平台类型 0 => 淘宝 | 1 => 天猫 */
    protected $couponType = [0 , 1];

    public function _initialize()
    {
        parent::_initialize();
        $this -> redis = new \Redis();
        $redisConf = config('redis');
        $this -> redis -> connect($redisConf['host'], $redisConf['port']);
        $this -> redis -> auth($redisConf['pass']);
    }

    /**
     * @desc 从所有[HASH]优惠券里面判断是否存在具体某个ID对应的优惠券信息
     * @param $itemId 优惠券ID
     * @return array
     */
    protected function getRowByItemId($itemId)
    {
        $list = $this -> redis -> hGetAll($this -> storageHash . ':' . $itemId);
        return ( is_array($list) && !empty($list) ) ? $list : [];
    }

    /**
     * @desc 获取某个分类[HASH]下是否存在对应的某个具体ID对应的优惠券信息
     * @param $catId 分类ID
     * @param $itemId 优惠券ID
     * @return array
     */
    protected function getCatRowByItemId($catId , $itemId)
    {
        $key = $this -> catStorageHash . ':' . $catId . ':' . $itemId;
        $list = $this -> redis -> hGetAll($key);
        return ( is_array($list) && !empty($list) ) ? $list : [];
    }

    /**
     * @desc 获取当前分类对应的顶级分类
     * @param $catId 分类ID
     * @return mixed|string
     */
    protected function category($catId)
    {
        if(!empty($catId) && is_numeric($catId))
        {
            $pId = $this -> redis -> get($this -> category . ':' . $catId);
            if(!empty($pId))
            {
                return $pId;
            }
            else
            {
                $map = [];
                $map['status'] = 1;
                $map['cat_id'] = $catId;
                $row = Db::name('category') -> where($map) -> find();
                if(is_array($row) && isset($row['cat_id']) && !empty($row['cat_id']))
                {
                    $this -> redis -> set($this -> category . ':' . $catId , $row['p_id']);
                    return $row['p_id'];
                }
                else
                {
                    return '';
                }
            }
        }
        return '';
    }

    /**
     * @desc 判断当前优惠券是否存在于存放六折优惠券的HASH里面
     * @param $itemId
     * @return array|mixed
     */
    protected function getDiscountRowByItemId($itemId)
    {
        $key = $this -> discountHash . ':' . $itemId;
        $list = ($this -> redis -> hGetAll($key));
        return ( is_array($list) && !empty($list) ) ? $list : [];
    }

    /**
     * @desc 获取顶级分类
     * @return array
     */
    public function getTopCateList()
    {
        $temp = [];
        /** 模糊匹配存放分类的key集合 */
        $cacheKeys = $this -> redis -> keys($this -> topCat . '*');
        foreach ($cacheKeys as $v)
        {
            $temp[] = $this -> redis -> hGetAll($v);
        }
        if(empty($temp))
        {
            $map['status'] = 1;
            $map['level'] = 1;
            $temp = Db::name('category') -> where($map) -> select();
            foreach ($temp as $v)
            {
                $this -> redis -> hSet($this -> topCat . ':' . $v['cat_id'] , 'id' , $v['cat_id'] );
                $this -> redis -> hSet($this -> topCat . ':' . $v['cat_id'] , 'p_id' , $v['p_id'] );
                $this -> redis -> hSet($this -> topCat . ':' . $v['cat_id'] , 'cat_id' , $v['cat_id'] );
                $this -> redis -> hSet($this -> topCat . ':' . $v['cat_id'] , 'name' , $v['name'] );
                $this -> redis -> hSet($this -> topCat . ':' . $v['cat_id'] , 'sort' , $v['sort'] );
                $this -> redis -> hSet($this -> topCat . ':' . $v['cat_id'] , 'status' , $v['status'] );
                $this -> redis -> hSet($this -> topCat . ':' . $v['cat_id'] , 'level' , $v['level'] );
            }
        }
        return $temp;
    }



    /**
     * @desc 判断某个分类ID是否有效
     * @param $cateId 分类ID | STRING
     * @return bool
     */
    public function cateIsEffective($cateId)
    {
        if(!empty($cateId) && is_numeric($cateId))
        {
            /** 保证缓存里面有分类数据存在 */
            $this -> getAllCateList();
            $cacheKey = $this -> allCat . ':' . $cateId; 
            /** 从缓存里面判断当前分类是否存在 */
            $cateRow = $this -> redis -> hGetAll($cacheKey);

            return empty($cateRow) ? false : true;
        }
        else
        {
            return false;
        }
    }

    /**
     * @desc 获取排序方式，默认或者参数错误按照默认的方式排列
     * @param $type
     * @return array
     */
    public function sort($type)
    {
        /** 排序的字段 */
        $orderField = '';
        /** 倒序还是顺序 */
        $method = 'DESC';

        /** 默认设置综合排序 */
        if(!in_array($type , $this -> sortType))
        {
            $type = 1;
        }
        switch ($type)
        {
            case 1 :
                $orderField = 'id';
                $method = 'DESC';
                break;
            case 2 :
                $orderField = 'biz30Day';
                break;
            case 3 :
                $orderField = 'discountRate';
                break;
        }
        return ['field' => $orderField , 'method' => $method];
    }

    /**
     * @desc 缓存排序
     * @param $type
     * @return array
     */
    public function sortCache($type)
    {
        /** 排序的字段 */
        $orderField = '';
        /** 倒序还是顺序 */
        $method = 'DESC';

        /** 默认设置综合排序 */
        if(!in_array($type , $this -> sortType))
        {
            $type = 1;
        }
        switch ($type)
        {
            case 1 :
                $orderField = 'id';
                $method = 'DESC';
                break;
            case 2 :
                $orderField = 'biz30Day';
                break;
            case 3 :
                $orderField = 'discountRate';
                break;
        }
        return ['field' => $orderField , 'method' => $method];
    }

    /**
     * @desc 对某个缓存KEY里面的数据进行校验，保证数据的一致性
     * @param $keySet 排序参照[SET]
     * @param $keyHash 存储优惠券详情[HASH]
     */
    public function cacheValidate($keySet , $keyHash)
    {
        /** 排序参照列表的总长度 */
        $setSize = $this -> redis -> sSize($keySet);
        /** 存放优惠券详情总条数 */
        $keyList = $this -> redis -> keys($keyHash . ':*');
        $hashSize = count($keyList);
        /** 1:HASH > SET , 详情里面存放的记录在集合里面找不到，把详情的ID加到集合里面 */
        if($hashSize > $setSize)
        {
            foreach ($keyList as $v)
            {
                $row = $this -> redis -> hGetAll($v);
                /** 如果不存在，把优惠券的itemID放入详情 */
                if(!$this -> redis -> sIsMember($keySet , $row['itemId']))
                {
                    $this -> redis -> sAdd($keySet , $row['itemId']);
                }
            }
        }
        else if($hashSize < $setSize) /** 2: SET > HASH ， 集合里面的参照部分ID查询不到优惠券详情信息，需要删除集合中查询不到的部分 */
        {
            $setList = $this -> redis -> sMembers($keySet);
            foreach ($setList as $v)
            {
                $key = $keyHash . ':' . $v;
                /** 长度为0，则当前集合里面的itemId在HASH里面找不到优惠券的详情信息*/
                if(0 == $this -> redis -> hLen($key))
                {
                    /** 删除集合里的itemId[通过该ID查询不到详情优惠券] */
                    $this -> redis -> sRem($keySet , $v);
                }
            }
        }
        else
        {

        }
    }

    /**
     * @desc 通过分类ID获取分类对应的数据
     * @param $catId 分类ID
     * @param $sort 排序方式 | [1 , 2 , 3]
     * @param $page 页码 | > 0
     * @param $pageSize 请求数据条数
     * @return array
     */
    public function getCatList($catId , $sort , $page , $pageSize)
    {
        if(!empty($catId) && is_numeric($catId))
        {
            if($this -> cateIsEffective($catId))
            {
                /** 数据校验,保证集合和HASH里面存储数据的一致性 */
                $this -> cacheValidate($this -> catStorageKey . ':' . $catId , $this -> catStorageHash . ':' . $catId);

                $count = count($this -> redis -> keys($this -> catStorageHash . ':' . $catId . '*'));
                $countPage = ceil($count / $pageSize);
                /** 限制最大页码 */
                if($page > $countPage && 1 != $page)
                {
                    $page = $countPage;
                }
                /** 排序方式 */
                $sortType = $this -> sort($sort);
                $sort = array('BY' => $this -> catStorageHash . ':' . $catId . ':*->'. $sortType['field'] .'',
                    'SORT' => $sortType['method'],
                    'LIMIT' => array(($page - 1) * $pageSize , $pageSize)
                );

                $temp = [];
                /** 排序之后获取的只是存放ID对应的一维数组 */
                $results = $this -> redis -> sort($this -> catStorageKey . ':' . $catId , $sort);
                /** 通过cacheKEY获取对应的优惠券信息 */
                foreach ($results as $v)
                {
                    $temp[] = $this -> getCatRowByItemId($catId , $v);
                }
                return $temp;
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
}