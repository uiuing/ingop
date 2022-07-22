<script setup>
import FixBanner from '@/components/Fix/FixBanner.vue'
import MonitorState from '@/components/Monitor/MonitorState.vue'
</script>

<template>
  <monitor-plugins>
    <monitor-state />
  </monitor-plugins>
  <fix-banner />
  <router-view />
</template>

<style>
@import './assets/css/style.css';
</style>
