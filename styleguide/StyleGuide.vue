<script setup lang="ts">
import {
  PhArchive,
  PhCalendarBlank,
  PhCopy,
  PhDotsThree,
  PhGear,
  PhPencilSimple,
  PhRuler,
  PhSortAscending,
  PhTrash,
} from "@phosphor-icons/vue";
import { onMounted, ref } from "vue";

import {
  BdBadge,
  BdButton,
  BdButtonGroup,
  BdCard,
  BdCheckbox,
  BdConfirmDialog,
  BdDialog,
  BdDropdown,
  BdDropdownItem,
  BdEmptyState,
  BdInput,
  BdLoader,
  BdThemePicker,
  BdToaster,
  BdTooltip,
  toast,
  useTheme,
} from "@/index";

const { palette, theme } = useTheme();

const text = ref("");
const fruit = ref("");
const dialogOpen = ref(false);
const longDialogOpen = ref(false);
const shellDialogOpen = ref(false);
const fitDialogOpen = ref(false);
const confirmOpen = ref(false);
// Deux fois la même image, en portrait et en paysage : la dialog bute sur la
// hauteur pour l'une, sur la largeur pour l'autre, sans rien mesurer.
const fitPortrait = ref(true);
const notifications = ref(true);
const autostart = ref(false);
const view = ref("list");
const sort = ref("name");

const views = [
  { label: "Liste", value: "list" },
  { label: "Grille", value: "grid" },
  { label: "Tableau", value: "table" },
];

const animations = [
  { name: "pop", usage: "Apparition d'un élément, contenu qui se monte" },
  { name: "jelly", usage: "Confirmation d'un clic, like, ajout au panier" },
  { name: "tada", usage: "Célébration : succès, badge débloqué" },
  { name: "bounce", usage: "Attirer l'œil sur un élément déjà visible" },
  { name: "shake", usage: "Erreur : champ invalide, action refusée" },
  { name: "wobble", usage: "Refus joueur, élément qu'on secoue" },
  { name: "float", usage: "Boucle douce : illustration, état vide" },
  { name: "pulse", usage: "Boucle d'attention : notification en attente" },
];

// Recréer le nœud est le moyen le plus court de rejouer une animation CSS.
const animKey = ref(0);
const loopAnims = ref(false);
const popVisible = ref(true);

