import { AllowedComponentProps } from 'vue';
import { Component } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';
import { ShallowUnwrapRef } from 'vue';
import { VNode } from 'vue';
import { VNodeProps } from 'vue';

declare const __VLS_component: DefineComponent<BdBadgeProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdBadgeProps> & Readonly<{}>, {
variant: "danger" | "default" | "info" | "primary" | "success" | "warning";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLSpanElement>;

declare const __VLS_component_10: DefineComponent<__VLS_PublicProps_5, {
focus: () => void | undefined;
select: () => void | undefined;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | number) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_5> & Readonly<{
"onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
}>, {
variant: "code" | "default" | "underline";
type: "email" | "number" | "password" | "search" | "text" | "url";
size: BdSize;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
el: HTMLInputElement;
}, any>;

declare const __VLS_component_11: DefineComponent<BdTooltipProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdTooltipProps> & Readonly<{}>, {
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
variant: "border" | "danger" | "default" | "nude" | "primary" | "success";
type: "button" | "reset" | "submit";
label: string;
size: BdSize;
align: "center" | "justify" | "left";
as: "a" | "button" | "router-link";
href: string;
target: "_blank" | "_parent" | "_self" | "_top";
to: undefined;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_component_3: DefineComponent<BdCardProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdCardProps> & Readonly<{}>, {
padding: "default" | "none" | "small";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLElement>;

declare const __VLS_component_4: DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLLabelElement>;

declare const __VLS_component_5: DefineComponent<__VLS_PublicProps_2, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
cancel: () => any;
"update:modelValue": (value: boolean) => any;
confirm: () => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_2> & Readonly<{
onCancel?: (() => any) | undefined;
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
onConfirm?: (() => any) | undefined;
}>, {
danger: boolean;
title: string;
message: string;
cancelLabel: string;
confirmLabel: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDialogElement>;

declare const __VLS_component_6: DefineComponent<__VLS_PublicProps_3, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_3> & Readonly<{
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
title: string;
size: "big" | "default" | "fit" | "full" | "small";
maxHeight: string;
maxWidth: string;
padding: "default" | "none" | "small";
height: string;
hideClose: boolean;
persistent: boolean;
subtitle: string;
width: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
el: HTMLDialogElement;
}, HTMLDialogElement>;

declare const __VLS_component_7: DefineComponent<__VLS_PublicProps_4, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_4> & Readonly<{
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

declare const __VLS_component_8: DefineComponent<BdDropdownItemProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<BdDropdownItemProps> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLButtonElement>;

declare const __VLS_component_9: DefineComponent<BdEmptyStateProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
action: () => any;
}, string, PublicProps, Readonly<BdEmptyStateProps> & Readonly<{
onAction?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};

declare type __VLS_Props = BdCheckboxProps;

declare type __VLS_Props_2 = BdConfirmDialogProps;

declare type __VLS_Props_3 = BdDialogProps;

declare type __VLS_Props_4 = BdDropdownProps;

declare type __VLS_Props_5 = BdInputProps;

declare type __VLS_Props_6 = BdSelectProps;

declare type __VLS_Props_7 = BdSliderProps;

declare type __VLS_PublicProps = {
    modelValue?: boolean;
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
    modelValue?: number | string;
} & __VLS_Props_5;

declare type __VLS_PublicProps_6 = {
    modelValue?: number | string;
} & __VLS_Props_6;

declare type __VLS_PublicProps_7 = {
    modelValue?: number;
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
        prefix?(_: {}): any;
    };
    refs: {
        el: HTMLInputElement;
    };
    rootEl: any;
};

declare function __VLS_template_11(): {
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
        header?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLElement;
};

declare function __VLS_template_4(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLLabelElement;
};

declare function __VLS_template_5(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDialogElement;
};

declare function __VLS_template_6(): {
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

declare function __VLS_template_7(): {
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

declare function __VLS_template_8(): {
    attrs: Partial<{}>;
    slots: {
        icon?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLButtonElement;
};

declare function __VLS_template_9(): {
    attrs: Partial<{}>;
    slots: {
        icon?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_TemplateResult_10 = ReturnType<typeof __VLS_template_10>;

declare type __VLS_TemplateResult_11 = ReturnType<typeof __VLS_template_11>;

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

declare type __VLS_WithTemplateSlots_11<T, S> = T & {
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

export declare const BdButtonGroup: <T extends number | string = number | string>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly "onUpdate:modelValue"?: ((value: T) => any) | undefined;
    } & VNodeProps & AllowedComponentProps & ComponentCustomProps, never>, "onUpdate:modelValue"> & ({
        modelValue?: T;
    } & BdButtonGroupProps<T>) & Partial<{}>> & PublicProps;
    expose(exposed: ShallowUnwrapRef<    {}>): void;
    attrs: any;
    slots: {
        default?(_: {}): any;
    };
    emit: (evt: "update:modelValue", value: T) => void;
}>) => VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};

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
export declare interface BdButtonGroupProps<T extends number | string = number | string> {
    /** Disables every generated button. Buttons passed through the slot keep their own prop. */
    disabled?: boolean;
    /** Spans the full width, buttons sharing it equally. */
    full?: boolean;
    /**
     * Turns the group into a segmented control bound to `v-model`. Leave empty to
     * pass buttons through the default slot instead.
     */
    options?: BdOption<T>[];
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
    /**
     * Marks the button as the currently selected one — a tool in a toolbar, a tab,
     * a filter chip. It is a state, not a variant: it layers on top of whichever
     * variant the button already has.
     */
    active?: boolean;
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
    /**
     * Accessible name, applied as both `aria-label` and the hover `title`.
     *
     * Effectively required with `iconOnly`: a button whose only content is an
     * icon has no text for a screen reader to read, so without this it announces
     * as "button" and nothing else. In dev, leaving it out on an `iconOnly`
     * button logs a warning.
     */
    label?: string;
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
     * where the icon carries the red on a neutral background. `"success"` marks a
     * state already reached (ready, saved), not an action to take. @default "default"
     */
    variant?: "border" | "danger" | "default" | "nude" | "primary" | "success";
}

export declare const BdCard: __VLS_WithTemplateSlots_3<typeof __VLS_component_3, __VLS_TemplateResult_3["slots"]>;

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

export declare const BdCheckbox: __VLS_WithTemplateSlots_4<typeof __VLS_component_4, __VLS_TemplateResult_4["slots"]>;

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

export declare const BdConfirmDialog: __VLS_WithTemplateSlots_5<typeof __VLS_component_5, __VLS_TemplateResult_5["slots"]>;

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

export declare const BdDialog: __VLS_WithTemplateSlots_6<typeof __VLS_component_6, __VLS_TemplateResult_6["slots"]>;

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
    /**
     * Fixes the dialog's height. Any CSS length.
     *
     * By default the height follows the content, which means a dialog whose
     * content arrives late — search results, a fetched list — is a thin strip on
     * open and jumps once the first response lands. `maxHeight` cannot help
     * there: a cap is a ceiling, not a floor. Setting this holds the panel still
     * and lets its body scroll instead. Still bounded by `maxHeight`, so a short
     * window wins.
     */
    height?: string;
    /** Hides the close button. Escape still closes — this only removes the cross. */
    hideClose?: boolean;
    /**
     * Caps the dialog's height. Any CSS length — `"36rem"`, `"70vh"`, `"min(40rem, 80vh)"`.
     * @default "90vh"
     */
    maxHeight?: string;
    /**
     * Caps the dialog's width. Any CSS length.
     *
     * Narrower than the width its `size` preset asks for, this wins — useful for
     * one dialog that should not follow the preset without inventing a new one.
     * @default "90vw"
     */
    maxWidth?: string;
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
    /**
     * Fixes the dialog's width, overriding whatever `size` asks for. Any CSS
     * length — for the one dialog that should not follow a preset.
     */
    width?: string;
}

export declare const BdDropdown: __VLS_WithTemplateSlots_7<typeof __VLS_component_7, __VLS_TemplateResult_7["slots"]>;

export declare const BdDropdownItem: __VLS_WithTemplateSlots_8<typeof __VLS_component_8, __VLS_TemplateResult_8["slots"]>;

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

export declare const BdEmptyState: __VLS_WithTemplateSlots_9<typeof __VLS_component_9, __VLS_TemplateResult_9["slots"]>;

export declare interface BdEmptyStateProps {
    /** Label for the single recovery action. Omit for a plain empty state. */
    actionLabel?: string;
    /** One sentence explaining the state, or what to do about it. */
    message?: string;
    /** Short heading naming the state. */
    title: string;
}

export declare const BdInput: __VLS_WithTemplateSlots_10<typeof __VLS_component_10, __VLS_TemplateResult_10["slots"]>;

/**
 * Text field with its label, helper text and error state. The label is wired
 * to the input through a generated id.
 *
 * Every attribute that isn't a prop (`maxlength`, `autofocus`, `autocomplete`,
 * `@blur`, …) lands on the `<input>`, not on the wrapper — otherwise `focus`
 * and `blur`, which don't bubble, would never reach a listener.
 *
 * @example
 * <BdInput v-model="email" label="Email" type="email" :error="emailError" />
 * <BdInput v-model="code" variant="code" maxlength="6" placeholder="ABC123" />
 * <BdInput v-model="user"><template #prefix>@</template></BdInput>
 */
export declare interface BdInputProps {
    /** Blocks input and dims the field. */
    disabled?: boolean;
    /** Error state. A string is also rendered below the field, in place of `hint`. */
    error?: boolean | string;
    /** Helper text below the field. */
    hint?: string;
    /** Label above the field, wired to it through a generated id. */
    label?: string;
    /** Placeholder shown while the field is empty. */
    placeholder?: string;
    /**
     * Height of the control, on the same scale as BdButton — so a field and the
     * button next to it line up. @default "default"
     */
    size?: BdSize;
    /** Native input type. @default "text" */
    type?: "email" | "number" | "password" | "search" | "text" | "url";
    /**
     * `code` for a short hand-typed reference (monospace, spaced out, uppercased);
     * `underline` for renaming in place, where the field should read as editable
     * text rather than as a form control. @default "default"
     */
    variant?: "code" | "default" | "underline";
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

/**
 * A choice, shared by every selection component (BdSelect, BdButtonGroup).
 * Generic over its value so a caller's own union (`"text" | "drawing"`, a count)
 * survives all the way to the `v-model` instead of widening to `number | string`.
 */
export declare interface BdOption<T extends number | string = number | string> {
    /** Text shown to the user. */
    label: string;
    /** Hint shown on hover. Rendered as a BdTooltip by BdButtonGroup only — a native <select> can't hold one. */
    tooltip?: string;
    /** Value bound through `v-model`. Numbers are as common as strings here: a count, a duration, a rank. */
    value: T;
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
    /**
     * Name of the preset this palette came from, when it came from one.
     *
     * Persisted alongside the colors so a stored theme keeps its identity: on the
     * next load the preset is looked up again and its *current* colors win.
     * Without it, correcting a preset never reached anyone who had already picked
     * it — each app stayed pinned to whatever hex pair it happened to save.
     *
     * Undefined for a hand-picked palette, which is never re-resolved.
     */
    name?: string;
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
    /**
     * One-time migration table. **Frozen — do not append to it.**
     *
     * It exists only for palettes saved *before* `name` was persisted, which left
     * two hex values behind and nothing else. `useTheme` consults it only when a
     * stored palette has no name; the resolved palette is then written straight
     * back to `localStorage` *with* its name, so a given browser hits this path
     * exactly once and never again.
     *
     * That is why a future change to a preset's colors needs no entry here: by
     * then every stored palette carries a name, and name resolution already picks
     * up the new values. Appending would add a pair nothing ever reads, and every
     * extra pair is one more chance of colliding with some other preset's live
     * colors — which would silently rename that theme for everyone using it (see
     * tests/theme-presets.test.ts).
     *
     * End of life: once every bearded-* app has shipped a release carrying named
     * persistence and been opened once, this field and its data can be deleted
     * outright.
     */
    legacy?: {
        accent: string;
        base: string;
    }[];
    /** Display name, in English — presets are not translated. */
    name: string;
}

export declare type BdPresetGroup = "dark" | "darker" | "light";

/**
 * Every preset, in display order. Accents are picked to clear WCAG AA (≥ 4.5:1)
 * against white text, so `--bd-on-primary` stays readable on a filled button.
 *
 * Les couples bleus sont harmonisés : le fond et l'accent partagent la même
 * teinte, sans quoi l'écran affiche toute la famille intermédiaire produite par
 * les surfaces teintées d'accent — c'est ce qui disloque un camaïeu, pas la
 * façon de le décliner. L'alignement déplace toujours le côté qui ne coûte
 * rien : un fond porte 0.02 à 0.04 de chroma, un accent jusqu'à 0.22, et en
 * sRGB une teinte bleue ne tient pas la même saturation à 250° qu'à 275°.
 * Faire virer un accent indigo vers le bleu franc lui coûterait jusqu'au tiers
 * de sa coloration — donc là où ça pique, c'est le fond qui rejoint l'accent.
 */
export declare const bdPresets: BdPreset[];

export declare const BdSelect: DefineComponent<__VLS_PublicProps_6, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | number) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_6> & Readonly<{
"onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
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

export declare const BdSlider: DefineComponent<__VLS_PublicProps_7, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: number) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps_7> & Readonly<{
"onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
max: number;
min: number;
orientation: "horizontal" | "vertical";
step: number;
thickness: number;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
track: HTMLDivElement;
}, HTMLDivElement>;

/**
 * Fill-track slider, dragged anywhere along the track rather than by a knob —
 * a fader, not a form range. Pointer events cover mouse, pen and touch with one
 * path, and the arrow keys move it by one `step`.
 *
 * Vertical mode fills the height it is given, so its length is the caller's
 * decision: a fixed height, a flex row, or a `cqh` expression under a
 * `container-type: size` ancestor.
 *
 * @example
 * <BdSlider v-model="volume" />
 * <BdSlider v-model="brushSize" orientation="vertical" :min="1" :max="200" />
 */
export declare interface BdSliderProps {
    /** Blocks interaction and dims the track. */
    disabled?: boolean;
    /** Highest value. @default 100 */
    max?: number;
    /** Lowest value. @default 0 */
    min?: number;
    /** Direction the fill grows in. Vertical grows upwards. @default "horizontal" */
    orientation?: "horizontal" | "vertical";
    /** Granularity of a drag and of one arrow-key press. @default 1 */
    step?: number;
    /** Thickness of the track in px — its height when horizontal, its width when vertical. */
    thickness?: number;
}

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
    /** Optional single action, rendered as a button next to the message. */
    action?: BdToastAction;
    /** Unique id, returned by `toast()` and accepted by `dismissToast()`. */
    id: number;
    /** Message shown to the user. */
    msg: string;
    variant: BdToastVariant;
}

/**
 * A single action offered by a toast — an Undo, a Retry, a "View".
 *
 * Deliberately one action, not a list: a toast is a transient strip with room
 * for one decision, and a second button turns it into a dialog that dismisses
 * itself.
 */
export declare interface BdToastAction {
    /** Button text. Keep it a verb — "Undo", "Retry". */
    label: string;
    /**
     * Runs on click. The toast dismisses itself first, so a slow handler never
     * leaves a dead button on screen, and a second click cannot fire it twice.
     * Rejections are the caller's to handle.
     */
    onAction: () => Promise<void> | void;
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
    /**
     * Adds a single action button. An action usually wants a longer `duration`
     * than a plain notice — the reader has to notice it and decide.
     */
    action?: BdToastAction;
    /** Milliseconds before auto-dismiss. `0` keeps the toast until dismissed. @default 4000 */
    duration?: number;
    /** @default "default" */
    variant?: BdToastVariant;
}

/** Status colour of a toast, shared with BdBadge. */
export declare type BdToastVariant = "danger" | "default" | "info" | "success" | "warning";

export declare const BdTooltip: __VLS_WithTemplateSlots_11<typeof __VLS_component_11, __VLS_TemplateResult_11["slots"]>;

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
 * @example
 * toast("Album removed", {
 *   action: { label: "Undo", onAction: () => restore() },
 *   duration: 8000,
 * });
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
