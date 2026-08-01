import { Fragment as e, Teleport as t, TransitionGroup as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, inject as d, mergeModels as f, mergeProps as p, nextTick as m, normalizeClass as h, onBeforeUnmount as g, openBlock as _, provide as v, ref as y, renderList as b, renderSlot as x, resolveDynamicComponent as S, toDisplayString as C, toRef as w, unref as T, useId as E, useModel as D, vModelCheckbox as ee, vModelDynamic as te, vModelSelect as ne, watch as O, watchEffect as re, withCtx as k, withDirectives as A, withKeys as ie } from "vue";
import { PhCaretDown as j } from "@phosphor-icons/vue";
//#region src/components/BdBadge.vue?vue&type=script&setup=true&lang.ts
var ae = /*@__PURE__*/ u({
	__name: "BdBadge",
	props: { variant: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (_(), o("span", { class: h(["bd-badge bd-font-bold bd-squircle", `bd-state-${t.variant}`]) }, [x(e.$slots, "default", {}, void 0, !0)], 2));
	}
}), M = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, oe = /*#__PURE__*/ M(ae, [["__scopeId", "data-v-f4bfdac3"]]), N = /*#__PURE__*/ M(/* @__PURE__ */ u({
	__name: "BdLoader",
	props: { size: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (_(), o("span", {
			"aria-label": "Loading",
			class: h(["bd-loader", t.size === "default" ? "" : `bd-loader-${t.size}`]),
			role: "status"
		}, null, 2));
	}
}), [["__scopeId", "data-v-65a28fad"]]), P = Symbol("bdDropdownClose"), F = Symbol("bdSize"), I = /*#__PURE__*/ M(/* @__PURE__ */ u({
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
		let t = e, n = d(F, void 0), o = r(() => t.size ?? n?.value ?? "default"), s = r(() => t.as ? t.as : t.to ? "router-link" : t.href ? "a" : "button"), c = r(() => s.value === "router-link" ? { to: t.to } : s.value === "a" ? {
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
		return (t, n) => (_(), i(S(s.value), p({ class: ["bd-button bd-font-bold bd-squircle", l.value] }, c.value), {
			default: k(() => [e.loading ? (_(), i(N, {
				key: 0,
				size: o.value === "x-small" ? "xx-small" : "x-small"
			}, null, 8, ["size"])) : a("", !0), x(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, ["class"]));
	}
}), [["__scopeId", "data-v-c7cfeaf2"]]), se = /*#__PURE__*/ M(/* @__PURE__ */ u({
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
		let n = t, r = D(t, "modelValue");
		return v(F, w(n, "size")), (n, a) => (_(), o("div", {
			class: h(["bd-button-group", { "bd-button-group-full": t.full }]),
			role: "group"
		}, [x(n.$slots, "default", {}, () => [(_(!0), o(e, null, b(t.options, (e) => (_(), i(I, {
			key: e.value,
			disabled: t.disabled,
			size: t.size,
			variant: e.value === r.value ? "primary" : "default",
			onClick: (t) => r.value = e.value
		}, {
			default: k(() => [c(C(e.label), 1)]),
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
}, le = /*#__PURE__*/ M(/* @__PURE__ */ u({
	__name: "BdCard",
	props: { padding: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (_(), o("section", { class: h(["bd-card bd-surface bd-squircle", t.padding === "default" ? "" : `bd-card-${t.padding}`]) }, [e.$slots.header ? (_(), o("header", ce, [x(e.$slots, "header", {}, void 0, !0)])) : a("", !0), x(e.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-57c01e05"]]), ue = {
	key: 0,
	class: "bd-checkbox-label"
}, de = { class: "bd-checkbox-switch" }, fe = ["disabled"], pe = /*#__PURE__*/ M(/* @__PURE__ */ u({
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
		let t = D(e, "modelValue");
		return (n, r) => (_(), o("label", { class: h(["bd-checkbox", {
			"bd-checkbox-full": e.fullWidth,
			"is-disabled": e.disabled
		}]) }, [e.label || n.$slots.default ? (_(), o("span", ue, [x(n.$slots, "default", {}, () => [c(C(e.label), 1)], !0)])) : a("", !0), s("span", de, [
			A(s("input", {
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
}, he = { class: "bd-dialog-title" }, L = { class: "bd-dialog-body" }, R = {
	key: 1,
	class: "bd-dialog-footer"
}, ge = /*#__PURE__*/ M(/* @__PURE__ */ u({
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
		let t = D(e, "modelValue"), n = y();
		return O(t, (e) => {
			n.value && (e ? n.value.showModal() : n.value.close());
		}), (r, i) => (_(), o("dialog", {
			ref_key: "el",
			ref: n,
			class: "bd-dialog bd-surface bd-squircle bd-anim-dialog",
			onClose: i[0] ||= (e) => t.value = !1
		}, [
			e.title || r.$slots.header ? (_(), o("header", me, [x(r.$slots, "header", {}, () => [s("h2", he, C(e.title), 1)], !0)])) : a("", !0),
			s("div", L, [x(r.$slots, "default", {}, void 0, !0)]),
			r.$slots.footer ? (_(), o("footer", R, [x(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
		], 544));
	}
}), [["__scopeId", "data-v-50a730e8"]]), z = 8, _e = 120, ve = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function B(e, t, n = {}) {
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
	}, d = s === "top" || s === "bottom", f = ve[s], p = (d ? l.height : l.width) + o + z, m = u[s] >= p || u[s] >= u[f] ? s : f, h = Math.max(u[m] - o - z, _e), g = Math.min(d ? l.height : l.width, h), _ = m === "top" || m === "left" ? (d ? c.top : c.left) - o - g : (d ? c.bottom : c.right) + o, v = d ? c.left : c.top, y = d ? c.right : c.bottom, b = d ? l.width : l.height, x = d ? window.innerWidth : window.innerHeight, S = r === "end" ? y - b : r === "center" ? v + (y - v - b) / 2 : v, C = Math.min(Math.max(z, S), Math.max(z, x - b - z)), w = d ? _ : C, T = d ? C : _;
	return t.style.top = `${w}px`, t.style.left = `${T}px`, i && (t.style[d ? "maxHeight" : "maxWidth"] = `${h}px`), t.dataset.placement = m, {
		left: T,
		placement: m,
		top: w
	};
}
function V(e) {
	let t = !1;
	return () => {
		t || (t = !0, requestAnimationFrame(() => {
			t = !1, e();
		}));
	};
}
function H(e) {
	let t = V(e);
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
var ye = { class: "bd-dropdown" }, be = ["aria-controls", "aria-expanded"], xe = ["id"], Se = 767, Ce = /*#__PURE__*/ M(/* @__PURE__ */ u({
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
		let t = e, n = D(e, "modelValue"), r = y(), i = y(), a = E();
		function u() {
			return t.sheetOnMobile && window.innerWidth <= Se;
		}
		function d() {
			let e = i.value, n = r.value;
			if (!e || !n) return;
			if (u()) {
				e.style.cssText = "", e.dataset.placement = "sheet";
				return;
			}
			let [a, o] = t.placement.split("-");
			B(n, e, {
				align: o,
				constrain: !0,
				matchWidth: t.matchWidth,
				offset: t.offset,
				side: a
			});
		}
		let f = H(d);
		function p() {
			n.value = !1;
		}
		function b(e) {
			if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
			let t = [...i.value?.querySelectorAll(".bd-dropdown-item:not(:disabled)") ?? []];
			if (t.length === 0) return;
			e.preventDefault();
			let n = t.indexOf(document.activeElement);
			t[((e.key === "ArrowDown" ? n + 1 : n - 1) + t.length) % t.length]?.focus();
		}
		function S() {
			t.disabled || (n.value = !n.value);
		}
		return O(n, async (e) => {
			let t = i.value;
			t && (e ? (t.matches(":popover-open") || t.showPopover(), await m(), d(), f.start()) : (t.matches(":popover-open") && t.hidePopover(), f.stop()));
		}), g(f.stop), v(P, p), v(F, w(t, "size")), (t, u) => (_(), o("div", ye, [s("span", {
			ref_key: "triggerEl",
			ref: r,
			"aria-controls": T(a),
			"aria-expanded": n.value,
			"aria-haspopup": "menu",
			class: "bd-dropdown-trigger",
			onClick: S
		}, [x(t.$slots, "trigger", {
			open: n.value,
			toggle: S
		}, () => [l(I, { disabled: e.disabled }, {
			default: k(() => [c(C(e.label) + " ", 1), l(T(j), {
				class: "bd-dropdown-caret",
				size: "1.1em",
				weight: "bold"
			})]),
			_: 1
		}, 8, ["disabled"])], !0)], 8, be), s("div", {
			id: T(a),
			ref_key: "panelEl",
			ref: i,
			class: h(["bd-dropdown-panel bd-surface bd-squircle bd-anim-popover", { "bd-anim-popover-sheet": e.sheetOnMobile }]),
			popover: "auto",
			role: "menu",
			onKeydown: b,
			onToggle: u[0] ||= (e) => n.value = e.newState === "open"
		}, [x(t.$slots, "default", { close: p }, void 0, !0)], 42, xe)]));
	}
}), [["__scopeId", "data-v-dcc3adb1"]]), we = ["disabled"], Te = {
	key: 0,
	class: "bd-dropdown-item-icon"
}, Ee = /*#__PURE__*/ M(/* @__PURE__ */ u({
	__name: "BdDropdownItem",
	props: {
		active: { type: Boolean },
		danger: { type: Boolean },
		disabled: { type: Boolean },
		icon: {},
		keepOpen: { type: Boolean }
	},
	setup(e) {
		let t = e, n = d(P, () => {});
		function r() {
			t.keepOpen || n();
		}
		return (t, n) => (_(), o("button", {
			class: h(["bd-dropdown-item bd-squircle", {
				"is-active": e.active,
				"is-danger": e.danger
			}]),
			disabled: e.disabled,
			role: "menuitem",
			type: "button",
			onClick: r
		}, [e.icon || t.$slots.icon ? (_(), o("span", Te, [x(t.$slots, "icon", {}, () => [(_(), i(S(e.icon), {
			size: "1.2em",
			weight: "bold"
		}))], !0)])) : a("", !0), x(t.$slots, "default", {}, void 0, !0)], 10, we));
	}
}), [["__scopeId", "data-v-4877e0ac"]]), De = ["for"], Oe = [
	"id",
	"disabled",
	"placeholder",
	"type"
], ke = {
	key: 1,
	class: "bd-field-note"
}, Ae = /*#__PURE__*/ M(/* @__PURE__ */ u({
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
		let t = D(e, "modelValue"), n = E();
		return (r, i) => (_(), o("div", { class: h(["bd-field", { "has-error": e.error }]) }, [
			e.label ? (_(), o("label", {
				key: 0,
				class: "bd-field-label bd-font-bold",
				for: T(n)
			}, C(e.label), 9, De)) : a("", !0),
			A(s("input", {
				id: T(n),
				"onUpdate:modelValue": i[0] ||= (e) => t.value = e,
				class: "bd-field-input",
				disabled: e.disabled,
				placeholder: e.placeholder,
				type: e.type
			}, null, 8, Oe), [[te, t.value]]),
			e.error || e.hint ? (_(), o("small", ke, C(e.error || e.hint), 1)) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-a22b02f8"]]), je = { class: "bd-field" }, Me = ["for"], Ne = { class: "bd-select" }, Pe = ["id", "disabled"], Fe = {
	key: 0,
	disabled: "",
	value: ""
}, Ie = ["value"], Le = /*#__PURE__*/ M(/* @__PURE__ */ u({
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
		let n = D(t, "modelValue"), r = E();
		return (i, c) => (_(), o("div", je, [t.label ? (_(), o("label", {
			key: 0,
			class: "bd-field-label bd-font-bold",
			for: T(r)
		}, C(t.label), 9, Me)) : a("", !0), s("div", Ne, [A(s("select", {
			id: T(r),
			"onUpdate:modelValue": c[0] ||= (e) => n.value = e,
			class: "bd-select-control bd-font-bold",
			disabled: t.disabled
		}, [t.placeholder ? (_(), o("option", Fe, C(t.placeholder), 1)) : a("", !0), (_(!0), o(e, null, b(t.options, (e) => (_(), o("option", {
			key: e.value,
			value: e.value
		}, C(e.label), 9, Ie))), 128))], 8, Pe), [[ne, n.value]]), l(T(j), {
			"aria-hidden": "true",
			class: "bd-select-arrow",
			size: "1.1em",
			weight: "bold"
		})])]));
	}
}), [["__scopeId", "data-v-9a91e932"]]), U = y([]), Re = 0;
function W(e) {
	U.value = U.value.filter((t) => t.id !== e);
}
function G(e, t = {}) {
	let { duration: n = 4e3, variant: r = "default" } = t, i = Re++;
	return U.value = [...U.value, {
		id: i,
		msg: e,
		variant: r
	}], n > 0 && setTimeout(() => W(i), n), i;
}
function K() {
	return {
		dismissToast: W,
		toast: G,
		toasts: U
	};
}
//#endregion
//#region src/components/BdToaster.vue?vue&type=script&setup=true&lang.ts
var ze = ["onClick"], Be = /*#__PURE__*/ M(/* @__PURE__ */ u({
	__name: "BdToaster",
	props: { position: { default: "bottom-right" } },
	setup(r) {
		let a = r, { dismissToast: s, toasts: c } = K();
		return (r, u) => (_(), i(t, { to: "body" }, [l(n, {
			class: h(["bd-toaster", `bd-toaster-${a.position}`]),
			name: "bd-toast",
			tag: "div"
		}, {
			default: k(() => [(_(!0), o(e, null, b(T(c), (e) => (_(), o("button", {
				key: e.id,
				"aria-live": "polite",
				class: h(["bd-toast bd-font-bold bd-squircle", `bd-state-${e.variant}`]),
				type: "button",
				onClick: (t) => T(s)(e.id)
			}, C(e.msg), 11, ze))), 128))]),
			_: 1
		}, 8, ["class"])]));
	}
}), [["__scopeId", "data-v-eaee107b"]]), Ve = ["aria-describedby"], He = ["id"], q = 12, J = /*#__PURE__*/ M(/* @__PURE__ */ u({
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
		let t = e, n = y(), r = y(), i = E(), a = y(!1), l, u = {
			x: 0,
			y: 0
		};
		function d() {
			let e = r.value, i = n.value;
			if (!e || !i) return;
			let a = f(i), { left: o, placement: s, top: c } = B(a, e, {
				align: "center",
				offset: t.offset,
				side: t.side
			}), l = s === "top" || s === "bottom", u = l ? a.left + a.width / 2 - o : a.top + a.height / 2 - c, d = l ? e.offsetWidth : e.offsetHeight;
			e.style.setProperty("--arrow-offset", `${Math.min(Math.max(u, q), d - q)}px`);
		}
		function f(e) {
			let n = e.getBoundingClientRect();
			if (!t.follow) return n;
			let r = t.follow !== "y", i = t.follow !== "x";
			return new DOMRect(r ? u.x : n.left, i ? u.y : n.top, r ? 0 : n.width, i ? 0 : n.height);
		}
		let p = H(d), h = V(d);
		function v() {
			clearTimeout(l);
			let e = r.value;
			a.value = !1, e?.matches(":popover-open") && e.hidePopover(), p.stop();
		}
		function b(e) {
			u.x = e.clientX, u.y = e.clientY, t.follow && a.value && h();
		}
		function S(e) {
			e instanceof MouseEvent && b(e), clearTimeout(l), l = setTimeout(w, t.delay);
		}
		async function w() {
			let e = r.value;
			!e || t.disabled || !t.content && !e.textContent?.trim() || (a.value = !0, e.matches(":popover-open") || e.showPopover(), await m(), d(), p.start());
		}
		return g(() => {
			clearTimeout(l), p.stop();
		}), (t, l) => (_(), o("span", {
			ref_key: "triggerEl",
			ref: n,
			"aria-describedby": a.value ? T(i) : void 0,
			class: "bd-tooltip-trigger",
			onFocusin: S,
			onFocusout: v,
			onKeydown: ie(v, ["escape"]),
			onMouseenter: S,
			onMouseleave: v,
			onMousemove: b
		}, [x(t.$slots, "default", {}, void 0, !0), s("div", {
			id: T(i),
			ref_key: "panelEl",
			ref: r,
			class: "bd-tooltip bd-squircle bd-anim-popover",
			popover: "manual",
			role: "tooltip"
		}, [x(t.$slots, "content", {}, () => [c(C(e.content), 1)], !0)], 8, He)], 40, Ve));
	}
}), [["__scopeId", "data-v-9eb98cad"]]), Ue = [
	"default",
	"blue",
	"crimson",
	"apple",
	"orange"
], Y = "bearded-ui-theme";
function X() {
	try {
		return JSON.parse(localStorage.getItem(Y) ?? "{}");
	} catch {
		return {};
	}
}
var Z = y(X().theme ?? "dark"), Q = y(X().scheme ?? "default"), $ = !1;
function We() {
	return Ge(), {
		scheme: Q,
		theme: Z,
		toggleTheme: () => {
			Z.value = Z.value === "dark" ? "light" : "dark";
		}
	};
}
function Ge() {
	$ || typeof document > "u" || ($ = !0, re(() => {
		let e = document.documentElement;
		e.dataset.theme = Z.value, e.dataset.scheme = Q.value, localStorage.setItem(Y, JSON.stringify({
			scheme: Q.value,
			theme: Z.value
		}));
	}));
}
//#endregion
export { oe as BdBadge, I as BdButton, se as BdButtonGroup, le as BdCard, pe as BdCheckbox, ge as BdDialog, Ce as BdDropdown, Ee as BdDropdownItem, Ae as BdInput, N as BdLoader, Le as BdSelect, Be as BdToaster, J as BdTooltip, Ue as bdSchemes, W as dismissToast, G as toast, We as useTheme, K as useToast };
