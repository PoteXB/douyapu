if (document.body.getAttribute('libSign2018625') != 1) {
    document.body.setAttribute('libSign2018625','1');
    (function (e,t) {
        var n,r,i = typeof t,o = e.location,a = e.document,s = a.documentElement,l = e.jQuery,u = e.$,c = {},p = [],f = "1.10.2",d = p.concat,h = p.push,g = p.slice,m = p.indexOf,y = c.toString,v = c.hasOwnProperty,b = f.trim,x = function (e,t) {return new x.fn.init(e,t,r)},w = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T = /\S+/g,C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,E = /^[\],:{}\s]*$/,S = /(?:^|:|,)(?:\s*\[)+/g,A = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D = /^-ms-/,L = /-([\da-z])/gi,H = function (e,t) {return t.toUpperCase()},q = function (e) {(a.addEventListener || "load" === e.type || "complete" === a.readyState) && (_(), x.ready())},_ = function () {a.addEventListener ? (a.removeEventListener("DOMContentLoaded",q,!1), e.removeEventListener("load",q,!1)) : (a.detachEvent("onreadystatechange",q), e.detachEvent("onload",q))};
        x.fn = x.prototype = {
            jquery:f,constructor:x,init:function (e,n,r) {
                var i,o;
                if (!e)return this;
                if ("string" == typeof e) {
                    if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null,e,null] : N.exec(e), !i || !i[1] && n)return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                    if (i[1]) {
                        if (n = n instanceof x ? n[0] : n, x.merge(this,x.parseHTML(i[1],n && n.nodeType ? n.ownerDocument || n : a,!0)), k.test(i[1]) && x.isPlainObject(n))for (i in n)x.isFunction(this[i]) ? this[i](n[i]) : this.attr(i,n[i]);
                        return this
                    }
                    if (o = a.getElementById(i[2]), o && o.parentNode) {
                        if (o.id !== i[2])return r.find(e);
                        this.length = 1, this[0] = o
                    }
                    return this.context = a, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), x.makeArray(e,this))
            },selector:"",length:0,toArray:function () {return g.call(this)},get:function (e) {return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]},pushStack:function (e) {
                var t = x.merge(this.constructor(),e);
                return t.prevObject = this, t.context = this.context, t
            },each:function (e,t) {return x.each(this,e,t)},ready:function (e) {return x.ready.promise().done(e), this},slice:function () {return this.pushStack(g.apply(this,arguments))},first:function () {return this.eq(0)},last:function () {return this.eq(-1)},eq:function (e) {
                var t = this.length,n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            },map:function (e) {return this.pushStack(x.map(this,function (t,n) {return e.call(t,n,t)}))},end:function () {return this.prevObject || this.constructor(null)},push:h,sort:[].sort,splice:[].splice
        }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function () {
            var e,n,r,i,o,a,s = arguments[0] || {},l = 1,u = arguments.length,c = !1;
            for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === l && (s = this, --l); u > l; l++)if (null != (o = arguments[l]))for (i in o)e = s[i], r = o[i], s !== r && (c && r && (x.isPlainObject(r) || (n = x.isArray(r))) ? (n ? (n = !1, a = e && x.isArray(e) ? e : []) : a = e && x.isPlainObject(e) ? e : {}, s[i] = x.extend(c,a,r)) : r !== t && (s[i] = r));
            return s
        }, x.extend({
            expando:"jQuery" + (f + Math.random()).replace(/\D/g,""),noConflict:function (t) {return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = l), x},isReady:!1,readyWait:1,holdReady:function (e) {e ? x.readyWait++ : x.ready(!0)},ready:function (e) {
                if (e === !0 ? !--x.readyWait : !x.isReady) {
                    if (!a.body)return setTimeout(x.ready);
                    x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(a,[x]), x.fn.trigger && x(a).trigger("ready").off("ready"))
                }
            },isFunction:function (e) {return "function" === x.type(e)},isArray:Array.isArray || function (e) {return "array" === x.type(e)},isWindow:function (e) {return null != e && e == e.window},isNumeric:function (e) {return !isNaN(parseFloat(e)) && isFinite(e)},type:function (e) {return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[y.call(e)] || "object" : typeof e},isPlainObject:function (e) {
                var n;
                if (!e || "object" !== x.type(e) || e.nodeType || x.isWindow(e))return !1;
                try {if (e.constructor && !v.call(e,"constructor") && !v.call(e.constructor.prototype,"isPrototypeOf"))return !1} catch (r) {return !1}
                if (x.support.ownLast)for (n in e)return v.call(e,n);
                for (n in e);
                return n === t || v.call(e,n)
            },isEmptyObject:function (e) {
                var t;
                for (t in e)return !1;
                return !0
            },error:function (e) {throw Error(e)},parseHTML:function (e,t,n) {
                if (!e || "string" != typeof e)return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || a;
                var r = k.exec(e),i = !n && [];
                return r ? [t.createElement(r[1])] : (r = x.buildFragment([e],t,i), i && x(i).remove(), x.merge([],r.childNodes))
            },parseJSON:function (n) {return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = x.trim(n), n && E.test(n.replace(A,"@").replace(j,"]").replace(S,""))) ? Function("return " + n)() : (x.error("Invalid JSON: " + n), t)},parseXML:function (n) {
                var r,i;
                if (!n || "string" != typeof n)return null;
                try {e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n,"text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))} catch (o) {r = t}
                return r && r.documentElement && !r.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + n), r
            },noop:function () {},globalEval:function (t) {t && x.trim(t) && (e.execScript || function (t) {e.eval.call(e,t)})(t)},camelCase:function (e) {return e.replace(D,"ms-").replace(L,H)},nodeName:function (e,t) {return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()},each:function (e,t,n) {
                var r,i = 0,o = e.length,a = M(e);
                if (n) {if (a) {for (; o > i; i++)if (r = t.apply(e[i],n), r === !1)break} else for (i in e)if (r = t.apply(e[i],n), r === !1)break} else if (a) {for (; o > i; i++)if (r = t.call(e[i],i,e[i]), r === !1)break} else for (i in e)if (r = t.call(e[i],i,e[i]), r === !1)break;
                return e
            },trim:b && !b.call("\ufeff\u00a0") ? function (e) {return null == e ? "" : b.call(e)} : function (e) {return null == e ? "" : (e + "").replace(C,"")},makeArray:function (e,t) {
                var n = t || [];
                return null != e && (M(Object(e)) ? x.merge(n,"string" == typeof e ? [e] : e) : h.call(n,e)), n
            },inArray:function (e,t,n) {
                var r;
                if (t) {
                    if (m)return m.call(t,e,n);
                    for (r = t.length, n = n ? 0 > n ? Math.max(0,r + n) : n : 0; r > n; n++)if (n in t && t[n] === e)return n
                }
                return -1
            },merge:function (e,n) {
                var r = n.length,i = e.length,o = 0;
                if ("number" == typeof r)for (; r > o; o++)e[i++] = n[o]; else while (n[o] !== t)e[i++] = n[o++];
                return e.length = i, e
            },grep:function (e,t,n) {
                var r,i = [],o = 0,a = e.length;
                for (n = !!n; a > o; o++)r = !!t(e[o],o), n !== r && i.push(e[o]);
                return i
            },map:function (e,t,n) {
                var r,i = 0,o = e.length,a = M(e),s = [];
                if (a)for (; o > i; i++)r = t(e[i],i,n), null != r && (s[s.length] = r); else for (i in e)r = t(e[i],i,n), null != r && (s[s.length] = r);
                return d.apply([],s)
            },guid:1,proxy:function (e,n) {
                var r,i,o;
                return "string" == typeof n && (o = e[n], n = e, e = o), x.isFunction(e) ? (r = g.call(arguments,2), i = function () {return e.apply(n || this,r.concat(g.call(arguments)))}, i.guid = e.guid = e.guid || x.guid++, i) : t
            },access:function (e,n,r,i,o,a,s) {
                var l = 0,u = e.length,c = null == r;
                if ("object" === x.type(r)) {
                    o = !0;
                    for (l in r)x.access(e,n,l,r[l],!0,a,s)
                } else if (i !== t && (o = !0, x.isFunction(i) || (s = !0), c && (s ? (n.call(e,i), n = null) : (c = n, n = function (e,t,n) {return c.call(x(e),n)})), n))for (; u > l; l++)n(e[l],r,s ? i : i.call(e[l],l,n(e[l],r)));
                return o ? e : c ? n.call(e) : u ? n(e[0],r) : a
            },now:function () {return (new Date).getTime()},swap:function (e,t,n,r) {
                var i,o,a = {};
                for (o in t)a[o] = e.style[o], e.style[o] = t[o];
                i = n.apply(e,r || []);
                for (o in t)e.style[o] = a[o];
                return i
            }
        }), x.ready.promise = function (t) {
            if (!n)if (n = x.Deferred(), "complete" === a.readyState) setTimeout(x.ready); else if (a.addEventListener) a.addEventListener("DOMContentLoaded",q,!1), e.addEventListener("load",q,!1); else {
                a.attachEvent("onreadystatechange",q), e.attachEvent("onload",q);
                var r = !1;
                try {r = null == e.frameElement && a.documentElement} catch (i) {}
                r && r.doScroll && function o() {
                    if (!x.isReady) {
                        try {r.doScroll("left")} catch (e) {return setTimeout(o,50)}
                        _(), x.ready()
                    }
                }()
            }
            return n.promise(t)
        }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function (e,t) {c["[object " + t + "]"] = t.toLowerCase()});
        function M(e) {
            var t = e.length,n = x.type(e);
            return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }

        r = x(a), function (e,t) {
            var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b = "sizzle" + -new Date,w = e.document,T = 0,C = 0,N = st(),k = st(),E = st(),S = !1,A = function (e,t) {return e === t ? (S = !0, 0) : 0},j = typeof t,D = 1 << 31,L = {}.hasOwnProperty,H = [],q = H.pop,_ = H.push,M = H.push,O = H.slice,F = H.indexOf || function (e) {
                    var t = 0,n = this.length;
                    for (; n > t; t++)if (this[t] === e)return t;
                    return -1
                },B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P = "[\\x20\\t\\r\\n\\f]",R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W = R.replace("w","w#"),$ = "\\[" + P + "*(" + R + ")" + P + "*(?:([*^$|!~]?=)" + P + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + W + ")|)|)" + P + "*\\]",I = ":(" + R + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + $.replace(3,8) + ")*)|.*)\\)|)",z = RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$","g"),X = RegExp("^" + P + "*," + P + "*"),U = RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"),V = RegExp(P + "*[+~]"),Y = RegExp("=" + P + "*([^\\]'\"]*)" + P + "*\\]","g"),J = RegExp(I),G = RegExp("^" + W + "$"),Q = {ID:RegExp("^#(" + R + ")"),CLASS:RegExp("^\\.(" + R + ")"),TAG:RegExp("^(" + R.replace("w","w*") + ")"),ATTR:RegExp("^" + $),PSEUDO:RegExp("^" + I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)","i"),bool:RegExp("^(?:" + B + ")$","i"),needsContext:RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)","i")},K = /^[^{]+\{\s*\[native \w/,Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et = /^(?:input|select|textarea|button)$/i,tt = /^h\d$/i,nt = /'|\\/g,rt = RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)","ig"),it = function (e,t,n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10,56320 | 1023 & r)
            };
            try {M.apply(H = O.call(w.childNodes),w.childNodes), H[w.childNodes.length].nodeType} catch (ot) {
                M = {
                    apply:H.length ? function (e,t) {_.apply(e,O.call(t))} : function (e,t) {
                        var n = e.length,r = 0;
                        while (e[n++] = t[r++]);
                        e.length = n - 1
                    }
                }
            }
            function at(e,t,n,i) {
                var o,a,s,l,u,c,d,m,y,x;
                if ((t ? t.ownerDocument || t : w) !== f && p(t), t = t || f, n = n || [], !e || "string" != typeof e)return n;
                if (1 !== (l = t.nodeType) && 9 !== l)return [];
                if (h && !i) {
                    if (o = Z.exec(e))if (s = o[1]) {
                        if (9 === l) {
                            if (a = t.getElementById(s), !a || !a.parentNode)return n;
                            if (a.id === s)return n.push(a), n
                        } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(s)) && v(t,a) && a.id === s)return n.push(a), n
                    } else {
                        if (o[2])return M.apply(n,t.getElementsByTagName(e)), n;
                        if ((s = o[3]) && r.getElementsByClassName && t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)), n
                    }
                    if (r.qsa && (!g || !g.test(e))) {
                        if (m = d = b, y = t, x = 9 === l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) {
                            c = mt(e), (d = t.getAttribute("id")) ? m = d.replace(nt,"\\$&") : t.setAttribute("id",m), m = "[id='" + m + "'] ", u = c.length;
                            while (u--)c[u] = m + yt(c[u]);
                            y = V.test(e) && t.parentNode || t, x = c.join(",")
                        }
                        if (x)try {return M.apply(n,y.querySelectorAll(x)), n} catch (T) {} finally {d || t.removeAttribute("id")}
                    }
                }
                return kt(e.replace(z,"$1"),t,n,i)
            }

            function st() {
                var e = [];

                function t(n,r) {return e.push(n += " ") > o.cacheLength && delete t[e.shift()], t[n] = r}

                return t
            }

            function lt(e) {return e[b] = !0, e}

            function ut(e) {
                var t = f.createElement("div");
                try {return !!e(t)} catch (n) {return !1} finally {t.parentNode && t.parentNode.removeChild(t), t = null}
            }

            function ct(e,t) {
                var n = e.split("|"),r = e.length;
                while (r--)o.attrHandle[n[r]] = t
            }

            function pt(e,t) {
                var n = t && e,r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D);
                if (r)return r;
                if (n)while (n = n.nextSibling)if (n === t)return -1;
                return e ? 1 : -1
            }

            function ft(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function dt(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function ht(e) {
                return lt(function (t) {
                    return t = +t, lt(function (n,r) {
                        var i,o = e([],n.length,t),a = o.length;
                        while (a--)n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            s = at.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, r = at.support = {}, p = at.setDocument = function (e) {
                var n = e ? e.ownerDocument || e : w,i = n.defaultView;
                return n !== f && 9 === n.nodeType && n.documentElement ? (f = n, d = n.documentElement, h = !s(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload",function () {p()}), r.attributes = ut(function (e) {return e.className = "i", !e.getAttribute("className")}), r.getElementsByTagName = ut(function (e) {return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length}), r.getElementsByClassName = ut(function (e) {return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length}), r.getById = ut(function (e) {return d.appendChild(e).id = b, !n.getElementsByName || !n.getElementsByName(b).length}), r.getById ? (o.find.ID = function (e,t) {
                    if (typeof t.getElementById !== j && h) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, o.filter.ID = function (e) {
                    var t = e.replace(rt,it);
                    return function (e) {return e.getAttribute("id") === t}
                }) : (delete o.find.ID, o.filter.ID = function (e) {
                    var t = e.replace(rt,it);
                    return function (e) {
                        var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), o.find.TAG = r.getElementsByTagName ? function (e,n) {return typeof n.getElementsByTagName !== j ? n.getElementsByTagName(e) : t} : function (e,t) {
                    var n,r = [],i = 0,o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        while (n = o[i++])1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, o.find.CLASS = r.getElementsByClassName && function (e,n) {return typeof n.getElementsByClassName !== j && h ? n.getElementsByClassName(e) : t}, m = [], g = [], (r.qsa = K.test(n.querySelectorAll)) && (ut(function (e) {e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + B + ")"), e.querySelectorAll(":checked").length || g.push(":checked")}), ut(function (e) {
                    var t = n.createElement("input");
                    t.setAttribute("type","hidden"), e.appendChild(t).setAttribute("t",""), e.querySelectorAll("[t^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || g.push(":enabled",":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:")
                })), (r.matchesSelector = K.test(y = d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ut(function (e) {r.disconnectedMatch = y.call(e,"div"), y.call(e,"[s!='']:x"), m.push("!=",I)}), g = g.length && RegExp(g.join("|")), m = m.length && RegExp(m.join("|")), v = K.test(d.contains) || d.compareDocumentPosition ? function (e,t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function (e,t) {
                    if (t)while (t = t.parentNode)if (t === e)return !0;
                    return !1
                }, A = d.compareDocumentPosition ? function (e,t) {
                    if (e === t)return S = !0, 0;
                    var i = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
                    return i ? 1 & i || !r.sortDetached && t.compareDocumentPosition(e) === i ? e === n || v(w,e) ? -1 : t === n || v(w,t) ? 1 : c ? F.call(c,e) - F.call(c,t) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                } : function (e,t) {
                    var r,i = 0,o = e.parentNode,a = t.parentNode,s = [e],l = [t];
                    if (e === t)return S = !0, 0;
                    if (!o || !a)return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : c ? F.call(c,e) - F.call(c,t) : 0;
                    if (o === a)return pt(e,t);
                    r = e;
                    while (r = r.parentNode)s.unshift(r);
                    r = t;
                    while (r = r.parentNode)l.unshift(r);
                    while (s[i] === l[i])i++;
                    return i ? pt(s[i],l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0
                }, n) : f
            }, at.matches = function (e,t) {return at(e,null,null,t)}, at.matchesSelector = function (e,t) {
                if ((e.ownerDocument || e) !== f && p(e), t = t.replace(Y,"='$1']"), !(!r.matchesSelector || !h || m && m.test(t) || g && g.test(t)))try {
                    var n = y.call(e,t);
                    if (n || r.disconnectedMatch || e.document && 11 !== e.document.nodeType)return n
                } catch (i) {}
                return at(t,f,null,[e]).length > 0
            }, at.contains = function (e,t) {return (e.ownerDocument || e) !== f && p(e), v(e,t)}, at.attr = function (e,n) {
                (e.ownerDocument || e) !== f && p(e);
                var i = o.attrHandle[n.toLowerCase()],a = i && L.call(o.attrHandle,n.toLowerCase()) ? i(e,n,!h) : t;
                return a === t ? r.attributes || !h ? e.getAttribute(n) : (a = e.getAttributeNode(n)) && a.specified ? a.value : null : a
            }, at.error = function (e) {throw Error("Syntax error, unrecognized expression: " + e)}, at.uniqueSort = function (e) {
                var t,n = [],i = 0,o = 0;
                if (S = !r.detectDuplicates, c = !r.sortStable && e.slice(0), e.sort(A), S) {
                    while (t = e[o++])t === e[o] && (i = n.push(o));
                    while (i--)e.splice(n[i],1)
                }
                return e
            }, a = at.getText = function (e) {
                var t,n = "",r = 0,i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent)return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)n += a(e)
                    } else if (3 === i || 4 === i)return e.nodeValue
                } else for (; t = e[r]; r++)n += a(t);
                return n
            }, o = at.selectors = {
                cacheLength:50,createPseudo:lt,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{
                    ATTR:function (e) {return e[1] = e[1].replace(rt,it), e[3] = (e[4] || e[5] || "").replace(rt,it), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0,4)},CHILD:function (e) {return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0,3) ? (e[3] || at.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && at.error(e[0]), e},PSEUDO:function (e) {
                        var n,r = !e[5] && e[2];
                        return Q.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && J.test(r) && (n = mt(r,!0)) && (n = r.indexOf(")",r.length - n) - r.length) && (e[0] = e[0].slice(0,n), e[2] = r.slice(0,n)), e.slice(0,3))
                    }
                },filter:{
                    TAG:function (e) {
                        var t = e.replace(rt,it).toLowerCase();
                        return "*" === e ? function () {return !0} : function (e) {return e.nodeName && e.nodeName.toLowerCase() === t}
                    },CLASS:function (e) {
                        var t = N[e + " "];
                        return t || (t = RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && N(e,function (e) {return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "")})
                    },ATTR:function (e,t,n) {
                        return function (r) {
                            var i = at.attr(r,e);
                            return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0,n.length + 1) === n + "-" : !1) : !0
                        }
                    },CHILD:function (e,t,n,r,i) {
                        var o = "nth" !== e.slice(0,3),a = "last" !== e.slice(-4),s = "of-type" === t;
                        return 1 === r && 0 === i ? function (e) {return !!e.parentNode} : function (t,n,l) {
                            var u,c,p,f,d,h,g = o !== a ? "nextSibling" : "previousSibling",m = t.parentNode,y = s && t.nodeName.toLowerCase(),v = !l && !s;
                            if (m) {
                                if (o) {
                                    while (g) {
                                        p = t;
                                        while (p = p[g])if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType)return !1;
                                        h = g = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [a ? m.firstChild : m.lastChild], a && v) {
                                    c = m[b] || (m[b] = {}), u = c[e] || [], d = u[0] === T && u[1], f = u[0] === T && u[2], p = d && m.childNodes[d];
                                    while (p = ++d && p && p[g] || (f = d = 0) || h.pop())if (1 === p.nodeType && ++f && p === t) {
                                        c[e] = [T,d,f];
                                        break
                                    }
                                } else if (v && (u = (t[b] || (t[b] = {}))[e]) && u[0] === T) f = u[1]; else while (p = ++d && p && p[g] || (f = d = 0) || h.pop())if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[b] || (p[b] = {}))[e] = [T,f]), p === t))break;
                                return f -= i, f === r || 0 === f % r && f / r >= 0
                            }
                        }
                    },PSEUDO:function (e,t) {
                        var n,r = o.pseudos[e] || o.setFilters[e.toLowerCase()] || at.error("unsupported pseudo: " + e);
                        return r[b] ? r(t) : r.length > 1 ? (n = [e,e,"",t], o.setFilters.hasOwnProperty(e.toLowerCase()) ? lt(function (e,n) {
                            var i,o = r(e,t),a = o.length;
                            while (a--)i = F.call(e,o[a]), e[i] = !(n[i] = o[a])
                        }) : function (e) {return r(e,0,n)}) : r
                    }
                },pseudos:{
                    not:lt(function (e) {
                        var t = [],n = [],r = l(e.replace(z,"$1"));
                        return r[b] ? lt(function (e,t,n,i) {
                            var o,a = r(e,null,i,[]),s = e.length;
                            while (s--)(o = a[s]) && (e[s] = !(t[s] = o))
                        }) : function (e,i,o) {return t[0] = e, r(t,null,o,n), !n.pop()}
                    }),has:lt(function (e) {return function (t) {return at(e,t).length > 0}}),contains:lt(function (e) {return function (t) {return (t.textContent || t.innerText || a(t)).indexOf(e) > -1}}),lang:lt(function (e) {
                        return G.test(e || "") || at.error("unsupported lang: " + e), e = e.replace(rt,it).toLowerCase(), function (t) {
                            var n;
                            do if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                    }),target:function (t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },root:function (e) {return e === d},focus:function (e) {return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)},enabled:function (e) {return e.disabled === !1},disabled:function (e) {return e.disabled === !0},checked:function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },selected:function (e) {return e.parentNode && e.parentNode.selectedIndex, e.selected === !0},empty:function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType)return !1;
                        return !0
                    },parent:function (e) {return !o.pseudos.empty(e)},header:function (e) {return tt.test(e.nodeName)},input:function (e) {return et.test(e.nodeName)},button:function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },text:function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                    },first:ht(function () {return [0]}),last:ht(function (e,t) {return [t - 1]}),eq:ht(function (e,t,n) {return [0 > n ? n + t : n]}),even:ht(function (e,t) {
                        var n = 0;
                        for (; t > n; n += 2)e.push(n);
                        return e
                    }),odd:ht(function (e,t) {
                        var n = 1;
                        for (; t > n; n += 2)e.push(n);
                        return e
                    }),lt:ht(function (e,t,n) {
                        var r = 0 > n ? n + t : n;
                        for (; --r >= 0;)e.push(r);
                        return e
                    }),gt:ht(function (e,t,n) {
                        var r = 0 > n ? n + t : n;
                        for (; t > ++r;)e.push(r);
                        return e
                    })
                }
            }, o.pseudos.nth = o.pseudos.eq;
            for (n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n] = ft(n);
            for (n in{submit:!0,reset:!0})o.pseudos[n] = dt(n);
            function gt() {}

            gt.prototype = o.filters = o.pseudos, o.setFilters = new gt;
            function mt(e,t) {
                var n,r,i,a,s,l,u,c = k[e + " "];
                if (c)return t ? 0 : c.slice(0);
                s = e, l = [], u = o.preFilter;
                while (s) {
                    (!n || (r = X.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(i = [])), n = !1, (r = U.exec(s)) && (n = r.shift(), i.push({value:n,type:r[0].replace(z," ")}), s = s.slice(n.length));
                    for (a in o.filter)!(r = Q[a].exec(s)) || u[a] && !(r = u[a](r)) || (n = r.shift(), i.push({value:n,type:a,matches:r}), s = s.slice(n.length));
                    if (!n)break
                }
                return t ? s.length : s ? at.error(e) : k(e,l).slice(0)
            }

            function yt(e) {
                var t = 0,n = e.length,r = "";
                for (; n > t; t++)r += e[t].value;
                return r
            }

            function vt(e,t,n) {
                var r = t.dir,o = n && "parentNode" === r,a = C++;
                return t.first ? function (t,n,i) {while (t = t[r])if (1 === t.nodeType || o)return e(t,n,i)} : function (t,n,s) {
                    var l,u,c,p = T + " " + a;
                    if (s) {while (t = t[r])if ((1 === t.nodeType || o) && e(t,n,s))return !0} else while (t = t[r])if (1 === t.nodeType || o)if (c = t[b] || (t[b] = {}), (u = c[r]) && u[0] === p) {if ((l = u[1]) === !0 || l === i)return l === !0} else if (u = c[r] = [p], u[1] = e(t,n,s) || i, u[1] === !0)return !0
                }
            }

            function bt(e) {
                return e.length > 1 ? function (t,n,r) {
                    var i = e.length;
                    while (i--)if (!e[i](t,n,r))return !1;
                    return !0
                } : e[0]
            }

            function xt(e,t,n,r,i) {
                var o,a = [],s = 0,l = e.length,u = null != t;
                for (; l > s; s++)(o = e[s]) && (!n || n(o,r,i)) && (a.push(o), u && t.push(s));
                return a
            }

            function wt(e,t,n,r,i,o) {
                return r && !r[b] && (r = wt(r)), i && !i[b] && (i = wt(i,o)), lt(function (o,a,s,l) {
                    var u,c,p,f = [],d = [],h = a.length,g = o || Nt(t || "*",s.nodeType ? [s] : s,[]),m = !e || !o && t ? g : xt(g,f,e,s,l),y = n ? i || (o ? e : h || r) ? [] : a : m;
                    if (n && n(m,y,s,l), r) {
                        u = xt(y,d), r(u,[],s,l), c = u.length;
                        while (c--)(p = u[c]) && (y[d[c]] = !(m[d[c]] = p))
                    }
                    if (o) {
                        if (i || e) {
                            if (i) {
                                u = [], c = y.length;
                                while (c--)(p = y[c]) && u.push(m[c] = p);
                                i(null,y = [],u,l)
                            }
                            c = y.length;
                            while (c--)(p = y[c]) && (u = i ? F.call(o,p) : f[c]) > -1 && (o[u] = !(a[u] = p))
                        }
                    } else y = xt(y === a ? y.splice(h,y.length) : y), i ? i(null,a,y,l) : M.apply(a,y)
                })
            }

            function Tt(e) {
                var t,n,r,i = e.length,a = o.relative[e[0].type],s = a || o.relative[" "],l = a ? 1 : 0,c = vt(function (e) {return e === t},s,!0),p = vt(function (e) {return F.call(t,e) > -1},s,!0),f = [function (e,n,r) {return !a && (r || n !== u) || ((t = n).nodeType ? c(e,n,r) : p(e,n,r))}];
                for (; i > l; l++)if (n = o.relative[e[l].type]) f = [vt(bt(f),n)]; else {
                    if (n = o.filter[e[l].type].apply(null,e[l].matches), n[b]) {
                        for (r = ++l; i > r; r++)if (o.relative[e[r].type])break;
                        return wt(l > 1 && bt(f),l > 1 && yt(e.slice(0,l - 1).concat({value:" " === e[l - 2].type ? "*" : ""})).replace(z,"$1"),n,r > l && Tt(e.slice(l,r)),i > r && Tt(e = e.slice(r)),i > r && yt(e))
                    }
                    f.push(n)
                }
                return bt(f)
            }

            function Ct(e,t) {
                var n = 0,r = t.length > 0,a = e.length > 0,s = function (s,l,c,p,d) {
                    var h,g,m,y = [],v = 0,b = "0",x = s && [],w = null != d,C = u,N = s || a && o.find.TAG("*",d && l.parentNode || l),k = T += null == C ? 1 : Math.random() || .1;
                    for (w && (u = l !== f && l, i = n); null != (h = N[b]); b++) {
                        if (a && h) {
                            g = 0;
                            while (m = e[g++])if (m(h,l,c)) {
                                p.push(h);
                                break
                            }
                            w && (T = k, i = ++n)
                        }
                        r && ((h = !m && h) && v--, s && x.push(h))
                    }
                    if (v += b, r && b !== v) {
                        g = 0;
                        while (m = t[g++])m(x,y,l,c);
                        if (s) {
                            if (v > 0)while (b--)x[b] || y[b] || (y[b] = q.call(p));
                            y = xt(y)
                        }
                        M.apply(p,y), w && !s && y.length > 0 && v + t.length > 1 && at.uniqueSort(p)
                    }
                    return w && (T = k, u = C), x
                };
                return r ? lt(s) : s
            }

            l = at.compile = function (e,t) {
                var n,r = [],i = [],o = E[e + " "];
                if (!o) {
                    t || (t = mt(e)), n = t.length;
                    while (n--)o = Tt(t[n]), o[b] ? r.push(o) : i.push(o);
                    o = E(e,Ct(i,r))
                }
                return o
            };
            function Nt(e,t,n) {
                var r = 0,i = t.length;
                for (; i > r; r++)at(e,t[r],n);
                return n
            }

            function kt(e,t,n,i) {
                var a,s,u,c,p,f = mt(e);
                if (!i && 1 === f.length) {
                    if (s = f[0] = f[0].slice(0), s.length > 2 && "ID" === (u = s[0]).type && r.getById && 9 === t.nodeType && h && o.relative[s[1].type]) {
                        if (t = (o.find.ID(u.matches[0].replace(rt,it),t) || [])[0], !t)return n;
                        e = e.slice(s.shift().value.length)
                    }
                    a = Q.needsContext.test(e) ? 0 : s.length;
                    while (a--) {
                        if (u = s[a], o.relative[c = u.type])break;
                        if ((p = o.find[c]) && (i = p(u.matches[0].replace(rt,it),V.test(s[0].type) && t.parentNode || t))) {
                            if (s.splice(a,1), e = i.length && yt(s), !e)return M.apply(n,i), n;
                            break
                        }
                    }
                }
                return l(e,f)(i,t,!h,n,V.test(e)), n
            }

            r.sortStable = b.split("").sort(A).join("") === b, r.detectDuplicates = S, p(), r.sortDetached = ut(function (e) {return 1 & e.compareDocumentPosition(f.createElement("div"))}), ut(function (e) {return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")}) || ct("type|href|height|width",function (e,n,r) {return r ? t : e.getAttribute(n,"type" === n.toLowerCase() ? 1 : 2)}), r.attributes && ut(function (e) {return e.innerHTML = "<input/>", e.firstChild.setAttribute("value",""), "" === e.firstChild.getAttribute("value")}) || ct("value",function (e,n,r) {return r || "input" !== e.nodeName.toLowerCase() ? t : e.defaultValue}), ut(function (e) {return null == e.getAttribute("disabled")}) || ct(B,function (e,n,r) {
                var i;
                return r ? t : (i = e.getAttributeNode(n)) && i.specified ? i.value : e[n] === !0 ? n.toLowerCase() : null
            }), x.find = at, x.expr = at.selectors, x.expr[":"] = x.expr.pseudos, x.unique = at.uniqueSort, x.text = at.getText, x.isXMLDoc = at.isXML, x.contains = at.contains
        }(e);
        var O = {};

        function F(e) {
            var t = O[e] = {};
            return x.each(e.match(T) || [],function (e,n) {t[n] = !0}), t
        }

        x.Callbacks = function (e) {
            e = "string" == typeof e ? O[e] || F(e) : x.extend({},e);
            var n,r,i,o,a,s,l = [],u = !e.once && [],c = function (t) {
                for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = l.length, n = !0; l && o > a; a++)if (l[a].apply(t[0],t[1]) === !1 && e.stopOnFalse) {
                    r = !1;
                    break
                }
                n = !1, l && (u ? u.length && c(u.shift()) : r ? l = [] : p.disable())
            },p = {
                add:function () {
                    if (l) {
                        var t = l.length;
                        (function i(t) {
                            x.each(t,function (t,n) {
                                var r = x.type(n);
                                "function" === r ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== r && i(n)
                            })
                        })(arguments), n ? o = l.length : r && (s = t, c(r))
                    }
                    return this
                },remove:function () {
                    return l && x.each(arguments,function (e,t) {
                        var r;
                        while ((r = x.inArray(t,l,r)) > -1)l.splice(r,1), n && (o >= r && o--, a >= r && a--)
                    }), this
                },has:function (e) {return e ? x.inArray(e,l) > -1 : !(!l || !l.length)},empty:function () {return l = [], o = 0, this},disable:function () {return l = u = r = t, this},disabled:function () {return !l},lock:function () {return u = t, r || p.disable(), this},locked:function () {return !u},fireWith:function (e,t) {return !l || i && !u || (t = t || [], t = [e,t.slice ? t.slice() : t], n ? u.push(t) : c(t)), this},fire:function () {return p.fireWith(this,arguments), this},fired:function () {return !!i}
            };
            return p
        }, x.extend({
            Deferred:function (e) {
                var t = [["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n = "pending",r = {
                    state:function () {return n},always:function () {return i.done(arguments).fail(arguments), this},then:function () {
                        var e = arguments;
                        return x.Deferred(function (n) {
                            x.each(t,function (t,o) {
                                var a = o[0],s = x.isFunction(e[t]) && e[t];
                                i[o[1]](function () {
                                    var e = s && s.apply(this,arguments);
                                    e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this,s ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },promise:function (e) {return null != e ? x.extend(e,r) : r}
                },i = {};
                return r.pipe = r.then, x.each(t,function (e,o) {
                    var a = o[2],s = o[3];
                    r[o[1]] = a.add, s && a.add(function () {n = s},t[1 ^ e][2].disable,t[2][2].lock), i[o[0]] = function () {return i[o[0] + "With"](this === i ? r : this,arguments), this}, i[o[0] + "With"] = a.fireWith
                }), r.promise(i), e && e.call(i,i), i
            },when:function (e) {
                var t = 0,n = g.call(arguments),r = n.length,i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,o = 1 === i ? e : x.Deferred(),a = function (e,t,n) {return function (r) {t[e] = this, n[e] = arguments.length > 1 ? g.call(arguments) : r, n === s ? o.notifyWith(t,n) : --i || o.resolveWith(t,n)}},s,l,u;
                if (r > 1)for (s = Array(r), l = Array(r), u = Array(r); r > t; t++)n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)) : --i;
                return i || o.resolveWith(u,n), o.promise()
            }
        }), x.support = function (t) {
            var n,r,o,s,l,u,c,p,f,d = a.createElement("div");
            if (d.setAttribute("className","t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], r = d.getElementsByTagName("a")[0], !r || !r.style || !n.length)return t;
            s = a.createElement("select"), u = s.appendChild(a.createElement("option")), o = d.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !!d.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !!r.style.cssFloat, t.checkOn = !!o.value, t.optSelected = u.selected, t.enctype = !!a.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== a.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, o.checked = !0, t.noCloneChecked = o.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !u.disabled;
            try {delete d.test} catch (h) {t.deleteExpando = !1}
            o = a.createElement("input"), o.setAttribute("value",""), t.input = "" === o.getAttribute("value"), o.value = "t", o.setAttribute("type","radio"), t.radioValue = "t" === o.value, o.setAttribute("checked","t"), o.setAttribute("name","t"), l = a.createDocumentFragment(), l.appendChild(o), t.appendChecked = o.checked, t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick",function () {t.noCloneEvent = !1}), d.cloneNode(!0).click());
            for (f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c = "on" + f,"t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1;
            d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip;
            for (f in x(t))break;
            return t.ownLast = "0" !== f, x(function () {
                var n,r,o,s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l = a.getElementsByTagName("body")[0];
                l && (n = a.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", l.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = d.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === o[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", x.swap(l,null != l.style.zoom ? {zoom:1} : {},function () {t.boxSizing = 4 === d.offsetWidth}), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d,null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d,null) || {width:"4px"}).width, r = d.appendChild(a.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r,null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (l.style.zoom = 1)), l.removeChild(n), n = d = o = r = null)
            }), n = s = l = u = r = o = null, t
        }({});
        var B = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P = /([A-Z])/g;

        function R(e,n,r,i) {
            if (x.acceptData(e)) {
                var o,a,s = x.expando,l = e.nodeType,u = l ? x.cache : e,c = l ? e[s] : e[s] && s;
                if (c && u[c] && (i || u[c].data) || r !== t || "string" != typeof n)return c || (c = l ? e[s] = p.pop() || x.guid++ : s), u[c] || (u[c] = l ? {} : {toJSON:x.noop}), ("object" == typeof n || "function" == typeof n) && (i ? u[c] = x.extend(u[c],n) : u[c].data = x.extend(u[c].data,n)), a = u[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[x.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[x.camelCase(n)])) : o = a, o
            }
        }

        function W(e,t,n) {
            if (x.acceptData(e)) {
                var r,i,o = e.nodeType,a = o ? x.cache : e,s = o ? e[x.expando] : x.expando;
                if (a[s]) {
                    if (t && (r = n ? a[s] : a[s].data)) {
                        x.isArray(t) ? t = t.concat(x.map(t,x.camelCase)) : t in r ? t = [t] : (t = x.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                        while (i--)delete r[t[i]];
                        if (n ? !I(r) : !x.isEmptyObject(r))return
                    }
                    (n || (delete a[s].data, I(a[s]))) && (o ? x.cleanData([e],!0) : x.support.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
                }
            }
        }

        x.extend({
            cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function (e) {return e = e.nodeType ? x.cache[e[x.expando]] : e[x.expando], !!e && !I(e)},data:function (e,t,n) {return R(e,t,n)},removeData:function (e,t) {return W(e,t)},_data:function (e,t,n) {return R(e,t,n,!0)},_removeData:function (e,t) {return W(e,t,!0)},acceptData:function (e) {
                if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType)return !1;
                var t = e.nodeName && x.noData[e.nodeName.toLowerCase()];
                return !t || t !== !0 && e.getAttribute("classid") === t
            }
        }), x.fn.extend({
            data:function (e,n) {
                var r,i,o = null,a = 0,s = this[0];
                if (e === t) {
                    if (this.length && (o = x.data(s), 1 === s.nodeType && !x._data(s,"parsedAttrs"))) {
                        for (r = s.attributes; r.length > a; a++)i = r[a].name, 0 === i.indexOf("data-") && (i = x.camelCase(i.slice(5)), $(s,i,o[i]));
                        x._data(s,"parsedAttrs",!0)
                    }
                    return o
                }
                return "object" == typeof e ? this.each(function () {x.data(this,e)}) : arguments.length > 1 ? this.each(function () {x.data(this,e,n)}) : s ? $(s,e,x.data(s,e)) : null
            },removeData:function (e) {return this.each(function () {x.removeData(this,e)})}
        });
        function $(e,n,r) {
            if (r === t && 1 === e.nodeType) {
                var i = "data-" + n.replace(P,"-$1").toLowerCase();
                if (r = e.getAttribute(i), "string" == typeof r) {
                    try {r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : B.test(r) ? x.parseJSON(r) : r} catch (o) {}
                    x.data(e,n,r)
                } else r = t
            }
            return r
        }

        function I(e) {
            var t;
            for (t in e)if (("data" !== t || !x.isEmptyObject(e[t])) && "toJSON" !== t)return !1;
            return !0
        }

        x.extend({
            queue:function (e,n,r) {
                var i;
                return e ? (n = (n || "fx") + "queue", i = x._data(e,n), r && (!i || x.isArray(r) ? i = x._data(e,n,x.makeArray(r)) : i.push(r)), i || []) : t
            },dequeue:function (e,t) {
                t = t || "fx";
                var n = x.queue(e,t),r = n.length,i = n.shift(),o = x._queueHooks(e,t),a = function () {x.dequeue(e,t)};
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e,a,o)), !r && o && o.empty.fire()
            },_queueHooks:function (e,t) {
                var n = t + "queueHooks";
                return x._data(e,n) || x._data(e,n,{empty:x.Callbacks("once memory").add(function () {x._removeData(e,t + "queue"), x._removeData(e,n)})})
            }
        }), x.fn.extend({
            queue:function (e,n) {
                var r = 2;
                return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? x.queue(this[0],e) : n === t ? this : this.each(function () {
                    var t = x.queue(this,e,n);
                    x._queueHooks(this,e), "fx" === e && "inprogress" !== t[0] && x.dequeue(this,e)
                })
            },dequeue:function (e) {return this.each(function () {x.dequeue(this,e)})},delay:function (e,t) {
                return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t,function (t,n) {
                    var r = setTimeout(t,e);
                    n.stop = function () {clearTimeout(r)}
                })
            },clearQueue:function (e) {return this.queue(e || "fx",[])},promise:function (e,n) {
                var r,i = 1,o = x.Deferred(),a = this,s = this.length,l = function () {--i || o.resolveWith(a,[a])};
                "string" != typeof e && (n = e, e = t), e = e || "fx";
                while (s--)r = x._data(a[s],e + "queueHooks"), r && r.empty && (i++, r.empty.add(l));
                return l(), o.promise(n)
            }
        });
        var z,X,U = /[\t\r\n\f]/g,V = /\r/g,Y = /^(?:input|select|textarea|button|object)$/i,J = /^(?:a|area)$/i,G = /^(?:checked|selected)$/i,Q = x.support.getSetAttribute,K = x.support.input;
        x.fn.extend({
            attr:function (e,t) {return x.access(this,x.attr,e,t,arguments.length > 1)},removeAttr:function (e) {return this.each(function () {x.removeAttr(this,e)})},prop:function (e,t) {return x.access(this,x.prop,e,t,arguments.length > 1)},removeProp:function (e) {return e = x.propFix[e] || e, this.each(function () {try {this[e] = t, delete this[e]} catch (n) {}})},addClass:function (e) {
                var t,n,r,i,o,a = 0,s = this.length,l = "string" == typeof e && e;
                if (x.isFunction(e))return this.each(function (t) {x(this).addClass(e.call(this,t,this.className))});
                if (l)for (t = (e || "").match(T) || []; s > a; a++)if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U," ") : " ")) {
                    o = 0;
                    while (i = t[o++])0 > r.indexOf(" " + i + " ") && (r += i + " ");
                    n.className = x.trim(r)
                }
                return this
            },removeClass:function (e) {
                var t,n,r,i,o,a = 0,s = this.length,l = 0 === arguments.length || "string" == typeof e && e;
                if (x.isFunction(e))return this.each(function (t) {x(this).removeClass(e.call(this,t,this.className))});
                if (l)for (t = (e || "").match(T) || []; s > a; a++)if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U," ") : "")) {
                    o = 0;
                    while (i = t[o++])while (r.indexOf(" " + i + " ") >= 0)r = r.replace(" " + i + " "," ");
                    n.className = e ? x.trim(r) : ""
                }
                return this
            },toggleClass:function (e,t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function (n) {x(this).toggleClass(e.call(this,n,this.className,t),t)}) : this.each(function () {
                    if ("string" === n) {
                        var t,r = 0,o = x(this),a = e.match(T) || [];
                        while (t = a[r++])o.hasClass(t) ? o.removeClass(t) : o.addClass(t)
                    } else(n === i || "boolean" === n) && (this.className && x._data(this,"__className__",this.className), this.className = this.className || e === !1 ? "" : x._data(this,"__className__") || "")
                })
            },hasClass:function (e) {
                var t = " " + e + " ",n = 0,r = this.length;
                for (; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(U," ").indexOf(t) >= 0)return !0;
                return !1
            },val:function (e) {
                var n,r,i,o = this[0];
                {
                    if (arguments.length)return i = x.isFunction(e), this.each(function (n) {
                        var o;
                        1 === this.nodeType && (o = i ? e.call(this,n,x(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : x.isArray(o) && (o = x.map(o,function (e) {return null == e ? "" : e + ""})), r = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this,o,"value") !== t || (this.value = o))
                    });
                    if (o)return r = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o,"value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(V,"") : null == n ? "" : n)
                }
            }
        }), x.extend({
            valHooks:{
                option:{
                    get:function (e) {
                        var t = x.find.attr(e,"value");
                        return null != t ? t : e.text
                    }
                },select:{
                    get:function (e) {
                        var t,n,r = e.options,i = e.selectedIndex,o = "select-one" === e.type || 0 > i,a = o ? null : [],s = o ? i + 1 : r.length,l = 0 > i ? s : o ? i : 0;
                        for (; s > l; l++)if (n = r[l], !(!n.selected && l !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode,"optgroup"))) {
                            if (t = x(n).val(), o)return t;
                            a.push(t)
                        }
                        return a
                    },set:function (e,t) {
                        var n,r,i = e.options,o = x.makeArray(t),a = i.length;
                        while (a--)r = i[a], (r.selected = x.inArray(x(r).val(),o) >= 0) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            },attr:function (e,n,r) {
                var o,a,s = e.nodeType;
                if (e && 3 !== s && 8 !== s && 2 !== s)return typeof e.getAttribute === i ? x.prop(e,n,r) : (1 === s && x.isXMLDoc(e) || (n = n.toLowerCase(), o = x.attrHooks[n] || (x.expr.match.bool.test(n) ? X : z)), r === t ? o && "get" in o && null !== (a = o.get(e,n)) ? a : (a = x.find.attr(e,n), null == a ? t : a) : null !== r ? o && "set" in o && (a = o.set(e,r,n)) !== t ? a : (e.setAttribute(n,r + ""), r) : (x.removeAttr(e,n), t))
            },removeAttr:function (e,t) {
                var n,r,i = 0,o = t && t.match(T);
                if (o && 1 === e.nodeType)while (n = o[i++])r = x.propFix[n] || n, x.expr.match.bool.test(n) ? K && Q || !G.test(n) ? e[r] = !1 : e[x.camelCase("default-" + n)] = e[r] = !1 : x.attr(e,n,""), e.removeAttribute(Q ? n : r)
            },attrHooks:{
                type:{
                    set:function (e,t) {
                        if (!x.support.radioValue && "radio" === t && x.nodeName(e,"input")) {
                            var n = e.value;
                            return e.setAttribute("type",t), n && (e.value = n), t
                        }
                    }
                }
            },propFix:{"for":"htmlFor","class":"className"},prop:function (e,n,r) {
                var i,o,a,s = e.nodeType;
                if (e && 3 !== s && 8 !== s && 2 !== s)return a = 1 !== s || !x.isXMLDoc(e), a && (n = x.propFix[n] || n, o = x.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e,r,n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e,n)) ? i : e[n]
            },propHooks:{
                tabIndex:{
                    get:function (e) {
                        var t = x.find.attr(e,"tabindex");
                        return t ? parseInt(t,10) : Y.test(e.nodeName) || J.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            }
        }), X = {set:function (e,t,n) {return t === !1 ? x.removeAttr(e,n) : K && Q || !G.test(n) ? e.setAttribute(!Q && x.propFix[n] || n,n) : e[x.camelCase("default-" + n)] = e[n] = !0, n}}, x.each(x.expr.match.bool.source.match(/\w+/g),function (e,n) {
            var r = x.expr.attrHandle[n] || x.find.attr;
            x.expr.attrHandle[n] = K && Q || !G.test(n) ? function (e,n,i) {
                var o = x.expr.attrHandle[n],a = i ? t : (x.expr.attrHandle[n] = t) != r(e,n,i) ? n.toLowerCase() : null;
                return x.expr.attrHandle[n] = o, a
            } : function (e,n,r) {return r ? t : e[x.camelCase("default-" + n)] ? n.toLowerCase() : null}
        }), K && Q || (x.attrHooks.value = {set:function (e,n,r) {return x.nodeName(e,"input") ? (e.defaultValue = n, t) : z && z.set(e,n,r)}}), Q || (z = {
            set:function (e,n,r) {
                var i = e.getAttributeNode(r);
                return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
            }
        }, x.expr.attrHandle.id = x.expr.attrHandle.name = x.expr.attrHandle.coords = function (e,n,r) {
            var i;
            return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null
        }, x.valHooks.button = {
            get:function (e,n) {
                var r = e.getAttributeNode(n);
                return r && r.specified ? r.value : t
            },set:z.set
        }, x.attrHooks.contenteditable = {set:function (e,t,n) {z.set(e,"" === t ? !1 : t,n)}}, x.each(["width","height"],function (e,n) {x.attrHooks[n] = {set:function (e,r) {return "" === r ? (e.setAttribute(n,"auto"), r) : t}}})), x.support.hrefNormalized || x.each(["href","src"],function (e,t) {x.propHooks[t] = {get:function (e) {return e.getAttribute(t,4)}}}), x.support.style || (x.attrHooks.style = {get:function (e) {return e.style.cssText || t},set:function (e,t) {return e.style.cssText = t + ""}}), x.support.optSelected || (x.propHooks.selected = {
            get:function (e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            }
        }), x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function () {x.propFix[this.toLowerCase()] = this}), x.support.enctype || (x.propFix.enctype = "encoding"), x.each(["radio","checkbox"],function () {x.valHooks[this] = {set:function (e,n) {return x.isArray(n) ? e.checked = x.inArray(x(e).val(),n) >= 0 : t}}, x.support.checkOn || (x.valHooks[this].get = function (e) {return null === e.getAttribute("value") ? "on" : e.value})});
        var Z = /^(?:input|select|textarea)$/i,et = /^key/,tt = /^(?:mouse|contextmenu)|click/,nt = /^(?:focusinfocus|focusoutblur)$/,rt = /^([^.]*)(?:\.(.+)|)$/;

        function it() {return !0}

        function ot() {return !1}

        function at() {try {return a.activeElement} catch (e) {}}

        x.event = {
            global:{},add:function (e,n,r,o,a) {
                var s,l,u,c,p,f,d,h,g,m,y,v = x._data(e);
                if (v) {
                    r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = x.guid++), (l = v.events) || (l = v.events = {}), (f = v.handle) || (f = v.handle = function (e) {return typeof x === i || e && x.event.triggered === e.type ? t : x.event.dispatch.apply(f.elem,arguments)}, f.elem = e), n = (n || "").match(T) || [""], u = n.length;
                    while (u--)s = rt.exec(n[u]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), g && (p = x.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, p = x.event.special[g] || {}, d = x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a && x.expr.match.needsContext.test(a),namespace:m.join(".")},c), (h = l[g]) || (h = l[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e,o,m,f) !== !1 || (e.addEventListener ? e.addEventListener(g,f,!1) : e.attachEvent && e.attachEvent("on" + g,f))), p.add && (p.add.call(e,d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++,0,d) : h.push(d), x.event.global[g] = !0);
                    e = null
                }
            },remove:function (e,t,n,r,i) {
                var o,a,s,l,u,c,p,f,d,h,g,m = x.hasData(e) && x._data(e);
                if (m && (c = m.events)) {
                    t = (t || "").match(T) || [""], u = t.length;
                    while (u--)if (s = rt.exec(t[u]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
                        p = x.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length;
                        while (o--)a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o,1), a.selector && f.delegateCount--, p.remove && p.remove.call(e,a));
                        l && !f.length && (p.teardown && p.teardown.call(e,h,m.handle) !== !1 || x.removeEvent(e,d,m.handle), delete c[d])
                    } else for (d in c)x.event.remove(e,d + t[u],n,r,!0);
                    x.isEmptyObject(c) && (delete m.handle, x._removeData(e,"events"))
                }
            },trigger:function (n,r,i,o) {
                var s,l,u,c,p,f,d,h = [i || a],g = v.call(n,"type") ? n.type : n,m = v.call(n,"namespace") ? n.namespace.split(".") : [];
                if (u = f = i = i || a, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + x.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), g = m.shift(), m.sort()), l = 0 > g.indexOf(":") && "on" + g, n = n[x.expando] ? n : new x.Event(g,"object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : x.makeArray(r,[n]), p = x.event.special[g] || {}, o || !p.trigger || p.trigger.apply(i,r) !== !1)) {
                    if (!o && !p.noBubble && !x.isWindow(i)) {
                        for (c = p.delegateType || g, nt.test(c + g) || (u = u.parentNode); u; u = u.parentNode)h.push(u), f = u;
                        f === (i.ownerDocument || a) && h.push(f.defaultView || f.parentWindow || e)
                    }
                    d = 0;
                    while ((u = h[d++]) && !n.isPropagationStopped())n.type = d > 1 ? c : p.bindType || g, s = (x._data(u,"events") || {})[n.type] && x._data(u,"handle"), s && s.apply(u,r), s = l && u[l], s && x.acceptData(u) && s.apply && s.apply(u,r) === !1 && n.preventDefault();
                    if (n.type = g, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(h.pop(),r) === !1) && x.acceptData(i) && l && i[g] && !x.isWindow(i)) {
                        f = i[l], f && (i[l] = null), x.event.triggered = g;
                        try {i[g]()} catch (y) {}
                        x.event.triggered = t, f && (i[l] = f)
                    }
                    return n.result
                }
            },dispatch:function (e) {
                e = x.event.fix(e);
                var n,r,i,o,a,s = [],l = g.call(arguments),u = (x._data(this,"events") || {})[e.type] || [],c = x.event.special[e.type] || {};
                if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this,e) !== !1) {
                    s = x.event.handlers.call(this,e,u), n = 0;
                    while ((o = s[n++]) && !e.isPropagationStopped()) {
                        e.currentTarget = o.elem, a = 0;
                        while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((x.event.special[i.origType] || {}).handle || i.handler).apply(o.elem,l), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
                    }
                    return c.postDispatch && c.postDispatch.call(this,e), e.result
                }
            },handlers:function (e,n) {
                var r,i,o,a,s = [],l = n.delegateCount,u = e.target;
                if (l && u.nodeType && (!e.button || "click" !== e.type))for (; u != this; u = u.parentNode || this)if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                    for (o = [], a = 0; l > a; a++)i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? x(r,this).index(u) >= 0 : x.find(r,this,null,[u]).length), o[r] && o.push(i);
                    o.length && s.push({elem:u,handlers:o})
                }
                return n.length > l && s.push({elem:this,handlers:n.slice(l)}), s
            },fix:function (e) {
                if (e[x.expando])return e;
                var t,n,r,i = e.type,o = e,s = this.fixHooks[i];
                s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new x.Event(o), t = r.length;
                while (t--)n = r[t], e[n] = o[n];
                return e.target || (e.target = o.srcElement || a), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e,o) : e
            },props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function (e,t) {return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e}},mouseHooks:{
                props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function (e,n) {
                    var r,i,o,s = n.button,l = n.fromElement;
                    return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || a, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && l && (e.relatedTarget = l === e.target ? n.toElement : l), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
                }
            },special:{load:{noBubble:!0},focus:{trigger:function () {if (this !== at() && this.focus)try {return this.focus(), !1} catch (e) {}},delegateType:"focusin"},blur:{trigger:function () {return this === at() && this.blur ? (this.blur(), !1) : t},delegateType:"focusout"},click:{trigger:function () {return x.nodeName(this,"input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t},_default:function (e) {return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function (e) {e.result !== t && (e.originalEvent.returnValue = e.result)}}},simulate:function (e,t,n,r) {
                var i = x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});
                r ? x.event.trigger(i,null,t) : x.event.dispatch.call(t,i), i.isDefaultPrevented() && n.preventDefault()
            }
        }, x.removeEvent = a.removeEventListener ? function (e,t,n) {e.removeEventListener && e.removeEventListener(t,n,!1)} : function (e,t,n) {
            var r = "on" + t;
            e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r,n))
        }, x.Event = function (e,n) {return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && x.extend(this,n), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, t) : new x.Event(e,n)}, x.Event.prototype = {
            isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },stopPropagation:function () {
                var e = this.originalEvent;
                this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },stopImmediatePropagation:function () {this.isImmediatePropagationStopped = it, this.stopPropagation()}
        }, x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function (e,t) {
            x.event.special[e] = {
                delegateType:t,bindType:t,handle:function (e) {
                    var n,r = this,i = e.relatedTarget,o = e.handleObj;
                    return (!i || i !== r && !x.contains(r,i)) && (e.type = o.origType, n = o.handler.apply(this,arguments), e.type = t), n
                }
            }
        }), x.support.submitBubbles || (x.event.special.submit = {
            setup:function () {
                return x.nodeName(this,"form") ? !1 : (x.event.add(this,"click._submit keypress._submit",function (e) {
                    var n = e.target,r = x.nodeName(n,"input") || x.nodeName(n,"button") ? n.form : t;
                    r && !x._data(r,"submitBubbles") && (x.event.add(r,"submit._submit",function (e) {e._submit_bubble = !0}), x._data(r,"submitBubbles",!0))
                }), t)
            },postDispatch:function (e) {e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && x.event.simulate("submit",this.parentNode,e,!0))},teardown:function () {return x.nodeName(this,"form") ? !1 : (x.event.remove(this,"._submit"), t)}
        }), x.support.changeBubbles || (x.event.special.change = {
            setup:function () {
                return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (x.event.add(this,"propertychange._change",function (e) {"checked" === e.originalEvent.propertyName && (this._just_changed = !0)}), x.event.add(this,"click._change",function (e) {this._just_changed && !e.isTrigger && (this._just_changed = !1), x.event.simulate("change",this,e,!0)})), !1) : (x.event.add(this,"beforeactivate._change",function (e) {
                    var t = e.target;
                    Z.test(t.nodeName) && !x._data(t,"changeBubbles") && (x.event.add(t,"change._change",function (e) {!this.parentNode || e.isSimulated || e.isTrigger || x.event.simulate("change",this.parentNode,e,!0)}), x._data(t,"changeBubbles",!0))
                }), t)
            },handle:function (e) {
                var n = e.target;
                return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this,arguments) : t
            },teardown:function () {return x.event.remove(this,"._change"), !Z.test(this.nodeName)}
        }), x.support.focusinBubbles || x.each({focus:"focusin",blur:"focusout"},function (e,t) {
            var n = 0,r = function (e) {x.event.simulate(t,e.target,x.event.fix(e),!0)};
            x.event.special[t] = {setup:function () {0 === n++ && a.addEventListener(e,r,!0)},teardown:function () {0 === --n && a.removeEventListener(e,r,!0)}}
        }), x.fn.extend({
            on:function (e,n,r,i,o) {
                var a,s;
                if ("object" == typeof e) {
                    "string" != typeof n && (r = r || n, n = t);
                    for (a in e)this.on(a,n,r,e[a],o);
                    return this
                }
                if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = ot; else if (!i)return this;
                return 1 === o && (s = i, i = function (e) {return x().off(e), s.apply(this,arguments)}, i.guid = s.guid || (s.guid = x.guid++)), this.each(function () {x.event.add(this,e,i,r,n)})
            },one:function (e,t,n,r) {return this.on(e,t,n,r,1)},off:function (e,n,r) {
                var i,o;
                if (e && e.preventDefault && e.handleObj)return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType,i.selector,i.handler), this;
                if ("object" == typeof e) {
                    for (o in e)this.off(o,n,e[o]);
                    return this
                }
                return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), this.each(function () {x.event.remove(this,e,r,n)})
            },trigger:function (e,t) {return this.each(function () {x.event.trigger(e,t,this)})},triggerHandler:function (e,n) {
                var r = this[0];
                return r ? x.event.trigger(e,n,r,!0) : t
            }
        });
        var st = /^.[^:#\[\.,]*$/,lt = /^(?:parents|prev(?:Until|All))/,ut = x.expr.match.needsContext,ct = {children:!0,contents:!0,next:!0,prev:!0};
        x.fn.extend({
            find:function (e) {
                var t,n = [],r = this,i = r.length;
                if ("string" != typeof e)return this.pushStack(x(e).filter(function () {for (t = 0; i > t; t++)if (x.contains(r[t],this))return !0}));
                for (t = 0; i > t; t++)x.find(e,r[t],n);
                return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
            },has:function (e) {
                var t,n = x(e,this),r = n.length;
                return this.filter(function () {for (t = 0; r > t; t++)if (x.contains(this,n[t]))return !0})
            },not:function (e) {return this.pushStack(ft(this,e || [],!0))},filter:function (e) {return this.pushStack(ft(this,e || [],!1))},is:function (e) {return !!ft(this,"string" == typeof e && ut.test(e) ? x(e) : e || [],!1).length},closest:function (e,t) {
                var n,r = 0,i = this.length,o = [],a = ut.test(e) || "string" != typeof e ? x(e,t || this.context) : 0;
                for (; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n,e))) {
                    n = o.push(n);
                    break
                }
                return this.pushStack(o.length > 1 ? x.unique(o) : o)
            },index:function (e) {return e ? "string" == typeof e ? x.inArray(this[0],x(e)) : x.inArray(e.jquery ? e[0] : e,this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1},add:function (e,t) {
                var n = "string" == typeof e ? x(e,t) : x.makeArray(e && e.nodeType ? [e] : e),r = x.merge(this.get(),n);
                return this.pushStack(x.unique(r))
            },addBack:function (e) {return this.add(null == e ? this.prevObject : this.prevObject.filter(e))}
        });
        function pt(e,t) {
            do e = e[t]; while (e && 1 !== e.nodeType);
            return e
        }

        x.each({
            parent:function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },parents:function (e) {return x.dir(e,"parentNode")},parentsUntil:function (e,t,n) {return x.dir(e,"parentNode",n)},next:function (e) {return pt(e,"nextSibling")},prev:function (e) {return pt(e,"previousSibling")},nextAll:function (e) {return x.dir(e,"nextSibling")},prevAll:function (e) {return x.dir(e,"previousSibling")},nextUntil:function (e,t,n) {return x.dir(e,"nextSibling",n)},prevUntil:function (e,t,n) {return x.dir(e,"previousSibling",n)},siblings:function (e) {return x.sibling((e.parentNode || {}).firstChild,e)},children:function (e) {return x.sibling(e.firstChild)},contents:function (e) {return x.nodeName(e,"iframe") ? e.contentDocument || e.contentWindow.document : x.merge([],e.childNodes)}
        },function (e,t) {
            x.fn[e] = function (n,r) {
                var i = x.map(this,t,n);
                return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r,i)), this.length > 1 && (ct[e] || (i = x.unique(i)), lt.test(e) && (i = i.reverse())), this.pushStack(i)
            }
        }), x.extend({
            filter:function (e,t,n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r,e) ? [r] : [] : x.find.matches(e,x.grep(t,function (e) {return 1 === e.nodeType}))
            },dir:function (e,n,r) {
                var i = [],o = e[n];
                while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !x(o).is(r)))1 === o.nodeType && i.push(o), o = o[n];
                return i
            },sibling:function (e,t) {
                var n = [];
                for (; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        });
        function ft(e,t,n) {
            if (x.isFunction(t))return x.grep(e,function (e,r) {return !!t.call(e,r,e) !== n});
            if (t.nodeType)return x.grep(e,function (e) {return e === t !== n});
            if ("string" == typeof t) {
                if (st.test(t))return x.filter(t,e,n);
                t = x.filter(t,e)
            }
            return x.grep(e,function (e) {return x.inArray(e,t) >= 0 !== n})
        }

        function dt(e) {
            var t = ht.split("|"),n = e.createDocumentFragment();
            if (n.createElement)while (t.length)n.createElement(t.pop());
            return n
        }

        var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt = / jQuery\d+="(?:null|\d+)"/g,mt = RegExp("<(?:" + ht + ")[\\s/>]","i"),yt = /^\s+/,vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt = /<([\w:]+)/,xt = /<tbody/i,wt = /<|&#?\w+;/,Tt = /<(?:script|style|link)/i,Ct = /^(?:checkbox|radio)$/i,Nt = /checked\s*(?:[^=]|=\s*.checked.)/i,kt = /^$|\/(?:java|ecma)script/i,Et = /^true\/(.*)/,St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At = {option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize ? [0,"",""] : [1,"X<div>","</div>"]},jt = dt(a),Dt = jt.appendChild(a.createElement("div"));
        At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td, x.fn.extend({
            text:function (e) {return x.access(this,function (e) {return e === t ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || a).createTextNode(e))},null,e,arguments.length)},append:function () {
                return this.domManip(arguments,function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = Lt(this,e);
                        t.appendChild(e)
                    }
                })
            },prepend:function () {
                return this.domManip(arguments,function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = Lt(this,e);
                        t.insertBefore(e,t.firstChild)
                    }
                })
            },before:function () {return this.domManip(arguments,function (e) {this.parentNode && this.parentNode.insertBefore(e,this)})},after:function () {return this.domManip(arguments,function (e) {this.parentNode && this.parentNode.insertBefore(e,this.nextSibling)})},remove:function (e,t) {
                var n,r = e ? x.filter(e,this) : this,i = 0;
                for (; null != (n = r[i]); i++)t || 1 !== n.nodeType || x.cleanData(Ft(n)), n.parentNode && (t && x.contains(n.ownerDocument,n) && _t(Ft(n,"script")), n.parentNode.removeChild(n));
                return this
            },empty:function () {
                var e,t = 0;
                for (; null != (e = this[t]); t++) {
                    1 === e.nodeType && x.cleanData(Ft(e,!1));
                    while (e.firstChild)e.removeChild(e.firstChild);
                    e.options && x.nodeName(e,"select") && (e.options.length = 0)
                }
                return this
            },clone:function (e,t) {return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {return x.clone(this,e,t)})},html:function (e) {
                return x.access(this,function (e) {
                    var n = this[0] || {},r = 0,i = this.length;
                    if (e === t)return 1 === n.nodeType ? n.innerHTML.replace(gt,"") : t;
                    if (!("string" != typeof e || Tt.test(e) || !x.support.htmlSerialize && mt.test(e) || !x.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || ["",""])[1].toLowerCase()])) {
                        e = e.replace(vt,"<$1></$2>");
                        try {
                            for (; i > r; r++)n = this[r] || {}, 1 === n.nodeType && (x.cleanData(Ft(n,!1)), n.innerHTML = e);
                            n = 0
                        } catch (o) {}
                    }
                    n && this.empty().append(e)
                },null,e,arguments.length)
            },replaceWith:function () {
                var e = x.map(this,function (e) {return [e.nextSibling,e.parentNode]}),t = 0;
                return this.domManip(arguments,function (n) {
                    var r = e[t++],i = e[t++];
                    i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n,r))
                },!0), t ? this : this.remove()
            },detach:function (e) {return this.remove(e,!0)},domManip:function (e,t,n) {
                e = d.apply([],e);
                var r,i,o,a,s,l,u = 0,c = this.length,p = this,f = c - 1,h = e[0],g = x.isFunction(h);
                if (g || !(1 >= c || "string" != typeof h || x.support.checkClone) && Nt.test(h))return this.each(function (r) {
                    var i = p.eq(r);
                    g && (e[0] = h.call(this,r,i.html())), i.domManip(e,t,n)
                });
                if (c && (l = x.buildFragment(e,this[0].ownerDocument,!1,!n && this), r = l.firstChild, 1 === l.childNodes.length && (l = r), r)) {
                    for (a = x.map(Ft(l,"script"),Ht), o = a.length; c > u; u++)i = l, u !== f && (i = x.clone(i,!0,!0), o && x.merge(a,Ft(i,"script"))), t.call(this[u],i,u);
                    if (o)for (s = a[a.length - 1].ownerDocument, x.map(a,qt), u = 0; o > u; u++)i = a[u], kt.test(i.type || "") && !x._data(i,"globalEval") && x.contains(s,i) && (i.src ? x._evalUrl(i.src) : x.globalEval((i.text || i.textContent || i.innerHTML || "").replace(St,"")));
                    l = r = null
                }
                return this
            }
        });
        function Lt(e,t) {return x.nodeName(e,"table") && x.nodeName(1 === t.nodeType ? t : t.firstChild,"tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e}

        function Ht(e) {return e.type = (null !== x.find.attr(e,"type")) + "/" + e.type, e}

        function qt(e) {
            var t = Et.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function _t(e,t) {
            var n,r = 0;
            for (; null != (n = e[r]); r++)x._data(n,"globalEval",!t || x._data(t[r],"globalEval"))
        }

        function Mt(e,t) {
            if (1 === t.nodeType && x.hasData(e)) {
                var n,r,i,o = x._data(e),a = x._data(t,o),s = o.events;
                if (s) {
                    delete a.handle, a.events = {};
                    for (n in s)for (r = 0, i = s[n].length; i > r; r++)x.event.add(t,n,s[n][r])
                }
                a.data && (a.data = x.extend({},a.data))
            }
        }

        function Ot(e,t) {
            var n,r,i;
            if (1 === t.nodeType) {
                if (n = t.nodeName.toLowerCase(), !x.support.noCloneEvent && t[x.expando]) {
                    i = x._data(t);
                    for (r in i.events)x.removeEvent(t,r,i.handle);
                    t.removeAttribute(x.expando)
                }
                "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), x.support.html5Clone && e.innerHTML && !x.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ct.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
            }
        }

        x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function (e,t) {
            x.fn[e] = function (e) {
                var n,r = 0,i = [],o = x(e),a = o.length - 1;
                for (; a >= r; r++)n = r === a ? this : this.clone(!0), x(o[r])[t](n), h.apply(i,n.get());
                return this.pushStack(i)
            }
        });
        function Ft(e,n) {
            var r,o,a = 0,s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
            if (!s)for (s = [], r = e.childNodes || e; null != (o = r[a]); a++)!n || x.nodeName(o,n) ? s.push(o) : x.merge(s,Ft(o,n));
            return n === t || n && x.nodeName(e,n) ? x.merge([e],s) : s
        }

        function Bt(e) {Ct.test(e.type) && (e.defaultChecked = e.checked)}

        x.extend({
            clone:function (e,t,n) {
                var r,i,o,a,s,l = x.contains(e.ownerDocument,e);
                if (x.support.html5Clone || x.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild(o = Dt.firstChild)), !(x.support.noCloneEvent && x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))for (r = Ft(o), s = Ft(e), a = 0; null != (i = s[a]); ++a)r[a] && Ot(i,r[a]);
                if (t)if (n)for (s = s || Ft(e), r = r || Ft(o), a = 0; null != (i = s[a]); a++)Mt(i,r[a]); else Mt(e,o);
                return r = Ft(o,"script"), r.length > 0 && _t(r,!l && Ft(e,"script")), r = s = i = null, o
            },buildFragment:function (e,t,n,r) {
                var i,o,a,s,l,u,c,p = e.length,f = dt(t),d = [],h = 0;
                for (; p > h; h++)if (o = e[h], o || 0 === o)if ("object" === x.type(o)) x.merge(d,o.nodeType ? [o] : o); else if (wt.test(o)) {
                    s = s || f.appendChild(t.createElement("div")), l = (bt.exec(o) || ["",""])[1].toLowerCase(), c = At[l] || At._default, s.innerHTML = c[1] + o.replace(vt,"<$1></$2>") + c[2], i = c[0];
                    while (i--)s = s.lastChild;
                    if (!x.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !x.support.tbody) {
                        o = "table" !== l || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length;
                        while (i--)x.nodeName(u = o.childNodes[i],"tbody") && !u.childNodes.length && o.removeChild(u)
                    }
                    x.merge(d,s.childNodes), s.textContent = "";
                    while (s.firstChild)s.removeChild(s.firstChild);
                    s = f.lastChild
                } else d.push(t.createTextNode(o));
                s && f.removeChild(s), x.support.appendChecked || x.grep(Ft(d,"input"),Bt), h = 0;
                while (o = d[h++])if ((!r || -1 === x.inArray(o,r)) && (a = x.contains(o.ownerDocument,o), s = Ft(f.appendChild(o),"script"), a && _t(s), n)) {
                    i = 0;
                    while (o = s[i++])kt.test(o.type || "") && n.push(o)
                }
                return s = null, f
            },cleanData:function (e,t) {
                var n,r,o,a,s = 0,l = x.expando,u = x.cache,c = x.support.deleteExpando,f = x.event.special;
                for (; null != (n = e[s]); s++)if ((t || x.acceptData(n)) && (o = n[l], a = o && u[o])) {
                    if (a.events)for (r in a.events)f[r] ? x.event.remove(n,r) : x.removeEvent(n,r,a.handle);
                    u[o] && (delete u[o], c ? delete n[l] : typeof n.removeAttribute !== i ? n.removeAttribute(l) : n[l] = null, p.push(o))
                }
            },_evalUrl:function (e) {return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}
        }), x.fn.extend({
            wrapAll:function (e) {
                if (x.isFunction(e))return this.each(function (t) {x(this).wrapAll(e.call(this,t))});
                if (this[0]) {
                    var t = x(e,this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                        var e = this;
                        while (e.firstChild && 1 === e.firstChild.nodeType)e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            },wrapInner:function (e) {
                return x.isFunction(e) ? this.each(function (t) {x(this).wrapInner(e.call(this,t))}) : this.each(function () {
                    var t = x(this),n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },wrap:function (e) {
                var t = x.isFunction(e);
                return this.each(function (n) {x(this).wrapAll(t ? e.call(this,n) : e)})
            },unwrap:function () {return this.parent().each(function () {x.nodeName(this,"body") || x(this).replaceWith(this.childNodes)}).end()}
        });
        var Pt,Rt,Wt,$t = /alpha\([^)]*\)/i,It = /opacity\s*=\s*([^)]*)/,zt = /^(top|right|bottom|left)$/,Xt = /^(none|table(?!-c[ea]).+)/,Ut = /^margin/,Vt = RegExp("^(" + w + ")(.*)$","i"),Yt = RegExp("^(" + w + ")(?!px)[a-z%]+$","i"),Jt = RegExp("^([+-])=(" + w + ")","i"),Gt = {BODY:"block"},Qt = {position:"absolute",visibility:"hidden",display:"block"},Kt = {letterSpacing:0,fontWeight:400},Zt = ["Top","Right","Bottom","Left"],en = ["Webkit","O","Moz","ms"];

        function tn(e,t) {
            if (t in e)return t;
            var n = t.charAt(0).toUpperCase() + t.slice(1),r = t,i = en.length;
            while (i--)if (t = en[i] + n, t in e)return t;
            return r
        }

        function nn(e,t) {return e = t || e, "none" === x.css(e,"display") || !x.contains(e.ownerDocument,e)}

        function rn(e,t) {
            var n,r,i,o = [],a = 0,s = e.length;
            for (; s > a; a++)r = e[a], r.style && (o[a] = x._data(r,"olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = x._data(r,"olddisplay",ln(r.nodeName)))) : o[a] || (i = nn(r), (n && "none" !== n || !i) && x._data(r,"olddisplay",i ? n : x.css(r,"display"))));
            for (a = 0; s > a; a++)r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
            return e
        }

        x.fn.extend({
            css:function (e,n) {
                return x.access(this,function (e,n,r) {
                    var i,o,a = {},s = 0;
                    if (x.isArray(n)) {
                        for (o = Rt(e), i = n.length; i > s; s++)a[n[s]] = x.css(e,n[s],!1,o);
                        return a
                    }
                    return r !== t ? x.style(e,n,r) : x.css(e,n)
                },e,n,arguments.length > 1)
            },show:function () {return rn(this,!0)},hide:function () {return rn(this)},toggle:function (e) {return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {nn(this) ? x(this).show() : x(this).hide()})}
        }), x.extend({
            cssHooks:{
                opacity:{
                    get:function (e,t) {
                        if (t) {
                            var n = Wt(e,"opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat ? "cssFloat" : "styleFloat"},style:function (e,n,r,i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var o,a,s,l = x.camelCase(n),u = e.style;
                    if (n = x.cssProps[l] || (x.cssProps[l] = tn(u,l)), s = x.cssHooks[n] || x.cssHooks[l], r === t)return s && "get" in s && (o = s.get(e,!1,i)) !== t ? o : u[n];
                    if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(x.css(e,n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || x.cssNumber[l] || (r += "px"), x.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), s && "set" in s && (r = s.set(e,r,i)) === t)))try {u[n] = r} catch (c) {}
                }
            },css:function (e,n,r,i) {
                var o,a,s,l = x.camelCase(n);
                return n = x.cssProps[l] || (x.cssProps[l] = tn(e.style,l)), s = x.cssHooks[n] || x.cssHooks[l], s && "get" in s && (a = s.get(e,!0,r)), a === t && (a = Wt(e,n,i)), "normal" === a && n in Kt && (a = Kt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || x.isNumeric(o) ? o || 0 : a) : a
            }
        }), e.getComputedStyle ? (Rt = function (t) {return e.getComputedStyle(t,null)}, Wt = function (e,n,r) {
            var i,o,a,s = r || Rt(e),l = s ? s.getPropertyValue(n) || s[n] : t,u = e.style;
            return s && ("" !== l || x.contains(e.ownerDocument,e) || (l = x.style(e,n)), Yt.test(l) && Ut.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = s.width, u.width = i, u.minWidth = o, u.maxWidth = a)), l
        }) : a.documentElement.currentStyle && (Rt = function (e) {return e.currentStyle}, Wt = function (e,n,r) {
                var i,o,a,s = r || Rt(e),l = s ? s[n] : t,u = e.style;
                return null == l && u && u[n] && (l = u[n]), Yt.test(l) && !zt.test(n) && (i = u.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = i, a && (o.left = a)), "" === l ? "auto" : l
            });
        function on(e,t,n) {
            var r = Vt.exec(t);
            return r ? Math.max(0,r[1] - (n || 0)) + (r[2] || "px") : t
        }

        function an(e,t,n,r,i) {
            var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,a = 0;
            for (; 4 > o; o += 2)"margin" === n && (a += x.css(e,n + Zt[o],!0,i)), r ? ("content" === n && (a -= x.css(e,"padding" + Zt[o],!0,i)), "margin" !== n && (a -= x.css(e,"border" + Zt[o] + "Width",!0,i))) : (a += x.css(e,"padding" + Zt[o],!0,i), "padding" !== n && (a += x.css(e,"border" + Zt[o] + "Width",!0,i)));
            return a
        }

        function sn(e,t,n) {
            var r = !0,i = "width" === t ? e.offsetWidth : e.offsetHeight,o = Rt(e),a = x.support.boxSizing && "border-box" === x.css(e,"boxSizing",!1,o);
            if (0 >= i || null == i) {
                if (i = Wt(e,t,o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i))return i;
                r = a && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
            }
            return i + an(e,t,n || (a ? "border" : "content"),r,o) + "px"
        }

        function ln(e) {
            var t = a,n = Gt[e];
            return n || (n = un(e,t), "none" !== n && n || (Pt = (Pt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = un(e,t), Pt.detach()), Gt[e] = n), n
        }

        function un(e,t) {
            var n = x(t.createElement(e)).appendTo(t.body),r = x.css(n[0],"display");
            return n.remove(), r
        }

        x.each(["height","width"],function (e,n) {
            x.cssHooks[n] = {
                get:function (e,r,i) {return r ? 0 === e.offsetWidth && Xt.test(x.css(e,"display")) ? x.swap(e,Qt,function () {return sn(e,n,i)}) : sn(e,n,i) : t},set:function (e,t,r) {
                    var i = r && Rt(e);
                    return on(e,t,r ? an(e,n,r,x.support.boxSizing && "border-box" === x.css(e,"boxSizing",!1,i),i) : 0)
                }
            }
        }), x.support.opacity || (x.cssHooks.opacity = {
            get:function (e,t) {return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""},set:function (e,t) {
                var n = e.style,r = e.currentStyle,i = x.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",o = r && r.filter || n.filter || "";
                n.zoom = 1, (t >= 1 || "" === t) && "" === x.trim(o.replace($t,"")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t,i) : o + " " + i)
            }
        }), x(function () {x.support.reliableMarginRight || (x.cssHooks.marginRight = {get:function (e,n) {return n ? x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]) : t}}), !x.support.pixelPosition && x.fn.position && x.each(["top","left"],function (e,n) {x.cssHooks[n] = {get:function (e,r) {return r ? (r = Wt(e,n), Yt.test(r) ? x(e).position()[n] + "px" : r) : t}}})}), x.expr && x.expr.filters && (x.expr.filters.hidden = function (e) {return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !x.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || x.css(e,"display"))}, x.expr.filters.visible = function (e) {return !x.expr.filters.hidden(e)}), x.each({margin:"",padding:"",border:"Width"},function (e,t) {
            x.cssHooks[e + t] = {
                expand:function (n) {
                    var r = 0,i = {},o = "string" == typeof n ? n.split(" ") : [n];
                    for (; 4 > r; r++)i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0];
                    return i
                }
            }, Ut.test(e) || (x.cssHooks[e + t].set = on)
        });
        var cn = /%20/g,pn = /\[\]$/,fn = /\r?\n/g,dn = /^(?:submit|button|image|reset|file)$/i,hn = /^(?:input|select|textarea|keygen)/i;
        x.fn.extend({
            serialize:function () {return x.param(this.serializeArray())},serializeArray:function () {
                return this.map(function () {
                    var e = x.prop(this,"elements");
                    return e ? x.makeArray(e) : this
                }).filter(function () {
                    var e = this.type;
                    return this.name && !x(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Ct.test(e))
                }).map(function (e,t) {
                    var n = x(this).val();
                    return null == n ? null : x.isArray(n) ? x.map(n,function (e) {return {name:t.name,value:e.replace(fn,"\r\n")}}) : {name:t.name,value:n.replace(fn,"\r\n")}
                }).get()
            }
        }), x.param = function (e,n) {
            var r,i = [],o = function (e,t) {t = x.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)};
            if (n === t && (n = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e,function () {o(this.name,this.value)}); else for (r in e)gn(r,e[r],n,o);
            return i.join("&").replace(cn,"+")
        };
        function gn(e,t,n,r) {
            var i;
            if (x.isArray(t)) x.each(t,function (t,i) {n || pn.test(e) ? r(e,i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]",i,n,r)}); else if (n || "object" !== x.type(t)) r(e,t); else for (i in t)gn(e + "[" + i + "]",t[i],n,r)
        }

        x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function (e,t) {x.fn[t] = function (e,n) {return arguments.length > 0 ? this.on(t,null,e,n) : this.trigger(t)}}), x.fn.extend({hover:function (e,t) {return this.mouseenter(e).mouseleave(t || e)},bind:function (e,t,n) {return this.on(e,null,t,n)},unbind:function (e,t) {return this.off(e,null,t)},delegate:function (e,t,n,r) {return this.on(t,e,n,r)},undelegate:function (e,t,n) {return 1 === arguments.length ? this.off(e,"**") : this.off(t,e || "**",n)}});
        var mn,yn,vn = x.now(),bn = /\?/,xn = /#.*$/,wn = /([?&])_=[^&]*/,Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn = /^(?:GET|HEAD)$/,kn = /^\/\//,En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn = x.fn.load,An = {},jn = {},Dn = "*/".concat("*");
        try {yn = o.href} catch (Ln) {yn = a.createElement("a"), yn.href = "", yn = yn.href}
        mn = En.exec(yn.toLowerCase()) || [];
        function Hn(e) {
            return function (t,n) {
                "string" != typeof t && (n = t, t = "*");
                var r,i = 0,o = t.toLowerCase().match(T) || [];
                if (x.isFunction(n))while (r = o[i++])"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }

        function qn(e,n,r,i) {
            var o = {},a = e === jn;

            function s(l) {
                var u;
                return o[l] = !0, x.each(e[l] || [],function (e,l) {
                    var c = l(n,r,i);
                    return "string" != typeof c || a || o[c] ? a ? !(u = c) : t : (n.dataTypes.unshift(c), s(c), !1)
                }), u
            }

            return s(n.dataTypes[0]) || !o["*"] && s("*")
        }

        function _n(e,n) {
            var r,i,o = x.ajaxSettings.flatOptions || {};
            for (i in n)n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
            return r && x.extend(!0,e,r), e
        }

        x.fn.load = function (e,n,r) {
            if ("string" != typeof e && Sn)return Sn.apply(this,arguments);
            var i,o,a,s = this,l = e.indexOf(" ");
            return l >= 0 && (i = e.slice(l,e.length), e = e.slice(0,l)), x.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && x.ajax({url:e,type:a,dataType:"html",data:n}).done(function (e) {o = arguments, s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e)}).complete(r && function (e,t) {s.each(r,o || [e.responseText,t,e])}), this
        }, x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function (e,t) {x.fn[t] = function (e) {return this.on(t,e)}}), x.extend({
            active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function (e,t) {return t ? _n(_n(e,x.ajaxSettings),t) : _n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function (e,n) {
                "object" == typeof e && (n = e, e = t), n = n || {};
                var r,i,o,a,s,l,u,c,p = x.ajaxSetup({},n),f = p.context || p,d = p.context && (f.nodeType || f.jquery) ? x(f) : x.event,h = x.Deferred(),g = x.Callbacks("once memory"),m = p.statusCode || {},y = {},v = {},b = 0,w = "canceled",C = {
                    readyState:0,getResponseHeader:function (e) {
                        var t;
                        if (2 === b) {
                            if (!c) {
                                c = {};
                                while (t = Tn.exec(a))c[t[1].toLowerCase()] = t[2]
                            }
                            t = c[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },getAllResponseHeaders:function () {return 2 === b ? a : null},setRequestHeader:function (e,t) {
                        var n = e.toLowerCase();
                        return b || (e = v[n] = v[n] || e, y[e] = t), this
                    },overrideMimeType:function (e) {return b || (p.mimeType = e), this},statusCode:function (e) {
                        var t;
                        if (e)if (2 > b)for (t in e)m[t] = [m[t],e[t]]; else C.always(e[C.status]);
                        return this
                    },abort:function (e) {
                        var t = e || w;
                        return u && u.abort(t), k(0,t), this
                    }
                };
                if (h.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || yn) + "").replace(xn,"").replace(kn,mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = x.trim(p.dataType || "*").toLowerCase().match(T) || [""], null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (mn[3] || ("http:" === mn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = x.param(p.data,p.traditional)), qn(An,p,n,C), 2 === b)return C;
                l = p.global, l && 0 === x.active++ && x.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Nn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn,"$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), p.ifModified && (x.lastModified[o] && C.setRequestHeader("If-Modified-Since",x.lastModified[o]), x.etag[o] && C.setRequestHeader("If-None-Match",x.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type",p.contentType), C.setRequestHeader("Accept",p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]);
                for (i in p.headers)C.setRequestHeader(i,p.headers[i]);
                if (p.beforeSend && (p.beforeSend.call(f,C,p) === !1 || 2 === b))return C.abort();
                w = "abort";
                for (i in{success:1,error:1,complete:1})C[i](p[i]);
                if (u = qn(jn,p,n,C)) {
                    C.readyState = 1, l && d.trigger("ajaxSend",[C,p]), p.async && p.timeout > 0 && (s = setTimeout(function () {C.abort("timeout")},p.timeout));
                    try {b = 1, u.send(y,k)} catch (N) {
                        if (!(2 > b))throw N;
                        k(-1,N)
                    }
                } else k(-1,"No Transport");
                function k(e,n,r,i) {
                    var c,y,v,w,T,N = n;
                    2 !== b && (b = 2, s && clearTimeout(s), u = t, a = i || "", C.readyState = e > 0 ? 4 : 0, c = e >= 200 && 300 > e || 304 === e, r && (w = Mn(p,C,r)), w = On(p,w,C,c), c ? (p.ifModified && (T = C.getResponseHeader("Last-Modified"), T && (x.lastModified[o] = T), T = C.getResponseHeader("etag"), T && (x.etag[o] = T)), 204 === e || "HEAD" === p.type ? N = "nocontent" : 304 === e ? N = "notmodified" : (N = w.state, y = w.data, v = w.error, c = !v)) : (v = N, (e || !N) && (N = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (n || N) + "", c ? h.resolveWith(f,[y,N,C]) : h.rejectWith(f,[C,N,v]), C.statusCode(m), m = t, l && d.trigger(c ? "ajaxSuccess" : "ajaxError",[C,p,c ? y : v]), g.fireWith(f,[C,N]), l && (d.trigger("ajaxComplete",[C,p]), --x.active || x.event.trigger("ajaxStop")))
                }

                return C
            },getJSON:function (e,t,n) {return x.get(e,t,n,"json")},getScript:function (e,n) {return x.get(e,t,n,"script")}
        }), x.each(["get","post"],function (e,n) {x[n] = function (e,r,i,o) {return x.isFunction(r) && (o = o || i, i = r, r = t), x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});
        function Mn(e,n,r) {
            var i,o,a,s,l = e.contents,u = e.dataTypes;
            while ("*" === u[0])u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
            if (o)for (s in l)if (l[s] && l[s].test(o)) {
                u.unshift(s);
                break
            }
            if (u[0] in r) a = u[0]; else {
                for (s in r) {
                    if (!u[0] || e.converters[s + " " + u[0]]) {
                        a = s;
                        break
                    }
                    i || (i = s)
                }
                a = a || i
            }
            return a ? (a !== u[0] && u.unshift(a), r[a]) : t
        }

        function On(e,t,n,r) {
            var i,o,a,s,l,u = {},c = e.dataTypes.slice();
            if (c[1])for (a in e.converters)u[a.toLowerCase()] = e.converters[a];
            o = c.shift();
            while (o)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t,e.dataType)), l = o, o = c.shift())if ("*" === o) o = l; else if ("*" !== l && l !== o) {
                if (a = u[l + " " + o] || u["* " + o], !a)for (i in u)if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                    a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                    break
                }
                if (a !== !0)if (a && e["throws"]) t = a(t); else try {t = a(t)} catch (p) {return {state:"parsererror",error:a ? p : "No conversion from " + l + " to " + o}}
            }
            return {state:"success",data:t}
        }

        x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function (e) {return x.globalEval(e), e}}}), x.ajaxPrefilter("script",function (e) {e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)}), x.ajaxTransport("script",function (e) {
            if (e.crossDomain) {
                var n,r = a.head || x("head")[0] || a.documentElement;
                return {send:function (t,i) {n = a.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e,t) {(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200,"success"))}, r.insertBefore(n,r.firstChild)},abort:function () {n && n.onload(t,!0)}}
            }
        });
        var Fn = [],Bn = /(=)\?(?=&|$)|\?\?/;
        x.ajaxSetup({
            jsonp:"callback",jsonpCallback:function () {
                var e = Fn.pop() || x.expando + "_" + vn++;
                return this[e] = !0, e
            }
        }), x.ajaxPrefilter("json jsonp",function (n,r,i) {
            var o,a,s,l = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data");
            return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = x.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Bn,"$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () {return s || x.error(o + " was not called"), s[0]}, n.dataTypes[0] = "json", a = e[o], e[o] = function () {s = arguments}, i.always(function () {e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Fn.push(o)), s && x.isFunction(a) && a(s[0]), s = a = t}), "script") : t
        });
        var Pn,Rn,Wn = 0,$n = e.ActiveXObject && function () {
                var e;
                for (e in Pn)Pn[e](t,!0)
            };

        function In() {try {return new e.XMLHttpRequest} catch (t) {}}

        function zn() {try {return new e.ActiveXObject("Microsoft.XMLHTTP")} catch (t) {}}

        x.ajaxSettings.xhr = e.ActiveXObject ? function () {return !this.isLocal && In() || zn()} : In, Rn = x.ajaxSettings.xhr(), x.support.cors = !!Rn && "withCredentials" in Rn, Rn = x.support.ajax = !!Rn, Rn && x.ajaxTransport(function (n) {
            if (!n.crossDomain || x.support.cors) {
                var r;
                return {
                    send:function (i,o) {
                        var a,s,l = n.xhr();
                        if (n.username ? l.open(n.type,n.url,n.async,n.username,n.password) : l.open(n.type,n.url,n.async), n.xhrFields)for (s in n.xhrFields)l[s] = n.xhrFields[s];
                        n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                        try {for (s in i)l.setRequestHeader(s,i[s])} catch (u) {}
                        l.send(n.hasContent && n.data || null), r = function (e,i) {
                            var s,u,c,p;
                            try {
                                if (r && (i || 4 === l.readyState))if (r = t, a && (l.onreadystatechange = x.noop, $n && delete Pn[a]), i) 4 !== l.readyState && l.abort(); else {
                                    p = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (p.text = l.responseText);
                                    try {c = l.statusText} catch (f) {c = ""}
                                    s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404
                                }
                            } catch (d) {i || o(-1,d)}
                            p && o(s,c,p,u)
                        }, n.async ? 4 === l.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, x(e).unload($n)), Pn[a] = r), l.onreadystatechange = r) : r()
                    },abort:function () {r && r(t,!0)}
                }
            }
        });
        var Xn,Un,Vn = /^(?:toggle|show|hide)$/,Yn = RegExp("^(?:([+-])=|)(" + w + ")([a-z%]*)$","i"),Jn = /queueHooks$/,Gn = [nr],Qn = {
            "*":[function (e,t) {
                var n = this.createTween(e,t),r = n.cur(),i = Yn.exec(t),o = i && i[3] || (x.cssNumber[e] ? "" : "px"),a = (x.cssNumber[e] || "px" !== o && +r) && Yn.exec(x.css(n.elem,e)),s = 1,l = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], i = i || [], a = +r || 1;
                    do s = s || ".5", a /= s, x.style(n.elem,e,a + o); while (s !== (s = n.cur() / r) && 1 !== s && --l)
                }
                return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };

        function Kn() {return setTimeout(function () {Xn = t}), Xn = x.now()}

        function Zn(e,t,n) {
            var r,i = (Qn[t] || []).concat(Qn["*"]),o = 0,a = i.length;
            for (; a > o; o++)if (r = i[o].call(n,t,e))return r
        }

        function er(e,t,n) {
            var r,i,o = 0,a = Gn.length,s = x.Deferred().always(function () {delete l.elem}),l = function () {
                if (i)return !1;
                var t = Xn || Kn(),n = Math.max(0,u.startTime + u.duration - t),r = n / u.duration || 0,o = 1 - r,a = 0,l = u.tweens.length;
                for (; l > a; a++)u.tweens[a].run(o);
                return s.notifyWith(e,[u,o,n]), 1 > o && l ? n : (s.resolveWith(e,[u]), !1)
            },u = s.promise({
                elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn || Kn(),duration:n.duration,tweens:[],createTween:function (t,n) {
                    var r = x.Tween(e,u.opts,t,n,u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(r), r
                },stop:function (t) {
                    var n = 0,r = t ? u.tweens.length : 0;
                    if (i)return this;
                    for (i = !0; r > n; n++)u.tweens[n].run(1);
                    return t ? s.resolveWith(e,[u,t]) : s.rejectWith(e,[u,t]), this
                }
            }),c = u.props;
            for (tr(c,u.opts.specialEasing); a > o; o++)if (r = Gn[o].call(u,e,c,u.opts))return r;
            return x.map(c,Zn,u), x.isFunction(u.opts.start) && u.opts.start.call(e,u), x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})), u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)
        }

        function tr(e,t) {
            var n,r,i,o,a;
            for (n in e)if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = x.cssHooks[r], a && "expand" in a) {
                o = a.expand(o), delete e[r];
                for (n in o)n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
        }

        x.Animation = x.extend(er,{
            tweener:function (e,t) {
                x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                var n,r = 0,i = e.length;
                for (; i > r; r++)n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t)
            },prefilter:function (e,t) {t ? Gn.unshift(e) : Gn.push(e)}
        });
        function nr(e,t,n) {
            var r,i,o,a,s,l,u = this,c = {},p = e.style,f = e.nodeType && nn(e),d = x._data(e,"fxshow");
            n.queue || (s = x._queueHooks(e,"fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {s.unqueued || l()}), s.unqueued++, u.always(function () {u.always(function () {s.unqueued--, x.queue(e,"fx").length || s.empty.fire()})})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow,p.overflowX,p.overflowY], "inline" === x.css(e,"display") && "none" === x.css(e,"float") && (x.support.inlineBlockNeedsLayout && "inline" !== ln(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", x.support.shrinkWrapBlocks || u.always(function () {p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]}));
            for (r in t)if (i = t[r], Vn.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show"))continue;
                c[r] = d && d[r] || x.style(e,r)
            }
            if (!x.isEmptyObject(c)) {
                d ? "hidden" in d && (f = d.hidden) : d = x._data(e,"fxshow",{}), o && (d.hidden = !f), f ? x(e).show() : u.done(function () {x(e).hide()}), u.done(function () {
                    var t;
                    x._removeData(e,"fxshow");
                    for (t in c)x.style(e,t,c[t])
                });
                for (r in c)a = Zn(f ? d[r] : 0,r,u), r in d || (d[r] = a.start, f && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
            }
        }

        function rr(e,t,n,r,i) {return new rr.prototype.init(e,t,n,r,i)}

        x.Tween = rr, rr.prototype = {
            constructor:rr,init:function (e,t,n,r,i,o) {this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px")},cur:function () {
                var e = rr.propHooks[this.prop];
                return e && e.get ? e.get(this) : rr.propHooks._default.get(this)
            },run:function (e) {
                var t,n = rr.propHooks[this.prop];
                return this.pos = t = this.options.duration ? x.easing[this.easing](e,this.options.duration * e,0,1,this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem,this.now,this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this
            }
        }, rr.prototype.init.prototype = rr.prototype, rr.propHooks = {
            _default:{
                get:function (e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem,e.prop,""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },set:function (e) {x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem,e.prop,e.now + e.unit) : e.elem[e.prop] = e.now}
            }
        }, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = {set:function (e) {e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)}}, x.each(["toggle","show","hide"],function (e,t) {
            var n = x.fn[t];
            x.fn[t] = function (e,r,i) {return null == e || "boolean" == typeof e ? n.apply(this,arguments) : this.animate(ir(t,!0),e,r,i)}
        }), x.fn.extend({
            fadeTo:function (e,t,n,r) {return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function (e,t,n,r) {
                var i = x.isEmptyObject(e),o = x.speed(t,n,r),a = function () {
                    var t = er(this,x.extend({},e),o);
                    (i || x._data(this,"finish")) && t.stop(!0)
                };
                return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue,a)
            },stop:function (e,n,r) {
                var i = function (e) {
                    var t = e.stop;
                    delete e.stop, t(r)
                };
                return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx",[]), this.each(function () {
                    var t = !0,n = null != e && e + "queueHooks",o = x.timers,a = x._data(this);
                    if (n) a[n] && a[n].stop && i(a[n]); else for (n in a)a[n] && a[n].stop && Jn.test(n) && i(a[n]);
                    for (n = o.length; n--;)o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n,1));
                    (t || !r) && x.dequeue(this,e)
                })
            },finish:function (e) {
                return e !== !1 && (e = e || "fx"), this.each(function () {
                    var t,n = x._data(this),r = n[e + "queue"],i = n[e + "queueHooks"],o = x.timers,a = r ? r.length : 0;
                    for (n.finish = !0, x.queue(this,e,[]), i && i.stop && i.stop.call(this,!0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t,1));
                    for (t = 0; a > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        });
        function ir(e,t) {
            var n,r = {height:e},i = 0;
            for (t = t ? 1 : 0; 4 > i; i += 2 - t)n = Zt[i], r["margin" + n] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e), r
        }

        x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function (e,t) {x.fn[e] = function (e,n,r) {return this.animate(t,e,n,r)}}), x.speed = function (e,t,n) {
            var r = e && "object" == typeof e ? x.extend({},e) : {complete:n || !n && t || x.isFunction(e) && e,duration:e,easing:n && t || t && !x.isFunction(t) && t};
            return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this,r.queue)}, r
        }, x.easing = {linear:function (e) {return e},swing:function (e) {return .5 - Math.cos(e * Math.PI) / 2}}, x.timers = [], x.fx = rr.prototype.init, x.fx.tick = function () {
            var e,n = x.timers,r = 0;
            for (Xn = x.now(); n.length > r; r++)e = n[r], e() || n[r] !== e || n.splice(r--,1);
            n.length || x.fx.stop(), Xn = t
        }, x.fx.timer = function (e) {e() && x.timers.push(e) && x.fx.start()}, x.fx.interval = 13, x.fx.start = function () {Un || (Un = setInterval(x.fx.tick,x.fx.interval))}, x.fx.stop = function () {clearInterval(Un), Un = null}, x.fx.speeds = {slow:600,fast:200,_default:400}, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function (e) {return x.grep(x.timers,function (t) {return e === t.elem}).length}), x.fn.offset = function (e) {
            if (arguments.length)return e === t ? this : this.each(function (t) {x.offset.setOffset(this,e,t)});
            var n,r,o = {top:0,left:0},a = this[0],s = a && a.ownerDocument;
            if (s)return n = s.documentElement, x.contains(n,a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = or(s), {top:o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),left:o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)}) : o
        }, x.offset = {
            setOffset:function (e,t,n) {
                var r = x.css(e,"position");
                "static" === r && (e.style.position = "relative");
                var i = x(e),o = i.offset(),a = x.css(e,"top"),s = x.css(e,"left"),l = ("absolute" === r || "fixed" === r) && x.inArray("auto",[a,s]) > -1,u = {},c = {},p,f;
                l ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), x.isFunction(t) && (t = t.call(e,n,o)), null != t.top && (u.top = t.top - o.top + p), null != t.left && (u.left = t.left - o.left + f), "using" in t ? t.using.call(e,u) : i.css(u)
            }
        }, x.fn.extend({
            position:function () {
                if (this[0]) {
                    var e,t,n = {top:0,left:0},r = this[0];
                    return "fixed" === x.css(r,"position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0],"html") || (n = e.offset()), n.top += x.css(e[0],"borderTopWidth",!0), n.left += x.css(e[0],"borderLeftWidth",!0)), {top:t.top - n.top - x.css(r,"marginTop",!0),left:t.left - n.left - x.css(r,"marginLeft",!0)}
                }
            },offsetParent:function () {
                return this.map(function () {
                    var e = this.offsetParent || s;
                    while (e && !x.nodeName(e,"html") && "static" === x.css(e,"position"))e = e.offsetParent;
                    return e || s
                })
            }
        }), x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function (e,n) {
            var r = /Y/.test(n);
            x.fn[e] = function (i) {
                return x.access(this,function (e,i,o) {
                    var a = or(e);
                    return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? x(a).scrollLeft() : o,r ? o : x(a).scrollTop()) : e[i] = o, t)
                },e,i,arguments.length,null)
            }
        });
        function or(e) {return x.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1}

        x.each({Height:"height",Width:"width"},function (e,n) {
            x.each({padding:"inner" + e,content:n,"":"outer" + e},function (r,i) {
                x.fn[i] = function (i,o) {
                    var a = arguments.length && (r || "boolean" != typeof i),s = r || (i === !0 || o === !0 ? "margin" : "border");
                    return x.access(this,function (n,r,i) {
                        var o;
                        return x.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e],o["scroll" + e],n.body["offset" + e],o["offset" + e],o["client" + e])) : i === t ? x.css(n,r,s) : x.style(n,r,i,s)
                    },n,a ? i : t,a,null)
                }
            })
        }), x.fn.size = function () {return this.length}, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : (e.jQuery = e.$ = x, "function" == typeof define && define.amd && define("jquery",[],function () {return x}))
    })(window);                //JQ
    var QRCode;
    (function () {
        function QR8bitByte(data) {
            this.mode = QRMode.MODE_8BIT_BYTE;
            this.data = data;
            this.parsedData = [];
            // Added to support UTF-8 Characters
            for (var i = 0,l = this.data.length; i < l; i++) {
                var byteArray = [];
                var code = this.data.charCodeAt(i);
                if (code > 0x10000) {
                    byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
                    byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
                    byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
                    byteArray[3] = 0x80 | (code & 0x3F);
                } else if (code > 0x800) {
                    byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
                    byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
                    byteArray[2] = 0x80 | (code & 0x3F);
                } else if (code > 0x80) {
                    byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
                    byteArray[1] = 0x80 | (code & 0x3F);
                } else {
                    byteArray[0] = code;
                }
                this.parsedData.push(byteArray);
            }
            this.parsedData = Array.prototype.concat.apply([],this.parsedData);
            if (this.parsedData.length != this.data.length) {
                this.parsedData.unshift(191);
                this.parsedData.unshift(187);
                this.parsedData.unshift(239);
            }
        }

        QR8bitByte.prototype = {
            getLength:function (buffer) {
                return this.parsedData.length;
            },
            write:function (buffer) {
                for (var i = 0,l = this.parsedData.length; i < l; i++) {
                    buffer.put(this.parsedData[i],8);
                }
            }
        };
        function QRCodeModel(typeNumber,errorCorrectLevel) {
            this.typeNumber = typeNumber;
            this.errorCorrectLevel = errorCorrectLevel;
            this.modules = null;
            this.moduleCount = 0;
            this.dataCache = null;
            this.dataList = [];
        }

        QRCodeModel.prototype = {
            addData:function (data) {
                var newData = new QR8bitByte(data);
                this.dataList.push(newData);
                this.dataCache = null;
            },isDark:function (row,col) {
                if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
                    throw new Error(row + "," + col);
                }
                return this.modules[row][col];
            },getModuleCount:function () {
                return this.moduleCount;
            },make:function () {
                this.makeImpl(false,this.getBestMaskPattern());
            },makeImpl:function (test,maskPattern) {
                this.moduleCount = this.typeNumber * 4 + 17;
                this.modules = new Array(this.moduleCount);
                for (var row = 0; row < this.moduleCount; row++) {
                    this.modules[row] = new Array(this.moduleCount);
                    for (var col = 0; col < this.moduleCount; col++) {
                        this.modules[row][col] = null;
                    }
                }
                this.setupPositionProbePattern(0,0);
                this.setupPositionProbePattern(this.moduleCount - 7,0);
                this.setupPositionProbePattern(0,this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(test,maskPattern);
                if (this.typeNumber >= 7) {
                    this.setupTypeNumber(test);
                }
                if (this.dataCache == null) {
                    this.dataCache = QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList);
                }
                this.mapData(this.dataCache,maskPattern);
            },setupPositionProbePattern:function (row,col) {
                for (var r = -1; r <= 7; r++) {
                    if (row + r <= -1 || this.moduleCount <= row + r)continue;
                    for (var c = -1; c <= 7; c++) {
                        if (col + c <= -1 || this.moduleCount <= col + c)continue;
                        if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                            this.modules[row + r][col + c] = true;
                        } else {
                            this.modules[row + r][col + c] = false;
                        }
                    }
                }
            },getBestMaskPattern:function () {
                var minLostPoint = 0;
                var pattern = 0;
                for (var i = 0; i < 8; i++) {
                    this.makeImpl(true,i);
                    var lostPoint = QRUtil.getLostPoint(this);
                    if (i == 0 || minLostPoint > lostPoint) {
                        minLostPoint = lostPoint;
                        pattern = i;
                    }
                }
                return pattern;
            },createMovieClip:function (target_mc,instance_name,depth) {
                var qr_mc = target_mc.createEmptyMovieClip(instance_name,depth);
                var cs = 1;
                this.make();
                for (var row = 0; row < this.modules.length; row++) {
                    var y = row * cs;
                    for (var col = 0; col < this.modules[row].length; col++) {
                        var x = col * cs;
                        var dark = this.modules[row][col];
                        if (dark) {
                            qr_mc.beginFill(0,100);
                            qr_mc.moveTo(x,y);
                            qr_mc.lineTo(x + cs,y);
                            qr_mc.lineTo(x + cs,y + cs);
                            qr_mc.lineTo(x,y + cs);
                            qr_mc.endFill();
                        }
                    }
                }
                return qr_mc;
            },setupTimingPattern:function () {
                for (var r = 8; r < this.moduleCount - 8; r++) {
                    if (this.modules[r][6] != null) {
                        continue;
                    }
                    this.modules[r][6] = (r % 2 == 0);
                }
                for (var c = 8; c < this.moduleCount - 8; c++) {
                    if (this.modules[6][c] != null) {
                        continue;
                    }
                    this.modules[6][c] = (c % 2 == 0);
                }
            },setupPositionAdjustPattern:function () {
                var pos = QRUtil.getPatternPosition(this.typeNumber);
                for (var i = 0; i < pos.length; i++) {
                    for (var j = 0; j < pos.length; j++) {
                        var row = pos[i];
                        var col = pos[j];
                        if (this.modules[row][col] != null) {
                            continue;
                        }
                        for (var r = -2; r <= 2; r++) {
                            for (var c = -2; c <= 2; c++) {
                                if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
                                    this.modules[row + r][col + c] = true;
                                } else {
                                    this.modules[row + r][col + c] = false;
                                }
                            }
                        }
                    }
                }
            },setupTypeNumber:function (test) {
                var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
                for (var i = 0; i < 18; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
                }
                for (var i = 0; i < 18; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
                }
            },setupTypeInfo:function (test,maskPattern) {
                var data = (this.errorCorrectLevel << 3) | maskPattern;
                var bits = QRUtil.getBCHTypeInfo(data);
                for (var i = 0; i < 15; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    if (i < 6) {
                        this.modules[i][8] = mod;
                    } else if (i < 8) {
                        this.modules[i + 1][8] = mod;
                    } else {
                        this.modules[this.moduleCount - 15 + i][8] = mod;
                    }
                }
                for (var i = 0; i < 15; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    if (i < 8) {
                        this.modules[8][this.moduleCount - i - 1] = mod;
                    } else if (i < 9) {
                        this.modules[8][15 - i - 1 + 1] = mod;
                    } else {
                        this.modules[8][15 - i - 1] = mod;
                    }
                }
                this.modules[this.moduleCount - 8][8] = (!test);
            },mapData:function (data,maskPattern) {
                var inc = -1;
                var row = this.moduleCount - 1;
                var bitIndex = 7;
                var byteIndex = 0;
                for (var col = this.moduleCount - 1; col > 0; col -= 2) {
                    if (col == 6) col--;
                    while (true) {
                        for (var c = 0; c < 2; c++) {
                            if (this.modules[row][col - c] == null) {
                                var dark = false;
                                if (byteIndex < data.length) {
                                    dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                                }
                                var mask = QRUtil.getMask(maskPattern,row,col - c);
                                if (mask) {
                                    dark = !dark;
                                }
                                this.modules[row][col - c] = dark;
                                bitIndex--;
                                if (bitIndex == -1) {
                                    byteIndex++;
                                    bitIndex = 7;
                                }
                            }
                        }
                        row += inc;
                        if (row < 0 || this.moduleCount <= row) {
                            row -= inc;
                            inc = -inc;
                            break;
                        }
                    }
                }
            }
        };
        QRCodeModel.PAD0 = 0xEC;
        QRCodeModel.PAD1 = 0x11;
        QRCodeModel.createData = function (typeNumber,errorCorrectLevel,dataList) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber,errorCorrectLevel);
            var buffer = new QRBitBuffer();
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                buffer.put(data.mode,4);
                buffer.put(data.getLength(),QRUtil.getLengthInBits(data.mode,typeNumber));
                data.write(buffer);
            }
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i++) {
                totalDataCount += rsBlocks[i].dataCount;
            }
            if (buffer.getLengthInBits() > totalDataCount * 8) {
                throw new Error("code length overflow. ("
                    + buffer.getLengthInBits()
                    + ">"
                    + totalDataCount * 8
                    + ")");
            }
            if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
                buffer.put(0,4);
            }
            while (buffer.getLengthInBits() % 8 != 0) {
                buffer.putBit(false);
            }
            while (true) {
                if (buffer.getLengthInBits() >= totalDataCount * 8) {
                    break;
                }
                buffer.put(QRCodeModel.PAD0,8);
                if (buffer.getLengthInBits() >= totalDataCount * 8) {
                    break;
                }
                buffer.put(QRCodeModel.PAD1,8);
            }
            return QRCodeModel.createBytes(buffer,rsBlocks);
        };
        QRCodeModel.createBytes = function (buffer,rsBlocks) {
            var offset = 0;
            var maxDcCount = 0;
            var maxEcCount = 0;
            var dcdata = new Array(rsBlocks.length);
            var ecdata = new Array(rsBlocks.length);
            for (var r = 0; r < rsBlocks.length; r++) {
                var dcCount = rsBlocks[r].dataCount;
                var ecCount = rsBlocks[r].totalCount - dcCount;
                maxDcCount = Math.max(maxDcCount,dcCount);
                maxEcCount = Math.max(maxEcCount,ecCount);
                dcdata[r] = new Array(dcCount);
                for (var i = 0; i < dcdata[r].length; i++) {
                    dcdata[r][i] = 0xff & buffer.buffer[i + offset];
                }
                offset += dcCount;
                var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                var rawPoly = new QRPolynomial(dcdata[r],rsPoly.getLength() - 1);
                var modPoly = rawPoly.mod(rsPoly);
                ecdata[r] = new Array(rsPoly.getLength() - 1);
                for (var i = 0; i < ecdata[r].length; i++) {
                    var modIndex = i + modPoly.getLength() - ecdata[r].length;
                    ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
                }
            }
            var totalCodeCount = 0;
            for (var i = 0; i < rsBlocks.length; i++) {
                totalCodeCount += rsBlocks[i].totalCount;
            }
            var data = new Array(totalCodeCount);
            var index = 0;
            for (var i = 0; i < maxDcCount; i++) {
                for (var r = 0; r < rsBlocks.length; r++) {
                    if (i < dcdata[r].length) {
                        data[index++] = dcdata[r][i];
                    }
                }
            }
            for (var i = 0; i < maxEcCount; i++) {
                for (var r = 0; r < rsBlocks.length; r++) {
                    if (i < ecdata[r].length) {
                        data[index++] = ecdata[r][i];
                    }
                }
            }
            return data;
        };
        var QRMode = {MODE_NUMBER:1 << 0,MODE_ALPHA_NUM:1 << 1,MODE_8BIT_BYTE:1 << 2,MODE_KANJI:1 << 3};
        var QRErrorCorrectLevel = {L:1,M:0,Q:3,H:2};
        var QRMaskPattern = {PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};
        var QRUtil = {
            PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],
            G15:(1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
            G18:(1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
            G15_MASK:(1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
            getBCHTypeInfo:function (data) {
                var d = data << 10;
                while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
                    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
                }
                return ((data << 10) | d) ^ QRUtil.G15_MASK;
            },
            getBCHTypeNumber:function (data) {
                var d = data << 12;
                while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
                    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18)));
                }
                return (data << 12) | d;
            },
            getBCHDigit:function (data) {
                var digit = 0;
                while (data != 0) {
                    digit++;
                    data >>>= 1;
                }
                return digit;
            },
            getPatternPosition:function (typeNumber) {
                return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
            },
            getMask:function (maskPattern,i,j) {
                switch (maskPattern) {
                    case QRMaskPattern.PATTERN000:
                        return (i + j) % 2 == 0;
                    case QRMaskPattern.PATTERN001:
                        return i % 2 == 0;
                    case QRMaskPattern.PATTERN010:
                        return j % 3 == 0;
                    case QRMaskPattern.PATTERN011:
                        return (i + j) % 3 == 0;
                    case QRMaskPattern.PATTERN100:
                        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
                    case QRMaskPattern.PATTERN101:
                        return (i * j) % 2 + (i * j) % 3 == 0;
                    case QRMaskPattern.PATTERN110:
                        return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
                    case QRMaskPattern.PATTERN111:
                        return ((i * j) % 3 + (i + j) % 2) % 2 == 0;
                    default:
                        throw new Error("bad maskPattern:" + maskPattern);
                }
            },
            getErrorCorrectPolynomial:function (errorCorrectLength) {
                var a = new QRPolynomial([1],0);
                for (var i = 0; i < errorCorrectLength; i++) {
                    a = a.multiply(new QRPolynomial([1,QRMath.gexp(i)],0));
                }
                return a;
            },
            getLengthInBits:function (mode,type) {
                if (1 <= type && type < 10) {
                    switch (mode) {
                        case QRMode.MODE_NUMBER:
                            return 10;
                        case QRMode.MODE_ALPHA_NUM:
                            return 9;
                        case QRMode.MODE_8BIT_BYTE:
                            return 8;
                        case QRMode.MODE_KANJI:
                            return 8;
                        default:
                            throw new Error("mode:" + mode);
                    }
                } else if (type < 27) {
                    switch (mode) {
                        case QRMode.MODE_NUMBER:
                            return 12;
                        case QRMode.MODE_ALPHA_NUM:
                            return 11;
                        case QRMode.MODE_8BIT_BYTE:
                            return 16;
                        case QRMode.MODE_KANJI:
                            return 10;
                        default:
                            throw new Error("mode:" + mode);
                    }
                } else if (type < 41) {
                    switch (mode) {
                        case QRMode.MODE_NUMBER:
                            return 14;
                        case QRMode.MODE_ALPHA_NUM:
                            return 13;
                        case QRMode.MODE_8BIT_BYTE:
                            return 16;
                        case QRMode.MODE_KANJI:
                            return 12;
                        default:
                            throw new Error("mode:" + mode);
                    }
                } else {
                    throw new Error("type:" + type);
                }
            },
            getLostPoint:function (qrCode) {
                var moduleCount = qrCode.getModuleCount();
                var lostPoint = 0;
                for (var row = 0; row < moduleCount; row++) {
                    for (var col = 0; col < moduleCount; col++) {
                        var sameCount = 0;
                        var dark = qrCode.isDark(row,col);
                        for (var r = -1; r <= 1; r++) {
                            if (row + r < 0 || moduleCount <= row + r) {
                                continue;
                            }
                            for (var c = -1; c <= 1; c++) {
                                if (col + c < 0 || moduleCount <= col + c) {
                                    continue;
                                }
                                if (r == 0 && c == 0) {
                                    continue;
                                }
                                if (dark == qrCode.isDark(row + r,col + c)) {
                                    sameCount++;
                                }
                            }
                        }
                        if (sameCount > 5) {
                            lostPoint += (3 + sameCount - 5);
                        }
                    }
                }
                for (var row = 0; row < moduleCount - 1; row++) {
                    for (var col = 0; col < moduleCount - 1; col++) {
                        var count = 0;
                        if (qrCode.isDark(row,col)) count++;
                        if (qrCode.isDark(row + 1,col)) count++;
                        if (qrCode.isDark(row,col + 1)) count++;
                        if (qrCode.isDark(row + 1,col + 1)) count++;
                        if (count == 0 || count == 4) {
                            lostPoint += 3;
                        }
                    }
                }
                for (var row = 0; row < moduleCount; row++) {
                    for (var col = 0; col < moduleCount - 6; col++) {
                        if (qrCode.isDark(row,col) && !qrCode.isDark(row,col + 1) && qrCode.isDark(row,col + 2) && qrCode.isDark(row,col + 3) && qrCode.isDark(row,col + 4) && !qrCode.isDark(row,col + 5) && qrCode.isDark(row,col + 6)) {
                            lostPoint += 40;
                        }
                    }
                }
                for (var col = 0; col < moduleCount; col++) {
                    for (var row = 0; row < moduleCount - 6; row++) {
                        if (qrCode.isDark(row,col) && !qrCode.isDark(row + 1,col) && qrCode.isDark(row + 2,col) && qrCode.isDark(row + 3,col) && qrCode.isDark(row + 4,col) && !qrCode.isDark(row + 5,col) && qrCode.isDark(row + 6,col)) {
                            lostPoint += 40;
                        }
                    }
                }
                var darkCount = 0;
                for (var col = 0; col < moduleCount; col++) {
                    for (var row = 0; row < moduleCount; row++) {
                        if (qrCode.isDark(row,col)) {
                            darkCount++;
                        }
                    }
                }
                var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
                lostPoint += ratio * 10;
                return lostPoint;
            }
        };
        var QRMath = {
            glog:function (n) {
                if (n < 1) {
                    throw new Error("glog(" + n + ")");
                }
                return QRMath.LOG_TABLE[n];
            },gexp:function (n) {
                while (n < 0) {
                    n += 255;
                }
                while (n >= 256) {
                    n -= 255;
                }
                return QRMath.EXP_TABLE[n];
            },EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)
        };
        for (var i = 0; i < 8; i++) {
            QRMath.EXP_TABLE[i] = 1 << i;
        }
        for (var i = 8; i < 256; i++) {
            QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
        }
        for (var i = 0; i < 255; i++) {
            QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
        }
        function QRPolynomial(num,shift) {
            if (num.length == undefined) {
                throw new Error(num.length + "/" + shift);
            }
            var offset = 0;
            while (offset < num.length && num[offset] == 0) {
                offset++;
            }
            this.num = new Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i++) {
                this.num[i] = num[i + offset];
            }
        }

        QRPolynomial.prototype = {
            get:function (index) {
                return this.num[index];
            },getLength:function () {
                return this.num.length;
            },multiply:function (e) {
                var num = new Array(this.getLength() + e.getLength() - 1);
                for (var i = 0; i < this.getLength(); i++) {
                    for (var j = 0; j < e.getLength(); j++) {
                        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
                    }
                }
                return new QRPolynomial(num,0);
            },mod:function (e) {
                if (this.getLength() - e.getLength() < 0) {
                    return this;
                }
                var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
                var num = new Array(this.getLength());
                for (var i = 0; i < this.getLength(); i++) {
                    num[i] = this.get(i);
                }
                for (var i = 0; i < e.getLength(); i++) {
                    num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
                }
                return new QRPolynomial(num,0).mod(e);
            }
        };
        function QRRSBlock(totalCount,dataCount) {
            this.totalCount = totalCount;
            this.dataCount = dataCount;
        }

        QRRSBlock.RS_BLOCK_TABLE = [[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];
        QRRSBlock.getRSBlocks = function (typeNumber,errorCorrectLevel) {
            var rsBlock = QRRSBlock.getRsBlockTable(typeNumber,errorCorrectLevel);
            if (rsBlock == undefined) {
                throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
            }
            var length = rsBlock.length / 3;
            var list = [];
            for (var i = 0; i < length; i++) {
                var count = rsBlock[i * 3 + 0];
                var totalCount = rsBlock[i * 3 + 1];
                var dataCount = rsBlock[i * 3 + 2];
                for (var j = 0; j < count; j++) {
                    list.push(new QRRSBlock(totalCount,dataCount));
                }
            }
            return list;
        };
        QRRSBlock.getRsBlockTable = function (typeNumber,errorCorrectLevel) {
            switch (errorCorrectLevel) {
                case QRErrorCorrectLevel.L:
                    return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
                case QRErrorCorrectLevel.M:
                    return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
                case QRErrorCorrectLevel.Q:
                    return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
                case QRErrorCorrectLevel.H:
                    return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
                default:
                    return undefined;
            }
        };
        function QRBitBuffer() {
            this.buffer = [];
            this.length = 0;
        }

        QRBitBuffer.prototype = {
            get:function (index) {
                var bufIndex = Math.floor(index / 8);
                return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1;
            },put:function (num,length) {
                for (var i = 0; i < length; i++) {
                    this.putBit(((num >>> (length - i - 1)) & 1) == 1);
                }
            },getLengthInBits:function () {
                return this.length;
            },putBit:function (bit) {
                var bufIndex = Math.floor(this.length / 8);
                if (this.buffer.length <= bufIndex) {
                    this.buffer.push(0);
                }
                if (bit) {
                    this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
                }
                this.length++;
            }
        };
        var QRCodeLimitLength = [[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];

        function _isSupportCanvas() {
            return typeof CanvasRenderingContext2D != "undefined";
        }

        function _getAndroid() {
            var android = false;
            var sAgent = navigator.userAgent;
            if (/android/i.test(sAgent)) { // android
                android = true;
                var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
                if (aMat && aMat[1]) {
                    android = parseFloat(aMat[1]);
                }
            }
            return android;
        }

        var svgDrawer = (function () {
            var Drawing = function (el,htOption) {
                this._el = el;
                this._htOption = htOption;
            };
            Drawing.prototype.draw = function (oQRCode) {
                var _htOption = this._htOption;
                var _el = this._el;
                var nCount = oQRCode.getModuleCount();
                var nWidth = Math.floor(_htOption.width / nCount);
                var nHeight = Math.floor(_htOption.height / nCount);
                this.clear();
                function makeSVG(tag,attrs) {
                    var el = document.createElementNS('http://www.w3.org/2000/svg',tag);
                    for (var k in attrs)
                        if (attrs.hasOwnProperty(k)) el.setAttribute(k,attrs[k]);
                    return el;
                }

                var svg = makeSVG("svg",{'viewBox':'0 0 ' + String(nCount) + " " + String(nCount),'width':'100%','height':'100%','fill':_htOption.colorLight});
                svg.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");
                _el.appendChild(svg);
                svg.appendChild(makeSVG("rect",{"fill":_htOption.colorLight,"width":"100%","height":"100%"}));
                svg.appendChild(makeSVG("rect",{"fill":_htOption.colorDark,"width":"1","height":"1","id":"template"}));
                for (var row = 0; row < nCount; row++) {
                    for (var col = 0; col < nCount; col++) {
                        if (oQRCode.isDark(row,col)) {
                            var child = makeSVG("use",{"x":String(col),"y":String(row)});
                            child.setAttributeNS("http://www.w3.org/1999/xlink","href","#template")
                            svg.appendChild(child);
                        }
                    }
                }
            };
            Drawing.prototype.clear = function () {
                while (this._el.hasChildNodes())
                    this._el.removeChild(this._el.lastChild);
            };
            return Drawing;
        })();
        var useSVG = document.documentElement.tagName.toLowerCase() === "svg";
        var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
            var Drawing = function (el,htOption) {
                this._el = el;
                this._htOption = htOption;
            };
            /**
             * Draw the QRCode
             *
             * @param {QRCode} oQRCode
             */
            Drawing.prototype.draw = function (oQRCode) {
                var _htOption = this._htOption;
                var _el = this._el;
                var nCount = oQRCode.getModuleCount();
                var nWidth = Math.floor(_htOption.width / nCount);
                var nHeight = Math.floor(_htOption.height / nCount);
                var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
                for (var row = 0; row < nCount; row++) {
                    aHTML.push('<tr>');
                    for (var col = 0; col < nCount; col++) {
                        aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row,col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
                    }
                    aHTML.push('</tr>');
                }
                aHTML.push('</table>');
                _el.innerHTML = aHTML.join('');
                // Fix the margin values as real size.
                var elTable = _el.childNodes[0];
                var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
                var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
                if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
                    elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";
                }
            };
            /**
             * Clear the QRCode
             */
            Drawing.prototype.clear = function () {
                this._el.innerHTML = '';
            };
            return Drawing;
        })() : (function () { // Drawing in Canvas
            function _onMakeImage() {
                this._elImage.src = this._elCanvas.toDataURL("image/png");
                this._elImage.style.display = "block";
                this._elCanvas.style.display = "none";
            }

            // Android 2.1 bug workaround
            // http://code.google.com/p/android/issues/detail?id=5141
            if (this._android && this._android <= 2.1) {
                var factor = 1 / window.devicePixelRatio;
                var drawImage = CanvasRenderingContext2D.prototype.drawImage;
                CanvasRenderingContext2D.prototype.drawImage = function (image,sx,sy,sw,sh,dx,dy,dw,dh) {
                    if (("nodeName" in image) && /img/i.test(image.nodeName)) {
                        for (var i = arguments.length - 1; i >= 1; i--) {
                            arguments[i] = arguments[i] * factor;
                        }
                    } else if (typeof dw == "undefined") {
                        arguments[1] *= factor;
                        arguments[2] *= factor;
                        arguments[3] *= factor;
                        arguments[4] *= factor;
                    }
                    drawImage.apply(this,arguments);
                };
            }
            /**
             * Check whether the user's browser supports Data URI or not
             *
             * @private
             * @param {Function} fSuccess Occurs if it supports Data URI
             * @param {Function} fFail Occurs if it doesn't support Data URI
             */
            function _safeSetDataURI(fSuccess,fFail) {
                var self = this;
                self._fFail = fFail;
                self._fSuccess = fSuccess;
                // Check it just once
                if (self._bSupportDataURI === null) {
                    var el = document.createElement("img");
                    var fOnError = function () {
                        self._bSupportDataURI = false;
                        if (self._fFail) {
                            self._fFail.call(self);
                        }
                    };
                    var fOnSuccess = function () {
                        self._bSupportDataURI = true;
                        if (self._fSuccess) {
                            self._fSuccess.call(self);
                        }
                    };
                    el.onabort = fOnError;
                    el.onerror = fOnError;
                    el.onload = fOnSuccess;
                    el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
                    return;
                } else if (self._bSupportDataURI === true && self._fSuccess) {
                    self._fSuccess.call(self);
                } else if (self._bSupportDataURI === false && self._fFail) {
                    self._fFail.call(self);
                }
            };
            /**
             * Drawing QRCode by using canvas
             *
             * @constructor
             * @param {HTMLElement} el
             * @param {Object} htOption QRCode Options
             */
            var Drawing = function (el,htOption) {
                this._bIsPainted = false;
                this._android = _getAndroid();
                this._htOption = htOption;
                this._elCanvas = document.createElement("canvas");
                this._elCanvas.width = htOption.width;
                this._elCanvas.height = htOption.height;
                el.appendChild(this._elCanvas);
                this._el = el;
                this._oContext = this._elCanvas.getContext("2d");
                this._bIsPainted = false;
                this._elImage = document.createElement("img");
                this._elImage.alt = "Scan me!";
                this._elImage.style.display = "none";
                this._el.appendChild(this._elImage);
                this._bSupportDataURI = null;
            };
            /**
             * Draw the QRCode
             *
             * @param {QRCode} oQRCode
             */
            Drawing.prototype.draw = function (oQRCode) {
                var _elImage = this._elImage;
                var _oContext = this._oContext;
                var _htOption = this._htOption;
                var nCount = oQRCode.getModuleCount();
                var nWidth = _htOption.width / nCount;
                var nHeight = _htOption.height / nCount;
                var nRoundedWidth = Math.round(nWidth);
                var nRoundedHeight = Math.round(nHeight);
                _elImage.style.display = "none";
                this.clear();
                for (var row = 0; row < nCount; row++) {
                    for (var col = 0; col < nCount; col++) {
                        var bIsDark = oQRCode.isDark(row,col);
                        var nLeft = col * nWidth;
                        var nTop = row * nHeight;
                        _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                        _oContext.lineWidth = 1;
                        _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                        _oContext.fillRect(nLeft,nTop,nWidth,nHeight);
                        // 안티 앨리어싱 방지 처리
                        _oContext.strokeRect(
                            Math.floor(nLeft) + 0.5,
                            Math.floor(nTop) + 0.5,
                            nRoundedWidth,
                            nRoundedHeight
                        );
                        _oContext.strokeRect(
                            Math.ceil(nLeft) - 0.5,
                            Math.ceil(nTop) - 0.5,
                            nRoundedWidth,
                            nRoundedHeight
                        );
                    }
                }
                this._bIsPainted = true;
            };
            /**
             * Make the image from Canvas if the browser supports Data URI.
             */
            Drawing.prototype.makeImage = function () {
                if (this._bIsPainted) {
                    _safeSetDataURI.call(this,_onMakeImage);
                }
            };
            /**
             * Return whether the QRCode is painted or not
             *
             * @return {Boolean}
             */
            Drawing.prototype.isPainted = function () {
                return this._bIsPainted;
            };
            /**
             * Clear the QRCode
             */
            Drawing.prototype.clear = function () {
                this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height);
                this._bIsPainted = false;
            };
            /**
             * @private
             * @param {Number} nNumber
             */
            Drawing.prototype.round = function (nNumber) {
                if (!nNumber) {
                    return nNumber;
                }
                return Math.floor(nNumber * 1000) / 1000;
            };
            return Drawing;
        })();

        function _getTypeNumber(sText,nCorrectLevel) {
            var nType = 1;
            var length = _getUTF8Length(sText);
            for (var i = 0,len = QRCodeLimitLength.length; i <= len; i++) {
                var nLimit = 0;
                switch (nCorrectLevel) {
                    case QRErrorCorrectLevel.L :
                        nLimit = QRCodeLimitLength[i][0];
                        break;
                    case QRErrorCorrectLevel.M :
                        nLimit = QRCodeLimitLength[i][1];
                        break;
                    case QRErrorCorrectLevel.Q :
                        nLimit = QRCodeLimitLength[i][2];
                        break;
                    case QRErrorCorrectLevel.H :
                        nLimit = QRCodeLimitLength[i][3];
                        break;
                }
                if (length <= nLimit) {
                    break;
                } else {
                    nType++;
                }
            }
            if (nType > QRCodeLimitLength.length) {
                throw new Error("Too long data");
            }
            return nType;
        }

        function _getUTF8Length(sText) {
            var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g,'a');
            return replacedText.length + (replacedText.length != sText ? 3 : 0);
        }

        QRCode = function (el,vOption) {
            this._htOption = {
                width:256,
                height:256,
                typeNumber:4,
                colorDark:"#000000",
                colorLight:"#ffffff",
                correctLevel:QRErrorCorrectLevel.H
            };
            if (typeof vOption === 'string') {
                vOption = {
                    text:vOption
                };
            }
            // Overwrites options
            if (vOption) {
                for (var i in vOption) {
                    this._htOption[i] = vOption[i];
                }
            }
            if (typeof el == "string") {
                el = document.getElementById(el);
            }
            if (this._htOption.useSVG) {
                Drawing = svgDrawer;
            }
            this._android = _getAndroid();
            this._el = el;
            this._oQRCode = null;
            this._oDrawing = new Drawing(this._el,this._htOption);
            if (this._htOption.text) {
                this.makeCode(this._htOption.text);
            }
        };
        QRCode.prototype.makeCode = function (sText) {
            this._oQRCode = new QRCodeModel(_getTypeNumber(sText,this._htOption.correctLevel),this._htOption.correctLevel);
            this._oQRCode.addData(sText);
            this._oQRCode.make();
            this._el.title = sText;
            this._oDrawing.draw(this._oQRCode);
            this.makeImage();
        };
        QRCode.prototype.makeImage = function () {
            if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
                this._oDrawing.makeImage();
            }
        };
        QRCode.prototype.clear = function () {
            this._oDrawing.clear();
        };
        QRCode.CorrectLevel = QRErrorCorrectLevel;
    })();                       //生成二维码
    function md5(t) {
        function e(t,e) {
            return t << e | t >>> 32 - e
        }

        function n(t,e) {
            var n,i,r,o,a;
            return r = 2147483648 & t, o = 2147483648 & e, n = 1073741824 & t, i = 1073741824 & e, a = (1073741823 & t) + (1073741823 & e), n & i ? 2147483648 ^ a ^ r ^ o : n | i ? 1073741824 & a ? 3221225472 ^ a ^ r ^ o : 1073741824 ^ a ^ r ^ o : a ^ r ^ o
        }

        function i(t,e,n) {
            return t & e | ~t & n
        }

        function r(t,e,n) {
            return t & n | e & ~n
        }

        function o(t,e,n) {
            return t ^ e ^ n
        }

        function a(t,e,n) {
            return e ^ (t | ~n)
        }

        function s(t,r,o,a,s,u,l) {
            return t = n(t,n(n(i(r,o,a),s),l)), n(e(t,u),r)
        }

        function u(t,i,o,a,s,u,l) {
            return t = n(t,n(n(r(i,o,a),s),l)), n(e(t,u),i)
        }

        function l(t,i,r,a,s,u,l) {
            return t = n(t,n(n(o(i,r,a),s),l)), n(e(t,u),i)
        }

        function c(t,i,r,o,s,u,l) {
            return t = n(t,n(n(a(i,r,o),s),l)), n(e(t,u),i)
        }

        function p(t) {
            var e,n,i = "",r = "";
            for (n = 0; 3 >= n; n++) e = t >>> 8 * n & 255, r = "0" + e.toString(16), i += r.substr(r.length - 2,2);
            return i
        }

        var f,d,h,g,m,v,y,b,k,x = [];
        for (t = function (t) {
            t = t.replace(/\r\n/g,"\n");
            for (var e = "",n = 0; n < t.length; n++) {
                var i = t.charCodeAt(n);
                128 > i ? e += String.fromCharCode(i) : i > 127 && 2048 > i ? (e += String.fromCharCode(i >> 6 | 192), e += String.fromCharCode(63 & i | 128)) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128), e += String.fromCharCode(63 & i | 128))
            }
            return e
        }(t), x = function (t) {
            for (var e,n = t.length,i = n + 8,r = (i - i % 64) / 64,o = 16 * (r + 1),a = new Array(o - 1),s = 0,u = 0; n > u;) e = (u - u % 4) / 4, s = u % 4 * 8, a[e] = a[e] | t.charCodeAt(u) << s, u++;
            return e = (u - u % 4) / 4, s = u % 4 * 8, a[e] = a[e] | 128 << s, a[o - 2] = n << 3, a[o - 1] = n >>> 29, a
        }(t), v = 1732584193, y = 4023233417, b = 2562383102, k = 271733878, f = 0; f < x.length; f += 16) d = v, h = y, g = b, m = k, v = s(v,y,b,k,x[f + 0],7,3614090360), k = s(k,v,y,b,x[f + 1],12,3905402710), b = s(b,k,v,y,x[f + 2],17,606105819), y = s(y,b,k,v,x[f + 3],22,3250441966), v = s(v,y,b,k,x[f + 4],7,4118548399), k = s(k,v,y,b,x[f + 5],12,1200080426), b = s(b,k,v,y,x[f + 6],17,2821735955), y = s(y,b,k,v,x[f + 7],22,4249261313), v = s(v,y,b,k,x[f + 8],7,1770035416), k = s(k,v,y,b,x[f + 9],12,2336552879), b = s(b,k,v,y,x[f + 10],17,4294925233), y = s(y,b,k,v,x[f + 11],22,2304563134), v = s(v,y,b,k,x[f + 12],7,1804603682), k = s(k,v,y,b,x[f + 13],12,4254626195), b = s(b,k,v,y,x[f + 14],17,2792965006), y = s(y,b,k,v,x[f + 15],22,1236535329), v = u(v,y,b,k,x[f + 1],5,4129170786), k = u(k,v,y,b,x[f + 6],9,3225465664), b = u(b,k,v,y,x[f + 11],14,643717713), y = u(y,b,k,v,x[f + 0],20,3921069994), v = u(v,y,b,k,x[f + 5],5,3593408605), k = u(k,v,y,b,x[f + 10],9,38016083), b = u(b,k,v,y,x[f + 15],14,3634488961), y = u(y,b,k,v,x[f + 4],20,3889429448), v = u(v,y,b,k,x[f + 9],5,568446438), k = u(k,v,y,b,x[f + 14],9,3275163606), b = u(b,k,v,y,x[f + 3],14,4107603335), y = u(y,b,k,v,x[f + 8],20,1163531501), v = u(v,y,b,k,x[f + 13],5,2850285829), k = u(k,v,y,b,x[f + 2],9,4243563512), b = u(b,k,v,y,x[f + 7],14,1735328473), y = u(y,b,k,v,x[f + 12],20,2368359562), v = l(v,y,b,k,x[f + 5],4,4294588738), k = l(k,v,y,b,x[f + 8],11,2272392833), b = l(b,k,v,y,x[f + 11],16,1839030562), y = l(y,b,k,v,x[f + 14],23,4259657740), v = l(v,y,b,k,x[f + 1],4,2763975236), k = l(k,v,y,b,x[f + 4],11,1272893353), b = l(b,k,v,y,x[f + 7],16,4139469664), y = l(y,b,k,v,x[f + 10],23,3200236656), v = l(v,y,b,k,x[f + 13],4,681279174), k = l(k,v,y,b,x[f + 0],11,3936430074), b = l(b,k,v,y,x[f + 3],16,3572445317), y = l(y,b,k,v,x[f + 6],23,76029189), v = l(v,y,b,k,x[f + 9],4,3654602809), k = l(k,v,y,b,x[f + 12],11,3873151461), b = l(b,k,v,y,x[f + 15],16,530742520), y = l(y,b,k,v,x[f + 2],23,3299628645), v = c(v,y,b,k,x[f + 0],6,4096336452), k = c(k,v,y,b,x[f + 7],10,1126891415), b = c(b,k,v,y,x[f + 14],15,2878612391), y = c(y,b,k,v,x[f + 5],21,4237533241), v = c(v,y,b,k,x[f + 12],6,1700485571), k = c(k,v,y,b,x[f + 3],10,2399980690), b = c(b,k,v,y,x[f + 10],15,4293915773), y = c(y,b,k,v,x[f + 1],21,2240044497), v = c(v,y,b,k,x[f + 8],6,1873313359), k = c(k,v,y,b,x[f + 15],10,4264355552), b = c(b,k,v,y,x[f + 6],15,2734768916), y = c(y,b,k,v,x[f + 13],21,1309151649), v = c(v,y,b,k,x[f + 4],6,4149444226), k = c(k,v,y,b,x[f + 11],10,3174756917), b = c(b,k,v,y,x[f + 2],15,718787259), y = c(y,b,k,v,x[f + 9],21,3951481745), v = n(v,d), y = n(y,h), b = n(b,g), k = n(k,m);
        return (p(v) + p(y) + p(b) + p(k)).toLowerCase()
    }                        // md5
    (function (global,factory) {typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(global) : typeof define === "function" && define.amd ? define(factory) : factory(global)})(typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this,function (global) {
        "use strict";
        var _Base64 = global.Base64;
        var version = "2.4.5";
        var buffer;
        if (typeof module !== "undefined" && module.exports) {try {buffer = require("buffer").Buffer} catch (err) {}}
        var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var b64tab = function (bin) {
            var t = {};
            for (var i = 0,l = bin.length; i < l; i++)t[bin.charAt(i)] = i;
            return t
        }(b64chars);
        var fromCharCode = String.fromCharCode;
        var cb_utob = function (c) {
            if (c.length < 2) {
                var cc = c.charCodeAt(0);
                return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
            } else {
                var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
                return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
            }
        };
        var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
        var utob = function (u) {return u.replace(re_utob,cb_utob)};
        var cb_encode = function (ccc) {
            var padlen = [0,2,1][ccc.length % 3],ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),chars = [b64chars.charAt(ord >>> 18),b64chars.charAt(ord >>> 12 & 63),padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63),padlen >= 1 ? "=" : b64chars.charAt(ord & 63)];
            return chars.join("")
        };
        var btoa = global.btoa ? function (b) {return global.btoa(b)} : function (b) {return b.replace(/[\s\S]{1,3}/g,cb_encode)};
        var _encode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (u) {return (u.constructor === buffer.constructor ? u : buffer.from(u)).toString("base64")} : function (u) {return (u.constructor === buffer.constructor ? u : new buffer(u)).toString("base64")} : function (u) {return btoa(utob(u))};
        var encode = function (u,urisafe) {return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g,function (m0) {return m0 == "+" ? "-" : "_"}).replace(/=/g,"")};
        var encodeURI = function (u) {return encode(u,true)};
        var re_btou = new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");
        var cb_btou = function (cccc) {
            switch (cccc.length) {
                case 4:
                    var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3),offset = cp - 65536;
                    return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
                case 3:
                    return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
                default:
                    return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
            }
        };
        var btou = function (b) {return b.replace(re_btou,cb_btou)};
        var cb_decode = function (cccc) {
            var len = cccc.length,padlen = len % 4,n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),chars = [fromCharCode(n >>> 16),fromCharCode(n >>> 8 & 255),fromCharCode(n & 255)];
            chars.length -= [0,0,2,1][padlen];
            return chars.join("")
        };
        var atob = global.atob ? function (a) {return global.atob(a)} : function (a) {return a.replace(/[\s\S]{1,4}/g,cb_decode)};
        var _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (a) {return (a.constructor === buffer.constructor ? a : buffer.from(a,"base64")).toString()} : function (a) {return (a.constructor === buffer.constructor ? a : new buffer(a,"base64")).toString()} : function (a) {return btou(atob(a))};
        var decode = function (a) {return _decode(String(a).replace(/[-_]/g,function (m0) {return m0 == "-" ? "+" : "/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};
        var noConflict = function () {
            var Base64 = global.Base64;
            global.Base64 = _Base64;
            return Base64
        };
        global.Base64 = {VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict};
        if (typeof Object.defineProperty === "function") {
            var noEnum = function (v) {return {value:v,enumerable:false,writable:true,configurable:true}};
            global.Base64.extendString = function () {
                Object.defineProperty(String.prototype,"fromBase64",noEnum(function () {return decode(this)}));
                Object.defineProperty(String.prototype,"toBase64",noEnum(function (urisafe) {return encode(this,urisafe)}));
                Object.defineProperty(String.prototype,"toBase64URI",noEnum(function () {return encode(this,true)}))
            }
        }
        if (global["Meteor"]) {Base64 = global.Base64}
        if (typeof module !== "undefined" && module.exports) {module.exports.Base64 = global.Base64} else if (typeof define === "function" && define.amd) {define([],function () {return global.Base64})}
        return {Base64:global.Base64}
    });
    (function (t,e) {"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([],e) : "object" == typeof exports ? exports.Typed = e() : t.Typed = e()})(this,function () {
        return function (t) {
            function e(n) {
                if (s[n])return s[n].exports;
                var i = s[n] = {exports:{},id:n,loaded:!1};
                return t[n].call(i.exports,i,i.exports,e), i.loaded = !0, i.exports
            }

            var s = {};
            return e.m = t, e.c = s, e.p = "", e(0)
        }([function (t,e,s) {
            "use strict";
            function n(t,e) {if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")}

            Object.defineProperty(e,"__esModule",{value:!0});
            var i = function () {
                function t(t,e) {
                    for (var s = 0; s < e.length; s++) {
                        var n = e[s];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t,n.key,n)
                    }
                }

                return function (e,s,n) {return s && t(e.prototype,s), n && t(e,n), e}
            }(),r = s(1),o = s(3),a = function () {
                function t(e,s) {n(this,t), r.initializer.load(this,s,e), this.begin()}

                return i(t,[{key:"toggle",value:function () {this.pause.status ? this.start() : this.stop()}},{key:"stop",value:function () {this.typingComplete || this.pause.status || (this.toggleBlinking(!0), this.pause.status = !0, this.options.onStop(this.arrayPos,this))}},{key:"start",value:function () {this.typingComplete || this.pause.status && (this.pause.status = !1, this.pause.typewrite ? this.typewrite(this.pause.curString,this.pause.curStrPos) : this.backspace(this.pause.curString,this.pause.curStrPos), this.options.onStart(this.arrayPos,this))}},{key:"destroy",value:function () {this.reset(!1), this.options.onDestroy(this)}},{
                    key:"reset",value:function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                        clearInterval(this.timeout), this.replaceText(""), this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), this.cursor = null), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, t && (this.insertCursor(), this.options.onReset(this), this.begin())
                    }
                },{
                    key:"begin",value:function () {
                        var t = this;
                        this.typingComplete = !1, this.shuffleStringsIfNeeded(this), this.insertCursor(), this.bindInputFocusEvents && this.bindFocusEvents(), this.timeout = setTimeout(function () {t.currentElContent && 0 !== t.currentElContent.length ? t.backspace(t.currentElContent,t.currentElContent.length) : t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos)},this.startDelay)
                    }
                },{
                    key:"typewrite",value:function (t,e) {
                        var s = this;
                        this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor && this.cursor.classList.remove(this.fadeOutClass));
                        var n = this.humanizer(this.typeSpeed),i = 1;
                        return this.pause.status === !0 ? void this.setPauseStatus(t,e,!0) : void(this.timeout = setTimeout(function () {
                            e = o.htmlParser.typeHtmlChars(t,e,s);
                            var n = 0,r = t.substr(e);
                            if ("^" === r.charAt(0) && /^\^\d+/.test(r)) {
                                var a = 1;
                                r = /\d+/.exec(r)[0], a += r.length, n = parseInt(r), s.temporaryPause = !0, s.options.onTypingPaused(s.arrayPos,s), t = t.substring(0,e) + t.substring(e + a), s.toggleBlinking(!0)
                            }
                            if ("`" === r.charAt(0)) {
                                for (; "`" !== t.substr(e + i).charAt(0) && (i++, !(e + i > t.length)););
                                var u = t.substring(0,e),l = t.substring(u.length + 1,e + i),c = t.substring(e + i + 1);
                                t = u + l + c, i--
                            }
                            s.timeout = setTimeout(function () {s.toggleBlinking(!1), e === t.length ? s.doneTyping(t,e) : s.keepTyping(t,e,i), s.temporaryPause && (s.temporaryPause = !1, s.options.onTypingResumed(s.arrayPos,s))},n)
                        },n))
                    }
                },{
                    key:"keepTyping",value:function (t,e,s) {
                        0 === e && (this.toggleBlinking(!1), this.options.preStringTyped(this.arrayPos,this)), e += s;
                        var n = t.substr(0,e);
                        this.replaceText(n), this.typewrite(t,e)
                    }
                },{
                    key:"doneTyping",value:function (t,e) {
                        var s = this;
                        this.options.onStringTyped(this.arrayPos,this), this.toggleBlinking(!0), this.arrayPos === this.strings.length - 1 && (this.complete(), this.loop === !1 || this.curLoop === this.loopCount) || (this.timeout = setTimeout(function () {s.backspace(t,e)},this.backDelay))
                    }
                },{
                    key:"backspace",value:function (t,e) {
                        var s = this;
                        if (this.pause.status === !0)return void this.setPauseStatus(t,e,!0);
                        if (this.fadeOut)return this.initFadeOut();
                        this.toggleBlinking(!1);
                        var n = this.humanizer(this.backSpeed);
                        this.timeout = setTimeout(function () {
                            e = o.htmlParser.backSpaceHtmlChars(t,e,s);
                            var n = t.substr(0,e);
                            if (s.replaceText(n), s.smartBackspace) {
                                var i = s.strings[s.arrayPos + 1];
                                i && n === i.substr(0,e) ? s.stopNum = e : s.stopNum = 0
                            }
                            e > s.stopNum ? (e--, s.backspace(t,e)) : e <= s.stopNum && (s.arrayPos++, s.arrayPos === s.strings.length ? (s.arrayPos = 0, s.options.onLastStringBackspaced(), s.shuffleStringsIfNeeded(), s.begin()) : s.typewrite(s.strings[s.sequence[s.arrayPos]],e))
                        },n)
                    }
                },{key:"complete",value:function () {this.options.onComplete(this), this.loop ? this.curLoop++ : this.typingComplete = !0}},{key:"setPauseStatus",value:function (t,e,s) {this.pause.typewrite = s, this.pause.curString = t, this.pause.curStrPos = e}},{
                    key:"toggleBlinking",value:function (t) {
                        if (this.cursor && !this.pause.status && this.cursorBlinking !== t) {
                            this.cursorBlinking = t;
                            var e = t ? "infinite" : 0;
                            this.cursor.style.animationIterationCount = e
                        }
                    }
                },{key:"humanizer",value:function (t) {return Math.round(Math.random() * t / 2) + t}},{key:"shuffleStringsIfNeeded",value:function () {this.shuffle && (this.sequence = this.sequence.sort(function () {return Math.random() - .5}))}},{
                    key:"initFadeOut",value:function () {
                        var t = this;
                        return this.el.className += " " + this.fadeOutClass, this.cursor && (this.cursor.className += " " + this.fadeOutClass), setTimeout(function () {t.arrayPos++, t.replaceText(""), t.strings.length > t.arrayPos ? t.typewrite(t.strings[t.sequence[t.arrayPos]],0) : (t.typewrite(t.strings[0],0), t.arrayPos = 0)},this.fadeOutDelay)
                    }
                },{key:"replaceText",value:function (t) {this.attr ? this.el.setAttribute(this.attr,t) : this.isInput ? this.el.value = t : "html" === this.contentType ? this.el.innerHTML = t : this.el.textContent = t}},{
                    key:"bindFocusEvents",value:function () {
                        var t = this;
                        this.isInput && (this.el.addEventListener("focus",function (e) {t.stop()}), this.el.addEventListener("blur",function (e) {t.el.value && 0 !== t.el.value.length || t.start()}))
                    }
                },{key:"insertCursor",value:function () {this.showCursor && (this.cursor || (this.cursor = document.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))}}]), t
            }();
            e["default"] = a, t.exports = e["default"]
        },function (t,e,s) {
            "use strict";
            function n(t) {return t && t.__esModule ? t : {"default":t}}

            function i(t,e) {if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")}

            Object.defineProperty(e,"__esModule",{value:!0});
            var r = Object.assign || function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var s = arguments[e];
                        for (var n in s)Object.prototype.hasOwnProperty.call(s,n) && (t[n] = s[n])
                    }
                    return t
                },o = function () {
                function t(t,e) {
                    for (var s = 0; s < e.length; s++) {
                        var n = e[s];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t,n.key,n)
                    }
                }

                return function (e,s,n) {return s && t(e.prototype,s), n && t(e,n), e}
            }(),a = s(2),u = n(a),l = function () {
                function t() {i(this,t)}

                return o(t,[{
                    key:"load",value:function (t,e,s) {
                        if ("string" == typeof s ? t.el = document.querySelector(s) : t.el = s, t.options = r({},u["default"],e), t.isInput = "input" === t.el.tagName.toLowerCase(), t.attr = t.options.attr, t.bindInputFocusEvents = t.options.bindInputFocusEvents, t.showCursor = !t.isInput && t.options.showCursor, t.cursorChar = t.options.cursorChar, t.cursorBlinking = !0, t.elContent = t.attr ? t.el.getAttribute(t.attr) : t.el.textContent, t.contentType = t.options.contentType, t.typeSpeed = t.options.typeSpeed, t.startDelay = t.options.startDelay, t.backSpeed = t.options.backSpeed, t.smartBackspace = t.options.smartBackspace, t.backDelay = t.options.backDelay, t.fadeOut = t.options.fadeOut, t.fadeOutClass = t.options.fadeOutClass, t.fadeOutDelay = t.options.fadeOutDelay, t.isPaused = !1, t.strings = t.options.strings.map(function (t) {return t.trim()}), "string" == typeof t.options.stringsElement ? t.stringsElement = document.querySelector(t.options.stringsElement) : t.stringsElement = t.options.stringsElement, t.stringsElement) {
                            t.strings = [], t.stringsElement.style.display = "none";
                            var n = Array.prototype.slice.apply(t.stringsElement.children),i = n.length;
                            if (i)for (var o = 0; o < i; o += 1) {
                                var a = n[o];
                                t.strings.push(a.innerHTML.trim())
                            }
                        }
                        t.strPos = 0, t.arrayPos = 0, t.stopNum = 0, t.loop = t.options.loop, t.loopCount = t.options.loopCount, t.curLoop = 0, t.shuffle = t.options.shuffle, t.sequence = [], t.pause = {status:!1,typewrite:!0,curString:"",curStrPos:0}, t.typingComplete = !1;
                        for (var o in t.strings)t.sequence[o] = o;
                        t.currentElContent = this.getCurrentElContent(t), t.autoInsertCss = t.options.autoInsertCss, this.appendAnimationCss(t)
                    }
                },{
                    key:"getCurrentElContent",value:function (t) {
                        var e = "";
                        return e = t.attr ? t.el.getAttribute(t.attr) : t.isInput ? t.el.value : "html" === t.contentType ? t.el.innerHTML : t.el.textContent
                    }
                },{
                    key:"appendAnimationCss",value:function (t) {
                        if (t.autoInsertCss && t.showCursor && t.fadeOut) {
                            var e = document.createElement("style");
                            e.type = "text/css";
                            var s = "";
                            t.showCursor && (s += "\n        .typed-cursor{\n          opacity: 1;\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "), t.fadeOut && (s += "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n          -webkit-animation: 0;\n                  animation: 0;\n        }\n      "), 0 !== e.length && (e.innerHTML = s, document.body.appendChild(e))
                        }
                    }
                }]), t
            }();
            e["default"] = l;
            var c = new l;
            e.initializer = c
        },function (t,e) {
            "use strict";
            Object.defineProperty(e,"__esModule",{value:!0});
            var s = {strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1 / 0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onComplete:function (t) {},preStringTyped:function (t,e) {},onStringTyped:function (t,e) {},onLastStringBackspaced:function (t) {},onTypingPaused:function (t,e) {},onTypingResumed:function (t,e) {},onReset:function (t) {},onStop:function (t,e) {},onStart:function (t,e) {},onDestroy:function (t) {}};
            e["default"] = s, t.exports = e["default"]
        },function (t,e) {
            "use strict";
            function s(t,e) {if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")}

            Object.defineProperty(e,"__esModule",{value:!0});
            var n = function () {
                function t(t,e) {
                    for (var s = 0; s < e.length; s++) {
                        var n = e[s];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t,n.key,n)
                    }
                }

                return function (e,s,n) {return s && t(e.prototype,s), n && t(e,n), e}
            }(),i = function () {
                function t() {s(this,t)}

                return n(t,[{
                    key:"typeHtmlChars",value:function (t,e,s) {
                        if ("html" !== s.contentType)return e;
                        var n = t.substr(e).charAt(0);
                        if ("<" === n || "&" === n) {
                            var i = "";
                            for (i = "<" === n ? ">" : ";"; t.substr(e + 1).charAt(0) !== i && (e++, !(e + 1 > t.length)););
                            e++
                        }
                        return e
                    }
                },{
                    key:"backSpaceHtmlChars",value:function (t,e,s) {
                        if ("html" !== s.contentType)return e;
                        var n = t.substr(e).charAt(0);
                        if (">" === n || ";" === n) {
                            var i = "";
                            for (i = ">" === n ? "<" : "&"; t.substr(e - 1).charAt(0) !== i && (e--, !(e < 0)););
                            e--
                        }
                        return e
                    }
                }]), t
            }();
            e["default"] = i;
            var r = new i;
            e.htmlParser = r
        }])
    });     // 打字机插件
}