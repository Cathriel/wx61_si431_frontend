<template>
  <v-app>
    <v-container fluid>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-title primary-title class="justify-center text-h3 pt-8 pb-6">Iniciar sesión</v-card-title>
            <v-spacer/>
            <v-form @submit.prevent="handleLogin" v-model="isValid">
              <v-container fluid>
                <v-row class="d-flex justify-center">
                  <v-col cols="12" sm="10" class="pb-5">
                    <v-text-field filled rounded dense label="Username"
                                  v-model="user.username"
                                  autocomplete="username"
                                  :rules="[v => !!v || 'Username is required.']"
                                  required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="10" class="pb-9">
                    <v-text-field filled rounded dense label="Password"
                                  v-model="user.password"
                                  type="password"
                                  autocomplete="current-password"
                                  :rules="[v => !!v || 'Password is required']"
                                  required></v-text-field>
                  </v-col>
                  <div v-if="message">
                    {{ message }}
                  </div>
                  <v-col cols="12" sm="10" class="pb-5">
                    <v-btn block elevation="2" x-large color="amber darken-1" :disabled="loading" type="submit" :loading="loading">
                      <v-progress-circular indeterminate color="primary"
                                           v-if="loading"></v-progress-circular>
                      Iniciar Sesión
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="10" class="pb-5">
                    <v-btn block elevation="2" x-large color="amber lighten-1" to="register">Registrarme en Roomies</v-btn>
                  </v-col>
                  <v-col cols="12" sm="10">
                    <v-btn text block color="amber lighten-1">Olvidé mi contraseña</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import User from "@/models/user";
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      user: new User('', '', '', '', ''),
      loading: false,
      message: '',
      isValid: true,
      planId: 0
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }

  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },

  methods: {

    async handleLogin() {
      this.loading = true;
      console.log('Starting Login handling');

      if (!this.isValid) {
        console.log('Invalid');
        this.loading = false;
        return;
      }
      if (this.user.username && this.user.password) {
        console.log('Starting Request');
        await this.$store.dispatch('auth/login', this.user).then(
            (user) => {
              console.log('Logged In');
              console.log(user);
              if(user.result.id > 0) {
                let authenticatedUser = user.result;
                console.log('Redirectioning')
                this.user.id = authenticatedUser.id;
                this.user.firstName = authenticatedUser.firstName;
                this.user.lastName = authenticatedUser.lastName;
                this.user.username = authenticatedUser.username;
                console.log(this.user)

                axios.get(`https://roomiesapi.azurewebsites.net/api/profiles/${user.result.id}`).then(
                    (response) => {
                      console.log(response.data.plan.id);
                      this.planId=response.data.plan.id;
                      if(this.planId<=2){
                        this.$router.push({name:"home-leaseholder", params:{data:this.user}});
                      }
                      else {
                        this.$router.push({name:"home-landlord", params:{data:this.user}});
                      }
                    }
                )
              }
            },
            error => {
              console.log('Error');
              this.loading = false;
              this.message = (error.response && error.response.data)
                  || error.message || error.toString();
            }
        ).
        catch(function (error){
          alert('El usuario o contraseña es incorrecto');
          this.loading = false;
          this.message = (error.response && error.response.data)
              || error.message || error.toString();

        })
      }
    }
  }
}
</script>


<style scoped>

</style>

