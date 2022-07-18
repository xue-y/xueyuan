<?php
/**
 * Created by PhpStorm.
 * User: Think
 * Date: 2022/7/4
 * Time: 13:44
 * 英语学园 请求接口
 */

namespace app\api\controller;


use app\common\controller\Api;
use think\Db;
use think\Exception;


class XueYuan extends Api
{
	// 无值的话为当前控制器下所有方法的前置方法
	protected $beforeActionList = [
		'valiToken',
	];
	// 登录身份验证
	public function valiToken(){
		// 判断访问来源
		// 判断token 是否存在，不存在，自动获取，如果获取失败，非法用户
	}
	// 获取token
	public function getToken(){
		// 用户名、密码 + 秘钥、算法= token
		// 服务器上生成token，返回本地用户 uid(单独生成),token ，每次请求数据uid+token 判断是否合法
	}

    // 获取导航数据
    public function getYingyuNav(){
        $nav_table='xueyuan_yingyu_nav';
       try{
           $id=request()->post('pid/d');
           if(empty($id)){
               $data=Db::table($nav_table)->field('id,name,desc')->select();

           }else{
               $data=Db::table($nav_table)->where('pid',$id)->field('id,name,desc')->select();
           }
           $this->success('',$data,1);
       }catch (Exception $e){
           $this->error($e->getMessage(),[],0);
       }
    }

    // 获取一级导航
    public function getYingyuType(){
        try{
            $nav_table='xueyuan_yingyu_nav';
            $data=Db::table($nav_table)->where('pid',0)->field('id,name,type')->select();
            $this->success('',$data,1);
        }catch (Exception $e){
            $this->error($e->getMessage(),[],0);
        }
    }

    // 获取指定章节下所有的版块
    public function getYingyuArcCard(){
        $card_table='xueyuan_yingyu_card';
        try{
            $id=request()->post('nid/d');
            if(empty($id)){
                $this->error('文章id参数不得为空');
            }else{
                $data=Db::table($card_table)->where('nid',$id)->field('id,title')->order(['order','id'])->select();
            }
            $this->success('',$data);
        }catch (Exception $e){
            $this->error($e->getMessage());
        }
    }

    // 获取章节中指定版块的知识点，复习要点、题型、题目
    public function getYingyuCard(){
        $card_table='xueyuan_yingyu_card';
        $tixing_table="xueyuan_yingyu_tixing";
        $timu_table="xueyuan_yingyu_timu";
        $id=request()->post('cid/d'); //xueyuan_yingyu_arc 取得指定版块
        if(empty($id)){
            $this->error('文章版块id参数不得为空');
        }
        try{
            $card['contentData']=Db::table($card_table)->where('id',$id)->field('title,desc,zhishidian,fuxierror,fuxistrong')->order(['order','id'])->find();
            // 取得题型
            $card['tixing']=Db::table($tixing_table)->where('cid',$id)->field('id,type,act')->order(['order','id'])->select();
            $i=0;
            foreach ($card['tixing'] as $k=>$v){
                $card['tixing'][$i]['timu']=Db::table($timu_table)->where('tid',$v['id'])->field('tid',true)->order(['order','id'])->select();
                $i++;
            }
            $this->success('',$card);
        }catch (Exception $e){
            $this->error($e->getMessage());
        }
    }
	
	// 获取列表文章
	 public function getYingyuListArc(){
		 $arc_table='xueyuan_yingyu_arc'; 
		 $id=request()->post('nid/d'); //xueyuan_yingyu_arc 取得指定版块
		 $limit=request()->post('limit/d',10);
        if(empty($id)){
            $this->error('栏目id参数不得为空');
        }
        try{
			 $data=Db::table($arc_table)->where('nid',$id)->field('id,title')->order('order')->limit($limit)->select();
			 $this->success('',$data);
		}catch (Exception $e){
            $this->error($e->getMessage());
        }
	 }

}