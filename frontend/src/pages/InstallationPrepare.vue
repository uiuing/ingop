<template>
  <div class="locale-changer">
    <el-select v-model="$i18n.locale" class="m-2" placeholder="Select" size="small">
      <el-option
          v-for="locale in $i18n.availableLocales"
          :label="locale"
          :value="locale"
      />
    </el-select>
  </div>
</template>