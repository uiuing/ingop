<template>
  <el-select v-model="$i18n.locale" class="select" size="small">
    <el-option
        v-for="locale in $i18n.availableLocales"
        :value="locale"
    />
  </el-select>
</template>

<style scoped>
.select {
  width: 100px;
}
</style>