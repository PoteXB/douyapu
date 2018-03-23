<?php
/**
 * Created by PhpStorm.
 * User: monkeying
 * Date: 2017/7/21
 * Time: 18:09
 */
namespace app\coupon\controller;

use app\api\controller\Common;
use think\Db;

class Search extends Common
{
    /** redis存放当前关键字总记录条数 KEY */
    protected $cacheCount = 'search-count';

    /** redis存放当前关键字搜索之后的JSON格式数据前缀 KEY */
    protected $cacheSearch = 'search-pc';

    public function index()
    {
        return $this -> fetch();
    }

    public function items()
    {
        header("Access-Control-Allow-Origin: *");
        /** 搜索关键字 */
        $searchVal = trim(input('post.searchVal'));
        /** 返送记录条数 */
        $pageSize = 8;
        /** 页码 */
        $nowPage = input('post.page') ? input('post.page') : 1;
        /** 排序方式 */
        $sort = 1;
        if(request() -> isPost())
        {
            if(isset($searchVal) && !empty($searchVal) && is_numeric($nowPage) && $nowPage >= 1)
            {
                $searchVal = escapeStr($searchVal);
                /** 1:redis 默认组合方式 [排序] */
                $redisPrefix = $sort;

                /** 2 :模糊匹配 [关键字] */
                $redisPrefix .= ':' . $searchVal;
                $map = [];
                $map['title'] = ['like' , '%'. $searchVal .'%'];
                $map['unix_timestamp(effectiveEndTime)'] = ['>' , time()];
                $map['amount'] = ['>' , 0];
                $count = Db::name('coupon') -> where($map) -> count();

                /** 判断当前页码是否有效 */
//                $countPage = ceil($count / $pageSize);
//                if($nowPage > $countPage && 1 != $nowPage)
//                {
//                    $nowPage = $countPage;
//                }
                /** 3:[页码] */
                $redisPrefix .= ':' . $nowPage;

                /** 判断redis是否存在搜索的数据 */
                $redResults = $this -> redis -> hGet($this -> cacheSearch , $redisPrefix);
                $redCount = $this -> redis -> get($this -> cacheCount . ':' . $searchVal);

                if(!empty($redResults) && $redCount > 0)
                {
                    $info['status'] = 1;
                    $info['count'] = $redCount;
                    $info['results'] = json_decode($redResults , true);
                }
                else
                {
                    $results = Db::name('coupon') -> field(' id , itemId , catId , discountRate , type , item ') -> where($map)
                        -> group('itemId') -> order(' id DESC ') -> limit(($nowPage - 1) * $pageSize , $pageSize) -> select();

                    if(count($results) > 0)
                    {
                        $info['status'] = 1;
                        $info['count'] = $count;
                        $info['results'] = $results;

                        /** 数据写入redis */
                        /** 数据写入redis */

                        /** a: 写入总记录数 */
                        $this -> redis -> set($this -> cacheCount . ':' . $searchVal , $count);
                        /** 设置时效：单位秒 [1小时]*/
                        $this -> redis -> expire($this -> cacheCount . ':' . $searchVal , 300);

                        /** b: 写入搜索记录 */
                        $this -> redis -> hset($this -> cacheSearch , $redisPrefix , json_encode($results));
                        /** 设置时效：单位秒 [1小时]*/
                        $this -> redis -> expire($this -> cacheSearch , 300);
                    }
                    else
                    {
                        $info['status'] = 0;
                        $info['results'] = [];
                    }
                }
            }
            else
            {
                $info['status'] = 0;
            }
        }
        else
        {
            $info['status'] = 0;
            $info['message'] = '操作失败';
        }
        return json_encode($info);
    }
}