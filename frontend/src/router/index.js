import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Microserveis from '@/pages/Microserveis.vue';
import Jugadors from '@/pages/Jugadors.vue';
import Estats from '@/pages/Estadistiques.vue';
import EditPersonatge from '@/pages/EditPersonatge.vue';

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/microserveis', name: 'microserveis', component: Microserveis },
  { path: '/jugadors', name: 'jugadors', component: Jugadors },
  { path: '/estadistiques', name: 'estadistiques', component: Estats },
  { path: '/EditPersonatge', name: 'EditPersonatge', component: EditPersonatge },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;