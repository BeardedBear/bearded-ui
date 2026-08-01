<script setup lang="ts">
import { onMounted, ref } from "vue";

import {
  BdBadge,
  BdButton,
  BdButtonGroup,
  BdCard,
  BdCheckbox,
  BdDialog,
  BdInput,
  BdLoader,
  type BdScheme,
  bdSchemes,
  BdSelect,
  type BdTheme,
  BdToaster,
  toast,
  useTheme,
} from "@/index";

const { scheme, theme } = useTheme();

const text = ref("");
const fruit = ref("");
const dialogOpen = ref(false);
const notifications = ref(true);
const autostart = ref(false);
const view = ref("list");

const views = [
  { label: "Liste", value: "list" },
  { label: "Grille", value: "grid" },
  { label: "Tableau", value: "table" },
];

const bgTokens = ["darker", "dark", "", "light", "lighter"];
const fontTokens = ["darker", "dark", "", "light"];
const primaryTokens = ["darker", "dark", "", "light", "lighter"];
const stateTokens = ["success", "warning", "danger", "info"];
const sizes = ["xs", "sm", "base", "lg", "xl"] as const;
// Usages relevés dans les composants de la lib — la doc décrit l'existant, pas un vœu pieux.
const spaces = [
  { step: 1, usage: "Gaps serrés : label ↔ champ, icône ↔ texte d'un badge" },
  { step: 2, usage: "Gap entre boutons, padding vertical des champs et du toast" },
  { step: 3, usage: "Padding horizontal des champs, card compacte, marge sous un header" },
  { step: 4, usage: "Padding horizontal du toast, marge sous le header de dialog" },
  { step: 5, usage: "Padding des cards et dialogs, marge des toasts à l'écran" },
  { step: 6, usage: "Séparation entre sections de page" },
];

const radii = [
  { name: "sm", usage: "Champs, select, petits contrôles" },
  { name: "md", usage: "Cards, toasts, conteneurs" },
  { name: "lg", usage: "Boutons, dialogs" },
  { name: "full", usage: "Badges, pastilles, pilules" },
];

// Lues au runtime plutôt que recopiées : la doc ne peut pas diverger des tokens.
const computedValues = ref<Record<string, string>>({});

