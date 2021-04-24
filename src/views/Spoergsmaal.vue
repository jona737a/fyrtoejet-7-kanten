<template>
    <div class="main">
<!--  DIALOG    -->
        
      
        
<!--  DIALOG    -->

        <v-btn @click="getQuest" v-if="state==1">
            Er de klar til at besvare næste spørgsmål?
        </v-btn>
        <div class="question" v-if="state==2">
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
        <div class="result" v-if="state==3">
            <div class="right" v-if="result == 'right'">
                Du svarede rigtigt du har nu {{userAtt.point}} point
                <v-btn to="/">Åben Kamera</v-btn>
            </div>
            <div class="wrong" v-if="result == 'wrong'">
                Du svarede forkert du har {{userAtt.point}} point
                <v-btn to="/">Åben Kamera</v-btn>
            </div>
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
            state: 1,
            basePoint: 2000,
            dialog: false,
            result: '',
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
                this.state = 3
                this.result = 'right'
            }else{
                this.state = 3
                this.result = 'wrong'
            }
        },
        getQuest(){
            db.collection('quiz').doc(this.currentQuest).onSnapshot(doc => {
                if(doc.exists){
                    this.question = doc.data()
                    this.state = 2
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