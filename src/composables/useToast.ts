import { ref, type Ref } from "vue";

/** A queued toast, as rendered by BdToaster. */
export interface BdToast {
  /** Unique id, returned by `toast()` and accepted by `dismissToast()`. */
  id: number;
  /** Message shown to the user. */
  msg: string;
  variant: BdToastVariant;
}

export interface BdToastOptions {
  /** Milliseconds before auto-dismiss. `0` keeps the toast until dismissed. @default 4000 */
  duration?: number;
  /** @default "default" */
  variant?: BdToastVariant;
}

/** Status colour of a toast, shared with BdBadge. */
export type BdToastVariant = "danger" | "default" | "info" | "success" | "warning";

// Module-level queue: `toast()` works from anywhere (stores, helpers, plain
// functions), not just inside setup(). No Pinia dependency in the library.
const toasts = ref<BdToast[]>([]);
let nextId = 0;

/** Removes a toast by id, before its duration is up. No-op on an unknown id. */
export function dismissToast(id: number): void {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

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
export function toast(msg: string, options: BdToastOptions = {}): number {
  const { duration = 4000, variant = "default" } = options;
  const id = nextId++;

  toasts.value = [...toasts.value, { id, msg, variant }];
  if (duration > 0) setTimeout(() => dismissToast(id), duration);

  return id;
}

/**
 * Same helpers as the standalone exports, plus the live queue — handy to
 * render toasts yourself instead of using BdToaster.
 */
export function useToast(): {
  dismissToast: typeof dismissToast;
  toast: typeof toast;
  toasts: Ref<BdToast[]>;
} {
  return { dismissToast, toast, toasts };
}
