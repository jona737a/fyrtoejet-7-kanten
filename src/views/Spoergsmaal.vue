<template>
    <div class="main">
<!--  DIALOG    -->
        
<!--  DIALOG    -->

        <v-btn @click="getQuest" v-if="!ready">
            Er de klar til at besvare næste spørgsmål?
        </v-btn>
        <div class="question" v-if="ready">
            <h2>{{question.quest}}</h2>
            <v-btn @click="answer(1)">
                {{question.answer1}}
            </v-btn>
            <v-btn @click="answer(2)">
                {{question.answer2}}
            </v-btn>
            <v-btn @click="answer(3)">
                {{question.answer3}}
            </v-btn>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
const db = firebase.firestore();

export default {
    data(){
        return{
            question: {},
            ready: false,
            basePoint: 2000,
        }
    },
    methods:{
        answer(answerX){
           if(answerX == this.question.correct){
                var pointAdd = this.basePoint + this.userAtt.point 
                var completedQuest = this.userAtt.completed
                completedQuest.push(this.currentQuest)
                db.collection('brugere').doc(this.userAtt.email).set({
                point: pointAdd,
                }, { merge: true });
                this.$store.commit('currentQuestRemove')
                this.$router.push('/')
            }else{
                this.$router.push('/')
            }
        },
        getQuest(){
            db.collection('quiz').doc(this.currentQuest).onSnapshot(doc => {
                if(doc.exists){
                    this.question = doc.data()
                    this.ready = true
                    /*db.collection('brugere').doc(this.userAtt.email).set({
                    completed: completedQuest
                    }, { merge: true });*/
                    console.log('Correct answer: ' + this.question.correct)
                }else{
                    console.log('Fejl ved indlæsning')
                }
            })
        },
    },
    computed: {
        currentQuest(){
            return this.$store.getters.currentQuest
        },
        userAtt(){
            return this.$store.getters.userAtt
        }
    },
}
</script>

<style>

</style>