<script setup>
import FixedLogo from "./components/FixedLogo.vue";</script>

<template>
  <el-divider style="height: 0 !important;" />
  <el-container class="internal-height">
    <el-aside width="30%">
      <FixedLogo />
    </el-aside>
    <el-divider direction="vertical" class="internal-height" />
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>