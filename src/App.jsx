import React from "react"
import { nanoid } from 'nanoid';
import Instructions from "./components/Instructions"
import Questions from "./components/Questions"
import QuestionBlocks from "./components/QuestionBlocks"
import AnswerChoices from "./components/AnswerChoices"
import decodeHtmlEntities from "./helpers/decode"
import Confetti from 'react-confetti'



function App() {
  const [questions,setQuestions] = React.useState([])
  const [answers, setAnswers] = React.useState([])
  let correctAnswers  = []
  const [selectedAnswers, setSelectedAnswers] = React.useState([])
  const [results, setResults] = React.useState([])


  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&category=17&difficulty=hard")
    .then(res => res.json())
    .then(data => {
      if (data.results) {
        setQuestions(data.results);
        generateAnswers(data.results);
        setResults([])
      } else {
        console.error("Unexpected data format:", data);
      }
    })
    .catch(error => {
      console.error("Error fetching questions:", error);
    });
  }

  function answerHeld(id){
    setAnswers(prevState => prevState.map(questionAnswers => 
      questionAnswers.map(answerComponent => 
        answerComponent.props.id === id ? 
        { ...answerComponent, props: { ...answerComponent.props, isHeld: !answerComponent.props.isHeld } } :
      answerComponent
      )
    ));
  }


React.useEffect(() => {
  let selected = [];
  answers.forEach((questionAnswers) => {
    questionAnswers.forEach((answer) => {
      if (answer.props.isHeld) {
        selected.push(answer.props.option);
      }
    });
  });
  setSelectedAnswers(selected);
}, [answers]);

React.useEffect(()=> {
  generateAnswers(questions);
}, []);


  function generateAnswers(questions){
    let final = []
    const answerChoices = questions.map((item)=>{
    
      let options = item.incorrect_answers.slice()
      options.push(item.correct_answer)
      options.sort((a,b) => 0.5-Math.random())
      
      return(
        options
      )
    })
   
   for(let i = 0 ; i<answerChoices.length; i++){
      const answers = answerChoices[i].map((item,index) => {
        let meta = {
          id: nanoid(),
          isHeld: false
        }
       return(
          <AnswerChoices
          id = {meta.id}
          isHeld = {meta.isHeld}
          holdAnswer = {()=>answerHeld(meta.id)}
          option = {decodeHtmlEntities(item)}
          status = {undefined}
          key={nanoid()}
          />
      )
    })
    final.push(answers) 
    }
    setAnswers(final);
  }

  const blocks = questions.map((item, index) => {
    correctAnswers.push(decodeHtmlEntities(questions[index].correct_answer))
    return(
      <QuestionBlocks
        question = {decodeHtmlEntities(questions[index].question)}
        choices = {answers[index]}
        key = {index}
      />
    )}
  )

  function answerResults() {
    let results = []
    for(let i = 0; i<correctAnswers.length; i++){
      if(decodeHtmlEntities(correctAnswers[i]) === decodeHtmlEntities(selectedAnswers[i])){
        results.push(true);
      } else {
        results.push(false);
      }
    }
    setResults(results)
  }

  function compareAnswers() {
  setAnswers(prevState => prevState.map((questionAnswers, questionIndex) =>
      questionAnswers.map((answerComponent) =>
        answerComponent.props.isHeld || decodeHtmlEntities(answerComponent.props.option) === decodeHtmlEntities(correctAnswers[questionIndex]) ?
        { ...answerComponent, props: { ...answerComponent.props, status: answerComponent.props.option === correctAnswers[questionIndex] } } :
        answerComponent
      )
    ));
    answerResults()
    quizResults()
  }

  function quizResults(){
    let finalResult = [] 
    results.forEach((item) => {
      if(item){
        finalResult.push(item)
      }
    })
    return finalResult.length
  }
  console.log(correctAnswers)
  return (
    <>  
     {quizResults() === 5 && <Confetti width={window.innerWidth || 520} height={window.innerHeight || 300} style={{ position: 'absolute', top: 0, left: 0 }} />
    }
     
      {
        questions.length <= 0 ? 
        <Instructions onClick = {getQuestions}/> 
        : 
        <Questions 
          block = {blocks}
          checkAnswer = {compareAnswers}
          result= {results}
          refresh = {getQuestions}
          finalResult = {quizResults()}
          />
      }
     
    </>
  )
  
}
export default App
