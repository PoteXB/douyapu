<?php
// if($_SERVER['HTTP_REFERER']==NULL){
// 	echo "错误请求！";
// 	exit();
// }
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
	<title>豆芽铺</title>
	<link rel="short icon" href="https://www.douyapu.com/favicon.ico">
	<link rel="stylesheet" type="text/css" href="/public/static/css/common.css">
	<script type="text/javascript" src="/public/static/js/jquery-1.10.2.min.js"></script>
</head>
<body class="uninstall-bg">
    <div id="uninstall">
        <div class="uninstall-logo"><img src="https://www.douyapu.com/public/static/img/min-logo.png" alt="" /></div>
        <h1 class="uninstall-title">豆芽铺期待您下一次的大驾光临</h1>
         <div class="uninstall-box-title">
                <p><span id="msg-title">直接反馈 :</span>您在使用豆芽购物助手遇到的相关问题,请联系客服反馈。
                	<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1544327536&site=qq&menu=yes">
                		<img border="0" src="public/static/img/guanwangzaixian.png" alt="点击这里给我发消息" title="点击这里给我发消息"/>
                	</a>
                </p>
        </div>
        <div class="uninstall-box">
           
            <div class="uninstall-check-box">
                <form action="die_submit" method="POST" accept-charset="utf-8">
                	<div class="detile_msg">
                		<div class="detile_msgtitle pull-left">
                            <span id="msg-title">具体意见描述 :</span>
                        </div>
                        <div class="detile_msginput pull-left">
                            <textarea type="text" id="uninstall-feedback" name="other-text"></textarea>
                        </div>
                	</div>
                    <div class="uninstall-check-list">
                    	<div class="detile_msg_title pull-left">
                            <span id="msg-title">意见反馈 :</span>
                        </div>
                        <ul>
                    	 	<li class="fc">
                                <input name="box" type="checkbox" data-type="1" />
                                <span>启动时报错</span>
                            </li>
                            <li>
                                <input name="box" type="checkbox" data-type="2" />
                                <span>无法加载/加载很慢</span>
                            </li>
                            <li > 
                                <input name="box" type="checkbox" data-type="3" />
                                <span>智能筛选不准确</span>
                            </li>
                            <li class="fc">
                                <input name="box" type="checkbox" data-type="4" />
                                <span>价格趋势不准确</span>
                            </li>
                            <li>
                                <input name="box" type="checkbox" data-type="5" />
                                <span>查不到优惠券</span>
                            </li>
                            <li>
                                <input name="box" type="checkbox" data-type="6" />
                                <span>干扰购物</span>
                            </li>
                            <li class="fc">
                                <input name="box" type="checkbox" data-type="7" />
                                <span>没有我想要的功能</span>
                            </li>
                            <li>
                                <input name="box" type="checkbox" data-type="8" />
                                <span>其他</span>
                            </li>
                        </ul>
                    </div>
                    <div class="uninstall-feedback-box clear">
                         <div class=" pull-left">
                            <span id="msg-title">联系方式 :</span>
                        </div>
                        <div class="uninstall-feedback-text pull-left">
                            <input type="text" id="uninstall-feedbacks" name="other-text" placeholder="请输入您的QQ或邮箱"></textarea>
                        </div>
                    </div>
                     <div class="uninstall-feedback-box clear">
                         <div class=" pull-left">
                            <span id="msg-title">商品地址 :</span>
                        </div>
                        <div class="uninstall-feedback-text pull-left">
                            <input type="text" id="uninstall-product-address" name="other-text" placeholder="填写商品地址能便于我们第一时定位到您反馈的问题~"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="bottom-box">
            <button class="uninstall-close-btn">后会有期</button>
        </div>
    </div>
	<script type="text/javascript">
		<?php
		$url = 'http://apicrx.douyapu.com/uninstall.php';
		$cid = isset($_GET['cid']) ? $_GET['cid'] : ''; 
		$uf = isset($_COOKIE["uf"]) ? $_COOKIE["uf"] : '';
		if(!empty($cid) && $cid != $uf){ 
			$type = $_GET['type'];
			$data['cid'] = trim($cid);
			$data['type'] = trim($type);
			$ch = curl_init();
			curl_setopt($ch,CURLOPT_URL,$url);
			curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
			curl_setopt($ch,CURLOPT_HEADER,1);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			$data = curl_exec($ch);
			curl_close($ch);
			setcookie("uf",$cid); 
		}
		?>
		document.getElementsByClassName("uninstall-close-btn")[0].onclick = function() 
		{
			var str=document.getElementsByName("box");
			var objarray=str.length;
			var option="";
			var desc="";
			var contact="";
			var Address="";
			var BrUA="";
			for (i=0;i<objarray;i++)
			{
			 if(str[i].checked == true)
			 {
			  option+=str[i].getAttribute("data-type")+",";
			 }
			}
			desc=document.getElementById("uninstall-feedback").value;
			contact=document.getElementById("uninstall-feedbacks").value;
			Address=document.getElementById("uninstall-product-address").value;
			BrUA=window.navigator.userAgent;
			if(!contact){
				alert("请填写您的联系方式");
			}
			$.ajax({
				type:"post",
				url:"http://www.douyapu.com/index/feedback/submit",
				async:true,
				data:{option:option,desc:desc,contact:contact,address:Address,ua:BrUA,type:1},
				success:function(res){
					res=JSON.parse(res);
					if(res.status==1){
						alert("感谢您的反馈");
						window.close();
					}else{
						alert(res.msg);
					}
				}
			});						
			
		}
		// setTimeout(function() {
		// 	window.close();
		// }, 3000);
	</script>
</body>
</html>
