"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[949], {
    30083: (e, t, i) => {
        i.d(t, {
            Q8: () => tN
        });
        var s, r, n, o, a, l, c, d, h, p, u, g, f, m = Object.defineProperty, b = Object.getOwnPropertyDescriptor, y = (e, t, i, s) => {
            for (var r, n = s > 1 ? void 0 : s ? b(t, i) : t, o = e.length - 1; o >= 0; o--)
                (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
            return s && n && m(t, i, n),
            n
        }
        , v = {
            strictlyNecessary: !0,
            functional: !0,
            analytics: !0,
            advertising: !0
        }, k = {
            strictlyNecessary: !0,
            functional: !1,
            analytics: !1,
            advertising: !1
        };
        function x(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var s in i)
                    e[s] = i[s]
            }
            return e
        }
        var w = function e(t, i) {
            function s(e, s, r) {
                if ("undefined" != typeof document) {
                    "number" == typeof (r = x({}, i, r)).expires && (r.expires = new Date(Date.now() + 864e5 * r.expires)),
                    r.expires && (r.expires = r.expires.toUTCString()),
                    e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                    var n = "";
                    for (var o in r)
                        r[o] && (n += "; " + o,
                        !0 !== r[o] && (n += "=" + r[o].split(";")[0]));
                    return document.cookie = e + "=" + t.write(s, e) + n
                }
            }
            return Object.create({
                set: s,
                get: function(e) {
                    if ("undefined" != typeof document && (!arguments.length || e)) {
                        for (var i = document.cookie ? document.cookie.split("; ") : [], s = {}, r = 0; r < i.length; r++) {
                            var n = i[r].split("=")
                              , o = n.slice(1).join("=");
                            try {
                                var a = decodeURIComponent(n[0]);
                                if (s[a] = t.read(o, a),
                                e === a)
                                    break
                            } catch (e) {}
                        }
                        return e ? s[e] : s
                    }
                },
                remove: function(e, t) {
                    s(e, "", x({}, t, {
                        expires: -1
                    }))
                },
                withAttributes: function(t) {
                    return e(this.converter, x({}, this.attributes, t))
                },
                withConverter: function(t) {
                    return e(x({}, this.converter, t), this.attributes)
                }
            }, {
                attributes: {
                    value: Object.freeze(i)
                },
                converter: {
                    value: Object.freeze(t)
                }
            })
        }({
            read: function(e) {
                return '"' === e[0] && (e = e.slice(1, -1)),
                e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
            },
            write: function(e) {
                return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
            }
        }, {
            path: "/"
        })
          , $ = ".converge.ai"
          , _ = class e {
            read() {
                let t = w.get(e.NAME);
                return t ? this.parse(t) : null
            }
            write(t) {
                w.set(e.NAME, JSON.stringify({
                    v: 1,
                    data: t
                }), this.toCookieOptions(this.computeExpires(t)))
            }
            remove() {
                w.remove(e.NAME, this.toCookieOptions(new Date(0)))
            }
            computeExpires(e) {
                let t = "notice_only" === e.mode ? 365 : 180
                  , i = new Date;
                return i.setDate(i.getDate() + t),
                i
            }
            parse(e) {
                try {
                    let t = JSON.parse(e);
                    return t?.data ? t : null
                } catch {
                    return null
                }
            }
            toCookieOptions(e) {
                let {domain: t, secure: i} = function() {
                    if ("undefined" == typeof window || !window.location)
                        return {
                            domain: $,
                            secure: !0
                        };
                    let {hostname: e, protocol: t} = window.location;
                    return {
                        domain: "converge.ai" === e || e.endsWith(".converge.ai") ? $ : void 0,
                        secure: "https:" === t
                    }
                }();
                return {
                    path: "/",
                    expires: e,
                    secure: i,
                    sameSite: "Lax",
                    domain: t
                }
            }
        }
        ;
        _.NAME = "converge_cookie_consent";
        var C = e => "string" == typeof e
          , S = () => {
            let e, t, i = new Promise( (i, s) => {
                e = i,
                t = s
            }
            );
            return i.resolve = e,
            i.reject = t,
            i
        }
          , E = e => null == e ? "" : "" + e
          , A = /###/g
          , P = e => e && e.indexOf("###") > -1 ? e.replace(A, ".") : e
          , O = e => !e || C(e)
          , L = (e, t, i) => {
            let s = C(t) ? t.split(".") : t
              , r = 0;
            for (; r < s.length - 1; ) {
                if (O(e))
                    return {};
                let t = P(s[r]);
                !e[t] && i && (e[t] = new i),
                e = Object.prototype.hasOwnProperty.call(e, t) ? e[t] : {},
                ++r
            }
            return O(e) ? {} : {
                obj: e,
                k: P(s[r])
            }
        }
          , R = (e, t, i) => {
            let {obj: s, k: r} = L(e, t, Object);
            if (void 0 !== s || 1 === t.length) {
                s[r] = i;
                return
            }
            let n = t[t.length - 1]
              , o = t.slice(0, t.length - 1)
              , a = L(e, o, Object);
            for (; void 0 === a.obj && o.length; )
                n = `${o[o.length - 1]}.${n}`,
                a = L(e, o = o.slice(0, o.length - 1), Object),
                a?.obj && void 0 !== a.obj[`${a.k}.${n}`] && (a.obj = void 0);
            a.obj[`${a.k}.${n}`] = i
        }
          , z = (e, t) => {
            let {obj: i, k: s} = L(e, t);
            if (i && Object.prototype.hasOwnProperty.call(i, s))
                return i[s]
        }
          , j = (e, t, i) => {
            for (let s in t)
                "__proto__" !== s && "constructor" !== s && (s in e ? C(e[s]) || e[s] instanceof String || C(t[s]) || t[s] instanceof String ? i && (e[s] = t[s]) : j(e[s], t[s], i) : e[s] = t[s]);
            return e
        }
          , N = e => e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
          , T = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        }
          , U = e => C(e) ? e.replace(/[&<>"'\/]/g, e => T[e]) : e
          , I = class {
            constructor(e) {
                this.capacity = e,
                this.regExpMap = new Map,
                this.regExpQueue = []
            }
            getRegExp(e) {
                let t = this.regExpMap.get(e);
                if (void 0 !== t)
                    return t;
                let i = new RegExp(e);
                return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()),
                this.regExpMap.set(e, i),
                this.regExpQueue.push(e),
                i
            }
        }
          , M = [" ", ",", "?", "!", ";"]
          , D = new I(20)
          , F = function(e, t) {
            let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
            if (!e)
                return;
            if (e[t]) {
                if (!Object.prototype.hasOwnProperty.call(e, t))
                    return;
                return e[t]
            }
            let s = t.split(i)
              , r = e;
            for (let e = 0; e < s.length; ) {
                let t;
                if (!r || "object" != typeof r)
                    return;
                let n = "";
                for (let o = e; o < s.length; ++o)
                    if (o !== e && (n += i),
                    n += s[o],
                    void 0 !== (t = r[n])) {
                        if (["string", "number", "boolean"].indexOf(typeof t) > -1 && o < s.length - 1)
                            continue;
                        e += o - e + 1;
                        break
                    }
                r = t
            }
            return r
        }
          , V = e => e?.replace("_", "-")
          , H = {
            type: "logger",
            log(e) {
                this.output("log", e)
            },
            warn(e) {
                this.output("warn", e)
            },
            error(e) {
                this.output("error", e)
            },
            output(e, t) {
                console?.[e]?.apply?.(console, t)
            }
        }
          , B = new class e {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                this.init(e, t)
            }
            init(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                this.prefix = t.prefix || "i18next:",
                this.logger = e || H,
                this.options = t,
                this.debug = t.debug
            }
            log() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                    t[i] = arguments[i];
                return this.forward(t, "log", "", !0)
            }
            warn() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                    t[i] = arguments[i];
                return this.forward(t, "warn", "", !0)
            }
            error() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                    t[i] = arguments[i];
                return this.forward(t, "error", "")
            }
            deprecate() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                    t[i] = arguments[i];
                return this.forward(t, "warn", "WARNING DEPRECATED: ", !0)
            }
            forward(e, t, i, s) {
                return s && !this.debug ? null : (C(e[0]) && (e[0] = `${i}${this.prefix} ${e[0]}`),
                this.logger[t](e))
            }
            create(t) {
                return new e(this.logger,{
                    ...{
                        prefix: `${this.prefix}:${t}:`
                    },
                    ...this.options
                })
            }
            clone(t) {
                return (t = t || this.options).prefix = t.prefix || this.prefix,
                new e(this.logger,t)
            }
        }
          , K = class {
            constructor() {
                this.observers = {}
            }
            on(e, t) {
                return e.split(" ").forEach(e => {
                    this.observers[e] || (this.observers[e] = new Map);
                    let i = this.observers[e].get(t) || 0;
                    this.observers[e].set(t, i + 1)
                }
                ),
                this
            }
            off(e, t) {
                if (this.observers[e]) {
                    if (!t)
                        return void delete this.observers[e];
                    this.observers[e].delete(t)
                }
            }
            emit(e) {
                for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
                    i[s - 1] = arguments[s];
                this.observers[e] && Array.from(this.observers[e].entries()).forEach(e => {
                    let[t,s] = e;
                    for (let e = 0; e < s; e++)
                        t(...i)
                }
                ),
                this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(t => {
                    let[s,r] = t;
                    for (let t = 0; t < r; t++)
                        s.apply(s, [e, ...i])
                }
                )
            }
        }
          , q = class extends K {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    ns: ["translation"],
                    defaultNS: "translation"
                };
                super(),
                this.data = e || {},
                this.options = t,
                void 0 === this.options.keySeparator && (this.options.keySeparator = "."),
                void 0 === this.options.ignoreJSONStructure && (this.options.ignoreJSONStructure = !0)
            }
            addNamespaces(e) {
                0 > this.options.ns.indexOf(e) && this.options.ns.push(e)
            }
            removeNamespaces(e) {
                let t = this.options.ns.indexOf(e);
                t > -1 && this.options.ns.splice(t, 1)
            }
            getResource(e, t, i) {
                let s, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, n = void 0 !== r.keySeparator ? r.keySeparator : this.options.keySeparator, o = void 0 !== r.ignoreJSONStructure ? r.ignoreJSONStructure : this.options.ignoreJSONStructure;
                e.indexOf(".") > -1 ? s = e.split(".") : (s = [e, t],
                i && (Array.isArray(i) ? s.push(...i) : C(i) && n ? s.push(...i.split(n)) : s.push(i)));
                let a = z(this.data, s);
                return (!a && !t && !i && e.indexOf(".") > -1 && (e = s[0],
                t = s[1],
                i = s.slice(2).join(".")),
                !a && o && C(i)) ? F(this.data?.[e]?.[t], i, n) : a
            }
            addResource(e, t, i, s) {
                let r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {
                    silent: !1
                }
                  , n = void 0 !== r.keySeparator ? r.keySeparator : this.options.keySeparator
                  , o = [e, t];
                i && (o = o.concat(n ? i.split(n) : i)),
                e.indexOf(".") > -1 && (o = e.split("."),
                s = t,
                t = o[1]),
                this.addNamespaces(t),
                R(this.data, o, s),
                r.silent || this.emit("added", e, t, i, s)
            }
            addResources(e, t, i) {
                let s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
                    silent: !1
                };
                for (let s in i)
                    (C(i[s]) || Array.isArray(i[s])) && this.addResource(e, t, s, i[s], {
                        silent: !0
                    });
                s.silent || this.emit("added", e, t, i)
            }
            addResourceBundle(e, t, i, s, r) {
                let n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {
                    silent: !1,
                    skipCopy: !1
                }
                  , o = [e, t];
                e.indexOf(".") > -1 && (o = e.split("."),
                s = i,
                i = t,
                t = o[1]),
                this.addNamespaces(t);
                let a = z(this.data, o) || {};
                n.skipCopy || (i = JSON.parse(JSON.stringify(i))),
                s ? j(a, i, r) : a = {
                    ...a,
                    ...i
                },
                R(this.data, o, a),
                n.silent || this.emit("added", e, t, i)
            }
            removeResourceBundle(e, t) {
                this.hasResourceBundle(e, t) && delete this.data[e][t],
                this.removeNamespaces(t),
                this.emit("removed", e, t)
            }
            hasResourceBundle(e, t) {
                return void 0 !== this.getResource(e, t)
            }
            getResourceBundle(e, t) {
                return t || (t = this.options.defaultNS),
                this.getResource(e, t)
            }
            getDataByLanguage(e) {
                return this.data[e]
            }
            hasLanguageSomeTranslations(e) {
                let t = this.getDataByLanguage(e);
                return !!(t && Object.keys(t) || []).find(e => t[e] && Object.keys(t[e]).length > 0)
            }
            toJSON() {
                return this.data
            }
        }
          , W = {
            processors: {},
            addPostProcessor(e) {
                this.processors[e.name] = e
            },
            handle(e, t, i, s, r) {
                return e.forEach(e => {
                    t = this.processors[e]?.process(t, i, s, r) ?? t
                }
                ),
                t
            }
        }
          , G = {}
          , J = e => !C(e) && "boolean" != typeof e && "number" != typeof e
          , Y = class e extends K {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                super(),
                ( (e, t, i) => {
                    e.forEach(e => {
                        t[e] && (i[e] = t[e])
                    }
                    )
                }
                )(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this),
                this.options = t,
                void 0 === this.options.keySeparator && (this.options.keySeparator = "."),
                this.logger = B.create("translator")
            }
            changeLanguage(e) {
                e && (this.language = e)
            }
            exists(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    interpolation: {}
                };
                if (null == e)
                    return !1;
                let i = this.resolve(e, t);
                return i?.res !== void 0
            }
            extractFromKey(e, t) {
                let i = void 0 !== t.nsSeparator ? t.nsSeparator : this.options.nsSeparator;
                void 0 === i && (i = ":");
                let s = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator
                  , r = t.ns || this.options.defaultNS || []
                  , n = i && e.indexOf(i) > -1
                  , o = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !( (e, t, i) => {
                    t = t || "",
                    i = i || "";
                    let s = M.filter(e => 0 > t.indexOf(e) && 0 > i.indexOf(e));
                    if (0 === s.length)
                        return !0;
                    let r = D.getRegExp(`(${s.map(e => "?" === e ? "\\?" : e).join("|")})`)
                      , n = !r.test(e);
                    if (!n) {
                        let t = e.indexOf(i);
                        t > 0 && !r.test(e.substring(0, t)) && (n = !0)
                    }
                    return n
                }
                )(e, i, s);
                if (n && !o) {
                    let t = e.match(this.interpolator.nestingRegexp);
                    if (t && t.length > 0)
                        return {
                            key: e,
                            namespaces: C(r) ? [r] : r
                        };
                    let n = e.split(i);
                    (i !== s || i === s && this.options.ns.indexOf(n[0]) > -1) && (r = n.shift()),
                    e = n.join(s)
                }
                return {
                    key: e,
                    namespaces: C(r) ? [r] : r
                }
            }
            translate(t, i, s) {
                if ("object" != typeof i && this.options.overloadTranslationOptionHandler && (i = this.options.overloadTranslationOptionHandler(arguments)),
                "object" == typeof i && (i = {
                    ...i
                }),
                i || (i = {}),
                null == t)
                    return "";
                Array.isArray(t) || (t = [String(t)]);
                let r = void 0 !== i.returnDetails ? i.returnDetails : this.options.returnDetails
                  , n = void 0 !== i.keySeparator ? i.keySeparator : this.options.keySeparator
                  , {key: o, namespaces: a} = this.extractFromKey(t[t.length - 1], i)
                  , l = a[a.length - 1]
                  , c = i.lng || this.language
                  , d = i.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
                if (c?.toLowerCase() === "cimode") {
                    if (d) {
                        let e = i.nsSeparator || this.options.nsSeparator;
                        return r ? {
                            res: `${l}${e}${o}`,
                            usedKey: o,
                            exactUsedKey: o,
                            usedLng: c,
                            usedNS: l,
                            usedParams: this.getUsedParamsDetails(i)
                        } : `${l}${e}${o}`
                    }
                    return r ? {
                        res: o,
                        usedKey: o,
                        exactUsedKey: o,
                        usedLng: c,
                        usedNS: l,
                        usedParams: this.getUsedParamsDetails(i)
                    } : o
                }
                let h = this.resolve(t, i)
                  , p = h?.res
                  , u = h?.usedKey || o
                  , g = h?.exactUsedKey || o
                  , f = void 0 !== i.joinArrays ? i.joinArrays : this.options.joinArrays
                  , m = !this.i18nFormat || this.i18nFormat.handleAsObject
                  , b = void 0 !== i.count && !C(i.count)
                  , y = e.hasDefaultValue(i)
                  , v = b ? this.pluralResolver.getSuffix(c, i.count, i) : ""
                  , k = i.ordinal && b ? this.pluralResolver.getSuffix(c, i.count, {
                    ordinal: !1
                }) : ""
                  , x = b && !i.ordinal && 0 === i.count
                  , w = x && i[`defaultValue${this.options.pluralSeparator}zero`] || i[`defaultValue${v}`] || i[`defaultValue${k}`] || i.defaultValue
                  , $ = p;
                m && !p && y && ($ = w);
                let _ = J($)
                  , S = Object.prototype.toString.apply($);
                if (m && $ && _ && 0 > ["[object Number]", "[object Function]", "[object RegExp]"].indexOf(S) && !(C(f) && Array.isArray($))) {
                    if (!i.returnObjects && !this.options.returnObjects) {
                        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                        let e = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(u, $, {
                            ...i,
                            ns: a
                        }) : `key '${o} (${this.language})' returned an object instead of string.`;
                        return r ? (h.res = e,
                        h.usedParams = this.getUsedParamsDetails(i),
                        h) : e
                    }
                    if (n) {
                        let e = Array.isArray($)
                          , t = e ? [] : {}
                          , s = e ? g : u;
                        for (let e in $)
                            if (Object.prototype.hasOwnProperty.call($, e)) {
                                let r = `${s}${n}${e}`;
                                y && !p ? t[e] = this.translate(r, {
                                    ...i,
                                    defaultValue: J(w) ? w[e] : void 0,
                                    ...{
                                        joinArrays: !1,
                                        ns: a
                                    }
                                }) : t[e] = this.translate(r, {
                                    ...i,
                                    joinArrays: !1,
                                    ns: a
                                }),
                                t[e] === r && (t[e] = $[e])
                            }
                        p = t
                    }
                } else if (m && C(f) && Array.isArray(p))
                    (p = p.join(f)) && (p = this.extendTranslation(p, t, i, s));
                else {
                    let e = !1
                      , r = !1;
                    !this.isValidLookup(p) && y && (e = !0,
                    p = w),
                    this.isValidLookup(p) || (r = !0,
                    p = o);
                    let a = (i.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && r ? void 0 : p
                      , d = y && w !== p && this.options.updateMissing;
                    if (r || e || d) {
                        if (this.logger.log(d ? "updateKey" : "missingKey", c, l, o, d ? w : p),
                        n) {
                            let e = this.resolve(o, {
                                ...i,
                                keySeparator: !1
                            });
                            e && e.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                        }
                        let e = []
                          , t = this.languageUtils.getFallbackCodes(this.options.fallbackLng, i.lng || this.language);
                        if ("fallback" === this.options.saveMissingTo && t && t[0])
                            for (let i = 0; i < t.length; i++)
                                e.push(t[i]);
                        else
                            "all" === this.options.saveMissingTo ? e = this.languageUtils.toResolveHierarchy(i.lng || this.language) : e.push(i.lng || this.language);
                        let s = (e, t, s) => {
                            let r = y && s !== p ? s : a;
                            this.options.missingKeyHandler ? this.options.missingKeyHandler(e, l, t, r, d, i) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(e, l, t, r, d, i),
                            this.emit("missingKey", e, l, t, p)
                        }
                        ;
                        this.options.saveMissing && (this.options.saveMissingPlurals && b ? e.forEach(e => {
                            let t = this.pluralResolver.getSuffixes(e, i);
                            x && i[`defaultValue${this.options.pluralSeparator}zero`] && 0 > t.indexOf(`${this.options.pluralSeparator}zero`) && t.push(`${this.options.pluralSeparator}zero`),
                            t.forEach(t => {
                                s([e], o + t, i[`defaultValue${t}`] || w)
                            }
                            )
                        }
                        ) : s(e, o, w))
                    }
                    p = this.extendTranslation(p, t, i, h, s),
                    r && p === o && this.options.appendNamespaceToMissingKey && (p = `${l}:${o}`),
                    (r || e) && this.options.parseMissingKeyHandler && (p = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${l}:${o}` : o, e ? p : void 0))
                }
                return r ? (h.res = p,
                h.usedParams = this.getUsedParamsDetails(i),
                h) : p
            }
            extendTranslation(e, t, i, s, r) {
                var n = this;
                if (this.i18nFormat?.parse)
                    e = this.i18nFormat.parse(e, {
                        ...this.options.interpolation.defaultVariables,
                        ...i
                    }, i.lng || this.language || s.usedLng, s.usedNS, s.usedKey, {
                        resolved: s
                    });
                else if (!i.skipInterpolation) {
                    let o;
                    i.interpolation && this.interpolator.init({
                        ...i,
                        ...{
                            interpolation: {
                                ...this.options.interpolation,
                                ...i.interpolation
                            }
                        }
                    });
                    let a = C(e) && (i?.interpolation?.skipOnVariables !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
                    if (a) {
                        let t = e.match(this.interpolator.nestingRegexp);
                        o = t && t.length
                    }
                    let l = i.replace && !C(i.replace) ? i.replace : i;
                    if (this.options.interpolation.defaultVariables && (l = {
                        ...this.options.interpolation.defaultVariables,
                        ...l
                    }),
                    e = this.interpolator.interpolate(e, l, i.lng || this.language || s.usedLng, i),
                    a) {
                        let t = e.match(this.interpolator.nestingRegexp);
                        o < (t && t.length) && (i.nest = !1)
                    }
                    !i.lng && s && s.res && (i.lng = this.language || s.usedLng),
                    !1 !== i.nest && (e = this.interpolator.nest(e, function() {
                        for (var e = arguments.length, s = Array(e), o = 0; o < e; o++)
                            s[o] = arguments[o];
                        return r?.[0] !== s[0] || i.context ? n.translate(...s, t) : (n.logger.warn(`It seems you are nesting recursively key: ${s[0]} in key: ${t[0]}`),
                        null)
                    }, i)),
                    i.interpolation && this.interpolator.reset()
                }
                let o = i.postProcess || this.options.postProcess
                  , a = C(o) ? [o] : o;
                return null != e && a?.length && !1 !== i.applyPostProcessor && (e = W.handle(a, e, t, this.options && this.options.postProcessPassResolved ? {
                    i18nResolved: {
                        ...s,
                        usedParams: this.getUsedParamsDetails(i)
                    },
                    ...i
                } : i, this)),
                e
            }
            resolve(e) {
                let t, i, s, r, n, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return C(e) && (e = [e]),
                e.forEach(e => {
                    if (this.isValidLookup(t))
                        return;
                    let a = this.extractFromKey(e, o)
                      , l = a.key;
                    i = l;
                    let c = a.namespaces;
                    this.options.fallbackNS && (c = c.concat(this.options.fallbackNS));
                    let d = void 0 !== o.count && !C(o.count)
                      , h = d && !o.ordinal && 0 === o.count
                      , p = void 0 !== o.context && (C(o.context) || "number" == typeof o.context) && "" !== o.context
                      , u = o.lngs ? o.lngs : this.languageUtils.toResolveHierarchy(o.lng || this.language, o.fallbackLng);
                    c.forEach(e => {
                        this.isValidLookup(t) || (n = e,
                        !G[`${u[0]}-${e}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(n) && (G[`${u[0]}-${e}`] = !0,
                        this.logger.warn(`key "${i}" for languages "${u.join(", ")}" won't get resolved as namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),
                        u.forEach(i => {
                            let n;
                            if (this.isValidLookup(t))
                                return;
                            r = i;
                            let a = [l];
                            if (this.i18nFormat?.addLookupKeys)
                                this.i18nFormat.addLookupKeys(a, l, i, e, o);
                            else {
                                let e;
                                d && (e = this.pluralResolver.getSuffix(i, o.count, o));
                                let t = `${this.options.pluralSeparator}zero`
                                  , s = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                                if (d && (a.push(l + e),
                                o.ordinal && 0 === e.indexOf(s) && a.push(l + e.replace(s, this.options.pluralSeparator)),
                                h && a.push(l + t)),
                                p) {
                                    let i = `${l}${this.options.contextSeparator}${o.context}`;
                                    a.push(i),
                                    d && (a.push(i + e),
                                    o.ordinal && 0 === e.indexOf(s) && a.push(i + e.replace(s, this.options.pluralSeparator)),
                                    h && a.push(i + t))
                                }
                            }
                            for (; n = a.pop(); )
                                this.isValidLookup(t) || (s = n,
                                t = this.getResource(i, e, n, o))
                        }
                        ))
                    }
                    )
                }
                ),
                {
                    res: t,
                    usedKey: i,
                    exactUsedKey: s,
                    usedLng: r,
                    usedNS: n
                }
            }
            isValidLookup(e) {
                return void 0 !== e && !(!this.options.returnNull && null === e) && !(!this.options.returnEmptyString && "" === e)
            }
            getResource(e, t, i) {
                let s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                return this.i18nFormat?.getResource ? this.i18nFormat.getResource(e, t, i, s) : this.resourceStore.getResource(e, t, i, s)
            }
            getUsedParamsDetails() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = e.replace && !C(e.replace)
                  , i = t ? e.replace : e;
                if (t && void 0 !== e.count && (i.count = e.count),
                this.options.interpolation.defaultVariables && (i = {
                    ...this.options.interpolation.defaultVariables,
                    ...i
                }),
                !t)
                    for (let e of (i = {
                        ...i
                    },
                    ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"]))
                        delete i[e];
                return i
            }
            static hasDefaultValue(e) {
                let t = "defaultValue";
                for (let i in e)
                    if (Object.prototype.hasOwnProperty.call(e, i) && t === i.substring(0, t.length) && void 0 !== e[i])
                        return !0;
                return !1
            }
        }
          , Q = class {
            constructor(e) {
                this.options = e,
                this.supportedLngs = this.options.supportedLngs || !1,
                this.logger = B.create("languageUtils")
            }
            getScriptPartFromCode(e) {
                if (!(e = V(e)) || 0 > e.indexOf("-"))
                    return null;
                let t = e.split("-");
                return 2 === t.length || (t.pop(),
                "x" === t[t.length - 1].toLowerCase()) ? null : this.formatLanguageCode(t.join("-"))
            }
            getLanguagePartFromCode(e) {
                if (!(e = V(e)) || 0 > e.indexOf("-"))
                    return e;
                let t = e.split("-");
                return this.formatLanguageCode(t[0])
            }
            formatLanguageCode(e) {
                if (C(e) && e.indexOf("-") > -1) {
                    let t;
                    try {
                        t = Intl.getCanonicalLocales(e)[0]
                    } catch (e) {}
                    return (t && this.options.lowerCaseLng && (t = t.toLowerCase()),
                    t) ? t : this.options.lowerCaseLng ? e.toLowerCase() : e
                }
                return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e
            }
            isSupportedCode(e) {
                return ("languageOnly" === this.options.load || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)),
                !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1
            }
            getBestMatchFromCodes(e) {
                let t;
                return e ? (e.forEach(e => {
                    if (t)
                        return;
                    let i = this.formatLanguageCode(e);
                    (!this.options.supportedLngs || this.isSupportedCode(i)) && (t = i)
                }
                ),
                !t && this.options.supportedLngs && e.forEach(e => {
                    if (t)
                        return;
                    let i = this.getLanguagePartFromCode(e);
                    if (this.isSupportedCode(i))
                        return t = i;
                    t = this.options.supportedLngs.find(e => {
                        if (e === i || !(0 > e.indexOf("-") && 0 > i.indexOf("-")) && (e.indexOf("-") > 0 && 0 > i.indexOf("-") && e.substring(0, e.indexOf("-")) === i || 0 === e.indexOf(i) && i.length > 1))
                            return e
                    }
                    )
                }
                ),
                t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
                t) : null
            }
            getFallbackCodes(e, t) {
                if (!e)
                    return [];
                if ("function" == typeof e && (e = e(t)),
                C(e) && (e = [e]),
                Array.isArray(e))
                    return e;
                if (!t)
                    return e.default || [];
                let i = e[t];
                return i || (i = e[this.getScriptPartFromCode(t)]),
                i || (i = e[this.formatLanguageCode(t)]),
                i || (i = e[this.getLanguagePartFromCode(t)]),
                i || (i = e.default),
                i || []
            }
            toResolveHierarchy(e, t) {
                let i = this.getFallbackCodes(t || this.options.fallbackLng || [], e)
                  , s = []
                  , r = e => {
                    e && (this.isSupportedCode(e) ? s.push(e) : this.logger.warn(`rejecting language code not found in supportedLngs: ${e}`))
                }
                ;
                return C(e) && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? ("languageOnly" !== this.options.load && r(this.formatLanguageCode(e)),
                "languageOnly" !== this.options.load && "currentOnly" !== this.options.load && r(this.getScriptPartFromCode(e)),
                "currentOnly" !== this.options.load && r(this.getLanguagePartFromCode(e))) : C(e) && r(this.formatLanguageCode(e)),
                i.forEach(e => {
                    0 > s.indexOf(e) && r(this.formatLanguageCode(e))
                }
                ),
                s
            }
        }
          , Z = {
            zero: 0,
            one: 1,
            two: 2,
            few: 3,
            many: 4,
            other: 5
        }
          , X = {
            select: e => 1 === e ? "one" : "other",
            resolvedOptions: () => ({
                pluralCategories: ["one", "other"]
            })
        }
          , ee = class {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                this.languageUtils = e,
                this.options = t,
                this.logger = B.create("pluralResolver"),
                this.pluralRulesCache = {}
            }
            addRule(e, t) {
                this.rules[e] = t
            }
            clearCache() {
                this.pluralRulesCache = {}
            }
            getRule(e) {
                let t, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s = V("dev" === e ? "en" : e), r = i.ordinal ? "ordinal" : "cardinal", n = JSON.stringify({
                    cleanedCode: s,
                    type: r
                });
                if (n in this.pluralRulesCache)
                    return this.pluralRulesCache[n];
                try {
                    t = new Intl.PluralRules(s,{
                        type: r
                    })
                } catch (r) {
                    if (!Intl)
                        return this.logger.error("No Intl support, please use an Intl polyfill!"),
                        X;
                    if (!e.match(/-|_/))
                        return X;
                    let s = this.languageUtils.getLanguagePartFromCode(e);
                    t = this.getRule(s, i)
                }
                return this.pluralRulesCache[n] = t,
                t
            }
            needsPlural(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , i = this.getRule(e, t);
                return i || (i = this.getRule("dev", t)),
                i?.resolvedOptions().pluralCategories.length > 1
            }
            getPluralFormsOfKey(e, t) {
                let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return this.getSuffixes(e, i).map(e => `${t}${e}`)
            }
            getSuffixes(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , i = this.getRule(e, t);
                return (i || (i = this.getRule("dev", t)),
                i) ? i.resolvedOptions().pluralCategories.sort( (e, t) => Z[e] - Z[t]).map(e => `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ""}${e}`) : []
            }
            getSuffix(e, t) {
                let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                  , s = this.getRule(e, i);
                return s ? `${this.options.prepend}${i.ordinal ? `ordinal${this.options.prepend}` : ""}${s.select(t)}` : (this.logger.warn(`no plural rule found for: ${e}`),
                this.getSuffix("dev", t, i))
            }
        }
          , et = function(e, t, i) {
            let s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "."
              , r = !(arguments.length > 4) || void 0 === arguments[4] || arguments[4]
              , n = ( (e, t, i) => {
                let s = z(e, i);
                return void 0 !== s ? s : z(t, i)
            }
            )(e, t, i);
            return !n && r && C(i) && void 0 === (n = F(e, i, s)) && (n = F(t, i, s)),
            n
        }
          , ei = e => e.replace(/\$/g, "$$$$")
          , es = class {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.logger = B.create("interpolator"),
                this.options = e,
                this.format = e?.interpolation?.format || (e => e),
                this.init(e)
            }
            init() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                e.interpolation || (e.interpolation = {
                    escapeValue: !0
                });
                let {escape: t, escapeValue: i, useRawValueToEscape: s, prefix: r, prefixEscaped: n, suffix: o, suffixEscaped: a, formatSeparator: l, unescapeSuffix: c, unescapePrefix: d, nestingPrefix: h, nestingPrefixEscaped: p, nestingSuffix: u, nestingSuffixEscaped: g, nestingOptionsSeparator: f, maxReplaces: m, alwaysFormat: b} = e.interpolation;
                this.escape = void 0 !== t ? t : U,
                this.escapeValue = void 0 === i || i,
                this.useRawValueToEscape = void 0 !== s && s,
                this.prefix = r ? N(r) : n || "{{",
                this.suffix = o ? N(o) : a || "}}",
                this.formatSeparator = l || ",",
                this.unescapePrefix = c ? "" : d || "-",
                this.unescapeSuffix = this.unescapePrefix ? "" : c || "",
                this.nestingPrefix = h ? N(h) : p || N("$t("),
                this.nestingSuffix = u ? N(u) : g || N(")"),
                this.nestingOptionsSeparator = f || ",",
                this.maxReplaces = m || 1e3,
                this.alwaysFormat = void 0 !== b && b,
                this.resetRegExp()
            }
            reset() {
                this.options && this.init(this.options)
            }
            resetRegExp() {
                let e = (e, t) => e?.source === t ? (e.lastIndex = 0,
                e) : RegExp(t, "g");
                this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`),
                this.regexpUnescape = e(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),
                this.nestingRegexp = e(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`)
            }
            interpolate(e, t, i, s) {
                let r, n, o, a = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, l = e => {
                    if (0 > e.indexOf(this.formatSeparator)) {
                        let r = et(t, a, e, this.options.keySeparator, this.options.ignoreJSONStructure);
                        return this.alwaysFormat ? this.format(r, void 0, i, {
                            ...s,
                            ...t,
                            interpolationkey: e
                        }) : r
                    }
                    let r = e.split(this.formatSeparator)
                      , n = r.shift().trim()
                      , o = r.join(this.formatSeparator).trim();
                    return this.format(et(t, a, n, this.options.keySeparator, this.options.ignoreJSONStructure), o, i, {
                        ...s,
                        ...t,
                        interpolationkey: n
                    })
                }
                ;
                this.resetRegExp();
                let c = s?.missingInterpolationHandler || this.options.missingInterpolationHandler
                  , d = s?.interpolation?.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
                return [{
                    regex: this.regexpUnescape,
                    safeValue: e => ei(e)
                }, {
                    regex: this.regexp,
                    safeValue: e => this.escapeValue ? ei(this.escape(e)) : ei(e)
                }].forEach(t => {
                    for (o = 0; r = t.regex.exec(e); ) {
                        let i = r[1].trim();
                        if (void 0 === (n = l(i)))
                            if ("function" == typeof c) {
                                let t = c(e, r, s);
                                n = C(t) ? t : ""
                            } else if (s && Object.prototype.hasOwnProperty.call(s, i))
                                n = "";
                            else if (d) {
                                n = r[0];
                                continue
                            } else
                                this.logger.warn(`missed to pass in variable ${i} for interpolating ${e}`),
                                n = "";
                        else
                            C(n) || this.useRawValueToEscape || (n = E(n));
                        let a = t.safeValue(n);
                        if (e = e.replace(r[0], a),
                        d ? (t.regex.lastIndex += n.length,
                        t.regex.lastIndex -= r[0].length) : t.regex.lastIndex = 0,
                        ++o >= this.maxReplaces)
                            break
                    }
                }
                ),
                e
            }
            nest(e, t) {
                let i, s, r, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = (e, t) => {
                    let i = this.nestingOptionsSeparator;
                    if (0 > e.indexOf(i))
                        return e;
                    let s = e.split(RegExp(`${i}[ ]*{`))
                      , n = `{${s[1]}`;
                    e = s[0];
                    let o = (n = this.interpolate(n, r)).match(/'/g)
                      , a = n.match(/"/g);
                    ((o?.length ?? 0) % 2 != 0 || a) && a.length % 2 == 0 || (n = n.replace(/'/g, '"'));
                    try {
                        r = JSON.parse(n),
                        t && (r = {
                            ...t,
                            ...r
                        })
                    } catch (t) {
                        return this.logger.warn(`failed parsing options string in nesting for key ${e}`, t),
                        `${e}${i}${n}`
                    }
                    return r.defaultValue && r.defaultValue.indexOf(this.prefix) > -1 && delete r.defaultValue,
                    e
                }
                ;
                for (; i = this.nestingRegexp.exec(e); ) {
                    let a = [];
                    (r = (r = {
                        ...n
                    }).replace && !C(r.replace) ? r.replace : r).applyPostProcessor = !1,
                    delete r.defaultValue;
                    let l = !1;
                    if (-1 !== i[0].indexOf(this.formatSeparator) && !/{.*}/.test(i[1])) {
                        let e = i[1].split(this.formatSeparator).map(e => e.trim());
                        i[1] = e.shift(),
                        a = e,
                        l = !0
                    }
                    if ((s = t(o.call(this, i[1].trim(), r), r)) && i[0] === e && !C(s))
                        return s;
                    C(s) || (s = E(s)),
                    s || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${e}`),
                    s = ""),
                    l && (s = a.reduce( (e, t) => this.format(e, t, n.lng, {
                        ...n,
                        interpolationkey: i[1].trim()
                    }), s.trim())),
                    e = e.replace(i[0], s),
                    this.regexp.lastIndex = 0
                }
                return e
            }
        }
          , er = e => {
            let t = {};
            return (i, s, r) => {
                let n = r;
                r && r.interpolationkey && r.formatParams && r.formatParams[r.interpolationkey] && r[r.interpolationkey] && (n = {
                    ...n,
                    [r.interpolationkey]: void 0
                });
                let o = s + JSON.stringify(n)
                  , a = t[o];
                return a || (a = e(V(s), r),
                t[o] = a),
                a(i)
            }
        }
          , en = class {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.logger = B.create("formatter"),
                this.options = e,
                this.formats = {
                    number: er( (e, t) => {
                        let i = new Intl.NumberFormat(e,{
                            ...t
                        });
                        return e => i.format(e)
                    }
                    ),
                    currency: er( (e, t) => {
                        let i = new Intl.NumberFormat(e,{
                            ...t,
                            style: "currency"
                        });
                        return e => i.format(e)
                    }
                    ),
                    datetime: er( (e, t) => {
                        let i = new Intl.DateTimeFormat(e,{
                            ...t
                        });
                        return e => i.format(e)
                    }
                    ),
                    relativetime: er( (e, t) => {
                        let i = new Intl.RelativeTimeFormat(e,{
                            ...t
                        });
                        return e => i.format(e, t.range || "day")
                    }
                    ),
                    list: er( (e, t) => {
                        let i = new Intl.ListFormat(e,{
                            ...t
                        });
                        return e => i.format(e)
                    }
                    )
                },
                this.init(e)
            }
            init(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    interpolation: {}
                };
                this.formatSeparator = t.interpolation.formatSeparator || ","
            }
            add(e, t) {
                this.formats[e.toLowerCase().trim()] = t
            }
            addCached(e, t) {
                this.formats[e.toLowerCase().trim()] = er(t)
            }
            format(e, t, i) {
                let s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
                  , r = t.split(this.formatSeparator);
                if (r.length > 1 && r[0].indexOf("(") > 1 && 0 > r[0].indexOf(")") && r.find(e => e.indexOf(")") > -1)) {
                    let e = r.findIndex(e => e.indexOf(")") > -1);
                    r[0] = [r[0], ...r.splice(1, e)].join(this.formatSeparator)
                }
                return r.reduce( (e, t) => {
                    let {formatName: r, formatOptions: n} = (e => {
                        let t = e.toLowerCase().trim()
                          , i = {};
                        if (e.indexOf("(") > -1) {
                            let s = e.split("(");
                            t = s[0].toLowerCase().trim();
                            let r = s[1].substring(0, s[1].length - 1);
                            "currency" === t && 0 > r.indexOf(":") ? i.currency || (i.currency = r.trim()) : "relativetime" === t && 0 > r.indexOf(":") ? i.range || (i.range = r.trim()) : r.split(";").forEach(e => {
                                if (e) {
                                    let[t,...s] = e.split(":")
                                      , r = s.join(":").trim().replace(/^'+|'+$/g, "")
                                      , n = t.trim();
                                    i[n] || (i[n] = r),
                                    "false" === r && (i[n] = !1),
                                    "true" === r && (i[n] = !0),
                                    isNaN(r) || (i[n] = parseInt(r, 10))
                                }
                            }
                            )
                        }
                        return {
                            formatName: t,
                            formatOptions: i
                        }
                    }
                    )(t);
                    if (this.formats[r]) {
                        let t = e;
                        try {
                            let o = s?.formatParams?.[s.interpolationkey] || {}
                              , a = o.locale || o.lng || s.locale || s.lng || i;
                            t = this.formats[r](e, a, {
                                ...n,
                                ...s,
                                ...o
                            })
                        } catch (e) {
                            this.logger.warn(e)
                        }
                        return t
                    }
                    return this.logger.warn(`there was no format function for ${r}`),
                    e
                }
                , e)
            }
        }
          , eo = class extends K {
            constructor(e, t, i) {
                let s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                super(),
                this.backend = e,
                this.store = t,
                this.services = i,
                this.languageUtils = i.languageUtils,
                this.options = s,
                this.logger = B.create("backendConnector"),
                this.waitingReads = [],
                this.maxParallelReads = s.maxParallelReads || 10,
                this.readingCalls = 0,
                this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5,
                this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350,
                this.state = {},
                this.queue = [],
                this.backend?.init?.(i, s.backend, s)
            }
            queueLoad(e, t, i, s) {
                let r = {}
                  , n = {}
                  , o = {}
                  , a = {};
                return e.forEach(e => {
                    let s = !0;
                    t.forEach(t => {
                        let o = `${e}|${t}`;
                        !i.reload && this.store.hasResourceBundle(e, t) ? this.state[o] = 2 : this.state[o] < 0 || (1 === this.state[o] ? void 0 === n[o] && (n[o] = !0) : (this.state[o] = 1,
                        s = !1,
                        void 0 === n[o] && (n[o] = !0),
                        void 0 === r[o] && (r[o] = !0),
                        void 0 === a[t] && (a[t] = !0)))
                    }
                    ),
                    s || (o[e] = !0)
                }
                ),
                (Object.keys(r).length || Object.keys(n).length) && this.queue.push({
                    pending: n,
                    pendingCount: Object.keys(n).length,
                    loaded: {},
                    errors: [],
                    callback: s
                }),
                {
                    toLoad: Object.keys(r),
                    pending: Object.keys(n),
                    toLoadLanguages: Object.keys(o),
                    toLoadNamespaces: Object.keys(a)
                }
            }
            loaded(e, t, i) {
                let s = e.split("|")
                  , r = s[0]
                  , n = s[1];
                t && this.emit("failedLoading", r, n, t),
                !t && i && this.store.addResourceBundle(r, n, i, void 0, void 0, {
                    skipCopy: !0
                }),
                this.state[e] = t ? -1 : 2,
                t && i && (this.state[e] = 0);
                let o = {};
                this.queue.forEach(i => {
                    ( (e, t, i, s) => {
                        let {obj: r, k: n} = L(e, t, Object);
                        r[n] = r[n] || [],
                        r[n].push(i)
                    }
                    )(i.loaded, [r], n),
                    void 0 !== i.pending[e] && (delete i.pending[e],
                    i.pendingCount--),
                    t && i.errors.push(t),
                    0 !== i.pendingCount || i.done || (Object.keys(i.loaded).forEach(e => {
                        o[e] || (o[e] = {});
                        let t = i.loaded[e];
                        t.length && t.forEach(t => {
                            void 0 === o[e][t] && (o[e][t] = !0)
                        }
                        )
                    }
                    ),
                    i.done = !0,
                    i.errors.length ? i.callback(i.errors) : i.callback())
                }
                ),
                this.emit("loaded", o),
                this.queue = this.queue.filter(e => !e.done)
            }
            read(e, t, i) {
                let s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                  , r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : this.retryTimeout
                  , n = arguments.length > 5 ? arguments[5] : void 0;
                if (!e.length)
                    return n(null, {});
                if (this.readingCalls >= this.maxParallelReads)
                    return void this.waitingReads.push({
                        lng: e,
                        ns: t,
                        fcName: i,
                        tried: s,
                        wait: r,
                        callback: n
                    });
                this.readingCalls++;
                let o = (o, a) => {
                    if (this.readingCalls--,
                    this.waitingReads.length > 0) {
                        let e = this.waitingReads.shift();
                        this.read(e.lng, e.ns, e.fcName, e.tried, e.wait, e.callback)
                    }
                    if (o && a && s < this.maxRetries)
                        return void setTimeout( () => {
                            this.read.call(this, e, t, i, s + 1, 2 * r, n)
                        }
                        , r);
                    n(o, a)
                }
                  , a = this.backend[i].bind(this.backend);
                if (2 === a.length) {
                    try {
                        let i = a(e, t);
                        i && "function" == typeof i.then ? i.then(e => o(null, e)).catch(o) : o(null, i)
                    } catch (e) {
                        o(e)
                    }
                    return
                }
                return a(e, t, o)
            }
            prepareLoading(e, t) {
                let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                  , s = arguments.length > 3 ? arguments[3] : void 0;
                if (!this.backend)
                    return this.logger.warn("No backend was added via i18next.use. Will not load resources."),
                    s && s();
                C(e) && (e = this.languageUtils.toResolveHierarchy(e)),
                C(t) && (t = [t]);
                let r = this.queueLoad(e, t, i, s);
                if (!r.toLoad.length)
                    return r.pending.length || s(),
                    null;
                r.toLoad.forEach(e => {
                    this.loadOne(e)
                }
                )
            }
            load(e, t, i) {
                this.prepareLoading(e, t, {}, i)
            }
            reload(e, t, i) {
                this.prepareLoading(e, t, {
                    reload: !0
                }, i)
            }
            loadOne(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                  , i = e.split("|")
                  , s = i[0]
                  , r = i[1];
                this.read(s, r, "read", void 0, void 0, (i, n) => {
                    i && this.logger.warn(`${t}loading namespace ${r} for language ${s} failed`, i),
                    !i && n && this.logger.log(`${t}loaded namespace ${r} for language ${s}`, n),
                    this.loaded(e, i, n)
                }
                )
            }
            saveMissing(e, t, i, s, r) {
                let n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {}
                  , o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : () => {}
                ;
                if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(t))
                    return void this.logger.warn(`did not save key "${i}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
                if (null != i && "" !== i) {
                    if (this.backend?.create) {
                        let a = {
                            ...n,
                            isUpdate: r
                        }
                          , l = this.backend.create.bind(this.backend);
                        if (l.length < 6)
                            try {
                                let r;
                                (r = 5 === l.length ? l(e, t, i, s, a) : l(e, t, i, s)) && "function" == typeof r.then ? r.then(e => o(null, e)).catch(o) : o(null, r)
                            } catch (e) {
                                o(e)
                            }
                        else
                            l(e, t, i, s, o, a)
                    }
                    e && e[0] && this.store.addResource(e[0], t, i, s)
                }
            }
        }
          , ea = () => ({
            debug: !1,
            initAsync: !0,
            ns: ["translation"],
            defaultNS: ["translation"],
            fallbackLng: ["dev"],
            fallbackNS: !1,
            supportedLngs: !1,
            nonExplicitSupportedLngs: !1,
            load: "all",
            preload: !1,
            simplifyPluralSuffix: !0,
            keySeparator: ".",
            nsSeparator: ":",
            pluralSeparator: "_",
            contextSeparator: "_",
            partialBundledLanguages: !1,
            saveMissing: !1,
            updateMissing: !1,
            saveMissingTo: "fallback",
            saveMissingPlurals: !0,
            missingKeyHandler: !1,
            missingInterpolationHandler: !1,
            postProcess: !1,
            postProcessPassResolved: !1,
            returnNull: !1,
            returnEmptyString: !0,
            returnObjects: !1,
            joinArrays: !1,
            returnedObjectHandler: !1,
            parseMissingKeyHandler: !1,
            appendNamespaceToMissingKey: !1,
            appendNamespaceToCIMode: !1,
            overloadTranslationOptionHandler: e => {
                let t = {};
                if ("object" == typeof e[1] && (t = e[1]),
                C(e[1]) && (t.defaultValue = e[1]),
                C(e[2]) && (t.tDescription = e[2]),
                "object" == typeof e[2] || "object" == typeof e[3]) {
                    let i = e[3] || e[2];
                    Object.keys(i).forEach(e => {
                        t[e] = i[e]
                    }
                    )
                }
                return t
            }
            ,
            interpolation: {
                escapeValue: !0,
                format: e => e,
                prefix: "{{",
                suffix: "}}",
                formatSeparator: ",",
                unescapePrefix: "-",
                nestingPrefix: "$t(",
                nestingSuffix: ")",
                nestingOptionsSeparator: ",",
                maxReplaces: 1e3,
                skipOnVariables: !0
            }
        })
          , el = e => (C(e.ns) && (e.ns = [e.ns]),
        C(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]),
        C(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]),
        e.supportedLngs?.indexOf?.("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])),
        "boolean" == typeof e.initImmediate && (e.initAsync = e.initImmediate),
        e)
          , ec = () => {}
          , ed = class e extends K {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = arguments.length > 1 ? arguments[1] : void 0;
                if (super(),
                this.options = el(e),
                this.services = {},
                this.logger = B,
                this.modules = {
                    external: []
                },
                (e => {
                    Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(t => {
                        "function" == typeof e[t] && (e[t] = e[t].bind(e))
                    }
                    )
                }
                )(this),
                t && !this.isInitialized && !e.isClone) {
                    if (!this.options.initAsync)
                        return this.init(e, t),
                        this;
                    setTimeout( () => {
                        this.init(e, t)
                    }
                    , 0)
                }
            }
            init() {
                var e = this;
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , i = arguments.length > 1 ? arguments[1] : void 0;
                this.isInitializing = !0,
                "function" == typeof t && (i = t,
                t = {}),
                null == t.defaultNS && t.ns && (C(t.ns) ? t.defaultNS = t.ns : 0 > t.ns.indexOf("translation") && (t.defaultNS = t.ns[0]));
                let s = ea();
                this.options = {
                    ...s,
                    ...this.options,
                    ...el(t)
                },
                this.options.interpolation = {
                    ...s.interpolation,
                    ...this.options.interpolation
                },
                void 0 !== t.keySeparator && (this.options.userDefinedKeySeparator = t.keySeparator),
                void 0 !== t.nsSeparator && (this.options.userDefinedNsSeparator = t.nsSeparator);
                let r = e => e ? "function" == typeof e ? new e : e : null;
                if (!this.options.isClone) {
                    let t;
                    this.modules.logger ? B.init(r(this.modules.logger), this.options) : B.init(null, this.options),
                    t = this.modules.formatter ? this.modules.formatter : en;
                    let i = new Q(this.options);
                    this.store = new q(this.options.resources,this.options);
                    let n = this.services;
                    n.logger = B,
                    n.resourceStore = this.store,
                    n.languageUtils = i,
                    n.pluralResolver = new ee(i,{
                        prepend: this.options.pluralSeparator,
                        simplifyPluralSuffix: this.options.simplifyPluralSuffix
                    }),
                    t && (!this.options.interpolation.format || this.options.interpolation.format === s.interpolation.format) && (n.formatter = r(t),
                    n.formatter.init(n, this.options),
                    this.options.interpolation.format = n.formatter.format.bind(n.formatter)),
                    n.interpolator = new es(this.options),
                    n.utils = {
                        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
                    },
                    n.backendConnector = new eo(r(this.modules.backend),n.resourceStore,n,this.options),
                    n.backendConnector.on("*", function(t) {
                        for (var i = arguments.length, s = Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
                            s[r - 1] = arguments[r];
                        e.emit(t, ...s)
                    }),
                    this.modules.languageDetector && (n.languageDetector = r(this.modules.languageDetector),
                    n.languageDetector.init && n.languageDetector.init(n, this.options.detection, this.options)),
                    this.modules.i18nFormat && (n.i18nFormat = r(this.modules.i18nFormat),
                    n.i18nFormat.init && n.i18nFormat.init(this)),
                    this.translator = new Y(this.services,this.options),
                    this.translator.on("*", function(t) {
                        for (var i = arguments.length, s = Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
                            s[r - 1] = arguments[r];
                        e.emit(t, ...s)
                    }),
                    this.modules.external.forEach(e => {
                        e.init && e.init(this)
                    }
                    )
                }
                if (this.format = this.options.interpolation.format,
                i || (i = ec),
                this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
                    let e = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                    e.length > 0 && "dev" !== e[0] && (this.options.lng = e[0])
                }
                this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined"),
                ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(t => {
                    this[t] = function() {
                        return e.store[t](...arguments)
                    }
                }
                ),
                ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(t => {
                    this[t] = function() {
                        return e.store[t](...arguments),
                        e
                    }
                }
                );
                let n = S()
                  , o = () => {
                    let e = (e, t) => {
                        this.isInitializing = !1,
                        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"),
                        this.isInitialized = !0,
                        this.options.isClone || this.logger.log("initialized", this.options),
                        this.emit("initialized", this.options),
                        n.resolve(t),
                        i(e, t)
                    }
                    ;
                    if (this.languages && !this.isInitialized)
                        return e(null, this.t.bind(this));
                    this.changeLanguage(this.options.lng, e)
                }
                ;
                return this.options.resources || !this.options.initAsync ? o() : setTimeout(o, 0),
                n
            }
            loadResources(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ec
                  , i = t
                  , s = C(e) ? e : this.language;
                if ("function" == typeof e && (i = e),
                !this.options.resources || this.options.partialBundledLanguages) {
                    if (s?.toLowerCase() === "cimode" && (!this.options.preload || 0 === this.options.preload.length))
                        return i();
                    let e = []
                      , t = t => {
                        t && "cimode" !== t && this.services.languageUtils.toResolveHierarchy(t).forEach(t => {
                            "cimode" !== t && 0 > e.indexOf(t) && e.push(t)
                        }
                        )
                    }
                    ;
                    s ? t(s) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(e => t(e)),
                    this.options.preload?.forEach?.(e => t(e)),
                    this.services.backendConnector.load(e, this.options.ns, e => {
                        e || this.resolvedLanguage || !this.language || this.setResolvedLanguage(this.language),
                        i(e)
                    }
                    )
                } else
                    i(null)
            }
            reloadResources(e, t, i) {
                let s = S();
                return "function" == typeof e && (i = e,
                e = void 0),
                "function" == typeof t && (i = t,
                t = void 0),
                e || (e = this.languages),
                t || (t = this.options.ns),
                i || (i = ec),
                this.services.backendConnector.reload(e, t, e => {
                    s.resolve(),
                    i(e)
                }
                ),
                s
            }
            use(e) {
                if (!e)
                    throw Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
                if (!e.type)
                    throw Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
                return "backend" === e.type && (this.modules.backend = e),
                ("logger" === e.type || e.log && e.warn && e.error) && (this.modules.logger = e),
                "languageDetector" === e.type && (this.modules.languageDetector = e),
                "i18nFormat" === e.type && (this.modules.i18nFormat = e),
                "postProcessor" === e.type && W.addPostProcessor(e),
                "formatter" === e.type && (this.modules.formatter = e),
                "3rdParty" === e.type && this.modules.external.push(e),
                this
            }
            setResolvedLanguage(e) {
                if (e && this.languages && !(["cimode", "dev"].indexOf(e) > -1))
                    for (let e = 0; e < this.languages.length; e++) {
                        let t = this.languages[e];
                        if (!(["cimode", "dev"].indexOf(t) > -1) && this.store.hasLanguageSomeTranslations(t)) {
                            this.resolvedLanguage = t;
                            break
                        }
                    }
            }
            changeLanguage(e, t) {
                var i = this;
                this.isLanguageChangingTo = e;
                let s = S();
                this.emit("languageChanging", e);
                let r = e => {
                    this.language = e,
                    this.languages = this.services.languageUtils.toResolveHierarchy(e),
                    this.resolvedLanguage = void 0,
                    this.setResolvedLanguage(e)
                }
                  , n = (e, n) => {
                    n ? (r(n),
                    this.translator.changeLanguage(n),
                    this.isLanguageChangingTo = void 0,
                    this.emit("languageChanged", n),
                    this.logger.log("languageChanged", n)) : this.isLanguageChangingTo = void 0,
                    s.resolve(function() {
                        return i.t(...arguments)
                    }),
                    t && t(e, function() {
                        return i.t(...arguments)
                    })
                }
                  , o = t => {
                    e || t || !this.services.languageDetector || (t = []);
                    let i = C(t) ? t : this.services.languageUtils.getBestMatchFromCodes(t);
                    i && (this.language || r(i),
                    this.translator.language || this.translator.changeLanguage(i),
                    this.services.languageDetector?.cacheUserLanguage?.(i)),
                    this.loadResources(i, e => {
                        n(e, i)
                    }
                    )
                }
                ;
                return e || !this.services.languageDetector || this.services.languageDetector.async ? !e && this.services.languageDetector && this.services.languageDetector.async ? 0 === this.services.languageDetector.detect.length ? this.services.languageDetector.detect().then(o) : this.services.languageDetector.detect(o) : o(e) : o(this.services.languageDetector.detect()),
                s
            }
            getFixedT(e, t, i) {
                var s = this;
                let r = function(e, t) {
                    let n, o;
                    if ("object" != typeof t) {
                        for (var a = arguments.length, l = Array(a > 2 ? a - 2 : 0), c = 2; c < a; c++)
                            l[c - 2] = arguments[c];
                        n = s.options.overloadTranslationOptionHandler([e, t].concat(l))
                    } else
                        n = {
                            ...t
                        };
                    n.lng = n.lng || r.lng,
                    n.lngs = n.lngs || r.lngs,
                    n.ns = n.ns || r.ns,
                    "" !== n.keyPrefix && (n.keyPrefix = n.keyPrefix || i || r.keyPrefix);
                    let d = s.options.keySeparator || ".";
                    return o = n.keyPrefix && Array.isArray(e) ? e.map(e => `${n.keyPrefix}${d}${e}`) : n.keyPrefix ? `${n.keyPrefix}${d}${e}` : e,
                    s.t(o, n)
                };
                return C(e) ? r.lng = e : r.lngs = e,
                r.ns = t,
                r.keyPrefix = i,
                r
            }
            t() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                    t[i] = arguments[i];
                return this.translator?.translate(...t)
            }
            exists() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                    t[i] = arguments[i];
                return this.translator?.exists(...t)
            }
            setDefaultNamespace(e) {
                this.options.defaultNS = e
            }
            hasLoadedNamespace(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (!this.isInitialized)
                    return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages),
                    !1;
                if (!this.languages || !this.languages.length)
                    return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages),
                    !1;
                let i = t.lng || this.resolvedLanguage || this.languages[0]
                  , s = !!this.options && this.options.fallbackLng
                  , r = this.languages[this.languages.length - 1];
                if ("cimode" === i.toLowerCase())
                    return !0;
                let n = (e, t) => {
                    let i = this.services.backendConnector.state[`${e}|${t}`];
                    return -1 === i || 0 === i || 2 === i
                }
                ;
                if (t.precheck) {
                    let e = t.precheck(this, n);
                    if (void 0 !== e)
                        return e
                }
                return !!(this.hasResourceBundle(i, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || n(i, e) && (!s || n(r, e)))
            }
            loadNamespaces(e, t) {
                let i = S();
                return this.options.ns ? (C(e) && (e = [e]),
                e.forEach(e => {
                    0 > this.options.ns.indexOf(e) && this.options.ns.push(e)
                }
                ),
                this.loadResources(e => {
                    i.resolve(),
                    t && t(e)
                }
                ),
                i) : (t && t(),
                Promise.resolve())
            }
            loadLanguages(e, t) {
                let i = S();
                C(e) && (e = [e]);
                let s = this.options.preload || []
                  , r = e.filter(e => 0 > s.indexOf(e) && this.services.languageUtils.isSupportedCode(e));
                return r.length ? (this.options.preload = s.concat(r),
                this.loadResources(e => {
                    i.resolve(),
                    t && t(e)
                }
                ),
                i) : (t && t(),
                Promise.resolve())
            }
            dir(e) {
                return (e || (e = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language)),
                e) ? ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"].indexOf((this.services?.languageUtils || new Q(ea())).getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr" : "rtl"
            }
            static createInstance() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , i = arguments.length > 1 ? arguments[1] : void 0;
                return new e(t,i)
            }
            cloneInstance() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ec
                  , s = t.forkResourceStore;
                s && delete t.forkResourceStore;
                let r = {
                    ...this.options,
                    ...t,
                    isClone: !0
                }
                  , n = new e(r);
                return (void 0 !== t.debug || void 0 !== t.prefix) && (n.logger = n.logger.clone(t)),
                ["store", "services", "language"].forEach(e => {
                    n[e] = this[e]
                }
                ),
                n.services = {
                    ...this.services
                },
                n.services.utils = {
                    hasLoadedNamespace: n.hasLoadedNamespace.bind(n)
                },
                s && (n.store = new q(Object.keys(this.store.data).reduce( (e, t) => (e[t] = {
                    ...this.store.data[t]
                },
                Object.keys(e[t]).reduce( (i, s) => (i[s] = {
                    ...e[t][s]
                },
                i), {})), {}),r),
                n.services.resourceStore = n.store),
                n.translator = new Y(n.services,r),
                n.translator.on("*", function(e) {
                    for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
                        i[s - 1] = arguments[s];
                    n.emit(e, ...i)
                }),
                n.init(r, i),
                n.translator.options = r,
                n.translator.backendConnector.services.utils = {
                    hasLoadedNamespace: n.hasLoadedNamespace.bind(n)
                },
                n
            }
            toJSON() {
                return {
                    options: this.options,
                    store: this.store,
                    language: this.language,
                    languages: this.languages,
                    resolvedLanguage: this.resolvedLanguage
                }
            }
        }
          , eh = ed.createInstance();
        eh.createInstance = ed.createInstance,
        eh.createInstance,
        eh.dir,
        eh.init,
        eh.loadResources,
        eh.reloadResources,
        eh.use,
        eh.changeLanguage,
        eh.getFixedT,
        eh.t,
        eh.exists,
        eh.setDefaultNamespace,
        eh.hasLoadedNamespace,
        eh.loadNamespaces,
        eh.loadLanguages;
        var ep = ["en", "zh-CN", "de-DE", "pt-BR", "es-ES", "fr-FR", "id-ID", "it-IT", "ja-JP", "ko-KR", "ru-RU", "ar-SA", "tr-TR"]
          , eu = ["ar-SA"]
          , eg = {
            en: {
                "eu.banner.body.beforePolicy": "We use cookies to keep our platform running and we only use non-essential cookies if you enable them. By choosing Accept All, you consent to your use of all cookies as described in our ",
                "eu.banner.body.beforePreferences": ". You can also Reject All non-essential cookies or ",
                "eu.banner.body.afterPreferences": " at any time.",
                "eu.banner.preferencesLink": "Manage Your Preferences",
                "eu.banner.policyLink": "Cookie\xa0Policy",
                "eu.banner.acceptAll": "Accept All",
                "eu.banner.rejectAll": "Reject All",
                "notice.body": "We use cookies to improve your experience on our platform. By continuing to use our site, you agree to our use of cookies.",
                "notice.learnMore": "Learn more",
                "notice.gotIt": "Got It",
                "notice.close": "Close",
                "pref.title": "Cookie Preferences",
                "pref.intro": "Choose which cookies you allow. Strictly necessary cookies are always on — they keep the platform running. You can update your preferences at any time.",
                "pref.save": "Save Preferences",
                "pref.close": "Close",
                "pref.alwaysOn": "Always On",
                "pref.necessary.title": "Strictly Necessary Cookies",
                "pref.necessary.desc": "These cookies are essential for the platform to function and cannot be switched off. They are set in response to actions you take, such as logging in or saving your preferences, and cannot be disabled.",
                "pref.functional.title": "Functional Cookies",
                "pref.functional.desc": "These cookies allow the platform to remember your choices and provide enhanced, personalized features such as language preferences and UI settings. Disabling them may affect some platform functionality.",
                "pref.analytics.title": "Analytics Cookies",
                "pref.analytics.desc": "These cookies help us understand how visitors use our platform by collecting anonymized usage data. This information helps us improve our products and user experience.",
                "pref.advertising.title": "Advertising Cookies",
                "pref.advertising.desc": "These cookies are set by our advertising partners to build a profile of your interests and show you relevant ads on other sites. They do not store personal data directly but uniquely identify your browser and device.",
                "blocked.message": "Due to legal requirements, our services are not available in your region.",
                "blocked.ok": "OK"
            },
            "zh-CN": {
                "eu.banner.body.beforePolicy": "我们使用 Cookie 以保障平台正常运行；非必要 Cookie 仅在您启用时使用。选择「全部接受」即表示您同意按照",
                "eu.banner.body.beforePreferences": "中的说明使用全部 Cookie。您也可「全部拒绝」非必要 Cookie，或随时",
                "eu.banner.body.afterPreferences": "。",
                "eu.banner.preferencesLink": "管理 Cookie 偏好",
                "eu.banner.policyLink": "Cookie 政策",
                "eu.banner.acceptAll": "全部接受",
                "eu.banner.rejectAll": "全部拒绝",
                "notice.body": "我们使用 Cookie 以改善您在本平台的使用体验。继续浏览即表示您同意我们使用 Cookie。",
                "notice.learnMore": "了解更多",
                "notice.gotIt": "知道了",
                "notice.close": "关闭",
                "pref.title": "Cookie 偏好",
                "pref.intro": "请选择允许的 Cookie。绝对必要的 Cookie 将始终保持开启，以保障平台正常运行。您可随时更新偏好设置。",
                "pref.save": "保存偏好",
                "pref.close": "关闭",
                "pref.alwaysOn": "始终开启",
                "pref.necessary.title": "绝对必要",
                "pref.necessary.desc": "这些 Cookie 对平台运行必不可少，无法关闭。它们会在您执行登录或保存偏好等操作时设置。",
                "pref.functional.title": "功能性",
                "pref.functional.desc": "这些 Cookie 用于记住您的选择并提供增强的个性化功能（如语言与界面设置）。关闭后可能影响部分功能。",
                "pref.analytics.title": "分析",
                "pref.analytics.desc": "这些 Cookie 通过收集匿名使用数据，帮助我们了解访客如何使用平台，以改进产品与体验。",
                "pref.advertising.title": "广告",
                "pref.advertising.desc": "这些 Cookie 由广告合作伙伴设置，用于建立兴趣画像并在其他网站展示相关广告。它们不直接存储个人数据，但会唯一标识您的浏览器与设备。",
                "blocked.message": "根据法务要求，您所在地区暂无法访问我们的服务。",
                "blocked.ok": "知道了"
            },
            "de-DE": {
                "eu.banner.body.beforePolicy": "Wir verwenden Cookies, um unsere Plattform betriebsbereit zu halten, und nicht notwendige Cookies nur, wenn Sie diese aktivieren. Mit „Alle akzeptieren“ stimmen Sie der Verwendung aller Cookies gem\xe4\xdf unserer ",
                "eu.banner.body.beforePreferences": " zu. Sie k\xf6nnen nicht notwendige Cookies auch ablehnen oder jederzeit Ihre ",
                "eu.banner.body.afterPreferences": " verwalten.",
                "eu.banner.preferencesLink": "Einstellungen verwalten",
                "eu.banner.policyLink": "Cookie-Richtlinie",
                "eu.banner.acceptAll": "Alle akzeptieren",
                "eu.banner.rejectAll": "Alle ablehnen",
                "notice.body": "Wir verwenden Cookies, um Ihre Erfahrung auf unserer Plattform zu verbessern. Durch die weitere Nutzung stimmen Sie der Verwendung von Cookies zu.",
                "notice.learnMore": "Mehr erfahren",
                "notice.gotIt": "Verstanden",
                "notice.close": "Schlie\xdfen",
                "pref.title": "Cookie-Einstellungen",
                "pref.intro": "W\xe4hlen Sie, welche Cookies Sie zulassen. Unbedingt erforderliche Cookies sind immer aktiv — sie halten die Plattform betriebsbereit. Sie k\xf6nnen Ihre Einstellungen jederzeit aktualisieren.",
                "pref.save": "Einstellungen speichern",
                "pref.close": "Schlie\xdfen",
                "pref.alwaysOn": "Immer aktiv",
                "pref.necessary.title": "Unbedingt erforderliche Cookies",
                "pref.necessary.desc": "Diese Cookies sind f\xfcr das Funktionieren der Plattform unerl\xe4sslich und k\xf6nnen nicht deaktiviert werden. Sie werden als Reaktion auf Ihre Aktionen gesetzt, z. B. Anmeldung oder Speichern von Einstellungen.",
                "pref.functional.title": "Funktionale Cookies",
                "pref.functional.desc": "Diese Cookies erm\xf6glichen es der Plattform, Ihre Auswahl zu speichern und erweiterte, personalisierte Funktionen bereitzustellen, z. B. Sprach- und UI-Einstellungen. Eine Deaktivierung kann einige Funktionen beeintr\xe4chtigen.",
                "pref.analytics.title": "Analyse-Cookies",
                "pref.analytics.desc": "Diese Cookies helfen uns zu verstehen, wie Besucher unsere Plattform nutzen, indem anonymisierte Nutzungsdaten erhoben werden. Diese Informationen helfen uns, unsere Produkte und das Nutzererlebnis zu verbessern.",
                "pref.advertising.title": "Werbe-Cookies",
                "pref.advertising.desc": "Diese Cookies werden von Werbepartnern gesetzt, um ein Profil Ihrer Interessen zu erstellen und Ihnen relevante Anzeigen auf anderen Websites zu zeigen. Sie speichern keine personenbezogenen Daten direkt, identifizieren aber eindeutig Ihren Browser und Ihr Ger\xe4t.",
                "blocked.message": "Aufgrund gesetzlicher Anforderungen sind unsere Dienste in Ihrer Region nicht verf\xfcgbar.",
                "blocked.ok": "OK"
            },
            "pt-BR": {
                "eu.banner.body.beforePolicy": "Usamos cookies para manter nossa plataforma funcionando e s\xf3 usamos cookies n\xe3o essenciais se voc\xea os habilitar. Ao escolher Aceitar tudo, voc\xea consente com o uso de todos os cookies conforme descrito em nossa ",
                "eu.banner.body.beforePreferences": ". Voc\xea tamb\xe9m pode Rejeitar todos os cookies n\xe3o essenciais ou ",
                "eu.banner.body.afterPreferences": " a qualquer momento.",
                "eu.banner.preferencesLink": "Gerenciar prefer\xeancias",
                "eu.banner.policyLink": "Pol\xedtica de Cookies",
                "eu.banner.acceptAll": "Aceitar tudo",
                "eu.banner.rejectAll": "Rejeitar tudo",
                "notice.body": "Usamos cookies para melhorar sua experi\xeancia em nossa plataforma. Ao continuar usando nosso site, voc\xea concorda com o uso de cookies.",
                "notice.learnMore": "Saiba mais",
                "notice.gotIt": "Entendi",
                "notice.close": "Fechar",
                "pref.title": "Prefer\xeancias de cookies",
                "pref.intro": "Escolha quais cookies voc\xea permite. Cookies estritamente necess\xe1rios est\xe3o sempre ativos — eles mant\xeam a plataforma funcionando. Voc\xea pode atualizar suas prefer\xeancias a qualquer momento.",
                "pref.save": "Salvar prefer\xeancias",
                "pref.close": "Fechar",
                "pref.alwaysOn": "Sempre ativo",
                "pref.necessary.title": "Cookies estritamente necess\xe1rios",
                "pref.necessary.desc": "Esses cookies s\xe3o essenciais para o funcionamento da plataforma e n\xe3o podem ser desativados. Eles s\xe3o definidos em resposta a a\xe7\xf5es que voc\xea realiza, como fazer login ou salvar prefer\xeancias.",
                "pref.functional.title": "Cookies funcionais",
                "pref.functional.desc": "Esses cookies permitem que a plataforma lembre suas escolhas e ofere\xe7a recursos aprimorados e personalizados, como prefer\xeancias de idioma e configura\xe7\xf5es da interface. Desativ\xe1-los pode afetar algumas funcionalidades.",
                "pref.analytics.title": "Cookies anal\xedticos",
                "pref.analytics.desc": "Esses cookies nos ajudam a entender como os visitantes usam nossa plataforma, coletando dados de uso anonimizados. Essas informa\xe7\xf5es nos ajudam a melhorar nossos produtos e a experi\xeancia do usu\xe1rio.",
                "pref.advertising.title": "Cookies de publicidade",
                "pref.advertising.desc": "Esses cookies s\xe3o definidos por nossos parceiros de publicidade para criar um perfil dos seus interesses e mostrar an\xfancios relevantes em outros sites. Eles n\xe3o armazenam dados pessoais diretamente, mas identificam de forma exclusiva seu navegador e dispositivo.",
                "blocked.message": "Devido a requisitos legais, nossos servi\xe7os n\xe3o est\xe3o dispon\xedveis em sua regi\xe3o.",
                "blocked.ok": "OK"
            },
            "es-ES": {
                "eu.banner.body.beforePolicy": "Usamos cookies para mantener nuestra plataforma en funcionamiento y solo usamos cookies no esenciales si las habilitas. Al elegir Aceptar todo, consientes el uso de todas las cookies seg\xfan se describe en nuestra ",
                "eu.banner.body.beforePreferences": ". Tambi\xe9n puedes Rechazar todas las cookies no esenciales o ",
                "eu.banner.body.afterPreferences": " en cualquier momento.",
                "eu.banner.preferencesLink": "Gestionar preferencias",
                "eu.banner.policyLink": "Pol\xedtica de cookies",
                "eu.banner.acceptAll": "Aceptar todo",
                "eu.banner.rejectAll": "Rechazar todo",
                "notice.body": "Usamos cookies para mejorar tu experiencia en nuestra plataforma. Al continuar usando nuestro sitio, aceptas el uso de cookies.",
                "notice.learnMore": "M\xe1s informaci\xf3n",
                "notice.gotIt": "Entendido",
                "notice.close": "Cerrar",
                "pref.title": "Preferencias de cookies",
                "pref.intro": "Elige qu\xe9 cookies permites. Las cookies estrictamente necesarias est\xe1n siempre activas — mantienen la plataforma en funcionamiento. Puedes actualizar tus preferencias en cualquier momento.",
                "pref.save": "Guardar preferencias",
                "pref.close": "Cerrar",
                "pref.alwaysOn": "Siempre activo",
                "pref.necessary.title": "Cookies estrictamente necesarias",
                "pref.necessary.desc": "Estas cookies son esenciales para el funcionamiento de la plataforma y no se pueden desactivar. Se establecen en respuesta a acciones que realizas, como iniciar sesi\xf3n o guardar preferencias.",
                "pref.functional.title": "Cookies funcionales",
                "pref.functional.desc": "Estas cookies permiten que la plataforma recuerde tus elecciones y ofrezca funciones mejoradas y personalizadas, como preferencias de idioma y configuraci\xf3n de la interfaz. Desactivarlas puede afectar algunas funcionalidades.",
                "pref.analytics.title": "Cookies anal\xedticas",
                "pref.analytics.desc": "Estas cookies nos ayudan a entender c\xf3mo los visitantes usan nuestra plataforma recopilando datos de uso anonimizados. Esta informaci\xf3n nos ayuda a mejorar nuestros productos y la experiencia del usuario.",
                "pref.advertising.title": "Cookies publicitarias",
                "pref.advertising.desc": "Estas cookies las establecen nuestros socios publicitarios para crear un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios. No almacenan datos personales directamente, pero identifican de forma \xfanica tu navegador y dispositivo.",
                "blocked.message": "Por requisitos legales, nuestros servicios no est\xe1n disponibles en tu regi\xf3n.",
                "blocked.ok": "OK"
            },
            "fr-FR": {
                "eu.banner.body.beforePolicy": "Nous utilisons des cookies pour maintenir notre plateforme en fonctionnement et n'utilisons des cookies non essentiels que si vous les activez. En choisissant Tout accepter, vous consentez \xe0 l'utilisation de tous les cookies tels que d\xe9crits dans notre ",
                "eu.banner.body.beforePreferences": ". Vous pouvez aussi Tout refuser ou ",
                "eu.banner.body.afterPreferences": " \xe0 tout moment.",
                "eu.banner.preferencesLink": "G\xe9rer vos pr\xe9f\xe9rences",
                "eu.banner.policyLink": "Politique relative aux cookies",
                "eu.banner.acceptAll": "Tout accepter",
                "eu.banner.rejectAll": "Tout refuser",
                "notice.body": "Nous utilisons des cookies pour am\xe9liorer votre exp\xe9rience sur notre plateforme. En continuant \xe0 utiliser notre site, vous acceptez notre utilisation des cookies.",
                "notice.learnMore": "En savoir plus",
                "notice.gotIt": "Compris",
                "notice.close": "Fermer",
                "pref.title": "Pr\xe9f\xe9rences cookies",
                "pref.intro": "Choisissez les cookies que vous autorisez. Les cookies strictement n\xe9cessaires sont toujours activ\xe9s — ils maintiennent la plateforme en fonctionnement. Vous pouvez mettre \xe0 jour vos pr\xe9f\xe9rences \xe0 tout moment.",
                "pref.save": "Enregistrer les pr\xe9f\xe9rences",
                "pref.close": "Fermer",
                "pref.alwaysOn": "Toujours activ\xe9",
                "pref.necessary.title": "Cookies strictement n\xe9cessaires",
                "pref.necessary.desc": "Ces cookies sont essentiels au fonctionnement de la plateforme et ne peuvent pas \xeatre d\xe9sactiv\xe9s. Ils sont d\xe9finis en r\xe9ponse \xe0 vos actions, comme la connexion ou l'enregistrement de pr\xe9f\xe9rences.",
                "pref.functional.title": "Cookies fonctionnels",
                "pref.functional.desc": "Ces cookies permettent \xe0 la plateforme de m\xe9moriser vos choix et de fournir des fonctionnalit\xe9s am\xe9lior\xe9es et personnalis\xe9es, comme les pr\xe9f\xe9rences linguistiques et les param\xe8tres de l'interface. Les d\xe9sactiver peut affecter certaines fonctionnalit\xe9s.",
                "pref.analytics.title": "Cookies analytiques",
                "pref.analytics.desc": "Ces cookies nous aident \xe0 comprendre comment les visiteurs utilisent notre plateforme en collectant des donn\xe9es d'utilisation anonymis\xe9es. Ces informations nous aident \xe0 am\xe9liorer nos produits et l'exp\xe9rience utilisateur.",
                "pref.advertising.title": "Cookies publicitaires",
                "pref.advertising.desc": "Ces cookies sont d\xe9finis par nos partenaires publicitaires pour \xe9tablir un profil de vos int\xe9r\xeats et vous montrer des publicit\xe9s pertinentes sur d'autres sites. Ils ne stockent pas directement de donn\xe9es personnelles, mais identifient de mani\xe8re unique votre navigateur et votre appareil.",
                "blocked.message": "En raison d'exigences l\xe9gales, nos services ne sont pas disponibles dans votre r\xe9gion.",
                "blocked.ok": "OK"
            },
            "id-ID": {
                "eu.banner.body.beforePolicy": "Kami menggunakan cookie untuk menjaga platform kami berjalan dan hanya menggunakan cookie non-esensial jika Anda mengaktifkannya. Dengan memilih Terima Semua, Anda menyetujui penggunaan semua cookie sebagaimana dijelaskan dalam ",
                "eu.banner.body.beforePreferences": " kami. Anda juga dapat Menolak Semua cookie non-esensial atau ",
                "eu.banner.body.afterPreferences": " kapan saja.",
                "eu.banner.preferencesLink": "Kelola preferensi",
                "eu.banner.policyLink": "Kebijakan Cookie",
                "eu.banner.acceptAll": "Terima Semua",
                "eu.banner.rejectAll": "Tolak Semua",
                "notice.body": "Kami menggunakan cookie untuk meningkatkan pengalaman Anda di platform kami. Dengan terus menggunakan situs kami, Anda setuju dengan penggunaan cookie.",
                "notice.learnMore": "Pelajari lebih lanjut",
                "notice.gotIt": "Mengerti",
                "notice.close": "Tutup",
                "pref.title": "Preferensi Cookie",
                "pref.intro": "Pilih cookie yang Anda izinkan. Cookie yang sangat diperlukan selalu aktif — mereka menjaga platform berjalan. Anda dapat memperbarui preferensi kapan saja.",
                "pref.save": "Simpan preferensi",
                "pref.close": "Tutup",
                "pref.alwaysOn": "Selalu Aktif",
                "pref.necessary.title": "Cookie yang Sangat Diperlukan",
                "pref.necessary.desc": "Cookie ini penting agar platform berfungsi dan tidak dapat dimatikan. Cookie ini disetel sebagai respons terhadap tindakan Anda, seperti masuk atau menyimpan preferensi.",
                "pref.functional.title": "Cookie Fungsional",
                "pref.functional.desc": "Cookie ini memungkinkan platform mengingat pilihan Anda dan memberikan fitur yang ditingkatkan dan dipersonalisasi, seperti preferensi bahasa dan pengaturan UI. Menonaktifkannya dapat memengaruhi beberapa fungsi platform.",
                "pref.analytics.title": "Cookie Analitik",
                "pref.analytics.desc": "Cookie ini membantu kami memahami bagaimana pengunjung menggunakan platform kami dengan mengumpulkan data penggunaan anonim. Informasi ini membantu kami meningkatkan produk dan pengalaman pengguna.",
                "pref.advertising.title": "Cookie Iklan",
                "pref.advertising.desc": "Cookie ini disetel oleh mitra periklanan kami untuk membangun profil minat Anda dan menampilkan iklan relevan di situs lain. Cookie ini tidak menyimpan data pribadi secara langsung, tetapi mengidentifikasi browser dan perangkat Anda secara unik.",
                "blocked.message": "Karena persyaratan hukum, layanan kami tidak tersedia di wilayah Anda.",
                "blocked.ok": "OK"
            },
            "it-IT": {
                "eu.banner.body.beforePolicy": "Utilizziamo i cookie per mantenere la piattaforma operativa e usiamo cookie non essenziali solo se li abiliti. Scegliendo Accetta tutto, acconsenti all'uso di tutti i cookie come descritto nella nostra ",
                "eu.banner.body.beforePreferences": ". Puoi anche Rifiuta tutto i cookie non essenziali o ",
                "eu.banner.body.afterPreferences": " in qualsiasi momento.",
                "eu.banner.preferencesLink": "Gestisci preferenze",
                "eu.banner.policyLink": "Informativa sui cookie",
                "eu.banner.acceptAll": "Accetta tutto",
                "eu.banner.rejectAll": "Rifiuta tutto",
                "notice.body": "Utilizziamo i cookie per migliorare la tua esperienza sulla nostra piattaforma. Continuando a utilizzare il nostro sito, accetti l'uso dei cookie.",
                "notice.learnMore": "Scopri di pi\xf9",
                "notice.gotIt": "Ho capito",
                "notice.close": "Chiudi",
                "pref.title": "Preferenze cookie",
                "pref.intro": "Scegli quali cookie consentire. I cookie strettamente necessari sono sempre attivi — mantengono la piattaforma operativa. Puoi aggiornare le preferenze in qualsiasi momento.",
                "pref.save": "Salva preferenze",
                "pref.close": "Chiudi",
                "pref.alwaysOn": "Sempre attivo",
                "pref.necessary.title": "Cookie strettamente necessari",
                "pref.necessary.desc": "Questi cookie sono essenziali per il funzionamento della piattaforma e non possono essere disattivati. Vengono impostati in risposta alle azioni che compi, come l'accesso o il salvataggio delle preferenze.",
                "pref.functional.title": "Cookie funzionali",
                "pref.functional.desc": "Questi cookie consentono alla piattaforma di ricordare le tue scelte e fornire funzionalit\xe0 avanzate e personalizzate, come preferenze linguistiche e impostazioni dell'interfaccia. Disabilitarli pu\xf2 influire su alcune funzionalit\xe0.",
                "pref.analytics.title": "Cookie analitici",
                "pref.analytics.desc": "Questi cookie ci aiutano a capire come i visitatori utilizzano la piattaforma raccogliendo dati di utilizzo anonimi. Queste informazioni ci aiutano a migliorare i prodotti e l'esperienza utente.",
                "pref.advertising.title": "Cookie pubblicitari",
                "pref.advertising.desc": "Questi cookie sono impostati dai nostri partner pubblicitari per creare un profilo dei tuoi interessi e mostrarti annunci pertinenti su altri siti. Non memorizzano direttamente dati personali, ma identificano in modo univoco browser e dispositivo.",
                "blocked.message": "Per requisiti legali, i nostri servizi non sono disponibili nella tua regione.",
                "blocked.ok": "OK"
            },
            "ja-JP": {
                "eu.banner.body.beforePolicy": "当社はプラットフォームの運営のために Cookie を使用し、非必須 Cookie はお客様が有効にした場合にのみ使用します。「すべて同意する」を選択すると、",
                "eu.banner.body.beforePreferences": " に記載のとおりすべての Cookie の使用に同意したことになります。非必須 Cookie を「すべて拒否」するか、いつでも ",
                "eu.banner.body.afterPreferences": " できます。",
                "eu.banner.preferencesLink": "設定を管理",
                "eu.banner.policyLink": "Cookie ポリシー",
                "eu.banner.acceptAll": "すべて同意",
                "eu.banner.rejectAll": "すべて拒否",
                "notice.body": "当社はプラットフォームでの体験向上のために Cookie を使用します。サイトの利用を続けることで、Cookie の使用に同意したものとみなされます。",
                "notice.learnMore": "詳細を見る",
                "notice.gotIt": "了解",
                "notice.close": "閉じる",
                "pref.title": "Cookie 設定",
                "pref.intro": "許可する Cookie を選択してください。厳密に必要な Cookie は常にオンで、プラットフォームの運営に不可欠です。設定はいつでも更新できます。",
                "pref.save": "設定を保存",
                "pref.close": "閉じる",
                "pref.alwaysOn": "常にオン",
                "pref.necessary.title": "厳密に必要な Cookie",
                "pref.necessary.desc": "これらの Cookie はプラットフォームの機能に不可欠であり、オフにできません。ログインや設定の保存など、お客様の操作に応じて設定されます。",
                "pref.functional.title": "機能 Cookie",
                "pref.functional.desc": "これらの Cookie により、言語設定や UI 設定など、お客様の選択を記憶し、パーソナライズされた機能を提供します。無効にすると一部の機能に影響する場合があります。",
                "pref.analytics.title": "分析 Cookie",
                "pref.analytics.desc": "これらの Cookie は匿名化された利用データを収集し、訪問者がプラットフォームをどのように利用しているかを把握するのに役立ちます。この情報は製品とユーザー体験の改善に使用されます。",
                "pref.advertising.title": "広告 Cookie",
                "pref.advertising.desc": "これらの Cookie は広告パートナーによって設定され、お客様の興味のプロフィールを作成し、他のサイトで関連する広告を表示します。個人データを直接保存することはありませんが、ブラウザとデバイスを一意に識別します。",
                "blocked.message": "法的要件により、お客様の地域では当社のサービスをご利用いただけません。",
                "blocked.ok": "OK"
            },
            "ko-KR": {
                "eu.banner.body.beforePolicy": "당사는 플랫폼 운영을 위해 쿠키를 사용하며, 비필수 쿠키는 귀하가 활성화한 경우에만 사용합니다. 모두 수락을 선택하면 ",
                "eu.banner.body.beforePreferences": "에 설명된 대로 모든 쿠키 사용에 동의하게 됩니다. 비필수 쿠키를 모두 거부하거나 언제든지 ",
                "eu.banner.body.afterPreferences": "할 수 있습니다.",
                "eu.banner.preferencesLink": "환경설정 관리",
                "eu.banner.policyLink": "쿠키 정책",
                "eu.banner.acceptAll": "모두 수락",
                "eu.banner.rejectAll": "모두 거부",
                "notice.body": "당사는 플랫폼에서의 경험 개선을 위해 쿠키를 사용합니다. 사이트를 계속 사용하면 쿠키 사용에 동의하는 것으로 간주됩니다.",
                "notice.learnMore": "자세히 알아보기",
                "notice.gotIt": "확인",
                "notice.close": "닫기",
                "pref.title": "쿠키 환경설정",
                "pref.intro": "허용할 쿠키를 선택하세요. 필수 쿠키는 항상 켜져 있으며 플랫폼 운영에 필요합니다. 언제든지 환경설정을 업데이트할 수 있습니다.",
                "pref.save": "환경설정 저장",
                "pref.close": "닫기",
                "pref.alwaysOn": "항상 켜짐",
                "pref.necessary.title": "필수 쿠키",
                "pref.necessary.desc": "이 쿠키는 플랫폼 기능에 필수적이며 끌 수 없습니다. 로그인 또는 환경설정 저장 등 귀하의 작업에 응답하여 설정됩니다.",
                "pref.functional.title": "기능 쿠키",
                "pref.functional.desc": "이 쿠키는 언어 및 UI 설정과 같이 귀하의 선택을 기억하고 향상된 맞춤 기능을 제공합니다. 비활성화하면 일부 기능에 영향을 줄 수 있습니다.",
                "pref.analytics.title": "분석 쿠키",
                "pref.analytics.desc": "이 쿠키는 익명화된 사용 데이터를 수집하여 방문자가 플랫폼을 어떻게 사용하는지 이해하는 데 도움이 됩니다. 이 정보는 제품과 사용자 경험 개선에 사용됩니다.",
                "pref.advertising.title": "광고 쿠키",
                "pref.advertising.desc": "이 쿠키는 광고 파트너가 설정하여 귀하의 관심사 프로필을 만들고 다른 사이트에서 관련 광고를 표시합니다. 개인 데이터를 직접 저장하지 않지만 브라우저와 기기를 고유하게 식별합니다.",
                "blocked.message": "법적 요건으로 인해 귀하의 지역에서는 당사 서비스를 이용할 수 없습니다.",
                "blocked.ok": "OK"
            },
            "ru-RU": {
                "eu.banner.body.beforePolicy": "Мы используем файлы cookie для работы платформы и необязательные cookie — только если вы их включите. Выбирая \xabПринять все\xbb, вы соглашаетесь на использование всех cookie, как описано в нашей ",
                "eu.banner.body.beforePreferences": ". Вы также можете отклонить все необязательные cookie или ",
                "eu.banner.body.afterPreferences": " в любое время.",
                "eu.banner.preferencesLink": "Управление настройками",
                "eu.banner.policyLink": "Политика cookie",
                "eu.banner.acceptAll": "Принять все",
                "eu.banner.rejectAll": "Отклонить все",
                "notice.body": "Мы используем cookie для улучшения вашего опыта на платформе. Продолжая пользоваться сайтом, вы соглашаетесь на использование cookie.",
                "notice.learnMore": "Подробнее",
                "notice.gotIt": "Понятно",
                "notice.close": "Закрыть",
                "pref.title": "Настройки cookie",
                "pref.intro": "Выберите, какие cookie разрешить. Строго необходимые cookie всегда включены — они обеспечивают работу платформы. Вы можете обновить настройки в любое время.",
                "pref.save": "Сохранить настройки",
                "pref.close": "Закрыть",
                "pref.alwaysOn": "Всегда включено",
                "pref.necessary.title": "Строго необходимые cookie",
                "pref.necessary.desc": "Эти cookie необходимы для работы платформы и не могут быть отключены. Они устанавливаются в ответ на ваши действия, такие как вход или сохранение настроек.",
                "pref.functional.title": "Функциональные cookie",
                "pref.functional.desc": "Эти cookie позволяют платформе запоминать ваш выбор и предоставлять расширенные персонализированные функции, например языковые настройки и параметры интерфейса. Отключение может повлиять на некоторые функции.",
                "pref.analytics.title": "Аналитические cookie",
                "pref.analytics.desc": "Эти cookie помогают понять, как посетители используют платформу, собирая анонимизированные данные об использовании. Эта информация помогает улучшать продукты и пользовательский опыт.",
                "pref.advertising.title": "Рекламные cookie",
                "pref.advertising.desc": "Эти cookie устанавливаются рекламными партнёрами для создания профиля ваших интересов и показа релевантной рекламы на других сайтах. Они не хранят персональные данные напрямую, но уникально идентифицируют браузер и устройство.",
                "blocked.message": "В связи с юридическими требованиями наши услуги недоступны в вашем регионе.",
                "blocked.ok": "OK"
            },
            "ar-SA": {
                "eu.banner.body.beforePolicy": "نستخدم ملفات تعريف الارتباط (Cookies) لتشغيل منصتنا، ولا نستخدم ملفات غير ضرورية إلا إذا قمت بتمكينها. باختيار \xabقبول الكل\xbb، فإنك توافق على استخدام جميع ملفات تعريف الارتباط كما هو موضح في ",
                "eu.banner.body.beforePreferences": ". يمكنك أيضًا رفض جميع الملفات غير الضرورية أو ",
                "eu.banner.body.afterPreferences": " في أي وقت.",
                "eu.banner.preferencesLink": "إدارة التفضيلات",
                "eu.banner.policyLink": "سياسة ملفات تعريف الارتباط",
                "eu.banner.acceptAll": "قبول الكل",
                "eu.banner.rejectAll": "رفض الكل",
                "notice.body": "نستخدم ملفات تعريف الارتباط لتحسين تجربتك على منصتنا. بمواصلة استخدام موقعنا، فإنك توافق على استخدام ملفات تعريف الارتباط.",
                "notice.learnMore": "اعرف المزيد",
                "notice.gotIt": "حسنًا",
                "notice.close": "إغلاق",
                "pref.title": "تفضيلات ملفات تعريف الارتباط",
                "pref.intro": "اختر ملفات تعريف الارتباط التي تسمح بها. الملفات الضرورية للغاية مفعّلة دائمًا — فهي تُبقي المنصة قيد التشغيل. يمكنك تحديث تفضيلاتك في أي وقت.",
                "pref.save": "حفظ التفضيلات",
                "pref.close": "إغلاق",
                "pref.alwaysOn": "مفعّل دائمًا",
                "pref.necessary.title": "ملفات تعريف الارتباط الضرورية للغاية",
                "pref.necessary.desc": "هذه الملفات ضرورية لعمل المنصة ولا يمكن إيقافها. يتم تعيينها استجابةً لإجراءاتك، مثل تسجيل الدخول أو حفظ التفضيلات.",
                "pref.functional.title": "ملفات تعريف الارتباط الوظيفية",
                "pref.functional.desc": "تسمح هذه الملفات للمنصة بتذكر اختياراتك وتقديم ميزات محسّنة ومخصصة، مثل تفضيلات اللغة وإعدادات الواجهة. قد يؤثر تعطيلها على بعض وظائف المنصة.",
                "pref.analytics.title": "ملفات تعريف الارتباط التحليلية",
                "pref.analytics.desc": "تساعدنا هذه الملفات على فهم كيفية استخدام الزوار لمنصتنا من خلال جمع بيانات استخدام مجهولة. تساعدنا هذه المعلومات على تحسين منتجاتنا وتجربة المستخدم.",
                "pref.advertising.title": "ملفات تعريف الارتباط الإعلانية",
                "pref.advertising.desc": "يتم تعيين هذه الملفات من قبل شركائنا الإعلانيين لبناء ملف تعريف لاهتماماتك وعرض إعلانات ذات صلة على مواقع أخرى. لا تخزّن بيانات شخصية مباشرة، لكنها تحدّد متصفحك وجهازك بشكل فريد.",
                "blocked.message": "بسبب المتطلبات القانونية، خدماتنا غير متاحة في منطقتك.",
                "blocked.ok": "موافق"
            },
            "tr-TR": {
                "eu.banner.body.beforePolicy": "Platformumuzu \xe7alışır tutmak i\xe7in \xe7erezler kullanıyoruz ve zorunlu olmayan \xe7erezleri yalnızca etkinleştirdiğinizde kullanıyoruz. T\xfcm\xfcn\xfc kabul et'i se\xe7erek, ",
                "eu.banner.body.beforePreferences": " belgemizde a\xe7ıklandığı şekilde t\xfcm \xe7erezlerin kullanımına onay vermiş olursunuz. Zorunlu olmayan \xe7erezleri reddedebilir veya istediğiniz zaman ",
                "eu.banner.body.afterPreferences": " y\xf6netebilirsiniz.",
                "eu.banner.preferencesLink": "Tercihleri y\xf6net",
                "eu.banner.policyLink": "\xc7erez Politikası",
                "eu.banner.acceptAll": "T\xfcm\xfcn\xfc kabul et",
                "eu.banner.rejectAll": "T\xfcm\xfcn\xfc reddet",
                "notice.body": "Platformumuzdaki deneyiminizi iyileştirmek i\xe7in \xe7erezler kullanıyoruz. Sitemizi kullanmaya devam ederek \xe7erez kullanımını kabul etmiş olursunuz.",
                "notice.learnMore": "Daha fazla bilgi",
                "notice.gotIt": "Anladım",
                "notice.close": "Kapat",
                "pref.title": "\xc7erez tercihleri",
                "pref.intro": "Hangi \xe7erezlere izin vereceğinizi se\xe7in. Kesinlikle gerekli \xe7erezler her zaman a\xe7ıktır — platformun \xe7alışmasını sağlarlar. Tercihlerinizi istediğiniz zaman g\xfcncelleyebilirsiniz.",
                "pref.save": "Tercihleri kaydet",
                "pref.close": "Kapat",
                "pref.alwaysOn": "Her zaman a\xe7ık",
                "pref.necessary.title": "Kesinlikle gerekli \xe7erezler",
                "pref.necessary.desc": "Bu \xe7erezler platformun \xe7alışması i\xe7in gereklidir ve kapatılamaz. Oturum a\xe7ma veya tercihleri kaydetme gibi eylemlerinize yanıt olarak ayarlanır.",
                "pref.functional.title": "İşlevsel \xe7erezler",
                "pref.functional.desc": "Bu \xe7erezler platformun se\xe7imlerinizi hatırlamasına ve dil tercihleri ile aray\xfcz ayarları gibi gelişmiş, kişiselleştirilmiş \xf6zellikler sunmasına olanak tanır. Devre dışı bırakmak bazı işlevleri etkileyebilir.",
                "pref.analytics.title": "Analitik \xe7erezler",
                "pref.analytics.desc": "Bu \xe7erezler, anonimleştirilmiş kullanım verileri toplayarak ziyaret\xe7ilerin platformumuzu nasıl kullandığını anlamamıza yardımcı olur. Bu bilgiler \xfcr\xfcnlerimizi ve kullanıcı deneyimini iyileştirmemize yardımcı olur.",
                "pref.advertising.title": "Reklam \xe7erezleri",
                "pref.advertising.desc": "Bu \xe7erezler, reklam ortaklarımız tarafından ilgi alanlarınızın bir profilini oluşturmak ve diğer sitelerde ilgili reklamlar g\xf6stermek i\xe7in ayarlanır. Kişisel verileri doğrudan saklamazlar, ancak tarayıcınızı ve cihazınızı benzersiz şekilde tanımlarlar.",
                "blocked.message": "Yasal gereklilikler nedeniyle hizmetlerimiz b\xf6lgenizde kullanılamamaktadır.",
                "blocked.ok": "Tamam"
            }
        }
          , ef = new class {
            constructor() {
                this.instance = eh.createInstance(),
                this.initialized = !1,
                this.locale = "en"
            }
            init(e) {
                let t = this.resolveLocale(e);
                if (this.locale = t,
                !this.initialized) {
                    this.instance.init({
                        lng: t,
                        fallbackLng: "en",
                        supportedLngs: [...ep],
                        resources: Object.fromEntries(ep.map(e => [e, {
                            translation: eg[e]
                        }])),
                        interpolation: {
                            escapeValue: !1
                        }
                    }),
                    this.initialized = !0;
                    return
                }
                this.instance.changeLanguage(t)
            }
            t(e) {
                return this.instance.t(e)
            }
            resolveLocale(e) {
                let t = (e ?? "").trim();
                return ep.includes(t) ? t : "en"
            }
        }
          , em = class {
            async fetch() {
                try {
                    let e = await fetch("https://converge.ai/api/user/region", {
                        credentials: "include",
                        headers: {
                            Accept: "application/json"
                        },
                        signal: AbortSignal.timeout(5e3)
                    });
                    if (!e.ok)
                        throw Error(String(e.status));
                    return await e.json()
                } catch {
                    return {
                        countryCode: "",
                        mode: "opt_in"
                    }
                }
            }
        }
          , eb = class {
            get shadowRoot() {
                return this.__host.__shadowRoot
            }
            constructor(e) {
                this.ariaActiveDescendantElement = null,
                this.ariaAtomic = "",
                this.ariaAutoComplete = "",
                this.ariaBrailleLabel = "",
                this.ariaBrailleRoleDescription = "",
                this.ariaBusy = "",
                this.ariaChecked = "",
                this.ariaColCount = "",
                this.ariaColIndex = "",
                this.ariaColIndexText = "",
                this.ariaColSpan = "",
                this.ariaControlsElements = null,
                this.ariaCurrent = "",
                this.ariaDescribedByElements = null,
                this.ariaDescription = "",
                this.ariaDetailsElements = null,
                this.ariaDisabled = "",
                this.ariaErrorMessageElements = null,
                this.ariaExpanded = "",
                this.ariaFlowToElements = null,
                this.ariaHasPopup = "",
                this.ariaHidden = "",
                this.ariaInvalid = "",
                this.ariaKeyShortcuts = "",
                this.ariaLabel = "",
                this.ariaLabelledByElements = null,
                this.ariaLevel = "",
                this.ariaLive = "",
                this.ariaModal = "",
                this.ariaMultiLine = "",
                this.ariaMultiSelectable = "",
                this.ariaOrientation = "",
                this.ariaOwnsElements = null,
                this.ariaPlaceholder = "",
                this.ariaPosInSet = "",
                this.ariaPressed = "",
                this.ariaReadOnly = "",
                this.ariaRelevant = "",
                this.ariaRequired = "",
                this.ariaRoleDescription = "",
                this.ariaRowCount = "",
                this.ariaRowIndex = "",
                this.ariaRowIndexText = "",
                this.ariaRowSpan = "",
                this.ariaSelected = "",
                this.ariaSetSize = "",
                this.ariaSort = "",
                this.ariaValueMax = "",
                this.ariaValueMin = "",
                this.ariaValueNow = "",
                this.ariaValueText = "",
                this.role = "",
                this.form = null,
                this.labels = [],
                this.states = new Set,
                this.validationMessage = "",
                this.validity = {},
                this.willValidate = !0,
                this.__host = e
            }
            checkValidity() {
                return console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true."),
                !0
            }
            reportValidity() {
                return !0
            }
            setFormValue() {}
            setValidity() {}
        }
          , ey = function(e, t, i, s, r) {
            if ("m" === s)
                throw TypeError("Private method is not writable");
            if ("a" === s && !r)
                throw TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === s ? r.call(e, i) : r ? r.value = i : t.set(e, i),
            i
        }
          , ev = function(e, t, i, s) {
            if ("a" === i && !s)
                throw TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t ? e !== t || !s : !t.has(e))
                throw TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === i ? s : "a" === i ? s.call(e) : s ? s.value : t.get(e)
        }
          , ek = e => "boolean" == typeof e ? e : e?.capture ?? !1
          , ex = class {
            constructor() {
                this.__eventListeners = new Map,
                this.__captureEventListeners = new Map
            }
            addEventListener(e, t, i) {
                if (null == t)
                    return;
                let s = ek(i) ? this.__captureEventListeners : this.__eventListeners
                  , r = s.get(e);
                if (void 0 === r)
                    r = new Map,
                    s.set(e, r);
                else if (r.has(t))
                    return;
                let n = "object" == typeof i && i ? i : {};
                n.signal?.addEventListener("abort", () => this.removeEventListener(e, t, i)),
                r.set(t, n ?? {})
            }
            removeEventListener(e, t, i) {
                if (null == t)
                    return;
                let s = ek(i) ? this.__captureEventListeners : this.__eventListeners
                  , r = s.get(e);
                void 0 !== r && (r.delete(t),
                r.size || s.delete(e))
            }
            dispatchEvent(e) {
                let t = [this]
                  , i = this.__eventTargetParent;
                if (e.composed)
                    for (; i; )
                        t.push(i),
                        i = i.__eventTargetParent;
                else
                    for (; i && i !== this.__host; )
                        t.push(i),
                        i = i.__eventTargetParent;
                let s = !1
                  , r = !1
                  , n = 0
                  , o = null
                  , a = null
                  , l = null
                  , c = e.stopPropagation
                  , d = e.stopImmediatePropagation;
                Object.defineProperties(e, {
                    target: {
                        get: () => o ?? a,
                        ...ew
                    },
                    srcElement: {
                        get: () => e.target,
                        ...ew
                    },
                    currentTarget: {
                        get: () => l,
                        ...ew
                    },
                    eventPhase: {
                        get: () => n,
                        ...ew
                    },
                    composedPath: {
                        value: () => t,
                        ...ew
                    },
                    stopPropagation: {
                        value: () => {
                            s = !0,
                            c.call(e)
                        }
                        ,
                        ...ew
                    },
                    stopImmediatePropagation: {
                        value: () => {
                            r = !0,
                            d.call(e)
                        }
                        ,
                        ...ew
                    }
                });
                let h = (t, i, s) => {
                    "function" == typeof t ? t(e) : "function" == typeof t?.handleEvent && t.handleEvent(e),
                    i.once && s.delete(t)
                }
                  , p = () => (l = null,
                n = 0,
                !e.defaultPrevented)
                  , u = t.slice().reverse();
                o = this.__host && e.composed ? null : this;
                let g = e => {
                    for (a = this; a.__host && e.includes(a.__host); )
                        a = a.__host
                }
                ;
                for (let t of u) {
                    o || a && a !== t.__host || g(u.slice(u.indexOf(t))),
                    l = t,
                    n = t === e.target ? 2 : 1;
                    let i = t.__captureEventListeners.get(e.type);
                    if (i) {
                        for (let[e,t] of i)
                            if (h(e, t, i),
                            r)
                                return p()
                    }
                    if (s)
                        return p()
                }
                let f = e.bubbles ? t : [this];
                for (let t of (a = null,
                f)) {
                    o || a && t !== a.__host || g(f.slice(0, f.indexOf(t) + 1)),
                    l = t,
                    n = t === e.target ? 2 : 3;
                    let i = t.__eventListeners.get(e.type);
                    if (i) {
                        for (let[e,t] of i)
                            if (h(e, t, i),
                            r)
                                return p()
                    }
                    if (s)
                        break
                }
                return p()
            }
        }
          , ew = {
            __proto__: null
        };
        ew.enumerable = !0,
        Object.freeze(ew);
        var e$ = (p = class {
            constructor(e, t={}) {
                if (s.set(this, !1),
                r.set(this, !1),
                n.set(this, !1),
                o.set(this, !1),
                a.set(this, Date.now()),
                l.set(this, !1),
                c.set(this, void 0),
                d.set(this, void 0),
                h.set(this, void 0),
                this.NONE = 0,
                this.CAPTURING_PHASE = 1,
                this.AT_TARGET = 2,
                this.BUBBLING_PHASE = 3,
                0 == arguments.length)
                    throw Error("The type argument must be specified");
                if ("object" != typeof t || !t)
                    throw Error('The "options" argument must be an object');
                let {bubbles: i, cancelable: p, composed: u} = t;
                ey(this, s, !!p, "f"),
                ey(this, r, !!i, "f"),
                ey(this, n, !!u, "f"),
                ey(this, c, `${e}`, "f"),
                ey(this, d, null, "f"),
                ey(this, h, !1, "f")
            }
            initEvent(e, t, i) {
                throw Error("Method not implemented.")
            }
            stopImmediatePropagation() {
                this.stopPropagation()
            }
            preventDefault() {
                ey(this, o, !0, "f")
            }
            get target() {
                return ev(this, d, "f")
            }
            get currentTarget() {
                return ev(this, d, "f")
            }
            get srcElement() {
                return ev(this, d, "f")
            }
            get type() {
                return ev(this, c, "f")
            }
            get cancelable() {
                return ev(this, s, "f")
            }
            get defaultPrevented() {
                return ev(this, s, "f") && ev(this, o, "f")
            }
            get timeStamp() {
                return ev(this, a, "f")
            }
            composedPath() {
                return ev(this, h, "f") ? [ev(this, d, "f")] : []
            }
            get returnValue() {
                return !ev(this, s, "f") || !ev(this, o, "f")
            }
            get bubbles() {
                return ev(this, r, "f")
            }
            get composed() {
                return ev(this, n, "f")
            }
            get eventPhase() {
                return ev(this, h, "f") ? p.AT_TARGET : p.NONE
            }
            get cancelBubble() {
                return ev(this, l, "f")
            }
            set cancelBubble(e) {
                e && ey(this, l, !0, "f")
            }
            stopPropagation() {
                ey(this, l, !0, "f")
            }
            get isTrusted() {
                return !1
            }
        }
        ,
        s = new WeakMap,
        r = new WeakMap,
        n = new WeakMap,
        o = new WeakMap,
        a = new WeakMap,
        l = new WeakMap,
        c = new WeakMap,
        d = new WeakMap,
        h = new WeakMap,
        p.NONE = 0,
        p.CAPTURING_PHASE = 1,
        p.AT_TARGET = 2,
        p.BUBBLING_PHASE = 3,
        p);
        Object.defineProperties(e$.prototype, {
            initEvent: ew,
            stopImmediatePropagation: ew,
            preventDefault: ew,
            target: ew,
            currentTarget: ew,
            srcElement: ew,
            type: ew,
            cancelable: ew,
            defaultPrevented: ew,
            timeStamp: ew,
            composedPath: ew,
            returnValue: ew,
            bubbles: ew,
            composed: ew,
            eventPhase: ew,
            cancelBubble: ew,
            stopPropagation: ew,
            isTrusted: ew
        });
        var e_ = (g = class extends e$ {
            constructor(e, t={}) {
                super(e, t),
                u.set(this, void 0),
                ey(this, u, t?.detail ?? null, "f")
            }
            initCustomEvent(e, t, i, s) {
                throw Error("Method not implemented.")
            }
            get detail() {
                return ev(this, u, "f")
            }
        }
        ,
        u = new WeakMap,
        g);
        Object.defineProperties(e_.prototype, {
            detail: ew
        }),
        (f = class {
            constructor() {
                this.STYLE_RULE = 1,
                this.CHARSET_RULE = 2,
                this.IMPORT_RULE = 3,
                this.MEDIA_RULE = 4,
                this.FONT_FACE_RULE = 5,
                this.PAGE_RULE = 6,
                this.NAMESPACE_RULE = 10,
                this.KEYFRAMES_RULE = 7,
                this.KEYFRAME_RULE = 8,
                this.SUPPORTS_RULE = 12,
                this.COUNTER_STYLE_RULE = 11,
                this.FONT_FEATURE_VALUES_RULE = 14,
                this.__parentStyleSheet = null,
                this.cssText = ""
            }
            get parentRule() {
                return null
            }
            get parentStyleSheet() {
                return this.__parentStyleSheet
            }
            get type() {
                return 0
            }
        }
        ).STYLE_RULE = 1,
        f.CHARSET_RULE = 2,
        f.IMPORT_RULE = 3,
        f.MEDIA_RULE = 4,
        f.FONT_FACE_RULE = 5,
        f.PAGE_RULE = 6,
        f.NAMESPACE_RULE = 10,
        f.KEYFRAMES_RULE = 7,
        f.KEYFRAME_RULE = 8,
        f.SUPPORTS_RULE = 12,
        f.COUNTER_STYLE_RULE = 11,
        f.FONT_FEATURE_VALUES_RULE = 14,
        globalThis.Event ?? (globalThis.Event = e$),
        globalThis.CustomEvent ?? (globalThis.CustomEvent = e_);
        var eC = new WeakMap
          , eS = e => {
            let t = eC.get(e);
            return void 0 === t && eC.set(e, t = new Map),
            t
        }
          , eE = class extends ex {
            constructor() {
                super(...arguments),
                this.__shadowRootMode = null,
                this.__shadowRoot = null,
                this.__internals = null
            }
            get attributes() {
                return Array.from(eS(this)).map( ([e,t]) => ({
                    name: e,
                    value: t
                }))
            }
            get shadowRoot() {
                return "closed" === this.__shadowRootMode ? null : this.__shadowRoot
            }
            get localName() {
                return this.constructor.__localName
            }
            get tagName() {
                return this.localName?.toUpperCase()
            }
            setAttribute(e, t) {
                eS(this).set(e, String(t))
            }
            removeAttribute(e) {
                eS(this).delete(e)
            }
            toggleAttribute(e, t) {
                if (this.hasAttribute(e)) {
                    if (void 0 === t || !t)
                        return this.removeAttribute(e),
                        !1
                } else {
                    if (void 0 !== t && !t)
                        return !1;
                    this.setAttribute(e, "")
                }
                return !0
            }
            hasAttribute(e) {
                return eS(this).has(e)
            }
            attachShadow(e) {
                let t = {
                    host: this
                };
                return this.__shadowRootMode = e.mode,
                e && "open" === e.mode && (this.__shadowRoot = t),
                t
            }
            attachInternals() {
                if (null !== this.__internals)
                    throw Error("Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");
                let e = new eb(this);
                return this.__internals = e,
                e
            }
            getAttribute(e) {
                return eS(this).get(e) ?? null
            }
        }
          , eA = class extends eE {
        }
        ;
        globalThis.litServerRoot ?? (globalThis.litServerRoot = Object.defineProperty(new eA, "localName", {
            get: () => "lit-server-root"
        }));
        var eP = new class {
            constructor() {
                this.__definitions = new Map,
                this.__reverseDefinitions = new Map,
                this.__pendingWhenDefineds = new Map
            }
            define(e, t) {
                if (this.__definitions.has(e))
                    throw Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${e}" has already been used with this registry`);
                if (this.__reverseDefinitions.has(t))
                    throw Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(t)}`);
                t.__localName = e,
                this.__definitions.set(e, {
                    ctor: t,
                    observedAttributes: t.observedAttributes ?? []
                }),
                this.__reverseDefinitions.set(t, e),
                this.__pendingWhenDefineds.get(e)?.resolve(t),
                this.__pendingWhenDefineds.delete(e)
            }
            get(e) {
                let t = this.__definitions.get(e);
                return t?.ctor
            }
            getName(e) {
                return this.__reverseDefinitions.get(e) ?? null
            }
            upgrade(e) {
                throw Error("customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.")
            }
            async whenDefined(e) {
                let t = this.__definitions.get(e);
                if (t)
                    return t.ctor;
                let i = this.__pendingWhenDefineds.get(e);
                if (!i) {
                    let t, s;
                    i = {
                        promise: new Promise( (e, i) => {
                            t = e,
                            s = i
                        }
                        ),
                        resolve: t,
                        reject: s
                    },
                    this.__pendingWhenDefineds.set(e, i)
                }
                return i.promise
            }
        }
          , eO = globalThis
          , eL = eO.ShadowRoot && (void 0 === eO.ShadyCSS || eO.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype
          , eR = Symbol()
          , ez = new WeakMap
          , ej = class {
            constructor(e, t, i) {
                if (this._$cssResult$ = !0,
                i !== eR)
                    throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
                this.cssText = e,
                this.t = t
            }
            get styleSheet() {
                let e = this.o
                  , t = this.t;
                if (eL && void 0 === e) {
                    let i = void 0 !== t && 1 === t.length;
                    i && (e = ez.get(t)),
                    void 0 === e && ((this.o = e = new CSSStyleSheet).replaceSync(this.cssText),
                    i && ez.set(t, e))
                }
                return e
            }
            toString() {
                return this.cssText
            }
        }
          , eN = (e, ...t) => new ej(1 === e.length ? e[0] : t.reduce( (t, i, s) => t + (e => {
            if (!0 === e._$cssResult$)
                return e.cssText;
            if ("number" == typeof e)
                return e;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
        }
        )(i) + e[s + 1], e[0]),e,eR)
          , eT = eL || void 0 === eO.CSSStyleSheet ? e => e : e => e instanceof CSSStyleSheet ? (e => {
            let t = "";
            for (let i of e.cssRules)
                t += i.cssText;
            return (e => new ej("string" == typeof e ? e : e + "",void 0,eR))(t)
        }
        )(e) : e
          , {is: eU, defineProperty: eI, getOwnPropertyDescriptor: eM, getOwnPropertyNames: eD, getOwnPropertySymbols: eF, getPrototypeOf: eV} = Object
          , eH = globalThis;
        eH.customElements ?? (eH.customElements = eP);
        var eB = eH.trustedTypes
          , eK = eB ? eB.emptyScript : ""
          , eq = eH.reactiveElementPolyfillSupport
          , eW = {
            toAttribute(e, t) {
                switch (t) {
                case Boolean:
                    e = e ? eK : null;
                    break;
                case Object:
                case Array:
                    e = null == e ? e : JSON.stringify(e)
                }
                return e
            },
            fromAttribute(e, t) {
                let i = e;
                switch (t) {
                case Boolean:
                    i = null !== e;
                    break;
                case Number:
                    i = null === e ? null : Number(e);
                    break;
                case Object:
                case Array:
                    try {
                        i = JSON.parse(e)
                    } catch (e) {
                        i = null
                    }
                }
                return i
            }
        }
          , eG = (e, t) => !eU(e, t)
          , eJ = {
            attribute: !0,
            type: String,
            converter: eW,
            reflect: !1,
            useDefault: !1,
            hasChanged: eG
        };
        Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")),
        eH.litPropertyMetadata ?? (eH.litPropertyMetadata = new WeakMap);
        var eY = class extends (globalThis.HTMLElement ?? eA) {
            static addInitializer(e) {
                this._$Ei(),
                (this.l ?? (this.l = [])).push(e)
            }
            static get observedAttributes() {
                return this.finalize(),
                this._$Eh && [...this._$Eh.keys()]
            }
            static createProperty(e, t=eJ) {
                if (t.state && (t.attribute = !1),
                this._$Ei(),
                this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0),
                this.elementProperties.set(e, t),
                !t.noAccessor) {
                    let i = Symbol()
                      , s = this.getPropertyDescriptor(e, i, t);
                    void 0 !== s && eI(this.prototype, e, s)
                }
            }
            static getPropertyDescriptor(e, t, i) {
                let {get: s, set: r} = eM(this.prototype, e) ?? {
                    get() {
                        return this[t]
                    },
                    set(e) {
                        this[t] = e
                    }
                };
                return {
                    get: s,
                    set(t) {
                        let n = s?.call(this);
                        r?.call(this, t),
                        this.requestUpdate(e, n, i)
                    },
                    configurable: !0,
                    enumerable: !0
                }
            }
            static getPropertyOptions(e) {
                return this.elementProperties.get(e) ?? eJ
            }
            static _$Ei() {
                if (this.hasOwnProperty("elementProperties"))
                    return;
                let e = eV(this);
                e.finalize(),
                void 0 !== e.l && (this.l = [...e.l]),
                this.elementProperties = new Map(e.elementProperties)
            }
            static finalize() {
                if (this.hasOwnProperty("finalized"))
                    return;
                if (this.finalized = !0,
                this._$Ei(),
                this.hasOwnProperty("properties")) {
                    let e = this.properties;
                    for (let t of [...eD(e), ...eF(e)])
                        this.createProperty(t, e[t])
                }
                let e = this[Symbol.metadata];
                if (null !== e) {
                    let t = litPropertyMetadata.get(e);
                    if (void 0 !== t)
                        for (let[e,i] of t)
                            this.elementProperties.set(e, i)
                }
                for (let[e,t] of (this._$Eh = new Map,
                this.elementProperties)) {
                    let i = this._$Eu(e, t);
                    void 0 !== i && this._$Eh.set(i, e)
                }
                this.elementStyles = this.finalizeStyles(this.styles)
            }
            static finalizeStyles(e) {
                let t = [];
                if (Array.isArray(e))
                    for (let i of new Set(e.flat(1 / 0).reverse()))
                        t.unshift(eT(i));
                else
                    void 0 !== e && t.push(eT(e));
                return t
            }
            static _$Eu(e, t) {
                let i = t.attribute;
                return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof e ? e.toLowerCase() : void 0
            }
            constructor() {
                super(),
                this._$Ep = void 0,
                this.isUpdatePending = !1,
                this.hasUpdated = !1,
                this._$Em = null,
                this._$Ev()
            }
            _$Ev() {
                this._$ES = new Promise(e => this.enableUpdating = e),
                this._$AL = new Map,
                this._$E_(),
                this.requestUpdate(),
                this.constructor.l?.forEach(e => e(this))
            }
            addController(e) {
                (this._$EO ?? (this._$EO = new Set)).add(e),
                void 0 !== this.renderRoot && this.isConnected && e.hostConnected?.()
            }
            removeController(e) {
                this._$EO?.delete(e)
            }
            _$E_() {
                let e = new Map;
                for (let t of this.constructor.elementProperties.keys())
                    this.hasOwnProperty(t) && (e.set(t, this[t]),
                    delete this[t]);
                e.size > 0 && (this._$Ep = e)
            }
            createRenderRoot() {
                let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
                return ( (e, t) => {
                    if (eL)
                        e.adoptedStyleSheets = t.map(e => e instanceof CSSStyleSheet ? e : e.styleSheet);
                    else
                        for (let i of t) {
                            let t = document.createElement("style")
                              , s = eO.litNonce;
                            void 0 !== s && t.setAttribute("nonce", s),
                            t.textContent = i.cssText,
                            e.appendChild(t)
                        }
                }
                )(e, this.constructor.elementStyles),
                e
            }
            connectedCallback() {
                this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
                this.enableUpdating(!0),
                this._$EO?.forEach(e => e.hostConnected?.())
            }
            enableUpdating(e) {}
            disconnectedCallback() {
                this._$EO?.forEach(e => e.hostDisconnected?.())
            }
            attributeChangedCallback(e, t, i) {
                this._$AK(e, i)
            }
            _$ET(e, t) {
                let i = this.constructor.elementProperties.get(e)
                  , s = this.constructor._$Eu(e, i);
                if (void 0 !== s && !0 === i.reflect) {
                    let r = (void 0 !== i.converter?.toAttribute ? i.converter : eW).toAttribute(t, i.type);
                    this._$Em = e,
                    null == r ? this.removeAttribute(s) : this.setAttribute(s, r),
                    this._$Em = null
                }
            }
            _$AK(e, t) {
                let i = this.constructor
                  , s = i._$Eh.get(e);
                if (void 0 !== s && this._$Em !== s) {
                    let e = i.getPropertyOptions(s)
                      , r = "function" == typeof e.converter ? {
                        fromAttribute: e.converter
                    } : void 0 !== e.converter?.fromAttribute ? e.converter : eW;
                    this._$Em = s;
                    let n = r.fromAttribute(t, e.type);
                    this[s] = n ?? this._$Ej?.get(s) ?? n,
                    this._$Em = null
                }
            }
            requestUpdate(e, t, i, s=!1, r) {
                if (void 0 !== e) {
                    let n = this.constructor;
                    if (!1 === s && (r = this[e]),
                    i ?? (i = n.getPropertyOptions(e)),
                    !((i.hasChanged ?? eG)(r, t) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i))))
                        return;
                    this.C(e, t, i)
                }
                !1 === this.isUpdatePending && (this._$ES = this._$EP())
            }
            C(e, t, {useDefault: i, reflect: s, wrapped: r}, n) {
                i && !(this._$Ej ?? (this._$Ej = new Map)).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]),
                !0 !== r || void 0 !== n) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0),
                this._$AL.set(e, t)),
                !0 === s && this._$Em !== e && (this._$Eq ?? (this._$Eq = new Set)).add(e))
            }
            async _$EP() {
                this.isUpdatePending = !0;
                try {
                    await this._$ES
                } catch (e) {
                    Promise.reject(e)
                }
                let e = this.scheduleUpdate();
                return null != e && await e,
                !this.isUpdatePending
            }
            scheduleUpdate() {
                return this.performUpdate()
            }
            performUpdate() {
                if (!this.isUpdatePending)
                    return;
                if (!this.hasUpdated) {
                    if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
                    this._$Ep) {
                        for (let[e,t] of this._$Ep)
                            this[e] = t;
                        this._$Ep = void 0
                    }
                    let e = this.constructor.elementProperties;
                    if (e.size > 0)
                        for (let[t,i] of e) {
                            let {wrapped: e} = i
                              , s = this[t];
                            !0 !== e || this._$AL.has(t) || void 0 === s || this.C(t, void 0, i, s)
                        }
                }
                let e = !1
                  , t = this._$AL;
                try {
                    (e = this.shouldUpdate(t)) ? (this.willUpdate(t),
                    this._$EO?.forEach(e => e.hostUpdate?.()),
                    this.update(t)) : this._$EM()
                } catch (t) {
                    throw e = !1,
                    this._$EM(),
                    t
                }
                e && this._$AE(t)
            }
            willUpdate(e) {}
            _$AE(e) {
                this._$EO?.forEach(e => e.hostUpdated?.()),
                this.hasUpdated || (this.hasUpdated = !0,
                this.firstUpdated(e)),
                this.updated(e)
            }
            _$EM() {
                this._$AL = new Map,
                this.isUpdatePending = !1
            }
            get updateComplete() {
                return this.getUpdateComplete()
            }
            getUpdateComplete() {
                return this._$ES
            }
            shouldUpdate(e) {
                return !0
            }
            update(e) {
                this._$Eq && (this._$Eq = this._$Eq.forEach(e => this._$ET(e, this[e]))),
                this._$EM()
            }
            updated(e) {}
            firstUpdated(e) {}
        }
        ;
        eY.elementStyles = [],
        eY.shadowRootOptions = {
            mode: "open"
        },
        eY.elementProperties = new Map,
        eY.finalized = new Map,
        eq?.({
            ReactiveElement: eY
        }),
        (eH.reactiveElementVersions ?? (eH.reactiveElementVersions = [])).push("2.1.2");
        var eQ = globalThis
          , eZ = e => e
          , eX = eQ.trustedTypes
          , e0 = eX ? eX.createPolicy("lit-html", {
            createHTML: e => e
        }) : void 0
          , e1 = "$lit$"
          , e2 = `lit$${Math.random().toFixed(9).slice(2)}$`
          , e3 = "?" + e2
          , e4 = `<${e3}>`
          , e5 = void 0 === eQ.document ? {
            createTreeWalker: () => ({})
        } : document
          , e8 = () => e5.createComment("")
          , e6 = e => null === e || "object" != typeof e && "function" != typeof e
          , e7 = Array.isArray
          , e9 = "[ 	\n\f\r]"
          , te = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g
          , tt = /-->/g
          , ti = />/g
          , ts = RegExp(`>|${e9}(?:([^\\s"'>=/]+)(${e9}*=${e9}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g")
          , tr = /'/g
          , tn = /"/g
          , to = /^(?:script|style|textarea|title)$/i
          , ta = e => (t, ...i) => ({
            _$litType$: e,
            strings: t,
            values: i
        })
          , tl = ta(1);
        ta(2),
        ta(3);
        var tc = Symbol.for("lit-noChange")
          , td = Symbol.for("lit-nothing")
          , th = new WeakMap
          , tp = e5.createTreeWalker(e5, 129);
        function tu(e, t) {
            if (!e7(e) || !e.hasOwnProperty("raw"))
                throw Error("invalid template strings array");
            return void 0 !== e0 ? e0.createHTML(t) : t
        }
        var tg = class e {
            constructor({strings: t, _$litType$: i}, s) {
                let r;
                this.parts = [];
                let n = 0
                  , o = 0
                  , a = t.length - 1
                  , l = this.parts
                  , [c,d] = ( (e, t) => {
                    let i = e.length - 1, s = [], r, n = 2 === t ? "<svg>" : 3 === t ? "<math>" : "", o = te;
                    for (let t = 0; t < i; t++) {
                        let i = e[t], a, l, c = -1, d = 0;
                        for (; d < i.length && (o.lastIndex = d,
                        null !== (l = o.exec(i))); )
                            d = o.lastIndex,
                            o === te ? "!--" === l[1] ? o = tt : void 0 !== l[1] ? o = ti : void 0 !== l[2] ? (to.test(l[2]) && (r = RegExp("</" + l[2], "g")),
                            o = ts) : void 0 !== l[3] && (o = ts) : o === ts ? ">" === l[0] ? (o = r ?? te,
                            c = -1) : void 0 === l[1] ? c = -2 : (c = o.lastIndex - l[2].length,
                            a = l[1],
                            o = void 0 === l[3] ? ts : '"' === l[3] ? tn : tr) : o === tn || o === tr ? o = ts : o === tt || o === ti ? o = te : (o = ts,
                            r = void 0);
                        let h = o === ts && e[t + 1].startsWith("/>") ? " " : "";
                        n += o === te ? i + e4 : c >= 0 ? (s.push(a),
                        i.slice(0, c) + e1 + i.slice(c) + e2 + h) : i + e2 + (-2 === c ? t : h)
                    }
                    return [tu(e, n + (e[i] || "<?>") + (2 === t ? "</svg>" : 3 === t ? "</math>" : "")), s]
                }
                )(t, i);
                if (this.el = e.createElement(c, s),
                tp.currentNode = this.el.content,
                2 === i || 3 === i) {
                    let e = this.el.content.firstChild;
                    e.replaceWith(...e.childNodes)
                }
                for (; null !== (r = tp.nextNode()) && l.length < a; ) {
                    if (1 === r.nodeType) {
                        if (r.hasAttributes())
                            for (let e of r.getAttributeNames())
                                if (e.endsWith(e1)) {
                                    let t = d[o++]
                                      , i = r.getAttribute(e).split(e2)
                                      , s = /([.?@])?(.*)/.exec(t);
                                    l.push({
                                        type: 1,
                                        index: n,
                                        name: s[2],
                                        strings: i,
                                        ctor: "." === s[1] ? tv : "?" === s[1] ? tk : "@" === s[1] ? tx : ty
                                    }),
                                    r.removeAttribute(e)
                                } else
                                    e.startsWith(e2) && (l.push({
                                        type: 6,
                                        index: n
                                    }),
                                    r.removeAttribute(e));
                        if (to.test(r.tagName)) {
                            let e = r.textContent.split(e2)
                              , t = e.length - 1;
                            if (t > 0) {
                                r.textContent = eX ? eX.emptyScript : "";
                                for (let i = 0; i < t; i++)
                                    r.append(e[i], e8()),
                                    tp.nextNode(),
                                    l.push({
                                        type: 2,
                                        index: ++n
                                    });
                                r.append(e[t], e8())
                            }
                        }
                    } else if (8 === r.nodeType)
                        if (r.data === e3)
                            l.push({
                                type: 2,
                                index: n
                            });
                        else {
                            let e = -1;
                            for (; -1 !== (e = r.data.indexOf(e2, e + 1)); )
                                l.push({
                                    type: 7,
                                    index: n
                                }),
                                e += e2.length - 1
                        }
                    n++
                }
            }
            static createElement(e, t) {
                let i = e5.createElement("template");
                return i.innerHTML = e,
                i
            }
        }
        ;
        function tf(e, t, i=e, s) {
            if (t === tc)
                return t;
            let r = void 0 !== s ? i._$Co?.[s] : i._$Cl
              , n = e6(t) ? void 0 : t._$litDirective$;
            return r?.constructor !== n && (r?._$AO?.(!1),
            void 0 === n ? r = void 0 : (r = new n(e))._$AT(e, i, s),
            void 0 !== s ? (i._$Co ?? (i._$Co = []))[s] = r : i._$Cl = r),
            void 0 !== r && (t = tf(e, r._$AS(e, t.values), r, s)),
            t
        }
        var tm = class {
            constructor(e, t) {
                this._$AV = [],
                this._$AN = void 0,
                this._$AD = e,
                this._$AM = t
            }
            get parentNode() {
                return this._$AM.parentNode
            }
            get _$AU() {
                return this._$AM._$AU
            }
            u(e) {
                let {el: {content: t}, parts: i} = this._$AD
                  , s = (e?.creationScope ?? e5).importNode(t, !0);
                tp.currentNode = s;
                let r = tp.nextNode()
                  , n = 0
                  , o = 0
                  , a = i[0];
                for (; void 0 !== a; ) {
                    if (n === a.index) {
                        let t;
                        2 === a.type ? t = new tb(r,r.nextSibling,this,e) : 1 === a.type ? t = new a.ctor(r,a.name,a.strings,this,e) : 6 === a.type && (t = new tw(r,this,e)),
                        this._$AV.push(t),
                        a = i[++o]
                    }
                    n !== a?.index && (r = tp.nextNode(),
                    n++)
                }
                return tp.currentNode = e5,
                s
            }
            p(e) {
                let t = 0;
                for (let i of this._$AV)
                    void 0 !== i && (void 0 !== i.strings ? (i._$AI(e, i, t),
                    t += i.strings.length - 2) : i._$AI(e[t])),
                    t++
            }
        }
          , tb = class e {
            get _$AU() {
                return this._$AM?._$AU ?? this._$Cv
            }
            constructor(e, t, i, s) {
                this.type = 2,
                this._$AH = td,
                this._$AN = void 0,
                this._$AA = e,
                this._$AB = t,
                this._$AM = i,
                this.options = s,
                this._$Cv = s?.isConnected ?? !0
            }
            get parentNode() {
                let e = this._$AA.parentNode
                  , t = this._$AM;
                return void 0 !== t && 11 === e?.nodeType && (e = t.parentNode),
                e
            }
            get startNode() {
                return this._$AA
            }
            get endNode() {
                return this._$AB
            }
            _$AI(e, t=this) {
                let i;
                e6(e = tf(this, e, t)) ? e === td || null == e || "" === e ? (this._$AH !== td && this._$AR(),
                this._$AH = td) : e !== this._$AH && e !== tc && this._(e) : void 0 !== e._$litType$ ? this.$(e) : void 0 !== e.nodeType ? this.T(e) : e7(i = e) || "function" == typeof i?.[Symbol.iterator] ? this.k(e) : this._(e)
            }
            O(e) {
                return this._$AA.parentNode.insertBefore(e, this._$AB)
            }
            T(e) {
                this._$AH !== e && (this._$AR(),
                this._$AH = this.O(e))
            }
            _(e) {
                this._$AH !== td && e6(this._$AH) ? this._$AA.nextSibling.data = e : this.T(e5.createTextNode(e)),
                this._$AH = e
            }
            $(e) {
                let {values: t, _$litType$: i} = e
                  , s = "number" == typeof i ? this._$AC(e) : (void 0 === i.el && (i.el = tg.createElement(tu(i.h, i.h[0]), this.options)),
                i);
                if (this._$AH?._$AD === s)
                    this._$AH.p(t);
                else {
                    let e = new tm(s,this)
                      , i = e.u(this.options);
                    e.p(t),
                    this.T(i),
                    this._$AH = e
                }
            }
            _$AC(e) {
                let t = th.get(e.strings);
                return void 0 === t && th.set(e.strings, t = new tg(e)),
                t
            }
            k(t) {
                e7(this._$AH) || (this._$AH = [],
                this._$AR());
                let i = this._$AH, s, r = 0;
                for (let n of t)
                    r === i.length ? i.push(s = new e(this.O(e8()),this.O(e8()),this,this.options)) : s = i[r],
                    s._$AI(n),
                    r++;
                r < i.length && (this._$AR(s && s._$AB.nextSibling, r),
                i.length = r)
            }
            _$AR(e=this._$AA.nextSibling, t) {
                for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
                    let t = eZ(e).nextSibling;
                    eZ(e).remove(),
                    e = t
                }
            }
            setConnected(e) {
                void 0 === this._$AM && (this._$Cv = e,
                this._$AP?.(e))
            }
        }
          , ty = class {
            get tagName() {
                return this.element.tagName
            }
            get _$AU() {
                return this._$AM._$AU
            }
            constructor(e, t, i, s, r) {
                this.type = 1,
                this._$AH = td,
                this._$AN = void 0,
                this.element = e,
                this.name = t,
                this._$AM = s,
                this.options = r,
                i.length > 2 || "" !== i[0] || "" !== i[1] ? (this._$AH = Array(i.length - 1).fill(new String),
                this.strings = i) : this._$AH = td
            }
            _$AI(e, t=this, i, s) {
                let r = this.strings
                  , n = !1;
                if (void 0 === r)
                    (n = !e6(e = tf(this, e, t, 0)) || e !== this._$AH && e !== tc) && (this._$AH = e);
                else {
                    let s, o, a = e;
                    for (e = r[0],
                    s = 0; s < r.length - 1; s++)
                        (o = tf(this, a[i + s], t, s)) === tc && (o = this._$AH[s]),
                        n || (n = !e6(o) || o !== this._$AH[s]),
                        o === td ? e = td : e !== td && (e += (o ?? "") + r[s + 1]),
                        this._$AH[s] = o
                }
                n && !s && this.j(e)
            }
            j(e) {
                e === td ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "")
            }
        }
          , tv = class extends ty {
            constructor() {
                super(...arguments),
                this.type = 3
            }
            j(e) {
                this.element[this.name] = e === td ? void 0 : e
            }
        }
          , tk = class extends ty {
            constructor() {
                super(...arguments),
                this.type = 4
            }
            j(e) {
                this.element.toggleAttribute(this.name, !!e && e !== td)
            }
        }
          , tx = class extends ty {
            constructor(e, t, i, s, r) {
                super(e, t, i, s, r),
                this.type = 5
            }
            _$AI(e, t=this) {
                if ((e = tf(this, e, t, 0) ?? td) === tc)
                    return;
                let i = this._$AH
                  , s = e === td && i !== td || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive
                  , r = e !== td && (i === td || s);
                s && this.element.removeEventListener(this.name, this, i),
                r && this.element.addEventListener(this.name, this, e),
                this._$AH = e
            }
            handleEvent(e) {
                "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e)
            }
        }
          , tw = class {
            constructor(e, t, i) {
                this.element = e,
                this.type = 6,
                this._$AN = void 0,
                this._$AM = t,
                this.options = i
            }
            get _$AU() {
                return this._$AM._$AU
            }
            _$AI(e) {
                tf(this, e)
            }
        }
          , t$ = eQ.litHtmlPolyfillSupport;
        t$?.(tg, tb),
        (eQ.litHtmlVersions ?? (eQ.litHtmlVersions = [])).push("3.3.2");
        var t_ = globalThis
          , tC = class extends eY {
            constructor() {
                super(...arguments),
                this.renderOptions = {
                    host: this
                },
                this._$Do = void 0
            }
            createRenderRoot() {
                var e;
                let t = super.createRenderRoot();
                return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild),
                t
            }
            update(e) {
                let t = this.render();
                this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
                super.update(e),
                this._$Do = ( (e, t, i) => {
                    let s = i?.renderBefore ?? t
                      , r = s._$litPart$;
                    if (void 0 === r) {
                        let e = i?.renderBefore ?? null;
                        s._$litPart$ = r = new tb(t.insertBefore(e8(), e),e,void 0,i ?? {})
                    }
                    return r._$AI(e),
                    r
                }
                )(t, this.renderRoot, this.renderOptions)
            }
            connectedCallback() {
                super.connectedCallback(),
                this._$Do?.setConnected(!0)
            }
            disconnectedCallback() {
                super.disconnectedCallback(),
                this._$Do?.setConnected(!1)
            }
            render() {
                return tc
            }
        }
        ;
        tC._$litElement$ = !0,
        tC.finalized = !0,
        t_.litElementHydrateSupport?.({
            LitElement: tC
        });
        var tS = t_.litElementPolyfillSupport;
        tS?.({
            LitElement: tC
        }),
        (t_.litElementVersions ?? (t_.litElementVersions = [])).push("4.2.2");
        var tE = e => (t, i) => {
            void 0 !== i ? i.addInitializer( () => {
                customElements.define(e, t)
            }
            ) : customElements.define(e, t)
        }
          , tA = [eN`
  :host {
    --cc-font-en: 'Schibsted Grotesk', var(--font-schibsted, ui-sans-serif, system-ui, sans-serif);
    --cc-font-zh: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
    --cc-bg: var(--popover, var(--bg-modal, #ffffff));
    --cc-bg-modal: var(--bg-modal, var(--popover, #ffffff));
    --cc-fg: var(--popover-foreground, var(--foreground, #171717));
    --cc-muted: var(--muted-foreground, #737373);
    --cc-border: var(--border, #e5e5e5);
    --cc-shadow-card: var(
      --shadow-lg,
      0 1px 2px rgb(0 0 0 / 0.04),
      0 4px 12px rgb(0 0 0 / 0.08),
      0 8px 24px rgb(0 0 0 / 0.06)
    );
    --cc-shadow-modal: var(
      --shadow-xl,
      0 2px 4px rgb(0 0 0 / 0.04),
      0 8px 24px rgb(0 0 0 / 0.1),
      0 16px 40px rgb(0 0 0 / 0.08)
    );
    --cc-hover-bg: color-mix(in srgb, var(--cc-fg) 8%, var(--cc-bg));
    --cc-accent: var(--primary, #171717);
    --cc-accent-fg: var(--primary-foreground, #fafafa);
    --cc-overlay: var(--cc-overlay-fallback, rgba(0, 0, 0, 0.4));
    --cc-ring: var(--ring, var(--border, #e5e5e5));
    font-family: var(--cc-font-en);
    font-size: 14px;
    line-height: 1.5;
    color: var(--cc-fg);
    color-scheme: light;
  }

  :host([data-theme='dark']) {
    --cc-bg: var(--popover, var(--bg-modal, #27272a));
    --cc-bg-modal: var(--bg-modal, var(--popover, #18181b));
    --cc-fg: var(--popover-foreground, var(--foreground, #f5f5f5));
    --cc-muted: var(--muted-foreground, #a3a3a3);
    --cc-border: var(--border, rgba(255, 255, 255, 0.15));
    --cc-shadow-card:
      0 1px 2px rgb(0 0 0 / 0.2), 0 8px 24px rgb(0 0 0 / 0.35);
    --cc-shadow-modal:
      0 4px 8px rgb(0 0 0 / 0.25), 0 16px 48px rgb(0 0 0 / 0.45);
    --cc-hover-bg: color-mix(in srgb, var(--cc-fg) 8%, var(--cc-bg));
    --cc-accent: var(--primary, #f5f5f5);
    --cc-accent-fg: var(--primary-foreground, #0a0a0a);
    --cc-overlay-fallback: rgba(0, 0, 0, 0.68);
    color-scheme: dark;
  }

  :host([data-theme='light']) {
    --cc-overlay-fallback: rgba(0, 0, 0, 0.4);
    color-scheme: light;
  }

  :host([locale='zh-CN']),
  :host(:lang(zh-CN)) {
    font-family: var(--cc-font-zh);
  }
`, eN`
  a {
    color: var(--cc-fg);
    text-decoration: underline;
  }

  .cc-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    padding: 0 16px;
    border: 1px solid var(--cc-border);
    border-radius: var(--radius, 8px);
    background: var(--cc-accent);
    color: var(--cc-accent-fg);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }

  .cc-btn:hover {
    opacity: 0.92;
  }

  .cc-btn--ghost {
    background: transparent;
    color: var(--cc-fg);
    border: 1px solid var(--cc-border);
    font-weight: 500;
  }

  .cc-btn--ghost:hover {
    opacity: 0.9;
    background: transparent;
  }

  .cc-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .cc-link-btn {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: var(--cc-fg);
    text-decoration: underline;
    cursor: pointer;
  }

  .cc-inline-link {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    color: var(--cc-fg);
    text-decoration: underline;
    cursor: pointer;
  }

  a.cc-inline-link {
    cursor: pointer;
  }
`]
          , tP = class extends tC {
            constructor() {
                super(...arguments),
                this._dispatchAction = e => {
                    this.dispatchEvent(new CustomEvent(e,{
                        bubbles: !0,
                        composed: !0
                    }))
                }
            }
            _renderPolicyLink() {
                let e = ef.t("eu.banner.policyLink");
                return this.policyUrl ? tl`<a
      href=${this.policyUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="cc-inline-link"
      >${e}</a>` : e
            }
            _renderPreferencesLink() {
                return tl`<button
      type="button"
      class="cc-inline-link"
      @click=${ () => this._dispatchAction("open-preferences")}
    >
      ${ef.t("eu.banner.preferencesLink")}
    </button>`
            }
            render() {
                return tl`
      <div class="card" role="region" aria-label="Cookie consent">
        <div class="inner">
          <div class="text" lang=${this.locale}>
            ${ef.t("eu.banner.body.beforePolicy")}
            ${this._renderPolicyLink()}
            ${ef.t("eu.banner.body.beforePreferences")}
            ${this._renderPreferencesLink()}
            ${ef.t("eu.banner.body.afterPreferences")}
          </div>
          <div class="actions">
            <button
              type="button"
              class="cc-btn cc-btn--ghost"
              @click=${ () => this._dispatchAction("accept-all")}
            >
              ${ef.t("eu.banner.acceptAll")}
            </button>
            <button
              type="button"
              class="cc-btn cc-btn--ghost"
              @click=${ () => this._dispatchAction("reject-all")}
            >
              ${ef.t("eu.banner.rejectAll")}
            </button>
          </div>
        </div>
      </div>
    `
            }
        }
        ;
        tP.properties = {
            policyUrl: {
                type: String,
                attribute: "policy-url"
            },
            locale: {
                type: String,
                reflect: !0
            },
            theme: {
                type: String,
                attribute: "data-theme",
                reflect: !0
            },
            visible: {
                type: Boolean,
                reflect: !0
            }
        },
        tP.styles = [tA, eN`
      :host {
        position: fixed;
        inset-inline-end: 24px;
        bottom: 24px;
        inset-inline-start: auto;
        z-index: 2147483645;
        display: none;
        box-sizing: border-box;
        width: 100%;
        max-width: 480px;
        pointer-events: none;
      }

      :host([visible]) {
        display: block;
      }

      .card {
        pointer-events: auto;
        padding: 24px;
        background: var(--cc-bg);
        color: var(--cc-fg);
        border: 1px solid var(--cc-border);
        border-radius: var(--radius, 12px);
        box-shadow: var(--cc-shadow-card);
      }

      .inner {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .text {
        margin: 0;
        width: 100%;
        color: var(--cc-fg);
        font-size: 14px;
        line-height: 1.5;
        text-align: start;
        text-align-last: start;
      }

      .text:lang(zh-CN) {
        hyphens: none;
      }

      .text .cc-inline-link {
        display: inline;
        vertical-align: baseline;
        min-height: 0;
        line-height: inherit;
      }

      .text button.cc-inline-link {
        appearance: none;
        -webkit-appearance: none;
      }

      .actions {
        display: flex;
        gap: 12px;
        width: 100%;
      }

      .actions .cc-btn {
        flex: 1;
        min-width: 0;
        min-height: 36px;
        font-weight: 500;
      }

      @media (max-width: 480px) {
        :host {
          inset-inline-end: 16px;
          bottom: 16px;
          max-width: calc(100vw - 32px);
        }

        .card {
          padding: 16px 20px;
        }
      }
    `],
        tP = y([tE("converge-opt-in-required")], tP);
        var tO = class extends tC {
            constructor() {
                super(...arguments),
                this._handleDismiss = () => {
                    this.dispatchEvent(new CustomEvent("dismiss",{
                        bubbles: !0,
                        composed: !0
                    }))
                }
            }
            render() {
                let e = this.policyUrl ? tl`<a
          href=${this.policyUrl}
          target="_blank"
          rel="noopener noreferrer"
          >${ef.t("notice.learnMore")}</a>` : null;
                return tl`
      <div class="card" role="region" aria-label="Cookie notice">
        <button
          type="button"
          class="close"
          aria-label=${ef.t("notice.close")}
          @click=${this._handleDismiss}
        >
          ×
        </button>
        <div class="inner">
          <p class="text">${ef.t("notice.body")} ${e}</p>
          <div class="actions">
            <button
              type="button"
              class="cc-btn cc-btn--ghost"
              @click=${this._handleDismiss}
            >
              ${ef.t("notice.gotIt")}
            </button>
          </div>
        </div>
      </div>
    `
            }
        }
        ;
        tO.properties = {
            policyUrl: {
                type: String,
                attribute: "policy-url"
            },
            locale: {
                type: String,
                reflect: !0
            },
            theme: {
                type: String,
                attribute: "data-theme",
                reflect: !0
            },
            visible: {
                type: Boolean,
                reflect: !0
            }
        },
        tO.styles = [tA, eN`
      :host {
        position: fixed;
        inset-inline-end: 24px;
        bottom: 24px;
        inset-inline-start: auto;
        z-index: 2147483645;
        display: none;
        box-sizing: border-box;
        width: 100%;
        max-width: 420px;
        pointer-events: none;
      }

      :host([visible]) {
        display: block;
      }

      .card {
        position: relative;
        pointer-events: auto;
        padding: 24px;
        padding-top: 40px;
        background: var(--cc-bg);
        color: var(--cc-fg);
        border: 1px solid var(--cc-border);
        border-radius: var(--radius, 12px);
        box-shadow: var(--cc-shadow-card);
      }

      .close {
        position: absolute;
        top: 12px;
        inset-inline-end: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        margin: 0;
        padding: 0;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--cc-fg);
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
      }

      .close:hover {
        opacity: 0.85;
        background: var(--cc-hover-bg);
      }

      .inner {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .text {
        margin: 0;
        padding-inline-end: 8px;
        color: var(--cc-fg);
        font-size: 14px;
        line-height: 1.5;
      }

      .actions .cc-btn {
        width: 100%;
        min-width: 0;
        min-height: 40px;
        font-weight: 500;
      }

      @media (max-width: 480px) {
        :host {
          inset-inline-end: 16px;
          bottom: 16px;
          max-width: calc(100vw - 32px);
        }

        .card {
          padding: 20px;
          padding-top: 36px;
        }
      }
    `],
        tO = y([tE("converge-notice-only")], tO);
        var tL = class extends tC {
            constructor() {
                super(...arguments),
                this._close = () => {
                    this.dispatchEvent(new CustomEvent("pref-close",{
                        bubbles: !0,
                        composed: !0
                    }))
                }
                ,
                this._emitSave = () => {
                    this.dispatchEvent(new CustomEvent("preferences-save",{
                        detail: {
                            functional: this.functional,
                            analytics: this.analytics,
                            advertising: this.advertising
                        },
                        bubbles: !0,
                        composed: !0
                    }))
                }
            }
            willUpdate(e) {
                e.has("visible") && this.visible && this.data?.preference && (this.functional = this.data.preference.functional,
                this.analytics = this.data.preference.analytics,
                this.advertising = this.data.preference.advertising)
            }
            _onCategoryChange(e, t) {
                let i = t.target.checked;
                "functional" === e ? this.functional = i : "analytics" === e ? this.analytics = i : this.advertising = i
            }
            _renderToggle(e, t, i) {
                return tl`
      <label class="toggle ${t ? "toggle--disabled" : ""}">
        <input
          type="checkbox"
          .checked=${e}
          ?disabled=${t}
          @change=${i}
        />
        <span class="toggle-track"></span>
        <span class="toggle-thumb"></span>
      </label>
    `
            }
            render() {
                return this.visible ? tl`
      <div class="backdrop" role="presentation"></div>
      <div
        class="panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pref-dialog-title"
      >
        <button
          type="button"
          class="panel-close"
          aria-label=${ef.t("pref.close")}
          @click=${this._close}
        >
          ×
        </button>

        <div class="header">
          <h2 id="pref-dialog-title">${ef.t("pref.title")}</h2>
        </div>

        <div class="body">
          <section class="category">
            <div class="row">
              <div class="title-group">
                <h3>${ef.t("pref.necessary.title")}</h3>
                <span class="always-on-badge">${ef.t("pref.alwaysOn")}</span>
              </div>
              ${this._renderToggle(!0, !0)}
            </div>
            <p class="desc">${ef.t("pref.necessary.desc")}</p>
          </section>

          <section class="category">
            <div class="row">
              <div class="title-group">
                <h3>${ef.t("pref.functional.title")}</h3>
              </div>
              ${this._renderToggle(this.functional, !1, e => this._onCategoryChange("functional", e))}
            </div>
            <p class="desc">${ef.t("pref.functional.desc")}</p>
          </section>

          <section class="category">
            <div class="row">
              <div class="title-group">
                <h3>${ef.t("pref.analytics.title")}</h3>
              </div>
              ${this._renderToggle(this.analytics, !1, e => this._onCategoryChange("analytics", e))}
            </div>
            <p class="desc">${ef.t("pref.analytics.desc")}</p>
          </section>

          <section class="category">
            <div class="row">
              <div class="title-group">
                <h3>${ef.t("pref.advertising.title")}</h3>
              </div>
              ${this._renderToggle(this.advertising, !1, e => this._onCategoryChange("advertising", e))}
            </div>
            <p class="desc">${ef.t("pref.advertising.desc")}</p>
          </section>
        </div>

        <div class="footer">
          <button type="button" class="cc-btn cc-btn--ghost" @click=${this._emitSave}>
            ${ef.t("pref.save")}
          </button>
        </div>
      </div>
    ` : null
            }
        }
        ;
        tL.properties = {
            locale: {
                type: String,
                reflect: !0
            },
            theme: {
                type: String,
                attribute: "data-theme",
                reflect: !0
            },
            visible: {
                type: Boolean,
                reflect: !0
            },
            data: {
                type: Object,
                attribute: !1
            },
            functional: {
                type: Boolean,
                state: !0
            },
            analytics: {
                type: Boolean,
                state: !0
            },
            advertising: {
                type: Boolean,
                state: !0
            }
        },
        tL.styles = [tA, eN`
      :host {
        --cc-toggle-on: #22c55e;
        --cc-toggle-locked: #7a9e86;
        --cc-toggle-locked: color-mix(
          in srgb,
          var(--cc-toggle-on) 38%,
          var(--cc-border) 62%
        );
        --cc-always-on-bg: #22c55e;
        --cc-always-on-fg: #ffffff;
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
      }

      :host([data-theme='dark']) {
        --cc-toggle-locked: #5a7d66;
        --cc-toggle-locked: color-mix(
          in srgb,
          var(--cc-toggle-on) 32%,
          var(--cc-border) 68%
        );
      }

      :host([visible]) {
        display: flex;
      }

      .backdrop {
        position: absolute;
        inset: 0;
        background: var(--cc-overlay);
        backdrop-filter: blur(4px);
      }

      .panel {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        max-width: 560px;
        width: 100%;
        max-height: 60vh;
        overflow: hidden;
        padding: 20px;
        border-radius: var(--radius, 12px);
        background: var(--cc-bg-modal);
        color: var(--cc-fg);
        border: 1px solid var(--cc-border);
        box-shadow: var(--cc-shadow-modal);
      }

      .panel-close {
        position: absolute;
        top: 16px;
        inset-inline-end: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        margin: 0;
        padding: 0;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--cc-fg);
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
      }

      .panel-close:hover {
        opacity: 0.85;
        background: var(--cc-hover-bg);
      }

      .header {
        flex-shrink: 0;
        padding-inline-end: 36px;
        margin-bottom: 15px;
      }

      .body {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      .header h2 {
        margin: 0px;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.3;
      }

      .intro {
        margin: 0 0 16px;
        color: var(--cc-muted);
        font-size: 14px;
        line-height: 1.5;
      }

      .category {
        padding: 12px 0;
        border-bottom: 1px solid var(--cc-border);
      }

      .category:last-of-type {
        border-bottom: none;
      }

      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .title-group {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex: 1;
      }

      .title-group h3 {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.3;
      }

      .always-on-badge {
        flex-shrink: 0;
        padding: 2px 10px;
        border-radius: 999px;
        background: var(--cc-always-on-bg);
        color: var(--cc-always-on-fg);
        font-size: 12px;
        font-weight: 500;
        line-height: 1.4;
        white-space: nowrap;
      }

      .desc {
        margin: 8px 0 0;
        color: var(--cc-muted);
        font-size: 13px;
        line-height: 1.5;
      }

      .toggle {
        position: relative;
        display: inline-flex;
        flex-shrink: 0;
        width: 44px;
        height: 24px;
        cursor: pointer;
      }

      .toggle input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggle-track {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        background: var(--cc-border);
        transition: background 0.15s ease;
      }

      .toggle input:checked + .toggle-track {
        background: var(--cc-toggle-on);
      }

      .toggle input:disabled + .toggle-track {
        background: var(--cc-toggle-locked);
        opacity: 1;
        cursor: not-allowed;
      }

      .toggle input:disabled:checked + .toggle-track {
        background: var(--cc-toggle-locked);
      }

      .toggle-thumb {
        position: absolute;
        top: 2px;
        inset-inline-start: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: inset-inline-start 0.15s ease;
        pointer-events: none;
      }

      .toggle input:checked ~ .toggle-thumb,
      .toggle input:disabled:checked ~ .toggle-thumb {
        inset-inline-start: calc(100% - 22px);
      }

      .toggle input:disabled ~ .toggle-thumb {
        opacity: 0.92;
      }

      .toggle--disabled {
        cursor: not-allowed;
      }

      .footer {
        flex-shrink: 0;
        display: flex;
        justify-content: end;
        padding-top: 16px;
        border-top: 1px solid var(--cc-border);
      }

      .footer .cc-btn {
        min-width: 140px;
      }
    `],
        tL = y([tE("converge-preference-center")], tL);
        var tR = class extends tC {
            constructor() {
                super(),
                this.onAcceptAll = () => {
                    this.data && this.emitConsentChange({
                        ...this.data,
                        hasChoice: !0,
                        preference: {
                            ...v
                        }
                    })
                }
                ,
                this.onRejectAll = () => {
                    this.data && this.emitConsentChange({
                        ...this.data,
                        hasChoice: !0,
                        preference: {
                            ...k
                        }
                    })
                }
                ,
                this.onNoticeDismiss = () => {
                    this.data && this.emitConsentChange({
                        ...this.data,
                        hasChoice: !0,
                        preference: {
                            ...v
                        }
                    })
                }
                ,
                this.onPrefSave = e => {
                    this.data && this.emitConsentChange({
                        ...this.data,
                        hasChoice: !0,
                        preference: {
                            strictlyNecessary: !0,
                            ...e.detail
                        }
                    })
                }
                ,
                this.data = null,
                this.surface = "none",
                this.prefOpen = !1
            }
            emitConsentChange(e) {
                this.dispatchEvent(new CustomEvent("consent-data-change",{
                    detail: {
                        data: e
                    },
                    bubbles: !0,
                    composed: !0
                }))
            }
            render() {
                return tl`
      <converge-opt-in-required
        .theme=${this.theme}
        .visible=${"banner" === this.surface}
        locale=${this.locale}
        policy-url=${this.policyUrl}
        @accept-all=${this.onAcceptAll}
        @reject-all=${this.onRejectAll}
      ></converge-opt-in-required>
      <converge-notice-only
        .theme=${this.theme}
        .visible=${"notice" === this.surface}
        locale=${this.locale}
        policy-url=${this.policyUrl}
        @dismiss=${this.onNoticeDismiss}
      ></converge-notice-only>
      <converge-preference-center
        .theme=${this.theme}
        locale=${this.locale}
        .visible=${this.prefOpen}
        .data=${this.data}
        @preferences-save=${this.onPrefSave}
      ></converge-preference-center>
    `
            }
        }
        ;
        tR.properties = {
            policyUrl: {
                type: String,
                attribute: "policy-url"
            },
            locale: {
                type: String,
                reflect: !0
            },
            theme: {
                type: String,
                attribute: "data-theme",
                reflect: !0
            },
            data: {
                type: Object,
                attribute: !1
            },
            surface: {
                type: String,
                attribute: !1
            },
            prefOpen: {
                type: Boolean,
                attribute: !1
            }
        },
        tR = y([tE("converge-cookie-manager")], tR);
        var tz = class {
            constructor(e) {
                this.handlers = e,
                this.root = null,
                this.options = null
            }
            configure(e) {
                this.options = e,
                this.root && this.syncRootAttributes(this.root)
            }
            syncState(e) {
                this.ensureMounted(),
                this.root.data = e.data,
                this.root.surface = e.surface,
                this.root.prefOpen = e.prefOpen
            }
            ensureMounted() {
                if ("undefined" == typeof document || this.root?.isConnected)
                    return;
                let e = document.createElement("converge-cookie-manager");
                e.addEventListener("consent-data-change", e => {
                    let t = e.detail;
                    this.handlers.onConsentDataChange(t)
                }
                ),
                e.addEventListener("open-preferences", () => {
                    this.handlers.onOpenPreferences()
                }
                ),
                e.addEventListener("pref-close", () => {
                    this.handlers.onPrefClose()
                }
                ),
                this.syncRootAttributes(e),
                document.body.appendChild(e),
                this.root = e
            }
            syncRootAttributes(e=this.root) {
                let t = this.options?.policyUrl ?? ""
                  , i = this.options?.locale ?? "en"
                  , s = this.options?.theme ?? "light";
                e.setAttribute("policy-url", t),
                e.setAttribute("locale", i),
                e.setAttribute("data-theme", s),
                e.dir = eu.includes(i) ? "rtl" : "ltr"
            }
        }
          , tj = class e {
            constructor() {
                this.consentCookie = new _,
                this.regionClient = new em,
                this.ui = new tz({
                    onConsentDataChange: e => this.onConsentDataChange(e),
                    onOpenPreferences: () => this.openPreferenceCenter(),
                    onPrefClose: () => this.closePreferenceCenter()
                }),
                this.data = null,
                this.surface = "none",
                this.prefOpen = !1,
                this.listeners = [],
                this.initialized = !1,
                this.config = {
                    locale: "en",
                    policyUrl: "https://converge.ai/cookie-policy",
                    theme: "light"
                }
            }
            static getInstance() {
                return null === e.instance && (e.instance = new e),
                e.instance
            }
            onDataChange(e) {
                return this.listeners.push(e),
                () => {
                    let t = this.listeners.indexOf(e);
                    -1 !== t && this.listeners.splice(t, 1)
                }
            }
            getData() {
                return this.data
            }
            openPreferenceCenter() {
                this.data && (this.prefOpen = !0,
                this.syncUI())
            }
            closePreferenceCenter() {
                this.prefOpen = !1,
                this.syncUI()
            }
            async init(e) {
                let t;
                if (this.initialized)
                    return;
                this.applyConfig(e);
                let i = this.consentCookie.read();
                if (i)
                    t = i.data;
                else {
                    let e = await this.regionClient.fetch();
                    t = {
                        countryCode: e.countryCode,
                        mode: e.mode,
                        hasChoice: !1,
                        preference: null
                    }
                }
                this.data = t.hasChoice ? t : {
                    ...t,
                    preference: this.getDefaultPreference(t.mode)
                },
                this.syncSurface(),
                this.syncUI(),
                this.emit(),
                this.initialized = !0
            }
            update(e) {
                this.applyConfig(e)
            }
            getDefaultPreference(e) {
                return "notice_only" === e ? {
                    ...v
                } : {
                    ...k
                }
            }
            deriveSurface(e) {
                return !e || e.hasChoice ? "none" : "opt_in" === e.mode ? "banner" : "notice"
            }
            syncSurface() {
                this.surface = this.deriveSurface(this.data)
            }
            syncUI() {
                this.data && this.ui.syncState({
                    data: this.data,
                    surface: this.surface,
                    prefOpen: this.prefOpen
                })
            }
            emit() {
                if (this.data)
                    for (let e of this.listeners)
                        e(this.data)
            }
            onConsentDataChange({data: e}) {
                this.data = e,
                this.consentCookie.write(e),
                this.prefOpen = !1,
                this.syncSurface(),
                this.syncUI(),
                this.emit()
            }
            applyConfig(e) {
                let t = e?.locale ?? this.config.locale;
                ef.init(t),
                this.config = {
                    theme: e?.theme ?? this.config.theme,
                    policyUrl: e?.policyUrl ?? this.config.policyUrl,
                    locale: ef.locale
                },
                this.ui.configure(this.config)
            }
        }
        ;
        tj.instance = null;
        var tN = tj.getInstance()
    }
}]);
//# sourceMappingURL=8d704858-ae2cb31eaf5b4ff9.js.map
