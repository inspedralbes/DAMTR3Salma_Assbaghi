<template>
  <v-container>
    <v-form @submit.prevent="updateCharacter">
      <v-text-field v-model="personatge" label="Personatge" required />
      <v-btn type="submit" color="primary">Update Character</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      personatge: 'Player 1'
    };
  },
  methods: {
    updateCharacter() {
      console.log(`Updating character: ${this.personatge}`);

      //  llamada a  API para actualizar el personaje}
  
      }
      }
};
</script>