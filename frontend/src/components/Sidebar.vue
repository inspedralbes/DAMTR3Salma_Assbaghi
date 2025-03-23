<template>
    <v-navigation-drawer app>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item to="/microserveis">
            <v-list-item-content>
              <v-list-item-title>Microserveis</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/jugadors">
            <v-list-item-content>
              <v-list-item-title>Jugadors</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/estadistiques">
            <v-list-item-content>
              <v-list-item-title>Estadistiques</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/EditPersonatge">
            <v-list-item-content>
              <v-list-item-title>Editar Personatge</v-list-item-title>
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