const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("labelForChoiceA");
const choiceB = document.getElementById("labelForChoiceB");
const choiceC = document.getElementById("labelForChoiceC");
const choiceD = document.getElementById("labelForChoiceD");
const counter = document.getElementById("counter");
//const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const scoreText = document.getElementById("score");
//let valueSel =  document.querySelector('input[name="choice"]:checked'); 
// create our questions
let questions = [
    {
        question : "How many hours do cats sleep a day?",
        choiceA : "A)13-16",
        choiceB : "B)7-10",
        choiceC : "C)20-24",
        choiceD : "D)5-8",
        correct : "A"
    },{
        question : "How many toes do cats have?",
        choiceA : "A)30",
        choiceB : "B)15",
        choiceC : "C)18",
        choiceD : "D)6",
        correct : "C"
    },{
        question : "How many times there height can cats jump?",
        choiceA : "A)5",
        choiceB : "B)2",
        choiceC : "C)10",
        choiceD : "D)9",
        correct : "A"
      },{
        question : "Howmany teeth do adult cats have?",
        choiceA : "A)30",
        choiceB : "B)50",
        choiceC : "C)10",
        choiceD : "D)20",
        correct : "A"
      },{
        question : "How old was the oldest cat know to live untill?",
        choiceA : "A)20",
        choiceB : "B)50",
        choiceC : "C)100",
        choiceD : "D)36",
        correct : "D"
      },{
        question:  "How far can cats see?",
        choiceA : "A)120 ft",
        choiceB : "B)5 ft",
        choiceC : "C)60 ft",
        choiceD : "D)40ft",
        correct : "A"
      },{
        question:  "How many breeds of cats are there?",
        choiceA : "A)50",
        choiceB : "B)80",
        choiceC : "C)100",
        choiceD : "D)over 100",
        correct : "D"
      },{
        question:  "How many lifes to do people say cats have?",
        choiceA : "A)10",
        choiceB : "B)20n",
        choiceC : "C)5",
        choiceD : "D)9",
        correct : "D"
      },{
        question:  "Where do cats sweat from?",
        choiceA : "A)paws",
        choiceB : "B)armpits",
        choiceC : "C)body",
        choiceD : "D)tail",
        correct : "A"
      },{
        question:  "What colour is a cat tongue",
        choiceA : "A)Blue",
        choiceB : "B)Pink",
        choiceC : "C)Green",
        choiceD : "D)White",
        correct : "B"
    }
];
// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 300; // 5min
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
var score = 0;
// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerText =  q.question ;
    // qImg.innerHTML = "<img src="+ q.imgSrc +">";
    // console.log(q.choiceA);
    choiceA.innerText = q.choiceA;
    choiceB.innerText = q.choiceB;
    choiceC.innerText = q.choiceC;
    choiceD.innerText = q.choiceD;

}
start.addEventListener("click",startQuiz);
// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    choices.style.display = "block";
    renderProgress();
    renderCounter();
    //TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}
function nextQuestion(){

   let valueSel= document.querySelector('input[name="choice"]:checked').value;
    console.log("value of selected "+ valueSel);
    
    checkAnswer(valueSel);
    renderQuestion();
    console.log("inside next question");

}
// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}
// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        //timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
           // clearInterval(TIMER);
            scoreRender();
        }
    }
}
// checkAnwer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){  
        // answer is correct
        score++;
        console.log("score is"+score);
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
       // renderQuestion();
    }else{
        // end the quiz and show the score
        console.log("inside last question");
        clearInterval(TIMER);
        scoreRender();
    }
}
// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";

}
// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
// score render
function scoreRender(){
    console.log("inside score render value "+score);
    choices.style.display = "none";
    scoreDiv.style.display = "block";
    scoreText.innerText=score;

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
}