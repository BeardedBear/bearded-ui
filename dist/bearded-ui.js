import { Fragment as e, Teleport as t, TransitionGroup as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, inject as d, mergeModels as f, mergeProps as p, nextTick as m, normalizeClass as h, normalizeStyle as g, onBeforeUnmount as _, onMounted as v, openBlock as y, provide as b, ref as x, renderList as S, renderSlot as C, resolveDynamicComponent as w, toDisplayString as T, toRef as E, unref as D, useAttrs as O, useId as k, useModel as A, useSlots as j, vModelCheckbox as M, vModelDynamic as N, vModelSelect as P, watch as F, watchEffect as I, withCtx as L, withDirectives as R, withKeys as ee, withModifiers as te } from "vue";
import { PhCaretDown as ne, PhX as re } from "@phosphor-icons/vue";
//#region src/components/BdBadge.vue?vue&type=script&setup=true&lang.ts
var ie = /*@__PURE__*/ u({
	__name: "BdBadge",
	props: { variant: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (y(), o("span", { class: h(["bd-badge bd-font-bold bd-squircle", `bd-state-${t.variant}`]) }, [C(e.$slots, "default", {}, void 0, !0)], 2));
	}
}), z = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ae = /*#__PURE__*/ z(ie, [["__scopeId", "data-v-f4bfdac3"]]), oe = /*#__PURE__*/ z(/* @__PURE__ */ u({
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
}), [["__scopeId", "data-v-b8c1bbb7"]]), se = Symbol("bdDropdownClose"), B = Symbol("bdSize"), V = /*#__PURE__*/ z(/* @__PURE__ */ u({
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
		O(), j();
		let n = d(B, void 0), o = r(() => t.size ?? n?.value ?? "default"), s = r(() => t.as ? t.as : t.to ? "router-link" : t.href ? "a" : "button"), c = r(() => s.value === "router-link" ? { to: t.to } : s.value === "a" ? {
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
			class: ["bd-button bd-font-bold bd-squircle", l.value]
		}, c.value), {
			default: L(() => [e.loading ? (y(), i(oe, {
				key: 0,
				size: o.value === "x-small" ? "xx-small" : "x-small"
			}, null, 8, ["size"])) : a("", !0), C(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, [
			"aria-label",
			"aria-pressed",
			"class"
		]));
	}
}), [["__scopeId", "data-v-29416f7d"]]), H = 8, ce = 120, le = {
	bottom: "top",
	left: "right",
	right: "left",
	top: "bottom"
};
function U(e, t, n = {}) {
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
	}, f = s === "top" || s === "bottom", p = le[s], m = (f ? u.height : u.width) + o + H, h = d[s] >= m || d[s] >= d[p] ? s : p, g = Math.max(d[h] - o - H, ce), _ = Math.min(f ? u.height : u.width, g), v = h === "top" || h === "left" ? (f ? l.top : l.left) - o - _ : (f ? l.bottom : l.right) + o, y = f ? l.left : l.top, b = f ? l.right : l.bottom, x = f ? u.width : u.height, S = f ? window.innerWidth : window.innerHeight, C = r === "end" ? b - x : r === "center" ? y + (b - y - x) / 2 : y, w = Math.min(Math.max(H, C), Math.max(H, S - x - H)), T = f ? v : w, E = f ? w : v;
	return t.style.top = `${T}px`, t.style.left = `${E}px`, i && (t.style[f ? "maxHeight" : "maxWidth"] = `${g}px`), t.dataset.placement = h, t.scrollLeft = c.left, t.scrollTop = c.top, {
		left: E,
		placement: h,
		top: T
	};
}
function W(e) {
	let t = !1;
	return () => {
		t || (t = !0, requestAnimationFrame(() => {
			t = !1, e();
		}));
	};
}
function ue(e) {
	let t = W(e);
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
var de = ["aria-describedby"], fe = ["id"], pe = 12, me = 150, G = /*#__PURE__*/ z(/* @__PURE__ */ u({
	__name: "BdTooltip",
	props: {
		bare: {
			type: Boolean,
			default: !1
		},
		content: { default: "" },
		delay: { default: 150 },
		disabled: { type: Boolean },
		follow: { default: void 0 },
		interactive: { type: Boolean },
		offset: { default: 8 },
		side: { default: "top" }
	},
	setup(e) {
		let t = e, n = x(), r = x(), i = k(), a = x(!1), l, u = {
			x: 0,
			y: 0
		};
		function d() {
			if (!t.bare) return null;
			let e = n.value?.firstElementChild;
			return e && e !== r.value ? e : null;
		}
		function f(e) {
			return e instanceof Node && !!n.value?.contains(e);
		}
		function p(e) {
			return e instanceof Element && e.matches(":focus-visible");
		}
		function g() {
			let e = r.value, i = n.value;
			if (!e || !i) return;
			let a = v(i), { left: o, placement: s, top: c } = U(a, e, {
				align: "center",
				offset: t.offset,
				side: t.side
			}), l = s === "top" || s === "bottom", u = l ? a.left + a.width / 2 - o : a.top + a.height / 2 - c, d = l ? e.offsetWidth : e.offsetHeight;
			e.style.setProperty("--arrow-offset", `${Math.min(Math.max(u, pe), d - pe)}px`);
		}
		function v(e) {
			let n = b(e);
			if (!t.follow) return n;
			let r = t.follow !== "y", i = t.follow !== "x";
			return new DOMRect(r ? u.x : n.left, i ? u.y : n.top, r ? 0 : n.width, i ? 0 : n.height);
		}
		function b(e) {
			let n = r.value, i = e.firstChild;
			if (!t.bare || !n || !i || i === n) return e.getBoundingClientRect();
			let a = document.createRange();
			return a.setStartBefore(i), a.setEndBefore(n), a.getBoundingClientRect();
		}
		let S = ue(g), w = W(g);
		function E() {
			clearTimeout(l);
			let e = r.value;
			d()?.removeAttribute("aria-describedby"), a.value = !1, e?.matches(":popover-open") && e.hidePopover(), S.stop();
		}
		function O(e) {
			t.interactive && f(e.relatedTarget) || E();
		}
		function A(e) {
			if (!f(e.relatedTarget)) {
				if (!t.interactive) return E();
				clearTimeout(l), l = setTimeout(E, me);
			}
		}
		function j(e) {
			f(e.relatedTarget) || N(e);
		}
		function M(e) {
			u.x = e.clientX, u.y = e.clientY, t.follow && a.value && w();
		}
		function N(e) {
			e instanceof FocusEvent && !p(e.target) || (e instanceof MouseEvent && M(e), clearTimeout(l), l = setTimeout(P, t.delay));
		}
		async function P() {
			let e = r.value;
			e && !t.disabled && (t.content || e.textContent?.trim()) && (a.value = !0, d()?.setAttribute("aria-describedby", i), e.matches(":popover-open") || e.showPopover(), await m(), a.value && (g(), S.start()));
		}
		return _(() => {
			clearTimeout(l), S.stop();
		}), (t, l) => (y(), o("span", {
			ref_key: "triggerEl",
			ref: n,
			"aria-describedby": !e.bare && a.value ? D(i) : void 0,
			class: h(["bd-tooltip-trigger", { "is-bare": e.bare }]),
			onClick: E,
			onFocusin: N,
			onFocusout: O,
			onKeydown: ee(E, ["escape"]),
			onMousemove: M,
			onMouseout: A,
			onMouseover: j
		}, [C(t.$slots, "default", {}, void 0, !0), s("div", {
			id: D(i),
			ref_key: "panelEl",
			ref: r,
			class: h(["bd-tooltip bd-squircle bd-anim-popover", { "is-interactive": e.interactive }]),
			popover: "manual",
			role: "tooltip"
		}, [C(t.$slots, "content", {}, () => [c(T(e.content), 1)], !0)], 10, fe)], 42, de));
	}
}), [["__scopeId", "data-v-e5905285"]]), he = /*#__PURE__*/ z(/* @__PURE__ */ u({
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
		let n = t, r = A(t, "modelValue");
		return b(B, E(n, "size")), (n, a) => (y(), o("div", {
			class: h(["bd-button-group", { "bd-button-group-full": t.full }]),
			role: "group"
		}, [C(n.$slots, "default", {}, () => [(y(!0), o(e, null, S(t.options, (e) => (y(), i(G, {
			key: e.value,
			content: e.tooltip
		}, {
			default: L(() => [l(V, {
				disabled: t.disabled,
				size: t.size,
				variant: e.value === r.value ? "primary" : "default",
				onClick: (t) => r.value = e.value
			}, {
				default: L(() => [c(T(e.label), 1)]),
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
}), [["__scopeId", "data-v-bee7fddb"]]), ge = {
	key: 0,
	class: "bd-card-header bd-font-bold"
}, _e = /*#__PURE__*/ z(/* @__PURE__ */ u({
	__name: "BdCard",
	props: { padding: { default: "default" } },
	setup(e) {
		let t = e;
		return (e, n) => (y(), o("section", { class: h(["bd-card bd-surface bd-squircle", t.padding === "default" ? "" : `bd-card-${t.padding}`]) }, [e.$slots.header ? (y(), o("header", ge, [C(e.$slots, "header", {}, void 0, !0)])) : a("", !0), C(e.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-57c01e05"]]), ve = {
	key: 0,
	class: "bd-checkbox-label"
}, ye = { class: "bd-checkbox-switch" }, be = ["disabled"], xe = /*#__PURE__*/ z(/* @__PURE__ */ u({
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
		let t = A(e, "modelValue");
		return (n, r) => (y(), o("label", { class: h(["bd-checkbox", {
			"bd-checkbox-full": e.fullWidth,
			"is-disabled": e.disabled
		}]) }, [e.label || n.$slots.default ? (y(), o("span", ve, [C(n.$slots, "default", {}, () => [c(T(e.label), 1)], !0)])) : a("", !0), s("span", ye, [
			R(s("input", {
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e,
				class: "bd-checkbox-input",
				disabled: e.disabled,
				type: "checkbox"
			}, null, 8, be), [[M, t.value]]),
			r[1] ||= s("span", { class: "bd-checkbox-track bd-squircle" }, null, -1),
			r[2] ||= s("span", { class: "bd-checkbox-knob bd-squircle" }, null, -1)
		])], 2));
	}
}), [["__scopeId", "data-v-c8dd0e95"]]), Se = {
	key: 0,
	class: "bd-dialog-header"
}, Ce = { class: "bd-dialog-heading" }, we = {
	key: 0,
	class: "bd-dialog-title"
}, Te = { class: "bd-dialog-subtitle" }, Ee = {
	key: 0,
	class: "bd-dialog-actions"
}, De = { class: "bd-dialog-body" }, Oe = {
	key: 1,
	class: "bd-dialog-footer"
}, ke = /*#__PURE__*/ z(/* @__PURE__ */ u({
	__name: "BdDialog",
	props: /*@__PURE__*/ f({
		height: { default: void 0 },
		hideClose: {
			type: Boolean,
			default: !1
		},
		maxHeight: { default: void 0 },
		maxWidth: { default: void 0 },
		padding: { default: "default" },
		persistent: {
			type: Boolean,
			default: !1
		},
		size: { default: "default" },
		subtitle: { default: void 0 },
		title: { default: void 0 },
		width: { default: void 0 }
	}, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = e, n = A(e, "modelValue"), r = x();
		F(n, (e) => {
			r.value && (e ? r.value.showModal() : r.value.close());
		}), v(() => {
			n.value && r.value?.showModal();
		});
		function c(e) {
			if (e.target !== r.value) return !1;
			let t = r.value?.getBoundingClientRect();
			return t ? e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom : !1;
		}
		let u = !1;
		function d(e) {
			let r = e.detail > 0;
			!t.persistent && r && u && c(e) && (n.value = !1), u = !1;
		}
		function f(e) {
			u = c(e);
		}
		return (c, u) => (y(), o("dialog", {
			ref_key: "el",
			ref: r,
			class: h(["bd-dialog bd-surface bd-squircle bd-anim-dialog", [t.size === "default" ? "" : `bd-dialog-${t.size}`, t.padding === "default" ? "" : `bd-dialog-padding-${t.padding}`]]),
			style: g({
				height: t.height,
				maxHeight: t.maxHeight,
				maxWidth: t.maxWidth,
				width: t.width
			}),
			onClick: d,
			onClose: u[1] ||= (e) => n.value = !1,
			onMousedown: f
		}, [
			e.title || e.subtitle || c.$slots.header || c.$slots.actions || !e.hideClose ? (y(), o("header", Se, [C(c.$slots, "header", {}, () => [s("div", Ce, [e.title ? (y(), o("h2", we, T(e.title), 1)) : a("", !0), e.subtitle ? (y(), i(G, {
				key: 1,
				bare: "",
				content: e.subtitle
			}, {
				default: L(() => [s("p", Te, T(e.subtitle), 1)]),
				_: 1
			}, 8, ["content"])) : a("", !0)])], !0), c.$slots.actions || !e.hideClose ? (y(), o("div", Ee, [C(c.$slots, "actions", {}, void 0, !0), e.hideClose ? a("", !0) : (y(), o("button", {
				key: 0,
				"aria-label": "Close",
				class: "bd-dialog-close",
				type: "button",
				onClick: u[0] ||= (e) => n.value = !1
			}, [l(D(re), {
				"aria-hidden": "true",
				size: "1em",
				weight: "bold"
			})]))])) : a("", !0)])) : a("", !0),
			s("div", De, [C(c.$slots, "default", {}, void 0, !0)]),
			c.$slots.footer ? (y(), o("footer", Oe, [C(c.$slots, "footer", {}, void 0, !0)])) : a("", !0)
		], 38));
	}
}), [["__scopeId", "data-v-d49b9d64"]]), Ae = /* @__PURE__ */ u({
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
		let n = t, r = A(e, "modelValue");
		function a() {
			r.value = !1, n("cancel");
		}
		function o() {
			r.value = !1, n("confirm");
		}
		return (t, n) => (y(), i(ke, {
			"model-value": r.value,
			size: "small",
			title: e.title,
			"onUpdate:modelValue": n[0] ||= (e) => !e && a()
		}, {
			footer: L(() => [l(V, {
				variant: "border",
				onClick: a
			}, {
				default: L(() => [c(T(e.cancelLabel), 1)]),
				_: 1
			}), l(V, {
				variant: e.danger ? "danger" : "primary",
				onClick: o
			}, {
				default: L(() => [c(T(e.confirmLabel), 1)]),
				_: 1
			}, 8, ["variant"])]),
			default: L(() => [C(t.$slots, "default", {}, () => [c(T(e.message), 1)])]),
			_: 3
		}, 8, ["model-value", "title"]));
	}
}), je = ["for"], Me = { class: "bd-field-control" }, Ne = {
	key: 0,
	class: "bd-field-prefix"
}, Pe = [
	"id",
	"disabled",
	"placeholder",
	"type"
], Fe = {
	key: 1,
	class: "bd-field-note"
}, Ie = /*#__PURE__*/ z(/* @__PURE__ */ u({
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
		let n = e, r = A(e, "modelValue"), i = k(), c = x();
		return t({
			focus: () => c.value?.focus(),
			select: () => c.value?.select()
		}), (t, l) => (y(), o("div", { class: h(["bd-field", { "has-error": e.error }]) }, [
			e.label ? (y(), o("label", {
				key: 0,
				class: "bd-field-label bd-font-bold",
				for: D(i)
			}, T(e.label), 9, je)) : a("", !0),
			s("div", Me, [t.$slots.prefix ? (y(), o("span", Ne, [C(t.$slots, "prefix", {}, void 0, !0)])) : a("", !0), R(s("input", p({
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
			}, t.$attrs), null, 16, Pe), [[N, r.value]])]),
			typeof e.error == "string" || e.hint ? (y(), o("small", Fe, T(e.error || e.hint), 1)) : a("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-d0ded8d5"]]), Le = { class: "bd-dropdown" }, Re = ["aria-controls", "aria-expanded"], ze = ["id"], Be = {
	key: 0,
	class: "bd-dropdown-search"
}, Ve = {
	key: 1,
	class: "bd-dropdown-empty"
}, He = 767, Ue = /*#__PURE__*/ z(/* @__PURE__ */ u({
	__name: "BdDropdown",
	props: /*@__PURE__*/ f({
		disabled: { type: Boolean },
		label: { default: "Menu" },
		matchWidth: { type: Boolean },
		offset: { default: 6 },
		placement: { default: "bottom-start" },
		searchable: { type: Boolean },
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
		let t = e, n = A(e, "modelValue"), r = x(), i = x(), u = k(), d = x(), f = x(""), p = x(0);
		function g() {
			return t.sheetOnMobile && window.innerWidth <= He;
		}
		function v() {
			let e = i.value, n = r.value;
			if (!e || !n) return;
			if (g()) {
				e.style.cssText = "", e.dataset.placement = "sheet";
				return;
			}
			let [a, o] = t.placement.split("-");
			U(n, e, {
				align: o,
				constrain: !0,
				matchWidth: t.matchWidth,
				offset: t.offset,
				side: a
			});
		}
		let S = ue(v);
		function w() {
			n.value = !1;
		}
		let O = (e) => e.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
		function j() {
			let e = O(f.value.trim()), t = i.value?.querySelectorAll(".bd-dropdown-item") ?? [], n = 0;
			for (let r of t) {
				let t = O(r.textContent ?? "").includes(e);
				r.style.display = t ? "" : "none", t && n++;
			}
			p.value = n;
		}
		function M(e) {
			if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
			let t = I();
			if (t.length === 0) return;
			e.preventDefault();
			let n = t.indexOf(document.activeElement);
			t[((e.key === "ArrowDown" ? n + 1 : n - 1) + t.length) % t.length]?.focus();
		}
		function N() {
			I()[0]?.click();
		}
		function P() {
			t.disabled || (n.value = !n.value);
		}
		function I() {
			return [...i.value?.querySelectorAll(".bd-dropdown-item:not(:disabled)") ?? []].filter((e) => e.style.display !== "none");
		}
		return F(n, async (e) => {
			let n = i.value;
			n && (e ? (n.matches(":popover-open") || n.showPopover(), await m(), v(), S.start(), t.searchable && (f.value = "", j(), d.value?.focus())) : (n.matches(":popover-open") && n.hidePopover(), S.stop()));
		}), F(f, j), _(S.stop), b(se, w), b(B, E(t, "size")), (t, m) => (y(), o("div", Le, [s("span", {
			ref_key: "triggerEl",
			ref: r,
			"aria-controls": D(u),
			"aria-expanded": n.value,
			"aria-haspopup": "menu",
			class: "bd-dropdown-trigger",
			onClick: P
		}, [C(t.$slots, "trigger", {
			open: n.value,
			toggle: P
		}, () => [l(V, { disabled: e.disabled }, {
			default: L(() => [c(T(e.label) + " ", 1), l(D(ne), {
				class: "bd-dropdown-caret",
				size: "1.1em",
				weight: "bold"
			})]),
			_: 1
		}, 8, ["disabled"])], !0)], 8, Re), s("div", {
			id: D(u),
			ref_key: "panelEl",
			ref: i,
			class: h(["bd-dropdown-panel bd-surface bd-squircle bd-anim-popover", { "bd-anim-popover-sheet": e.sheetOnMobile }]),
			popover: "auto",
			role: "menu",
			onKeydown: M,
			onToggle: m[1] ||= (e) => n.value = e.newState === "open"
		}, [
			e.searchable ? (y(), o("div", Be, [l(Ie, {
				ref_key: "searchEl",
				ref: d,
				modelValue: f.value,
				"onUpdate:modelValue": m[0] ||= (e) => f.value = e,
				"aria-label": "Search",
				autocomplete: "off",
				placeholder: "Search…",
				size: "small",
				type: "search",
				onKeydown: ee(te(N, ["prevent"]), ["enter"])
			}, null, 8, ["modelValue", "onKeydown"])])) : a("", !0),
			C(t.$slots, "default", { close: w }, void 0, !0),
			e.searchable && f.value && !p.value ? (y(), o("p", Ve, "No results")) : a("", !0)
		], 42, ze)]));
	}
}), [["__scopeId", "data-v-8c7d5592"]]), We = ["disabled"], Ge = {
	key: 0,
	class: "bd-dropdown-item-icon"
}, Ke = /*#__PURE__*/ z(/* @__PURE__ */ u({
	__name: "BdDropdownItem",
	props: {
		active: { type: Boolean },
		danger: { type: Boolean },
		disabled: { type: Boolean },
		icon: {},
		keepOpen: { type: Boolean }
	},
	setup(e) {
		let t = e, n = d(se, () => {});
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
		}, [e.icon || t.$slots.icon ? (y(), o("span", Ge, [C(t.$slots, "icon", {}, () => [(y(), i(w(e.icon), {
			size: "1.2em",
			weight: "bold"
		}))], !0)])) : a("", !0), C(t.$slots, "default", {}, void 0, !0)], 10, We));
	}
}), [["__scopeId", "data-v-4877e0ac"]]), qe = { class: "bd-empty-state" }, Je = {
	key: 0,
	class: "bd-empty-state-icon",
	"aria-hidden": "true"
}, Ye = { class: "bd-empty-state-title bd-font-bold" }, Xe = {
	key: 1,
	class: "bd-empty-state-message"
}, Ze = /*#__PURE__*/ z(/* @__PURE__ */ u({
	__name: "BdEmptyState",
	props: {
		actionLabel: {},
		message: {},
		title: {}
	},
	emits: ["action"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (y(), o("div", qe, [
			t.$slots.icon ? (y(), o("span", Je, [C(t.$slots, "icon", {}, void 0, !0)])) : a("", !0),
			s("p", Ye, T(e.title), 1),
			e.message ? (y(), o("p", Xe, T(e.message), 1)) : a("", !0),
			e.actionLabel ? (y(), o("button", {
				key: 2,
				class: "bd-empty-state-action bd-squircle",
				type: "button",
				onClick: r[0] ||= (e) => n("action")
			}, T(e.actionLabel), 1)) : a("", !0),
			C(t.$slots, "default", {}, void 0, !0)
		]));
	}
}), [["__scopeId", "data-v-6a4d7529"]]), Qe = { class: "bd-field" }, $e = ["for"], et = { class: "bd-select" }, tt = ["id", "disabled"], nt = {
	key: 0,
	disabled: "",
	value: ""
}, rt = ["value"], it = /*#__PURE__*/ z(/* @__PURE__ */ u({
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
		let n = A(t, "modelValue"), r = k();
		return (i, c) => (y(), o("div", Qe, [t.label ? (y(), o("label", {
			key: 0,
			class: "bd-field-label bd-font-bold",
			for: D(r)
		}, T(t.label), 9, $e)) : a("", !0), s("div", et, [R(s("select", {
			id: D(r),
			"onUpdate:modelValue": c[0] ||= (e) => n.value = e,
			class: "bd-select-control bd-font-bold",
			disabled: t.disabled
		}, [t.placeholder ? (y(), o("option", nt, T(t.placeholder), 1)) : a("", !0), (y(!0), o(e, null, S(t.options, (e) => (y(), o("option", {
			key: e.value,
			value: e.value
		}, T(e.label), 9, rt))), 128))], 8, tt), [[P, n.value]]), l(D(ne), {
			"aria-hidden": "true",
			class: "bd-select-arrow",
			size: "1.1em",
			weight: "bold"
		})])]));
	}
}), [["__scopeId", "data-v-9795c46d"]]), at = [
	"aria-disabled",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow",
	"tabindex"
], ot = /*#__PURE__*/ z(/* @__PURE__ */ u({
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
		let t = e, n = A(e, "modelValue"), i = x(), a = r(() => t.orientation === "vertical"), c = r(() => {
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
		}, null, 4)], 46, at));
	}
}), [["__scopeId", "data-v-4194baaa"]]), K = {
	accent: "#9064ff",
	base: "#16181d",
	name: "Bearded"
}, q = [
	{
		...K,
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
function J(e) {
	let t = st(e);
	return !t || ct(...t) > .4;
}
function st(e) {
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
function ct(e, t, n) {
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
var lt = "bearded-ui-theme", ut = (e, t) => e.accent.toLowerCase() === t.accent.toLowerCase() && e.base.toLowerCase() === t.base.toLowerCase();
function dt(e) {
	return e.name ? q.find((t) => t.name === e.name) : q.find((t) => ut(t, e) || t.legacy?.some((t) => ut(t, e)));
}
function ft() {
	try {
		let e = JSON.parse(localStorage.getItem(lt) ?? "null");
		if (!e?.accent || !e?.base) return K;
		let t = dt(e);
		return t ? {
			accent: t.accent,
			base: t.base,
			name: t.name
		} : e;
	} catch {
		return K;
	}
}
var Y = x(K), pt = r(() => J(Y.value.base) ? "light" : "dark"), mt = !1;
function X() {
	return ht(), {
		palette: Y,
		theme: pt
	};
}
function ht() {
	mt || typeof document > "u" || (mt = !0, Y.value = ft(), I(() => {
		let e = document.documentElement;
		e.dataset.theme = pt.value, e.style.setProperty("--bd-palette-base", Y.value.base), e.style.setProperty("--bd-palette-accent", Y.value.accent), e.style.setProperty("--bd-on-primary", J(Y.value.accent) ? "#111" : "#fff"), localStorage.setItem(lt, JSON.stringify(Y.value));
	}));
}
//#endregion
//#region src/components/BdThemePicker.vue?vue&type=script&setup=true&lang.ts
var gt = { class: "bd-theme-picker" }, _t = { class: "bd-theme-picker-row" }, vt = { class: "bd-font-bold" }, yt = ["value"], bt = { class: "bd-theme-picker-row" }, xt = { class: "bd-font-bold" }, St = ["value"], Ct = { class: "bd-theme-picker-grid" }, wt = [
	"aria-label",
	"aria-pressed",
	"onClick"
], Tt = /*#__PURE__*/ z(/* @__PURE__ */ u({
	__name: "BdThemePicker",
	props: {
		accentLabel: { default: "Accent" },
		baseLabel: { default: "Background" },
		presets: { default: () => q }
	},
	setup(t) {
		let n = t, { palette: a } = X(), c = r(() => [...new Set(n.presets.map((e) => e.group))].map((e) => ({
			group: e,
			presets: n.presets.filter((t) => t.group === e)
		})));
		function l(e) {
			a.value = {
				accent: e.accent,
				base: e.base,
				name: e.name
			};
		}
		function u(e) {
			return a.value.name ? a.value.name === e.name : a.value.base.toLowerCase() === e.base.toLowerCase() && a.value.accent.toLowerCase() === e.accent.toLowerCase();
		}
		function d(e, t) {
			a.value = {
				...a.value,
				[e]: t.target.value,
				name: void 0
			};
		}
		return (n, r) => (y(), o("div", gt, [
			s("label", _t, [s("span", vt, T(t.baseLabel), 1), s("input", {
				value: D(a).base,
				type: "color",
				onInput: r[0] ||= (e) => d("base", e)
			}, null, 40, yt)]),
			s("label", bt, [s("span", xt, T(t.accentLabel), 1), s("input", {
				value: D(a).accent,
				type: "color",
				onInput: r[1] ||= (e) => d("accent", e)
			}, null, 40, St)]),
			r[2] ||= s("hr", { class: "bd-theme-picker-divider" }, null, -1),
			(y(!0), o(e, null, S(c.value, (t) => (y(), o("div", {
				key: t.group,
				class: "bd-theme-picker-group"
			}, [s("h3", null, T(t.group), 1), s("div", Ct, [(y(!0), o(e, null, S(t.presets, (e) => (y(), i(G, {
				key: e.name,
				bare: "",
				content: e.name
			}, {
				default: L(() => [s("button", {
					"aria-label": e.name,
					"aria-pressed": u(e),
					class: "bd-theme-picker-swatch",
					type: "button",
					onClick: (t) => l(e)
				}, [s("span", {
					class: "bd-theme-picker-swatch-base",
					style: g({ background: e.base })
				}, null, 4), s("span", {
					class: "bd-theme-picker-swatch-accent",
					style: g({ background: e.accent })
				}, null, 4)], 8, wt)]),
				_: 2
			}, 1032, ["content"]))), 128))])]))), 128))
		]));
	}
}), [["__scopeId", "data-v-35caf08d"]]), Z = x([]), Et = 0;
function Q(e) {
	Z.value = Z.value.filter((t) => t.id !== e);
}
function Dt(e, t = {}) {
	let { action: n, duration: r = 4e3, variant: i = "default" } = t, a = Et++;
	return Z.value = [...Z.value, {
		action: n,
		id: a,
		msg: e,
		variant: i
	}], r > 0 && setTimeout(() => Q(a), r), a;
}
function $() {
	return {
		dismissToast: Q,
		toast: Dt,
		toasts: Z
	};
}
//#endregion
//#region src/components/BdToaster.vue?vue&type=script&setup=true&lang.ts
var Ot = ["onClick"], kt = { class: "bd-toast-msg" }, At = ["onClick"], jt = ["onClick"], Mt = /*#__PURE__*/ z(/* @__PURE__ */ u({
	__name: "BdToaster",
	props: { position: { default: "bottom-right" } },
	setup(r) {
		let a = r, { dismissToast: c, toasts: u } = $();
		function d(e) {
			let t = e;
			t.style.height = `${t.offsetHeight}px`, t.style.left = `${t.offsetLeft}px`, t.style.top = `${t.offsetTop}px`, t.style.width = `${t.offsetWidth}px`;
		}
		function f(e) {
			c(e.id), e.action?.onAction();
		}
		return (r, p) => (y(), i(t, { to: "body" }, [l(n, {
			class: h(["bd-toaster", `bd-toaster-${a.position}`]),
			name: "bd-toast",
			tag: "div",
			onBeforeLeave: d
		}, {
			default: L(() => [(y(!0), o(e, null, S(D(u).filter((e) => !e.action), (e) => (y(), o("button", {
				key: e.id,
				"aria-live": "polite",
				class: h(["bd-toast bd-font-bold bd-squircle", `bd-state-${e.variant}`]),
				type: "button",
				onClick: (t) => D(c)(e.id)
			}, T(e.msg), 11, Ot))), 128)), (y(!0), o(e, null, S(D(u).filter((e) => e.action), (e) => (y(), o("div", {
				key: `action-${e.id}`,
				"aria-live": "polite",
				class: h(["bd-toast bd-toast-with-action bd-font-bold bd-squircle", `bd-state-${e.variant}`])
			}, [
				s("span", kt, T(e.msg), 1),
				s("button", {
					class: "bd-toast-action",
					type: "button",
					onClick: (t) => f(e)
				}, T(e.action?.label), 9, At),
				s("button", {
					"aria-label": "Dismiss",
					class: "bd-toast-dismiss",
					type: "button",
					onClick: (t) => D(c)(e.id)
				}, " × ", 8, jt)
			], 2))), 128))]),
			_: 1
		}, 8, ["class"])]));
	}
}), [["__scopeId", "data-v-aeb8c9fb"]]);
//#endregion
export { ae as BdBadge, V as BdButton, he as BdButtonGroup, _e as BdCard, xe as BdCheckbox, Ae as BdConfirmDialog, ke as BdDialog, Ue as BdDropdown, Ke as BdDropdownItem, Ze as BdEmptyState, Ie as BdInput, oe as BdLoader, it as BdSelect, ot as BdSlider, Tt as BdThemePicker, Mt as BdToaster, G as BdTooltip, K as bdDefaultPalette, q as bdPresets, Q as dismissToast, J as isLightColor, Dt as toast, X as useTheme, $ as useToast };
