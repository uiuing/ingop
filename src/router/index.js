import { createRouter, createWebHashHistory } from 'vue-router';
import CheckEnvironment from '@/pages/CheckEnvironment.vue';

const routes = [
  {
    path: '/',
    name: 'check-environment',
    component: CheckEnvironment
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
