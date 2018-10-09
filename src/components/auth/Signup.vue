<template>
<div class="main">
  <div class="slogan">
    <div class="title">
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

<style scope>

body{
     background: url(https://cdn.lynda.com/course/365728/365728-636190610546181732-16x9.jpg);

}

.slogan {
  height: 100%;
  background-size: cover;
  background-position: center;
  margin-top: -5;

}

.container {
  margin-top: -5px;

}
.container::after {
  content: "";
   height: 130%;
   width: 100%;
  opacity: 0.8;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  position: bottom;
  z-index: -1;

}

h2 {
  color: black;
  width: 30%;
}
.card-panel {
  width: 300px;
  display: block;
  margin-left: auto;
 margin-right: auto;
}

img{
  width: 80px;
}

.signup{
  margin-top: 40px;
    display: block;
  margin-left: auto;
 margin-right: auto;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottm: 16px;
}

</style>