onMounted(() => {
  const styles = getComputedStyle(document.documentElement);
  const rootFontSize = parseFloat(styles.fontSize);
  const read = (token: string): string => styles.getPropertyValue(token).trim();

  computedValues.value = {
    ...Object.fromEntries(
      spaces.map(({ step }) => {
        const rem = read(`--bd-space-${step}`);
        return [`--bd-space-${step}`, `${rem} · ${Math.round(parseFloat(rem) * rootFontSize)}px`];
      }),
    ),
    ...Object.fromEntries(radii.map(({ name }) => [`--bd-radius-${name}`, read(`--bd-radius-${name}`)])),
  };
});

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
        <BdButtonGroup
          :model-value="theme"
          :options="[
            { label: '☀ Light', value: 'light' },
            { label: '☾ Dark', value: 'dark' },
          ]"
          @update:model-value="theme = $event as BdTheme"
        />
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
      <h2 class="bd-heading">Espacements</h2>
      <BdCard>
        <p class="muted">
          Échelle unique pour <code>padding</code>, <code>margin</code> et <code>gap</code>. Un cran par
          intention : pas de valeur en dur dans les composants.
        </p>
        <div class="specimens">
          <figure
            v-for="{ step, usage } in spaces"
            :key="step"
            class="specimen"
            :style="{ '--demo': `var(--bd-space-${step})` }"
          >
            <div class="demos">
              <div class="demo-padding"><span class="demo-box">padding</span></div>
              <div class="demo-gap">
                <span class="demo-box demo-box-square" />
                <span class="demo-box demo-box-square" />
                <span class="demo-box demo-box-square" />
              </div>
            </div>
            <figcaption>
              <code>--bd-space-{{ step }}</code>
              <span class="muted">{{ computedValues[`--bd-space-${step}`] }}</span>
              <span class="muted">{{ usage }}</span>
            </figcaption>
          </figure>
        </div>
        <p class="muted">
          Au-delà de <code>--bd-space-6</code>, l'espacement relève du layout de l'app : à définir côté
          projet plutôt qu'ici.
        </p>
      </BdCard>
    </section>

    <section>
      <h2 class="bd-heading">Rayons</h2>
      <BdCard>
        <div class="specimens">
          <figure v-for="{ name, usage } in radii" :key="name" class="specimen">
            <div class="demo-radius" :style="{ borderRadius: `var(--bd-radius-${name})` }" />
            <figcaption>
              <code>--bd-radius-{{ name }}</code>
              <span class="muted">{{ computedValues[`--bd-radius-${name}`] }}</span>
              <span class="muted">{{ usage }}</span>
            </figcaption>
          </figure>
        </div>
      </BdCard>
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
      <h2 class="bd-heading">Groupes de boutons</h2>
      <BdCard>
        <div class="row">
          <BdButtonGroup v-model="view" :options="views" />
          <BdButtonGroup v-model="view" :options="views" size="small" />
        </div>
        <p class="muted">
          Avec <code>options</code>, c'est un segmented control (<code>v-model</code>). Sans, le slot
          accueille des boutons libres.
        </p>
        <div class="row">
          <BdButtonGroup>
            <BdButton>‹</BdButton>
            <BdButton>Aujourd'hui</BdButton>
            <BdButton>›</BdButton>
          </BdButtonGroup>
        </div>
        <div class="settings">
          <BdButtonGroup v-model="view" full :options="views" />
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
        <div class="row">
          <BdCheckbox v-model="notifications" label="Notifications" />
          <BdCheckbox v-model="autostart" label="Démarrage auto" />
          <BdCheckbox disabled label="Désactivé" :model-value="true" />
        </div>
        <div class="settings">
          <BdCheckbox v-model="notifications" full-width label="Pleine largeur, label à gauche" />
          <BdCheckbox v-model="autostart" full-width label="Une ligne par réglage" />
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

    <section>
      <h2 class="bd-heading">Toasts</h2>
      <BdCard>
        <div class="row">
          <BdButton @click="toast('Message par défaut')">Default</BdButton>
          <BdButton @click="toast('Sauvegardé', { variant: 'success' })">Success</BdButton>
          <BdButton @click="toast('Attention', { variant: 'warning' })">Warning</BdButton>
          <BdButton @click="toast('Ça a raté', { variant: 'danger' })">Danger</BdButton>
          <BdButton @click="toast('Pour info', { variant: 'info' })">Info</BdButton>
          <BdButton
            variant="border"
            @click="toast('Reste jusqu\'au clic', { duration: 0, variant: 'info' })"
          >
            Persistant
          </BdButton>
        </div>
        <p class="muted">Clic sur un toast pour le fermer. Auto-dismiss après 4 s par défaut.</p>
      </BdCard>
    </section>

    <BdDialog v-model="dialogOpen" title="Dialog native">
      <p>Basée sur <code>&lt;dialog&gt;</code> : Échap, focus trap et backdrop gratuits.</p>
      <template #footer>
        <BdButton variant="nude" @click="dialogOpen = false">Annuler</BdButton>
        <BdButton variant="primary" @click="dialogOpen = false">OK</BdButton>
      </template>
    </BdDialog>

    <BdToaster />
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

.specimens {
  display: grid;
  gap: var(--bd-space-4);
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  margin: var(--bd-space-4) 0 0;
}

.specimen {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-2);
  margin: 0;
}

.demos {
  align-items: flex-start;
  display: flex;
  gap: var(--bd-space-4);
}

/* The tinted band around the inner box *is* the token: what padding buys you. */
.demo-padding {
  background-color: color-mix(in srgb, var(--bd-primary) 30%, transparent);
  border: 1px dashed var(--bd-primary);
  border-radius: var(--bd-radius-sm);
  display: inline-block;
  padding: var(--demo);
}

.demo-gap {
  display: flex;
  gap: var(--demo);
}

.demo-box {
  background-color: var(--bd-bg-lighter);
  border-radius: var(--bd-radius-sm);
  color: var(--bd-font-color-dark);
  display: block;
  font-size: var(--bd-font-size-xs);
  padding: var(--bd-space-1) var(--bd-space-2);
  white-space: nowrap;
}

.demo-box-square {
  height: 2rem;
  padding: 0;
  width: 0.9rem;
}

.demo-radius {
  background-color: var(--bd-primary);
  height: 4.5rem;
  width: 100%;
}

figcaption {
  display: flex;
  flex-direction: column;
  font-size: var(--bd-font-size-xs);
  gap: var(--bd-space-1);
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

.settings {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-3);
  margin-top: var(--bd-space-4);
  max-width: 24rem;
}

.row-form {
  align-items: flex-start;

  & > * {
    flex: 1 1 12rem;
  }
}
</style>
