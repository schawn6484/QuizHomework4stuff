const questions = [
    {
        question:'What does HTML stand for?',
        answers: [
            { text:'Hyper Text Markup Language', correct: true},
            {text:'Hyper Text Preprocessor', correct: false},
            {text:'Hyper Text Multiple Language', correct: false},
            {text:'Hyper Tool Markup Language', correct: false}
            
        ]
    },
    {

        question:'What does CSS stand for?',
        answers: [
            {text:'Colorful Style Sheet', correct: false},
            {text:'Cascading Style Sheet', correct: true},
            {text:'Computer Style Sheet', correct: false},
            {text:'Common Style Sheet', correct: false}
            

        ]
    },
    {

        question:'Choose the correct HTML element for the largest heading:',
        answers: [
            {text:'<head>', correct: false},
            {text:'<h6>', correct: false},
            {text:'<heading>', correct: false},
            {text:'<h1>', correct: true}
            
        ]
    },
    {

        question:'What is the correct HTML element for inserting a line break?',
        answers: [
            {text:'<break>', correct: false},
            {text:'<line>', correct: false},
            {text:'<bk>', correct: false},
            {text:'<br>', correct: true}
            
        ]
    },
    {

        question:'Which character is used to indicate an end tag?',
         answers: [
        {text:'*', correct: false},
        {text:'/', correct: false},
        {text:'<', correct: true},
        {text:'^', correct: false}
        
    ]
}
];

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerEl = document.getElementById('time')
const endEl = document.getElementById('end')
const finalScoreEl =document.getElementById('final-score')
const submitEl = document.getElementById('submit')
var time = questions.length * 10;
var score = 0;
var timerId;

let shuffledQuestions, currentQuestionIndex
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startTimer(){
    time--;
    timerEl.textContent = time;
    if(time <= 0){
        endGame();
    }
}

function endGame()
{
    clearInterval(timerId);
    endEl.removeAttribute('class');
    questionContainerElement.setAttribute('class', 'hide')
    finalScoreEl.textContent = score;
}

function startGame(){
//console.log('Started')
startButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() -.5)
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
timerId = setInterval(startTimer, 1000);
timerEl.textContent = time;
setNextQuestion();

}

function setNextQuestion(){
resetState()   
showQuestion(shuffledQuestions[currentQuestionIndex])
}


function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer =>{
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct =answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if(correct){
        score+=1;
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    } )
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText ='Quit'
        startButton.classList.remove('hide')

    }
}


function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else{
        element.classList.add('incorrect')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('incorrect')
    

}


function scoreStorage(){
    const initialEl = document.getElementById('initials')
    localStorage.setItem('score', JSON.stringify({
        score: score,
        name: initialEl.value
    }))
}

submitEl.onclick = scoreStorage;

