<template>
  <div class="main">
      <h1>Pointtavle</h1>
      <div class="top">
        <div class="top3" v-for="user in users.slice(0, 3)" :key="user.index">
            <h2>{{users.indexOf(user) + 1}}</h2>
            <div class="separator">
                <div class="curved-corner-bottomleft"></div>
                <div class="curved-corner-bottomright"></div>
                <div class="barLeft"></div>
                <div class="barRight"></div>
                <div class="curved-corner-topleft"></div>
                <div class="curved-corner-topright"></div>
            </div>
            <div class="info">
                <h3>{{user.navn}}</h3>
                <p>{{user.point}} Point</p>
            </div>
        </div>
      </div>
      <div class="rest">
        <div class="top10" v-for="user in users.slice(3, 10)" :key="user.index">
            <div class="info">
                <p>{{users.indexOf(user) + 1}}.</p>
                <p class="navn">{{user.navn}}</p>
                <p>{{user.point}}</p>
            </div>
            <hr>
        </div>
      </div>
      
      
  </div>
</template>

<script>
import 'firebase/firestore'
import firebase from 'firebase/app'
const db = firebase.firestore();


export default {
 data(){
     return{
         users: [],
     }
 },
 mounted(){
    this.getUsers()
 },
 methods:{
    getUsers(){
        db.collection('brugere').get()
            .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
            this.users.push(doc.data());
            this.users.sort(({point:a}, {point:b}) => b-a);
            });
        });
    }
 },
 computed:{
     
 }
}
</script>

<style lang="scss" scoped>
.main{
    display: flex;
    flex-flow: column;
    height: 84vh;
    justify-content: space-between;
    h1{
        color: colors(secondary);
    }
}
.top{
    margin-top: 5vw;
}
.top3{
    display: flex;
    width: 100vw;
    height: 26vw;
    margin-bottom: 5vw;
    h2{
        background-color: #ffffff88;
        height: inherit;
        padding-top: 4vw;
        width: 30vw;
        font-size: 14vw;
        text-align: center;
        color: #C3922D;
    }
    .info{
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        padding: 6vw 5vw;
        width: 62vw;
        height: inherit;
        background-color: #ffffff88;
        h3{
            margin-bottom: 1vw;
        }
    }
}

.rest{
    background-color: #fff8;
    width: 100vw;
    border-radius: 10vw 10vw 0 0 ;
    box-shadow: 0 -2px 4px #0003;
    padding: 5vw 0;
    margin-top: 5vw;
    .top10{
        margin-bottom: 4vw;
        width: 100vw;
        padding: 0 6vw;
        .info{
            display: flex;
            justify-content: space-between;
            padding: 0 2vw 1vw 2vw;
            color: #C3922D;
            .navn{
                width: 60vw;
                text-align: left;
                position: absolute;
                left: 20vw;
            }
        }
    }
}

.separator{
    display: flex;
    width: 8vw;
    flex-wrap: wrap;
    .barLeft{
        width: 4vw;
        height: 20vw;
        background-color: #ffffff88;
        border-right: colors(primary) dashed 0.25vw;
        position: relative;
        overflow: hidden;
    }
    .barRight{
        width: 4vw;
        height: 20vw;
        background-color: #ffffff88;
        border-left: colors(primary) dashed 0.25vw;
        overflow: hidden;
        position: relative;
    }
    .curved-corner-bottomleft,
    .curved-corner-bottomright,
    .curved-corner-topleft,
    .curved-corner-topright {
        width: 4vw;
        height: 3vw;
        overflow: hidden;
        position: relative;
    }
    .curved-corner-bottomleft:before,
    .curved-corner-bottomright:before,
    .curved-corner-topleft:before,
    .curved-corner-topright:before {
        content: "";
        display: block;
        width: 200%;
        height: 200%;
        position: absolute;
        border-radius: 50%;
    }
    .curved-corner-bottomleft:before {
        bottom: 0;
        left: 0;
        box-shadow: -2.5vw 2.5vw 0 0 #ffffff88;
    }
    .curved-corner-bottomright:before {
        bottom: 0;
        right: 0;
        box-shadow: 2.5vw 2.5vw 0 0 #ffffff88;
    }
    .curved-corner-topleft:before {
        top: 0;
        left: 0;
        box-shadow: -2.5vw -2.5vw 0 0 #ffffff88;
    }
    .curved-corner-topright:before {
        top: 0;
        right: 0;
        box-shadow: 2.5vw -2.5vw 0 0 #ffffff88;
    }
}
</style>