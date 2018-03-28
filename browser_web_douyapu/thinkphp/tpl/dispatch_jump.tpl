{__NOLAYOUT__}<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>跳转提示</title>
    <style type="text/css">
        *{ padding: 0; margin: 0; }
        body{ background: #fff; font-family: "Microsoft Yahei","Helvetica Neue",Helvetica,Arial,sans-serif; color:#999; font-size: 14px; }
        .system-message{ padding: 120px 0 0 0; }
        .system-message div{width:420px;margin: 0 auto;position: relative; -moz-box-shadow:2px 2px 5px #f2f2f2;-webkit-box-shadow:2px 2px 5px #f2f2f2;box-shadow:2px 2px 5px #f2f2f2;border-radius:10px;}
        .system-message h1{ font-size: 100px; font-weight: normal; line-height: 120px; margin-bottom: 12px; }
        .system-message .jump{position: absolute;top:355px;left: 95px;}
        .system-message .jump a{ color: #999; }
        .system-message .success,.system-message .error{ line-height: 1.8em; font-size: 36px; }
        .system-message .detail{ font-size: 12px; line-height: 20px; margin-top: 12px; display: none; }
    </style>
</head>
<body>
    <div class="system-message">
    	<div>
        <?php switch ($code) {?>
        <?php case 1:?>
            <img src="/public/static/img/login_success.png" alt="" />
        <?php break;?>
        <?php case 0:?>
             <img src="/public/static/img/login_error.png" alt="" />
        <?php break;?>
        <?php } ?>
        <p class="jump">页面将自动为您 <a id="href" href="<?php echo($url);?>">跳转</a> 等待时间： <b id="wait"><?php echo($wait);?></b>秒</p>
		</div>       
    </div>
    <script type="text/javascript">
        (function(){
            var wait = document.getElementById('wait'),
                href = document.getElementById('href').href;
                console.log(href);
            var interval = setInterval(function(){
                var time = --wait.innerHTML;
                if(time <= 0) {
                    location.href = href;
                    clearInterval(interval);
                };
            }, 1000);
        })();
    </script>
</body>
</html>
