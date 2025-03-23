<template>
    <v-navigation-drawer app>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item to="/microservices">
            <v-list-item-content>
              <v-list-item-title>Microservices</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/players">
            <v-list-item-content>
              <v-list-item-title>Players</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/stats">
            <v-list-item-content>
              <v-list-item-title>Statistics</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/edit-player">
            <v-list-item-content>
              <v-list-item-title>Edit Player</v-list-item-title>
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