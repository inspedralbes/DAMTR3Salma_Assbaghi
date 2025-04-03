<template>
  <v-navigation-drawer app class="drawer" width="250">
    <v-list dense>
      <v-list-item-group color="pink">
        <v-list-item to="/microserveis" class="item">
          <v-list-item-content>
            <v-list-item-title>💻 Microserveis</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/jugadors" class="item">
          <v-list-item-content>
            <v-list-item-title>🎮 Jugadors</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/estadistiques" class="item">
          <v-list-item-content>
            <v-list-item-title>📊 Estadístiques</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/EditPersonatge" class="item">
          <v-list-item-content>
            <v-list-item-title>🧚 Editar Personatge</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar'
};
</script>

<style scoped>
.drawer {
  background: linear-gradient(to bottom right, #ffe0f0, #ffd1eb);
  border-right: 4px solid #ff8acb;
  box-shadow: 5px 0 20px rgba(255, 182, 193, 0.3);
}

.item {
  transition: all 0.3s ease;
  border-radius: 12px;
  margin-bottom: 8px;
}

.item:hover {
  background-color: #ffc1e3;
  transform: scale(1.03);
  box-shadow: 0px 4px 12px rgba(255, 105, 180, 0.3);
}

.v-list-item-title {
  color: #c2185b;
  font-weight: 600;
  font-size: 1rem;
}
</style>
