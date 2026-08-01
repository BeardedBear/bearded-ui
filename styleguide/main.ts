import { createApp } from "vue";

import StyleGuide from "./StyleGuide.vue";

const app = createApp(StyleGuide);

// Les icônes Phosphor lisent leurs défauts par inject : un provide suffit pour
// que toute l'app soit en bold, sans le répéter sur chaque icône.
app.provide("weight", "bold");

app.mount("#app");
