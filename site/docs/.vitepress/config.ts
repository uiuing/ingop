import { defineConfig } from 'vitepress'
import ingopGuide from './config/sidebar/ingopGuide'
import tutorial from './config/sidebar/tutorial'
import nav from './config/nav'

export default defineConfig({
  lang: 'en-US',
  title: 'InGop',
  description:
    'Learn the GO+ language more easily - InGop solutions to help you on your Coding journey .',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  lastUpdated: true,
  cleanUrls: 'with-subfolders',
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/uiuing/ingop' }],
    editLink: {
      pattern: 'https://github.com/uiuing/ingop/edit/main/site/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav,
    footer: {
      copyright: 'Copyright © 2022-present uiuing'
    },
    sidebar: {
      '/ingop-guide/': ingopGuide,
      '/tutorial/': tutorial
    }
  }
})

function sidebarIngopGuide() {}

function sidebarTutorial() {
  return
}
