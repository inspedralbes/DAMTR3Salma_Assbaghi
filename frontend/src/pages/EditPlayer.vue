<template>
  <v-container>
    <v-form @submit.prevent="updateCharacter">
      <v-text-field v-model="characterName" label="Character Name" required />
      <v-btn type="submit" color="primary">Update Character</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      characterName: 'Player 1'
    };
  },
  methods: {
    updateCharacter() {
      console.log(`Updating character: ${this.characterName}`);
      // Lógica para actualizar el personaje
    }
  }
};
</script>