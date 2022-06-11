<script setup>
import StateInstallation from "../components/StateInstallation.vue";



// setTimeout(() => {
//   StartInstallation("https://uiuing.com/GoPlus-Release-Package/InstallationPackage/gop-1.1.0-rc2.zip").then(() => {
//   }).catch(() => {
//   });
// }, 1000);



const callBack = () => {
  location.hash = "";
};

</script>

<template>
  <state-installation />
  <el-button type="primary" @click="callBack">Start</el-button>
</template>