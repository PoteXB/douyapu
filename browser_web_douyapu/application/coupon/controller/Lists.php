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

class Lists extends Common
{
    public function index()
    {
        /** 顶级分类的ID */
        $cid = input('get.cid');
        /** 二级分类的ID */
        $cat = input('get.cat');
        if($this -> cateIsEffective($cid))
        {
            if(isset($cat) && !empty($cat))
            {
                if($this -> cateIsEffective($cat))
                { 
                    $this -> assign('nav' , $this -> cateChain($cat));
                    return $this -> fetch('index');
                }
                else
                {
                    // 跳转错误
                    $this -> redirect('/index/msg');
                }
            }
            else
            {
                $this -> assign('nav' , $this -> cateChain($cid));
                return $this -> fetch('index');
            }
        }
        else
        {
            $this -> redirect('/index/msg');
        }
    }

    public function items()
    {
        $pageSize = 8;
        /** 顶级分类ID */
        $catId = input('post.cid');
        /** 请求的页码 | 大于等于1 */
        $nowPage = input('post.page');
        $sort = input('post.sort') ? input('post.sort') : 1;
        if(isset($catId) && is_numeric($catId) && isset($nowPage) && is_numeric($nowPage) && $nowPage >= 1)
        {
            /** 默认的id是顶级分类ID*/
            $defaultCatId = $catId;
            /** 默认数据库约束字段 */
            $defaultField = 'pId';

            /** 如果有二级分类，以二级分类为主 */
            $cat = input('post.cat');
            if(isset($cat) && $cat > 0)
            {
                $defaultCatId = $cat;
                $defaultField = 'catId';
            }

            /** 判断分类是否有效*/
            if($this -> cateIsEffective($defaultCatId))
            {
                /** 排序方式 */
                $sortType = $this -> sortCache($sort);

                /** 判断缓存是否有数据 */
                $cacheJsonResults = $this -> redis -> hGet($this -> catKey . ":" . $defaultCatId , $sortType['field'] . ':' . $nowPage );
                if(!empty($cacheJsonResults))
                {
                    $results = json_decode($cacheJsonResults , true);
                    $info['status'] = 1;
                    $info['results'] = $results;
                }
                else
                {
                    $sql = 'SELECT  `itemId`,`pId`,`catId`,`title`,`effectiveEndTime`,`amount`,`biz30Day`,`item`,`createTime`,`discountRate`,`type`,`picUrl`,`reservePrice`,`discountPrice`,`shareUrl`,`weight`,`rebate` FROM `coupon` where itemId in(select d.itemID from (select distinct itemID from `coupon` WHERE amount > 0 AND UNIX_TIMESTAMP(effectiveEndTime) > '. time() .' AND '. $defaultField .' = '. $defaultCatId .'  LIMIT 0,400) as d) GROUP BY itemId ORDER BY '. $sortType['field'] .' DESC ';
                    //$sql = 'select * from coupon where itemId in ( select itemId from ( select DISTINCT(itemId) from coupon where amount > 0 AND '. $defaultField .' = '. $defaultCatId .' ORDER BY '. $sortType['field'] .' DESC limit 0 , 400 ) as ss  ) GROUP BY itemId ';
                   
                    $results = Db::query($sql);
                    if (!empty($results))
                    {
                        $temp = [];
                        $cachePage = 0;
                        $i = 0;
                        $nowItem = 0;
                        $count = count($results);
                        foreach ($results as $k => $list)
                        {
                            $temp[] = $list;
                            $nowItem ++;
                            $i++; 
                            /** 数据按页码大小写入缓存 */
                            if($i % $pageSize == 0 || $nowItem == $count)
                            {
                                $this -> redis -> hSet($this -> catKey . ':' . $defaultCatId , $sortType['field'] . ':' . $cachePage , json_encode($temp));
                                /** 数据清空 */
                                $temp = [];
                                $cachePage ++;
                            }
                            /** 设置缓存时间 */
                            if($this -> redis -> exists($this -> catKey . ':' . $defaultCatId))
                            {
                                $this -> redis -> expire($this -> catKey. ':' . $defaultCatId , 3600 * 3);
                            }
                        }

                        $cacheJsonResults = $this -> redis -> hGet($this -> catKey . ":" . $defaultCatId , $sortType['field'] . ':' . $nowPage );
                        if(!empty($cacheJsonResults))
                        {
                            $results = json_decode($cacheJsonResults , true);
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
                        $info['results'] = [];
                    }
                }
            }
            else // 分类无效
            {
                $info['status'] = 0;
                $info['results'] = [];
            }
        }
        else
        {
            $info['status'] = 0;
            $info['results'] = [];
        }
        echo json_encode($info);
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

}