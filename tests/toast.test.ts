import { expect, test } from "bun:test";

import { dismissToast, toast, useToast } from "../src/composables/useToast";

const { toasts } = useToast();

test("queues, dismisses and auto-dismisses", async () => {
  const id = toast("hello", { duration: 0, variant: "success" });
  expect(toasts.value).toHaveLength(1);
  expect(toasts.value[0]).toMatchObject({ id, msg: "hello", variant: "success" });

  // duration 0 never expires on its own
  await Bun.sleep(20);
  expect(toasts.value).toHaveLength(1);

  dismissToast(id);
  expect(toasts.value).toHaveLength(0);

  toast("bye", { duration: 10 });
  await Bun.sleep(30);
  expect(toasts.value).toHaveLength(0);
});

test("dismisses the exact toast, not the first one", () => {
  const first = toast("a", { duration: 0 });
  const second = toast("b", { duration: 0 });

  dismissToast(second);
  expect(toasts.value.map((t) => t.id)).toEqual([first]);

  dismissToast(first);
});
