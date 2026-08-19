# bearded-ui

Design tokens + composants Vue 3 partagés par [beardify](https://github.com/BeardedBear/beardify),
[bearded-sketch](https://github.com/BeardedBear/bearded-sketch),
[bearded-chat](https://github.com/BeardedBear/bearded-chat) et
[bearded-mail](https://github.com/BeardedBear/bearded-mail).

## Install

```bash
bun add github:BeardedBear/bearded-ui#release
```

Puis `bun update bearded-ui` pour passer à la dernière version.

La branche `release` porte le `dist/` déjà construit : rien à builder à l'install, et aucune
version en dur dans ton `package.json`. Une dépendance git n'a pas de range semver — le
spécificateur *est* la référence git :

| Spécificateur | Ce que ça installe                                    |
| ------------- | ----------------------------------------------------- |
| `#release`    | la dernière version publiée, `dist/` inclus           |
| `#v0.2.0`     | cette version, figée, `dist/` inclus                  |
| _(rien)_      | le dernier commit de `main` — **sans `dist/`**, inutilisable |

> `#semver:^0.1.0` ne marche pas avec bun : il traite le fragment comme une ref git littérale.
> Et `@latest` est un dist-tag du registry npm, qui n'existe pas pour une dépendance git.

Pourquoi `dist/` est committé sur une branche plutôt que construit à l'install : bun exécute bien
le script `prepare`, mais **sans installer les `devDependencies`** du paquet — `vite` manque et le
build échoue. `main` reste donc propre, et la branche `release` porte les artefacts.

## Usage

```ts
// main.ts
import "bearded-ui/style.css";
```

```vue
<script setup lang="ts">
import { BdButton, useTheme } from "bearded-ui";

const { palette, theme } = useTheme();
</script>

<template>
  <BdButton variant="primary" @click="palette = { accent: '#8343de', base: '#100a1c' }">
    {{ theme }}
  </BdButton>
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

**Deux couleurs**, un fond et un accent : tout le reste — fonds, texte, bordures, états de
l'accent, paires fond/texte des états — en est dérivé. Pas de thème clair à choisir, pas de jeu
d'accents figé.

Les étages de fond et les variantes d'accent sont dérivés en `oklch(from …)`, qui isole clarté,
chroma et teinte au lieu de les emporter ensemble. Un `color-mix` vers le blanc tirait la chroma
vers le gris — le blanc n'en a pas — et un fond bleu donnait des panneaux gris. Le reste (paires
d'états, surfaces teintées d'accent) reste en `color-mix`, qui mélange deux couleurs réelles et n'a
pas ce défaut.

Sur les fonds, **la chroma suit la clarté** : un étage garde le rapport chroma/clarté de sa base,
donc paraît aussi coloré qu'elle à sa propre lumière. Les variantes d'accent gardent au contraire
une chroma constante — elles frôlent déjà le bord du gamut sRGB, où la monter ne ferait que la
faire écrêter par le navigateur.

Teinte constante ne suffit pourtant pas : à angle oklch égal, un bleu sombre **paraît** plus violet
qu'un bleu clair, et un camaïeu de bleus se disloque alors que ses angles sont identiques au
centième de degré. Les étages corrigent donc la teinte proportionnellement au chemin parcouru en
clarté — plus sombre vers le cyan, plus clair vers le violet — sous un lobe centré sur les bleus,
les seules teintes concernées :

```css
:root {
  --bd-hue-bend: 40; /* degrés par unité de clarté ; 0 rend les échelles isochromes */
}
```

À 40, une base bleue étale ses cinq fonds sur ~6°, et une base verte, ambre ou rouge sur 0°.

```ts
const { palette, theme } = useTheme();

palette.value = { accent: "#8343de", base: "#100a1c" }; // toute l'app suit
palette.value = bdDefaultPalette;                        // #16181d + #9064ff
theme.value; // "dark" | "light" — déduit, en lecture seule
```

- Le clair/sombre est **déduit** de la luminance du fond (`isLightColor`), jamais choisi : un fond
  clair pose `data-theme="light"` tout seul, et avec lui `color-scheme` et l'inversion des mélanges.
- `useTheme()` n'écrit que trois propriétés inline sur `<html>` (`--bd-palette-base`,
  `--bd-palette-accent`, `--bd-on-primary`) plus `data-theme`. Aucun observer, aucune boucle : le
  reste est un bloc `:root` dans `themes.css`, qui tient donc sans JS (SSR, ou app qui n'appelle
  jamais `useTheme()`).
- Le choix est persisté dans `localStorage` (`bearded-ui-theme`).
- 30 palettes prêtes à l'emploi dans `bdPresets` (groupes `dark`, `darker`, `light`). La première,
  `Bearded` (`#16181d` + `#9064ff`), est la palette par défaut.

Le picker complet (deux champs `<input type="color">` + grille de presets) tient en une balise :

```vue
<BdThemePicker accent-label="Accent" base-label="Fond" />
```

### Alias applicatifs

Les apps Bearded\* nomment leurs couleurs par usage. `style.css` expose les alias correspondants,
branchés sur les tokens de la lib — une app peut supprimer son propre bloc `:root` et hériter du
thème :

| Alias                                                 | Token                                                |
| ----------------------------------------------------- | ---------------------------------------------------- |
| `--bg-deep`, `--bg-app`, `--bg-surface`, `--bg-elevated` | `--bd-bg-darker`, `--bd-bg`, `--bd-bg-light`, `--bd-bg-lighter` |
| `--text-primary`, `--text-secondary`, `--text-muted`  | `--bd-font-color-light`, `--bd-font-color`, `--bd-font-color-darker` |
| `--accent{,-strong,-soft,-bg,-bg-hover,-bg-active}`   | `--bd-primary{,-dark,-light,-bg,-bg-hover,-bg-active}` |
| `--success`, `--warning`, `--danger`, `--info`        | `--bd-*` homonymes                                   |
| `--status-{success,warning,danger}-{bg,text}`         | `--bd-{success,warning,danger}-{bg,text}`            |
| `--border-color`, `--hover-overlay`, `--on-accent`    | `--bd-border-color`, `--bd-hover-overlay`, `--bd-on-primary` |

Purement additif : une app qui redéfinit un de ces noms après `bearded-ui/style.css` garde sa valeur.
Espacements et typo ne sont **pas** aliasés — l'échelle de la lib part d'une racine à 14 px, celle
des apps à 16 px.

## Tokens

| Famille    | Variables                                                                           |
| ---------- | ----------------------------------------------------------------------------------- |
| Accent     | `--bd-primary{,-darker,-dark,-light,-lighter,-bg,-bg-hover,-bg-active}`, `--bd-on-primary` |
| Fonds      | `--bd-bg{,-darker,-dark,-light,-lighter}`, `--bd-border-color`, `--bd-overlay-color`, `--bd-hover-overlay` |
| Texte      | `--bd-font-color{,-darker,-dark,-light}`                                             |
| États      | `--bd-{success,warning,danger,info}`, paires `-bg` / `-text` pour les trois premiers |
| Typo       | `--bd-font-family`, `--bd-font-size-{xs,sm,base,lg,xl,2xl}`, `--bd-font-weight{,-bold}` |
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

## Icônes

[`@phosphor-icons/vue`](https://phosphoricons.com), la même famille que bearded-sketch. C'est une
dépendance de la lib (externalisée du bundle, tree-shakée côté app) : pas d'installation en plus,
mais rien n'empêche l'app de l'ajouter pour ses propres imports.

Pas de wrapper `BdIcon` — les `Ph*` sont déjà des composants Vue avec `size`, `weight` et `color`.
Les tailles se donnent en `em` pour suivre la typo du contexte (`size="1.2em"`).

Le poids de la lib est `bold`, pour tenir face à Bricolage Grotesque. Les icônes lisent leurs
défauts par `inject`, donc un `provide` dans `main.ts` aligne toute l'app d'un coup :

```ts
// main.ts
app.provide("weight", "bold");
```

Sans ce provide, seules les icônes rendues par les composants de la lib sont en bold — les autres
retombent sur `regular`. Un `weight` posé sur une icône reste toujours prioritaire.

```vue
<BdDropdownItem :icon="PhTrash" danger>Supprimer</BdDropdownItem>
<BdButton icon-only><PhGear size="1.2em" /></BdButton>
```

## Animations

Set CSS pur, applicable à n'importe quel élément — composant de la lib ou markup de l'app.

```vue
<BdBadge class="bd-anim-pop">Nouveau</BdBadge>
<BdButton class="bd-anim-jelly" @click="save">Enregistrer</BdButton>
<span class="bd-anim-pulse bd-anim-loop">●</span>
```

| Classe            | Effet                       | Quand                                          |
| ----------------- | --------------------------- | ---------------------------------------------- |
| `.bd-anim-pop`    | apparition avec ressort     | Élément qui se monte, contenu qui arrive        |
| `.bd-anim-jelly`  | squish élastique            | Confirmation d'un clic, like, ajout             |
| `.bd-anim-tada`   | scale + rotation            | Célébration : succès, badge débloqué            |
| `.bd-anim-bounce` | rebond vertical             | Attirer l'œil sur un élément déjà visible       |
| `.bd-anim-shake`  | secousse horizontale        | Erreur : champ invalide, action refusée         |
| `.bd-anim-wobble` | balancement                 | Refus joueur                                    |
| `.bd-anim-float`  | flottement doux             | Boucle : illustration, état vide                |
| `.bd-anim-pulse`  | battement                   | Boucle d'attention : notification en attente    |

Modificateurs cumulables : `.bd-anim-loop`, `.bd-anim-fast`, `.bd-anim-slow`, et `.bd-anim-hover`
(ne joue qu'au survol — pour les animations qui partent de l'état normal, pas `pop`).

Transitions Vue prêtes, mêmes courbes :

```vue
<Transition name="bd-pop"><BdCard v-if="open">…</BdCard></Transition>
```

`bd-fade`, `bd-pop`, `bd-slide-up`. Tokens : `--bd-duration{,-fast,-slow}`, `--bd-ease-bounce`,
`--bd-ease-spring`.

Pour un `<dialog>` natif (qui ne passe pas par `<Transition>`), `.bd-anim-dialog` rejoue le
preset `bd-pop` sur `[open]`, backdrop compris — c'est ce qu'utilise `BdDialog`.

Rejouer une animation sur un élément déjà monté : incrémenter un `:key` (le nœud est recréé).

Le reset/base vit dans `@layer bearded-base` : le CSS de l'app gagne toujours, sans bataille de spécificité.

## Composants

| Composant  | Props principales                                                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BdButton` | `variant` (default/primary/border/nude/success/danger), `size` (x-small/small/default/big), `align`, `iconOnly`, `full`, `loading`, `disabled`, `href`/`to` |
| `BdButtonGroup` | `v-model` + `options` (segmented control) ou slot libre, `size`, `full`, `disabled`                                                            |
| `BdInput`  | `v-model`, `label`, `hint`, `error` (bool ou message), `type`, `placeholder`, `disabled`, `size`, `variant` (default/code/underline), slot `prefix`  |
| `BdSelect` | `v-model`, `options: {label, value}[]`, `label`, `placeholder`, `disabled`                                                                          |
| `BdCheckbox` | `v-model` (boolean), `label` (ou slot), `fullWidth`, `disabled` — rendu switch                                                                    |
| `BdCard`   | `padding` (default/small/none), slot `header`                                                                                                      |
| `BdBadge`  | `variant` (default/primary/success/warning/danger/info)                                                                                            |
| `BdLoader` | `size` (default/small/x-small/xx-small)                                                                                                            |
| `BdDialog` | `v-model` (ouverture), `title`, `subtitle`, `size` (small/default/big/full/fit), `padding` (default/small/none), `persistent`, `hideClose`, slots `header`/`actions`/`footer` |
| `BdConfirmDialog` | `v-model` (ouverture), `title`, `message` (ou slot), `confirmLabel`, `cancelLabel`, `danger` — émet `confirm`/`cancel`                       |
| `BdDropdown` | `size`, `placement`, `matchWidth`, `offset`, `sheetOnMobile`, `label`, slot `trigger`, `v-model` (ouverture)                                     |
| `BdDropdownItem` | `icon`, `active`, `danger`, `disabled`, `keepOpen`                                                                                          |
| `BdTooltip` | `content` (ou slot `content`), `side`, `follow`, `delay`, `offset`, `disabled`                                                                    |
| `BdToaster`| `position` (bottom-right/bottom-left/top-right/top-left) — à monter une seule fois                                                                  |
| `BdThemePicker` | `presets`, `baseLabel`, `accentLabel` — écrit dans `useTheme().palette`                                                                        |

`BdButton` rend `<router-link>` dès qu'on passe `to` — résolu globalement, donc `vue-router`
reste une dépendance de l'app, pas de la lib.

`variant="success"` ne sert pas à déclencher une action mais à marquer un état déjà atteint
(joueur prêt, brouillon enregistré) : d'où son fond teinté, là où `danger` réclame une décision
et garde son aplat plein.

`variant="danger"` + `icon-only` inverse le rapport : l'icône passe en rouge sur un fond
neutre, au lieu de l'aplat rouge plein. Une corbeille se répète à chaque ligne d'une liste,
un aplat à chaque fois crie plus fort que l'action ne le mérite. Le bouton danger avec texte,
lui, est une décision finale (confirmation, suppression en masse) et garde son aplat.

### Champs

```vue
<BdInput v-model="code" variant="code" maxlength="6" placeholder="ABC123" />
<BdInput v-model="name" variant="underline" @keyup.escape="cancel" />
<BdInput v-model="user"><template #prefix>@</template></BdInput>
```

Tout attribut qui n'est pas une prop (`maxlength`, `autofocus`, `autocomplete`, `@blur`…) atterrit sur
l'`<input>`, pas sur l'enveloppe — sans quoi `focus` et `blur`, qui ne remontent pas, n'atteindraient
jamais leur écouteur. Un `ref` posé sur `<BdInput>` expose `focus()` et `select()`.

### Taille des contrôles

`BdButton`, `BdButtonGroup`, `BdDropdown` et `BdInput` partagent le type `BdSize`
(`x-small | small | default | big`) : à taille égale, même hauteur exactement — un champ et le bouton
posé à côté s'alignent sans réglage.

Un conteneur diffuse sa taille à ses boutons — y compris ceux d'un slot libre — et une prop `size`
posée sur un bouton reste prioritaire :

```vue
<BdButtonGroup size="small">
  <BdButton>Hérite de small</BdButton>
  <BdButton size="big">Sauf celui-ci</BdButton>
</BdButtonGroup>
```

### Groupes de boutons

```vue
<!-- Segmented control : le bouton actif passe en variant primary -->
<BdButtonGroup v-model="view" :options="[{ label: 'Liste', value: 'list' }, { label: 'Grille', value: 'grid' }]" />

<!-- Actions libres : le slot remplace les options, le groupe ne fait que les coller -->
<BdButtonGroup>
  <BdButton>‹</BdButton>
  <BdButton>Aujourd'hui</BdButton>
  <BdButton>›</BdButton>
</BdButtonGroup>
```

Les coins arrondis ne sont conservés qu'aux extrémités du groupe. `full` répartit les boutons
sur toute la largeur (le pattern des lignes de réglages).

Une `value` d'option peut être un nombre autant qu'une chaîne — un nombre de tours, une durée — et
une option peut porter un `tooltip`, rendu en `BdTooltip` autour de son bouton :

```vue
<BdButtonGroup
  v-model="rounds"
  :options="[{ label: '3', value: 3 }, { label: '5', tooltip: 'La partie longue', value: 5 }]"
/>
```

### Dropdown

```vue
<script setup lang="ts">
import { PhPencilSimple, PhTrash } from "@phosphor-icons/vue";
</script>

<template>
  <BdDropdown label="Menu" placement="bottom-end">
    <BdDropdownItem :icon="PhPencilSimple" @click="rename">Renommer</BdDropdownItem>
    <BdDropdownItem :active="sort === 'date'" keep-open @click="sort = 'date'">Par date</BdDropdownItem>
    <BdDropdownItem danger :icon="PhTrash" @click="remove">Supprimer</BdDropdownItem>
  </BdDropdown>

  <!-- Trigger et contenu libres -->
  <BdDropdown placement="top-start">
    <template #trigger="{ open }">
      <BdButton icon-only variant="border"><PhDotsThree size="1.2em" /></BdButton>
    </template>
    <BdInput label="Rechercher" />
  </BdDropdown>
</template>
```

Bâti sur la Popover API : top layer (jamais rogné par un `overflow` ou un `z-index`), fermeture
au clic extérieur et à Échap sans listener maison. Le placement bascule au-dessus s'il manque la
place en dessous, se recale dans le viewport, borne sa hauteur à l'espace restant et suit le
scroll. Sous 768px, `sheetOnMobile` (actif par défaut) le transforme en feuille collée en bas.
Flèches ↑↓ pour naviguer entre les items.

### Tooltip

```vue
<BdTooltip content="Supprimer définitivement" side="top">
  <BdButton icon-only variant="border"><PhTrash size="1.2em" /></BdButton>
</BdTooltip>

<!-- Markup libre -->
<BdTooltip side="right" :delay="0">
  <span>Raccourci</span>
  <template #content><kbd>Ctrl</kbd> + <kbd>K</kbd></template>
</BdTooltip>
```

S'ouvre au survol **et** au focus clavier, se ferme à Échap. `popover="manual"` : top layer sans
voler le focus ni intercepter les clics. La largeur suit le contenu jusqu'à 20rem puis passe à la
ligne, le côté bascule s'il manque la place, et la flèche reste pointée sur le trigger même quand
le panneau a été recalé dans le viewport.

Le tooltip peut suivre le curseur au lieu de rester ancré au trigger — désactivé par défaut :

```vue
<BdTooltip content="Suit horizontalement" follow="x">…</BdTooltip>
<BdTooltip content="Suit verticalement" follow="y" side="right">…</BdTooltip>
<BdTooltip content="Colle au curseur" follow="both">…</BdTooltip>
```

L'axe non suivi reste calé sur le trigger : `follow="x"` avec `side="top"` garde le tooltip à
hauteur constante au-dessus de l'élément et ne fait glisser que l'horizontale.

`BdTooltip` et `BdDropdown` partagent leur moteur de placement (`src/composables/useAnchor.ts`) :
`anchor()` positionne un panneau contre un trigger sur les 4 côtés avec flip et recalage,
`useViewportTracker()` rejoue le placement au scroll/resize en le coalesçant par `requestAnimationFrame`.

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
bun run lint              # eslint + stylistic + perfectionist
bun run lint:fix
bun run build             # test + lint + typecheck + dist/
bun run build:styleguide  # page statique dans styleguide-dist/
```

Même config qu'ailleurs : `@stylistic` (double quotes, point-virgules, 2 espaces, 120 colonnes) et
`perfectionist` en tri alphabétique — props, imports, exports et clés d'objets restent ordonnés
tout seuls. `.gitattributes` force les fins de ligne en LF, le dépôt étant consommé tel quel.

## Release

```bash
bun run release patch     # 0.1.0 → 0.1.1
bun run release minor     # 0.1.0 → 0.2.0
bun run release major     # 0.1.0 → 1.0.0
bun run release 0.4.2     # version explicite
```

Le script refuse de partir sur un working tree sale ou un tag déjà pris, lance `bun run build`
(tests + typecheck + build), bump `package.json`, commit et pousse sur la branche courante — puis
recale la branche `release` sur ce commit avec `dist/` forcé dedans, y pose le tag `vX.Y.Z`, et
pousse branche et tag.

La validation avant publication n'est pas du zèle : c'est ce `dist/` que les 4 projets consomment
tel quel, donc un build cassé casse *leur* install.

Effet de bord à connaître : le retour sur la branche de départ supprime `dist/` du disque (suivi
sur `release`, ignoré sur `main`). Un `bun run build` le régénère.

> **Ne jamais merger `release` dans `main`.** Après un push, GitHub propose « Create a pull
> request for 'release' » : c'est un piège ici. `release` est un artefact de publication
> réécrit à chaque version, pas une branche de travail — la merger fait entrer `dist/` dans
> `main` et supprime la branche que les 4 projets suivent.
>
> Réparation, si ça arrive : `git rm -r --cached dist` + commit sur `main`, puis
> `git push --force origin release` pour recréer la branche.

Le style guide (`styleguide/StyleGuide.vue`) est la doc vivante : tout nouveau composant s'y ajoute.
