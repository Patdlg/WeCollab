<template>
<div class="container">
<div class="slogan">
<div class="words">
  <h2><span class="red-text">We</span>Collab is a platform to join and collab your talents with your peers across the globe.
</h2>
<h4>Meet people with your same interests! Create, discuss, and dream about the next big thing!</h4>
</div>
</div>

<div @submit.prevent="signup" class="signup container">
  <form class="card-panel">
    <h2 class="center black-text">Signup</h2>
    <div class="field">
    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email"></input>
    </div>
    <div class="field">
    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password"></input>
    </div>
     <div class="field">
    <label for="alias">Username:</label>
    <input type="text" name="alias" v-model="alias"></input>
    </div>
    <p class="red-text center" v-if="feedback">
    {{ feedback }}
    </p>
    <div class="field">
    <button class="btn lime darkern-4">
    Signup
    </button>

    </div>
  </form>
</div>
</div>


</template>

<script>
  import slugify from 'slugify'
  import db from '@/firebase/init'
  import firebase from 'firebase'


export default {

  name: 'Signup',
  data(){
    return {
        email: null,
        password: null,
        alias: null,
        feedback: null,
        slug: null
    }
  },
  methods: {
    signup(){
      if(this.alias&& this.email && this.password){
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if(doc.exists) {
            this.feedback = 'This alias already exists'
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
            console.log(cred.user)
            ref.set({alias:this.alias, geolocation: null, user_id: cred.user.uid})
            }).then(()=> {
              this.$router.push({ name: "GMap" })
            })
            .catch(err => {
              console.log(err)
              this.feedback = err.message
            })
            this.feedback = "this alias is available"
          }
        })
      } else {
        this.feedback = "Please Enter All Fields"
      }
    }
  }
}

</script>

<style>

.container {
  display: flex;
  align-items: flex-start;
}
.container::after {
  content: "";
   background: url(../../img/jc1.png);
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  position: absolute;
  z-index: -1;

}

.slogan {
  width: 600px;
  margin-left: -5%;
  margin-right: 30px;
  margin-top:10px;
  color: white;


}

.card-panel {
  width: 100%;
}

.signup{
  max-width: 400px;
  margin-top:10px;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottm: 16px;
}

</style>