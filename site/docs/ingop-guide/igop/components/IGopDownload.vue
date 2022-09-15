<script setup lang="ts">
const urls = {
  windows: {
    ia32: {
      title: 'Windows ia32',
      url: 'https://s-ingop.uiuing.com/mirrors/igop/windows/ia32/IGop Setup 0.9.1.exe'
    },
    x64: {
      title: 'Windows x64',
      url: 'https://s-ingop.uiuing.com/mirrors/igop/windows/x64/IGop Setup 0.9.1.exe'
    }
  },
  darwin: {
    x64: {
      title: 'macOS Intel CPU',
      url: 'https://s-ingop.uiuing.com/mirrors/igop/darwin/x64/IGop-0.9.1.dmg'
    },
    arm64: {
      title: 'macOS Apple CPU',
      url: 'https://s-ingop.uiuing.com/mirrors/igop/darwin/arm64/IGop-0.9.1.dmg'
    }
  }
}

function checkOS() {
  const agent = navigator.userAgent.toLowerCase()
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent)
  if (isMac) {
    return 'darwin'
  }
  if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
    return 'win32'
  }
  if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
    return 'win64'
  }
}

const os = checkOS()

const nowData =
  os === 'darwin'
    ? [urls.darwin.x64, urls.darwin.arm64]
    : [os === 'win32' ? urls.windows.ia32 : urls.windows.x64]

const iconClass = `icon ${os === 'darwin' ? 'icon-darwin' : 'icon-windows'}`
</script>

<template>
  <div class="wrapper">
    <a target="_blank" :href="nowData[0].url">
      <div class="c">
        <div class="d">
          <div :class="[iconClass]" />
        </div>
        {{ nowData[0].title }}
      </div>
    </a>
    <a v-if="nowData.length === 2" target="_blank" :href="nowData[1].url">
      <div class="c">
        <div class="d">
          <div :class="[iconClass]" />
        </div>
        {{ nowData[1].title }}
      </div>
      <div></div>
    </a>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 5vh 0 20vh;
}

.c {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.d {
  background-color: rgb(255, 255, 255);
  margin: 5vh auto;
  width: 15vw;
  min-width: 100px;
  max-width: 150px;
  height: 15vw;
  min-height: 100px;
  max-height: 150px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 16px rgb(28 76 186 / 8%);
}

.icon {
  width: 10vw;
  min-width: 60px;
  max-width: 110px;
  height: 10vw;
  min-height: 60px;
  max-height: 110px;
  display: inline-block;
  background-size: cover;
  transition: background-image 0.2s;
}

.icon-windows {
  background-image: url('../static/windows.svg');
}

.icon-darwin {
  background-image: url('../static/mac.svg');
}

.d:hover {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 30px rgb(44 132 255 / 20%);
}
.c:hover > .d .icon {
  background-image: url('../static/download.svg');
}
</style>
