import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Microservices from '@/pages/MicroserviceControl.vue';
import Players from '@/pages/Players.vue';
import Stats from '@/pages/Stats.vue';
import EditPlayer from '@/pages/EditPlayer.vue';

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/microservices', name: 'microservices', component: Microservices },
  { path: '/players', name: 'players', component: Players },
  { path: '/stats', name: 'stats', component: Stats },
  { path: '/edit-player', name: 'edit-player', component: EditPlayer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;