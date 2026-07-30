# bearded-ui

Design tokens + composants Vue 3 partagés par [beardify](https://github.com/BeardedBear/beardify),
[bearded-sketch](https://github.com/BeardedBear/bearded-sketch),
[bearded-chat](https://github.com/BeardedBear/bearded-chat) et
[bearded-mail](https://github.com/BeardedBear/bearded-mail).

## Install

```bash
bun add github:BeardedBear/bearded-ui   # ou npm i github:BeardedBear/bearded-ui
```

Le script `prepare` construit `dist/` à l'install : pas besoin de publier sur npm.

## Usage

```ts
// main.ts
import "bearded-ui/style.css";
```

```vue
<script setup lang="ts">
import { BdButton, useTheme } from "bearded-ui";

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <BdButton variant="primary" @click="toggleTheme">{{ theme }}</BdButton>
</template>
```

La police (Bricolage Grotesque) n'est pas embarquée — ajoute-la dans ton `index.html` :

```html
<link
  href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap"
  rel="stylesheet"
/>
```

## Thème

Deux axes indépendants, posés en attributs sur `<html>` :

| Attribut      | Valeurs                                         |
| ------------- | ----------------------------------------------- |
| `data-theme`  | `dark` (défaut), `light`                        |
| `data-scheme` | `default`, `blue`, `crimson`, `apple`, `orange` |

`useTheme()` les pilote et persiste le choix dans `localStorage` (`bearded-ui-theme`).
Tout est en CSS pur : n'importe quel token peut être redéfini dans l'app.

## Tokens

| Famille    | Variables                                                                           |
| ---------- | ----------------------------------------------------------------------------------- |
| Accent     | `--bd-primary{,-darker,-dark,-light,-lighter}`, `--bd-on-primary`                    |
| Fonds      | `--bd-bg{,-darker,-dark,-light,-lighter}`, `--bd-border-color`, `--bd-overlay-color` |
| Texte      | `--bd-font-color{,-darker,-dark,-light}`                                             |
| États      | `--bd-success`, `--bd-warning`, `--bd-danger`, `--bd-info`                           |
| Typo       | `--bd-font-family`, `--bd-font-size-{xs,sm,base,lg,xl}`, `--bd-font-weight{,-bold}`  |
| Espacement | `--bd-space-1` → `--bd-space-6` (voir ci-dessous)                                    |
| Rayons     | `--bd-radius-{sm,md,lg,full}`                                                        |
| Ombres     | `--bd-shadow-{sm,md,lg}`                                                             |
| Motion     | `--bd-transition{,-fast}`                                                            |

### Espacements

Échelle unique pour `padding`, `margin` et `gap` — un cran par intention, pas de valeur en dur
dans les composants. (px calculés à la racine par défaut, `font-size: 14px`.)

| Token           | rem       | px   | Usage                                                              |
| --------------- | --------- | ---- | ------------------------------------------------------------------ |
| `--bd-space-1`  | 0.25rem   | 4    | Gaps serrés : label ↔ champ, icône ↔ texte d'un badge              |
| `--bd-space-2`  | 0.5rem    | 7    | Gap entre boutons, padding vertical des champs et du toast          |
| `--bd-space-3`  | 0.75rem   | 11   | Padding horizontal des champs, card compacte, marge sous un header  |
| `--bd-space-4`  | 1rem      | 14   | Padding horizontal du toast, marge sous le header de dialog         |
| `--bd-space-5`  | 1.5rem    | 21   | Padding des cards et dialogs, marge des toasts à l'écran            |
| `--bd-space-6`  | 2rem      | 28   | Séparation entre sections de page                                   |

Au-delà de `--bd-space-6`, l'espacement relève du layout de l'app : à définir côté projet.

Utilitaires : `.bd-font-bold`, `.bd-font-italic`, `.bd-font-bold-italic`, `.bd-heading`,
`.bd-squircle`, `.bd-truncate`, `.bd-sr-only`.

Le reset/base vit dans `@layer bearded-base` : le CSS de l'app gagne toujours, sans bataille de spécificité.

## Composants

| Composant  | Props principales                                                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BdButton` | `variant` (default/primary/border/nude/danger), `size` (x-small/small/default/big), `align`, `iconOnly`, `full`, `loading`, `disabled`, `href`/`to` |
| `BdInput`  | `v-model`, `label`, `hint`, `error`, `type`, `placeholder`, `disabled`                                                                              |
| `BdSelect` | `v-model`, `options: {label, value}[]`, `label`, `placeholder`, `disabled`                                                                          |
| `BdCard`   | `padding` (default/small/none), slot `header`                                                                                                      |
| `BdBadge`  | `variant` (default/primary/success/warning/danger/info)                                                                                            |
| `BdLoader` | `size` (default/small/x-small/xx-small)                                                                                                            |
| `BdDialog` | `v-model` (ouverture), `title`, slots `header`/`footer`                                                                                            |
| `BdToaster`| `position` (bottom-right/bottom-left/top-right/top-left) — à monter une seule fois                                                                  |

`BdButton` rend `<router-link>` dès qu'on passe `to` — résolu globalement, donc `vue-router`
reste une dépendance de l'app, pas de la lib.

### Toasts

`BdToaster` une fois dans `App.vue`, puis `toast()` de n'importe où (helper, store, callback) —
la file est au niveau module, pas besoin d'être dans un `setup()` ni d'installer Pinia.

```vue
<template>
  <BdToaster position="bottom-right" />
</template>
```

```ts
import { dismissToast, toast } from "bearded-ui";

toast("Sauvegardé", { variant: "success" });
toast("Échec de l'envoi", { variant: "danger" });

const id = toast("Import en cours…", { duration: 0 }); // 0 = jusqu'au dismiss
dismissToast(id);
```

Variants : `default`, `success`, `warning`, `danger`, `info`. Auto-dismiss à 4 s, clic pour fermer.

## Dev

```bash
bun install
bun dev                   # style guide sur http://localhost:5173
bun test                  # bun:test, zéro dépendance
bun run build             # test + typecheck + dist/
bun run build:styleguide  # page statique dans styleguide-dist/
```

Le style guide (`styleguide/StyleGuide.vue`) est la doc vivante : tout nouveau composant s'y ajoute.
