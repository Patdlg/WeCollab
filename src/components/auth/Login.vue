<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center black-text">Login</h2>
      <div class="field">
    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email"></input>
    </div>
    <div class="field">
    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password"></input>
    </div>
    <p v-if="feedback" class="red-text center">{{ feedback }}</p>
    <div class="field">
      <button class="btn lime darkern-4">Login

      </button>
    </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
  export default {
    name: 'Login',
    data(){
      return {
        email: null,
        password: null,
        feedback: null
      }
    },
    methods: {
      login(){
        if(this.email && this.password){
         firebase.auth().signInWithEmailAndPassword(this.email, this.password)
         .then(cred => {
           console.log(cred.user)
           this.$router.push({ name: 'GMap' })
         }).catch(err => {
           this.feedback = err.message
         })
          this.feedback = null
        } else {
          this.feedback = "Please fill in both fields"
        }
      }
    }
  }

</script>

<style scope>

.container::after {
  content: "";

  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  position: absolute;
  z-index: -1;

}
  .login {
    max-width: 400px;
    margin-top: 60px;
  }

  .login h2 {
    font-size: 2.4em;
  }

  .login .field {
    margin-bottom: 16px;
  }



</style>