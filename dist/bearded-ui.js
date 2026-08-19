import { Fragment as e, Teleport as t, TransitionGroup as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, inject as d, mergeModels as f, mergeProps as p, nextTick as m, normalizeClass as h, normalizeStyle as g, onBeforeUnmount as _, onMounted as v, openBlock as y, provide as b, ref as x, renderList as S, renderSlot as C, resolveDynamicComponent as w, toDisplayString as T, toRef as E, unref as D, useId as O, useModel as k, vModelCheckbox as ee, vModelDynamic as te, vModelSelect as ne, watch as A, watchEffect as re, withCtx as j, withDirectives as M, withKeys as ie } from "vue";
import { PhCaretDown as N, PhX as ae } from "@phosphor-icons/vue";
//#region src/components/BdBadge.vue?vue&type=script&setup=true&lang.ts
var oe = /*@__PURE__*/ u({
	__name: "BdBadge",
	props: { variant: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (y(), o("span", { class: h(["bd-badge bd-font-bold bd-squircle", `bd-state-${t.variant}`]) }, [C(e.$slots, "default", {}, void 0, !0)], 2));
	}
}), P = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, se = /*#__PURE__*/ P(oe, [["__scopeId", "data-v-f4bfdac3"]]), F = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdLoader",
	props: { size: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (y(), o("span", {
			"aria-label": "Loading",
			class: h(["bd-loader", t.size === "default" ? "" : `bd-loader-${t.size}`]),
			role: "status"
		}, null, 2));
	}
}), [["__scopeId", "data-v-65a28fad"]]), I = Symbol("bdDropdownClose"), L = Symbol("bdSize"), R = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		let t = e, n = d(L, void 0), o = r(() => t.size ?? n?.value ?? "default"), s = r(() => t.as ? t.as : t.to ? "router-link" : t.href ? "a" : "button"), c = r(() => s.value === "router-link" ? { to: t.to } : s.value === "a" ? {
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
		return (t, n) => (y(), i(w(s.value), p({ class: ["bd-button bd-font-bold bd-squircle", l.value] }, c.value), {
			default: j(() => [e.loading ? (y(), i(F, {
				key: 0,
				size: o.value === "x-small" ? "xx-small" : "x-small"
			}, null, 8, ["size"])) : a("", !0), C(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, ["class"]));
	}
}), [["__scopeId", "data-v-94956cde"]]), z = 8, ce = 120, le = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function ue(e, t, n = {}) {
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
	}, d = s === "top" || s === "bottom", f = le[s], p = (d ? l.height : l.width) + o + z, m = u[s] >= p || u[s] >= u[f] ? s : f, h = Math.max(u[m] - o - z, ce), g = Math.min(d ? l.height : l.width, h), _ = m === "top" || m === "left" ? (d ? c.top : c.left) - o - g : (d ? c.bottom : c.right) + o, v = d ? c.left : c.top, y = d ? c.right : c.bottom, b = d ? l.width : l.height, x = d ? window.innerWidth : window.innerHeight, S = r === "end" ? y - b : r === "center" ? v + (y - v - b) / 2 : v, C = Math.min(Math.max(z, S), Math.max(z, x - b - z)), w = d ? _ : C, T = d ? C : _;
	return t.style.top = `${w}px`, t.style.left = `${T}px`, i && (t.style[d ? "maxHeight" : "maxWidth"] = `${h}px`), t.dataset.placement = m, {
		left: T,
		placement: m,
		top: w
	};
}
function de(e) {
	let t = !1;
	return () => {
		t || (t = !0, requestAnimationFrame(() => {
			t = !1, e();
		}));
	};
}
function B(e) {
	let t = de(e);
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
//#region src/components/BdTooltip.vue?vue&type=script&setup=true&lang.ts
var fe = ["aria-describedby"], pe = ["id"], V = 12, H = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		let t = e, n = x(), r = x(), i = O(), a = x(!1), l, u = {
			x: 0,
			y: 0
		};
		function d() {
			let e = r.value, i = n.value;
			if (!e || !i) return;
			let a = f(i), { left: o, placement: s, top: c } = ue(a, e, {
				align: "center",
				offset: t.offset,
				side: t.side
			}), l = s === "top" || s === "bottom", u = l ? a.left + a.width / 2 - o : a.top + a.height / 2 - c, d = l ? e.offsetWidth : e.offsetHeight;
			e.style.setProperty("--arrow-offset", `${Math.min(Math.max(u, V), d - V)}px`);
		}
		function f(e) {
			let n = e.getBoundingClientRect();
			if (!t.follow) return n;
			let r = t.follow !== "y", i = t.follow !== "x";
			return new DOMRect(r ? u.x : n.left, i ? u.y : n.top, r ? 0 : n.width, i ? 0 : n.height);
		}
		let p = B(d), h = de(d);
		function g() {
			clearTimeout(l);
			let e = r.value;
			a.value = !1, e?.matches(":popover-open") && e.hidePopover(), p.stop();
		}
		function v(e) {
			u.x = e.clientX, u.y = e.clientY, t.follow && a.value && h();
		}
		function b(e) {
			e instanceof MouseEvent && v(e), clearTimeout(l), l = setTimeout(S, t.delay);
		}
		async function S() {
			let e = r.value;
			!e || t.disabled || !t.content && !e.textContent?.trim() || (a.value = !0, e.matches(":popover-open") || e.showPopover(), await m(), d(), p.start());
		}
		return _(() => {
			clearTimeout(l), p.stop();
		}), (t, l) => (y(), o("span", {
			ref_key: "triggerEl",
			ref: n,
			"aria-describedby": a.value ? D(i) : void 0,
			class: "bd-tooltip-trigger",
			onFocusin: b,
			onFocusout: g,
			onKeydown: ie(g, ["escape"]),
			onMouseenter: b,
			onMouseleave: g,
			onMousemove: v
		}, [C(t.$slots, "default", {}, void 0, !0), s("div", {
			id: D(i),
			ref_key: "panelEl",
			ref: r,
			class: "bd-tooltip bd-squircle bd-anim-popover",
			popover: "manual",
			role: "tooltip"
		}, [C(t.$slots, "content", {}, () => [c(T(e.content), 1)], !0)], 8, pe)], 40, fe));
	}
}), [["__scopeId", "data-v-9eb98cad"]]), me = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		let n = t, r = k(t, "modelValue");
		return b(L, E(n, "size")), (n, a) => (y(), o("div", {
			class: h(["bd-button-group", { "bd-button-group-full": t.full }]),
			role: "group"
		}, [C(n.$slots, "default", {}, () => [(y(!0), o(e, null, S(t.options, (e) => (y(), i(H, {
			key: e.value,
			content: e.tooltip
		}, {
			default: j(() => [l(R, {
				disabled: t.disabled,
				size: t.size,
				variant: e.value === r.value ? "primary" : "default",
				onClick: (t) => r.value = e.value
			}, {
				default: j(() => [c(T(e.label), 1)]),
				_: 2
			}, 1032, [
				"disabled",
				"size",
				"variant",
				"onClick"
			])]),
			_: 2
		}, 1032, ["content"]))), 128))], !0)], 2));
	}
}), [["__scopeId", "data-v-fa061e38"]]), he = {
	key: 0,
	class: "bd-card-header bd-font-bold"
}, ge = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdCard",
	props: { padding: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (y(), o("section", { class: h(["bd-card bd-surface bd-squircle", t.padding === "default" ? "" : `bd-card-${t.padding}`]) }, [e.$slots.header ? (y(), o("header", he, [C(e.$slots, "header", {}, void 0, !0)])) : a("", !0), C(e.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-57c01e05"]]), _e = {
	key: 0,
	class: "bd-checkbox-label"
}, ve = { class: "bd-checkbox-switch" }, ye = ["disabled"], be = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		let t = k(e, "modelValue");
		return (n, r) => (y(), o("label", { class: h(["bd-checkbox", {
			"bd-checkbox-full": e.fullWidth,
			"is-disabled": e.disabled
		}]) }, [e.label || n.$slots.default ? (y(), o("span", _e, [C(n.$slots, "default", {}, () => [c(T(e.label), 1)], !0)])) : a("", !0), s("span", ve, [
			M(s("input", {
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e,
				class: "bd-checkbox-input",
				disabled: e.disabled,
				type: "checkbox"
			}, null, 8, ye), [[ee, t.value]]),
			r[1] ||= s("span", { class: "bd-checkbox-track bd-squircle" }, null, -1),
			r[2] ||= s("span", { class: "bd-checkbox-knob bd-squircle" }, null, -1)
		])], 2));
	}
}), [["__scopeId", "data-v-c8dd0e95"]]), xe = {
	key: 0,
	class: "bd-dialog-header"
}, Se = { class: "bd-dialog-heading" }, Ce = {
	key: 0,
	class: "bd-dialog-title"
}, we = ["title"], Te = {
	key: 0,
	class: "bd-dialog-actions"
}, Ee = { class: "bd-dialog-body" }, De = {
	key: 1,
	class: "bd-dialog-footer"
}, U = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdDialog",
	props: /*@__PURE__*/ f({
		hideClose: {
			type: Boolean,
			default: !1
		},
		padding: { default: "default" },
		persistent: {
			type: Boolean,
			default: !1
		},
		size: { default: "default" },
		subtitle: { default: void 0 },
		title: { default: void 0 }
	}, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = e, n = k(e, "modelValue"), r = x();
		A(n, (e) => {
			r.value && (e ? r.value.showModal() : r.value.close());
		}), v(() => {
			n.value && r.value?.showModal();
		});
		function i(e) {
			let t = r.value?.getBoundingClientRect();
			return t ? e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom : !1;
		}
		let c = !1;
		function u(e) {
			let r = e.detail > 0;
			!t.persistent && r && c && i(e) && (n.value = !1), c = !1;
		}
		function d(e) {
			c = i(e);
		}
		return (i, c) => (y(), o("dialog", {
			ref_key: "el",
			ref: r,
			class: h(["bd-dialog bd-surface bd-squircle bd-anim-dialog", [t.size === "default" ? "" : `bd-dialog-${t.size}`, t.padding === "default" ? "" : `bd-dialog-padding-${t.padding}`]]),
			onClick: u,
			onClose: c[1] ||= (e) => n.value = !1,
			onMousedown: d
		}, [
			e.title || e.subtitle || i.$slots.header || i.$slots.actions || !e.hideClose ? (y(), o("header", xe, [C(i.$slots, "header", {}, () => [s("div", Se, [e.title ? (y(), o("h2", Ce, T(e.title), 1)) : a("", !0), e.subtitle ? (y(), o("p", {
				key: 1,
				class: "bd-dialog-subtitle",
				title: e.subtitle
			}, T(e.subtitle), 9, we)) : a("", !0)])], !0), i.$slots.actions || !e.hideClose ? (y(), o("div", Te, [C(i.$slots, "actions", {}, void 0, !0), e.hideClose ? a("", !0) : (y(), o("button", {
				key: 0,
				"aria-label": "Close",
				class: "bd-dialog-close",
				type: "button",
				onClick: c[0] ||= (e) => n.value = !1
			}, [l(D(ae), {
				"aria-hidden": "true",
				size: "1em",
				weight: "bold"
			})]))])) : a("", !0)])) : a("", !0),
			s("div", Ee, [C(i.$slots, "default", {}, void 0, !0)]),
			i.$slots.footer ? (y(), o("footer", De, [C(i.$slots, "footer", {}, void 0, !0)])) : a("", !0)
		], 34));
	}
}), [["__scopeId", "data-v-29ccc224"]]), Oe = /* @__PURE__ */ u({
	__name: "BdConfirmDialog",
	props: /*@__PURE__*/ f({
		cancelLabel: { default: "Cancel" },
		confirmLabel: { default: "Confirm" },
		danger: {
			type: Boolean,
			default: !1
		},
		message: { default: void 0 },
		title: { default: void 0 }
	}, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ f(["cancel", "confirm"], ["update:modelValue"]),
	setup(e, { emit: t }) {
		let n = t, r = k(e, "modelValue");
		function a() {
			r.value = !1, n("cancel");
		}
		function o() {
			r.value = !1, n("confirm");
		}
		return (t, n) => (y(), i(U, {
			"model-value": r.value,
			size: "small",
			title: e.title,
			"onUpdate:modelValue": n[0] ||= (e) => !e && a()
		}, {
			footer: j(() => [l(R, {
				variant: "border",
				onClick: a
			}, {
				default: j(() => [c(T(e.cancelLabel), 1)]),
				_: 1
			}), l(R, {
				variant: e.danger ? "danger" : "primary",
				onClick: o
			}, {
				default: j(() => [c(T(e.confirmLabel), 1)]),
				_: 1
			}, 8, ["variant"])]),
			default: j(() => [C(t.$slots, "default", {}, () => [c(T(e.message), 1)])]),
			_: 3
		}, 8, ["model-value", "title"]));
	}
}), ke = { class: "bd-dropdown" }, Ae = ["aria-controls", "aria-expanded"], je = ["id"], Me = 767, Ne = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		let t = e, n = k(e, "modelValue"), r = x(), i = x(), a = O();
		function u() {
			return t.sheetOnMobile && window.innerWidth <= Me;
		}
		function d() {
			let e = i.value, n = r.value;
			if (!e || !n) return;
			if (u()) {
				e.style.cssText = "", e.dataset.placement = "sheet";
				return;
			}
			let [a, o] = t.placement.split("-");
			ue(n, e, {
				align: o,
				constrain: !0,
				matchWidth: t.matchWidth,
				offset: t.offset,
				side: a
			});
		}
		let f = B(d);
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
		function v() {
			t.disabled || (n.value = !n.value);
		}
		return A(n, async (e) => {
			let t = i.value;
			t && (e ? (t.matches(":popover-open") || t.showPopover(), await m(), d(), f.start()) : (t.matches(":popover-open") && t.hidePopover(), f.stop()));
		}), _(f.stop), b(I, p), b(L, E(t, "size")), (t, u) => (y(), o("div", ke, [s("span", {
			ref_key: "triggerEl",
			ref: r,
			"aria-controls": D(a),
			"aria-expanded": n.value,
			"aria-haspopup": "menu",
			class: "bd-dropdown-trigger",
			onClick: v
		}, [C(t.$slots, "trigger", {
			open: n.value,
			toggle: v
		}, () => [l(R, { disabled: e.disabled }, {
			default: j(() => [c(T(e.label) + " ", 1), l(D(N), {
				class: "bd-dropdown-caret",
				size: "1.1em",
				weight: "bold"
			})]),
			_: 1
		}, 8, ["disabled"])], !0)], 8, Ae), s("div", {
			id: D(a),
			ref_key: "panelEl",
			ref: i,
			class: h(["bd-dropdown-panel bd-surface bd-squircle bd-anim-popover", { "bd-anim-popover-sheet": e.sheetOnMobile }]),
			popover: "auto",
			role: "menu",
			onKeydown: g,
			onToggle: u[0] ||= (e) => n.value = e.newState === "open"
		}, [C(t.$slots, "default", { close: p }, void 0, !0)], 42, je)]));
	}
}), [["__scopeId", "data-v-dcc3adb1"]]), Pe = ["disabled"], Fe = {
	key: 0,
	class: "bd-dropdown-item-icon"
}, Ie = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdDropdownItem",
	props: {
		active: { type: Boolean },
		danger: { type: Boolean },
		disabled: { type: Boolean },
		icon: {},
		keepOpen: { type: Boolean }
	},
	setup(e) {
		let t = e, n = d(I, () => {});
		function r() {
			t.keepOpen || n();
		}
		return (t, n) => (y(), o("button", {
			class: h(["bd-dropdown-item bd-squircle", {
				"is-active": e.active,
				"is-danger": e.danger
			}]),
			disabled: e.disabled,
			role: "menuitem",
			type: "button",
			onClick: r
		}, [e.icon || t.$slots.icon ? (y(), o("span", Fe, [C(t.$slots, "icon", {}, () => [(y(), i(w(e.icon), {
			size: "1.2em",
			weight: "bold"
		}))], !0)])) : a("", !0), C(t.$slots, "default", {}, void 0, !0)], 10, Pe));
	}
}), [["__scopeId", "data-v-4877e0ac"]]), Le = ["for"], Re = { class: "bd-field-control" }, ze = {
	key: 0,
	class: "bd-field-prefix"
}, Be = [
	"id",
	"disabled",
	"placeholder",
	"type"
], Ve = {
	key: 1,
	class: "bd-field-note"
}, He = /*#__PURE__*/ P(/* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "BdInput",
	props: /*@__PURE__*/ f({
		disabled: { type: Boolean },
		error: { type: [Boolean, String] },
		hint: {},
		label: {},
		placeholder: {},
		size: { default: "default" },
		type: { default: "text" },
		variant: { default: "default" }
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e, { expose: t }) {
		let n = e, r = k(e, "modelValue"), i = O(), c = x();
		return t({
			focus: () => c.value?.focus(),
			select: () => c.value?.select()
		}), (t, l) => (y(), o("div", { class: h(["bd-field", { "has-error": e.error }]) }, [
			e.label ? (y(), o("label", {
				key: 0,
				class: "bd-field-label bd-font-bold",
				for: D(i)
			}, T(e.label), 9, Le)) : a("", !0),
			s("div", Re, [t.$slots.prefix ? (y(), o("span", ze, [C(t.$slots, "prefix", {}, void 0, !0)])) : a("", !0), M(s("input", p({
				id: D(i),
				ref_key: "el",
				ref: c,
				"onUpdate:modelValue": l[0] ||= (e) => r.value = e,
				class: ["bd-field-input", [
					n.variant === "default" ? "" : `bd-field-input-${n.variant}`,
					n.size === "default" ? "" : `bd-field-input-${n.size}`,
					{ "has-prefix": t.$slots.prefix }
				]],
				disabled: e.disabled,
				placeholder: e.placeholder,
				type: e.type
			}, t.$attrs), null, 16, Be), [[te, r.value]])]),
			typeof e.error == "string" || e.hint ? (y(), o("small", Ve, T(e.error || e.hint), 1)) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-d0ded8d5"]]), Ue = { class: "bd-field" }, We = ["for"], Ge = { class: "bd-select" }, Ke = ["id", "disabled"], qe = {
	key: 0,
	disabled: "",
	value: ""
}, Je = ["value"], Ye = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		let n = k(t, "modelValue"), r = O();
		return (i, c) => (y(), o("div", Ue, [t.label ? (y(), o("label", {
			key: 0,
			class: "bd-field-label bd-font-bold",
			for: D(r)
		}, T(t.label), 9, We)) : a("", !0), s("div", Ge, [M(s("select", {
			id: D(r),
			"onUpdate:modelValue": c[0] ||= (e) => n.value = e,
			class: "bd-select-control bd-font-bold",
			disabled: t.disabled
		}, [t.placeholder ? (y(), o("option", qe, T(t.placeholder), 1)) : a("", !0), (y(!0), o(e, null, S(t.options, (e) => (y(), o("option", {
			key: e.value,
			value: e.value
		}, T(e.label), 9, Je))), 128))], 8, Ke), [[ne, n.value]]), l(D(N), {
			"aria-hidden": "true",
			class: "bd-select-arrow",
			size: "1.1em",
			weight: "bold"
		})])]));
	}
}), [["__scopeId", "data-v-9795c46d"]]);
//#endregion
//#region src/utils/color.ts
function W(e) {
	let t = Xe(e);
	return !t || Ze(...t) > .4;
}
function Xe(e) {
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
function Ze(e, t, n) {
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
var G = {
	accent: "#9064ff",
	base: "#16181d"
}, K = "bearded-ui-theme";
function Qe() {
	try {
		let e = JSON.parse(localStorage.getItem(K) ?? "null");
		return e?.accent && e?.base ? e : G;
	} catch {
		return G;
	}
}
var q = x(G), J = r(() => W(q.value.base) ? "light" : "dark"), Y = !1;
function X() {
	return $e(), {
		palette: q,
		theme: J
	};
}
function $e() {
	Y || typeof document > "u" || (Y = !0, q.value = Qe(), re(() => {
		let e = document.documentElement;
		e.dataset.theme = J.value, e.style.setProperty("--bd-palette-base", q.value.base), e.style.setProperty("--bd-palette-accent", q.value.accent), e.style.setProperty("--bd-on-primary", W(q.value.accent) ? "#111" : "#fff"), localStorage.setItem(K, JSON.stringify(q.value));
	}));
}
//#endregion
//#region src/themePresets.ts
var Z = [
	{
		...G,
		group: "dark",
		name: "Bearded"
	},
	{
		accent: "#0574b7",
		base: "#031727",
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
		accent: "#51c6fc",
		base: "#102834",
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
		base: "#13162a",
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
		base: "#060910",
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
		accent: "#0469a0",
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
		accent: "#015a83",
		base: "#f1f9fe",
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
		accent: "#1344cc",
		base: "#ecf3ff",
		group: "light",
		name: "Pale Indigo"
	},
	{
		accent: "#4b5563",
		base: "#f9fafb",
		group: "light",
		name: "Pearl Gray"
	}
], et = { class: "bd-theme-picker" }, tt = { class: "bd-theme-picker-inputs" }, nt = { class: "bd-field" }, rt = { class: "bd-field-label bd-font-bold" }, it = { class: "bd-theme-picker-control" }, at = ["value"], ot = { class: "bd-field" }, st = { class: "bd-field-label bd-font-bold" }, ct = { class: "bd-theme-picker-control" }, lt = ["value"], ut = { class: "bd-theme-picker-grid" }, dt = ["aria-pressed", "onClick"], ft = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdThemePicker",
	props: {
		accentLabel: { default: "Accent" },
		baseLabel: { default: "Background" },
		presets: { default: () => Z }
	},
	setup(t) {
		let n = t, { palette: i } = X(), a = r(() => [...new Set(n.presets.map((e) => e.group))].map((e) => ({
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
		return (n, r) => (y(), o("div", et, [s("div", tt, [s("label", nt, [s("span", rt, T(t.baseLabel), 1), s("span", it, [s("input", {
			value: D(i).base,
			type: "color",
			onInput: r[0] ||= (e) => d("base", e)
		}, null, 40, at), s("code", null, T(D(i).base), 1)])]), s("label", ot, [s("span", st, T(t.accentLabel), 1), s("span", ct, [s("input", {
			value: D(i).accent,
			type: "color",
			onInput: r[1] ||= (e) => d("accent", e)
		}, null, 40, lt), s("code", null, T(D(i).accent), 1)])])]), (y(!0), o(e, null, S(a.value, (t) => (y(), o("div", {
			key: t.group,
			class: "bd-theme-picker-group"
		}, [s("h3", null, T(t.group), 1), s("div", ut, [(y(!0), o(e, null, S(t.presets, (e) => (y(), o("button", {
			key: e.name,
			"aria-pressed": u(e),
			class: "bd-theme-picker-card bd-squircle",
			type: "button",
			onClick: (t) => l(e)
		}, [s("span", {
			class: "bd-theme-picker-swatch bd-squircle",
			style: g({ background: e.base })
		}, [s("span", { style: g({ background: e.accent }) }, null, 4)], 4), c(" " + T(e.name), 1)], 8, dt))), 128))])]))), 128))]));
	}
}), [["__scopeId", "data-v-f56bcc72"]]), Q = x([]), pt = 0;
function $(e) {
	Q.value = Q.value.filter((t) => t.id !== e);
}
function mt(e, t = {}) {
	let { duration: n = 4e3, variant: r = "default" } = t, i = pt++;
	return Q.value = [...Q.value, {
		id: i,
		msg: e,
		variant: r
	}], n > 0 && setTimeout(() => $(i), n), i;
}
function ht() {
	return {
		dismissToast: $,
		toast: mt,
		toasts: Q
	};
}
//#endregion
//#region src/components/BdToaster.vue?vue&type=script&setup=true&lang.ts
var gt = ["onClick"], _t = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdToaster",
	props: { position: { default: "bottom-right" } },
	setup(r) {
		let a = r, { dismissToast: s, toasts: c } = ht();
		return (r, u) => (y(), i(t, { to: "body" }, [l(n, {
			class: h(["bd-toaster", `bd-toaster-${a.position}`]),
			name: "bd-toast",
			tag: "div"
		}, {
			default: j(() => [(y(!0), o(e, null, S(D(c), (e) => (y(), o("button", {
				key: e.id,
				"aria-live": "polite",
				class: h(["bd-toast bd-font-bold bd-squircle", `bd-state-${e.variant}`]),
				type: "button",
				onClick: (t) => D(s)(e.id)
			}, T(e.msg), 11, gt))), 128))]),
			_: 1
		}, 8, ["class"])]));
	}
}), [["__scopeId", "data-v-eaee107b"]]);
//#endregion
export { se as BdBadge, R as BdButton, me as BdButtonGroup, ge as BdCard, be as BdCheckbox, Oe as BdConfirmDialog, U as BdDialog, Ne as BdDropdown, Ie as BdDropdownItem, He as BdInput, F as BdLoader, Ye as BdSelect, ft as BdThemePicker, _t as BdToaster, H as BdTooltip, G as bdDefaultPalette, Z as bdPresets, $ as dismissToast, W as isLightColor, mt as toast, X as useTheme, ht as useToast };
