function Kc(i) {
    const e = new AbortController
      , t = e.signal
      , n = o => {
        try {
            i.onDeferredError?.(o)
        } catch {}
    }
      , r = () => {
        if (t.aborted)
            throw new DOMException("Startup cancelled","AbortError")
    }
    ;
    async function s(o, l) {
        let c = 0;
        const h = async () => {
            for (; c < o.length; ) {
                r(),
                l && typeof document < "u" && document.visibilityState === "hidden" && await new Promise( (p, m) => {
                    const g = () => {
                        document.removeEventListener("visibilitychange", _),
                        t.removeEventListener("abort", f)
                    }
                      , _ = () => {
                        document.visibilityState !== "hidden" && (g(),
                        p())
                    }
                      , f = () => {
                        g(),
                        m(new DOMException("Startup cancelled","AbortError"))
                    }
                    ;
                    document.addEventListener("visibilitychange", _),
                    t.addEventListener("abort", f, {
                        once: !0
                    }),
                    t.aborted ? f() : _()
                }
                ),
                r();
                const d = o[c++];
                if (!d)
                    return;
                try {
                    await d(t)
                } catch (p) {
                    if (!l)
                        throw e.abort(),
                        p;
                    t.aborted || n(p)
                }
            }
        }
        ;
        await Promise.all(Array.from({
            length: Math.min(2, o.length)
        }, h))
    }
    return {
        ready: (async () => {
            await s(i.critical, !1),
            r(),
            await i.initializeInteractiveScene(t),
            await i.reportPlayable(t),
            r(),
            s(i.deferred ?? [], !0).catch(o => {
                t.aborted || n(o)
            }
            )
        }
        )().catch(o => {
            throw e.abort(),
            o
        }
        ),
        dispose: () => e.abort()
    }
}
const fc = "combos.layout-contract.v1"
  , Za = "combos.gameplay-test.v1"
  , Ja = 128
  , Qa = 64
  , Zc = ["gameplay", "hud", "controls", "modal", "text", "decorative"]
  , Jc = ["unknown", "loading", "ready", "playing", "paused", "won", "lost", "retrying", "error"]
  , Qc = ["none", "victory", "defeat"]
  , el = ["start", "primary", "victory", "defeat", "retry"]
  , tl = ["loading_complete", "game_started", "primary_input", "victory", "defeat", "retry", "visual_feedback", "audio_feedback", "state_restored"]
  , nl = new Set(Zc)
  , il = new Set(Jc)
  , rl = new Set(Qc)
  , sl = new Set(el)
  , al = new Set(tl)
  , pc = Object.freeze({
    pc: Object.freeze({
        minimumGutterCSSPX: 16,
        hudBandCSSPX: 72,
        controlsBandCSSPX: 0,
        minimumInteractiveCSSPX: 32,
        minimumTextCSSPX: 12
    }),
    mobile_portrait: Object.freeze({
        minimumGutterCSSPX: 12,
        hudBandCSSPX: 64,
        controlsBandCSSPX: 120,
        minimumInteractiveCSSPX: 44,
        minimumTextCSSPX: 12
    }),
    mobile_landscape: Object.freeze({
        minimumGutterCSSPX: 12,
        hudBandCSSPX: 56,
        controlsBandCSSPX: 96,
        minimumInteractiveCSSPX: 44,
        minimumTextCSSPX: 12
    })
});
function wa(i) {
    return typeof i == "object" && i !== null
}
function mc(i) {
    return nl.has(i)
}
function ol(i) {
    return il.has(i)
}
function cl(i) {
    return rl.has(i)
}
function eo(i) {
    return sl.has(i)
}
function ll(i) {
    return al.has(i)
}
function Mt(i, e=0) {
    const t = Number(i);
    return Number.isFinite(t) ? t : e
}
function an(i, e) {
    const t = String(i || "").trim().slice(0, 64);
    return /^[A-Za-z0-9_.:-]+$/.test(t) ? t : e
}
function ul(i, e) {
    if (!e || !wa(e))
        return Object.freeze({
            type: "callback"
        });
    const t = an(e.type, "")
      , n = String(e.selector || "").trim().slice(0, 256);
    if (t === "keyboard") {
        const r = String(e.key || "").trim().slice(0, 32);
        if (!r)
            throw new TypeError(`Gameplay action ${i} keyboard binding requires key`);
        return Object.freeze({
            type: t,
            key: r,
            ...n ? {
                selector: n
            } : {}
        })
    }
    if (t === "selector") {
        if (!n)
            throw new TypeError(`Gameplay action ${i} selector binding requires selector`);
        return Object.freeze({
            type: t,
            selector: n
        })
    }
    if (t === "pointer" || t === "touch")
        return Object.freeze({
            type: t,
            selector: n || "canvas",
            x: Math.max(0, Math.min(1, Mt(e.x, .5))),
            y: Math.max(0, Math.min(1, Mt(e.y, .5)))
        });
    if (t === "callback")
        return Object.freeze({
            type: t
        });
    throw new TypeError(`Unsupported gameplay action binding for ${i}: ${t}`)
}
function Ca(i) {
    const e = wa(i) ? i : {};
    return {
        x: Mt(e.x ?? e.left),
        y: Mt(e.y ?? e.top),
        width: Math.max(0, Mt(e.width)),
        height: Math.max(0, Mt(e.height))
    }
}
function xc(i, e) {
    return {
        x: i.x * e,
        y: i.y * e,
        width: i.width * e,
        height: i.height * e
    }
}
function dl(i, e, t) {
    const n = Math.max(1e-6, Mt(e.fitScale, 1))
      , r = {
        width: Math.max(1, Mt(e.viewportWidth, e.cssWidth)),
        height: Math.max(1, Mt(e.viewportHeight, e.cssHeight)),
        dpr: Math.max(1, Mt(e.dpr, 1))
    }
      , s = r.width >= r.height ? "landscape" : "portrait";
    r.width <= 900 || r.height <= 500;
    const a = s === "portrait" ? "mobile_portrait" : "mobile_landscape"
      , o = pc[a]
      , l = xc(Ca(e.referenceRect), n)
      , c = {
        top: Math.max(0, Mt(e.viewportSafeAreaInsets?.top)),
        right: Math.max(0, Mt(e.viewportSafeAreaInsets?.right)),
        bottom: Math.max(0, Mt(e.viewportSafeAreaInsets?.bottom)),
        left: Math.max(0, Mt(e.viewportSafeAreaInsets?.left))
    }
      , h = o.minimumGutterCSSPX
      , d = Math.min(r.width, Math.max(l.x, c.left) + h)
      , p = Math.min(r.height, Math.max(l.y, c.top) + h)
      , m = Math.max(d, Math.min(l.x + l.width, r.width - c.right) - h)
      , g = Math.max(p, Math.min(l.y + l.height, r.height - c.bottom) - h)
      , _ = {
        x: d,
        y: p,
        width: m - d,
        height: g - p
    }
      , f = Math.min(_.height, o.hudBandCSSPX)
      , u = Math.min(Math.max(0, _.height - f), o.controlsBandCSSPX)
      , b = Math.max(0, _.height - f - u);
    return {
        schema_version: fc,
        target_profile: i,
        active_profile: a,
        orientation: s,
        viewport: r,
        reference_rect: l,
        safe_rect: _,
        zones: {
            hud: {
                x: d,
                y: p,
                width: _.width,
                height: f
            },
            gameplay: {
                x: d,
                y: p + f,
                width: _.width,
                height: b
            },
            controls: {
                x: d,
                y: g - u,
                width: _.width,
                height: u
            }
        },
        rules: {
            root_must_fill_viewport: !0,
            critical_ui_within_safe_rect: !0,
            disallow_critical_ui_overlap: !0,
            minimum_gutter_css_px: h,
            minimum_interactive_css_px: o.minimumInteractiveCSSPX,
            minimum_text_css_px: o.minimumTextCSSPX
        }
    }
}
function hl(i, e, t, n) {
    const r = an(i.getAttribute("data-combos-ui-region"), "");
    if (!mc(r))
        return null;
    const s = Ca(i.getBoundingClientRect())
      , a = typeof t.getComputedStyle == "function" ? t.getComputedStyle(i) : null
      , o = i.isConnected !== !1 && a?.display !== "none" && a?.visibility !== "hidden" && Mt(a?.opacity, 1) !== 0 && s.width > 0 && s.height > 0
      , l = o && (Mt(i.scrollWidth) > Mt(i.clientWidth) + 1 || Mt(i.scrollHeight) > Mt(i.clientHeight) + 1)
      , c = o && a?.pointerEvents !== "none" && typeof n.elementFromPoint == "function" ? n.elementFromPoint(s.x + s.width / 2, s.y + s.height / 2) : null
      , h = !!(c && c !== i && !i.contains(c))
      , d = String(i.getAttribute("data-combos-ui-critical") || "").toLowerCase()
      , p = String(i.getAttribute("data-combos-overlap-allow") || "").split(",").map(m => an(m, "")).filter(Boolean).slice(0, 16);
    return {
        id: an(i.getAttribute("data-combos-ui-id") || i.id, `${r}-${e + 1}`),
        role: r,
        critical: d ? d !== "false" : r !== "decorative" && r !== "gameplay",
        interactive: i.matches('button, [role="button"], input, select, textarea, [data-combos-interactive="true"]'),
        visible: o,
        content_overflow: l,
        occluded: h,
        font_size_css_px: Math.max(0, Mt(a?.fontSize)),
        allows_overlap_with: p,
        rect: s,
        source: "dom"
    }
}
function fl(i, e) {
    const t = {
        ...i,
        phase: e
    }
      , n = ["ready", "playing", "paused", "won", "lost", "retrying"]
      , r = ["playing", "paused", "won", "lost", "retrying"];
    return n.includes(e) && (t.loading_complete = !0,
    t.input_ready = !0),
    r.includes(e) && (t.core_loop_started = !0),
    e === "won" && (t.outcome = "victory"),
    e === "lost" && (t.outcome = "defeat"),
    e === "retrying" && (t.outcome = "none"),
    t
}
function pl({profile: i, surfaceTemplate: e, windowObject: t=window, documentObject: n=document}) {
    if (!Object.prototype.hasOwnProperty.call(pc, i))
        throw new Error(`Unsupported Combos layout profile: ${i}`);
    if (!e || typeof e.getMetrics != "function")
        throw new Error("Surface Template v2 is required before installing Combos contracts");
    const r = new Map
      , s = new Map
      , a = new Map
      , o = [];
    let l = 0
      , c = {
        phase: "unknown",
        loading_complete: !1,
        input_ready: !1,
        core_loop_started: !1,
        outcome: "none",
        retry_available: !1,
        persisted_state_loaded: !1
    };
    function h() {
        const _ = e.getMetrics();
        t.navigator?.maxTouchPoints > 0 || t.matchMedia?.("(pointer: coarse)")?.matches;
        const f = dl(i, _)
          , u = []
          , b = typeof n.querySelectorAll == "function" ? [...n.querySelectorAll("[data-combos-ui-region]")] : [];
        for (const v of b.slice(0, Ja)) {
            const T = hl(v, u.length, t, n);
            T && u.push(T)
        }
        for (const v of r.values()) {
            if (u.length >= Ja)
                break;
            try {
                let T = Ca(v.getRect());
                v.coordinateSpace === "surface" && (T = xc(T, Math.max(1e-6, Mt(_.fitScale, 1)))),
                u.push({
                    id: v.id,
                    role: v.role,
                    critical: v.critical,
                    interactive: v.interactive,
                    visible: v.visible(),
                    content_overflow: v.contentOverflow(),
                    occluded: v.occluded(),
                    font_size_css_px: v.fontSizeCSSPX,
                    allows_overlap_with: [...v.allowsOverlapWith],
                    rect: T,
                    source: "registered"
                })
            } catch {
                u.push({
                    id: v.id,
                    role: v.role,
                    critical: v.critical,
                    interactive: v.interactive,
                    visible: !1,
                    content_overflow: !1,
                    occluded: !1,
                    font_size_css_px: v.fontSizeCSSPX,
                    allows_overlap_with: [...v.allowsOverlapWith],
                    rect: {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    },
                    source: "registered"
                })
            }
        }
        return {
            ...f,
            regions: u
        }
    }
    const d = Object.freeze({
        schemaVersion: fc,
        targetProfile: i,
        getSnapshot: h,
        registerRegion(_) {
            const f = _
              , u = an(f?.id, "")
              , b = an(f?.role, "")
              , v = f?.getRect;
            if (!f || !u || !mc(b) || typeof v != "function")
                throw new TypeError("registerRegion requires a bounded id, known role, and getRect callback");
            const T = f.visible
              , C = f.contentOverflow
              , E = f.occluded
              , R = {
                id: u,
                role: b,
                getRect: v,
                coordinateSpace: f.coordinateSpace === "surface" ? "surface" : "viewport",
                critical: f.critical ?? (b !== "decorative" && b !== "gameplay"),
                interactive: !!f.interactive,
                visible: typeof T == "function" ? T : () => T !== !1,
                contentOverflow: typeof C == "function" ? C : () => !!C,
                occluded: typeof E == "function" ? E : () => !!E,
                fontSizeCSSPX: Math.max(0, Mt(f.fontSizeCSSPX)),
                allowsOverlapWith: Array.isArray(f.allowsOverlapWith) ? f.allowsOverlapWith.map(F => an(F, "")).filter(Boolean).slice(0, 16) : []
            };
            return r.set(u, R),
            () => {
                r.delete(u)
            }
        }
    });
    function p(_) {
        if (!_ || !wa(_) || Array.isArray(_))
            throw new TypeError("Gameplay state patch must be an object");
        const f = _;
        let u = {
            ...c
        };
        if (f.phase !== void 0) {
            const v = an(f.phase, "");
            if (!ol(v))
                throw new TypeError(`Unsupported gameplay phase: ${v}`);
            u = fl(u, v)
        }
        const b = ["loading_complete", "input_ready", "core_loop_started", "retry_available", "persisted_state_loaded"];
        for (const v of b)
            f[v] !== void 0 && (u[v] = !!f[v]);
        if (f.outcome !== void 0) {
            const v = an(f.outcome, "");
            if (!cl(v))
                throw new TypeError(`Unsupported gameplay outcome: ${v}`);
            u.outcome = v
        }
        return c = u,
        {
            ...c
        }
    }
    function m(_) {
        const f = an(_, "");
        if (!ll(f))
            throw new TypeError(`Unsupported gameplay event: ${f}`);
        switch (l += 1,
        o.push({
            sequence: l,
            type: f
        }),
        o.length > Qa && o.splice(0, o.length - Qa),
        f) {
        case "loading_complete":
            p({
                phase: "ready"
            });
            break;
        case "game_started":
        case "primary_input":
            p({
                phase: "playing"
            });
            break;
        case "victory":
            p({
                phase: "won",
                retry_available: !0
            });
            break;
        case "defeat":
            p({
                phase: "lost",
                retry_available: !0
            });
            break;
        case "retry":
            p({
                phase: "retrying",
                outcome: "none"
            });
            break;
        case "state_restored":
            p({
                persisted_state_loaded: !0
            });
            break
        }
        return {
            ...c
        }
    }
    const g = Object.freeze({
        schemaVersion: Za,
        reportState: p,
        reportEvent: m,
        registerAction(_, f, u) {
            const b = an(_, "");
            if (!eo(b) || typeof f != "function")
                throw new TypeError("registerAction supports start, primary, victory, defeat, or retry with a callback");
            return s.set(b, f),
            a.set(b, ul(b, u)),
            () => {
                s.delete(b),
                a.delete(b)
            }
        },
        async invokeAction(_) {
            const f = an(_, "");
            if (!eo(f))
                throw new Error(`Gameplay test action is not registered: ${f}`);
            const u = s.get(f);
            if (!u)
                throw new Error(`Gameplay test action is not registered: ${f}`);
            return u()
        },
        getSnapshot() {
            return {
                schema_version: Za,
                state: {
                    ...c
                },
                registered_actions: [...s.keys()].sort(),
                events: o.map(_ => ({
                    ..._
                }))
            }
        },
        getProbePlan() {
            return {
                bindings: Object.fromEntries([...a.entries()].map( ([f,u]) => [f, {
                    ...u
                }]))
            }
        }
    });
    return t.__combosLayoutContract = d,
    t.__combosGameplayTest = g,
    Object.freeze({
        layout: d,
        gameplay: g,
        dispose() {
            r.clear(),
            s.clear(),
            a.clear(),
            o.length = 0,
            t.__combosLayoutContract === d && delete t.__combosLayoutContract,
            t.__combosGameplayTest === g && delete t.__combosGameplayTest
        }
    })
}
const Ra = "181"
  , ml = 0
  , to = 1
  , xl = 2
  , gc = 1
  , gl = 2
  , Un = 3
  , jn = 0
  , $t = 1
  , xn = 2
  , On = 0
  , Di = 1
  , no = 2
  , io = 3
  , ro = 4
  , _l = 5
  , ai = 100
  , vl = 101
  , Ml = 102
  , bl = 103
  , Sl = 104
  , yl = 200
  , El = 201
  , Tl = 202
  , Al = 203
  , Us = 204
  , Ns = 205
  , wl = 206
  , Cl = 207
  , Rl = 208
  , Pl = 209
  , Ll = 210
  , Dl = 211
  , Il = 212
  , Ul = 213
  , Nl = 214
  , Fs = 0
  , Os = 1
  , Bs = 2
  , Ui = 3
  , zs = 4
  , Vs = 5
  , ks = 6
  , Gs = 7
  , _c = 0
  , Fl = 1
  , Ol = 2
  , $n = 0
  , Bl = 1
  , zl = 2
  , Vl = 3
  , vc = 4
  , kl = 5
  , Gl = 6
  , Hl = 7
  , Mc = 300
  , Ni = 301
  , Fi = 302
  , Hs = 303
  , Ws = 304
  , Zr = 306
  , Xs = 1e3
  , Fn = 1001
  , qs = 1002
  , en = 1003
  , Wl = 1004
  , mr = 1005
  , ln = 1006
  , ns = 1007
  , ci = 1008
  , yn = 1009
  , bc = 1010
  , Sc = 1011
  , ar = 1012
  , Pa = 1013
  , ui = 1014
  , bn = 1015
  , zi = 1016
  , La = 1017
  , Da = 1018
  , or = 1020
  , yc = 35902
  , Ec = 35899
  , Tc = 1021
  , Ac = 1022
  , _n = 1023
  , cr = 1026
  , lr = 1027
  , Ia = 1028
  , Ua = 1029
  , Na = 1030
  , Fa = 1031
  , Oa = 1033
  , kr = 33776
  , Gr = 33777
  , Hr = 33778
  , Wr = 33779
  , Ys = 35840
  , $s = 35841
  , js = 35842
  , Ks = 35843
  , Zs = 36196
  , Js = 37492
  , Qs = 37496
  , ea = 37808
  , ta = 37809
  , na = 37810
  , ia = 37811
  , ra = 37812
  , sa = 37813
  , aa = 37814
  , oa = 37815
  , ca = 37816
  , la = 37817
  , ua = 37818
  , da = 37819
  , ha = 37820
  , fa = 37821
  , pa = 36492
  , ma = 36494
  , xa = 36495
  , ga = 36283
  , _a = 36284
  , va = 36285
  , Ma = 36286
  , Xl = 3200
  , ql = 3201
  , wc = 0
  , Yl = 1
  , Xn = ""
  , on = "srgb"
  , Oi = "srgb-linear"
  , qr = "linear"
  , pt = "srgb"
  , fi = 7680
  , so = 519
  , $l = 512
  , jl = 513
  , Kl = 514
  , Cc = 515
  , Zl = 516
  , Jl = 517
  , Ql = 518
  , eu = 519
  , ao = 35044
  , oo = "300 es"
  , Sn = 2e3
  , Yr = 2001;
function Rc(i) {
    for (let e = i.length - 1; e >= 0; --e)
        if (i[e] >= 65535)
            return !0;
    return !1
}
function $r(i) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", i)
}
function tu() {
    const i = $r("canvas");
    return i.style.display = "block",
    i
}
const co = {};
function lo(...i) {
    const e = "THREE." + i.shift();
    console.log(e, ...i)
}
function Ye(...i) {
    const e = "THREE." + i.shift();
    console.warn(e, ...i)
}
function bt(...i) {
    const e = "THREE." + i.shift();
    console.error(e, ...i)
}
function ur(...i) {
    const e = i.join(" ");
    e in co || (co[e] = !0,
    Ye(...i))
}
function nu(i, e, t) {
    return new Promise(function(n, r) {
        function s() {
            switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
            case i.WAIT_FAILED:
                r();
                break;
            case i.TIMEOUT_EXPIRED:
                setTimeout(s, t);
                break;
            default:
                n()
            }
        }
        setTimeout(s, t)
    }
    )
}
class Vi {
    addEventListener(e, t) {
        this._listeners === void 0 && (this._listeners = {});
        const n = this._listeners;
        n[e] === void 0 && (n[e] = []),
        n[e].indexOf(t) === -1 && n[e].push(t)
    }
    hasEventListener(e, t) {
        const n = this._listeners;
        return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1
    }
    removeEventListener(e, t) {
        const n = this._listeners;
        if (n === void 0)
            return;
        const r = n[e];
        if (r !== void 0) {
            const s = r.indexOf(t);
            s !== -1 && r.splice(s, 1)
        }
    }
    dispatchEvent(e) {
        const t = this._listeners;
        if (t === void 0)
            return;
        const n = t[e.type];
        if (n !== void 0) {
            e.target = this;
            const r = n.slice(0);
            for (let s = 0, a = r.length; s < a; s++)
                r[s].call(this, e);
            e.target = null
        }
    }
}
const Ft = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let uo = 1234567;
const nr = Math.PI / 180
  , dr = 180 / Math.PI;
function ki() {
    const i = Math.random() * 4294967295 | 0
      , e = Math.random() * 4294967295 | 0
      , t = Math.random() * 4294967295 | 0
      , n = Math.random() * 4294967295 | 0;
    return (Ft[i & 255] + Ft[i >> 8 & 255] + Ft[i >> 16 & 255] + Ft[i >> 24 & 255] + "-" + Ft[e & 255] + Ft[e >> 8 & 255] + "-" + Ft[e >> 16 & 15 | 64] + Ft[e >> 24 & 255] + "-" + Ft[t & 63 | 128] + Ft[t >> 8 & 255] + "-" + Ft[t >> 16 & 255] + Ft[t >> 24 & 255] + Ft[n & 255] + Ft[n >> 8 & 255] + Ft[n >> 16 & 255] + Ft[n >> 24 & 255]).toLowerCase()
}
function Qe(i, e, t) {
    return Math.max(e, Math.min(t, i))
}
function Ba(i, e) {
    return (i % e + e) % e
}
function iu(i, e, t, n, r) {
    return n + (i - e) * (r - n) / (t - e)
}
function ru(i, e, t) {
    return i !== e ? (t - i) / (e - i) : 0
}
function ir(i, e, t) {
    return (1 - t) * i + t * e
}
function su(i, e, t, n) {
    return ir(i, e, 1 - Math.exp(-t * n))
}
function au(i, e=1) {
    return e - Math.abs(Ba(i, e * 2) - e)
}
function ou(i, e, t) {
    return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e),
    i * i * (3 - 2 * i))
}
function cu(i, e, t) {
    return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e),
    i * i * i * (i * (i * 6 - 15) + 10))
}
function lu(i, e) {
    return i + Math.floor(Math.random() * (e - i + 1))
}
function uu(i, e) {
    return i + Math.random() * (e - i)
}
function du(i) {
    return i * (.5 - Math.random())
}
function hu(i) {
    i !== void 0 && (uo = i);
    let e = uo += 1831565813;
    return e = Math.imul(e ^ e >>> 15, e | 1),
    e ^= e + Math.imul(e ^ e >>> 7, e | 61),
    ((e ^ e >>> 14) >>> 0) / 4294967296
}
function fu(i) {
    return i * nr
}
function pu(i) {
    return i * dr
}
function mu(i) {
    return (i & i - 1) === 0 && i !== 0
}
function xu(i) {
    return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2))
}
function gu(i) {
    return Math.pow(2, Math.floor(Math.log(i) / Math.LN2))
}
function _u(i, e, t, n, r) {
    const s = Math.cos
      , a = Math.sin
      , o = s(t / 2)
      , l = a(t / 2)
      , c = s((e + n) / 2)
      , h = a((e + n) / 2)
      , d = s((e - n) / 2)
      , p = a((e - n) / 2)
      , m = s((n - e) / 2)
      , g = a((n - e) / 2);
    switch (r) {
    case "XYX":
        i.set(o * h, l * d, l * p, o * c);
        break;
    case "YZY":
        i.set(l * p, o * h, l * d, o * c);
        break;
    case "ZXZ":
        i.set(l * d, l * p, o * h, o * c);
        break;
    case "XZX":
        i.set(o * h, l * g, l * m, o * c);
        break;
    case "YXY":
        i.set(l * m, o * h, l * g, o * c);
        break;
    case "ZYZ":
        i.set(l * g, l * m, o * h, o * c);
        break;
    default:
        Ye("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r)
    }
}
function Pi(i, e) {
    switch (e.constructor) {
    case Float32Array:
        return i;
    case Uint32Array:
        return i / 4294967295;
    case Uint16Array:
        return i / 65535;
    case Uint8Array:
        return i / 255;
    case Int32Array:
        return Math.max(i / 2147483647, -1);
    case Int16Array:
        return Math.max(i / 32767, -1);
    case Int8Array:
        return Math.max(i / 127, -1);
    default:
        throw new Error("Invalid component type.")
    }
}
function Gt(i, e) {
    switch (e.constructor) {
    case Float32Array:
        return i;
    case Uint32Array:
        return Math.round(i * 4294967295);
    case Uint16Array:
        return Math.round(i * 65535);
    case Uint8Array:
        return Math.round(i * 255);
    case Int32Array:
        return Math.round(i * 2147483647);
    case Int16Array:
        return Math.round(i * 32767);
    case Int8Array:
        return Math.round(i * 127);
    default:
        throw new Error("Invalid component type.")
    }
}
const hr = {
    DEG2RAD: nr,
    RAD2DEG: dr,
    generateUUID: ki,
    clamp: Qe,
    euclideanModulo: Ba,
    mapLinear: iu,
    inverseLerp: ru,
    lerp: ir,
    damp: su,
    pingpong: au,
    smoothstep: ou,
    smootherstep: cu,
    randInt: lu,
    randFloat: uu,
    randFloatSpread: du,
    seededRandom: hu,
    degToRad: fu,
    radToDeg: pu,
    isPowerOfTwo: mu,
    ceilPowerOfTwo: xu,
    floorPowerOfTwo: gu,
    setQuaternionFromProperEuler: _u,
    normalize: Gt,
    denormalize: Pi
};
class Ze {
    constructor(e=0, t=0) {
        Ze.prototype.isVector2 = !0,
        this.x = e,
        this.y = t
    }
    get width() {
        return this.x
    }
    set width(e) {
        this.x = e
    }
    get height() {
        return this.y
    }
    set height(e) {
        this.y = e
    }
    set(e, t) {
        return this.x = e,
        this.y = t,
        this
    }
    setScalar(e) {
        return this.x = e,
        this.y = e,
        this
    }
    setX(e) {
        return this.x = e,
        this
    }
    setY(e) {
        return this.y = e,
        this
    }
    setComponent(e, t) {
        switch (e) {
        case 0:
            this.x = t;
            break;
        case 1:
            this.y = t;
            break;
        default:
            throw new Error("index is out of range: " + e)
        }
        return this
    }
    getComponent(e) {
        switch (e) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        default:
            throw new Error("index is out of range: " + e)
        }
    }
    clone() {
        return new this.constructor(this.x,this.y)
    }
    copy(e) {
        return this.x = e.x,
        this.y = e.y,
        this
    }
    add(e) {
        return this.x += e.x,
        this.y += e.y,
        this
    }
    addScalar(e) {
        return this.x += e,
        this.y += e,
        this
    }
    addVectors(e, t) {
        return this.x = e.x + t.x,
        this.y = e.y + t.y,
        this
    }
    addScaledVector(e, t) {
        return this.x += e.x * t,
        this.y += e.y * t,
        this
    }
    sub(e) {
        return this.x -= e.x,
        this.y -= e.y,
        this
    }
    subScalar(e) {
        return this.x -= e,
        this.y -= e,
        this
    }
    subVectors(e, t) {
        return this.x = e.x - t.x,
        this.y = e.y - t.y,
        this
    }
    multiply(e) {
        return this.x *= e.x,
        this.y *= e.y,
        this
    }
    multiplyScalar(e) {
        return this.x *= e,
        this.y *= e,
        this
    }
    divide(e) {
        return this.x /= e.x,
        this.y /= e.y,
        this
    }
    divideScalar(e) {
        return this.multiplyScalar(1 / e)
    }
    applyMatrix3(e) {
        const t = this.x
          , n = this.y
          , r = e.elements;
        return this.x = r[0] * t + r[3] * n + r[6],
        this.y = r[1] * t + r[4] * n + r[7],
        this
    }
    min(e) {
        return this.x = Math.min(this.x, e.x),
        this.y = Math.min(this.y, e.y),
        this
    }
    max(e) {
        return this.x = Math.max(this.x, e.x),
        this.y = Math.max(this.y, e.y),
        this
    }
    clamp(e, t) {
        return this.x = Qe(this.x, e.x, t.x),
        this.y = Qe(this.y, e.y, t.y),
        this
    }
    clampScalar(e, t) {
        return this.x = Qe(this.x, e, t),
        this.y = Qe(this.y, e, t),
        this
    }
    clampLength(e, t) {
        const n = this.length();
        return this.divideScalar(n || 1).multiplyScalar(Qe(n, e, t))
    }
    floor() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this
    }
    ceil() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this
    }
    round() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this
    }
    roundToZero() {
        return this.x = Math.trunc(this.x),
        this.y = Math.trunc(this.y),
        this
    }
    negate() {
        return this.x = -this.x,
        this.y = -this.y,
        this
    }
    dot(e) {
        return this.x * e.x + this.y * e.y
    }
    cross(e) {
        return this.x * e.y - this.y * e.x
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y)
    }
    normalize() {
        return this.divideScalar(this.length() || 1)
    }
    angle() {
        return Math.atan2(-this.y, -this.x) + Math.PI
    }
    angleTo(e) {
        const t = Math.sqrt(this.lengthSq() * e.lengthSq());
        if (t === 0)
            return Math.PI / 2;
        const n = this.dot(e) / t;
        return Math.acos(Qe(n, -1, 1))
    }
    distanceTo(e) {
        return Math.sqrt(this.distanceToSquared(e))
    }
    distanceToSquared(e) {
        const t = this.x - e.x
          , n = this.y - e.y;
        return t * t + n * n
    }
    manhattanDistanceTo(e) {
        return Math.abs(this.x - e.x) + Math.abs(this.y - e.y)
    }
    setLength(e) {
        return this.normalize().multiplyScalar(e)
    }
    lerp(e, t) {
        return this.x += (e.x - this.x) * t,
        this.y += (e.y - this.y) * t,
        this
    }
    lerpVectors(e, t, n) {
        return this.x = e.x + (t.x - e.x) * n,
        this.y = e.y + (t.y - e.y) * n,
        this
    }
    equals(e) {
        return e.x === this.x && e.y === this.y
    }
    fromArray(e, t=0) {
        return this.x = e[t],
        this.y = e[t + 1],
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this.x,
        e[t + 1] = this.y,
        e
    }
    fromBufferAttribute(e, t) {
        return this.x = e.getX(t),
        this.y = e.getY(t),
        this
    }
    rotateAround(e, t) {
        const n = Math.cos(t)
          , r = Math.sin(t)
          , s = this.x - e.x
          , a = this.y - e.y;
        return this.x = s * n - a * r + e.x,
        this.y = s * r + a * n + e.y,
        this
    }
    random() {
        return this.x = Math.random(),
        this.y = Math.random(),
        this
    }
    *[Symbol.iterator]() {
        yield this.x,
        yield this.y
    }
}
class Kn {
    constructor(e=0, t=0, n=0, r=1) {
        this.isQuaternion = !0,
        this._x = e,
        this._y = t,
        this._z = n,
        this._w = r
    }
    static slerpFlat(e, t, n, r, s, a, o) {
        let l = n[r + 0]
          , c = n[r + 1]
          , h = n[r + 2]
          , d = n[r + 3]
          , p = s[a + 0]
          , m = s[a + 1]
          , g = s[a + 2]
          , _ = s[a + 3];
        if (o <= 0) {
            e[t + 0] = l,
            e[t + 1] = c,
            e[t + 2] = h,
            e[t + 3] = d;
            return
        }
        if (o >= 1) {
            e[t + 0] = p,
            e[t + 1] = m,
            e[t + 2] = g,
            e[t + 3] = _;
            return
        }
        if (d !== _ || l !== p || c !== m || h !== g) {
            let f = l * p + c * m + h * g + d * _;
            f < 0 && (p = -p,
            m = -m,
            g = -g,
            _ = -_,
            f = -f);
            let u = 1 - o;
            if (f < .9995) {
                const b = Math.acos(f)
                  , v = Math.sin(b);
                u = Math.sin(u * b) / v,
                o = Math.sin(o * b) / v,
                l = l * u + p * o,
                c = c * u + m * o,
                h = h * u + g * o,
                d = d * u + _ * o
            } else {
                l = l * u + p * o,
                c = c * u + m * o,
                h = h * u + g * o,
                d = d * u + _ * o;
                const b = 1 / Math.sqrt(l * l + c * c + h * h + d * d);
                l *= b,
                c *= b,
                h *= b,
                d *= b
            }
        }
        e[t] = l,
        e[t + 1] = c,
        e[t + 2] = h,
        e[t + 3] = d
    }
    static multiplyQuaternionsFlat(e, t, n, r, s, a) {
        const o = n[r]
          , l = n[r + 1]
          , c = n[r + 2]
          , h = n[r + 3]
          , d = s[a]
          , p = s[a + 1]
          , m = s[a + 2]
          , g = s[a + 3];
        return e[t] = o * g + h * d + l * m - c * p,
        e[t + 1] = l * g + h * p + c * d - o * m,
        e[t + 2] = c * g + h * m + o * p - l * d,
        e[t + 3] = h * g - o * d - l * p - c * m,
        e
    }
    get x() {
        return this._x
    }
    set x(e) {
        this._x = e,
        this._onChangeCallback()
    }
    get y() {
        return this._y
    }
    set y(e) {
        this._y = e,
        this._onChangeCallback()
    }
    get z() {
        return this._z
    }
    set z(e) {
        this._z = e,
        this._onChangeCallback()
    }
    get w() {
        return this._w
    }
    set w(e) {
        this._w = e,
        this._onChangeCallback()
    }
    set(e, t, n, r) {
        return this._x = e,
        this._y = t,
        this._z = n,
        this._w = r,
        this._onChangeCallback(),
        this
    }
    clone() {
        return new this.constructor(this._x,this._y,this._z,this._w)
    }
    copy(e) {
        return this._x = e.x,
        this._y = e.y,
        this._z = e.z,
        this._w = e.w,
        this._onChangeCallback(),
        this
    }
    setFromEuler(e, t=!0) {
        const n = e._x
          , r = e._y
          , s = e._z
          , a = e._order
          , o = Math.cos
          , l = Math.sin
          , c = o(n / 2)
          , h = o(r / 2)
          , d = o(s / 2)
          , p = l(n / 2)
          , m = l(r / 2)
          , g = l(s / 2);
        switch (a) {
        case "XYZ":
            this._x = p * h * d + c * m * g,
            this._y = c * m * d - p * h * g,
            this._z = c * h * g + p * m * d,
            this._w = c * h * d - p * m * g;
            break;
        case "YXZ":
            this._x = p * h * d + c * m * g,
            this._y = c * m * d - p * h * g,
            this._z = c * h * g - p * m * d,
            this._w = c * h * d + p * m * g;
            break;
        case "ZXY":
            this._x = p * h * d - c * m * g,
            this._y = c * m * d + p * h * g,
            this._z = c * h * g + p * m * d,
            this._w = c * h * d - p * m * g;
            break;
        case "ZYX":
            this._x = p * h * d - c * m * g,
            this._y = c * m * d + p * h * g,
            this._z = c * h * g - p * m * d,
            this._w = c * h * d + p * m * g;
            break;
        case "YZX":
            this._x = p * h * d + c * m * g,
            this._y = c * m * d + p * h * g,
            this._z = c * h * g - p * m * d,
            this._w = c * h * d - p * m * g;
            break;
        case "XZY":
            this._x = p * h * d - c * m * g,
            this._y = c * m * d - p * h * g,
            this._z = c * h * g + p * m * d,
            this._w = c * h * d + p * m * g;
            break;
        default:
            Ye("Quaternion: .setFromEuler() encountered an unknown order: " + a)
        }
        return t === !0 && this._onChangeCallback(),
        this
    }
    setFromAxisAngle(e, t) {
        const n = t / 2
          , r = Math.sin(n);
        return this._x = e.x * r,
        this._y = e.y * r,
        this._z = e.z * r,
        this._w = Math.cos(n),
        this._onChangeCallback(),
        this
    }
    setFromRotationMatrix(e) {
        const t = e.elements
          , n = t[0]
          , r = t[4]
          , s = t[8]
          , a = t[1]
          , o = t[5]
          , l = t[9]
          , c = t[2]
          , h = t[6]
          , d = t[10]
          , p = n + o + d;
        if (p > 0) {
            const m = .5 / Math.sqrt(p + 1);
            this._w = .25 / m,
            this._x = (h - l) * m,
            this._y = (s - c) * m,
            this._z = (a - r) * m
        } else if (n > o && n > d) {
            const m = 2 * Math.sqrt(1 + n - o - d);
            this._w = (h - l) / m,
            this._x = .25 * m,
            this._y = (r + a) / m,
            this._z = (s + c) / m
        } else if (o > d) {
            const m = 2 * Math.sqrt(1 + o - n - d);
            this._w = (s - c) / m,
            this._x = (r + a) / m,
            this._y = .25 * m,
            this._z = (l + h) / m
        } else {
            const m = 2 * Math.sqrt(1 + d - n - o);
            this._w = (a - r) / m,
            this._x = (s + c) / m,
            this._y = (l + h) / m,
            this._z = .25 * m
        }
        return this._onChangeCallback(),
        this
    }
    setFromUnitVectors(e, t) {
        let n = e.dot(t) + 1;
        return n < 1e-8 ? (n = 0,
        Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y,
        this._y = e.x,
        this._z = 0,
        this._w = n) : (this._x = 0,
        this._y = -e.z,
        this._z = e.y,
        this._w = n)) : (this._x = e.y * t.z - e.z * t.y,
        this._y = e.z * t.x - e.x * t.z,
        this._z = e.x * t.y - e.y * t.x,
        this._w = n),
        this.normalize()
    }
    angleTo(e) {
        return 2 * Math.acos(Math.abs(Qe(this.dot(e), -1, 1)))
    }
    rotateTowards(e, t) {
        const n = this.angleTo(e);
        if (n === 0)
            return this;
        const r = Math.min(1, t / n);
        return this.slerp(e, r),
        this
    }
    identity() {
        return this.set(0, 0, 0, 1)
    }
    invert() {
        return this.conjugate()
    }
    conjugate() {
        return this._x *= -1,
        this._y *= -1,
        this._z *= -1,
        this._onChangeCallback(),
        this
    }
    dot(e) {
        return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
    }
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
    }
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
    }
    normalize() {
        let e = this.length();
        return e === 0 ? (this._x = 0,
        this._y = 0,
        this._z = 0,
        this._w = 1) : (e = 1 / e,
        this._x = this._x * e,
        this._y = this._y * e,
        this._z = this._z * e,
        this._w = this._w * e),
        this._onChangeCallback(),
        this
    }
    multiply(e) {
        return this.multiplyQuaternions(this, e)
    }
    premultiply(e) {
        return this.multiplyQuaternions(e, this)
    }
    multiplyQuaternions(e, t) {
        const n = e._x
          , r = e._y
          , s = e._z
          , a = e._w
          , o = t._x
          , l = t._y
          , c = t._z
          , h = t._w;
        return this._x = n * h + a * o + r * c - s * l,
        this._y = r * h + a * l + s * o - n * c,
        this._z = s * h + a * c + n * l - r * o,
        this._w = a * h - n * o - r * l - s * c,
        this._onChangeCallback(),
        this
    }
    slerp(e, t) {
        if (t <= 0)
            return this;
        if (t >= 1)
            return this.copy(e);
        let n = e._x
          , r = e._y
          , s = e._z
          , a = e._w
          , o = this.dot(e);
        o < 0 && (n = -n,
        r = -r,
        s = -s,
        a = -a,
        o = -o);
        let l = 1 - t;
        if (o < .9995) {
            const c = Math.acos(o)
              , h = Math.sin(c);
            l = Math.sin(l * c) / h,
            t = Math.sin(t * c) / h,
            this._x = this._x * l + n * t,
            this._y = this._y * l + r * t,
            this._z = this._z * l + s * t,
            this._w = this._w * l + a * t,
            this._onChangeCallback()
        } else
            this._x = this._x * l + n * t,
            this._y = this._y * l + r * t,
            this._z = this._z * l + s * t,
            this._w = this._w * l + a * t,
            this.normalize();
        return this
    }
    slerpQuaternions(e, t, n) {
        return this.copy(e).slerp(t, n)
    }
    random() {
        const e = 2 * Math.PI * Math.random()
          , t = 2 * Math.PI * Math.random()
          , n = Math.random()
          , r = Math.sqrt(1 - n)
          , s = Math.sqrt(n);
        return this.set(r * Math.sin(e), r * Math.cos(e), s * Math.sin(t), s * Math.cos(t))
    }
    equals(e) {
        return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
    }
    fromArray(e, t=0) {
        return this._x = e[t],
        this._y = e[t + 1],
        this._z = e[t + 2],
        this._w = e[t + 3],
        this._onChangeCallback(),
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this._x,
        e[t + 1] = this._y,
        e[t + 2] = this._z,
        e[t + 3] = this._w,
        e
    }
    fromBufferAttribute(e, t) {
        return this._x = e.getX(t),
        this._y = e.getY(t),
        this._z = e.getZ(t),
        this._w = e.getW(t),
        this._onChangeCallback(),
        this
    }
    toJSON() {
        return this.toArray()
    }
    _onChange(e) {
        return this._onChangeCallback = e,
        this
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x,
        yield this._y,
        yield this._z,
        yield this._w
    }
}
class O {
    constructor(e=0, t=0, n=0) {
        O.prototype.isVector3 = !0,
        this.x = e,
        this.y = t,
        this.z = n
    }
    set(e, t, n) {
        return n === void 0 && (n = this.z),
        this.x = e,
        this.y = t,
        this.z = n,
        this
    }
    setScalar(e) {
        return this.x = e,
        this.y = e,
        this.z = e,
        this
    }
    setX(e) {
        return this.x = e,
        this
    }
    setY(e) {
        return this.y = e,
        this
    }
    setZ(e) {
        return this.z = e,
        this
    }
    setComponent(e, t) {
        switch (e) {
        case 0:
            this.x = t;
            break;
        case 1:
            this.y = t;
            break;
        case 2:
            this.z = t;
            break;
        default:
            throw new Error("index is out of range: " + e)
        }
        return this
    }
    getComponent(e) {
        switch (e) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        default:
            throw new Error("index is out of range: " + e)
        }
    }
    clone() {
        return new this.constructor(this.x,this.y,this.z)
    }
    copy(e) {
        return this.x = e.x,
        this.y = e.y,
        this.z = e.z,
        this
    }
    add(e) {
        return this.x += e.x,
        this.y += e.y,
        this.z += e.z,
        this
    }
    addScalar(e) {
        return this.x += e,
        this.y += e,
        this.z += e,
        this
    }
    addVectors(e, t) {
        return this.x = e.x + t.x,
        this.y = e.y + t.y,
        this.z = e.z + t.z,
        this
    }
    addScaledVector(e, t) {
        return this.x += e.x * t,
        this.y += e.y * t,
        this.z += e.z * t,
        this
    }
    sub(e) {
        return this.x -= e.x,
        this.y -= e.y,
        this.z -= e.z,
        this
    }
    subScalar(e) {
        return this.x -= e,
        this.y -= e,
        this.z -= e,
        this
    }
    subVectors(e, t) {
        return this.x = e.x - t.x,
        this.y = e.y - t.y,
        this.z = e.z - t.z,
        this
    }
    multiply(e) {
        return this.x *= e.x,
        this.y *= e.y,
        this.z *= e.z,
        this
    }
    multiplyScalar(e) {
        return this.x *= e,
        this.y *= e,
        this.z *= e,
        this
    }
    multiplyVectors(e, t) {
        return this.x = e.x * t.x,
        this.y = e.y * t.y,
        this.z = e.z * t.z,
        this
    }
    applyEuler(e) {
        return this.applyQuaternion(ho.setFromEuler(e))
    }
    applyAxisAngle(e, t) {
        return this.applyQuaternion(ho.setFromAxisAngle(e, t))
    }
    applyMatrix3(e) {
        const t = this.x
          , n = this.y
          , r = this.z
          , s = e.elements;
        return this.x = s[0] * t + s[3] * n + s[6] * r,
        this.y = s[1] * t + s[4] * n + s[7] * r,
        this.z = s[2] * t + s[5] * n + s[8] * r,
        this
    }
    applyNormalMatrix(e) {
        return this.applyMatrix3(e).normalize()
    }
    applyMatrix4(e) {
        const t = this.x
          , n = this.y
          , r = this.z
          , s = e.elements
          , a = 1 / (s[3] * t + s[7] * n + s[11] * r + s[15]);
        return this.x = (s[0] * t + s[4] * n + s[8] * r + s[12]) * a,
        this.y = (s[1] * t + s[5] * n + s[9] * r + s[13]) * a,
        this.z = (s[2] * t + s[6] * n + s[10] * r + s[14]) * a,
        this
    }
    applyQuaternion(e) {
        const t = this.x
          , n = this.y
          , r = this.z
          , s = e.x
          , a = e.y
          , o = e.z
          , l = e.w
          , c = 2 * (a * r - o * n)
          , h = 2 * (o * t - s * r)
          , d = 2 * (s * n - a * t);
        return this.x = t + l * c + a * d - o * h,
        this.y = n + l * h + o * c - s * d,
        this.z = r + l * d + s * h - a * c,
        this
    }
    project(e) {
        return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
    }
    unproject(e) {
        return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)
    }
    transformDirection(e) {
        const t = this.x
          , n = this.y
          , r = this.z
          , s = e.elements;
        return this.x = s[0] * t + s[4] * n + s[8] * r,
        this.y = s[1] * t + s[5] * n + s[9] * r,
        this.z = s[2] * t + s[6] * n + s[10] * r,
        this.normalize()
    }
    divide(e) {
        return this.x /= e.x,
        this.y /= e.y,
        this.z /= e.z,
        this
    }
    divideScalar(e) {
        return this.multiplyScalar(1 / e)
    }
    min(e) {
        return this.x = Math.min(this.x, e.x),
        this.y = Math.min(this.y, e.y),
        this.z = Math.min(this.z, e.z),
        this
    }
    max(e) {
        return this.x = Math.max(this.x, e.x),
        this.y = Math.max(this.y, e.y),
        this.z = Math.max(this.z, e.z),
        this
    }
    clamp(e, t) {
        return this.x = Qe(this.x, e.x, t.x),
        this.y = Qe(this.y, e.y, t.y),
        this.z = Qe(this.z, e.z, t.z),
        this
    }
    clampScalar(e, t) {
        return this.x = Qe(this.x, e, t),
        this.y = Qe(this.y, e, t),
        this.z = Qe(this.z, e, t),
        this
    }
    clampLength(e, t) {
        const n = this.length();
        return this.divideScalar(n || 1).multiplyScalar(Qe(n, e, t))
    }
    floor() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this.z = Math.floor(this.z),
        this
    }
    ceil() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this.z = Math.ceil(this.z),
        this
    }
    round() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this.z = Math.round(this.z),
        this
    }
    roundToZero() {
        return this.x = Math.trunc(this.x),
        this.y = Math.trunc(this.y),
        this.z = Math.trunc(this.z),
        this
    }
    negate() {
        return this.x = -this.x,
        this.y = -this.y,
        this.z = -this.z,
        this
    }
    dot(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    }
    normalize() {
        return this.divideScalar(this.length() || 1)
    }
    setLength(e) {
        return this.normalize().multiplyScalar(e)
    }
    lerp(e, t) {
        return this.x += (e.x - this.x) * t,
        this.y += (e.y - this.y) * t,
        this.z += (e.z - this.z) * t,
        this
    }
    lerpVectors(e, t, n) {
        return this.x = e.x + (t.x - e.x) * n,
        this.y = e.y + (t.y - e.y) * n,
        this.z = e.z + (t.z - e.z) * n,
        this
    }
    cross(e) {
        return this.crossVectors(this, e)
    }
    crossVectors(e, t) {
        const n = e.x
          , r = e.y
          , s = e.z
          , a = t.x
          , o = t.y
          , l = t.z;
        return this.x = r * l - s * o,
        this.y = s * a - n * l,
        this.z = n * o - r * a,
        this
    }
    projectOnVector(e) {
        const t = e.lengthSq();
        if (t === 0)
            return this.set(0, 0, 0);
        const n = e.dot(this) / t;
        return this.copy(e).multiplyScalar(n)
    }
    projectOnPlane(e) {
        return is.copy(this).projectOnVector(e),
        this.sub(is)
    }
    reflect(e) {
        return this.sub(is.copy(e).multiplyScalar(2 * this.dot(e)))
    }
    angleTo(e) {
        const t = Math.sqrt(this.lengthSq() * e.lengthSq());
        if (t === 0)
            return Math.PI / 2;
        const n = this.dot(e) / t;
        return Math.acos(Qe(n, -1, 1))
    }
    distanceTo(e) {
        return Math.sqrt(this.distanceToSquared(e))
    }
    distanceToSquared(e) {
        const t = this.x - e.x
          , n = this.y - e.y
          , r = this.z - e.z;
        return t * t + n * n + r * r
    }
    manhattanDistanceTo(e) {
        return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
    }
    setFromSpherical(e) {
        return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
    }
    setFromSphericalCoords(e, t, n) {
        const r = Math.sin(t) * e;
        return this.x = r * Math.sin(n),
        this.y = Math.cos(t) * e,
        this.z = r * Math.cos(n),
        this
    }
    setFromCylindrical(e) {
        return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
    }
    setFromCylindricalCoords(e, t, n) {
        return this.x = e * Math.sin(t),
        this.y = n,
        this.z = e * Math.cos(t),
        this
    }
    setFromMatrixPosition(e) {
        const t = e.elements;
        return this.x = t[12],
        this.y = t[13],
        this.z = t[14],
        this
    }
    setFromMatrixScale(e) {
        const t = this.setFromMatrixColumn(e, 0).length()
          , n = this.setFromMatrixColumn(e, 1).length()
          , r = this.setFromMatrixColumn(e, 2).length();
        return this.x = t,
        this.y = n,
        this.z = r,
        this
    }
    setFromMatrixColumn(e, t) {
        return this.fromArray(e.elements, t * 4)
    }
    setFromMatrix3Column(e, t) {
        return this.fromArray(e.elements, t * 3)
    }
    setFromEuler(e) {
        return this.x = e._x,
        this.y = e._y,
        this.z = e._z,
        this
    }
    setFromColor(e) {
        return this.x = e.r,
        this.y = e.g,
        this.z = e.b,
        this
    }
    equals(e) {
        return e.x === this.x && e.y === this.y && e.z === this.z
    }
    fromArray(e, t=0) {
        return this.x = e[t],
        this.y = e[t + 1],
        this.z = e[t + 2],
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this.x,
        e[t + 1] = this.y,
        e[t + 2] = this.z,
        e
    }
    fromBufferAttribute(e, t) {
        return this.x = e.getX(t),
        this.y = e.getY(t),
        this.z = e.getZ(t),
        this
    }
    random() {
        return this.x = Math.random(),
        this.y = Math.random(),
        this.z = Math.random(),
        this
    }
    randomDirection() {
        const e = Math.random() * Math.PI * 2
          , t = Math.random() * 2 - 1
          , n = Math.sqrt(1 - t * t);
        return this.x = n * Math.cos(e),
        this.y = t,
        this.z = n * Math.sin(e),
        this
    }
    *[Symbol.iterator]() {
        yield this.x,
        yield this.y,
        yield this.z
    }
}
const is = new O
  , ho = new Kn;
class $e {
    constructor(e, t, n, r, s, a, o, l, c) {
        $e.prototype.isMatrix3 = !0,
        this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1],
        e !== void 0 && this.set(e, t, n, r, s, a, o, l, c)
    }
    set(e, t, n, r, s, a, o, l, c) {
        const h = this.elements;
        return h[0] = e,
        h[1] = r,
        h[2] = o,
        h[3] = t,
        h[4] = s,
        h[5] = l,
        h[6] = n,
        h[7] = a,
        h[8] = c,
        this
    }
    identity() {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
        this
    }
    copy(e) {
        const t = this.elements
          , n = e.elements;
        return t[0] = n[0],
        t[1] = n[1],
        t[2] = n[2],
        t[3] = n[3],
        t[4] = n[4],
        t[5] = n[5],
        t[6] = n[6],
        t[7] = n[7],
        t[8] = n[8],
        this
    }
    extractBasis(e, t, n) {
        return e.setFromMatrix3Column(this, 0),
        t.setFromMatrix3Column(this, 1),
        n.setFromMatrix3Column(this, 2),
        this
    }
    setFromMatrix4(e) {
        const t = e.elements;
        return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]),
        this
    }
    multiply(e) {
        return this.multiplyMatrices(this, e)
    }
    premultiply(e) {
        return this.multiplyMatrices(e, this)
    }
    multiplyMatrices(e, t) {
        const n = e.elements
          , r = t.elements
          , s = this.elements
          , a = n[0]
          , o = n[3]
          , l = n[6]
          , c = n[1]
          , h = n[4]
          , d = n[7]
          , p = n[2]
          , m = n[5]
          , g = n[8]
          , _ = r[0]
          , f = r[3]
          , u = r[6]
          , b = r[1]
          , v = r[4]
          , T = r[7]
          , C = r[2]
          , E = r[5]
          , R = r[8];
        return s[0] = a * _ + o * b + l * C,
        s[3] = a * f + o * v + l * E,
        s[6] = a * u + o * T + l * R,
        s[1] = c * _ + h * b + d * C,
        s[4] = c * f + h * v + d * E,
        s[7] = c * u + h * T + d * R,
        s[2] = p * _ + m * b + g * C,
        s[5] = p * f + m * v + g * E,
        s[8] = p * u + m * T + g * R,
        this
    }
    multiplyScalar(e) {
        const t = this.elements;
        return t[0] *= e,
        t[3] *= e,
        t[6] *= e,
        t[1] *= e,
        t[4] *= e,
        t[7] *= e,
        t[2] *= e,
        t[5] *= e,
        t[8] *= e,
        this
    }
    determinant() {
        const e = this.elements
          , t = e[0]
          , n = e[1]
          , r = e[2]
          , s = e[3]
          , a = e[4]
          , o = e[5]
          , l = e[6]
          , c = e[7]
          , h = e[8];
        return t * a * h - t * o * c - n * s * h + n * o * l + r * s * c - r * a * l
    }
    invert() {
        const e = this.elements
          , t = e[0]
          , n = e[1]
          , r = e[2]
          , s = e[3]
          , a = e[4]
          , o = e[5]
          , l = e[6]
          , c = e[7]
          , h = e[8]
          , d = h * a - o * c
          , p = o * l - h * s
          , m = c * s - a * l
          , g = t * d + n * p + r * m;
        if (g === 0)
            return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
        const _ = 1 / g;
        return e[0] = d * _,
        e[1] = (r * c - h * n) * _,
        e[2] = (o * n - r * a) * _,
        e[3] = p * _,
        e[4] = (h * t - r * l) * _,
        e[5] = (r * s - o * t) * _,
        e[6] = m * _,
        e[7] = (n * l - c * t) * _,
        e[8] = (a * t - n * s) * _,
        this
    }
    transpose() {
        let e;
        const t = this.elements;
        return e = t[1],
        t[1] = t[3],
        t[3] = e,
        e = t[2],
        t[2] = t[6],
        t[6] = e,
        e = t[5],
        t[5] = t[7],
        t[7] = e,
        this
    }
    getNormalMatrix(e) {
        return this.setFromMatrix4(e).invert().transpose()
    }
    transposeIntoArray(e) {
        const t = this.elements;
        return e[0] = t[0],
        e[1] = t[3],
        e[2] = t[6],
        e[3] = t[1],
        e[4] = t[4],
        e[5] = t[7],
        e[6] = t[2],
        e[7] = t[5],
        e[8] = t[8],
        this
    }
    setUvTransform(e, t, n, r, s, a, o) {
        const l = Math.cos(s)
          , c = Math.sin(s);
        return this.set(n * l, n * c, -n * (l * a + c * o) + a + e, -r * c, r * l, -r * (-c * a + l * o) + o + t, 0, 0, 1),
        this
    }
    scale(e, t) {
        return this.premultiply(rs.makeScale(e, t)),
        this
    }
    rotate(e) {
        return this.premultiply(rs.makeRotation(-e)),
        this
    }
    translate(e, t) {
        return this.premultiply(rs.makeTranslation(e, t)),
        this
    }
    makeTranslation(e, t) {
        return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1),
        this
    }
    makeRotation(e) {
        const t = Math.cos(e)
          , n = Math.sin(e);
        return this.set(t, -n, 0, n, t, 0, 0, 0, 1),
        this
    }
    makeScale(e, t) {
        return this.set(e, 0, 0, 0, t, 0, 0, 0, 1),
        this
    }
    equals(e) {
        const t = this.elements
          , n = e.elements;
        for (let r = 0; r < 9; r++)
            if (t[r] !== n[r])
                return !1;
        return !0
    }
    fromArray(e, t=0) {
        for (let n = 0; n < 9; n++)
            this.elements[n] = e[n + t];
        return this
    }
    toArray(e=[], t=0) {
        const n = this.elements;
        return e[t] = n[0],
        e[t + 1] = n[1],
        e[t + 2] = n[2],
        e[t + 3] = n[3],
        e[t + 4] = n[4],
        e[t + 5] = n[5],
        e[t + 6] = n[6],
        e[t + 7] = n[7],
        e[t + 8] = n[8],
        e
    }
    clone() {
        return new this.constructor().fromArray(this.elements)
    }
}
const rs = new $e
  , fo = new $e().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322)
  , po = new $e().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function vu() {
    const i = {
        enabled: !0,
        workingColorSpace: Oi,
        spaces: {},
        convert: function(r, s, a) {
            return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === pt && (r.r = Bn(r.r),
            r.g = Bn(r.g),
            r.b = Bn(r.b)),
            this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ),
            r.applyMatrix3(this.spaces[a].fromXYZ)),
            this.spaces[a].transfer === pt && (r.r = Ii(r.r),
            r.g = Ii(r.g),
            r.b = Ii(r.b))),
            r
        },
        workingToColorSpace: function(r, s) {
            return this.convert(r, this.workingColorSpace, s)
        },
        colorSpaceToWorking: function(r, s) {
            return this.convert(r, s, this.workingColorSpace)
        },
        getPrimaries: function(r) {
            return this.spaces[r].primaries
        },
        getTransfer: function(r) {
            return r === Xn ? qr : this.spaces[r].transfer
        },
        getToneMappingMode: function(r) {
            return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard"
        },
        getLuminanceCoefficients: function(r, s=this.workingColorSpace) {
            return r.fromArray(this.spaces[s].luminanceCoefficients)
        },
        define: function(r) {
            Object.assign(this.spaces, r)
        },
        _getMatrix: function(r, s, a) {
            return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)
        },
        _getDrawingBufferColorSpace: function(r) {
            return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace
        },
        _getUnpackColorSpace: function(r=this.workingColorSpace) {
            return this.spaces[r].workingColorSpaceConfig.unpackColorSpace
        },
        fromWorkingColorSpace: function(r, s) {
            return ur("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),
            i.workingToColorSpace(r, s)
        },
        toWorkingColorSpace: function(r, s) {
            return ur("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),
            i.colorSpaceToWorking(r, s)
        }
    }
      , e = [.64, .33, .3, .6, .15, .06]
      , t = [.2126, .7152, .0722]
      , n = [.3127, .329];
    return i.define({
        [Oi]: {
            primaries: e,
            whitePoint: n,
            transfer: qr,
            toXYZ: fo,
            fromXYZ: po,
            luminanceCoefficients: t,
            workingColorSpaceConfig: {
                unpackColorSpace: on
            },
            outputColorSpaceConfig: {
                drawingBufferColorSpace: on
            }
        },
        [on]: {
            primaries: e,
            whitePoint: n,
            transfer: pt,
            toXYZ: fo,
            fromXYZ: po,
            luminanceCoefficients: t,
            outputColorSpaceConfig: {
                drawingBufferColorSpace: on
            }
        }
    }),
    i
}
const ot = vu();
function Bn(i) {
    return i < .04045 ? i * .0773993808 : Math.pow(i * .9478672986 + .0521327014, 2.4)
}
function Ii(i) {
    return i < .0031308 ? i * 12.92 : 1.055 * Math.pow(i, .41666) - .055
}
let pi;
class Mu {
    static getDataURL(e, t="image/png") {
        if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
            return e.src;
        let n;
        if (e instanceof HTMLCanvasElement)
            n = e;
        else {
            pi === void 0 && (pi = $r("canvas")),
            pi.width = e.width,
            pi.height = e.height;
            const r = pi.getContext("2d");
            e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height),
            n = pi
        }
        return n.toDataURL(t)
    }
    static sRGBToLinear(e) {
        if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
            const t = $r("canvas");
            t.width = e.width,
            t.height = e.height;
            const n = t.getContext("2d");
            n.drawImage(e, 0, 0, e.width, e.height);
            const r = n.getImageData(0, 0, e.width, e.height)
              , s = r.data;
            for (let a = 0; a < s.length; a++)
                s[a] = Bn(s[a] / 255) * 255;
            return n.putImageData(r, 0, 0),
            t
        } else if (e.data) {
            const t = e.data.slice(0);
            for (let n = 0; n < t.length; n++)
                t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(Bn(t[n] / 255) * 255) : t[n] = Bn(t[n]);
            return {
                data: t,
                width: e.width,
                height: e.height
            }
        } else
            return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),
            e
    }
}
let bu = 0;
class za {
    constructor(e=null) {
        this.isSource = !0,
        Object.defineProperty(this, "id", {
            value: bu++
        }),
        this.uuid = ki(),
        this.data = e,
        this.dataReady = !0,
        this.version = 0
    }
    getSize(e) {
        const t = this.data;
        return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : t instanceof VideoFrame ? e.set(t.displayHeight, t.displayWidth, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0),
        e
    }
    set needsUpdate(e) {
        e === !0 && this.version++
    }
    toJSON(e) {
        const t = e === void 0 || typeof e == "string";
        if (!t && e.images[this.uuid] !== void 0)
            return e.images[this.uuid];
        const n = {
            uuid: this.uuid,
            url: ""
        }
          , r = this.data;
        if (r !== null) {
            let s;
            if (Array.isArray(r)) {
                s = [];
                for (let a = 0, o = r.length; a < o; a++)
                    r[a].isDataTexture ? s.push(ss(r[a].image)) : s.push(ss(r[a]))
            } else
                s = ss(r);
            n.url = s
        }
        return t || (e.images[this.uuid] = n),
        n
    }
}
function ss(i) {
    return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Mu.getDataURL(i) : i.data ? {
        data: Array.from(i.data),
        width: i.width,
        height: i.height,
        type: i.data.constructor.name
    } : (Ye("Texture: Unable to serialize Texture."),
    {})
}
let Su = 0;
const as = new O;
class Wt extends Vi {
    constructor(e=Wt.DEFAULT_IMAGE, t=Wt.DEFAULT_MAPPING, n=Fn, r=Fn, s=ln, a=ci, o=_n, l=yn, c=Wt.DEFAULT_ANISOTROPY, h=Xn) {
        super(),
        this.isTexture = !0,
        Object.defineProperty(this, "id", {
            value: Su++
        }),
        this.uuid = ki(),
        this.name = "",
        this.source = new za(e),
        this.mipmaps = [],
        this.mapping = t,
        this.channel = 0,
        this.wrapS = n,
        this.wrapT = r,
        this.magFilter = s,
        this.minFilter = a,
        this.anisotropy = c,
        this.format = o,
        this.internalFormat = null,
        this.type = l,
        this.offset = new Ze(0,0),
        this.repeat = new Ze(1,1),
        this.center = new Ze(0,0),
        this.rotation = 0,
        this.matrixAutoUpdate = !0,
        this.matrix = new $e,
        this.generateMipmaps = !0,
        this.premultiplyAlpha = !1,
        this.flipY = !0,
        this.unpackAlignment = 4,
        this.colorSpace = h,
        this.userData = {},
        this.updateRanges = [],
        this.version = 0,
        this.onUpdate = null,
        this.renderTarget = null,
        this.isRenderTargetTexture = !1,
        this.isArrayTexture = !!(e && e.depth && e.depth > 1),
        this.pmremVersion = 0
    }
    get width() {
        return this.source.getSize(as).x
    }
    get height() {
        return this.source.getSize(as).y
    }
    get depth() {
        return this.source.getSize(as).z
    }
    get image() {
        return this.source.data
    }
    set image(e=null) {
        this.source.data = e
    }
    updateMatrix() {
        this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
    }
    addUpdateRange(e, t) {
        this.updateRanges.push({
            start: e,
            count: t
        })
    }
    clearUpdateRanges() {
        this.updateRanges.length = 0
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        return this.name = e.name,
        this.source = e.source,
        this.mipmaps = e.mipmaps.slice(0),
        this.mapping = e.mapping,
        this.channel = e.channel,
        this.wrapS = e.wrapS,
        this.wrapT = e.wrapT,
        this.magFilter = e.magFilter,
        this.minFilter = e.minFilter,
        this.anisotropy = e.anisotropy,
        this.format = e.format,
        this.internalFormat = e.internalFormat,
        this.type = e.type,
        this.offset.copy(e.offset),
        this.repeat.copy(e.repeat),
        this.center.copy(e.center),
        this.rotation = e.rotation,
        this.matrixAutoUpdate = e.matrixAutoUpdate,
        this.matrix.copy(e.matrix),
        this.generateMipmaps = e.generateMipmaps,
        this.premultiplyAlpha = e.premultiplyAlpha,
        this.flipY = e.flipY,
        this.unpackAlignment = e.unpackAlignment,
        this.colorSpace = e.colorSpace,
        this.renderTarget = e.renderTarget,
        this.isRenderTargetTexture = e.isRenderTargetTexture,
        this.isArrayTexture = e.isArrayTexture,
        this.userData = JSON.parse(JSON.stringify(e.userData)),
        this.needsUpdate = !0,
        this
    }
    setValues(e) {
        for (const t in e) {
            const n = e[t];
            if (n === void 0) {
                Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);
                continue
            }
            const r = this[t];
            if (r === void 0) {
                Ye(`Texture.setValues(): property '${t}' does not exist.`);
                continue
            }
            r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n
        }
    }
    toJSON(e) {
        const t = e === void 0 || typeof e == "string";
        if (!t && e.textures[this.uuid] !== void 0)
            return e.textures[this.uuid];
        const n = {
            metadata: {
                version: 4.7,
                type: "Texture",
                generator: "Texture.toJSON"
            },
            uuid: this.uuid,
            name: this.name,
            image: this.source.toJSON(e).uuid,
            mapping: this.mapping,
            channel: this.channel,
            repeat: [this.repeat.x, this.repeat.y],
            offset: [this.offset.x, this.offset.y],
            center: [this.center.x, this.center.y],
            rotation: this.rotation,
            wrap: [this.wrapS, this.wrapT],
            format: this.format,
            internalFormat: this.internalFormat,
            type: this.type,
            colorSpace: this.colorSpace,
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            anisotropy: this.anisotropy,
            flipY: this.flipY,
            generateMipmaps: this.generateMipmaps,
            premultiplyAlpha: this.premultiplyAlpha,
            unpackAlignment: this.unpackAlignment
        };
        return Object.keys(this.userData).length > 0 && (n.userData = this.userData),
        t || (e.textures[this.uuid] = n),
        n
    }
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
    transformUv(e) {
        if (this.mapping !== Mc)
            return e;
        if (e.applyMatrix3(this.matrix),
        e.x < 0 || e.x > 1)
            switch (this.wrapS) {
            case Xs:
                e.x = e.x - Math.floor(e.x);
                break;
            case Fn:
                e.x = e.x < 0 ? 0 : 1;
                break;
            case qs:
                Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
                break
            }
        if (e.y < 0 || e.y > 1)
            switch (this.wrapT) {
            case Xs:
                e.y = e.y - Math.floor(e.y);
                break;
            case Fn:
                e.y = e.y < 0 ? 0 : 1;
                break;
            case qs:
                Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
                break
            }
        return this.flipY && (e.y = 1 - e.y),
        e
    }
    set needsUpdate(e) {
        e === !0 && (this.version++,
        this.source.needsUpdate = !0)
    }
    set needsPMREMUpdate(e) {
        e === !0 && this.pmremVersion++
    }
}
Wt.DEFAULT_IMAGE = null;
Wt.DEFAULT_MAPPING = Mc;
Wt.DEFAULT_ANISOTROPY = 1;
class St {
    constructor(e=0, t=0, n=0, r=1) {
        St.prototype.isVector4 = !0,
        this.x = e,
        this.y = t,
        this.z = n,
        this.w = r
    }
    get width() {
        return this.z
    }
    set width(e) {
        this.z = e
    }
    get height() {
        return this.w
    }
    set height(e) {
        this.w = e
    }
    set(e, t, n, r) {
        return this.x = e,
        this.y = t,
        this.z = n,
        this.w = r,
        this
    }
    setScalar(e) {
        return this.x = e,
        this.y = e,
        this.z = e,
        this.w = e,
        this
    }
    setX(e) {
        return this.x = e,
        this
    }
    setY(e) {
        return this.y = e,
        this
    }
    setZ(e) {
        return this.z = e,
        this
    }
    setW(e) {
        return this.w = e,
        this
    }
    setComponent(e, t) {
        switch (e) {
        case 0:
            this.x = t;
            break;
        case 1:
            this.y = t;
            break;
        case 2:
            this.z = t;
            break;
        case 3:
            this.w = t;
            break;
        default:
            throw new Error("index is out of range: " + e)
        }
        return this
    }
    getComponent(e) {
        switch (e) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        case 3:
            return this.w;
        default:
            throw new Error("index is out of range: " + e)
        }
    }
    clone() {
        return new this.constructor(this.x,this.y,this.z,this.w)
    }
    copy(e) {
        return this.x = e.x,
        this.y = e.y,
        this.z = e.z,
        this.w = e.w !== void 0 ? e.w : 1,
        this
    }
    add(e) {
        return this.x += e.x,
        this.y += e.y,
        this.z += e.z,
        this.w += e.w,
        this
    }
    addScalar(e) {
        return this.x += e,
        this.y += e,
        this.z += e,
        this.w += e,
        this
    }
    addVectors(e, t) {
        return this.x = e.x + t.x,
        this.y = e.y + t.y,
        this.z = e.z + t.z,
        this.w = e.w + t.w,
        this
    }
    addScaledVector(e, t) {
        return this.x += e.x * t,
        this.y += e.y * t,
        this.z += e.z * t,
        this.w += e.w * t,
        this
    }
    sub(e) {
        return this.x -= e.x,
        this.y -= e.y,
        this.z -= e.z,
        this.w -= e.w,
        this
    }
    subScalar(e) {
        return this.x -= e,
        this.y -= e,
        this.z -= e,
        this.w -= e,
        this
    }
    subVectors(e, t) {
        return this.x = e.x - t.x,
        this.y = e.y - t.y,
        this.z = e.z - t.z,
        this.w = e.w - t.w,
        this
    }
    multiply(e) {
        return this.x *= e.x,
        this.y *= e.y,
        this.z *= e.z,
        this.w *= e.w,
        this
    }
    multiplyScalar(e) {
        return this.x *= e,
        this.y *= e,
        this.z *= e,
        this.w *= e,
        this
    }
    applyMatrix4(e) {
        const t = this.x
          , n = this.y
          , r = this.z
          , s = this.w
          , a = e.elements;
        return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * s,
        this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * s,
        this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * s,
        this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * s,
        this
    }
    divide(e) {
        return this.x /= e.x,
        this.y /= e.y,
        this.z /= e.z,
        this.w /= e.w,
        this
    }
    divideScalar(e) {
        return this.multiplyScalar(1 / e)
    }
    setAxisAngleFromQuaternion(e) {
        this.w = 2 * Math.acos(e.w);
        const t = Math.sqrt(1 - e.w * e.w);
        return t < 1e-4 ? (this.x = 1,
        this.y = 0,
        this.z = 0) : (this.x = e.x / t,
        this.y = e.y / t,
        this.z = e.z / t),
        this
    }
    setAxisAngleFromRotationMatrix(e) {
        let t, n, r, s;
        const l = e.elements
          , c = l[0]
          , h = l[4]
          , d = l[8]
          , p = l[1]
          , m = l[5]
          , g = l[9]
          , _ = l[2]
          , f = l[6]
          , u = l[10];
        if (Math.abs(h - p) < .01 && Math.abs(d - _) < .01 && Math.abs(g - f) < .01) {
            if (Math.abs(h + p) < .1 && Math.abs(d + _) < .1 && Math.abs(g + f) < .1 && Math.abs(c + m + u - 3) < .1)
                return this.set(1, 0, 0, 0),
                this;
            t = Math.PI;
            const v = (c + 1) / 2
              , T = (m + 1) / 2
              , C = (u + 1) / 2
              , E = (h + p) / 4
              , R = (d + _) / 4
              , F = (g + f) / 4;
            return v > T && v > C ? v < .01 ? (n = 0,
            r = .707106781,
            s = .707106781) : (n = Math.sqrt(v),
            r = E / n,
            s = R / n) : T > C ? T < .01 ? (n = .707106781,
            r = 0,
            s = .707106781) : (r = Math.sqrt(T),
            n = E / r,
            s = F / r) : C < .01 ? (n = .707106781,
            r = .707106781,
            s = 0) : (s = Math.sqrt(C),
            n = R / s,
            r = F / s),
            this.set(n, r, s, t),
            this
        }
        let b = Math.sqrt((f - g) * (f - g) + (d - _) * (d - _) + (p - h) * (p - h));
        return Math.abs(b) < .001 && (b = 1),
        this.x = (f - g) / b,
        this.y = (d - _) / b,
        this.z = (p - h) / b,
        this.w = Math.acos((c + m + u - 1) / 2),
        this
    }
    setFromMatrixPosition(e) {
        const t = e.elements;
        return this.x = t[12],
        this.y = t[13],
        this.z = t[14],
        this.w = t[15],
        this
    }
    min(e) {
        return this.x = Math.min(this.x, e.x),
        this.y = Math.min(this.y, e.y),
        this.z = Math.min(this.z, e.z),
        this.w = Math.min(this.w, e.w),
        this
    }
    max(e) {
        return this.x = Math.max(this.x, e.x),
        this.y = Math.max(this.y, e.y),
        this.z = Math.max(this.z, e.z),
        this.w = Math.max(this.w, e.w),
        this
    }
    clamp(e, t) {
        return this.x = Qe(this.x, e.x, t.x),
        this.y = Qe(this.y, e.y, t.y),
        this.z = Qe(this.z, e.z, t.z),
        this.w = Qe(this.w, e.w, t.w),
        this
    }
    clampScalar(e, t) {
        return this.x = Qe(this.x, e, t),
        this.y = Qe(this.y, e, t),
        this.z = Qe(this.z, e, t),
        this.w = Qe(this.w, e, t),
        this
    }
    clampLength(e, t) {
        const n = this.length();
        return this.divideScalar(n || 1).multiplyScalar(Qe(n, e, t))
    }
    floor() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this.z = Math.floor(this.z),
        this.w = Math.floor(this.w),
        this
    }
    ceil() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this.z = Math.ceil(this.z),
        this.w = Math.ceil(this.w),
        this
    }
    round() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this.z = Math.round(this.z),
        this.w = Math.round(this.w),
        this
    }
    roundToZero() {
        return this.x = Math.trunc(this.x),
        this.y = Math.trunc(this.y),
        this.z = Math.trunc(this.z),
        this.w = Math.trunc(this.w),
        this
    }
    negate() {
        return this.x = -this.x,
        this.y = -this.y,
        this.z = -this.z,
        this.w = -this.w,
        this
    }
    dot(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    }
    normalize() {
        return this.divideScalar(this.length() || 1)
    }
    setLength(e) {
        return this.normalize().multiplyScalar(e)
    }
    lerp(e, t) {
        return this.x += (e.x - this.x) * t,
        this.y += (e.y - this.y) * t,
        this.z += (e.z - this.z) * t,
        this.w += (e.w - this.w) * t,
        this
    }
    lerpVectors(e, t, n) {
        return this.x = e.x + (t.x - e.x) * n,
        this.y = e.y + (t.y - e.y) * n,
        this.z = e.z + (t.z - e.z) * n,
        this.w = e.w + (t.w - e.w) * n,
        this
    }
    equals(e) {
        return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
    }
    fromArray(e, t=0) {
        return this.x = e[t],
        this.y = e[t + 1],
        this.z = e[t + 2],
        this.w = e[t + 3],
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this.x,
        e[t + 1] = this.y,
        e[t + 2] = this.z,
        e[t + 3] = this.w,
        e
    }
    fromBufferAttribute(e, t) {
        return this.x = e.getX(t),
        this.y = e.getY(t),
        this.z = e.getZ(t),
        this.w = e.getW(t),
        this
    }
    random() {
        return this.x = Math.random(),
        this.y = Math.random(),
        this.z = Math.random(),
        this.w = Math.random(),
        this
    }
    *[Symbol.iterator]() {
        yield this.x,
        yield this.y,
        yield this.z,
        yield this.w
    }
}
class yu extends Vi {
    constructor(e=1, t=1, n={}) {
        super(),
        n = Object.assign({
            generateMipmaps: !1,
            internalFormat: null,
            minFilter: ln,
            depthBuffer: !0,
            stencilBuffer: !1,
            resolveDepthBuffer: !0,
            resolveStencilBuffer: !0,
            depthTexture: null,
            samples: 0,
            count: 1,
            depth: 1,
            multiview: !1
        }, n),
        this.isRenderTarget = !0,
        this.width = e,
        this.height = t,
        this.depth = n.depth,
        this.scissor = new St(0,0,e,t),
        this.scissorTest = !1,
        this.viewport = new St(0,0,e,t);
        const r = {
            width: e,
            height: t,
            depth: n.depth
        }
          , s = new Wt(r);
        this.textures = [];
        const a = n.count;
        for (let o = 0; o < a; o++)
            this.textures[o] = s.clone(),
            this.textures[o].isRenderTargetTexture = !0,
            this.textures[o].renderTarget = this;
        this._setTextureOptions(n),
        this.depthBuffer = n.depthBuffer,
        this.stencilBuffer = n.stencilBuffer,
        this.resolveDepthBuffer = n.resolveDepthBuffer,
        this.resolveStencilBuffer = n.resolveStencilBuffer,
        this._depthTexture = null,
        this.depthTexture = n.depthTexture,
        this.samples = n.samples,
        this.multiview = n.multiview
    }
    _setTextureOptions(e={}) {
        const t = {
            minFilter: ln,
            generateMipmaps: !1,
            flipY: !1,
            internalFormat: null
        };
        e.mapping !== void 0 && (t.mapping = e.mapping),
        e.wrapS !== void 0 && (t.wrapS = e.wrapS),
        e.wrapT !== void 0 && (t.wrapT = e.wrapT),
        e.wrapR !== void 0 && (t.wrapR = e.wrapR),
        e.magFilter !== void 0 && (t.magFilter = e.magFilter),
        e.minFilter !== void 0 && (t.minFilter = e.minFilter),
        e.format !== void 0 && (t.format = e.format),
        e.type !== void 0 && (t.type = e.type),
        e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy),
        e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace),
        e.flipY !== void 0 && (t.flipY = e.flipY),
        e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps),
        e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
        for (let n = 0; n < this.textures.length; n++)
            this.textures[n].setValues(t)
    }
    get texture() {
        return this.textures[0]
    }
    set texture(e) {
        this.textures[0] = e
    }
    set depthTexture(e) {
        this._depthTexture !== null && (this._depthTexture.renderTarget = null),
        e !== null && (e.renderTarget = this),
        this._depthTexture = e
    }
    get depthTexture() {
        return this._depthTexture
    }
    setSize(e, t, n=1) {
        if (this.width !== e || this.height !== t || this.depth !== n) {
            this.width = e,
            this.height = t,
            this.depth = n;
            for (let r = 0, s = this.textures.length; r < s; r++)
                this.textures[r].image.width = e,
                this.textures[r].image.height = t,
                this.textures[r].image.depth = n,
                this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
            this.dispose()
        }
        this.viewport.set(0, 0, e, t),
        this.scissor.set(0, 0, e, t)
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        this.width = e.width,
        this.height = e.height,
        this.depth = e.depth,
        this.scissor.copy(e.scissor),
        this.scissorTest = e.scissorTest,
        this.viewport.copy(e.viewport),
        this.textures.length = 0;
        for (let t = 0, n = e.textures.length; t < n; t++) {
            this.textures[t] = e.textures[t].clone(),
            this.textures[t].isRenderTargetTexture = !0,
            this.textures[t].renderTarget = this;
            const r = Object.assign({}, e.textures[t].image);
            this.textures[t].source = new za(r)
        }
        return this.depthBuffer = e.depthBuffer,
        this.stencilBuffer = e.stencilBuffer,
        this.resolveDepthBuffer = e.resolveDepthBuffer,
        this.resolveStencilBuffer = e.resolveStencilBuffer,
        e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()),
        this.samples = e.samples,
        this
    }
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}
class di extends yu {
    constructor(e=1, t=1, n={}) {
        super(e, t, n),
        this.isWebGLRenderTarget = !0
    }
}
class Pc extends Wt {
    constructor(e=null, t=1, n=1, r=1) {
        super(null),
        this.isDataArrayTexture = !0,
        this.image = {
            data: e,
            width: t,
            height: n,
            depth: r
        },
        this.magFilter = en,
        this.minFilter = en,
        this.wrapR = Fn,
        this.generateMipmaps = !1,
        this.flipY = !1,
        this.unpackAlignment = 1,
        this.layerUpdates = new Set
    }
    addLayerUpdate(e) {
        this.layerUpdates.add(e)
    }
    clearLayerUpdates() {
        this.layerUpdates.clear()
    }
}
class Eu extends Wt {
    constructor(e=null, t=1, n=1, r=1) {
        super(null),
        this.isData3DTexture = !0,
        this.image = {
            data: e,
            width: t,
            height: n,
            depth: r
        },
        this.magFilter = en,
        this.minFilter = en,
        this.wrapR = Fn,
        this.generateMipmaps = !1,
        this.flipY = !1,
        this.unpackAlignment = 1
    }
}
class Zn {
    constructor(e=new O(1 / 0,1 / 0,1 / 0), t=new O(-1 / 0,-1 / 0,-1 / 0)) {
        this.isBox3 = !0,
        this.min = e,
        this.max = t
    }
    set(e, t) {
        return this.min.copy(e),
        this.max.copy(t),
        this
    }
    setFromArray(e) {
        this.makeEmpty();
        for (let t = 0, n = e.length; t < n; t += 3)
            this.expandByPoint(fn.fromArray(e, t));
        return this
    }
    setFromBufferAttribute(e) {
        this.makeEmpty();
        for (let t = 0, n = e.count; t < n; t++)
            this.expandByPoint(fn.fromBufferAttribute(e, t));
        return this
    }
    setFromPoints(e) {
        this.makeEmpty();
        for (let t = 0, n = e.length; t < n; t++)
            this.expandByPoint(e[t]);
        return this
    }
    setFromCenterAndSize(e, t) {
        const n = fn.copy(t).multiplyScalar(.5);
        return this.min.copy(e).sub(n),
        this.max.copy(e).add(n),
        this
    }
    setFromObject(e, t=!1) {
        return this.makeEmpty(),
        this.expandByObject(e, t)
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        return this.min.copy(e.min),
        this.max.copy(e.max),
        this
    }
    makeEmpty() {
        return this.min.x = this.min.y = this.min.z = 1 / 0,
        this.max.x = this.max.y = this.max.z = -1 / 0,
        this
    }
    isEmpty() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    }
    getCenter(e) {
        return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
    }
    getSize(e) {
        return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
    }
    expandByPoint(e) {
        return this.min.min(e),
        this.max.max(e),
        this
    }
    expandByVector(e) {
        return this.min.sub(e),
        this.max.add(e),
        this
    }
    expandByScalar(e) {
        return this.min.addScalar(-e),
        this.max.addScalar(e),
        this
    }
    expandByObject(e, t=!1) {
        e.updateWorldMatrix(!1, !1);
        const n = e.geometry;
        if (n !== void 0) {
            const s = n.getAttribute("position");
            if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
                for (let a = 0, o = s.count; a < o; a++)
                    e.isMesh === !0 ? e.getVertexPosition(a, fn) : fn.fromBufferAttribute(s, a),
                    fn.applyMatrix4(e.matrixWorld),
                    this.expandByPoint(fn);
            else
                e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(),
                xr.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(),
                xr.copy(n.boundingBox)),
                xr.applyMatrix4(e.matrixWorld),
                this.union(xr)
        }
        const r = e.children;
        for (let s = 0, a = r.length; s < a; s++)
            this.expandByObject(r[s], t);
        return this
    }
    containsPoint(e) {
        return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z
    }
    containsBox(e) {
        return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
    }
    getParameter(e, t) {
        return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
    }
    intersectsBox(e) {
        return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z
    }
    intersectsSphere(e) {
        return this.clampPoint(e.center, fn),
        fn.distanceToSquared(e.center) <= e.radius * e.radius
    }
    intersectsPlane(e) {
        let t, n;
        return e.normal.x > 0 ? (t = e.normal.x * this.min.x,
        n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x,
        n = e.normal.x * this.min.x),
        e.normal.y > 0 ? (t += e.normal.y * this.min.y,
        n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y,
        n += e.normal.y * this.min.y),
        e.normal.z > 0 ? (t += e.normal.z * this.min.z,
        n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z,
        n += e.normal.z * this.min.z),
        t <= -e.constant && n >= -e.constant
    }
    intersectsTriangle(e) {
        if (this.isEmpty())
            return !1;
        this.getCenter(Yi),
        gr.subVectors(this.max, Yi),
        mi.subVectors(e.a, Yi),
        xi.subVectors(e.b, Yi),
        gi.subVectors(e.c, Yi),
        zn.subVectors(xi, mi),
        Vn.subVectors(gi, xi),
        Qn.subVectors(mi, gi);
        let t = [0, -zn.z, zn.y, 0, -Vn.z, Vn.y, 0, -Qn.z, Qn.y, zn.z, 0, -zn.x, Vn.z, 0, -Vn.x, Qn.z, 0, -Qn.x, -zn.y, zn.x, 0, -Vn.y, Vn.x, 0, -Qn.y, Qn.x, 0];
        return !os(t, mi, xi, gi, gr) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1],
        !os(t, mi, xi, gi, gr)) ? !1 : (_r.crossVectors(zn, Vn),
        t = [_r.x, _r.y, _r.z],
        os(t, mi, xi, gi, gr))
    }
    clampPoint(e, t) {
        return t.copy(e).clamp(this.min, this.max)
    }
    distanceToPoint(e) {
        return this.clampPoint(e, fn).distanceTo(e)
    }
    getBoundingSphere(e) {
        return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center),
        e.radius = this.getSize(fn).length() * .5),
        e
    }
    intersect(e) {
        return this.min.max(e.min),
        this.max.min(e.max),
        this.isEmpty() && this.makeEmpty(),
        this
    }
    union(e) {
        return this.min.min(e.min),
        this.max.max(e.max),
        this
    }
    applyMatrix4(e) {
        return this.isEmpty() ? this : (wn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
        wn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
        wn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
        wn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
        wn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
        wn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
        wn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
        wn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
        this.setFromPoints(wn),
        this)
    }
    translate(e) {
        return this.min.add(e),
        this.max.add(e),
        this
    }
    equals(e) {
        return e.min.equals(this.min) && e.max.equals(this.max)
    }
    toJSON() {
        return {
            min: this.min.toArray(),
            max: this.max.toArray()
        }
    }
    fromJSON(e) {
        return this.min.fromArray(e.min),
        this.max.fromArray(e.max),
        this
    }
}
const wn = [new O, new O, new O, new O, new O, new O, new O, new O]
  , fn = new O
  , xr = new Zn
  , mi = new O
  , xi = new O
  , gi = new O
  , zn = new O
  , Vn = new O
  , Qn = new O
  , Yi = new O
  , gr = new O
  , _r = new O
  , ei = new O;
function os(i, e, t, n, r) {
    for (let s = 0, a = i.length - 3; s <= a; s += 3) {
        ei.fromArray(i, s);
        const o = r.x * Math.abs(ei.x) + r.y * Math.abs(ei.y) + r.z * Math.abs(ei.z)
          , l = e.dot(ei)
          , c = t.dot(ei)
          , h = n.dot(ei);
        if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o)
            return !1
    }
    return !0
}
const Tu = new Zn
  , $i = new O
  , cs = new O;
class Gi {
    constructor(e=new O, t=-1) {
        this.isSphere = !0,
        this.center = e,
        this.radius = t
    }
    set(e, t) {
        return this.center.copy(e),
        this.radius = t,
        this
    }
    setFromPoints(e, t) {
        const n = this.center;
        t !== void 0 ? n.copy(t) : Tu.setFromPoints(e).getCenter(n);
        let r = 0;
        for (let s = 0, a = e.length; s < a; s++)
            r = Math.max(r, n.distanceToSquared(e[s]));
        return this.radius = Math.sqrt(r),
        this
    }
    copy(e) {
        return this.center.copy(e.center),
        this.radius = e.radius,
        this
    }
    isEmpty() {
        return this.radius < 0
    }
    makeEmpty() {
        return this.center.set(0, 0, 0),
        this.radius = -1,
        this
    }
    containsPoint(e) {
        return e.distanceToSquared(this.center) <= this.radius * this.radius
    }
    distanceToPoint(e) {
        return e.distanceTo(this.center) - this.radius
    }
    intersectsSphere(e) {
        const t = this.radius + e.radius;
        return e.center.distanceToSquared(this.center) <= t * t
    }
    intersectsBox(e) {
        return e.intersectsSphere(this)
    }
    intersectsPlane(e) {
        return Math.abs(e.distanceToPoint(this.center)) <= this.radius
    }
    clampPoint(e, t) {
        const n = this.center.distanceToSquared(e);
        return t.copy(e),
        n > this.radius * this.radius && (t.sub(this.center).normalize(),
        t.multiplyScalar(this.radius).add(this.center)),
        t
    }
    getBoundingBox(e) {
        return this.isEmpty() ? (e.makeEmpty(),
        e) : (e.set(this.center, this.center),
        e.expandByScalar(this.radius),
        e)
    }
    applyMatrix4(e) {
        return this.center.applyMatrix4(e),
        this.radius = this.radius * e.getMaxScaleOnAxis(),
        this
    }
    translate(e) {
        return this.center.add(e),
        this
    }
    expandByPoint(e) {
        if (this.isEmpty())
            return this.center.copy(e),
            this.radius = 0,
            this;
        $i.subVectors(e, this.center);
        const t = $i.lengthSq();
        if (t > this.radius * this.radius) {
            const n = Math.sqrt(t)
              , r = (n - this.radius) * .5;
            this.center.addScaledVector($i, r / n),
            this.radius += r
        }
        return this
    }
    union(e) {
        return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e),
        this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (cs.subVectors(e.center, this.center).setLength(e.radius),
        this.expandByPoint($i.copy(e.center).add(cs)),
        this.expandByPoint($i.copy(e.center).sub(cs))),
        this)
    }
    equals(e) {
        return e.center.equals(this.center) && e.radius === this.radius
    }
    clone() {
        return new this.constructor().copy(this)
    }
    toJSON() {
        return {
            radius: this.radius,
            center: this.center.toArray()
        }
    }
    fromJSON(e) {
        return this.radius = e.radius,
        this.center.fromArray(e.center),
        this
    }
}
const Cn = new O
  , ls = new O
  , vr = new O
  , kn = new O
  , us = new O
  , Mr = new O
  , ds = new O;
class Va {
    constructor(e=new O, t=new O(0,0,-1)) {
        this.origin = e,
        this.direction = t
    }
    set(e, t) {
        return this.origin.copy(e),
        this.direction.copy(t),
        this
    }
    copy(e) {
        return this.origin.copy(e.origin),
        this.direction.copy(e.direction),
        this
    }
    at(e, t) {
        return t.copy(this.origin).addScaledVector(this.direction, e)
    }
    lookAt(e) {
        return this.direction.copy(e).sub(this.origin).normalize(),
        this
    }
    recast(e) {
        return this.origin.copy(this.at(e, Cn)),
        this
    }
    closestPointToPoint(e, t) {
        t.subVectors(e, this.origin);
        const n = t.dot(this.direction);
        return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n)
    }
    distanceToPoint(e) {
        return Math.sqrt(this.distanceSqToPoint(e))
    }
    distanceSqToPoint(e) {
        const t = Cn.subVectors(e, this.origin).dot(this.direction);
        return t < 0 ? this.origin.distanceToSquared(e) : (Cn.copy(this.origin).addScaledVector(this.direction, t),
        Cn.distanceToSquared(e))
    }
    distanceSqToSegment(e, t, n, r) {
        ls.copy(e).add(t).multiplyScalar(.5),
        vr.copy(t).sub(e).normalize(),
        kn.copy(this.origin).sub(ls);
        const s = e.distanceTo(t) * .5
          , a = -this.direction.dot(vr)
          , o = kn.dot(this.direction)
          , l = -kn.dot(vr)
          , c = kn.lengthSq()
          , h = Math.abs(1 - a * a);
        let d, p, m, g;
        if (h > 0)
            if (d = a * l - o,
            p = a * o - l,
            g = s * h,
            d >= 0)
                if (p >= -g)
                    if (p <= g) {
                        const _ = 1 / h;
                        d *= _,
                        p *= _,
                        m = d * (d + a * p + 2 * o) + p * (a * d + p + 2 * l) + c
                    } else
                        p = s,
                        d = Math.max(0, -(a * p + o)),
                        m = -d * d + p * (p + 2 * l) + c;
                else
                    p = -s,
                    d = Math.max(0, -(a * p + o)),
                    m = -d * d + p * (p + 2 * l) + c;
            else
                p <= -g ? (d = Math.max(0, -(-a * s + o)),
                p = d > 0 ? -s : Math.min(Math.max(-s, -l), s),
                m = -d * d + p * (p + 2 * l) + c) : p <= g ? (d = 0,
                p = Math.min(Math.max(-s, -l), s),
                m = p * (p + 2 * l) + c) : (d = Math.max(0, -(a * s + o)),
                p = d > 0 ? s : Math.min(Math.max(-s, -l), s),
                m = -d * d + p * (p + 2 * l) + c);
        else
            p = a > 0 ? -s : s,
            d = Math.max(0, -(a * p + o)),
            m = -d * d + p * (p + 2 * l) + c;
        return n && n.copy(this.origin).addScaledVector(this.direction, d),
        r && r.copy(ls).addScaledVector(vr, p),
        m
    }
    intersectSphere(e, t) {
        Cn.subVectors(e.center, this.origin);
        const n = Cn.dot(this.direction)
          , r = Cn.dot(Cn) - n * n
          , s = e.radius * e.radius;
        if (r > s)
            return null;
        const a = Math.sqrt(s - r)
          , o = n - a
          , l = n + a;
        return l < 0 ? null : o < 0 ? this.at(l, t) : this.at(o, t)
    }
    intersectsSphere(e) {
        return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius
    }
    distanceToPlane(e) {
        const t = e.normal.dot(this.direction);
        if (t === 0)
            return e.distanceToPoint(this.origin) === 0 ? 0 : null;
        const n = -(this.origin.dot(e.normal) + e.constant) / t;
        return n >= 0 ? n : null
    }
    intersectPlane(e, t) {
        const n = this.distanceToPlane(e);
        return n === null ? null : this.at(n, t)
    }
    intersectsPlane(e) {
        const t = e.distanceToPoint(this.origin);
        return t === 0 || e.normal.dot(this.direction) * t < 0
    }
    intersectBox(e, t) {
        let n, r, s, a, o, l;
        const c = 1 / this.direction.x
          , h = 1 / this.direction.y
          , d = 1 / this.direction.z
          , p = this.origin;
        return c >= 0 ? (n = (e.min.x - p.x) * c,
        r = (e.max.x - p.x) * c) : (n = (e.max.x - p.x) * c,
        r = (e.min.x - p.x) * c),
        h >= 0 ? (s = (e.min.y - p.y) * h,
        a = (e.max.y - p.y) * h) : (s = (e.max.y - p.y) * h,
        a = (e.min.y - p.y) * h),
        n > a || s > r || ((s > n || isNaN(n)) && (n = s),
        (a < r || isNaN(r)) && (r = a),
        d >= 0 ? (o = (e.min.z - p.z) * d,
        l = (e.max.z - p.z) * d) : (o = (e.max.z - p.z) * d,
        l = (e.min.z - p.z) * d),
        n > l || o > r) || ((o > n || n !== n) && (n = o),
        (l < r || r !== r) && (r = l),
        r < 0) ? null : this.at(n >= 0 ? n : r, t)
    }
    intersectsBox(e) {
        return this.intersectBox(e, Cn) !== null
    }
    intersectTriangle(e, t, n, r, s) {
        us.subVectors(t, e),
        Mr.subVectors(n, e),
        ds.crossVectors(us, Mr);
        let a = this.direction.dot(ds), o;
        if (a > 0) {
            if (r)
                return null;
            o = 1
        } else if (a < 0)
            o = -1,
            a = -a;
        else
            return null;
        kn.subVectors(this.origin, e);
        const l = o * this.direction.dot(Mr.crossVectors(kn, Mr));
        if (l < 0)
            return null;
        const c = o * this.direction.dot(us.cross(kn));
        if (c < 0 || l + c > a)
            return null;
        const h = -o * kn.dot(ds);
        return h < 0 ? null : this.at(h / a, s)
    }
    applyMatrix4(e) {
        return this.origin.applyMatrix4(e),
        this.direction.transformDirection(e),
        this
    }
    equals(e) {
        return e.origin.equals(this.origin) && e.direction.equals(this.direction)
    }
    clone() {
        return new this.constructor().copy(this)
    }
}
class ct {
    constructor(e, t, n, r, s, a, o, l, c, h, d, p, m, g, _, f) {
        ct.prototype.isMatrix4 = !0,
        this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        e !== void 0 && this.set(e, t, n, r, s, a, o, l, c, h, d, p, m, g, _, f)
    }
    set(e, t, n, r, s, a, o, l, c, h, d, p, m, g, _, f) {
        const u = this.elements;
        return u[0] = e,
        u[4] = t,
        u[8] = n,
        u[12] = r,
        u[1] = s,
        u[5] = a,
        u[9] = o,
        u[13] = l,
        u[2] = c,
        u[6] = h,
        u[10] = d,
        u[14] = p,
        u[3] = m,
        u[7] = g,
        u[11] = _,
        u[15] = f,
        this
    }
    identity() {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
        this
    }
    clone() {
        return new ct().fromArray(this.elements)
    }
    copy(e) {
        const t = this.elements
          , n = e.elements;
        return t[0] = n[0],
        t[1] = n[1],
        t[2] = n[2],
        t[3] = n[3],
        t[4] = n[4],
        t[5] = n[5],
        t[6] = n[6],
        t[7] = n[7],
        t[8] = n[8],
        t[9] = n[9],
        t[10] = n[10],
        t[11] = n[11],
        t[12] = n[12],
        t[13] = n[13],
        t[14] = n[14],
        t[15] = n[15],
        this
    }
    copyPosition(e) {
        const t = this.elements
          , n = e.elements;
        return t[12] = n[12],
        t[13] = n[13],
        t[14] = n[14],
        this
    }
    setFromMatrix3(e) {
        const t = e.elements;
        return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1),
        this
    }
    extractBasis(e, t, n) {
        return e.setFromMatrixColumn(this, 0),
        t.setFromMatrixColumn(this, 1),
        n.setFromMatrixColumn(this, 2),
        this
    }
    makeBasis(e, t, n) {
        return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1),
        this
    }
    extractRotation(e) {
        const t = this.elements
          , n = e.elements
          , r = 1 / _i.setFromMatrixColumn(e, 0).length()
          , s = 1 / _i.setFromMatrixColumn(e, 1).length()
          , a = 1 / _i.setFromMatrixColumn(e, 2).length();
        return t[0] = n[0] * r,
        t[1] = n[1] * r,
        t[2] = n[2] * r,
        t[3] = 0,
        t[4] = n[4] * s,
        t[5] = n[5] * s,
        t[6] = n[6] * s,
        t[7] = 0,
        t[8] = n[8] * a,
        t[9] = n[9] * a,
        t[10] = n[10] * a,
        t[11] = 0,
        t[12] = 0,
        t[13] = 0,
        t[14] = 0,
        t[15] = 1,
        this
    }
    makeRotationFromEuler(e) {
        const t = this.elements
          , n = e.x
          , r = e.y
          , s = e.z
          , a = Math.cos(n)
          , o = Math.sin(n)
          , l = Math.cos(r)
          , c = Math.sin(r)
          , h = Math.cos(s)
          , d = Math.sin(s);
        if (e.order === "XYZ") {
            const p = a * h
              , m = a * d
              , g = o * h
              , _ = o * d;
            t[0] = l * h,
            t[4] = -l * d,
            t[8] = c,
            t[1] = m + g * c,
            t[5] = p - _ * c,
            t[9] = -o * l,
            t[2] = _ - p * c,
            t[6] = g + m * c,
            t[10] = a * l
        } else if (e.order === "YXZ") {
            const p = l * h
              , m = l * d
              , g = c * h
              , _ = c * d;
            t[0] = p + _ * o,
            t[4] = g * o - m,
            t[8] = a * c,
            t[1] = a * d,
            t[5] = a * h,
            t[9] = -o,
            t[2] = m * o - g,
            t[6] = _ + p * o,
            t[10] = a * l
        } else if (e.order === "ZXY") {
            const p = l * h
              , m = l * d
              , g = c * h
              , _ = c * d;
            t[0] = p - _ * o,
            t[4] = -a * d,
            t[8] = g + m * o,
            t[1] = m + g * o,
            t[5] = a * h,
            t[9] = _ - p * o,
            t[2] = -a * c,
            t[6] = o,
            t[10] = a * l
        } else if (e.order === "ZYX") {
            const p = a * h
              , m = a * d
              , g = o * h
              , _ = o * d;
            t[0] = l * h,
            t[4] = g * c - m,
            t[8] = p * c + _,
            t[1] = l * d,
            t[5] = _ * c + p,
            t[9] = m * c - g,
            t[2] = -c,
            t[6] = o * l,
            t[10] = a * l
        } else if (e.order === "YZX") {
            const p = a * l
              , m = a * c
              , g = o * l
              , _ = o * c;
            t[0] = l * h,
            t[4] = _ - p * d,
            t[8] = g * d + m,
            t[1] = d,
            t[5] = a * h,
            t[9] = -o * h,
            t[2] = -c * h,
            t[6] = m * d + g,
            t[10] = p - _ * d
        } else if (e.order === "XZY") {
            const p = a * l
              , m = a * c
              , g = o * l
              , _ = o * c;
            t[0] = l * h,
            t[4] = -d,
            t[8] = c * h,
            t[1] = p * d + _,
            t[5] = a * h,
            t[9] = m * d - g,
            t[2] = g * d - m,
            t[6] = o * h,
            t[10] = _ * d + p
        }
        return t[3] = 0,
        t[7] = 0,
        t[11] = 0,
        t[12] = 0,
        t[13] = 0,
        t[14] = 0,
        t[15] = 1,
        this
    }
    makeRotationFromQuaternion(e) {
        return this.compose(Au, e, wu)
    }
    lookAt(e, t, n) {
        const r = this.elements;
        return Jt.subVectors(e, t),
        Jt.lengthSq() === 0 && (Jt.z = 1),
        Jt.normalize(),
        Gn.crossVectors(n, Jt),
        Gn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Jt.x += 1e-4 : Jt.z += 1e-4,
        Jt.normalize(),
        Gn.crossVectors(n, Jt)),
        Gn.normalize(),
        br.crossVectors(Jt, Gn),
        r[0] = Gn.x,
        r[4] = br.x,
        r[8] = Jt.x,
        r[1] = Gn.y,
        r[5] = br.y,
        r[9] = Jt.y,
        r[2] = Gn.z,
        r[6] = br.z,
        r[10] = Jt.z,
        this
    }
    multiply(e) {
        return this.multiplyMatrices(this, e)
    }
    premultiply(e) {
        return this.multiplyMatrices(e, this)
    }
    multiplyMatrices(e, t) {
        const n = e.elements
          , r = t.elements
          , s = this.elements
          , a = n[0]
          , o = n[4]
          , l = n[8]
          , c = n[12]
          , h = n[1]
          , d = n[5]
          , p = n[9]
          , m = n[13]
          , g = n[2]
          , _ = n[6]
          , f = n[10]
          , u = n[14]
          , b = n[3]
          , v = n[7]
          , T = n[11]
          , C = n[15]
          , E = r[0]
          , R = r[4]
          , F = r[8]
          , S = r[12]
          , M = r[1]
          , U = r[5]
          , B = r[9]
          , k = r[13]
          , D = r[2]
          , G = r[6]
          , Y = r[10]
          , te = r[14]
          , L = r[3]
          , le = r[7]
          , fe = r[11]
          , Se = r[15];
        return s[0] = a * E + o * M + l * D + c * L,
        s[4] = a * R + o * U + l * G + c * le,
        s[8] = a * F + o * B + l * Y + c * fe,
        s[12] = a * S + o * k + l * te + c * Se,
        s[1] = h * E + d * M + p * D + m * L,
        s[5] = h * R + d * U + p * G + m * le,
        s[9] = h * F + d * B + p * Y + m * fe,
        s[13] = h * S + d * k + p * te + m * Se,
        s[2] = g * E + _ * M + f * D + u * L,
        s[6] = g * R + _ * U + f * G + u * le,
        s[10] = g * F + _ * B + f * Y + u * fe,
        s[14] = g * S + _ * k + f * te + u * Se,
        s[3] = b * E + v * M + T * D + C * L,
        s[7] = b * R + v * U + T * G + C * le,
        s[11] = b * F + v * B + T * Y + C * fe,
        s[15] = b * S + v * k + T * te + C * Se,
        this
    }
    multiplyScalar(e) {
        const t = this.elements;
        return t[0] *= e,
        t[4] *= e,
        t[8] *= e,
        t[12] *= e,
        t[1] *= e,
        t[5] *= e,
        t[9] *= e,
        t[13] *= e,
        t[2] *= e,
        t[6] *= e,
        t[10] *= e,
        t[14] *= e,
        t[3] *= e,
        t[7] *= e,
        t[11] *= e,
        t[15] *= e,
        this
    }
    determinant() {
        const e = this.elements
          , t = e[0]
          , n = e[4]
          , r = e[8]
          , s = e[12]
          , a = e[1]
          , o = e[5]
          , l = e[9]
          , c = e[13]
          , h = e[2]
          , d = e[6]
          , p = e[10]
          , m = e[14]
          , g = e[3]
          , _ = e[7]
          , f = e[11]
          , u = e[15];
        return g * (+s * l * d - r * c * d - s * o * p + n * c * p + r * o * m - n * l * m) + _ * (+t * l * m - t * c * p + s * a * p - r * a * m + r * c * h - s * l * h) + f * (+t * c * d - t * o * m - s * a * d + n * a * m + s * o * h - n * c * h) + u * (-r * o * h - t * l * d + t * o * p + r * a * d - n * a * p + n * l * h)
    }
    transpose() {
        const e = this.elements;
        let t;
        return t = e[1],
        e[1] = e[4],
        e[4] = t,
        t = e[2],
        e[2] = e[8],
        e[8] = t,
        t = e[6],
        e[6] = e[9],
        e[9] = t,
        t = e[3],
        e[3] = e[12],
        e[12] = t,
        t = e[7],
        e[7] = e[13],
        e[13] = t,
        t = e[11],
        e[11] = e[14],
        e[14] = t,
        this
    }
    setPosition(e, t, n) {
        const r = this.elements;
        return e.isVector3 ? (r[12] = e.x,
        r[13] = e.y,
        r[14] = e.z) : (r[12] = e,
        r[13] = t,
        r[14] = n),
        this
    }
    invert() {
        const e = this.elements
          , t = e[0]
          , n = e[1]
          , r = e[2]
          , s = e[3]
          , a = e[4]
          , o = e[5]
          , l = e[6]
          , c = e[7]
          , h = e[8]
          , d = e[9]
          , p = e[10]
          , m = e[11]
          , g = e[12]
          , _ = e[13]
          , f = e[14]
          , u = e[15]
          , b = d * f * c - _ * p * c + _ * l * m - o * f * m - d * l * u + o * p * u
          , v = g * p * c - h * f * c - g * l * m + a * f * m + h * l * u - a * p * u
          , T = h * _ * c - g * d * c + g * o * m - a * _ * m - h * o * u + a * d * u
          , C = g * d * l - h * _ * l - g * o * p + a * _ * p + h * o * f - a * d * f
          , E = t * b + n * v + r * T + s * C;
        if (E === 0)
            return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        const R = 1 / E;
        return e[0] = b * R,
        e[1] = (_ * p * s - d * f * s - _ * r * m + n * f * m + d * r * u - n * p * u) * R,
        e[2] = (o * f * s - _ * l * s + _ * r * c - n * f * c - o * r * u + n * l * u) * R,
        e[3] = (d * l * s - o * p * s - d * r * c + n * p * c + o * r * m - n * l * m) * R,
        e[4] = v * R,
        e[5] = (h * f * s - g * p * s + g * r * m - t * f * m - h * r * u + t * p * u) * R,
        e[6] = (g * l * s - a * f * s - g * r * c + t * f * c + a * r * u - t * l * u) * R,
        e[7] = (a * p * s - h * l * s + h * r * c - t * p * c - a * r * m + t * l * m) * R,
        e[8] = T * R,
        e[9] = (g * d * s - h * _ * s - g * n * m + t * _ * m + h * n * u - t * d * u) * R,
        e[10] = (a * _ * s - g * o * s + g * n * c - t * _ * c - a * n * u + t * o * u) * R,
        e[11] = (h * o * s - a * d * s - h * n * c + t * d * c + a * n * m - t * o * m) * R,
        e[12] = C * R,
        e[13] = (h * _ * r - g * d * r + g * n * p - t * _ * p - h * n * f + t * d * f) * R,
        e[14] = (g * o * r - a * _ * r - g * n * l + t * _ * l + a * n * f - t * o * f) * R,
        e[15] = (a * d * r - h * o * r + h * n * l - t * d * l - a * n * p + t * o * p) * R,
        this
    }
    scale(e) {
        const t = this.elements
          , n = e.x
          , r = e.y
          , s = e.z;
        return t[0] *= n,
        t[4] *= r,
        t[8] *= s,
        t[1] *= n,
        t[5] *= r,
        t[9] *= s,
        t[2] *= n,
        t[6] *= r,
        t[10] *= s,
        t[3] *= n,
        t[7] *= r,
        t[11] *= s,
        this
    }
    getMaxScaleOnAxis() {
        const e = this.elements
          , t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2]
          , n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6]
          , r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
        return Math.sqrt(Math.max(t, n, r))
    }
    makeTranslation(e, t, n) {
        return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1),
        this
    }
    makeRotationX(e) {
        const t = Math.cos(e)
          , n = Math.sin(e);
        return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1),
        this
    }
    makeRotationY(e) {
        const t = Math.cos(e)
          , n = Math.sin(e);
        return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1),
        this
    }
    makeRotationZ(e) {
        const t = Math.cos(e)
          , n = Math.sin(e);
        return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
        this
    }
    makeRotationAxis(e, t) {
        const n = Math.cos(t)
          , r = Math.sin(t)
          , s = 1 - n
          , a = e.x
          , o = e.y
          , l = e.z
          , c = s * a
          , h = s * o;
        return this.set(c * a + n, c * o - r * l, c * l + r * o, 0, c * o + r * l, h * o + n, h * l - r * a, 0, c * l - r * o, h * l + r * a, s * l * l + n, 0, 0, 0, 0, 1),
        this
    }
    makeScale(e, t, n) {
        return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1),
        this
    }
    makeShear(e, t, n, r, s, a) {
        return this.set(1, n, s, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1),
        this
    }
    compose(e, t, n) {
        const r = this.elements
          , s = t._x
          , a = t._y
          , o = t._z
          , l = t._w
          , c = s + s
          , h = a + a
          , d = o + o
          , p = s * c
          , m = s * h
          , g = s * d
          , _ = a * h
          , f = a * d
          , u = o * d
          , b = l * c
          , v = l * h
          , T = l * d
          , C = n.x
          , E = n.y
          , R = n.z;
        return r[0] = (1 - (_ + u)) * C,
        r[1] = (m + T) * C,
        r[2] = (g - v) * C,
        r[3] = 0,
        r[4] = (m - T) * E,
        r[5] = (1 - (p + u)) * E,
        r[6] = (f + b) * E,
        r[7] = 0,
        r[8] = (g + v) * R,
        r[9] = (f - b) * R,
        r[10] = (1 - (p + _)) * R,
        r[11] = 0,
        r[12] = e.x,
        r[13] = e.y,
        r[14] = e.z,
        r[15] = 1,
        this
    }
    decompose(e, t, n) {
        const r = this.elements;
        let s = _i.set(r[0], r[1], r[2]).length();
        const a = _i.set(r[4], r[5], r[6]).length()
          , o = _i.set(r[8], r[9], r[10]).length();
        this.determinant() < 0 && (s = -s),
        e.x = r[12],
        e.y = r[13],
        e.z = r[14],
        pn.copy(this);
        const c = 1 / s
          , h = 1 / a
          , d = 1 / o;
        return pn.elements[0] *= c,
        pn.elements[1] *= c,
        pn.elements[2] *= c,
        pn.elements[4] *= h,
        pn.elements[5] *= h,
        pn.elements[6] *= h,
        pn.elements[8] *= d,
        pn.elements[9] *= d,
        pn.elements[10] *= d,
        t.setFromRotationMatrix(pn),
        n.x = s,
        n.y = a,
        n.z = o,
        this
    }
    makePerspective(e, t, n, r, s, a, o=Sn, l=!1) {
        const c = this.elements
          , h = 2 * s / (t - e)
          , d = 2 * s / (n - r)
          , p = (t + e) / (t - e)
          , m = (n + r) / (n - r);
        let g, _;
        if (l)
            g = s / (a - s),
            _ = a * s / (a - s);
        else if (o === Sn)
            g = -(a + s) / (a - s),
            _ = -2 * a * s / (a - s);
        else if (o === Yr)
            g = -a / (a - s),
            _ = -a * s / (a - s);
        else
            throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
        return c[0] = h,
        c[4] = 0,
        c[8] = p,
        c[12] = 0,
        c[1] = 0,
        c[5] = d,
        c[9] = m,
        c[13] = 0,
        c[2] = 0,
        c[6] = 0,
        c[10] = g,
        c[14] = _,
        c[3] = 0,
        c[7] = 0,
        c[11] = -1,
        c[15] = 0,
        this
    }
    makeOrthographic(e, t, n, r, s, a, o=Sn, l=!1) {
        const c = this.elements
          , h = 2 / (t - e)
          , d = 2 / (n - r)
          , p = -(t + e) / (t - e)
          , m = -(n + r) / (n - r);
        let g, _;
        if (l)
            g = 1 / (a - s),
            _ = a / (a - s);
        else if (o === Sn)
            g = -2 / (a - s),
            _ = -(a + s) / (a - s);
        else if (o === Yr)
            g = -1 / (a - s),
            _ = -s / (a - s);
        else
            throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
        return c[0] = h,
        c[4] = 0,
        c[8] = 0,
        c[12] = p,
        c[1] = 0,
        c[5] = d,
        c[9] = 0,
        c[13] = m,
        c[2] = 0,
        c[6] = 0,
        c[10] = g,
        c[14] = _,
        c[3] = 0,
        c[7] = 0,
        c[11] = 0,
        c[15] = 1,
        this
    }
    equals(e) {
        const t = this.elements
          , n = e.elements;
        for (let r = 0; r < 16; r++)
            if (t[r] !== n[r])
                return !1;
        return !0
    }
    fromArray(e, t=0) {
        for (let n = 0; n < 16; n++)
            this.elements[n] = e[n + t];
        return this
    }
    toArray(e=[], t=0) {
        const n = this.elements;
        return e[t] = n[0],
        e[t + 1] = n[1],
        e[t + 2] = n[2],
        e[t + 3] = n[3],
        e[t + 4] = n[4],
        e[t + 5] = n[5],
        e[t + 6] = n[6],
        e[t + 7] = n[7],
        e[t + 8] = n[8],
        e[t + 9] = n[9],
        e[t + 10] = n[10],
        e[t + 11] = n[11],
        e[t + 12] = n[12],
        e[t + 13] = n[13],
        e[t + 14] = n[14],
        e[t + 15] = n[15],
        e
    }
}
const _i = new O
  , pn = new ct
  , Au = new O(0,0,0)
  , wu = new O(1,1,1)
  , Gn = new O
  , br = new O
  , Jt = new O
  , mo = new ct
  , xo = new Kn;
class En {
    constructor(e=0, t=0, n=0, r=En.DEFAULT_ORDER) {
        this.isEuler = !0,
        this._x = e,
        this._y = t,
        this._z = n,
        this._order = r
    }
    get x() {
        return this._x
    }
    set x(e) {
        this._x = e,
        this._onChangeCallback()
    }
    get y() {
        return this._y
    }
    set y(e) {
        this._y = e,
        this._onChangeCallback()
    }
    get z() {
        return this._z
    }
    set z(e) {
        this._z = e,
        this._onChangeCallback()
    }
    get order() {
        return this._order
    }
    set order(e) {
        this._order = e,
        this._onChangeCallback()
    }
    set(e, t, n, r=this._order) {
        return this._x = e,
        this._y = t,
        this._z = n,
        this._order = r,
        this._onChangeCallback(),
        this
    }
    clone() {
        return new this.constructor(this._x,this._y,this._z,this._order)
    }
    copy(e) {
        return this._x = e._x,
        this._y = e._y,
        this._z = e._z,
        this._order = e._order,
        this._onChangeCallback(),
        this
    }
    setFromRotationMatrix(e, t=this._order, n=!0) {
        const r = e.elements
          , s = r[0]
          , a = r[4]
          , o = r[8]
          , l = r[1]
          , c = r[5]
          , h = r[9]
          , d = r[2]
          , p = r[6]
          , m = r[10];
        switch (t) {
        case "XYZ":
            this._y = Math.asin(Qe(o, -1, 1)),
            Math.abs(o) < .9999999 ? (this._x = Math.atan2(-h, m),
            this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(p, c),
            this._z = 0);
            break;
        case "YXZ":
            this._x = Math.asin(-Qe(h, -1, 1)),
            Math.abs(h) < .9999999 ? (this._y = Math.atan2(o, m),
            this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-d, s),
            this._z = 0);
            break;
        case "ZXY":
            this._x = Math.asin(Qe(p, -1, 1)),
            Math.abs(p) < .9999999 ? (this._y = Math.atan2(-d, m),
            this._z = Math.atan2(-a, c)) : (this._y = 0,
            this._z = Math.atan2(l, s));
            break;
        case "ZYX":
            this._y = Math.asin(-Qe(d, -1, 1)),
            Math.abs(d) < .9999999 ? (this._x = Math.atan2(p, m),
            this._z = Math.atan2(l, s)) : (this._x = 0,
            this._z = Math.atan2(-a, c));
            break;
        case "YZX":
            this._z = Math.asin(Qe(l, -1, 1)),
            Math.abs(l) < .9999999 ? (this._x = Math.atan2(-h, c),
            this._y = Math.atan2(-d, s)) : (this._x = 0,
            this._y = Math.atan2(o, m));
            break;
        case "XZY":
            this._z = Math.asin(-Qe(a, -1, 1)),
            Math.abs(a) < .9999999 ? (this._x = Math.atan2(p, c),
            this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, m),
            this._y = 0);
            break;
        default:
            Ye("Euler: .setFromRotationMatrix() encountered an unknown order: " + t)
        }
        return this._order = t,
        n === !0 && this._onChangeCallback(),
        this
    }
    setFromQuaternion(e, t, n) {
        return mo.makeRotationFromQuaternion(e),
        this.setFromRotationMatrix(mo, t, n)
    }
    setFromVector3(e, t=this._order) {
        return this.set(e.x, e.y, e.z, t)
    }
    reorder(e) {
        return xo.setFromEuler(this),
        this.setFromQuaternion(xo, e)
    }
    equals(e) {
        return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
    }
    fromArray(e) {
        return this._x = e[0],
        this._y = e[1],
        this._z = e[2],
        e[3] !== void 0 && (this._order = e[3]),
        this._onChangeCallback(),
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this._x,
        e[t + 1] = this._y,
        e[t + 2] = this._z,
        e[t + 3] = this._order,
        e
    }
    _onChange(e) {
        return this._onChangeCallback = e,
        this
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x,
        yield this._y,
        yield this._z,
        yield this._order
    }
}
En.DEFAULT_ORDER = "XYZ";
class ka {
    constructor() {
        this.mask = 1
    }
    set(e) {
        this.mask = (1 << e | 0) >>> 0
    }
    enable(e) {
        this.mask |= 1 << e | 0
    }
    enableAll() {
        this.mask = -1
    }
    toggle(e) {
        this.mask ^= 1 << e | 0
    }
    disable(e) {
        this.mask &= ~(1 << e | 0)
    }
    disableAll() {
        this.mask = 0
    }
    test(e) {
        return (this.mask & e.mask) !== 0
    }
    isEnabled(e) {
        return (this.mask & (1 << e | 0)) !== 0
    }
}
let Cu = 0;
const go = new O
  , vi = new Kn
  , Rn = new ct
  , Sr = new O
  , ji = new O
  , Ru = new O
  , Pu = new Kn
  , _o = new O(1,0,0)
  , vo = new O(0,1,0)
  , Mo = new O(0,0,1)
  , bo = {
    type: "added"
}
  , Lu = {
    type: "removed"
}
  , Mi = {
    type: "childadded",
    child: null
}
  , hs = {
    type: "childremoved",
    child: null
};
class It extends Vi {
    constructor() {
        super(),
        this.isObject3D = !0,
        Object.defineProperty(this, "id", {
            value: Cu++
        }),
        this.uuid = ki(),
        this.name = "",
        this.type = "Object3D",
        this.parent = null,
        this.children = [],
        this.up = It.DEFAULT_UP.clone();
        const e = new O
          , t = new En
          , n = new Kn
          , r = new O(1,1,1);
        function s() {
            n.setFromEuler(t, !1)
        }
        function a() {
            t.setFromQuaternion(n, void 0, !1)
        }
        t._onChange(s),
        n._onChange(a),
        Object.defineProperties(this, {
            position: {
                configurable: !0,
                enumerable: !0,
                value: e
            },
            rotation: {
                configurable: !0,
                enumerable: !0,
                value: t
            },
            quaternion: {
                configurable: !0,
                enumerable: !0,
                value: n
            },
            scale: {
                configurable: !0,
                enumerable: !0,
                value: r
            },
            modelViewMatrix: {
                value: new ct
            },
            normalMatrix: {
                value: new $e
            }
        }),
        this.matrix = new ct,
        this.matrixWorld = new ct,
        this.matrixAutoUpdate = It.DEFAULT_MATRIX_AUTO_UPDATE,
        this.matrixWorldAutoUpdate = It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,
        this.matrixWorldNeedsUpdate = !1,
        this.layers = new ka,
        this.visible = !0,
        this.castShadow = !1,
        this.receiveShadow = !1,
        this.frustumCulled = !0,
        this.renderOrder = 0,
        this.animations = [],
        this.customDepthMaterial = void 0,
        this.customDistanceMaterial = void 0,
        this.userData = {}
    }
    onBeforeShadow() {}
    onAfterShadow() {}
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(e) {
        this.matrixAutoUpdate && this.updateMatrix(),
        this.matrix.premultiply(e),
        this.matrix.decompose(this.position, this.quaternion, this.scale)
    }
    applyQuaternion(e) {
        return this.quaternion.premultiply(e),
        this
    }
    setRotationFromAxisAngle(e, t) {
        this.quaternion.setFromAxisAngle(e, t)
    }
    setRotationFromEuler(e) {
        this.quaternion.setFromEuler(e, !0)
    }
    setRotationFromMatrix(e) {
        this.quaternion.setFromRotationMatrix(e)
    }
    setRotationFromQuaternion(e) {
        this.quaternion.copy(e)
    }
    rotateOnAxis(e, t) {
        return vi.setFromAxisAngle(e, t),
        this.quaternion.multiply(vi),
        this
    }
    rotateOnWorldAxis(e, t) {
        return vi.setFromAxisAngle(e, t),
        this.quaternion.premultiply(vi),
        this
    }
    rotateX(e) {
        return this.rotateOnAxis(_o, e)
    }
    rotateY(e) {
        return this.rotateOnAxis(vo, e)
    }
    rotateZ(e) {
        return this.rotateOnAxis(Mo, e)
    }
    translateOnAxis(e, t) {
        return go.copy(e).applyQuaternion(this.quaternion),
        this.position.add(go.multiplyScalar(t)),
        this
    }
    translateX(e) {
        return this.translateOnAxis(_o, e)
    }
    translateY(e) {
        return this.translateOnAxis(vo, e)
    }
    translateZ(e) {
        return this.translateOnAxis(Mo, e)
    }
    localToWorld(e) {
        return this.updateWorldMatrix(!0, !1),
        e.applyMatrix4(this.matrixWorld)
    }
    worldToLocal(e) {
        return this.updateWorldMatrix(!0, !1),
        e.applyMatrix4(Rn.copy(this.matrixWorld).invert())
    }
    lookAt(e, t, n) {
        e.isVector3 ? Sr.copy(e) : Sr.set(e, t, n);
        const r = this.parent;
        this.updateWorldMatrix(!0, !1),
        ji.setFromMatrixPosition(this.matrixWorld),
        this.isCamera || this.isLight ? Rn.lookAt(ji, Sr, this.up) : Rn.lookAt(Sr, ji, this.up),
        this.quaternion.setFromRotationMatrix(Rn),
        r && (Rn.extractRotation(r.matrixWorld),
        vi.setFromRotationMatrix(Rn),
        this.quaternion.premultiply(vi.invert()))
    }
    add(e) {
        if (arguments.length > 1) {
            for (let t = 0; t < arguments.length; t++)
                this.add(arguments[t]);
            return this
        }
        return e === this ? (bt("Object3D.add: object can't be added as a child of itself.", e),
        this) : (e && e.isObject3D ? (e.removeFromParent(),
        e.parent = this,
        this.children.push(e),
        e.dispatchEvent(bo),
        Mi.child = e,
        this.dispatchEvent(Mi),
        Mi.child = null) : bt("Object3D.add: object not an instance of THREE.Object3D.", e),
        this)
    }
    remove(e) {
        if (arguments.length > 1) {
            for (let n = 0; n < arguments.length; n++)
                this.remove(arguments[n]);
            return this
        }
        const t = this.children.indexOf(e);
        return t !== -1 && (e.parent = null,
        this.children.splice(t, 1),
        e.dispatchEvent(Lu),
        hs.child = e,
        this.dispatchEvent(hs),
        hs.child = null),
        this
    }
    removeFromParent() {
        const e = this.parent;
        return e !== null && e.remove(this),
        this
    }
    clear() {
        return this.remove(...this.children)
    }
    attach(e) {
        return this.updateWorldMatrix(!0, !1),
        Rn.copy(this.matrixWorld).invert(),
        e.parent !== null && (e.parent.updateWorldMatrix(!0, !1),
        Rn.multiply(e.parent.matrixWorld)),
        e.applyMatrix4(Rn),
        e.removeFromParent(),
        e.parent = this,
        this.children.push(e),
        e.updateWorldMatrix(!1, !0),
        e.dispatchEvent(bo),
        Mi.child = e,
        this.dispatchEvent(Mi),
        Mi.child = null,
        this
    }
    getObjectById(e) {
        return this.getObjectByProperty("id", e)
    }
    getObjectByName(e) {
        return this.getObjectByProperty("name", e)
    }
    getObjectByProperty(e, t) {
        if (this[e] === t)
            return this;
        for (let n = 0, r = this.children.length; n < r; n++) {
            const a = this.children[n].getObjectByProperty(e, t);
            if (a !== void 0)
                return a
        }
    }
    getObjectsByProperty(e, t, n=[]) {
        this[e] === t && n.push(this);
        const r = this.children;
        for (let s = 0, a = r.length; s < a; s++)
            r[s].getObjectsByProperty(e, t, n);
        return n
    }
    getWorldPosition(e) {
        return this.updateWorldMatrix(!0, !1),
        e.setFromMatrixPosition(this.matrixWorld)
    }
    getWorldQuaternion(e) {
        return this.updateWorldMatrix(!0, !1),
        this.matrixWorld.decompose(ji, e, Ru),
        e
    }
    getWorldScale(e) {
        return this.updateWorldMatrix(!0, !1),
        this.matrixWorld.decompose(ji, Pu, e),
        e
    }
    getWorldDirection(e) {
        this.updateWorldMatrix(!0, !1);
        const t = this.matrixWorld.elements;
        return e.set(t[8], t[9], t[10]).normalize()
    }
    raycast() {}
    traverse(e) {
        e(this);
        const t = this.children;
        for (let n = 0, r = t.length; n < r; n++)
            t[n].traverse(e)
    }
    traverseVisible(e) {
        if (this.visible === !1)
            return;
        e(this);
        const t = this.children;
        for (let n = 0, r = t.length; n < r; n++)
            t[n].traverseVisible(e)
    }
    traverseAncestors(e) {
        const t = this.parent;
        t !== null && (e(t),
        t.traverseAncestors(e))
    }
    updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale),
        this.matrixWorldNeedsUpdate = !0
    }
    updateMatrixWorld(e) {
        this.matrixAutoUpdate && this.updateMatrix(),
        (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)),
        this.matrixWorldNeedsUpdate = !1,
        e = !0);
        const t = this.children;
        for (let n = 0, r = t.length; n < r; n++)
            t[n].updateMatrixWorld(e)
    }
    updateWorldMatrix(e, t) {
        const n = this.parent;
        if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1),
        this.matrixAutoUpdate && this.updateMatrix(),
        this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)),
        t === !0) {
            const r = this.children;
            for (let s = 0, a = r.length; s < a; s++)
                r[s].updateWorldMatrix(!1, !0)
        }
    }
    toJSON(e) {
        const t = e === void 0 || typeof e == "string"
          , n = {};
        t && (e = {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            shapes: {},
            skeletons: {},
            animations: {},
            nodes: {}
        },
        n.metadata = {
            version: 4.7,
            type: "Object",
            generator: "Object3D.toJSON"
        });
        const r = {};
        r.uuid = this.uuid,
        r.type = this.type,
        this.name !== "" && (r.name = this.name),
        this.castShadow === !0 && (r.castShadow = !0),
        this.receiveShadow === !0 && (r.receiveShadow = !0),
        this.visible === !1 && (r.visible = !1),
        this.frustumCulled === !1 && (r.frustumCulled = !1),
        this.renderOrder !== 0 && (r.renderOrder = this.renderOrder),
        Object.keys(this.userData).length > 0 && (r.userData = this.userData),
        r.layers = this.layers.mask,
        r.matrix = this.matrix.toArray(),
        r.up = this.up.toArray(),
        this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1),
        this.isInstancedMesh && (r.type = "InstancedMesh",
        r.count = this.count,
        r.instanceMatrix = this.instanceMatrix.toJSON(),
        this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())),
        this.isBatchedMesh && (r.type = "BatchedMesh",
        r.perObjectFrustumCulled = this.perObjectFrustumCulled,
        r.sortObjects = this.sortObjects,
        r.drawRanges = this._drawRanges,
        r.reservedRanges = this._reservedRanges,
        r.geometryInfo = this._geometryInfo.map(o => ({
            ...o,
            boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
            boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
        })),
        r.instanceInfo = this._instanceInfo.map(o => ({
            ...o
        })),
        r.availableInstanceIds = this._availableInstanceIds.slice(),
        r.availableGeometryIds = this._availableGeometryIds.slice(),
        r.nextIndexStart = this._nextIndexStart,
        r.nextVertexStart = this._nextVertexStart,
        r.geometryCount = this._geometryCount,
        r.maxInstanceCount = this._maxInstanceCount,
        r.maxVertexCount = this._maxVertexCount,
        r.maxIndexCount = this._maxIndexCount,
        r.geometryInitialized = this._geometryInitialized,
        r.matricesTexture = this._matricesTexture.toJSON(e),
        r.indirectTexture = this._indirectTexture.toJSON(e),
        this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)),
        this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()),
        this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
        function s(o, l) {
            return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(e)),
            l.uuid
        }
        if (this.isScene)
            this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)),
            this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
        else if (this.isMesh || this.isLine || this.isPoints) {
            r.geometry = s(e.geometries, this.geometry);
            const o = this.geometry.parameters;
            if (o !== void 0 && o.shapes !== void 0) {
                const l = o.shapes;
                if (Array.isArray(l))
                    for (let c = 0, h = l.length; c < h; c++) {
                        const d = l[c];
                        s(e.shapes, d)
                    }
                else
                    s(e.shapes, l)
            }
        }
        if (this.isSkinnedMesh && (r.bindMode = this.bindMode,
        r.bindMatrix = this.bindMatrix.toArray(),
        this.skeleton !== void 0 && (s(e.skeletons, this.skeleton),
        r.skeleton = this.skeleton.uuid)),
        this.material !== void 0)
            if (Array.isArray(this.material)) {
                const o = [];
                for (let l = 0, c = this.material.length; l < c; l++)
                    o.push(s(e.materials, this.material[l]));
                r.material = o
            } else
                r.material = s(e.materials, this.material);
        if (this.children.length > 0) {
            r.children = [];
            for (let o = 0; o < this.children.length; o++)
                r.children.push(this.children[o].toJSON(e).object)
        }
        if (this.animations.length > 0) {
            r.animations = [];
            for (let o = 0; o < this.animations.length; o++) {
                const l = this.animations[o];
                r.animations.push(s(e.animations, l))
            }
        }
        if (t) {
            const o = a(e.geometries)
              , l = a(e.materials)
              , c = a(e.textures)
              , h = a(e.images)
              , d = a(e.shapes)
              , p = a(e.skeletons)
              , m = a(e.animations)
              , g = a(e.nodes);
            o.length > 0 && (n.geometries = o),
            l.length > 0 && (n.materials = l),
            c.length > 0 && (n.textures = c),
            h.length > 0 && (n.images = h),
            d.length > 0 && (n.shapes = d),
            p.length > 0 && (n.skeletons = p),
            m.length > 0 && (n.animations = m),
            g.length > 0 && (n.nodes = g)
        }
        return n.object = r,
        n;
        function a(o) {
            const l = [];
            for (const c in o) {
                const h = o[c];
                delete h.metadata,
                l.push(h)
            }
            return l
        }
    }
    clone(e) {
        return new this.constructor().copy(this, e)
    }
    copy(e, t=!0) {
        if (this.name = e.name,
        this.up.copy(e.up),
        this.position.copy(e.position),
        this.rotation.order = e.rotation.order,
        this.quaternion.copy(e.quaternion),
        this.scale.copy(e.scale),
        this.matrix.copy(e.matrix),
        this.matrixWorld.copy(e.matrixWorld),
        this.matrixAutoUpdate = e.matrixAutoUpdate,
        this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate,
        this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate,
        this.layers.mask = e.layers.mask,
        this.visible = e.visible,
        this.castShadow = e.castShadow,
        this.receiveShadow = e.receiveShadow,
        this.frustumCulled = e.frustumCulled,
        this.renderOrder = e.renderOrder,
        this.animations = e.animations.slice(),
        this.userData = JSON.parse(JSON.stringify(e.userData)),
        t === !0)
            for (let n = 0; n < e.children.length; n++) {
                const r = e.children[n];
                this.add(r.clone())
            }
        return this
    }
}
It.DEFAULT_UP = new O(0,1,0);
It.DEFAULT_MATRIX_AUTO_UPDATE = !0;
It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const mn = new O
  , Pn = new O
  , fs = new O
  , Ln = new O
  , bi = new O
  , Si = new O
  , So = new O
  , ps = new O
  , ms = new O
  , xs = new O
  , gs = new St
  , _s = new St
  , vs = new St;
class gn {
    constructor(e=new O, t=new O, n=new O) {
        this.a = e,
        this.b = t,
        this.c = n
    }
    static getNormal(e, t, n, r) {
        r.subVectors(n, t),
        mn.subVectors(e, t),
        r.cross(mn);
        const s = r.lengthSq();
        return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0)
    }
    static getBarycoord(e, t, n, r, s) {
        mn.subVectors(r, t),
        Pn.subVectors(n, t),
        fs.subVectors(e, t);
        const a = mn.dot(mn)
          , o = mn.dot(Pn)
          , l = mn.dot(fs)
          , c = Pn.dot(Pn)
          , h = Pn.dot(fs)
          , d = a * c - o * o;
        if (d === 0)
            return s.set(0, 0, 0),
            null;
        const p = 1 / d
          , m = (c * l - o * h) * p
          , g = (a * h - o * l) * p;
        return s.set(1 - m - g, g, m)
    }
    static containsPoint(e, t, n, r) {
        return this.getBarycoord(e, t, n, r, Ln) === null ? !1 : Ln.x >= 0 && Ln.y >= 0 && Ln.x + Ln.y <= 1
    }
    static getInterpolation(e, t, n, r, s, a, o, l) {
        return this.getBarycoord(e, t, n, r, Ln) === null ? (l.x = 0,
        l.y = 0,
        "z" in l && (l.z = 0),
        "w" in l && (l.w = 0),
        null) : (l.setScalar(0),
        l.addScaledVector(s, Ln.x),
        l.addScaledVector(a, Ln.y),
        l.addScaledVector(o, Ln.z),
        l)
    }
    static getInterpolatedAttribute(e, t, n, r, s, a) {
        return gs.setScalar(0),
        _s.setScalar(0),
        vs.setScalar(0),
        gs.fromBufferAttribute(e, t),
        _s.fromBufferAttribute(e, n),
        vs.fromBufferAttribute(e, r),
        a.setScalar(0),
        a.addScaledVector(gs, s.x),
        a.addScaledVector(_s, s.y),
        a.addScaledVector(vs, s.z),
        a
    }
    static isFrontFacing(e, t, n, r) {
        return mn.subVectors(n, t),
        Pn.subVectors(e, t),
        mn.cross(Pn).dot(r) < 0
    }
    set(e, t, n) {
        return this.a.copy(e),
        this.b.copy(t),
        this.c.copy(n),
        this
    }
    setFromPointsAndIndices(e, t, n, r) {
        return this.a.copy(e[t]),
        this.b.copy(e[n]),
        this.c.copy(e[r]),
        this
    }
    setFromAttributeAndIndices(e, t, n, r) {
        return this.a.fromBufferAttribute(e, t),
        this.b.fromBufferAttribute(e, n),
        this.c.fromBufferAttribute(e, r),
        this
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        return this.a.copy(e.a),
        this.b.copy(e.b),
        this.c.copy(e.c),
        this
    }
    getArea() {
        return mn.subVectors(this.c, this.b),
        Pn.subVectors(this.a, this.b),
        mn.cross(Pn).length() * .5
    }
    getMidpoint(e) {
        return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    }
    getNormal(e) {
        return gn.getNormal(this.a, this.b, this.c, e)
    }
    getPlane(e) {
        return e.setFromCoplanarPoints(this.a, this.b, this.c)
    }
    getBarycoord(e, t) {
        return gn.getBarycoord(e, this.a, this.b, this.c, t)
    }
    getInterpolation(e, t, n, r, s) {
        return gn.getInterpolation(e, this.a, this.b, this.c, t, n, r, s)
    }
    containsPoint(e) {
        return gn.containsPoint(e, this.a, this.b, this.c)
    }
    isFrontFacing(e) {
        return gn.isFrontFacing(this.a, this.b, this.c, e)
    }
    intersectsBox(e) {
        return e.intersectsTriangle(this)
    }
    closestPointToPoint(e, t) {
        const n = this.a
          , r = this.b
          , s = this.c;
        let a, o;
        bi.subVectors(r, n),
        Si.subVectors(s, n),
        ps.subVectors(e, n);
        const l = bi.dot(ps)
          , c = Si.dot(ps);
        if (l <= 0 && c <= 0)
            return t.copy(n);
        ms.subVectors(e, r);
        const h = bi.dot(ms)
          , d = Si.dot(ms);
        if (h >= 0 && d <= h)
            return t.copy(r);
        const p = l * d - h * c;
        if (p <= 0 && l >= 0 && h <= 0)
            return a = l / (l - h),
            t.copy(n).addScaledVector(bi, a);
        xs.subVectors(e, s);
        const m = bi.dot(xs)
          , g = Si.dot(xs);
        if (g >= 0 && m <= g)
            return t.copy(s);
        const _ = m * c - l * g;
        if (_ <= 0 && c >= 0 && g <= 0)
            return o = c / (c - g),
            t.copy(n).addScaledVector(Si, o);
        const f = h * g - m * d;
        if (f <= 0 && d - h >= 0 && m - g >= 0)
            return So.subVectors(s, r),
            o = (d - h) / (d - h + (m - g)),
            t.copy(r).addScaledVector(So, o);
        const u = 1 / (f + _ + p);
        return a = _ * u,
        o = p * u,
        t.copy(n).addScaledVector(bi, a).addScaledVector(Si, o)
    }
    equals(e) {
        return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
    }
}
const Lc = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
}
  , Hn = {
    h: 0,
    s: 0,
    l: 0
}
  , yr = {
    h: 0,
    s: 0,
    l: 0
};
function Ms(i, e, t) {
    return t < 0 && (t += 1),
    t > 1 && (t -= 1),
    t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i
}
class et {
    constructor(e, t, n) {
        return this.isColor = !0,
        this.r = 1,
        this.g = 1,
        this.b = 1,
        this.set(e, t, n)
    }
    set(e, t, n) {
        if (t === void 0 && n === void 0) {
            const r = e;
            r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r)
        } else
            this.setRGB(e, t, n);
        return this
    }
    setScalar(e) {
        return this.r = e,
        this.g = e,
        this.b = e,
        this
    }
    setHex(e, t=on) {
        return e = Math.floor(e),
        this.r = (e >> 16 & 255) / 255,
        this.g = (e >> 8 & 255) / 255,
        this.b = (e & 255) / 255,
        ot.colorSpaceToWorking(this, t),
        this
    }
    setRGB(e, t, n, r=ot.workingColorSpace) {
        return this.r = e,
        this.g = t,
        this.b = n,
        ot.colorSpaceToWorking(this, r),
        this
    }
    setHSL(e, t, n, r=ot.workingColorSpace) {
        if (e = Ba(e, 1),
        t = Qe(t, 0, 1),
        n = Qe(n, 0, 1),
        t === 0)
            this.r = this.g = this.b = n;
        else {
            const s = n <= .5 ? n * (1 + t) : n + t - n * t
              , a = 2 * n - s;
            this.r = Ms(a, s, e + 1 / 3),
            this.g = Ms(a, s, e),
            this.b = Ms(a, s, e - 1 / 3)
        }
        return ot.colorSpaceToWorking(this, r),
        this
    }
    setStyle(e, t=on) {
        function n(s) {
            s !== void 0 && parseFloat(s) < 1 && Ye("Color: Alpha component of " + e + " will be ignored.")
        }
        let r;
        if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
            let s;
            const a = r[1]
              , o = r[2];
            switch (a) {
            case "rgb":
            case "rgba":
                if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
                    return n(s[4]),
                    this.setRGB(Math.min(255, parseInt(s[1], 10)) / 255, Math.min(255, parseInt(s[2], 10)) / 255, Math.min(255, parseInt(s[3], 10)) / 255, t);
                if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
                    return n(s[4]),
                    this.setRGB(Math.min(100, parseInt(s[1], 10)) / 100, Math.min(100, parseInt(s[2], 10)) / 100, Math.min(100, parseInt(s[3], 10)) / 100, t);
                break;
            case "hsl":
            case "hsla":
                if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
                    return n(s[4]),
                    this.setHSL(parseFloat(s[1]) / 360, parseFloat(s[2]) / 100, parseFloat(s[3]) / 100, t);
                break;
            default:
                Ye("Color: Unknown color model " + e)
            }
        } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
            const s = r[1]
              , a = s.length;
            if (a === 3)
                return this.setRGB(parseInt(s.charAt(0), 16) / 15, parseInt(s.charAt(1), 16) / 15, parseInt(s.charAt(2), 16) / 15, t);
            if (a === 6)
                return this.setHex(parseInt(s, 16), t);
            Ye("Color: Invalid hex color " + e)
        } else if (e && e.length > 0)
            return this.setColorName(e, t);
        return this
    }
    setColorName(e, t=on) {
        const n = Lc[e.toLowerCase()];
        return n !== void 0 ? this.setHex(n, t) : Ye("Color: Unknown color " + e),
        this
    }
    clone() {
        return new this.constructor(this.r,this.g,this.b)
    }
    copy(e) {
        return this.r = e.r,
        this.g = e.g,
        this.b = e.b,
        this
    }
    copySRGBToLinear(e) {
        return this.r = Bn(e.r),
        this.g = Bn(e.g),
        this.b = Bn(e.b),
        this
    }
    copyLinearToSRGB(e) {
        return this.r = Ii(e.r),
        this.g = Ii(e.g),
        this.b = Ii(e.b),
        this
    }
    convertSRGBToLinear() {
        return this.copySRGBToLinear(this),
        this
    }
    convertLinearToSRGB() {
        return this.copyLinearToSRGB(this),
        this
    }
    getHex(e=on) {
        return ot.workingToColorSpace(Ot.copy(this), e),
        Math.round(Qe(Ot.r * 255, 0, 255)) * 65536 + Math.round(Qe(Ot.g * 255, 0, 255)) * 256 + Math.round(Qe(Ot.b * 255, 0, 255))
    }
    getHexString(e=on) {
        return ("000000" + this.getHex(e).toString(16)).slice(-6)
    }
    getHSL(e, t=ot.workingColorSpace) {
        ot.workingToColorSpace(Ot.copy(this), t);
        const n = Ot.r
          , r = Ot.g
          , s = Ot.b
          , a = Math.max(n, r, s)
          , o = Math.min(n, r, s);
        let l, c;
        const h = (o + a) / 2;
        if (o === a)
            l = 0,
            c = 0;
        else {
            const d = a - o;
            switch (c = h <= .5 ? d / (a + o) : d / (2 - a - o),
            a) {
            case n:
                l = (r - s) / d + (r < s ? 6 : 0);
                break;
            case r:
                l = (s - n) / d + 2;
                break;
            case s:
                l = (n - r) / d + 4;
                break
            }
            l /= 6
        }
        return e.h = l,
        e.s = c,
        e.l = h,
        e
    }
    getRGB(e, t=ot.workingColorSpace) {
        return ot.workingToColorSpace(Ot.copy(this), t),
        e.r = Ot.r,
        e.g = Ot.g,
        e.b = Ot.b,
        e
    }
    getStyle(e=on) {
        ot.workingToColorSpace(Ot.copy(this), e);
        const t = Ot.r
          , n = Ot.g
          , r = Ot.b;
        return e !== on ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`
    }
    offsetHSL(e, t, n) {
        return this.getHSL(Hn),
        this.setHSL(Hn.h + e, Hn.s + t, Hn.l + n)
    }
    add(e) {
        return this.r += e.r,
        this.g += e.g,
        this.b += e.b,
        this
    }
    addColors(e, t) {
        return this.r = e.r + t.r,
        this.g = e.g + t.g,
        this.b = e.b + t.b,
        this
    }
    addScalar(e) {
        return this.r += e,
        this.g += e,
        this.b += e,
        this
    }
    sub(e) {
        return this.r = Math.max(0, this.r - e.r),
        this.g = Math.max(0, this.g - e.g),
        this.b = Math.max(0, this.b - e.b),
        this
    }
    multiply(e) {
        return this.r *= e.r,
        this.g *= e.g,
        this.b *= e.b,
        this
    }
    multiplyScalar(e) {
        return this.r *= e,
        this.g *= e,
        this.b *= e,
        this
    }
    lerp(e, t) {
        return this.r += (e.r - this.r) * t,
        this.g += (e.g - this.g) * t,
        this.b += (e.b - this.b) * t,
        this
    }
    lerpColors(e, t, n) {
        return this.r = e.r + (t.r - e.r) * n,
        this.g = e.g + (t.g - e.g) * n,
        this.b = e.b + (t.b - e.b) * n,
        this
    }
    lerpHSL(e, t) {
        this.getHSL(Hn),
        e.getHSL(yr);
        const n = ir(Hn.h, yr.h, t)
          , r = ir(Hn.s, yr.s, t)
          , s = ir(Hn.l, yr.l, t);
        return this.setHSL(n, r, s),
        this
    }
    setFromVector3(e) {
        return this.r = e.x,
        this.g = e.y,
        this.b = e.z,
        this
    }
    applyMatrix3(e) {
        const t = this.r
          , n = this.g
          , r = this.b
          , s = e.elements;
        return this.r = s[0] * t + s[3] * n + s[6] * r,
        this.g = s[1] * t + s[4] * n + s[7] * r,
        this.b = s[2] * t + s[5] * n + s[8] * r,
        this
    }
    equals(e) {
        return e.r === this.r && e.g === this.g && e.b === this.b
    }
    fromArray(e, t=0) {
        return this.r = e[t],
        this.g = e[t + 1],
        this.b = e[t + 2],
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this.r,
        e[t + 1] = this.g,
        e[t + 2] = this.b,
        e
    }
    fromBufferAttribute(e, t) {
        return this.r = e.getX(t),
        this.g = e.getY(t),
        this.b = e.getZ(t),
        this
    }
    toJSON() {
        return this.getHex()
    }
    *[Symbol.iterator]() {
        yield this.r,
        yield this.g,
        yield this.b
    }
}
const Ot = new et;
et.NAMES = Lc;
let Du = 0;
class Hi extends Vi {
    constructor() {
        super(),
        this.isMaterial = !0,
        Object.defineProperty(this, "id", {
            value: Du++
        }),
        this.uuid = ki(),
        this.name = "",
        this.type = "Material",
        this.blending = Di,
        this.side = jn,
        this.vertexColors = !1,
        this.opacity = 1,
        this.transparent = !1,
        this.alphaHash = !1,
        this.blendSrc = Us,
        this.blendDst = Ns,
        this.blendEquation = ai,
        this.blendSrcAlpha = null,
        this.blendDstAlpha = null,
        this.blendEquationAlpha = null,
        this.blendColor = new et(0,0,0),
        this.blendAlpha = 0,
        this.depthFunc = Ui,
        this.depthTest = !0,
        this.depthWrite = !0,
        this.stencilWriteMask = 255,
        this.stencilFunc = so,
        this.stencilRef = 0,
        this.stencilFuncMask = 255,
        this.stencilFail = fi,
        this.stencilZFail = fi,
        this.stencilZPass = fi,
        this.stencilWrite = !1,
        this.clippingPlanes = null,
        this.clipIntersection = !1,
        this.clipShadows = !1,
        this.shadowSide = null,
        this.colorWrite = !0,
        this.precision = null,
        this.polygonOffset = !1,
        this.polygonOffsetFactor = 0,
        this.polygonOffsetUnits = 0,
        this.dithering = !1,
        this.alphaToCoverage = !1,
        this.premultipliedAlpha = !1,
        this.forceSinglePass = !1,
        this.allowOverride = !0,
        this.visible = !0,
        this.toneMapped = !0,
        this.userData = {},
        this.version = 0,
        this._alphaTest = 0
    }
    get alphaTest() {
        return this._alphaTest
    }
    set alphaTest(e) {
        this._alphaTest > 0 != e > 0 && this.version++,
        this._alphaTest = e
    }
    onBeforeRender() {}
    onBeforeCompile() {}
    customProgramCacheKey() {
        return this.onBeforeCompile.toString()
    }
    setValues(e) {
        if (e !== void 0)
            for (const t in e) {
                const n = e[t];
                if (n === void 0) {
                    Ye(`Material: parameter '${t}' has value of undefined.`);
                    continue
                }
                const r = this[t];
                if (r === void 0) {
                    Ye(`Material: '${t}' is not a property of THREE.${this.type}.`);
                    continue
                }
                r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n
            }
    }
    toJSON(e) {
        const t = e === void 0 || typeof e == "string";
        t && (e = {
            textures: {},
            images: {}
        });
        const n = {
            metadata: {
                version: 4.7,
                type: "Material",
                generator: "Material.toJSON"
            }
        };
        n.uuid = this.uuid,
        n.type = this.type,
        this.name !== "" && (n.name = this.name),
        this.color && this.color.isColor && (n.color = this.color.getHex()),
        this.roughness !== void 0 && (n.roughness = this.roughness),
        this.metalness !== void 0 && (n.metalness = this.metalness),
        this.sheen !== void 0 && (n.sheen = this.sheen),
        this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()),
        this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness),
        this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()),
        this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity),
        this.specular && this.specular.isColor && (n.specular = this.specular.getHex()),
        this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity),
        this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()),
        this.shininess !== void 0 && (n.shininess = this.shininess),
        this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat),
        this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness),
        this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
        this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
        this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid,
        n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()),
        this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid),
        this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid),
        this.dispersion !== void 0 && (n.dispersion = this.dispersion),
        this.iridescence !== void 0 && (n.iridescence = this.iridescence),
        this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR),
        this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange),
        this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid),
        this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid),
        this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy),
        this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation),
        this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid),
        this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid),
        this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid),
        this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid),
        this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid,
        n.lightMapIntensity = this.lightMapIntensity),
        this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid,
        n.aoMapIntensity = this.aoMapIntensity),
        this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid,
        n.bumpScale = this.bumpScale),
        this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid,
        n.normalMapType = this.normalMapType,
        n.normalScale = this.normalScale.toArray()),
        this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid,
        n.displacementScale = this.displacementScale,
        n.displacementBias = this.displacementBias),
        this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid),
        this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid),
        this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid),
        this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid),
        this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
        this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid),
        this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid,
        this.combine !== void 0 && (n.combine = this.combine)),
        this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()),
        this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity),
        this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity),
        this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio),
        this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid),
        this.transmission !== void 0 && (n.transmission = this.transmission),
        this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid),
        this.thickness !== void 0 && (n.thickness = this.thickness),
        this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid),
        this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance),
        this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()),
        this.size !== void 0 && (n.size = this.size),
        this.shadowSide !== null && (n.shadowSide = this.shadowSide),
        this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation),
        this.blending !== Di && (n.blending = this.blending),
        this.side !== jn && (n.side = this.side),
        this.vertexColors === !0 && (n.vertexColors = !0),
        this.opacity < 1 && (n.opacity = this.opacity),
        this.transparent === !0 && (n.transparent = !0),
        this.blendSrc !== Us && (n.blendSrc = this.blendSrc),
        this.blendDst !== Ns && (n.blendDst = this.blendDst),
        this.blendEquation !== ai && (n.blendEquation = this.blendEquation),
        this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha),
        this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha),
        this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha),
        this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()),
        this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha),
        this.depthFunc !== Ui && (n.depthFunc = this.depthFunc),
        this.depthTest === !1 && (n.depthTest = this.depthTest),
        this.depthWrite === !1 && (n.depthWrite = this.depthWrite),
        this.colorWrite === !1 && (n.colorWrite = this.colorWrite),
        this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask),
        this.stencilFunc !== so && (n.stencilFunc = this.stencilFunc),
        this.stencilRef !== 0 && (n.stencilRef = this.stencilRef),
        this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask),
        this.stencilFail !== fi && (n.stencilFail = this.stencilFail),
        this.stencilZFail !== fi && (n.stencilZFail = this.stencilZFail),
        this.stencilZPass !== fi && (n.stencilZPass = this.stencilZPass),
        this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite),
        this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation),
        this.polygonOffset === !0 && (n.polygonOffset = !0),
        this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor),
        this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits),
        this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth),
        this.dashSize !== void 0 && (n.dashSize = this.dashSize),
        this.gapSize !== void 0 && (n.gapSize = this.gapSize),
        this.scale !== void 0 && (n.scale = this.scale),
        this.dithering === !0 && (n.dithering = !0),
        this.alphaTest > 0 && (n.alphaTest = this.alphaTest),
        this.alphaHash === !0 && (n.alphaHash = !0),
        this.alphaToCoverage === !0 && (n.alphaToCoverage = !0),
        this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0),
        this.forceSinglePass === !0 && (n.forceSinglePass = !0),
        this.wireframe === !0 && (n.wireframe = !0),
        this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth),
        this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap),
        this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin),
        this.flatShading === !0 && (n.flatShading = !0),
        this.visible === !1 && (n.visible = !1),
        this.toneMapped === !1 && (n.toneMapped = !1),
        this.fog === !1 && (n.fog = !1),
        Object.keys(this.userData).length > 0 && (n.userData = this.userData);
        function r(s) {
            const a = [];
            for (const o in s) {
                const l = s[o];
                delete l.metadata,
                a.push(l)
            }
            return a
        }
        if (t) {
            const s = r(e.textures)
              , a = r(e.images);
            s.length > 0 && (n.textures = s),
            a.length > 0 && (n.images = a)
        }
        return n
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        this.name = e.name,
        this.blending = e.blending,
        this.side = e.side,
        this.vertexColors = e.vertexColors,
        this.opacity = e.opacity,
        this.transparent = e.transparent,
        this.blendSrc = e.blendSrc,
        this.blendDst = e.blendDst,
        this.blendEquation = e.blendEquation,
        this.blendSrcAlpha = e.blendSrcAlpha,
        this.blendDstAlpha = e.blendDstAlpha,
        this.blendEquationAlpha = e.blendEquationAlpha,
        this.blendColor.copy(e.blendColor),
        this.blendAlpha = e.blendAlpha,
        this.depthFunc = e.depthFunc,
        this.depthTest = e.depthTest,
        this.depthWrite = e.depthWrite,
        this.stencilWriteMask = e.stencilWriteMask,
        this.stencilFunc = e.stencilFunc,
        this.stencilRef = e.stencilRef,
        this.stencilFuncMask = e.stencilFuncMask,
        this.stencilFail = e.stencilFail,
        this.stencilZFail = e.stencilZFail,
        this.stencilZPass = e.stencilZPass,
        this.stencilWrite = e.stencilWrite;
        const t = e.clippingPlanes;
        let n = null;
        if (t !== null) {
            const r = t.length;
            n = new Array(r);
            for (let s = 0; s !== r; ++s)
                n[s] = t[s].clone()
        }
        return this.clippingPlanes = n,
        this.clipIntersection = e.clipIntersection,
        this.clipShadows = e.clipShadows,
        this.shadowSide = e.shadowSide,
        this.colorWrite = e.colorWrite,
        this.precision = e.precision,
        this.polygonOffset = e.polygonOffset,
        this.polygonOffsetFactor = e.polygonOffsetFactor,
        this.polygonOffsetUnits = e.polygonOffsetUnits,
        this.dithering = e.dithering,
        this.alphaTest = e.alphaTest,
        this.alphaHash = e.alphaHash,
        this.alphaToCoverage = e.alphaToCoverage,
        this.premultipliedAlpha = e.premultipliedAlpha,
        this.forceSinglePass = e.forceSinglePass,
        this.visible = e.visible,
        this.toneMapped = e.toneMapped,
        this.userData = JSON.parse(JSON.stringify(e.userData)),
        this
    }
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
    set needsUpdate(e) {
        e === !0 && this.version++
    }
}
class rr extends Hi {
    constructor(e) {
        super(),
        this.isMeshBasicMaterial = !0,
        this.type = "MeshBasicMaterial",
        this.color = new et(16777215),
        this.map = null,
        this.lightMap = null,
        this.lightMapIntensity = 1,
        this.aoMap = null,
        this.aoMapIntensity = 1,
        this.specularMap = null,
        this.alphaMap = null,
        this.envMap = null,
        this.envMapRotation = new En,
        this.combine = _c,
        this.reflectivity = 1,
        this.refractionRatio = .98,
        this.wireframe = !1,
        this.wireframeLinewidth = 1,
        this.wireframeLinecap = "round",
        this.wireframeLinejoin = "round",
        this.fog = !0,
        this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.color.copy(e.color),
        this.map = e.map,
        this.lightMap = e.lightMap,
        this.lightMapIntensity = e.lightMapIntensity,
        this.aoMap = e.aoMap,
        this.aoMapIntensity = e.aoMapIntensity,
        this.specularMap = e.specularMap,
        this.alphaMap = e.alphaMap,
        this.envMap = e.envMap,
        this.envMapRotation.copy(e.envMapRotation),
        this.combine = e.combine,
        this.reflectivity = e.reflectivity,
        this.refractionRatio = e.refractionRatio,
        this.wireframe = e.wireframe,
        this.wireframeLinewidth = e.wireframeLinewidth,
        this.wireframeLinecap = e.wireframeLinecap,
        this.wireframeLinejoin = e.wireframeLinejoin,
        this.fog = e.fog,
        this
    }
}
const Tt = new O
  , Er = new Ze;
let Iu = 0;
class un {
    constructor(e, t, n=!1) {
        if (Array.isArray(e))
            throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
        this.isBufferAttribute = !0,
        Object.defineProperty(this, "id", {
            value: Iu++
        }),
        this.name = "",
        this.array = e,
        this.itemSize = t,
        this.count = e !== void 0 ? e.length / t : 0,
        this.normalized = n,
        this.usage = ao,
        this.updateRanges = [],
        this.gpuType = bn,
        this.version = 0
    }
    onUploadCallback() {}
    set needsUpdate(e) {
        e === !0 && this.version++
    }
    setUsage(e) {
        return this.usage = e,
        this
    }
    addUpdateRange(e, t) {
        this.updateRanges.push({
            start: e,
            count: t
        })
    }
    clearUpdateRanges() {
        this.updateRanges.length = 0
    }
    copy(e) {
        return this.name = e.name,
        this.array = new e.array.constructor(e.array),
        this.itemSize = e.itemSize,
        this.count = e.count,
        this.normalized = e.normalized,
        this.usage = e.usage,
        this.gpuType = e.gpuType,
        this
    }
    copyAt(e, t, n) {
        e *= this.itemSize,
        n *= t.itemSize;
        for (let r = 0, s = this.itemSize; r < s; r++)
            this.array[e + r] = t.array[n + r];
        return this
    }
    copyArray(e) {
        return this.array.set(e),
        this
    }
    applyMatrix3(e) {
        if (this.itemSize === 2)
            for (let t = 0, n = this.count; t < n; t++)
                Er.fromBufferAttribute(this, t),
                Er.applyMatrix3(e),
                this.setXY(t, Er.x, Er.y);
        else if (this.itemSize === 3)
            for (let t = 0, n = this.count; t < n; t++)
                Tt.fromBufferAttribute(this, t),
                Tt.applyMatrix3(e),
                this.setXYZ(t, Tt.x, Tt.y, Tt.z);
        return this
    }
    applyMatrix4(e) {
        for (let t = 0, n = this.count; t < n; t++)
            Tt.fromBufferAttribute(this, t),
            Tt.applyMatrix4(e),
            this.setXYZ(t, Tt.x, Tt.y, Tt.z);
        return this
    }
    applyNormalMatrix(e) {
        for (let t = 0, n = this.count; t < n; t++)
            Tt.fromBufferAttribute(this, t),
            Tt.applyNormalMatrix(e),
            this.setXYZ(t, Tt.x, Tt.y, Tt.z);
        return this
    }
    transformDirection(e) {
        for (let t = 0, n = this.count; t < n; t++)
            Tt.fromBufferAttribute(this, t),
            Tt.transformDirection(e),
            this.setXYZ(t, Tt.x, Tt.y, Tt.z);
        return this
    }
    set(e, t=0) {
        return this.array.set(e, t),
        this
    }
    getComponent(e, t) {
        let n = this.array[e * this.itemSize + t];
        return this.normalized && (n = Pi(n, this.array)),
        n
    }
    setComponent(e, t, n) {
        return this.normalized && (n = Gt(n, this.array)),
        this.array[e * this.itemSize + t] = n,
        this
    }
    getX(e) {
        let t = this.array[e * this.itemSize];
        return this.normalized && (t = Pi(t, this.array)),
        t
    }
    setX(e, t) {
        return this.normalized && (t = Gt(t, this.array)),
        this.array[e * this.itemSize] = t,
        this
    }
    getY(e) {
        let t = this.array[e * this.itemSize + 1];
        return this.normalized && (t = Pi(t, this.array)),
        t
    }
    setY(e, t) {
        return this.normalized && (t = Gt(t, this.array)),
        this.array[e * this.itemSize + 1] = t,
        this
    }
    getZ(e) {
        let t = this.array[e * this.itemSize + 2];
        return this.normalized && (t = Pi(t, this.array)),
        t
    }
    setZ(e, t) {
        return this.normalized && (t = Gt(t, this.array)),
        this.array[e * this.itemSize + 2] = t,
        this
    }
    getW(e) {
        let t = this.array[e * this.itemSize + 3];
        return this.normalized && (t = Pi(t, this.array)),
        t
    }
    setW(e, t) {
        return this.normalized && (t = Gt(t, this.array)),
        this.array[e * this.itemSize + 3] = t,
        this
    }
    setXY(e, t, n) {
        return e *= this.itemSize,
        this.normalized && (t = Gt(t, this.array),
        n = Gt(n, this.array)),
        this.array[e + 0] = t,
        this.array[e + 1] = n,
        this
    }
    setXYZ(e, t, n, r) {
        return e *= this.itemSize,
        this.normalized && (t = Gt(t, this.array),
        n = Gt(n, this.array),
        r = Gt(r, this.array)),
        this.array[e + 0] = t,
        this.array[e + 1] = n,
        this.array[e + 2] = r,
        this
    }
    setXYZW(e, t, n, r, s) {
        return e *= this.itemSize,
        this.normalized && (t = Gt(t, this.array),
        n = Gt(n, this.array),
        r = Gt(r, this.array),
        s = Gt(s, this.array)),
        this.array[e + 0] = t,
        this.array[e + 1] = n,
        this.array[e + 2] = r,
        this.array[e + 3] = s,
        this
    }
    onUpload(e) {
        return this.onUploadCallback = e,
        this
    }
    clone() {
        return new this.constructor(this.array,this.itemSize).copy(this)
    }
    toJSON() {
        const e = {
            itemSize: this.itemSize,
            type: this.array.constructor.name,
            array: Array.from(this.array),
            normalized: this.normalized
        };
        return this.name !== "" && (e.name = this.name),
        this.usage !== ao && (e.usage = this.usage),
        e
    }
}
class Dc extends un {
    constructor(e, t, n) {
        super(new Uint16Array(e), t, n)
    }
}
class Ic extends un {
    constructor(e, t, n) {
        super(new Uint32Array(e), t, n)
    }
}
class yt extends un {
    constructor(e, t, n) {
        super(new Float32Array(e), t, n)
    }
}
let Uu = 0;
const rn = new ct
  , bs = new It
  , yi = new O
  , Qt = new Zn
  , Ki = new Zn
  , Lt = new O;
class Xt extends Vi {
    constructor() {
        super(),
        this.isBufferGeometry = !0,
        Object.defineProperty(this, "id", {
            value: Uu++
        }),
        this.uuid = ki(),
        this.name = "",
        this.type = "BufferGeometry",
        this.index = null,
        this.indirect = null,
        this.attributes = {},
        this.morphAttributes = {},
        this.morphTargetsRelative = !1,
        this.groups = [],
        this.boundingBox = null,
        this.boundingSphere = null,
        this.drawRange = {
            start: 0,
            count: 1 / 0
        },
        this.userData = {}
    }
    getIndex() {
        return this.index
    }
    setIndex(e) {
        return Array.isArray(e) ? this.index = new (Rc(e) ? Ic : Dc)(e,1) : this.index = e,
        this
    }
    setIndirect(e) {
        return this.indirect = e,
        this
    }
    getIndirect() {
        return this.indirect
    }
    getAttribute(e) {
        return this.attributes[e]
    }
    setAttribute(e, t) {
        return this.attributes[e] = t,
        this
    }
    deleteAttribute(e) {
        return delete this.attributes[e],
        this
    }
    hasAttribute(e) {
        return this.attributes[e] !== void 0
    }
    addGroup(e, t, n=0) {
        this.groups.push({
            start: e,
            count: t,
            materialIndex: n
        })
    }
    clearGroups() {
        this.groups = []
    }
    setDrawRange(e, t) {
        this.drawRange.start = e,
        this.drawRange.count = t
    }
    applyMatrix4(e) {
        const t = this.attributes.position;
        t !== void 0 && (t.applyMatrix4(e),
        t.needsUpdate = !0);
        const n = this.attributes.normal;
        if (n !== void 0) {
            const s = new $e().getNormalMatrix(e);
            n.applyNormalMatrix(s),
            n.needsUpdate = !0
        }
        const r = this.attributes.tangent;
        return r !== void 0 && (r.transformDirection(e),
        r.needsUpdate = !0),
        this.boundingBox !== null && this.computeBoundingBox(),
        this.boundingSphere !== null && this.computeBoundingSphere(),
        this
    }
    applyQuaternion(e) {
        return rn.makeRotationFromQuaternion(e),
        this.applyMatrix4(rn),
        this
    }
    rotateX(e) {
        return rn.makeRotationX(e),
        this.applyMatrix4(rn),
        this
    }
    rotateY(e) {
        return rn.makeRotationY(e),
        this.applyMatrix4(rn),
        this
    }
    rotateZ(e) {
        return rn.makeRotationZ(e),
        this.applyMatrix4(rn),
        this
    }
    translate(e, t, n) {
        return rn.makeTranslation(e, t, n),
        this.applyMatrix4(rn),
        this
    }
    scale(e, t, n) {
        return rn.makeScale(e, t, n),
        this.applyMatrix4(rn),
        this
    }
    lookAt(e) {
        return bs.lookAt(e),
        bs.updateMatrix(),
        this.applyMatrix4(bs.matrix),
        this
    }
    center() {
        return this.computeBoundingBox(),
        this.boundingBox.getCenter(yi).negate(),
        this.translate(yi.x, yi.y, yi.z),
        this
    }
    setFromPoints(e) {
        const t = this.getAttribute("position");
        if (t === void 0) {
            const n = [];
            for (let r = 0, s = e.length; r < s; r++) {
                const a = e[r];
                n.push(a.x, a.y, a.z || 0)
            }
            this.setAttribute("position", new yt(n,3))
        } else {
            const n = Math.min(e.length, t.count);
            for (let r = 0; r < n; r++) {
                const s = e[r];
                t.setXYZ(r, s.x, s.y, s.z || 0)
            }
            e.length > t.count && Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),
            t.needsUpdate = !0
        }
        return this
    }
    computeBoundingBox() {
        this.boundingBox === null && (this.boundingBox = new Zn);
        const e = this.attributes.position
          , t = this.morphAttributes.position;
        if (e && e.isGLBufferAttribute) {
            bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this),
            this.boundingBox.set(new O(-1 / 0,-1 / 0,-1 / 0), new O(1 / 0,1 / 0,1 / 0));
            return
        }
        if (e !== void 0) {
            if (this.boundingBox.setFromBufferAttribute(e),
            t)
                for (let n = 0, r = t.length; n < r; n++) {
                    const s = t[n];
                    Qt.setFromBufferAttribute(s),
                    this.morphTargetsRelative ? (Lt.addVectors(this.boundingBox.min, Qt.min),
                    this.boundingBox.expandByPoint(Lt),
                    Lt.addVectors(this.boundingBox.max, Qt.max),
                    this.boundingBox.expandByPoint(Lt)) : (this.boundingBox.expandByPoint(Qt.min),
                    this.boundingBox.expandByPoint(Qt.max))
                }
        } else
            this.boundingBox.makeEmpty();
        (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
    }
    computeBoundingSphere() {
        this.boundingSphere === null && (this.boundingSphere = new Gi);
        const e = this.attributes.position
          , t = this.morphAttributes.position;
        if (e && e.isGLBufferAttribute) {
            bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this),
            this.boundingSphere.set(new O, 1 / 0);
            return
        }
        if (e) {
            const n = this.boundingSphere.center;
            if (Qt.setFromBufferAttribute(e),
            t)
                for (let s = 0, a = t.length; s < a; s++) {
                    const o = t[s];
                    Ki.setFromBufferAttribute(o),
                    this.morphTargetsRelative ? (Lt.addVectors(Qt.min, Ki.min),
                    Qt.expandByPoint(Lt),
                    Lt.addVectors(Qt.max, Ki.max),
                    Qt.expandByPoint(Lt)) : (Qt.expandByPoint(Ki.min),
                    Qt.expandByPoint(Ki.max))
                }
            Qt.getCenter(n);
            let r = 0;
            for (let s = 0, a = e.count; s < a; s++)
                Lt.fromBufferAttribute(e, s),
                r = Math.max(r, n.distanceToSquared(Lt));
            if (t)
                for (let s = 0, a = t.length; s < a; s++) {
                    const o = t[s]
                      , l = this.morphTargetsRelative;
                    for (let c = 0, h = o.count; c < h; c++)
                        Lt.fromBufferAttribute(o, c),
                        l && (yi.fromBufferAttribute(e, c),
                        Lt.add(yi)),
                        r = Math.max(r, n.distanceToSquared(Lt))
                }
            this.boundingSphere.radius = Math.sqrt(r),
            isNaN(this.boundingSphere.radius) && bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
        }
    }
    computeTangents() {
        const e = this.index
          , t = this.attributes;
        if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
            bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
            return
        }
        const n = t.position
          , r = t.normal
          , s = t.uv;
        this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new un(new Float32Array(4 * n.count),4));
        const a = this.getAttribute("tangent")
          , o = []
          , l = [];
        for (let F = 0; F < n.count; F++)
            o[F] = new O,
            l[F] = new O;
        const c = new O
          , h = new O
          , d = new O
          , p = new Ze
          , m = new Ze
          , g = new Ze
          , _ = new O
          , f = new O;
        function u(F, S, M) {
            c.fromBufferAttribute(n, F),
            h.fromBufferAttribute(n, S),
            d.fromBufferAttribute(n, M),
            p.fromBufferAttribute(s, F),
            m.fromBufferAttribute(s, S),
            g.fromBufferAttribute(s, M),
            h.sub(c),
            d.sub(c),
            m.sub(p),
            g.sub(p);
            const U = 1 / (m.x * g.y - g.x * m.y);
            isFinite(U) && (_.copy(h).multiplyScalar(g.y).addScaledVector(d, -m.y).multiplyScalar(U),
            f.copy(d).multiplyScalar(m.x).addScaledVector(h, -g.x).multiplyScalar(U),
            o[F].add(_),
            o[S].add(_),
            o[M].add(_),
            l[F].add(f),
            l[S].add(f),
            l[M].add(f))
        }
        let b = this.groups;
        b.length === 0 && (b = [{
            start: 0,
            count: e.count
        }]);
        for (let F = 0, S = b.length; F < S; ++F) {
            const M = b[F]
              , U = M.start
              , B = M.count;
            for (let k = U, D = U + B; k < D; k += 3)
                u(e.getX(k + 0), e.getX(k + 1), e.getX(k + 2))
        }
        const v = new O
          , T = new O
          , C = new O
          , E = new O;
        function R(F) {
            C.fromBufferAttribute(r, F),
            E.copy(C);
            const S = o[F];
            v.copy(S),
            v.sub(C.multiplyScalar(C.dot(S))).normalize(),
            T.crossVectors(E, S);
            const U = T.dot(l[F]) < 0 ? -1 : 1;
            a.setXYZW(F, v.x, v.y, v.z, U)
        }
        for (let F = 0, S = b.length; F < S; ++F) {
            const M = b[F]
              , U = M.start
              , B = M.count;
            for (let k = U, D = U + B; k < D; k += 3)
                R(e.getX(k + 0)),
                R(e.getX(k + 1)),
                R(e.getX(k + 2))
        }
    }
    computeVertexNormals() {
        const e = this.index
          , t = this.getAttribute("position");
        if (t !== void 0) {
            let n = this.getAttribute("normal");
            if (n === void 0)
                n = new un(new Float32Array(t.count * 3),3),
                this.setAttribute("normal", n);
            else
                for (let p = 0, m = n.count; p < m; p++)
                    n.setXYZ(p, 0, 0, 0);
            const r = new O
              , s = new O
              , a = new O
              , o = new O
              , l = new O
              , c = new O
              , h = new O
              , d = new O;
            if (e)
                for (let p = 0, m = e.count; p < m; p += 3) {
                    const g = e.getX(p + 0)
                      , _ = e.getX(p + 1)
                      , f = e.getX(p + 2);
                    r.fromBufferAttribute(t, g),
                    s.fromBufferAttribute(t, _),
                    a.fromBufferAttribute(t, f),
                    h.subVectors(a, s),
                    d.subVectors(r, s),
                    h.cross(d),
                    o.fromBufferAttribute(n, g),
                    l.fromBufferAttribute(n, _),
                    c.fromBufferAttribute(n, f),
                    o.add(h),
                    l.add(h),
                    c.add(h),
                    n.setXYZ(g, o.x, o.y, o.z),
                    n.setXYZ(_, l.x, l.y, l.z),
                    n.setXYZ(f, c.x, c.y, c.z)
                }
            else
                for (let p = 0, m = t.count; p < m; p += 3)
                    r.fromBufferAttribute(t, p + 0),
                    s.fromBufferAttribute(t, p + 1),
                    a.fromBufferAttribute(t, p + 2),
                    h.subVectors(a, s),
                    d.subVectors(r, s),
                    h.cross(d),
                    n.setXYZ(p + 0, h.x, h.y, h.z),
                    n.setXYZ(p + 1, h.x, h.y, h.z),
                    n.setXYZ(p + 2, h.x, h.y, h.z);
            this.normalizeNormals(),
            n.needsUpdate = !0
        }
    }
    normalizeNormals() {
        const e = this.attributes.normal;
        for (let t = 0, n = e.count; t < n; t++)
            Lt.fromBufferAttribute(e, t),
            Lt.normalize(),
            e.setXYZ(t, Lt.x, Lt.y, Lt.z)
    }
    toNonIndexed() {
        function e(o, l) {
            const c = o.array
              , h = o.itemSize
              , d = o.normalized
              , p = new c.constructor(l.length * h);
            let m = 0
              , g = 0;
            for (let _ = 0, f = l.length; _ < f; _++) {
                o.isInterleavedBufferAttribute ? m = l[_] * o.data.stride + o.offset : m = l[_] * h;
                for (let u = 0; u < h; u++)
                    p[g++] = c[m++]
            }
            return new un(p,h,d)
        }
        if (this.index === null)
            return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),
            this;
        const t = new Xt
          , n = this.index.array
          , r = this.attributes;
        for (const o in r) {
            const l = r[o]
              , c = e(l, n);
            t.setAttribute(o, c)
        }
        const s = this.morphAttributes;
        for (const o in s) {
            const l = []
              , c = s[o];
            for (let h = 0, d = c.length; h < d; h++) {
                const p = c[h]
                  , m = e(p, n);
                l.push(m)
            }
            t.morphAttributes[o] = l
        }
        t.morphTargetsRelative = this.morphTargetsRelative;
        const a = this.groups;
        for (let o = 0, l = a.length; o < l; o++) {
            const c = a[o];
            t.addGroup(c.start, c.count, c.materialIndex)
        }
        return t
    }
    toJSON() {
        const e = {
            metadata: {
                version: 4.7,
                type: "BufferGeometry",
                generator: "BufferGeometry.toJSON"
            }
        };
        if (e.uuid = this.uuid,
        e.type = this.type,
        this.name !== "" && (e.name = this.name),
        Object.keys(this.userData).length > 0 && (e.userData = this.userData),
        this.parameters !== void 0) {
            const l = this.parameters;
            for (const c in l)
                l[c] !== void 0 && (e[c] = l[c]);
            return e
        }
        e.data = {
            attributes: {}
        };
        const t = this.index;
        t !== null && (e.data.index = {
            type: t.array.constructor.name,
            array: Array.prototype.slice.call(t.array)
        });
        const n = this.attributes;
        for (const l in n) {
            const c = n[l];
            e.data.attributes[l] = c.toJSON(e.data)
        }
        const r = {};
        let s = !1;
        for (const l in this.morphAttributes) {
            const c = this.morphAttributes[l]
              , h = [];
            for (let d = 0, p = c.length; d < p; d++) {
                const m = c[d];
                h.push(m.toJSON(e.data))
            }
            h.length > 0 && (r[l] = h,
            s = !0)
        }
        s && (e.data.morphAttributes = r,
        e.data.morphTargetsRelative = this.morphTargetsRelative);
        const a = this.groups;
        a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
        const o = this.boundingSphere;
        return o !== null && (e.data.boundingSphere = o.toJSON()),
        e
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        this.index = null,
        this.attributes = {},
        this.morphAttributes = {},
        this.groups = [],
        this.boundingBox = null,
        this.boundingSphere = null;
        const t = {};
        this.name = e.name;
        const n = e.index;
        n !== null && this.setIndex(n.clone());
        const r = e.attributes;
        for (const c in r) {
            const h = r[c];
            this.setAttribute(c, h.clone(t))
        }
        const s = e.morphAttributes;
        for (const c in s) {
            const h = []
              , d = s[c];
            for (let p = 0, m = d.length; p < m; p++)
                h.push(d[p].clone(t));
            this.morphAttributes[c] = h
        }
        this.morphTargetsRelative = e.morphTargetsRelative;
        const a = e.groups;
        for (let c = 0, h = a.length; c < h; c++) {
            const d = a[c];
            this.addGroup(d.start, d.count, d.materialIndex)
        }
        const o = e.boundingBox;
        o !== null && (this.boundingBox = o.clone());
        const l = e.boundingSphere;
        return l !== null && (this.boundingSphere = l.clone()),
        this.drawRange.start = e.drawRange.start,
        this.drawRange.count = e.drawRange.count,
        this.userData = e.userData,
        this
    }
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}
const yo = new ct
  , ti = new Va
  , Tr = new Gi
  , Eo = new O
  , Ar = new O
  , wr = new O
  , Cr = new O
  , Ss = new O
  , Rr = new O
  , To = new O
  , Pr = new O;
class tn extends It {
    constructor(e=new Xt, t=new rr) {
        super(),
        this.isMesh = !0,
        this.type = "Mesh",
        this.geometry = e,
        this.material = t,
        this.morphTargetDictionary = void 0,
        this.morphTargetInfluences = void 0,
        this.count = 1,
        this.updateMorphTargets()
    }
    copy(e, t) {
        return super.copy(e, t),
        e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
        e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)),
        this.material = Array.isArray(e.material) ? e.material.slice() : e.material,
        this.geometry = e.geometry,
        this
    }
    updateMorphTargets() {
        const t = this.geometry.morphAttributes
          , n = Object.keys(t);
        if (n.length > 0) {
            const r = t[n[0]];
            if (r !== void 0) {
                this.morphTargetInfluences = [],
                this.morphTargetDictionary = {};
                for (let s = 0, a = r.length; s < a; s++) {
                    const o = r[s].name || String(s);
                    this.morphTargetInfluences.push(0),
                    this.morphTargetDictionary[o] = s
                }
            }
        }
    }
    getVertexPosition(e, t) {
        const n = this.geometry
          , r = n.attributes.position
          , s = n.morphAttributes.position
          , a = n.morphTargetsRelative;
        t.fromBufferAttribute(r, e);
        const o = this.morphTargetInfluences;
        if (s && o) {
            Rr.set(0, 0, 0);
            for (let l = 0, c = s.length; l < c; l++) {
                const h = o[l]
                  , d = s[l];
                h !== 0 && (Ss.fromBufferAttribute(d, e),
                a ? Rr.addScaledVector(Ss, h) : Rr.addScaledVector(Ss.sub(t), h))
            }
            t.add(Rr)
        }
        return t
    }
    raycast(e, t) {
        const n = this.geometry
          , r = this.material
          , s = this.matrixWorld;
        r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(),
        Tr.copy(n.boundingSphere),
        Tr.applyMatrix4(s),
        ti.copy(e.ray).recast(e.near),
        !(Tr.containsPoint(ti.origin) === !1 && (ti.intersectSphere(Tr, Eo) === null || ti.origin.distanceToSquared(Eo) > (e.far - e.near) ** 2)) && (yo.copy(s).invert(),
        ti.copy(e.ray).applyMatrix4(yo),
        !(n.boundingBox !== null && ti.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, ti)))
    }
    _computeIntersections(e, t, n) {
        let r;
        const s = this.geometry
          , a = this.material
          , o = s.index
          , l = s.attributes.position
          , c = s.attributes.uv
          , h = s.attributes.uv1
          , d = s.attributes.normal
          , p = s.groups
          , m = s.drawRange;
        if (o !== null)
            if (Array.isArray(a))
                for (let g = 0, _ = p.length; g < _; g++) {
                    const f = p[g]
                      , u = a[f.materialIndex]
                      , b = Math.max(f.start, m.start)
                      , v = Math.min(o.count, Math.min(f.start + f.count, m.start + m.count));
                    for (let T = b, C = v; T < C; T += 3) {
                        const E = o.getX(T)
                          , R = o.getX(T + 1)
                          , F = o.getX(T + 2);
                        r = Lr(this, u, e, n, c, h, d, E, R, F),
                        r && (r.faceIndex = Math.floor(T / 3),
                        r.face.materialIndex = f.materialIndex,
                        t.push(r))
                    }
                }
            else {
                const g = Math.max(0, m.start)
                  , _ = Math.min(o.count, m.start + m.count);
                for (let f = g, u = _; f < u; f += 3) {
                    const b = o.getX(f)
                      , v = o.getX(f + 1)
                      , T = o.getX(f + 2);
                    r = Lr(this, a, e, n, c, h, d, b, v, T),
                    r && (r.faceIndex = Math.floor(f / 3),
                    t.push(r))
                }
            }
        else if (l !== void 0)
            if (Array.isArray(a))
                for (let g = 0, _ = p.length; g < _; g++) {
                    const f = p[g]
                      , u = a[f.materialIndex]
                      , b = Math.max(f.start, m.start)
                      , v = Math.min(l.count, Math.min(f.start + f.count, m.start + m.count));
                    for (let T = b, C = v; T < C; T += 3) {
                        const E = T
                          , R = T + 1
                          , F = T + 2;
                        r = Lr(this, u, e, n, c, h, d, E, R, F),
                        r && (r.faceIndex = Math.floor(T / 3),
                        r.face.materialIndex = f.materialIndex,
                        t.push(r))
                    }
                }
            else {
                const g = Math.max(0, m.start)
                  , _ = Math.min(l.count, m.start + m.count);
                for (let f = g, u = _; f < u; f += 3) {
                    const b = f
                      , v = f + 1
                      , T = f + 2;
                    r = Lr(this, a, e, n, c, h, d, b, v, T),
                    r && (r.faceIndex = Math.floor(f / 3),
                    t.push(r))
                }
            }
    }
}
function Nu(i, e, t, n, r, s, a, o) {
    let l;
    if (e.side === $t ? l = n.intersectTriangle(a, s, r, !0, o) : l = n.intersectTriangle(r, s, a, e.side === jn, o),
    l === null)
        return null;
    Pr.copy(o),
    Pr.applyMatrix4(i.matrixWorld);
    const c = t.ray.origin.distanceTo(Pr);
    return c < t.near || c > t.far ? null : {
        distance: c,
        point: Pr.clone(),
        object: i
    }
}
function Lr(i, e, t, n, r, s, a, o, l, c) {
    i.getVertexPosition(o, Ar),
    i.getVertexPosition(l, wr),
    i.getVertexPosition(c, Cr);
    const h = Nu(i, e, t, n, Ar, wr, Cr, To);
    if (h) {
        const d = new O;
        gn.getBarycoord(To, Ar, wr, Cr, d),
        r && (h.uv = gn.getInterpolatedAttribute(r, o, l, c, d, new Ze)),
        s && (h.uv1 = gn.getInterpolatedAttribute(s, o, l, c, d, new Ze)),
        a && (h.normal = gn.getInterpolatedAttribute(a, o, l, c, d, new O),
        h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
        const p = {
            a: o,
            b: l,
            c,
            normal: new O,
            materialIndex: 0
        };
        gn.getNormal(Ar, wr, Cr, p.normal),
        h.face = p,
        h.barycoord = d
    }
    return h
}
class Wi extends Xt {
    constructor(e=1, t=1, n=1, r=1, s=1, a=1) {
        super(),
        this.type = "BoxGeometry",
        this.parameters = {
            width: e,
            height: t,
            depth: n,
            widthSegments: r,
            heightSegments: s,
            depthSegments: a
        };
        const o = this;
        r = Math.floor(r),
        s = Math.floor(s),
        a = Math.floor(a);
        const l = []
          , c = []
          , h = []
          , d = [];
        let p = 0
          , m = 0;
        g("z", "y", "x", -1, -1, n, t, e, a, s, 0),
        g("z", "y", "x", 1, -1, n, t, -e, a, s, 1),
        g("x", "z", "y", 1, 1, e, n, t, r, a, 2),
        g("x", "z", "y", 1, -1, e, n, -t, r, a, 3),
        g("x", "y", "z", 1, -1, e, t, n, r, s, 4),
        g("x", "y", "z", -1, -1, e, t, -n, r, s, 5),
        this.setIndex(l),
        this.setAttribute("position", new yt(c,3)),
        this.setAttribute("normal", new yt(h,3)),
        this.setAttribute("uv", new yt(d,2));
        function g(_, f, u, b, v, T, C, E, R, F, S) {
            const M = T / R
              , U = C / F
              , B = T / 2
              , k = C / 2
              , D = E / 2
              , G = R + 1
              , Y = F + 1;
            let te = 0
              , L = 0;
            const le = new O;
            for (let fe = 0; fe < Y; fe++) {
                const Se = fe * U - k;
                for (let pe = 0; pe < G; pe++) {
                    const Xe = pe * M - B;
                    le[_] = Xe * b,
                    le[f] = Se * v,
                    le[u] = D,
                    c.push(le.x, le.y, le.z),
                    le[_] = 0,
                    le[f] = 0,
                    le[u] = E > 0 ? 1 : -1,
                    h.push(le.x, le.y, le.z),
                    d.push(pe / R),
                    d.push(1 - fe / F),
                    te += 1
                }
            }
            for (let fe = 0; fe < F; fe++)
                for (let Se = 0; Se < R; Se++) {
                    const pe = p + Se + G * fe
                      , Xe = p + Se + G * (fe + 1)
                      , it = p + (Se + 1) + G * (fe + 1)
                      , Je = p + (Se + 1) + G * fe;
                    l.push(pe, Xe, Je),
                    l.push(Xe, it, Je),
                    L += 6
                }
            o.addGroup(m, L, S),
            m += L,
            p += te
        }
    }
    copy(e) {
        return super.copy(e),
        this.parameters = Object.assign({}, e.parameters),
        this
    }
    static fromJSON(e) {
        return new Wi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)
    }
}
function Bi(i) {
    const e = {};
    for (const t in i) {
        e[t] = {};
        for (const n in i[t]) {
            const r = i[t][n];
            r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),
            e[t][n] = null) : e[t][n] = r.clone() : Array.isArray(r) ? e[t][n] = r.slice() : e[t][n] = r
        }
    }
    return e
}
function Ht(i) {
    const e = {};
    for (let t = 0; t < i.length; t++) {
        const n = Bi(i[t]);
        for (const r in n)
            e[r] = n[r]
    }
    return e
}
function Fu(i) {
    const e = [];
    for (let t = 0; t < i.length; t++)
        e.push(i[t].clone());
    return e
}
function Uc(i) {
    const e = i.getRenderTarget();
    return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : ot.workingColorSpace
}
const Ou = {
    clone: Bi,
    merge: Ht
};
var Bu = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`
  , zu = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Tn extends Hi {
    constructor(e) {
        super(),
        this.isShaderMaterial = !0,
        this.type = "ShaderMaterial",
        this.defines = {},
        this.uniforms = {},
        this.uniformsGroups = [],
        this.vertexShader = Bu,
        this.fragmentShader = zu,
        this.linewidth = 1,
        this.wireframe = !1,
        this.wireframeLinewidth = 1,
        this.fog = !1,
        this.lights = !1,
        this.clipping = !1,
        this.forceSinglePass = !0,
        this.extensions = {
            clipCullDistance: !1,
            multiDraw: !1
        },
        this.defaultAttributeValues = {
            color: [1, 1, 1],
            uv: [0, 0],
            uv1: [0, 0]
        },
        this.index0AttributeName = void 0,
        this.uniformsNeedUpdate = !1,
        this.glslVersion = null,
        e !== void 0 && this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.fragmentShader = e.fragmentShader,
        this.vertexShader = e.vertexShader,
        this.uniforms = Bi(e.uniforms),
        this.uniformsGroups = Fu(e.uniformsGroups),
        this.defines = Object.assign({}, e.defines),
        this.wireframe = e.wireframe,
        this.wireframeLinewidth = e.wireframeLinewidth,
        this.fog = e.fog,
        this.lights = e.lights,
        this.clipping = e.clipping,
        this.extensions = Object.assign({}, e.extensions),
        this.glslVersion = e.glslVersion,
        this
    }
    toJSON(e) {
        const t = super.toJSON(e);
        t.glslVersion = this.glslVersion,
        t.uniforms = {};
        for (const r in this.uniforms) {
            const a = this.uniforms[r].value;
            a && a.isTexture ? t.uniforms[r] = {
                type: "t",
                value: a.toJSON(e).uuid
            } : a && a.isColor ? t.uniforms[r] = {
                type: "c",
                value: a.getHex()
            } : a && a.isVector2 ? t.uniforms[r] = {
                type: "v2",
                value: a.toArray()
            } : a && a.isVector3 ? t.uniforms[r] = {
                type: "v3",
                value: a.toArray()
            } : a && a.isVector4 ? t.uniforms[r] = {
                type: "v4",
                value: a.toArray()
            } : a && a.isMatrix3 ? t.uniforms[r] = {
                type: "m3",
                value: a.toArray()
            } : a && a.isMatrix4 ? t.uniforms[r] = {
                type: "m4",
                value: a.toArray()
            } : t.uniforms[r] = {
                value: a
            }
        }
        Object.keys(this.defines).length > 0 && (t.defines = this.defines),
        t.vertexShader = this.vertexShader,
        t.fragmentShader = this.fragmentShader,
        t.lights = this.lights,
        t.clipping = this.clipping;
        const n = {};
        for (const r in this.extensions)
            this.extensions[r] === !0 && (n[r] = !0);
        return Object.keys(n).length > 0 && (t.extensions = n),
        t
    }
}
class Nc extends It {
    constructor() {
        super(),
        this.isCamera = !0,
        this.type = "Camera",
        this.matrixWorldInverse = new ct,
        this.projectionMatrix = new ct,
        this.projectionMatrixInverse = new ct,
        this.coordinateSystem = Sn,
        this._reversedDepth = !1
    }
    get reversedDepth() {
        return this._reversedDepth
    }
    copy(e, t) {
        return super.copy(e, t),
        this.matrixWorldInverse.copy(e.matrixWorldInverse),
        this.projectionMatrix.copy(e.projectionMatrix),
        this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
        this.coordinateSystem = e.coordinateSystem,
        this
    }
    getWorldDirection(e) {
        return super.getWorldDirection(e).negate()
    }
    updateMatrixWorld(e) {
        super.updateMatrixWorld(e),
        this.matrixWorldInverse.copy(this.matrixWorld).invert()
    }
    updateWorldMatrix(e, t) {
        super.updateWorldMatrix(e, t),
        this.matrixWorldInverse.copy(this.matrixWorld).invert()
    }
    clone() {
        return new this.constructor().copy(this)
    }
}
const Wn = new O
  , Ao = new Ze
  , wo = new Ze;
class cn extends Nc {
    constructor(e=50, t=1, n=.1, r=2e3) {
        super(),
        this.isPerspectiveCamera = !0,
        this.type = "PerspectiveCamera",
        this.fov = e,
        this.zoom = 1,
        this.near = n,
        this.far = r,
        this.focus = 10,
        this.aspect = t,
        this.view = null,
        this.filmGauge = 35,
        this.filmOffset = 0,
        this.updateProjectionMatrix()
    }
    copy(e, t) {
        return super.copy(e, t),
        this.fov = e.fov,
        this.zoom = e.zoom,
        this.near = e.near,
        this.far = e.far,
        this.focus = e.focus,
        this.aspect = e.aspect,
        this.view = e.view === null ? null : Object.assign({}, e.view),
        this.filmGauge = e.filmGauge,
        this.filmOffset = e.filmOffset,
        this
    }
    setFocalLength(e) {
        const t = .5 * this.getFilmHeight() / e;
        this.fov = dr * 2 * Math.atan(t),
        this.updateProjectionMatrix()
    }
    getFocalLength() {
        const e = Math.tan(nr * .5 * this.fov);
        return .5 * this.getFilmHeight() / e
    }
    getEffectiveFOV() {
        return dr * 2 * Math.atan(Math.tan(nr * .5 * this.fov) / this.zoom)
    }
    getFilmWidth() {
        return this.filmGauge * Math.min(this.aspect, 1)
    }
    getFilmHeight() {
        return this.filmGauge / Math.max(this.aspect, 1)
    }
    getViewBounds(e, t, n) {
        Wn.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse),
        t.set(Wn.x, Wn.y).multiplyScalar(-e / Wn.z),
        Wn.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse),
        n.set(Wn.x, Wn.y).multiplyScalar(-e / Wn.z)
    }
    getViewSize(e, t) {
        return this.getViewBounds(e, Ao, wo),
        t.subVectors(wo, Ao)
    }
    setViewOffset(e, t, n, r, s, a) {
        this.aspect = e / t,
        this.view === null && (this.view = {
            enabled: !0,
            fullWidth: 1,
            fullHeight: 1,
            offsetX: 0,
            offsetY: 0,
            width: 1,
            height: 1
        }),
        this.view.enabled = !0,
        this.view.fullWidth = e,
        this.view.fullHeight = t,
        this.view.offsetX = n,
        this.view.offsetY = r,
        this.view.width = s,
        this.view.height = a,
        this.updateProjectionMatrix()
    }
    clearViewOffset() {
        this.view !== null && (this.view.enabled = !1),
        this.updateProjectionMatrix()
    }
    updateProjectionMatrix() {
        const e = this.near;
        let t = e * Math.tan(nr * .5 * this.fov) / this.zoom
          , n = 2 * t
          , r = this.aspect * n
          , s = -.5 * r;
        const a = this.view;
        if (this.view !== null && this.view.enabled) {
            const l = a.fullWidth
              , c = a.fullHeight;
            s += a.offsetX * r / l,
            t -= a.offsetY * n / c,
            r *= a.width / l,
            n *= a.height / c
        }
        const o = this.filmOffset;
        o !== 0 && (s += e * o / this.getFilmWidth()),
        this.projectionMatrix.makePerspective(s, s + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
    }
    toJSON(e) {
        const t = super.toJSON(e);
        return t.object.fov = this.fov,
        t.object.zoom = this.zoom,
        t.object.near = this.near,
        t.object.far = this.far,
        t.object.focus = this.focus,
        t.object.aspect = this.aspect,
        this.view !== null && (t.object.view = Object.assign({}, this.view)),
        t.object.filmGauge = this.filmGauge,
        t.object.filmOffset = this.filmOffset,
        t
    }
}
const Ei = -90
  , Ti = 1;
class Vu extends It {
    constructor(e, t, n) {
        super(),
        this.type = "CubeCamera",
        this.renderTarget = n,
        this.coordinateSystem = null,
        this.activeMipmapLevel = 0;
        const r = new cn(Ei,Ti,e,t);
        r.layers = this.layers,
        this.add(r);
        const s = new cn(Ei,Ti,e,t);
        s.layers = this.layers,
        this.add(s);
        const a = new cn(Ei,Ti,e,t);
        a.layers = this.layers,
        this.add(a);
        const o = new cn(Ei,Ti,e,t);
        o.layers = this.layers,
        this.add(o);
        const l = new cn(Ei,Ti,e,t);
        l.layers = this.layers,
        this.add(l);
        const c = new cn(Ei,Ti,e,t);
        c.layers = this.layers,
        this.add(c)
    }
    updateCoordinateSystem() {
        const e = this.coordinateSystem
          , t = this.children.concat()
          , [n,r,s,a,o,l] = t;
        for (const c of t)
            this.remove(c);
        if (e === Sn)
            n.up.set(0, 1, 0),
            n.lookAt(1, 0, 0),
            r.up.set(0, 1, 0),
            r.lookAt(-1, 0, 0),
            s.up.set(0, 0, -1),
            s.lookAt(0, 1, 0),
            a.up.set(0, 0, 1),
            a.lookAt(0, -1, 0),
            o.up.set(0, 1, 0),
            o.lookAt(0, 0, 1),
            l.up.set(0, 1, 0),
            l.lookAt(0, 0, -1);
        else if (e === Yr)
            n.up.set(0, -1, 0),
            n.lookAt(-1, 0, 0),
            r.up.set(0, -1, 0),
            r.lookAt(1, 0, 0),
            s.up.set(0, 0, 1),
            s.lookAt(0, 1, 0),
            a.up.set(0, 0, -1),
            a.lookAt(0, -1, 0),
            o.up.set(0, -1, 0),
            o.lookAt(0, 0, 1),
            l.up.set(0, -1, 0),
            l.lookAt(0, 0, -1);
        else
            throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
        for (const c of t)
            this.add(c),
            c.updateMatrixWorld()
    }
    update(e, t) {
        this.parent === null && this.updateMatrixWorld();
        const {renderTarget: n, activeMipmapLevel: r} = this;
        this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem,
        this.updateCoordinateSystem());
        const [s,a,o,l,c,h] = this.children
          , d = e.getRenderTarget()
          , p = e.getActiveCubeFace()
          , m = e.getActiveMipmapLevel()
          , g = e.xr.enabled;
        e.xr.enabled = !1;
        const _ = n.texture.generateMipmaps;
        n.texture.generateMipmaps = !1,
        e.setRenderTarget(n, 0, r),
        e.render(t, s),
        e.setRenderTarget(n, 1, r),
        e.render(t, a),
        e.setRenderTarget(n, 2, r),
        e.render(t, o),
        e.setRenderTarget(n, 3, r),
        e.render(t, l),
        e.setRenderTarget(n, 4, r),
        e.render(t, c),
        n.texture.generateMipmaps = _,
        e.setRenderTarget(n, 5, r),
        e.render(t, h),
        e.setRenderTarget(d, p, m),
        e.xr.enabled = g,
        n.texture.needsPMREMUpdate = !0
    }
}
class Fc extends Wt {
    constructor(e=[], t=Ni, n, r, s, a, o, l, c, h) {
        super(e, t, n, r, s, a, o, l, c, h),
        this.isCubeTexture = !0,
        this.flipY = !1
    }
    get images() {
        return this.image
    }
    set images(e) {
        this.image = e
    }
}
class ku extends di {
    constructor(e=1, t={}) {
        super(e, e, t),
        this.isWebGLCubeRenderTarget = !0;
        const n = {
            width: e,
            height: e,
            depth: 1
        }
          , r = [n, n, n, n, n, n];
        this.texture = new Fc(r),
        this._setTextureOptions(t),
        this.texture.isRenderTargetTexture = !0
    }
    fromEquirectangularTexture(e, t) {
        this.texture.type = t.type,
        this.texture.colorSpace = t.colorSpace,
        this.texture.generateMipmaps = t.generateMipmaps,
        this.texture.minFilter = t.minFilter,
        this.texture.magFilter = t.magFilter;
        const n = {
            uniforms: {
                tEquirect: {
                    value: null
                }
            },
            vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
            fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
        }
          , r = new Wi(5,5,5)
          , s = new Tn({
            name: "CubemapFromEquirect",
            uniforms: Bi(n.uniforms),
            vertexShader: n.vertexShader,
            fragmentShader: n.fragmentShader,
            side: $t,
            blending: On
        });
        s.uniforms.tEquirect.value = t;
        const a = new tn(r,s)
          , o = t.minFilter;
        return t.minFilter === ci && (t.minFilter = ln),
        new Vu(1,10,this).update(e, a),
        t.minFilter = o,
        a.geometry.dispose(),
        a.material.dispose(),
        this
    }
    clear(e, t=!0, n=!0, r=!0) {
        const s = e.getRenderTarget();
        for (let a = 0; a < 6; a++)
            e.setRenderTarget(this, a),
            e.clear(t, n, r);
        e.setRenderTarget(s)
    }
}
class Bt extends It {
    constructor() {
        super(),
        this.isGroup = !0,
        this.type = "Group"
    }
}
const Gu = {
    type: "move"
};
class ys {
    constructor() {
        this._targetRay = null,
        this._grip = null,
        this._hand = null
    }
    getHandSpace() {
        return this._hand === null && (this._hand = new Bt,
        this._hand.matrixAutoUpdate = !1,
        this._hand.visible = !1,
        this._hand.joints = {},
        this._hand.inputState = {
            pinching: !1
        }),
        this._hand
    }
    getTargetRaySpace() {
        return this._targetRay === null && (this._targetRay = new Bt,
        this._targetRay.matrixAutoUpdate = !1,
        this._targetRay.visible = !1,
        this._targetRay.hasLinearVelocity = !1,
        this._targetRay.linearVelocity = new O,
        this._targetRay.hasAngularVelocity = !1,
        this._targetRay.angularVelocity = new O),
        this._targetRay
    }
    getGripSpace() {
        return this._grip === null && (this._grip = new Bt,
        this._grip.matrixAutoUpdate = !1,
        this._grip.visible = !1,
        this._grip.hasLinearVelocity = !1,
        this._grip.linearVelocity = new O,
        this._grip.hasAngularVelocity = !1,
        this._grip.angularVelocity = new O),
        this._grip
    }
    dispatchEvent(e) {
        return this._targetRay !== null && this._targetRay.dispatchEvent(e),
        this._grip !== null && this._grip.dispatchEvent(e),
        this._hand !== null && this._hand.dispatchEvent(e),
        this
    }
    connect(e) {
        if (e && e.hand) {
            const t = this._hand;
            if (t)
                for (const n of e.hand.values())
                    this._getHandJoint(t, n)
        }
        return this.dispatchEvent({
            type: "connected",
            data: e
        }),
        this
    }
    disconnect(e) {
        return this.dispatchEvent({
            type: "disconnected",
            data: e
        }),
        this._targetRay !== null && (this._targetRay.visible = !1),
        this._grip !== null && (this._grip.visible = !1),
        this._hand !== null && (this._hand.visible = !1),
        this
    }
    update(e, t, n) {
        let r = null
          , s = null
          , a = null;
        const o = this._targetRay
          , l = this._grip
          , c = this._hand;
        if (e && t.session.visibilityState !== "visible-blurred") {
            if (c && e.hand) {
                a = !0;
                for (const _ of e.hand.values()) {
                    const f = t.getJointPose(_, n)
                      , u = this._getHandJoint(c, _);
                    f !== null && (u.matrix.fromArray(f.transform.matrix),
                    u.matrix.decompose(u.position, u.rotation, u.scale),
                    u.matrixWorldNeedsUpdate = !0,
                    u.jointRadius = f.radius),
                    u.visible = f !== null
                }
                const h = c.joints["index-finger-tip"]
                  , d = c.joints["thumb-tip"]
                  , p = h.position.distanceTo(d.position)
                  , m = .02
                  , g = .005;
                c.inputState.pinching && p > m + g ? (c.inputState.pinching = !1,
                this.dispatchEvent({
                    type: "pinchend",
                    handedness: e.handedness,
                    target: this
                })) : !c.inputState.pinching && p <= m - g && (c.inputState.pinching = !0,
                this.dispatchEvent({
                    type: "pinchstart",
                    handedness: e.handedness,
                    target: this
                }))
            } else
                l !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n),
                s !== null && (l.matrix.fromArray(s.transform.matrix),
                l.matrix.decompose(l.position, l.rotation, l.scale),
                l.matrixWorldNeedsUpdate = !0,
                s.linearVelocity ? (l.hasLinearVelocity = !0,
                l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1,
                s.angularVelocity ? (l.hasAngularVelocity = !0,
                l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
            o !== null && (r = t.getPose(e.targetRaySpace, n),
            r === null && s !== null && (r = s),
            r !== null && (o.matrix.fromArray(r.transform.matrix),
            o.matrix.decompose(o.position, o.rotation, o.scale),
            o.matrixWorldNeedsUpdate = !0,
            r.linearVelocity ? (o.hasLinearVelocity = !0,
            o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1,
            r.angularVelocity ? (o.hasAngularVelocity = !0,
            o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1,
            this.dispatchEvent(Gu)))
        }
        return o !== null && (o.visible = r !== null),
        l !== null && (l.visible = s !== null),
        c !== null && (c.visible = a !== null),
        this
    }
    _getHandJoint(e, t) {
        if (e.joints[t.jointName] === void 0) {
            const n = new Bt;
            n.matrixAutoUpdate = !1,
            n.visible = !1,
            e.joints[t.jointName] = n,
            e.add(n)
        }
        return e.joints[t.jointName]
    }
}
class Ga {
    constructor(e, t=25e-5) {
        this.isFogExp2 = !0,
        this.name = "",
        this.color = new et(e),
        this.density = t
    }
    clone() {
        return new Ga(this.color,this.density)
    }
    toJSON() {
        return {
            type: "FogExp2",
            name: this.name,
            color: this.color.getHex(),
            density: this.density
        }
    }
}
class Hu extends It {
    constructor() {
        super(),
        this.isScene = !0,
        this.type = "Scene",
        this.background = null,
        this.environment = null,
        this.fog = null,
        this.backgroundBlurriness = 0,
        this.backgroundIntensity = 1,
        this.backgroundRotation = new En,
        this.environmentIntensity = 1,
        this.environmentRotation = new En,
        this.overrideMaterial = null,
        typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
            detail: this
        }))
    }
    copy(e, t) {
        return super.copy(e, t),
        e.background !== null && (this.background = e.background.clone()),
        e.environment !== null && (this.environment = e.environment.clone()),
        e.fog !== null && (this.fog = e.fog.clone()),
        this.backgroundBlurriness = e.backgroundBlurriness,
        this.backgroundIntensity = e.backgroundIntensity,
        this.backgroundRotation.copy(e.backgroundRotation),
        this.environmentIntensity = e.environmentIntensity,
        this.environmentRotation.copy(e.environmentRotation),
        e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()),
        this.matrixAutoUpdate = e.matrixAutoUpdate,
        this
    }
    toJSON(e) {
        const t = super.toJSON(e);
        return this.fog !== null && (t.object.fog = this.fog.toJSON()),
        this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness),
        this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity),
        t.object.backgroundRotation = this.backgroundRotation.toArray(),
        this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity),
        t.object.environmentRotation = this.environmentRotation.toArray(),
        t
    }
}
class Oc extends Wt {
    constructor(e=null, t=1, n=1, r, s, a, o, l, c=en, h=en, d, p) {
        super(null, a, o, l, c, h, r, s, d, p),
        this.isDataTexture = !0,
        this.image = {
            data: e,
            width: t,
            height: n
        },
        this.generateMipmaps = !1,
        this.flipY = !1,
        this.unpackAlignment = 1
    }
}
class Co extends un {
    constructor(e, t, n, r=1) {
        super(e, t, n),
        this.isInstancedBufferAttribute = !0,
        this.meshPerAttribute = r
    }
    copy(e) {
        return super.copy(e),
        this.meshPerAttribute = e.meshPerAttribute,
        this
    }
    toJSON() {
        const e = super.toJSON();
        return e.meshPerAttribute = this.meshPerAttribute,
        e.isInstancedBufferAttribute = !0,
        e
    }
}
const Ai = new ct
  , Ro = new ct
  , Dr = []
  , Po = new Zn
  , Wu = new ct
  , Zi = new tn
  , Ji = new Gi;
class Lo extends tn {
    constructor(e, t, n) {
        super(e, t),
        this.isInstancedMesh = !0,
        this.instanceMatrix = new Co(new Float32Array(n * 16),16),
        this.instanceColor = null,
        this.morphTexture = null,
        this.count = n,
        this.boundingBox = null,
        this.boundingSphere = null;
        for (let r = 0; r < n; r++)
            this.setMatrixAt(r, Wu)
    }
    computeBoundingBox() {
        const e = this.geometry
          , t = this.count;
        this.boundingBox === null && (this.boundingBox = new Zn),
        e.boundingBox === null && e.computeBoundingBox(),
        this.boundingBox.makeEmpty();
        for (let n = 0; n < t; n++)
            this.getMatrixAt(n, Ai),
            Po.copy(e.boundingBox).applyMatrix4(Ai),
            this.boundingBox.union(Po)
    }
    computeBoundingSphere() {
        const e = this.geometry
          , t = this.count;
        this.boundingSphere === null && (this.boundingSphere = new Gi),
        e.boundingSphere === null && e.computeBoundingSphere(),
        this.boundingSphere.makeEmpty();
        for (let n = 0; n < t; n++)
            this.getMatrixAt(n, Ai),
            Ji.copy(e.boundingSphere).applyMatrix4(Ai),
            this.boundingSphere.union(Ji)
    }
    copy(e, t) {
        return super.copy(e, t),
        this.instanceMatrix.copy(e.instanceMatrix),
        e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()),
        e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()),
        this.count = e.count,
        e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()),
        e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()),
        this
    }
    getColorAt(e, t) {
        t.fromArray(this.instanceColor.array, e * 3)
    }
    getMatrixAt(e, t) {
        t.fromArray(this.instanceMatrix.array, e * 16)
    }
    getMorphAt(e, t) {
        const n = t.morphTargetInfluences
          , r = this.morphTexture.source.data.data
          , s = n.length + 1
          , a = e * s + 1;
        for (let o = 0; o < n.length; o++)
            n[o] = r[a + o]
    }
    raycast(e, t) {
        const n = this.matrixWorld
          , r = this.count;
        if (Zi.geometry = this.geometry,
        Zi.material = this.material,
        Zi.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(),
        Ji.copy(this.boundingSphere),
        Ji.applyMatrix4(n),
        e.ray.intersectsSphere(Ji) !== !1))
            for (let s = 0; s < r; s++) {
                this.getMatrixAt(s, Ai),
                Ro.multiplyMatrices(n, Ai),
                Zi.matrixWorld = Ro,
                Zi.raycast(e, Dr);
                for (let a = 0, o = Dr.length; a < o; a++) {
                    const l = Dr[a];
                    l.instanceId = s,
                    l.object = this,
                    t.push(l)
                }
                Dr.length = 0
            }
    }
    setColorAt(e, t) {
        this.instanceColor === null && (this.instanceColor = new Co(new Float32Array(this.instanceMatrix.count * 3).fill(1),3)),
        t.toArray(this.instanceColor.array, e * 3)
    }
    setMatrixAt(e, t) {
        t.toArray(this.instanceMatrix.array, e * 16)
    }
    setMorphAt(e, t) {
        const n = t.morphTargetInfluences
          , r = n.length + 1;
        this.morphTexture === null && (this.morphTexture = new Oc(new Float32Array(r * this.count),r,this.count,Ia,bn));
        const s = this.morphTexture.source.data.data;
        let a = 0;
        for (let c = 0; c < n.length; c++)
            a += n[c];
        const o = this.geometry.morphTargetsRelative ? 1 : 1 - a
          , l = r * e;
        s[l] = o,
        s.set(n, l + 1)
    }
    updateMorphTargets() {}
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        }),
        this.morphTexture !== null && (this.morphTexture.dispose(),
        this.morphTexture = null)
    }
}
const Es = new O
  , Xu = new O
  , qu = new $e;
class Nn {
    constructor(e=new O(1,0,0), t=0) {
        this.isPlane = !0,
        this.normal = e,
        this.constant = t
    }
    set(e, t) {
        return this.normal.copy(e),
        this.constant = t,
        this
    }
    setComponents(e, t, n, r) {
        return this.normal.set(e, t, n),
        this.constant = r,
        this
    }
    setFromNormalAndCoplanarPoint(e, t) {
        return this.normal.copy(e),
        this.constant = -t.dot(this.normal),
        this
    }
    setFromCoplanarPoints(e, t, n) {
        const r = Es.subVectors(n, t).cross(Xu.subVectors(e, t)).normalize();
        return this.setFromNormalAndCoplanarPoint(r, e),
        this
    }
    copy(e) {
        return this.normal.copy(e.normal),
        this.constant = e.constant,
        this
    }
    normalize() {
        const e = 1 / this.normal.length();
        return this.normal.multiplyScalar(e),
        this.constant *= e,
        this
    }
    negate() {
        return this.constant *= -1,
        this.normal.negate(),
        this
    }
    distanceToPoint(e) {
        return this.normal.dot(e) + this.constant
    }
    distanceToSphere(e) {
        return this.distanceToPoint(e.center) - e.radius
    }
    projectPoint(e, t) {
        return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e))
    }
    intersectLine(e, t) {
        const n = e.delta(Es)
          , r = this.normal.dot(n);
        if (r === 0)
            return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
        const s = -(e.start.dot(this.normal) + this.constant) / r;
        return s < 0 || s > 1 ? null : t.copy(e.start).addScaledVector(n, s)
    }
    intersectsLine(e) {
        const t = this.distanceToPoint(e.start)
          , n = this.distanceToPoint(e.end);
        return t < 0 && n > 0 || n < 0 && t > 0
    }
    intersectsBox(e) {
        return e.intersectsPlane(this)
    }
    intersectsSphere(e) {
        return e.intersectsPlane(this)
    }
    coplanarPoint(e) {
        return e.copy(this.normal).multiplyScalar(-this.constant)
    }
    applyMatrix4(e, t) {
        const n = t || qu.getNormalMatrix(e)
          , r = this.coplanarPoint(Es).applyMatrix4(e)
          , s = this.normal.applyMatrix3(n).normalize();
        return this.constant = -r.dot(s),
        this
    }
    translate(e) {
        return this.constant -= e.dot(this.normal),
        this
    }
    equals(e) {
        return e.normal.equals(this.normal) && e.constant === this.constant
    }
    clone() {
        return new this.constructor().copy(this)
    }
}
const ni = new Gi
  , Yu = new Ze(.5,.5)
  , Ir = new O;
class Ha {
    constructor(e=new Nn, t=new Nn, n=new Nn, r=new Nn, s=new Nn, a=new Nn) {
        this.planes = [e, t, n, r, s, a]
    }
    set(e, t, n, r, s, a) {
        const o = this.planes;
        return o[0].copy(e),
        o[1].copy(t),
        o[2].copy(n),
        o[3].copy(r),
        o[4].copy(s),
        o[5].copy(a),
        this
    }
    copy(e) {
        const t = this.planes;
        for (let n = 0; n < 6; n++)
            t[n].copy(e.planes[n]);
        return this
    }
    setFromProjectionMatrix(e, t=Sn, n=!1) {
        const r = this.planes
          , s = e.elements
          , a = s[0]
          , o = s[1]
          , l = s[2]
          , c = s[3]
          , h = s[4]
          , d = s[5]
          , p = s[6]
          , m = s[7]
          , g = s[8]
          , _ = s[9]
          , f = s[10]
          , u = s[11]
          , b = s[12]
          , v = s[13]
          , T = s[14]
          , C = s[15];
        if (r[0].setComponents(c - a, m - h, u - g, C - b).normalize(),
        r[1].setComponents(c + a, m + h, u + g, C + b).normalize(),
        r[2].setComponents(c + o, m + d, u + _, C + v).normalize(),
        r[3].setComponents(c - o, m - d, u - _, C - v).normalize(),
        n)
            r[4].setComponents(l, p, f, T).normalize(),
            r[5].setComponents(c - l, m - p, u - f, C - T).normalize();
        else if (r[4].setComponents(c - l, m - p, u - f, C - T).normalize(),
        t === Sn)
            r[5].setComponents(c + l, m + p, u + f, C + T).normalize();
        else if (t === Yr)
            r[5].setComponents(l, p, f, T).normalize();
        else
            throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
        return this
    }
    intersectsObject(e) {
        if (e.boundingSphere !== void 0)
            e.boundingSphere === null && e.computeBoundingSphere(),
            ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
        else {
            const t = e.geometry;
            t.boundingSphere === null && t.computeBoundingSphere(),
            ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)
        }
        return this.intersectsSphere(ni)
    }
    intersectsSprite(e) {
        ni.center.set(0, 0, 0);
        const t = Yu.distanceTo(e.center);
        return ni.radius = .7071067811865476 + t,
        ni.applyMatrix4(e.matrixWorld),
        this.intersectsSphere(ni)
    }
    intersectsSphere(e) {
        const t = this.planes
          , n = e.center
          , r = -e.radius;
        for (let s = 0; s < 6; s++)
            if (t[s].distanceToPoint(n) < r)
                return !1;
        return !0
    }
    intersectsBox(e) {
        const t = this.planes;
        for (let n = 0; n < 6; n++) {
            const r = t[n];
            if (Ir.x = r.normal.x > 0 ? e.max.x : e.min.x,
            Ir.y = r.normal.y > 0 ? e.max.y : e.min.y,
            Ir.z = r.normal.z > 0 ? e.max.z : e.min.z,
            r.distanceToPoint(Ir) < 0)
                return !1
        }
        return !0
    }
    containsPoint(e) {
        const t = this.planes;
        for (let n = 0; n < 6; n++)
            if (t[n].distanceToPoint(e) < 0)
                return !1;
        return !0
    }
    clone() {
        return new this.constructor().copy(this)
    }
}
class Bc extends Hi {
    constructor(e) {
        super(),
        this.isPointsMaterial = !0,
        this.type = "PointsMaterial",
        this.color = new et(16777215),
        this.map = null,
        this.alphaMap = null,
        this.size = 1,
        this.sizeAttenuation = !0,
        this.fog = !0,
        this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.color.copy(e.color),
        this.map = e.map,
        this.alphaMap = e.alphaMap,
        this.size = e.size,
        this.sizeAttenuation = e.sizeAttenuation,
        this.fog = e.fog,
        this
    }
}
const Do = new ct
  , ba = new Va
  , Ur = new Gi
  , Nr = new O;
class $u extends It {
    constructor(e=new Xt, t=new Bc) {
        super(),
        this.isPoints = !0,
        this.type = "Points",
        this.geometry = e,
        this.material = t,
        this.morphTargetDictionary = void 0,
        this.morphTargetInfluences = void 0,
        this.updateMorphTargets()
    }
    copy(e, t) {
        return super.copy(e, t),
        this.material = Array.isArray(e.material) ? e.material.slice() : e.material,
        this.geometry = e.geometry,
        this
    }
    raycast(e, t) {
        const n = this.geometry
          , r = this.matrixWorld
          , s = e.params.Points.threshold
          , a = n.drawRange;
        if (n.boundingSphere === null && n.computeBoundingSphere(),
        Ur.copy(n.boundingSphere),
        Ur.applyMatrix4(r),
        Ur.radius += s,
        e.ray.intersectsSphere(Ur) === !1)
            return;
        Do.copy(r).invert(),
        ba.copy(e.ray).applyMatrix4(Do);
        const o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3)
          , l = o * o
          , c = n.index
          , d = n.attributes.position;
        if (c !== null) {
            const p = Math.max(0, a.start)
              , m = Math.min(c.count, a.start + a.count);
            for (let g = p, _ = m; g < _; g++) {
                const f = c.getX(g);
                Nr.fromBufferAttribute(d, f),
                Io(Nr, f, l, r, e, t, this)
            }
        } else {
            const p = Math.max(0, a.start)
              , m = Math.min(d.count, a.start + a.count);
            for (let g = p, _ = m; g < _; g++)
                Nr.fromBufferAttribute(d, g),
                Io(Nr, g, l, r, e, t, this)
        }
    }
    updateMorphTargets() {
        const t = this.geometry.morphAttributes
          , n = Object.keys(t);
        if (n.length > 0) {
            const r = t[n[0]];
            if (r !== void 0) {
                this.morphTargetInfluences = [],
                this.morphTargetDictionary = {};
                for (let s = 0, a = r.length; s < a; s++) {
                    const o = r[s].name || String(s);
                    this.morphTargetInfluences.push(0),
                    this.morphTargetDictionary[o] = s
                }
            }
        }
    }
}
function Io(i, e, t, n, r, s, a) {
    const o = ba.distanceSqToPoint(i);
    if (o < t) {
        const l = new O;
        ba.closestPointToPoint(i, l),
        l.applyMatrix4(n);
        const c = r.ray.origin.distanceTo(l);
        if (c < r.near || c > r.far)
            return;
        s.push({
            distance: c,
            distanceToRay: Math.sqrt(o),
            point: l,
            index: e,
            face: null,
            faceIndex: null,
            barycoord: null,
            object: a
        })
    }
}
class zc extends Wt {
    constructor(e, t, n=ui, r, s, a, o=en, l=en, c, h=cr, d=1) {
        if (h !== cr && h !== lr)
            throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
        const p = {
            width: e,
            height: t,
            depth: d
        };
        super(p, r, s, a, o, l, h, n, c),
        this.isDepthTexture = !0,
        this.flipY = !1,
        this.generateMipmaps = !1,
        this.compareFunction = null
    }
    copy(e) {
        return super.copy(e),
        this.source = new za(Object.assign({}, e.image)),
        this.compareFunction = e.compareFunction,
        this
    }
    toJSON(e) {
        const t = super.toJSON(e);
        return this.compareFunction !== null && (t.compareFunction = this.compareFunction),
        t
    }
}
class Vc extends Wt {
    constructor(e=null) {
        super(),
        this.sourceTexture = e,
        this.isExternalTexture = !0
    }
    copy(e) {
        return super.copy(e),
        this.sourceTexture = e.sourceTexture,
        this
    }
}
class fr extends Xt {
    constructor(e=1, t=1, n=1, r=32, s=1, a=!1, o=0, l=Math.PI * 2) {
        super(),
        this.type = "CylinderGeometry",
        this.parameters = {
            radiusTop: e,
            radiusBottom: t,
            height: n,
            radialSegments: r,
            heightSegments: s,
            openEnded: a,
            thetaStart: o,
            thetaLength: l
        };
        const c = this;
        r = Math.floor(r),
        s = Math.floor(s);
        const h = []
          , d = []
          , p = []
          , m = [];
        let g = 0;
        const _ = []
          , f = n / 2;
        let u = 0;
        b(),
        a === !1 && (e > 0 && v(!0),
        t > 0 && v(!1)),
        this.setIndex(h),
        this.setAttribute("position", new yt(d,3)),
        this.setAttribute("normal", new yt(p,3)),
        this.setAttribute("uv", new yt(m,2));
        function b() {
            const T = new O
              , C = new O;
            let E = 0;
            const R = (t - e) / n;
            for (let F = 0; F <= s; F++) {
                const S = []
                  , M = F / s
                  , U = M * (t - e) + e;
                for (let B = 0; B <= r; B++) {
                    const k = B / r
                      , D = k * l + o
                      , G = Math.sin(D)
                      , Y = Math.cos(D);
                    C.x = U * G,
                    C.y = -M * n + f,
                    C.z = U * Y,
                    d.push(C.x, C.y, C.z),
                    T.set(G, R, Y).normalize(),
                    p.push(T.x, T.y, T.z),
                    m.push(k, 1 - M),
                    S.push(g++)
                }
                _.push(S)
            }
            for (let F = 0; F < r; F++)
                for (let S = 0; S < s; S++) {
                    const M = _[S][F]
                      , U = _[S + 1][F]
                      , B = _[S + 1][F + 1]
                      , k = _[S][F + 1];
                    (e > 0 || S !== 0) && (h.push(M, U, k),
                    E += 3),
                    (t > 0 || S !== s - 1) && (h.push(U, B, k),
                    E += 3)
                }
            c.addGroup(u, E, 0),
            u += E
        }
        function v(T) {
            const C = g
              , E = new Ze
              , R = new O;
            let F = 0;
            const S = T === !0 ? e : t
              , M = T === !0 ? 1 : -1;
            for (let B = 1; B <= r; B++)
                d.push(0, f * M, 0),
                p.push(0, M, 0),
                m.push(.5, .5),
                g++;
            const U = g;
            for (let B = 0; B <= r; B++) {
                const D = B / r * l + o
                  , G = Math.cos(D)
                  , Y = Math.sin(D);
                R.x = S * Y,
                R.y = f * M,
                R.z = S * G,
                d.push(R.x, R.y, R.z),
                p.push(0, M, 0),
                E.x = G * .5 + .5,
                E.y = Y * .5 * M + .5,
                m.push(E.x, E.y),
                g++
            }
            for (let B = 0; B < r; B++) {
                const k = C + B
                  , D = U + B;
                T === !0 ? h.push(D, D + 1, k) : h.push(D + 1, D, k),
                F += 3
            }
            c.addGroup(u, F, T === !0 ? 1 : 2),
            u += F
        }
    }
    copy(e) {
        return super.copy(e),
        this.parameters = Object.assign({}, e.parameters),
        this
    }
    static fromJSON(e) {
        return new fr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)
    }
}
class Wa extends fr {
    constructor(e=1, t=1, n=32, r=1, s=!1, a=0, o=Math.PI * 2) {
        super(0, e, t, n, r, s, a, o),
        this.type = "ConeGeometry",
        this.parameters = {
            radius: e,
            height: t,
            radialSegments: n,
            heightSegments: r,
            openEnded: s,
            thetaStart: a,
            thetaLength: o
        }
    }
    static fromJSON(e) {
        return new Wa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)
    }
}
class Xa extends Xt {
    constructor(e=[], t=[], n=1, r=0) {
        super(),
        this.type = "PolyhedronGeometry",
        this.parameters = {
            vertices: e,
            indices: t,
            radius: n,
            detail: r
        };
        const s = []
          , a = [];
        o(r),
        c(n),
        h(),
        this.setAttribute("position", new yt(s,3)),
        this.setAttribute("normal", new yt(s.slice(),3)),
        this.setAttribute("uv", new yt(a,2)),
        r === 0 ? this.computeVertexNormals() : this.normalizeNormals();
        function o(b) {
            const v = new O
              , T = new O
              , C = new O;
            for (let E = 0; E < t.length; E += 3)
                m(t[E + 0], v),
                m(t[E + 1], T),
                m(t[E + 2], C),
                l(v, T, C, b)
        }
        function l(b, v, T, C) {
            const E = C + 1
              , R = [];
            for (let F = 0; F <= E; F++) {
                R[F] = [];
                const S = b.clone().lerp(T, F / E)
                  , M = v.clone().lerp(T, F / E)
                  , U = E - F;
                for (let B = 0; B <= U; B++)
                    B === 0 && F === E ? R[F][B] = S : R[F][B] = S.clone().lerp(M, B / U)
            }
            for (let F = 0; F < E; F++)
                for (let S = 0; S < 2 * (E - F) - 1; S++) {
                    const M = Math.floor(S / 2);
                    S % 2 === 0 ? (p(R[F][M + 1]),
                    p(R[F + 1][M]),
                    p(R[F][M])) : (p(R[F][M + 1]),
                    p(R[F + 1][M + 1]),
                    p(R[F + 1][M]))
                }
        }
        function c(b) {
            const v = new O;
            for (let T = 0; T < s.length; T += 3)
                v.x = s[T + 0],
                v.y = s[T + 1],
                v.z = s[T + 2],
                v.normalize().multiplyScalar(b),
                s[T + 0] = v.x,
                s[T + 1] = v.y,
                s[T + 2] = v.z
        }
        function h() {
            const b = new O;
            for (let v = 0; v < s.length; v += 3) {
                b.x = s[v + 0],
                b.y = s[v + 1],
                b.z = s[v + 2];
                const T = f(b) / 2 / Math.PI + .5
                  , C = u(b) / Math.PI + .5;
                a.push(T, 1 - C)
            }
            g(),
            d()
        }
        function d() {
            for (let b = 0; b < a.length; b += 6) {
                const v = a[b + 0]
                  , T = a[b + 2]
                  , C = a[b + 4]
                  , E = Math.max(v, T, C)
                  , R = Math.min(v, T, C);
                E > .9 && R < .1 && (v < .2 && (a[b + 0] += 1),
                T < .2 && (a[b + 2] += 1),
                C < .2 && (a[b + 4] += 1))
            }
        }
        function p(b) {
            s.push(b.x, b.y, b.z)
        }
        function m(b, v) {
            const T = b * 3;
            v.x = e[T + 0],
            v.y = e[T + 1],
            v.z = e[T + 2]
        }
        function g() {
            const b = new O
              , v = new O
              , T = new O
              , C = new O
              , E = new Ze
              , R = new Ze
              , F = new Ze;
            for (let S = 0, M = 0; S < s.length; S += 9,
            M += 6) {
                b.set(s[S + 0], s[S + 1], s[S + 2]),
                v.set(s[S + 3], s[S + 4], s[S + 5]),
                T.set(s[S + 6], s[S + 7], s[S + 8]),
                E.set(a[M + 0], a[M + 1]),
                R.set(a[M + 2], a[M + 3]),
                F.set(a[M + 4], a[M + 5]),
                C.copy(b).add(v).add(T).divideScalar(3);
                const U = f(C);
                _(E, M + 0, b, U),
                _(R, M + 2, v, U),
                _(F, M + 4, T, U)
            }
        }
        function _(b, v, T, C) {
            C < 0 && b.x === 1 && (a[v] = b.x - 1),
            T.x === 0 && T.z === 0 && (a[v] = C / 2 / Math.PI + .5)
        }
        function f(b) {
            return Math.atan2(b.z, -b.x)
        }
        function u(b) {
            return Math.atan2(-b.y, Math.sqrt(b.x * b.x + b.z * b.z))
        }
    }
    copy(e) {
        return super.copy(e),
        this.parameters = Object.assign({}, e.parameters),
        this
    }
    static fromJSON(e) {
        return new Xa(e.vertices,e.indices,e.radius,e.details)
    }
}
class qa extends Xa {
    constructor(e=1, t=0) {
        const n = (1 + Math.sqrt(5)) / 2
          , r = 1 / n
          , s = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -r, -n, 0, -r, n, 0, r, -n, 0, r, n, -r, -n, 0, -r, n, 0, r, -n, 0, r, n, 0, -n, 0, -r, n, 0, -r, -n, 0, r, n, 0, r]
          , a = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
        super(s, a, e, t),
        this.type = "DodecahedronGeometry",
        this.parameters = {
            radius: e,
            detail: t
        }
    }
    static fromJSON(e) {
        return new qa(e.radius,e.detail)
    }
}
class ju {
    constructor() {
        this.type = "Curve",
        this.arcLengthDivisions = 200,
        this.needsUpdate = !1,
        this.cacheArcLengths = null
    }
    getPoint() {
        Ye("Curve: .getPoint() not implemented.")
    }
    getPointAt(e, t) {
        const n = this.getUtoTmapping(e);
        return this.getPoint(n, t)
    }
    getPoints(e=5) {
        const t = [];
        for (let n = 0; n <= e; n++)
            t.push(this.getPoint(n / e));
        return t
    }
    getSpacedPoints(e=5) {
        const t = [];
        for (let n = 0; n <= e; n++)
            t.push(this.getPointAt(n / e));
        return t
    }
    getLength() {
        const e = this.getLengths();
        return e[e.length - 1]
    }
    getLengths(e=this.arcLengthDivisions) {
        if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate)
            return this.cacheArcLengths;
        this.needsUpdate = !1;
        const t = [];
        let n, r = this.getPoint(0), s = 0;
        t.push(0);
        for (let a = 1; a <= e; a++)
            n = this.getPoint(a / e),
            s += n.distanceTo(r),
            t.push(s),
            r = n;
        return this.cacheArcLengths = t,
        t
    }
    updateArcLengths() {
        this.needsUpdate = !0,
        this.getLengths()
    }
    getUtoTmapping(e, t=null) {
        const n = this.getLengths();
        let r = 0;
        const s = n.length;
        let a;
        t ? a = t : a = e * n[s - 1];
        let o = 0, l = s - 1, c;
        for (; o <= l; )
            if (r = Math.floor(o + (l - o) / 2),
            c = n[r] - a,
            c < 0)
                o = r + 1;
            else if (c > 0)
                l = r - 1;
            else {
                l = r;
                break
            }
        if (r = l,
        n[r] === a)
            return r / (s - 1);
        const h = n[r]
          , p = n[r + 1] - h
          , m = (a - h) / p;
        return (r + m) / (s - 1)
    }
    getTangent(e, t) {
        let r = e - 1e-4
          , s = e + 1e-4;
        r < 0 && (r = 0),
        s > 1 && (s = 1);
        const a = this.getPoint(r)
          , o = this.getPoint(s)
          , l = t || (a.isVector2 ? new Ze : new O);
        return l.copy(o).sub(a).normalize(),
        l
    }
    getTangentAt(e, t) {
        const n = this.getUtoTmapping(e);
        return this.getTangent(n, t)
    }
    computeFrenetFrames(e, t=!1) {
        const n = new O
          , r = []
          , s = []
          , a = []
          , o = new O
          , l = new ct;
        for (let m = 0; m <= e; m++) {
            const g = m / e;
            r[m] = this.getTangentAt(g, new O)
        }
        s[0] = new O,
        a[0] = new O;
        let c = Number.MAX_VALUE;
        const h = Math.abs(r[0].x)
          , d = Math.abs(r[0].y)
          , p = Math.abs(r[0].z);
        h <= c && (c = h,
        n.set(1, 0, 0)),
        d <= c && (c = d,
        n.set(0, 1, 0)),
        p <= c && n.set(0, 0, 1),
        o.crossVectors(r[0], n).normalize(),
        s[0].crossVectors(r[0], o),
        a[0].crossVectors(r[0], s[0]);
        for (let m = 1; m <= e; m++) {
            if (s[m] = s[m - 1].clone(),
            a[m] = a[m - 1].clone(),
            o.crossVectors(r[m - 1], r[m]),
            o.length() > Number.EPSILON) {
                o.normalize();
                const g = Math.acos(Qe(r[m - 1].dot(r[m]), -1, 1));
                s[m].applyMatrix4(l.makeRotationAxis(o, g))
            }
            a[m].crossVectors(r[m], s[m])
        }
        if (t === !0) {
            let m = Math.acos(Qe(s[0].dot(s[e]), -1, 1));
            m /= e,
            r[0].dot(o.crossVectors(s[0], s[e])) > 0 && (m = -m);
            for (let g = 1; g <= e; g++)
                s[g].applyMatrix4(l.makeRotationAxis(r[g], m * g)),
                a[g].crossVectors(r[g], s[g])
        }
        return {
            tangents: r,
            normals: s,
            binormals: a
        }
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        return this.arcLengthDivisions = e.arcLengthDivisions,
        this
    }
    toJSON() {
        const e = {
            metadata: {
                version: 4.7,
                type: "Curve",
                generator: "Curve.toJSON"
            }
        };
        return e.arcLengthDivisions = this.arcLengthDivisions,
        e.type = this.type,
        e
    }
    fromJSON(e) {
        return this.arcLengthDivisions = e.arcLengthDivisions,
        this
    }
}
function Ku(i, e) {
    const t = 1 - i;
    return t * t * t * e
}
function Zu(i, e) {
    const t = 1 - i;
    return 3 * t * t * i * e
}
function Ju(i, e) {
    return 3 * (1 - i) * i * i * e
}
function Qu(i, e) {
    return i * i * i * e
}
function Ts(i, e, t, n, r) {
    return Ku(i, e) + Zu(i, t) + Ju(i, n) + Qu(i, r)
}
class ed extends ju {
    constructor(e=new O, t=new O, n=new O, r=new O) {
        super(),
        this.isCubicBezierCurve3 = !0,
        this.type = "CubicBezierCurve3",
        this.v0 = e,
        this.v1 = t,
        this.v2 = n,
        this.v3 = r
    }
    getPoint(e, t=new O) {
        const n = t
          , r = this.v0
          , s = this.v1
          , a = this.v2
          , o = this.v3;
        return n.set(Ts(e, r.x, s.x, a.x, o.x), Ts(e, r.y, s.y, a.y, o.y), Ts(e, r.z, s.z, a.z, o.z)),
        n
    }
    copy(e) {
        return super.copy(e),
        this.v0.copy(e.v0),
        this.v1.copy(e.v1),
        this.v2.copy(e.v2),
        this.v3.copy(e.v3),
        this
    }
    toJSON() {
        const e = super.toJSON();
        return e.v0 = this.v0.toArray(),
        e.v1 = this.v1.toArray(),
        e.v2 = this.v2.toArray(),
        e.v3 = this.v3.toArray(),
        e
    }
    fromJSON(e) {
        return super.fromJSON(e),
        this.v0.fromArray(e.v0),
        this.v1.fromArray(e.v1),
        this.v2.fromArray(e.v2),
        this.v3.fromArray(e.v3),
        this
    }
}
class pr extends Xt {
    constructor(e=1, t=1, n=1, r=1) {
        super(),
        this.type = "PlaneGeometry",
        this.parameters = {
            width: e,
            height: t,
            widthSegments: n,
            heightSegments: r
        };
        const s = e / 2
          , a = t / 2
          , o = Math.floor(n)
          , l = Math.floor(r)
          , c = o + 1
          , h = l + 1
          , d = e / o
          , p = t / l
          , m = []
          , g = []
          , _ = []
          , f = [];
        for (let u = 0; u < h; u++) {
            const b = u * p - a;
            for (let v = 0; v < c; v++) {
                const T = v * d - s;
                g.push(T, -b, 0),
                _.push(0, 0, 1),
                f.push(v / o),
                f.push(1 - u / l)
            }
        }
        for (let u = 0; u < l; u++)
            for (let b = 0; b < o; b++) {
                const v = b + c * u
                  , T = b + c * (u + 1)
                  , C = b + 1 + c * (u + 1)
                  , E = b + 1 + c * u;
                m.push(v, T, E),
                m.push(T, C, E)
            }
        this.setIndex(m),
        this.setAttribute("position", new yt(g,3)),
        this.setAttribute("normal", new yt(_,3)),
        this.setAttribute("uv", new yt(f,2))
    }
    copy(e) {
        return super.copy(e),
        this.parameters = Object.assign({}, e.parameters),
        this
    }
    static fromJSON(e) {
        return new pr(e.width,e.height,e.widthSegments,e.heightSegments)
    }
}
class Ya extends Xt {
    constructor(e=1, t=32, n=16, r=0, s=Math.PI * 2, a=0, o=Math.PI) {
        super(),
        this.type = "SphereGeometry",
        this.parameters = {
            radius: e,
            widthSegments: t,
            heightSegments: n,
            phiStart: r,
            phiLength: s,
            thetaStart: a,
            thetaLength: o
        },
        t = Math.max(3, Math.floor(t)),
        n = Math.max(2, Math.floor(n));
        const l = Math.min(a + o, Math.PI);
        let c = 0;
        const h = []
          , d = new O
          , p = new O
          , m = []
          , g = []
          , _ = []
          , f = [];
        for (let u = 0; u <= n; u++) {
            const b = []
              , v = u / n;
            let T = 0;
            u === 0 && a === 0 ? T = .5 / t : u === n && l === Math.PI && (T = -.5 / t);
            for (let C = 0; C <= t; C++) {
                const E = C / t;
                d.x = -e * Math.cos(r + E * s) * Math.sin(a + v * o),
                d.y = e * Math.cos(a + v * o),
                d.z = e * Math.sin(r + E * s) * Math.sin(a + v * o),
                g.push(d.x, d.y, d.z),
                p.copy(d).normalize(),
                _.push(p.x, p.y, p.z),
                f.push(E + T, 1 - v),
                b.push(c++)
            }
            h.push(b)
        }
        for (let u = 0; u < n; u++)
            for (let b = 0; b < t; b++) {
                const v = h[u][b + 1]
                  , T = h[u][b]
                  , C = h[u + 1][b]
                  , E = h[u + 1][b + 1];
                (u !== 0 || a > 0) && m.push(v, T, E),
                (u !== n - 1 || l < Math.PI) && m.push(T, C, E)
            }
        this.setIndex(m),
        this.setAttribute("position", new yt(g,3)),
        this.setAttribute("normal", new yt(_,3)),
        this.setAttribute("uv", new yt(f,2))
    }
    copy(e) {
        return super.copy(e),
        this.parameters = Object.assign({}, e.parameters),
        this
    }
    static fromJSON(e) {
        return new Ya(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)
    }
}
class $a extends Xt {
    constructor(e=1, t=.4, n=12, r=48, s=Math.PI * 2) {
        super(),
        this.type = "TorusGeometry",
        this.parameters = {
            radius: e,
            tube: t,
            radialSegments: n,
            tubularSegments: r,
            arc: s
        },
        n = Math.floor(n),
        r = Math.floor(r);
        const a = []
          , o = []
          , l = []
          , c = []
          , h = new O
          , d = new O
          , p = new O;
        for (let m = 0; m <= n; m++)
            for (let g = 0; g <= r; g++) {
                const _ = g / r * s
                  , f = m / n * Math.PI * 2;
                d.x = (e + t * Math.cos(f)) * Math.cos(_),
                d.y = (e + t * Math.cos(f)) * Math.sin(_),
                d.z = t * Math.sin(f),
                o.push(d.x, d.y, d.z),
                h.x = e * Math.cos(_),
                h.y = e * Math.sin(_),
                p.subVectors(d, h).normalize(),
                l.push(p.x, p.y, p.z),
                c.push(g / r),
                c.push(m / n)
            }
        for (let m = 1; m <= n; m++)
            for (let g = 1; g <= r; g++) {
                const _ = (r + 1) * m + g - 1
                  , f = (r + 1) * (m - 1) + g - 1
                  , u = (r + 1) * (m - 1) + g
                  , b = (r + 1) * m + g;
                a.push(_, f, b),
                a.push(f, u, b)
            }
        this.setIndex(a),
        this.setAttribute("position", new yt(o,3)),
        this.setAttribute("normal", new yt(l,3)),
        this.setAttribute("uv", new yt(c,2))
    }
    copy(e) {
        return super.copy(e),
        this.parameters = Object.assign({}, e.parameters),
        this
    }
    static fromJSON(e) {
        return new $a(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)
    }
}
class jr extends Hi {
    constructor(e) {
        super(),
        this.isMeshStandardMaterial = !0,
        this.type = "MeshStandardMaterial",
        this.defines = {
            STANDARD: ""
        },
        this.color = new et(16777215),
        this.roughness = 1,
        this.metalness = 0,
        this.map = null,
        this.lightMap = null,
        this.lightMapIntensity = 1,
        this.aoMap = null,
        this.aoMapIntensity = 1,
        this.emissive = new et(0),
        this.emissiveIntensity = 1,
        this.emissiveMap = null,
        this.bumpMap = null,
        this.bumpScale = 1,
        this.normalMap = null,
        this.normalMapType = wc,
        this.normalScale = new Ze(1,1),
        this.displacementMap = null,
        this.displacementScale = 1,
        this.displacementBias = 0,
        this.roughnessMap = null,
        this.metalnessMap = null,
        this.alphaMap = null,
        this.envMap = null,
        this.envMapRotation = new En,
        this.envMapIntensity = 1,
        this.wireframe = !1,
        this.wireframeLinewidth = 1,
        this.wireframeLinecap = "round",
        this.wireframeLinejoin = "round",
        this.flatShading = !1,
        this.fog = !0,
        this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.defines = {
            STANDARD: ""
        },
        this.color.copy(e.color),
        this.roughness = e.roughness,
        this.metalness = e.metalness,
        this.map = e.map,
        this.lightMap = e.lightMap,
        this.lightMapIntensity = e.lightMapIntensity,
        this.aoMap = e.aoMap,
        this.aoMapIntensity = e.aoMapIntensity,
        this.emissive.copy(e.emissive),
        this.emissiveMap = e.emissiveMap,
        this.emissiveIntensity = e.emissiveIntensity,
        this.bumpMap = e.bumpMap,
        this.bumpScale = e.bumpScale,
        this.normalMap = e.normalMap,
        this.normalMapType = e.normalMapType,
        this.normalScale.copy(e.normalScale),
        this.displacementMap = e.displacementMap,
        this.displacementScale = e.displacementScale,
        this.displacementBias = e.displacementBias,
        this.roughnessMap = e.roughnessMap,
        this.metalnessMap = e.metalnessMap,
        this.alphaMap = e.alphaMap,
        this.envMap = e.envMap,
        this.envMapRotation.copy(e.envMapRotation),
        this.envMapIntensity = e.envMapIntensity,
        this.wireframe = e.wireframe,
        this.wireframeLinewidth = e.wireframeLinewidth,
        this.wireframeLinecap = e.wireframeLinecap,
        this.wireframeLinejoin = e.wireframeLinejoin,
        this.flatShading = e.flatShading,
        this.fog = e.fog,
        this
    }
}
class td extends Hi {
    constructor(e) {
        super(),
        this.isMeshDepthMaterial = !0,
        this.type = "MeshDepthMaterial",
        this.depthPacking = Xl,
        this.map = null,
        this.alphaMap = null,
        this.displacementMap = null,
        this.displacementScale = 1,
        this.displacementBias = 0,
        this.wireframe = !1,
        this.wireframeLinewidth = 1,
        this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.depthPacking = e.depthPacking,
        this.map = e.map,
        this.alphaMap = e.alphaMap,
        this.displacementMap = e.displacementMap,
        this.displacementScale = e.displacementScale,
        this.displacementBias = e.displacementBias,
        this.wireframe = e.wireframe,
        this.wireframeLinewidth = e.wireframeLinewidth,
        this
    }
}
class nd extends Hi {
    constructor(e) {
        super(),
        this.isMeshDistanceMaterial = !0,
        this.type = "MeshDistanceMaterial",
        this.map = null,
        this.alphaMap = null,
        this.displacementMap = null,
        this.displacementScale = 1,
        this.displacementBias = 0,
        this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.map = e.map,
        this.alphaMap = e.alphaMap,
        this.displacementMap = e.displacementMap,
        this.displacementScale = e.displacementScale,
        this.displacementBias = e.displacementBias,
        this
    }
}
class kc extends It {
    constructor(e, t=1) {
        super(),
        this.isLight = !0,
        this.type = "Light",
        this.color = new et(e),
        this.intensity = t
    }
    dispose() {}
    copy(e, t) {
        return super.copy(e, t),
        this.color.copy(e.color),
        this.intensity = e.intensity,
        this
    }
    toJSON(e) {
        const t = super.toJSON(e);
        return t.object.color = this.color.getHex(),
        t.object.intensity = this.intensity,
        this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()),
        this.distance !== void 0 && (t.object.distance = this.distance),
        this.angle !== void 0 && (t.object.angle = this.angle),
        this.decay !== void 0 && (t.object.decay = this.decay),
        this.penumbra !== void 0 && (t.object.penumbra = this.penumbra),
        this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()),
        this.target !== void 0 && (t.object.target = this.target.uuid),
        t
    }
}
class id extends kc {
    constructor(e, t, n) {
        super(e, n),
        this.isHemisphereLight = !0,
        this.type = "HemisphereLight",
        this.position.copy(It.DEFAULT_UP),
        this.updateMatrix(),
        this.groundColor = new et(t)
    }
    copy(e, t) {
        return super.copy(e, t),
        this.groundColor.copy(e.groundColor),
        this
    }
}
const As = new ct
  , Uo = new O
  , No = new O;
class rd {
    constructor(e) {
        this.camera = e,
        this.intensity = 1,
        this.bias = 0,
        this.normalBias = 0,
        this.radius = 1,
        this.blurSamples = 8,
        this.mapSize = new Ze(512,512),
        this.mapType = yn,
        this.map = null,
        this.mapPass = null,
        this.matrix = new ct,
        this.autoUpdate = !0,
        this.needsUpdate = !1,
        this._frustum = new Ha,
        this._frameExtents = new Ze(1,1),
        this._viewportCount = 1,
        this._viewports = [new St(0,0,1,1)]
    }
    getViewportCount() {
        return this._viewportCount
    }
    getFrustum() {
        return this._frustum
    }
    updateMatrices(e) {
        const t = this.camera
          , n = this.matrix;
        Uo.setFromMatrixPosition(e.matrixWorld),
        t.position.copy(Uo),
        No.setFromMatrixPosition(e.target.matrixWorld),
        t.lookAt(No),
        t.updateMatrixWorld(),
        As.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
        this._frustum.setFromProjectionMatrix(As, t.coordinateSystem, t.reversedDepth),
        t.reversedDepth ? n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, 1, 0, 0, 0, 0, 1) : n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1),
        n.multiply(As)
    }
    getViewport(e) {
        return this._viewports[e]
    }
    getFrameExtents() {
        return this._frameExtents
    }
    dispose() {
        this.map && this.map.dispose(),
        this.mapPass && this.mapPass.dispose()
    }
    copy(e) {
        return this.camera = e.camera.clone(),
        this.intensity = e.intensity,
        this.bias = e.bias,
        this.radius = e.radius,
        this.autoUpdate = e.autoUpdate,
        this.needsUpdate = e.needsUpdate,
        this.normalBias = e.normalBias,
        this.blurSamples = e.blurSamples,
        this.mapSize.copy(e.mapSize),
        this
    }
    clone() {
        return new this.constructor().copy(this)
    }
    toJSON() {
        const e = {};
        return this.intensity !== 1 && (e.intensity = this.intensity),
        this.bias !== 0 && (e.bias = this.bias),
        this.normalBias !== 0 && (e.normalBias = this.normalBias),
        this.radius !== 1 && (e.radius = this.radius),
        (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()),
        e.camera = this.camera.toJSON(!1).object,
        delete e.camera.matrix,
        e
    }
}
class Gc extends Nc {
    constructor(e=-1, t=1, n=1, r=-1, s=.1, a=2e3) {
        super(),
        this.isOrthographicCamera = !0,
        this.type = "OrthographicCamera",
        this.zoom = 1,
        this.view = null,
        this.left = e,
        this.right = t,
        this.top = n,
        this.bottom = r,
        this.near = s,
        this.far = a,
        this.updateProjectionMatrix()
    }
    copy(e, t) {
        return super.copy(e, t),
        this.left = e.left,
        this.right = e.right,
        this.top = e.top,
        this.bottom = e.bottom,
        this.near = e.near,
        this.far = e.far,
        this.zoom = e.zoom,
        this.view = e.view === null ? null : Object.assign({}, e.view),
        this
    }
    setViewOffset(e, t, n, r, s, a) {
        this.view === null && (this.view = {
            enabled: !0,
            fullWidth: 1,
            fullHeight: 1,
            offsetX: 0,
            offsetY: 0,
            width: 1,
            height: 1
        }),
        this.view.enabled = !0,
        this.view.fullWidth = e,
        this.view.fullHeight = t,
        this.view.offsetX = n,
        this.view.offsetY = r,
        this.view.width = s,
        this.view.height = a,
        this.updateProjectionMatrix()
    }
    clearViewOffset() {
        this.view !== null && (this.view.enabled = !1),
        this.updateProjectionMatrix()
    }
    updateProjectionMatrix() {
        const e = (this.right - this.left) / (2 * this.zoom)
          , t = (this.top - this.bottom) / (2 * this.zoom)
          , n = (this.right + this.left) / 2
          , r = (this.top + this.bottom) / 2;
        let s = n - e
          , a = n + e
          , o = r + t
          , l = r - t;
        if (this.view !== null && this.view.enabled) {
            const c = (this.right - this.left) / this.view.fullWidth / this.zoom
              , h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
            s += c * this.view.offsetX,
            a = s + c * this.view.width,
            o -= h * this.view.offsetY,
            l = o - h * this.view.height
        }
        this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far, this.coordinateSystem, this.reversedDepth),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
    }
    toJSON(e) {
        const t = super.toJSON(e);
        return t.object.zoom = this.zoom,
        t.object.left = this.left,
        t.object.right = this.right,
        t.object.top = this.top,
        t.object.bottom = this.bottom,
        t.object.near = this.near,
        t.object.far = this.far,
        this.view !== null && (t.object.view = Object.assign({}, this.view)),
        t
    }
}
class sd extends rd {
    constructor() {
        super(new Gc(-5,5,5,-5,.5,500)),
        this.isDirectionalLightShadow = !0
    }
}
class ad extends kc {
    constructor(e, t) {
        super(e, t),
        this.isDirectionalLight = !0,
        this.type = "DirectionalLight",
        this.position.copy(It.DEFAULT_UP),
        this.updateMatrix(),
        this.target = new It,
        this.shadow = new sd
    }
    dispose() {
        this.shadow.dispose()
    }
    copy(e) {
        return super.copy(e),
        this.target = e.target.clone(),
        this.shadow = e.shadow.clone(),
        this
    }
}
class od extends cn {
    constructor(e=[]) {
        super(),
        this.isArrayCamera = !0,
        this.isMultiViewCamera = !1,
        this.cameras = e
    }
}
const Fo = new ct;
class cd {
    constructor(e, t, n=0, r=1 / 0) {
        this.ray = new Va(e,t),
        this.near = n,
        this.far = r,
        this.camera = null,
        this.layers = new ka,
        this.params = {
            Mesh: {},
            Line: {
                threshold: 1
            },
            LOD: {},
            Points: {
                threshold: 1
            },
            Sprite: {}
        }
    }
    set(e, t) {
        this.ray.set(e, t)
    }
    setFromCamera(e, t) {
        t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld),
        this.ray.direction.set(e.x, e.y, .5).unproject(t).sub(this.ray.origin).normalize(),
        this.camera = t) : t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t),
        this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld),
        this.camera = t) : bt("Raycaster: Unsupported camera type: " + t.type)
    }
    setFromXRController(e) {
        return Fo.identity().extractRotation(e.matrixWorld),
        this.ray.origin.setFromMatrixPosition(e.matrixWorld),
        this.ray.direction.set(0, 0, -1).applyMatrix4(Fo),
        this
    }
    intersectObject(e, t=!0, n=[]) {
        return Sa(e, this, n, t),
        n.sort(Oo),
        n
    }
    intersectObjects(e, t=!0, n=[]) {
        for (let r = 0, s = e.length; r < s; r++)
            Sa(e[r], this, n, t);
        return n.sort(Oo),
        n
    }
}
function Oo(i, e) {
    return i.distance - e.distance
}
function Sa(i, e, t, n) {
    let r = !0;
    if (i.layers.test(e.layers) && i.raycast(e, t) === !1 && (r = !1),
    r === !0 && n === !0) {
        const s = i.children;
        for (let a = 0, o = s.length; a < o; a++)
            Sa(s[a], e, t, !0)
    }
}
function Bo(i, e, t, n) {
    const r = ld(n);
    switch (t) {
    case Tc:
        return i * e;
    case Ia:
        return i * e / r.components * r.byteLength;
    case Ua:
        return i * e / r.components * r.byteLength;
    case Na:
        return i * e * 2 / r.components * r.byteLength;
    case Fa:
        return i * e * 2 / r.components * r.byteLength;
    case Ac:
        return i * e * 3 / r.components * r.byteLength;
    case _n:
        return i * e * 4 / r.components * r.byteLength;
    case Oa:
        return i * e * 4 / r.components * r.byteLength;
    case kr:
    case Gr:
        return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Hr:
    case Wr:
        return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case $s:
    case Ks:
        return Math.max(i, 16) * Math.max(e, 8) / 4;
    case Ys:
    case js:
        return Math.max(i, 8) * Math.max(e, 8) / 2;
    case Zs:
    case Js:
        return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Qs:
        return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case ea:
        return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case ta:
        return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case na:
        return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case ia:
        return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case ra:
        return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case sa:
        return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case aa:
        return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case oa:
        return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case ca:
        return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case la:
        return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case ua:
        return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case da:
        return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case ha:
        return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case fa:
        return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    case pa:
    case ma:
    case xa:
        return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    case ga:
    case _a:
        return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case va:
    case Ma:
        return Math.ceil(i / 4) * Math.ceil(e / 4) * 16
    }
    throw new Error(`Unable to determine texture byte length for ${t} format.`)
}
function ld(i) {
    switch (i) {
    case yn:
    case bc:
        return {
            byteLength: 1,
            components: 1
        };
    case ar:
    case Sc:
    case zi:
        return {
            byteLength: 2,
            components: 1
        };
    case La:
    case Da:
        return {
            byteLength: 2,
            components: 4
        };
    case ui:
    case Pa:
    case bn:
        return {
            byteLength: 4,
            components: 1
        };
    case yc:
    case Ec:
        return {
            byteLength: 4,
            components: 3
        }
    }
    throw new Error(`Unknown texture type ${i}.`)
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{
    detail: {
        revision: Ra
    }
}));
typeof window < "u" && (window.__THREE__ ? Ye("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Ra);
function Hc() {
    let i = null
      , e = !1
      , t = null
      , n = null;
    function r(s, a) {
        t(s, a),
        n = i.requestAnimationFrame(r)
    }
    return {
        start: function() {
            e !== !0 && t !== null && (n = i.requestAnimationFrame(r),
            e = !0)
        },
        stop: function() {
            i.cancelAnimationFrame(n),
            e = !1
        },
        setAnimationLoop: function(s) {
            t = s
        },
        setContext: function(s) {
            i = s
        }
    }
}
function ud(i) {
    const e = new WeakMap;
    function t(o, l) {
        const c = o.array
          , h = o.usage
          , d = c.byteLength
          , p = i.createBuffer();
        i.bindBuffer(l, p),
        i.bufferData(l, c, h),
        o.onUploadCallback();
        let m;
        if (c instanceof Float32Array)
            m = i.FLOAT;
        else if (typeof Float16Array < "u" && c instanceof Float16Array)
            m = i.HALF_FLOAT;
        else if (c instanceof Uint16Array)
            o.isFloat16BufferAttribute ? m = i.HALF_FLOAT : m = i.UNSIGNED_SHORT;
        else if (c instanceof Int16Array)
            m = i.SHORT;
        else if (c instanceof Uint32Array)
            m = i.UNSIGNED_INT;
        else if (c instanceof Int32Array)
            m = i.INT;
        else if (c instanceof Int8Array)
            m = i.BYTE;
        else if (c instanceof Uint8Array)
            m = i.UNSIGNED_BYTE;
        else if (c instanceof Uint8ClampedArray)
            m = i.UNSIGNED_BYTE;
        else
            throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
        return {
            buffer: p,
            type: m,
            bytesPerElement: c.BYTES_PER_ELEMENT,
            version: o.version,
            size: d
        }
    }
    function n(o, l, c) {
        const h = l.array
          , d = l.updateRanges;
        if (i.bindBuffer(c, o),
        d.length === 0)
            i.bufferSubData(c, 0, h);
        else {
            d.sort( (m, g) => m.start - g.start);
            let p = 0;
            for (let m = 1; m < d.length; m++) {
                const g = d[p]
                  , _ = d[m];
                _.start <= g.start + g.count + 1 ? g.count = Math.max(g.count, _.start + _.count - g.start) : (++p,
                d[p] = _)
            }
            d.length = p + 1;
            for (let m = 0, g = d.length; m < g; m++) {
                const _ = d[m];
                i.bufferSubData(c, _.start * h.BYTES_PER_ELEMENT, h, _.start, _.count)
            }
            l.clearUpdateRanges()
        }
        l.onUploadCallback()
    }
    function r(o) {
        return o.isInterleavedBufferAttribute && (o = o.data),
        e.get(o)
    }
    function s(o) {
        o.isInterleavedBufferAttribute && (o = o.data);
        const l = e.get(o);
        l && (i.deleteBuffer(l.buffer),
        e.delete(o))
    }
    function a(o, l) {
        if (o.isInterleavedBufferAttribute && (o = o.data),
        o.isGLBufferAttribute) {
            const h = e.get(o);
            (!h || h.version < o.version) && e.set(o, {
                buffer: o.buffer,
                type: o.type,
                bytesPerElement: o.elementSize,
                version: o.version
            });
            return
        }
        const c = e.get(o);
        if (c === void 0)
            e.set(o, t(o, l));
        else if (c.version < o.version) {
            if (c.size !== o.array.byteLength)
                throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
            n(c.buffer, o, l),
            c.version = o.version
        }
    }
    return {
        get: r,
        remove: s,
        update: a
    }
}
var dd = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`
  , hd = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`
  , fd = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`
  , pd = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`
  , md = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`
  , xd = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`
  , gd = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`
  , _d = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`
  , vd = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`
  , Md = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`
  , bd = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`
  , Sd = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`
  , yd = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`
  , Ed = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`
  , Td = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`
  , Ad = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`
  , wd = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`
  , Cd = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`
  , Rd = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`
  , Pd = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`
  , Ld = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`
  , Dd = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`
  , Id = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`
  , Ud = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`
  , Nd = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`
  , Fd = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`
  , Od = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`
  , Bd = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`
  , zd = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`
  , Vd = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`
  , kd = "gl_FragColor = linearToOutputTexel( gl_FragColor );"
  , Gd = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`
  , Hd = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`
  , Wd = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`
  , Xd = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`
  , qd = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`
  , Yd = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`
  , $d = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`
  , jd = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`
  , Kd = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`
  , Zd = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`
  , Jd = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`
  , Qd = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`
  , eh = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`
  , th = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`
  , nh = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`
  , ih = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`
  , rh = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`
  , sh = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`
  , ah = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`
  , oh = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`
  , ch = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`
  , lh = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`
  , uh = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`
  , dh = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`
  , hh = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`
  , fh = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`
  , ph = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`
  , mh = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`
  , xh = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`
  , gh = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`
  , _h = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`
  , vh = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`
  , Mh = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`
  , bh = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`
  , Sh = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`
  , yh = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`
  , Eh = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`
  , Th = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`
  , Ah = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`
  , wh = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`
  , Ch = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`
  , Rh = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`
  , Ph = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`
  , Lh = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`
  , Dh = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`
  , Ih = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`
  , Uh = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`
  , Nh = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`
  , Fh = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`
  , Oh = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`
  , Bh = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`
  , zh = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`
  , Vh = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`
  , kh = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`
  , Gh = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`
  , Hh = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`
  , Wh = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`
  , Xh = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`
  , qh = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`
  , Yh = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`
  , $h = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`
  , jh = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`
  , Kh = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`
  , Zh = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`
  , Jh = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`
  , Qh = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`
  , ef = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`
  , tf = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`
  , nf = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`
  , rf = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`
  , sf = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`
  , af = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`
  , of = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`
  , cf = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`
  , lf = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`
  , uf = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const df = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`
  , hf = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`
  , ff = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`
  , pf = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`
  , mf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`
  , xf = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`
  , gf = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`
  , _f = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`
  , vf = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`
  , Mf = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`
  , bf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`
  , Sf = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`
  , yf = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`
  , Ef = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`
  , Tf = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`
  , Af = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , wf = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`
  , Cf = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , Rf = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`
  , Pf = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , Lf = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`
  , Df = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`
  , If = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`
  , Uf = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , Nf = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`
  , Ff = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , Of = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`
  , Bf = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , zf = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`
  , Vf = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`
  , kf = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`
  , Gf = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`
  , Hf = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`
  , Wf = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`
  , je = {
    alphahash_fragment: dd,
    alphahash_pars_fragment: hd,
    alphamap_fragment: fd,
    alphamap_pars_fragment: pd,
    alphatest_fragment: md,
    alphatest_pars_fragment: xd,
    aomap_fragment: gd,
    aomap_pars_fragment: _d,
    batching_pars_vertex: vd,
    batching_vertex: Md,
    begin_vertex: bd,
    beginnormal_vertex: Sd,
    bsdfs: yd,
    iridescence_fragment: Ed,
    bumpmap_pars_fragment: Td,
    clipping_planes_fragment: Ad,
    clipping_planes_pars_fragment: wd,
    clipping_planes_pars_vertex: Cd,
    clipping_planes_vertex: Rd,
    color_fragment: Pd,
    color_pars_fragment: Ld,
    color_pars_vertex: Dd,
    color_vertex: Id,
    common: Ud,
    cube_uv_reflection_fragment: Nd,
    defaultnormal_vertex: Fd,
    displacementmap_pars_vertex: Od,
    displacementmap_vertex: Bd,
    emissivemap_fragment: zd,
    emissivemap_pars_fragment: Vd,
    colorspace_fragment: kd,
    colorspace_pars_fragment: Gd,
    envmap_fragment: Hd,
    envmap_common_pars_fragment: Wd,
    envmap_pars_fragment: Xd,
    envmap_pars_vertex: qd,
    envmap_physical_pars_fragment: ih,
    envmap_vertex: Yd,
    fog_vertex: $d,
    fog_pars_vertex: jd,
    fog_fragment: Kd,
    fog_pars_fragment: Zd,
    gradientmap_pars_fragment: Jd,
    lightmap_pars_fragment: Qd,
    lights_lambert_fragment: eh,
    lights_lambert_pars_fragment: th,
    lights_pars_begin: nh,
    lights_toon_fragment: rh,
    lights_toon_pars_fragment: sh,
    lights_phong_fragment: ah,
    lights_phong_pars_fragment: oh,
    lights_physical_fragment: ch,
    lights_physical_pars_fragment: lh,
    lights_fragment_begin: uh,
    lights_fragment_maps: dh,
    lights_fragment_end: hh,
    logdepthbuf_fragment: fh,
    logdepthbuf_pars_fragment: ph,
    logdepthbuf_pars_vertex: mh,
    logdepthbuf_vertex: xh,
    map_fragment: gh,
    map_pars_fragment: _h,
    map_particle_fragment: vh,
    map_particle_pars_fragment: Mh,
    metalnessmap_fragment: bh,
    metalnessmap_pars_fragment: Sh,
    morphinstance_vertex: yh,
    morphcolor_vertex: Eh,
    morphnormal_vertex: Th,
    morphtarget_pars_vertex: Ah,
    morphtarget_vertex: wh,
    normal_fragment_begin: Ch,
    normal_fragment_maps: Rh,
    normal_pars_fragment: Ph,
    normal_pars_vertex: Lh,
    normal_vertex: Dh,
    normalmap_pars_fragment: Ih,
    clearcoat_normal_fragment_begin: Uh,
    clearcoat_normal_fragment_maps: Nh,
    clearcoat_pars_fragment: Fh,
    iridescence_pars_fragment: Oh,
    opaque_fragment: Bh,
    packing: zh,
    premultiplied_alpha_fragment: Vh,
    project_vertex: kh,
    dithering_fragment: Gh,
    dithering_pars_fragment: Hh,
    roughnessmap_fragment: Wh,
    roughnessmap_pars_fragment: Xh,
    shadowmap_pars_fragment: qh,
    shadowmap_pars_vertex: Yh,
    shadowmap_vertex: $h,
    shadowmask_pars_fragment: jh,
    skinbase_vertex: Kh,
    skinning_pars_vertex: Zh,
    skinning_vertex: Jh,
    skinnormal_vertex: Qh,
    specularmap_fragment: ef,
    specularmap_pars_fragment: tf,
    tonemapping_fragment: nf,
    tonemapping_pars_fragment: rf,
    transmission_fragment: sf,
    transmission_pars_fragment: af,
    uv_pars_fragment: of,
    uv_pars_vertex: cf,
    uv_vertex: lf,
    worldpos_vertex: uf,
    background_vert: df,
    background_frag: hf,
    backgroundCube_vert: ff,
    backgroundCube_frag: pf,
    cube_vert: mf,
    cube_frag: xf,
    depth_vert: gf,
    depth_frag: _f,
    distanceRGBA_vert: vf,
    distanceRGBA_frag: Mf,
    equirect_vert: bf,
    equirect_frag: Sf,
    linedashed_vert: yf,
    linedashed_frag: Ef,
    meshbasic_vert: Tf,
    meshbasic_frag: Af,
    meshlambert_vert: wf,
    meshlambert_frag: Cf,
    meshmatcap_vert: Rf,
    meshmatcap_frag: Pf,
    meshnormal_vert: Lf,
    meshnormal_frag: Df,
    meshphong_vert: If,
    meshphong_frag: Uf,
    meshphysical_vert: Nf,
    meshphysical_frag: Ff,
    meshtoon_vert: Of,
    meshtoon_frag: Bf,
    points_vert: zf,
    points_frag: Vf,
    shadow_vert: kf,
    shadow_frag: Gf,
    sprite_vert: Hf,
    sprite_frag: Wf
}
  , ye = {
    common: {
        diffuse: {
            value: new et(16777215)
        },
        opacity: {
            value: 1
        },
        map: {
            value: null
        },
        mapTransform: {
            value: new $e
        },
        alphaMap: {
            value: null
        },
        alphaMapTransform: {
            value: new $e
        },
        alphaTest: {
            value: 0
        }
    },
    specularmap: {
        specularMap: {
            value: null
        },
        specularMapTransform: {
            value: new $e
        }
    },
    envmap: {
        envMap: {
            value: null
        },
        envMapRotation: {
            value: new $e
        },
        flipEnvMap: {
            value: -1
        },
        reflectivity: {
            value: 1
        },
        ior: {
            value: 1.5
        },
        refractionRatio: {
            value: .98
        },
        dfgLUT: {
            value: null
        }
    },
    aomap: {
        aoMap: {
            value: null
        },
        aoMapIntensity: {
            value: 1
        },
        aoMapTransform: {
            value: new $e
        }
    },
    lightmap: {
        lightMap: {
            value: null
        },
        lightMapIntensity: {
            value: 1
        },
        lightMapTransform: {
            value: new $e
        }
    },
    bumpmap: {
        bumpMap: {
            value: null
        },
        bumpMapTransform: {
            value: new $e
        },
        bumpScale: {
            value: 1
        }
    },
    normalmap: {
        normalMap: {
            value: null
        },
        normalMapTransform: {
            value: new $e
        },
        normalScale: {
            value: new Ze(1,1)
        }
    },
    displacementmap: {
        displacementMap: {
            value: null
        },
        displacementMapTransform: {
            value: new $e
        },
        displacementScale: {
            value: 1
        },
        displacementBias: {
            value: 0
        }
    },
    emissivemap: {
        emissiveMap: {
            value: null
        },
        emissiveMapTransform: {
            value: new $e
        }
    },
    metalnessmap: {
        metalnessMap: {
            value: null
        },
        metalnessMapTransform: {
            value: new $e
        }
    },
    roughnessmap: {
        roughnessMap: {
            value: null
        },
        roughnessMapTransform: {
            value: new $e
        }
    },
    gradientmap: {
        gradientMap: {
            value: null
        }
    },
    fog: {
        fogDensity: {
            value: 25e-5
        },
        fogNear: {
            value: 1
        },
        fogFar: {
            value: 2e3
        },
        fogColor: {
            value: new et(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            value: []
        },
        lightProbe: {
            value: []
        },
        directionalLights: {
            value: [],
            properties: {
                direction: {},
                color: {}
            }
        },
        directionalLightShadows: {
            value: [],
            properties: {
                shadowIntensity: 1,
                shadowBias: {},
                shadowNormalBias: {},
                shadowRadius: {},
                shadowMapSize: {}
            }
        },
        directionalShadowMap: {
            value: []
        },
        directionalShadowMatrix: {
            value: []
        },
        spotLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                direction: {},
                distance: {},
                coneCos: {},
                penumbraCos: {},
                decay: {}
            }
        },
        spotLightShadows: {
            value: [],
            properties: {
                shadowIntensity: 1,
                shadowBias: {},
                shadowNormalBias: {},
                shadowRadius: {},
                shadowMapSize: {}
            }
        },
        spotLightMap: {
            value: []
        },
        spotShadowMap: {
            value: []
        },
        spotLightMatrix: {
            value: []
        },
        pointLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                decay: {},
                distance: {}
            }
        },
        pointLightShadows: {
            value: [],
            properties: {
                shadowIntensity: 1,
                shadowBias: {},
                shadowNormalBias: {},
                shadowRadius: {},
                shadowMapSize: {},
                shadowCameraNear: {},
                shadowCameraFar: {}
            }
        },
        pointShadowMap: {
            value: []
        },
        pointShadowMatrix: {
            value: []
        },
        hemisphereLights: {
            value: [],
            properties: {
                direction: {},
                skyColor: {},
                groundColor: {}
            }
        },
        rectAreaLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                width: {},
                height: {}
            }
        },
        ltc_1: {
            value: null
        },
        ltc_2: {
            value: null
        }
    },
    points: {
        diffuse: {
            value: new et(16777215)
        },
        opacity: {
            value: 1
        },
        size: {
            value: 1
        },
        scale: {
            value: 1
        },
        map: {
            value: null
        },
        alphaMap: {
            value: null
        },
        alphaMapTransform: {
            value: new $e
        },
        alphaTest: {
            value: 0
        },
        uvTransform: {
            value: new $e
        }
    },
    sprite: {
        diffuse: {
            value: new et(16777215)
        },
        opacity: {
            value: 1
        },
        center: {
            value: new Ze(.5,.5)
        },
        rotation: {
            value: 0
        },
        map: {
            value: null
        },
        mapTransform: {
            value: new $e
        },
        alphaMap: {
            value: null
        },
        alphaMapTransform: {
            value: new $e
        },
        alphaTest: {
            value: 0
        }
    }
}
  , Mn = {
    basic: {
        uniforms: Ht([ye.common, ye.specularmap, ye.envmap, ye.aomap, ye.lightmap, ye.fog]),
        vertexShader: je.meshbasic_vert,
        fragmentShader: je.meshbasic_frag
    },
    lambert: {
        uniforms: Ht([ye.common, ye.specularmap, ye.envmap, ye.aomap, ye.lightmap, ye.emissivemap, ye.bumpmap, ye.normalmap, ye.displacementmap, ye.fog, ye.lights, {
            emissive: {
                value: new et(0)
            }
        }]),
        vertexShader: je.meshlambert_vert,
        fragmentShader: je.meshlambert_frag
    },
    phong: {
        uniforms: Ht([ye.common, ye.specularmap, ye.envmap, ye.aomap, ye.lightmap, ye.emissivemap, ye.bumpmap, ye.normalmap, ye.displacementmap, ye.fog, ye.lights, {
            emissive: {
                value: new et(0)
            },
            specular: {
                value: new et(1118481)
            },
            shininess: {
                value: 30
            }
        }]),
        vertexShader: je.meshphong_vert,
        fragmentShader: je.meshphong_frag
    },
    standard: {
        uniforms: Ht([ye.common, ye.envmap, ye.aomap, ye.lightmap, ye.emissivemap, ye.bumpmap, ye.normalmap, ye.displacementmap, ye.roughnessmap, ye.metalnessmap, ye.fog, ye.lights, {
            emissive: {
                value: new et(0)
            },
            roughness: {
                value: 1
            },
            metalness: {
                value: 0
            },
            envMapIntensity: {
                value: 1
            }
        }]),
        vertexShader: je.meshphysical_vert,
        fragmentShader: je.meshphysical_frag
    },
    toon: {
        uniforms: Ht([ye.common, ye.aomap, ye.lightmap, ye.emissivemap, ye.bumpmap, ye.normalmap, ye.displacementmap, ye.gradientmap, ye.fog, ye.lights, {
            emissive: {
                value: new et(0)
            }
        }]),
        vertexShader: je.meshtoon_vert,
        fragmentShader: je.meshtoon_frag
    },
    matcap: {
        uniforms: Ht([ye.common, ye.bumpmap, ye.normalmap, ye.displacementmap, ye.fog, {
            matcap: {
                value: null
            }
        }]),
        vertexShader: je.meshmatcap_vert,
        fragmentShader: je.meshmatcap_frag
    },
    points: {
        uniforms: Ht([ye.points, ye.fog]),
        vertexShader: je.points_vert,
        fragmentShader: je.points_frag
    },
    dashed: {
        uniforms: Ht([ye.common, ye.fog, {
            scale: {
                value: 1
            },
            dashSize: {
                value: 1
            },
            totalSize: {
                value: 2
            }
        }]),
        vertexShader: je.linedashed_vert,
        fragmentShader: je.linedashed_frag
    },
    depth: {
        uniforms: Ht([ye.common, ye.displacementmap]),
        vertexShader: je.depth_vert,
        fragmentShader: je.depth_frag
    },
    normal: {
        uniforms: Ht([ye.common, ye.bumpmap, ye.normalmap, ye.displacementmap, {
            opacity: {
                value: 1
            }
        }]),
        vertexShader: je.meshnormal_vert,
        fragmentShader: je.meshnormal_frag
    },
    sprite: {
        uniforms: Ht([ye.sprite, ye.fog]),
        vertexShader: je.sprite_vert,
        fragmentShader: je.sprite_frag
    },
    background: {
        uniforms: {
            uvTransform: {
                value: new $e
            },
            t2D: {
                value: null
            },
            backgroundIntensity: {
                value: 1
            }
        },
        vertexShader: je.background_vert,
        fragmentShader: je.background_frag
    },
    backgroundCube: {
        uniforms: {
            envMap: {
                value: null
            },
            flipEnvMap: {
                value: -1
            },
            backgroundBlurriness: {
                value: 0
            },
            backgroundIntensity: {
                value: 1
            },
            backgroundRotation: {
                value: new $e
            }
        },
        vertexShader: je.backgroundCube_vert,
        fragmentShader: je.backgroundCube_frag
    },
    cube: {
        uniforms: {
            tCube: {
                value: null
            },
            tFlip: {
                value: -1
            },
            opacity: {
                value: 1
            }
        },
        vertexShader: je.cube_vert,
        fragmentShader: je.cube_frag
    },
    equirect: {
        uniforms: {
            tEquirect: {
                value: null
            }
        },
        vertexShader: je.equirect_vert,
        fragmentShader: je.equirect_frag
    },
    distanceRGBA: {
        uniforms: Ht([ye.common, ye.displacementmap, {
            referencePosition: {
                value: new O
            },
            nearDistance: {
                value: 1
            },
            farDistance: {
                value: 1e3
            }
        }]),
        vertexShader: je.distanceRGBA_vert,
        fragmentShader: je.distanceRGBA_frag
    },
    shadow: {
        uniforms: Ht([ye.lights, ye.fog, {
            color: {
                value: new et(0)
            },
            opacity: {
                value: 1
            }
        }]),
        vertexShader: je.shadow_vert,
        fragmentShader: je.shadow_frag
    }
};
Mn.physical = {
    uniforms: Ht([Mn.standard.uniforms, {
        clearcoat: {
            value: 0
        },
        clearcoatMap: {
            value: null
        },
        clearcoatMapTransform: {
            value: new $e
        },
        clearcoatNormalMap: {
            value: null
        },
        clearcoatNormalMapTransform: {
            value: new $e
        },
        clearcoatNormalScale: {
            value: new Ze(1,1)
        },
        clearcoatRoughness: {
            value: 0
        },
        clearcoatRoughnessMap: {
            value: null
        },
        clearcoatRoughnessMapTransform: {
            value: new $e
        },
        dispersion: {
            value: 0
        },
        iridescence: {
            value: 0
        },
        iridescenceMap: {
            value: null
        },
        iridescenceMapTransform: {
            value: new $e
        },
        iridescenceIOR: {
            value: 1.3
        },
        iridescenceThicknessMinimum: {
            value: 100
        },
        iridescenceThicknessMaximum: {
            value: 400
        },
        iridescenceThicknessMap: {
            value: null
        },
        iridescenceThicknessMapTransform: {
            value: new $e
        },
        sheen: {
            value: 0
        },
        sheenColor: {
            value: new et(0)
        },
        sheenColorMap: {
            value: null
        },
        sheenColorMapTransform: {
            value: new $e
        },
        sheenRoughness: {
            value: 1
        },
        sheenRoughnessMap: {
            value: null
        },
        sheenRoughnessMapTransform: {
            value: new $e
        },
        transmission: {
            value: 0
        },
        transmissionMap: {
            value: null
        },
        transmissionMapTransform: {
            value: new $e
        },
        transmissionSamplerSize: {
            value: new Ze
        },
        transmissionSamplerMap: {
            value: null
        },
        thickness: {
            value: 0
        },
        thicknessMap: {
            value: null
        },
        thicknessMapTransform: {
            value: new $e
        },
        attenuationDistance: {
            value: 0
        },
        attenuationColor: {
            value: new et(0)
        },
        specularColor: {
            value: new et(1,1,1)
        },
        specularColorMap: {
            value: null
        },
        specularColorMapTransform: {
            value: new $e
        },
        specularIntensity: {
            value: 1
        },
        specularIntensityMap: {
            value: null
        },
        specularIntensityMapTransform: {
            value: new $e
        },
        anisotropyVector: {
            value: new Ze
        },
        anisotropyMap: {
            value: null
        },
        anisotropyMapTransform: {
            value: new $e
        }
    }]),
    vertexShader: je.meshphysical_vert,
    fragmentShader: je.meshphysical_frag
};
const Fr = {
    r: 0,
    b: 0,
    g: 0
}
  , ii = new En
  , Xf = new ct;
function qf(i, e, t, n, r, s, a) {
    const o = new et(0);
    let l = s === !0 ? 0 : 1, c, h, d = null, p = 0, m = null;
    function g(v) {
        let T = v.isScene === !0 ? v.background : null;
        return T && T.isTexture && (T = (v.backgroundBlurriness > 0 ? t : e).get(T)),
        T
    }
    function _(v) {
        let T = !1;
        const C = g(v);
        C === null ? u(o, l) : C && C.isColor && (u(C, 1),
        T = !0);
        const E = i.xr.getEnvironmentBlendMode();
        E === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : E === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a),
        (i.autoClear || T) && (n.buffers.depth.setTest(!0),
        n.buffers.depth.setMask(!0),
        n.buffers.color.setMask(!0),
        i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil))
    }
    function f(v, T) {
        const C = g(T);
        C && (C.isCubeTexture || C.mapping === Zr) ? (h === void 0 && (h = new tn(new Wi(1,1,1),new Tn({
            name: "BackgroundCubeMaterial",
            uniforms: Bi(Mn.backgroundCube.uniforms),
            vertexShader: Mn.backgroundCube.vertexShader,
            fragmentShader: Mn.backgroundCube.fragmentShader,
            side: $t,
            depthTest: !1,
            depthWrite: !1,
            fog: !1,
            allowOverride: !1
        })),
        h.geometry.deleteAttribute("normal"),
        h.geometry.deleteAttribute("uv"),
        h.onBeforeRender = function(E, R, F) {
            this.matrixWorld.copyPosition(F.matrixWorld)
        }
        ,
        Object.defineProperty(h.material, "envMap", {
            get: function() {
                return this.uniforms.envMap.value
            }
        }),
        r.update(h)),
        ii.copy(T.backgroundRotation),
        ii.x *= -1,
        ii.y *= -1,
        ii.z *= -1,
        C.isCubeTexture && C.isRenderTargetTexture === !1 && (ii.y *= -1,
        ii.z *= -1),
        h.material.uniforms.envMap.value = C,
        h.material.uniforms.flipEnvMap.value = C.isCubeTexture && C.isRenderTargetTexture === !1 ? -1 : 1,
        h.material.uniforms.backgroundBlurriness.value = T.backgroundBlurriness,
        h.material.uniforms.backgroundIntensity.value = T.backgroundIntensity,
        h.material.uniforms.backgroundRotation.value.setFromMatrix4(Xf.makeRotationFromEuler(ii)),
        h.material.toneMapped = ot.getTransfer(C.colorSpace) !== pt,
        (d !== C || p !== C.version || m !== i.toneMapping) && (h.material.needsUpdate = !0,
        d = C,
        p = C.version,
        m = i.toneMapping),
        h.layers.enableAll(),
        v.unshift(h, h.geometry, h.material, 0, 0, null)) : C && C.isTexture && (c === void 0 && (c = new tn(new pr(2,2),new Tn({
            name: "BackgroundMaterial",
            uniforms: Bi(Mn.background.uniforms),
            vertexShader: Mn.background.vertexShader,
            fragmentShader: Mn.background.fragmentShader,
            side: jn,
            depthTest: !1,
            depthWrite: !1,
            fog: !1,
            allowOverride: !1
        })),
        c.geometry.deleteAttribute("normal"),
        Object.defineProperty(c.material, "map", {
            get: function() {
                return this.uniforms.t2D.value
            }
        }),
        r.update(c)),
        c.material.uniforms.t2D.value = C,
        c.material.uniforms.backgroundIntensity.value = T.backgroundIntensity,
        c.material.toneMapped = ot.getTransfer(C.colorSpace) !== pt,
        C.matrixAutoUpdate === !0 && C.updateMatrix(),
        c.material.uniforms.uvTransform.value.copy(C.matrix),
        (d !== C || p !== C.version || m !== i.toneMapping) && (c.material.needsUpdate = !0,
        d = C,
        p = C.version,
        m = i.toneMapping),
        c.layers.enableAll(),
        v.unshift(c, c.geometry, c.material, 0, 0, null))
    }
    function u(v, T) {
        v.getRGB(Fr, Uc(i)),
        n.buffers.color.setClear(Fr.r, Fr.g, Fr.b, T, a)
    }
    function b() {
        h !== void 0 && (h.geometry.dispose(),
        h.material.dispose(),
        h = void 0),
        c !== void 0 && (c.geometry.dispose(),
        c.material.dispose(),
        c = void 0)
    }
    return {
        getClearColor: function() {
            return o
        },
        setClearColor: function(v, T=1) {
            o.set(v),
            l = T,
            u(o, l)
        },
        getClearAlpha: function() {
            return l
        },
        setClearAlpha: function(v) {
            l = v,
            u(o, l)
        },
        render: _,
        addToRenderList: f,
        dispose: b
    }
}
function Yf(i, e) {
    const t = i.getParameter(i.MAX_VERTEX_ATTRIBS)
      , n = {}
      , r = p(null);
    let s = r
      , a = !1;
    function o(M, U, B, k, D) {
        let G = !1;
        const Y = d(k, B, U);
        s !== Y && (s = Y,
        c(s.object)),
        G = m(M, k, B, D),
        G && g(M, k, B, D),
        D !== null && e.update(D, i.ELEMENT_ARRAY_BUFFER),
        (G || a) && (a = !1,
        T(M, U, B, k),
        D !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(D).buffer))
    }
    function l() {
        return i.createVertexArray()
    }
    function c(M) {
        return i.bindVertexArray(M)
    }
    function h(M) {
        return i.deleteVertexArray(M)
    }
    function d(M, U, B) {
        const k = B.wireframe === !0;
        let D = n[M.id];
        D === void 0 && (D = {},
        n[M.id] = D);
        let G = D[U.id];
        G === void 0 && (G = {},
        D[U.id] = G);
        let Y = G[k];
        return Y === void 0 && (Y = p(l()),
        G[k] = Y),
        Y
    }
    function p(M) {
        const U = []
          , B = []
          , k = [];
        for (let D = 0; D < t; D++)
            U[D] = 0,
            B[D] = 0,
            k[D] = 0;
        return {
            geometry: null,
            program: null,
            wireframe: !1,
            newAttributes: U,
            enabledAttributes: B,
            attributeDivisors: k,
            object: M,
            attributes: {},
            index: null
        }
    }
    function m(M, U, B, k) {
        const D = s.attributes
          , G = U.attributes;
        let Y = 0;
        const te = B.getAttributes();
        for (const L in te)
            if (te[L].location >= 0) {
                const fe = D[L];
                let Se = G[L];
                if (Se === void 0 && (L === "instanceMatrix" && M.instanceMatrix && (Se = M.instanceMatrix),
                L === "instanceColor" && M.instanceColor && (Se = M.instanceColor)),
                fe === void 0 || fe.attribute !== Se || Se && fe.data !== Se.data)
                    return !0;
                Y++
            }
        return s.attributesNum !== Y || s.index !== k
    }
    function g(M, U, B, k) {
        const D = {}
          , G = U.attributes;
        let Y = 0;
        const te = B.getAttributes();
        for (const L in te)
            if (te[L].location >= 0) {
                let fe = G[L];
                fe === void 0 && (L === "instanceMatrix" && M.instanceMatrix && (fe = M.instanceMatrix),
                L === "instanceColor" && M.instanceColor && (fe = M.instanceColor));
                const Se = {};
                Se.attribute = fe,
                fe && fe.data && (Se.data = fe.data),
                D[L] = Se,
                Y++
            }
        s.attributes = D,
        s.attributesNum = Y,
        s.index = k
    }
    function _() {
        const M = s.newAttributes;
        for (let U = 0, B = M.length; U < B; U++)
            M[U] = 0
    }
    function f(M) {
        u(M, 0)
    }
    function u(M, U) {
        const B = s.newAttributes
          , k = s.enabledAttributes
          , D = s.attributeDivisors;
        B[M] = 1,
        k[M] === 0 && (i.enableVertexAttribArray(M),
        k[M] = 1),
        D[M] !== U && (i.vertexAttribDivisor(M, U),
        D[M] = U)
    }
    function b() {
        const M = s.newAttributes
          , U = s.enabledAttributes;
        for (let B = 0, k = U.length; B < k; B++)
            U[B] !== M[B] && (i.disableVertexAttribArray(B),
            U[B] = 0)
    }
    function v(M, U, B, k, D, G, Y) {
        Y === !0 ? i.vertexAttribIPointer(M, U, B, D, G) : i.vertexAttribPointer(M, U, B, k, D, G)
    }
    function T(M, U, B, k) {
        _();
        const D = k.attributes
          , G = B.getAttributes()
          , Y = U.defaultAttributeValues;
        for (const te in G) {
            const L = G[te];
            if (L.location >= 0) {
                let le = D[te];
                if (le === void 0 && (te === "instanceMatrix" && M.instanceMatrix && (le = M.instanceMatrix),
                te === "instanceColor" && M.instanceColor && (le = M.instanceColor)),
                le !== void 0) {
                    const fe = le.normalized
                      , Se = le.itemSize
                      , pe = e.get(le);
                    if (pe === void 0)
                        continue;
                    const Xe = pe.buffer
                      , it = pe.type
                      , Je = pe.bytesPerElement
                      , Q = it === i.INT || it === i.UNSIGNED_INT || le.gpuType === Pa;
                    if (le.isInterleavedBufferAttribute) {
                        const se = le.data
                          , Re = se.stride
                          , We = le.offset;
                        if (se.isInstancedInterleavedBuffer) {
                            for (let W = 0; W < L.locationSize; W++)
                                u(L.location + W, se.meshPerAttribute);
                            M.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = se.meshPerAttribute * se.count)
                        } else
                            for (let W = 0; W < L.locationSize; W++)
                                f(L.location + W);
                        i.bindBuffer(i.ARRAY_BUFFER, Xe);
                        for (let W = 0; W < L.locationSize; W++)
                            v(L.location + W, Se / L.locationSize, it, fe, Re * Je, (We + Se / L.locationSize * W) * Je, Q)
                    } else {
                        if (le.isInstancedBufferAttribute) {
                            for (let se = 0; se < L.locationSize; se++)
                                u(L.location + se, le.meshPerAttribute);
                            M.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = le.meshPerAttribute * le.count)
                        } else
                            for (let se = 0; se < L.locationSize; se++)
                                f(L.location + se);
                        i.bindBuffer(i.ARRAY_BUFFER, Xe);
                        for (let se = 0; se < L.locationSize; se++)
                            v(L.location + se, Se / L.locationSize, it, fe, Se * Je, Se / L.locationSize * se * Je, Q)
                    }
                } else if (Y !== void 0) {
                    const fe = Y[te];
                    if (fe !== void 0)
                        switch (fe.length) {
                        case 2:
                            i.vertexAttrib2fv(L.location, fe);
                            break;
                        case 3:
                            i.vertexAttrib3fv(L.location, fe);
                            break;
                        case 4:
                            i.vertexAttrib4fv(L.location, fe);
                            break;
                        default:
                            i.vertexAttrib1fv(L.location, fe)
                        }
                }
            }
        }
        b()
    }
    function C() {
        F();
        for (const M in n) {
            const U = n[M];
            for (const B in U) {
                const k = U[B];
                for (const D in k)
                    h(k[D].object),
                    delete k[D];
                delete U[B]
            }
            delete n[M]
        }
    }
    function E(M) {
        if (n[M.id] === void 0)
            return;
        const U = n[M.id];
        for (const B in U) {
            const k = U[B];
            for (const D in k)
                h(k[D].object),
                delete k[D];
            delete U[B]
        }
        delete n[M.id]
    }
    function R(M) {
        for (const U in n) {
            const B = n[U];
            if (B[M.id] === void 0)
                continue;
            const k = B[M.id];
            for (const D in k)
                h(k[D].object),
                delete k[D];
            delete B[M.id]
        }
    }
    function F() {
        S(),
        a = !0,
        s !== r && (s = r,
        c(s.object))
    }
    function S() {
        r.geometry = null,
        r.program = null,
        r.wireframe = !1
    }
    return {
        setup: o,
        reset: F,
        resetDefaultState: S,
        dispose: C,
        releaseStatesOfGeometry: E,
        releaseStatesOfProgram: R,
        initAttributes: _,
        enableAttribute: f,
        disableUnusedAttributes: b
    }
}
function $f(i, e, t) {
    let n;
    function r(c) {
        n = c
    }
    function s(c, h) {
        i.drawArrays(n, c, h),
        t.update(h, n, 1)
    }
    function a(c, h, d) {
        d !== 0 && (i.drawArraysInstanced(n, c, h, d),
        t.update(h, n, d))
    }
    function o(c, h, d) {
        if (d === 0)
            return;
        e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, d);
        let m = 0;
        for (let g = 0; g < d; g++)
            m += h[g];
        t.update(m, n, 1)
    }
    function l(c, h, d, p) {
        if (d === 0)
            return;
        const m = e.get("WEBGL_multi_draw");
        if (m === null)
            for (let g = 0; g < c.length; g++)
                a(c[g], h[g], p[g]);
        else {
            m.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, p, 0, d);
            let g = 0;
            for (let _ = 0; _ < d; _++)
                g += h[_] * p[_];
            t.update(g, n, 1)
        }
    }
    this.setMode = r,
    this.render = s,
    this.renderInstances = a,
    this.renderMultiDraw = o,
    this.renderMultiDrawInstances = l
}
function jf(i, e, t, n) {
    let r;
    function s() {
        if (r !== void 0)
            return r;
        if (e.has("EXT_texture_filter_anisotropic") === !0) {
            const R = e.get("EXT_texture_filter_anisotropic");
            r = i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
        } else
            r = 0;
        return r
    }
    function a(R) {
        return !(R !== _n && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))
    }
    function o(R) {
        const F = R === zi && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
        return !(R !== yn && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && R !== bn && !F)
    }
    function l(R) {
        if (R === "highp") {
            if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
                return "highp";
            R = "mediump"
        }
        return R === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp"
    }
    let c = t.precision !== void 0 ? t.precision : "highp";
    const h = l(c);
    h !== c && (Ye("WebGLRenderer:", c, "not supported, using", h, "instead."),
    c = h);
    const d = t.logarithmicDepthBuffer === !0
      , p = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control")
      , m = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS)
      , g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
      , _ = i.getParameter(i.MAX_TEXTURE_SIZE)
      , f = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE)
      , u = i.getParameter(i.MAX_VERTEX_ATTRIBS)
      , b = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS)
      , v = i.getParameter(i.MAX_VARYING_VECTORS)
      , T = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS)
      , C = g > 0
      , E = i.getParameter(i.MAX_SAMPLES);
    return {
        isWebGL2: !0,
        getMaxAnisotropy: s,
        getMaxPrecision: l,
        textureFormatReadable: a,
        textureTypeReadable: o,
        precision: c,
        logarithmicDepthBuffer: d,
        reversedDepthBuffer: p,
        maxTextures: m,
        maxVertexTextures: g,
        maxTextureSize: _,
        maxCubemapSize: f,
        maxAttributes: u,
        maxVertexUniforms: b,
        maxVaryings: v,
        maxFragmentUniforms: T,
        vertexTextures: C,
        maxSamples: E
    }
}
function Kf(i) {
    const e = this;
    let t = null
      , n = 0
      , r = !1
      , s = !1;
    const a = new Nn
      , o = new $e
      , l = {
        value: null,
        needsUpdate: !1
    };
    this.uniform = l,
    this.numPlanes = 0,
    this.numIntersection = 0,
    this.init = function(d, p) {
        const m = d.length !== 0 || p || n !== 0 || r;
        return r = p,
        n = d.length,
        m
    }
    ,
    this.beginShadows = function() {
        s = !0,
        h(null)
    }
    ,
    this.endShadows = function() {
        s = !1
    }
    ,
    this.setGlobalState = function(d, p) {
        t = h(d, p, 0)
    }
    ,
    this.setState = function(d, p, m) {
        const g = d.clippingPlanes
          , _ = d.clipIntersection
          , f = d.clipShadows
          , u = i.get(d);
        if (!r || g === null || g.length === 0 || s && !f)
            s ? h(null) : c();
        else {
            const b = s ? 0 : n
              , v = b * 4;
            let T = u.clippingState || null;
            l.value = T,
            T = h(g, p, v, m);
            for (let C = 0; C !== v; ++C)
                T[C] = t[C];
            u.clippingState = T,
            this.numIntersection = _ ? this.numPlanes : 0,
            this.numPlanes += b
        }
    }
    ;
    function c() {
        l.value !== t && (l.value = t,
        l.needsUpdate = n > 0),
        e.numPlanes = n,
        e.numIntersection = 0
    }
    function h(d, p, m, g) {
        const _ = d !== null ? d.length : 0;
        let f = null;
        if (_ !== 0) {
            if (f = l.value,
            g !== !0 || f === null) {
                const u = m + _ * 4
                  , b = p.matrixWorldInverse;
                o.getNormalMatrix(b),
                (f === null || f.length < u) && (f = new Float32Array(u));
                for (let v = 0, T = m; v !== _; ++v,
                T += 4)
                    a.copy(d[v]).applyMatrix4(b, o),
                    a.normal.toArray(f, T),
                    f[T + 3] = a.constant
            }
            l.value = f,
            l.needsUpdate = !0
        }
        return e.numPlanes = _,
        e.numIntersection = 0,
        f
    }
}
function Zf(i) {
    let e = new WeakMap;
    function t(a, o) {
        return o === Hs ? a.mapping = Ni : o === Ws && (a.mapping = Fi),
        a
    }
    function n(a) {
        if (a && a.isTexture) {
            const o = a.mapping;
            if (o === Hs || o === Ws)
                if (e.has(a)) {
                    const l = e.get(a).texture;
                    return t(l, a.mapping)
                } else {
                    const l = a.image;
                    if (l && l.height > 0) {
                        const c = new ku(l.height);
                        return c.fromEquirectangularTexture(i, a),
                        e.set(a, c),
                        a.addEventListener("dispose", r),
                        t(c.texture, a.mapping)
                    } else
                        return null
                }
        }
        return a
    }
    function r(a) {
        const o = a.target;
        o.removeEventListener("dispose", r);
        const l = e.get(o);
        l !== void 0 && (e.delete(o),
        l.dispose())
    }
    function s() {
        e = new WeakMap
    }
    return {
        get: n,
        dispose: s
    }
}
const Yn = 4
  , zo = [.125, .215, .35, .446, .526, .582]
  , oi = 20
  , Jf = 256
  , Qi = new Gc
  , Vo = new et;
let ws = null
  , Cs = 0
  , Rs = 0
  , Ps = !1;
const Qf = new O;
class ko {
    constructor(e) {
        this._renderer = e,
        this._pingPongRenderTarget = null,
        this._lodMax = 0,
        this._cubeSize = 0,
        this._sizeLods = [],
        this._sigmas = [],
        this._lodMeshes = [],
        this._backgroundBox = null,
        this._cubemapMaterial = null,
        this._equirectMaterial = null,
        this._blurMaterial = null,
        this._ggxMaterial = null
    }
    fromScene(e, t=0, n=.1, r=100, s={}) {
        const {size: a=256, position: o=Qf} = s;
        ws = this._renderer.getRenderTarget(),
        Cs = this._renderer.getActiveCubeFace(),
        Rs = this._renderer.getActiveMipmapLevel(),
        Ps = this._renderer.xr.enabled,
        this._renderer.xr.enabled = !1,
        this._setSize(a);
        const l = this._allocateTargets();
        return l.depthBuffer = !0,
        this._sceneToCubeUV(e, n, r, l, o),
        t > 0 && this._blur(l, 0, 0, t),
        this._applyPMREM(l),
        this._cleanup(l),
        l
    }
    fromEquirectangular(e, t=null) {
        return this._fromTexture(e, t)
    }
    fromCubemap(e, t=null) {
        return this._fromTexture(e, t)
    }
    compileCubemapShader() {
        this._cubemapMaterial === null && (this._cubemapMaterial = Wo(),
        this._compileMaterial(this._cubemapMaterial))
    }
    compileEquirectangularShader() {
        this._equirectMaterial === null && (this._equirectMaterial = Ho(),
        this._compileMaterial(this._equirectMaterial))
    }
    dispose() {
        this._dispose(),
        this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
        this._equirectMaterial !== null && this._equirectMaterial.dispose(),
        this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(),
        this._backgroundBox.material.dispose())
    }
    _setSize(e) {
        this._lodMax = Math.floor(Math.log2(e)),
        this._cubeSize = Math.pow(2, this._lodMax)
    }
    _dispose() {
        this._blurMaterial !== null && this._blurMaterial.dispose(),
        this._ggxMaterial !== null && this._ggxMaterial.dispose(),
        this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
        for (let e = 0; e < this._lodMeshes.length; e++)
            this._lodMeshes[e].geometry.dispose()
    }
    _cleanup(e) {
        this._renderer.setRenderTarget(ws, Cs, Rs),
        this._renderer.xr.enabled = Ps,
        e.scissorTest = !1,
        wi(e, 0, 0, e.width, e.height)
    }
    _fromTexture(e, t) {
        e.mapping === Ni || e.mapping === Fi ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4),
        ws = this._renderer.getRenderTarget(),
        Cs = this._renderer.getActiveCubeFace(),
        Rs = this._renderer.getActiveMipmapLevel(),
        Ps = this._renderer.xr.enabled,
        this._renderer.xr.enabled = !1;
        const n = t || this._allocateTargets();
        return this._textureToCubeUV(e, n),
        this._applyPMREM(n),
        this._cleanup(n),
        n
    }
    _allocateTargets() {
        const e = 3 * Math.max(this._cubeSize, 112)
          , t = 4 * this._cubeSize
          , n = {
            magFilter: ln,
            minFilter: ln,
            generateMipmaps: !1,
            type: zi,
            format: _n,
            colorSpace: Oi,
            depthBuffer: !1
        }
          , r = Go(e, t, n);
        if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
            this._pingPongRenderTarget !== null && this._dispose(),
            this._pingPongRenderTarget = Go(e, t, n);
            const {_lodMax: s} = this;
            ({lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas} = ep(s)),
            this._blurMaterial = np(s, e, t),
            this._ggxMaterial = tp(s, e, t)
        }
        return r
    }
    _compileMaterial(e) {
        const t = new tn(new Xt,e);
        this._renderer.compile(t, Qi)
    }
    _sceneToCubeUV(e, t, n, r, s) {
        const l = new cn(90,1,t,n)
          , c = [1, -1, 1, 1, 1, 1]
          , h = [1, 1, 1, -1, -1, -1]
          , d = this._renderer
          , p = d.autoClear
          , m = d.toneMapping;
        d.getClearColor(Vo),
        d.toneMapping = $n,
        d.autoClear = !1,
        d.state.buffers.depth.getReversed() && (d.setRenderTarget(r),
        d.clearDepth(),
        d.setRenderTarget(null)),
        this._backgroundBox === null && (this._backgroundBox = new tn(new Wi,new rr({
            name: "PMREM.Background",
            side: $t,
            depthWrite: !1,
            depthTest: !1
        })));
        const _ = this._backgroundBox
          , f = _.material;
        let u = !1;
        const b = e.background;
        b ? b.isColor && (f.color.copy(b),
        e.background = null,
        u = !0) : (f.color.copy(Vo),
        u = !0);
        for (let v = 0; v < 6; v++) {
            const T = v % 3;
            T === 0 ? (l.up.set(0, c[v], 0),
            l.position.set(s.x, s.y, s.z),
            l.lookAt(s.x + h[v], s.y, s.z)) : T === 1 ? (l.up.set(0, 0, c[v]),
            l.position.set(s.x, s.y, s.z),
            l.lookAt(s.x, s.y + h[v], s.z)) : (l.up.set(0, c[v], 0),
            l.position.set(s.x, s.y, s.z),
            l.lookAt(s.x, s.y, s.z + h[v]));
            const C = this._cubeSize;
            wi(r, T * C, v > 2 ? C : 0, C, C),
            d.setRenderTarget(r),
            u && d.render(_, l),
            d.render(e, l)
        }
        d.toneMapping = m,
        d.autoClear = p,
        e.background = b
    }
    _textureToCubeUV(e, t) {
        const n = this._renderer
          , r = e.mapping === Ni || e.mapping === Fi;
        r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Wo()),
        this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Ho());
        const s = r ? this._cubemapMaterial : this._equirectMaterial
          , a = this._lodMeshes[0];
        a.material = s;
        const o = s.uniforms;
        o.envMap.value = e;
        const l = this._cubeSize;
        wi(t, 0, 0, 3 * l, 2 * l),
        n.setRenderTarget(t),
        n.render(a, Qi)
    }
    _applyPMREM(e) {
        const t = this._renderer
          , n = t.autoClear;
        t.autoClear = !1;
        const r = this._lodMeshes.length;
        for (let s = 1; s < r; s++)
            this._applyGGXFilter(e, s - 1, s);
        t.autoClear = n
    }
    _applyGGXFilter(e, t, n) {
        const r = this._renderer
          , s = this._pingPongRenderTarget
          , a = this._ggxMaterial
          , o = this._lodMeshes[n];
        o.material = a;
        const l = a.uniforms
          , c = n / (this._lodMeshes.length - 1)
          , h = t / (this._lodMeshes.length - 1)
          , d = Math.sqrt(c * c - h * h)
          , p = .05 + c * .95
          , m = d * p
          , {_lodMax: g} = this
          , _ = this._sizeLods[n]
          , f = 3 * _ * (n > g - Yn ? n - g + Yn : 0)
          , u = 4 * (this._cubeSize - _);
        l.envMap.value = e.texture,
        l.roughness.value = m,
        l.mipInt.value = g - t,
        wi(s, f, u, 3 * _, 2 * _),
        r.setRenderTarget(s),
        r.render(o, Qi),
        l.envMap.value = s.texture,
        l.roughness.value = 0,
        l.mipInt.value = g - n,
        wi(e, f, u, 3 * _, 2 * _),
        r.setRenderTarget(e),
        r.render(o, Qi)
    }
    _blur(e, t, n, r, s) {
        const a = this._pingPongRenderTarget;
        this._halfBlur(e, a, t, n, r, "latitudinal", s),
        this._halfBlur(a, e, n, n, r, "longitudinal", s)
    }
    _halfBlur(e, t, n, r, s, a, o) {
        const l = this._renderer
          , c = this._blurMaterial;
        a !== "latitudinal" && a !== "longitudinal" && bt("blur direction must be either latitudinal or longitudinal!");
        const h = 3
          , d = this._lodMeshes[r];
        d.material = c;
        const p = c.uniforms
          , m = this._sizeLods[n] - 1
          , g = isFinite(s) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * oi - 1)
          , _ = s / g
          , f = isFinite(s) ? 1 + Math.floor(h * _) : oi;
        f > oi && Ye(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${oi}`);
        const u = [];
        let b = 0;
        for (let R = 0; R < oi; ++R) {
            const F = R / _
              , S = Math.exp(-F * F / 2);
            u.push(S),
            R === 0 ? b += S : R < f && (b += 2 * S)
        }
        for (let R = 0; R < u.length; R++)
            u[R] = u[R] / b;
        p.envMap.value = e.texture,
        p.samples.value = f,
        p.weights.value = u,
        p.latitudinal.value = a === "latitudinal",
        o && (p.poleAxis.value = o);
        const {_lodMax: v} = this;
        p.dTheta.value = g,
        p.mipInt.value = v - n;
        const T = this._sizeLods[r]
          , C = 3 * T * (r > v - Yn ? r - v + Yn : 0)
          , E = 4 * (this._cubeSize - T);
        wi(t, C, E, 3 * T, 2 * T),
        l.setRenderTarget(t),
        l.render(d, Qi)
    }
}
function ep(i) {
    const e = []
      , t = []
      , n = [];
    let r = i;
    const s = i - Yn + 1 + zo.length;
    for (let a = 0; a < s; a++) {
        const o = Math.pow(2, r);
        e.push(o);
        let l = 1 / o;
        a > i - Yn ? l = zo[a - i + Yn - 1] : a === 0 && (l = 0),
        t.push(l);
        const c = 1 / (o - 2)
          , h = -c
          , d = 1 + c
          , p = [h, h, d, h, d, d, h, h, d, d, h, d]
          , m = 6
          , g = 6
          , _ = 3
          , f = 2
          , u = 1
          , b = new Float32Array(_ * g * m)
          , v = new Float32Array(f * g * m)
          , T = new Float32Array(u * g * m);
        for (let E = 0; E < m; E++) {
            const R = E % 3 * 2 / 3 - 1
              , F = E > 2 ? 0 : -1
              , S = [R, F, 0, R + 2 / 3, F, 0, R + 2 / 3, F + 1, 0, R, F, 0, R + 2 / 3, F + 1, 0, R, F + 1, 0];
            b.set(S, _ * g * E),
            v.set(p, f * g * E);
            const M = [E, E, E, E, E, E];
            T.set(M, u * g * E)
        }
        const C = new Xt;
        C.setAttribute("position", new un(b,_)),
        C.setAttribute("uv", new un(v,f)),
        C.setAttribute("faceIndex", new un(T,u)),
        n.push(new tn(C,null)),
        r > Yn && r--
    }
    return {
        lodMeshes: n,
        sizeLods: e,
        sigmas: t
    }
}
function Go(i, e, t) {
    const n = new di(i,e,t);
    return n.texture.mapping = Zr,
    n.texture.name = "PMREM.cubeUv",
    n.scissorTest = !0,
    n
}
function wi(i, e, t, n, r) {
    i.viewport.set(e, t, n, r),
    i.scissor.set(e, t, n, r)
}
function tp(i, e, t) {
    return new Tn({
        name: "PMREMGGXConvolution",
        defines: {
            GGX_SAMPLES: Jf,
            CUBEUV_TEXEL_WIDTH: 1 / e,
            CUBEUV_TEXEL_HEIGHT: 1 / t,
            CUBEUV_MAX_MIP: `${i}.0`
        },
        uniforms: {
            envMap: {
                value: null
            },
            roughness: {
                value: 0
            },
            mipInt: {
                value: 0
            }
        },
        vertexShader: Jr(),
        fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,
        blending: On,
        depthTest: !1,
        depthWrite: !1
    })
}
function np(i, e, t) {
    const n = new Float32Array(oi)
      , r = new O(0,1,0);
    return new Tn({
        name: "SphericalGaussianBlur",
        defines: {
            n: oi,
            CUBEUV_TEXEL_WIDTH: 1 / e,
            CUBEUV_TEXEL_HEIGHT: 1 / t,
            CUBEUV_MAX_MIP: `${i}.0`
        },
        uniforms: {
            envMap: {
                value: null
            },
            samples: {
                value: 1
            },
            weights: {
                value: n
            },
            latitudinal: {
                value: !1
            },
            dTheta: {
                value: 0
            },
            mipInt: {
                value: 0
            },
            poleAxis: {
                value: r
            }
        },
        vertexShader: Jr(),
        fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
        blending: On,
        depthTest: !1,
        depthWrite: !1
    })
}
function Ho() {
    return new Tn({
        name: "EquirectangularToCubeUV",
        uniforms: {
            envMap: {
                value: null
            }
        },
        vertexShader: Jr(),
        fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
        blending: On,
        depthTest: !1,
        depthWrite: !1
    })
}
function Wo() {
    return new Tn({
        name: "CubemapToCubeUV",
        uniforms: {
            envMap: {
                value: null
            },
            flipEnvMap: {
                value: -1
            }
        },
        vertexShader: Jr(),
        fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
        blending: On,
        depthTest: !1,
        depthWrite: !1
    })
}
function Jr() {
    return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
}
function ip(i) {
    let e = new WeakMap
      , t = null;
    function n(o) {
        if (o && o.isTexture) {
            const l = o.mapping
              , c = l === Hs || l === Ws
              , h = l === Ni || l === Fi;
            if (c || h) {
                let d = e.get(o);
                const p = d !== void 0 ? d.texture.pmremVersion : 0;
                if (o.isRenderTargetTexture && o.pmremVersion !== p)
                    return t === null && (t = new ko(i)),
                    d = c ? t.fromEquirectangular(o, d) : t.fromCubemap(o, d),
                    d.texture.pmremVersion = o.pmremVersion,
                    e.set(o, d),
                    d.texture;
                if (d !== void 0)
                    return d.texture;
                {
                    const m = o.image;
                    return c && m && m.height > 0 || h && m && r(m) ? (t === null && (t = new ko(i)),
                    d = c ? t.fromEquirectangular(o) : t.fromCubemap(o),
                    d.texture.pmremVersion = o.pmremVersion,
                    e.set(o, d),
                    o.addEventListener("dispose", s),
                    d.texture) : null
                }
            }
        }
        return o
    }
    function r(o) {
        let l = 0;
        const c = 6;
        for (let h = 0; h < c; h++)
            o[h] !== void 0 && l++;
        return l === c
    }
    function s(o) {
        const l = o.target;
        l.removeEventListener("dispose", s);
        const c = e.get(l);
        c !== void 0 && (e.delete(l),
        c.dispose())
    }
    function a() {
        e = new WeakMap,
        t !== null && (t.dispose(),
        t = null)
    }
    return {
        get: n,
        dispose: a
    }
}
function rp(i) {
    const e = {};
    function t(n) {
        if (e[n] !== void 0)
            return e[n];
        const r = i.getExtension(n);
        return e[n] = r,
        r
    }
    return {
        has: function(n) {
            return t(n) !== null
        },
        init: function() {
            t("EXT_color_buffer_float"),
            t("WEBGL_clip_cull_distance"),
            t("OES_texture_float_linear"),
            t("EXT_color_buffer_half_float"),
            t("WEBGL_multisampled_render_to_texture"),
            t("WEBGL_render_shared_exponent")
        },
        get: function(n) {
            const r = t(n);
            return r === null && ur("WebGLRenderer: " + n + " extension not supported."),
            r
        }
    }
}
function sp(i, e, t, n) {
    const r = {}
      , s = new WeakMap;
    function a(d) {
        const p = d.target;
        p.index !== null && e.remove(p.index);
        for (const g in p.attributes)
            e.remove(p.attributes[g]);
        p.removeEventListener("dispose", a),
        delete r[p.id];
        const m = s.get(p);
        m && (e.remove(m),
        s.delete(p)),
        n.releaseStatesOfGeometry(p),
        p.isInstancedBufferGeometry === !0 && delete p._maxInstanceCount,
        t.memory.geometries--
    }
    function o(d, p) {
        return r[p.id] === !0 || (p.addEventListener("dispose", a),
        r[p.id] = !0,
        t.memory.geometries++),
        p
    }
    function l(d) {
        const p = d.attributes;
        for (const m in p)
            e.update(p[m], i.ARRAY_BUFFER)
    }
    function c(d) {
        const p = []
          , m = d.index
          , g = d.attributes.position;
        let _ = 0;
        if (m !== null) {
            const b = m.array;
            _ = m.version;
            for (let v = 0, T = b.length; v < T; v += 3) {
                const C = b[v + 0]
                  , E = b[v + 1]
                  , R = b[v + 2];
                p.push(C, E, E, R, R, C)
            }
        } else if (g !== void 0) {
            const b = g.array;
            _ = g.version;
            for (let v = 0, T = b.length / 3 - 1; v < T; v += 3) {
                const C = v + 0
                  , E = v + 1
                  , R = v + 2;
                p.push(C, E, E, R, R, C)
            }
        } else
            return;
        const f = new (Rc(p) ? Ic : Dc)(p,1);
        f.version = _;
        const u = s.get(d);
        u && e.remove(u),
        s.set(d, f)
    }
    function h(d) {
        const p = s.get(d);
        if (p) {
            const m = d.index;
            m !== null && p.version < m.version && c(d)
        } else
            c(d);
        return s.get(d)
    }
    return {
        get: o,
        update: l,
        getWireframeAttribute: h
    }
}
function ap(i, e, t) {
    let n;
    function r(p) {
        n = p
    }
    let s, a;
    function o(p) {
        s = p.type,
        a = p.bytesPerElement
    }
    function l(p, m) {
        i.drawElements(n, m, s, p * a),
        t.update(m, n, 1)
    }
    function c(p, m, g) {
        g !== 0 && (i.drawElementsInstanced(n, m, s, p * a, g),
        t.update(m, n, g))
    }
    function h(p, m, g) {
        if (g === 0)
            return;
        e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, m, 0, s, p, 0, g);
        let f = 0;
        for (let u = 0; u < g; u++)
            f += m[u];
        t.update(f, n, 1)
    }
    function d(p, m, g, _) {
        if (g === 0)
            return;
        const f = e.get("WEBGL_multi_draw");
        if (f === null)
            for (let u = 0; u < p.length; u++)
                c(p[u] / a, m[u], _[u]);
        else {
            f.multiDrawElementsInstancedWEBGL(n, m, 0, s, p, 0, _, 0, g);
            let u = 0;
            for (let b = 0; b < g; b++)
                u += m[b] * _[b];
            t.update(u, n, 1)
        }
    }
    this.setMode = r,
    this.setIndex = o,
    this.render = l,
    this.renderInstances = c,
    this.renderMultiDraw = h,
    this.renderMultiDrawInstances = d
}
function op(i) {
    const e = {
        geometries: 0,
        textures: 0
    }
      , t = {
        frame: 0,
        calls: 0,
        triangles: 0,
        points: 0,
        lines: 0
    };
    function n(s, a, o) {
        switch (t.calls++,
        a) {
        case i.TRIANGLES:
            t.triangles += o * (s / 3);
            break;
        case i.LINES:
            t.lines += o * (s / 2);
            break;
        case i.LINE_STRIP:
            t.lines += o * (s - 1);
            break;
        case i.LINE_LOOP:
            t.lines += o * s;
            break;
        case i.POINTS:
            t.points += o * s;
            break;
        default:
            bt("WebGLInfo: Unknown draw mode:", a);
            break
        }
    }
    function r() {
        t.calls = 0,
        t.triangles = 0,
        t.points = 0,
        t.lines = 0
    }
    return {
        memory: e,
        render: t,
        programs: null,
        autoReset: !0,
        reset: r,
        update: n
    }
}
function cp(i, e, t) {
    const n = new WeakMap
      , r = new St;
    function s(a, o, l) {
        const c = a.morphTargetInfluences
          , h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color
          , d = h !== void 0 ? h.length : 0;
        let p = n.get(o);
        if (p === void 0 || p.count !== d) {
            let M = function() {
                F.dispose(),
                n.delete(o),
                o.removeEventListener("dispose", M)
            };
            var m = M;
            p !== void 0 && p.texture.dispose();
            const g = o.morphAttributes.position !== void 0
              , _ = o.morphAttributes.normal !== void 0
              , f = o.morphAttributes.color !== void 0
              , u = o.morphAttributes.position || []
              , b = o.morphAttributes.normal || []
              , v = o.morphAttributes.color || [];
            let T = 0;
            g === !0 && (T = 1),
            _ === !0 && (T = 2),
            f === !0 && (T = 3);
            let C = o.attributes.position.count * T
              , E = 1;
            C > e.maxTextureSize && (E = Math.ceil(C / e.maxTextureSize),
            C = e.maxTextureSize);
            const R = new Float32Array(C * E * 4 * d)
              , F = new Pc(R,C,E,d);
            F.type = bn,
            F.needsUpdate = !0;
            const S = T * 4;
            for (let U = 0; U < d; U++) {
                const B = u[U]
                  , k = b[U]
                  , D = v[U]
                  , G = C * E * 4 * U;
                for (let Y = 0; Y < B.count; Y++) {
                    const te = Y * S;
                    g === !0 && (r.fromBufferAttribute(B, Y),
                    R[G + te + 0] = r.x,
                    R[G + te + 1] = r.y,
                    R[G + te + 2] = r.z,
                    R[G + te + 3] = 0),
                    _ === !0 && (r.fromBufferAttribute(k, Y),
                    R[G + te + 4] = r.x,
                    R[G + te + 5] = r.y,
                    R[G + te + 6] = r.z,
                    R[G + te + 7] = 0),
                    f === !0 && (r.fromBufferAttribute(D, Y),
                    R[G + te + 8] = r.x,
                    R[G + te + 9] = r.y,
                    R[G + te + 10] = r.z,
                    R[G + te + 11] = D.itemSize === 4 ? r.w : 1)
                }
            }
            p = {
                count: d,
                texture: F,
                size: new Ze(C,E)
            },
            n.set(o, p),
            o.addEventListener("dispose", M)
        }
        if (a.isInstancedMesh === !0 && a.morphTexture !== null)
            l.getUniforms().setValue(i, "morphTexture", a.morphTexture, t);
        else {
            let g = 0;
            for (let f = 0; f < c.length; f++)
                g += c[f];
            const _ = o.morphTargetsRelative ? 1 : 1 - g;
            l.getUniforms().setValue(i, "morphTargetBaseInfluence", _),
            l.getUniforms().setValue(i, "morphTargetInfluences", c)
        }
        l.getUniforms().setValue(i, "morphTargetsTexture", p.texture, t),
        l.getUniforms().setValue(i, "morphTargetsTextureSize", p.size)
    }
    return {
        update: s
    }
}
function lp(i, e, t, n) {
    let r = new WeakMap;
    function s(l) {
        const c = n.render.frame
          , h = l.geometry
          , d = e.get(l, h);
        if (r.get(d) !== c && (e.update(d),
        r.set(d, c)),
        l.isInstancedMesh && (l.hasEventListener("dispose", o) === !1 && l.addEventListener("dispose", o),
        r.get(l) !== c && (t.update(l.instanceMatrix, i.ARRAY_BUFFER),
        l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER),
        r.set(l, c))),
        l.isSkinnedMesh) {
            const p = l.skeleton;
            r.get(p) !== c && (p.update(),
            r.set(p, c))
        }
        return d
    }
    function a() {
        r = new WeakMap
    }
    function o(l) {
        const c = l.target;
        c.removeEventListener("dispose", o),
        t.remove(c.instanceMatrix),
        c.instanceColor !== null && t.remove(c.instanceColor)
    }
    return {
        update: s,
        dispose: a
    }
}
const Wc = new Wt
  , Xo = new zc(1,1)
  , Xc = new Pc
  , qc = new Eu
  , Yc = new Fc
  , qo = []
  , Yo = []
  , $o = new Float32Array(16)
  , jo = new Float32Array(9)
  , Ko = new Float32Array(4);
function Xi(i, e, t) {
    const n = i[0];
    if (n <= 0 || n > 0)
        return i;
    const r = e * t;
    let s = qo[r];
    if (s === void 0 && (s = new Float32Array(r),
    qo[r] = s),
    e !== 0) {
        n.toArray(s, 0);
        for (let a = 1, o = 0; a !== e; ++a)
            o += t,
            i[a].toArray(s, o)
    }
    return s
}
function Rt(i, e) {
    if (i.length !== e.length)
        return !1;
    for (let t = 0, n = i.length; t < n; t++)
        if (i[t] !== e[t])
            return !1;
    return !0
}
function Pt(i, e) {
    for (let t = 0, n = e.length; t < n; t++)
        i[t] = e[t]
}
function Qr(i, e) {
    let t = Yo[e];
    t === void 0 && (t = new Int32Array(e),
    Yo[e] = t);
    for (let n = 0; n !== e; ++n)
        t[n] = i.allocateTextureUnit();
    return t
}
function up(i, e) {
    const t = this.cache;
    t[0] !== e && (i.uniform1f(this.addr, e),
    t[0] = e)
}
function dp(i, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y),
        t[0] = e.x,
        t[1] = e.y);
    else {
        if (Rt(t, e))
            return;
        i.uniform2fv(this.addr, e),
        Pt(t, e)
    }
}
function hp(i, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z);
    else if (e.r !== void 0)
        (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b),
        t[0] = e.r,
        t[1] = e.g,
        t[2] = e.b);
    else {
        if (Rt(t, e))
            return;
        i.uniform3fv(this.addr, e),
        Pt(t, e)
    }
}
function fp(i, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z,
        t[3] = e.w);
    else {
        if (Rt(t, e))
            return;
        i.uniform4fv(this.addr, e),
        Pt(t, e)
    }
}
function pp(i, e) {
    const t = this.cache
      , n = e.elements;
    if (n === void 0) {
        if (Rt(t, e))
            return;
        i.uniformMatrix2fv(this.addr, !1, e),
        Pt(t, e)
    } else {
        if (Rt(t, n))
            return;
        Ko.set(n),
        i.uniformMatrix2fv(this.addr, !1, Ko),
        Pt(t, n)
    }
}
function mp(i, e) {
    const t = this.cache
      , n = e.elements;
    if (n === void 0) {
        if (Rt(t, e))
            return;
        i.uniformMatrix3fv(this.addr, !1, e),
        Pt(t, e)
    } else {
        if (Rt(t, n))
            return;
        jo.set(n),
        i.uniformMatrix3fv(this.addr, !1, jo),
        Pt(t, n)
    }
}
function xp(i, e) {
    const t = this.cache
      , n = e.elements;
    if (n === void 0) {
        if (Rt(t, e))
            return;
        i.uniformMatrix4fv(this.addr, !1, e),
        Pt(t, e)
    } else {
        if (Rt(t, n))
            return;
        $o.set(n),
        i.uniformMatrix4fv(this.addr, !1, $o),
        Pt(t, n)
    }
}
function gp(i, e) {
    const t = this.cache;
    t[0] !== e && (i.uniform1i(this.addr, e),
    t[0] = e)
}
function _p(i, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y),
        t[0] = e.x,
        t[1] = e.y);
    else {
        if (Rt(t, e))
            return;
        i.uniform2iv(this.addr, e),
        Pt(t, e)
    }
}
function vp(i, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z);
    else {
        if (Rt(t, e))
            return;
        i.uniform3iv(this.addr, e),
        Pt(t, e)
    }
}
function Mp(i, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z,
        t[3] = e.w);
    else {
        if (Rt(t, e))
            return;
        i.uniform4iv(this.addr, e),
        Pt(t, e)
    }
}
function bp(i, e) {
    const t = this.cache;
    t[0] !== e && (i.uniform1ui(this.addr, e),
    t[0] = e)
}
function Sp(i, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y),
        t[0] = e.x,
        t[1] = e.y);
    else {
        if (Rt(t, e))
            return;
        i.uniform2uiv(this.addr, e),
        Pt(t, e)
    }
}
function yp(i, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z);
    else {
        if (Rt(t, e))
            return;
        i.uniform3uiv(this.addr, e),
        Pt(t, e)
    }
}
function Ep(i, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z,
        t[3] = e.w);
    else {
        if (Rt(t, e))
            return;
        i.uniform4uiv(this.addr, e),
        Pt(t, e)
    }
}
function Tp(i, e, t) {
    const n = this.cache
      , r = t.allocateTextureUnit();
    n[0] !== r && (i.uniform1i(this.addr, r),
    n[0] = r);
    let s;
    this.type === i.SAMPLER_2D_SHADOW ? (Xo.compareFunction = Cc,
    s = Xo) : s = Wc,
    t.setTexture2D(e || s, r)
}
function Ap(i, e, t) {
    const n = this.cache
      , r = t.allocateTextureUnit();
    n[0] !== r && (i.uniform1i(this.addr, r),
    n[0] = r),
    t.setTexture3D(e || qc, r)
}
function wp(i, e, t) {
    const n = this.cache
      , r = t.allocateTextureUnit();
    n[0] !== r && (i.uniform1i(this.addr, r),
    n[0] = r),
    t.setTextureCube(e || Yc, r)
}
function Cp(i, e, t) {
    const n = this.cache
      , r = t.allocateTextureUnit();
    n[0] !== r && (i.uniform1i(this.addr, r),
    n[0] = r),
    t.setTexture2DArray(e || Xc, r)
}
function Rp(i) {
    switch (i) {
    case 5126:
        return up;
    case 35664:
        return dp;
    case 35665:
        return hp;
    case 35666:
        return fp;
    case 35674:
        return pp;
    case 35675:
        return mp;
    case 35676:
        return xp;
    case 5124:
    case 35670:
        return gp;
    case 35667:
    case 35671:
        return _p;
    case 35668:
    case 35672:
        return vp;
    case 35669:
    case 35673:
        return Mp;
    case 5125:
        return bp;
    case 36294:
        return Sp;
    case 36295:
        return yp;
    case 36296:
        return Ep;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
        return Tp;
    case 35679:
    case 36299:
    case 36307:
        return Ap;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
        return wp;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
        return Cp
    }
}
function Pp(i, e) {
    i.uniform1fv(this.addr, e)
}
function Lp(i, e) {
    const t = Xi(e, this.size, 2);
    i.uniform2fv(this.addr, t)
}
function Dp(i, e) {
    const t = Xi(e, this.size, 3);
    i.uniform3fv(this.addr, t)
}
function Ip(i, e) {
    const t = Xi(e, this.size, 4);
    i.uniform4fv(this.addr, t)
}
function Up(i, e) {
    const t = Xi(e, this.size, 4);
    i.uniformMatrix2fv(this.addr, !1, t)
}
function Np(i, e) {
    const t = Xi(e, this.size, 9);
    i.uniformMatrix3fv(this.addr, !1, t)
}
function Fp(i, e) {
    const t = Xi(e, this.size, 16);
    i.uniformMatrix4fv(this.addr, !1, t)
}
function Op(i, e) {
    i.uniform1iv(this.addr, e)
}
function Bp(i, e) {
    i.uniform2iv(this.addr, e)
}
function zp(i, e) {
    i.uniform3iv(this.addr, e)
}
function Vp(i, e) {
    i.uniform4iv(this.addr, e)
}
function kp(i, e) {
    i.uniform1uiv(this.addr, e)
}
function Gp(i, e) {
    i.uniform2uiv(this.addr, e)
}
function Hp(i, e) {
    i.uniform3uiv(this.addr, e)
}
function Wp(i, e) {
    i.uniform4uiv(this.addr, e)
}
function Xp(i, e, t) {
    const n = this.cache
      , r = e.length
      , s = Qr(t, r);
    Rt(n, s) || (i.uniform1iv(this.addr, s),
    Pt(n, s));
    for (let a = 0; a !== r; ++a)
        t.setTexture2D(e[a] || Wc, s[a])
}
function qp(i, e, t) {
    const n = this.cache
      , r = e.length
      , s = Qr(t, r);
    Rt(n, s) || (i.uniform1iv(this.addr, s),
    Pt(n, s));
    for (let a = 0; a !== r; ++a)
        t.setTexture3D(e[a] || qc, s[a])
}
function Yp(i, e, t) {
    const n = this.cache
      , r = e.length
      , s = Qr(t, r);
    Rt(n, s) || (i.uniform1iv(this.addr, s),
    Pt(n, s));
    for (let a = 0; a !== r; ++a)
        t.setTextureCube(e[a] || Yc, s[a])
}
function $p(i, e, t) {
    const n = this.cache
      , r = e.length
      , s = Qr(t, r);
    Rt(n, s) || (i.uniform1iv(this.addr, s),
    Pt(n, s));
    for (let a = 0; a !== r; ++a)
        t.setTexture2DArray(e[a] || Xc, s[a])
}
function jp(i) {
    switch (i) {
    case 5126:
        return Pp;
    case 35664:
        return Lp;
    case 35665:
        return Dp;
    case 35666:
        return Ip;
    case 35674:
        return Up;
    case 35675:
        return Np;
    case 35676:
        return Fp;
    case 5124:
    case 35670:
        return Op;
    case 35667:
    case 35671:
        return Bp;
    case 35668:
    case 35672:
        return zp;
    case 35669:
    case 35673:
        return Vp;
    case 5125:
        return kp;
    case 36294:
        return Gp;
    case 36295:
        return Hp;
    case 36296:
        return Wp;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
        return Xp;
    case 35679:
    case 36299:
    case 36307:
        return qp;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
        return Yp;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
        return $p
    }
}
class Kp {
    constructor(e, t, n) {
        this.id = e,
        this.addr = n,
        this.cache = [],
        this.type = t.type,
        this.setValue = Rp(t.type)
    }
}
class Zp {
    constructor(e, t, n) {
        this.id = e,
        this.addr = n,
        this.cache = [],
        this.type = t.type,
        this.size = t.size,
        this.setValue = jp(t.type)
    }
}
class Jp {
    constructor(e) {
        this.id = e,
        this.seq = [],
        this.map = {}
    }
    setValue(e, t, n) {
        const r = this.seq;
        for (let s = 0, a = r.length; s !== a; ++s) {
            const o = r[s];
            o.setValue(e, t[o.id], n)
        }
    }
}
const Ls = /(\w+)(\])?(\[|\.)?/g;
function Zo(i, e) {
    i.seq.push(e),
    i.map[e.id] = e
}
function Qp(i, e, t) {
    const n = i.name
      , r = n.length;
    for (Ls.lastIndex = 0; ; ) {
        const s = Ls.exec(n)
          , a = Ls.lastIndex;
        let o = s[1];
        const l = s[2] === "]"
          , c = s[3];
        if (l && (o = o | 0),
        c === void 0 || c === "[" && a + 2 === r) {
            Zo(t, c === void 0 ? new Kp(o,i,e) : new Zp(o,i,e));
            break
        } else {
            let d = t.map[o];
            d === void 0 && (d = new Jp(o),
            Zo(t, d)),
            t = d
        }
    }
}
class Xr {
    constructor(e, t) {
        this.seq = [],
        this.map = {};
        const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
        for (let r = 0; r < n; ++r) {
            const s = e.getActiveUniform(t, r)
              , a = e.getUniformLocation(t, s.name);
            Qp(s, a, this)
        }
    }
    setValue(e, t, n, r) {
        const s = this.map[t];
        s !== void 0 && s.setValue(e, n, r)
    }
    setOptional(e, t, n) {
        const r = t[n];
        r !== void 0 && this.setValue(e, n, r)
    }
    static upload(e, t, n, r) {
        for (let s = 0, a = t.length; s !== a; ++s) {
            const o = t[s]
              , l = n[o.id];
            l.needsUpdate !== !1 && o.setValue(e, l.value, r)
        }
    }
    static seqWithValue(e, t) {
        const n = [];
        for (let r = 0, s = e.length; r !== s; ++r) {
            const a = e[r];
            a.id in t && n.push(a)
        }
        return n
    }
}
function Jo(i, e, t) {
    const n = i.createShader(e);
    return i.shaderSource(n, t),
    i.compileShader(n),
    n
}
const e0 = 37297;
let t0 = 0;
function n0(i, e) {
    const t = i.split(`
`)
      , n = []
      , r = Math.max(e - 6, 0)
      , s = Math.min(e + 6, t.length);
    for (let a = r; a < s; a++) {
        const o = a + 1;
        n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`)
    }
    return n.join(`
`)
}
const Qo = new $e;
function i0(i) {
    ot._getMatrix(Qo, ot.workingColorSpace, i);
    const e = `mat3( ${Qo.elements.map(t => t.toFixed(4))} )`;
    switch (ot.getTransfer(i)) {
    case qr:
        return [e, "LinearTransferOETF"];
    case pt:
        return [e, "sRGBTransferOETF"];
    default:
        return Ye("WebGLProgram: Unsupported color space: ", i),
        [e, "LinearTransferOETF"]
    }
}
function ec(i, e, t) {
    const n = i.getShaderParameter(e, i.COMPILE_STATUS)
      , s = (i.getShaderInfoLog(e) || "").trim();
    if (n && s === "")
        return "";
    const a = /ERROR: 0:(\d+)/.exec(s);
    if (a) {
        const o = parseInt(a[1]);
        return t.toUpperCase() + `

` + s + `

` + n0(i.getShaderSource(e), o)
    } else
        return s
}
function r0(i, e) {
    const t = i0(e);
    return [`vec4 ${i}( vec4 value ) {`, `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`, "}"].join(`
`)
}
function s0(i, e) {
    let t;
    switch (e) {
    case Bl:
        t = "Linear";
        break;
    case zl:
        t = "Reinhard";
        break;
    case Vl:
        t = "Cineon";
        break;
    case vc:
        t = "ACESFilmic";
        break;
    case Gl:
        t = "AgX";
        break;
    case Hl:
        t = "Neutral";
        break;
    case kl:
        t = "Custom";
        break;
    default:
        Ye("WebGLProgram: Unsupported toneMapping:", e),
        t = "Linear"
    }
    return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }"
}
const Or = new O;
function a0() {
    ot.getLuminanceCoefficients(Or);
    const i = Or.x.toFixed(4)
      , e = Or.y.toFixed(4)
      , t = Or.z.toFixed(4);
    return ["float luminance( const in vec3 rgb ) {", `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`, "	return dot( weights, rgb );", "}"].join(`
`)
}
function o0(i) {
    return [i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(er).join(`
`)
}
function c0(i) {
    const e = [];
    for (const t in i) {
        const n = i[t];
        n !== !1 && e.push("#define " + t + " " + n)
    }
    return e.join(`
`)
}
function l0(i, e) {
    const t = {}
      , n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
    for (let r = 0; r < n; r++) {
        const s = i.getActiveAttrib(e, r)
          , a = s.name;
        let o = 1;
        s.type === i.FLOAT_MAT2 && (o = 2),
        s.type === i.FLOAT_MAT3 && (o = 3),
        s.type === i.FLOAT_MAT4 && (o = 4),
        t[a] = {
            type: s.type,
            location: i.getAttribLocation(e, a),
            locationSize: o
        }
    }
    return t
}
function er(i) {
    return i !== ""
}
function tc(i, e) {
    const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
    return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows)
}
function nc(i, e) {
    return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection)
}
const u0 = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ya(i) {
    return i.replace(u0, h0)
}
const d0 = new Map;
function h0(i, e) {
    let t = je[e];
    if (t === void 0) {
        const n = d0.get(e);
        if (n !== void 0)
            t = je[n],
            Ye('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
        else
            throw new Error("Can not resolve #include <" + e + ">")
    }
    return ya(t)
}
const f0 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function ic(i) {
    return i.replace(f0, p0)
}
function p0(i, e, t, n) {
    let r = "";
    for (let s = parseInt(e); s < parseInt(t); s++)
        r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
    return r
}
function rc(i) {
    let e = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
    return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`),
    e
}
function m0(i) {
    let e = "SHADOWMAP_TYPE_BASIC";
    return i.shadowMapType === gc ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === gl ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === Un && (e = "SHADOWMAP_TYPE_VSM"),
    e
}
function x0(i) {
    let e = "ENVMAP_TYPE_CUBE";
    if (i.envMap)
        switch (i.envMapMode) {
        case Ni:
        case Fi:
            e = "ENVMAP_TYPE_CUBE";
            break;
        case Zr:
            e = "ENVMAP_TYPE_CUBE_UV";
            break
        }
    return e
}
function g0(i) {
    let e = "ENVMAP_MODE_REFLECTION";
    return i.envMap && i.envMapMode === Fi && (e = "ENVMAP_MODE_REFRACTION"),
    e
}
function _0(i) {
    let e = "ENVMAP_BLENDING_NONE";
    if (i.envMap)
        switch (i.combine) {
        case _c:
            e = "ENVMAP_BLENDING_MULTIPLY";
            break;
        case Fl:
            e = "ENVMAP_BLENDING_MIX";
            break;
        case Ol:
            e = "ENVMAP_BLENDING_ADD";
            break
        }
    return e
}
function v0(i) {
    const e = i.envMapCubeUVHeight;
    if (e === null)
        return null;
    const t = Math.log2(e) - 2
      , n = 1 / e;
    return {
        texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)),
        texelHeight: n,
        maxMip: t
    }
}
function M0(i, e, t, n) {
    const r = i.getContext()
      , s = t.defines;
    let a = t.vertexShader
      , o = t.fragmentShader;
    const l = m0(t)
      , c = x0(t)
      , h = g0(t)
      , d = _0(t)
      , p = v0(t)
      , m = o0(t)
      , g = c0(s)
      , _ = r.createProgram();
    let f, u, b = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
    t.isRawShaderMaterial ? (f = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g].filter(er).join(`
`),
    f.length > 0 && (f += `
`),
    u = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g].filter(er).join(`
`),
    u.length > 0 && (u += `
`)) : (f = [rc(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g, t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", t.batching ? "#define USE_BATCHING" : "", t.batchingColor ? "#define USE_BATCHING_COLOR" : "", t.instancing ? "#define USE_INSTANCING" : "", t.instancingColor ? "#define USE_INSTANCING_COLOR" : "", t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.map ? "#define USE_MAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + h : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.anisotropy ? "#define USE_ANISOTROPY" : "", t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaHash ? "#define USE_ALPHAHASH" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", t.mapUv ? "#define MAP_UV " + t.mapUv : "", t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "", t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "", t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "", t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "", t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "", t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "", t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "", t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "", t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "", t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "", t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "", t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "", t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "", t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "", t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "", t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "", t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "", t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "", t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "", t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "", t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "", t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "", t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "", t.vertexColors ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUv1s ? "#define USE_UV1" : "", t.vertexUv2s ? "#define USE_UV2" : "", t.vertexUv3s ? "#define USE_UV3" : "", t.pointsUvs ? "#define USE_POINTS_UV" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.skinning ? "#define USE_SKINNING" : "", t.morphTargets ? "#define USE_MORPHTARGETS" : "", t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "", t.morphColors ? "#define USE_MORPHCOLORS" : "", t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "", t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + l : "", t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(er).join(`
`),
    u = [rc(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g, t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", t.map ? "#define USE_MAP" : "", t.matcap ? "#define USE_MATCAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + c : "", t.envMap ? "#define " + h : "", t.envMap ? "#define " + d : "", p ? "#define CUBEUV_TEXEL_WIDTH " + p.texelWidth : "", p ? "#define CUBEUV_TEXEL_HEIGHT " + p.texelHeight : "", p ? "#define CUBEUV_MAX_MIP " + p.maxMip + ".0" : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.anisotropy ? "#define USE_ANISOTROPY" : "", t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", t.clearcoat ? "#define USE_CLEARCOAT" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.dispersion ? "#define USE_DISPERSION" : "", t.iridescence ? "#define USE_IRIDESCENCE" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaTest ? "#define USE_ALPHATEST" : "", t.alphaHash ? "#define USE_ALPHAHASH" : "", t.sheen ? "#define USE_SHEEN" : "", t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "", t.vertexColors || t.instancingColor || t.batchingColor ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUv1s ? "#define USE_UV1" : "", t.vertexUv2s ? "#define USE_UV2" : "", t.vertexUv3s ? "#define USE_UV3" : "", t.pointsUvs ? "#define USE_POINTS_UV" : "", t.gradientMap ? "#define USE_GRADIENTMAP" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + l : "", t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", t.toneMapping !== $n ? "#define TONE_MAPPING" : "", t.toneMapping !== $n ? je.tonemapping_pars_fragment : "", t.toneMapping !== $n ? s0("toneMapping", t.toneMapping) : "", t.dithering ? "#define DITHERING" : "", t.opaque ? "#define OPAQUE" : "", je.colorspace_pars_fragment, r0("linearToOutputTexel", t.outputColorSpace), a0(), t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "", `
`].filter(er).join(`
`)),
    a = ya(a),
    a = tc(a, t),
    a = nc(a, t),
    o = ya(o),
    o = tc(o, t),
    o = nc(o, t),
    a = ic(a),
    o = ic(o),
    t.isRawShaderMaterial !== !0 && (b = `#version 300 es
`,
    f = [m, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + f,
    u = ["#define varying in", t.glslVersion === oo ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", t.glslVersion === oo ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
` + u);
    const v = b + f + a
      , T = b + u + o
      , C = Jo(r, r.VERTEX_SHADER, v)
      , E = Jo(r, r.FRAGMENT_SHADER, T);
    r.attachShader(_, C),
    r.attachShader(_, E),
    t.index0AttributeName !== void 0 ? r.bindAttribLocation(_, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(_, 0, "position"),
    r.linkProgram(_);
    function R(U) {
        if (i.debug.checkShaderErrors) {
            const B = r.getProgramInfoLog(_) || ""
              , k = r.getShaderInfoLog(C) || ""
              , D = r.getShaderInfoLog(E) || ""
              , G = B.trim()
              , Y = k.trim()
              , te = D.trim();
            let L = !0
              , le = !0;
            if (r.getProgramParameter(_, r.LINK_STATUS) === !1)
                if (L = !1,
                typeof i.debug.onShaderError == "function")
                    i.debug.onShaderError(r, _, C, E);
                else {
                    const fe = ec(r, C, "vertex")
                      , Se = ec(r, E, "fragment");
                    bt("THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(_, r.VALIDATE_STATUS) + `

Material Name: ` + U.name + `
Material Type: ` + U.type + `

Program Info Log: ` + G + `
` + fe + `
` + Se)
                }
            else
                G !== "" ? Ye("WebGLProgram: Program Info Log:", G) : (Y === "" || te === "") && (le = !1);
            le && (U.diagnostics = {
                runnable: L,
                programLog: G,
                vertexShader: {
                    log: Y,
                    prefix: f
                },
                fragmentShader: {
                    log: te,
                    prefix: u
                }
            })
        }
        r.deleteShader(C),
        r.deleteShader(E),
        F = new Xr(r,_),
        S = l0(r, _)
    }
    let F;
    this.getUniforms = function() {
        return F === void 0 && R(this),
        F
    }
    ;
    let S;
    this.getAttributes = function() {
        return S === void 0 && R(this),
        S
    }
    ;
    let M = t.rendererExtensionParallelShaderCompile === !1;
    return this.isReady = function() {
        return M === !1 && (M = r.getProgramParameter(_, e0)),
        M
    }
    ,
    this.destroy = function() {
        n.releaseStatesOfProgram(this),
        r.deleteProgram(_),
        this.program = void 0
    }
    ,
    this.type = t.shaderType,
    this.name = t.shaderName,
    this.id = t0++,
    this.cacheKey = e,
    this.usedTimes = 1,
    this.program = _,
    this.vertexShader = C,
    this.fragmentShader = E,
    this
}
let b0 = 0;
class S0 {
    constructor() {
        this.shaderCache = new Map,
        this.materialCache = new Map
    }
    update(e) {
        const t = e.vertexShader
          , n = e.fragmentShader
          , r = this._getShaderStage(t)
          , s = this._getShaderStage(n)
          , a = this._getShaderCacheForMaterial(e);
        return a.has(r) === !1 && (a.add(r),
        r.usedTimes++),
        a.has(s) === !1 && (a.add(s),
        s.usedTimes++),
        this
    }
    remove(e) {
        const t = this.materialCache.get(e);
        for (const n of t)
            n.usedTimes--,
            n.usedTimes === 0 && this.shaderCache.delete(n.code);
        return this.materialCache.delete(e),
        this
    }
    getVertexShaderID(e) {
        return this._getShaderStage(e.vertexShader).id
    }
    getFragmentShaderID(e) {
        return this._getShaderStage(e.fragmentShader).id
    }
    dispose() {
        this.shaderCache.clear(),
        this.materialCache.clear()
    }
    _getShaderCacheForMaterial(e) {
        const t = this.materialCache;
        let n = t.get(e);
        return n === void 0 && (n = new Set,
        t.set(e, n)),
        n
    }
    _getShaderStage(e) {
        const t = this.shaderCache;
        let n = t.get(e);
        return n === void 0 && (n = new y0(e),
        t.set(e, n)),
        n
    }
}
class y0 {
    constructor(e) {
        this.id = b0++,
        this.code = e,
        this.usedTimes = 0
    }
}
function E0(i, e, t, n, r, s, a) {
    const o = new ka
      , l = new S0
      , c = new Set
      , h = []
      , d = r.logarithmicDepthBuffer
      , p = r.vertexTextures;
    let m = r.precision;
    const g = {
        MeshDepthMaterial: "depth",
        MeshDistanceMaterial: "distanceRGBA",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        MeshToonMaterial: "toon",
        MeshStandardMaterial: "physical",
        MeshPhysicalMaterial: "physical",
        MeshMatcapMaterial: "matcap",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointsMaterial: "points",
        ShadowMaterial: "shadow",
        SpriteMaterial: "sprite"
    };
    function _(S) {
        return c.add(S),
        S === 0 ? "uv" : `uv${S}`
    }
    function f(S, M, U, B, k) {
        const D = B.fog
          , G = k.geometry
          , Y = S.isMeshStandardMaterial ? B.environment : null
          , te = (S.isMeshStandardMaterial ? t : e).get(S.envMap || Y)
          , L = te && te.mapping === Zr ? te.image.height : null
          , le = g[S.type];
        S.precision !== null && (m = r.getMaxPrecision(S.precision),
        m !== S.precision && Ye("WebGLProgram.getParameters:", S.precision, "not supported, using", m, "instead."));
        const fe = G.morphAttributes.position || G.morphAttributes.normal || G.morphAttributes.color
          , Se = fe !== void 0 ? fe.length : 0;
        let pe = 0;
        G.morphAttributes.position !== void 0 && (pe = 1),
        G.morphAttributes.normal !== void 0 && (pe = 2),
        G.morphAttributes.color !== void 0 && (pe = 3);
        let Xe, it, Je, Q;
        if (le) {
            const rt = Mn[le];
            Xe = rt.vertexShader,
            it = rt.fragmentShader
        } else
            Xe = S.vertexShader,
            it = S.fragmentShader,
            l.update(S),
            Je = l.getVertexShaderID(S),
            Q = l.getFragmentShaderID(S);
        const se = i.getRenderTarget()
          , Re = i.state.buffers.depth.getReversed()
          , We = k.isInstancedMesh === !0
          , W = k.isBatchedMesh === !0
          , re = !!S.map
          , he = !!S.matcap
          , ee = !!te
          , ae = !!S.aoMap
          , w = !!S.lightMap
          , ce = !!S.bumpMap
          , _e = !!S.normalMap
          , Pe = !!S.displacementMap
          , xe = !!S.emissiveMap
          , De = !!S.metalnessMap
          , oe = !!S.roughnessMap
          , me = S.anisotropy > 0
          , A = S.clearcoat > 0
          , x = S.dispersion > 0
          , N = S.iridescence > 0
          , $ = S.sheen > 0
          , ie = S.transmission > 0
          , j = me && !!S.anisotropyMap
          , Te = A && !!S.clearcoatMap
          , be = A && !!S.clearcoatNormalMap
          , Ie = A && !!S.clearcoatRoughnessMap
          , Ae = N && !!S.iridescenceMap
          , J = N && !!S.iridescenceThicknessMap
          , de = $ && !!S.sheenColorMap
          , Fe = $ && !!S.sheenRoughnessMap
          , Ne = !!S.specularMap
          , Ee = !!S.specularColorMap
          , Ve = !!S.specularIntensityMap
          , I = ie && !!S.transmissionMap
          , ve = ie && !!S.thicknessMap
          , ge = !!S.gradientMap
          , ue = !!S.alphaMap
          , ne = S.alphaTest > 0
          , Z = !!S.alphaHash
          , we = !!S.extensions;
        let ze = $n;
        S.toneMapped && (se === null || se.isXRRenderTarget === !0) && (ze = i.toneMapping);
        const lt = {
            shaderID: le,
            shaderType: S.type,
            shaderName: S.name,
            vertexShader: Xe,
            fragmentShader: it,
            defines: S.defines,
            customVertexShaderID: Je,
            customFragmentShaderID: Q,
            isRawShaderMaterial: S.isRawShaderMaterial === !0,
            glslVersion: S.glslVersion,
            precision: m,
            batching: W,
            batchingColor: W && k._colorsTexture !== null,
            instancing: We,
            instancingColor: We && k.instanceColor !== null,
            instancingMorph: We && k.morphTexture !== null,
            supportsVertexTextures: p,
            outputColorSpace: se === null ? i.outputColorSpace : se.isXRRenderTarget === !0 ? se.texture.colorSpace : Oi,
            alphaToCoverage: !!S.alphaToCoverage,
            map: re,
            matcap: he,
            envMap: ee,
            envMapMode: ee && te.mapping,
            envMapCubeUVHeight: L,
            aoMap: ae,
            lightMap: w,
            bumpMap: ce,
            normalMap: _e,
            displacementMap: p && Pe,
            emissiveMap: xe,
            normalMapObjectSpace: _e && S.normalMapType === Yl,
            normalMapTangentSpace: _e && S.normalMapType === wc,
            metalnessMap: De,
            roughnessMap: oe,
            anisotropy: me,
            anisotropyMap: j,
            clearcoat: A,
            clearcoatMap: Te,
            clearcoatNormalMap: be,
            clearcoatRoughnessMap: Ie,
            dispersion: x,
            iridescence: N,
            iridescenceMap: Ae,
            iridescenceThicknessMap: J,
            sheen: $,
            sheenColorMap: de,
            sheenRoughnessMap: Fe,
            specularMap: Ne,
            specularColorMap: Ee,
            specularIntensityMap: Ve,
            transmission: ie,
            transmissionMap: I,
            thicknessMap: ve,
            gradientMap: ge,
            opaque: S.transparent === !1 && S.blending === Di && S.alphaToCoverage === !1,
            alphaMap: ue,
            alphaTest: ne,
            alphaHash: Z,
            combine: S.combine,
            mapUv: re && _(S.map.channel),
            aoMapUv: ae && _(S.aoMap.channel),
            lightMapUv: w && _(S.lightMap.channel),
            bumpMapUv: ce && _(S.bumpMap.channel),
            normalMapUv: _e && _(S.normalMap.channel),
            displacementMapUv: Pe && _(S.displacementMap.channel),
            emissiveMapUv: xe && _(S.emissiveMap.channel),
            metalnessMapUv: De && _(S.metalnessMap.channel),
            roughnessMapUv: oe && _(S.roughnessMap.channel),
            anisotropyMapUv: j && _(S.anisotropyMap.channel),
            clearcoatMapUv: Te && _(S.clearcoatMap.channel),
            clearcoatNormalMapUv: be && _(S.clearcoatNormalMap.channel),
            clearcoatRoughnessMapUv: Ie && _(S.clearcoatRoughnessMap.channel),
            iridescenceMapUv: Ae && _(S.iridescenceMap.channel),
            iridescenceThicknessMapUv: J && _(S.iridescenceThicknessMap.channel),
            sheenColorMapUv: de && _(S.sheenColorMap.channel),
            sheenRoughnessMapUv: Fe && _(S.sheenRoughnessMap.channel),
            specularMapUv: Ne && _(S.specularMap.channel),
            specularColorMapUv: Ee && _(S.specularColorMap.channel),
            specularIntensityMapUv: Ve && _(S.specularIntensityMap.channel),
            transmissionMapUv: I && _(S.transmissionMap.channel),
            thicknessMapUv: ve && _(S.thicknessMap.channel),
            alphaMapUv: ue && _(S.alphaMap.channel),
            vertexTangents: !!G.attributes.tangent && (_e || me),
            vertexColors: S.vertexColors,
            vertexAlphas: S.vertexColors === !0 && !!G.attributes.color && G.attributes.color.itemSize === 4,
            pointsUvs: k.isPoints === !0 && !!G.attributes.uv && (re || ue),
            fog: !!D,
            useFog: S.fog === !0,
            fogExp2: !!D && D.isFogExp2,
            flatShading: S.flatShading === !0 && S.wireframe === !1,
            sizeAttenuation: S.sizeAttenuation === !0,
            logarithmicDepthBuffer: d,
            reversedDepthBuffer: Re,
            skinning: k.isSkinnedMesh === !0,
            morphTargets: G.morphAttributes.position !== void 0,
            morphNormals: G.morphAttributes.normal !== void 0,
            morphColors: G.morphAttributes.color !== void 0,
            morphTargetsCount: Se,
            morphTextureStride: pe,
            numDirLights: M.directional.length,
            numPointLights: M.point.length,
            numSpotLights: M.spot.length,
            numSpotLightMaps: M.spotLightMap.length,
            numRectAreaLights: M.rectArea.length,
            numHemiLights: M.hemi.length,
            numDirLightShadows: M.directionalShadowMap.length,
            numPointLightShadows: M.pointShadowMap.length,
            numSpotLightShadows: M.spotShadowMap.length,
            numSpotLightShadowsWithMaps: M.numSpotLightShadowsWithMaps,
            numLightProbes: M.numLightProbes,
            numClippingPlanes: a.numPlanes,
            numClipIntersection: a.numIntersection,
            dithering: S.dithering,
            shadowMapEnabled: i.shadowMap.enabled && U.length > 0,
            shadowMapType: i.shadowMap.type,
            toneMapping: ze,
            decodeVideoTexture: re && S.map.isVideoTexture === !0 && ot.getTransfer(S.map.colorSpace) === pt,
            decodeVideoTextureEmissive: xe && S.emissiveMap.isVideoTexture === !0 && ot.getTransfer(S.emissiveMap.colorSpace) === pt,
            premultipliedAlpha: S.premultipliedAlpha,
            doubleSided: S.side === xn,
            flipSided: S.side === $t,
            useDepthPacking: S.depthPacking >= 0,
            depthPacking: S.depthPacking || 0,
            index0AttributeName: S.index0AttributeName,
            extensionClipCullDistance: we && S.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
            extensionMultiDraw: (we && S.extensions.multiDraw === !0 || W) && n.has("WEBGL_multi_draw"),
            rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
            customProgramCacheKey: S.customProgramCacheKey()
        };
        return lt.vertexUv1s = c.has(1),
        lt.vertexUv2s = c.has(2),
        lt.vertexUv3s = c.has(3),
        c.clear(),
        lt
    }
    function u(S) {
        const M = [];
        if (S.shaderID ? M.push(S.shaderID) : (M.push(S.customVertexShaderID),
        M.push(S.customFragmentShaderID)),
        S.defines !== void 0)
            for (const U in S.defines)
                M.push(U),
                M.push(S.defines[U]);
        return S.isRawShaderMaterial === !1 && (b(M, S),
        v(M, S),
        M.push(i.outputColorSpace)),
        M.push(S.customProgramCacheKey),
        M.join()
    }
    function b(S, M) {
        S.push(M.precision),
        S.push(M.outputColorSpace),
        S.push(M.envMapMode),
        S.push(M.envMapCubeUVHeight),
        S.push(M.mapUv),
        S.push(M.alphaMapUv),
        S.push(M.lightMapUv),
        S.push(M.aoMapUv),
        S.push(M.bumpMapUv),
        S.push(M.normalMapUv),
        S.push(M.displacementMapUv),
        S.push(M.emissiveMapUv),
        S.push(M.metalnessMapUv),
        S.push(M.roughnessMapUv),
        S.push(M.anisotropyMapUv),
        S.push(M.clearcoatMapUv),
        S.push(M.clearcoatNormalMapUv),
        S.push(M.clearcoatRoughnessMapUv),
        S.push(M.iridescenceMapUv),
        S.push(M.iridescenceThicknessMapUv),
        S.push(M.sheenColorMapUv),
        S.push(M.sheenRoughnessMapUv),
        S.push(M.specularMapUv),
        S.push(M.specularColorMapUv),
        S.push(M.specularIntensityMapUv),
        S.push(M.transmissionMapUv),
        S.push(M.thicknessMapUv),
        S.push(M.combine),
        S.push(M.fogExp2),
        S.push(M.sizeAttenuation),
        S.push(M.morphTargetsCount),
        S.push(M.morphAttributeCount),
        S.push(M.numDirLights),
        S.push(M.numPointLights),
        S.push(M.numSpotLights),
        S.push(M.numSpotLightMaps),
        S.push(M.numHemiLights),
        S.push(M.numRectAreaLights),
        S.push(M.numDirLightShadows),
        S.push(M.numPointLightShadows),
        S.push(M.numSpotLightShadows),
        S.push(M.numSpotLightShadowsWithMaps),
        S.push(M.numLightProbes),
        S.push(M.shadowMapType),
        S.push(M.toneMapping),
        S.push(M.numClippingPlanes),
        S.push(M.numClipIntersection),
        S.push(M.depthPacking)
    }
    function v(S, M) {
        o.disableAll(),
        M.supportsVertexTextures && o.enable(0),
        M.instancing && o.enable(1),
        M.instancingColor && o.enable(2),
        M.instancingMorph && o.enable(3),
        M.matcap && o.enable(4),
        M.envMap && o.enable(5),
        M.normalMapObjectSpace && o.enable(6),
        M.normalMapTangentSpace && o.enable(7),
        M.clearcoat && o.enable(8),
        M.iridescence && o.enable(9),
        M.alphaTest && o.enable(10),
        M.vertexColors && o.enable(11),
        M.vertexAlphas && o.enable(12),
        M.vertexUv1s && o.enable(13),
        M.vertexUv2s && o.enable(14),
        M.vertexUv3s && o.enable(15),
        M.vertexTangents && o.enable(16),
        M.anisotropy && o.enable(17),
        M.alphaHash && o.enable(18),
        M.batching && o.enable(19),
        M.dispersion && o.enable(20),
        M.batchingColor && o.enable(21),
        M.gradientMap && o.enable(22),
        S.push(o.mask),
        o.disableAll(),
        M.fog && o.enable(0),
        M.useFog && o.enable(1),
        M.flatShading && o.enable(2),
        M.logarithmicDepthBuffer && o.enable(3),
        M.reversedDepthBuffer && o.enable(4),
        M.skinning && o.enable(5),
        M.morphTargets && o.enable(6),
        M.morphNormals && o.enable(7),
        M.morphColors && o.enable(8),
        M.premultipliedAlpha && o.enable(9),
        M.shadowMapEnabled && o.enable(10),
        M.doubleSided && o.enable(11),
        M.flipSided && o.enable(12),
        M.useDepthPacking && o.enable(13),
        M.dithering && o.enable(14),
        M.transmission && o.enable(15),
        M.sheen && o.enable(16),
        M.opaque && o.enable(17),
        M.pointsUvs && o.enable(18),
        M.decodeVideoTexture && o.enable(19),
        M.decodeVideoTextureEmissive && o.enable(20),
        M.alphaToCoverage && o.enable(21),
        S.push(o.mask)
    }
    function T(S) {
        const M = g[S.type];
        let U;
        if (M) {
            const B = Mn[M];
            U = Ou.clone(B.uniforms)
        } else
            U = S.uniforms;
        return U
    }
    function C(S, M) {
        let U;
        for (let B = 0, k = h.length; B < k; B++) {
            const D = h[B];
            if (D.cacheKey === M) {
                U = D,
                ++U.usedTimes;
                break
            }
        }
        return U === void 0 && (U = new M0(i,M,S,s),
        h.push(U)),
        U
    }
    function E(S) {
        if (--S.usedTimes === 0) {
            const M = h.indexOf(S);
            h[M] = h[h.length - 1],
            h.pop(),
            S.destroy()
        }
    }
    function R(S) {
        l.remove(S)
    }
    function F() {
        l.dispose()
    }
    return {
        getParameters: f,
        getProgramCacheKey: u,
        getUniforms: T,
        acquireProgram: C,
        releaseProgram: E,
        releaseShaderCache: R,
        programs: h,
        dispose: F
    }
}
function T0() {
    let i = new WeakMap;
    function e(a) {
        return i.has(a)
    }
    function t(a) {
        let o = i.get(a);
        return o === void 0 && (o = {},
        i.set(a, o)),
        o
    }
    function n(a) {
        i.delete(a)
    }
    function r(a, o, l) {
        i.get(a)[o] = l
    }
    function s() {
        i = new WeakMap
    }
    return {
        has: e,
        get: t,
        remove: n,
        update: r,
        dispose: s
    }
}
function A0(i, e) {
    return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id
}
function sc(i, e) {
    return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id
}
function ac() {
    const i = [];
    let e = 0;
    const t = []
      , n = []
      , r = [];
    function s() {
        e = 0,
        t.length = 0,
        n.length = 0,
        r.length = 0
    }
    function a(d, p, m, g, _, f) {
        let u = i[e];
        return u === void 0 ? (u = {
            id: d.id,
            object: d,
            geometry: p,
            material: m,
            groupOrder: g,
            renderOrder: d.renderOrder,
            z: _,
            group: f
        },
        i[e] = u) : (u.id = d.id,
        u.object = d,
        u.geometry = p,
        u.material = m,
        u.groupOrder = g,
        u.renderOrder = d.renderOrder,
        u.z = _,
        u.group = f),
        e++,
        u
    }
    function o(d, p, m, g, _, f) {
        const u = a(d, p, m, g, _, f);
        m.transmission > 0 ? n.push(u) : m.transparent === !0 ? r.push(u) : t.push(u)
    }
    function l(d, p, m, g, _, f) {
        const u = a(d, p, m, g, _, f);
        m.transmission > 0 ? n.unshift(u) : m.transparent === !0 ? r.unshift(u) : t.unshift(u)
    }
    function c(d, p) {
        t.length > 1 && t.sort(d || A0),
        n.length > 1 && n.sort(p || sc),
        r.length > 1 && r.sort(p || sc)
    }
    function h() {
        for (let d = e, p = i.length; d < p; d++) {
            const m = i[d];
            if (m.id === null)
                break;
            m.id = null,
            m.object = null,
            m.geometry = null,
            m.material = null,
            m.group = null
        }
    }
    return {
        opaque: t,
        transmissive: n,
        transparent: r,
        init: s,
        push: o,
        unshift: l,
        finish: h,
        sort: c
    }
}
function w0() {
    let i = new WeakMap;
    function e(n, r) {
        const s = i.get(n);
        let a;
        return s === void 0 ? (a = new ac,
        i.set(n, [a])) : r >= s.length ? (a = new ac,
        s.push(a)) : a = s[r],
        a
    }
    function t() {
        i = new WeakMap
    }
    return {
        get: e,
        dispose: t
    }
}
function C0() {
    const i = {};
    return {
        get: function(e) {
            if (i[e.id] !== void 0)
                return i[e.id];
            let t;
            switch (e.type) {
            case "DirectionalLight":
                t = {
                    direction: new O,
                    color: new et
                };
                break;
            case "SpotLight":
                t = {
                    position: new O,
                    direction: new O,
                    color: new et,
                    distance: 0,
                    coneCos: 0,
                    penumbraCos: 0,
                    decay: 0
                };
                break;
            case "PointLight":
                t = {
                    position: new O,
                    color: new et,
                    distance: 0,
                    decay: 0
                };
                break;
            case "HemisphereLight":
                t = {
                    direction: new O,
                    skyColor: new et,
                    groundColor: new et
                };
                break;
            case "RectAreaLight":
                t = {
                    color: new et,
                    position: new O,
                    halfWidth: new O,
                    halfHeight: new O
                };
                break
            }
            return i[e.id] = t,
            t
        }
    }
}
function R0() {
    const i = {};
    return {
        get: function(e) {
            if (i[e.id] !== void 0)
                return i[e.id];
            let t;
            switch (e.type) {
            case "DirectionalLight":
                t = {
                    shadowIntensity: 1,
                    shadowBias: 0,
                    shadowNormalBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Ze
                };
                break;
            case "SpotLight":
                t = {
                    shadowIntensity: 1,
                    shadowBias: 0,
                    shadowNormalBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Ze
                };
                break;
            case "PointLight":
                t = {
                    shadowIntensity: 1,
                    shadowBias: 0,
                    shadowNormalBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Ze,
                    shadowCameraNear: 1,
                    shadowCameraFar: 1e3
                };
                break
            }
            return i[e.id] = t,
            t
        }
    }
}
let P0 = 0;
function L0(i, e) {
    return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0)
}
function D0(i) {
    const e = new C0
      , t = R0()
      , n = {
        version: 0,
        hash: {
            directionalLength: -1,
            pointLength: -1,
            spotLength: -1,
            rectAreaLength: -1,
            hemiLength: -1,
            numDirectionalShadows: -1,
            numPointShadows: -1,
            numSpotShadows: -1,
            numSpotMaps: -1,
            numLightProbes: -1
        },
        ambient: [0, 0, 0],
        probe: [],
        directional: [],
        directionalShadow: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotLightMap: [],
        spotShadow: [],
        spotShadowMap: [],
        spotLightMatrix: [],
        rectArea: [],
        rectAreaLTC1: null,
        rectAreaLTC2: null,
        point: [],
        pointShadow: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: [],
        numSpotLightShadowsWithMaps: 0,
        numLightProbes: 0
    };
    for (let c = 0; c < 9; c++)
        n.probe.push(new O);
    const r = new O
      , s = new ct
      , a = new ct;
    function o(c) {
        let h = 0
          , d = 0
          , p = 0;
        for (let S = 0; S < 9; S++)
            n.probe[S].set(0, 0, 0);
        let m = 0
          , g = 0
          , _ = 0
          , f = 0
          , u = 0
          , b = 0
          , v = 0
          , T = 0
          , C = 0
          , E = 0
          , R = 0;
        c.sort(L0);
        for (let S = 0, M = c.length; S < M; S++) {
            const U = c[S]
              , B = U.color
              , k = U.intensity
              , D = U.distance
              , G = U.shadow && U.shadow.map ? U.shadow.map.texture : null;
            if (U.isAmbientLight)
                h += B.r * k,
                d += B.g * k,
                p += B.b * k;
            else if (U.isLightProbe) {
                for (let Y = 0; Y < 9; Y++)
                    n.probe[Y].addScaledVector(U.sh.coefficients[Y], k);
                R++
            } else if (U.isDirectionalLight) {
                const Y = e.get(U);
                if (Y.color.copy(U.color).multiplyScalar(U.intensity),
                U.castShadow) {
                    const te = U.shadow
                      , L = t.get(U);
                    L.shadowIntensity = te.intensity,
                    L.shadowBias = te.bias,
                    L.shadowNormalBias = te.normalBias,
                    L.shadowRadius = te.radius,
                    L.shadowMapSize = te.mapSize,
                    n.directionalShadow[m] = L,
                    n.directionalShadowMap[m] = G,
                    n.directionalShadowMatrix[m] = U.shadow.matrix,
                    b++
                }
                n.directional[m] = Y,
                m++
            } else if (U.isSpotLight) {
                const Y = e.get(U);
                Y.position.setFromMatrixPosition(U.matrixWorld),
                Y.color.copy(B).multiplyScalar(k),
                Y.distance = D,
                Y.coneCos = Math.cos(U.angle),
                Y.penumbraCos = Math.cos(U.angle * (1 - U.penumbra)),
                Y.decay = U.decay,
                n.spot[_] = Y;
                const te = U.shadow;
                if (U.map && (n.spotLightMap[C] = U.map,
                C++,
                te.updateMatrices(U),
                U.castShadow && E++),
                n.spotLightMatrix[_] = te.matrix,
                U.castShadow) {
                    const L = t.get(U);
                    L.shadowIntensity = te.intensity,
                    L.shadowBias = te.bias,
                    L.shadowNormalBias = te.normalBias,
                    L.shadowRadius = te.radius,
                    L.shadowMapSize = te.mapSize,
                    n.spotShadow[_] = L,
                    n.spotShadowMap[_] = G,
                    T++
                }
                _++
            } else if (U.isRectAreaLight) {
                const Y = e.get(U);
                Y.color.copy(B).multiplyScalar(k),
                Y.halfWidth.set(U.width * .5, 0, 0),
                Y.halfHeight.set(0, U.height * .5, 0),
                n.rectArea[f] = Y,
                f++
            } else if (U.isPointLight) {
                const Y = e.get(U);
                if (Y.color.copy(U.color).multiplyScalar(U.intensity),
                Y.distance = U.distance,
                Y.decay = U.decay,
                U.castShadow) {
                    const te = U.shadow
                      , L = t.get(U);
                    L.shadowIntensity = te.intensity,
                    L.shadowBias = te.bias,
                    L.shadowNormalBias = te.normalBias,
                    L.shadowRadius = te.radius,
                    L.shadowMapSize = te.mapSize,
                    L.shadowCameraNear = te.camera.near,
                    L.shadowCameraFar = te.camera.far,
                    n.pointShadow[g] = L,
                    n.pointShadowMap[g] = G,
                    n.pointShadowMatrix[g] = U.shadow.matrix,
                    v++
                }
                n.point[g] = Y,
                g++
            } else if (U.isHemisphereLight) {
                const Y = e.get(U);
                Y.skyColor.copy(U.color).multiplyScalar(k),
                Y.groundColor.copy(U.groundColor).multiplyScalar(k),
                n.hemi[u] = Y,
                u++
            }
        }
        f > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ye.LTC_FLOAT_1,
        n.rectAreaLTC2 = ye.LTC_FLOAT_2) : (n.rectAreaLTC1 = ye.LTC_HALF_1,
        n.rectAreaLTC2 = ye.LTC_HALF_2)),
        n.ambient[0] = h,
        n.ambient[1] = d,
        n.ambient[2] = p;
        const F = n.hash;
        (F.directionalLength !== m || F.pointLength !== g || F.spotLength !== _ || F.rectAreaLength !== f || F.hemiLength !== u || F.numDirectionalShadows !== b || F.numPointShadows !== v || F.numSpotShadows !== T || F.numSpotMaps !== C || F.numLightProbes !== R) && (n.directional.length = m,
        n.spot.length = _,
        n.rectArea.length = f,
        n.point.length = g,
        n.hemi.length = u,
        n.directionalShadow.length = b,
        n.directionalShadowMap.length = b,
        n.pointShadow.length = v,
        n.pointShadowMap.length = v,
        n.spotShadow.length = T,
        n.spotShadowMap.length = T,
        n.directionalShadowMatrix.length = b,
        n.pointShadowMatrix.length = v,
        n.spotLightMatrix.length = T + C - E,
        n.spotLightMap.length = C,
        n.numSpotLightShadowsWithMaps = E,
        n.numLightProbes = R,
        F.directionalLength = m,
        F.pointLength = g,
        F.spotLength = _,
        F.rectAreaLength = f,
        F.hemiLength = u,
        F.numDirectionalShadows = b,
        F.numPointShadows = v,
        F.numSpotShadows = T,
        F.numSpotMaps = C,
        F.numLightProbes = R,
        n.version = P0++)
    }
    function l(c, h) {
        let d = 0
          , p = 0
          , m = 0
          , g = 0
          , _ = 0;
        const f = h.matrixWorldInverse;
        for (let u = 0, b = c.length; u < b; u++) {
            const v = c[u];
            if (v.isDirectionalLight) {
                const T = n.directional[d];
                T.direction.setFromMatrixPosition(v.matrixWorld),
                r.setFromMatrixPosition(v.target.matrixWorld),
                T.direction.sub(r),
                T.direction.transformDirection(f),
                d++
            } else if (v.isSpotLight) {
                const T = n.spot[m];
                T.position.setFromMatrixPosition(v.matrixWorld),
                T.position.applyMatrix4(f),
                T.direction.setFromMatrixPosition(v.matrixWorld),
                r.setFromMatrixPosition(v.target.matrixWorld),
                T.direction.sub(r),
                T.direction.transformDirection(f),
                m++
            } else if (v.isRectAreaLight) {
                const T = n.rectArea[g];
                T.position.setFromMatrixPosition(v.matrixWorld),
                T.position.applyMatrix4(f),
                a.identity(),
                s.copy(v.matrixWorld),
                s.premultiply(f),
                a.extractRotation(s),
                T.halfWidth.set(v.width * .5, 0, 0),
                T.halfHeight.set(0, v.height * .5, 0),
                T.halfWidth.applyMatrix4(a),
                T.halfHeight.applyMatrix4(a),
                g++
            } else if (v.isPointLight) {
                const T = n.point[p];
                T.position.setFromMatrixPosition(v.matrixWorld),
                T.position.applyMatrix4(f),
                p++
            } else if (v.isHemisphereLight) {
                const T = n.hemi[_];
                T.direction.setFromMatrixPosition(v.matrixWorld),
                T.direction.transformDirection(f),
                _++
            }
        }
    }
    return {
        setup: o,
        setupView: l,
        state: n
    }
}
function oc(i) {
    const e = new D0(i)
      , t = []
      , n = [];
    function r(h) {
        c.camera = h,
        t.length = 0,
        n.length = 0
    }
    function s(h) {
        t.push(h)
    }
    function a(h) {
        n.push(h)
    }
    function o() {
        e.setup(t)
    }
    function l(h) {
        e.setupView(t, h)
    }
    const c = {
        lightsArray: t,
        shadowsArray: n,
        camera: null,
        lights: e,
        transmissionRenderTarget: {}
    };
    return {
        init: r,
        state: c,
        setupLights: o,
        setupLightsView: l,
        pushLight: s,
        pushShadow: a
    }
}
function I0(i) {
    let e = new WeakMap;
    function t(r, s=0) {
        const a = e.get(r);
        let o;
        return a === void 0 ? (o = new oc(i),
        e.set(r, [o])) : s >= a.length ? (o = new oc(i),
        a.push(o)) : o = a[s],
        o
    }
    function n() {
        e = new WeakMap
    }
    return {
        get: t,
        dispose: n
    }
}
const U0 = `void main() {
	gl_Position = vec4( position, 1.0 );
}`
  , N0 = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function F0(i, e, t) {
    let n = new Ha;
    const r = new Ze
      , s = new Ze
      , a = new St
      , o = new td({
        depthPacking: ql
    })
      , l = new nd
      , c = {}
      , h = t.maxTextureSize
      , d = {
        [jn]: $t,
        [$t]: jn,
        [xn]: xn
    }
      , p = new Tn({
        defines: {
            VSM_SAMPLES: 8
        },
        uniforms: {
            shadow_pass: {
                value: null
            },
            resolution: {
                value: new Ze
            },
            radius: {
                value: 4
            }
        },
        vertexShader: U0,
        fragmentShader: N0
    })
      , m = p.clone();
    m.defines.HORIZONTAL_PASS = 1;
    const g = new Xt;
    g.setAttribute("position", new un(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]),3));
    const _ = new tn(g,p)
      , f = this;
    this.enabled = !1,
    this.autoUpdate = !0,
    this.needsUpdate = !1,
    this.type = gc;
    let u = this.type;
    this.render = function(E, R, F) {
        if (f.enabled === !1 || f.autoUpdate === !1 && f.needsUpdate === !1 || E.length === 0)
            return;
        const S = i.getRenderTarget()
          , M = i.getActiveCubeFace()
          , U = i.getActiveMipmapLevel()
          , B = i.state;
        B.setBlending(On),
        B.buffers.depth.getReversed() === !0 ? B.buffers.color.setClear(0, 0, 0, 0) : B.buffers.color.setClear(1, 1, 1, 1),
        B.buffers.depth.setTest(!0),
        B.setScissorTest(!1);
        const k = u !== Un && this.type === Un
          , D = u === Un && this.type !== Un;
        for (let G = 0, Y = E.length; G < Y; G++) {
            const te = E[G]
              , L = te.shadow;
            if (L === void 0) {
                Ye("WebGLShadowMap:", te, "has no shadow.");
                continue
            }
            if (L.autoUpdate === !1 && L.needsUpdate === !1)
                continue;
            r.copy(L.mapSize);
            const le = L.getFrameExtents();
            if (r.multiply(le),
            s.copy(L.mapSize),
            (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / le.x),
            r.x = s.x * le.x,
            L.mapSize.x = s.x),
            r.y > h && (s.y = Math.floor(h / le.y),
            r.y = s.y * le.y,
            L.mapSize.y = s.y)),
            L.map === null || k === !0 || D === !0) {
                const Se = this.type !== Un ? {
                    minFilter: en,
                    magFilter: en
                } : {};
                L.map !== null && L.map.dispose(),
                L.map = new di(r.x,r.y,Se),
                L.map.texture.name = te.name + ".shadowMap",
                L.camera.updateProjectionMatrix()
            }
            i.setRenderTarget(L.map),
            i.clear();
            const fe = L.getViewportCount();
            for (let Se = 0; Se < fe; Se++) {
                const pe = L.getViewport(Se);
                a.set(s.x * pe.x, s.y * pe.y, s.x * pe.z, s.y * pe.w),
                B.viewport(a),
                L.updateMatrices(te, Se),
                n = L.getFrustum(),
                T(R, F, L.camera, te, this.type)
            }
            L.isPointLightShadow !== !0 && this.type === Un && b(L, F),
            L.needsUpdate = !1
        }
        u = this.type,
        f.needsUpdate = !1,
        i.setRenderTarget(S, M, U)
    }
    ;
    function b(E, R) {
        const F = e.update(_);
        p.defines.VSM_SAMPLES !== E.blurSamples && (p.defines.VSM_SAMPLES = E.blurSamples,
        m.defines.VSM_SAMPLES = E.blurSamples,
        p.needsUpdate = !0,
        m.needsUpdate = !0),
        E.mapPass === null && (E.mapPass = new di(r.x,r.y)),
        p.uniforms.shadow_pass.value = E.map.texture,
        p.uniforms.resolution.value = E.mapSize,
        p.uniforms.radius.value = E.radius,
        i.setRenderTarget(E.mapPass),
        i.clear(),
        i.renderBufferDirect(R, null, F, p, _, null),
        m.uniforms.shadow_pass.value = E.mapPass.texture,
        m.uniforms.resolution.value = E.mapSize,
        m.uniforms.radius.value = E.radius,
        i.setRenderTarget(E.map),
        i.clear(),
        i.renderBufferDirect(R, null, F, m, _, null)
    }
    function v(E, R, F, S) {
        let M = null;
        const U = F.isPointLight === !0 ? E.customDistanceMaterial : E.customDepthMaterial;
        if (U !== void 0)
            M = U;
        else if (M = F.isPointLight === !0 ? l : o,
        i.localClippingEnabled && R.clipShadows === !0 && Array.isArray(R.clippingPlanes) && R.clippingPlanes.length !== 0 || R.displacementMap && R.displacementScale !== 0 || R.alphaMap && R.alphaTest > 0 || R.map && R.alphaTest > 0 || R.alphaToCoverage === !0) {
            const B = M.uuid
              , k = R.uuid;
            let D = c[B];
            D === void 0 && (D = {},
            c[B] = D);
            let G = D[k];
            G === void 0 && (G = M.clone(),
            D[k] = G,
            R.addEventListener("dispose", C)),
            M = G
        }
        if (M.visible = R.visible,
        M.wireframe = R.wireframe,
        S === Un ? M.side = R.shadowSide !== null ? R.shadowSide : R.side : M.side = R.shadowSide !== null ? R.shadowSide : d[R.side],
        M.alphaMap = R.alphaMap,
        M.alphaTest = R.alphaToCoverage === !0 ? .5 : R.alphaTest,
        M.map = R.map,
        M.clipShadows = R.clipShadows,
        M.clippingPlanes = R.clippingPlanes,
        M.clipIntersection = R.clipIntersection,
        M.displacementMap = R.displacementMap,
        M.displacementScale = R.displacementScale,
        M.displacementBias = R.displacementBias,
        M.wireframeLinewidth = R.wireframeLinewidth,
        M.linewidth = R.linewidth,
        F.isPointLight === !0 && M.isMeshDistanceMaterial === !0) {
            const B = i.properties.get(M);
            B.light = F
        }
        return M
    }
    function T(E, R, F, S, M) {
        if (E.visible === !1)
            return;
        if (E.layers.test(R.layers) && (E.isMesh || E.isLine || E.isPoints) && (E.castShadow || E.receiveShadow && M === Un) && (!E.frustumCulled || n.intersectsObject(E))) {
            E.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse, E.matrixWorld);
            const k = e.update(E)
              , D = E.material;
            if (Array.isArray(D)) {
                const G = k.groups;
                for (let Y = 0, te = G.length; Y < te; Y++) {
                    const L = G[Y]
                      , le = D[L.materialIndex];
                    if (le && le.visible) {
                        const fe = v(E, le, S, M);
                        E.onBeforeShadow(i, E, R, F, k, fe, L),
                        i.renderBufferDirect(F, null, k, fe, E, L),
                        E.onAfterShadow(i, E, R, F, k, fe, L)
                    }
                }
            } else if (D.visible) {
                const G = v(E, D, S, M);
                E.onBeforeShadow(i, E, R, F, k, G, null),
                i.renderBufferDirect(F, null, k, G, E, null),
                E.onAfterShadow(i, E, R, F, k, G, null)
            }
        }
        const B = E.children;
        for (let k = 0, D = B.length; k < D; k++)
            T(B[k], R, F, S, M)
    }
    function C(E) {
        E.target.removeEventListener("dispose", C);
        for (const F in c) {
            const S = c[F]
              , M = E.target.uuid;
            M in S && (S[M].dispose(),
            delete S[M])
        }
    }
}
const O0 = {
    [Fs]: Os,
    [Bs]: ks,
    [zs]: Gs,
    [Ui]: Vs,
    [Os]: Fs,
    [ks]: Bs,
    [Gs]: zs,
    [Vs]: Ui
};
function B0(i, e) {
    function t() {
        let I = !1;
        const ve = new St;
        let ge = null;
        const ue = new St(0,0,0,0);
        return {
            setMask: function(ne) {
                ge !== ne && !I && (i.colorMask(ne, ne, ne, ne),
                ge = ne)
            },
            setLocked: function(ne) {
                I = ne
            },
            setClear: function(ne, Z, we, ze, lt) {
                lt === !0 && (ne *= ze,
                Z *= ze,
                we *= ze),
                ve.set(ne, Z, we, ze),
                ue.equals(ve) === !1 && (i.clearColor(ne, Z, we, ze),
                ue.copy(ve))
            },
            reset: function() {
                I = !1,
                ge = null,
                ue.set(-1, 0, 0, 0)
            }
        }
    }
    function n() {
        let I = !1
          , ve = !1
          , ge = null
          , ue = null
          , ne = null;
        return {
            setReversed: function(Z) {
                if (ve !== Z) {
                    const we = e.get("EXT_clip_control");
                    Z ? we.clipControlEXT(we.LOWER_LEFT_EXT, we.ZERO_TO_ONE_EXT) : we.clipControlEXT(we.LOWER_LEFT_EXT, we.NEGATIVE_ONE_TO_ONE_EXT),
                    ve = Z;
                    const ze = ne;
                    ne = null,
                    this.setClear(ze)
                }
            },
            getReversed: function() {
                return ve
            },
            setTest: function(Z) {
                Z ? se(i.DEPTH_TEST) : Re(i.DEPTH_TEST)
            },
            setMask: function(Z) {
                ge !== Z && !I && (i.depthMask(Z),
                ge = Z)
            },
            setFunc: function(Z) {
                if (ve && (Z = O0[Z]),
                ue !== Z) {
                    switch (Z) {
                    case Fs:
                        i.depthFunc(i.NEVER);
                        break;
                    case Os:
                        i.depthFunc(i.ALWAYS);
                        break;
                    case Bs:
                        i.depthFunc(i.LESS);
                        break;
                    case Ui:
                        i.depthFunc(i.LEQUAL);
                        break;
                    case zs:
                        i.depthFunc(i.EQUAL);
                        break;
                    case Vs:
                        i.depthFunc(i.GEQUAL);
                        break;
                    case ks:
                        i.depthFunc(i.GREATER);
                        break;
                    case Gs:
                        i.depthFunc(i.NOTEQUAL);
                        break;
                    default:
                        i.depthFunc(i.LEQUAL)
                    }
                    ue = Z
                }
            },
            setLocked: function(Z) {
                I = Z
            },
            setClear: function(Z) {
                ne !== Z && (ve && (Z = 1 - Z),
                i.clearDepth(Z),
                ne = Z)
            },
            reset: function() {
                I = !1,
                ge = null,
                ue = null,
                ne = null,
                ve = !1
            }
        }
    }
    function r() {
        let I = !1
          , ve = null
          , ge = null
          , ue = null
          , ne = null
          , Z = null
          , we = null
          , ze = null
          , lt = null;
        return {
            setTest: function(rt) {
                I || (rt ? se(i.STENCIL_TEST) : Re(i.STENCIL_TEST))
            },
            setMask: function(rt) {
                ve !== rt && !I && (i.stencilMask(rt),
                ve = rt)
            },
            setFunc: function(rt, zt, Nt) {
                (ge !== rt || ue !== zt || ne !== Nt) && (i.stencilFunc(rt, zt, Nt),
                ge = rt,
                ue = zt,
                ne = Nt)
            },
            setOp: function(rt, zt, Nt) {
                (Z !== rt || we !== zt || ze !== Nt) && (i.stencilOp(rt, zt, Nt),
                Z = rt,
                we = zt,
                ze = Nt)
            },
            setLocked: function(rt) {
                I = rt
            },
            setClear: function(rt) {
                lt !== rt && (i.clearStencil(rt),
                lt = rt)
            },
            reset: function() {
                I = !1,
                ve = null,
                ge = null,
                ue = null,
                ne = null,
                Z = null,
                we = null,
                ze = null,
                lt = null
            }
        }
    }
    const s = new t
      , a = new n
      , o = new r
      , l = new WeakMap
      , c = new WeakMap;
    let h = {}
      , d = {}
      , p = new WeakMap
      , m = []
      , g = null
      , _ = !1
      , f = null
      , u = null
      , b = null
      , v = null
      , T = null
      , C = null
      , E = null
      , R = new et(0,0,0)
      , F = 0
      , S = !1
      , M = null
      , U = null
      , B = null
      , k = null
      , D = null;
    const G = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    let Y = !1
      , te = 0;
    const L = i.getParameter(i.VERSION);
    L.indexOf("WebGL") !== -1 ? (te = parseFloat(/^WebGL (\d)/.exec(L)[1]),
    Y = te >= 1) : L.indexOf("OpenGL ES") !== -1 && (te = parseFloat(/^OpenGL ES (\d)/.exec(L)[1]),
    Y = te >= 2);
    let le = null
      , fe = {};
    const Se = i.getParameter(i.SCISSOR_BOX)
      , pe = i.getParameter(i.VIEWPORT)
      , Xe = new St().fromArray(Se)
      , it = new St().fromArray(pe);
    function Je(I, ve, ge, ue) {
        const ne = new Uint8Array(4)
          , Z = i.createTexture();
        i.bindTexture(I, Z),
        i.texParameteri(I, i.TEXTURE_MIN_FILTER, i.NEAREST),
        i.texParameteri(I, i.TEXTURE_MAG_FILTER, i.NEAREST);
        for (let we = 0; we < ge; we++)
            I === i.TEXTURE_3D || I === i.TEXTURE_2D_ARRAY ? i.texImage3D(ve, 0, i.RGBA, 1, 1, ue, 0, i.RGBA, i.UNSIGNED_BYTE, ne) : i.texImage2D(ve + we, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, ne);
        return Z
    }
    const Q = {};
    Q[i.TEXTURE_2D] = Je(i.TEXTURE_2D, i.TEXTURE_2D, 1),
    Q[i.TEXTURE_CUBE_MAP] = Je(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6),
    Q[i.TEXTURE_2D_ARRAY] = Je(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1),
    Q[i.TEXTURE_3D] = Je(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1),
    s.setClear(0, 0, 0, 1),
    a.setClear(1),
    o.setClear(0),
    se(i.DEPTH_TEST),
    a.setFunc(Ui),
    ce(!1),
    _e(to),
    se(i.CULL_FACE),
    ae(On);
    function se(I) {
        h[I] !== !0 && (i.enable(I),
        h[I] = !0)
    }
    function Re(I) {
        h[I] !== !1 && (i.disable(I),
        h[I] = !1)
    }
    function We(I, ve) {
        return d[I] !== ve ? (i.bindFramebuffer(I, ve),
        d[I] = ve,
        I === i.DRAW_FRAMEBUFFER && (d[i.FRAMEBUFFER] = ve),
        I === i.FRAMEBUFFER && (d[i.DRAW_FRAMEBUFFER] = ve),
        !0) : !1
    }
    function W(I, ve) {
        let ge = m
          , ue = !1;
        if (I) {
            ge = p.get(ve),
            ge === void 0 && (ge = [],
            p.set(ve, ge));
            const ne = I.textures;
            if (ge.length !== ne.length || ge[0] !== i.COLOR_ATTACHMENT0) {
                for (let Z = 0, we = ne.length; Z < we; Z++)
                    ge[Z] = i.COLOR_ATTACHMENT0 + Z;
                ge.length = ne.length,
                ue = !0
            }
        } else
            ge[0] !== i.BACK && (ge[0] = i.BACK,
            ue = !0);
        ue && i.drawBuffers(ge)
    }
    function re(I) {
        return g !== I ? (i.useProgram(I),
        g = I,
        !0) : !1
    }
    const he = {
        [ai]: i.FUNC_ADD,
        [vl]: i.FUNC_SUBTRACT,
        [Ml]: i.FUNC_REVERSE_SUBTRACT
    };
    he[bl] = i.MIN,
    he[Sl] = i.MAX;
    const ee = {
        [yl]: i.ZERO,
        [El]: i.ONE,
        [Tl]: i.SRC_COLOR,
        [Us]: i.SRC_ALPHA,
        [Ll]: i.SRC_ALPHA_SATURATE,
        [Rl]: i.DST_COLOR,
        [wl]: i.DST_ALPHA,
        [Al]: i.ONE_MINUS_SRC_COLOR,
        [Ns]: i.ONE_MINUS_SRC_ALPHA,
        [Pl]: i.ONE_MINUS_DST_COLOR,
        [Cl]: i.ONE_MINUS_DST_ALPHA,
        [Dl]: i.CONSTANT_COLOR,
        [Il]: i.ONE_MINUS_CONSTANT_COLOR,
        [Ul]: i.CONSTANT_ALPHA,
        [Nl]: i.ONE_MINUS_CONSTANT_ALPHA
    };
    function ae(I, ve, ge, ue, ne, Z, we, ze, lt, rt) {
        if (I === On) {
            _ === !0 && (Re(i.BLEND),
            _ = !1);
            return
        }
        if (_ === !1 && (se(i.BLEND),
        _ = !0),
        I !== _l) {
            if (I !== f || rt !== S) {
                if ((u !== ai || T !== ai) && (i.blendEquation(i.FUNC_ADD),
                u = ai,
                T = ai),
                rt)
                    switch (I) {
                    case Di:
                        i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
                        break;
                    case no:
                        i.blendFunc(i.ONE, i.ONE);
                        break;
                    case io:
                        i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
                        break;
                    case ro:
                        i.blendFuncSeparate(i.DST_COLOR, i.ONE_MINUS_SRC_ALPHA, i.ZERO, i.ONE);
                        break;
                    default:
                        bt("WebGLState: Invalid blending: ", I);
                        break
                    }
                else
                    switch (I) {
                    case Di:
                        i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
                        break;
                    case no:
                        i.blendFuncSeparate(i.SRC_ALPHA, i.ONE, i.ONE, i.ONE);
                        break;
                    case io:
                        bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
                        break;
                    case ro:
                        bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
                        break;
                    default:
                        bt("WebGLState: Invalid blending: ", I);
                        break
                    }
                b = null,
                v = null,
                C = null,
                E = null,
                R.set(0, 0, 0),
                F = 0,
                f = I,
                S = rt
            }
            return
        }
        ne = ne || ve,
        Z = Z || ge,
        we = we || ue,
        (ve !== u || ne !== T) && (i.blendEquationSeparate(he[ve], he[ne]),
        u = ve,
        T = ne),
        (ge !== b || ue !== v || Z !== C || we !== E) && (i.blendFuncSeparate(ee[ge], ee[ue], ee[Z], ee[we]),
        b = ge,
        v = ue,
        C = Z,
        E = we),
        (ze.equals(R) === !1 || lt !== F) && (i.blendColor(ze.r, ze.g, ze.b, lt),
        R.copy(ze),
        F = lt),
        f = I,
        S = !1
    }
    function w(I, ve) {
        I.side === xn ? Re(i.CULL_FACE) : se(i.CULL_FACE);
        let ge = I.side === $t;
        ve && (ge = !ge),
        ce(ge),
        I.blending === Di && I.transparent === !1 ? ae(On) : ae(I.blending, I.blendEquation, I.blendSrc, I.blendDst, I.blendEquationAlpha, I.blendSrcAlpha, I.blendDstAlpha, I.blendColor, I.blendAlpha, I.premultipliedAlpha),
        a.setFunc(I.depthFunc),
        a.setTest(I.depthTest),
        a.setMask(I.depthWrite),
        s.setMask(I.colorWrite);
        const ue = I.stencilWrite;
        o.setTest(ue),
        ue && (o.setMask(I.stencilWriteMask),
        o.setFunc(I.stencilFunc, I.stencilRef, I.stencilFuncMask),
        o.setOp(I.stencilFail, I.stencilZFail, I.stencilZPass)),
        xe(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits),
        I.alphaToCoverage === !0 ? se(i.SAMPLE_ALPHA_TO_COVERAGE) : Re(i.SAMPLE_ALPHA_TO_COVERAGE)
    }
    function ce(I) {
        M !== I && (I ? i.frontFace(i.CW) : i.frontFace(i.CCW),
        M = I)
    }
    function _e(I) {
        I !== ml ? (se(i.CULL_FACE),
        I !== U && (I === to ? i.cullFace(i.BACK) : I === xl ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : Re(i.CULL_FACE),
        U = I
    }
    function Pe(I) {
        I !== B && (Y && i.lineWidth(I),
        B = I)
    }
    function xe(I, ve, ge) {
        I ? (se(i.POLYGON_OFFSET_FILL),
        (k !== ve || D !== ge) && (i.polygonOffset(ve, ge),
        k = ve,
        D = ge)) : Re(i.POLYGON_OFFSET_FILL)
    }
    function De(I) {
        I ? se(i.SCISSOR_TEST) : Re(i.SCISSOR_TEST)
    }
    function oe(I) {
        I === void 0 && (I = i.TEXTURE0 + G - 1),
        le !== I && (i.activeTexture(I),
        le = I)
    }
    function me(I, ve, ge) {
        ge === void 0 && (le === null ? ge = i.TEXTURE0 + G - 1 : ge = le);
        let ue = fe[ge];
        ue === void 0 && (ue = {
            type: void 0,
            texture: void 0
        },
        fe[ge] = ue),
        (ue.type !== I || ue.texture !== ve) && (le !== ge && (i.activeTexture(ge),
        le = ge),
        i.bindTexture(I, ve || Q[I]),
        ue.type = I,
        ue.texture = ve)
    }
    function A() {
        const I = fe[le];
        I !== void 0 && I.type !== void 0 && (i.bindTexture(I.type, null),
        I.type = void 0,
        I.texture = void 0)
    }
    function x() {
        try {
            i.compressedTexImage2D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function N() {
        try {
            i.compressedTexImage3D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function $() {
        try {
            i.texSubImage2D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function ie() {
        try {
            i.texSubImage3D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function j() {
        try {
            i.compressedTexSubImage2D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function Te() {
        try {
            i.compressedTexSubImage3D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function be() {
        try {
            i.texStorage2D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function Ie() {
        try {
            i.texStorage3D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function Ae() {
        try {
            i.texImage2D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function J() {
        try {
            i.texImage3D(...arguments)
        } catch (I) {
            I("WebGLState:", I)
        }
    }
    function de(I) {
        Xe.equals(I) === !1 && (i.scissor(I.x, I.y, I.z, I.w),
        Xe.copy(I))
    }
    function Fe(I) {
        it.equals(I) === !1 && (i.viewport(I.x, I.y, I.z, I.w),
        it.copy(I))
    }
    function Ne(I, ve) {
        let ge = c.get(ve);
        ge === void 0 && (ge = new WeakMap,
        c.set(ve, ge));
        let ue = ge.get(I);
        ue === void 0 && (ue = i.getUniformBlockIndex(ve, I.name),
        ge.set(I, ue))
    }
    function Ee(I, ve) {
        const ue = c.get(ve).get(I);
        l.get(ve) !== ue && (i.uniformBlockBinding(ve, ue, I.__bindingPointIndex),
        l.set(ve, ue))
    }
    function Ve() {
        i.disable(i.BLEND),
        i.disable(i.CULL_FACE),
        i.disable(i.DEPTH_TEST),
        i.disable(i.POLYGON_OFFSET_FILL),
        i.disable(i.SCISSOR_TEST),
        i.disable(i.STENCIL_TEST),
        i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),
        i.blendEquation(i.FUNC_ADD),
        i.blendFunc(i.ONE, i.ZERO),
        i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO),
        i.blendColor(0, 0, 0, 0),
        i.colorMask(!0, !0, !0, !0),
        i.clearColor(0, 0, 0, 0),
        i.depthMask(!0),
        i.depthFunc(i.LESS),
        a.setReversed(!1),
        i.clearDepth(1),
        i.stencilMask(4294967295),
        i.stencilFunc(i.ALWAYS, 0, 4294967295),
        i.stencilOp(i.KEEP, i.KEEP, i.KEEP),
        i.clearStencil(0),
        i.cullFace(i.BACK),
        i.frontFace(i.CCW),
        i.polygonOffset(0, 0),
        i.activeTexture(i.TEXTURE0),
        i.bindFramebuffer(i.FRAMEBUFFER, null),
        i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null),
        i.bindFramebuffer(i.READ_FRAMEBUFFER, null),
        i.useProgram(null),
        i.lineWidth(1),
        i.scissor(0, 0, i.canvas.width, i.canvas.height),
        i.viewport(0, 0, i.canvas.width, i.canvas.height),
        h = {},
        le = null,
        fe = {},
        d = {},
        p = new WeakMap,
        m = [],
        g = null,
        _ = !1,
        f = null,
        u = null,
        b = null,
        v = null,
        T = null,
        C = null,
        E = null,
        R = new et(0,0,0),
        F = 0,
        S = !1,
        M = null,
        U = null,
        B = null,
        k = null,
        D = null,
        Xe.set(0, 0, i.canvas.width, i.canvas.height),
        it.set(0, 0, i.canvas.width, i.canvas.height),
        s.reset(),
        a.reset(),
        o.reset()
    }
    return {
        buffers: {
            color: s,
            depth: a,
            stencil: o
        },
        enable: se,
        disable: Re,
        bindFramebuffer: We,
        drawBuffers: W,
        useProgram: re,
        setBlending: ae,
        setMaterial: w,
        setFlipSided: ce,
        setCullFace: _e,
        setLineWidth: Pe,
        setPolygonOffset: xe,
        setScissorTest: De,
        activeTexture: oe,
        bindTexture: me,
        unbindTexture: A,
        compressedTexImage2D: x,
        compressedTexImage3D: N,
        texImage2D: Ae,
        texImage3D: J,
        updateUBOMapping: Ne,
        uniformBlockBinding: Ee,
        texStorage2D: be,
        texStorage3D: Ie,
        texSubImage2D: $,
        texSubImage3D: ie,
        compressedTexSubImage2D: j,
        compressedTexSubImage3D: Te,
        scissor: de,
        viewport: Fe,
        reset: Ve
    }
}
function z0(i, e, t, n, r, s, a) {
    const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null
      , l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent)
      , c = new Ze
      , h = new WeakMap;
    let d;
    const p = new WeakMap;
    let m = !1;
    try {
        m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1,1).getContext("2d") !== null
    } catch {}
    function g(A, x) {
        return m ? new OffscreenCanvas(A,x) : $r("canvas")
    }
    function _(A, x, N) {
        let $ = 1;
        const ie = me(A);
        if ((ie.width > N || ie.height > N) && ($ = N / Math.max(ie.width, ie.height)),
        $ < 1)
            if (typeof HTMLImageElement < "u" && A instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && A instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && A instanceof ImageBitmap || typeof VideoFrame < "u" && A instanceof VideoFrame) {
                const j = Math.floor($ * ie.width)
                  , Te = Math.floor($ * ie.height);
                d === void 0 && (d = g(j, Te));
                const be = x ? g(j, Te) : d;
                return be.width = j,
                be.height = Te,
                be.getContext("2d").drawImage(A, 0, 0, j, Te),
                Ye("WebGLRenderer: Texture has been resized from (" + ie.width + "x" + ie.height + ") to (" + j + "x" + Te + ")."),
                be
            } else
                return "data" in A && Ye("WebGLRenderer: Image in DataTexture is too big (" + ie.width + "x" + ie.height + ")."),
                A;
        return A
    }
    function f(A) {
        return A.generateMipmaps
    }
    function u(A) {
        i.generateMipmap(A)
    }
    function b(A) {
        return A.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : A.isWebGL3DRenderTarget ? i.TEXTURE_3D : A.isWebGLArrayRenderTarget || A.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D
    }
    function v(A, x, N, $, ie=!1) {
        if (A !== null) {
            if (i[A] !== void 0)
                return i[A];
            Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + A + "'")
        }
        let j = x;
        if (x === i.RED && (N === i.FLOAT && (j = i.R32F),
        N === i.HALF_FLOAT && (j = i.R16F),
        N === i.UNSIGNED_BYTE && (j = i.R8)),
        x === i.RED_INTEGER && (N === i.UNSIGNED_BYTE && (j = i.R8UI),
        N === i.UNSIGNED_SHORT && (j = i.R16UI),
        N === i.UNSIGNED_INT && (j = i.R32UI),
        N === i.BYTE && (j = i.R8I),
        N === i.SHORT && (j = i.R16I),
        N === i.INT && (j = i.R32I)),
        x === i.RG && (N === i.FLOAT && (j = i.RG32F),
        N === i.HALF_FLOAT && (j = i.RG16F),
        N === i.UNSIGNED_BYTE && (j = i.RG8)),
        x === i.RG_INTEGER && (N === i.UNSIGNED_BYTE && (j = i.RG8UI),
        N === i.UNSIGNED_SHORT && (j = i.RG16UI),
        N === i.UNSIGNED_INT && (j = i.RG32UI),
        N === i.BYTE && (j = i.RG8I),
        N === i.SHORT && (j = i.RG16I),
        N === i.INT && (j = i.RG32I)),
        x === i.RGB_INTEGER && (N === i.UNSIGNED_BYTE && (j = i.RGB8UI),
        N === i.UNSIGNED_SHORT && (j = i.RGB16UI),
        N === i.UNSIGNED_INT && (j = i.RGB32UI),
        N === i.BYTE && (j = i.RGB8I),
        N === i.SHORT && (j = i.RGB16I),
        N === i.INT && (j = i.RGB32I)),
        x === i.RGBA_INTEGER && (N === i.UNSIGNED_BYTE && (j = i.RGBA8UI),
        N === i.UNSIGNED_SHORT && (j = i.RGBA16UI),
        N === i.UNSIGNED_INT && (j = i.RGBA32UI),
        N === i.BYTE && (j = i.RGBA8I),
        N === i.SHORT && (j = i.RGBA16I),
        N === i.INT && (j = i.RGBA32I)),
        x === i.RGB && (N === i.UNSIGNED_INT_5_9_9_9_REV && (j = i.RGB9_E5),
        N === i.UNSIGNED_INT_10F_11F_11F_REV && (j = i.R11F_G11F_B10F)),
        x === i.RGBA) {
            const Te = ie ? qr : ot.getTransfer($);
            N === i.FLOAT && (j = i.RGBA32F),
            N === i.HALF_FLOAT && (j = i.RGBA16F),
            N === i.UNSIGNED_BYTE && (j = Te === pt ? i.SRGB8_ALPHA8 : i.RGBA8),
            N === i.UNSIGNED_SHORT_4_4_4_4 && (j = i.RGBA4),
            N === i.UNSIGNED_SHORT_5_5_5_1 && (j = i.RGB5_A1)
        }
        return (j === i.R16F || j === i.R32F || j === i.RG16F || j === i.RG32F || j === i.RGBA16F || j === i.RGBA32F) && e.get("EXT_color_buffer_float"),
        j
    }
    function T(A, x) {
        let N;
        return A ? x === null || x === ui || x === or ? N = i.DEPTH24_STENCIL8 : x === bn ? N = i.DEPTH32F_STENCIL8 : x === ar && (N = i.DEPTH24_STENCIL8,
        Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : x === null || x === ui || x === or ? N = i.DEPTH_COMPONENT24 : x === bn ? N = i.DEPTH_COMPONENT32F : x === ar && (N = i.DEPTH_COMPONENT16),
        N
    }
    function C(A, x) {
        return f(A) === !0 || A.isFramebufferTexture && A.minFilter !== en && A.minFilter !== ln ? Math.log2(Math.max(x.width, x.height)) + 1 : A.mipmaps !== void 0 && A.mipmaps.length > 0 ? A.mipmaps.length : A.isCompressedTexture && Array.isArray(A.image) ? x.mipmaps.length : 1
    }
    function E(A) {
        const x = A.target;
        x.removeEventListener("dispose", E),
        F(x),
        x.isVideoTexture && h.delete(x)
    }
    function R(A) {
        const x = A.target;
        x.removeEventListener("dispose", R),
        M(x)
    }
    function F(A) {
        const x = n.get(A);
        if (x.__webglInit === void 0)
            return;
        const N = A.source
          , $ = p.get(N);
        if ($) {
            const ie = $[x.__cacheKey];
            ie.usedTimes--,
            ie.usedTimes === 0 && S(A),
            Object.keys($).length === 0 && p.delete(N)
        }
        n.remove(A)
    }
    function S(A) {
        const x = n.get(A);
        i.deleteTexture(x.__webglTexture);
        const N = A.source
          , $ = p.get(N);
        delete $[x.__cacheKey],
        a.memory.textures--
    }
    function M(A) {
        const x = n.get(A);
        if (A.depthTexture && (A.depthTexture.dispose(),
        n.remove(A.depthTexture)),
        A.isWebGLCubeRenderTarget)
            for (let $ = 0; $ < 6; $++) {
                if (Array.isArray(x.__webglFramebuffer[$]))
                    for (let ie = 0; ie < x.__webglFramebuffer[$].length; ie++)
                        i.deleteFramebuffer(x.__webglFramebuffer[$][ie]);
                else
                    i.deleteFramebuffer(x.__webglFramebuffer[$]);
                x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer[$])
            }
        else {
            if (Array.isArray(x.__webglFramebuffer))
                for (let $ = 0; $ < x.__webglFramebuffer.length; $++)
                    i.deleteFramebuffer(x.__webglFramebuffer[$]);
            else
                i.deleteFramebuffer(x.__webglFramebuffer);
            if (x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer),
            x.__webglMultisampledFramebuffer && i.deleteFramebuffer(x.__webglMultisampledFramebuffer),
            x.__webglColorRenderbuffer)
                for (let $ = 0; $ < x.__webglColorRenderbuffer.length; $++)
                    x.__webglColorRenderbuffer[$] && i.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);
            x.__webglDepthRenderbuffer && i.deleteRenderbuffer(x.__webglDepthRenderbuffer)
        }
        const N = A.textures;
        for (let $ = 0, ie = N.length; $ < ie; $++) {
            const j = n.get(N[$]);
            j.__webglTexture && (i.deleteTexture(j.__webglTexture),
            a.memory.textures--),
            n.remove(N[$])
        }
        n.remove(A)
    }
    let U = 0;
    function B() {
        U = 0
    }
    function k() {
        const A = U;
        return A >= r.maxTextures && Ye("WebGLTextures: Trying to use " + A + " texture units while this GPU supports only " + r.maxTextures),
        U += 1,
        A
    }
    function D(A) {
        const x = [];
        return x.push(A.wrapS),
        x.push(A.wrapT),
        x.push(A.wrapR || 0),
        x.push(A.magFilter),
        x.push(A.minFilter),
        x.push(A.anisotropy),
        x.push(A.internalFormat),
        x.push(A.format),
        x.push(A.type),
        x.push(A.generateMipmaps),
        x.push(A.premultiplyAlpha),
        x.push(A.flipY),
        x.push(A.unpackAlignment),
        x.push(A.colorSpace),
        x.join()
    }
    function G(A, x) {
        const N = n.get(A);
        if (A.isVideoTexture && De(A),
        A.isRenderTargetTexture === !1 && A.isExternalTexture !== !0 && A.version > 0 && N.__version !== A.version) {
            const $ = A.image;
            if ($ === null)
                Ye("WebGLRenderer: Texture marked for update but no image data found.");
            else if ($.complete === !1)
                Ye("WebGLRenderer: Texture marked for update but image is incomplete");
            else {
                Q(N, A, x);
                return
            }
        } else
            A.isExternalTexture && (N.__webglTexture = A.sourceTexture ? A.sourceTexture : null);
        t.bindTexture(i.TEXTURE_2D, N.__webglTexture, i.TEXTURE0 + x)
    }
    function Y(A, x) {
        const N = n.get(A);
        if (A.isRenderTargetTexture === !1 && A.version > 0 && N.__version !== A.version) {
            Q(N, A, x);
            return
        } else
            A.isExternalTexture && (N.__webglTexture = A.sourceTexture ? A.sourceTexture : null);
        t.bindTexture(i.TEXTURE_2D_ARRAY, N.__webglTexture, i.TEXTURE0 + x)
    }
    function te(A, x) {
        const N = n.get(A);
        if (A.isRenderTargetTexture === !1 && A.version > 0 && N.__version !== A.version) {
            Q(N, A, x);
            return
        }
        t.bindTexture(i.TEXTURE_3D, N.__webglTexture, i.TEXTURE0 + x)
    }
    function L(A, x) {
        const N = n.get(A);
        if (A.version > 0 && N.__version !== A.version) {
            se(N, A, x);
            return
        }
        t.bindTexture(i.TEXTURE_CUBE_MAP, N.__webglTexture, i.TEXTURE0 + x)
    }
    const le = {
        [Xs]: i.REPEAT,
        [Fn]: i.CLAMP_TO_EDGE,
        [qs]: i.MIRRORED_REPEAT
    }
      , fe = {
        [en]: i.NEAREST,
        [Wl]: i.NEAREST_MIPMAP_NEAREST,
        [mr]: i.NEAREST_MIPMAP_LINEAR,
        [ln]: i.LINEAR,
        [ns]: i.LINEAR_MIPMAP_NEAREST,
        [ci]: i.LINEAR_MIPMAP_LINEAR
    }
      , Se = {
        [$l]: i.NEVER,
        [eu]: i.ALWAYS,
        [jl]: i.LESS,
        [Cc]: i.LEQUAL,
        [Kl]: i.EQUAL,
        [Ql]: i.GEQUAL,
        [Zl]: i.GREATER,
        [Jl]: i.NOTEQUAL
    };
    function pe(A, x) {
        if (x.type === bn && e.has("OES_texture_float_linear") === !1 && (x.magFilter === ln || x.magFilter === ns || x.magFilter === mr || x.magFilter === ci || x.minFilter === ln || x.minFilter === ns || x.minFilter === mr || x.minFilter === ci) && Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),
        i.texParameteri(A, i.TEXTURE_WRAP_S, le[x.wrapS]),
        i.texParameteri(A, i.TEXTURE_WRAP_T, le[x.wrapT]),
        (A === i.TEXTURE_3D || A === i.TEXTURE_2D_ARRAY) && i.texParameteri(A, i.TEXTURE_WRAP_R, le[x.wrapR]),
        i.texParameteri(A, i.TEXTURE_MAG_FILTER, fe[x.magFilter]),
        i.texParameteri(A, i.TEXTURE_MIN_FILTER, fe[x.minFilter]),
        x.compareFunction && (i.texParameteri(A, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE),
        i.texParameteri(A, i.TEXTURE_COMPARE_FUNC, Se[x.compareFunction])),
        e.has("EXT_texture_filter_anisotropic") === !0) {
            if (x.magFilter === en || x.minFilter !== mr && x.minFilter !== ci || x.type === bn && e.has("OES_texture_float_linear") === !1)
                return;
            if (x.anisotropy > 1 || n.get(x).__currentAnisotropy) {
                const N = e.get("EXT_texture_filter_anisotropic");
                i.texParameterf(A, N.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(x.anisotropy, r.getMaxAnisotropy())),
                n.get(x).__currentAnisotropy = x.anisotropy
            }
        }
    }
    function Xe(A, x) {
        let N = !1;
        A.__webglInit === void 0 && (A.__webglInit = !0,
        x.addEventListener("dispose", E));
        const $ = x.source;
        let ie = p.get($);
        ie === void 0 && (ie = {},
        p.set($, ie));
        const j = D(x);
        if (j !== A.__cacheKey) {
            ie[j] === void 0 && (ie[j] = {
                texture: i.createTexture(),
                usedTimes: 0
            },
            a.memory.textures++,
            N = !0),
            ie[j].usedTimes++;
            const Te = ie[A.__cacheKey];
            Te !== void 0 && (ie[A.__cacheKey].usedTimes--,
            Te.usedTimes === 0 && S(x)),
            A.__cacheKey = j,
            A.__webglTexture = ie[j].texture
        }
        return N
    }
    function it(A, x, N) {
        return Math.floor(Math.floor(A / N) / x)
    }
    function Je(A, x, N, $) {
        const j = A.updateRanges;
        if (j.length === 0)
            t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, x.width, x.height, N, $, x.data);
        else {
            j.sort( (J, de) => J.start - de.start);
            let Te = 0;
            for (let J = 1; J < j.length; J++) {
                const de = j[Te]
                  , Fe = j[J]
                  , Ne = de.start + de.count
                  , Ee = it(Fe.start, x.width, 4)
                  , Ve = it(de.start, x.width, 4);
                Fe.start <= Ne + 1 && Ee === Ve && it(Fe.start + Fe.count - 1, x.width, 4) === Ee ? de.count = Math.max(de.count, Fe.start + Fe.count - de.start) : (++Te,
                j[Te] = Fe)
            }
            j.length = Te + 1;
            const be = i.getParameter(i.UNPACK_ROW_LENGTH)
              , Ie = i.getParameter(i.UNPACK_SKIP_PIXELS)
              , Ae = i.getParameter(i.UNPACK_SKIP_ROWS);
            i.pixelStorei(i.UNPACK_ROW_LENGTH, x.width);
            for (let J = 0, de = j.length; J < de; J++) {
                const Fe = j[J]
                  , Ne = Math.floor(Fe.start / 4)
                  , Ee = Math.ceil(Fe.count / 4)
                  , Ve = Ne % x.width
                  , I = Math.floor(Ne / x.width)
                  , ve = Ee
                  , ge = 1;
                i.pixelStorei(i.UNPACK_SKIP_PIXELS, Ve),
                i.pixelStorei(i.UNPACK_SKIP_ROWS, I),
                t.texSubImage2D(i.TEXTURE_2D, 0, Ve, I, ve, ge, N, $, x.data)
            }
            A.clearUpdateRanges(),
            i.pixelStorei(i.UNPACK_ROW_LENGTH, be),
            i.pixelStorei(i.UNPACK_SKIP_PIXELS, Ie),
            i.pixelStorei(i.UNPACK_SKIP_ROWS, Ae)
        }
    }
    function Q(A, x, N) {
        let $ = i.TEXTURE_2D;
        (x.isDataArrayTexture || x.isCompressedArrayTexture) && ($ = i.TEXTURE_2D_ARRAY),
        x.isData3DTexture && ($ = i.TEXTURE_3D);
        const ie = Xe(A, x)
          , j = x.source;
        t.bindTexture($, A.__webglTexture, i.TEXTURE0 + N);
        const Te = n.get(j);
        if (j.version !== Te.__version || ie === !0) {
            t.activeTexture(i.TEXTURE0 + N);
            const be = ot.getPrimaries(ot.workingColorSpace)
              , Ie = x.colorSpace === Xn ? null : ot.getPrimaries(x.colorSpace)
              , Ae = x.colorSpace === Xn || be === Ie ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
            i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY),
            i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha),
            i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment),
            i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ae);
            let J = _(x.image, !1, r.maxTextureSize);
            J = oe(x, J);
            const de = s.convert(x.format, x.colorSpace)
              , Fe = s.convert(x.type);
            let Ne = v(x.internalFormat, de, Fe, x.colorSpace, x.isVideoTexture);
            pe($, x);
            let Ee;
            const Ve = x.mipmaps
              , I = x.isVideoTexture !== !0
              , ve = Te.__version === void 0 || ie === !0
              , ge = j.dataReady
              , ue = C(x, J);
            if (x.isDepthTexture)
                Ne = T(x.format === lr, x.type),
                ve && (I ? t.texStorage2D(i.TEXTURE_2D, 1, Ne, J.width, J.height) : t.texImage2D(i.TEXTURE_2D, 0, Ne, J.width, J.height, 0, de, Fe, null));
            else if (x.isDataTexture)
                if (Ve.length > 0) {
                    I && ve && t.texStorage2D(i.TEXTURE_2D, ue, Ne, Ve[0].width, Ve[0].height);
                    for (let ne = 0, Z = Ve.length; ne < Z; ne++)
                        Ee = Ve[ne],
                        I ? ge && t.texSubImage2D(i.TEXTURE_2D, ne, 0, 0, Ee.width, Ee.height, de, Fe, Ee.data) : t.texImage2D(i.TEXTURE_2D, ne, Ne, Ee.width, Ee.height, 0, de, Fe, Ee.data);
                    x.generateMipmaps = !1
                } else
                    I ? (ve && t.texStorage2D(i.TEXTURE_2D, ue, Ne, J.width, J.height),
                    ge && Je(x, J, de, Fe)) : t.texImage2D(i.TEXTURE_2D, 0, Ne, J.width, J.height, 0, de, Fe, J.data);
            else if (x.isCompressedTexture)
                if (x.isCompressedArrayTexture) {
                    I && ve && t.texStorage3D(i.TEXTURE_2D_ARRAY, ue, Ne, Ve[0].width, Ve[0].height, J.depth);
                    for (let ne = 0, Z = Ve.length; ne < Z; ne++)
                        if (Ee = Ve[ne],
                        x.format !== _n)
                            if (de !== null)
                                if (I) {
                                    if (ge)
                                        if (x.layerUpdates.size > 0) {
                                            const we = Bo(Ee.width, Ee.height, x.format, x.type);
                                            for (const ze of x.layerUpdates) {
                                                const lt = Ee.data.subarray(ze * we / Ee.data.BYTES_PER_ELEMENT, (ze + 1) * we / Ee.data.BYTES_PER_ELEMENT);
                                                t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, ne, 0, 0, ze, Ee.width, Ee.height, 1, de, lt)
                                            }
                                            x.clearLayerUpdates()
                                        } else
                                            t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, ne, 0, 0, 0, Ee.width, Ee.height, J.depth, de, Ee.data)
                                } else
                                    t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, ne, Ne, Ee.width, Ee.height, J.depth, 0, Ee.data, 0, 0);
                            else
                                Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
                        else
                            I ? ge && t.texSubImage3D(i.TEXTURE_2D_ARRAY, ne, 0, 0, 0, Ee.width, Ee.height, J.depth, de, Fe, Ee.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, ne, Ne, Ee.width, Ee.height, J.depth, 0, de, Fe, Ee.data)
                } else {
                    I && ve && t.texStorage2D(i.TEXTURE_2D, ue, Ne, Ve[0].width, Ve[0].height);
                    for (let ne = 0, Z = Ve.length; ne < Z; ne++)
                        Ee = Ve[ne],
                        x.format !== _n ? de !== null ? I ? ge && t.compressedTexSubImage2D(i.TEXTURE_2D, ne, 0, 0, Ee.width, Ee.height, de, Ee.data) : t.compressedTexImage2D(i.TEXTURE_2D, ne, Ne, Ee.width, Ee.height, 0, Ee.data) : Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : I ? ge && t.texSubImage2D(i.TEXTURE_2D, ne, 0, 0, Ee.width, Ee.height, de, Fe, Ee.data) : t.texImage2D(i.TEXTURE_2D, ne, Ne, Ee.width, Ee.height, 0, de, Fe, Ee.data)
                }
            else if (x.isDataArrayTexture)
                if (I) {
                    if (ve && t.texStorage3D(i.TEXTURE_2D_ARRAY, ue, Ne, J.width, J.height, J.depth),
                    ge)
                        if (x.layerUpdates.size > 0) {
                            const ne = Bo(J.width, J.height, x.format, x.type);
                            for (const Z of x.layerUpdates) {
                                const we = J.data.subarray(Z * ne / J.data.BYTES_PER_ELEMENT, (Z + 1) * ne / J.data.BYTES_PER_ELEMENT);
                                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, Z, J.width, J.height, 1, de, Fe, we)
                            }
                            x.clearLayerUpdates()
                        } else
                            t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, de, Fe, J.data)
                } else
                    t.texImage3D(i.TEXTURE_2D_ARRAY, 0, Ne, J.width, J.height, J.depth, 0, de, Fe, J.data);
            else if (x.isData3DTexture)
                I ? (ve && t.texStorage3D(i.TEXTURE_3D, ue, Ne, J.width, J.height, J.depth),
                ge && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, de, Fe, J.data)) : t.texImage3D(i.TEXTURE_3D, 0, Ne, J.width, J.height, J.depth, 0, de, Fe, J.data);
            else if (x.isFramebufferTexture) {
                if (ve)
                    if (I)
                        t.texStorage2D(i.TEXTURE_2D, ue, Ne, J.width, J.height);
                    else {
                        let ne = J.width
                          , Z = J.height;
                        for (let we = 0; we < ue; we++)
                            t.texImage2D(i.TEXTURE_2D, we, Ne, ne, Z, 0, de, Fe, null),
                            ne >>= 1,
                            Z >>= 1
                    }
            } else if (Ve.length > 0) {
                if (I && ve) {
                    const ne = me(Ve[0]);
                    t.texStorage2D(i.TEXTURE_2D, ue, Ne, ne.width, ne.height)
                }
                for (let ne = 0, Z = Ve.length; ne < Z; ne++)
                    Ee = Ve[ne],
                    I ? ge && t.texSubImage2D(i.TEXTURE_2D, ne, 0, 0, de, Fe, Ee) : t.texImage2D(i.TEXTURE_2D, ne, Ne, de, Fe, Ee);
                x.generateMipmaps = !1
            } else if (I) {
                if (ve) {
                    const ne = me(J);
                    t.texStorage2D(i.TEXTURE_2D, ue, Ne, ne.width, ne.height)
                }
                ge && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, de, Fe, J)
            } else
                t.texImage2D(i.TEXTURE_2D, 0, Ne, de, Fe, J);
            f(x) && u($),
            Te.__version = j.version,
            x.onUpdate && x.onUpdate(x)
        }
        A.__version = x.version
    }
    function se(A, x, N) {
        if (x.image.length !== 6)
            return;
        const $ = Xe(A, x)
          , ie = x.source;
        t.bindTexture(i.TEXTURE_CUBE_MAP, A.__webglTexture, i.TEXTURE0 + N);
        const j = n.get(ie);
        if (ie.version !== j.__version || $ === !0) {
            t.activeTexture(i.TEXTURE0 + N);
            const Te = ot.getPrimaries(ot.workingColorSpace)
              , be = x.colorSpace === Xn ? null : ot.getPrimaries(x.colorSpace)
              , Ie = x.colorSpace === Xn || Te === be ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
            i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY),
            i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha),
            i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment),
            i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ie);
            const Ae = x.isCompressedTexture || x.image[0].isCompressedTexture
              , J = x.image[0] && x.image[0].isDataTexture
              , de = [];
            for (let Z = 0; Z < 6; Z++)
                !Ae && !J ? de[Z] = _(x.image[Z], !0, r.maxCubemapSize) : de[Z] = J ? x.image[Z].image : x.image[Z],
                de[Z] = oe(x, de[Z]);
            const Fe = de[0]
              , Ne = s.convert(x.format, x.colorSpace)
              , Ee = s.convert(x.type)
              , Ve = v(x.internalFormat, Ne, Ee, x.colorSpace)
              , I = x.isVideoTexture !== !0
              , ve = j.__version === void 0 || $ === !0
              , ge = ie.dataReady;
            let ue = C(x, Fe);
            pe(i.TEXTURE_CUBE_MAP, x);
            let ne;
            if (Ae) {
                I && ve && t.texStorage2D(i.TEXTURE_CUBE_MAP, ue, Ve, Fe.width, Fe.height);
                for (let Z = 0; Z < 6; Z++) {
                    ne = de[Z].mipmaps;
                    for (let we = 0; we < ne.length; we++) {
                        const ze = ne[we];
                        x.format !== _n ? Ne !== null ? I ? ge && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, we, 0, 0, ze.width, ze.height, Ne, ze.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, we, Ve, ze.width, ze.height, 0, ze.data) : Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : I ? ge && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, we, 0, 0, ze.width, ze.height, Ne, Ee, ze.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, we, Ve, ze.width, ze.height, 0, Ne, Ee, ze.data)
                    }
                }
            } else {
                if (ne = x.mipmaps,
                I && ve) {
                    ne.length > 0 && ue++;
                    const Z = me(de[0]);
                    t.texStorage2D(i.TEXTURE_CUBE_MAP, ue, Ve, Z.width, Z.height)
                }
                for (let Z = 0; Z < 6; Z++)
                    if (J) {
                        I ? ge && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, 0, 0, de[Z].width, de[Z].height, Ne, Ee, de[Z].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, Ve, de[Z].width, de[Z].height, 0, Ne, Ee, de[Z].data);
                        for (let we = 0; we < ne.length; we++) {
                            const lt = ne[we].image[Z].image;
                            I ? ge && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, we + 1, 0, 0, lt.width, lt.height, Ne, Ee, lt.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, we + 1, Ve, lt.width, lt.height, 0, Ne, Ee, lt.data)
                        }
                    } else {
                        I ? ge && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, 0, 0, Ne, Ee, de[Z]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, Ve, Ne, Ee, de[Z]);
                        for (let we = 0; we < ne.length; we++) {
                            const ze = ne[we];
                            I ? ge && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, we + 1, 0, 0, Ne, Ee, ze.image[Z]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Z, we + 1, Ve, Ne, Ee, ze.image[Z])
                        }
                    }
            }
            f(x) && u(i.TEXTURE_CUBE_MAP),
            j.__version = ie.version,
            x.onUpdate && x.onUpdate(x)
        }
        A.__version = x.version
    }
    function Re(A, x, N, $, ie, j) {
        const Te = s.convert(N.format, N.colorSpace)
          , be = s.convert(N.type)
          , Ie = v(N.internalFormat, Te, be, N.colorSpace)
          , Ae = n.get(x)
          , J = n.get(N);
        if (J.__renderTarget = x,
        !Ae.__hasExternalTextures) {
            const de = Math.max(1, x.width >> j)
              , Fe = Math.max(1, x.height >> j);
            ie === i.TEXTURE_3D || ie === i.TEXTURE_2D_ARRAY ? t.texImage3D(ie, j, Ie, de, Fe, x.depth, 0, Te, be, null) : t.texImage2D(ie, j, Ie, de, Fe, 0, Te, be, null)
        }
        t.bindFramebuffer(i.FRAMEBUFFER, A),
        xe(x) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, $, ie, J.__webglTexture, 0, Pe(x)) : (ie === i.TEXTURE_2D || ie >= i.TEXTURE_CUBE_MAP_POSITIVE_X && ie <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, $, ie, J.__webglTexture, j),
        t.bindFramebuffer(i.FRAMEBUFFER, null)
    }
    function We(A, x, N) {
        if (i.bindRenderbuffer(i.RENDERBUFFER, A),
        x.depthBuffer) {
            const $ = x.depthTexture
              , ie = $ && $.isDepthTexture ? $.type : null
              , j = T(x.stencilBuffer, ie)
              , Te = x.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT
              , be = Pe(x);
            xe(x) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, be, j, x.width, x.height) : N ? i.renderbufferStorageMultisample(i.RENDERBUFFER, be, j, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, j, x.width, x.height),
            i.framebufferRenderbuffer(i.FRAMEBUFFER, Te, i.RENDERBUFFER, A)
        } else {
            const $ = x.textures;
            for (let ie = 0; ie < $.length; ie++) {
                const j = $[ie]
                  , Te = s.convert(j.format, j.colorSpace)
                  , be = s.convert(j.type)
                  , Ie = v(j.internalFormat, Te, be, j.colorSpace)
                  , Ae = Pe(x);
                N && xe(x) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Ae, Ie, x.width, x.height) : xe(x) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Ae, Ie, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, Ie, x.width, x.height)
            }
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null)
    }
    function W(A, x) {
        if (x && x.isWebGLCubeRenderTarget)
            throw new Error("Depth Texture with cube render targets is not supported");
        if (t.bindFramebuffer(i.FRAMEBUFFER, A),
        !(x.depthTexture && x.depthTexture.isDepthTexture))
            throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
        const $ = n.get(x.depthTexture);
        $.__renderTarget = x,
        (!$.__webglTexture || x.depthTexture.image.width !== x.width || x.depthTexture.image.height !== x.height) && (x.depthTexture.image.width = x.width,
        x.depthTexture.image.height = x.height,
        x.depthTexture.needsUpdate = !0),
        G(x.depthTexture, 0);
        const ie = $.__webglTexture
          , j = Pe(x);
        if (x.depthTexture.format === cr)
            xe(x) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, ie, 0, j) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, ie, 0);
        else if (x.depthTexture.format === lr)
            xe(x) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, ie, 0, j) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, ie, 0);
        else
            throw new Error("Unknown depthTexture format")
    }
    function re(A) {
        const x = n.get(A)
          , N = A.isWebGLCubeRenderTarget === !0;
        if (x.__boundDepthTexture !== A.depthTexture) {
            const $ = A.depthTexture;
            if (x.__depthDisposeCallback && x.__depthDisposeCallback(),
            $) {
                const ie = () => {
                    delete x.__boundDepthTexture,
                    delete x.__depthDisposeCallback,
                    $.removeEventListener("dispose", ie)
                }
                ;
                $.addEventListener("dispose", ie),
                x.__depthDisposeCallback = ie
            }
            x.__boundDepthTexture = $
        }
        if (A.depthTexture && !x.__autoAllocateDepthBuffer) {
            if (N)
                throw new Error("target.depthTexture not supported in Cube render targets");
            const $ = A.texture.mipmaps;
            $ && $.length > 0 ? W(x.__webglFramebuffer[0], A) : W(x.__webglFramebuffer, A)
        } else if (N) {
            x.__webglDepthbuffer = [];
            for (let $ = 0; $ < 6; $++)
                if (t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[$]),
                x.__webglDepthbuffer[$] === void 0)
                    x.__webglDepthbuffer[$] = i.createRenderbuffer(),
                    We(x.__webglDepthbuffer[$], A, !1);
                else {
                    const ie = A.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT
                      , j = x.__webglDepthbuffer[$];
                    i.bindRenderbuffer(i.RENDERBUFFER, j),
                    i.framebufferRenderbuffer(i.FRAMEBUFFER, ie, i.RENDERBUFFER, j)
                }
        } else {
            const $ = A.texture.mipmaps;
            if ($ && $.length > 0 ? t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[0]) : t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer),
            x.__webglDepthbuffer === void 0)
                x.__webglDepthbuffer = i.createRenderbuffer(),
                We(x.__webglDepthbuffer, A, !1);
            else {
                const ie = A.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT
                  , j = x.__webglDepthbuffer;
                i.bindRenderbuffer(i.RENDERBUFFER, j),
                i.framebufferRenderbuffer(i.FRAMEBUFFER, ie, i.RENDERBUFFER, j)
            }
        }
        t.bindFramebuffer(i.FRAMEBUFFER, null)
    }
    function he(A, x, N) {
        const $ = n.get(A);
        x !== void 0 && Re($.__webglFramebuffer, A, A.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0),
        N !== void 0 && re(A)
    }
    function ee(A) {
        const x = A.texture
          , N = n.get(A)
          , $ = n.get(x);
        A.addEventListener("dispose", R);
        const ie = A.textures
          , j = A.isWebGLCubeRenderTarget === !0
          , Te = ie.length > 1;
        if (Te || ($.__webglTexture === void 0 && ($.__webglTexture = i.createTexture()),
        $.__version = x.version,
        a.memory.textures++),
        j) {
            N.__webglFramebuffer = [];
            for (let be = 0; be < 6; be++)
                if (x.mipmaps && x.mipmaps.length > 0) {
                    N.__webglFramebuffer[be] = [];
                    for (let Ie = 0; Ie < x.mipmaps.length; Ie++)
                        N.__webglFramebuffer[be][Ie] = i.createFramebuffer()
                } else
                    N.__webglFramebuffer[be] = i.createFramebuffer()
        } else {
            if (x.mipmaps && x.mipmaps.length > 0) {
                N.__webglFramebuffer = [];
                for (let be = 0; be < x.mipmaps.length; be++)
                    N.__webglFramebuffer[be] = i.createFramebuffer()
            } else
                N.__webglFramebuffer = i.createFramebuffer();
            if (Te)
                for (let be = 0, Ie = ie.length; be < Ie; be++) {
                    const Ae = n.get(ie[be]);
                    Ae.__webglTexture === void 0 && (Ae.__webglTexture = i.createTexture(),
                    a.memory.textures++)
                }
            if (A.samples > 0 && xe(A) === !1) {
                N.__webglMultisampledFramebuffer = i.createFramebuffer(),
                N.__webglColorRenderbuffer = [],
                t.bindFramebuffer(i.FRAMEBUFFER, N.__webglMultisampledFramebuffer);
                for (let be = 0; be < ie.length; be++) {
                    const Ie = ie[be];
                    N.__webglColorRenderbuffer[be] = i.createRenderbuffer(),
                    i.bindRenderbuffer(i.RENDERBUFFER, N.__webglColorRenderbuffer[be]);
                    const Ae = s.convert(Ie.format, Ie.colorSpace)
                      , J = s.convert(Ie.type)
                      , de = v(Ie.internalFormat, Ae, J, Ie.colorSpace, A.isXRRenderTarget === !0)
                      , Fe = Pe(A);
                    i.renderbufferStorageMultisample(i.RENDERBUFFER, Fe, de, A.width, A.height),
                    i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + be, i.RENDERBUFFER, N.__webglColorRenderbuffer[be])
                }
                i.bindRenderbuffer(i.RENDERBUFFER, null),
                A.depthBuffer && (N.__webglDepthRenderbuffer = i.createRenderbuffer(),
                We(N.__webglDepthRenderbuffer, A, !0)),
                t.bindFramebuffer(i.FRAMEBUFFER, null)
            }
        }
        if (j) {
            t.bindTexture(i.TEXTURE_CUBE_MAP, $.__webglTexture),
            pe(i.TEXTURE_CUBE_MAP, x);
            for (let be = 0; be < 6; be++)
                if (x.mipmaps && x.mipmaps.length > 0)
                    for (let Ie = 0; Ie < x.mipmaps.length; Ie++)
                        Re(N.__webglFramebuffer[be][Ie], A, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + be, Ie);
                else
                    Re(N.__webglFramebuffer[be], A, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + be, 0);
            f(x) && u(i.TEXTURE_CUBE_MAP),
            t.unbindTexture()
        } else if (Te) {
            for (let be = 0, Ie = ie.length; be < Ie; be++) {
                const Ae = ie[be]
                  , J = n.get(Ae);
                let de = i.TEXTURE_2D;
                (A.isWebGL3DRenderTarget || A.isWebGLArrayRenderTarget) && (de = A.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY),
                t.bindTexture(de, J.__webglTexture),
                pe(de, Ae),
                Re(N.__webglFramebuffer, A, Ae, i.COLOR_ATTACHMENT0 + be, de, 0),
                f(Ae) && u(de)
            }
            t.unbindTexture()
        } else {
            let be = i.TEXTURE_2D;
            if ((A.isWebGL3DRenderTarget || A.isWebGLArrayRenderTarget) && (be = A.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY),
            t.bindTexture(be, $.__webglTexture),
            pe(be, x),
            x.mipmaps && x.mipmaps.length > 0)
                for (let Ie = 0; Ie < x.mipmaps.length; Ie++)
                    Re(N.__webglFramebuffer[Ie], A, x, i.COLOR_ATTACHMENT0, be, Ie);
            else
                Re(N.__webglFramebuffer, A, x, i.COLOR_ATTACHMENT0, be, 0);
            f(x) && u(be),
            t.unbindTexture()
        }
        A.depthBuffer && re(A)
    }
    function ae(A) {
        const x = A.textures;
        for (let N = 0, $ = x.length; N < $; N++) {
            const ie = x[N];
            if (f(ie)) {
                const j = b(A)
                  , Te = n.get(ie).__webglTexture;
                t.bindTexture(j, Te),
                u(j),
                t.unbindTexture()
            }
        }
    }
    const w = []
      , ce = [];
    function _e(A) {
        if (A.samples > 0) {
            if (xe(A) === !1) {
                const x = A.textures
                  , N = A.width
                  , $ = A.height;
                let ie = i.COLOR_BUFFER_BIT;
                const j = A.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT
                  , Te = n.get(A)
                  , be = x.length > 1;
                if (be)
                    for (let Ae = 0; Ae < x.length; Ae++)
                        t.bindFramebuffer(i.FRAMEBUFFER, Te.__webglMultisampledFramebuffer),
                        i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Ae, i.RENDERBUFFER, null),
                        t.bindFramebuffer(i.FRAMEBUFFER, Te.__webglFramebuffer),
                        i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Ae, i.TEXTURE_2D, null, 0);
                t.bindFramebuffer(i.READ_FRAMEBUFFER, Te.__webglMultisampledFramebuffer);
                const Ie = A.texture.mipmaps;
                Ie && Ie.length > 0 ? t.bindFramebuffer(i.DRAW_FRAMEBUFFER, Te.__webglFramebuffer[0]) : t.bindFramebuffer(i.DRAW_FRAMEBUFFER, Te.__webglFramebuffer);
                for (let Ae = 0; Ae < x.length; Ae++) {
                    if (A.resolveDepthBuffer && (A.depthBuffer && (ie |= i.DEPTH_BUFFER_BIT),
                    A.stencilBuffer && A.resolveStencilBuffer && (ie |= i.STENCIL_BUFFER_BIT)),
                    be) {
                        i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, Te.__webglColorRenderbuffer[Ae]);
                        const J = n.get(x[Ae]).__webglTexture;
                        i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, J, 0)
                    }
                    i.blitFramebuffer(0, 0, N, $, 0, 0, N, $, ie, i.NEAREST),
                    l === !0 && (w.length = 0,
                    ce.length = 0,
                    w.push(i.COLOR_ATTACHMENT0 + Ae),
                    A.depthBuffer && A.resolveDepthBuffer === !1 && (w.push(j),
                    ce.push(j),
                    i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, ce)),
                    i.invalidateFramebuffer(i.READ_FRAMEBUFFER, w))
                }
                if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null),
                t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null),
                be)
                    for (let Ae = 0; Ae < x.length; Ae++) {
                        t.bindFramebuffer(i.FRAMEBUFFER, Te.__webglMultisampledFramebuffer),
                        i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Ae, i.RENDERBUFFER, Te.__webglColorRenderbuffer[Ae]);
                        const J = n.get(x[Ae]).__webglTexture;
                        t.bindFramebuffer(i.FRAMEBUFFER, Te.__webglFramebuffer),
                        i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Ae, i.TEXTURE_2D, J, 0)
                    }
                t.bindFramebuffer(i.DRAW_FRAMEBUFFER, Te.__webglMultisampledFramebuffer)
            } else if (A.depthBuffer && A.resolveDepthBuffer === !1 && l) {
                const x = A.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
                i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [x])
            }
        }
    }
    function Pe(A) {
        return Math.min(r.maxSamples, A.samples)
    }
    function xe(A) {
        const x = n.get(A);
        return A.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && x.__useRenderToTexture !== !1
    }
    function De(A) {
        const x = a.render.frame;
        h.get(A) !== x && (h.set(A, x),
        A.update())
    }
    function oe(A, x) {
        const N = A.colorSpace
          , $ = A.format
          , ie = A.type;
        return A.isCompressedTexture === !0 || A.isVideoTexture === !0 || N !== Oi && N !== Xn && (ot.getTransfer(N) === pt ? ($ !== _n || ie !== yn) && Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : bt("WebGLTextures: Unsupported texture color space:", N)),
        x
    }
    function me(A) {
        return typeof HTMLImageElement < "u" && A instanceof HTMLImageElement ? (c.width = A.naturalWidth || A.width,
        c.height = A.naturalHeight || A.height) : typeof VideoFrame < "u" && A instanceof VideoFrame ? (c.width = A.displayWidth,
        c.height = A.displayHeight) : (c.width = A.width,
        c.height = A.height),
        c
    }
    this.allocateTextureUnit = k,
    this.resetTextureUnits = B,
    this.setTexture2D = G,
    this.setTexture2DArray = Y,
    this.setTexture3D = te,
    this.setTextureCube = L,
    this.rebindTextures = he,
    this.setupRenderTarget = ee,
    this.updateRenderTargetMipmap = ae,
    this.updateMultisampleRenderTarget = _e,
    this.setupDepthRenderbuffer = re,
    this.setupFrameBufferTexture = Re,
    this.useMultisampledRTT = xe
}
function V0(i, e) {
    function t(n, r=Xn) {
        let s;
        const a = ot.getTransfer(r);
        if (n === yn)
            return i.UNSIGNED_BYTE;
        if (n === La)
            return i.UNSIGNED_SHORT_4_4_4_4;
        if (n === Da)
            return i.UNSIGNED_SHORT_5_5_5_1;
        if (n === yc)
            return i.UNSIGNED_INT_5_9_9_9_REV;
        if (n === Ec)
            return i.UNSIGNED_INT_10F_11F_11F_REV;
        if (n === bc)
            return i.BYTE;
        if (n === Sc)
            return i.SHORT;
        if (n === ar)
            return i.UNSIGNED_SHORT;
        if (n === Pa)
            return i.INT;
        if (n === ui)
            return i.UNSIGNED_INT;
        if (n === bn)
            return i.FLOAT;
        if (n === zi)
            return i.HALF_FLOAT;
        if (n === Tc)
            return i.ALPHA;
        if (n === Ac)
            return i.RGB;
        if (n === _n)
            return i.RGBA;
        if (n === cr)
            return i.DEPTH_COMPONENT;
        if (n === lr)
            return i.DEPTH_STENCIL;
        if (n === Ia)
            return i.RED;
        if (n === Ua)
            return i.RED_INTEGER;
        if (n === Na)
            return i.RG;
        if (n === Fa)
            return i.RG_INTEGER;
        if (n === Oa)
            return i.RGBA_INTEGER;
        if (n === kr || n === Gr || n === Hr || n === Wr)
            if (a === pt)
                if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"),
                s !== null) {
                    if (n === kr)
                        return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
                    if (n === Gr)
                        return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
                    if (n === Hr)
                        return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
                    if (n === Wr)
                        return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
                } else
                    return null;
            else if (s = e.get("WEBGL_compressed_texture_s3tc"),
            s !== null) {
                if (n === kr)
                    return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
                if (n === Gr)
                    return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                if (n === Hr)
                    return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                if (n === Wr)
                    return s.COMPRESSED_RGBA_S3TC_DXT5_EXT
            } else
                return null;
        if (n === Ys || n === $s || n === js || n === Ks)
            if (s = e.get("WEBGL_compressed_texture_pvrtc"),
            s !== null) {
                if (n === Ys)
                    return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                if (n === $s)
                    return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                if (n === js)
                    return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                if (n === Ks)
                    return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
            } else
                return null;
        if (n === Zs || n === Js || n === Qs)
            if (s = e.get("WEBGL_compressed_texture_etc"),
            s !== null) {
                if (n === Zs || n === Js)
                    return a === pt ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
                if (n === Qs)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC
            } else
                return null;
        if (n === ea || n === ta || n === na || n === ia || n === ra || n === sa || n === aa || n === oa || n === ca || n === la || n === ua || n === da || n === ha || n === fa)
            if (s = e.get("WEBGL_compressed_texture_astc"),
            s !== null) {
                if (n === ea)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
                if (n === ta)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
                if (n === na)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
                if (n === ia)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
                if (n === ra)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
                if (n === sa)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
                if (n === aa)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
                if (n === oa)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
                if (n === ca)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
                if (n === la)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
                if (n === ua)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
                if (n === da)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
                if (n === ha)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
                if (n === fa)
                    return a === pt ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR
            } else
                return null;
        if (n === pa || n === ma || n === xa)
            if (s = e.get("EXT_texture_compression_bptc"),
            s !== null) {
                if (n === pa)
                    return a === pt ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
                if (n === ma)
                    return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
                if (n === xa)
                    return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT
            } else
                return null;
        if (n === ga || n === _a || n === va || n === Ma)
            if (s = e.get("EXT_texture_compression_rgtc"),
            s !== null) {
                if (n === ga)
                    return s.COMPRESSED_RED_RGTC1_EXT;
                if (n === _a)
                    return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
                if (n === va)
                    return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
                if (n === Ma)
                    return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT
            } else
                return null;
        return n === or ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null
    }
    return {
        convert: t
    }
}
const k0 = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`
  , G0 = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class H0 {
    constructor() {
        this.texture = null,
        this.mesh = null,
        this.depthNear = 0,
        this.depthFar = 0
    }
    init(e, t) {
        if (this.texture === null) {
            const n = new Vc(e.texture);
            (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear,
            this.depthFar = e.depthFar),
            this.texture = n
        }
    }
    getMesh(e) {
        if (this.texture !== null && this.mesh === null) {
            const t = e.cameras[0].viewport
              , n = new Tn({
                vertexShader: k0,
                fragmentShader: G0,
                uniforms: {
                    depthColor: {
                        value: this.texture
                    },
                    depthWidth: {
                        value: t.z
                    },
                    depthHeight: {
                        value: t.w
                    }
                }
            });
            this.mesh = new tn(new pr(20,20),n)
        }
        return this.mesh
    }
    reset() {
        this.texture = null,
        this.mesh = null
    }
    getDepthTexture() {
        return this.texture
    }
}
class W0 extends Vi {
    constructor(e, t) {
        super();
        const n = this;
        let r = null
          , s = 1
          , a = null
          , o = "local-floor"
          , l = 1
          , c = null
          , h = null
          , d = null
          , p = null
          , m = null
          , g = null;
        const _ = typeof XRWebGLBinding < "u"
          , f = new H0
          , u = {}
          , b = t.getContextAttributes();
        let v = null
          , T = null;
        const C = []
          , E = []
          , R = new Ze;
        let F = null;
        const S = new cn;
        S.viewport = new St;
        const M = new cn;
        M.viewport = new St;
        const U = [S, M]
          , B = new od;
        let k = null
          , D = null;
        this.cameraAutoUpdate = !0,
        this.enabled = !1,
        this.isPresenting = !1,
        this.getController = function(Q) {
            let se = C[Q];
            return se === void 0 && (se = new ys,
            C[Q] = se),
            se.getTargetRaySpace()
        }
        ,
        this.getControllerGrip = function(Q) {
            let se = C[Q];
            return se === void 0 && (se = new ys,
            C[Q] = se),
            se.getGripSpace()
        }
        ,
        this.getHand = function(Q) {
            let se = C[Q];
            return se === void 0 && (se = new ys,
            C[Q] = se),
            se.getHandSpace()
        }
        ;
        function G(Q) {
            const se = E.indexOf(Q.inputSource);
            if (se === -1)
                return;
            const Re = C[se];
            Re !== void 0 && (Re.update(Q.inputSource, Q.frame, c || a),
            Re.dispatchEvent({
                type: Q.type,
                data: Q.inputSource
            }))
        }
        function Y() {
            r.removeEventListener("select", G),
            r.removeEventListener("selectstart", G),
            r.removeEventListener("selectend", G),
            r.removeEventListener("squeeze", G),
            r.removeEventListener("squeezestart", G),
            r.removeEventListener("squeezeend", G),
            r.removeEventListener("end", Y),
            r.removeEventListener("inputsourceschange", te);
            for (let Q = 0; Q < C.length; Q++) {
                const se = E[Q];
                se !== null && (E[Q] = null,
                C[Q].disconnect(se))
            }
            k = null,
            D = null,
            f.reset();
            for (const Q in u)
                delete u[Q];
            e.setRenderTarget(v),
            m = null,
            p = null,
            d = null,
            r = null,
            T = null,
            Je.stop(),
            n.isPresenting = !1,
            e.setPixelRatio(F),
            e.setSize(R.width, R.height, !1),
            n.dispatchEvent({
                type: "sessionend"
            })
        }
        this.setFramebufferScaleFactor = function(Q) {
            s = Q,
            n.isPresenting === !0 && Ye("WebXRManager: Cannot change framebuffer scale while presenting.")
        }
        ,
        this.setReferenceSpaceType = function(Q) {
            o = Q,
            n.isPresenting === !0 && Ye("WebXRManager: Cannot change reference space type while presenting.")
        }
        ,
        this.getReferenceSpace = function() {
            return c || a
        }
        ,
        this.setReferenceSpace = function(Q) {
            c = Q
        }
        ,
        this.getBaseLayer = function() {
            return p !== null ? p : m
        }
        ,
        this.getBinding = function() {
            return d === null && _ && (d = new XRWebGLBinding(r,t)),
            d
        }
        ,
        this.getFrame = function() {
            return g
        }
        ,
        this.getSession = function() {
            return r
        }
        ,
        this.setSession = async function(Q) {
            if (r = Q,
            r !== null) {
                if (v = e.getRenderTarget(),
                r.addEventListener("select", G),
                r.addEventListener("selectstart", G),
                r.addEventListener("selectend", G),
                r.addEventListener("squeeze", G),
                r.addEventListener("squeezestart", G),
                r.addEventListener("squeezeend", G),
                r.addEventListener("end", Y),
                r.addEventListener("inputsourceschange", te),
                b.xrCompatible !== !0 && await t.makeXRCompatible(),
                F = e.getPixelRatio(),
                e.getSize(R),
                _ && "createProjectionLayer" in XRWebGLBinding.prototype) {
                    let Re = null
                      , We = null
                      , W = null;
                    b.depth && (W = b.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24,
                    Re = b.stencil ? lr : cr,
                    We = b.stencil ? or : ui);
                    const re = {
                        colorFormat: t.RGBA8,
                        depthFormat: W,
                        scaleFactor: s
                    };
                    d = this.getBinding(),
                    p = d.createProjectionLayer(re),
                    r.updateRenderState({
                        layers: [p]
                    }),
                    e.setPixelRatio(1),
                    e.setSize(p.textureWidth, p.textureHeight, !1),
                    T = new di(p.textureWidth,p.textureHeight,{
                        format: _n,
                        type: yn,
                        depthTexture: new zc(p.textureWidth,p.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,Re),
                        stencilBuffer: b.stencil,
                        colorSpace: e.outputColorSpace,
                        samples: b.antialias ? 4 : 0,
                        resolveDepthBuffer: p.ignoreDepthValues === !1,
                        resolveStencilBuffer: p.ignoreDepthValues === !1
                    })
                } else {
                    const Re = {
                        antialias: b.antialias,
                        alpha: !0,
                        depth: b.depth,
                        stencil: b.stencil,
                        framebufferScaleFactor: s
                    };
                    m = new XRWebGLLayer(r,t,Re),
                    r.updateRenderState({
                        baseLayer: m
                    }),
                    e.setPixelRatio(1),
                    e.setSize(m.framebufferWidth, m.framebufferHeight, !1),
                    T = new di(m.framebufferWidth,m.framebufferHeight,{
                        format: _n,
                        type: yn,
                        colorSpace: e.outputColorSpace,
                        stencilBuffer: b.stencil,
                        resolveDepthBuffer: m.ignoreDepthValues === !1,
                        resolveStencilBuffer: m.ignoreDepthValues === !1
                    })
                }
                T.isXRRenderTarget = !0,
                this.setFoveation(l),
                c = null,
                a = await r.requestReferenceSpace(o),
                Je.setContext(r),
                Je.start(),
                n.isPresenting = !0,
                n.dispatchEvent({
                    type: "sessionstart"
                })
            }
        }
        ,
        this.getEnvironmentBlendMode = function() {
            if (r !== null)
                return r.environmentBlendMode
        }
        ,
        this.getDepthTexture = function() {
            return f.getDepthTexture()
        }
        ;
        function te(Q) {
            for (let se = 0; se < Q.removed.length; se++) {
                const Re = Q.removed[se]
                  , We = E.indexOf(Re);
                We >= 0 && (E[We] = null,
                C[We].disconnect(Re))
            }
            for (let se = 0; se < Q.added.length; se++) {
                const Re = Q.added[se];
                let We = E.indexOf(Re);
                if (We === -1) {
                    for (let re = 0; re < C.length; re++)
                        if (re >= E.length) {
                            E.push(Re),
                            We = re;
                            break
                        } else if (E[re] === null) {
                            E[re] = Re,
                            We = re;
                            break
                        }
                    if (We === -1)
                        break
                }
                const W = C[We];
                W && W.connect(Re)
            }
        }
        const L = new O
          , le = new O;
        function fe(Q, se, Re) {
            L.setFromMatrixPosition(se.matrixWorld),
            le.setFromMatrixPosition(Re.matrixWorld);
            const We = L.distanceTo(le)
              , W = se.projectionMatrix.elements
              , re = Re.projectionMatrix.elements
              , he = W[14] / (W[10] - 1)
              , ee = W[14] / (W[10] + 1)
              , ae = (W[9] + 1) / W[5]
              , w = (W[9] - 1) / W[5]
              , ce = (W[8] - 1) / W[0]
              , _e = (re[8] + 1) / re[0]
              , Pe = he * ce
              , xe = he * _e
              , De = We / (-ce + _e)
              , oe = De * -ce;
            if (se.matrixWorld.decompose(Q.position, Q.quaternion, Q.scale),
            Q.translateX(oe),
            Q.translateZ(De),
            Q.matrixWorld.compose(Q.position, Q.quaternion, Q.scale),
            Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),
            W[10] === -1)
                Q.projectionMatrix.copy(se.projectionMatrix),
                Q.projectionMatrixInverse.copy(se.projectionMatrixInverse);
            else {
                const me = he + De
                  , A = ee + De
                  , x = Pe - oe
                  , N = xe + (We - oe)
                  , $ = ae * ee / A * me
                  , ie = w * ee / A * me;
                Q.projectionMatrix.makePerspective(x, N, $, ie, me, A),
                Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()
            }
        }
        function Se(Q, se) {
            se === null ? Q.matrixWorld.copy(Q.matrix) : Q.matrixWorld.multiplyMatrices(se.matrixWorld, Q.matrix),
            Q.matrixWorldInverse.copy(Q.matrixWorld).invert()
        }
        this.updateCamera = function(Q) {
            if (r === null)
                return;
            let se = Q.near
              , Re = Q.far;
            f.texture !== null && (f.depthNear > 0 && (se = f.depthNear),
            f.depthFar > 0 && (Re = f.depthFar)),
            B.near = M.near = S.near = se,
            B.far = M.far = S.far = Re,
            (k !== B.near || D !== B.far) && (r.updateRenderState({
                depthNear: B.near,
                depthFar: B.far
            }),
            k = B.near,
            D = B.far),
            B.layers.mask = Q.layers.mask | 6,
            S.layers.mask = B.layers.mask & 3,
            M.layers.mask = B.layers.mask & 5;
            const We = Q.parent
              , W = B.cameras;
            Se(B, We);
            for (let re = 0; re < W.length; re++)
                Se(W[re], We);
            W.length === 2 ? fe(B, S, M) : B.projectionMatrix.copy(S.projectionMatrix),
            pe(Q, B, We)
        }
        ;
        function pe(Q, se, Re) {
            Re === null ? Q.matrix.copy(se.matrixWorld) : (Q.matrix.copy(Re.matrixWorld),
            Q.matrix.invert(),
            Q.matrix.multiply(se.matrixWorld)),
            Q.matrix.decompose(Q.position, Q.quaternion, Q.scale),
            Q.updateMatrixWorld(!0),
            Q.projectionMatrix.copy(se.projectionMatrix),
            Q.projectionMatrixInverse.copy(se.projectionMatrixInverse),
            Q.isPerspectiveCamera && (Q.fov = dr * 2 * Math.atan(1 / Q.projectionMatrix.elements[5]),
            Q.zoom = 1)
        }
        this.getCamera = function() {
            return B
        }
        ,
        this.getFoveation = function() {
            if (!(p === null && m === null))
                return l
        }
        ,
        this.setFoveation = function(Q) {
            l = Q,
            p !== null && (p.fixedFoveation = Q),
            m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = Q)
        }
        ,
        this.hasDepthSensing = function() {
            return f.texture !== null
        }
        ,
        this.getDepthSensingMesh = function() {
            return f.getMesh(B)
        }
        ,
        this.getCameraTexture = function(Q) {
            return u[Q]
        }
        ;
        let Xe = null;
        function it(Q, se) {
            if (h = se.getViewerPose(c || a),
            g = se,
            h !== null) {
                const Re = h.views;
                m !== null && (e.setRenderTargetFramebuffer(T, m.framebuffer),
                e.setRenderTarget(T));
                let We = !1;
                Re.length !== B.cameras.length && (B.cameras.length = 0,
                We = !0);
                for (let ee = 0; ee < Re.length; ee++) {
                    const ae = Re[ee];
                    let w = null;
                    if (m !== null)
                        w = m.getViewport(ae);
                    else {
                        const _e = d.getViewSubImage(p, ae);
                        w = _e.viewport,
                        ee === 0 && (e.setRenderTargetTextures(T, _e.colorTexture, _e.depthStencilTexture),
                        e.setRenderTarget(T))
                    }
                    let ce = U[ee];
                    ce === void 0 && (ce = new cn,
                    ce.layers.enable(ee),
                    ce.viewport = new St,
                    U[ee] = ce),
                    ce.matrix.fromArray(ae.transform.matrix),
                    ce.matrix.decompose(ce.position, ce.quaternion, ce.scale),
                    ce.projectionMatrix.fromArray(ae.projectionMatrix),
                    ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),
                    ce.viewport.set(w.x, w.y, w.width, w.height),
                    ee === 0 && (B.matrix.copy(ce.matrix),
                    B.matrix.decompose(B.position, B.quaternion, B.scale)),
                    We === !0 && B.cameras.push(ce)
                }
                const W = r.enabledFeatures;
                if (W && W.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && _) {
                    d = n.getBinding();
                    const ee = d.getDepthInformation(Re[0]);
                    ee && ee.isValid && ee.texture && f.init(ee, r.renderState)
                }
                if (W && W.includes("camera-access") && _) {
                    e.state.unbindTexture(),
                    d = n.getBinding();
                    for (let ee = 0; ee < Re.length; ee++) {
                        const ae = Re[ee].camera;
                        if (ae) {
                            let w = u[ae];
                            w || (w = new Vc,
                            u[ae] = w);
                            const ce = d.getCameraImage(ae);
                            w.sourceTexture = ce
                        }
                    }
                }
            }
            for (let Re = 0; Re < C.length; Re++) {
                const We = E[Re]
                  , W = C[Re];
                We !== null && W !== void 0 && W.update(We, se, c || a)
            }
            Xe && Xe(Q, se),
            se.detectedPlanes && n.dispatchEvent({
                type: "planesdetected",
                data: se
            }),
            g = null
        }
        const Je = new Hc;
        Je.setAnimationLoop(it),
        this.setAnimationLoop = function(Q) {
            Xe = Q
        }
        ,
        this.dispose = function() {}
    }
}
const ri = new En
  , X0 = new ct;
function q0(i, e) {
    function t(f, u) {
        f.matrixAutoUpdate === !0 && f.updateMatrix(),
        u.value.copy(f.matrix)
    }
    function n(f, u) {
        u.color.getRGB(f.fogColor.value, Uc(i)),
        u.isFog ? (f.fogNear.value = u.near,
        f.fogFar.value = u.far) : u.isFogExp2 && (f.fogDensity.value = u.density)
    }
    function r(f, u, b, v, T) {
        u.isMeshBasicMaterial || u.isMeshLambertMaterial ? s(f, u) : u.isMeshToonMaterial ? (s(f, u),
        d(f, u)) : u.isMeshPhongMaterial ? (s(f, u),
        h(f, u)) : u.isMeshStandardMaterial ? (s(f, u),
        p(f, u),
        u.isMeshPhysicalMaterial && m(f, u, T)) : u.isMeshMatcapMaterial ? (s(f, u),
        g(f, u)) : u.isMeshDepthMaterial ? s(f, u) : u.isMeshDistanceMaterial ? (s(f, u),
        _(f, u)) : u.isMeshNormalMaterial ? s(f, u) : u.isLineBasicMaterial ? (a(f, u),
        u.isLineDashedMaterial && o(f, u)) : u.isPointsMaterial ? l(f, u, b, v) : u.isSpriteMaterial ? c(f, u) : u.isShadowMaterial ? (f.color.value.copy(u.color),
        f.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1)
    }
    function s(f, u) {
        f.opacity.value = u.opacity,
        u.color && f.diffuse.value.copy(u.color),
        u.emissive && f.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),
        u.map && (f.map.value = u.map,
        t(u.map, f.mapTransform)),
        u.alphaMap && (f.alphaMap.value = u.alphaMap,
        t(u.alphaMap, f.alphaMapTransform)),
        u.bumpMap && (f.bumpMap.value = u.bumpMap,
        t(u.bumpMap, f.bumpMapTransform),
        f.bumpScale.value = u.bumpScale,
        u.side === $t && (f.bumpScale.value *= -1)),
        u.normalMap && (f.normalMap.value = u.normalMap,
        t(u.normalMap, f.normalMapTransform),
        f.normalScale.value.copy(u.normalScale),
        u.side === $t && f.normalScale.value.negate()),
        u.displacementMap && (f.displacementMap.value = u.displacementMap,
        t(u.displacementMap, f.displacementMapTransform),
        f.displacementScale.value = u.displacementScale,
        f.displacementBias.value = u.displacementBias),
        u.emissiveMap && (f.emissiveMap.value = u.emissiveMap,
        t(u.emissiveMap, f.emissiveMapTransform)),
        u.specularMap && (f.specularMap.value = u.specularMap,
        t(u.specularMap, f.specularMapTransform)),
        u.alphaTest > 0 && (f.alphaTest.value = u.alphaTest);
        const b = e.get(u)
          , v = b.envMap
          , T = b.envMapRotation;
        v && (f.envMap.value = v,
        ri.copy(T),
        ri.x *= -1,
        ri.y *= -1,
        ri.z *= -1,
        v.isCubeTexture && v.isRenderTargetTexture === !1 && (ri.y *= -1,
        ri.z *= -1),
        f.envMapRotation.value.setFromMatrix4(X0.makeRotationFromEuler(ri)),
        f.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1,
        f.reflectivity.value = u.reflectivity,
        f.ior.value = u.ior,
        f.refractionRatio.value = u.refractionRatio),
        u.lightMap && (f.lightMap.value = u.lightMap,
        f.lightMapIntensity.value = u.lightMapIntensity,
        t(u.lightMap, f.lightMapTransform)),
        u.aoMap && (f.aoMap.value = u.aoMap,
        f.aoMapIntensity.value = u.aoMapIntensity,
        t(u.aoMap, f.aoMapTransform))
    }
    function a(f, u) {
        f.diffuse.value.copy(u.color),
        f.opacity.value = u.opacity,
        u.map && (f.map.value = u.map,
        t(u.map, f.mapTransform))
    }
    function o(f, u) {
        f.dashSize.value = u.dashSize,
        f.totalSize.value = u.dashSize + u.gapSize,
        f.scale.value = u.scale
    }
    function l(f, u, b, v) {
        f.diffuse.value.copy(u.color),
        f.opacity.value = u.opacity,
        f.size.value = u.size * b,
        f.scale.value = v * .5,
        u.map && (f.map.value = u.map,
        t(u.map, f.uvTransform)),
        u.alphaMap && (f.alphaMap.value = u.alphaMap,
        t(u.alphaMap, f.alphaMapTransform)),
        u.alphaTest > 0 && (f.alphaTest.value = u.alphaTest)
    }
    function c(f, u) {
        f.diffuse.value.copy(u.color),
        f.opacity.value = u.opacity,
        f.rotation.value = u.rotation,
        u.map && (f.map.value = u.map,
        t(u.map, f.mapTransform)),
        u.alphaMap && (f.alphaMap.value = u.alphaMap,
        t(u.alphaMap, f.alphaMapTransform)),
        u.alphaTest > 0 && (f.alphaTest.value = u.alphaTest)
    }
    function h(f, u) {
        f.specular.value.copy(u.specular),
        f.shininess.value = Math.max(u.shininess, 1e-4)
    }
    function d(f, u) {
        u.gradientMap && (f.gradientMap.value = u.gradientMap)
    }
    function p(f, u) {
        f.metalness.value = u.metalness,
        u.metalnessMap && (f.metalnessMap.value = u.metalnessMap,
        t(u.metalnessMap, f.metalnessMapTransform)),
        f.roughness.value = u.roughness,
        u.roughnessMap && (f.roughnessMap.value = u.roughnessMap,
        t(u.roughnessMap, f.roughnessMapTransform)),
        u.envMap && (f.envMapIntensity.value = u.envMapIntensity)
    }
    function m(f, u, b) {
        f.ior.value = u.ior,
        u.sheen > 0 && (f.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),
        f.sheenRoughness.value = u.sheenRoughness,
        u.sheenColorMap && (f.sheenColorMap.value = u.sheenColorMap,
        t(u.sheenColorMap, f.sheenColorMapTransform)),
        u.sheenRoughnessMap && (f.sheenRoughnessMap.value = u.sheenRoughnessMap,
        t(u.sheenRoughnessMap, f.sheenRoughnessMapTransform))),
        u.clearcoat > 0 && (f.clearcoat.value = u.clearcoat,
        f.clearcoatRoughness.value = u.clearcoatRoughness,
        u.clearcoatMap && (f.clearcoatMap.value = u.clearcoatMap,
        t(u.clearcoatMap, f.clearcoatMapTransform)),
        u.clearcoatRoughnessMap && (f.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap,
        t(u.clearcoatRoughnessMap, f.clearcoatRoughnessMapTransform)),
        u.clearcoatNormalMap && (f.clearcoatNormalMap.value = u.clearcoatNormalMap,
        t(u.clearcoatNormalMap, f.clearcoatNormalMapTransform),
        f.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),
        u.side === $t && f.clearcoatNormalScale.value.negate())),
        u.dispersion > 0 && (f.dispersion.value = u.dispersion),
        u.iridescence > 0 && (f.iridescence.value = u.iridescence,
        f.iridescenceIOR.value = u.iridescenceIOR,
        f.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0],
        f.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1],
        u.iridescenceMap && (f.iridescenceMap.value = u.iridescenceMap,
        t(u.iridescenceMap, f.iridescenceMapTransform)),
        u.iridescenceThicknessMap && (f.iridescenceThicknessMap.value = u.iridescenceThicknessMap,
        t(u.iridescenceThicknessMap, f.iridescenceThicknessMapTransform))),
        u.transmission > 0 && (f.transmission.value = u.transmission,
        f.transmissionSamplerMap.value = b.texture,
        f.transmissionSamplerSize.value.set(b.width, b.height),
        u.transmissionMap && (f.transmissionMap.value = u.transmissionMap,
        t(u.transmissionMap, f.transmissionMapTransform)),
        f.thickness.value = u.thickness,
        u.thicknessMap && (f.thicknessMap.value = u.thicknessMap,
        t(u.thicknessMap, f.thicknessMapTransform)),
        f.attenuationDistance.value = u.attenuationDistance,
        f.attenuationColor.value.copy(u.attenuationColor)),
        u.anisotropy > 0 && (f.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)),
        u.anisotropyMap && (f.anisotropyMap.value = u.anisotropyMap,
        t(u.anisotropyMap, f.anisotropyMapTransform))),
        f.specularIntensity.value = u.specularIntensity,
        f.specularColor.value.copy(u.specularColor),
        u.specularColorMap && (f.specularColorMap.value = u.specularColorMap,
        t(u.specularColorMap, f.specularColorMapTransform)),
        u.specularIntensityMap && (f.specularIntensityMap.value = u.specularIntensityMap,
        t(u.specularIntensityMap, f.specularIntensityMapTransform))
    }
    function g(f, u) {
        u.matcap && (f.matcap.value = u.matcap)
    }
    function _(f, u) {
        const b = e.get(u).light;
        f.referencePosition.value.setFromMatrixPosition(b.matrixWorld),
        f.nearDistance.value = b.shadow.camera.near,
        f.farDistance.value = b.shadow.camera.far
    }
    return {
        refreshFogUniforms: n,
        refreshMaterialUniforms: r
    }
}
function Y0(i, e, t, n) {
    let r = {}
      , s = {}
      , a = [];
    const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
    function l(b, v) {
        const T = v.program;
        n.uniformBlockBinding(b, T)
    }
    function c(b, v) {
        let T = r[b.id];
        T === void 0 && (g(b),
        T = h(b),
        r[b.id] = T,
        b.addEventListener("dispose", f));
        const C = v.program;
        n.updateUBOMapping(b, C);
        const E = e.render.frame;
        s[b.id] !== E && (p(b),
        s[b.id] = E)
    }
    function h(b) {
        const v = d();
        b.__bindingPointIndex = v;
        const T = i.createBuffer()
          , C = b.__size
          , E = b.usage;
        return i.bindBuffer(i.UNIFORM_BUFFER, T),
        i.bufferData(i.UNIFORM_BUFFER, C, E),
        i.bindBuffer(i.UNIFORM_BUFFER, null),
        i.bindBufferBase(i.UNIFORM_BUFFER, v, T),
        T
    }
    function d() {
        for (let b = 0; b < o; b++)
            if (a.indexOf(b) === -1)
                return a.push(b),
                b;
        return bt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),
        0
    }
    function p(b) {
        const v = r[b.id]
          , T = b.uniforms
          , C = b.__cache;
        i.bindBuffer(i.UNIFORM_BUFFER, v);
        for (let E = 0, R = T.length; E < R; E++) {
            const F = Array.isArray(T[E]) ? T[E] : [T[E]];
            for (let S = 0, M = F.length; S < M; S++) {
                const U = F[S];
                if (m(U, E, S, C) === !0) {
                    const B = U.__offset
                      , k = Array.isArray(U.value) ? U.value : [U.value];
                    let D = 0;
                    for (let G = 0; G < k.length; G++) {
                        const Y = k[G]
                          , te = _(Y);
                        typeof Y == "number" || typeof Y == "boolean" ? (U.__data[0] = Y,
                        i.bufferSubData(i.UNIFORM_BUFFER, B + D, U.__data)) : Y.isMatrix3 ? (U.__data[0] = Y.elements[0],
                        U.__data[1] = Y.elements[1],
                        U.__data[2] = Y.elements[2],
                        U.__data[3] = 0,
                        U.__data[4] = Y.elements[3],
                        U.__data[5] = Y.elements[4],
                        U.__data[6] = Y.elements[5],
                        U.__data[7] = 0,
                        U.__data[8] = Y.elements[6],
                        U.__data[9] = Y.elements[7],
                        U.__data[10] = Y.elements[8],
                        U.__data[11] = 0) : (Y.toArray(U.__data, D),
                        D += te.storage / Float32Array.BYTES_PER_ELEMENT)
                    }
                    i.bufferSubData(i.UNIFORM_BUFFER, B, U.__data)
                }
            }
        }
        i.bindBuffer(i.UNIFORM_BUFFER, null)
    }
    function m(b, v, T, C) {
        const E = b.value
          , R = v + "_" + T;
        if (C[R] === void 0)
            return typeof E == "number" || typeof E == "boolean" ? C[R] = E : C[R] = E.clone(),
            !0;
        {
            const F = C[R];
            if (typeof E == "number" || typeof E == "boolean") {
                if (F !== E)
                    return C[R] = E,
                    !0
            } else if (F.equals(E) === !1)
                return F.copy(E),
                !0
        }
        return !1
    }
    function g(b) {
        const v = b.uniforms;
        let T = 0;
        const C = 16;
        for (let R = 0, F = v.length; R < F; R++) {
            const S = Array.isArray(v[R]) ? v[R] : [v[R]];
            for (let M = 0, U = S.length; M < U; M++) {
                const B = S[M]
                  , k = Array.isArray(B.value) ? B.value : [B.value];
                for (let D = 0, G = k.length; D < G; D++) {
                    const Y = k[D]
                      , te = _(Y)
                      , L = T % C
                      , le = L % te.boundary
                      , fe = L + le;
                    T += le,
                    fe !== 0 && C - fe < te.storage && (T += C - fe),
                    B.__data = new Float32Array(te.storage / Float32Array.BYTES_PER_ELEMENT),
                    B.__offset = T,
                    T += te.storage
                }
            }
        }
        const E = T % C;
        return E > 0 && (T += C - E),
        b.__size = T,
        b.__cache = {},
        this
    }
    function _(b) {
        const v = {
            boundary: 0,
            storage: 0
        };
        return typeof b == "number" || typeof b == "boolean" ? (v.boundary = 4,
        v.storage = 4) : b.isVector2 ? (v.boundary = 8,
        v.storage = 8) : b.isVector3 || b.isColor ? (v.boundary = 16,
        v.storage = 12) : b.isVector4 ? (v.boundary = 16,
        v.storage = 16) : b.isMatrix3 ? (v.boundary = 48,
        v.storage = 48) : b.isMatrix4 ? (v.boundary = 64,
        v.storage = 64) : b.isTexture ? Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : Ye("WebGLRenderer: Unsupported uniform value type.", b),
        v
    }
    function f(b) {
        const v = b.target;
        v.removeEventListener("dispose", f);
        const T = a.indexOf(v.__bindingPointIndex);
        a.splice(T, 1),
        i.deleteBuffer(r[v.id]),
        delete r[v.id],
        delete s[v.id]
    }
    function u() {
        for (const b in r)
            i.deleteBuffer(r[b]);
        a = [],
        r = {},
        s = {}
    }
    return {
        bind: l,
        update: c,
        dispose: u
    }
}
const $0 = new Uint16Array([11481, 15204, 11534, 15171, 11808, 15015, 12385, 14843, 12894, 14716, 13396, 14600, 13693, 14483, 13976, 14366, 14237, 14171, 14405, 13961, 14511, 13770, 14605, 13598, 14687, 13444, 14760, 13305, 14822, 13066, 14876, 12857, 14923, 12675, 14963, 12517, 14997, 12379, 15025, 12230, 15049, 12023, 15070, 11843, 15086, 11687, 15100, 11551, 15111, 11433, 15120, 11330, 15127, 11217, 15132, 11060, 15135, 10922, 15138, 10801, 15139, 10695, 15139, 10600, 13012, 14923, 13020, 14917, 13064, 14886, 13176, 14800, 13349, 14666, 13513, 14526, 13724, 14398, 13960, 14230, 14200, 14020, 14383, 13827, 14488, 13651, 14583, 13491, 14667, 13348, 14740, 13132, 14803, 12908, 14856, 12713, 14901, 12542, 14938, 12394, 14968, 12241, 14992, 12017, 15010, 11822, 15024, 11654, 15034, 11507, 15041, 11380, 15044, 11269, 15044, 11081, 15042, 10913, 15037, 10764, 15031, 10635, 15023, 10520, 15014, 10419, 15003, 10330, 13657, 14676, 13658, 14673, 13670, 14660, 13698, 14622, 13750, 14547, 13834, 14442, 13956, 14317, 14112, 14093, 14291, 13889, 14407, 13704, 14499, 13538, 14586, 13389, 14664, 13201, 14733, 12966, 14792, 12758, 14842, 12577, 14882, 12418, 14915, 12272, 14940, 12033, 14959, 11826, 14972, 11646, 14980, 11490, 14983, 11355, 14983, 11212, 14979, 11008, 14971, 10830, 14961, 10675, 14950, 10540, 14936, 10420, 14923, 10315, 14909, 10204, 14894, 10041, 14089, 14460, 14090, 14459, 14096, 14452, 14112, 14431, 14141, 14388, 14186, 14305, 14252, 14130, 14341, 13941, 14399, 13756, 14467, 13585, 14539, 13430, 14610, 13272, 14677, 13026, 14737, 12808, 14790, 12617, 14833, 12449, 14869, 12303, 14896, 12065, 14916, 11845, 14929, 11655, 14937, 11490, 14939, 11347, 14936, 11184, 14930, 10970, 14921, 10783, 14912, 10621, 14900, 10480, 14885, 10356, 14867, 10247, 14848, 10062, 14827, 9894, 14805, 9745, 14400, 14208, 14400, 14206, 14402, 14198, 14406, 14174, 14415, 14122, 14427, 14035, 14444, 13913, 14469, 13767, 14504, 13613, 14548, 13463, 14598, 13324, 14651, 13082, 14704, 12858, 14752, 12658, 14795, 12483, 14831, 12330, 14860, 12106, 14881, 11875, 14895, 11675, 14903, 11501, 14905, 11351, 14903, 11178, 14900, 10953, 14892, 10757, 14880, 10589, 14865, 10442, 14847, 10313, 14827, 10162, 14805, 9965, 14782, 9792, 14757, 9642, 14731, 9507, 14562, 13883, 14562, 13883, 14563, 13877, 14566, 13862, 14570, 13830, 14576, 13773, 14584, 13689, 14595, 13582, 14613, 13461, 14637, 13336, 14668, 13120, 14704, 12897, 14741, 12695, 14776, 12516, 14808, 12358, 14835, 12150, 14856, 11910, 14870, 11701, 14878, 11519, 14882, 11361, 14884, 11187, 14880, 10951, 14871, 10748, 14858, 10572, 14842, 10418, 14823, 10286, 14801, 10099, 14777, 9897, 14751, 9722, 14725, 9567, 14696, 9430, 14666, 9309, 14702, 13604, 14702, 13604, 14702, 13600, 14703, 13591, 14705, 13570, 14707, 13533, 14709, 13477, 14712, 13400, 14718, 13305, 14727, 13106, 14743, 12907, 14762, 12716, 14784, 12539, 14807, 12380, 14827, 12190, 14844, 11943, 14855, 11727, 14863, 11539, 14870, 11376, 14871, 11204, 14868, 10960, 14858, 10748, 14845, 10565, 14829, 10406, 14809, 10269, 14786, 10058, 14761, 9852, 14734, 9671, 14705, 9512, 14674, 9374, 14641, 9253, 14608, 9076, 14821, 13366, 14821, 13365, 14821, 13364, 14821, 13358, 14821, 13344, 14821, 13320, 14819, 13252, 14817, 13145, 14815, 13011, 14814, 12858, 14817, 12698, 14823, 12539, 14832, 12389, 14841, 12214, 14850, 11968, 14856, 11750, 14861, 11558, 14866, 11390, 14867, 11226, 14862, 10972, 14853, 10754, 14840, 10565, 14823, 10401, 14803, 10259, 14780, 10032, 14754, 9820, 14725, 9635, 14694, 9473, 14661, 9333, 14627, 9203, 14593, 8988, 14557, 8798, 14923, 13014, 14922, 13014, 14922, 13012, 14922, 13004, 14920, 12987, 14919, 12957, 14915, 12907, 14909, 12834, 14902, 12738, 14894, 12623, 14888, 12498, 14883, 12370, 14880, 12203, 14878, 11970, 14875, 11759, 14873, 11569, 14874, 11401, 14872, 11243, 14865, 10986, 14855, 10762, 14842, 10568, 14825, 10401, 14804, 10255, 14781, 10017, 14754, 9799, 14725, 9611, 14692, 9445, 14658, 9301, 14623, 9139, 14587, 8920, 14548, 8729, 14509, 8562, 15008, 12672, 15008, 12672, 15008, 12671, 15007, 12667, 15005, 12656, 15001, 12637, 14997, 12605, 14989, 12556, 14978, 12490, 14966, 12407, 14953, 12313, 14940, 12136, 14927, 11934, 14914, 11742, 14903, 11563, 14896, 11401, 14889, 11247, 14879, 10992, 14866, 10767, 14851, 10570, 14833, 10400, 14812, 10252, 14789, 10007, 14761, 9784, 14731, 9592, 14698, 9424, 14663, 9279, 14627, 9088, 14588, 8868, 14548, 8676, 14508, 8508, 14467, 8360, 15080, 12386, 15080, 12386, 15079, 12385, 15078, 12383, 15076, 12378, 15072, 12367, 15066, 12347, 15057, 12315, 15045, 12253, 15030, 12138, 15012, 11998, 14993, 11845, 14972, 11685, 14951, 11530, 14935, 11383, 14920, 11228, 14904, 10981, 14887, 10762, 14870, 10567, 14850, 10397, 14827, 10248, 14803, 9997, 14774, 9771, 14743, 9578, 14710, 9407, 14674, 9259, 14637, 9048, 14596, 8826, 14555, 8632, 14514, 8464, 14471, 8317, 14427, 8182, 15139, 12008, 15139, 12008, 15138, 12008, 15137, 12007, 15135, 12003, 15130, 11990, 15124, 11969, 15115, 11929, 15102, 11872, 15086, 11794, 15064, 11693, 15041, 11581, 15013, 11459, 14987, 11336, 14966, 11170, 14944, 10944, 14921, 10738, 14898, 10552, 14875, 10387, 14850, 10239, 14824, 9983, 14794, 9758, 14762, 9563, 14728, 9392, 14692, 9244, 14653, 9014, 14611, 8791, 14569, 8597, 14526, 8427, 14481, 8281, 14436, 8110, 14391, 7885, 15188, 11617, 15188, 11617, 15187, 11617, 15186, 11618, 15183, 11617, 15179, 11612, 15173, 11601, 15163, 11581, 15150, 11546, 15133, 11495, 15110, 11427, 15083, 11346, 15051, 11246, 15024, 11057, 14996, 10868, 14967, 10687, 14938, 10517, 14911, 10362, 14882, 10206, 14853, 9956, 14821, 9737, 14787, 9543, 14752, 9375, 14715, 9228, 14675, 8980, 14632, 8760, 14589, 8565, 14544, 8395, 14498, 8248, 14451, 8049, 14404, 7824, 14357, 7630, 15228, 11298, 15228, 11298, 15227, 11299, 15226, 11301, 15223, 11303, 15219, 11302, 15213, 11299, 15204, 11290, 15191, 11271, 15174, 11217, 15150, 11129, 15119, 11015, 15087, 10886, 15057, 10744, 15024, 10599, 14990, 10455, 14957, 10318, 14924, 10143, 14891, 9911, 14856, 9701, 14820, 9516, 14782, 9352, 14744, 9200, 14703, 8946, 14659, 8725, 14615, 8533, 14568, 8366, 14521, 8220, 14472, 7992, 14423, 7770, 14374, 7578, 14315, 7408, 15260, 10819, 15260, 10819, 15259, 10822, 15258, 10826, 15256, 10832, 15251, 10836, 15246, 10841, 15237, 10838, 15225, 10821, 15207, 10788, 15183, 10734, 15151, 10660, 15120, 10571, 15087, 10469, 15049, 10359, 15012, 10249, 14974, 10041, 14937, 9837, 14900, 9647, 14860, 9475, 14820, 9320, 14779, 9147, 14736, 8902, 14691, 8688, 14646, 8499, 14598, 8335, 14549, 8189, 14499, 7940, 14448, 7720, 14397, 7529, 14347, 7363, 14256, 7218, 15285, 10410, 15285, 10411, 15285, 10413, 15284, 10418, 15282, 10425, 15278, 10434, 15272, 10442, 15264, 10449, 15252, 10445, 15235, 10433, 15210, 10403, 15179, 10358, 15149, 10301, 15113, 10218, 15073, 10059, 15033, 9894, 14991, 9726, 14951, 9565, 14909, 9413, 14865, 9273, 14822, 9073, 14777, 8845, 14730, 8641, 14682, 8459, 14633, 8300, 14583, 8129, 14531, 7883, 14479, 7670, 14426, 7482, 14373, 7321, 14305, 7176, 14201, 6939, 15305, 9939, 15305, 9940, 15305, 9945, 15304, 9955, 15302, 9967, 15298, 9989, 15293, 10010, 15286, 10033, 15274, 10044, 15258, 10045, 15233, 10022, 15205, 9975, 15174, 9903, 15136, 9808, 15095, 9697, 15053, 9578, 15009, 9451, 14965, 9327, 14918, 9198, 14871, 8973, 14825, 8766, 14775, 8579, 14725, 8408, 14675, 8259, 14622, 8058, 14569, 7821, 14515, 7615, 14460, 7435, 14405, 7276, 14350, 7108, 14256, 6866, 14149, 6653, 15321, 9444, 15321, 9445, 15321, 9448, 15320, 9458, 15317, 9470, 15314, 9490, 15310, 9515, 15302, 9540, 15292, 9562, 15276, 9579, 15251, 9577, 15226, 9559, 15195, 9519, 15156, 9463, 15116, 9389, 15071, 9304, 15025, 9208, 14978, 9023, 14927, 8838, 14878, 8661, 14827, 8496, 14774, 8344, 14722, 8206, 14667, 7973, 14612, 7749, 14556, 7555, 14499, 7382, 14443, 7229, 14385, 7025, 14322, 6791, 14210, 6588, 14100, 6409, 15333, 8920, 15333, 8921, 15332, 8927, 15332, 8943, 15329, 8965, 15326, 9002, 15322, 9048, 15316, 9106, 15307, 9162, 15291, 9204, 15267, 9221, 15244, 9221, 15212, 9196, 15175, 9134, 15133, 9043, 15088, 8930, 15040, 8801, 14990, 8665, 14938, 8526, 14886, 8391, 14830, 8261, 14775, 8087, 14719, 7866, 14661, 7664, 14603, 7482, 14544, 7322, 14485, 7178, 14426, 6936, 14367, 6713, 14281, 6517, 14166, 6348, 14054, 6198, 15341, 8360, 15341, 8361, 15341, 8366, 15341, 8379, 15339, 8399, 15336, 8431, 15332, 8473, 15326, 8527, 15318, 8585, 15302, 8632, 15281, 8670, 15258, 8690, 15227, 8690, 15191, 8664, 15149, 8612, 15104, 8543, 15055, 8456, 15001, 8360, 14948, 8259, 14892, 8122, 14834, 7923, 14776, 7734, 14716, 7558, 14656, 7397, 14595, 7250, 14534, 7070, 14472, 6835, 14410, 6628, 14350, 6443, 14243, 6283, 14125, 6135, 14010, 5889, 15348, 7715, 15348, 7717, 15348, 7725, 15347, 7745, 15345, 7780, 15343, 7836, 15339, 7905, 15334, 8e3, 15326, 8103, 15310, 8193, 15293, 8239, 15270, 8270, 15240, 8287, 15204, 8283, 15163, 8260, 15118, 8223, 15067, 8143, 15014, 8014, 14958, 7873, 14899, 7723, 14839, 7573, 14778, 7430, 14715, 7293, 14652, 7164, 14588, 6931, 14524, 6720, 14460, 6531, 14396, 6362, 14330, 6210, 14207, 6015, 14086, 5781, 13969, 5576, 15352, 7114, 15352, 7116, 15352, 7128, 15352, 7159, 15350, 7195, 15348, 7237, 15345, 7299, 15340, 7374, 15332, 7457, 15317, 7544, 15301, 7633, 15280, 7703, 15251, 7754, 15216, 7775, 15176, 7767, 15131, 7733, 15079, 7670, 15026, 7588, 14967, 7492, 14906, 7387, 14844, 7278, 14779, 7171, 14714, 6965, 14648, 6770, 14581, 6587, 14515, 6420, 14448, 6269, 14382, 6123, 14299, 5881, 14172, 5665, 14049, 5477, 13929, 5310, 15355, 6329, 15355, 6330, 15355, 6339, 15355, 6362, 15353, 6410, 15351, 6472, 15349, 6572, 15344, 6688, 15337, 6835, 15323, 6985, 15309, 7142, 15287, 7220, 15260, 7277, 15226, 7310, 15188, 7326, 15142, 7318, 15090, 7285, 15036, 7239, 14976, 7177, 14914, 7045, 14849, 6892, 14782, 6736, 14714, 6581, 14645, 6433, 14576, 6293, 14506, 6164, 14438, 5946, 14369, 5733, 14270, 5540, 14140, 5369, 14014, 5216, 13892, 5043, 15357, 5483, 15357, 5484, 15357, 5496, 15357, 5528, 15356, 5597, 15354, 5692, 15351, 5835, 15347, 6011, 15339, 6195, 15328, 6317, 15314, 6446, 15293, 6566, 15268, 6668, 15235, 6746, 15197, 6796, 15152, 6811, 15101, 6790, 15046, 6748, 14985, 6673, 14921, 6583, 14854, 6479, 14785, 6371, 14714, 6259, 14643, 6149, 14571, 5946, 14499, 5750, 14428, 5567, 14358, 5401, 14242, 5250, 14109, 5111, 13980, 4870, 13856, 4657, 15359, 4555, 15359, 4557, 15358, 4573, 15358, 4633, 15357, 4715, 15355, 4841, 15353, 5061, 15349, 5216, 15342, 5391, 15331, 5577, 15318, 5770, 15299, 5967, 15274, 6150, 15243, 6223, 15206, 6280, 15161, 6310, 15111, 6317, 15055, 6300, 14994, 6262, 14928, 6208, 14860, 6141, 14788, 5994, 14715, 5838, 14641, 5684, 14566, 5529, 14492, 5384, 14418, 5247, 14346, 5121, 14216, 4892, 14079, 4682, 13948, 4496, 13822, 4330, 15359, 3498, 15359, 3501, 15359, 3520, 15359, 3598, 15358, 3719, 15356, 3860, 15355, 4137, 15351, 4305, 15344, 4563, 15334, 4809, 15321, 5116, 15303, 5273, 15280, 5418, 15250, 5547, 15214, 5653, 15170, 5722, 15120, 5761, 15064, 5763, 15002, 5733, 14935, 5673, 14865, 5597, 14792, 5504, 14716, 5400, 14640, 5294, 14563, 5185, 14486, 5041, 14410, 4841, 14335, 4655, 14191, 4482, 14051, 4325, 13918, 4183, 13790, 4012, 15360, 2282, 15360, 2285, 15360, 2306, 15360, 2401, 15359, 2547, 15357, 2748, 15355, 3103, 15352, 3349, 15345, 3675, 15336, 4020, 15324, 4272, 15307, 4496, 15285, 4716, 15255, 4908, 15220, 5086, 15178, 5170, 15128, 5214, 15072, 5234, 15010, 5231, 14943, 5206, 14871, 5166, 14796, 5102, 14718, 4971, 14639, 4833, 14559, 4687, 14480, 4541, 14402, 4401, 14315, 4268, 14167, 4142, 14025, 3958, 13888, 3747, 13759, 3556, 15360, 923, 15360, 925, 15360, 946, 15360, 1052, 15359, 1214, 15357, 1494, 15356, 1892, 15352, 2274, 15346, 2663, 15338, 3099, 15326, 3393, 15309, 3679, 15288, 3980, 15260, 4183, 15226, 4325, 15185, 4437, 15136, 4517, 15080, 4570, 15018, 4591, 14950, 4581, 14877, 4545, 14800, 4485, 14720, 4411, 14638, 4325, 14556, 4231, 14475, 4136, 14395, 3988, 14297, 3803, 14145, 3628, 13999, 3465, 13861, 3314, 13729, 3177, 15360, 263, 15360, 264, 15360, 272, 15360, 325, 15359, 407, 15358, 548, 15356, 780, 15352, 1144, 15347, 1580, 15339, 2099, 15328, 2425, 15312, 2795, 15292, 3133, 15264, 3329, 15232, 3517, 15191, 3689, 15143, 3819, 15088, 3923, 15025, 3978, 14956, 3999, 14882, 3979, 14804, 3931, 14722, 3855, 14639, 3756, 14554, 3645, 14470, 3529, 14388, 3409, 14279, 3289, 14124, 3173, 13975, 3055, 13834, 2848, 13701, 2658, 15360, 49, 15360, 49, 15360, 52, 15360, 75, 15359, 111, 15358, 201, 15356, 283, 15353, 519, 15348, 726, 15340, 1045, 15329, 1415, 15314, 1795, 15295, 2173, 15269, 2410, 15237, 2649, 15197, 2866, 15150, 3054, 15095, 3140, 15032, 3196, 14963, 3228, 14888, 3236, 14808, 3224, 14725, 3191, 14639, 3146, 14553, 3088, 14466, 2976, 14382, 2836, 14262, 2692, 14103, 2549, 13952, 2409, 13808, 2278, 13674, 2154, 15360, 4, 15360, 4, 15360, 4, 15360, 13, 15359, 33, 15358, 59, 15357, 112, 15353, 199, 15348, 302, 15341, 456, 15331, 628, 15316, 827, 15297, 1082, 15272, 1332, 15241, 1601, 15202, 1851, 15156, 2069, 15101, 2172, 15039, 2256, 14970, 2314, 14894, 2348, 14813, 2358, 14728, 2344, 14640, 2311, 14551, 2263, 14463, 2203, 14376, 2133, 14247, 2059, 14084, 1915, 13930, 1761, 13784, 1609, 13648, 1464, 15360, 0, 15360, 0, 15360, 0, 15360, 3, 15359, 18, 15358, 26, 15357, 53, 15354, 80, 15348, 97, 15341, 165, 15332, 238, 15318, 326, 15299, 427, 15275, 529, 15245, 654, 15207, 771, 15161, 885, 15108, 994, 15046, 1089, 14976, 1170, 14900, 1229, 14817, 1266, 14731, 1284, 14641, 1282, 14550, 1260, 14460, 1223, 14370, 1174, 14232, 1116, 14066, 1050, 13909, 981, 13761, 910, 13623, 839]);
let Dn = null;
function j0() {
    return Dn === null && (Dn = new Oc($0,32,32,Na,zi),
    Dn.minFilter = ln,
    Dn.magFilter = ln,
    Dn.wrapS = Fn,
    Dn.wrapT = Fn,
    Dn.generateMipmaps = !1,
    Dn.needsUpdate = !0),
    Dn
}
class K0 {
    constructor(e={}) {
        const {canvas: t=tu(), context: n=null, depth: r=!0, stencil: s=!1, alpha: a=!1, antialias: o=!1, premultipliedAlpha: l=!0, preserveDrawingBuffer: c=!1, powerPreference: h="default", failIfMajorPerformanceCaveat: d=!1, reversedDepthBuffer: p=!1} = e;
        this.isWebGLRenderer = !0;
        let m;
        if (n !== null) {
            if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
                throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
            m = n.getContextAttributes().alpha
        } else
            m = a;
        const g = new Set([Oa, Fa, Ua])
          , _ = new Set([yn, ui, ar, or, La, Da])
          , f = new Uint32Array(4)
          , u = new Int32Array(4);
        let b = null
          , v = null;
        const T = []
          , C = [];
        this.domElement = t,
        this.debug = {
            checkShaderErrors: !0,
            onShaderError: null
        },
        this.autoClear = !0,
        this.autoClearColor = !0,
        this.autoClearDepth = !0,
        this.autoClearStencil = !0,
        this.sortObjects = !0,
        this.clippingPlanes = [],
        this.localClippingEnabled = !1,
        this.toneMapping = $n,
        this.toneMappingExposure = 1,
        this.transmissionResolutionScale = 1;
        const E = this;
        let R = !1;
        this._outputColorSpace = on;
        let F = 0
          , S = 0
          , M = null
          , U = -1
          , B = null;
        const k = new St
          , D = new St;
        let G = null;
        const Y = new et(0);
        let te = 0
          , L = t.width
          , le = t.height
          , fe = 1
          , Se = null
          , pe = null;
        const Xe = new St(0,0,L,le)
          , it = new St(0,0,L,le);
        let Je = !1;
        const Q = new Ha;
        let se = !1
          , Re = !1;
        const We = new ct
          , W = new O
          , re = new St
          , he = {
            background: null,
            fog: null,
            environment: null,
            overrideMaterial: null,
            isScene: !0
        };
        let ee = !1;
        function ae() {
            return M === null ? fe : 1
        }
        let w = n;
        function ce(y, z) {
            return t.getContext(y, z)
        }
        try {
            const y = {
                alpha: !0,
                depth: r,
                stencil: s,
                antialias: o,
                premultipliedAlpha: l,
                preserveDrawingBuffer: c,
                powerPreference: h,
                failIfMajorPerformanceCaveat: d
            };
            if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${Ra}`),
            t.addEventListener("webglcontextlost", ne, !1),
            t.addEventListener("webglcontextrestored", Z, !1),
            t.addEventListener("webglcontextcreationerror", we, !1),
            w === null) {
                const z = "webgl2";
                if (w = ce(z, y),
                w === null)
                    throw ce(z) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.")
            }
        } catch (y) {
            throw y("WebGLRenderer: " + y.message),
            y
        }
        let _e, Pe, xe, De, oe, me, A, x, N, $, ie, j, Te, be, Ie, Ae, J, de, Fe, Ne, Ee, Ve, I, ve;
        function ge() {
            _e = new rp(w),
            _e.init(),
            Ve = new V0(w,_e),
            Pe = new jf(w,_e,e,Ve),
            xe = new B0(w,_e),
            Pe.reversedDepthBuffer && p && xe.buffers.depth.setReversed(!0),
            De = new op(w),
            oe = new T0,
            me = new z0(w,_e,xe,oe,Pe,Ve,De),
            A = new Zf(E),
            x = new ip(E),
            N = new ud(w),
            I = new Yf(w,N),
            $ = new sp(w,N,De,I),
            ie = new lp(w,$,N,De),
            Fe = new cp(w,Pe,me),
            Ae = new Kf(oe),
            j = new E0(E,A,x,_e,Pe,I,Ae),
            Te = new q0(E,oe),
            be = new w0,
            Ie = new I0(_e),
            de = new qf(E,A,x,xe,ie,m,l),
            J = new F0(E,ie,Pe),
            ve = new Y0(w,De,Pe,xe),
            Ne = new $f(w,_e,De),
            Ee = new ap(w,_e,De),
            De.programs = j.programs,
            E.capabilities = Pe,
            E.extensions = _e,
            E.properties = oe,
            E.renderLists = be,
            E.shadowMap = J,
            E.state = xe,
            E.info = De
        }
        ge();
        const ue = new W0(E,w);
        this.xr = ue,
        this.getContext = function() {
            return w
        }
        ,
        this.getContextAttributes = function() {
            return w.getContextAttributes()
        }
        ,
        this.forceContextLoss = function() {
            const y = _e.get("WEBGL_lose_context");
            y && y.loseContext()
        }
        ,
        this.forceContextRestore = function() {
            const y = _e.get("WEBGL_lose_context");
            y && y.restoreContext()
        }
        ,
        this.getPixelRatio = function() {
            return fe
        }
        ,
        this.setPixelRatio = function(y) {
            y !== void 0 && (fe = y,
            this.setSize(L, le, !1))
        }
        ,
        this.getSize = function(y) {
            return y.set(L, le)
        }
        ,
        this.setSize = function(y, z, X=!0) {
            if (ue.isPresenting) {
                Ye("WebGLRenderer: Can't change size while VR device is presenting.");
                return
            }
            L = y,
            le = z,
            t.width = Math.floor(y * fe),
            t.height = Math.floor(z * fe),
            X === !0 && (t.style.width = y + "px",
            t.style.height = z + "px"),
            this.setViewport(0, 0, y, z)
        }
        ,
        this.getDrawingBufferSize = function(y) {
            return y.set(L * fe, le * fe).floor()
        }
        ,
        this.setDrawingBufferSize = function(y, z, X) {
            L = y,
            le = z,
            fe = X,
            t.width = Math.floor(y * X),
            t.height = Math.floor(z * X),
            this.setViewport(0, 0, y, z)
        }
        ,
        this.getCurrentViewport = function(y) {
            return y.copy(k)
        }
        ,
        this.getViewport = function(y) {
            return y.copy(Xe)
        }
        ,
        this.setViewport = function(y, z, X, q) {
            y.isVector4 ? Xe.set(y.x, y.y, y.z, y.w) : Xe.set(y, z, X, q),
            xe.viewport(k.copy(Xe).multiplyScalar(fe).round())
        }
        ,
        this.getScissor = function(y) {
            return y.copy(it)
        }
        ,
        this.setScissor = function(y, z, X, q) {
            y.isVector4 ? it.set(y.x, y.y, y.z, y.w) : it.set(y, z, X, q),
            xe.scissor(D.copy(it).multiplyScalar(fe).round())
        }
        ,
        this.getScissorTest = function() {
            return Je
        }
        ,
        this.setScissorTest = function(y) {
            xe.setScissorTest(Je = y)
        }
        ,
        this.setOpaqueSort = function(y) {
            Se = y
        }
        ,
        this.setTransparentSort = function(y) {
            pe = y
        }
        ,
        this.getClearColor = function(y) {
            return y.copy(de.getClearColor())
        }
        ,
        this.setClearColor = function() {
            de.setClearColor(...arguments)
        }
        ,
        this.getClearAlpha = function() {
            return de.getClearAlpha()
        }
        ,
        this.setClearAlpha = function() {
            de.setClearAlpha(...arguments)
        }
        ,
        this.clear = function(y=!0, z=!0, X=!0) {
            let q = 0;
            if (y) {
                let V = !1;
                if (M !== null) {
                    const Me = M.texture.format;
                    V = g.has(Me)
                }
                if (V) {
                    const Me = M.texture.type
                      , Ce = _.has(Me)
                      , Ue = de.getClearColor()
                      , Le = de.getClearAlpha()
                      , Ge = Ue.r
                      , He = Ue.g
                      , Be = Ue.b;
                    Ce ? (f[0] = Ge,
                    f[1] = He,
                    f[2] = Be,
                    f[3] = Le,
                    w.clearBufferuiv(w.COLOR, 0, f)) : (u[0] = Ge,
                    u[1] = He,
                    u[2] = Be,
                    u[3] = Le,
                    w.clearBufferiv(w.COLOR, 0, u))
                } else
                    q |= w.COLOR_BUFFER_BIT
            }
            z && (q |= w.DEPTH_BUFFER_BIT),
            X && (q |= w.STENCIL_BUFFER_BIT,
            this.state.buffers.stencil.setMask(4294967295)),
            w.clear(q)
        }
        ,
        this.clearColor = function() {
            this.clear(!0, !1, !1)
        }
        ,
        this.clearDepth = function() {
            this.clear(!1, !0, !1)
        }
        ,
        this.clearStencil = function() {
            this.clear(!1, !1, !0)
        }
        ,
        this.dispose = function() {
            t.removeEventListener("webglcontextlost", ne, !1),
            t.removeEventListener("webglcontextrestored", Z, !1),
            t.removeEventListener("webglcontextcreationerror", we, !1),
            de.dispose(),
            be.dispose(),
            Ie.dispose(),
            oe.dispose(),
            A.dispose(),
            x.dispose(),
            ie.dispose(),
            I.dispose(),
            ve.dispose(),
            j.dispose(),
            ue.dispose(),
            ue.removeEventListener("sessionstart", Vt),
            ue.removeEventListener("sessionend", nt),
            ht.stop()
        }
        ;
        function ne(y) {
            y.preventDefault(),
            lo("WebGLRenderer: Context Lost."),
            R = !0
        }
        function Z() {
            lo("WebGLRenderer: Context Restored."),
            R = !1;
            const y = De.autoReset
              , z = J.enabled
              , X = J.autoUpdate
              , q = J.needsUpdate
              , V = J.type;
            ge(),
            De.autoReset = y,
            J.enabled = z,
            J.autoUpdate = X,
            J.needsUpdate = q,
            J.type = V
        }
        function we(y) {
            bt("WebGLRenderer: A WebGL context could not be created. Reason: ", y.statusMessage)
        }
        function ze(y) {
            const z = y.target;
            z.removeEventListener("dispose", ze),
            lt(z)
        }
        function lt(y) {
            rt(y),
            oe.remove(y)
        }
        function rt(y) {
            const z = oe.get(y).programs;
            z !== void 0 && (z.forEach(function(X) {
                j.releaseProgram(X)
            }),
            y.isShaderMaterial && j.releaseShaderCache(y))
        }
        this.renderBufferDirect = function(y, z, X, q, V, Me) {
            z === null && (z = he);
            const Ce = V.isMesh && V.matrixWorld.determinant() < 0
              , Ue = dt(y, z, X, q, V);
            xe.setMaterial(q, Ce);
            let Le = X.index
              , Ge = 1;
            if (q.wireframe === !0) {
                if (Le = $.getWireframeAttribute(X),
                Le === void 0)
                    return;
                Ge = 2
            }
            const He = X.drawRange
              , Be = X.attributes.position;
            let tt = He.start * Ge
              , ft = (He.start + He.count) * Ge;
            Me !== null && (tt = Math.max(tt, Me.start * Ge),
            ft = Math.min(ft, (Me.start + Me.count) * Ge)),
            Le !== null ? (tt = Math.max(tt, 0),
            ft = Math.min(ft, Le.count)) : Be != null && (tt = Math.max(tt, 0),
            ft = Math.min(ft, Be.count));
            const _t = ft - tt;
            if (_t < 0 || _t === 1 / 0)
                return;
            I.setup(V, q, Ue, X, Le);
            let vt, mt = Ne;
            if (Le !== null && (vt = N.get(Le),
            mt = Ee,
            mt.setIndex(vt)),
            V.isMesh)
                q.wireframe === !0 ? (xe.setLineWidth(q.wireframeLinewidth * ae()),
                mt.setMode(w.LINES)) : mt.setMode(w.TRIANGLES);
            else if (V.isLine) {
                let ke = q.linewidth;
                ke === void 0 && (ke = 1),
                xe.setLineWidth(ke * ae()),
                V.isLineSegments ? mt.setMode(w.LINES) : V.isLineLoop ? mt.setMode(w.LINE_LOOP) : mt.setMode(w.LINE_STRIP)
            } else
                V.isPoints ? mt.setMode(w.POINTS) : V.isSprite && mt.setMode(w.TRIANGLES);
            if (V.isBatchedMesh)
                if (V._multiDrawInstances !== null)
                    ur("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),
                    mt.renderMultiDrawInstances(V._multiDrawStarts, V._multiDrawCounts, V._multiDrawCount, V._multiDrawInstances);
                else if (_e.get("WEBGL_multi_draw"))
                    mt.renderMultiDraw(V._multiDrawStarts, V._multiDrawCounts, V._multiDrawCount);
                else {
                    const ke = V._multiDrawStarts
                      , xt = V._multiDrawCounts
                      , at = V._multiDrawCount
                      , Kt = Le ? N.get(Le).bytesPerElement : 1
                      , hi = oe.get(q).currentProgram.getUniforms();
                    for (let Zt = 0; Zt < at; Zt++)
                        hi.setValue(w, "_gl_DrawID", Zt),
                        mt.render(ke[Zt] / Kt, xt[Zt])
                }
            else if (V.isInstancedMesh)
                mt.renderInstances(tt, _t, V.count);
            else if (X.isInstancedBufferGeometry) {
                const ke = X._maxInstanceCount !== void 0 ? X._maxInstanceCount : 1 / 0
                  , xt = Math.min(X.instanceCount, ke);
                mt.renderInstances(tt, _t, xt)
            } else
                mt.render(tt, _t)
        }
        ;
        function zt(y, z, X) {
            y.transparent === !0 && y.side === xn && y.forceSinglePass === !1 ? (y.side = $t,
            y.needsUpdate = !0,
            Oe(y, z, X),
            y.side = jn,
            y.needsUpdate = !0,
            Oe(y, z, X),
            y.side = xn) : Oe(y, z, X)
        }
        this.compile = function(y, z, X=null) {
            X === null && (X = y),
            v = Ie.get(X),
            v.init(z),
            C.push(v),
            X.traverseVisible(function(V) {
                V.isLight && V.layers.test(z.layers) && (v.pushLight(V),
                V.castShadow && v.pushShadow(V))
            }),
            y !== X && y.traverseVisible(function(V) {
                V.isLight && V.layers.test(z.layers) && (v.pushLight(V),
                V.castShadow && v.pushShadow(V))
            }),
            v.setupLights();
            const q = new Set;
            return y.traverse(function(V) {
                if (!(V.isMesh || V.isPoints || V.isLine || V.isSprite))
                    return;
                const Me = V.material;
                if (Me)
                    if (Array.isArray(Me))
                        for (let Ce = 0; Ce < Me.length; Ce++) {
                            const Ue = Me[Ce];
                            zt(Ue, X, V),
                            q.add(Ue)
                        }
                    else
                        zt(Me, X, V),
                        q.add(Me)
            }),
            v = C.pop(),
            q
        }
        ,
        this.compileAsync = function(y, z, X=null) {
            const q = this.compile(y, z, X);
            return new Promise(V => {
                function Me() {
                    if (q.forEach(function(Ce) {
                        oe.get(Ce).currentProgram.isReady() && q.delete(Ce)
                    }),
                    q.size === 0) {
                        V(y);
                        return
                    }
                    setTimeout(Me, 10)
                }
                _e.get("KHR_parallel_shader_compile") !== null ? Me() : setTimeout(Me, 10)
            }
            )
        }
        ;
        let Nt = null;
        function Et(y) {
            Nt && Nt(y)
        }
        function Vt() {
            ht.stop()
        }
        function nt() {
            ht.start()
        }
        const ht = new Hc;
        ht.setAnimationLoop(Et),
        typeof self < "u" && ht.setContext(self),
        this.setAnimationLoop = function(y) {
            Nt = y,
            ue.setAnimationLoop(y),
            y === null ? ht.stop() : ht.start()
        }
        ,
        ue.addEventListener("sessionstart", Vt),
        ue.addEventListener("sessionend", nt),
        this.render = function(y, z) {
            if (z !== void 0 && z.isCamera !== !0) {
                bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                return
            }
            if (R === !0)
                return;
            if (y.matrixWorldAutoUpdate === !0 && y.updateMatrixWorld(),
            z.parent === null && z.matrixWorldAutoUpdate === !0 && z.updateMatrixWorld(),
            ue.enabled === !0 && ue.isPresenting === !0 && (ue.cameraAutoUpdate === !0 && ue.updateCamera(z),
            z = ue.getCamera()),
            y.isScene === !0 && y.onBeforeRender(E, y, z, M),
            v = Ie.get(y, C.length),
            v.init(z),
            C.push(v),
            We.multiplyMatrices(z.projectionMatrix, z.matrixWorldInverse),
            Q.setFromProjectionMatrix(We, Sn, z.reversedDepth),
            Re = this.localClippingEnabled,
            se = Ae.init(this.clippingPlanes, Re),
            b = be.get(y, T.length),
            b.init(),
            T.push(b),
            ue.enabled === !0 && ue.isPresenting === !0) {
                const Me = E.xr.getDepthSensingMesh();
                Me !== null && st(Me, z, -1 / 0, E.sortObjects)
            }
            st(y, z, 0, E.sortObjects),
            b.finish(),
            E.sortObjects === !0 && b.sort(Se, pe),
            ee = ue.enabled === !1 || ue.isPresenting === !1 || ue.hasDepthSensing() === !1,
            ee && de.addToRenderList(b, y),
            this.info.render.frame++,
            se === !0 && Ae.beginShadows();
            const X = v.state.shadowsArray;
            J.render(X, y, z),
            se === !0 && Ae.endShadows(),
            this.info.autoReset === !0 && this.info.reset();
            const q = b.opaque
              , V = b.transmissive;
            if (v.setupLights(),
            z.isArrayCamera) {
                const Me = z.cameras;
                if (V.length > 0)
                    for (let Ce = 0, Ue = Me.length; Ce < Ue; Ce++) {
                        const Le = Me[Ce];
                        P(q, V, y, Le)
                    }
                ee && de.render(y);
                for (let Ce = 0, Ue = Me.length; Ce < Ue; Ce++) {
                    const Le = Me[Ce];
                    At(b, y, Le, Le.viewport)
                }
            } else
                V.length > 0 && P(q, V, y, z),
                ee && de.render(y),
                At(b, y, z);
            M !== null && S === 0 && (me.updateMultisampleRenderTarget(M),
            me.updateRenderTargetMipmap(M)),
            y.isScene === !0 && y.onAfterRender(E, y, z),
            I.resetDefaultState(),
            U = -1,
            B = null,
            C.pop(),
            C.length > 0 ? (v = C[C.length - 1],
            se === !0 && Ae.setGlobalState(E.clippingPlanes, v.state.camera)) : v = null,
            T.pop(),
            T.length > 0 ? b = T[T.length - 1] : b = null
        }
        ;
        function st(y, z, X, q) {
            if (y.visible === !1)
                return;
            if (y.layers.test(z.layers)) {
                if (y.isGroup)
                    X = y.renderOrder;
                else if (y.isLOD)
                    y.autoUpdate === !0 && y.update(z);
                else if (y.isLight)
                    v.pushLight(y),
                    y.castShadow && v.pushShadow(y);
                else if (y.isSprite) {
                    if (!y.frustumCulled || Q.intersectsSprite(y)) {
                        q && re.setFromMatrixPosition(y.matrixWorld).applyMatrix4(We);
                        const Ce = ie.update(y)
                          , Ue = y.material;
                        Ue.visible && b.push(y, Ce, Ue, X, re.z, null)
                    }
                } else if ((y.isMesh || y.isLine || y.isPoints) && (!y.frustumCulled || Q.intersectsObject(y))) {
                    const Ce = ie.update(y)
                      , Ue = y.material;
                    if (q && (y.boundingSphere !== void 0 ? (y.boundingSphere === null && y.computeBoundingSphere(),
                    re.copy(y.boundingSphere.center)) : (Ce.boundingSphere === null && Ce.computeBoundingSphere(),
                    re.copy(Ce.boundingSphere.center)),
                    re.applyMatrix4(y.matrixWorld).applyMatrix4(We)),
                    Array.isArray(Ue)) {
                        const Le = Ce.groups;
                        for (let Ge = 0, He = Le.length; Ge < He; Ge++) {
                            const Be = Le[Ge]
                              , tt = Ue[Be.materialIndex];
                            tt && tt.visible && b.push(y, Ce, tt, X, re.z, Be)
                        }
                    } else
                        Ue.visible && b.push(y, Ce, Ue, X, re.z, null)
                }
            }
            const Me = y.children;
            for (let Ce = 0, Ue = Me.length; Ce < Ue; Ce++)
                st(Me[Ce], z, X, q)
        }
        function At(y, z, X, q) {
            const {opaque: V, transmissive: Me, transparent: Ce} = y;
            v.setupLightsView(X),
            se === !0 && Ae.setGlobalState(E.clippingPlanes, X),
            q && xe.viewport(k.copy(q)),
            V.length > 0 && H(V, z, X),
            Me.length > 0 && H(Me, z, X),
            Ce.length > 0 && H(Ce, z, X),
            xe.buffers.depth.setTest(!0),
            xe.buffers.depth.setMask(!0),
            xe.buffers.color.setMask(!0),
            xe.setPolygonOffset(!1)
        }
        function P(y, z, X, q) {
            if ((X.isScene === !0 ? X.overrideMaterial : null) !== null)
                return;
            v.state.transmissionRenderTarget[q.id] === void 0 && (v.state.transmissionRenderTarget[q.id] = new di(1,1,{
                generateMipmaps: !0,
                type: _e.has("EXT_color_buffer_half_float") || _e.has("EXT_color_buffer_float") ? zi : yn,
                minFilter: ci,
                samples: 4,
                stencilBuffer: s,
                resolveDepthBuffer: !1,
                resolveStencilBuffer: !1,
                colorSpace: ot.workingColorSpace
            }));
            const Me = v.state.transmissionRenderTarget[q.id]
              , Ce = q.viewport || k;
            Me.setSize(Ce.z * E.transmissionResolutionScale, Ce.w * E.transmissionResolutionScale);
            const Ue = E.getRenderTarget()
              , Le = E.getActiveCubeFace()
              , Ge = E.getActiveMipmapLevel();
            E.setRenderTarget(Me),
            E.getClearColor(Y),
            te = E.getClearAlpha(),
            te < 1 && E.setClearColor(16777215, .5),
            E.clear(),
            ee && de.render(X);
            const He = E.toneMapping;
            E.toneMapping = $n;
            const Be = q.viewport;
            if (q.viewport !== void 0 && (q.viewport = void 0),
            v.setupLightsView(q),
            se === !0 && Ae.setGlobalState(E.clippingPlanes, q),
            H(y, X, q),
            me.updateMultisampleRenderTarget(Me),
            me.updateRenderTargetMipmap(Me),
            _e.has("WEBGL_multisampled_render_to_texture") === !1) {
                let tt = !1;
                for (let ft = 0, _t = z.length; ft < _t; ft++) {
                    const vt = z[ft]
                      , {object: mt, geometry: ke, material: xt, group: at} = vt;
                    if (xt.side === xn && mt.layers.test(q.layers)) {
                        const Kt = xt.side;
                        xt.side = $t,
                        xt.needsUpdate = !0,
                        K(mt, X, q, ke, xt, at),
                        xt.side = Kt,
                        xt.needsUpdate = !0,
                        tt = !0
                    }
                }
                tt === !0 && (me.updateMultisampleRenderTarget(Me),
                me.updateRenderTargetMipmap(Me))
            }
            E.setRenderTarget(Ue, Le, Ge),
            E.setClearColor(Y, te),
            Be !== void 0 && (q.viewport = Be),
            E.toneMapping = He
        }
        function H(y, z, X) {
            const q = z.isScene === !0 ? z.overrideMaterial : null;
            for (let V = 0, Me = y.length; V < Me; V++) {
                const Ce = y[V]
                  , {object: Ue, geometry: Le, group: Ge} = Ce;
                let He = Ce.material;
                He.allowOverride === !0 && q !== null && (He = q),
                Ue.layers.test(X.layers) && K(Ue, z, X, Le, He, Ge)
            }
        }
        function K(y, z, X, q, V, Me) {
            y.onBeforeRender(E, z, X, q, V, Me),
            y.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse, y.matrixWorld),
            y.normalMatrix.getNormalMatrix(y.modelViewMatrix),
            V.onBeforeRender(E, z, X, q, y, Me),
            V.transparent === !0 && V.side === xn && V.forceSinglePass === !1 ? (V.side = $t,
            V.needsUpdate = !0,
            E.renderBufferDirect(X, z, q, V, y, Me),
            V.side = jn,
            V.needsUpdate = !0,
            E.renderBufferDirect(X, z, q, V, y, Me),
            V.side = xn) : E.renderBufferDirect(X, z, q, V, y, Me),
            y.onAfterRender(E, z, X, q, V, Me)
        }
        function Oe(y, z, X) {
            z.isScene !== !0 && (z = he);
            const q = oe.get(y)
              , V = v.state.lights
              , Me = v.state.shadowsArray
              , Ce = V.state.version
              , Ue = j.getParameters(y, V.state, Me, z, X)
              , Le = j.getProgramCacheKey(Ue);
            let Ge = q.programs;
            q.environment = y.isMeshStandardMaterial ? z.environment : null,
            q.fog = z.fog,
            q.envMap = (y.isMeshStandardMaterial ? x : A).get(y.envMap || q.environment),
            q.envMapRotation = q.environment !== null && y.envMap === null ? z.environmentRotation : y.envMapRotation,
            Ge === void 0 && (y.addEventListener("dispose", ze),
            Ge = new Map,
            q.programs = Ge);
            let He = Ge.get(Le);
            if (He !== void 0) {
                if (q.currentProgram === He && q.lightsStateVersion === Ce)
                    return ut(y, Ue),
                    He
            } else
                Ue.uniforms = j.getUniforms(y),
                y.onBeforeCompile(Ue, E),
                He = j.acquireProgram(Ue, Le),
                Ge.set(Le, He),
                q.uniforms = Ue.uniforms;
            const Be = q.uniforms;
            return (!y.isShaderMaterial && !y.isRawShaderMaterial || y.clipping === !0) && (Be.clippingPlanes = Ae.uniform),
            ut(y, Ue),
            q.needsLights = jt(y),
            q.lightsStateVersion = Ce,
            q.needsLights && (Be.ambientLightColor.value = V.state.ambient,
            Be.lightProbe.value = V.state.probe,
            Be.directionalLights.value = V.state.directional,
            Be.directionalLightShadows.value = V.state.directionalShadow,
            Be.spotLights.value = V.state.spot,
            Be.spotLightShadows.value = V.state.spotShadow,
            Be.rectAreaLights.value = V.state.rectArea,
            Be.ltc_1.value = V.state.rectAreaLTC1,
            Be.ltc_2.value = V.state.rectAreaLTC2,
            Be.pointLights.value = V.state.point,
            Be.pointLightShadows.value = V.state.pointShadow,
            Be.hemisphereLights.value = V.state.hemi,
            Be.directionalShadowMap.value = V.state.directionalShadowMap,
            Be.directionalShadowMatrix.value = V.state.directionalShadowMatrix,
            Be.spotShadowMap.value = V.state.spotShadowMap,
            Be.spotLightMatrix.value = V.state.spotLightMatrix,
            Be.spotLightMap.value = V.state.spotLightMap,
            Be.pointShadowMap.value = V.state.pointShadowMap,
            Be.pointShadowMatrix.value = V.state.pointShadowMatrix),
            q.currentProgram = He,
            q.uniformsList = null,
            He
        }
        function qe(y) {
            if (y.uniformsList === null) {
                const z = y.currentProgram.getUniforms();
                y.uniformsList = Xr.seqWithValue(z.seq, y.uniforms)
            }
            return y.uniformsList
        }
        function ut(y, z) {
            const X = oe.get(y);
            X.outputColorSpace = z.outputColorSpace,
            X.batching = z.batching,
            X.batchingColor = z.batchingColor,
            X.instancing = z.instancing,
            X.instancingColor = z.instancingColor,
            X.instancingMorph = z.instancingMorph,
            X.skinning = z.skinning,
            X.morphTargets = z.morphTargets,
            X.morphNormals = z.morphNormals,
            X.morphColors = z.morphColors,
            X.morphTargetsCount = z.morphTargetsCount,
            X.numClippingPlanes = z.numClippingPlanes,
            X.numIntersection = z.numClipIntersection,
            X.vertexAlphas = z.vertexAlphas,
            X.vertexTangents = z.vertexTangents,
            X.toneMapping = z.toneMapping
        }
        function dt(y, z, X, q, V) {
            z.isScene !== !0 && (z = he),
            me.resetTextureUnits();
            const Me = z.fog
              , Ce = q.isMeshStandardMaterial ? z.environment : null
              , Ue = M === null ? E.outputColorSpace : M.isXRRenderTarget === !0 ? M.texture.colorSpace : Oi
              , Le = (q.isMeshStandardMaterial ? x : A).get(q.envMap || Ce)
              , Ge = q.vertexColors === !0 && !!X.attributes.color && X.attributes.color.itemSize === 4
              , He = !!X.attributes.tangent && (!!q.normalMap || q.anisotropy > 0)
              , Be = !!X.morphAttributes.position
              , tt = !!X.morphAttributes.normal
              , ft = !!X.morphAttributes.color;
            let _t = $n;
            q.toneMapped && (M === null || M.isXRRenderTarget === !0) && (_t = E.toneMapping);
            const vt = X.morphAttributes.position || X.morphAttributes.normal || X.morphAttributes.color
              , mt = vt !== void 0 ? vt.length : 0
              , ke = oe.get(q)
              , xt = v.state.lights;
            if (se === !0 && (Re === !0 || y !== B)) {
                const kt = y === B && q.id === U;
                Ae.setState(q, y, kt)
            }
            let at = !1;
            q.version === ke.__version ? (ke.needsLights && ke.lightsStateVersion !== xt.state.version || ke.outputColorSpace !== Ue || V.isBatchedMesh && ke.batching === !1 || !V.isBatchedMesh && ke.batching === !0 || V.isBatchedMesh && ke.batchingColor === !0 && V.colorTexture === null || V.isBatchedMesh && ke.batchingColor === !1 && V.colorTexture !== null || V.isInstancedMesh && ke.instancing === !1 || !V.isInstancedMesh && ke.instancing === !0 || V.isSkinnedMesh && ke.skinning === !1 || !V.isSkinnedMesh && ke.skinning === !0 || V.isInstancedMesh && ke.instancingColor === !0 && V.instanceColor === null || V.isInstancedMesh && ke.instancingColor === !1 && V.instanceColor !== null || V.isInstancedMesh && ke.instancingMorph === !0 && V.morphTexture === null || V.isInstancedMesh && ke.instancingMorph === !1 && V.morphTexture !== null || ke.envMap !== Le || q.fog === !0 && ke.fog !== Me || ke.numClippingPlanes !== void 0 && (ke.numClippingPlanes !== Ae.numPlanes || ke.numIntersection !== Ae.numIntersection) || ke.vertexAlphas !== Ge || ke.vertexTangents !== He || ke.morphTargets !== Be || ke.morphNormals !== tt || ke.morphColors !== ft || ke.toneMapping !== _t || ke.morphTargetsCount !== mt) && (at = !0) : (at = !0,
            ke.__version = q.version);
            let Kt = ke.currentProgram;
            at === !0 && (Kt = Oe(q, z, V));
            let hi = !1
              , Zt = !1
              , qi = !1;
            const gt = Kt.getUniforms()
              , qt = ke.uniforms;
            if (xe.useProgram(Kt.program) && (hi = !0,
            Zt = !0,
            qi = !0),
            q.id !== U && (U = q.id,
            Zt = !0),
            hi || B !== y) {
                xe.buffers.depth.getReversed() && y.reversedDepth !== !0 && (y._reversedDepth = !0,
                y.updateProjectionMatrix()),
                gt.setValue(w, "projectionMatrix", y.projectionMatrix),
                gt.setValue(w, "viewMatrix", y.matrixWorldInverse);
                const Yt = gt.map.cameraPosition;
                Yt !== void 0 && Yt.setValue(w, W.setFromMatrixPosition(y.matrixWorld)),
                Pe.logarithmicDepthBuffer && gt.setValue(w, "logDepthBufFC", 2 / (Math.log(y.far + 1) / Math.LN2)),
                (q.isMeshPhongMaterial || q.isMeshToonMaterial || q.isMeshLambertMaterial || q.isMeshBasicMaterial || q.isMeshStandardMaterial || q.isShaderMaterial) && gt.setValue(w, "isOrthographic", y.isOrthographicCamera === !0),
                B !== y && (B = y,
                Zt = !0,
                qi = !0)
            }
            if (V.isSkinnedMesh) {
                gt.setOptional(w, V, "bindMatrix"),
                gt.setOptional(w, V, "bindMatrixInverse");
                const kt = V.skeleton;
                kt && (kt.boneTexture === null && kt.computeBoneTexture(),
                gt.setValue(w, "boneTexture", kt.boneTexture, me))
            }
            V.isBatchedMesh && (gt.setOptional(w, V, "batchingTexture"),
            gt.setValue(w, "batchingTexture", V._matricesTexture, me),
            gt.setOptional(w, V, "batchingIdTexture"),
            gt.setValue(w, "batchingIdTexture", V._indirectTexture, me),
            gt.setOptional(w, V, "batchingColorTexture"),
            V._colorsTexture !== null && gt.setValue(w, "batchingColorTexture", V._colorsTexture, me));
            const nn = X.morphAttributes;
            if ((nn.position !== void 0 || nn.normal !== void 0 || nn.color !== void 0) && Fe.update(V, X, Kt),
            (Zt || ke.receiveShadow !== V.receiveShadow) && (ke.receiveShadow = V.receiveShadow,
            gt.setValue(w, "receiveShadow", V.receiveShadow)),
            q.isMeshGouraudMaterial && q.envMap !== null && (qt.envMap.value = Le,
            qt.flipEnvMap.value = Le.isCubeTexture && Le.isRenderTargetTexture === !1 ? -1 : 1),
            q.isMeshStandardMaterial && q.envMap === null && z.environment !== null && (qt.envMapIntensity.value = z.environmentIntensity),
            qt.dfgLUT !== void 0 && (qt.dfgLUT.value = j0()),
            Zt && (gt.setValue(w, "toneMappingExposure", E.toneMappingExposure),
            ke.needsLights && wt(qt, qi),
            Me && q.fog === !0 && Te.refreshFogUniforms(qt, Me),
            Te.refreshMaterialUniforms(qt, q, fe, le, v.state.transmissionRenderTarget[y.id]),
            Xr.upload(w, qe(ke), qt, me)),
            q.isShaderMaterial && q.uniformsNeedUpdate === !0 && (Xr.upload(w, qe(ke), qt, me),
            q.uniformsNeedUpdate = !1),
            q.isSpriteMaterial && gt.setValue(w, "center", V.center),
            gt.setValue(w, "modelViewMatrix", V.modelViewMatrix),
            gt.setValue(w, "normalMatrix", V.normalMatrix),
            gt.setValue(w, "modelMatrix", V.matrixWorld),
            q.isShaderMaterial || q.isRawShaderMaterial) {
                const kt = q.uniformsGroups;
                for (let Yt = 0, ts = kt.length; Yt < ts; Yt++) {
                    const Jn = kt[Yt];
                    ve.update(Jn, Kt),
                    ve.bind(Jn, Kt)
                }
            }
            return Kt
        }
        function wt(y, z) {
            y.ambientLightColor.needsUpdate = z,
            y.lightProbe.needsUpdate = z,
            y.directionalLights.needsUpdate = z,
            y.directionalLightShadows.needsUpdate = z,
            y.pointLights.needsUpdate = z,
            y.pointLightShadows.needsUpdate = z,
            y.spotLights.needsUpdate = z,
            y.spotLightShadows.needsUpdate = z,
            y.rectAreaLights.needsUpdate = z,
            y.hemisphereLights.needsUpdate = z
        }
        function jt(y) {
            return y.isMeshLambertMaterial || y.isMeshToonMaterial || y.isMeshPhongMaterial || y.isMeshStandardMaterial || y.isShadowMaterial || y.isShaderMaterial && y.lights === !0
        }
        this.getActiveCubeFace = function() {
            return F
        }
        ,
        this.getActiveMipmapLevel = function() {
            return S
        }
        ,
        this.getRenderTarget = function() {
            return M
        }
        ,
        this.setRenderTargetTextures = function(y, z, X) {
            const q = oe.get(y);
            q.__autoAllocateDepthBuffer = y.resolveDepthBuffer === !1,
            q.__autoAllocateDepthBuffer === !1 && (q.__useRenderToTexture = !1),
            oe.get(y.texture).__webglTexture = z,
            oe.get(y.depthTexture).__webglTexture = q.__autoAllocateDepthBuffer ? void 0 : X,
            q.__hasExternalTextures = !0
        }
        ,
        this.setRenderTargetFramebuffer = function(y, z) {
            const X = oe.get(y);
            X.__webglFramebuffer = z,
            X.__useDefaultFramebuffer = z === void 0
        }
        ;
        const An = w.createFramebuffer();
        this.setRenderTarget = function(y, z=0, X=0) {
            M = y,
            F = z,
            S = X;
            let q = !0
              , V = null
              , Me = !1
              , Ce = !1;
            if (y) {
                const Le = oe.get(y);
                if (Le.__useDefaultFramebuffer !== void 0)
                    xe.bindFramebuffer(w.FRAMEBUFFER, null),
                    q = !1;
                else if (Le.__webglFramebuffer === void 0)
                    me.setupRenderTarget(y);
                else if (Le.__hasExternalTextures)
                    me.rebindTextures(y, oe.get(y.texture).__webglTexture, oe.get(y.depthTexture).__webglTexture);
                else if (y.depthBuffer) {
                    const Be = y.depthTexture;
                    if (Le.__boundDepthTexture !== Be) {
                        if (Be !== null && oe.has(Be) && (y.width !== Be.image.width || y.height !== Be.image.height))
                            throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
                        me.setupDepthRenderbuffer(y)
                    }
                }
                const Ge = y.texture;
                (Ge.isData3DTexture || Ge.isDataArrayTexture || Ge.isCompressedArrayTexture) && (Ce = !0);
                const He = oe.get(y).__webglFramebuffer;
                y.isWebGLCubeRenderTarget ? (Array.isArray(He[z]) ? V = He[z][X] : V = He[z],
                Me = !0) : y.samples > 0 && me.useMultisampledRTT(y) === !1 ? V = oe.get(y).__webglMultisampledFramebuffer : Array.isArray(He) ? V = He[X] : V = He,
                k.copy(y.viewport),
                D.copy(y.scissor),
                G = y.scissorTest
            } else
                k.copy(Xe).multiplyScalar(fe).floor(),
                D.copy(it).multiplyScalar(fe).floor(),
                G = Je;
            if (X !== 0 && (V = An),
            xe.bindFramebuffer(w.FRAMEBUFFER, V) && q && xe.drawBuffers(y, V),
            xe.viewport(k),
            xe.scissor(D),
            xe.setScissorTest(G),
            Me) {
                const Le = oe.get(y.texture);
                w.framebufferTexture2D(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_CUBE_MAP_POSITIVE_X + z, Le.__webglTexture, X)
            } else if (Ce) {
                const Le = z;
                for (let Ge = 0; Ge < y.textures.length; Ge++) {
                    const He = oe.get(y.textures[Ge]);
                    w.framebufferTextureLayer(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0 + Ge, He.__webglTexture, X, Le)
                }
            } else if (y !== null && X !== 0) {
                const Le = oe.get(y.texture);
                w.framebufferTexture2D(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, Le.__webglTexture, X)
            }
            U = -1
        }
        ,
        this.readRenderTargetPixels = function(y, z, X, q, V, Me, Ce, Ue=0) {
            if (!(y && y.isWebGLRenderTarget)) {
                bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                return
            }
            let Le = oe.get(y).__webglFramebuffer;
            if (y.isWebGLCubeRenderTarget && Ce !== void 0 && (Le = Le[Ce]),
            Le) {
                xe.bindFramebuffer(w.FRAMEBUFFER, Le);
                try {
                    const Ge = y.textures[Ue]
                      , He = Ge.format
                      , Be = Ge.type;
                    if (!Pe.textureFormatReadable(He)) {
                        bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                        return
                    }
                    if (!Pe.textureTypeReadable(Be)) {
                        bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                        return
                    }
                    z >= 0 && z <= y.width - q && X >= 0 && X <= y.height - V && (y.textures.length > 1 && w.readBuffer(w.COLOR_ATTACHMENT0 + Ue),
                    w.readPixels(z, X, q, V, Ve.convert(He), Ve.convert(Be), Me))
                } finally {
                    const Ge = M !== null ? oe.get(M).__webglFramebuffer : null;
                    xe.bindFramebuffer(w.FRAMEBUFFER, Ge)
                }
            }
        }
        ,
        this.readRenderTargetPixelsAsync = async function(y, z, X, q, V, Me, Ce, Ue=0) {
            if (!(y && y.isWebGLRenderTarget))
                throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
            let Le = oe.get(y).__webglFramebuffer;
            if (y.isWebGLCubeRenderTarget && Ce !== void 0 && (Le = Le[Ce]),
            Le)
                if (z >= 0 && z <= y.width - q && X >= 0 && X <= y.height - V) {
                    xe.bindFramebuffer(w.FRAMEBUFFER, Le);
                    const Ge = y.textures[Ue]
                      , He = Ge.format
                      , Be = Ge.type;
                    if (!Pe.textureFormatReadable(He))
                        throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
                    if (!Pe.textureTypeReadable(Be))
                        throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
                    const tt = w.createBuffer();
                    w.bindBuffer(w.PIXEL_PACK_BUFFER, tt),
                    w.bufferData(w.PIXEL_PACK_BUFFER, Me.byteLength, w.STREAM_READ),
                    y.textures.length > 1 && w.readBuffer(w.COLOR_ATTACHMENT0 + Ue),
                    w.readPixels(z, X, q, V, Ve.convert(He), Ve.convert(Be), 0);
                    const ft = M !== null ? oe.get(M).__webglFramebuffer : null;
                    xe.bindFramebuffer(w.FRAMEBUFFER, ft);
                    const _t = w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE, 0);
                    return w.flush(),
                    await nu(w, _t, 4),
                    w.bindBuffer(w.PIXEL_PACK_BUFFER, tt),
                    w.getBufferSubData(w.PIXEL_PACK_BUFFER, 0, Me),
                    w.deleteBuffer(tt),
                    w.deleteSync(_t),
                    Me
                } else
                    throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")
        }
        ,
        this.copyFramebufferToTexture = function(y, z=null, X=0) {
            const q = Math.pow(2, -X)
              , V = Math.floor(y.image.width * q)
              , Me = Math.floor(y.image.height * q)
              , Ce = z !== null ? z.x : 0
              , Ue = z !== null ? z.y : 0;
            me.setTexture2D(y, 0),
            w.copyTexSubImage2D(w.TEXTURE_2D, X, 0, 0, Ce, Ue, V, Me),
            xe.unbindTexture()
        }
        ;
        const dn = w.createFramebuffer()
          , hn = w.createFramebuffer();
        this.copyTextureToTexture = function(y, z, X=null, q=null, V=0, Me=null) {
            Me === null && (V !== 0 ? (ur("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),
            Me = V,
            V = 0) : Me = 0);
            let Ce, Ue, Le, Ge, He, Be, tt, ft, _t;
            const vt = y.isCompressedTexture ? y.mipmaps[Me] : y.image;
            if (X !== null)
                Ce = X.max.x - X.min.x,
                Ue = X.max.y - X.min.y,
                Le = X.isBox3 ? X.max.z - X.min.z : 1,
                Ge = X.min.x,
                He = X.min.y,
                Be = X.isBox3 ? X.min.z : 0;
            else {
                const nn = Math.pow(2, -V);
                Ce = Math.floor(vt.width * nn),
                Ue = Math.floor(vt.height * nn),
                y.isDataArrayTexture ? Le = vt.depth : y.isData3DTexture ? Le = Math.floor(vt.depth * nn) : Le = 1,
                Ge = 0,
                He = 0,
                Be = 0
            }
            q !== null ? (tt = q.x,
            ft = q.y,
            _t = q.z) : (tt = 0,
            ft = 0,
            _t = 0);
            const mt = Ve.convert(z.format)
              , ke = Ve.convert(z.type);
            let xt;
            z.isData3DTexture ? (me.setTexture3D(z, 0),
            xt = w.TEXTURE_3D) : z.isDataArrayTexture || z.isCompressedArrayTexture ? (me.setTexture2DArray(z, 0),
            xt = w.TEXTURE_2D_ARRAY) : (me.setTexture2D(z, 0),
            xt = w.TEXTURE_2D),
            w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL, z.flipY),
            w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL, z.premultiplyAlpha),
            w.pixelStorei(w.UNPACK_ALIGNMENT, z.unpackAlignment);
            const at = w.getParameter(w.UNPACK_ROW_LENGTH)
              , Kt = w.getParameter(w.UNPACK_IMAGE_HEIGHT)
              , hi = w.getParameter(w.UNPACK_SKIP_PIXELS)
              , Zt = w.getParameter(w.UNPACK_SKIP_ROWS)
              , qi = w.getParameter(w.UNPACK_SKIP_IMAGES);
            w.pixelStorei(w.UNPACK_ROW_LENGTH, vt.width),
            w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, vt.height),
            w.pixelStorei(w.UNPACK_SKIP_PIXELS, Ge),
            w.pixelStorei(w.UNPACK_SKIP_ROWS, He),
            w.pixelStorei(w.UNPACK_SKIP_IMAGES, Be);
            const gt = y.isDataArrayTexture || y.isData3DTexture
              , qt = z.isDataArrayTexture || z.isData3DTexture;
            if (y.isDepthTexture) {
                const nn = oe.get(y)
                  , kt = oe.get(z)
                  , Yt = oe.get(nn.__renderTarget)
                  , ts = oe.get(kt.__renderTarget);
                xe.bindFramebuffer(w.READ_FRAMEBUFFER, Yt.__webglFramebuffer),
                xe.bindFramebuffer(w.DRAW_FRAMEBUFFER, ts.__webglFramebuffer);
                for (let Jn = 0; Jn < Le; Jn++)
                    gt && (w.framebufferTextureLayer(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, oe.get(y).__webglTexture, V, Be + Jn),
                    w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, oe.get(z).__webglTexture, Me, _t + Jn)),
                    w.blitFramebuffer(Ge, He, Ce, Ue, tt, ft, Ce, Ue, w.DEPTH_BUFFER_BIT, w.NEAREST);
                xe.bindFramebuffer(w.READ_FRAMEBUFFER, null),
                xe.bindFramebuffer(w.DRAW_FRAMEBUFFER, null)
            } else if (V !== 0 || y.isRenderTargetTexture || oe.has(y)) {
                const nn = oe.get(y)
                  , kt = oe.get(z);
                xe.bindFramebuffer(w.READ_FRAMEBUFFER, dn),
                xe.bindFramebuffer(w.DRAW_FRAMEBUFFER, hn);
                for (let Yt = 0; Yt < Le; Yt++)
                    gt ? w.framebufferTextureLayer(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, nn.__webglTexture, V, Be + Yt) : w.framebufferTexture2D(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, nn.__webglTexture, V),
                    qt ? w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, kt.__webglTexture, Me, _t + Yt) : w.framebufferTexture2D(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, kt.__webglTexture, Me),
                    V !== 0 ? w.blitFramebuffer(Ge, He, Ce, Ue, tt, ft, Ce, Ue, w.COLOR_BUFFER_BIT, w.NEAREST) : qt ? w.copyTexSubImage3D(xt, Me, tt, ft, _t + Yt, Ge, He, Ce, Ue) : w.copyTexSubImage2D(xt, Me, tt, ft, Ge, He, Ce, Ue);
                xe.bindFramebuffer(w.READ_FRAMEBUFFER, null),
                xe.bindFramebuffer(w.DRAW_FRAMEBUFFER, null)
            } else
                qt ? y.isDataTexture || y.isData3DTexture ? w.texSubImage3D(xt, Me, tt, ft, _t, Ce, Ue, Le, mt, ke, vt.data) : z.isCompressedArrayTexture ? w.compressedTexSubImage3D(xt, Me, tt, ft, _t, Ce, Ue, Le, mt, vt.data) : w.texSubImage3D(xt, Me, tt, ft, _t, Ce, Ue, Le, mt, ke, vt) : y.isDataTexture ? w.texSubImage2D(w.TEXTURE_2D, Me, tt, ft, Ce, Ue, mt, ke, vt.data) : y.isCompressedTexture ? w.compressedTexSubImage2D(w.TEXTURE_2D, Me, tt, ft, vt.width, vt.height, mt, vt.data) : w.texSubImage2D(w.TEXTURE_2D, Me, tt, ft, Ce, Ue, mt, ke, vt);
            w.pixelStorei(w.UNPACK_ROW_LENGTH, at),
            w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, Kt),
            w.pixelStorei(w.UNPACK_SKIP_PIXELS, hi),
            w.pixelStorei(w.UNPACK_SKIP_ROWS, Zt),
            w.pixelStorei(w.UNPACK_SKIP_IMAGES, qi),
            Me === 0 && z.generateMipmaps && w.generateMipmap(xt),
            xe.unbindTexture()
        }
        ,
        this.initRenderTarget = function(y) {
            oe.get(y).__webglFramebuffer === void 0 && me.setupRenderTarget(y)
        }
        ,
        this.initTexture = function(y) {
            y.isCubeTexture ? me.setTextureCube(y, 0) : y.isData3DTexture ? me.setTexture3D(y, 0) : y.isDataArrayTexture || y.isCompressedArrayTexture ? me.setTexture2DArray(y, 0) : me.setTexture2D(y, 0),
            xe.unbindTexture()
        }
        ,
        this.resetState = function() {
            F = 0,
            S = 0,
            M = null,
            xe.reset(),
            I.reset()
        }
        ,
        typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
            detail: this
        }))
    }
    get coordinateSystem() {
        return Sn
    }
    get outputColorSpace() {
        return this._outputColorSpace
    }
    set outputColorSpace(e) {
        this._outputColorSpace = e;
        const t = this.getContext();
        t.drawingBufferColorSpace = ot._getDrawingBufferColorSpace(e),
        t.unpackColorSpace = ot._getUnpackColorSpace()
    }
}
const tr = {
    track: "Free track",
    lift: "Chain lift",
    boost: "Booster",
    brake: "Trim brake",
    block: "Block brake",
    drive: "Drive tires",
    loop: "Vertical loop"
}
  , Ds = Math.PI / 180
  , Ea = hr.clamp
  , qn = hr.lerp
  , Ct = {
    invert: {
        name: "B&M Invert",
        detail: "Suspended four-across rows Â· box spine",
        color: 1552300,
        frame: 1792872,
        gauge: .96,
        seats: 4,
        rows: 1,
        spacing: 2.46,
        hang: !0,
        style: "box",
        nose: .42,
        cars: 5
    },
    hyper: {
        name: "B&M Hyper",
        detail: "Open four-across seats Â· box spine",
        color: 16754492,
        frame: 9586480,
        gauge: 1.03,
        seats: 4,
        rows: 1,
        spacing: 2.33,
        hang: !1,
        style: "box",
        nose: .59,
        cars: 5
    },
    arrow: {
        name: "Arrow Looper",
        detail: "Two-across high-back cars Â· tubular spine",
        color: 15954773,
        frame: 8465481,
        gauge: .79,
        seats: 2,
        rows: 2,
        spacing: 2.56,
        hang: !1,
        style: "tube",
        nose: .78,
        cars: 4
    },
    dive: {
        name: "B&M Dive",
        detail: "Wide six-across rows Â· heavy box spine",
        color: 16306791,
        frame: 8614969,
        gauge: 1.33,
        seats: 6,
        rows: 1,
        spacing: 2.72,
        hang: !1,
        style: "box",
        nose: .46,
        cars: 4
    },
    launch: {
        name: "Tri-Rail Launch",
        detail: "Low two-across cars Â· triangular spine",
        color: 9550591,
        frame: 3689091,
        gauge: .84,
        seats: 2,
        rows: 2,
        spacing: 2.72,
        hang: !1,
        style: "tri",
        nose: .57,
        cars: 4
    },
    wood: {
        name: "Classic Woodie",
        detail: "Bench seating Â· timber trestles",
        color: 16307109,
        frame: 9328956,
        gauge: .82,
        seats: 2,
        rows: 2,
        spacing: 2.78,
        hang: !1,
        style: "wood",
        nose: .73,
        cars: 4
    },
    ptc: {
        name: "PTC Wooden Coaster",
        detail: "Three bench rows with high sides Â· laminated timber",
        color: 15317315,
        frame: 8410681,
        gauge: .83,
        seats: 2,
        rows: 3,
        spacing: 3.1,
        hang: !1,
        style: "wood",
        nose: .59,
        cars: 4
    },
    gci: {
        name: "GCI Wooden Coaster",
        detail: "Articulated single-row Millennium Flyerâ€“style cars Â· laminated timber",
        color: 10628140,
        frame: 10843463,
        gauge: .83,
        seats: 2,
        rows: 1,
        spacing: 1.57,
        hang: !1,
        style: "wood",
        nose: .52,
        cars: 8
    },
    accelerator: {
        name: "Intamin Accelerator",
        detail: "Low rocket-nose cars Â· tubular lattice spine",
        color: 14698326,
        frame: 3233927,
        gauge: .88,
        seats: 2,
        rows: 2,
        spacing: 2.58,
        hang: !1,
        style: "tri",
        nose: 1.1,
        cars: 5
    },
    ibox: {
        name: "RMC IBox",
        detail: "Twin steel box rails Â· hybrid trestles",
        color: 14707254,
        frame: 7227182,
        gauge: .91,
        seats: 2,
        rows: 2,
        spacing: 2.55,
        hang: !1,
        style: "ibox",
        nose: .61,
        cars: 5
    },
    topper: {
        name: "RMC Topper Track",
        detail: "Steel caps on laminated wood runners Â· hybrid train",
        color: 4611180,
        frame: 10645056,
        gauge: .9,
        seats: 2,
        rows: 2,
        spacing: 2.62,
        hang: !1,
        style: "topper",
        nose: .62,
        cars: 5
    },
    raptor: {
        name: "RMC Raptor",
        detail: "Single steel rail Â· single-file straddle seating",
        color: 4827234,
        frame: 4345157,
        gauge: .26,
        seats: 1,
        rows: 1,
        spacing: 1.41,
        hang: !1,
        style: "single",
        nose: .43,
        cars: 8
    },
    arrow4d: {
        name: "Arrow 4D Coaster",
        detail: "Four rails Â· outboard seats pitch independently of the track",
        color: 15284308,
        frame: 7882125,
        gauge: .95,
        seats: 4,
        rows: 1,
        spacing: 2.42,
        hang: !1,
        style: "four",
        nose: .62,
        cars: 5
    },
    axis: {
        name: "S&S Axis Coaster",
        detail: "Centered passenger chassis rolls inside a circular carrier",
        color: 3641309,
        frame: 2506838,
        gauge: .92,
        seats: 2,
        rows: 2,
        spacing: 2.84,
        hang: !1,
        style: "axis",
        nose: .49,
        cars: 4
    },
    spinning: {
        name: "Spinning Coaster",
        detail: "Four-seat free-spinning cars on a vertical turntable",
        color: 14517549,
        frame: 3165028,
        gauge: .75,
        seats: 2,
        rows: 2,
        spacing: 2.82,
        hang: !1,
        style: "tube",
        nose: .46,
        cars: 4
    }
}
  , cc = i => i === "arrow4d" || i === "axis"
  , Li = () => ({
    length: 16,
    turn: 0,
    pitch: 0,
    bank: 0,
    pivot: 0,
    kind: "track"
})
  , Is = i => typeof i == "string" && /^#[\da-f]{6}$/i.test(i)
  , $c = i => Ct[i].hang ? 2.9 : i === "axis" ? 1.8 : 1.1
  , ja = i => Math.max(0, i - 16) * .19;
function li(i, e) {
    return new O(Math.cos(i) * Math.cos(e),Math.sin(e),Math.sin(i) * Math.cos(e))
}
function Ta(i, e, t) {
    return li(i, e + Math.PI / 2).applyAxisAngle(li(i, e), t)
}
function Ka(i) {
    return {
        position: new O(i.x,Ct[i.model].hang ? 4.8 : 2.6,i.z),
        heading: i.angle,
        pitch: 0,
        bank: 0
    }
}
function sr(i, e, t=e.kind) {
    const n = [{
        position: i.position.clone(),
        up: Ta(i.heading, i.pitch, i.bank),
        kind: t,
        speed: e.speed,
        rotation: i.rotation
    }]
      , r = i.position.clone()
      , s = t === "loop"
      , a = e.pitch * Ds
      , startBankDeg = i.bank / Ds
      , normalizedBank = ((e.bank % 360) + 360) % 360
      , bankEndDeg = startBankDeg + ((((normalizedBank - startBankDeg) + 540) % 360) - 180)
      , o = bankEndDeg * Ds
      , l = e.turn * Ds
      , c = Math.min(8192, Math.max(s ? 48 : 8, Math.ceil(e.length * 1.25), Math.ceil((Math.abs(l) + Math.abs(a - i.pitch) + Math.abs(o - i.bank)) * 6)));
    for (let h = 1; h <= c; h++) {
        const d = h / c
          , p = d - .5 / c
          , m = i.heading + l * p
          , g = u => Math.PI * 2 * u + qn(i.pitch, a, u)
          , _ = s ? g(p) : qn(i.pitch, a, p)
          , f = e.length / c;
        r.addScaledVector(li(m, _), f),
        s && (r.addScaledVector(li(m, 0), f * .064),
        r.addScaledVector(li(m + Math.PI / 2, 0), f * .105 * Math.sin(Math.PI * p) ** 2)),
        n.push({
            position: r.clone().addScaledVector(li(m + Math.PI / 2, s ? g(d) : qn(i.pitch, a, d)), ((e.pivot ?? 0) / 3.28084) * Math.sin(o * d)),
            up: Ta(i.heading + l * d, s ? g(d) : qn(i.pitch, a, d), qn(i.bank, o, d)),
            kind: t,
            speed: e.speed,
            rotation: qn(i.rotation ?? 0, e.rotation ?? 0, d),
            color: e.color
        })
    }
    return {
        samples: n,
        joint: {
            position: r.clone().addScaledVector(li(i.heading + l + Math.PI / 2, a), ((e.pivot ?? 0) / 3.28084) * Math.sin(o)),
            heading: i.heading + l,
            pitch: a,
            bank: o,
            rotation: e.rotation
        }
    }
}
function Z0(i, e) {
    const t = Math.max(2, i.position.distanceTo(e.position) * .52)
      , n = new ed(i.position,i.position.clone().addScaledVector(li(i.heading, i.pitch), t),e.position.clone().addScaledVector(li(e.heading, e.pitch), -t),e.position)
      , r = n.getSpacedPoints(Math.min(8192, Math.max(12, Math.ceil(n.getLength() * 1.3))));
    return r.map( (s, a) => {
        const o = a / (r.length - 1)
          , l = n.getTangentAt(o)
          , c = Math.atan2(l.z, l.x)
          , h = Math.asin(Ea(l.y, -1, 1));
        return {
            position: s,
            up: Ta(c, h, qn(i.bank, e.bank, o)),
            kind: "track",
            rotation: qn(i.rotation ?? 0, e.rotation ?? 0, o)
        }
    }
    )
}
class J0 {
    constructor(e) {
        this.samples = e;
        for (let t = 1; t < e.length; t++)
            this.distance.push(this.distance[t - 1] + e[t].position.distanceTo(e[t - 1].position));
        this.length = this.distance.at(-1),
        this.tangents = e.map( (t, n) => e[Math.min(e.length - 1, n + 1)].position.clone().sub(e[Math.max(0, n - 1)].position).normalize())
    }
    samples;
    distance = [0];
    length;
    tangents;
    at(e) {
        const t = Ea(e, 0, this.length);
        let n = 0
          , r = this.distance.length - 1;
        for (; r - n > 1; ) {
            const g = n + r >>> 1;
            t < this.distance[g] ? r = g : n = g
        }
        const s = this.samples[n]
          , a = this.samples[r]
          , o = Ea((t - this.distance[n]) / (this.distance[r] - this.distance[n] || 1), 0, 1)
          , l = this.tangents[n].clone().lerp(this.tangents[r], o).normalize()
          , c = this.distance[r] - this.distance[n]
          , h = o * o
          , d = h * o
          , p = s.position.clone().multiplyScalar(2 * d - 3 * h + 1).addScaledVector(this.tangents[n], c * (d - 2 * h + o)).addScaledVector(a.position, -2 * d + 3 * h).addScaledVector(this.tangents[r], c * (d - h))
          , m = s.up.clone().lerp(a.up, o);
        return m.addScaledVector(l, -m.dot(l)).normalize(),
        {
            position: p,
            tangent: l,
            up: m,
            kind: a.kind,
            speed: a.speed,
            rotation: qn(s.rotation ?? 0, a.rotation ?? 0, o)
        }
    }
}
function Q0(i) {
    const e = Ka(i)
      , t = sr(e, {
        ...Li(),
        length: Math.max(16, ((i.trainCars ?? Ct[i.model].cars) - 1) * Ct[i.model].spacing + 6),
        color: i.stationColor ?? i.color
    }, "station");
    let n = t.joint;
    const r = t.samples;
    for (const s of i.pieces) {
        const a = sr(n, {
            ...s,
            color: s.color ?? i.color
        });
        n = a.joint,
        r.push(...a.samples.slice(1))
    }
    return i.closed && r.push(...Z0(n, e).slice(1).map(s => ({
        ...s,
        color: i.returnColor ?? i.color
    }))),
    {
        route: new J0(r),
        endpoint: n,
        cars: Math.max(1, Math.round(Number(i.trainCars) || Ct[i.model].cars))
    }
}
const Aa = {
    gravity: 1,
    friction: 1
}
  , Kr = {
    lift: 12,
    boost: 104
};
class em {
    constructor(e, t, n, r=Aa, cars=Ct[t].cars) {
        this.route = e,
        this.model = t,
        this.closed = n,
        this.physics = r,
        this.cars = Math.max(1, Math.round(Number(cars) || Ct[t].cars)),
        this.position = (this.cars - 1) * Ct[t].spacing + 1.45,
        this.telemetry.vertical = r.gravity
    }
    route;
    model;
    closed;
    physics;
    position;
    speed = 0;
    impactSpeed = 0;
    outcome = "running";
    reversing = !1;
    telemetry = {
        vertical: 1,
        lateral: 0,
        longitudinal: 0,
        sickness: 0
    };
    slowFor = 0;
    turns = 0;
    lastDirection = 1;
    returned = !1;
    step(e) {
        if (this.outcome !== "running")
            return;
        const t = Ct[this.model]
          , n = this.route.at(this.position);
        let r = 0
          , s = 0
          , a = !1
          , o = 0
          , l = !1
          , c = !1;
        for (let Y = 0; Y < this.cars; Y++) {
            let te = this.position - Y * t.spacing;
            te < 0 && this.returned && (te = (te + this.route.length) % this.route.length);
            const L = this.route.at(te);
            r += L.tangent.y,
            L.kind === "lift" && (s ||= (L.speed ?? Kr.lift) / 3.6),
            a ||= L.kind === "drive",
            L.kind === "boost" && (o ||= (L.speed ?? Kr.boost) / 3.6),
            l ||= L.kind === "brake",
            c ||= L.kind === "block"
        }
        const h = -9.81 * this.physics.gravity * r / t.cars
          , d = .115 * this.physics.friction + .0034 * this.speed ** 2;
        let p = h - Math.sign(this.speed) * d
          , m = !1;
        const g = (Y, te) => Math.max(-te, Math.min(te, (Y - this.speed) * 5));
        n.kind === "station" && !this.returned && !this.reversing && (p = g(4.8, 3),
        m = !0),
        a && (p = Math.max(p, g(6, 3.2)),
        m = !0),
        s && this.speed <= s + .75 && (this.speed = Math.max(0, this.speed),
        p = g(s, 8),
        m = !0),
        o && this.speed < o && (p = Math.max(p, g(o, 12)),
        m = !0),
        (l || c) && Math.abs(this.speed) > (c ? 3.3 : 9) && (p = g(Math.sign(this.speed) * (c ? 3.2 : 8.9), c ? 10 : 6.5)),
        this.returned && n.kind === "station" && (p = g(0, 12));
        const _ = this.speed;
        this.speed += p * e,
        !m && Math.abs(h) <= d && Math.sign(_) !== Math.sign(this.speed) && (this.speed = 0),
        !m && Math.abs(this.speed) < .02 && Math.abs(h) <= d && (this.speed = 0),
        this.position += (this.speed + _) * .5 * e;
        const f = Math.max(.65, Math.abs(this.speed) * .035)
          , u = this.route.at(this.position - f)
          , b = this.route.at(this.position + f)
          , v = this.route.at(this.position)
          , T = b.tangent.clone().sub(u.tangent).multiplyScalar(this.speed ** 2 / (f * 2 * 9.81));
        T.addScaledVector(v.tangent, (this.speed - _) / (e * 9.81)),
        T.y += this.physics.gravity;
        const C = v.tangent.clone().cross(v.up).normalize()
          , E = v.up.clone()
          , R = v.tangent.clone()
          , F = v.rotation * Math.PI / 180;
        if (this.model === "axis" && (E.applyAxisAngle(R, F),
        C.applyAxisAngle(R, F)),
        this.model === "arrow4d" && (R.applyAxisAngle(C, F),
        E.applyAxisAngle(C, F)),
        this.model === "spinning") {
            const Y = ja(this.position);
            R.applyAxisAngle(E, Y),
            C.applyAxisAngle(E, Y)
        }
        const S = T.dot(E)
          , M = T.dot(C)
          , U = T.dot(R)
          , B = 1 - Math.exp(-e * 10)
          , k = this.telemetry
          , D = Math.abs(M - k.lateral) + .58 * Math.abs(S - k.vertical);
        k.vertical += (S - k.vertical) * B,
        k.lateral += (M - k.lateral) * B,
        k.longitudinal += (U - k.longitudinal) * B;
        const G = Math.abs(b.rotation - u.rotation) / (f * 2) * Math.abs(this.speed);
        if (k.sickness = Math.min(100, Math.max(0, k.sickness + e * (Math.abs(M) * 6 + Math.max(0, Math.abs(S - 1) - .8) * 3.5 + Math.min(14, G * .052) + (this.model === "spinning" ? Math.abs(this.speed) * .37 : 0) + Math.min(12, D * 3) - 1))),
        this.speed < -.42 && this.lastDirection === 1 && (this.reversing = !0,
        this.turns++,
        this.lastDirection = -1),
        this.speed > .42 && this.lastDirection === -1 && (this.turns++,
        this.lastDirection = 1),
        this.position >= this.route.length && (this.closed ? (this.position -= this.route.length,
        this.returned = !0) : (this.position = this.route.length,
        this.outcome = this.speed > 2.5 ? "derailed" : "end")),
        this.position <= 0 && (this.position = 0,
        this.outcome = "rollback"),
        this.returned && n.kind === "station" && Math.abs(this.speed) < .38 && (this.outcome = "station"),
        Math.abs(this.speed) < .85 && !m ? this.slowFor += e : this.slowFor = Math.max(0, this.slowFor - e * .48),
        this.outcome === "running" && (this.slowFor > 3.8 || this.turns >= 10) && (this.outcome = "valley"),
        this.outcome === "running" && Math.abs(this.speed) > 12 && this.position > 2 && this.position < this.route.length - 2) {
            const Y = this.route.at(this.position - 1.5).tangent
              , te = this.route.at(this.position + 1.5).tangent;
            Y.angleTo(te) * this.speed ** 2 / 3 > 145 && (this.outcome = "derailed")
        }
        this.outcome !== "running" && (this.impactSpeed = this.speed,
        this.speed = 0)
    }
    carPosition(e, t=0) {
        const n = this.position + t - e;
        return this.closed && n >= this.route.length ? n - this.route.length : this.returned && n < 0 ? (n + this.route.length) % this.route.length : Math.max(0, n)
    }
}
const si = 12;
function tm(i, e) {
    const t = []
      , n = []
      , r = []
      , s = e === "axis" || e === "arrow4d" ? 3.3 : 2.75
      , a = e === "invert" ? -.72 : .55
      , o = $c(e)
      , l = m => {
        const {position: g, up: _} = i[m]
          , f = i[Math.min(m + 1, i.length - 1)].position.clone().sub(i[Math.max(0, m - 1)].position).normalize()
          , u = _.clone().cross(f).normalize()
          , b = f.clone().cross(u).normalize()
          , v = g.clone().addScaledVector(b, a);
        return Array.from({
            length: si
        }, (T, C) => {
            const E = Math.PI * 2 * C / si;
            return v.clone().addScaledVector(u, Math.cos(E) * s).addScaledVector(b, Math.sin(E) * s)
        }
        )
    }
    ;
    let c, h = 0, d;
    for (let m = 1; m < i.length; m++) {
        const g = i[m - 1].position
          , _ = i[m].position;
        if (h += g.distanceTo(_),
        Math.min(g.y, _.y) > o) {
            c = void 0,
            d = void 0;
            continue
        }
        const f = c ?? l(m - 1)
          , u = l(m);
        c = u;
        const b = [];
        for (let v = 0; v < si; v++) {
            const T = u[v]
              , C = u[(v + 1) % si];
            T.y < 0 != C.y < 0 && b.push(T.clone().lerp(C, T.y / (T.y - C.y)))
        }
        if (b.length >= 2) {
            const v = b[0].clone().lerp(b[1], .5)
              , T = b[0].distanceTo(b[1]) * .5;
            (!d || Math.hypot(v.x - d.x, v.z - d.z) > .8 || Math.abs(T - d.radius) > .45) && (d = {
                x: v.x,
                z: v.z,
                radius: T + .08
            },
            r.push(d))
        } else if (g.y < 0 != _.y < 0) {
            const v = g.clone().lerp(_, g.y / (g.y - _.y));
            d = {
                x: v.x,
                z: v.z,
                radius: s * .95
            },
            r.push(d)
        }
        for (let v = 0; v < si; v++) {
            const T = (v + 1) % si
              , C = Math.floor(h * .4) % 3 === 0 ? .5 : 0
              , E = .32 + Math.max(0, Math.sin((v + .5) / si * Math.PI * 2)) * .49 + C * .28;
            for (const R of [f[v], u[v], u[T], f[v], u[T], f[T]])
                t.push(R.x, R.y, R.z),
                n.push(E * .68, E * .8, E * .89)
        }
    }
    return {
        geometry: new Xt().setAttribute("position", new yt(t,3)).setAttribute("color", new yt(n,3)),
        portals: r
    }
}
const Br = {
    oak: "Oak tree",
    pine: "Pine tree",
    rock: "Boulder",
    bench: "Park bench"
}
  , nm = new O(0,1,0)
  , im = new O(1,0,0)
  , Ke = new Wi
  , Ci = new fr(1,1,1,12)
  , In = new fr(1,1,1,12)
  , Dt = new Ya(1,12,8)
  , Ut = i => new jr({
    color: i,
    roughness: .65
})
  , lc = i => new jr({
    color: i,
    roughness: .36,
    metalness: .28
});
function rm(i) {
    const e = new K0({
        canvas: i,
        antialias: !0
    })
      , t = new Hu;
    e.toneMapping = vc,
    e.toneMappingExposure = 1.18,
    t.background = new et(12048096),
    t.fog = new Ga(12048096,.00165),
    t.add(new id(15070719,9544054,1.9));
    const n = new ad(16771002,2.5);
    n.position.set(-65, 100, -48),
    t.add(n);
    const r = new cn(49,1,.15,3e3)
      , s = 64
      , a = Array.from({
        length: s
    }, () => new O)
      , o = new tn(new pr(1,1),new Tn({
        uniforms: {
            center: {
                value: new Ze
            },
            focus: {
                value: new Ze
            },
            scale: {
                value: 6400
            },
            holes: {
                value: a
            },
            holeCount: {
                value: 0
            },
            cutaway: {
                value: new O
            }
        },
        vertexShader: "uniform vec2 center; uniform float scale; varying vec2 world; void main(){world=position.xy*scale+center;gl_Position=projectionMatrix*viewMatrix*vec4(world.x,0.,world.y,1.);}",
        fragmentShader: `uniform vec2 focus; uniform vec3 holes[${s}]; uniform int holeCount; uniform vec3 cutaway; varying vec2 world;
      float grid(float spacing){vec2 q = world / spacing; vec2 d=abs(fract(q-.5)-.5)/max(fwidth(q),vec2(.001));return 1.-smoothstep(.03,1.0,min(d.x,d.y));}
      void main(){if (distance(world,cutaway.xy)<cutaway.z) discard;
      for(int index=0;index<${s};index++){if(index>=holeCount)break; if(distance(world,holes[index].xy)<holes[index].z)discard;}
      vec2 delta=world-focus;float distanceHint=length(delta);
      float variation=sin(world.x*.043+cos(world.y*.035))*sin(world.y*.038)+.35*sin(world.x*.237+world.y*.11);
      float turf = .025*sin(world.x*4.7+world.y*3.2)*sin(world.x*1.9-world.y*4.1)*(1.-smoothstep(15.,90.,distanceHint));
      vec3 grass=mix(vec3(.38,.55,.37),vec3(.62,.74,.49),.55+variation*.26)+turf;
      float light=1.-smoothstep(50.,430.,distanceHint)*.11;
      float lines=max(grid(5.)*.14*(1.-smoothstep(80.,280.,distanceHint)),grid(25.)*.28);
      vec3 color=mix(grass*light,vec3(.27,.43,.35),lines*(1.-smoothstep(180.,820.,distanceHint)));
      gl_FragColor=vec4(mix(color,vec3(.659,.796,.820),smoothstep(145.,1700.,distanceHint)),1.);}`,
        side: xn
    }));
    o.frustumCulled = !1,
    t.add(o);
    const l = Object.fromEntries(Object.entries(Ct).map( ([W,re]) => [W, {
        rail: lc(re.color),
        frame: Ut(re.frame),
        support: Ut(4545634),
        shell: lc(re.color)
    }]))
      , c = Ut(1778731)
      , h = Ut(10727860)
      , d = Ut(2307904)
      , p = Ut(989730)
      , m = Ut(16771512)
      , g = Ut(12171433)
      , _ = Ut(16437090)
      , f = Ut(4185087)
      , u = Ut(16475722)
      , b = Ut(5333318)
      , v = new rr({
        color: 10551278,
        fog: !1
    })
      , T = new rr({
        color: 16743267,
        fog: !1
    })
      , C = new rr({
        vertexColors: !0,
        side: xn,
        clippingPlanes: [new Nn(new O(0,-1,0),.1)]
    });
    e.localClippingEnabled = !0;
    const E = Ut(7489581)
      , R = Ut(3703619)
      , F = Ut(6397257)
      , S = Ut(2321508)
      , M = Ut(8751503)
      , U = new Wa(1,1,9)
      , B = new qa(1)
      , k = new $a(1,.08,8,28)
      , D = new Bt;
    t.add(D);
    const G = new Bt;
    t.add(G);
    const Y = new Map;
    let te = [];
    function L(W, re, he, ee, ae, w, ce, _e, Pe) {
        const xe = new tn(re,he);
        return xe.position.set(ee, ae, w),
        xe.scale.set(ce, _e, Pe),
        W.add(xe),
        xe
    }
    function le(W, re, he, ee, ae) {
        if (!ee.length)
            return;
        const w = new Lo(re,he,ee.length)
          , ce = he instanceof jr ? he.color : new et(16777215);
        if (ae?.some(Boolean) && he instanceof jr) {
            const _e = he.clone();
            _e.color.set(16777215),
            w.material = _e,
            w.userData.ownsMaterial = !0
        }
        ee.forEach( (_e, Pe) => {
            w.setMatrixAt(Pe, _e),
            w.userData.ownsMaterial && w.setColorAt(Pe, ae?.[Pe] ? new et(ae[Pe]) : ce)
        }
        ),
        W.add(w)
    }
    function fe(W) {
        W.traverse(re => {
            re instanceof Lo && (re.dispose(),
            re.userData.ownsMaterial && re.material.dispose())
        }
        ),
        W.clear()
    }
    function Se(W, re, he, ee=he) {
        const ae = re.clone().sub(W);
        return new ct().compose(W.clone().lerp(re, .5), new Kn().setFromUnitVectors(nm, ae.clone().normalize()), new O(he,ae.length() + .025,ee))
    }
    function pe(W, re, he, ee) {
        return new ct().makeScale(re, he, ee).setPosition(W)
    }
    function Xe(W, re, he, ee, ae) {
        const w = re.clone().sub(W)
          , ce = w.length();
        w.normalize();
        const _e = w.clone().cross(he).normalize()
          , Pe = _e.clone().cross(w).normalize();
        return new ct().makeBasis(w.multiplyScalar(ce + .018), Pe.multiplyScalar(ae), _e.multiplyScalar(ee)).setPosition(W.clone().lerp(re, .5))
    }
    function it(W, re, he, ee=!1, ae=!0, currentRideId) {
        if (fe(W),
        re.length < 2)
            return;
        const w = Ct[he]
          , ce = l[he]
          , _e = []
          , Pe = []
          , xe = []
          , De = []
          , oe = []
          , me = []
          , A = []
          , x = []
          , N = []
          , $ = []
          , ie = []
          , j = {
            lift: [],
            boost: [],
            brake: [],
            drive: []
        }
          , Te = ["wood", "topper", "ibox"].includes(w.style)
          , be = w.style === "wood" || w.style === "topper"
          , Ie = w.style === "single"
          , Ae = he === "accelerator";
        let J, de = [], Fe, Ne = 0, Ee = 2.6, Ve = 0;
        const I = w.hang ? .46 : Te ? -.3 : Ae ? -1.03 : -.53
          , ve = .67;
        re.forEach( ({position: ue, up: ne, kind: Z, color: we}, ze) => {
            const lt = _e.length
              , rt = xe.length
              , zt = A.length
              , Et = re[Math.min(re.length - 1, ze + 1)].position.clone().sub(re[Math.max(0, ze - 1)].position).normalize().cross(ne).normalize()
              , Vt = ue.clone().addScaledVector(Et, w.gauge)
              , nt = ue.clone().addScaledVector(Et, -w.gauge)
              , ht = ue.clone().addScaledVector(ne, I);
            if (ze && (Ne += ue.distanceTo(re[ze - 1].position)),
            J) {
                if (Ie)
                    xe.push(Xe(J.position, ue, ne, ee ? .32 : .51, ee ? .13 : .38));
                else if (Te && !ee)
                    for (const [st,At] of [[J.left, Vt], [J.right, nt]]) {
                        const P = w.style === "wood" ? .044 : w.style === "topper" ? .14 : .29;
                        if (xe.push(Xe(st, At, ne, w.style === "ibox" ? .24 : .19, P)),
                        be)
                            for (let H = 0; H < 4; H++) {
                                const K = .07 + H * .065 + (w.style === "topper" ? .045 : 0);
                                oe.push(Xe(st.clone().addScaledVector(J.axis, -K), At.clone().addScaledVector(ne, -K), ne, .257 + H * .016, .062))
                            }
                        w.style === "ibox" && oe.push(Xe(st.clone().addScaledVector(J.axis, -.2), At.clone().addScaledVector(ne, -.2), ne, .36, .06))
                    }
                else if (_e.push(Se(J.left, Vt, ee ? .095 : .113), Se(J.right, nt, ee ? .095 : .113)),
                w.style === "four")
                    for (const st of [-1, 1])
                        _e.push(Se(J.position.clone().addScaledVector(J.side, st * .68).addScaledVector(J.axis, -.46), ue.clone().addScaledVector(Et, st * .68).addScaledVector(ne, -.46), .078));
                if (!ee && !Te && !Ie)
                    if (w.style === "box")
                        xe.push(Xe(J.spine, ht, ne, .59, .51));
                    else if (Ae)
                        if (Z === "boost" || Z === "station" || ue.y < 5 && Z === "brake")
                            A.push(Se(J.spine, ht, .19));
                        else
                            for (const st of [-1, 1])
                                A.push(Se(J.spine.clone().addScaledVector(J.side, st * ve), ht.clone().addScaledVector(Et, st * ve), .18));
                    else
                        A.push(Se(J.spine, ht, w.style === "axis" ? .29 : .205));
                !ee && Z === J.kind && (Z === "lift" || Z === "boost" && Ae) && me.push(Se(J.position.clone().addScaledVector(J.axis, -.12), ue.clone().addScaledVector(ne, -.12), Z === "lift" ? .07 : .044))
            }
            if (Ne >= Ve) {
                if (Ve = Ne + (Te ? .62 : Ie ? 2.8 : 1.16),
                Te && !ee)
                    N.push(Xe(Vt.clone().addScaledVector(Et, .34).addScaledVector(ne, -.34), nt.clone().addScaledVector(Et, -.34).addScaledVector(ne, -.34), ne, .18, .15));
                else if (Ie)
                    ee || N.push(pe(ht, .38, .36, .45));
                else if (ee)
                    N.push(Se(Vt, nt, .08));
                else if (Ae && Z !== "station" && Z !== "boost" && !(ue.y < 5 && Z === "brake")) {
                    const st = ht.clone().addScaledVector(Et, ve)
                      , At = ht.clone().addScaledVector(Et, -ve);
                    if (N.push(Se(Vt, nt, .073), Se(st, At, .1), Se(Vt, st, .086), Se(nt, At, .086)),
                    Fe) {
                        const P = J?.side ?? Et;
                        N.push(Se(Fe.clone().addScaledVector(P, ve), Vt, .077), Se(Fe.clone().addScaledVector(P, -ve), nt, .077))
                    }
                } else
                    N.push(Se(Vt, ht, .093), Se(nt, ht, .093));
                if (Fe = ht,
                !ee && Z !== "track" && Z !== "loop") {
                    const st = Z === "station" || Z === "drive" ? "drive" : Z === "block" ? "brake" : Z
                      , At = st === "lift" ? .17 : st === "brake" ? .44 : .34;
                    j[st].push(Se(ue.clone().addScaledVector(Et, At), ue.clone().addScaledVector(Et, -At), st === "lift" ? .125 : .17))
                }
            }
            if (!ee && ht.y > .35 && Ne >= Ee && Z !== "station") {
                Ee = Ne + (Te ? 2.85 : Ie ? 5.3 : 6.1);
                const st = [];
                for (const At of Ie || !Te && ht.y < 5 ? [0] : [-1, 1]) {
                    const P = Te ? 1.16 + Math.min(1.8, ht.y * .055) : Math.min(6.5, .7 + Math.max(0, ht.y) * .115)
                      , K = ht.clone().addScaledVector(Et, Te ? At * .92 : 0);
                    let H = new O(ht.x + Et.x * At * P,.16,ht.z + Et.z * At * P);
                    const supportIsClear = foot => {
                        const segment = foot.clone().sub(K), lengthSq = segment.lengthSq();
                        for (const [rideId, rideData] of Y.entries()) {
                            const otherSamples = rideData.samples || (rideId === currentRideId ? re : []);
                            for (let sampleIndex = 0; sampleIndex < otherSamples.length; sampleIndex += 2) {
                                if (rideId === currentRideId && Math.abs(sampleIndex - ze) < 9) continue;
                                const trackPoint = otherSamples[sampleIndex].position;
                                if (trackPoint.y < .3 || trackPoint.y > K.y - .35) continue;
                                const t = Math.max(0, Math.min(1, trackPoint.clone().sub(K).dot(segment) / (lengthSq || 1)));
                                if (trackPoint.distanceTo(K.clone().addScaledVector(segment, t)) < .62) return false;
                            }
                        }
                        return true;
                    };
                    if (!supportIsClear(H)) {
                        let adjusted = false;
                        for (const radius of [1.1, 1.7, 2.4, 3.2]) {
                            for (let direction = 0; direction < 12; direction++) {
                                const angle = direction * Math.PI / 6;
                                const candidate = new O(H.x + Math.cos(angle) * radius,.16,H.z + Math.sin(angle) * radius);
                                if (supportIsClear(candidate)) { H = candidate; adjusted = true; break; }
                            }
                            if (adjusted) break;
                        }
                        if (!adjusted) H = null;
                    }
                    if (H) {
                        $.push(Se(K, H, Te ? .18 : .16 + Math.min(.2, ht.y * .006)));
                        const Oe = de[st.length];
                        if (Te && Oe)
                            for (let qe = 0; qe < Math.min(14, Math.ceil(K.y / 3)); qe++) {
                                const ut = qe * 3
                                  , dt = Math.min(ut + 3, K.y, Oe.joint.y);
                                if (dt < ut + .5) break;
                                const wt = H.clone().lerp(K, ut / K.y)
                                  , jt = Oe.foot.clone().lerp(Oe.joint, ut / Oe.joint.y)
                                  , An = Oe.foot.clone().lerp(Oe.joint, dt / Oe.joint.y);
                                $.push(Se(wt, jt, .09), Se(qe % 2 ? jt : wt, qe % 2 ? H.clone().lerp(K, dt / K.y) : An, .095))
                            }
                        st.push({ joint: K, foot: H });
                        ie.push(pe(new O(H.x,.1,H.z), .72, .2, .72));
                    } else {
                        st.push({ joint: K, foot: K.clone() });
                    }
                }
                Te && st.length === 2 && $.push(Se(st[0].joint, st[1].joint, .19), Se(st[0].joint, st[1].foot, .13)),
                de = st
            }
            for (; Pe.length < _e.length && _e.length > lt; )
                Pe.push(ee ? void 0 : we);
            for (; De.length < xe.length && xe.length > rt; )
                De.push(ee ? void 0 : we);
            for (; x.length < A.length && A.length > zt; )
                x.push(ee ? void 0 : we);
            J = {
                left: Vt,
                right: nt,
                spine: ht,
                position: ue,
                axis: ne,
                side: Et,
                kind: Z
            }
        }
        );
        const ge = ae ? v : T;
        le(W, Ci, ee ? ge : ce.rail, _e, Pe),
        le(W, Ke, ee ? ge : w.style === "box" ? ce.frame : w.style === "wood" ? h : ce.rail, xe, De),
        le(W, Ke, ce.frame, oe),
        le(W, Ci, c, me),
        le(W, Ke, ee ? ge : ce.frame, N),
        le(W, w.style === "box" ? Ke : Ci, ce.frame, A, x),
        le(W, Te ? Ke : Ci, Te ? ce.frame : ce.support, $),
        le(W, Ke, g, ie);
        for (const [ue,ne] of Object.entries({
            lift: _,
            boost: f,
            brake: u,
            drive: b
        }))
            le(W, Ke, ne, j[ue])
    }
    function Je(W, re) {
        const he = Ka(re)
          , ee = Ct[re.model]
          , ae = new Bt;
        ae.position.set(he.position.x, 0, he.position.z),
        ae.rotation.y = -re.angle,
        W.add(ae);
        const w = ee.hang ? 1.08 : he.position.y - .35;
        const stationLength = Math.max(16, ((re.trainCars ?? ee.cars) - 1) * ee.spacing + 6);
        L(ae, Ke, l[re.model].frame, stationLength / 2, w * .5, 0, stationLength - .1, w, 6.35),
        L(ae, Ke, g, stationLength / 2, w + .07, 0, stationLength, .2, 6.45);
        for (const ce of [-1, 1]) {
            L(ae, Ke, c, stationLength / 2, w + .98, ce * 3.18, stationLength - .1, .085, .085),
            L(ae, Ke, l[re.model].rail, stationLength / 2, w + .16, ce * 3.14, stationLength + .04, .11, .16);
            for (const _e of [.25, stationLength * .25, stationLength * .5, stationLength * .75, stationLength - .25])
                L(ae, Ke, c, _e, w + .52, ce * 3.18, .085, 1.02, .085)
        }
        if (ee.hang)
            for (const ce of [1, stationLength * .5, stationLength - 1.3]) {
                for (const _e of [-2.6, 2.6])
                    L(ae, Ke, c, ce, 3.13, _e, .24, 4.32, .24);
                L(ae, Ke, c, ce, 5.37, 0, .24, .28, 5.37)
            }
    }
    function Q(W, re) {
        const he = Ct[W]
          , ee = l[W]
          , ae = new Bt;
        function w(De, oe, me, A, x) {
            if (L(De, Dt, d, oe, me + .11, A, .33, .13, .27),
            L(De, Dt, d, oe - .25, me + .39, A, .13, .42, .26).rotation.z = -.16,
            x)
                for (const N of [-1, 1])
                    L(De, Dt, p, oe + .045, me + .4, A + .19 * N, .31, .058, .056).rotation.z = -.4;
            L(De, Dt, x ? p : m, oe + .23, me + .26, A, .085, .062, .235)
        }
        function ce(De) {
            L(ae, Ke, c, 0, .1, 0, De, .22, he.gauge * 1.86);
            for (const oe of [-De * .33, De * .3])
                for (const me of [-1, 1]) {
                    const A = he.gauge * me;
                    L(ae, In, h, oe, .15, A, .155, .102, .155).rotation.x = Math.PI / 2,
                    L(ae, In, c, oe - .085, -.1, A + me * .066, .096, .094, .096).rotation.x = Math.PI / 2
                }
        }
        if (W === "axis" || W === "spinning") {
            const De = W === "axis";
            ce(2.07);
            const oe = new Bt;
            if (oe.position.y = De ? 1.16 : .43,
            oe.name = De ? "seat-roll" : "seat-spin",
            ae.add(oe),
            De) {
                for (const me of [-1, 1])
                    L(ae, k, ee.frame, me * .98, 1.16, 0, 1.14, 1.14, 1.25).rotation.y = Math.PI / 2,
                    L(ae, Ke, ee.frame, me * .98, .23, 0, .22, .41, 1.83),
                    L(oe, In, h, me * .98, 0, 0, .19, .31, .19).rotation.z = Math.PI / 2;
                L(oe, Dt, ee.shell, 0, -.48, 0, 1.1, .23, .79);
                for (const me of [-.44, .42])
                    for (const A of [-.33, .33])
                        w(oe, me, -.41, A, !0)
            } else {
                L(ae, In, c, 0, .25, 0, .64, .22, .64),
                L(oe, In, ee.shell, 0, .035, 0, 1.01, .32, 1.01),
                L(oe, k, m, 0, .13, 0, 1, 1, 1).rotation.x = Math.PI / 2;
                for (const me of [-1, 1]) {
                    const A = new Bt;
                    A.rotation.y = me < 0 ? Math.PI : 0,
                    oe.add(A);
                    for (const x of [-.3, .3])
                        w(A, .43, .18, x, !1)
                }
            }
            return ae
        }
        if (W === "arrow4d") {
            ce(1.68),
            L(ae, Dt, ee.shell, .11, .31, 0, 1, .27, .81),
            L(ae, Ke, ee.frame, 0, .46, 0, .47, .54, .81);
            for (const oe of [-1, 1]) {
                const me = new Bt;
                me.position.set(0, .75, oe * 1.23),
                me.name = "seat-pitch",
                L(ae, In, h, 0, .75, oe * .97, .19, .68, .19).rotation.x = Math.PI / 2,
                L(ae, In, c, -.34, -.27, oe * .68, .13, .11, .13).rotation.x = Math.PI / 2,
                ae.add(me),
                L(me, Dt, ee.shell, .01, -.24, oe * .18, .69, .17, .66),
                L(me, Ke, ee.frame, -.2, -.11, oe * .18, .41, .19, 1.12),
                w(me, -.14, -.18, -.27 + oe * .18, !0),
                w(me, -.14, -.18, .27 + oe * .18, !0),
                L(me, Dt, m, .26, -.18, oe * .6, .2, .052, .042)
            }
            return ae
        }
        if (["ptc", "gci", "accelerator", "ibox", "topper", "raptor"].includes(W)) {
            const De = W === "ptc"
              , oe = W === "gci"
              , me = W === "accelerator"
              , A = W === "raptor"
              , x = De ? 2.94 : oe || A ? 1.35 : 2.24
              , N = A ? .6 : De ? 1.74 : 1.51;
            if (ce(x * .89),
            A) {
                L(ae, Dt, ee.shell, .055, .28, 0, x * .51, .25, N * .5),
                L(ae, Ke, ee.shell, 0, .02, 0, .49, .29, .59);
                for (const $ of [-1, 1])
                    L(ae, Ke, c, -.02, .28, $ * .39, .55, .09, .22);
                w(ae, -.1, .44, 0, !0)
            } else if (De || oe) {
                L(ae, Ke, ee.shell, 0, .3, 0, x, .29, N);
                for (const $ of [-1, 1])
                    De ? L(ae, Ke, ee.shell, 0, .56, $ * (N * .5 - .06), x * .97, .4, .118) : L(ae, Dt, ee.shell, .05, .49, $ * .68, .65, .3, .1),
                    L(ae, Ke, m, 0, .48, $ * (N * .5 + .003), x * .83, .035, .021);
                for (let $ = 0; $ < he.rows; $++) {
                    const ie = ($ - (he.rows - 1) * .5) * .84;
                    L(ae, Ke, d, ie, .49, 0, .51, .13, 1.32),
                    L(ae, Ke, d, ie - .24, .7, 0, .135, .44, 1.33).rotation.z = -.14;
                    for (const j of [-1, 1])
                        L(ae, Dt, m, ie + .23, .7, j * .34, .1, .065, .27);
                    oe && L(ae, Dt, ee.frame, ie + .45, .5, 0, .19, .24, .7)
                }
                re && L(ae, Dt, ee.shell, x * .46, .57, 0, De ? .18 : .43, .3, N * .48)
            } else {
                if (L(ae, Dt, ee.shell, 0, .31, 0, x * .57, .25, N * .54),
                re) {
                    const $ = L(ae, Dt, ee.shell, x * .39, .42, 0, me ? .82 : .4, .28, N * (me ? .38 : .48));
                    $.rotation.z = -.15,
                    L(ae, Dt, m, x * .52, .63, 0, me ? .37 : .19, .035, .14)
                }
                for (const $ of [-1, 1])
                    L(ae, Dt, ee.frame, 0, .35, $ * N * .46, x * .49, .11, .1),
                    w(ae, -.47, .43, $ * .34, me),
                    w(ae, .42, .43, $ * .34, me)
            }
            return ae
        }
        const _e = (he.seats - 1) * .61 + .7
          , Pe = he.hang ? -1.19 : .3
          , xe = he.rows === 2 ? 2.2 : 1.68;
        L(ae, Ke, c, 0, he.hang ? .03 : .11, 0, xe, .23, he.gauge * 1.83);
        for (const De of [-.57, .65])
            for (const oe of [-1, 1])
                L(ae, In, h, De, he.hang ? -.1 : .08, oe * he.gauge, .21, .17, .21).rotation.x = Math.PI / 2;
        if (he.hang && L(ae, Ke, ee.frame, -.34, -.49, 0, .3, .79, .5),
        L(ae, Ke, ee.shell, .015, Pe, 0, xe, .25, _e),
        he.rows === 2 || re) {
            const De = L(ae, Ke, ee.shell, xe * .38, Pe + .16, 0, he.nose, .43, _e * .94);
            De.rotation.z = W === "arrow" ? -.14 : -.24,
            re && L(ae, Ke, m, xe * .47, Pe + .31, 0, .14, .045, _e * .66)
        }
        for (let De = 0; De < he.seats; De++)
            for (let oe = 0; oe < he.rows; oe++) {
                const me = (De - (he.seats - 1) * .5) * .61
                  , A = he.rows === 1 ? -.11 : -.58 + oe * .92;
                if (L(ae, Ke, d, A, Pe + .19, me, .57, .15, .52),
                L(ae, Ke, d, A - .27, Pe + .49, me, .18, W === "hyper" ? .62 : .81, .52).rotation.z = .12,
                W === "hyper" || W === "wood")
                    L(ae, Ke, m, A + .22, Pe + .37, me, .12, .11, .49);
                else {
                    for (const x of [-1, 1])
                        L(ae, Ke, p, A + .06, Pe + .57, me + x * .188, .49, .09, .084).rotation.z = -.39;
                    L(ae, Ke, p, A + .25, Pe + .45, me, .12, .105, .43)
                }
            }
        return ae
    }
    function se(W, re, he) {
        const ee = Y.get(W.id);
        if (!ee)
            return;
        const ae = new ct;
        for (const [w,ce] of ee.cars.entries()) {
            const _e = he(w * Ct[W.model].spacing)
              , Pe = re.at(_e)
              , xe = Pe.tangent.clone().cross(Pe.up).normalize();
            ce.position.copy(Pe.position),
            xe.lengthSq() > .1 ? ce.quaternion.setFromRotationMatrix(ae.makeBasis(Pe.tangent, Pe.up, xe)) : ce.quaternion.setFromUnitVectors(im, Pe.tangent);
            const De = hr.degToRad(Pe.rotation);
            for (const oe of ce.children)
                oe.name === "seat-roll" && (oe.rotation.x = De),
                oe.name === "seat-pitch" && (oe.rotation.z = De),
                oe.name === "seat-spin" && (oe.rotation.y = ja(_e) * (w % 2 ? -.87 : 1))
        }
    }
    function Re(W, re) {
        let he = Y.get(W.id);
        const ee = Ct[W.model];
        if (!he || he.cars.length !== (W.trainCars ?? ee.cars)) {
            if (he) { fe(he.root); he.root.removeFromParent(); Y.delete(W.id); }
            const ce = new Bt
              , _e = new Bt
              , Pe = Array.from({
                length: W.trainCars ?? ee.cars
            }, (xe, De) => Q(W.model, De === 0));
            ce.add(_e, ...Pe),
            t.add(ce),
            Je(ce, W),
            he = {
                root: ce,
                tracks: _e,
                cars: Pe,
                portals: []
            },
            Y.set(W.id, he)
        }
        he.samples = re.samples,
        it(he.tracks, re.samples, W.model, !1, !0, W.id),
        he.highlighted && highlightRide(W.id, !0),
        he.tunnel && (he.tunnel.removeFromParent(),
        he.tunnel.geometry.dispose());
        const ae = tm(re.samples, W.model);
        he.portals = ae.portals,
        he.tunnel = new tn(ae.geometry,C),
        he.root.add(he.tunnel),
        te = [...Y.values()].flatMap(ce => ce.portals);
        for (const ce of he.cars)
            ce.visible = !0;
        const w = Math.max(1.45, ((W.trainCars ?? ee.cars) - 1) * ee.spacing + 1.45);
        se(W, re, ce => w - ce)
    }
    function We(W) {
        const re = new Bt;
        if (re.position.set(W.x, 0, W.z),
        re.rotation.y = W.yaw,
        G.add(re),
        W.kind === "oak" || W.kind === "pine") {
            const he = W.kind === "oak";
            if (L(re, Ci, E, 0, 1.3, 0, .22, 2.6, .24),
            he)
                L(re, B, R, 0, 3.5, 0, 1.7, 1.62, 1.55),
                L(re, B, F, .85, 3.78, .43, 1.3, 1.15, 1.2),
                L(re, B, R, -.83, 3.34, -.36, 1.09, 1.05, 1.14);
            else
                for (let ee = 0; ee < 3; ee++)
                    L(re, U, ee === 2 ? R : S, 0, 2.4 + ee * .93, 0, 1.4 - ee * .27, 2.6, 1.43 - ee * .29)
        } else if (W.kind === "rock")
            L(re, B, M, 0, .48, 0, 1.2, .75, .91).rotation.z = .17;
        else {
            for (const he of [-1, 1])
                L(re, Ke, c, he * .73, .26, 0, .075, .52, .49);
            for (const he of [-1, 0, 1])
                L(re, Ke, E, 0, .52, he * .165, 1.91, .081, .151),
                L(re, Ke, E, 0, .73 + he * .14, -.26, 1.91, .12, .07)
        }
    }
    function highlightRide(id, active) {
        const ride = Y.get(id);
        if (!ride) return;
        ride.highlighted = !!active;
        ride.root.traverse(object => {
            if (!object.material) return;
            if (!object.userData.spireOriginalMaterial) {
                object.userData.spireOriginalMaterial = object.material;
                object.material = Array.isArray(object.material) ? object.material.map(material => material.clone()) : object.material.clone();
            }
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            for (const material of materials) {
                if (!material.emissive) continue;
                if (material.userData.spireBaseEmissive === undefined) material.userData.spireBaseEmissive = material.emissive.getHex();
                material.emissive.setHex(active ? 0x69f5c5 : material.userData.spireBaseEmissive);
                material.emissiveIntensity = active ? .72 : 0;
            }
        });
    }
    return {
        renderer: e,
        highlight: highlightRide,
        camera: r,
        scene: t,
        update: Re,
        setTrain: se,
        train: W => Y.get(W.id)?.cars ?? [],
        remove(W) {
            const re = Y.get(W);
            re && (re.tunnel?.geometry.dispose(),
            fe(re.root),
            re.root.removeFromParent(),
            Y.delete(W),
            te = [...Y.values()].flatMap(he => he.portals))
        },
        addScenery: We,
        undoScenery() {
            G.children.at(-1)?.removeFromParent()
        },
        ground(W, re, he, ee) {
            o.material.uniforms.center.value.set(W, re),
            o.material.uniforms.focus.value.set(W, re);
            const ae = te.length <= s ? te : [...te].sort( (w, ce) => Math.hypot(w.x - he.x, w.z - he.z) - Math.hypot(ce.x - he.x, ce.z - he.z)).slice(0, s);
            ae.forEach( (w, ce) => a[ce].set(w.x, w.z, w.radius)),
            o.material.uniforms.holeCount.value = ae.length,
            o.material.uniforms.cutaway.value.set(he.x, he.z, ee ? 19 : 0),
            C.wireframe = ee
        },
        preview: (W, re, he) => it(D, W, re, !0, he),
        dispose() {
            fe(D);
            for (const W of Y.values())
                W.tunnel?.geometry.dispose(),
                fe(W.root);
            Y.clear(),
            o.geometry.dispose(),
            o.material.dispose();
            for (const W of [Ke, Ci, In, Dt, U, B, k])
                W.dispose();
            for (const W of [...Object.values(l).flatMap(re => Object.values(re)), c, h, d, p, m, g, _, f, u, b, v, T, C, E, R, F, S, M])
                W.dispose();
            e.dispose()
        }
    }
}
class sm {
    constructor(e, t, n, r, s) {
        this.gravity = s;
        const a = n.clone().cross(new O(0,1,0)).normalize()
          , o = new Float32Array(0);
        this.particles = new $u(new Xt().setAttribute("position", new un(o,3)),new Bc({
            color: 16767136,
            size: .36,
            transparent: !0,
            depthWrite: !1
        })),
        e.add(this.group),
        this.group.add(this.particles);
        const l = [];
        for (const [c,h] of t.entries()) {
            h.visible = !1;
            const d = Array.from({
                length: 3
            }, () => new Bt);
            h.children.forEach( (p, m) => d[m < 4 ? 0 : m % 2 + 1].add(p.clone())),
            d.forEach( (p, m) => {
                if (!p.children.length)
                    return;
                p.position.copy(h.position),
                p.quaternion.copy(h.quaternion);
                const g = Math.sin(c * 3.8 + m * 2.1)
                  , _ = n.clone().multiplyScalar(Math.min(48, r) * (1 - c * .031 - m * .1)).addScaledVector(a, g * (3.4 + m * 1.5));
                _.y += 2.6 + m * 1.7 + Math.abs(g) * 2.4,
                this.group.add(p),
                this.bodies.push({
                    part: p,
                    velocity: _,
                    spin: new O(g * 3,1 + m * 2,Math.cos(c + m) * 3)
                });
                for (let f = 0; f < 5; f++) {
                    const u = h.position.clone().addScaledVector(_, f * .024);
                    u.y += Math.cos(f + c) * .48,
                    l.push(u.x, u.y, u.z)
                }
            }
            )
        }
        this.particles.geometry.setAttribute("position", new yt(l,3))
    }
    gravity;
    group = new Bt;
    particles;
    bodies = [];
    update(e, t) {
        if (t >= 5)
            return !0;
        for (const {part: n, velocity: r, spin: s} of this.bodies)
            r.y -= 9.81 * this.gravity * e,
            n.position.addScaledVector(r, e),
            n.rotation.x += s.x * e,
            n.rotation.y += s.y * e,
            n.rotation.z += s.z * e,
            n.position.y < .78 && (n.position.y = .78,
            r.y = r.y < -1.1 ? -r.y * .32 : 0,
            r.x *= Math.exp(-e * 5.4),
            r.z *= Math.exp(-e * 5.4),
            s.multiplyScalar(Math.exp(-e * 6))),
            t > 4.78 && n.scale.setScalar(Math.max(.04, (5 - t) / .22));
        return this.particles.material.opacity = Math.max(0, 1 - t * 1.9),
        this.particles.visible = t < .53,
        !1
    }
    dispose() {
        this.group.removeFromParent(),
        this.particles.geometry.dispose(),
        this.particles.material.dispose()
    }
}
const Ri = "timberline-park-v2"
  , sn = hr.clamp
  , uc = Object.keys(Ct)
  , dc = Object.keys(tr)
  , vn = {
    length: {
        title: "Length",
        glyph: "â†”",
        x: 66,
        y: 43,
        dx: .86,
        dy: .5
    },
    turn: {
        title: "Curve",
        glyph: "â†ª",
        x: -67,
        y: 38,
        dx: 1,
        dy: 0
    },
    pitch: {
        title: "Slope",
        glyph: "â†•",
        x: -58,
        y: -42,
        dx: 0,
        dy: -1
    },
    bank: {
        title: "Bank",
        glyph: "âŸ³",
        x: 61,
        y: -43,
        dx: 1,
        dy: 0
    }
}
  , zr = Object.keys(vn)
  , am = {
    station: "Circuit complete Â· Train stopped at the station.",
    valley: "Valleyed Â· The train ran out of momentum.",
    rollback: "Rollback Â· The train rolled back to the station.",
    end: "End of track Â· Connect the circuit to finish the test.",
    derailed: "Derailed Â· Train left the track."
};
function om(i, e) {
    const t = i.root;
    t.innerHTML = `
    <canvas id="park" tabindex="0" aria-label="Interactive 3D coaster park"></canvas>
    <header class="mast" data-combos-ui-region="hud" data-combos-ui-id="park-title">
      <button id="hamburger" class="hamburger" aria-label="Open park menu" title="Park menu">â˜°</button><span class="eyebrow">COASTER DESIGN LAB / 02</span><h1>Spire Parks <em>2</em></h1><small id="park-name-label">UNTITLED PARK</small><small id="park-count">EMPTY PARK</small>
    </header>
    <div id="marker" aria-hidden="true"><b>+</b><span>STATION SITE</span></div>
    <div id="gizmo" aria-label="Track-end editing handles" hidden>
      <svg viewBox="-92 -70 184 140" aria-hidden="true">
        <path class="pitch" d="M0 0 -23 -26 -58 -42"/><path class="turn" d="M0 0 Q-22 37 -67 38"/>
        <path class="length" d="M0 0 66 43"/><path class="bank" d="M0 0 C-15 -46 33 -65 61 -43"/><circle class="joint" r="5"/>
      </svg>
      ${zr.map(P => `<button id="axis-${P}" class="axis ${P}" style="--axis-x:${vn[P].x}px;--axis-y:${vn[P].y}px" aria-label="Drag to adjust ${vn[P].title.toLowerCase()}"><i>${vn[P].glyph}</i><span>${vn[P].title} <b></b></span></button>`).join("")}
    </div>
    <nav class="nav" data-combos-ui-region="controls" data-combos-ui-id="camera-tools" aria-label="Camera tools">
      <button id="focus" aria-label="Focus editor (F)" title="Focus editor (F)"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg></button>
      <button id="view" aria-label="Change camera (T)" title="Change camera (T)">View</button>
      <button id="physics" aria-label="Park physics" title="Park physics">âš™</button><button id="record-pov" aria-label="Record POV video" title="Record POV video">â— REC</button>
      <button id="place-station" aria-label="Enter station placement mode" title="Place a new station">ï¼‹ Station</button>
      <button id="share-code" aria-label="Export park code" title="Export compressed park code">â‡§ Code</button>
      <button id="help" aria-label="Controls and track guide">?</button>
    </nav>
    <div class="legend" data-combos-ui-region="text" data-combos-ui-id="shortcuts" data-combos-ui-critical="false">DRAG to pan Â· RIGHT DRAG to orbit Â· SCROLL to zoom</div>
    <section class="workbench" data-combos-ui-region="controls" data-combos-ui-id="track-workbench" aria-label="Track builder">
      <div class="bench-head"><div><label id="mode">STATION PLACEMENT</label><h2 id="title">Start a coaster</h2></div><div class="bench-tools"><button id="manage" class="secondary">Tools</button><button id="new" class="secondary">ï¼‹ New</button></div></div>
      <div id="setup" class="row"><label class="picker">Train model<select id="model">${uc.map(P => `<option value="${P}">${Ct[P].name}</option>`).join("")}</select></label><button id="rotate" class="secondary" title="Rotate station by 45 degrees">â†» 0Â°</button></div><div id="model-cards" class="model-cards">${uc.map(P => `<button type="button" class="model-card" data-model="${P}"><b>${Ct[P].name}</b><small>${Ct[P].detail}</small></button>`).join("")}</div>
      <div id="editing" class="row" hidden><div class="coaster-picker"><span class="picker-label">Coasters in this park</span><div id="coaster-list" class="coaster-list"></div><select id="rides" aria-label="Select coaster" hidden></select></div><label class="picker">Next piece<select id="kind">${dc.map(P => `<option value="${P}">${tr[P]}</option>`).join("")}</select></label></div>
      <div id="train-settings" class="train-settings" hidden>
        <label>Cars per train <input id="train-cars" type="number" min="1" step="1" value="5"></label>
        <label>Train count target <input id="train-count" type="number" min="1" max="6" step="1" value="1"></label>
        <small>Train length automatically expands the station. Each coaster runs one train at a time.</small>
      </div>
      <div id="piece-tuning" hidden>
        <label class="tuning" id="pivot-control"><span>Heartline pivot</span><input id="pivot-offset" type="range" min="-5" max="5" step="0.1" value="0"><output id="pivot-value">0.0 ft</output></label>
        <label id="speed-control" class="tuning"><span id="speed-name">Target speed</span><input id="piece-speed" type="number" step="1" inputmode="numeric" /><span>mph</span></label>
        <label id="rotation-control" class="tuning"><span id="rotation-name">Seat rotation</span><input id="seat-rotation" type="range" min="-360" max="360" step="5" /><output id="rotation-value" for="seat-rotation">0Â°</output></label>
      </div>
      <div class="actions" id="actions"><button id="undo" class="action" title="Undo (Ctrl+Z)">â†¶ Undo</button><button id="close" class="action close">Connect</button><button id="test" class="action test">â–¶ Test</button><button id="commit" class="action primary" data-combos-action="primary">Place Station</button></div>
      <p class="status" id="status" aria-live="polite"></p>
    </section>
    <section id="title-screen" class="title-screen" aria-label="Spire Parks 2 title screen">
      <div class="title-sky"><div class="title-clouds"></div><div class="title-track track-a"></div><div class="title-track track-b"></div><div class="title-fog"></div></div>
      <div class="title-content">
        <img class="title-logo" src="./assets/spire-logo.png" alt="Spire Parks 2">
        <p class="title-kicker">YOUR PARK. YOUR RULES. YOUR NEXT BIG THRILL.</p>
        <button id="start-game" class="title-start">START BUILDING <span>â–¶</span></button>
        <button id="continue-game" class="title-secondary">CONTINUE PARK</button>
        <div class="title-import"><input id="import-code" placeholder="Paste a park code..." aria-label="Park code"><button id="import-park">IMPORT</button></div>
        <small>OFFLINE PARK BUILDING Â· NO ACCOUNT REQUIRED</small>
      </div>
      <div class="title-footer"><span>SPIRE PARKS 2</span><span>DESIGN Â· BUILD Â· RIDE</span><span>v2.1</span></div>
    </section>
    <dialog id="menu-dialog" class="menu-dialog"><h2>Park menu</h2><label class="menu-field">Park name<input id="park-name" maxlength="48" placeholder="Untitled Park"></label><label class="menu-field">Selected coaster name<input id="coaster-name" maxlength="48" placeholder="Coaster name"></label><p>Park settings, save codes, and help.</p><div class="menu-actions"><button id="menu-tools">Park tools</button><button id="menu-physics">Physics settings</button><button id="menu-help">Controls & guide</button><button id="menu-save">Save / export code</button><button id="menu-main">Main menu</button></div><footer><button id="menu-done">Done</button></footer></dialog>
    <dialog id="code-dialog" class="code-dialog"><h2>Park code</h2><p>Copy this compact code to back up or share your park. It works offline</p><textarea id="park-code-output" readonly spellcheck="false"></textarea><footer><button id="copy-code">Copy code</button><button id="code-close">Done</button></footer></dialog>
    <aside id="telemetry" hidden data-combos-ui-region="hud" data-combos-ui-id="ride-telemetry" data-combos-ui-critical="false" aria-label="Test telemetry">
      <strong>Ride telemetry</strong>
      ${[["vertical", "Vertical"], ["lateral", "Lateral"], ["longitudinal", "Longitudinal"], ["sickness", "Sickness estimate"]].map( ([P,H]) => `<div class="telemetry-line"><span>${H}</span><output id="${P}-reading">â€”</output><meter aria-label="${H}" id="${P}-bar" min="0" max="${P === "sickness" ? 100 : 6}" value="0"></meter></div>`).join("")}
    </aside>
    <dialog id="tools-dialog" aria-labelledby="tools-title" data-combos-ui-region="modal" data-combos-ui-id="park-tools">
      <h2 id="tools-title">Park tools</h2>
      <div id="paint-tools"><label class="picker">Paint target<select id="paint-target"></select></label><div class="tools-row"><label class="paint-swatch">Track paint <input id="paint-color" type="color" /></label><button id="paint-apply" class="secondary">Paint track</button></div></div>
      <div class="tools-row"><label class="picker">Scenery<select id="scenery-kind">${Object.entries(Br).map( ([P,H]) => `<option value="${P}">${H}</option>`).join("")}</select></label><button id="scenery-place" class="secondary">Place</button></div>
      <div class="tools-row"><button id="scenery-undo" class="secondary">Undo scenery</button><button id="delete-ride" class="secondary danger">Delete coaster</button></div>
      <footer><button id="tools-done">Done</button></footer>
    </dialog>
    <dialog id="delete-dialog" aria-labelledby="delete-title" data-combos-ui-region="modal" data-combos-ui-id="confirm-delete"><h2 id="delete-title">Delete this coaster?</h2><p id="delete-copy"></p><footer><button id="delete-cancel">Cancel</button><button id="delete-confirm">Delete</button></footer></dialog>
    <dialog id="guide" data-combos-ui-region="modal" data-combos-ui-id="control-guide"><h2>Build & test</h2>
      <p><strong>Place a station.</strong> Pick a model, then tap the terrain or use Place Station. The New button starts another coaster; the Coaster menu switches between rides.</p>
      <p><strong>Drag the track-end handles or tap one to type an exact value.</strong> Length is shown in feet, Curve turns the piece, Slope raises or lowers it, Bank rotates the rails, and Heartline pivot offsets the track from its roll axis. Tab to a handle and use arrow keys for fine changes. F brings the editor back into view.</p>
      <p><strong>Build below ground.</strong> Tunnels form automatically. Open Tools to paint entire tracks or individual pieces, place scenery, or delete a ride.</p>
      <p><strong>Keep your speed.</strong> Gravity moves the train. Pick chain lift for climbs, boosters for launches, drive tires for slow sections, or brakes to slow it. Test telemetry shows G-forces and an estimated sickness score.</p>
      <p><strong>Camera:</strong> Drag to pan, right-drag or two-finger drag to orbit, and scroll or pinch to zoom. Tests start outside; tap POV or press T to ride. WASD moves the camera, Enter builds, and Ctrl+Z undoes.</p>
      <footer><button id="done">Done</button></footer>
    </dialog>
    <dialog id="physics-dialog" aria-labelledby="physics-title" data-combos-ui-region="modal" data-combos-ui-id="physics-settings">
      <h2 id="physics-title">Park physics</h2><p>These settings apply to the next test on every coaster.</p>
      <label class="physics-row">Gravity <output id="gravity-value">1.00Ã—</output><input id="gravity" type="range" min="0" max="3" step=".05" /></label>
      <label class="physics-row">Track friction <output id="friction-value">1.00Ã—</output><input id="friction" type="range" min="0" max="8" step=".05" /></label>
      <footer><button id="physics-reset">Use defaults</button><button id="physics-done">Done</button></footer>
    </dialog>
    <dialog id="axis-edit" aria-labelledby="axis-title" data-combos-ui-region="modal" data-combos-ui-id="axis-value-editor">
      <form id="axis-form">
        <h2 id="axis-title"></h2>
        <label for="axis-value" id="axis-range"></label>
        <input id="axis-value" type="text" autocomplete="off" autofocus required />
        <footer><button id="axis-cancel" type="button">Cancel</button><button type="submit">Apply</button></footer>
      </form>
    </dialog>`;
    const n = P => t.querySelector(`#${P}`)
      , r = P => n(P)
      , s = P => n(P)
      , a = n("park")
      , o = n("guide")
      , l = n("axis-edit")
      , c = n("axis-value")
      , h = n("physics-dialog")
      , d = n("tools-dialog")
      , p = n("delete-dialog")
      , m = P => n(P)
      , g = n("gizmo")
      , _ = n("marker")
      , f = rm(a)
      , u = new AbortController
      , b = u.signal
      , v = new O(0,0,0)
      , T = {
        yaw: -.63,
        elevation: .77,
        distance: 91
    }
      , C = new Map
      , E = new Set
      , R = []
      , F = [];
    let S;
    const M = new Map
      , U = new cd
      , B = new Nn(new O(0,1,0),0);
    let k = i.getMetrics(), D, G = !0, Y = "hyper", te = 0, L = Li(), le, fe = !0, Se = !1, pe, Xe, it = 0, Je = !1, Q = !1;
    const se = new O
      , Re = new Kn
      , We = new ct;
    let W = !1, re = 0, he = 0, ee = 0, ae = 0, w = "", ce = !0, _e, Pe;
    let parkName = "Untitled Park";
    try { parkName = localStorage.getItem(`${Ri}-name`) || parkName; } catch {}
    const xe = {
        ...Aa
    };
    try {
        const P = JSON.parse(localStorage.getItem(`${Ri}-physics`) ?? "null");
        Number.isFinite(P?.gravity) && (xe.gravity = sn(P.gravity, 0, 3)),
        Number.isFinite(P?.friction) && (xe.friction = sn(P.friction, 0, 8))
    } catch {}
    function De() {
        for (const P of ["gravity", "friction"])
            m(P).value = String(xe[P]),
            n(`${P}-value`).textContent = `${xe[P].toFixed(2)}Ã—`;
        try {
            localStorage.setItem(`${Ri}-physics`, JSON.stringify(xe))
        } catch {}
    }
    function oe() {
        const P = L.kind;
        if (P !== "lift" && P !== "boost")
            return;
        const H = m("piece-speed");
        L.speed = Math.max(0, Math.round((H.valueAsNumber || (Kr[P] / 1.609344)) * 1.609344)),
        H.value = String(L.speed / 1.609344)
    }
    function me() {
        try {
            localStorage.setItem(`${Ri}-name`, parkName),
            localStorage.setItem(Ri, JSON.stringify(R)),
            localStorage.setItem(`${Ri}-scenery`, JSON.stringify(F))
        } catch {
            return
        }
    }
    function A() {
        Se || (Se = !0,
        e.reportState({
            core_loop_started: !0
        }),
        e.reportEvent("game_started")),
        e.reportEvent("primary_input"),
        e.reportEvent("visual_feedback")
    }
    function x(P, H="") {
        const K = n("status");
        K.textContent !== P && (K.textContent = P),
        K.className = `status ${H}`
    }
    function N() {
        const P = pe !== void 0;
        if (n("telemetry").hidden = !P,
        r("manage").disabled = P,
        n("setup").hidden = !G,
        n("editing").hidden = G,
        n("model-cards").hidden = !G,
        n("actions").classList.toggle("placing", G),
        n("mode").textContent = S ? "SCENERY PLACEMENT" : G ? "STATION PLACEMENT" : P ? pe?.outcome === "running" ? "LIVE TEST" : "TEST RESULT" : D?.closed ? "CIRCUIT READY" : "TRACK EDITOR",
        n("title").textContent = G ? "Start a coaster" : (D.name || Ct[D.model].name),
        n("park-name-label").textContent = parkName.toUpperCase(),
        n("park-count").textContent = R.length ? `${R.length} COASTER${R.length === 1 ? "" : "S"} IN THIS PARK` : "EMPTY PARK",
        s("model").value = Y,
        s("kind").value = L.kind,
        s("kind").disabled = P || !!D?.closed,
        s("rides").value = D?.id ?? "",
        r("new").textContent = G && D ? "Cancel" : "ï¼‹ New",
        r("new").hidden = G && !D,
        r("rotate").textContent = `â†» ${Math.round(te * 180 / Math.PI)}Â°`,
        r("undo").disabled = P || !D?.pieces.length,
        r("close").disabled = P || (D?.pieces.length ?? 0) < 2,
        r("close").textContent = D?.closed ? "Reopen" : "Connect",
        r("test").disabled = !D?.pieces.length,
        r("test").textContent = P ? pe?.outcome === "running" ? "â–  Stop" : "Done" : "â–¶ Test",
        r("commit").textContent = G ? "Place Station" : "ï¼‹ Build",
        r("commit").disabled = !G && (P || !!D?.closed),
        S) {
            r("commit").textContent = "Place scenery",
            r("commit").disabled = !1;
            for (const qe of ["undo", "close", "test"])
                r(qe).disabled = !0
        }
        r("manage").textContent = S ? "Finish" : "Tools";
        n("train-settings").hidden = G || !D || !!P || !!S;
        if (D) {
            m("train-cars").value = String(D.trainCars ?? Ct[D.model].cars);
            if (n("coaster-name") && document.activeElement !== n("coaster-name")) n("coaster-name").value = D.name || Ct[D.model].name;
            m("train-count").value = String(D.trainCount ?? 1);
        }
        r("place-station").classList.toggle("active", G);
        if (n("park-name") && document.activeElement !== n("park-name")) n("park-name").value = parkName;
        if (n("coaster-list")) for (const card of n("coaster-list").children) card.classList.toggle("selected", card.dataset.ride === D?.id);
        if (n("model-cards")) for (const card of n("model-cards").children) card.classList.toggle("selected", card.dataset.model === Y);
        const H = !G && !P && !D?.closed
          , K = L.kind === "lift" || L.kind === "boost" ? L.kind : void 0
          , Oe = H && D !== void 0 && cc(D.model);
        if (n("piece-tuning").hidden = !H,
        n("speed-control").hidden = !K,
        n("rotation-control").hidden = !Oe,
        n("pivot-control").hidden = !H,
        m("pivot-offset").value = String(L.pivot ?? 0),
        n("pivot-value").textContent = `${Number(L.pivot ?? 0).toFixed(1)} ft`,
        K) {
            n("speed-name").textContent = K === "lift" ? "Chain speed" : "Boost target";
            const qe = m("piece-speed");
            qe.removeAttribute("min"),
            qe.removeAttribute("max"),
            document.activeElement !== qe && (qe.value = String((L.speed ?? Kr[K]) / 1.609344))
        }
        Oe && (n("rotation-name").textContent = D?.model === "axis" ? "Seat roll" : "Seat pitch",
        m("seat-rotation").value = String(L.rotation ?? 0),
        n("rotation-value").textContent = `${L.rotation ?? 0}Â°`),
        r("view").textContent = P ? Je ? "Exit POV" : "POV" : "View",
        r("view").disabled = pe?.outcome === "derailed";
        for (const qe of zr) {
            const ut = !!S
              , dt = r(`axis-${qe}`);
            dt.disabled = ut,
            dt.querySelector("b").textContent = `${qe === "length" ? (L[qe] * 3.28084).toFixed(0) : L[qe]}${qe === "length" ? "ft" : "Â°"}`,
            dt.setAttribute("aria-label", `${vn[qe].title} ${qe === "length" ? (L[qe] * 3.28084).toFixed(1) + " feet" : L[qe] + " degrees"}. Drag to adjust or tap to type.`)
        }
    }
    function $() {
        s("rides").replaceChildren(...R.map((P,H) => new Option(`${H+1} Â· ${P.name || Ct[P.model].name}`,P.id)));
        const list = n("coaster-list");
        if (list) list.replaceChildren(...R.map((ride,index) => { const button=document.createElement("button"); button.type="button"; button.className="coaster-card"+(D?.id===ride.id?" selected":""); button.dataset.ride=ride.id; button.innerHTML=`<b>${(ride.name || Ct[ride.model].name).replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]))}</b><small>${Ct[ride.model].name} Â· ${ride.trainCars ?? Ct[ride.model].cars} cars</small>`; button.addEventListener("pointerenter",()=>f.highlight(ride.id,true)); button.addEventListener("pointerleave",()=>f.highlight(ride.id,false)); button.addEventListener("click",()=>{ if(pe) I(); D=ride; G=false; L=Li(); fe=true; de(true); N(); x("Coaster selected."); }); return button; }));
    }
    const ie = P => `#${Ct[P.model].color.toString(16).padStart(6, "0")}`;
    function j() {
        E.clear();
        const P = G ? void 0 : D;
        n("paint-tools").hidden = !P,
        r("delete-ride").disabled = !P,
        r("scenery-undo").disabled = !F.length,
        P && (s("paint-target").replaceChildren(new Option("Entire coaster","all"), new Option("Station","station"), ...P.pieces.map( (H, K) => new Option(`${K + 1} Â· ${tr[H.kind]}`,String(K))), ...P.closed ? [new Option("Return connection","return")] : []),
        Te()),
        d.showModal()
    }
    function Te() {
        if (!D)
            return;
        const P = s("paint-target").value;
        m("paint-color").value = (P === "station" ? D.stationColor : P === "return" ? D.returnColor : D.pieces[Number(P)]?.color) ?? D.color ?? ie(D)
    }
    function be(P) {
        if (!S)
            return;
        const H = {
            kind: S,
            x: P.x,
            z: P.z,
            yaw: T.yaw
        };
        F.push(H),
        f.addScenery(H),
        ce = !0,
        me(),
        x(`${Br[S]} placed. Tap the ground to place more.`, "good")
    }
    function Ie() {
        S = void 0,
        fe = !0,
        N(),
        x("Back to coaster building.")
    }
    function Ae(P) {
        const H = Q0(P);
        M.set(P.id, H),
        f.update(P, H.route),
        fe = !0,
        ce = !0
    }
    function J() {
        fe = !1,
        ce = !0,
        le = void 0,
        !G && D && !D.closed && !pe && !S ? (le = sr(M.get(D.id).endpoint, L),
        f.preview(le.samples, D.model, !0)) : f.preview([], Y, !1)
    }
    function de(P=!1) {
        if (ce = !0,
        Je = !1,
        W = !1,
        !G && D) {
            const H = M.get(D.id).endpoint
              , K = D.closed || pe ? Ka(D).position : sr(H, L).joint.position;
            v.copy(K)
        } else
            P && v.set(0, 0, 0);
        Object.assign(T, {
            distance: G ? 91 : P ? 104 : 61,
            elevation: .77
        })
    }
    function Fe(P) {
        const H = {
            id: crypto.randomUUID?.() ?? `${Date.now()}-${R.length}`,
            model: Y,
            name: Ct[Y].name,
            x: P.x,
            z: P.z,
            angle: te,
            pieces: [],
            closed: !1,
            trainCars: Ct[Y].cars,
            trainCount: 1
        };
        R.push(H),
        D = H,
        G = !1,
        L = Li(),
        $(),
        Ae(H),
        de(),
        N(),
        A(),
        me(),
        x("Station placed. Drag the handles, then build.")
    }
    function Ne() {
        if (S) {
            be(v);
            return
        }
        if (G) {
            Fe(v);
            return
        }
        if (!D || D.closed || pe)
            return;
        oe();
        const H = sr(M.get(D.id).endpoint, L).samples.some(K => K.position.y < $c(D.model));
        D.pieces.push({
            ...L
        }),
        L.turn = 0,
        L.kind === "loop" && (L = {
            ...Li(),
            rotation: L.rotation
        }),
        Ae(D),
        de(),
        N(),
        A(),
        me(),
        x(`${D.pieces.length} built Â· ${Math.round(M.get(D.id).route.length * 3.28084)} ft${H ? " Â· tunnel carved" : ""}`, "good")
    }
    function Ee() {
        G || !D || S || pe || !D.pieces.length || (D.closed ? D.closed = !1 : L = {
            ...D.pieces.pop()
        },
        Ae(D),
        de(),
        N(),
        A(),
        me(),
        x("Last change undone."))
    }
    function Ve() {
        !D || D.pieces.length < 2 || pe || (D.closed = !D.closed,
        Ae(D),
        de(!0),
        N(),
        A(),
        me(),
        x(D.closed ? "Circuit connected. Run a gravity test." : "Circuit reopened.", "good"))
    }
    function I() {
        !pe || !D || (Xe?.dispose(),
        Xe = void 0,
        pe = void 0,
        Ae(D),
        de(),
        N(),
        x("Back in the editor."))
    }
    function ve() {
        if (!D?.pieces.length)
            return;
        if (pe) {
            I();
            return
        }
        pe = new em(M.get(D.id).route,D.model,D.closed,{
            ...xe
        }, D.trainCars ?? Ct[D.model].cars),
        S = void 0,
        Nt(pe),
        ee = 0,
        ae = 0,
        w = "",
        de(!0);
        const P = pe.route
          , H = new Zn().setFromPoints(P.samples.map(K => K.position));
        H.getCenter(v),
        T.distance = sn(H.getSize(new O).length() * 1.5, 65, 990),
        fe = !0,
        N(),
        A(),
        x("Dispatching Â· 0 mph")
    }
    function ge() {
        S = void 0,
        pe && I(),
        G && D ? (G = !1,
        de(),
        x("Back to the selected coaster.")) : (G = !0,
        v.y = 0,
        T.distance = 91,
        ce = !0,
        x("Pan to an open spot, then tap the ground or Place Station.")),
        fe = !0,
        N()
    }
    function ue(P, H) {
        if (G || !D || D.closed || pe || S || !Number.isFinite(H))
            return;
        const K = P === "length" ? Math.max(1, Math.round(H)) : Math.round(H);
        K !== L[P] && (L[P] = K,
        fe = !0,
        N(),
        x(`${vn[P].title} ${P === "length" ? (K * 3.28084).toFixed(0) + " ft" : K + "Â°"} Â· preview`))
    }
    function ne(P) {
        l.open || r(`axis-${P}`).disabled || (Pe = P,
        E.clear(),
        n("axis-title").textContent = `Edit ${vn[P].title.toLowerCase()}`,
        n("axis-range").textContent = P === "length" ? "Length in feet (minimum 3.3)" : "Degrees Â· positive or negative Â· no angle cap",
        c.inputMode = P === "length" ? "decimal" : "text",
        c.value = String(P === "length" ? (L[P] * 3.28084).toFixed(1) : L[P]),
        c.setCustomValidity(""),
        l.showModal(),
        c.select())
    }
    function Z(P, H) {
        ce = !0;
        const K = T.distance / 570
          , Oe = T.yaw;
        v.x += (-Math.cos(Oe) * P - Math.sin(Oe) * H) * K,
        v.z += (Math.sin(Oe) * P - Math.cos(Oe) * H) * K
    }
    function we(P, H) {
        ce = !0,
        T.yaw -= P * .009,
        T.elevation = sn(T.elevation + H * .008, .24, 1.54)
    }
    function ze(P) {
        T.distance = sn(T.distance * P, 15, 990),
        ce = !0
    }
    function lt() {
        pe?.outcome !== "derailed" && (ce = !0,
        pe ? (Je = !Je,
        Q = !1,
        N()) : (W = !W,
        T.elevation = W ? 1.53 : .77))
    }
    function rt(P) {
        const H = a.getBoundingClientRect();
        U.setFromCamera(new Ze((P.clientX - H.left) / H.width * 2 - 1,1 - (P.clientY - H.top) / H.height * 2), f.camera);
        const K = U.ray.intersectPlane(B, new O);
        K && K.distanceTo(f.camera.position) < 2500 && (S ? be(K) : G && Fe(K))
    }
    function zt(P, H, K) {
        const Oe = H.clone().applyMatrix4(f.camera.matrixWorldInverse)
          , qe = H.clone().project(f.camera)
          , ut = (qe.x + 1) * .5 * k.surfaceWidth
          , dt = (1 - qe.y) * .5 * k.surfaceHeight
          , wt = k.surfaceWidth
          , jt = k.surfaceHeight
          , An = wt < 520 && jt > wt ? n("piece-tuning").hidden ? 270 : 322 : 84
          , dn = Math.max(92, k.safeAreaInsets.left + 92)
          , hn = Math.min(wt - 92, wt - k.safeAreaInsets.right - 92)
          , y = Math.max(jt > wt ? 143 : 73, k.safeAreaInsets.top + 73)
          , z = Math.min(jt - An, jt - k.safeAreaInsets.bottom - An);
        P.hidden = Oe.z >= 0 || !Number.isFinite(ut + dt) || !K && (ut < 0 || ut > wt || dt < 0 || dt > jt),
        !P.hidden && !_e && (P.style.transform = `translate(${K ? sn(ut, dn, hn) : ut}px, ${K ? sn(dt, y, Math.max(y, z)) : dt}px)`,
        P.classList.toggle("offtrack", K && (ut < dn || ut > hn || dt < y || dt > z)))
    }
    function Nt(P) {
        for (const [H,K] of Object.entries(P.telemetry))
            n(`${H}-reading`).textContent = H === "sickness" ? `${Math.round(K)}%` : `${K.toFixed(2)} g`,
            n(`${H}-bar`).value = Math.abs(K)
    }
    function Et(P) {
        const H = he ? sn((P - he) / 1e3, 0, .12) : 0;
        if (he = P,
        (E.has("KeyW") || E.has("ArrowUp")) && Z(0, -340 * H),
        (E.has("KeyS") || E.has("ArrowDown")) && Z(0, 340 * H),
        (E.has("KeyA") || E.has("ArrowLeft")) && Z(-340 * H, 0),
        (E.has("KeyD") || E.has("ArrowRight")) && Z(340 * H, 0),
        E.has("KeyQ") && we(-116 * H, 0),
        E.has("KeyE") && we(116 * H, 0),
        fe && J(),
        pe && D) {
            if (pe.outcome === "running") {
                for (ce = !0,
                ee += H; ee >= 1 / 120 && pe.outcome === "running"; )
                    pe.step(1 / 120),
                    ee -= 1 / 120;
                const K = pe.speed * ee;
                if (f.setTrain(D, pe.route, Oe => pe.carPosition(Oe, K)),
                pe.outcome !== "running") {
                    Nt(pe),
                    pe.outcome === "derailed" && (Je = !1,
                    Xe = new sm(f.scene,f.train(D),pe.route.at(pe.position).tangent,pe.impactSpeed,pe.physics.gravity),
                    it = P),
                    N();
                    const Oe = pe.outcome;
                    x(am[Oe], Oe === "station" ? "good" : "error")
                } else if (P - ae > 180) {
                    Nt(pe),
                    ae = P;
                    const Oe = pe.route.at(pe.position)
                      , qe = `${pe.speed < -.38 ? "ROLLING BACK" : Oe.kind === "station" ? "Dispatch" : tr[Oe.kind]} Â· ${Math.round(Math.abs(pe.speed) * 2.236936)} mph`;
                    qe !== w && (w = qe,
                    x(qe, pe.speed < -.38 ? "error" : ""))
                }
            }
            if (Je) {
                const K = pe.route.at(pe.carPosition(0, pe.speed * ee))
                  , Oe = pe.route.at(pe.carPosition(-Math.min(3.2, .95 + Math.abs(pe.speed) * .07)))
                  , qe = cc(D.model)
                  , ut = K.tangent.clone().cross(K.up).normalize()
                  , dt = K.position.clone().addScaledVector(K.up, Ct[D.model].hang ? -.82 : 1.42).addScaledVector(K.tangent, .25)
                  , wt = K.tangent.clone().lerp(Oe.tangent, .4).normalize()
                  , jt = K.up.clone().lerp(Oe.up, .29).normalize();
                if (qe) {
                    dt.addScaledVector(ut, D.model === "axis" ? .33 : 1.22);
                    const dn = D.model === "axis" ? K.tangent : ut
                      , hn = hr.degToRad(K.rotation)
                      , y = K.position.clone().addScaledVector(K.up, D.model === "axis" ? 1.16 : .75).addScaledVector(ut, D.model === "axis" ? 0 : 1.22);
                    dt.sub(y).applyAxisAngle(dn, hn).add(y),
                    wt.applyAxisAngle(dn, hn),
                    jt.applyAxisAngle(dn, hn)
                }
                if (D.model === "spinning") {
                    const dn = ja(pe.position)
                      , hn = K.position.clone().addScaledVector(K.up, .43);
                    dt.addScaledVector(ut, .3).sub(hn).applyAxisAngle(K.up, dn).add(hn),
                    wt.applyAxisAngle(K.up, dn)
                }
                const An = new Kn().setFromRotationMatrix(We.lookAt(dt, dt.clone().add(wt), jt));
                Q || (se.copy(dt),
                Re.copy(An),
                Q = !0),
                se.lerp(dt, 1 - Math.exp(-H * 24)),
                Re.slerp(An, 1 - Math.exp(-H * 14)),
                f.camera.position.copy(se),
                f.camera.quaternion.copy(Re)
            }
        }
        if (Xe && (ce = !0,
        Xe.update(H, (P - it) / 1e3) && (Xe.dispose(),
        Xe = void 0)),
        !pe || !Je) {
            const {yaw: K, elevation: Oe, distance: qe} = T
              , ut = qe * Math.cos(Oe);
            f.camera.up.set(0, 1, 0),
            f.camera.position.set(v.x + ut * Math.sin(K), v.y + qe * Math.sin(Oe), v.z + ut * Math.cos(K)),
            f.camera.lookAt(v)
        }
        if (f.camera.updateMatrixWorld(),
        G ? zt(_, new O(v.x,.05,v.z), !1) : _.hidden = !0,
        le ? zt(g, le.joint.position, !0) : g.hidden = !0,
        ce) {
            const K = le?.joint.position ?? v;
            f.ground(f.camera.position.x, f.camera.position.z, Je ? f.camera.position : K, !Je && K.y < .4 && !!(le || pe)),
            f.renderer.render(f.scene, f.camera),
            ce = !1
        }
        re = requestAnimationFrame(Et)
    }
    function Vt(P) {
        ce = !0,
        k = P,
        window.__combosLayoutContract?.getSnapshot(),
        f.renderer.setSize(P.pixelWidth, P.pixelHeight, !1),
        f.camera.aspect = P.surfaceWidth / P.surfaceHeight;
        const H = f.camera.aspect < .76;
        f.camera.fov = H ? 59 : 48,
        H ? f.camera.setViewOffset(P.surfaceWidth, P.surfaceHeight, 0, Math.min(103, P.surfaceHeight * .138), P.surfaceWidth, P.surfaceHeight) : f.camera.clearViewOffset(),
        f.camera.updateProjectionMatrix()
    }
    const nt = (P, H) => r(P).addEventListener("click", H, {
        signal: b
    });
    nt("commit", Ne),
    nt("manage", () => S ? Ie() : j()),
    nt("tools-done", () => d.close()),
    s("paint-target").addEventListener("change", Te, {
        signal: b
    }),
    nt("paint-apply", () => {
        if (!D || G || pe)
            return;
        const P = s("paint-target").value
          , H = m("paint-color").value;
        Is(H) && (P === "all" ? (D.color = H,
        delete D.stationColor,
        delete D.returnColor,
        D.pieces.forEach(K => delete K.color)) : P === "station" ? D.stationColor = H : P === "return" ? D.returnColor = H : D.pieces[Number(P)] && (D.pieces[Number(P)].color = H),
        Ae(D),
        me(),
        d.close(),
        x("Track painted.", "good"))
    }
    ),
    nt("scenery-place", () => {
        S = s("scenery-kind").value,
        v.y = 0,
        fe = !0,
        d.close(),
        N(),
        x(`Tap the ground to place ${Br[S].toLowerCase()} scenery. Finish exits placement.`)
    }
    ),
    nt("scenery-undo", () => {
        F.pop() && (f.undoScenery(),
        ce = !0,
        me(),
        d.close(),
        x("Last scenery placement removed."))
    }
    ),
    nt("delete-ride", () => {
        !D || G || pe || (n("delete-copy").textContent = `${Ct[D.model].name} and all of its track will be removed from the park.`,
        d.close(),
        p.showModal())
    }
    ),
    nt("delete-cancel", () => p.close()),
    nt("delete-confirm", () => {
        if (!D || pe)
            return;
        const P = R.indexOf(D);
        f.remove(D.id),
        M.delete(D.id),
        R.splice(P, 1),
        D = R[Math.min(P, R.length - 1)],
        G = !D,
        S = void 0,
        L = Li(),
        $(),
        de(!0),
        fe = !0,
        N(),
        me(),
        p.close(),
        x("Coaster deleted.")
    }
    ),
    nt("new", ge),
    nt("place-station", () => {
        if (pe) return;
        if (G) { G = false; de(); N(); x("Station placement cancelled."); }
        else { S = void 0; G = true; v.y = 0; T.distance = 91; ce = true; N(); x("Move the cursor over the park, then click to place the station."); }
    }),
    m("train-cars").addEventListener("change", () => {
        if (!D || pe) return;
        D.trainCars = Math.max(1, Math.round(m("train-cars").valueAsNumber || Ct[D.model].cars));
        m("train-cars").value = String(D.trainCars);
        Ae(D); me(); N(); x(`Train updated to ${D.trainCars} cars.`, "good");
    }, { signal: b }),
    m("train-count").addEventListener("change", () => {
        if (!D || pe) return;
        D.trainCount = Math.max(1, Math.min(6, Math.round(m("train-count").valueAsNumber || 1)));
        m("train-count").value = String(D.trainCount);
        me(); x(`${D.trainCount} train${D.trainCount === 1 ? "" : "s"} configured for this ride.`, "good");
    }, { signal: b });

    let povRecorder = null, povChunks = [];
    nt("record-pov", () => {
        const button = n("record-pov");
        if (povRecorder && povRecorder.state === "recording") { povRecorder.stop(); button.textContent = "â— REC"; return; }
        if (!pe || !Je) { x("Start a coaster test and enter POV before recording.", "error"); return; }
        const canvas = f.renderer.domElement;
        if (!canvas.captureStream || !window.MediaRecorder) { x("Video recording is not supported in this browser.", "error"); return; }
        try {
            const stream = canvas.captureStream(60);
            const mime = ["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"].find(type => MediaRecorder.isTypeSupported(type));
            povChunks = []; povRecorder = new MediaRecorder(stream, mime ? {mimeType:mime} : undefined);
            povRecorder.ondataavailable = event => { if (event.data?.size) povChunks.push(event.data); };
            povRecorder.onstop = () => { const blob = new Blob(povChunks,{type:povRecorder.mimeType || "video/webm"}); const url=URL.createObjectURL(blob); const link=document.createElement("a"); link.href=url; link.download=`${(D?.name || "spire-coaster").replace(/[^a-z0-9-_]+/gi,"-")}-pov.webm`; link.click(); setTimeout(()=>URL.revokeObjectURL(url),30000); stream.getTracks().forEach(track=>track.stop()); x("POV video saved.","good"); };
            povRecorder.start(250); button.textContent = "â–  STOP"; x("Recording POV videoâ€¦ click STOP when finished.","good");
        } catch (error) { x("Could not start video recording: "+error.message,"error"); }
    });
    nt("undo", Ee),
    nt("close", Ve),
    nt("test", ve),
    nt("focus", () => de()),
    nt("view", lt),
    nt("physics", () => {
        E.clear(),
        De(),
        h.showModal()
    }
    ),
    nt("physics-done", () => h.close()),
    nt("physics-reset", () => {
        Object.assign(xe, Aa),
        De()
    }
    );
    for (const P of ["gravity", "friction"])
        m(P).addEventListener("input", () => {
            xe[P] = m(P).valueAsNumber,
            De()
        }
        , {
            signal: b
        });
    m("piece-speed").addEventListener("change", oe, {
        signal: b
    }),
    m("pivot-offset").addEventListener("input", () => { L.pivot = m("pivot-offset").valueAsNumber; n("pivot-value").textContent = `${L.pivot.toFixed(1)} ft`; fe = true; }, {signal:b}),
    m("seat-rotation").addEventListener("input", () => {
        L.rotation = m("seat-rotation").valueAsNumber,
        n("rotation-value").textContent = `${L.rotation}Â°`,
        fe = !0
    }
    , {
        signal: b
    }),
    nt("help", () => {
        E.clear(),
        o.showModal()
    }
    ),
    nt("done", () => o.close()),
    nt("rotate", () => {
        te = (te + Math.PI / 4) % (Math.PI * 2),
        _.style.setProperty("--heading", `${te * 180 / Math.PI}deg`),
        N()
    }
    ),
    s("model").addEventListener("change", () => {
        Y = s("model").value,
        x(Ct[Y].detail)
    }
    , {
        signal: b
    }),
    s("kind").addEventListener("change", () => {
        delete L.speed,
        L.kind = s("kind").value,
        L.kind === "loop" && (L.length = Math.max(32, L.length)),
        fe = !0,
        N(),
        x(`${tr[L.kind]} selected. Drag its handles to shape it.`)
    }
    , {
        signal: b
    }),
    s("rides").addEventListener("change", () => {
        const P = s("rides").value;
        pe && I(),
        D = R.find(H => H.id === P),
        L = Li(),
        fe = !0,
        de(!0),
        N(),
        x("Coaster selected.")
    }
    , {
        signal: b
    }),
    nt("axis-cancel", () => l.close()),
    c.addEventListener("input", () => c.setCustomValidity(""), {
        signal: b
    }),
    n("axis-form").addEventListener("submit", P => {
        if (P.preventDefault(),
        Pe === void 0)
            return;
        const H = c.value.trim()
          , K = Number(H);
        if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(H) || !Number.isFinite(K) || Pe === "length" && K < 3.28) {
            c.setCustomValidity(Pe === "length" ? "Enter a length of at least 3.28 feet." : "Enter a whole number of degrees."),
            c.reportValidity();
            return
        }
        ue(Pe, Pe === "length" ? Math.round(K / 3.28084) : K),
        A(),
        l.close()
    }
    , {
        signal: b
    });
    for (const P of zr) {
        const H = r(`axis-${P}`);
        H.addEventListener("pointerdown", K => {
            K.button !== 0 || _e || (K.preventDefault(),
            H.setPointerCapture(K.pointerId),
            _e = {
                axis: P,
                start: L[P],
                x: K.clientX,
                y: K.clientY,
                id: K.pointerId,
                moved: !1
            })
        }
        , {
            signal: b
        }),
        H.addEventListener("pointermove", K => {
            if (_e?.id !== K.pointerId || _e.axis !== P)
                return;
            const Oe = K.clientX - _e.x
              , qe = K.clientY - _e.y;
            if (!_e.moved && Math.hypot(Oe, qe) < 5)
                return;
            _e.moved = !0,
            H.classList.add("dragging");
            const {dx: ut, dy: dt} = vn[P]
              , wt = (Oe * ut + qe * dt) / k.fitScale;
            ue(P, _e.start + wt * (P === "length" ? .39 : .91))
        }
        , {
            signal: b
        });
        for (const K of ["pointerup", "pointercancel", "lostpointercapture"])
            H.addEventListener(K, Oe => {
                if (_e?.id !== Oe.pointerId)
                    return;
                const qe = Oe.type === "pointerup" && !_e.moved && Math.hypot(Oe.clientX - _e.x, Oe.clientY - _e.y) < 5;
                _e.start !== L[P] && A(),
                _e = void 0,
                H.classList.remove("dragging"),
                qe && (H.focus({
                    preventScroll: !0
                }),
                ne(P))
            }
            , {
                signal: b
            });
        H.addEventListener("click", K => {
            K.detail === 0 && ne(P)
        }
        , {
            signal: b
        }),
        H.addEventListener("keydown", K => {
            ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"].includes(K.key) && (K.stopPropagation(),
            K.preventDefault(),
            ue(P, L[P] + (["ArrowRight", "ArrowUp"].includes(K.key) ? 1 : -1) * (K.shiftKey ? 5 : 1)),
            A())
        }
        , {
            signal: b
        })
    }
    a.addEventListener("contextmenu", P => P.preventDefault(), {
        signal: b
    }),
    a.addEventListener("wheel", P => {
        P.preventDefault(),
        ze(Math.exp(sn(P.deltaY, -140, 140) * .002))
    }
    , {
        passive: !1,
        signal: b
    }),
    a.addEventListener("pointerdown", P => {
        if ([0, 1, 2].includes(P.button) && (P.preventDefault(),
        a.setPointerCapture(P.pointerId),
        C.set(P.pointerId, {
            x: P.clientX,
            y: P.clientY,
            moved: !1,
            multi: C.size > 0
        }),
        C.size > 1))
            for (const H of C.values())
                H.multi = !0
    }
    , {
        signal: b
    }),
    a.addEventListener("pointermove", P => {
        const H = C.get(P.pointerId);
        if (!H)
            return;
        const K = (P.clientX - H.x) / k.fitScale
          , Oe = (P.clientY - H.y) / k.fitScale;
        if (!(!H.moved && Math.hypot(K, Oe) < 4)) {
            if (H.moved = !0,
            P.pointerType === "touch" && C.size > 1) {
                const qe = [...C.entries()].find( ([wt]) => wt !== P.pointerId)[1]
                  , ut = Math.hypot(H.x - qe.x, H.y - qe.y)
                  , dt = Math.hypot(P.clientX - qe.x, P.clientY - qe.y);
                ut > 10 && dt > 10 && ze(ut / dt),
                we(K * .48, Oe * .48)
            } else
                (P.buttons & 6) !== 0 || P.shiftKey ? we(K, Oe) : Z(K, Oe);
            H.x = P.clientX,
            H.y = P.clientY
        }
    }
    , {
        signal: b
    }),
    a.addEventListener("pointerup", P => {
        const H = C.get(P.pointerId);
        (G || S) && H && !H.multi && !H.moved && P.button === 0 && rt(P),
        C.delete(P.pointerId)
    }
    , {
        signal: b
    });
    for (const P of ["pointercancel", "lostpointercapture"])
        a.addEventListener(P, H => C.delete(H.pointerId), {
            signal: b
        });
    window.addEventListener("keydown", P => {
        o.open || h.open || l.open || d.open || p.open || P.target instanceof HTMLElement && P.target.matches("select, input") || (["KeyW", "KeyA", "KeyS", "KeyD", "KeyQ", "KeyE", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(P.code) && !P.ctrlKey && !P.metaKey && (E.add(P.code),
        P.preventDefault()),
        !P.repeat && (P.code === "KeyZ" && (P.ctrlKey || P.metaKey) && (P.preventDefault(),
        Ee()),
        P.code === "Enter" && !(P.target instanceof HTMLButtonElement) && (P.preventDefault(),
        Ne()),
        P.code === "KeyF" && de(),
        P.code === "KeyT" && lt(),
        P.code === "Escape" && pe && I(),
        P.code === "Escape" && S && Ie()))
    }
    , {
        signal: b
    }),
    window.addEventListener("keyup", P => E.delete(P.code), {
        signal: b
    }),
    window.addEventListener("blur", () => E.clear(), {
        signal: b
    });
    try {
        const P = JSON.parse(localStorage.getItem(Ri) ?? "null");
        if (Array.isArray(P)) {
            for (const H of P)
                if (!(!H || typeof H.id != "string" || !uc.includes(H.model) || ![H.x, H.z, H.angle].every(Number.isFinite) || !Array.isArray(H.pieces)) && H.pieces.every(K => K && dc.includes(K.kind) && zr.every(Oe => Number.isFinite(K[Oe])) && K.length >= 1)) {
                    for (const K of ["color", "returnColor", "stationColor"])
                        Is(H[K]) || delete H[K];
                    for (const K of H.pieces)
                        Is(K.color) || delete K.color,
                        !Number.isFinite(K.speed) || K.kind !== "lift" && K.kind !== "boost" ? delete K.speed : K.speed = K.speed,
                        Number.isFinite(K.rotation) ? K.rotation = sn(K.rotation, -360, 360) : delete K.rotation;
                    H.trainCars = Math.max(1, Math.round(Number(H.trainCars) || Ct[H.model].cars)),
                    H.trainCount ??= 1,
                    R.push(H),
                    Ae(H)
                }
        }
    } catch {
        R.length = 0
    }
    try {
        const P = JSON.parse(localStorage.getItem(`${Ri}-scenery`) ?? "null");
        if (Array.isArray(P))
            for (const H of P)
                !H || !Object.hasOwn(Br, H.kind) || ![H.x, H.z, H.yaw].every(Number.isFinite) || (F.push(H),
                f.addScenery(H))
    } catch {}
    R.length && (D = R[0],
    G = !1,
    $(),
    de(!0),
    e.reportEvent("state_restored")),
    N(),
    x(G ? "Pick a model, then place its station on the flat land." : "Park loaded. Select a coaster to keep building.");
    const titleScreen = n("title-screen");
    const startTitle = () => titleScreen.classList.add("dismissed");
    nt("start-game", startTitle);
    nt("hamburger", () => n("menu-dialog").showModal());
    nt("menu-done", () => n("menu-dialog").close());
    nt("menu-tools", () => { n("menu-dialog").close(); j(); });
    nt("menu-physics", () => { n("menu-dialog").close(); De(); h.showModal(); });
    nt("menu-help", () => { n("menu-dialog").close(); o.showModal(); });
    nt("menu-save", () => { n("menu-dialog").close(); r("share-code").click(); });
    nt("menu-main", () => { n("menu-dialog").close(); titleScreen.classList.remove("dismissed"); });
    m("park-name").addEventListener("change", () => { parkName=String(m("park-name").value||"Untitled Park").trim().slice(0,48)||"Untitled Park"; m("park-name").value=parkName; me(); x("Park name saved.","good"); });
    m("coaster-name").addEventListener("change", () => { if(!D)return; D.name=String(m("coaster-name").value||Ct[D.model].name).trim().slice(0,48)||Ct[D.model].name; m("coaster-name").value=D.name; $(); me(); N(); x("Coaster name saved.","good"); });
    for (const card of n("model-cards").querySelectorAll("[data-model]")) card.addEventListener("click",()=>{ Y=card.dataset.model; m("model").value=Y; for(const c of n("model-cards").children)c.classList.toggle("selected",c===card); x(Ct[Y].detail); });

    nt("continue-game", startTitle);
    nt("code-close", () => n("code-dialog").close());
    nt("copy-code", async () => {
        const value = m("park-code-output").value;
        try { await navigator.clipboard.writeText(value); x("Park code copied.", "good"); }
        catch { m("park-code-output").select(); x("Select the code and copy it manually."); }
    });
    const encodePark = async () => {
        const payload = JSON.stringify({v:2, parkName, rides:R, scenery:F});
        const bytes = new TextEncoder().encode(payload);
        if (!("CompressionStream" in window)) return "SP2."+btoa(unescape(encodeURIComponent(payload))).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,"");
        const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip"));
        const compressed = new Uint8Array(await new Response(stream).arrayBuffer());
        let binary = ""; for (const byte of compressed) binary += String.fromCharCode(byte);
        return "SP2G."+btoa(binary).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,"");
    };
    const decodePark = async code => {
        const raw = code.trim();
        const base = raw.slice(raw.indexOf(".")+1).replace(/-/g,"+").replace(/_/g,"/");
        const binary = atob(base + "=".repeat((4-base.length%4)%4));
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        let json;
        if (raw.startsWith("SP2G.")) {
            if (!("DecompressionStream" in window)) throw new Error("This browser cannot decompress park codes");
            json = await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).text();
        } else if (raw.startsWith("SP2.")) json = decodeURIComponent(escape(binary));
        else throw new Error("That doesn't look like a Spire Parks 2 code");
        return JSON.parse(json);
    };
    nt("share-code", async () => {
        try { m("park-code-output").value = await encodePark(); n("code-dialog").showModal(); }
        catch (err) { x("Couldn't create park code: "+err.message, "error"); }
    });
    nt("import-park", async () => {
        try {
            const data = await decodePark(m("import-code").value);
            if (!data || data.v !== 2 || !Array.isArray(data.rides) || !Array.isArray(data.scenery)) throw new Error("Invalid park data");
            R.splice(0, R.length, ...data.rides);
            F.splice(0, F.length, ...data.scenery);
            parkName = String(data.parkName || "Untitled Park").slice(0,48);
            for (const ride of R) {
                ride.trainCars = Math.max(1, Math.round(Number(ride.trainCars) || Ct[ride.model]?.cars || 5));
                ride.trainCount ??= 1;
                Ae(ride);
            }
            me(); N(); startTitle(); x("Park imported successfully.", "good");
        } catch (err) { x(err.message || "Could not import that code.", "error"); }
    });
    const ht = e.registerAction("primary", Ne, {
        type: "selector",
        selector: "#commit"
    })
      , st = i.subscribe(Vt);
    Vt(k),
    e.reportEvent("loading_complete"),
    e.reportState({
        loading_complete: !0,
        input_ready: !0
    }),
    Et(performance.now());
    function At() {
        b.aborted || (u.abort(),
        cancelAnimationFrame(re),
        Xe?.dispose(),
        st(),
        ht(),
        f.dispose())
    }
    return window.addEventListener("pagehide", P => {
        P.persisted || At()
    }
    , {
        signal: b
    }),
    At
}
const cm = 3
  , hc = Object.freeze({
    type: "combos:game-ready-v1"
});
function Vr(i) {
    return {
        ...i,
        referenceRect: {
            ...i.referenceRect
        },
        safeAreaInsets: {
            ...i.safeAreaInsets
        },
        viewportSafeAreaInsets: {
            ...i.viewportSafeAreaInsets
        }
    }
}
function lm(i) {
    const e = typeof window.getComputedStyle == "function" ? window.getComputedStyle(i) : null
      , t = n => {
        const r = Number.parseFloat(e?.getPropertyValue(n) || "0");
        return Number.isFinite(r) ? Math.max(0, r) : 0
    }
    ;
    return {
        top: t("--surface-viewport-safe-top"),
        right: t("--surface-viewport-safe-right"),
        bottom: t("--surface-viewport-safe-bottom"),
        left: t("--surface-viewport-safe-left")
    }
}
function um({surface: i, referenceSize: e, maxDpr: t=cm}) {
    const n = document.querySelector("#viewport")
      , r = document.querySelector("#app");
    if (!(n instanceof HTMLElement))
        throw new Error("Game viewport #viewport is required");
    if (!(r instanceof HTMLElement))
        throw new Error("Game root #app is required");
    const s = n
      , a = r;
    function o() {
        const _ = s.getBoundingClientRect()
          , f = Math.max(1, _.width)
          , u = Math.max(1, _.height)
          , b = Number(window.devicePixelRatio)
          , v = Math.min(Number.isFinite(b) && b > 0 ? b : 1, t)
          , T = e?.width ?? f
          , C = e?.height ?? u
          , E = Math.min(f / T, u / C)
          , R = f / E
          , F = u / E
          , S = T * E
          , M = C * E
          , U = (R - T) / 2
          , B = (F - C) / 2
          , k = lm(s)
          , D = {
            top: k.top / E,
            right: k.right / E,
            bottom: k.bottom / E,
            left: k.left / E
        };
        return {
            viewportWidth: f,
            viewportHeight: u,
            cssWidth: f,
            cssHeight: u,
            dpr: v,
            pixelWidth: Math.round(f * v),
            pixelHeight: Math.round(u * v),
            referenceWidth: T,
            referenceHeight: C,
            surfaceWidth: R,
            surfaceHeight: F,
            fitScale: E,
            renderScale: E * v,
            fitWidth: S,
            fitHeight: M,
            offsetX: U * E,
            offsetY: B * E,
            referenceOffsetX: U,
            referenceOffsetY: B,
            referenceRect: {
                x: U,
                y: B,
                width: T,
                height: C
            },
            safeAreaInsets: D,
            viewportSafeAreaInsets: k
        }
    }
    function l(_) {
        a.style.width = `${_.surfaceWidth}px`,
        a.style.height = `${_.surfaceHeight}px`,
        a.style.left = "0px",
        a.style.top = "0px",
        a.style.transform = `scale(${_.fitScale})`,
        a.style.setProperty("--surface-dpr", String(_.dpr)),
        a.style.setProperty("--surface-fit-scale", String(_.fitScale)),
        a.style.setProperty("--surface-render-scale", String(_.renderScale)),
        a.style.setProperty("--surface-css-width", `${_.cssWidth}px`),
        a.style.setProperty("--surface-css-height", `${_.cssHeight}px`),
        a.style.setProperty("--surface-width", `${_.surfaceWidth}px`),
        a.style.setProperty("--surface-height", `${_.surfaceHeight}px`),
        a.style.setProperty("--surface-reference-width", `${_.referenceWidth}px`),
        a.style.setProperty("--surface-reference-height", `${_.referenceHeight}px`),
        a.style.setProperty("--surface-reference-offset-x", `${_.referenceOffsetX}px`),
        a.style.setProperty("--surface-reference-offset-y", `${_.referenceOffsetY}px`),
        a.style.setProperty("--surface-safe-top", `${_.safeAreaInsets.top}px`),
        a.style.setProperty("--surface-safe-right", `${_.safeAreaInsets.right}px`),
        a.style.setProperty("--surface-safe-bottom", `${_.safeAreaInsets.bottom}px`),
        a.style.setProperty("--surface-safe-left", `${_.safeAreaInsets.left}px`)
    }
    const c = new Set;
    let h = o();
    function d() {
        h = o(),
        l(h);
        for (const _ of [...c])
            try {
                _(Vr(h))
            } catch (f) {
                console.error("[surface-template] subscriber failed", f)
            }
        return Vr(h)
    }
    function p(_) {
        if (typeof _ != "function")
            throw new TypeError("Surface subscriber must be a function");
        return _(Vr(h)),
        c.add(_),
        () => {
            c.delete(_)
        }
    }
    const m = new ResizeObserver(d);
    m.observe(s),
    l(h);
    const g = Object.freeze({
        version: 2,
        surface: i,
        viewport: s,
        root: a,
        referenceSize: e,
        maxDpr: t,
        getMetrics: () => Vr(h),
        refresh: d,
        subscribe: p
    });
    return window.__surfaceTemplate = g,
    {
        api: g,
        dispose() {
            m.disconnect(),
            c.clear(),
            window.__surfaceTemplate === g && delete window.__surfaceTemplate
        }
    }
}
function dm(i) {
    return new Promise(e => {
        let t = !1;
        const n = () => {
            if (t || i?.aborted) {
                e();
                return
            }
            t = !0,
            i?.removeEventListener("abort", s);
            try {
                typeof window.ReactNativeWebView?.postMessage == "function" && window.ReactNativeWebView.postMessage(JSON.stringify(hc))
            } catch {}
            try {
                window.parent && window.parent !== window && typeof window.parent.postMessage == "function" && window.parent.postMessage(hc, "*")
            } catch {}
        }
        ;
        let r = 0;
        const s = () => {
            i?.removeEventListener("abort", s),
            typeof window.cancelAnimationFrame == "function" ? window.cancelAnimationFrame(r) : typeof window.clearTimeout == "function" && window.clearTimeout(r),
            e()
        }
          , a = o => typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame( () => o()) : window.setTimeout(o, 16);
        if (i?.addEventListener("abort", s, {
            once: !0
        }),
        i?.aborted) {
            s();
            return
        }
        r = a( () => {
            r = a( () => {
                n(),
                e()
            }
            )
        }
        )
    }
    )
}
const jc = "mobile_portrait"
  , hm = Object.freeze({
    width: 393,
    height: 725
})
  , es = um({
    surface: jc,
    referenceSize: hm
})
  , fm = pl({
    profile: jc,
    surfaceTemplate: es.api
});
es.api.root.innerHTML = '<div id="boot"><strong>Spire Parks 2</strong>Preparing the parkâ€¦</div>';
const pm = Kc({
    critical: [],
    initializeInteractiveScene: async () => {
        om(es.api, fm.gameplay)
    }
    ,
    reportPlayable: dm,
    deferred: []
});
pm.ready.catch(i => {
    console.error("Game startup failed", i),
    es.api.root.innerHTML = '<div id="boot"><strong>Spire Parks 2</strong>3D rendering is unavailable.</div>'
}
);
