<script setup lang="ts">
import { ref } from "vue";

import {
  BdBadge,
  BdButton,
  BdCard,
  BdDialog,
  BdInput,
  BdLoader,
  type BdScheme,
  bdSchemes,
  BdSelect,
  useTheme,
} from "@/index";

const { scheme, theme, toggleTheme } = useTheme();

const text = ref("");
const fruit = ref("");
const dialogOpen = ref(false);

const bgTokens = ["darker", "dark", "", "light", "lighter"];
const fontTokens = ["darker", "dark", "", "light"];
const primaryTokens = ["darker", "dark", "", "light", "lighter"];
const stateTokens = ["success", "warning", "danger", "info"];
const sizes = ["xs", "sm", "base", "lg", "xl"] as const;
const spaces = [1, 2, 3, 4, 5, 6];
const radii = ["sm", "md", "lg", "full"];

const fruits = [
  { label: "Pomme", value: "apple" },
  { label: "Poire", value: "pear" },
  { label: "Banane", value: "banana" },
];

function tokenVar(prefix: string, suffix: string): string {
  return suffix ? `--bd-${prefix}-${suffix}` : `--bd-${prefix}`;
}
</script>

<template>
  <div class="page">
    <header class="topbar">
      <div>
        <h1>bearded-ui</h1>
        <p class="muted">Design tokens et composants Vue 3 partagés des projets Bearded*</p>
      </div>
      <div class="topbar-actions">
        <BdSelect
          :model-value="scheme"
          :options="bdSchemes.map((s) => ({ label: s, value: s }))"
          @update:model-value="scheme = $event as BdScheme"
        />
        <BdButton variant="border" @click="toggleTheme">{{ theme === "dark" ? "☾ Dark" : "☀ Light" }}</BdButton>
      </div>
    </header>

    <section>
      <h2 class="bd-heading">Couleurs</h2>
      <div class="stack">
        <div class="swatches">
          <div v-for="t in primaryTokens" :key="t" class="swatch">
            <span class="swatch-chip" :style="{ background: `var(${tokenVar('primary', t)})` }" />
            <code>{{ tokenVar("primary", t) }}</code>
          </div>
        </div>
        <div class="swatches">
          <div v-for="t in bgTokens" :key="t" class="swatch">
            <span class="swatch-chip" :style="{ background: `var(${tokenVar('bg', t)})` }" />
            <code>{{ tokenVar("bg", t) }}</code>
          </div>
        </div>
        <div class="swatches">
          <div v-for="t in fontTokens" :key="t" class="swatch">
            <span class="swatch-chip" :style="{ background: `var(${tokenVar('font-color', t)})` }" />
            <code>{{ tokenVar("font-color", t) }}</code>
          </div>
        </div>
        <div class="swatches">
          <div v-for="t in stateTokens" :key="t" class="swatch">
            <span class="swatch-chip" :style="{ background: `var(--bd-${t})` }" />
            <code>--bd-{{ t }}</code>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="bd-heading">Typographie</h2>
      <BdCard>
        <p v-for="size in sizes" :key="size" :style="{ fontSize: `var(--bd-font-size-${size})` }">
          <code class="muted">--bd-font-size-{{ size }}</code> — Bricolage Grotesque
        </p>
        <p>
          <span class="bd-font-bold">Bold</span> · <span class="bd-font-italic">Italic</span> ·
          <span class="bd-font-bold-italic">Bold italic</span> ·
          <code>code inline</code>
        </p>
        <p><a href="#">Un lien</a> dans un paragraphe de texte courant.</p>
      </BdCard>
    </section>

    <section>
      <h2 class="bd-heading">Espacements & rayons</h2>
      <div class="stack">
        <div class="swatches">
          <div v-for="s in spaces" :key="s" class="swatch">
            <span class="swatch-bar" :style="{ width: `var(--bd-space-${s})` }" />
            <code>--bd-space-{{ s }}</code>
          </div>
        </div>
        <div class="swatches">
          <div v-for="r in radii" :key="r" class="swatch">
            <span class="swatch-chip" :style="{ borderRadius: `var(--bd-radius-${r})` }" />
            <code>--bd-radius-{{ r }}</code>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="bd-heading">Boutons</h2>
      <BdCard>
        <div class="row">
          <BdButton>Default</BdButton>
          <BdButton variant="primary">Primary</BdButton>
          <BdButton variant="border">Border</BdButton>
          <BdButton variant="nude">Nude</BdButton>
          <BdButton variant="danger">Danger</BdButton>
          <BdButton disabled>Disabled</BdButton>
          <BdButton loading variant="primary">Loading</BdButton>
        </div>
        <div class="row">
          <BdButton size="x-small">x-small</BdButton>
          <BdButton size="small">small</BdButton>
          <BdButton>default</BdButton>
          <BdButton size="big">big</BdButton>
          <BdButton icon-only variant="primary">★</BdButton>
          <BdButton href="https://github.com/BeardedBear" target="_blank">Lien &lt;a&gt;</BdButton>
        </div>
        <div class="row">
          <BdButton align="justify" full variant="border">
            <span>Full + justify</span>
            <span>›</span>
          </BdButton>
        </div>
      </BdCard>
    </section>

    <section>
      <h2 class="bd-heading">Formulaires</h2>
      <BdCard>
        <div class="row row-form">
          <BdInput v-model="text" hint="Visible sous le champ" label="Label" placeholder="Tape ici…" />
          <BdInput error="Champ requis" label="En erreur" model-value="" />
          <BdInput disabled label="Désactivé" model-value="nope" />
          <BdSelect v-model="fruit" label="Fruit" :options="fruits" placeholder="Choisir…" />
        </div>
      </BdCard>
    </section>

    <section>
      <h2 class="bd-heading">Feedback</h2>
      <BdCard>
        <div class="row">
          <BdBadge>Default</BdBadge>
          <BdBadge variant="primary">Primary</BdBadge>
          <BdBadge variant="success">Success</BdBadge>
          <BdBadge variant="warning">Warning</BdBadge>
          <BdBadge variant="danger">Danger</BdBadge>
          <BdBadge variant="info">Info</BdBadge>
        </div>
        <div class="row">
          <BdLoader size="xx-small" />
          <BdLoader size="x-small" />
          <BdLoader size="small" />
          <BdLoader />
        </div>
        <div class="row">
          <BdButton variant="primary" @click="dialogOpen = true">Ouvrir la dialog</BdButton>
        </div>
      </BdCard>
    </section>

    <BdDialog v-model="dialogOpen" title="Dialog native">
      <p>Basée sur <code>&lt;dialog&gt;</code> : Échap, focus trap et backdrop gratuits.</p>
      <template #footer>
        <BdButton variant="nude" @click="dialogOpen = false">Annuler</BdButton>
        <BdButton variant="primary" @click="dialogOpen = false">OK</BdButton>
      </template>
    </BdDialog>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-6);
  margin: 0 auto;
  max-width: 60rem;
  padding: var(--bd-space-6) var(--bd-space-4) var(--bd-space-6);
}

.topbar {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: var(--bd-space-4);
  justify-content: space-between;
}

.topbar-actions {
  align-items: center;
  display: flex;
  gap: var(--bd-space-2);
}

.muted {
  color: var(--bd-font-color-dark);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-3);
}

.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bd-space-3);
}

.swatch {
  align-items: center;
  background-color: var(--bd-bg-dark);
  border: 1px solid var(--bd-border-color);
  border-radius: var(--bd-radius-md);
  display: flex;
  font-size: var(--bd-font-size-xs);
  gap: var(--bd-space-2);
  padding: var(--bd-space-2);
}

.swatch-chip {
  background-color: var(--bd-primary);
  border: 1px solid var(--bd-border-color);
  border-radius: var(--bd-radius-sm);
  display: block;
  height: 1.5rem;
  width: 1.5rem;
}

.swatch-bar {
  background-color: var(--bd-primary);
  display: block;
  height: 1.5rem;
}

.row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--bd-space-3);

  & + & {
    margin-top: var(--bd-space-4);
  }
}

.row-form {
  align-items: flex-start;

  & > * {
    flex: 1 1 12rem;
  }
}
</style>
