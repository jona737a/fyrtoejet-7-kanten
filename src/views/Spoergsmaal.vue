<template>
    <div class="main">
        <div class="ready" v-if="state==1">
            <h1>Tillykke!</h1>
            <h3>Du har fundet spørgsmål {{question.nr}}.</h3>
            <h3>Er du klar til at svare?</h3>
            <v-btn @click="getQuest">Ja</v-btn>
        </div>
        <div class="question" v-if="state==2">
            <div class="flame"></div>
            <img :src="question.billede" alt="billede" class="billede">
            <h4 class="questNumber">Spørgsmål {{question.nr}}/7</h4>
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
            questTimerStart: '',
        }
    },
    methods:{
        answer(answerX){
           if(answerX == this.question.correct){
                var timeDif = firebase.firestore.Timestamp.now().seconds - this.questTimerStart
                var pointCalc
                if (timeDif >= 0 && timeDif <= 80) {
                    pointCalc = Math.floor(-20 * timeDif + this.basePoint) 
                }else if(timeDif >= 80){
                    pointCalc = 400
                }else{
                    pointCalc = 0
                    console.log('Error')
                }
                var pointAdd = pointCalc + this.userAtt.point 
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
            this.questTimerStart = firebase.firestore.Timestamp.now().seconds
            console.log(this.question.id)
            db.collection('brugere').doc(this.userAtt.email).set({
            completed: this.question.id
            }, { merge: true });

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
    background-position: 10vw 10vw;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/fyrtoejet-eb6bc.appspot.com/o/Stor%20stroke%20ny.svg?alt=media&token=7c0a0c9a-1701-4d60-a1ea-d106494513aa');
    background-repeat: no-repeat;
    h1{
        margin-bottom: 10vw;
    }
    h3{
        color: colors(secondary);
    }
    .v-btn{
        margin-top: 10vw;
    }
}

.question{
    display: flex;
    flex-flow: column;
    align-items: center;
    position: relative;
    z-index: 1;
    .flame{
        width: 100vw;
        height: 100vh;
        position: absolute;
        opacity: 0.3;
        z-index: 0;
    }
    .billede{
        width: 80vw;
        border: 2vw solid colors(white);
        box-shadow: shadow();
        z-index: inherit;
    }
    
    .questNumber{
        background-color: #ffffff;
        margin-top: 10vw;
        margin-bottom: -4vw;
        z-index: 2;
        padding: 2vw 4vw;
        border-radius: 5vw;
    }

    .answers{
        display: flex;
        flex-flow: column;
        align-items: center;
        z-index: inherit;
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
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
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