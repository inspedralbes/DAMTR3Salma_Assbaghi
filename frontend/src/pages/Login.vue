<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field v-model="username" label="User" required />
              <v-text-field v-model="password" label="Contrassenya" type="password" required />
              <v-btn type="submit" color="primary" block>Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === 'password') {
        this.$router.push('/microserveis');
      } else {
        alert('Login failed');
      }
    }
  }
};
</script>