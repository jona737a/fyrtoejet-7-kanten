import Vue from 'vue'
import Vuex from 'vuex'
import 'firebase/firestore'
import firebase from 'firebase/app'
const db = firebase.firestore();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userAtt: null,
    currentQuest: '',
  },
  mutations: {
    userStatus(state, user) {
      if (user){
        state.currentUser = user
        db.collection('brugere').doc(state.currentUser.email).onSnapshot(doc => {
          if(doc.exists){

            state.userAtt = doc.data()
          }else{
            console.log('Ikke noget document')
          }
        })

      }
      else {
        state.currentUser = null
        state.userAtt = null
      }
    },
    currentQuestUpdate(state,code){
      state.currentQuest = code
    },
    currentQuestRemove(state){
      state.currentQuest = ''
    }
  },
  actions: {
    setUser(context, user){
      context.commit('userStatus', user)
    },
  },
  modules: {
    
  },
  getters:{
    currentUser: state => state.currentUser,
    userAtt: state => state.userAtt,
    currentQuest: state => state.currentQuest,
  }
})
