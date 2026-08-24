import { Fragment as e, Teleport as t, TransitionGroup as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, inject as d, mergeModels as f, mergeProps as p, nextTick as m, normalizeClass as h, normalizeStyle as g, onBeforeUnmount as _, onMounted as v, openBlock as y, provide as b, ref as x, renderList as S, renderSlot as C, resolveDynamicComponent as w, toDisplayString as T, toRef as E, unref as D, useAttrs as ee, useId as O, useModel as k, useSlots as te, vModelCheckbox as ne, vModelDynamic as re, vModelSelect as ie, watch as A, watchEffect as ae, withCtx as j, withDirectives as M, withKeys as oe } from "vue";
import { PhCaretDown as N, PhX as se } from "@phosphor-icons/vue";
//#region src/components/BdBadge.vue?vue&type=script&setup=true&lang.ts
var ce = /*@__PURE__*/ u({
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
}, le = /*#__PURE__*/ P(ce, [["__scopeId", "data-v-f4bfdac3"]]), F = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		active: { type: Boolean },
		align: { default: "center" },
		as: { default: void 0 },
		disabled: { type: Boolean },
		full: { type: Boolean },
		href: { default: void 0 },
		iconOnly: { type: Boolean },
		label: { default: void 0 },
		loading: { type: Boolean },
		size: { default: void 0 },
		target: { default: "_self" },
		to: { default: void 0 },
		type: { default: "button" },
		variant: { default: "default" }
	},
	setup(e) {
		let t = e;
		ee(), te();
		let n = d(L, void 0), o = r(() => t.size ?? n?.value ?? "default"), s = r(() => t.as ? t.as : t.to ? "router-link" : t.href ? "a" : "button"), c = r(() => s.value === "router-link" ? { to: t.to } : s.value === "a" ? {
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
				"is-active": t.active,
				"is-loading": t.loading
			}
		]);
		return (t, n) => (y(), i(w(s.value), p({
			"aria-label": e.label,
			"aria-pressed": e.active ? !0 : void 0,
			title: e.label,
			class: ["bd-button bd-font-bold bd-squircle", l.value]
		}, c.value), {
			default: j(() => [e.loading ? (y(), i(F, {
				key: 0,
				size: o.value === "x-small" ? "xx-small" : "x-small"
			}, null, 8, ["size"])) : a("", !0), C(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"aria-label",
			"aria-pressed",
			"title",
			"class"
		]));
	}
}), [["__scopeId", "data-v-b3b98cb7"]]), z = 8, ue = 120, de = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function B(e, t, n = {}) {
	let { align: r = "start", constrain: i = !1, matchWidth: a = !1, offset: o = 6, side: s = "bottom" } = n, c = {
		left: t.scrollLeft,
		top: t.scrollTop
	};
	t.style.maxHeight = "", t.style.maxWidth = "";
	let l = e instanceof HTMLElement ? e.getBoundingClientRect() : e;
	a && (t.style.minWidth = `${l.width}px`);
	let u = {
		height: t.offsetHeight,
		width: t.offsetWidth
	}, d = {
		bottom: window.innerHeight - l.bottom,
		left: l.left,
		right: window.innerWidth - l.right,
		top: l.top
	}, f = s === "top" || s === "bottom", p = de[s], m = (f ? u.height : u.width) + o + z, h = d[s] >= m || d[s] >= d[p] ? s : p, g = Math.max(d[h] - o - z, ue), _ = Math.min(f ? u.height : u.width, g), v = h === "top" || h === "left" ? (f ? l.top : l.left) - o - _ : (f ? l.bottom : l.right) + o, y = f ? l.left : l.top, b = f ? l.right : l.bottom, x = f ? u.width : u.height, S = f ? window.innerWidth : window.innerHeight, C = r === "end" ? b - x : r === "center" ? y + (b - y - x) / 2 : y, w = Math.min(Math.max(z, C), Math.max(z, S - x - z)), T = f ? v : w, E = f ? w : v;
	return t.style.top = `${T}px`, t.style.left = `${E}px`, i && (t.style[f ? "maxHeight" : "maxWidth"] = `${g}px`), t.dataset.placement = h, t.scrollLeft = c.left, t.scrollTop = c.top, {
		left: E,
		placement: h,
		top: T
	};
}
function fe(e) {
	let t = !1;
	return () => {
		t || (t = !0, requestAnimationFrame(() => {
			t = !1, e();
		}));
	};
}
function pe(e) {
	let t = fe(e);
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
var me = ["aria-describedby"], he = ["id"], ge = 12, V = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
			let a = f(i), { left: o, placement: s, top: c } = B(a, e, {
				align: "center",
				offset: t.offset,
				side: t.side
			}), l = s === "top" || s === "bottom", u = l ? a.left + a.width / 2 - o : a.top + a.height / 2 - c, d = l ? e.offsetWidth : e.offsetHeight;
			e.style.setProperty("--arrow-offset", `${Math.min(Math.max(u, ge), d - ge)}px`);
		}
		function f(e) {
			let n = e.getBoundingClientRect();
			if (!t.follow) return n;
			let r = t.follow !== "y", i = t.follow !== "x";
			return new DOMRect(r ? u.x : n.left, i ? u.y : n.top, r ? 0 : n.width, i ? 0 : n.height);
		}
		let p = pe(d), h = fe(d);
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
			onKeydown: oe(g, ["escape"]),
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
		}, [C(t.$slots, "content", {}, () => [c(T(e.content), 1)], !0)], 8, he)], 40, me));
	}
}), [["__scopeId", "data-v-9eb98cad"]]), _e = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		}, [C(n.$slots, "default", {}, () => [(y(!0), o(e, null, S(t.options, (e) => (y(), i(V, {
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
}), [["__scopeId", "data-v-e4863f6e"]]), ve = {
	key: 0,
	class: "bd-card-header bd-font-bold"
}, ye = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdCard",
	props: { padding: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (y(), o("section", { class: h(["bd-card bd-surface bd-squircle", t.padding === "default" ? "" : `bd-card-${t.padding}`]) }, [e.$slots.header ? (y(), o("header", ve, [C(e.$slots, "header", {}, void 0, !0)])) : a("", !0), C(e.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-57c01e05"]]), be = {
	key: 0,
	class: "bd-checkbox-label"
}, xe = { class: "bd-checkbox-switch" }, Se = ["disabled"], Ce = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		}]) }, [e.label || n.$slots.default ? (y(), o("span", be, [C(n.$slots, "default", {}, () => [c(T(e.label), 1)], !0)])) : a("", !0), s("span", xe, [
			M(s("input", {
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e,
				class: "bd-checkbox-input",
				disabled: e.disabled,
				type: "checkbox"
			}, null, 8, Se), [[ne, t.value]]),
			r[1] ||= s("span", { class: "bd-checkbox-track bd-squircle" }, null, -1),
			r[2] ||= s("span", { class: "bd-checkbox-knob bd-squircle" }, null, -1)
		])], 2));
	}
}), [["__scopeId", "data-v-c8dd0e95"]]), we = {
	key: 0,
	class: "bd-dialog-header"
}, Te = { class: "bd-dialog-heading" }, Ee = {
	key: 0,
	class: "bd-dialog-title"
}, De = ["title"], Oe = {
	key: 0,
	class: "bd-dialog-actions"
}, ke = { class: "bd-dialog-body" }, Ae = {
	key: 1,
	class: "bd-dialog-footer"
}, H = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
			e.title || e.subtitle || i.$slots.header || i.$slots.actions || !e.hideClose ? (y(), o("header", we, [C(i.$slots, "header", {}, () => [s("div", Te, [e.title ? (y(), o("h2", Ee, T(e.title), 1)) : a("", !0), e.subtitle ? (y(), o("p", {
				key: 1,
				class: "bd-dialog-subtitle",
				title: e.subtitle
			}, T(e.subtitle), 9, De)) : a("", !0)])], !0), i.$slots.actions || !e.hideClose ? (y(), o("div", Oe, [C(i.$slots, "actions", {}, void 0, !0), e.hideClose ? a("", !0) : (y(), o("button", {
				key: 0,
				"aria-label": "Close",
				class: "bd-dialog-close",
				type: "button",
				onClick: c[0] ||= (e) => n.value = !1
			}, [l(D(se), {
				"aria-hidden": "true",
				size: "1em",
				weight: "bold"
			})]))])) : a("", !0)])) : a("", !0),
			s("div", ke, [C(i.$slots, "default", {}, void 0, !0)]),
			i.$slots.footer ? (y(), o("footer", Ae, [C(i.$slots, "footer", {}, void 0, !0)])) : a("", !0)
		], 34));
	}
}), [["__scopeId", "data-v-29ccc224"]]), je = /* @__PURE__ */ u({
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
		return (t, n) => (y(), i(H, {
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
}), Me = { class: "bd-dropdown" }, Ne = ["aria-controls", "aria-expanded"], Pe = ["id"], Fe = 767, Ie = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
			return t.sheetOnMobile && window.innerWidth <= Fe;
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
		let f = pe(d);
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
		}), _(f.stop), b(I, p), b(L, E(t, "size")), (t, u) => (y(), o("div", Me, [s("span", {
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
		}, 8, ["disabled"])], !0)], 8, Ne), s("div", {
			id: D(a),
			ref_key: "panelEl",
			ref: i,
			class: h(["bd-dropdown-panel bd-surface bd-squircle bd-anim-popover", { "bd-anim-popover-sheet": e.sheetOnMobile }]),
			popover: "auto",
			role: "menu",
			onKeydown: g,
			onToggle: u[0] ||= (e) => n.value = e.newState === "open"
		}, [C(t.$slots, "default", { close: p }, void 0, !0)], 42, Pe)]));
	}
}), [["__scopeId", "data-v-dcc3adb1"]]), Le = ["disabled"], Re = {
	key: 0,
	class: "bd-dropdown-item-icon"
}, ze = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		}, [e.icon || t.$slots.icon ? (y(), o("span", Re, [C(t.$slots, "icon", {}, () => [(y(), i(w(e.icon), {
			size: "1.2em",
			weight: "bold"
		}))], !0)])) : a("", !0), C(t.$slots, "default", {}, void 0, !0)], 10, Le));
	}
}), [["__scopeId", "data-v-4877e0ac"]]), Be = { class: "bd-empty-state" }, Ve = {
	key: 0,
	class: "bd-empty-state-icon",
	"aria-hidden": "true"
}, He = { class: "bd-empty-state-title bd-font-bold" }, Ue = {
	key: 1,
	class: "bd-empty-state-message"
}, We = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdEmptyState",
	props: {
		actionLabel: {},
		message: {},
		title: {}
	},
	emits: ["action"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (y(), o("div", Be, [
			t.$slots.icon ? (y(), o("span", Ve, [C(t.$slots, "icon", {}, void 0, !0)])) : a("", !0),
			s("p", He, T(e.title), 1),
			e.message ? (y(), o("p", Ue, T(e.message), 1)) : a("", !0),
			e.actionLabel ? (y(), o("button", {
				key: 2,
				class: "bd-empty-state-action bd-squircle",
				type: "button",
				onClick: r[0] ||= (e) => n("action")
			}, T(e.actionLabel), 1)) : a("", !0),
			C(t.$slots, "default", {}, void 0, !0)
		]));
	}
}), [["__scopeId", "data-v-6a4d7529"]]), Ge = ["for"], Ke = { class: "bd-field-control" }, qe = {
	key: 0,
	class: "bd-field-prefix"
}, Je = [
	"id",
	"disabled",
	"placeholder",
	"type"
], Ye = {
	key: 1,
	class: "bd-field-note"
}, Xe = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
			}, T(e.label), 9, Ge)) : a("", !0),
			s("div", Ke, [t.$slots.prefix ? (y(), o("span", qe, [C(t.$slots, "prefix", {}, void 0, !0)])) : a("", !0), M(s("input", p({
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
			}, t.$attrs), null, 16, Je), [[re, r.value]])]),
			typeof e.error == "string" || e.hint ? (y(), o("small", Ye, T(e.error || e.hint), 1)) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-d0ded8d5"]]), Ze = { class: "bd-field" }, Qe = ["for"], $e = { class: "bd-select" }, et = ["id", "disabled"], tt = {
	key: 0,
	disabled: "",
	value: ""
}, nt = ["value"], rt = /*#__PURE__*/ P(/* @__PURE__ */ u({
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
		return (i, c) => (y(), o("div", Ze, [t.label ? (y(), o("label", {
			key: 0,
			class: "bd-field-label bd-font-bold",
			for: D(r)
		}, T(t.label), 9, Qe)) : a("", !0), s("div", $e, [M(s("select", {
			id: D(r),
			"onUpdate:modelValue": c[0] ||= (e) => n.value = e,
			class: "bd-select-control bd-font-bold",
			disabled: t.disabled
		}, [t.placeholder ? (y(), o("option", tt, T(t.placeholder), 1)) : a("", !0), (y(!0), o(e, null, S(t.options, (e) => (y(), o("option", {
			key: e.value,
			value: e.value
		}, T(e.label), 9, nt))), 128))], 8, et), [[ie, n.value]]), l(D(N), {
			"aria-hidden": "true",
			class: "bd-select-arrow",
			size: "1.1em",
			weight: "bold"
		})])]));
	}
}), [["__scopeId", "data-v-9795c46d"]]), it = [
	"aria-disabled",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow",
	"tabindex"
], at = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdSlider",
	props: /*@__PURE__*/ f({
		disabled: { type: Boolean },
		max: { default: 100 },
		min: { default: 0 },
		orientation: { default: "horizontal" },
		step: { default: 1 },
		thickness: { default: void 0 }
	}, {
		modelValue: { default: 0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = e, n = k(e, "modelValue"), i = x(), a = r(() => t.orientation === "vertical"), c = r(() => {
			let e = t.max - t.min;
			return e <= 0 ? 0 : Math.min(1, Math.max(0, (n.value - t.min) / e));
		});
		function l(e) {
			let r = Math.round(e / t.step) * t.step, i = Math.min(t.max, Math.max(t.min, r));
			n.value = Number(i.toFixed(6));
		}
		function u(e) {
			let n = i.value?.getBoundingClientRect();
			if (!n) return;
			let r = a.value ? 1 - (e.clientY - n.top) / n.height : (e.clientX - n.left) / n.width;
			l(t.min + r * (t.max - t.min));
		}
		function d(e) {
			if (t.disabled) return;
			let r = {
				ArrowDown: -1,
				ArrowLeft: -1,
				ArrowRight: 1,
				ArrowUp: 1
			}[e.key];
			r !== void 0 && (e.preventDefault(), l(n.value + r * t.step));
		}
		function f(e) {
			t.disabled || (e.preventDefault(), u(e), document.addEventListener("pointermove", p), document.addEventListener("pointerup", m));
		}
		function p(e) {
			e.preventDefault(), u(e);
		}
		function m() {
			document.removeEventListener("pointermove", p), document.removeEventListener("pointerup", m);
		}
		return _(m), (t, r) => (y(), o("div", {
			ref_key: "track",
			ref: i,
			"aria-disabled": e.disabled || void 0,
			"aria-valuemax": e.max,
			"aria-valuemin": e.min,
			"aria-valuenow": n.value,
			class: h(["bd-slider", {
				"bd-slider-vertical": a.value,
				"is-disabled": e.disabled
			}]),
			role: "slider",
			style: g(e.thickness ? { [a.value ? "width" : "height"]: `${e.thickness}px` } : void 0),
			tabindex: e.disabled ? void 0 : 0,
			onKeydown: d,
			onPointerdown: f
		}, [s("div", {
			class: "bd-slider-fill",
			style: g({ [a.value ? "height" : "width"]: `${c.value * 100}%` })
		}, null, 4)], 46, it));
	}
}), [["__scopeId", "data-v-4194baaa"]]), U = {
	accent: "#9064ff",
	base: "#16181d",
	name: "Bearded"
}, W = [
	{
		...U,
		group: "dark",
		name: "Bearded"
	},
	{
		accent: "#0574b7",
		base: "#031727",
		group: "dark",
		legacy: [{
			accent: "#0074ba",
			base: "#061628"
		}],
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
		legacy: [{
			accent: "#59c4ff",
			base: "#1a2537"
		}],
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
		legacy: [{
			accent: "#4338ca",
			base: "#0f172a"
		}],
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
		legacy: [{
			accent: "#1d4ed8",
			base: "#070910"
		}],
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
		legacy: [{
			accent: "#0369a1",
			base: "#f8fafc"
		}],
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
		legacy: [{
			accent: "#075985",
			base: "#f0f9ff"
		}],
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
		legacy: [{
			accent: "#4338ca",
			base: "#eef2ff"
		}],
		name: "Pale Indigo"
	},
	{
		accent: "#4b5563",
		base: "#f9fafb",
		group: "light",
		name: "Pearl Gray"
	}
];
//#endregion
//#region src/utils/color.ts
function G(e) {
	let t = ot(e);
	return !t || st(...t) > .4;
}
function ot(e) {
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
function st(e, t, n) {
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
var K = "bearded-ui-theme", q = (e, t) => e.accent.toLowerCase() === t.accent.toLowerCase() && e.base.toLowerCase() === t.base.toLowerCase();
function ct(e) {
	return e.name ? W.find((t) => t.name === e.name) : W.find((t) => q(t, e) || t.legacy?.some((t) => q(t, e)));
}
function lt() {
	try {
		let e = JSON.parse(localStorage.getItem(K) ?? "null");
		if (!e?.accent || !e?.base) return U;
		let t = ct(e);
		return t ? {
			accent: t.accent,
			base: t.base,
			name: t.name
		} : e;
	} catch {
		return U;
	}
}
var J = x(U), Y = r(() => G(J.value.base) ? "light" : "dark"), X = !1;
function Z() {
	return ut(), {
		palette: J,
		theme: Y
	};
}
function ut() {
	X || typeof document > "u" || (X = !0, J.value = lt(), ae(() => {
		let e = document.documentElement;
		e.dataset.theme = Y.value, e.style.setProperty("--bd-palette-base", J.value.base), e.style.setProperty("--bd-palette-accent", J.value.accent), e.style.setProperty("--bd-on-primary", G(J.value.accent) ? "#111" : "#fff"), localStorage.setItem(K, JSON.stringify(J.value));
	}));
}
//#endregion
//#region src/components/BdThemePicker.vue?vue&type=script&setup=true&lang.ts
var dt = { class: "bd-theme-picker" }, ft = { class: "bd-theme-picker-inputs" }, pt = { class: "bd-field" }, mt = { class: "bd-field-label bd-font-bold" }, ht = { class: "bd-theme-picker-control" }, gt = ["value"], _t = { class: "bd-field" }, vt = { class: "bd-field-label bd-font-bold" }, yt = { class: "bd-theme-picker-control" }, bt = ["value"], xt = { class: "bd-theme-picker-grid" }, St = ["aria-pressed", "onClick"], Ct = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdThemePicker",
	props: {
		accentLabel: { default: "Accent" },
		baseLabel: { default: "Background" },
		presets: { default: () => W }
	},
	setup(t) {
		let n = t, { palette: i } = Z(), a = r(() => [...new Set(n.presets.map((e) => e.group))].map((e) => ({
			group: e,
			presets: n.presets.filter((t) => t.group === e)
		})));
		function l(e) {
			i.value = {
				accent: e.accent,
				base: e.base,
				name: e.name
			};
		}
		function u(e) {
			return i.value.name ? i.value.name === e.name : i.value.base.toLowerCase() === e.base.toLowerCase() && i.value.accent.toLowerCase() === e.accent.toLowerCase();
		}
		function d(e, t) {
			i.value = {
				...i.value,
				[e]: t.target.value,
				name: void 0
			};
		}
		return (n, r) => (y(), o("div", dt, [s("div", ft, [s("label", pt, [s("span", mt, T(t.baseLabel), 1), s("span", ht, [s("input", {
			value: D(i).base,
			type: "color",
			onInput: r[0] ||= (e) => d("base", e)
		}, null, 40, gt), s("code", null, T(D(i).base), 1)])]), s("label", _t, [s("span", vt, T(t.accentLabel), 1), s("span", yt, [s("input", {
			value: D(i).accent,
			type: "color",
			onInput: r[1] ||= (e) => d("accent", e)
		}, null, 40, bt), s("code", null, T(D(i).accent), 1)])])]), (y(!0), o(e, null, S(a.value, (t) => (y(), o("div", {
			key: t.group,
			class: "bd-theme-picker-group"
		}, [s("h3", null, T(t.group), 1), s("div", xt, [(y(!0), o(e, null, S(t.presets, (e) => (y(), o("button", {
			key: e.name,
			"aria-pressed": u(e),
			class: "bd-theme-picker-card bd-squircle",
			type: "button",
			onClick: (t) => l(e)
		}, [s("span", {
			class: "bd-theme-picker-swatch bd-squircle",
			style: g({ background: e.base })
		}, [s("span", { style: g({ background: e.accent }) }, null, 4)], 4), c(" " + T(e.name), 1)], 8, St))), 128))])]))), 128))]));
	}
}), [["__scopeId", "data-v-0935e762"]]), Q = x([]), wt = 0;
function $(e) {
	Q.value = Q.value.filter((t) => t.id !== e);
}
function Tt(e, t = {}) {
	let { action: n, duration: r = 4e3, variant: i = "default" } = t, a = wt++;
	return Q.value = [...Q.value, {
		action: n,
		id: a,
		msg: e,
		variant: i
	}], r > 0 && setTimeout(() => $(a), r), a;
}
function Et() {
	return {
		dismissToast: $,
		toast: Tt,
		toasts: Q
	};
}
//#endregion
//#region src/components/BdToaster.vue?vue&type=script&setup=true&lang.ts
var Dt = ["onClick"], Ot = { class: "bd-toast-msg" }, kt = ["onClick"], At = ["onClick"], jt = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BdToaster",
	props: { position: { default: "bottom-right" } },
	setup(r) {
		let a = r, { dismissToast: c, toasts: u } = Et();
		function d(e) {
			c(e.id), e.action?.onAction();
		}
		return (r, f) => (y(), i(t, { to: "body" }, [l(n, {
			class: h(["bd-toaster", `bd-toaster-${a.position}`]),
			name: "bd-toast",
			tag: "div"
		}, {
			default: j(() => [(y(!0), o(e, null, S(D(u).filter((e) => !e.action), (e) => (y(), o("button", {
				key: e.id,
				"aria-live": "polite",
				class: h(["bd-toast bd-font-bold bd-squircle", `bd-state-${e.variant}`]),
				type: "button",
				onClick: (t) => D(c)(e.id)
			}, T(e.msg), 11, Dt))), 128)), (y(!0), o(e, null, S(D(u).filter((e) => e.action), (e) => (y(), o("div", {
				key: `action-${e.id}`,
				"aria-live": "polite",
				class: h(["bd-toast bd-toast-with-action bd-font-bold bd-squircle", `bd-state-${e.variant}`])
			}, [
				s("span", Ot, T(e.msg), 1),
				s("button", {
					class: "bd-toast-action",
					type: "button",
					onClick: (t) => d(e)
				}, T(e.action?.label), 9, kt),
				s("button", {
					"aria-label": "Dismiss",
					class: "bd-toast-dismiss",
					type: "button",
					onClick: (t) => D(c)(e.id)
				}, " × ", 8, At)
			], 2))), 128))]),
			_: 1
		}, 8, ["class"])]));
	}
}), [["__scopeId", "data-v-da709bc9"]]);
//#endregion
export { le as BdBadge, R as BdButton, _e as BdButtonGroup, ye as BdCard, Ce as BdCheckbox, je as BdConfirmDialog, H as BdDialog, Ie as BdDropdown, ze as BdDropdownItem, We as BdEmptyState, Xe as BdInput, F as BdLoader, rt as BdSelect, at as BdSlider, Ct as BdThemePicker, jt as BdToaster, V as BdTooltip, U as bdDefaultPalette, W as bdPresets, $ as dismissToast, G as isLightColor, Tt as toast, Z as useTheme, Et as useToast };