// Un groupe = un préfixe de token et ses suffixes ("" pour le token de base).
const colorGroups = [
  { prefix: "primary", suffixes: ["darker", "dark", "", "light", "lighter"] },
  { prefix: "bg", suffixes: ["darker", "dark", "", "light", "lighter"] },
  { prefix: "font-color", suffixes: ["darker", "dark", "", "light"] },
  { prefix: "", suffixes: ["success", "warning", "danger", "info"] },
];

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
  return `--bd-${[prefix, suffix].filter(Boolean).join("-")}`;
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
        <code class="muted">{{ palette.base }} · {{ palette.accent }} · {{ theme }}</code>
      </div>
    </header>

    <section>
      <h2 class="bd-heading">Thème</h2>
      <BdCard>
        <p class="muted">
          Deux couleurs suffisent : tout le reste — fonds, texte, bordures, états de l'accent —
          est dérivé en <code>color-mix</code>. Le clair/sombre est déduit de la luminance du fond
          (<code>data-theme</code>), pas d'un interrupteur : pour passer en clair, on choisit un
          fond clair.
        </p>
        <BdThemePicker accent-label="Accent" base-label="Fond" />
      </BdCard>
    </section>

    <section>
      <h2 class="bd-heading">Couleurs</h2>
      <div class="stack">
        <div v-for="group in colorGroups" :key="group.prefix" class="swatches">
          <div v-for="suffix in group.suffixes" :key="suffix" class="swatch">
            <span
              class="swatch-chip"
              :style="{ background: `var(${tokenVar(group.prefix, suffix)})` }"
            />
            <code>{{ tokenVar(group.prefix, suffix) }}</code>
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
          <BdButton icon-only variant="danger"><PhTrash size="1.2em" /></BdButton>
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
          accueille des boutons libres — qui héritent de la taille du groupe.
        </p>
        <h3>Même échelle pour les trois</h3>
        <p class="muted">
          <code>BdButton</code>, <code>BdButtonGroup</code> et <code>BdDropdown</code> partagent le type
          <code>BdSize</code> : à taille égale, hauteur identique.
        </p>
        <div v-for="s in (['x-small', 'small', 'default', 'big'] as const)" :key="s" class="row">
          <code class="size-label muted">{{ s }}</code>
          <BdButton :size="s">Bouton</BdButton>
          <BdButtonGroup v-model="view" :options="views" :size="s" />
          <BdDropdown label="Menu" :size="s">
            <BdDropdownItem :icon="PhPencilSimple">Renommer</BdDropdownItem>
            <BdDropdownItem danger :icon="PhTrash">Supprimer</BdDropdownItem>
          </BdDropdown>
        </div>
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
          <div class="bd-field">
            <span class="bd-field-label bd-font-bold">Fruit</span>
            <BdDropdown :label="fruits.find((f) => f.value === fruit)?.label ?? 'Choisir…'" match-width>
              <BdDropdownItem
                v-for="f in fruits"
                :key="f.value"
                :active="fruit === f.value"
                @click="fruit = f.value"
              >
                {{ f.label }}
              </BdDropdownItem>
            </BdDropdown>
          </div>
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
          <BdButton variant="border" @click="longDialogOpen = true">Contenu long</BdButton>
          <BdButton variant="border" @click="shellDialogOpen = true">Coque plein-bord</BdButton>
          <BdButton variant="border" @click="fitDialogOpen = true">Visionneuse</BdButton>
          <BdButton variant="danger" @click="confirmOpen = true">Confirmation</BdButton>
        </div>
      </BdCard>
    </section>

    <section>
      <h2 class="bd-heading">Dropdown</h2>
      <BdCard>
        <p class="muted">
          Ancré au trigger, il bascule au-dessus s'il manque la place en dessous et se recale dans le
          viewport. Sous 768px, il devient une feuille collée en bas.
        </p>
        <div class="row">
          <BdDropdown label="Menu">
            <BdDropdownItem :icon="PhPencilSimple">Renommer</BdDropdownItem>
            <BdDropdownItem :icon="PhCopy">Dupliquer</BdDropdownItem>
            <BdDropdownItem disabled :icon="PhArchive">Archiver</BdDropdownItem>
            <BdDropdownItem danger :icon="PhTrash">Supprimer</BdDropdownItem>
          </BdDropdown>

          <BdDropdown placement="bottom-end">
            <template #trigger>
              <BdButton icon-only variant="border"><PhDotsThree size="1.2em" /></BdButton>
            </template>
            <BdDropdownItem :active="sort === 'name'" :icon="PhSortAscending" @click="sort = 'name'">
              Par nom
            </BdDropdownItem>
            <BdDropdownItem :active="sort === 'date'" :icon="PhCalendarBlank" @click="sort = 'date'">
              Par date
            </BdDropdownItem>
            <BdDropdownItem :active="sort === 'size'" :icon="PhRuler" @click="sort = 'size'">
              Par taille
            </BdDropdownItem>
          </BdDropdown>

          <BdDropdown label="Reste ouvert">
            <BdDropdownItem
              v-for="v in views"
              :key="v.value"
              :active="view === v.value"
              keep-open
              @click="view = v.value"
            >
              {{ v.label }}
            </BdDropdownItem>
          </BdDropdown>

          <BdDropdown label="Contenu libre" placement="top-start">
            <div class="dropdown-free">
              <BdInput label="Rechercher" placeholder="Filtrer…" />
              <BdCheckbox v-model="notifications" full-width label="Notifications" />
              <BdCheckbox v-model="autostart" full-width label="Démarrage auto" />
            </div>
          </BdDropdown>
        </div>
        <p class="muted">Tri courant : <code>{{ sort }}</code></p>
      </BdCard>
    </section>

    <section>
      <h2 class="bd-heading">Tooltip</h2>
      <BdCard>
        <p class="muted">
          Survol ou focus clavier. Il bascule de côté s'il manque la place, se recale dans le viewport,
          et la flèche continue de pointer le trigger. La largeur suit le contenu jusqu'à 20rem.
        </p>
        <div class="row">
          <BdTooltip content="Tooltip par défaut, au-dessus">
            <BdButton variant="border">Top</BdButton>
          </BdTooltip>
          <BdTooltip content="En dessous" side="bottom">
            <BdButton variant="border">Bottom</BdButton>
          </BdTooltip>
          <BdTooltip content="À gauche" side="left">
            <BdButton variant="border">Left</BdButton>
          </BdTooltip>
          <BdTooltip content="À droite" side="right">
            <BdButton variant="border">Right</BdButton>
          </BdTooltip>
          <BdTooltip
            content="Un texte nettement plus long, pour montrer que le tooltip passe à la ligne
              au lieu de déborder du viewport."
          >
            <BdButton variant="border">Texte long</BdButton>
          </BdTooltip>
          <BdTooltip :delay="0">
            <BdButton icon-only variant="border"><PhTrash size="1.2em" /></BdButton>
            <template #content>
              <strong>Supprimer</strong> — slot <code>content</code>, sans délai
            </template>
          </BdTooltip>
        </div>
        <h3>Suivi du curseur</h3>
        <p class="muted">
          <code>follow</code> — désactivé par défaut. Survole la surface, pas juste le bouton.
        </p>
        <div class="row">
          <BdTooltip content="Je suis le curseur horizontalement" :delay="0" follow="x">
            <div class="follow-zone">follow="x"</div>
          </BdTooltip>
          <BdTooltip content="Je suis le curseur verticalement" :delay="0" follow="y" side="right">
            <div class="follow-zone">follow="y"</div>
          </BdTooltip>
          <BdTooltip content="Je colle au curseur" :delay="0" follow="both">
            <div class="follow-zone">follow="both"</div>
          </BdTooltip>
        </div>
        <p class="muted">
          Collé aux bords pour vérifier le recalage :
        </p>
        <div class="row row-edges">
          <BdTooltip content="Recalé dans le viewport, la flèche suit le trigger" side="top">
            <BdButton size="small" variant="border">◀ bord gauche</BdButton>
          </BdTooltip>
          <BdTooltip content="Recalé dans le viewport, la flèche suit le trigger" side="top">
            <BdButton size="small" variant="border">bord droit ▶</BdButton>
          </BdTooltip>
        </div>
      </BdCard>
    </section>

    <section>
      <h2 class="bd-heading">Animations</h2>
      <BdCard>
        <p class="muted">
          Classes utilitaires applicables à n'importe quel élément — composant de la lib ou pas.
          Clique une tuile pour rejouer.
        </p>
        <div class="row">
          <BdCheckbox v-model="loopAnims" label="Jouer en boucle" />
          <BdButton size="small" variant="border" @click="animKey++">Tout rejouer</BdButton>
        </div>
        <div class="specimens">
          <figure v-for="{ name, usage } in animations" :key="name" class="specimen">
            <button class="anim-stage" type="button" @click="animKey++">
              <span
                :key="animKey"
                class="anim-box bd-squircle"
                :class="[`bd-anim-${name}`, { 'bd-anim-loop': loopAnims }]"
              />
            </button>
            <figcaption>
              <code>.bd-anim-{{ name }}</code>
              <span class="muted">{{ usage }}</span>
            </figcaption>
          </figure>
        </div>
        <p class="muted">
          Modificateurs cumulables : <code>.bd-anim-loop</code>, <code>.bd-anim-fast</code>,
          <code>.bd-anim-slow</code>, <code>.bd-anim-hover</code> (ne joue qu'au survol).
        </p>
        <h3>Transitions Vue</h3>
        <p class="muted">
          Mêmes courbes, pour les entrées/sorties : <code>bd-fade</code>, <code>bd-pop</code>,
          <code>bd-slide-up</code>.
        </p>
        <div class="row">
          <BdButton variant="border" @click="popVisible = !popVisible">Basculer</BdButton>
          <Transition name="bd-pop">
            <BdBadge v-if="popVisible" variant="primary">bd-pop</BdBadge>
          </Transition>
          <Transition name="bd-slide-up">
            <BdBadge v-if="popVisible" variant="success">bd-slide-up</BdBadge>
          </Transition>
          <Transition name="bd-fade">
            <BdBadge v-if="popVisible" variant="info">bd-fade</BdBadge>
          </Transition>
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
        <div class="row">
          <BdButton
            variant="border"
            @click="
              toast('Album retiré', {
                action: { label: 'Annuler', onAction: () => { toast('Restauré', { variant: 'success' }); } },
                duration: 8000,
              })
            "
          >
            Avec action
          </BdButton>
        </div>
        <p class="muted">
          Clic sur un toast pour le fermer. Auto-dismiss après 4 s par défaut. Un toast porteur
          d'une <code>action</code> ne se ferme plus au clic n'importe où : il expose un bouton
          d'action et une croix, et se ferme avant de lancer le handler.
        </p>
      </BdCard>
    </section>

    <section>
      <h2 class="bd-heading">État vide</h2>
      <BdCard padding="none">
        <BdEmptyState
          action-label="Réessayer"
          message="Le flux ne répond pas pour le moment."
          title="Chargement impossible"
          @action="toast('Nouvelle tentative')"
        >
          <template #icon><PhArchive /></template>
        </BdEmptyState>
      </BdCard>
      <p class="muted">
        Sépare « rien à afficher » de « ça a raté » — les deux finissaient sinon en spinner
        infini quand la vue conditionnait son loader sur <code>!list.length</code>. L'icône est
        un slot : la lib n'embarque pas de jeu d'icônes.
      </p>
    </section>

    <BdDialog v-model="dialogOpen" title="Dialog native">
      <p>Basée sur <code>&lt;dialog&gt;</code> : Échap, focus trap et backdrop gratuits.</p>
      <template #footer>
        <BdButton variant="nude" @click="dialogOpen = false">Annuler</BdButton>
        <BdButton variant="primary" @click="dialogOpen = false">OK</BdButton>
      </template>
    </BdDialog>

    <BdDialog v-model="longDialogOpen" title="Corps qui défile">
      <p v-for="n in 40" :key="n">Paragraphe {{ n }} — le titre et le pied restent en place.</p>
      <template #footer>
        <BdButton variant="primary" @click="longDialogOpen = false">Fermer</BdButton>
      </template>
    </BdDialog>

    <BdDialog
      v-model="shellDialogOpen"
      size="big"
      padding="none"
      title="Coque plein-bord"
      subtitle="un sous-titre, tronqué s'il déborde"
    >
      <template #actions>
        <BdButton size="small" variant="nude" icon-only><PhGear /></BdButton>
      </template>
      <div class="shell-body">
        <p><code>padding="none"</code> : seul le corps perd son padding.</p>
        <p>L'en-tête et le pied restent du chrome, filets compris.</p>
      </div>
      <template #footer>
        <BdButton variant="primary" @click="shellDialogOpen = false">Fermer</BdButton>
      </template>
    </BdDialog>

    <BdDialog v-model="fitDialogOpen" size="fit" padding="none" title="Visionneuse">
      <template #actions>
        <BdButton size="small" variant="border" @click="fitPortrait = !fitPortrait">
          Basculer {{ fitPortrait ? "en paysage" : "en portrait" }}
        </BdButton>
      </template>
      <div
        class="fit-media"
        :style="{ aspectRatio: fitPortrait ? '2 / 3' : '3 / 2' }"
      >
        {{ fitPortrait ? "Portrait : bute sur la hauteur" : "Paysage : bute sur la largeur" }}
      </div>
    </BdDialog>

    <BdConfirmDialog
      v-model="confirmOpen"
      danger
      title="Supprimer ce libellé ?"
      message="Les messages gardent leur contenu, seul le libellé disparaît."
      confirm-label="Supprimer"
      cancel-label="Annuler"
      @cancel="toast('Annulé')"
      @confirm="toast('Supprimé', { variant: 'danger' })"
    />

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

.anim-stage {
  align-items: center;
  background-color: var(--bd-bg);
  border: 1px solid var(--bd-border-color);
  border-radius: var(--bd-radius-md);
  cursor: pointer;
  display: flex;
  height: 5rem;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  width: 100%;
}

.anim-box {
  background-color: var(--bd-primary);
  border-radius: var(--bd-radius-md);
  display: block;
  height: 2.2rem;
  width: 2.2rem;
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

.size-label {
  min-width: 4.5rem;
}

.follow-zone {
  align-items: center;
  background-color: var(--bd-bg);
  border: 1px dashed var(--bd-border-color);
  border-radius: var(--bd-radius-md);
  color: var(--bd-font-color-dark);
  display: flex;
  font-size: var(--bd-font-size-sm);
  height: 5rem;
  justify-content: center;
  width: 11rem;
}

.row-edges {
  justify-content: space-between;
}

.dropdown-free {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-2);
  max-width: 16rem;
  padding: var(--bd-space-1);
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

.shell-body {
  padding: var(--bd-space-4);
}

/* Tient lieu d'image : c'est lui qui donne sa taille à la dialog `fit`. */
.fit-media {
  align-items: center;
  background-color: var(--bd-bg-darker);
  color: var(--bd-font-color-dark);
  display: flex;
  justify-content: center;
  max-height: 100%;
  max-width: 100%;
  min-height: 0;
}
</style>
