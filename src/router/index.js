import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/home.vue';
import Preview from '@/components/preview.vue';
import Vna from '@/pages/vna.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview
  },
  {
    path:'/vna',
    name: 'VNA',
    component: Vna
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
