<script setup lang="ts">
/**
 * Boolean control rendered as a switch: the knob slides across and squishes
 * while pressed. The native checkbox stays focusable underneath, so Tab and
 * Space work as expected.
 *
 * @example
 * <BdCheckbox v-model="notifications" label="Notifications" />
 * <BdCheckbox v-model="autostart" full-width label="Start on login" />
 */
export interface BdCheckboxProps {
  /** Blocks interaction and dims the whole row. */
  disabled?: boolean;
  /** Spans the full width with the label on the left and the switch pushed right — the settings-row layout. */
  fullWidth?: boolean;
  /** Text next to the switch. Use the default slot for markup. */
  label?: string;
}

defineProps<BdCheckboxProps>();

const model = defineModel<boolean>({ default: false });
</script>

<template>
  <label class="bd-checkbox" :class="{ 'bd-checkbox-full': fullWidth, 'is-disabled': disabled }">
    <span v-if="label || $slots.default" class="bd-checkbox-label"><slot>{{ label }}</slot></span>
    <span class="bd-checkbox-switch">
      <!-- Kept in the flow (opacity 0, not display:none) so it stays focusable and Space toggles it. -->
      <input v-model="model" class="bd-checkbox-input" :disabled="disabled" type="checkbox" />
      <span class="bd-checkbox-track bd-squircle" />
      <span class="bd-checkbox-knob bd-squircle" />
    </span>
  </label>
</template>

<style scoped>
.bd-checkbox {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row-reverse;
  gap: var(--bd-space-3);
  justify-content: flex-start;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.bd-checkbox-full {
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.bd-checkbox-switch {
  --track-height: 1.4rem;
  --track-width: 2.5rem;
  --knob-gap: var(--bd-space-1);
  --knob-size: calc(var(--track-height) - var(--knob-gap) * 2);

  display: block;
  flex: none;
  height: var(--track-height);
  position: relative;
  width: var(--track-width);
}

.bd-checkbox-input {
  cursor: inherit;
  height: 100%;
  inset: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  width: 100%;
  z-index: 2;
}

.bd-checkbox-track {
  background-color: var(--bd-bg-darker);
  border-radius: var(--bd-radius-full);
  inset: 0;
  position: absolute;
  transition: background-color var(--bd-duration) ease;
}

.bd-checkbox-knob {
  background-color: var(--bd-bg-lighter);
  border-radius: var(--bd-radius-full);
  height: var(--knob-size);
  left: var(--knob-gap);
  position: absolute;
  top: var(--knob-gap);
  /* Les trois propriétés réellement animées : left et width pour le squish. */
  transition:
    background-color var(--bd-duration) ease,
    left var(--bd-duration) ease,
    width var(--bd-duration) ease;
  width: var(--knob-size);
  z-index: 1;
}

.bd-checkbox-input:checked {
  ~ .bd-checkbox-track {
    background-color: var(--bd-primary);
  }

  ~ .bd-checkbox-knob {
    background-color: #fff;
    left: calc(var(--track-width) - var(--knob-size) - var(--knob-gap));
  }
}

/* Squish while pressed: the knob stretches from the edge it's anchored to. */
.bd-checkbox-input:active:not(:disabled) {
  ~ .bd-checkbox-knob {
    width: calc(var(--track-width) - var(--knob-gap) * 2);
  }

  &:checked ~ .bd-checkbox-knob {
    left: var(--knob-gap);
  }
}

.bd-checkbox-input:focus-visible ~ .bd-checkbox-track {
  outline: 2px solid var(--bd-primary);
  outline-offset: 2px;
}

</style>
