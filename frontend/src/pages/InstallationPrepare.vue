<template>
  <div class="locale-changer">
    <el-select v-model="$i18n.locale" class="locale-select" size="small">
      <el-option
          v-for="locale in $i18n.availableLocales"
          :label="locale"
          :value="locale"
      />
    </el-select>
  </div>
  <div class="text-title">
    <p> Hi &#x1F44B; </p>
    <p> {{ $t('prepare.title') }} </p>
  </div>
  <div class="btn-start">
    <el-button type="primary" size="large" round plain>
      {{ $t('prepare.start') }}
    </el-button>
  </div>
</template>

<style scoped>
.locale-changer {
  display: flex;
  justify-content: flex-end;
}

.locale-select {
  width: 100px;
}

.text-title {
  font-size: 50px;
  font-weight: bold;
}

.text-title p:first-child {
  font-style: italic;
}

.text-title p:last-child {
  margin: 20px 0;
  font-size: 20px;
  color: #3A3A3A;
}

.btn-start {
  margin-top: 100px;
}
</style>