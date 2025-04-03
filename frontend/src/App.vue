<template>
  <v-app>
    <template v-if="!isIndexPage">
      <sidebar />
    </template>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '@/components/Sidebar';

export default {
  components: {
    Sidebar
  },
  setup() {
    const route = useRoute();
    const isIndexPage = computed(() => route.name === 'login');
    return { isIndexPage };
  }
};
</script>