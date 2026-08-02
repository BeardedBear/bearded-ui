import { Fragment as e, Teleport as t, TransitionGroup as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, inject as d, mergeModels as f, mergeProps as p, nextTick as m, normalizeClass as h, normalizeStyle as g, onBeforeUnmount as _, openBlock as v, provide as y, ref as b, renderList as x, renderSlot as S, resolveDynamicComponent as C, toDisplayString as w, toRef as T, unref as E, useId as D, useModel as O, vModelCheckbox as ee, vModelDynamic as te, vModelSelect as ne, watch as k, watchEffect as re, withCtx as A, withDirectives as j, withKeys as ie } from "vue";
import { PhCaretDown as M } from "@phosphor-icons/vue";
//#region src/components/BdBadge.vue?vue&type=script&setup=true&lang.ts
var ae = /*@__PURE__*/ u({
	__name: "BdBadge",
	props: { variant: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (v(), o("span", { class: h(["bd-badge bd-font-bold bd-squircle", `bd-state-${t.variant}`]) }, [S(e.$slots, "default", {}, void 0, !0)], 2));
	}
}), N = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, oe = /*#__PURE__*/ N(ae, [["__scopeId", "data-v-f4bfdac3"]]), P = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdLoader",
	props: { size: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (v(), o("span", {
			"aria-label": "Loading",
			class: h(["bd-loader", t.size === "default" ? "" : `bd-loader-${t.size}`]),
			role: "status"
		}, null, 2));
	}
}), [["__scopeId", "data-v-65a28fad"]]), F = Symbol("bdDropdownClose"), I = Symbol("bdSize"), L = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdButton",
	props: {
		align: { default: "center" },
		as: { default: void 0 },
		disabled: { type: Boolean },
		full: { type: Boolean },
		href: { default: void 0 },
		iconOnly: { type: Boolean },
		loading: { type: Boolean },
		size: { default: void 0 },
		target: { default: "_self" },
		to: { default: void 0 },
		type: { default: "button" },
		variant: { default: "default" }
	},
	setup(e) {
		let t = e, n = d(I, void 0), o = r(() => t.size ?? n?.value ?? "default"), s = r(() => t.as ? t.as : t.to ? "router-link" : t.href ? "a" : "button"), c = r(() => s.value === "router-link" ? { to: t.to } : s.value === "a" ? {
			href: t.href,
			rel: t.target === "_blank" ? "noopener" : void 0,
			target: t.target
		} : {
			disabled: t.disabled || t.loading,
			type: t.type
		}), l = r(() => [
			t.variant === "default" ? "" : `bd-button-${t.variant}`,
			o.value === "default" ? "" : `bd-button-${o.value}`,
			t.align === "center" ? "" : `bd-button-align-${t.align}`,
			{
				"bd-button-full": t.full,
				"bd-button-icon-only": t.iconOnly,
				"is-loading": t.loading
			}
		]);
		return (t, n) => (v(), i(C(s.value), p({ class: ["bd-button bd-font-bold bd-squircle", l.value] }, c.value), {
			default: A(() => [e.loading ? (v(), i(P, {
				key: 0,
				size: o.value === "x-small" ? "xx-small" : "x-small"
			}, null, 8, ["size"])) : a("", !0), S(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, ["class"]));
	}
}), [["__scopeId", "data-v-c7cfeaf2"]]), se = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdButtonGroup",
	props: /*@__PURE__*/ f({
		disabled: { type: Boolean },
		full: { type: Boolean },
		options: { default: () => [] },
		size: { default: "default" }
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(t) {
		let n = t, r = O(t, "modelValue");
		return y(I, T(n, "size")), (n, a) => (v(), o("div", {
			class: h(["bd-button-group", { "bd-button-group-full": t.full }]),
			role: "group"
		}, [S(n.$slots, "default", {}, () => [(v(!0), o(e, null, x(t.options, (e) => (v(), i(L, {
			key: e.value,
			disabled: t.disabled,
			size: t.size,
			variant: e.value === r.value ? "primary" : "default",
			onClick: (t) => r.value = e.value
		}, {
			default: A(() => [c(w(e.label), 1)]),
			_: 2
		}, 1032, [
			"disabled",
			"size",
			"variant",
			"onClick"
		]))), 128))], !0)], 2));
	}
}), [["__scopeId", "data-v-6fe4edbf"]]), ce = {
	key: 0,
	class: "bd-card-header bd-font-bold"
}, le = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdCard",
	props: { padding: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (v(), o("section", { class: h(["bd-card bd-surface bd-squircle", t.padding === "default" ? "" : `bd-card-${t.padding}`]) }, [e.$slots.header ? (v(), o("header", ce, [S(e.$slots, "header", {}, void 0, !0)])) : a("", !0), S(e.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-57c01e05"]]), ue = {
	key: 0,
	class: "bd-checkbox-label"
}, de = { class: "bd-checkbox-switch" }, fe = ["disabled"], pe = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdCheckbox",
	props: /*@__PURE__*/ f({
		disabled: { type: Boolean },
		fullWidth: { type: Boolean },
		label: {}
	}, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = O(e, "modelValue");
		return (n, r) => (v(), o("label", { class: h(["bd-checkbox", {
			"bd-checkbox-full": e.fullWidth,
			"is-disabled": e.disabled
		}]) }, [e.label || n.$slots.default ? (v(), o("span", ue, [S(n.$slots, "default", {}, () => [c(w(e.label), 1)], !0)])) : a("", !0), s("span", de, [
			j(s("input", {
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e,
				class: "bd-checkbox-input",
				disabled: e.disabled,
				type: "checkbox"
			}, null, 8, fe), [[ee, t.value]]),
			r[1] ||= s("span", { class: "bd-checkbox-track bd-squircle" }, null, -1),
			r[2] ||= s("span", { class: "bd-checkbox-knob bd-squircle" }, null, -1)
		])], 2));
	}
}), [["__scopeId", "data-v-c8dd0e95"]]), me = {
	key: 0,
	class: "bd-dialog-header"
}, he = { class: "bd-dialog-title" }, ge = { class: "bd-dialog-body" }, _e = {
	key: 1,
	class: "bd-dialog-footer"
}, ve = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdDialog",
	props: /*@__PURE__*/ f({ title: {} }, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = O(e, "modelValue"), n = b();
		return k(t, (e) => {
			n.value && (e ? n.value.showModal() : n.value.close());
		}), (r, i) => (v(), o("dialog", {
			ref_key: "el",
			ref: n,
			class: "bd-dialog bd-surface bd-squircle bd-anim-dialog",
			onClose: i[0] ||= (e) => t.value = !1
		}, [
			e.title || r.$slots.header ? (v(), o("header", me, [S(r.$slots, "header", {}, () => [s("h2", he, w(e.title), 1)], !0)])) : a("", !0),
			s("div", ge, [S(r.$slots, "default", {}, void 0, !0)]),
			r.$slots.footer ? (v(), o("footer", _e, [S(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
		], 544));
	}
}), [["__scopeId", "data-v-50a730e8"]]), R = 8, ye = 120, be = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function z(e, t, n = {}) {
	let { align: r = "start", constrain: i = !1, matchWidth: a = !1, offset: o = 6, side: s = "bottom" } = n;
	t.style.maxHeight = "", t.style.maxWidth = "";
	let c = e instanceof HTMLElement ? e.getBoundingClientRect() : e;
	a && (t.style.minWidth = `${c.width}px`);
	let l = {
		height: t.offsetHeight,
		width: t.offsetWidth
	}, u = {
		bottom: window.innerHeight - c.bottom,
		left: c.left,
		right: window.innerWidth - c.right,
		top: c.top
	}, d = s === "top" || s === "bottom", f = be[s], p = (d ? l.height : l.width) + o + R, m = u[s] >= p || u[s] >= u[f] ? s : f, h = Math.max(u[m] - o - R, ye), g = Math.min(d ? l.height : l.width, h), _ = m === "top" || m === "left" ? (d ? c.top : c.left) - o - g : (d ? c.bottom : c.right) + o, v = d ? c.left : c.top, y = d ? c.right : c.bottom, b = d ? l.width : l.height, x = d ? window.innerWidth : window.innerHeight, S = r === "end" ? y - b : r === "center" ? v + (y - v - b) / 2 : v, C = Math.min(Math.max(R, S), Math.max(R, x - b - R)), w = d ? _ : C, T = d ? C : _;
	return t.style.top = `${w}px`, t.style.left = `${T}px`, i && (t.style[d ? "maxHeight" : "maxWidth"] = `${h}px`), t.dataset.placement = m, {
		left: T,
		placement: m,
		top: w
	};
}
function B(e) {
	let t = !1;
	return () => {
		t || (t = !0, requestAnimationFrame(() => {
			t = !1, e();
		}));
	};
}
function V(e) {
	let t = B(e);
	return {
		start: () => {
			window.addEventListener("scroll", t, !0), window.addEventListener("resize", t);
		},
		stop: () => {
			window.removeEventListener("scroll", t, !0), window.removeEventListener("resize", t);
		}
	};
}
//#endregion
//#region src/components/BdDropdown.vue?vue&type=script&setup=true&lang.ts
var xe = { class: "bd-dropdown" }, Se = ["aria-controls", "aria-expanded"], Ce = ["id"], we = 767, Te = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdDropdown",
	props: /*@__PURE__*/ f({
		disabled: { type: Boolean },
		label: { default: "Menu" },
		matchWidth: { type: Boolean },
		offset: { default: 6 },
		placement: { default: "bottom-start" },
		sheetOnMobile: {
			type: Boolean,
			default: !0
		},
		size: { default: "default" }
	}, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = e, n = O(e, "modelValue"), r = b(), i = b(), a = D();
		function u() {
			return t.sheetOnMobile && window.innerWidth <= we;
		}
		function d() {
			let e = i.value, n = r.value;
			if (!e || !n) return;
			if (u()) {
				e.style.cssText = "", e.dataset.placement = "sheet";
				return;
			}
			let [a, o] = t.placement.split("-");
			z(n, e, {
				align: o,
				constrain: !0,
				matchWidth: t.matchWidth,
				offset: t.offset,
				side: a
			});
		}
		let f = V(d);
		function p() {
			n.value = !1;
		}
		function g(e) {
			if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
			let t = [...i.value?.querySelectorAll(".bd-dropdown-item:not(:disabled)") ?? []];
			if (t.length === 0) return;
			e.preventDefault();
			let n = t.indexOf(document.activeElement);
			t[((e.key === "ArrowDown" ? n + 1 : n - 1) + t.length) % t.length]?.focus();
		}
		function x() {
			t.disabled || (n.value = !n.value);
		}
		return k(n, async (e) => {
			let t = i.value;
			t && (e ? (t.matches(":popover-open") || t.showPopover(), await m(), d(), f.start()) : (t.matches(":popover-open") && t.hidePopover(), f.stop()));
		}), _(f.stop), y(F, p), y(I, T(t, "size")), (t, u) => (v(), o("div", xe, [s("span", {
			ref_key: "triggerEl",
			ref: r,
			"aria-controls": E(a),
			"aria-expanded": n.value,
			"aria-haspopup": "menu",
			class: "bd-dropdown-trigger",
			onClick: x
		}, [S(t.$slots, "trigger", {
			open: n.value,
			toggle: x
		}, () => [l(L, { disabled: e.disabled }, {
			default: A(() => [c(w(e.label) + " ", 1), l(E(M), {
				class: "bd-dropdown-caret",
				size: "1.1em",
				weight: "bold"
			})]),
			_: 1
		}, 8, ["disabled"])], !0)], 8, Se), s("div", {
			id: E(a),
			ref_key: "panelEl",
			ref: i,
			class: h(["bd-dropdown-panel bd-surface bd-squircle bd-anim-popover", { "bd-anim-popover-sheet": e.sheetOnMobile }]),
			popover: "auto",
			role: "menu",
			onKeydown: g,
			onToggle: u[0] ||= (e) => n.value = e.newState === "open"
		}, [S(t.$slots, "default", { close: p }, void 0, !0)], 42, Ce)]));
	}
}), [["__scopeId", "data-v-dcc3adb1"]]), Ee = ["disabled"], De = {
	key: 0,
	class: "bd-dropdown-item-icon"
}, Oe = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdDropdownItem",
	props: {
		active: { type: Boolean },
		danger: { type: Boolean },
		disabled: { type: Boolean },
		icon: {},
		keepOpen: { type: Boolean }
	},
	setup(e) {
		let t = e, n = d(F, () => {});
		function r() {
			t.keepOpen || n();
		}
		return (t, n) => (v(), o("button", {
			class: h(["bd-dropdown-item bd-squircle", {
				"is-active": e.active,
				"is-danger": e.danger
			}]),
			disabled: e.disabled,
			role: "menuitem",
			type: "button",
			onClick: r
		}, [e.icon || t.$slots.icon ? (v(), o("span", De, [S(t.$slots, "icon", {}, () => [(v(), i(C(e.icon), {
			size: "1.2em",
			weight: "bold"
		}))], !0)])) : a("", !0), S(t.$slots, "default", {}, void 0, !0)], 10, Ee));
	}
}), [["__scopeId", "data-v-4877e0ac"]]), ke = ["for"], Ae = [
	"id",
	"disabled",
	"placeholder",
	"type"
], je = {
	key: 1,
	class: "bd-field-note"
}, Me = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdInput",
	props: /*@__PURE__*/ f({
		disabled: { type: Boolean },
		error: {},
		hint: {},
		label: {},
		placeholder: {},
		type: { default: "text" }
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = O(e, "modelValue"), n = D();
		return (r, i) => (v(), o("div", { class: h(["bd-field", { "has-error": e.error }]) }, [
			e.label ? (v(), o("label", {
				key: 0,
				class: "bd-field-label bd-font-bold",
				for: E(n)
			}, w(e.label), 9, ke)) : a("", !0),
			j(s("input", {
				id: E(n),
				"onUpdate:modelValue": i[0] ||= (e) => t.value = e,
				class: "bd-field-input",
				disabled: e.disabled,
				placeholder: e.placeholder,
				type: e.type
			}, null, 8, Ae), [[te, t.value]]),
			e.error || e.hint ? (v(), o("small", je, w(e.error || e.hint), 1)) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-a22b02f8"]]), Ne = { class: "bd-field" }, Pe = ["for"], Fe = { class: "bd-select" }, Ie = ["id", "disabled"], Le = {
	key: 0,
	disabled: "",
	value: ""
}, Re = ["value"], ze = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdSelect",
	props: /*@__PURE__*/ f({
		disabled: { type: Boolean },
		label: {},
		options: {},
		placeholder: {}
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(t) {
		let n = O(t, "modelValue"), r = D();
		return (i, c) => (v(), o("div", Ne, [t.label ? (v(), o("label", {
			key: 0,
			class: "bd-field-label bd-font-bold",
			for: E(r)
		}, w(t.label), 9, Pe)) : a("", !0), s("div", Fe, [j(s("select", {
			id: E(r),
			"onUpdate:modelValue": c[0] ||= (e) => n.value = e,
			class: "bd-select-control bd-font-bold",
			disabled: t.disabled
		}, [t.placeholder ? (v(), o("option", Le, w(t.placeholder), 1)) : a("", !0), (v(!0), o(e, null, x(t.options, (e) => (v(), o("option", {
			key: e.value,
			value: e.value
		}, w(e.label), 9, Re))), 128))], 8, Ie), [[ne, n.value]]), l(E(M), {
			"aria-hidden": "true",
			class: "bd-select-arrow",
			size: "1.1em",
			weight: "bold"
		})])]));
	}
}), [["__scopeId", "data-v-9a91e932"]]);
//#endregion
//#region src/utils/color.ts
function H(e) {
	let t = Be(e);
	return !t || Ve(...t) > .4;
}
function Be(e) {
	let t = e.trim().replace("#", ""), n = t.length === 3 ? t[0] + t[0] + t[1] + t[1] + t[2] + t[2] : t;
	if (/^[\da-f]{6}$/i.test(n)) return [
		parseInt(n.slice(0, 2), 16),
		parseInt(n.slice(2, 4), 16),
		parseInt(n.slice(4, 6), 16)
	];
	let r = e.match(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
	return r ? [
		Number(r[1]),
		Number(r[2]),
		Number(r[3])
	] : null;
}
function Ve(e, t, n) {
	let [r, i, a] = [
		e,
		t,
		n
	].map((e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * r + .7152 * i + .0722 * a;
}
//#endregion
//#region src/composables/useTheme.ts
var U = {
	accent: "#9064ff",
	base: "#1b1e26"
}, W = "bearded-ui-theme";
function He() {
	try {
		let e = JSON.parse(localStorage.getItem(W) ?? "null");
		return e?.accent && e?.base ? e : U;
	} catch {
		return U;
	}
}
var G = b(U), K = r(() => H(G.value.base) ? "light" : "dark"), q = !1;
function J() {
	return Ue(), {
		palette: G,
		theme: K
	};
}
function Ue() {
	q || typeof document > "u" || (q = !0, G.value = He(), re(() => {
		let e = document.documentElement;
		e.dataset.theme = K.value, e.style.setProperty("--bd-palette-base", G.value.base), e.style.setProperty("--bd-palette-accent", G.value.accent), e.style.setProperty("--bd-on-primary", H(G.value.accent) ? "#111" : "#fff"), localStorage.setItem(W, JSON.stringify(G.value));
	}));
}
//#endregion
//#region src/themePresets.ts
var Y = [
	{
		...U,
		group: "dark",
		name: "Bearded"
	},
	{
		accent: "#0074ba",
		base: "#061628",
		group: "dark",
		name: "Deep Ocean"
	},
	{
		accent: "#8343de",
		base: "#100a1c",
		group: "dark",
		name: "Midnight Purple"
	},
	{
		accent: "#289154",
		base: "#0e1412",
		group: "dark",
		name: "Forest Night"
	},
	{
		accent: "#21adae",
		base: "#131415",
		group: "dark",
		name: "Slate Storm"
	},
	{
		accent: "#be123c",
		base: "#1c1917",
		group: "dark",
		name: "Charcoal Rose"
	},
	{
		accent: "#59c4ff",
		base: "#1a2537",
		group: "dark",
		name: "Dark Teal"
	},
	{
		accent: "#c2410c",
		base: "#1a120b",
		group: "dark",
		name: "Espresso"
	},
	{
		accent: "#4338ca",
		base: "#0f172a",
		group: "dark",
		name: "Ink Blue"
	},
	{
		accent: "#047857",
		base: "#14181c",
		group: "dark",
		name: "Emerald Shadow"
	},
	{
		accent: "#1d4ed8",
		base: "#070910",
		group: "darker",
		name: "Abyss"
	},
	{
		accent: "#6d28d9",
		base: "#0a0710",
		group: "darker",
		name: "Void Black"
	},
	{
		accent: "#9a3412",
		base: "#0a0a0a",
		group: "darker",
		name: "Obsidian"
	},
	{
		accent: "#b91c1c",
		base: "#0c0404",
		group: "darker",
		name: "Pitch Ember"
	},
	{
		accent: "#047857",
		base: "#040d08",
		group: "darker",
		name: "Shadow Jade"
	},
	{
		accent: "#7e22ce",
		base: "#0c0813",
		group: "darker",
		name: "Onyx Violet"
	},
	{
		accent: "#71717a",
		base: "#0e0e10",
		group: "darker",
		name: "Carbon"
	},
	{
		accent: "#1e40af",
		base: "#020617",
		group: "darker",
		name: "Deep Space"
	},
	{
		accent: "#b45309",
		base: "#0c0a05",
		group: "darker",
		name: "Black Amber"
	},
	{
		accent: "#be185d",
		base: "#0a0507",
		group: "darker",
		name: "Noir Rose"
	},
	{
		accent: "#0369a1",
		base: "#f8fafc",
		group: "light",
		name: "Cloud White"
	},
	{
		accent: "#c2410c",
		base: "#fef3e2",
		group: "light",
		name: "Warm Cream"
	},
	{
		accent: "#047857",
		base: "#f0fdf4",
		group: "light",
		name: "Soft Mint"
	},
	{
		accent: "#7c3aed",
		base: "#f5f3ff",
		group: "light",
		name: "Lavender Mist"
	},
	{
		accent: "#dc2626",
		base: "#fef5f0",
		group: "light",
		name: "Peachy Beige"
	},
	{
		accent: "#075985",
		base: "#f0f9ff",
		group: "light",
		name: "Sky Breeze"
	},
	{
		accent: "#e11d48",
		base: "#fff1f2",
		group: "light",
		name: "Blush Ivory"
	},
	{
		accent: "#15803d",
		base: "#f7f9f5",
		group: "light",
		name: "Sage Linen"
	},
	{
		accent: "#4338ca",
		base: "#eef2ff",
		group: "light",
		name: "Pale Indigo"
	},
	{
		accent: "#4b5563",
		base: "#f9fafb",
		group: "light",
		name: "Pearl Gray"
	}
], We = { class: "bd-theme-picker" }, Ge = { class: "bd-theme-picker-inputs" }, Ke = { class: "bd-field" }, qe = { class: "bd-field-label bd-font-bold" }, Je = { class: "bd-theme-picker-control" }, Ye = ["value"], Xe = { class: "bd-field" }, Ze = { class: "bd-field-label bd-font-bold" }, Qe = { class: "bd-theme-picker-control" }, $e = ["value"], et = { class: "bd-theme-picker-grid" }, tt = ["aria-pressed", "onClick"], nt = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdThemePicker",
	props: {
		accentLabel: { default: "Accent" },
		baseLabel: { default: "Background" },
		presets: { default: () => Y }
	},
	setup(t) {
		let n = t, { palette: i } = J(), a = r(() => [...new Set(n.presets.map((e) => e.group))].map((e) => ({
			group: e,
			presets: n.presets.filter((t) => t.group === e)
		})));
		function l(e) {
			i.value = {
				accent: e.accent,
				base: e.base
			};
		}
		function u(e) {
			return i.value.base.toLowerCase() === e.base.toLowerCase() && i.value.accent.toLowerCase() === e.accent.toLowerCase();
		}
		function d(e, t) {
			i.value = {
				...i.value,
				[e]: t.target.value
			};
		}
		return (n, r) => (v(), o("div", We, [s("div", Ge, [s("label", Ke, [s("span", qe, w(t.baseLabel), 1), s("span", Je, [s("input", {
			value: E(i).base,
			type: "color",
			onInput: r[0] ||= (e) => d("base", e)
		}, null, 40, Ye), s("code", null, w(E(i).base), 1)])]), s("label", Xe, [s("span", Ze, w(t.accentLabel), 1), s("span", Qe, [s("input", {
			value: E(i).accent,
			type: "color",
			onInput: r[1] ||= (e) => d("accent", e)
		}, null, 40, $e), s("code", null, w(E(i).accent), 1)])])]), (v(!0), o(e, null, x(a.value, (t) => (v(), o("div", {
			key: t.group,
			class: "bd-theme-picker-group"
		}, [s("h3", null, w(t.group), 1), s("div", et, [(v(!0), o(e, null, x(t.presets, (e) => (v(), o("button", {
			key: e.name,
			"aria-pressed": u(e),
			class: "bd-theme-picker-card bd-squircle",
			type: "button",
			onClick: (t) => l(e)
		}, [s("span", {
			class: "bd-theme-picker-swatch bd-squircle",
			style: g({ background: e.base })
		}, [s("span", { style: g({ background: e.accent }) }, null, 4)], 4), c(" " + w(e.name), 1)], 8, tt))), 128))])]))), 128))]));
	}
}), [["__scopeId", "data-v-f56bcc72"]]), X = b([]), rt = 0;
function Z(e) {
	X.value = X.value.filter((t) => t.id !== e);
}
function Q(e, t = {}) {
	let { duration: n = 4e3, variant: r = "default" } = t, i = rt++;
	return X.value = [...X.value, {
		id: i,
		msg: e,
		variant: r
	}], n > 0 && setTimeout(() => Z(i), n), i;
}
function $() {
	return {
		dismissToast: Z,
		toast: Q,
		toasts: X
	};
}
//#endregion
//#region src/components/BdToaster.vue?vue&type=script&setup=true&lang.ts
var it = ["onClick"], at = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdToaster",
	props: { position: { default: "bottom-right" } },
	setup(r) {
		let a = r, { dismissToast: s, toasts: c } = $();
		return (r, u) => (v(), i(t, { to: "body" }, [l(n, {
			class: h(["bd-toaster", `bd-toaster-${a.position}`]),
			name: "bd-toast",
			tag: "div"
		}, {
			default: A(() => [(v(!0), o(e, null, x(E(c), (e) => (v(), o("button", {
				key: e.id,
				"aria-live": "polite",
				class: h(["bd-toast bd-font-bold bd-squircle", `bd-state-${e.variant}`]),
				type: "button",
				onClick: (t) => E(s)(e.id)
			}, w(e.msg), 11, it))), 128))]),
			_: 1
		}, 8, ["class"])]));
	}
}), [["__scopeId", "data-v-eaee107b"]]), ot = ["aria-describedby"], st = ["id"], ct = 12, lt = /*#__PURE__*/ N(/* @__PURE__ */ u({
	__name: "BdTooltip",
	props: {
		content: { default: "" },
		delay: { default: 150 },
		disabled: { type: Boolean },
		follow: { default: void 0 },
		offset: { default: 8 },
		side: { default: "top" }
	},
	setup(e) {
		let t = e, n = b(), r = b(), i = D(), a = b(!1), l, u = {
			x: 0,
			y: 0
		};
		function d() {
			let e = r.value, i = n.value;
			if (!e || !i) return;
			let a = f(i), { left: o, placement: s, top: c } = z(a, e, {
				align: "center",
				offset: t.offset,
				side: t.side
			}), l = s === "top" || s === "bottom", u = l ? a.left + a.width / 2 - o : a.top + a.height / 2 - c, d = l ? e.offsetWidth : e.offsetHeight;
			e.style.setProperty("--arrow-offset", `${Math.min(Math.max(u, ct), d - ct)}px`);
		}
		function f(e) {
			let n = e.getBoundingClientRect();
			if (!t.follow) return n;
			let r = t.follow !== "y", i = t.follow !== "x";
			return new DOMRect(r ? u.x : n.left, i ? u.y : n.top, r ? 0 : n.width, i ? 0 : n.height);
		}
		let p = V(d), h = B(d);
		function g() {
			clearTimeout(l);
			let e = r.value;
			a.value = !1, e?.matches(":popover-open") && e.hidePopover(), p.stop();
		}
		function y(e) {
			u.x = e.clientX, u.y = e.clientY, t.follow && a.value && h();
		}
		function x(e) {
			e instanceof MouseEvent && y(e), clearTimeout(l), l = setTimeout(C, t.delay);
		}
		async function C() {
			let e = r.value;
			!e || t.disabled || !t.content && !e.textContent?.trim() || (a.value = !0, e.matches(":popover-open") || e.showPopover(), await m(), d(), p.start());
		}
		return _(() => {
			clearTimeout(l), p.stop();
		}), (t, l) => (v(), o("span", {
			ref_key: "triggerEl",
			ref: n,
			"aria-describedby": a.value ? E(i) : void 0,
			class: "bd-tooltip-trigger",
			onFocusin: x,
			onFocusout: g,
			onKeydown: ie(g, ["escape"]),
			onMouseenter: x,
			onMouseleave: g,
			onMousemove: y
		}, [S(t.$slots, "default", {}, void 0, !0), s("div", {
			id: E(i),
			ref_key: "panelEl",
			ref: r,
			class: "bd-tooltip bd-squircle bd-anim-popover",
			popover: "manual",
			role: "tooltip"
		}, [S(t.$slots, "content", {}, () => [c(w(e.content), 1)], !0)], 8, st)], 40, ot));
	}
}), [["__scopeId", "data-v-9eb98cad"]]);
//#endregion
export { oe as BdBadge, L as BdButton, se as BdButtonGroup, le as BdCard, pe as BdCheckbox, ve as BdDialog, Te as BdDropdown, Oe as BdDropdownItem, Me as BdInput, P as BdLoader, ze as BdSelect, nt as BdThemePicker, at as BdToaster, lt as BdTooltip, U as bdDefaultPalette, Y as bdPresets, Z as dismissToast, H as isLightColor, Q as toast, J as useTheme, $ as useToast };
