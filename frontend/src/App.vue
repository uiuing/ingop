<script setup>
import InstallationPrepare from "./pages/InstallationPrepare.vue";
import InstallationWaiting from "./pages/InstallationWaiting.vue";
import InstallationSucceeded from "./pages/InstallationSucceeded.vue";

import StateLogo from "./components/StateLogo.vue";

import { computed, ref } from "vue";

const routes = {
  '/': InstallationPrepare,
  '/waiting': InstallationWaiting,
  '/succeeded': InstallationSucceeded
};

const currentPath = ref(window.location.hash);
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || "/";
});

document.documentElement.style.setProperty("--internal-height", window.innerHeight + "px");
</script>

<template>
  <el-container class="internal-height">
    <el-aside width="30%">
      <state-logo />
    </el-aside>
    <el-divider direction="vertical" class="internal-height" />
    <el-main>
      <component :is="currentView" />
    </el-main>
  </el-container>
</template>
