<template>
<div class="background">
  <div class="view-profile container">
  <div v-if="profile" class="card">
  <h2 class="black-text center">{{ profile.alias }}'s Collabs</h2>
  <ul class="comments collection">
    <li v-for="(comment, index) in comments" :key="index">
    <div>{{ comment.from }}:</div>
    <div class="grey-text">{{ comment.content  }}</div>
    </li>
  </ul>
  <form @submit.prevent="addComment">
  <div class="field">
    <label for="comment">Add a comment</label>
    <input type="text" name="comment" v-model="newComment">
    <p v-if="feedback" class="red-text center"> {{  feedback }}</p>
  </div>
  </form>
  </div>
  </div>
  </div>

</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
  name: 'ViewProfile',
  data(){
    return{
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: []
    }
  },
  created(){
    let ref = db.collection('users')

    // get current user
    ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.user = doc.data(),
        this.user.id = doc.id
      })
    })

    // profile data

    ref.doc(this.$route.params.id).get()
    .then(user => {
      this.profile = user.data()
    })
    //comments
    db.collection('comments').where('to', '==', this.$route.params.id)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added') {
          this.comments.unshift({
            from: change.doc.data().from,
            content: change.doc.data().content
          })

        }
      })

    })
  },
  methods: {
    addComment(){
      if(this.newComment){
        this.feedback = null
        db.collection('comments').add({
          to: this.$route.params.id,
          from: this.user.alias,
          content: this.newComment,
          time: Date.now()
        }).then(()=>{
          this.newComment = null
        })
      } else {
        this.feedback = "Enter Comment To Collab"
      }
    }
  }
}

</script>

<style>

.background::after {
   content: "";
   background: url(../../img/jc3.png);
  opacity: 0.8;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  position: absolute;
  z-index: -1;
}
.card {
  padding: 20px;
  margin-top: 160px;
}

.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}

.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee
}

</style>