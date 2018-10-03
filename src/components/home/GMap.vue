<template>
<div class="background">
<div class="marker">
<div class="words">
<h5>How It Works<span class="red-text">!</span></h5>
<p>Zoom out of the map or to the city you are looking to collab in. Click the icon<i class="material-icons red-text">location_on</i>to view profiles and to add collabs!</p>
</div>
</div>
<div class="map">
  <div class="google-map" id="map"></div>

</div>

</div>


</template>

<script>
import firebase from 'firebase'
import db from'@/firebase/init'

export default {
  name: 'GMap',
  data(){
    return{
      lat: 52,
      lng: -2

    }
  },
  methods: {
    renderMap(){
      const map = new google.maps.Map(document.getElementById('map'),
      {
        center: {lat: this.lat , lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      })

      db.collection('users').get().then(users => {
        users.docs.forEach(doc =>{
          let data = doc.data()
          if(data.geolocation) {
            let marker = new google.maps.Marker({
              position: {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng
              },
              map
            })
            // add click event to marker
            marker.addListener('click', ()=> {
              this.$router.push({ name: 'ViewProfile', params: { id: doc.id }})
            })
          }
        })
      })
    }
  },
  mounted() {
    //get current user
    let user = firebase.auth().currentUser
    console.log(user)
    //get user geolocation
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude

        //find the user record  and update geocoords
        db.collection('users').where('user_id', '==', user.uid).get()
        .then(snapshot =>{
          snapshot.forEach((doc) => {
            db.collection('users').doc(doc.id).update({
              geolocation: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              }
            })
          })
          }).then(() => {
             this.renderMap()

          })

      }, (err)=> {
        console.log(err)
        this.renderMap()
      }, { maximumAge: 6000, })
    } else {
      //position center by default values
      this.renderMap()
    }
  }
}

</script>

<style>

.marker {
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 255px;
  margin-top:100px;
  margin-left:5%;
  border-radius: 50%;
  text-align: center;
  background: url(https://openclipart.org/image/800px/svg_to_png/260439/earth.png);
  background-size: 100%;

}
p {
  color: black;
}
.words {
margin-top: 35px;
color: white;
}

.marker > h5 {
  margin-bottom: -8px;
}


.google-map {
  width:100%;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  background: #fff;
  top: 0;
  left: 0;
  z-index: -1;
}



.background {
   content: "";
   background: url(../../img/jc2.png);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  position: absolute;
  z-index: -1;
}
</style>