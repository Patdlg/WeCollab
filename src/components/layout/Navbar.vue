<template>
  <div class="navbar">
  <nav class="lime darken-1">
  <div class="conatiner">

  <router-link class="brand-logo left" :to="{name: 'GMap' }"><span class="red-text">We</span>Collab</router-link>
  <ul class="right">
  <li v-if="!user"><router-link :to= "{ name: 'Signup' }"> Signup</router-link></li>
  <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
  <li v-if="user"> <a>{{ user.email }} <span class="red-text">is signed in!</span></a></li>
  <li v-if="user"><a @click="logout">Logout</a></li>


  </ul>

  </div>
  </nav>

  </div>

</template>

  <script>
  import firebase from 'firebase'
  export default {
    name: 'Navbar',
    data(){
      return {
        user: null
      }
      },
      methods: {
        logout(){
          firebase.auth().signOut().then(()=> {
            this.$router.push({ name: 'Login'})
          })

      },

    },
    created(){
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          this.user = user
        } else {
          this.user = null
        }
      })
    }
  }

  </script>

  <style>

  .marker {
    margin-right: 200px;
  }

  .brand-logo {
    margin-left: 25px;


  }

  .right {
    margin-right: 5%;

  }

  </style>
