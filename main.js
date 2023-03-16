const app = Vue.createApp({
  data(){
    return{
      gameRunning:false,
      winner:null,
      words:[...words],
      currebtWord:"",
      computerTime:0,
      playerTime:0,
      loop:null,
      level:1,
      autofocus:true,
      userImput:""
    }
  },
  methods:{
    startGame(){
      this.words = [...words]
      this.winner=null;
      this.computerTime=0;
      this.playerTime = 0;
      this.setCurrentWord();
      this.startTheClock();
      this.gameRunning=true
    },
    startTheClock(){
      this.loop = setInterval(()=>{
        this.computerTime+=2;
      },1000/this.level)
    },
    setCurrentWord(){
      let rand = Math.floor(Math.random()*this.words.length);
      this.currentWord = this.words[rand];
      this.words.splice(rand,1)
    },
    setWinner(winner){
      this.winner=winner;
      this.gameRunning=false;
      clearInterval(this.loop)
    },
    changeLevel(sign){
      (sign === "-") ? this.level-- : this.level++;
    },
  },
  watch:{
    computerTime(newTime){
      if(newTime>=100){
        this.setWinner('Roco is izgubiJo');
        
      }
    },
    playerTime(newTime){
      if(newTime>=100){
        this.setWinner('Winner is Rocoo')
      }
    },
    level(newLevel){
      if(newLevel <1) this.level=1
    },
    userImput(newImput){
      if(newImput.toLowerCase()===this.currentWord.toLowerCase()){
        this.playerTime+=10;
        this.userImput="";
        this.setCurrentWord();
      }
    }
  }
})
app.mount('#app')