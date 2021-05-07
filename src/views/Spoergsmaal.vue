<template>
    <div class="main">
        <div class="ready" v-if="state==1">
            <h1>Tillykke!</h1>
            <h3>Du har fundet spørgsmål {{question.nr}}.</h3>
            <h3>Er du klar til at svare?</h3>
            <v-btn @click="getQuest">Ja</v-btn>
        </div>
        <div class="question" v-if="state==2">
            <div class="billede">Billede</div>
            <div class="answers">
                <h3>{{question.quest}}</h3>
                <div class="separator">
                    <div class="curved-corner-topright"></div>
                    <div class="barTop"></div>
                    <div class="curved-corner-topleft"></div>
                    <div class="curved-corner-bottomright"></div>
                    <div class="barBottom"></div>
                    <div class="curved-corner-bottomleft"></div>
                </div>

                <div class="buttons">
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
        </div>
        <div class="result" v-if="result == 'right'">
            <div class="resultBox">
                <v-icon class="right">mdi-check</v-icon>
                <div>
                    <h2>Det var korrekt</h2>
                    <p>Du svarede rigtigt så du har nu {{userAtt.point}} point</p>
                </div>
                <v-btn @click="questContinue()">Gå videre</v-btn>
            </div>
        </div>
        <div class="result" v-if="result == 'wrong'">
            <div class="resultBox">
                <v-icon class="wrong">mdi-close</v-icon>
                <div>
                    <h2>Det var forkert</h2>
                    <p>Du har {{userAtt.point}} point</p>
                </div>
                <v-btn @click="questContinue()">Gå videre</v-btn>
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
            state: 1,
            basePoint: 2000,
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
                this.result = 'right'
            }else{
                this.result = 'wrong'
            }
        },
        getQuest(){
            this.state = 2
            /*db.collection('brugere').doc(this.userAtt.email).set({
            completed: completedQuest
            }, { merge: true });*/
        },
        questContinue(){
            this.$store.commit('currentQuestRemove')
            this.$router.push('/')
        }
    },
    computed: {
        question(){
            return this.$store.getters.currentQuest
        },
        userAtt(){
            return this.$store.getters.userAtt
        }
    },
}
</script>

<style lang="scss">
.ready{
    height: 100vh;
    width: 100vw;
    background-size: 170%;
    background-position: bottom right;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/fyrtoejet-eb6bc.appspot.com/o/Stroke%201%20stor.svg?alt=media&token=98dc6981-9d20-425f-a606-cd41cd808fe1');
    background-repeat: no-repeat;
    h1{
        margin-bottom: 10vw;
    }
    .v-btn{
        margin-top: 10vw;
    }
}

.question{
    display: flex;
    flex-flow: column;
    align-items: center;
    .billede{
        width: 80vw;
        height: 40vw;
        border: 2vw solid colors(white);
        box-shadow: shadow();
    }

    .answers{
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-top: 10vw;
        h3{
            width: 80vw;
            height: 30vw;
            background-color: #ffffff88;
            padding-top: 15vw;
        }
        .separator{
            display: flex;
            width: 80vw;
            flex-wrap: wrap;
            .barTop{
                width: 70vw;
                height: 5vw;
                background-color: #ffffff88;
                border-bottom: colors(primary) dashed 0.25vw;
                position: relative;
                overflow: hidden;
            }
            .barBottom{
                width: 70vw;
                height: 5vw;
                background-color: #ffffff88;
                border-top: colors(primary) dashed 0.25vw;
                overflow: hidden;
                position: relative;
            }
        }
        .buttons{
            background: #ffffff88;
            width: 80vw;
            height: 80vw;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-evenly;
        }
    }

    .curved-corner-bottomleft,
    .curved-corner-bottomright,
    .curved-corner-topleft,
    .curved-corner-topright {
        width: 5vw;
        height: 5vw;
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

.result{
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.432);
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .resultBox{
        background-color: colors(white);
        height: 100vw;
        width: 100vw;
        box-shadow: shadow();
        display: flex;
        flex-flow: column;
        justify-content: space-evenly;
        align-items: center;
        p{
            font-size: 5vw;
            margin-top: 3vw;
            width: 80vw;
        }
        .v-icon{
            font-weight: 900 !important;
            font-size: 20vw;
        }
        .right{
            color: colors(success);
        }
        .wrong{
            color: colors(error);
        }
    }
}
</style>