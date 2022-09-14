import { defineConfig } from 'vitepress'
import { ingopGuide, tutorial } from './config/sidebar'

export default defineConfig({
  lang: 'en-US',
  title: 'InGop',
  description:
    'Learn the GO+ language more easily - InGop has prepared: Go+ language Environment Management Client, a vernacular tutorial and practical guide to the Go+ language.',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  lastUpdated: true,
  cleanUrls: 'with-subfolders',
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/uiuing/ingop' }],
    editLink: {
      pattern: 'https://github.com/uiuing/ingop/edit/main/site/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      {
        text: 'Guide',
        link: '/ingop-guide/introduction/what-is-ingop',
        activeMatch: '/ingop-guide/'
      },
      {
        text: 'Go+ Tutorial',
        link: '/tutorial/introduction/what-is-gop',
        activeMatch: '/tutorial/'
      }
    ],
    footer: {
      copyright: 'Copyright © 2019-present uiuing'
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
