"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[8324], {
    82139: (e, t, i) => {
        function r(e) {
            return null != e && "object" == typeof e && !0 === e["@@functional/placeholder"]
        }
        function n(e) {
            return function t(i) {
                return 0 == arguments.length || r(i) ? t : e.apply(this, arguments)
            }
        }
        function s(e) {
            return function t(i, s) {
                switch (arguments.length) {
                case 0:
                    return t;
                case 1:
                    return r(i) ? t : n(function(t) {
                        return e(i, t)
                    });
                default:
                    return r(i) && r(s) ? t : r(i) ? n(function(t) {
                        return e(t, s)
                    }) : r(s) ? n(function(t) {
                        return e(i, t)
                    }) : e(i, s)
                }
            }
        }
        function a(e) {
            return function t(i, a, o) {
                switch (arguments.length) {
                case 0:
                    return t;
                case 1:
                    return r(i) ? t : s(function(t, r) {
                        return e(i, t, r)
                    });
                case 2:
                    return r(i) && r(a) ? t : r(i) ? s(function(t, i) {
                        return e(t, a, i)
                    }) : r(a) ? s(function(t, r) {
                        return e(i, t, r)
                    }) : n(function(t) {
                        return e(i, a, t)
                    });
                default:
                    return r(i) && r(a) && r(o) ? t : r(i) && r(a) ? s(function(t, i) {
                        return e(t, i, o)
                    }) : r(i) && r(o) ? s(function(t, i) {
                        return e(t, a, i)
                    }) : r(a) && r(o) ? s(function(t, r) {
                        return e(i, t, r)
                    }) : r(i) ? n(function(t) {
                        return e(t, a, o)
                    }) : r(a) ? n(function(t) {
                        return e(i, t, o)
                    }) : r(o) ? n(function(t) {
                        return e(i, a, t)
                    }) : e(i, a, o)
                }
            }
        }
        function o(e, t) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        i.d(t, {
            RudderAnalytics: () => rh
        });
        var l, u = n(function(e) {
            return null === e ? "Null" : void 0 === e ? "Undefined" : Object.prototype.toString.call(e).slice(8, -1)
        });
        function c(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        }
        let d = Number.isInteger || function(e) {
            return (0 | e) === e
        }
        ;
        var g = function() {
            function e() {
                this.map = {},
                this.length = 0
            }
            return e.prototype.set = function(e, t) {
                var i = this.hash(e)
                  , r = this.map[i];
                r || (this.map[i] = r = []),
                r.push([e, t]),
                this.length += 1
            }
            ,
            e.prototype.hash = function(e) {
                var t = [];
                for (var i in e)
                    t.push(Object.prototype.toString.call(e[i]));
                return t.join()
            }
            ,
            e.prototype.get = function(e) {
                if (this.length <= 180) {
                    for (var t in this.map)
                        for (var i = this.map[t], r = 0; r < i.length; r += 1) {
                            var n = i[r];
                            if (n[0] === e)
                                return n[1]
                        }
                    return
                }
                var s = this.hash(e)
                  , i = this.map[s];
                if (i)
                    for (var r = 0; r < i.length; r += 1) {
                        var n = i[r];
                        if (n[0] === e)
                            return n[1]
                    }
            }
            ,
            e
        }()
          , h = n(function(e) {
            return null != e && "function" == typeof e.clone ? e.clone() : function e(t, i, r) {
                if (r || (r = new g),
                s = typeof (n = t),
                null == n || "object" != s && "function" != s)
                    return t;
                var n, s, a = function(i) {
                    var n = r.get(t);
                    if (n)
                        return n;
                    for (var s in r.set(t, i),
                    t)
                        Object.prototype.hasOwnProperty.call(t, s) && (i[s] = e(t[s], !0, r));
                    return i
                };
                switch (u(t)) {
                case "Object":
                    return a(Object.create(Object.getPrototypeOf(t)));
                case "Array":
                    return a(Array(t.length));
                case "Date":
                    return new Date(t.valueOf());
                case "RegExp":
                    return new RegExp(t.source,t.flags ? t.flags : (t.global ? "g" : "") + (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.sticky ? "y" : "") + (t.unicode ? "u" : "") + (t.dotAll ? "s" : ""));
                case "Int8Array":
                case "Uint8Array":
                case "Uint8ClampedArray":
                case "Int16Array":
                case "Uint16Array":
                case "Int32Array":
                case "Uint32Array":
                case "Float32Array":
                case "Float64Array":
                case "BigInt64Array":
                case "BigUint64Array":
                    return t.slice();
                default:
                    return t
                }
            }(e)
        })
          , p = a(function(e, t, i) {
            var r, n = {};
            for (r in i = i || {},
            t = t || {})
                o(r, t) && (n[r] = o(r, i) ? e(r, t[r], i[r]) : t[r]);
            for (r in i)
                o(r, i) && !o(r, n) && (n[r] = i[r]);
            return n
        })
          , f = a(function e(t, i, r) {
            return p(function(i, r, n) {
                return c(r) && c(n) ? e(t, r, n) : t(i, r, n)
            }, i, r)
        })
          , v = a(function(e, t, i) {
            return f(function(t, i, r) {
                return e(i, r)
            }, t, i)
        })
          , y = s(function(e, t) {
            for (var i = t, r = 0; r < e.length; r += 1) {
                if (null == i)
                    return;
                var n = e[r];
                i = d(n) ? function(e, t) {
                    var i = e < 0 ? t.length + e : e;
                    return t[i]
                }(n, i) : i[n]
            }
            return i
        })
          , m = s(function(e, t) {
            var i = {};
            for (var r in t)
                e(t[r], r, t) && (i[r] = t[r]);
            return i
        });
        let b = e => "function" == typeof e && !!(e.constructor && e.call && e.apply)
          , k = e => void 0 !== e
          , I = e => !(e => null == e)(e)
          , S = e => {
            switch (Object.prototype.toString.call(e)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
                return !0;
            default:
                return e instanceof Error
            }
        }
          , E = (e, t) => y(t.split("."), e)
          , T = e => null !== e && "[object Object]" === Object.prototype.toString.call(e)
          , A = (e, t) => {
            if (!Array.isArray(e) || !Array.isArray(t))
                return h(t);
            let i = h(e);
            return t.forEach( (e, t) => {
                i[t] = Array.isArray(e) || (e => null !== e && "object" == typeof e && !Array.isArray(e))(e) ? w(i[t], e) : e
            }
            ),
            i
        }
          , w = (e, t) => v(A, e, t)
          , C = e => T(e) && Object.keys(e).length > 0
          , P = e => {
            let t = m(k, e);
            return Object.keys(t).forEach(e => {
                let i = t[e];
                T(i) && (t[e] = P(i))
            }
            ),
            t
        }
          , D = e => {
            let t = m(I, e);
            return Object.keys(t).forEach(e => {
                let i = t[e];
                T(i) && (t[e] = D(i))
            }
            ),
            t
        }
          , O = e => {
            if (C(e))
                return D(e)
        }
          , R = (e, t) => "boolean" == typeof e ? e : t
          , $ = e => (Object.getOwnPropertyNames(e).forEach(function(t) {
            e[t] && "object" == typeof e[t] && $(e[t])
        }),
        Object.freeze(e))
          , M = e => e.replace(/^\.+/, "")
          , L = e => {
            let t = e;
            if ("string" != typeof e && !(e => null == e)(e))
                try {
                    t = JSON.stringify(e)
                } catch (e) {
                    t = null
                }
            return t
        }
          , N = (e, t, i, r, n) => {
            let s = {
                category: e,
                name: t,
                properties: i,
                options: r,
                callback: void 0
            };
            b(n) && (s.callback = n),
            b(r) && (s.category = e,
            s.name = t,
            s.properties = i,
            s.options = void 0,
            s.callback = r),
            b(i) && (s.category = e,
            s.name = t,
            s.properties = void 0,
            s.options = void 0,
            s.callback = i),
            b(t) && (s.category = e,
            s.name = void 0,
            s.properties = void 0,
            s.options = void 0,
            s.callback = t),
            b(e) && (s.category = void 0,
            s.name = void 0,
            s.properties = void 0,
            s.options = void 0,
            s.callback = e),
            T(e) ? (s.name = void 0,
            s.category = void 0,
            s.properties = e,
            b(t) ? s.options = void 0 : s.options = t) : T(t) && (s.name = void 0,
            s.properties = t,
            b(i) ? s.options = void 0 : s.options = i),
            "string" == typeof e && "string" != typeof t && (s.category = void 0,
            s.name = e),
            k(s.category) || (s.category = void 0),
            k(s.name) || (s.name = void 0),
            s.properties = s.properties ? h(s.properties) : {},
            k(s.options) ? s.options = h(s.options) : s.options = void 0;
            let a = "string" == typeof s.name ? s.name : s.properties.name
              , o = "string" == typeof s.category ? s.category : s.properties.category;
            return s.properties = w(T(s.properties) ? s.properties : {}, {
                ...a && {
                    name: a
                },
                ...o && {
                    category: o
                }
            }),
            s
        }
          , B = (e, t, i, r) => {
            let n = {
                name: e,
                properties: t,
                options: i,
                callback: void 0
            };
            return b(r) && (n.callback = r),
            b(i) && (n.properties = t,
            n.options = void 0,
            n.callback = i),
            b(t) && (n.properties = void 0,
            n.options = void 0,
            n.callback = t),
            n.properties = I(n.properties) ? h(n.properties) : {},
            k(n.options) ? n.options = h(n.options) : n.options = void 0,
            n
        }
          , x = (e, t, i, r) => {
            let n = {
                userId: e,
                traits: t,
                options: i,
                callback: void 0
            };
            return b(r) && (n.callback = r),
            b(i) && (n.userId = e,
            n.traits = t,
            n.options = void 0,
            n.callback = i),
            b(t) && (n.userId = e,
            n.traits = void 0,
            n.options = void 0,
            n.callback = t),
            (T(e) || null === e) && (n.userId = null,
            n.traits = e,
            b(t) ? n.options = void 0 : n.options = t),
            n.userId = L(n.userId),
            T(n.traits) ? n.traits = h(n.traits) : n.traits = void 0,
            k(n.options) ? n.options = h(n.options) : n.options = void 0,
            n
        }
          , U = (e, t, i, r) => {
            let n = {
                to: e,
                from: t,
                options: i,
                callback: void 0
            };
            return (b(r) && (n.callback = r),
            b(i) && (n.to = e,
            n.from = t,
            n.options = void 0,
            n.callback = i),
            b(t)) ? (n.to = e,
            n.from = void 0,
            n.options = void 0,
            n.callback = t) : (T(t) || null === t) && (n.to = e,
            n.from = void 0,
            n.options = t),
            k(n.to) && (n.to = L(n.to)),
            k(n.from) ? n.from = L(n.from) : n.from = void 0,
            k(n.options) ? n.options = h(n.options) : n.options = void 0,
            n
        }
          , j = (e, t, i, r) => {
            let n = {
                groupId: e,
                traits: t,
                options: i,
                callback: void 0
            };
            return b(r) && (n.callback = r),
            b(i) && (n.groupId = e,
            n.traits = t,
            n.options = void 0,
            n.callback = i),
            b(t) && (n.groupId = e,
            n.traits = void 0,
            n.options = void 0,
            n.callback = t),
            (T(e) || null === e) && (n.groupId = null,
            n.traits = e,
            b(t) ? n.options = void 0 : n.options = t),
            n.groupId = L(n.groupId),
            T(n.traits) ? n.traits = h(n.traits) : n.traits = void 0,
            k(n.options) ? n.options = h(n.options) : n.options = void 0,
            n
        }
          , _ = function(e) {
            return e.UNLOADED = "Page Unloaded",
            e
        }({})
          , H = "CapabilitiesManager"
          , F = "ConfigManager"
          , G = "EventManager"
          , Q = "PluginsManager"
          , V = "UserSessionManager"
          , K = "ErrorHandler"
          , z = "PluginEngine"
          , q = "ReadyAPI"
          , W = "AnalyticsCore";
        for (var J, X = [], Z = 0; Z < 256; Z++)
            X[Z] = (Z + 256).toString(16).substring(1);
        for (var Y, ee = 256, et = []; ee--; )
            et[ee] = (ee + 256).toString(16).substring(1);
        let ei = () => !(e => null == e)(globalThis.crypto) && b(globalThis.crypto.getRandomValues) ? function() {
            (!J || Z + 16 > 4096) && (J = crypto.getRandomValues(new Uint8Array(4096)),
            Z = 0);
            for (var e, t = 0, i = ""; t < 16; t++)
                e = J[Z + t],
                6 == t ? i += X[15 & e | 64] : 8 == t ? i += X[63 & e | 128] : i += X[e],
                1 & t && t > 1 && t < 11 && (i += "-");
            return Z += 16,
            i
        }() : function() {
            var e, t = 0, i = "";
            if (!Y || ee + 16 > 256) {
                for (Y = Array(t = 256); t--; )
                    Y[t] = 256 * Math.random() | 0;
                t = ee = 0
            }
            for (; t < 16; t++)
                e = Y[ee + t],
                6 == t ? i += et[15 & e | 64] : 8 == t ? i += et[63 & e | 128] : i += et[e],
                1 & t && t > 1 && t < 11 && (i += "-");
            return ee++,
            i
        }()
          , er = e => e.toISOString()
          , en = (e, t, i) => `Unable to load (${"string" == typeof i ? i : i.type}) the script with the id "${e}" from URL "${t}"`
          , es = "[Circular Reference]"
          , ea = (e, t, i, r) => {
            try {
                return JSON.stringify(e, ( (e, t, i) => {
                    let r = [];
                    return function(n, s) {
                        if (!t?.includes(n)) {
                            let t;
                            if (!(e && null == (t = s))) {
                                if ("object" != typeof s || null === s)
                                    return s;
                                for (; r.length > 0 && r[r.length - 1] !== this; )
                                    r.pop();
                                if (r.includes(s))
                                    return i?.warn(`JSONStringify:: A circular reference has been detected in the object and the property "${n}" has been dropped from the output.`),
                                    es;
                                return r.push(s),
                                s
                            }
                        }
                    }
                }
                )(t, i, r))
            } catch (e) {
                return r?.warn("Failed to convert the value to a JSON string.", e),
                null
            }
        }
          , eo = (e, t) => {
            let i = Array.isArray(e) ? [] : {};
            for (let r in e)
                if (Object.hasOwnProperty.call(e, r)) {
                    let n = e[r]
                      , s = t.call(e, r, n);
                    T(s) || Array.isArray(s) ? i[r] = eo(s, t) : i[r] = s
                }
            return i
        }
          , el = (e, t) => {
            let i = (e => {
                let t = [];
                return function(e, i) {
                    if ("bigint" == typeof i)
                        return "[BigInt]";
                    for (; t.length > 0 && t[t.length - 1] !== this; )
                        t.pop();
                    return t.includes(i) ? es : (t.push(i),
                    i)
                }
            }
            )()
              , r = i.call(e, "", e);
            return T(e) || Array.isArray(e) ? eo(e, i) : r
        }
          , eu = "[SDK DISPATCHED ERROR]"
          , ec = e => {
            let {stack: t} = e;
            if ("string" == typeof t && t)
                return t
        }
          , ed = (e, t) => {
            if (!S(e))
                return Error(`${t}: ${ea(e)}`);
            try {
                let i = new e.constructor(`${t}: ${e.message}`)
                  , r = ec(e);
                return r && (i.stack = r),
                Object.getOwnPropertyNames(e).forEach(t => {
                    if ("message" !== t && "stack" !== t && "name" !== t)
                        try {
                            i[t] = e[t]
                        } catch {}
                }
                ),
                i
            } catch {
                return Error(`${t}: ${ea(e)}`)
            }
        }
          , eg = e => {
            if (S(e)) {
                let t = ec(e);
                t && (e.stack = `${t}
${eu}`)
            }
            globalThis.dispatchEvent(new ErrorEvent("error",{
                error: e,
                bubbles: !0,
                cancelable: !0,
                composed: !0
            }))
        }
          , eh = "RudderLabs JavaScript SDK"
          , ep = "3.31.4"
          , ef = "RudderJS-Initiated"
          , ev = "preloadedEventsBuffer"
          , ey = "ajs_aid"
          , em = "ajs_event"
          , eb = 1e4
          , ek = (e="app") => {
            globalThis.RudderStackGlobals || (globalThis.RudderStackGlobals = {}),
            globalThis.RudderStackGlobals[e] || (globalThis.RudderStackGlobals[e] = {})
        }
          , eI = (e, t, i="app") => {
            ek(i),
            globalThis.RudderStackGlobals[i][e] = t
        }
          , eS = (e, t="app") => (ek(t),
        globalThis.RudderStackGlobals[t][e])
          , eE = (e, t) => {
            let i = {};
            return e.forEach( (r, n) => {
                n.startsWith(t) && (i[n.substring(t.length)] = e.get(n))
            }
            ),
            i
        }
          , eT = (e, t) => {
            let i, r = e.shift();
            if (b(t[r])) {
                switch (r) {
                case "page":
                    i = N(...e);
                    break;
                case "track":
                    i = B(...e);
                    break;
                case "identify":
                    i = x(...e);
                    break;
                case "alias":
                    i = U(...e);
                    break;
                case "group":
                    i = j(...e);
                    break;
                default:
                    t[r](...e)
                }
                i && t[r](i)
            }
        }
        ;
        class eA {
            constructor(e, t=1e4) {
                this.logger = e,
                this.timeout = t
            }
            loadJSFile(e) {
                let {url: t, id: i, timeout: r, async: n, callback: s, extraAttributes: a} = e
                  , o = !b(s);
                ( (e, t, i, r=!0, n) => new Promise( (s, a) => {
                    document.getElementById(t) && a(Error(`A script with the id "${t}" is already loaded. Skipping the loading of this script to prevent conflicts`));
                    try {
                        let o;
                        (e => {
                            let t = document.getElementsByTagName("head");
                            if (t.length > 0)
                                return t[0]?.insertBefore(e, t[0]?.firstChild);
                            let i = document.getElementsByTagName("script");
                            if (i.length > 0 && i[0]?.parentNode)
                                return i[0]?.parentNode.insertBefore(e, i[0]);
                            let r = document.createElement("head");
                            r.appendChild(e);
                            let n = document.getElementsByTagName("html")[0];
                            n?.insertBefore(r, n.firstChild)
                        }
                        )(( (e, t, i=!0, r=null, n=null, s={}) => {
                            let a = document.createElement("script");
                            return a.type = "text/javascript",
                            a.onload = r,
                            a.onerror = n,
                            a.src = e,
                            a.id = t,
                            a.async = i,
                            Object.keys(s).forEach(e => {
                                a.setAttribute(e, s[e])
                            }
                            ),
                            a.setAttribute("data-loader", "RS_JS_SDK"),
                            a
                        }
                        )(e, t, r, () => {
                            globalThis.clearTimeout(o),
                            s(t)
                        }
                        , i => {
                            globalThis.clearTimeout(o),
                            a(Error(en(t, e, i)))
                        }
                        , n)),
                        o = globalThis.setTimeout( () => {
                            a(Error(`A timeout of ${i} ms occurred while trying to load the script with id "${t}" from URL "${e}"`))
                        }
                        , i)
                    } catch (i) {
                        a(ed(i, en(t, e, "unknown")))
                    }
                }
                ))(t, i, r || this.timeout, n, a).then(e => {
                    o || s(e)
                }
                ).catch(e => {
                    o || s(i, e)
                }
                )
            }
        }
        var ew = Symbol.for("preact-signals");
        function eC() {
            if (e$ > 1)
                e$--;
            else {
                var e, t = !1, i = eB;
                for (eB = void 0; void 0 !== i; )
                    i.S.v === i.v && (i.S.i = i.i),
                    i = i.o;
                for (; void 0 !== eR; ) {
                    var r = eR;
                    for (eR = void 0,
                    eM++; void 0 !== r; ) {
                        var n = r.u;
                        if (r.u = void 0,
                        r.f &= -3,
                        !(8 & r.f) && eH(r))
                            try {
                                r.c()
                            } catch (i) {
                                t || (e = i,
                                t = !0)
                            }
                        r = n
                    }
                }
                if (eM = 0,
                e$--,
                t)
                    throw e
            }
        }
        function eP(e) {
            if (e$ > 0)
                return e();
            eN = ++eL,
            e$++;
            try {
                return e()
            } finally {
                eC()
            }
        }
        var eD = void 0;
        function eO(e) {
            var t = eD;
            eD = void 0;
            try {
                return e()
            } finally {
                eD = t
            }
        }
        var eR = void 0
          , e$ = 0
          , eM = 0
          , eL = 0
          , eN = 0
          , eB = void 0
          , ex = 0;
        function eU(e) {
            if (void 0 !== eD) {
                var t = e.n;
                if (void 0 === t || t.t !== eD)
                    return t = {
                        i: 0,
                        S: e,
                        p: eD.s,
                        n: void 0,
                        t: eD,
                        e: void 0,
                        x: void 0,
                        r: t
                    },
                    void 0 !== eD.s && (eD.s.n = t),
                    eD.s = t,
                    e.n = t,
                    32 & eD.f && e.S(t),
                    t;
                if (-1 === t.i)
                    return t.i = 0,
                    void 0 !== t.n && (t.n.p = t.p,
                    void 0 !== t.p && (t.p.n = t.n),
                    t.p = eD.s,
                    t.n = void 0,
                    eD.s.n = t,
                    eD.s = t),
                    t
            }
        }
        function ej(e, t) {
            this.v = e,
            this.i = 0,
            this.n = void 0,
            this.t = void 0,
            this.l = 0,
            this.W = null == t ? void 0 : t.watched,
            this.Z = null == t ? void 0 : t.unwatched,
            this.name = null == t ? void 0 : t.name
        }
        function e_(e, t) {
            return new ej(e,t)
        }
        function eH(e) {
            for (var t = e.s; void 0 !== t; t = t.n)
                if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i)
                    return !0;
            return !1
        }
        function eF(e) {
            for (var t = e.s; void 0 !== t; t = t.n) {
                var i = t.S.n;
                if (void 0 !== i && (t.r = i),
                t.S.n = t,
                t.i = -1,
                void 0 === t.n) {
                    e.s = t;
                    break
                }
            }
        }
        function eG(e) {
            for (var t = e.s, i = void 0; void 0 !== t; ) {
                var r = t.p;
                -1 === t.i ? (t.S.U(t),
                void 0 !== r && (r.n = t.n),
                void 0 !== t.n && (t.n.p = r)) : i = t,
                t.S.n = t.r,
                void 0 !== t.r && (t.r = void 0),
                t = r
            }
            e.s = i
        }
        function eQ(e, t) {
            ej.call(this, void 0),
            this.x = e,
            this.s = void 0,
            this.g = ex - 1,
            this.f = 4,
            this.W = null == t ? void 0 : t.watched,
            this.Z = null == t ? void 0 : t.unwatched,
            this.name = null == t ? void 0 : t.name
        }
        function eV(e) {
            var t = e.m;
            if (e.m = void 0,
            "function" == typeof t) {
                e$++;
                var i = eD;
                eD = void 0;
                try {
                    t()
                } catch (t) {
                    throw e.f &= -2,
                    e.f |= 8,
                    eK(e),
                    t
                } finally {
                    eD = i,
                    eC()
                }
            }
        }
        function eK(e) {
            for (var t = e.s; void 0 !== t; t = t.n)
                t.S.U(t);
            e.x = void 0,
            e.s = void 0,
            eV(e)
        }
        function ez(e) {
            if (eD !== this)
                throw Error("Out-of-order effect");
            eG(this),
            eD = e,
            this.f &= -2,
            8 & this.f && eK(this),
            eC()
        }
        function eq(e, t) {
            this.x = e,
            this.m = void 0,
            this.s = void 0,
            this.u = void 0,
            this.f = 32,
            this.name = null == t ? void 0 : t.name
        }
        function eW(e, t) {
            var i = new eq(e,t);
            try {
                i.c()
            } catch (e) {
                throw i.d(),
                e
            }
            var r = i.d.bind(i);
            return r[Symbol.dispose] = r,
            r
        }
        ej.prototype.brand = ew,
        ej.prototype.h = function() {
            return !0
        }
        ,
        ej.prototype.S = function(e) {
            var t = this
              , i = this.t;
            i !== e && void 0 === e.e && (e.x = i,
            this.t = e,
            void 0 !== i ? i.e = e : eO(function() {
                var e;
                null == (e = t.W) || e.call(t)
            }))
        }
        ,
        ej.prototype.U = function(e) {
            var t = this;
            if (void 0 !== this.t) {
                var i = e.e
                  , r = e.x;
                void 0 !== i && (i.x = r,
                e.e = void 0),
                void 0 !== r && (r.e = i,
                e.x = void 0),
                e === this.t && (this.t = r,
                void 0 === r && eO(function() {
                    var e;
                    null == (e = t.Z) || e.call(t)
                }))
            }
        }
        ,
        ej.prototype.subscribe = function(e) {
            var t = this;
            return eW(function() {
                var i = t.value
                  , r = eD;
                eD = void 0;
                try {
                    e(i)
                } finally {
                    eD = r
                }
            }, {
                name: "sub"
            })
        }
        ,
        ej.prototype.valueOf = function() {
            return this.value
        }
        ,
        ej.prototype.toString = function() {
            return this.value + ""
        }
        ,
        ej.prototype.toJSON = function() {
            return this.value
        }
        ,
        ej.prototype.peek = function() {
            var e = this;
            return eO(function() {
                return e.value
            })
        }
        ,
        Object.defineProperty(ej.prototype, "value", {
            get: function() {
                var e = eU(this);
                return void 0 !== e && (e.i = this.i),
                this.v
            },
            set: function(e) {
                if (e !== this.v) {
                    if (eM > 100)
                        throw Error("Cycle detected");
                    0 !== e$ && 0 === eM && this.l !== eN && (this.l = eN,
                    eB = {
                        S: this,
                        v: this.v,
                        i: this.i,
                        o: eB
                    }),
                    this.v = e,
                    this.i++,
                    ex++,
                    e$++;
                    try {
                        for (var t = this.t; void 0 !== t; t = t.x)
                            t.t.N()
                    } finally {
                        eC()
                    }
                }
            }
        }),
        eQ.prototype = new ej,
        eQ.prototype.h = function() {
            if (this.f &= -3,
            1 & this.f)
                return !1;
            if (32 == (36 & this.f) || (this.f &= -5,
            this.g === ex))
                return !0;
            if (this.g = ex,
            this.f |= 1,
            this.i > 0 && !eH(this))
                return this.f &= -2,
                !0;
            var e = eD;
            try {
                eF(this),
                eD = this;
                var t = this.x();
                (16 & this.f || this.v !== t || 0 === this.i) && (this.v = t,
                this.f &= -17,
                this.i++)
            } catch (e) {
                this.v = e,
                this.f |= 16,
                this.i++
            }
            return eD = e,
            eG(this),
            this.f &= -2,
            !0
        }
        ,
        eQ.prototype.S = function(e) {
            if (void 0 === this.t) {
                this.f |= 36;
                for (var t = this.s; void 0 !== t; t = t.n)
                    t.S.S(t)
            }
            ej.prototype.S.call(this, e)
        }
        ,
        eQ.prototype.U = function(e) {
            if (void 0 !== this.t && (ej.prototype.U.call(this, e),
            void 0 === this.t)) {
                this.f &= -33;
                for (var t = this.s; void 0 !== t; t = t.n)
                    t.S.U(t)
            }
        }
        ,
        eQ.prototype.N = function() {
            if (!(2 & this.f)) {
                this.f |= 6;
                for (var e = this.t; void 0 !== e; e = e.x)
                    e.t.N()
            }
        }
        ,
        Object.defineProperty(eQ.prototype, "value", {
            get: function() {
                if (1 & this.f)
                    throw Error("Cycle detected");
                var e = eU(this);
                if (this.h(),
                void 0 !== e && (e.i = this.i),
                16 & this.f)
                    throw this.v;
                return this.v
            }
        }),
        eq.prototype.c = function() {
            var e = this.S();
            try {
                if (8 & this.f || void 0 === this.x)
                    return;
                var t = this.x();
                "function" == typeof t && (this.m = t)
            } finally {
                e()
            }
        }
        ,
        eq.prototype.S = function() {
            if (1 & this.f)
                throw Error("Cycle detected");
            this.f |= 1,
            this.f &= -9,
            eV(this),
            eF(this),
            e$++;
            var e = eD;
            return eD = this,
            ez.bind(this, e)
        }
        ,
        eq.prototype.N = function() {
            2 & this.f || (this.f |= 2,
            this.u = eR,
            eR = this)
        }
        ,
        eq.prototype.d = function() {
            this.f |= 8,
            1 & this.f || eK(this)
        }
        ,
        eq.prototype.dispose = function() {
            this.d()
        }
        ;
        class eJ {
            constructor() {
                this.items = []
            }
            enqueue(e) {
                this.items.push(e)
            }
            dequeue() {
                return 0 === this.items.length ? null : this.items.shift()
            }
            isEmpty() {
                return 0 === this.items.length
            }
            size() {
                return this.items.length
            }
            clear() {
                this.items = []
            }
        }
        let eX = {
            LOG: 0,
            INFO: 1,
            DEBUG: 2,
            WARN: 3,
            ERROR: 4,
            NONE: 5
        }
          , eZ = "ERROR";
        class eY {
            constructor(e="LOG", t="", i=console) {
                this.minLogLevel = eX[e],
                this.scope = t,
                this.logProvider = i
            }
            log(...e) {
                this.outputLog("LOG", e)
            }
            info(...e) {
                this.outputLog("INFO", e)
            }
            debug(...e) {
                this.outputLog("DEBUG", e)
            }
            warn(...e) {
                this.outputLog("WARN", e)
            }
            error(...e) {
                this.outputLog("ERROR", e)
            }
            outputLog(e, t) {
                this.minLogLevel <= eX[e] && this.logProvider[e.toLowerCase()]?.(...this.formatLogData(t))
            }
            setScope(e) {
                this.scope = e || this.scope
            }
            setMinLogLevel(e) {
                this.minLogLevel = eX[e],
                void 0 === this.minLogLevel && (this.minLogLevel = eX.LOG)
            }
            formatLogData(e) {
                if (Array.isArray(e) && e.length > 0) {
                    let t = "%c RS SDK";
                    this.scope && (t = `${t} - ${this.scope}`);
                    let i = "string" == typeof e[0] ? e[0].trim() : ""
                      , r = [t = `${t} %c ${i}`, "font-weight: bold; background: black; color: white;", "font-weight: normal;"];
                    return "string" != typeof e[0] && r.push(e[0]),
                    r.push(...e.slice(1)),
                    r
                }
                return e
            }
        }
        let e0 = new eY
          , e1 = function(e) {
            return e.HANDLEDEXCEPTION = "handledException",
            e.UNHANDLEDEXCEPTION = "unhandledException",
            e.UNHANDLEDREJECTION = "unhandledPromiseRejection",
            e
        }({})
          , e2 = ["localStorage", "memoryStorage", "cookieStorage", "sessionStorage", "none"]
          , e3 = "cookieStorage"
          , e6 = "Unable to process/parse source configuration response"
          , e4 = "Failed to log breadcrumb"
          , e8 = "Failed to fetch the source config"
          , e5 = e => `${e}:: The provided callback parameter is not a function.`
          , e9 = "Failed to set/remove cookies via server. As a fallback, the cookies will be managed client side."
          , e7 = {
            All: !0
        }
          , te = "js-integrations"
          , tt = "plugins"
          , ti = RegExp("^(https?:\\/\\/)(((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|localhost|((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]?)))(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*(\\?[;&a-zA-Z\\d%_.~+=-]*)?(\\#[-a-zA-Z\\d_]*)?$")
          , tr = "modern"
          , tn = "https://cdn.rudderlabs.com"
          , ts = `${tn}/v3/${tr}/${te}`
          , ta = `${tn}/v3/${tr}/${tt}`
          , to = "https://api.rudderstack.com"
          , tl = {
            iubenda: "IubendaConsentManager",
            oneTrust: "OneTrustConsentManager",
            ketch: "KetchConsentManager",
            custom: "CustomConsentManager"
        }
          , tu = {
            v3: "StorageEncryption",
            legacy: "StorageEncryptionLegacy"
        }
          , tc = {
            xhr: "XhrQueue",
            beacon: "BeaconQueue"
        }
          , td = e_(h({
            configUrl: to,
            loadIntegration: !0,
            sessions: {
                autoTrack: !0,
                timeout: 18e5,
                cutOff: {
                    enabled: !1
                }
            },
            sameSiteCookie: "Lax",
            polyfillIfRequired: !0,
            integrations: e7,
            useBeacon: !1,
            beaconQueueOptions: {},
            destinationsQueueOptions: {},
            queueOptions: {},
            lockIntegrationsVersion: !0,
            lockPluginsVersion: !0,
            uaChTrackLevel: "none",
            plugins: [],
            useGlobalIntegrationsConfigInEvents: !1,
            bufferDataPlaneEventsUntilReady: !1,
            dataPlaneEventsBufferTimeout: 1e4,
            storage: {
                encryption: {
                    version: "v3"
                },
                migrate: !0,
                cookie: {}
            },
            sendAdblockPage: !1,
            sameDomainCookiesOnly: !1,
            secureCookie: !1,
            sendAdblockPageOptions: {},
            useServerSideCookies: !1
        }))
          , tg = $({
            userId: "",
            userTraits: {},
            anonymousId: "",
            groupId: "",
            groupTraits: {},
            initialReferrer: "",
            initialReferringDomain: "",
            sessionInfo: {},
            authToken: null
        })
          , th = $({
            entries: {
                userId: !0,
                userTraits: !0,
                groupId: !0,
                groupTraits: !0,
                sessionInfo: !0,
                authToken: !0,
                anonymousId: !1,
                initialReferrer: !1,
                initialReferringDomain: !1
            }
        })
          , tp = {
            userId: e_(tg.userId),
            userTraits: e_(tg.userTraits),
            anonymousId: e_(tg.anonymousId),
            groupId: e_(tg.groupId),
            groupTraits: e_(tg.groupTraits),
            initialReferrer: e_(tg.initialReferrer),
            initialReferringDomain: e_(tg.initialReferringDomain),
            sessionInfo: e_(tg.sessionInfo),
            authToken: e_(tg.authToken)
        }
          , tf = {
            isOnline: e_(!0),
            storage: {
                isLocalStorageAvailable: e_(!1),
                isCookieStorageAvailable: e_(!1),
                isSessionStorageAvailable: e_(!1)
            },
            isBeaconAvailable: e_(!1),
            isLegacyDOM: e_(!1),
            isUaCHAvailable: e_(!1),
            isCryptoAvailable: e_(!1),
            isAdBlockerDetectionInProgress: e_(!1),
            isAdBlocked: e_(void 0),
            cspBlockedURLs: e_([])
        }
          , tv = {
            isErrorReportingEnabled: e_(!1),
            isMetricsReportingEnabled: e_(!1),
            breadcrumbs: e_([])
        }
          , ty = e_(void 0)
          , tm = {
            activeDataplaneUrl: e_(void 0),
            integrationsCDNPath: e_(ts),
            pluginsCDNPath: e_(ta),
            sourceConfigUrl: e_(void 0),
            status: e_(void 0),
            initialized: e_(!1),
            logLevel: e_(eZ),
            loaded: e_(!1),
            readyCallbacks: e_([]),
            writeKey: e_(void 0),
            dataPlaneUrl: e_(void 0),
            safeAnalyticsInstance: e_(void 0)
        }
          , tb = {
            enabled: e_(!1),
            initialized: e_(!1),
            data: e_({}),
            activeConsentManagerPluginName: e_(void 0),
            preConsent: e_({
                enabled: !1
            }),
            postConsent: e_({}),
            resolutionStrategy: e_("and"),
            provider: e_(void 0),
            metadata: e_(void 0)
        }
          , tk = {
            retries: e_(0),
            dropped: e_(0),
            sent: e_(0),
            queued: e_(0),
            triggered: e_(0),
            metricsServiceUrl: e_(void 0)
        }
          , tI = {
            app: e_({
                name: eh,
                namespace: "com.rudderlabs.javascript",
                version: ep,
                installType: "npm"
            }),
            traits: e_(null),
            library: e_({
                name: eh,
                version: ep,
                snippetVersion: globalThis.RudderSnippetVersion,
                variant: "modern"
            }),
            userAgent: e_(null),
            device: e_(null),
            network: e_(null),
            os: e_({
                name: "",
                version: ""
            }),
            locale: e_(null),
            screen: e_({
                density: 0,
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0
            }),
            "ua-ch": e_(void 0),
            timezone: e_(void 0)
        }
          , tS = {
            configuredDestinations: e_([]),
            activeDestinations: e_([]),
            loadOnlyIntegrations: e_({}),
            failedDestinations: e_([]),
            loadIntegration: e_(!0),
            initializedDestinations: e_([]),
            clientDestinationsReady: e_(!1),
            integrationsConfig: e_({})
        }
          , tE = {
            toBeProcessedArray: e_([]),
            readyCallbacksArray: e_([])
        }
          , tT = {
            ready: e_(!1),
            loadedPlugins: e_([]),
            failedPlugins: e_([]),
            pluginsToLoadFromConfig: e_([]),
            activePlugins: e_([]),
            totalPluginsToLoad: e_(0)
        }
          , tA = {
            encryptionPluginName: e_(void 0),
            migrate: e_(!1),
            type: e_(void 0),
            cookie: e_(void 0),
            entries: e_({}),
            trulyAnonymousTracking: e_(!1)
        }
          , tw = {
            isEnabledServerSideCookies: e_(!1),
            dataServiceUrl: e_(void 0)
        }
          , tC = {
            eventsQueuePluginName: e_(void 0),
            deliveryEnabled: e_(!0)
        }
          , tP = {
            ...h({
                capabilities: tf,
                consents: tb,
                context: tI,
                eventBuffer: tE,
                lifecycle: tm,
                loadOptions: td,
                metrics: tk,
                nativeDestinations: tS,
                plugins: tT,
                reporting: tv,
                session: tp,
                source: ty,
                storage: tA,
                serverCookies: tw,
                dataPlaneEvents: tC,
                autoTrack: {
                    enabled: e_(!1),
                    pageLifecycle: {
                        enabled: e_(!1),
                        pageViewId: e_(void 0),
                        pageLoadedTimestamp: e_(void 0)
                    }
                }
            })
        }
          , tD = /^\s*at /
          , tO = /^(eval@)?(\[native code])?$/
          , tR = /(.+?)(?::(\d+))?(?::(\d+))?$/;
        function t$(e) {
            if (!e?.includes(":"))
                return [e || void 0, void 0, void 0];
            let t = e.startsWith("(") && e.endsWith(")") ? e.slice(1, -1) : e
              , i = tR.exec(t);
            return i ? [i[1] || void 0, void 0 === i[2] ? void 0 : Number(i[2]), void 0 === i[3] ? void 0 : Number(i[3])] : [void 0, void 0, void 0]
        }
        function tM(e) {
            if (!tD.test(e))
                return null;
            e.includes("(eval ") && (e = e.replaceAll("eval code", "eval").replaceAll(/(\(eval at [^()]*)|(,.*$)/g, ""));
            let t = e.replace(/^\s+/, "").replaceAll("(eval code", "(").replace(/^.*?\s+/, "")
              , i = / (\(.+\)$)/.exec(t)
              , r = i ? t.replace(i[0], "") : t
              , [n,s,a] = t$(i ? i[1] : t);
            return {
                functionName: i && r || void 0,
                fileName: "eval" === n || "<anonymous>" === n ? void 0 : n,
                lineNumber: s,
                columnNumber: a
            }
        }
        function tL(e) {
            if (tO.test(e))
                return null;
            if (e.includes(" > eval") && (e = e.replaceAll(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")),
            !e.includes("@") && !e.includes(":"))
                return {
                    functionName: e,
                    fileName: void 0,
                    lineNumber: void 0,
                    columnNumber: void 0
                };
            let t = e.lastIndexOf("@")
              , i = t > 0 ? e.slice(0, t) : void 0
              , [r,n,s] = t$(e.slice(t + 1));
            return {
                functionName: i,
                fileName: r,
                lineNumber: n,
                columnNumber: s
            }
        }
        let tN = "global code"
          , tB = e => "string" == typeof e ? e : "";
        function tx(e, t, i, r) {
            return {
                errorClass: tB(e),
                message: `${i}${tB(t)}`,
                type: "browserjs",
                stacktrace: r.reduce( (e, t) => {
                    let i = (e => {
                        let t, i = {
                            file: e.fileName,
                            method: k(t = e.functionName) && /^global code$/i.test(t) ? tN : t,
                            lineNumber: e.lineNumber,
                            columnNumber: e.columnNumber
                        };
                        return i.lineNumber && i.lineNumber > -1 && !i.file && !i.method && (i.file = tN),
                        i
                    }
                    )(t);
                    try {
                        if ("{}" === JSON.stringify(i))
                            return e;
                        return e.concat(i)
                    } catch {
                        return e
                    }
                }
                , [])
            }
        }
        let tU = (e, t) => {
            let i;
            if (S(e) && "string" == typeof ec(e))
                i = e;
            else {
                let r;
                t.warn((r = ea(e),
                `${K}:: Ignoring a non-error: ${r}.`)),
                i = void 0
            }
            return i
        }
          , tj = (e, t) => {
            try {
                return JSON.parse(e || "")
            } catch (e) {
                t(ed(e, "Failed to parse response data"))
            }
        }
          , t_ = "The request failed"
          , tH = [RegExp(`${t_}.*`), /A script with the id .* is already loaded\./]
          , tF = [/Failed to fetch dynamically imported module: .*/, /Unable to load \(.*\) the script with the id .*/, /A timeout of \d+ ms occurred while trying to load the script with id .*/]
          , tG = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: "GET"
        }
          , tQ = (e, t, i) => {
            let r = w(tG, t || {});
            return i && (r.headers = w(r.headers, {
                Authorization: i
            })),
            r.url = e,
            r
        }
          , tV = (e, t=eb, i) => new Promise( (r, n) => {
            let s;
            if (!0 === e.sendRawData)
                s = e.data;
            else if (null === (s = ea(e.data, !1, [], i)))
                return void n({
                    error: Error("Failed to prepare data for the request."),
                    undefined,
                    options: e
                });
            let a = new XMLHttpRequest
              , o = t => {
                n({
                    error: Error(( (e, t, i) => `${e} due to timeout or no connection (${t ? t.type : ""}) at the client side for URL: ${i}`)(t_, t, e.url)),
                    xhr: a,
                    options: e,
                    ...t?.type === "timeout" ? {
                        timedOut: !0
                    } : {}
                })
            }
            ;
            a.ontimeout = o,
            a.onerror = o,
            a.onload = () => {
                a.status >= 200 && a.status < 400 ? r({
                    response: a.responseText,
                    xhr: a,
                    options: e
                }) : (t => {
                    let i, r, s, o;
                    n({
                        error: Error((i = a.status,
                        r = a.statusText,
                        s = e.url,
                        o = a.responseText,
                        `${t_} with status ${i} (${r}) for URL: ${s}. Response: ${o.trim()}`)),
                        xhr: a,
                        options: e
                    })
                }
                )()
            }
            ,
            a.open(e.method, e.url, !0),
            !0 === e.withCredentials && (a.withCredentials = !0),
            a.timeout = t,
            Object.keys(e.headers).forEach(t => {
                e.headers[t] && a.setRequestHeader(t, e.headers[t])
            }
            );
            try {
                a.send(s)
            } catch (i) {
                let t;
                n({
                    error: ed(i, (t = e.url,
                    `${t_} for URL: ${t}`)),
                    xhr: a,
                    options: e
                })
            }
        }
        );
        class tK {
            constructor(e) {
                this.logger = e,
                this.onError = this.onError.bind(this)
            }
            init(e) {
                this.errorHandler = e
            }
            async getData(e) {
                let {url: t, options: i, timeout: r, isRawResponse: n} = e;
                try {
                    let e = await tV(tQ(t, i, this.basicAuthHeader), r, this.logger);
                    return {
                        data: n ? e.response : tj(e.response, this.onError),
                        details: e
                    }
                } catch (e) {
                    return {
                        data: void 0,
                        details: e
                    }
                }
            }
            getAsyncData(e) {
                let {callback: t, url: i, options: r, timeout: n, isRawResponse: s} = e
                  , a = !b(t);
                tV(tQ(i, r, this.basicAuthHeader), n, this.logger).then(e => {
                    a || t(s ? e.response : tj(e.response, this.onError), e)
                }
                ).catch(e => {
                    a || t(void 0, e)
                }
                )
            }
            onError(e, t) {
                this.errorHandler?.onError({
                    error: e,
                    context: "HttpClient",
                    groupingHash: t
                })
            }
            setAuthHeader(e, t=!1) {
                let i, r = t ? e : (i = `${e}:`,
                globalThis.btoa(Array.from(new TextEncoder().encode(i), e => String.fromCodePoint(e)).join("")));
                this.basicAuthHeader = `Basic ${r}`
            }
            resetAuthHeader() {
                this.basicAuthHeader = void 0
            }
        }
        let tz = new tK(e0)
          , tq = ["www.test-host.com", "localhost", "127.0.0.1", "[::1]"]
          , tW = ["userId", "userTraits", "groupId", "groupTraits", "anonymousId", "config", "integration", "eventBuffer", "traits", "authToken"]
          , tJ = e => {
            tP.capabilities.isAdBlockerDetectionInProgress.value = !0;
            try {
                let t = new URL(tP.lifecycle.sourceConfigUrl.value)
                  , i = `${t.origin}${t.pathname}?view=ad`;
                e.getAsyncData({
                    url: i,
                    options: {
                        method: "HEAD",
                        headers: {
                            "Content-Type": void 0
                        }
                    },
                    isRawResponse: !0,
                    callback: (e, t) => {
                        tP.capabilities.isAdBlockerDetectionInProgress.value = !1,
                        tP.capabilities.isAdBlocked.value = t?.error !== void 0 || t?.xhr?.responseURL !== i
                    }
                })
            } catch (e) {
                throw tP.capabilities.isAdBlockerDetectionInProgress.value = !1,
                e
            }
        }
          , tX = e => {
            if (e)
                return e.split("/").at(-2)
        }
          , tZ = e => {
            let t = e.stacktrace[0]?.file;
            if (t && "string" == typeof t)
                return t
        }
        ;
        class tY {
            initialized = !1;
            constructor(e, t) {
                this.httpClient = e,
                this.logger = t
            }
            init() {
                this.initialized || (this.attachErrorListeners(),
                this.initialized = !0)
            }
            attachErrorListeners() {
                globalThis.addEventListener("error", e => {
                    this.onError({
                        error: e,
                        context: K,
                        errorType: e1.UNHANDLEDEXCEPTION
                    })
                }
                ),
                globalThis.addEventListener("unhandledrejection", e => {
                    this.onError({
                        error: e,
                        context: K,
                        errorType: e1.UNHANDLEDREJECTION
                    })
                }
                ),
                document.addEventListener("securitypolicyviolation", e => {
                    let t = "string" == typeof e.blockedURI ? e.blockedURI : "";
                    "enforce" === e.disposition && t.startsWith(tn) && !tP.capabilities.cspBlockedURLs.value.includes(t) && (tP.capabilities.cspBlockedURLs.value = [...tP.capabilities.cspBlockedURLs.value, t])
                }
                )
            }
            async onError(e) {
                try {
                    let {error: t, context: i, customMessage: r, groupingHash: n, category: s} = e
                      , a = e.errorType ?? e1.HANDLEDEXCEPTION
                      , o = ( (e, t) => {
                        switch (t) {
                        case e1.UNHANDLEDEXCEPTION:
                            {
                                let {error: t} = e;
                                return t || e
                            }
                        case e1.UNHANDLEDREJECTION:
                            return e.reason;
                        case e1.HANDLEDEXCEPTION:
                        default:
                            return e
                        }
                    }
                    )(t, a)
                      , l = tU(o, this.logger);
                    if (void 0 === l)
                        return;
                    let u = r ? `${r} - ` : ""
                      , c = `${i}:: ${u}`
                      , d = ( (e, t) => {
                        try {
                            let i = function(e) {
                                if (!e.stack)
                                    throw Error("Cannot parse given Error object");
                                let t = e.stack.split("\n");
                                return t.some(e => tD.test(e)) ? t.map(tM).filter(e => null !== e) : t.map(tL).filter(e => null !== e)
                            }(e);
                            return tx(e.name, e.message, t, i)
                        } catch {
                            return tx(e.name, e.message, t, [])
                        }
                    }
                    )(l, c)
                      , g = ec(l).includes(eu);
                    if (!g && !(e => {
                        let t = tZ(e);
                        if (!t)
                            return !1;
                        let i = t.substring(t.lastIndexOf("/") + 1);
                        return tX(t) === te || ["rsa"].some(e => i.startsWith(e) && i.endsWith(".js"))
                    }
                    )(d) && a !== e1.HANDLEDEXCEPTION)
                        return;
                    if (tP.reporting.isErrorReportingEnabled.value && await ( (e, t, i) => {
                        let r = e.message;
                        return new Promise(e => {
                            if (tF.some(e => e.test(r))) {
                                let n = /https?:\/\/[^\s"'(),;<>[\]{}]+/.exec(r)?.[0];
                                "string" == typeof n ? n.startsWith(tn) ? t.capabilities.cspBlockedURLs.value.includes(n) ? e(!1) : ( (e, t, i) => {
                                    if (void 0 === e.capabilities.isAdBlocked.value) {
                                        !1 === e.capabilities.isAdBlockerDetectionInProgress.value && tJ(t);
                                        let r = eW( () => {
                                            k(e.capabilities.isAdBlocked.value) && (i(!1 === e.capabilities.isAdBlocked.value),
                                            r())
                                        }
                                        )
                                    } else
                                        i(!1 === e.capabilities.isAdBlocked.value)
                                }
                                )(t, i, e) : e(!1) : e(!0)
                            } else
                                e(!tH.some(e => e.test(r)))
                        }
                        )
                    }
                    )(d, tP, this.httpClient)) {
                        let e = {
                            severity: "error",
                            unhandled: a !== e1.HANDLEDEXCEPTION,
                            severityReason: {
                                type: a
                            }
                        }
                          , t = ( (e, t, i) => {
                            let r;
                            if (k(e))
                                if ("string" == typeof e)
                                    r = e;
                                else {
                                    let n = tU(e, i);
                                    r = k(n) ? n.message : t
                                }
                            else
                                r = t;
                            return r
                        }
                        )(n, d.message, this.logger)
                          , i = ( (e, t, i, r) => {
                            let n, s, a, o, {context: l, lifecycle: u, session: c, source: d, reporting: g, autoTrack: p} = i, {app: f, locale: v, userAgent: y, timezone: m, screen: b, library: k} = l;
                            return {
                                payloadVersion: "5",
                                notifier: {
                                    name: "RudderStack JavaScript SDK",
                                    version: f.value.version,
                                    url: "git+https://github.com/rudderlabs/rudder-sdk-js.git"
                                },
                                events: [{
                                    exceptions: [h(e)],
                                    severity: t.severity,
                                    unhandled: t.unhandled,
                                    severityReason: t.severityReason,
                                    app: {
                                        version: f.value.version,
                                        releaseStage: ( (e= () => window.location.hostname) => {
                                            let t = e();
                                            return !t || t && tq.includes(t) ? "development" : "production"
                                        }
                                        )(),
                                        type: f.value.installType
                                    },
                                    device: {
                                        locale: v.value ?? "NA",
                                        userAgent: y.value ?? "NA",
                                        time: new Date
                                    },
                                    request: {
                                        url: globalThis.location.href.split("?")[0],
                                        clientIp: "[NOT COLLECTED]"
                                    },
                                    breadcrumbs: h(g.breadcrumbs.value),
                                    context: e.message,
                                    groupingHash: r,
                                    metaData: {
                                        app: {
                                            snippetVersion: k.value.snippetVersion
                                        },
                                        device: {
                                            ...b.value,
                                            timezone: m.value
                                        },
                                        ...(e => {
                                            let t = ea(e, !1, tW);
                                            return null !== t ? JSON.parse(t) : {}
                                        }
                                        )(i)
                                    },
                                    user: (n = d,
                                    s = c,
                                    a = u,
                                    o = p,
                                    {
                                        id: `${n.value?.id ?? a.writeKey.value}..${s.sessionInfo.value.id ?? "NA"}..${o.pageLifecycle.pageViewId.value ?? "NA"}`,
                                        name: n.value?.name ?? "NA"
                                    })
                                }]
                            }
                        }
                        )(d, e, tP, t)
                          , r = s || (tX(tZ(d)) === te ? "integrations" : "sdk");
                        this.httpClient.getAsyncData({
                            url: tP.metrics.metricsServiceUrl.value,
                            options: {
                                method: "POST",
                                data: ea({
                                    version: "1",
                                    message_id: ei(),
                                    source: {
                                        name: "js",
                                        sdk_version: tP.context.app.value.version,
                                        write_key: tP.lifecycle.writeKey.value,
                                        install_type: tP.context.app.value.installType,
                                        category: r
                                    },
                                    errors: i
                                }),
                                sendRawData: !0
                            },
                            isRawResponse: !0
                        })
                    }
                    (a === e1.HANDLEDEXCEPTION || g) && this.logger.error(d.message)
                } catch (e) {
                    this.logger.error(`${K}:: Failed to handle the error.`, e)
                }
            }
            leaveBreadcrumb(e) {
                try {
                    tP.reporting.breadcrumbs.value = [...tP.reporting.breadcrumbs.value, {
                        type: "manual",
                        name: e,
                        timestamp: new Date,
                        metaData: {}
                    }]
                } catch (e) {
                    this.onError({
                        error: e,
                        context: K,
                        customMessage: e4,
                        groupingHash: e4
                    })
                }
            }
        }
        let t0 = new tY(tz,e0);
        class t1 {
            plugins = [];
            byName = {};
            cache = {};
            config = {
                throws: !0
            };
            constructor(e, t={}) {
                this.config = {
                    throws: !0,
                    ...t
                },
                this.logger = e
            }
            register(e, t) {
                if (!e.name) {
                    let t = `${z}:: Plugin name is missing.`;
                    if (!this.config.throws)
                        return void this.logger.error(t, e);
                    throw Error(t)
                }
                if (this.byName[e.name]) {
                    let t, i = (t = e.name,
                    `${z}:: Plugin "${t}" already exists.`);
                    if (!this.config.throws)
                        return void this.logger.error(i);
                    throw Error(i)
                }
                this.cache = {},
                this.plugins = this.plugins.slice();
                let i = this.plugins.length;
                this.plugins.forEach( (t, r) => {
                    t.deps?.includes(e.name) && (i = Math.min(i, r))
                }
                ),
                this.plugins.splice(i, 0, e),
                this.byName[e.name] = e,
                b(e.initialize) && e.initialize(t)
            }
            unregister(e) {
                let t = this.byName[e];
                if (!t) {
                    let t = `${z}:: Plugin "${e}" not found.`;
                    if (!this.config.throws)
                        return void this.logger.error(t);
                    throw Error(t)
                }
                let i = this.plugins.indexOf(t);
                if (-1 === i) {
                    let t = `${z}:: Plugin "${e}" not found in plugins but found in byName. This indicates a bug in the plugin engine. Please report this issue to the development team.`;
                    if (!this.config.throws)
                        return void this.logger.error(t);
                    throw Error(t)
                }
                this.cache = {},
                delete this.byName[e],
                this.plugins = this.plugins.slice(),
                this.plugins.splice(i, 1)
            }
            getPlugin(e) {
                return this.byName[e]
            }
            getPlugins(e) {
                let t = e ?? ".";
                return this.cache[t] || (this.cache[t] = this.plugins.filter(e => {
                    if (e.deps?.some(e => !this.byName[e])) {
                        let t, i = e.deps.filter(e => !this.byName[e]);
                        return this.logger.error((t = e.name,
                        `${z}:: Plugin "${t}" could not be loaded because some of its dependencies "${i}" do not exist.`)),
                        !1
                    }
                    return "." === t || !!E(e, t)
                }
                )),
                this.cache[t]
            }
            processRawPlugins(e) {
                e(this.plugins),
                this.cache = {}
            }
            invoke(e, t=!0, ...i) {
                let r = e;
                if (!r)
                    throw Error("Failed to invoke plugin because the extension point name is missing.");
                let n = r.startsWith("!")
                  , s = this.config.throws ?? r.endsWith("!");
                if (!(r = r.replace(/(^!|!$)/g, "")))
                    throw Error("Failed to invoke plugin because the extension point name is invalid.");
                let a = r.split(".");
                a.pop();
                let o = a.join(".");
                return (t ? this.getPlugins(r) : [this.getPlugins(r)[0]]).map(e => {
                    let t = E(e, r);
                    if (!b(t) || n)
                        return t;
                    try {
                        return t.apply(E(e, o), i)
                    } catch (n) {
                        let t, i;
                        if (s)
                            throw n;
                        this.logger.error((t = r,
                        i = e.name,
                        `${z}:: Failed to invoke the "${t}" extension point of plugin "${i}".`), n)
                    }
                    return null
                }
                )
            }
            invokeSingle(e, ...t) {
                return this.invoke(e, !1, ...t)[0]
            }
            invokeMultiple(e, ...t) {
                return this.invoke(e, !0, ...t)
            }
        }
        let t2 = new t1(e0,{
            throws: !0
        })
          , t3 = e => "cloud" !== e.config.connectionMode || !0 === e.config.useNativeSDKToSend || !0 === e.config.useNativeSDK
          , t6 = e => e.filter(t3)
          , t4 = ["BeaconQueue", "CustomConsentManager", "DeviceModeDestinations", "DeviceModeTransformation", "ExternalAnonymousId", "GoogleLinker", "IubendaConsentManager", "KetchConsentManager", "NativeDestinationQueue", "OneTrustConsentManager", "StorageEncryption", "StorageEncryptionLegacy", "StorageMigrator", "XhrQueue"]
          , t8 = ["Bugsnag", "ErrorReporting"]
          , t5 = {
            rudderAnalyticsRemotePlugins: {
                url: () => Promise.resolve(window.RudderStackGlobals && window.RudderStackGlobals.app && window.RudderStackGlobals.app.pluginsCDNPath ? `${window.RudderStackGlobals.app.pluginsCDNPath}/rsa-plugins.js` : "https://cdn.rudderlabs.com/v3/modern/plugins//rsa-plugins.js"),
                format: "esm",
                from: "vite"
            }
        };
        async function t9(e) {
            let t = t5[e];
            return t.inited ? t.lib : ["esm", "systemjs"].includes(t.format) ? new Promise( (e, i) => {
                ("function" == typeof t.url ? t.url : () => Promise.resolve(t.url))().then(r => {
                    import(r).then(i => {
                        if (!t.inited) {
                            let e = function e(t, i) {
                                let r = Object.assign(t, i);
                                for (let t of Object.keys(r))
                                    "object" == typeof r[t] && "object" == typeof i[t] && (r[t] = e(r[t], i[t]));
                                return r
                            }({}, (globalThis.__federation_shared__ || {}).default || {});
                            i.init(e),
                            t.lib = i,
                            t.lib.init(e),
                            t.inited = !0
                        }
                        e(t.lib)
                    }
                    ).catch(i)
                }
                )
            }
            ) : void 0
        }
        function t7(e, t) {
            if (!e?.default && t) {
                let t = Object.create(null);
                return t.default = e,
                t.__esModule = !0,
                t
            }
            return e
        }
        function ie(e, t) {
            return t9(e).then(e => e.get(t).then(e => e()))
        }
        let it = e => {
            let t = {};
            return e.forEach(e => {
                if (t4.includes(e)) {
                    let i = (e => {
                        switch (e) {
                        case "BeaconQueue":
                            return () => ie("rudderAnalyticsRemotePlugins", "./BeaconQueue").then(e => t7(e, !0));
                        case "CustomConsentManager":
                            return () => ie("rudderAnalyticsRemotePlugins", "./CustomConsentManager").then(e => t7(e, !0));
                        case "DeviceModeDestinations":
                            return () => ie("rudderAnalyticsRemotePlugins", "./DeviceModeDestinations").then(e => t7(e, !0));
                        case "DeviceModeTransformation":
                            return () => ie("rudderAnalyticsRemotePlugins", "./DeviceModeTransformation").then(e => t7(e, !0));
                        case "ExternalAnonymousId":
                            return () => ie("rudderAnalyticsRemotePlugins", "./ExternalAnonymousId").then(e => t7(e, !0));
                        case "GoogleLinker":
                            return () => ie("rudderAnalyticsRemotePlugins", "./GoogleLinker").then(e => t7(e, !0));
                        case "KetchConsentManager":
                            return () => ie("rudderAnalyticsRemotePlugins", "./KetchConsentManager").then(e => t7(e, !0));
                        case "IubendaConsentManager":
                            return () => ie("rudderAnalyticsRemotePlugins", "./IubendaConsentManager").then(e => t7(e, !0));
                        case "NativeDestinationQueue":
                            return () => ie("rudderAnalyticsRemotePlugins", "./NativeDestinationQueue").then(e => t7(e, !0));
                        case "OneTrustConsentManager":
                            return () => ie("rudderAnalyticsRemotePlugins", "./OneTrustConsentManager").then(e => t7(e, !0));
                        case "StorageEncryption":
                            return () => ie("rudderAnalyticsRemotePlugins", "./StorageEncryption").then(e => t7(e, !0));
                        case "StorageEncryptionLegacy":
                            return () => ie("rudderAnalyticsRemotePlugins", "./StorageEncryptionLegacy").then(e => t7(e, !0));
                        case "StorageMigrator":
                            return () => ie("rudderAnalyticsRemotePlugins", "./StorageMigrator").then(e => t7(e, !0));
                        case "XhrQueue":
                            return () => ie("rudderAnalyticsRemotePlugins", "./XhrQueue").then(e => t7(e, !0));
                        default:
                            return
                        }
                    }
                    )(e);
                    i && (t[e] = i)
                }
            }
            ),
            t
        }
          , ii = () => ({})
          , ir = {
            ...ii()
        };
        class is {
            constructor(e, t, i) {
                this.engine = e,
                this.errorHandler = t,
                this.logger = i,
                this.onError = this.onError.bind(this)
            }
            init() {
                tP.lifecycle.status.value = "pluginsLoading",
                eI("pluginsCDNPath", tP.lifecycle.pluginsCDNPath.value),
                this.setActivePlugins(),
                this.registerLocalPlugins(),
                this.registerRemotePlugins(),
                this.attachEffects()
            }
            attachEffects() {
                eW( () => {
                    (0 === tP.plugins.activePlugins.value.length || tP.plugins.loadedPlugins.value.length + tP.plugins.failedPlugins.value.length === tP.plugins.totalPluginsToLoad.value) && eP( () => {
                        tP.plugins.ready.value = !0,
                        tP.lifecycle.status.value = "pluginsReady"
                    }
                    )
                }
                )
            }
            getPluginsToLoadBasedOnConfig() {
                let e = tP.plugins.pluginsToLoadFromConfig.value;
                return e ? (e = e.filter(e => {
                    if (t8.includes(e))
                        return this.logger.warn(`${Q}:: ${e} plugin is deprecated. Please exclude it from the load API options.`),
                        !1;
                    return !0
                }
                ),
                [{
                    configurationStatus: () => k(tP.dataPlaneEvents.eventsQueuePluginName.value),
                    configurationStatusStr: "Data plane events delivery is enabled",
                    activePluginName: tP.dataPlaneEvents.eventsQueuePluginName.value,
                    supportedPlugins: Object.values(tc),
                    shouldAddMissingPlugins: !0
                }, {
                    configurationStatus: () => t6(tP.nativeDestinations.configuredDestinations.value).length > 0,
                    configurationStatusStr: "Device mode destinations are connected to the source",
                    supportedPlugins: ["DeviceModeDestinations", "NativeDestinationQueue"]
                }, {
                    configurationStatus: () => t6(tP.nativeDestinations.configuredDestinations.value).some(e => e.shouldApplyDeviceModeTransformation),
                    configurationStatusStr: "Device mode transformations are enabled for at least one destination",
                    supportedPlugins: ["DeviceModeTransformation"]
                }, {
                    configurationStatus: () => k(tP.consents.activeConsentManagerPluginName.value),
                    configurationStatusStr: "Consent management is enabled",
                    activePluginName: tP.consents.activeConsentManagerPluginName.value,
                    supportedPlugins: Object.values(tl)
                }, {
                    configurationStatus: () => k(tP.storage.encryptionPluginName.value),
                    configurationStatusStr: "Storage encryption is enabled",
                    activePluginName: tP.storage.encryptionPluginName.value,
                    supportedPlugins: Object.values(tu)
                }, {
                    configurationStatus: () => tP.storage.migrate.value,
                    configurationStatusStr: "Storage migration is enabled",
                    supportedPlugins: ["StorageMigrator"]
                }].forEach(t => {
                    t.configurationStatus() ? (e = e.filter(t.activePluginName ? e => !(e !== t.activePluginName && t.supportedPlugins.includes(e)) : e => k(e)),
                    this.addMissingPlugins(t, !1, e)) : e = e.filter(void 0 !== t.basePlugins ? e => !(t.basePlugins.includes(e) || t.supportedPlugins.includes(e)) : e => !t.supportedPlugins.includes(e))
                }
                ),
                [...Object.keys(ii()), ...e]) : []
            }
            addMissingPlugins(e, t, i) {
                let r = e.shouldAddMissingPlugins || t
                  , n = (e.activePluginName ? [...e.basePlugins || [], e.activePluginName] : [...e.supportedPlugins]).filter(e => !i.includes(e));
                n.length > 0 && (r && i.push(...n),
                this.logger.warn(( (e, t, i, r) => {
                    let n = 1 === i.length
                      , s = n ? ` '${i[0]}' plugin was` : ` ['${i.join("', '")}'] plugins were`
                      , a = `${e}:: ${t}, but${s} not configured to load.`;
                    return r ? `${a} So, ${n ? "the plugin" : "those plugins"} will be loaded automatically.` : `${a} Ignore if this was intentional. Otherwise, consider adding ${n ? "it" : "them"} to the 'plugins' load API option.`
                }
                )(Q, e.configurationStatusStr, n, r)))
            }
            setActivePlugins() {
                let e = this.getPluginsToLoadBasedOnConfig()
                  , t = [...Object.keys(ir), ...t4]
                  , i = []
                  , r = [];
                e.forEach(e => {
                    t.includes(e) ? i.push(e) : r.push(e)
                }
                ),
                r.length > 0 && this.logger.warn(`${Q}:: Ignoring unknown plugins: ${r.join(", ")}.`),
                eP( () => {
                    tP.plugins.totalPluginsToLoad.value = e.length,
                    tP.plugins.activePlugins.value = i,
                    tP.plugins.failedPlugins.value = r
                }
                )
            }
            registerLocalPlugins() {
                let e = [];
                (Object.entries(ir).forEach( ([t,i]) => {
                    tP.plugins.activePlugins.value.includes(t) && (b(i) ? this.register([i()]) : e.push(t))
                }
                ),
                e.length > 0) && (tP.plugins.failedPlugins.value = [...tP.plugins.failedPlugins.value, ...e],
                this.logger.error(`${Q}:: Failed to load the following unavailable local plugins: ${e.join(", ")}. Some features of the SDK may not work as expected. Make sure you are using the correct SDK bundle variant.`))
            }
            registerRemotePlugins() {
                let e, t = {
                    ...(e = tP.plugins.activePlugins.value,
                    it?.(e) || {})
                };
                Promise.all(Object.keys(t).map(async e => {
                    await t[e]().then(e => this.register([e.default()])).catch(t => {
                        tP.plugins.failedPlugins.value = [...tP.plugins.failedPlugins.value, e],
                        this.onError(t, `Failed to load plugin "${e}"`, t)
                    }
                    )
                }
                )).catch(e => {
                    this.onError(e)
                }
                )
            }
            invokeMultiple(e, ...t) {
                try {
                    return this.engine.invokeMultiple(e, ...t)
                } catch (t) {
                    return this.onError(t, e),
                    []
                }
            }
            invokeSingle(e, ...t) {
                try {
                    return this.engine.invokeSingle(e, ...t)
                } catch (t) {
                    return this.onError(t, e),
                    null
                }
            }
            register(e) {
                e.forEach(e => {
                    try {
                        this.engine.register(e, tP)
                    } catch (t) {
                        tP.plugins.failedPlugins.value = [...tP.plugins.failedPlugins.value, e.name],
                        this.onError(t, `Failed to register plugin "${e.name}"`)
                    }
                }
                )
            }
            unregisterLocalPlugins() {
                Object.keys(ir).forEach(e => {
                    try {
                        this.engine.unregister(e)
                    } catch (t) {
                        this.onError(t, `Failed to unregister plugin "${e}"`)
                    }
                }
                )
            }
            onError(e, t, i) {
                this.errorHandler.onError({
                    error: e,
                    context: Q,
                    customMessage: t,
                    groupingHash: i
                })
            }
        }
        let ia = "cookieStorage"
          , io = "localStorage"
          , il = "sessionStorage"
          , iu = "memoryStorage"
          , ic = "none"
          , id = {
            userId: "rl_user_id",
            userTraits: "rl_trait",
            anonymousId: "rl_anonymous_id",
            groupId: "rl_group_id",
            groupTraits: "rl_group_trait",
            initialReferrer: "rl_page_init_referrer",
            initialReferringDomain: "rl_page_init_referring_domain",
            sessionInfo: "rl_session",
            authToken: "rl_auth_token"
        }
          , ig = "clientDataInCookie"
          , ih = "clientDataInLocalStorage"
          , ip = "clientDataInSessionStorage"
          , iv = ["userId", "userTraits", "anonymousId", "groupId", "groupTraits", "initialReferrer", "initialReferringDomain", "sessionInfo", "authToken"]
          , iy = {
            [ia]: ig,
            [io]: ih,
            [iu]: "clientDataInMemory",
            [il]: ip
        }
          , im = (e, t) => {
            try {
                return encodeURIComponent(e)
            } catch (e) {
                t?.error("Failed to encode the cookie data.", e);
                return
            }
        }
          , ib = e => {
            try {
                return decodeURIComponent(e)
            } catch (e) {
                return
            }
        }
          , ik = () => (e => {
            let t, i = {}, r = e.split(/\s*;\s*/);
            return r[0] && r.forEach(e => {
                let r = (t = e.split("="))[0] ? ib(t[0]) : void 0;
                r && (i[r] = t[1] ? ib(t[1]) : void 0)
            }
            ),
            i
        }
        )(globalThis.document.cookie)
          , iI = function(e, t, i, r) {
            switch (arguments.length) {
            case 4:
            case 3:
            case 2:
                let n = {
                    ...i || {}
                }
                  , s = `${im(e, r)}=${im(t, r)}`;
                null === t && (n.maxage = -1),
                n.maxage && (n.expires = new Date(+new Date + n.maxage)),
                n.path && (s += `; path=${n.path}`),
                n.domain && (s += `; domain=${n.domain}`),
                n.expires && (s += `; expires=${n.expires.toUTCString()}`),
                n.samesite && (s += `; samesite=${n.samesite}`),
                n.secure && (s += "; secure"),
                globalThis.document.cookie = s;
                return;
            case 1:
                if (e)
                    return ik()[e];
                return ik();
            default:
                return ik()
            }
        };
        class iS {
            isEnabled = !0;
            length = 0;
            data = {};
            constructor(e) {
                this.options = {
                    enabled: !0
                },
                this.logger = e
            }
            configure(e) {
                return this.options = w(this.options, e ?? {}),
                this.isEnabled = !!this.options.enabled,
                this.options
            }
            setItem(e, t) {
                return this.data[e] = t,
                this.length = Object.keys(this.data).length,
                t
            }
            getItem(e) {
                return e in this.data ? this.data[e] : null
            }
            removeItem(e) {
                return e in this.data && delete this.data[e],
                this.length = Object.keys(this.data).length,
                null
            }
            clear() {
                this.data = {},
                this.length = 0
            }
            key(e) {
                return this.keys()[e] ?? null
            }
            keys() {
                return Object.keys(this.data)
            }
        }
        let iE = new iS(e0);
        var iT = {
            exports: {}
        };
        iT.exports;
        let iA = function(e) {
            return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
        }(function() {
            return l ? iT.exports : (l = 1,
            iT.exports = function() {
                function e(e) {
                    return e = JSON.stringify(e),
                    !!/^\{[\s\S]*\}$/.test(e)
                }
                function t(e) {
                    if ("string" == typeof e)
                        try {
                            return JSON.parse(e)
                        } catch (t) {
                            return e
                        }
                }
                function i(e) {
                    return "[object Function]" === ({}).toString.call(e)
                }
                var r = function(e) {
                    var t = "_Is_Incognit";
                    try {
                        e || (e = window.localStorage),
                        e.setItem(t, "yes"),
                        e.removeItem(t)
                    } catch (t) {
                        var i = {};
                        i._data = {},
                        i.setItem = function(e, t) {
                            return i._data[e] = String(t)
                        }
                        ,
                        i.getItem = function(e) {
                            return i._data.hasOwnProperty(e) ? i._data[e] : void 0
                        }
                        ,
                        i.removeItem = function(e) {
                            return delete i._data[e]
                        }
                        ,
                        i.clear = function() {
                            return i._data = {}
                        }
                        ,
                        e = i
                    } finally {
                        "yes" === e.getItem(t) && e.removeItem(t)
                    }
                    return e
                }();
                function n() {
                    if (!(this instanceof n))
                        return new n
                }
                n.prototype = {
                    set: function(t, i) {
                        if (t && !e(t))
                            r.setItem(t, void 0 === i || "function" == typeof i ? i + "" : JSON.stringify(i));
                        else if (e(t))
                            for (var n in t)
                                this.set(n, t[n]);
                        return this
                    },
                    get: function(e) {
                        if (void 0 === e) {
                            var i = {};
                            return this.forEach(function(e, t) {
                                return i[e] = t
                            }),
                            i
                        }
                        if ("?" === e.charAt(0))
                            return this.has(e.substr(1));
                        var n = arguments;
                        if (n.length > 1) {
                            for (var s = {}, a = 0, o = n.length; a < o; a++) {
                                var l = t(r.getItem(n[a]));
                                this.has(n[a]) && (s[n[a]] = l)
                            }
                            return s
                        }
                        return t(r.getItem(e))
                    },
                    clear: function() {
                        return r.clear(),
                        this
                    },
                    remove: function(e) {
                        var t = this.get(e);
                        return r.removeItem(e),
                        t
                    },
                    has: function(e) {
                        return ({}).hasOwnProperty.call(this.get(), e)
                    },
                    keys: function() {
                        var e = [];
                        return this.forEach(function(t) {
                            e.push(t)
                        }),
                        e
                    },
                    forEach: function(e) {
                        for (var t = 0, i = r.length; t < i; t++) {
                            var n = r.key(t);
                            e(n, this.get(n))
                        }
                        return this
                    },
                    search: function(e) {
                        for (var t = this.keys(), i = {}, r = 0, n = t.length; r < n; r++)
                            t[r].indexOf(e) > -1 && (i[t[r]] = this.get(t[r]));
                        return i
                    },
                    len: function() {
                        return r.length
                    }
                };
                var s = null;
                function a(t, r) {
                    var o = arguments
                      , l = null;
                    if (s || (s = n()),
                    0 === o.length)
                        return s.get();
                    if (1 === o.length) {
                        if ("string" == typeof t)
                            return s.get(t);
                        if (e(t))
                            return s.set(t)
                    }
                    if (2 === o.length && "string" == typeof t) {
                        if (!r)
                            return s.remove(t);
                        if (r && "string" == typeof r)
                            return s.set(t, r);
                        r && i(r) && (l = null,
                        l = r(t, s.get(t)),
                        a.set(t, l))
                    }
                    if (2 === o.length && "[object Array]" === Object.prototype.toString.call(t) && i(r))
                        for (var u = 0, c = t.length; u < c; u++)
                            l = r(t[u], s.get(t[u])),
                            a.set(t[u], l);
                    return a
                }
                for (var o in n.prototype)
                    a[o] = n.prototype[o];
                return a
            }(),
            iT.exports)
        }())
          , iw = e => e instanceof DOMException && (["QuotaExceededError", "NS_ERROR_DOM_QUOTA_REACHED"].includes(e.name) || [22, 1014].includes(e.code))
          , iC = (e=io, t, i) => {
            let r, n, s, a = `${H}:: The "${e}" storage type is `, o = "unavailable", l = !0;
            try {
                switch (e) {
                case iu:
                    return !0;
                case ia:
                    r = t,
                    n = "test_rudder_cookie";
                    break;
                case io:
                    r = t ?? globalThis.localStorage,
                    n = "test_rudder_ls";
                    break;
                case il:
                    r = t ?? globalThis.sessionStorage,
                    n = "test_rudder_ss";
                    break;
                default:
                    return !1
                }
                if (r && (r.setItem(n, "true"),
                r.getItem(n)))
                    return r.removeItem(n),
                    !0;
                l = !1
            } catch (e) {
                l = !1,
                s = e,
                iw(e) && (o = "full")
            }
            return l || i?.warn(`${a}${o}.`, s),
            !1
        }
        ;
        class iP {
            isSupportAvailable = !0;
            isEnabled = !0;
            length = 0;
            constructor(e) {
                this.options = {
                    enabled: !0
                },
                this.logger = e
            }
            configure(e) {
                return this.options = w(this.options, e ?? {}),
                this.isSupportAvailable = iC(io),
                this.isEnabled = !!(this.options.enabled && this.isSupportAvailable),
                this.options
            }
            setItem(e, t) {
                iA.set(e, t),
                this.length = iA.len()
            }
            getItem(e) {
                let t = iA.get(e);
                return void 0 === t ? null : t
            }
            removeItem(e) {
                iA.remove(e),
                this.length = iA.len()
            }
            clear() {
                iA.clear(),
                this.length = 0
            }
            key(e) {
                return this.keys()[e] ?? null
            }
            keys() {
                return iA.keys()
            }
        }
        let iD = new iP(e0);
        class iO {
            isSupportAvailable = !0;
            isEnabled = !0;
            length = 0;
            constructor(e) {
                this.options = {
                    enabled: !0
                },
                this.logger = e
            }
            configure(e) {
                return this.options = w(this.options, e ?? {}),
                this.isSupportAvailable = iC(il),
                this.isSupportAvailable && (this.store = globalThis.sessionStorage),
                this.isEnabled = !!(this.options.enabled && this.isSupportAvailable),
                this.options
            }
            setItem(e, t) {
                this.store && (this.store.setItem(e, t),
                this.length = this.store.length)
            }
            getItem(e) {
                if (!this.store)
                    return null;
                let t = this.store.getItem(e);
                return void 0 === t ? null : t
            }
            removeItem(e) {
                this.store && (this.store.removeItem(e),
                this.length = this.store.length)
            }
            clear() {
                this.store?.clear(),
                this.length = 0
            }
            key(e) {
                return this.store?.key(e) ?? null
            }
            keys() {
                let e = [];
                if (!this.store)
                    return e;
                for (let t = 0; t < this.store.length; t += 1) {
                    let i = this.store.key(t);
                    null !== i && e.push(i)
                }
                return e
            }
        }
        let iR = new iO(e0);
        class i$ {
            isSupportAvailable = !0;
            isEnabled = !0;
            length = 0;
            constructor(e) {
                this.logger = e
            }
            configure(e) {
                return this.options || (this.options = ( () => {
                    let e = `.${(e => {
                        let t = (e => {
                            let t = "function" != typeof globalThis.URL ? (e => {
                                let t = document.createElement("a");
                                return t.href = e,
                                t.hostname
                            }
                            )(e) : new URL(e).hostname
                              , i = t?.split(".") ?? []
                              , r = i[i.length - 1]
                              , n = [];
                            if (4 === i.length && r && r === parseInt(r, 10).toString())
                                return n;
                            if (i.length <= 1)
                                return i[0] && -1 !== i[0].indexOf("localhost") ? ["localhost"] : n;
                            for (let e = i.length - 2; e >= 0; e -= 1)
                                n.push(i.slice(e).join("."));
                            return n
                        }
                        )(e);
                        for (let e = 0; e < t.length; e += 1) {
                            let i = t[e]
                              , r = "__tld__"
                              , n = {
                                domain: `${-1 !== i.indexOf("localhost") ? "" : "."}${i}`
                            };
                            try {
                                if (iI(r, 1, n),
                                iI(r))
                                    return iI(r, null, n),
                                    i
                            } catch {
                                try {
                                    iI(r, null, n)
                                } catch {}
                            }
                        }
                        return ""
                    }
                    )(globalThis.location.href)}`;
                    return {
                        maxage: 31536e6,
                        path: "/",
                        domain: e && "." !== e ? e : void 0,
                        samesite: "Lax",
                        enabled: !0
                    }
                }
                )()),
                this.options = w(this.options, e ?? {}),
                this.options.sameDomainCookiesOnly && delete this.options.domain,
                this.isSupportAvailable = iC(ia, this),
                this.isEnabled = !!(this.options.enabled && this.isSupportAvailable),
                this.options
            }
            setItem(e, t) {
                return iI(e, t, this.options, this.logger),
                this.length = Object.keys(iI()).length,
                !0
            }
            getItem(e) {
                let t = iI(e);
                return void 0 === t ? null : t
            }
            removeItem(e) {
                let t = this.setItem(e, null);
                return this.length = Object.keys(iI()).length,
                t
            }
            clear() {}
            key(e) {
                return this.keys()[e] ?? null
            }
            keys() {
                return Object.keys(iI())
            }
        }
        let iM = new i$(e0)
          , iL = e => {
            switch (e) {
            case io:
                return iD;
            case il:
                return iR;
            case iu:
                return iE;
            case ia:
                return iM;
            default:
                return iE
            }
        }
        ;
        class iN {
            constructor(e, t, i) {
                this.id = e.id,
                this.name = e.name,
                this.isEncrypted = e.isEncrypted ?? !1,
                this.validKeys = e.validKeys ?? {},
                this.engine = t,
                this.noKeyValidation = 0 === Object.keys(this.validKeys).length,
                this.noCompoundKey = e.noCompoundKey,
                this.originalEngine = this.engine,
                this.errorHandler = e.errorHandler,
                this.logger = e.logger,
                this.pluginsManager = i
            }
            createValidKey(e) {
                let t, {name: i, id: r, validKeys: n, noKeyValidation: s, noCompoundKey: a} = this;
                return s ? a ? e : [i, r, e].join(".") : (Object.values(n).forEach(n => {
                    n === e && (t = a ? e : [i, r, e].join("."))
                }
                ),
                t)
            }
            swapQueueStoreToInMemoryEngine() {
                let {name: e, id: t, validKeys: i, noCompoundKey: r} = this
                  , n = iL(iu);
                Object.keys(i).forEach(s => {
                    let a = this.get(i[s])
                      , o = r ? s : [e, t, s].join(".");
                    n.setItem(o, a),
                    this.remove(s)
                }
                ),
                this.engine = n
            }
            set(e, t) {
                let i = this.createValidKey(e);
                if (i)
                    try {
                        this.engine.setItem(i, this.encrypt(ea(t, !1, [], this.logger)))
                    } catch (i) {
                        if (iw(i)) {
                            let i;
                            this.logger.warn((i = `Store ${this.id}`,
                            `${i}:: The storage is either full or unavailable, so the data will not be persisted. Switching to in-memory storage.`)),
                            this.swapQueueStoreToInMemoryEngine(),
                            this.set(e, t)
                        } else {
                            let t = `Failed to save the value for "${e}" to storage`;
                            this.onError(i, t, t)
                        }
                    }
            }
            get(e) {
                let t, i = this.createValidKey(e);
                try {
                    if (!i)
                        return null;
                    if (t = this.decrypt(this.engine.getItem(i)),
                    null == t || "" === t)
                        return null;
                    return JSON.parse(t)
                } catch (i) {
                    let t = tP.storage.encryptionPluginName.value;
                    if (!t || !tP.plugins.failedPlugins.value.includes(t)) {
                        let t = `Failed to retrieve or parse data for "${e}" from storage`;
                        this.onError(i, t, t)
                    }
                    return null
                }
            }
            remove(e) {
                let t = this.createValidKey(e);
                t && this.engine.removeItem(t)
            }
            getOriginalEngine() {
                return this.originalEngine
            }
            decrypt(e) {
                return null == e ? null : this.crypto(e, "decrypt")
            }
            encrypt(e) {
                return this.crypto(e, "encrypt")
            }
            crypto(e, t) {
                if (!this.isEncrypted || !e || "string" != typeof e || "" === e.replace(/^\s+|\s+$/gm, ""))
                    return e;
                let i = `storage.${t}`
                  , r = this.pluginsManager ? this.pluginsManager.invokeSingle(i, e) : e;
                return void 0 === r ? e : r ?? ""
            }
            onError(e, t, i) {
                this.errorHandler.onError({
                    error: e,
                    context: `Store ${this.id}`,
                    customMessage: t,
                    groupingHash: i
                })
            }
        }
        class iB {
            stores = {};
            isInitialized = !1;
            constructor(e, t, i) {
                this.errorHandler = t,
                this.logger = i,
                this.pluginsManager = e
            }
            init() {
                if (this.isInitialized)
                    return;
                let e = tP.loadOptions.value
                  , t = {
                    cookieStorageOptions: {
                        samesite: e.sameSiteCookie,
                        secure: e.secureCookie,
                        domain: e.setCookieDomain,
                        sameDomainCookiesOnly: e.sameDomainCookiesOnly
                    },
                    localStorageOptions: {},
                    inMemoryStorageOptions: {},
                    sessionStorageOptions: {}
                };
                ( (e={}, t={}, i={}, r={}) => {
                    (e => {
                        let t = iM.configure(e);
                        tP.storage.cookie.value = {
                            maxage: t.maxage,
                            path: t.path,
                            domain: t.domain,
                            samesite: t.samesite,
                            expires: t.expires,
                            secure: t.secure
                        }
                    }
                    )(e),
                    iD.configure(t),
                    iE.configure(i),
                    iR.configure(r)
                }
                )(P(w(t.cookieStorageOptions ?? {}, tP.storage.cookie?.value ?? {})), P(t.localStorageOptions), P(t.inMemoryStorageOptions), P(t.sessionStorageOptions)),
                this.initClientDataStores(),
                this.isInitialized = !0
            }
            initClientDataStores() {
                this.initializeStorageState(),
                [iu, io, ia, il].forEach(e => {
                    iL(e)?.isEnabled && this.setStore({
                        id: iy[e],
                        name: iy[e],
                        isEncrypted: !0,
                        noCompoundKey: !0,
                        type: e,
                        errorHandler: this.errorHandler,
                        logger: this.logger
                    })
                }
                )
            }
            initializeStorageState() {
                let e = tP.storage.type.value
                  , t = tP.loadOptions.value.storage?.entries
                  , i = tP.consents.postConsent.value.storage;
                (k(i?.type) || k(i?.entries)) && (e = i?.type,
                t = i?.entries);
                let r = !0
                  , n = {};
                iv.forEach(i => {
                    let s = t?.[i]?.type
                      , a = ( (e, t) => {
                        let i;
                        if (e.consents.preConsent.value.enabled)
                            switch (e.consents.preConsent.value.storage?.strategy) {
                            case "none":
                                i = ic;
                                break;
                            case "session":
                                "sessionInfo" !== t && (i = ic);
                                break;
                            case "anonymousId":
                                "anonymousId" !== t && (i = ic)
                            }
                        return i
                    }
                    )(tP, i) ?? s ?? e ?? e3
                      , o = this.getResolvedStorageTypeForEntry(a, i);
                    o !== ic && (r = !1),
                    n = {
                        ...n,
                        [i]: {
                            type: o,
                            key: id[i]
                        }
                    }
                }
                ),
                eP( () => {
                    tP.storage.type.value = e,
                    tP.storage.entries.value = n,
                    tP.storage.trulyAnonymousTracking.value = r
                }
                )
            }
            getResolvedStorageTypeForEntry(e, t) {
                let i, r = e;
                switch (e) {
                case io:
                    iL(io)?.isEnabled || (r = iu);
                    break;
                case il:
                    iL(il)?.isEnabled || (r = iu);
                    break;
                case iu:
                case ic:
                    break;
                default:
                    r = iL(ia)?.isEnabled ? ia : iL(io)?.isEnabled ? io : iL(il)?.isEnabled ? il : iu
                }
                return r !== e && this.logger.warn((i = r,
                `StoreManager:: The storage type "${e}" is not available for entry "${t}". The SDK will initialize the entry with "${i}" storage type instead.`)),
                r
            }
            setStore(e) {
                let t = iL(e.type);
                return this.stores[e.id] = new iN(e,t,this.pluginsManager),
                this.stores[e.id]
            }
            getStore(e) {
                return this.stores[e]
            }
        }
        let ix = e => {
            let {host: t, protocol: i} = new URL(e)
              , r = t.split(".");
            return {
                topDomain: r.length > 2 ? `${r[r.length - 2]}.${r[r.length - 1]}` : t,
                protocol: i
            }
        }
          , iU = e => e?.endsWith("/") ? iU(e.substring(0, e.length - 1)) : e
          , ij = e => {
            try {
                return new URL(e).host
            } catch (e) {
                return null
            }
        }
          , i_ = e => ij(e) ?? ""
          , iH = e => {
            if ("string" != typeof e)
                return !1;
            try {
                return b(globalThis.URL) && new URL(e),
                ti.test(e)
            } catch (e) {
                return !1
            }
        }
          , iF = "none"
          , iG = "immediate"
          , iQ = e => C(e) || Array.isArray(e)
          , iV = (e, t) => {
            let i, r, n = [], s = [], a = !1, o = e?.enabled === !0;
            C(e) && o && ({provider: r, consentManagerPluginName: i} = ( (e, t) => {
                let {provider: i} = e
                  , r = i ? tl[i] : void 0;
                if (i && !r) {
                    let e;
                    t.error((e = i,
                    `${F}:: The consent manager "${e}" is not supported. Please choose one of the following supported consent managers: "${Object.keys(tl)}".`)),
                    i = void 0
                }
                return {
                    provider: i,
                    consentManagerPluginName: r
                }
            }
            )(e, t),
            iQ(e.allowedConsentIds) && (n = e.allowedConsentIds,
            a = !0),
            iQ(e.deniedConsentIds) && (s = e.deniedConsentIds,
            a = !0));
            let l = {
                allowedConsentIds: n,
                deniedConsentIds: s
            };
            return o = o && !!i,
            {
                provider: r,
                consentManagerPluginName: i,
                initialized: a,
                enabled: o,
                consentsData: l
            }
        }
          , iK = (e, t, i, r, n, s, a) => {
            let o;
            if (s) {
                if (!iH(s))
                    return a.error(`${F}:: The base URL "${s}" for ${e} is not valid.`),
                    null;
                o = iU(s)
            } else if (o = i,
            "cdn" === tP.context.app.value.installType) {
                let e = ( () => {
                    let e = document.querySelector("script[data-rsa-write-key]");
                    if (e && e.dataset.rsaWriteKey === tP.lifecycle.writeKey.value)
                        return e.src;
                    let t = document.getElementsByTagName("script")
                      , i = /(?:^|\/)rsa(\.min)?\.js$/;
                    for (let e of t) {
                        let t = e.getAttribute("src");
                        if (t && i.test(t))
                            return t
                    }
                }
                )();
                e && (o = e.split("/").slice(0, -1).concat(t).join("/"))
            }
            return n && (o = o.replace(RegExp(`/v3/${tr}/${t}$`), `/${r}/${tr}/${t}`)),
            o
        }
        ;
        class iz {
            constructor(e, t, i) {
                this.errorHandler = t,
                this.logger = i,
                this.httpClient = e,
                this.onError = this.onError.bind(this),
                this.processConfig = this.processConfig.bind(this)
            }
            attachEffects() {
                eW( () => {
                    this.logger.setMinLogLevel(tP.lifecycle.logLevel.value)
                }
                )
            }
            init() {
                let e, {logLevel: t, configUrl: i, lockIntegrationsVersion: r, lockPluginsVersion: n, destSDKBaseURL: s, pluginsSDKBaseURL: a, integrations: o} = tP.loadOptions.value, l = iK("integrations", te, ts, ep, r, s, this.logger);
                null !== l && null !== (e = iK("plugins", tt, ta, ep, n, a, this.logger)) && (this.attachEffects(),
                tP.lifecycle.activeDataplaneUrl.value = iU(tP.lifecycle.dataPlaneUrl.value),
                (e => {
                    let t, i, {storage: r} = tP.loadOptions.value, n = r?.type;
                    if (k(n) && !("string" == typeof (i = n) && e2.includes(i))) {
                        let t;
                        e.warn((t = n,
                        `${F}:: The storage type "${t}" is not supported. Please choose one of the following supported types: "${e2}". The default type "${e3}" will be used instead.`)),
                        n = e3
                    }
                    let s = r?.encryption?.version
                      , a = s && tu[s];
                    if (void 0 === s || void 0 !== a)
                        void 0 === s && (s = "v3");
                    else {
                        let t;
                        e.warn((t = s,
                        `${F}:: The storage encryption version "${t}" is not supported. Please choose one of the following supported versions: "${Object.keys(tu)}". The default version "v3" will be used instead.`)),
                        s = "v3"
                    }
                    let o = r?.migrate
                      , l = o && "v3" === s;
                    !0 === o && l !== o && e.warn((t = s,
                    `${F}:: The storage data migration has been disabled because the configured storage encryption version (${t}) is not the latest (v3). To enable storage data migration, please update the storage encryption version to the latest version.`));
                    let {sscEnabled: u, finalDataServiceUrl: c, cookieOptions: d} = (e => {
                        let t, {useServerSideCookies: i, dataServiceEndpoint: r, storage: n, setCookieDomain: s, sameDomainCookiesOnly: a} = tP.loadOptions.value, o = n?.cookie, l = !1;
                        if (i) {
                            l = i;
                            let n = o.domain ?? s
                              , u = k(n) && !(e => {
                                let {topDomain: t} = ix(window.location.href);
                                return t === e
                            }
                            )(M(n)) || a
                              , c = ( (e, t) => {
                                let i = t ? window.location.origin : (e => {
                                    let {topDomain: t, protocol: i} = ix(e);
                                    return `${i}//${t}`
                                }
                                )(window.location.href)
                                  , r = e.startsWith("/") ? e.substring(1) : e;
                                return `${i}/${r}`
                            }
                            )(r ?? "rsaRequest", u);
                            if (iH(c)) {
                                t = iU(c);
                                let i = ij(window.location.href)
                                  , r = ij(c);
                                (i !== r && (o = {
                                    ...o,
                                    samesite: "None",
                                    secure: !0
                                }),
                                !a && u && r !== M(n)) && (l = !1,
                                e.warn(`${F}:: The provided cookie domain (${n}) does not match the current webpage's domain (${r}). Hence, the cookies will be set client-side.`))
                            } else
                                l = !1
                        }
                        return {
                            sscEnabled: l,
                            cookieOptions: o,
                            finalDataServiceUrl: t
                        }
                    }
                    )(e);
                    eP( () => {
                        tP.storage.type.value = n,
                        tP.storage.cookie.value = d,
                        tP.serverCookies.isEnabledServerSideCookies.value = u,
                        tP.serverCookies.dataServiceUrl.value = c,
                        tP.storage.encryptionPluginName.value = tu[s],
                        tP.storage.migrate.value = l
                    }
                    )
                }
                )(this.logger),
                (e => {
                    let {provider: t, consentManagerPluginName: i, initialized: r, enabled: n, consentsData: s} = iV(tP.loadOptions.value.consentManagement, e)
                      , a = tP.loadOptions.value.preConsent
                      , o = a?.storage?.strategy ?? iF;
                    if (k(o) && !["none", "session", "anonymousId"].includes(o)) {
                        let t;
                        o = iF,
                        e.warn((t = a?.storage?.strategy,
                        `${F}:: The pre-consent storage strategy "${t}" is not supported. Please choose one of the following supported strategies: "none, session, anonymousId". The default strategy "${iF}" will be used instead.`))
                    }
                    let l = a?.events?.delivery ?? iG;
                    if (k(l) && !["immediate", "buffer"].includes(l)) {
                        let t;
                        l = iG,
                        e.warn((t = a?.events?.delivery,
                        `${F}:: The pre-consent events delivery type "${t}" is not supported. Please choose one of the following supported types: "immediate, buffer". The default type "${iG}" will be used instead.`))
                    }
                    eP( () => {
                        tP.consents.activeConsentManagerPluginName.value = i,
                        tP.consents.initialized.value = r,
                        tP.consents.enabled.value = n,
                        tP.consents.data.value = s,
                        tP.consents.provider.value = t,
                        tP.consents.preConsent.value = {
                            enabled: tP.loadOptions.value.preConsent?.enabled === !0 && !1 === r && !0 === n,
                            storage: {
                                strategy: o
                            },
                            events: {
                                delivery: l
                            }
                        }
                    }
                    )
                }
                )(this.logger),
                (e => {
                    if (tP.dataPlaneEvents.deliveryEnabled.value) {
                        let t = "XhrQueue"
                          , i = t;
                        if (tP.loadOptions.value.useBeacon)
                            if (tP.capabilities.isBeaconAvailable.value)
                                i = "BeaconQueue";
                            else
                                i = t,
                                e.warn(`${F}:: The Beacon API is not supported by your browser. The events will be sent using XHR instead.`);
                        eP( () => {
                            tP.dataPlaneEvents.eventsQueuePluginName.value = i
                        }
                        )
                    }
                }
                )(this.logger),
                eP( () => {
                    tP.lifecycle.integrationsCDNPath.value = l,
                    tP.lifecycle.pluginsCDNPath.value = e,
                    t && (tP.lifecycle.logLevel.value = t),
                    tP.lifecycle.sourceConfigUrl.value = ( (e, t, i, r, n) => {
                        let s = new URLSearchParams({
                            p: "npm",
                            v: ep,
                            build: tr,
                            writeKey: t,
                            lockIntegrationsVersion: i.toString(),
                            lockPluginsVersion: r.toString()
                        })
                          , a = to
                          , o = s
                          , l = "/sourceConfig/"
                          , u = "";
                        if (iH(e)) {
                            let t = new URL(e);
                            iU(t.pathname).endsWith("/sourceConfig") || (t.pathname = `${iU(t.pathname)}/sourceConfig/`),
                            t.pathname = t.pathname.replace(/\/{2,}/g, "/"),
                            s.forEach( (e, i) => {
                                null === t.searchParams.get(i) && t.searchParams.set(i, e)
                            }
                            ),
                            a = t.origin,
                            l = t.pathname,
                            o = t.searchParams,
                            u = t.hash
                        } else
                            n.warn(`${F}:: The provided source config URL "${e}" is invalid. Using the default source config URL instead.`);
                        return `${a}${l}?${o}${u}`
                    }
                    )(i, tP.lifecycle.writeKey.value, r, n, this.logger),
                    tP.metrics.metricsServiceUrl.value = `${tP.lifecycle.activeDataplaneUrl.value}/rsaMetrics`,
                    tP.nativeDestinations.loadOnlyIntegrations.value = o
                }
                ),
                this.getConfig())
            }
            onError(e, t, i) {
                this.errorHandler.onError({
                    error: e,
                    context: F,
                    customMessage: t,
                    groupingHash: i
                })
            }
            processConfig(e, t) {
                var i;
                let r, n, s, a, o;
                if (!k(e))
                    return void (k(t) ? this.onError(t.error, e8) : this.onError(Error(e8)));
                try {
                    r = "string" == typeof e ? JSON.parse(e) : e
                } catch (e) {
                    this.onError(e, e6);
                    return
                }
                if (!(T(n = r) && T(n.source) && null != (o = n.source.id) && T(n.source.config) && Array.isArray(n.source.destinations)))
                    return void this.onError(Error(e6));
                if (!1 === r.source.enabled)
                    return void this.logger.error("The source is disabled. Please enable the source in the dashboard to send events.");
                i = r,
                tP.reporting.isErrorReportingEnabled.value = (s = i.source.config,
                s?.statsCollection?.errors?.enabled === !0 && !window.chrome?.runtime?.id),
                tP.reporting.isMetricsReportingEnabled.value = (a = i.source.config,
                a?.statsCollection?.metrics?.enabled === !0);
                let l = r.source.destinations.length > 0 ? r.source.destinations.map(e => {
                    let t, i;
                    return {
                        id: e.id,
                        displayName: e.destinationDefinition.displayName,
                        enabled: e.enabled,
                        config: e.config,
                        shouldApplyDeviceModeTransformation: e.shouldApplyDeviceModeTransformation ?? !1,
                        propagateEventsUntransformedOnError: e.propagateEventsUntransformedOnError ?? !1,
                        userFriendlyId: (t = e.destinationDefinition.displayName,
                        i = e.id,
                        `${t.replaceAll(" ", "-")}___${i}`),
                        isCustomIntegration: "Custom Device Mode" === e.destinationDefinition.displayName
                    }
                }
                ) : [];
                eP( () => {
                    var e;
                    let t, i;
                    tP.source.value = {
                        config: r.source.config,
                        name: r.source.name,
                        id: r.source.id,
                        workspaceId: r.source.workspaceId
                    },
                    tP.nativeDestinations.configuredDestinations.value = l,
                    tP.plugins.pluginsToLoadFromConfig.value = tP.loadOptions.value.plugins ?? [],
                    e = r,
                    i = tP.consents.resolutionStrategy.value,
                    T(e.consentManagementMetadata) && (tP.consents.provider.value && (i = e.consentManagementMetadata.providers.find(e => e.provider === tP.consents.provider.value)?.resolutionStrategy ?? tP.consents.resolutionStrategy.value),
                    t = e.consentManagementMetadata),
                    "custom" === tP.consents.provider.value && (i = void 0),
                    eP( () => {
                        tP.consents.metadata.value = h(t),
                        tP.consents.resolutionStrategy.value = i
                    }
                    ),
                    tP.lifecycle.status.value = "configured"
                }
                )
            }
            getConfig() {
                let e = tP.loadOptions.value.getSourceConfig;
                if (e) {
                    if (!b(e))
                        return void this.logger.error(`${F}:: The "getSourceConfig" load API option must be a function that returns valid source configuration data.`);
                    let t = e();
                    t instanceof Promise ? t.then(e => this.processConfig(e)).catch(e => {
                        this.onError(e, "SourceConfig")
                    }
                    ) : this.processConfig(t)
                } else
                    this.httpClient.getAsyncData({
                        url: tP.lifecycle.sourceConfigUrl.value,
                        options: {
                            headers: {
                                "Content-Type": void 0
                            }
                        },
                        callback: this.processConfig
                    })
            }
        }
        let iq = (e= () => document) => e()?.referrer || "$direct"
          , iW = (e= () => globalThis.location, t= () => document) => {
            let i = e()
              , r = ( (e= () => document) => {
                let t = e().getElementsByTagName("link")
                  , i = "";
                for (let e = 0; t[e]; e += 1) {
                    let r = t[e];
                    if ("canonical" === r.getAttribute("rel") && !i) {
                        i = r.getAttribute("href") ?? "";
                        break
                    }
                }
                return i
            }
            )(t)
              , n = i.pathname
              , {href: s} = i
              , a = s
              , {search: o} = i;
            if (r)
                try {
                    let e = new URL(r);
                    a = "" === e.search ? r + o : r,
                    n = e.pathname
                } catch (e) {}
            let l = (e => {
                let t = e;
                try {
                    let i = new URL(e);
                    t = i.origin + i.pathname + i.search
                } catch (e) {}
                return t
            }
            )(a)
              , {title: u} = t()
              , c = iq(t);
            return {
                path: n,
                referrer: c,
                referring_domain: i_(c),
                search: o,
                title: u,
                url: l,
                tab_url: s
            }
        }
          , iJ = {
            URL: () => !b(globalThis.URL) || !b(globalThis.URLSearchParams),
            Promise: () => !b(globalThis.Promise),
            "Number.isNaN": () => !b(globalThis.Number.isNaN),
            "Number.isInteger": () => !b(globalThis.Number.isInteger),
            "Array.from": () => !b(globalThis.Array.from),
            "Array.prototype.find": () => !b(globalThis.Array.prototype.find),
            "Array.prototype.includes": () => !b(globalThis.Array.prototype.includes),
            "String.prototype.endsWith": () => !b(globalThis.String.prototype.endsWith),
            "String.prototype.startsWith": () => !b(globalThis.String.prototype.startsWith),
            "String.prototype.includes": () => !b(globalThis.String.prototype.includes),
            "String.prototype.replaceAll": () => !b(globalThis.String.prototype.replaceAll),
            "String.fromCodePoint": () => !b(globalThis.String.fromCodePoint),
            "Object.entries": () => !b(globalThis.Object.entries),
            "Object.values": () => !b(globalThis.Object.values),
            "Object.assign": () => !b(globalThis.Object.assign),
            "Object.fromEntries": () => !b(globalThis.Object.fromEntries),
            "Element.prototype.dataset": () => !( () => {
                let e = globalThis.document.createElement("div");
                return e.setAttribute("data-a-b", "c"),
                !!e.dataset && "c" === e.dataset.aB
            }
            )(),
            TextEncoder: () => !b(globalThis.TextEncoder) || !b(globalThis.TextDecoder),
            requestAnimationFrame: () => !b(globalThis.requestAnimationFrame) || !b(globalThis.cancelAnimationFrame),
            CustomEvent: () => !b(globalThis.CustomEvent),
            "navigator.sendBeacon": () => !b(globalThis.navigator.sendBeacon),
            ArrayBuffer: () => !b(globalThis.Uint8Array),
            Set: () => !b(globalThis.Set),
            atob: () => !b(globalThis.atob)
        }
          , iX = `https://polyfill-fastly.io/v3/polyfill.min.js?version=3.111.0&features=${Object.keys(iJ).join("%2C")}`
          , iZ = "rudderstackPolyfill"
          , iY = () => !(e => null == e)(globalThis.navigator.userAgentData)
          , i0 = () => ({
            width: globalThis.screen.width,
            height: globalThis.screen.height,
            density: globalThis.devicePixelRatio,
            innerWidth: globalThis.innerWidth,
            innerHeight: globalThis.innerHeight
        });
        class i1 {
            constructor(e, t, i) {
                this.httpClient = e,
                this.errorHandler = t,
                this.logger = i,
                this.externalSrcLoader = new eA(this.logger),
                this.onError = this.onError.bind(this),
                this.onReady = this.onReady.bind(this)
            }
            init() {
                this.prepareBrowserCapabilities(),
                this.attachWindowListeners()
            }
            detectBrowserCapabilities() {
                eP( () => {
                    let e, t;
                    tP.capabilities.storage.isCookieStorageAvailable.value = iC(ia, iL(ia), this.logger),
                    tP.capabilities.storage.isLocalStorageAvailable.value = iC(io, void 0, this.logger),
                    tP.capabilities.storage.isSessionStorageAvailable.value = iC(il, void 0, this.logger),
                    tP.capabilities.isBeaconAvailable.value = null != (e = globalThis.navigator.sendBeacon) && b(globalThis.navigator.sendBeacon),
                    tP.capabilities.isUaCHAvailable.value = iY(),
                    tP.capabilities.isCryptoAvailable.value = null != (t = globalThis.crypto) && b(globalThis.crypto.getRandomValues),
                    tP.capabilities.isOnline.value = globalThis.navigator.onLine,
                    tP.context.userAgent.value = ( (e= () => globalThis.navigator) => {
                        let t = e();
                        if (void 0 === t)
                            return null;
                        let {userAgent: i} = t
                          , {brave: r} = t;
                        if (r && Object.getPrototypeOf(r).isBrave) {
                            let e = i.match(/(chrome)\/([\w.]+)/i);
                            e && (i = `${i} Brave/${e[2]}`)
                        }
                        return i
                    }
                    )(),
                    tP.context.locale.value = ( (e= () => globalThis.navigator) => {
                        let t = e();
                        return void 0 === t ? null : t.language ?? t.browserLanguage
                    }
                    )(),
                    tP.context.screen.value = i0(),
                    tP.context.timezone.value = ( () => {
                        let e = /([A-Z]+[+-]\d+)/.exec(new Date().toString());
                        return e?.[1] ? e[1] : "NA"
                    }
                    )(),
                    iY() && ( (e, t="none") => {
                        "none" === t && e(void 0),
                        "default" === t && e(navigator.userAgentData),
                        "full" === t && navigator.userAgentData?.getHighEntropyValues(["architecture", "bitness", "brands", "mobile", "model", "platform", "platformVersion", "uaFullVersion", "fullVersionList", "wow64"]).then(t => {
                            e(t)
                        }
                        ).catch( () => {
                            e()
                        }
                        )
                    }
                    )(e => {
                        tP.context["ua-ch"].value = e
                    }
                    , tP.loadOptions.value.uaChTrackLevel)
                }
                ),
                eW( () => {
                    !0 === tP.loadOptions.value.sendAdblockPage && void 0 !== tP.lifecycle.sourceConfigUrl.value && tJ(this.httpClient)
                }
                )
            }
            prepareBrowserCapabilities() {
                tP.capabilities.isLegacyDOM.value = ( () => {
                    let e = Object.keys(iJ)
                      , t = !1;
                    for (let i = 0; i < e.length; i++) {
                        let r = iJ[e[i]];
                        if (b(r) && r()) {
                            t = !0;
                            break
                        }
                    }
                    return t
                }
                )();
                let e = tP.loadOptions.value.polyfillURL
                  , t = iX;
                if (I(e))
                    if (iH(e))
                        t = e;
                    else
                        this.logger.warn(`${H}:: The provided polyfill URL "${e}" is invalid. The default polyfill URL will be used instead.`);
                if (tP.loadOptions.value.polyfillIfRequired && tP.capabilities.isLegacyDOM.value && iH(t)) {
                    let e = t !== tP.loadOptions.value.polyfillURL;
                    if (e) {
                        let e = `RS_polyfillCallback_${tP.lifecycle.writeKey.value}`
                          , i = () => {
                            this.onReady(),
                            delete globalThis[e]
                        }
                        ;
                        globalThis[e] = i,
                        t = `${t}&callback=${e}`
                    }
                    this.externalSrcLoader.loadJSFile({
                        url: t,
                        id: iZ,
                        async: !0,
                        timeout: 1e4,
                        callback: i => {
                            if (i)
                                e || this.onReady();
                            else {
                                let e;
                                this.onError(Error((e = t,
                                `Failed to load the polyfill script with ID "${iZ}" from URL ${e}.`)))
                            }
                        }
                    })
                } else
                    this.onReady()
            }
            attachWindowListeners() {
                globalThis.addEventListener("offline", () => {
                    tP.capabilities.isOnline.value = !1
                }
                ),
                globalThis.addEventListener("online", () => {
                    tP.capabilities.isOnline.value = !0
                }
                ),
                globalThis.addEventListener("resize", function(e, t, i=250) {
                    let r;
                    return (...n) => {
                        globalThis.clearTimeout(r),
                        r = globalThis.setTimeout( () => {
                            e.apply(t, n)
                        }
                        , i)
                    }
                }( () => {
                    tP.context.screen.value = i0()
                }
                , this))
            }
            onReady() {
                this.detectBrowserCapabilities(),
                tP.lifecycle.status.value = "browserCapabilitiesReady"
            }
            onError(e, t) {
                this.errorHandler.onError({
                    error: e,
                    context: H,
                    groupingHash: t
                })
            }
        }
        let i2 = ["integrations", "anonymousId", "originalTimestamp"]
          , i3 = ["library", "consentManagement", "userAgent", "ua-ch", "screen"]
          , i6 = ["id", "anonymous_id", "user_id", "sent_at", "timestamp", "received_at", "original_timestamp", "event", "event_text", "channel", "context_ip", "context_request_ip", "context_passed_ip", "group_id", "previous_id"]
          , i4 = e => "number" == typeof e && !Number.isNaN(e)
          , i8 = e => i4(e) && e >= 0 && Number.isInteger(e)
          , i5 = e => {
            let {cutOff: t} = e
              , i = Date.now();
            return !!(t?.enabled && t.expiresAt && i > t.expiresAt)
        }
          , i9 = e => !!(!e.expiresAt || Date.now() > e.expiresAt) || i5(e)
          , i7 = e => e === ia || e === io || e === il || e === iu
          , re = () => ei()
          , rt = (e, t, i) => {
            T(e) && Object.keys(e).forEach(e => {
                (i6.includes(e) || i6.includes(e.toLowerCase())) && i.warn(`${G}:: The "${e}" property defined under "${t}" is a reserved keyword. Please choose a different property name to avoid conflicts with reserved keywords (${i6}).`)
            }
            )
        }
          , ri = (e, t, i, r) => {
            let n = {
                channel: "web",
                context: {
                    traits: h(tP.session.userTraits.value),
                    sessionId: tP.session.sessionInfo.value.id || void 0,
                    sessionStart: tP.session.sessionInfo.value.sessionStart || void 0,
                    ...tP.consents.enabled.value && {
                        consentManagement: {
                            deniedConsentIds: h(tP.consents.data.value.deniedConsentIds),
                            allowedConsentIds: h(tP.consents.data.value.allowedConsentIds),
                            provider: tP.consents.provider.value,
                            resolutionStrategy: tP.consents.resolutionStrategy.value
                        }
                    },
                    "ua-ch": tP.context["ua-ch"].value,
                    app: tP.context.app.value,
                    library: tP.context.library.value,
                    userAgent: tP.context.userAgent.value,
                    os: tP.context.os.value,
                    locale: tP.context.locale.value,
                    screen: tP.context.screen.value,
                    campaign: (e => {
                        let t = {};
                        try {
                            let i = new URL(e)
                              , r = "utm_";
                            i.searchParams.forEach( (e, i) => {
                                if (i.startsWith(r)) {
                                    let n = i.substring(r.length);
                                    "campaign" === n && (n = "name"),
                                    t[n] = e
                                }
                            }
                            )
                        } catch (e) {}
                        return t
                    }
                    )(globalThis.location.href),
                    page: (e => {
                        let t = iW()
                          , i = {};
                        return Object.keys(t).forEach(r => {
                            i[r] = e?.[r] || t[r]
                        }
                        ),
                        i.initial_referrer = e?.initial_referrer || tP.session.initialReferrer.value,
                        i.initial_referring_domain = e?.initial_referring_domain || tP.session.initialReferringDomain.value,
                        i
                    }
                    )(i),
                    timezone: tP.context.timezone.value,
                    ...tP.autoTrack.enabled.value && {
                        autoTrack: {
                            ...tP.autoTrack.pageLifecycle.enabled.value && {
                                page: {
                                    pageViewId: tP.autoTrack.pageLifecycle.pageViewId.value
                                }
                            }
                        }
                    }
                },
                originalTimestamp: er(new Date),
                messageId: ei(),
                userId: e.userId || tP.session.userId.value
            };
            i7(tP.storage.entries.value.anonymousId?.type) ? n.anonymousId = tP.session.anonymousId.value : n.anonymousId = re(),
            tP.storage.trulyAnonymousTracking.value && (n.context.trulyAnonymousTracking = !0),
            "identify" === e.type && (n.context.traits = tP.storage.entries.value.userTraits?.type !== ic ? h(tP.session.userTraits.value) : e.context.traits),
            "group" === e.type && ((e.groupId || tP.session.groupId.value) && (n.groupId = e.groupId || tP.session.groupId.value),
            (e.traits || tP.session.groupTraits.value) && (n.traits = tP.storage.entries.value.groupTraits?.type !== ic ? h(tP.session.groupTraits.value) : e.traits));
            let s = w(e, n);
            return void 0 === s.event && (s.event = null),
            void 0 === s.properties && (s.properties = null),
            ( (e, t, i) => {
                T(t) && (( (e, t) => {
                    t.anonymousId && "string" == typeof t.anonymousId && (e.anonymousId = t.anonymousId),
                    C(t.integrations) && (e.integrations = t.integrations),
                    t.originalTimestamp && "string" == typeof t.originalTimestamp && (e.originalTimestamp = t.originalTimestamp)
                }
                )(e, t),
                e.context = ( (e, t, i) => {
                    let r = e;
                    return Object.keys(t).forEach(e => {
                        if (!i2.includes(e) && !i3.includes(e))
                            if ("context" !== e)
                                r = w(r, {
                                    [e]: t[e]
                                });
                            else if (void 0 !== t[e] && T(t[e])) {
                                let i = {};
                                Object.keys(t[e]).forEach(r => {
                                    i3.includes(r) || (i[r] = t[e][r])
                                }
                                ),
                                r = w(r, {
                                    ...i
                                })
                            } else
                                i.warn(`${G}:: Please make sure that the "context" property in the event API's "options" argument is a valid object literal with key-value pairs.`)
                    }
                    ),
                    r
                }
                )(e.context, t, i))
            }
            )(s, t, r),
            ( (e, t) => {
                let {properties: i, traits: r, context: n} = e
                  , {traits: s} = n;
                rt(i, "properties", t),
                rt(r, "traits", t),
                rt(s, "context.traits", t)
            }
            )(s, r),
            s.integrations = (e => h(tP.loadOptions.value.useGlobalIntegrationsConfigInEvents ? tP.consents.postConsent.value.integrations ?? tP.nativeDestinations.loadOnlyIntegrations.value : e || e7))(s.integrations),
            s
        }
        ;
        class rr {
            constructor(e) {
                this.logger = e
            }
            generatePageEvent(e, t, i, r) {
                let n = i ?? {};
                return ri({
                    properties: n = ( (e, t) => {
                        let i = t?.page || {}
                          , r = iW();
                        return Object.keys(r).forEach(t => {
                            void 0 === e[t] && (e[t] = i[t] || r[t])
                        }
                        ),
                        void 0 === e.initial_referrer && (e.initial_referrer = i.initial_referrer || tP.session.initialReferrer.value),
                        void 0 === e.initial_referring_domain && (e.initial_referring_domain = i.initial_referring_domain || tP.session.initialReferringDomain.value),
                        e
                    }
                    )(n, r),
                    name: t,
                    category: e,
                    type: "page"
                }, r, n, this.logger)
            }
            generateTrackEvent(e, t, i) {
                return ri({
                    properties: t,
                    event: e,
                    type: "track"
                }, i, void 0, this.logger)
            }
            generateIdentifyEvent(e, t, i) {
                return ri({
                    userId: e,
                    type: "identify",
                    context: {
                        traits: t
                    }
                }, i, void 0, this.logger)
            }
            generateAliasEvent(e, t, i) {
                let r = ri({
                    previousId: t,
                    type: "alias"
                }, i, void 0, this.logger);
                return r.userId = e ?? r.userId,
                r
            }
            generateGroupEvent(e, t, i) {
                let r = {
                    type: "group"
                };
                return e && (r.groupId = e),
                t && (r.traits = t),
                ri(r, i, void 0, this.logger)
            }
            create(e) {
                let t;
                switch (e.type) {
                case "page":
                    t = this.generatePageEvent(e.category, e.name, e.properties, e.options);
                    break;
                case "track":
                    t = this.generateTrackEvent(e.name, e.properties, e.options);
                    break;
                case "identify":
                    t = this.generateIdentifyEvent(e.userId, e.traits, e.options);
                    break;
                case "alias":
                    t = this.generateAliasEvent(e.to, e.from, e.options);
                    break;
                default:
                    t = this.generateGroupEvent(e.groupId, e.traits, e.options)
                }
                return t
            }
        }
        class rn {
            constructor(e, t, i, r) {
                this.eventRepository = e,
                this.userSessionManager = t,
                this.errorHandler = i,
                this.logger = r,
                this.eventFactory = new rr(this.logger)
            }
            init() {
                this.eventRepository.init()
            }
            resume() {
                this.eventRepository.resume()
            }
            addEvent(e) {
                this.userSessionManager.refreshSession();
                let t = this.eventFactory.create(e);
                this.eventRepository.enqueue(t, e.callback)
            }
        }
        class rs {
            constructor(e, t, i, r, n) {
                this.storeManager = t,
                this.pluginsManager = e,
                this.logger = n,
                this.errorHandler = r,
                this.httpClient = i,
                this.onError = this.onError.bind(this),
                this.serverSideCookieDebounceFuncs = {},
                this.serverSideCookiesRequestInProgress = {}
            }
            init() {
                this.syncStorageDataToState(),
                this.registerEffects()
            }
            syncStorageDataToState() {
                let e;
                this.migrateStorageIfNeeded(),
                this.migrateDataFromPreviousStorage(),
                this.setUserId(this.getUserId()),
                this.setUserTraits(this.getUserTraits()),
                this.setGroupId(this.getGroupId()),
                this.setGroupTraits(this.getGroupTraits());
                let {externalAnonymousIdCookieName: t, anonymousIdOptions: i} = tP.loadOptions.value;
                I(t) && "string" == typeof t && (e = this.getExternalAnonymousIdByCookieName(t)),
                this.setAnonymousId(e ?? this.getAnonymousId(i)),
                this.setAuthToken(this.getAuthToken()),
                this.setInitialReferrerInfo(),
                this.configureSessionTracking()
            }
            configureSessionTracking() {
                let e;
                if (this.isPersistenceEnabledForStorageEntry("sessionInfo")) {
                    let t = this.getConfiguredSessionTrackingInfo()
                      , i = this.getSessionInfo() ?? tg.sessionInfo;
                    (e = {
                        autoTrack: t.autoTrack && !0 !== i.manualTrack,
                        timeout: t.timeout,
                        manualTrack: i.manualTrack,
                        expiresAt: i.expiresAt,
                        id: i.id,
                        sessionStart: i.sessionStart
                    }).autoTrack || !0 === e.manualTrack ? t.cutOff?.enabled === !0 && (e.cutOff = {
                        enabled: !0,
                        duration: t.cutOff.duration,
                        expiresAt: i.cutOff?.expiresAt
                    }) : e = tg.sessionInfo
                } else
                    e = tg.sessionInfo;
                tP.session.sessionInfo.value = e,
                tP.session.sessionInfo.value.autoTrack && this.startOrRenewAutoTracking(tP.session.sessionInfo.value)
            }
            setInitialReferrerInfo() {
                let e = this.getInitialReferrer()
                  , t = this.getInitialReferringDomain();
                if (e && t)
                    this.setInitialReferrer(e),
                    this.setInitialReferringDomain(t);
                else {
                    let t = e || iq();
                    this.setInitialReferrer(t),
                    this.setInitialReferringDomain(i_(t))
                }
            }
            isPersistenceEnabledForStorageEntry(e) {
                return i7(tP.storage.entries.value[e]?.type)
            }
            migrateDataFromPreviousStorage() {
                let e = tP.storage.entries.value
                  , t = [ia, io, il];
                Object.keys(e).forEach(i => {
                    let r = e[i]?.type
                      , n = this.storeManager?.getStore(iy[r]);
                    n && t.forEach(e => {
                        let t = this.storeManager?.getStore(iy[e]);
                        if (t && e !== r) {
                            let e = t.get(id[i]);
                            I(e) && "" !== e && n.set(id[i], e),
                            t.remove(id[i])
                        }
                    }
                    )
                }
                )
            }
            migrateStorageIfNeeded(e, t) {
                if (!tP.storage.migrate.value)
                    return;
                let i = e ?? [];
                0 === i.length && [ig, ih, ip].forEach(e => {
                    let t = this.storeManager?.getStore(e);
                    t && i.push(t)
                }
                ),
                (t ?? Object.keys(id)).forEach(e => {
                    let t = id[e];
                    i.forEach(e => {
                        let i = this.pluginsManager?.invokeSingle("storage.migrate", t, e.engine, this.errorHandler, this.logger);
                        null == i || e.set(t, i)
                    }
                    )
                }
                )
            }
            getConfiguredSessionTrackingInfo() {
                let e, t, i = !1 !== tP.loadOptions.value.sessions.autoTrack;
                if (!i)
                    return {
                        autoTrack: i
                    };
                let r = tP.loadOptions.value.sessions?.timeout;
                if (i8(r))
                    t = r;
                else
                    this.logger.warn(`${V}:: The session timeout value "${r}" is not a number. The default timeout of 1800000 ms will be used instead.`),
                    t = 18e5;
                0 === t && (this.logger.warn(`${V}:: The session timeout value is 0, which disables the automatic session tracking feature. If you want to enable session tracking, please provide a positive integer value for the timeout.`),
                i = !1);
                t > 0 && t < 1e4 && this.logger.warn((e = t,
                `${V}:: The session timeout value ${e} ms is less than the recommended minimum of 10000 ms. Please consider increasing the timeout value to ensure optimal performance and reliability.`));
                let n = this.getCutOffInfo(t);
                return {
                    timeout: t,
                    autoTrack: i,
                    cutOff: n
                }
            }
            getCutOffInfo(e) {
                let t, i = tP.loadOptions.value.sessions.cutOff, r = !1;
                if (!0 === i.enabled)
                    if (t = i.duration,
                    r = !0,
                    i8(t)) {
                        if (t < e) {
                            let i;
                            this.logger.warn((i = t,
                            `${V}:: The session cut off duration value "${i}" ms is less than the session timeout value "${e}" ms. The cut off functionality will be disabled.`)),
                            r = !1
                        }
                    } else {
                        let e;
                        this.logger.warn((e = t,
                        `${V}:: The session cut off duration value "${e}" is not a number. The default cut off duration of 43200000 ms will be used instead.`)),
                        t = 432e5
                    }
                return {
                    enabled: r,
                    duration: t
                }
            }
            onError(e, t, i) {
                this.errorHandler.onError({
                    error: e,
                    context: V,
                    customMessage: t,
                    groupingHash: i
                })
            }
            getEncryptedCookieData(e, t) {
                let i = [];
                return e.forEach(e => {
                    let r = t?.encrypt(ea(e.value, !1, [], this.logger));
                    I(r) && i.push({
                        name: e.name,
                        value: r
                    })
                }
                ),
                i
            }
            makeRequestToSetCookie(e, t) {
                this.httpClient?.getAsyncData({
                    url: tP.serverCookies.dataServiceUrl.value,
                    options: {
                        method: "POST",
                        data: ea({
                            reqType: "setCookies",
                            workspaceId: tP.source.value?.workspaceId,
                            data: {
                                options: {
                                    maxAge: tP.storage.cookie.value?.maxage,
                                    path: tP.storage.cookie.value?.path,
                                    domain: tP.storage.cookie.value?.domain,
                                    sameSite: tP.storage.cookie.value?.samesite,
                                    secure: tP.storage.cookie.value?.secure,
                                    expires: tP.storage.cookie.value?.expires
                                },
                                cookies: e
                            }
                        }),
                        sendRawData: !0,
                        withCredentials: !0
                    },
                    isRawResponse: !0,
                    callback: t
                })
            }
            setServerSideCookies(e, t, i) {
                let r = Object.keys(e)
                  , n = () => r.map(t => ({
                    name: e[t].name,
                    value: tP.session[t].value
                }))
                  , s = {};
                r.forEach(t => {
                    s[e[t].name] = i?.get(e[t].name)
                }
                );
                let a = () => {
                    r.forEach(e => {
                        this.serverSideCookiesRequestInProgress[e] = !1
                    }
                    )
                }
                  , o = () => {
                    n().forEach(e => {
                        t && t(e.name, e.value)
                    }
                    )
                }
                ;
                try {
                    let l = {};
                    r.forEach(t => {
                        l[e[t].name] = tP.session[t].value
                    }
                    );
                    let u = this.getEncryptedCookieData(n(), i);
                    u.length > 0 ? this.makeRequestToSetCookie(u, (e, r) => {
                        if (a(),
                        r?.xhr?.status === 200)
                            n().forEach(e => {
                                let r = s[e.name]
                                  , n = i?.get(e.name);
                                if (ea(l[e.name], !1, []) !== ea(n, !1, [])) {
                                    let i;
                                    null === r && null === n && this.logger.error((i = e.name,
                                    `The server failed to set the ${i} cookie. As a fallback, the cookies will be set client side.`)),
                                    t && t(e.name, e.value)
                                }
                            }
                            );
                        else {
                            let e;
                            this.logger.error((e = r?.xhr?.status,
                            `The server responded with status ${e} while setting the cookies. As a fallback, the cookies will be set client side.`)),
                            o()
                        }
                    }
                    ) : (o(),
                    a())
                } catch (e) {
                    this.onError(e, e9, e9),
                    o(),
                    a()
                }
            }
            syncValueToStorage(e) {
                let t = tP.storage.entries.value
                  , i = t[e]?.type;
                if (i7(i)) {
                    let r = this.storeManager.getStore(iy[i])
                      , n = t[e]?.key
                      , s = tP.session[e].value;
                    s && ("string" == typeof s || C(s)) ? tP.serverCookies.isEnabledServerSideCookies.value && i === ia ? (this.serverSideCookiesRequestInProgress[e] = !0,
                    this.serverSideCookieDebounceFuncs[e] && globalThis.clearTimeout(this.serverSideCookieDebounceFuncs[e]),
                    this.serverSideCookieDebounceFuncs[e] = globalThis.setTimeout( () => {
                        this.setServerSideCookies({
                            [e]: {
                                name: n
                            }
                        }, (e, t) => {
                            r?.set(e, t)
                        }
                        , r)
                    }
                    , 10)) : r?.set(n, s) : r?.remove(n)
                }
            }
            registerEffects() {
                iv.forEach(e => {
                    eW( () => {
                        this.syncValueToStorage(e)
                    }
                    )
                }
                )
            }
            setAnonymousId(e, t) {
                let i = e;
                "string" == typeof e && i || (i = void 0),
                this.isPersistenceEnabledForStorageEntry("anonymousId") ? (!i && t && (i = this.pluginsManager?.invokeSingle("userSession.anonymousIdGoogleLinker", t)),
                i = i || re()) : i = tg.anonymousId,
                tP.session.anonymousId.value = i
            }
            getAnonymousId(e) {
                if (i7(tP.storage.entries.value.anonymousId?.type)) {
                    let t = tP.session.anonymousId.value;
                    t && t !== tg.anonymousId || (t = this.getEntryValue("anonymousId")),
                    !t && e && (t = this.pluginsManager?.invokeSingle("storage.getAnonymousId", iL, e)),
                    tP.session.anonymousId.value = t || re()
                }
                return tP.session.anonymousId.value
            }
            getEntryValue(e) {
                let t = tP.storage.entries.value
                  , i = t[e]?.type;
                if (i7(i)) {
                    let r = this.storeManager?.getStore(iy[i]);
                    this.migrateStorageIfNeeded([r], [e]);
                    let n = t[e]?.key;
                    return r?.get(n) ?? null
                }
                return null
            }
            getExternalAnonymousIdByCookieName(e) {
                let t = iL(ia);
                return t?.isEnabled ? t.getItem(e) ?? null : null
            }
            getUserSessionValue(e) {
                return this.serverSideCookiesRequestInProgress[e] ? tP.session[e].value : this.getEntryValue(e)
            }
            getUserId() {
                return this.getUserSessionValue("userId")
            }
            getUserTraits() {
                return this.getUserSessionValue("userTraits")
            }
            getGroupId() {
                return this.getUserSessionValue("groupId")
            }
            getGroupTraits() {
                return this.getUserSessionValue("groupTraits")
            }
            getInitialReferrer() {
                return this.getUserSessionValue("initialReferrer")
            }
            getInitialReferringDomain() {
                return this.getUserSessionValue("initialReferringDomain")
            }
            getSessionInfo() {
                return this.getUserSessionValue("sessionInfo")
            }
            getAuthToken() {
                return this.getUserSessionValue("authToken")
            }
            getSessionId() {
                let e = this.getSessionInfo() ?? tg.sessionInfo;
                return e.autoTrack && !i9(e) || e.manualTrack ? e.id ?? null : null
            }
            refreshSession() {
                let e = this.getSessionInfo() ?? tg.sessionInfo;
                (e.autoTrack || e.manualTrack) && (e.autoTrack && (this.startOrRenewAutoTracking(e),
                e = tP.session.sessionInfo.value),
                void 0 === e.sessionStart ? e = {
                    ...e,
                    sessionStart: !0
                } : e.sessionStart && (e = {
                    ...e,
                    sessionStart: !1
                })),
                tP.session.sessionInfo.value = e,
                "readyExecuted" !== tP.lifecycle.status.value && this.syncValueToStorage("sessionInfo")
            }
            resetAndStartNewSession() {
                let e = tP.session
                  , {manualTrack: t, autoTrack: i, timeout: r, cutOff: n} = e.sessionInfo.value;
                if (i) {
                    let t = {
                        ...tg.sessionInfo,
                        timeout: r
                    };
                    n && (t.cutOff = {
                        enabled: n.enabled,
                        duration: n.duration
                    }),
                    e.sessionInfo.value = t,
                    this.startOrRenewAutoTracking(e.sessionInfo.value)
                } else
                    t && this.startManualTrackingInternal()
            }
            reset(e) {
                let {session: t} = tP
                  , i = (e => {
                    if ("boolean" == typeof e) {
                        let {entries: t, ...i} = th;
                        return {
                            ...i,
                            entries: {
                                ...t,
                                anonymousId: e
                            }
                        }
                    }
                    return T(e) && T(e.entries) ? w(th, e) : {
                        ...th
                    }
                }
                )(e);
                eP( () => {
                    Object.keys(tg).forEach(e => {
                        if (!0 === i.entries[e])
                            switch (e) {
                            case "anonymousId":
                                this.setAnonymousId();
                                break;
                            case "sessionInfo":
                                this.resetAndStartNewSession();
                                break;
                            default:
                                t[e].value = tg[e]
                            }
                    }
                    )
                }
                )
            }
            setUserId(e) {
                tP.session.userId.value = this.isPersistenceEnabledForStorageEntry("userId") && e ? e : tg.userId
            }
            setUserTraits(e) {
                tP.session.userTraits.value = this.isPersistenceEnabledForStorageEntry("userTraits") && T(e) ? w(tP.session.userTraits.value ?? tg.userTraits, e) : tg.userTraits
            }
            setGroupId(e) {
                tP.session.groupId.value = this.isPersistenceEnabledForStorageEntry("groupId") && e ? e : tg.groupId
            }
            setGroupTraits(e) {
                tP.session.groupTraits.value = this.isPersistenceEnabledForStorageEntry("groupTraits") && T(e) ? w(tP.session.groupTraits.value ?? tg.groupTraits, e) : tg.groupTraits
            }
            setInitialReferrer(e) {
                tP.session.initialReferrer.value = this.isPersistenceEnabledForStorageEntry("initialReferrer") && e ? e : tg.initialReferrer
            }
            setInitialReferringDomain(e) {
                tP.session.initialReferringDomain.value = this.isPersistenceEnabledForStorageEntry("initialReferringDomain") && e ? e : tg.initialReferringDomain
            }
            startOrRenewAutoTracking(e) {
                let t = e;
                if (i9(e))
                    t = (e => {
                        let {timeout: t, cutOff: i} = e
                          , r = Date.now();
                        return {
                            id: r,
                            expiresAt: r + t,
                            timeout: t,
                            autoTrack: !0,
                            ...i && {
                                cutOff: i
                            }
                        }
                    }
                    )(e);
                else {
                    let i = Date.now()
                      , r = e.timeout;
                    t.expiresAt = i + r
                }
                if (i5(t) && (t.cutOff.expiresAt = void 0),
                t.cutOff) {
                    let e = (e => {
                        if (e?.enabled)
                            return e.expiresAt ?? (i8(e.duration) ? Date.now() + e.duration : void 0)
                    }
                    )(t.cutOff);
                    t.cutOff.expiresAt = e
                }
                tP.session.sessionInfo.value = t
            }
            start(e) {
                tP.session.sessionInfo.value = {
                    id: ( (e, t) => {
                        if (!e || !i8(e) || !(e.toString().length >= 10))
                            return t.warn(`${V}:: The provided session ID (${e}) is either invalid, not a positive integer, or not at least "10" digits long. A new session ID will be auto-generated instead.`),
                            !1;
                        return !0
                    }
                    )(e, this.logger) ? e : Date.now(),
                    sessionStart: void 0,
                    manualTrack: !0
                }
            }
            startManualTrackingInternal() {
                this.start(Date.now())
            }
            end() {
                tP.session.sessionInfo.value = tg.sessionInfo
            }
            setAuthToken(e) {
                tP.session.authToken.value = this.isPersistenceEnabledForStorageEntry("authToken") && e ? e : tg.authToken
            }
        }
        let ra = ["BeaconQueue", "CustomConsentManager", "DeviceModeDestinations", "DeviceModeTransformation", "ExternalAnonymousId", "GoogleLinker", "IubendaConsentManager", "KetchConsentManager", "NativeDestinationQueue", "OneTrustConsentManager", "StorageEncryption", "StorageEncryptionLegacy", "StorageMigrator", "XhrQueue"]
          , ro = "dataplaneEventsQueue"
          , rl = "destinationsEventsQueue"
          , ru = (e, t, i, r) => {
            if (k(e))
                if (b(e))
                    try {
                        e(...t)
                    } catch (e) {
                        r.error(`${i}:: The callback threw an exception`, e)
                    }
                else
                    r.error(e5(i))
        }
        ;
        class rc {
            constructor(e, t, i, r, n) {
                this.pluginsManager = e,
                this.errorHandler = r,
                this.httpClient = i,
                this.logger = n,
                this.storeManager = t
            }
            init() {
                let e;
                this.dataplaneEventsQueue = this.pluginsManager.invokeSingle(`${ro}.init`, tP, this.httpClient, this.storeManager, this.errorHandler, this.logger),
                this.dmtEventsQueue = this.pluginsManager.invokeSingle("transformEvent.init", tP, this.pluginsManager, this.httpClient, this.storeManager, this.errorHandler, this.logger),
                this.destinationsEventsQueue = this.pluginsManager.invokeSingle(`${rl}.init`, tP, this.pluginsManager, this.storeManager, this.dmtEventsQueue, this.errorHandler, this.logger),
                eW( () => {
                    !0 === tP.nativeDestinations.clientDestinationsReady.value && (this.destinationsEventsQueue?.start(),
                    this.dmtEventsQueue?.start())
                }
                );
                let t = tP.consents.preConsent.value.enabled && tP.consents.preConsent.value.events?.delivery === "buffer";
                eW( () => {
                    let i = !0 === tP.loadOptions.value.bufferDataPlaneEventsUntilReady && !1 === tP.nativeDestinations.clientDestinationsReady.value;
                    !1 !== tP.nativeDestinations.activeDestinations.value.some(e => "hybrid" === e.config.connectionMode || !0 === e.config.useNativeSDKToSend) && !1 !== i || t || this.dataplaneEventsQueue?.scheduleTimeoutActive === !0 || (globalThis.clearTimeout(e),
                    this.dataplaneEventsQueue?.start())
                }
                ),
                !0 === tP.loadOptions.value.bufferDataPlaneEventsUntilReady && (e = globalThis.setTimeout( () => {
                    this.dataplaneEventsQueue?.scheduleTimeoutActive !== !0 && this.dataplaneEventsQueue?.start()
                }
                , tP.loadOptions.value.dataPlaneEventsBufferTimeout))
            }
            resume() {
                this.dataplaneEventsQueue?.scheduleTimeoutActive !== !0 && (tP.consents.postConsent.value.discardPreConsentEvents && (this.dataplaneEventsQueue?.clear(),
                this.destinationsEventsQueue?.clear()),
                this.dataplaneEventsQueue?.start())
            }
            enqueue(e, t) {
                let i = ( (e, t) => {
                    let i, r, n = h(e), s = t.nativeDestinations.integrationsConfig.value, a = (i = e.integrations,
                    r = s,
                    Object.keys(i).filter(e => !0 !== i[e] || !r[e]).reduce( (e, t) => {
                        let r = h(e);
                        return r[t] = i[t],
                        r
                    }
                    , {}));
                    return n.integrations = w(s, a),
                    n
                }
                )(e, tP);
                this.pluginsManager.invokeSingle(`${ro}.enqueue`, tP, this.dataplaneEventsQueue, i, this.errorHandler, this.logger);
                let r = h(e);
                this.pluginsManager.invokeSingle(`${rl}.enqueue`, tP, this.destinationsEventsQueue, r, this.errorHandler, this.logger),
                ru(t, [i], `${e.type.charAt(0).toUpperCase()}${e.type.slice(1)}API`, this.logger)
            }
        }
        let rd = e => {
            let t = new CustomEvent(e,{
                detail: {
                    analyticsInstance: globalThis.rudderanalytics
                },
                bubbles: !0,
                cancelable: !0,
                composed: !0
            });
            globalThis.document.dispatchEvent(t)
        }
        ;
        class rg {
            constructor() {
                this.preloadBuffer = new eJ,
                this.initialized = !1,
                this.errorHandler = t0,
                this.logger = e0,
                this.externalSrcLoader = new eA(this.logger),
                this.httpClient = tz,
                this.httpClient.init(this.errorHandler),
                this.capabilitiesManager = new i1(this.httpClient,this.errorHandler,this.logger)
            }
            load(e, t, i={}) {
                if (!tP.lifecycle.status.value) {
                    let r;
                    if (!("string" == typeof (r = e) && r.trim().length > 0))
                        return void this.logger.error(`${W}:: The write key "${e}" is invalid. It must be a non-empty string. Please check that the write key is correct and try again.`);
                    if (!iH(t))
                        return void this.logger.error(`${W}:: The data plane URL "${t}" is invalid. It must be a valid URL string. Please check that the data plane URL is correct and try again.`);
                    eP( () => {
                        tP.lifecycle.writeKey.value = h(e),
                        tP.lifecycle.dataPlaneUrl.value = h(t),
                        tP.loadOptions.value = ( (e, t) => {
                            let i = h(t);
                            return "string" != typeof i.setCookieDomain && (i.setCookieDomain = void 0),
                            ["Strict", "Lax", "None"].includes(i.sameSiteCookie) || (i.sameSiteCookie = void 0),
                            i.secureCookie = R(i.secureCookie, e.secureCookie),
                            i.sameDomainCookiesOnly = R(i.sameDomainCookiesOnly, e.sameDomainCookiesOnly),
                            ["none", "default", "full"].includes(i.uaChTrackLevel) || (i.uaChTrackLevel = void 0),
                            i.integrations = O(i.integrations),
                            Array.isArray(i.plugins) || (i.plugins = ra),
                            i.useGlobalIntegrationsConfigInEvents = R(i.useGlobalIntegrationsConfigInEvents, e.useGlobalIntegrationsConfigInEvents),
                            i.bufferDataPlaneEventsUntilReady = R(i.bufferDataPlaneEventsUntilReady, e.bufferDataPlaneEventsUntilReady),
                            i.sendAdblockPage = R(i.sendAdblockPage, e.sendAdblockPage),
                            i.useServerSideCookies = R(i.useServerSideCookies, e.useServerSideCookies),
                            "string" != typeof i.dataServiceEndpoint && (i.dataServiceEndpoint = void 0),
                            i.sendAdblockPageOptions = O(i.sendAdblockPageOptions),
                            i.loadIntegration = R(i.loadIntegration, e.loadIntegration),
                            C(i.storage) ? (i.storage.migrate = R(i.storage.migrate, e.storage?.migrate),
                            i.storage.cookie = O(i.storage.cookie),
                            i.storage.encryption = O(i.storage.encryption),
                            i.storage = D(i.storage)) : i.storage = void 0,
                            i.destinationsQueueOptions = O(i.destinationsQueueOptions),
                            i.queueOptions = O(i.queueOptions),
                            i.lockIntegrationsVersion = R(i.lockIntegrationsVersion, e.lockIntegrationsVersion),
                            i.lockPluginsVersion = R(i.lockPluginsVersion, e.lockPluginsVersion),
                            i4(i.dataPlaneEventsBufferTimeout) || (i.dataPlaneEventsBufferTimeout = void 0),
                            i.beaconQueueOptions = O(i.beaconQueueOptions),
                            i.preConsent = O(i.preConsent),
                            i.sourceConfigurationOverride = O(i.sourceConfigurationOverride),
                            w(e, D(i))
                        }
                        )(tP.loadOptions.value, i),
                        tP.lifecycle.status.value = "mounted"
                    }
                    ),
                    this.logger.setMinLogLevel(tP.loadOptions.value.logLevel ?? eZ),
                    eI("state", tP, e),
                    this.startLifecycle()
                }
            }
            startLifecycle() {
                eW( () => {
                    try {
                        switch (tP.lifecycle.status.value) {
                        case "mounted":
                            this.onMounted();
                            break;
                        case "browserCapabilitiesReady":
                            this.onBrowserCapabilitiesReady();
                            break;
                        case "configured":
                            this.onConfigured();
                            break;
                        case "pluginsLoading":
                        case "destinationsLoading":
                            break;
                        case "pluginsReady":
                            this.onPluginsReady();
                            break;
                        case "initialized":
                            this.onInitialized();
                            break;
                        case "loaded":
                            this.onLoaded();
                            break;
                        case "destinationsReady":
                            this.onDestinationsReady();
                            break;
                        case "ready":
                            this.onReady()
                        }
                    } catch (t) {
                        let e = "Failed to load the SDK";
                        this.errorHandler.onError({
                            error: t,
                            context: W,
                            customMessage: e,
                            groupingHash: e
                        })
                    }
                }
                )
            }
            onBrowserCapabilitiesReady() {
                let e = eS(ev) || [];
                ( (e=[]) => {
                    let t = "ajs_trait_"
                      , i = "ajs_prop_"
                      , r = new URLSearchParams(globalThis.location.search);
                    r.get(em) && e.unshift(["track", r.get(em), eE(r, i)]);
                    let n = r.get("ajs_uid")
                      , s = eE(r, t);
                    if (n || C(s)) {
                        let t = [...n ? [n] : [], s];
                        e.unshift(["identify", ...t])
                    }
                    r.get(ey) && e.unshift(["setAnonymousId", r.get(ey)])
                }
                )(e),
                e.length > 0 && (this.enqueuePreloadBufferEvents(e),
                eI(ev, [])),
                this.prepareInternalServices(),
                this.loadConfig()
            }
            onLoaded() {
                this.processBufferedEvents(),
                !0 === tP.consents.preConsent.value.enabled ? tP.lifecycle.status.value = "ready" : this.loadDestinations()
            }
            onMounted() {
                this.capabilitiesManager.init()
            }
            enqueuePreloadBufferEvents(e) {
                Array.isArray(e) && e.forEach(e => this.preloadBuffer.enqueue(h(e)))
            }
            processDataInPreloadBuffer() {
                for (; this.preloadBuffer.size() > 0; ) {
                    let e = this.preloadBuffer.dequeue();
                    e && eT([...e], this)
                }
            }
            prepareInternalServices() {
                this.pluginsManager = new is(t2,this.errorHandler,this.logger),
                this.storeManager = new iB(this.pluginsManager,this.errorHandler,this.logger),
                this.configManager = new iz(this.httpClient,this.errorHandler,this.logger),
                this.userSessionManager = new rs(this.pluginsManager,this.storeManager,this.httpClient,this.errorHandler,this.logger),
                this.eventRepository = new rc(this.pluginsManager,this.storeManager,this.httpClient,this.errorHandler,this.logger),
                this.eventManager = new rn(this.eventRepository,this.userSessionManager,this.errorHandler,this.logger)
            }
            loadConfig() {
                tP.lifecycle.writeKey.value && this.httpClient.setAuthHeader(tP.lifecycle.writeKey.value),
                this.configManager?.init()
            }
            onPluginsReady() {
                this.storeManager?.init(),
                this.userSessionManager?.init(),
                tP.consents.enabled.value && !tP.consents.initialized.value && (this.pluginsManager?.invokeSingle("consentManager.init", tP, this.logger),
                !1 === tP.consents.preConsent.value.enabled && this.pluginsManager?.invokeSingle("consentManager.updateConsentsInfo", tP, this.storeManager, this.logger)),
                this.eventManager?.init(),
                tP.lifecycle.status.value = "initialized"
            }
            onConfigured() {
                this.pluginsManager?.init()
            }
            onInitialized() {
                this.processDataInPreloadBuffer(),
                eP( () => {
                    tP.lifecycle.loaded.value = !0,
                    tP.lifecycle.status.value = "loaded"
                }
                ),
                this.initialized = !0,
                ru(tP.loadOptions.value.onLoaded, [globalThis.rudderanalytics], "LoadAPI", this.logger),
                rd("RSA_Initialised")
            }
            onReady() {
                tP.lifecycle.status.value = "readyExecuted",
                tP.eventBuffer.readyCallbacksArray.value.forEach(e => {
                    ru(e, [], q, this.logger)
                }
                ),
                rd("RSA_Ready")
            }
            processBufferedEvents() {
                let e = tP.eventBuffer.toBeProcessedArray.value;
                for (; e.length > 0; ) {
                    let t = e.shift();
                    if (tP.eventBuffer.toBeProcessedArray.value = e,
                    t) {
                        let e = t[0];
                        b(this[e]) && this[e](...t.slice(1), !0)
                    }
                    e = tP.eventBuffer.toBeProcessedArray.value
                }
            }
            loadDestinations() {
                if ("destinationsLoading" === tP.lifecycle.status.value || !0 === tP.nativeDestinations.clientDestinationsReady.value)
                    return;
                this.pluginsManager?.invokeSingle("nativeDestinations.setActiveDestinations", tP, this.pluginsManager, this.errorHandler, this.logger);
                let e = tP.nativeDestinations.activeDestinations.value.length;
                if (0 === e)
                    return void eP( () => {
                        tP.nativeDestinations.clientDestinationsReady.value = !0,
                        tP.lifecycle.status.value = "destinationsReady"
                    }
                    );
                tP.lifecycle.status.value = "destinationsLoading",
                this.pluginsManager?.invokeSingle("nativeDestinations.load", tP, this.externalSrcLoader, this.errorHandler, this.logger),
                eW( () => {
                    tP.nativeDestinations.initializedDestinations.value.length + tP.nativeDestinations.failedDestinations.value.length === e && eP( () => {
                        tP.lifecycle.status.value = "destinationsReady",
                        tP.nativeDestinations.clientDestinationsReady.value = !0
                    }
                    )
                }
                )
            }
            onDestinationsReady() {
                "ready" !== tP.lifecycle.status.value && eP( () => {
                    tP.lifecycle.status.value = "ready"
                }
                )
            }
            ready(e, t=!1) {
                let i = "ready";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [i, e]];
                    return
                }
                if (this.errorHandler.leaveBreadcrumb(`New ${i} invocation`),
                !b(e))
                    return void this.logger.error(e5(q));
                "readyExecuted" === tP.lifecycle.status.value ? ru(e, [], q, this.logger) : tP.eventBuffer.readyCallbacksArray.value = [...tP.eventBuffer.readyCallbacksArray.value, e]
            }
            page(e, t=!1) {
                let i = "page";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [i, e]];
                    return
                }
                this.errorHandler.leaveBreadcrumb(`New ${i} event`),
                tP.metrics.triggered.value += 1,
                this.eventManager?.addEvent({
                    type: "page",
                    category: e.category,
                    name: e.name,
                    properties: e.properties,
                    options: e.options,
                    callback: e.callback
                }),
                !0 === tP.capabilities.isAdBlocked.value && e.category !== ef && this.page(N(ef, "ad-block page request", {
                    path: "/ad-blocked"
                }, tP.loadOptions.value.sendAdblockPageOptions))
            }
            track(e, t=!1) {
                let i = "track";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [i, e]];
                    return
                }
                this.errorHandler.leaveBreadcrumb(`New ${i} event - ${e.name}`),
                tP.metrics.triggered.value += 1,
                this.eventManager?.addEvent({
                    type: i,
                    name: e.name || void 0,
                    properties: e.properties,
                    options: e.options,
                    callback: e.callback
                })
            }
            identify(e, t=!1) {
                let i = "identify";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [i, e]];
                    return
                }
                this.errorHandler.leaveBreadcrumb(`New ${i} event`),
                tP.metrics.triggered.value += 1,
                e.userId && tP.session.userId.value && e.userId !== tP.session.userId.value && this.reset(),
                null !== e.userId && this.userSessionManager?.setUserId(e.userId),
                this.userSessionManager?.setUserTraits(e.traits),
                this.eventManager?.addEvent({
                    type: i,
                    userId: e.userId,
                    traits: e.traits,
                    options: e.options,
                    callback: e.callback
                })
            }
            alias(e, t=!1) {
                let i = "alias";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [i, e]];
                    return
                }
                this.errorHandler.leaveBreadcrumb(`New ${i} event`),
                tP.metrics.triggered.value += 1;
                let r = e.from ?? (this.getUserId() || this.userSessionManager?.getAnonymousId());
                this.eventManager?.addEvent({
                    type: i,
                    to: e.to,
                    from: r,
                    options: e.options,
                    callback: e.callback
                })
            }
            group(e, t=!1) {
                let i = "group";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [i, e]];
                    return
                }
                this.errorHandler.leaveBreadcrumb(`New ${i} event`),
                tP.metrics.triggered.value += 1,
                null !== e.groupId && this.userSessionManager?.setGroupId(e.groupId),
                this.userSessionManager?.setGroupTraits(e.traits),
                this.eventManager?.addEvent({
                    type: i,
                    groupId: e.groupId,
                    traits: e.traits,
                    options: e.options,
                    callback: e.callback
                })
            }
            reset(e, t=!1) {
                let i = "reset";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [i, e]];
                    return
                }
                this.errorHandler.leaveBreadcrumb(`New ${i} invocation`),
                this.userSessionManager?.reset(e)
            }
            getAnonymousId(e) {
                return this.userSessionManager?.getAnonymousId(e)
            }
            setAnonymousId(e, t, i=!1) {
                let r = "setAnonymousId";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [r, e, t]];
                    return
                }
                this.errorHandler.leaveBreadcrumb(`New ${r} invocation`),
                this.userSessionManager?.setAnonymousId(e, t)
            }
            getUserId() {
                return tP.session.userId.value
            }
            getUserTraits() {
                return tP.session.userTraits.value
            }
            getGroupId() {
                return tP.session.groupId.value
            }
            getGroupTraits() {
                return tP.session.groupTraits.value
            }
            startSession(e, t=!1) {
                let i = "startSession";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [i, e]];
                    return
                }
                this.errorHandler.leaveBreadcrumb(`New ${i} invocation`),
                this.userSessionManager?.start(e)
            }
            endSession(e=!1) {
                let t = "endSession";
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [t]];
                    return
                }
                this.errorHandler.leaveBreadcrumb(`New ${t} invocation`),
                this.userSessionManager?.end()
            }
            getSessionId() {
                return this.userSessionManager?.getSessionId() ?? null
            }
            consent(e, t=!1) {
                if (!tP.lifecycle.loaded.value) {
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, ["consent", e]];
                    return
                }
                this.errorHandler.leaveBreadcrumb("New consent invocation"),
                eP( () => {
                    tP.consents.preConsent.value = {
                        ...tP.consents.preConsent.value,
                        enabled: !1
                    },
                    tP.consents.postConsent.value = (e => {
                        let t = {
                            sendPageEvent: !1,
                            trackConsent: !1,
                            discardPreConsentEvents: !1
                        };
                        if (T(e)) {
                            let i = h(e);
                            t.storage = i.storage,
                            C(i.integrations) && (t.integrations = i.integrations),
                            t.discardPreConsentEvents = !0 === i.discardPreConsentEvents,
                            t.sendPageEvent = !0 === i.sendPageEvent,
                            t.trackConsent = !0 === i.trackConsent,
                            C(i.consentManagement) && (t.consentManagement = w(i.consentManagement, {
                                enabled: tP.consents.enabled.value
                            }))
                        }
                        return t
                    }
                    )(e);
                    let {initialized: t, consentsData: i} = iV(tP.consents.postConsent.value.consentManagement, this.logger);
                    tP.consents.initialized.value = t,
                    tP.consents.data.value = i
                }
                ),
                tP.consents.enabled.value && !tP.consents.initialized.value && this.pluginsManager?.invokeSingle("consentManager.updateConsentsInfo", tP, this.storeManager, this.logger),
                this.storeManager?.initializeStorageState(),
                this.userSessionManager?.syncStorageDataToState(),
                this.eventManager?.resume(),
                this.loadDestinations(),
                this.sendTrackingEvents(t)
            }
            sendTrackingEvents(e) {
                if (tP.consents.postConsent.value.trackConsent) {
                    let t = B("Consent Management Interaction");
                    e ? tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, ["track", t]] : this.track(t)
                }
                if (tP.consents.postConsent.value.sendPageEvent) {
                    let t = N();
                    e ? tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, ["page", t]] : this.page(t)
                }
            }
            setAuthToken(e) {
                this.userSessionManager?.setAuthToken(e)
            }
            addCustomIntegration(e, t, i=!1) {
                let r = "addCustomIntegration";
                if (i)
                    this.errorHandler.leaveBreadcrumb(`New ${r} invocation`),
                    this.pluginsManager?.invokeSingle("nativeDestinations.addCustomIntegration", e, t, tP, this.logger);
                else {
                    if (tP.lifecycle.loaded.value)
                        return void this.logger.error(`${W}:: Cannot add custom integration for destination ID "${e}" after the SDK is loaded.`);
                    tP.eventBuffer.toBeProcessedArray.value = [...tP.eventBuffer.toBeProcessedArray.value, [r, e, t]]
                }
            }
        }
        class rh {
            static globalSingleton = null;
            analyticsInstances = {};
            defaultAnalyticsKey = "";
            logger = e0;
            constructor() {
                try {
                    if (rh.globalSingleton)
                        return rh.globalSingleton;
                    rh.initializeGlobalResources(),
                    this.setDefaultInstanceKey = this.setDefaultInstanceKey.bind(this),
                    this.getAnalyticsInstance = this.getAnalyticsInstance.bind(this),
                    this.load = this.load.bind(this),
                    this.ready = this.ready.bind(this),
                    this.triggerBufferedLoadEvent = this.triggerBufferedLoadEvent.bind(this),
                    this.page = this.page.bind(this),
                    this.track = this.track.bind(this),
                    this.identify = this.identify.bind(this),
                    this.alias = this.alias.bind(this),
                    this.group = this.group.bind(this),
                    this.reset = this.reset.bind(this),
                    this.getAnonymousId = this.getAnonymousId.bind(this),
                    this.setAnonymousId = this.setAnonymousId.bind(this),
                    this.getUserId = this.getUserId.bind(this),
                    this.getUserTraits = this.getUserTraits.bind(this),
                    this.getGroupId = this.getGroupId.bind(this),
                    this.getGroupTraits = this.getGroupTraits.bind(this),
                    this.startSession = this.startSession.bind(this),
                    this.endSession = this.endSession.bind(this),
                    this.getSessionId = this.getSessionId.bind(this),
                    this.setAuthToken = this.setAuthToken.bind(this),
                    this.consent = this.consent.bind(this),
                    this.addCustomIntegration = this.addCustomIntegration.bind(this),
                    this.createSafeAnalyticsInstance(),
                    rh.globalSingleton = this,
                    tP.autoTrack.pageLifecycle.pageViewId.value = ei(),
                    tP.autoTrack.pageLifecycle.pageLoadedTimestamp.value = Date.now(),
                    this.triggerBufferedLoadEvent(),
                    globalThis.rudderanalytics = this
                } catch (e) {
                    eg(e)
                }
            }
            createSafeAnalyticsInstance() {
                tP.lifecycle.safeAnalyticsInstance.value = {
                    page: this.page.bind(this),
                    track: this.track.bind(this),
                    identify: this.identify.bind(this),
                    alias: this.alias.bind(this),
                    group: this.group.bind(this),
                    getAnonymousId: this.getAnonymousId.bind(this),
                    getUserId: this.getUserId.bind(this),
                    getUserTraits: this.getUserTraits.bind(this),
                    getGroupId: this.getGroupId.bind(this),
                    getGroupTraits: this.getGroupTraits.bind(this),
                    getSessionId: this.getSessionId.bind(this)
                }
            }
            static initializeGlobalResources() {
                t0.init(),
                iM.configure(),
                iD.configure(),
                iR.configure(),
                iE.configure()
            }
            setDefaultInstanceKey(e) {
                "string" == typeof e && e && (this.defaultAnalyticsKey = e)
            }
            getAnalyticsInstance(e) {
                try {
                    let t, i = e;
                    return t = i,
                    "string" == typeof t && i || (i = this.defaultAnalyticsKey),
                    this.analyticsInstances[i] || (this.analyticsInstances[i] = new rg),
                    this.analyticsInstances[i]
                } catch (e) {
                    eg(e);
                    return
                }
            }
            load(e, t, i) {
                try {
                    if (this.analyticsInstances[e])
                        return;
                    this.setDefaultInstanceKey(e),
                    this.trackPageLifecycleEvents(i);
                    let r = eS(ev)
                      , n = "consent"
                      , s = r.filter(e => e[0] === n)
                      , a = r.filter(e => e[0] !== n);
                    r.splice(0, r.length, ...s, ...a),
                    eI(ev, h(r)),
                    this.getAnalyticsInstance(e)?.load(e, t, el(i))
                } catch (e) {
                    eg(e)
                }
            }
            trackPageLifecycleEvents(e) {
                let {autoTrack: t, useBeacon: i} = e ?? {}
                  , {enabled: r=!1, options: n={}, pageLifecycle: s} = t ?? {}
                  , {events: a=[_.UNLOADED], enabled: o=r, options: l=n} = s ?? {};
                tP.autoTrack.pageLifecycle.enabled.value = o,
                tP.autoTrack.enabled.value = r || o,
                o && this.setupPageUnloadTracking(a, i, l)
            }
            setupPageUnloadTracking(e, t, i) {
                (0 === e.length || e.includes(_.UNLOADED)) && (!0 === t ? ( (e, t=!1) => {
                    let i = !1
                      , r = !1;
                    function n() {
                        i || (i = !0,
                        e(r),
                        setTimeout( () => {
                            i = !1
                        }
                        , 0))
                    }
                    (t || "string" == typeof globalThis.navigator.userAgent && /Trident.*rv:11\./.test(globalThis.navigator.userAgent)) && globalThis.addEventListener("beforeunload", () => {
                        r = !1,
                        n()
                    }
                    ),
                    globalThis.addEventListener("blur", () => {
                        r = !0,
                        n()
                    }
                    ),
                    globalThis.addEventListener("focus", () => {
                        i = !1
                    }
                    ),
                    document.addEventListener("pagehide", () => {
                        r = "hidden" === document.visibilityState,
                        n()
                    }
                    ),
                    document.addEventListener("visibilitychange", () => {
                        r = !0,
                        "hidden" === document.visibilityState ? n() : i = !1
                    }
                    )
                }
                )(e => {
                    if (!1 === e && tP.lifecycle.loaded.value) {
                        let e = Date.now()
                          , t = e - tP.autoTrack.pageLifecycle.pageLoadedTimestamp.value;
                        this.track(_.UNLOADED, {
                            timeOnPage: t
                        }, {
                            ...i,
                            originalTimestamp: er(new Date(e))
                        })
                    }
                }
                , !0) : this.logger.warn('RudderStackAnalytics:: Page Unloaded event can only be tracked when the Beacon transport is active. Please enable "useBeacon" load API option.'))
            }
            triggerBufferedLoadEvent() {
                let e = Array.isArray(globalThis.rudderanalytics) ? globalThis.rudderanalytics : []
                  , t = (e => {
                    let t = []
                      , i = 0;
                    for (; i < e.length; ) {
                        if (e[i] && "load" === e[i][0]) {
                            t = h(e[i]),
                            e.splice(i, 1);
                            break
                        }
                        i += 1
                    }
                    return t
                }
                )(e);
                eI(ev, h([...e])),
                t.length > 0 && (t.shift(),
                this.load.apply(null, t))
            }
            ready(e) {
                try {
                    this.getAnalyticsInstance()?.ready(el(e))
                } catch (e) {
                    eg(e)
                }
            }
            page(e, t, i, r, n) {
                try {
                    this.getAnalyticsInstance()?.page(N(el(e), el(t), el(i), el(r), el(n)))
                } catch (e) {
                    eg(e)
                }
            }
            track(e, t, i, r) {
                try {
                    this.getAnalyticsInstance()?.track(B(el(e), el(t), el(i), el(r)))
                } catch (e) {
                    eg(e)
                }
            }
            identify(e, t, i, r) {
                try {
                    this.getAnalyticsInstance()?.identify(x(el(e), el(t), el(i), el(r)))
                } catch (e) {
                    eg(e)
                }
            }
            alias(e, t, i, r) {
                try {
                    this.getAnalyticsInstance()?.alias(U(el(e), el(t), el(i), el(r)))
                } catch (e) {
                    eg(e)
                }
            }
            group(e, t, i, r) {
                try {
                    this.getAnalyticsInstance()?.group(j(el(e), el(t), el(i), el(r)))
                } catch (e) {
                    eg(e)
                }
            }
            reset(e) {
                try {
                    this.getAnalyticsInstance()?.reset(el(e))
                } catch (e) {
                    eg(e)
                }
            }
            getAnonymousId(e) {
                try {
                    return this.getAnalyticsInstance()?.getAnonymousId(el(e))
                } catch (e) {
                    eg(e);
                    return
                }
            }
            setAnonymousId(e, t) {
                try {
                    this.getAnalyticsInstance()?.setAnonymousId(el(e), el(t))
                } catch (e) {
                    eg(e)
                }
            }
            getUserId() {
                try {
                    return this.getAnalyticsInstance()?.getUserId()
                } catch (e) {
                    eg(e);
                    return
                }
            }
            getUserTraits() {
                try {
                    return this.getAnalyticsInstance()?.getUserTraits()
                } catch (e) {
                    eg(e);
                    return
                }
            }
            getGroupId() {
                try {
                    return this.getAnalyticsInstance()?.getGroupId()
                } catch (e) {
                    eg(e);
                    return
                }
            }
            getGroupTraits() {
                try {
                    return this.getAnalyticsInstance()?.getGroupTraits()
                } catch (e) {
                    eg(e);
                    return
                }
            }
            startSession(e) {
                try {
                    this.getAnalyticsInstance()?.startSession(el(e))
                } catch (e) {
                    eg(e)
                }
            }
            endSession() {
                try {
                    this.getAnalyticsInstance()?.endSession()
                } catch (e) {
                    eg(e)
                }
            }
            getSessionId() {
                try {
                    return this.getAnalyticsInstance()?.getSessionId()
                } catch (e) {
                    eg(e);
                    return
                }
            }
            setAuthToken(e) {
                try {
                    this.getAnalyticsInstance()?.setAuthToken(el(e))
                } catch (e) {
                    eg(e)
                }
            }
            consent(e) {
                try {
                    this.getAnalyticsInstance()?.consent(el(e))
                } catch (e) {
                    eg(e)
                }
            }
            addCustomIntegration(e, t) {
                try {
                    this.getAnalyticsInstance()?.addCustomIntegration(el(e), el(t))
                } catch (e) {
                    eg(e)
                }
            }
        }
    }
}]);
//# sourceMappingURL=3be009e9.917bce30da0c6133.js.map
