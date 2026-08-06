import { Component } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';

declare const __VLS_component: DefineComponent<BdBadgeProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdBadgeProps> & Readonly<{}>, {
variant: "danger" | "default" | "info" | "primary" | "success" | "warning";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLSpanElement>;

declare const __VLS_component_10: DefineComponent<BdTooltipProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdTooltipProps> & Readonly<{}>, {
offset: number;
side: BdSide;
content: string;
delay: number;
follow: BdTooltipFollow;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
triggerEl: HTMLSpanElement;
panelEl: HTMLDivElement;
}, HTMLSpanElement>;

declare const __VLS_component_2: DefineComponent<BdButtonProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdButtonProps> & Readonly<{}>, {
variant: "border" | "danger" | "default" | "nude" | "primary";
type: "button" | "reset" | "submit";
size: BdSize;
align: "center" | "justify" | "left";
as: "a" | "button" | "router-link";
href: string;
target: "_blank" | "_parent" | "_self" | "_top";
to: undefined;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_component_3: DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
size: BdSize;
options: BdOption[];
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare const __VLS_component_4: DefineComponent<BdCardProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdCardProps> & Readonly<{}>, {
padding: "default" | "none" | "small";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLElement>;

declare const __VLS_component_5: DefineComponent<__VLS_PublicProps_2, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_2> & Readonly<{
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLLabelElement>;

declare const __VLS_component_6: DefineComponent<__VLS_PublicProps_3, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
cancel: () => any;
confirm: () => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_3> & Readonly<{
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
onCancel?: (() => any) | undefined;
onConfirm?: (() => any) | undefined;
}>, {
danger: boolean;
title: string;
cancelLabel: string;
confirmLabel: string;
message: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDialogElement>;

declare const __VLS_component_7: DefineComponent<__VLS_PublicProps_4, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_4> & Readonly<{
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
title: string;
size: "big" | "default" | "fit" | "full" | "small";
padding: "default" | "none" | "small";
hideClose: boolean;
persistent: boolean;
subtitle: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
el: HTMLDialogElement;
}, HTMLDialogElement>;

declare const __VLS_component_8: DefineComponent<__VLS_PublicProps_5, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_5> & Readonly<{
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
label: string;
size: BdSize;
offset: number;
placement: BdDropdownPlacement;
sheetOnMobile: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
triggerEl: HTMLSpanElement;
panelEl: HTMLDivElement;
}, HTMLDivElement>;

declare const __VLS_component_9: DefineComponent<BdDropdownItemProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdDropdownItemProps> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLButtonElement>;

declare type __VLS_Props = BdButtonGroupProps;

declare type __VLS_Props_2 = BdCheckboxProps;

declare type __VLS_Props_3 = BdConfirmDialogProps;

declare type __VLS_Props_4 = BdDialogProps;

declare type __VLS_Props_5 = BdDropdownProps;

declare type __VLS_Props_6 = BdInputProps;

declare type __VLS_Props_7 = BdSelectProps;

declare type __VLS_PublicProps = {
    modelValue?: string;
} & __VLS_Props;

declare type __VLS_PublicProps_2 = {
    modelValue?: boolean;
} & __VLS_Props_2;

declare type __VLS_PublicProps_3 = {
    modelValue?: boolean;
} & __VLS_Props_3;

declare type __VLS_PublicProps_4 = {
    modelValue?: boolean;
} & __VLS_Props_4;

declare type __VLS_PublicProps_5 = {
    modelValue?: boolean;
} & __VLS_Props_5;

declare type __VLS_PublicProps_6 = {
    modelValue?: number | string;
} & __VLS_Props_6;

declare type __VLS_PublicProps_7 = {
    modelValue?: string;
} & __VLS_Props_7;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLSpanElement;
};

declare function __VLS_template_10(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        content?(_: {}): any;
    };
    refs: {
        triggerEl: HTMLSpanElement;
        panelEl: HTMLDivElement;
    };
    rootEl: HTMLSpanElement;
};

declare function __VLS_template_2(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare function __VLS_template_3(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};

declare function __VLS_template_4(): {
    attrs: Partial<{}>;
    slots: {
        header?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLElement;
};

declare function __VLS_template_5(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLLabelElement;
};

declare function __VLS_template_6(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDialogElement;
};

declare function __VLS_template_7(): {
    attrs: Partial<{}>;
    slots: {
        header?(_: {}): any;
        actions?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {
        el: HTMLDialogElement;
    };
    rootEl: HTMLDialogElement;
};

declare function __VLS_template_8(): {
    attrs: Partial<{}>;
    slots: {
        trigger?(_: {
            open: boolean;
            toggle: typeof toggle;
        }): any;
        default?(_: {
            close: typeof close_2;
        }): any;
    };
    refs: {
        triggerEl: HTMLSpanElement;
        panelEl: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};

declare function __VLS_template_9(): {
    attrs: Partial<{}>;
    slots: {
        icon?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLButtonElement;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_TemplateResult_10 = ReturnType<typeof __VLS_template_10>;

declare type __VLS_TemplateResult_2 = ReturnType<typeof __VLS_template_2>;

declare type __VLS_TemplateResult_3 = ReturnType<typeof __VLS_template_3>;

declare type __VLS_TemplateResult_4 = ReturnType<typeof __VLS_template_4>;

declare type __VLS_TemplateResult_5 = ReturnType<typeof __VLS_template_5>;

declare type __VLS_TemplateResult_6 = ReturnType<typeof __VLS_template_6>;

declare type __VLS_TemplateResult_7 = ReturnType<typeof __VLS_template_7>;

declare type __VLS_TemplateResult_8 = ReturnType<typeof __VLS_template_8>;

declare type __VLS_TemplateResult_9 = ReturnType<typeof __VLS_template_9>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_10<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_2<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_3<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_4<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_5<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_6<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_7<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_8<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_9<T, S> = T & {
    new (): {
        $slots: S;
    };
};

/** How a panel lines up with its trigger on the cross axis. */
export declare type BdAlign = "center" | "end" | "start";

export declare const BdBadge: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

/**
 * Small uppercase pill carrying a status. Shares its colours with BdToaster
 * through the `.bd-state-*` utilities.
 *
 * @example
 * <BdBadge variant="success">Online</BdBadge>
 */
export declare interface BdBadgeProps {
    /** Status colour, shared with BdToaster. @default "default" */
    variant?: "danger" | "default" | "info" | "primary" | "success" | "warning";
}

export declare const BdButton: __VLS_WithTemplateSlots_2<typeof __VLS_component_2, __VLS_TemplateResult_2["slots"]>;

export declare const BdButtonGroup: __VLS_WithTemplateSlots_3<typeof __VLS_component_3, __VLS_TemplateResult_3["slots"]>;

/**
 * Buttons glued together, rounded only at both ends of the group.
 *
 * With `options` it is a segmented control bound to `v-model`; without, the
 * default slot takes arbitrary buttons — which inherit the group's size.
 *
 * @example
 * <BdButtonGroup v-model="view" :options="[{ label: 'List', value: 'list' }]" />
 * <BdButtonGroup size="small">
 *   <BdButton>Prev</BdButton>
 *   <BdButton>Next</BdButton>
 * </BdButtonGroup>
 */
export declare interface BdButtonGroupProps {
    /** Disables every generated button. Buttons passed through the slot keep their own prop. */
    disabled?: boolean;
    /** Spans the full width, buttons sharing it equally. */
    full?: boolean;
    /**
     * Turns the group into a segmented control bound to `v-model`. Leave empty to
     * pass buttons through the default slot instead.
     */
    options?: BdOption[];
    /** Height of every button in the group, slot content included. @default "default" */
    size?: BdSize;
}

/**
 * Button, link or router-link depending on the props: pass `href` for an
 * `<a>`, `to` for a `<router-link>`, nothing for a `<button>`.
 *
 * Height comes from the `--bd-control-height*` tokens, so a button, a
 * BdButtonGroup and a BdDropdown trigger of the same size line up exactly,
 * whatever they contain (icon, spinner, text).
 *
 * @example
 * <BdButton variant="primary" @click="save">Save</BdButton>
 * <BdButton icon-only variant="border"><PhGear size="1.2em" /></BdButton>
 * <BdButton :to="{ name: 'home' }">Home</BdButton>
 */
export declare interface BdButtonProps {
    /** Content alignment inside the button. @default "center" */
    align?: "center" | "justify" | "left";
    /** Rendered tag. Auto-derived from `to` / `href` when left out. */
    as?: "a" | "button" | "router-link";
    /** Blocks interaction and dims the button. */
    disabled?: boolean;
    /** Stretches the button to the full width of its container. */
    full?: boolean;
    /** Renders an `<a>` pointing here. */
    href?: string;
    /** Square button sized on the control height — for a lone icon. */
    iconOnly?: boolean;
    /** Shows a spinner and blocks interaction, without dimming the button. */
    loading?: boolean;
    /**
     * Height of the control. Falls back to the size provided by an enclosing
     * BdButtonGroup or BdDropdown, then to `"default"`.
     */
    size?: BdSize;
    /** Only meaningful with `href`. `_blank` adds `rel="noopener"`. @default "_self" */
    target?: "_blank" | "_parent" | "_self" | "_top";
    /** vue-router location. Resolves `<router-link>` globally, so vue-router stays optional. */
    to?: unknown;
    /** Native type of the `<button>`. @default "button" */
    type?: "button" | "reset" | "submit";
    /**
     * Visual style. `"danger"` is a solid red button, except with `iconOnly`
     * where the icon carries the red on a neutral background. @default "default"
     */
    variant?: "border" | "danger" | "default" | "nude" | "primary";
}

export declare const BdCard: __VLS_WithTemplateSlots_4<typeof __VLS_component_4, __VLS_TemplateResult_4["slots"]>;

/**
 * Elevated surface for grouping content. Optional `header` slot.
 *
 * @example
 * <BdCard>
 *   <template #header>Settings</template>
 * </BdCard>
 */
export declare interface BdCardProps {
    /** Inner spacing. `none` is for cards holding their own layout. @default "default" */
    padding?: "default" | "none" | "small";
}

export declare const BdCheckbox: __VLS_WithTemplateSlots_5<typeof __VLS_component_5, __VLS_TemplateResult_5["slots"]>;

/**
 * Boolean control rendered as a switch: the knob slides across and squishes
 * while pressed. The native checkbox stays focusable underneath, so Tab and
 * Space work as expected.
 *
 * @example
 * <BdCheckbox v-model="notifications" label="Notifications" />
 * <BdCheckbox v-model="autostart" full-width label="Start on login" />
 */
export declare interface BdCheckboxProps {
    /** Blocks interaction and dims the whole row. */
    disabled?: boolean;
    /** Spans the full width with the label on the left and the switch pushed right — the settings-row layout. */
    fullWidth?: boolean;
    /** Text next to the switch. Use the default slot for markup. */
    label?: string;
}

export declare const BdConfirmDialog: __VLS_WithTemplateSlots_6<typeof __VLS_component_6, __VLS_TemplateResult_6["slots"]>;

/**
 * Dialog asking to confirm an action. Escape, the close button and the cancel
 * button all resolve the same way — as a `cancel`, never as a silent dismissal.
 *
 * Labels are props rather than built-in strings: the library ships no
 * translations, so an app in another language passes its own.
 *
 * @example
 * <BdConfirmDialog
 *   v-model="askDelete"
 *   danger
 *   title="Delete this label?"
 *   message="Messages keep their content, only the label goes."
 *   confirm-label="Delete"
 *   @confirm="remove"
 * />
 */
export declare interface BdConfirmDialogProps {
    /** Dismiss button label. @default "Cancel" */
    cancelLabel?: string;
    /** Confirm button label. @default "Confirm" */
    confirmLabel?: string;
    /** Turns the confirm button red, for a destructive action. */
    danger?: boolean;
    /** Body text. Use the default slot when it needs markup. */
    message?: string;
    /** Heading text. */
    title?: string;
}

/** Palette of the library itself. Same values as the CSS defaults in themes.css. */
export declare const bdDefaultPalette: BdPalette;

export declare const BdDialog: __VLS_WithTemplateSlots_7<typeof __VLS_component_7, __VLS_TemplateResult_7["slots"]>;

/**
 * Modal built on the native `<dialog>`: focus trap, Escape and inert backdrop
 * come free. Opening and closing are animated by the `.bd-anim-dialog` preset.
 *
 * The dialog never grows past the viewport: header and footer stay put and the
 * body scrolls on its own.
 *
 * @example
 * <BdDialog v-model="open" title="Delete this?">
 *   <p>This cannot be undone.</p>
 *   <template #footer>
 *     <BdButton variant="danger" @click="remove">Delete</BdButton>
 *   </template>
 * </BdDialog>
 *
 * @example
 * <!-- App shell: body flush to the edges, chrome keeps its own padding -->
 * <BdDialog v-model="open" size="big" padding="none" title="Settings" subtitle="me@example.com">
 *   <template #actions><BdButton variant="nude" icon-only><PhGear /></BdButton></template>
 *   <MyLayout />
 * </BdDialog>
 *
 * @example
 * <!-- Media viewer: the picture sets the size, the viewport caps it -->
 * <BdDialog v-model="open" size="fit" padding="none" :title="filename">
 *   <img :src="src" style="max-width: 100%; max-height: 100%" />
 * </BdDialog>
 */
export declare interface BdDialogProps {
    /** Hides the close button. Escape still closes — this only removes the cross. */
    hideClose?: boolean;
    /**
     * Body spacing; the header and footer always keep their own. `none` is for a
     * body that runs edge to edge: a form, a picture, an iframe.
     * @default "default"
     */
    padding?: "default" | "none" | "small";
    /**
     * Keeps the dialog open on a backdrop click — for anything holding work in
     * progress, where a stray click would throw it away. Escape and the close
     * button still work.
     */
    persistent?: boolean;
    /**
     * Width preset. `full` fills the viewport, for app-shell dialogs; `fit`
     * shrinks to the content and lets it decide, for media viewers.
     * @default "default"
     */
    size?: "big" | "default" | "fit" | "full" | "small";
    /** Secondary line under the title, truncated when too long. */
    subtitle?: string;
    /** Heading text. Use the `header` slot to replace the whole heading. */
    title?: string;
}

export declare const BdDropdown: __VLS_WithTemplateSlots_8<typeof __VLS_component_8, __VLS_TemplateResult_8["slots"]>;

export declare const BdDropdownItem: __VLS_WithTemplateSlots_9<typeof __VLS_component_9, __VLS_TemplateResult_9["slots"]>;

/**
 * Entry of a BdDropdown. Closes the menu on click unless `keepOpen` is set.
 *
 * @example
 * <BdDropdownItem :icon="PhCopy" @click="duplicate">Duplicate</BdDropdownItem>
 * <BdDropdownItem :active="sort === 'date'" keep-open @click="sort = 'date'">By date</BdDropdownItem>
 */
export declare interface BdDropdownItemProps {
    /** Marks the item as the current choice (primary background). */
    active?: boolean;
    /** Destructive action styling. */
    danger?: boolean;
    /** Blocks the click and dims the item. */
    disabled?: boolean;
    /** Icon component, typically a `Ph*` from `@phosphor-icons/vue`. Use the `icon` slot for anything else. */
    icon?: Component;
    /** Keeps the menu open after the click — for toggles and multi-select filters. */
    keepOpen?: boolean;
}

/** Side the panel opens on, plus how it aligns with the trigger on the cross axis. */
export declare type BdDropdownPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";

/**
 * Dropdown menu anchored to its trigger, built on the Popover API: it lives in
 * the top layer (never clipped by an `overflow` or a `z-index`) and closes on
 * outside click and Escape without any custom listener.
 *
 * The panel flips above the trigger when space runs out below, is nudged back
 * inside the viewport, caps its height to the room left, and follows scrolling.
 * Below 768px it becomes a bottom sheet. Arrow keys move between items.
 *
 * @example
 * <BdDropdown label="Actions">
 *   <BdDropdownItem :icon="PhPencilSimple" @click="rename">Rename</BdDropdownItem>
 *   <BdDropdownItem danger :icon="PhTrash" @click="remove">Delete</BdDropdownItem>
 * </BdDropdown>
 */
export declare interface BdDropdownProps {
    /** Blocks opening and disables the default trigger. */
    disabled?: boolean;
    /** Text of the default trigger button. Ignored when the `trigger` slot is used. @default "Menu" */
    label?: string;
    /** Panel is at least as wide as the trigger — for select-like menus. */
    matchWidth?: boolean;
    /** Gap between trigger and panel, in px. @default 6 */
    offset?: number;
    /** Preferred placement. Flips to the opposite side on its own when space runs out. @default "bottom-start" */
    placement?: BdDropdownPlacement;
    /** Below 768px, turns the panel into a sheet pinned to the bottom of the screen. @default true */
    sheetOnMobile?: boolean;
    /**
     * Height of the default trigger, on the same scale as BdButton. Inherited by
     * buttons in the `trigger` slot.
     * @default "default"
     */
    size?: BdSize;
}

export declare const BdInput: DefineComponent<__VLS_PublicProps_6, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | number) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_6> & Readonly<{
"onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
}>, {
type: "email" | "number" | "password" | "search" | "text" | "url";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

/**
 * Text field with its label, helper text and error state. The label is wired
 * to the input through a generated id.
 *
 * @example
 * <BdInput v-model="email" label="Email" type="email" :error="emailError" />
 */
export declare interface BdInputProps {
    /** Blocks input and dims the field. */
    disabled?: boolean;
    /** Error message below the field. Also turns the border red. Takes precedence over `hint`. */
    error?: string;
    /** Helper text below the field. */
    hint?: string;
    /** Label above the field, wired to it through a generated id. */
    label?: string;
    /** Placeholder shown while the field is empty. */
    placeholder?: string;
    /** Native input type. @default "text" */
    type?: "email" | "number" | "password" | "search" | "text" | "url";
}

export declare const BdLoader: DefineComponent<BdLoaderProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdLoaderProps> & Readonly<{}>, {
size: "default" | "small" | "x-small" | "xx-small";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLSpanElement>;

/**
 * Spinner. BdButton mounts one on its own when `loading` is set.
 *
 * @example
 * <BdLoader size="small" />
 */
export declare interface BdLoaderProps {
    /**
     * Diameter of the spinner. Its own scale, finer than BdSize — a spinner sits
     * inside other controls.
     * @default "default"
     */
    size?: "default" | "small" | "x-small" | "xx-small";
}

/** A choice, shared by every selection component (BdSelect, BdButtonGroup). */
export declare interface BdOption {
    /** Text shown to the user. */
    label: string;
    /** Value bound through `v-model`. */
    value: string;
}

/**
 * The two colors the whole interface is derived from — the only thing an app
 * ever picks. Backgrounds, text, borders and accent states all follow.
 */
export declare interface BdPalette {
    /** Accent, everything interactive. Any CSS color the browser can parse. */
    accent: string;
    /** Background the light/dark ladder is built on. Its luminance picks the theme. */
    base: string;
}

/**
 * Ready-made palettes for the two colors a custom theme needs. `group` only
 * drives how a picker sorts them — the light/dark switch itself is deduced
 * from the luminance of `base`, never from this field.
 */
export declare interface BdPreset {
    /** Accent color, `#rrggbb`. */
    accent: string;
    /** Background the whole palette is derived from, `#rrggbb`. */
    base: string;
    group: BdPresetGroup;
    /** Display name, in English — presets are not translated. */
    name: string;
}

export declare type BdPresetGroup = "dark" | "darker" | "light";

/**
 * Every preset, in display order. Accents are picked to clear WCAG AA (≥ 4.5:1)
 * against white text, so `--bd-on-primary` stays readable on a filled button.
 */
export declare const bdPresets: BdPreset[];

export declare const BdSelect: DefineComponent<__VLS_PublicProps_7, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_7> & Readonly<{
"onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

/**
 * Single choice among `options`, on a styled native `<select>` — keyboard
 * support and the mobile picker come free. For a fully styled panel, an icon
 * per entry or arbitrary content, use BdDropdown instead.
 *
 * @example
 * <BdSelect v-model="fruit" label="Fruit" :options="fruits" placeholder="Pick one" />
 */
export declare interface BdSelectProps {
    /** Blocks selection and dims the control. */
    disabled?: boolean;
    /** Label above the control, wired to it through a generated id. */
    label?: string;
    /** Choices to render. */
    options: BdOption[];
    /** Disabled first entry, shown while `v-model` is empty. */
    placeholder?: string;
}

/** Side of the trigger a panel is placed on. */
export declare type BdSide = "bottom" | "left" | "right" | "top";

/**
 * Control size scale, shared by BdButton, BdButtonGroup and BdDropdown: at
 * equal size those three render exactly the same height, driven by the
 * `--bd-control-height*` tokens.
 */
export declare type BdSize = "big" | "default" | "small" | "x-small";

/** Whether the palette reads dark or light — deduced, never chosen. */
export declare type BdTheme = "dark" | "light";

export declare const BdThemePicker: DefineComponent<BdThemePickerProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdThemePickerProps> & Readonly<{}>, {
accentLabel: string;
baseLabel: string;
presets: BdPreset[];
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

/**
 * Picks the two colors the whole theme is derived from: a base background and
 * an accent. Writes straight into `useTheme().palette`, so the app has nothing
 * to wire — dropping it into a settings page is enough.
 *
 * @example
 * <BdThemePicker />
 * <BdThemePicker :presets="myPresets" accent-label="Couleur d'accent" />
 */
export declare interface BdThemePickerProps {
    /** Label of the accent color input. */
    accentLabel?: string;
    /** Label of the base color input. */
    baseLabel?: string;
    /** Palettes offered in the grid. Defaults to the library's own. */
    presets?: BdPreset[];
}

/** A queued toast, as rendered by BdToaster. */
export declare interface BdToast {
    /** Unique id, returned by `toast()` and accepted by `dismissToast()`. */
    id: number;
    /** Message shown to the user. */
    msg: string;
    variant: BdToastVariant;
}

export declare const BdToaster: DefineComponent<BdToasterProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdToasterProps> & Readonly<{}>, {
position: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

/**
 * Renders the toast queue. Mount it once, near the root of the app, then call
 * `toast()` from anywhere.
 *
 * @example
 * <BdToaster position="bottom-right" />
 */
export declare interface BdToasterProps {
    /** Screen corner the stack grows from. @default "bottom-right" */
    position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

export declare interface BdToastOptions {
    /** Milliseconds before auto-dismiss. `0` keeps the toast until dismissed. @default 4000 */
    duration?: number;
    /** @default "default" */
    variant?: BdToastVariant;
}

/** Status colour of a toast, shared with BdBadge. */
export declare type BdToastVariant = "danger" | "default" | "info" | "success" | "warning";

export declare const BdTooltip: __VLS_WithTemplateSlots_10<typeof __VLS_component_10, __VLS_TemplateResult_10["slots"]>;

/** Axes along which the tooltip tracks the cursor instead of the trigger. */
declare type BdTooltipFollow = "both" | "x" | "y";

/**
 * Tooltip on the default slot. Opens on hover and on keyboard focus, closes on
 * Escape. Built on the Popover API with `popover="manual"`: top layer, without
 * stealing focus or swallowing clicks.
 *
 * Width follows the content up to 20rem then wraps, the side flips when space
 * runs out, and the arrow keeps pointing at the trigger even once the panel
 * has been nudged back inside the viewport.
 *
 * @example
 * <BdTooltip content="Delete permanently">
 *   <BdButton icon-only><PhTrash size="1.2em" /></BdButton>
 * </BdTooltip>
 */
export declare interface BdTooltipProps {
    /** Tooltip text. Use the `content` slot for markup. An empty tooltip never opens. */
    content?: string;
    /** Delay before opening, in ms. Closing is always immediate. @default 150 */
    delay?: number;
    /** Never opens the tooltip. */
    disabled?: boolean;
    /**
     * Track the cursor instead of staying anchored to the trigger. The axis left
     * out stays pinned to the trigger. Off by default.
     */
    follow?: BdTooltipFollow;
    /** Gap between trigger and tooltip, in px. @default 8 */
    offset?: number;
    /** Preferred side. Flips to the opposite one on its own when space runs out. @default "top" */
    side?: BdSide;
}

declare function close_2(): void;

/** Removes a toast by id, before its duration is up. No-op on an unknown id. */
export declare function dismissToast(id: number): void;

/**
 * Whether a color reads as light — i.e. whether dark text belongs on top of it.
 * Accepts `#abc`, `#aabbcc` and `rgb()/rgba()`. Anything unparseable counts as
 * light, the same assumption a blank page makes.
 */
export declare function isLightColor(value: string): boolean;

/**
 * Queues a toast. Callable from anywhere — a store, a helper, an event
 * handler — not just from a component's `setup()`. Requires a single
 * `<BdToaster />` mounted somewhere in the app.
 *
 * @returns The toast id, to dismiss it early.
 * @example
 * toast("Saved", { variant: "success" });
 * const id = toast("Uploading…", { duration: 0 });
 * dismissToast(id);
 */
export declare function toast(msg: string, options?: BdToastOptions): number;

declare function toggle(): void;

/**
 * Reads and writes the theme. Assign to `palette` and every `--bd-*` token
 * follows, along with the `bearded-ui-theme` entry in `localStorage`. State is
 * module-level, so every caller shares the same theme.
 *
 * The DOM effect starts on the first call, never at import time — importing a
 * component alone neither touches the DOM nor breaks under SSR.
 *
 * @example
 * const { palette, theme } = useTheme();
 * palette.value = { accent: "#8343de", base: "#100a1c" };
 * palette.value = bdDefaultPalette;
 */
export declare function useTheme(): {
    /** The base and accent everything is derived from. */
    palette: Ref<BdPalette>;
    /** Dark or light, from the luminance of `palette.base`. Read-only by design. */
    theme: ComputedRef<BdTheme>;
};

/**
 * Same helpers as the standalone exports, plus the live queue — handy to
 * render toasts yourself instead of using BdToaster.
 */
export declare function useToast(): {
    dismissToast: typeof dismissToast;
    toast: typeof toast;
    toasts: Ref<BdToast[]>;
};

export { }
