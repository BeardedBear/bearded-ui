import { ref, type Ref } from "vue";

export type BdToastVariant = "danger" | "default" | "info" | "success" | "warning";

export interface BdToast {
  id: number;
  msg: string;
  variant: BdToastVariant;
}

export interface BdToastOptions {
  /** Milliseconds before auto-dismiss. `0` keeps the toast until dismissed. */
  duration?: number;
  variant?: BdToastVariant;
}

// Module-level queue: `toast()` works from anywhere (stores, helpers, plain
// functions), not just inside setup(). No Pinia dependency in the library.
const toasts = ref<BdToast[]>([]);
let nextId = 0;

export function dismissToast(id: number): void {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

/** Queue a toast. Returns its id, so it can be dismissed early. */
export function toast(msg: string, options: BdToastOptions = {}): number {
  const { duration = 4000, variant = "default" } = options;
  const id = nextId++;

  toasts.value = [...toasts.value, { id, msg, variant }];
  if (duration > 0) setTimeout(() => dismissToast(id), duration);

  return id;
}

export function useToast(): {
  dismissToast: typeof dismissToast;
  toast: typeof toast;
  toasts: Ref<BdToast[]>;
} {
  return { dismissToast, toast, toasts };
}
