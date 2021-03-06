// gets html div element 'quiz'
const quizWrapper = document.getElementById('quiz');
// gets html div element 'results'
const resultsWrapper = document.getElementById('results');
// gets html button element 'submit
const submitButton = document.getElementById('submit');

// Hides submit button
$('#submit').hide()

// creates array 'quizQuestions' and stores questions, options, and correctAnswers
// 'questions', 'answers', and 'correctAnswer' stored as elements?
var quizQuestions = [
  {
    question: "1. Commonly used data types DO NOT include:",
    answers: {
      a: "Strings",
      b: "Booleans",
      c: "Alerts",
      d: "Numbers"
     },
    correctAnswer: "c"
  },
  {
    question: "2. The condition in an if/else statement is enclosed within _____.",
    answers: {
        a: "Quotes",
        b: "Curly Brackets",
        c: "Parenthesis",
        d: "Square Brackets"
      },
    correctAnswer: "c"
  },
  {
    question: "3. Arrays in JavaScript can be used to store _____.",
    answers: {
        a: "Numbers and Strings",
        b: "Other Arrays",
        c: "Booleans",
        d: "All of the above"
      },
    correctAnswer: "d"
  },
  {
    question: "4. String values must be enclosed within _____ when being assigned to variables.",
    answers: {
       a: "Commas",
       b: "Curly Brackets",
       c: "Quotes",
       d: "Parenthesis"
      },
    correctAnswer: "c"
  },
  {
    question: "5. A very useful tool used during development and debugging for printing content to the debugger is _____.",
    answers: {
        a: "JavaScript",
        b: "Terminal/Bash",
        c: "For Loops",
        d: "console.log"
      },
    correctAnswer: "d"
  },
];

//function that builds the list of questions and ability to choose from list of options
// Function to construct quiz
  function buildQuiz(){
    // array for HTML output
    const output = [];
    // variable to display 1 question at a time
    const currentQuestion = (quizQuestions[questionIndex]);
    //quizQuestions.forEach(
      //(currentQuestion, questionNumber) => {
    // variable for list of possible selections
    const answers = [];
    // each possible selection
    for(letter in currentQuestion.answers){
      //radio button - allows user to make selection from predefined list of options
      //adding selection to 'answers' array
      //adding radio button to each possible option (letter)
      answers.push(
        `<label>
          <input type="radio" name="question${questionIndex}" value="${letter}" class="userSelection">
          ${letter} :
          ${currentQuestion.answers[letter]}
        </label>`
        );
    }
      // adds question and possible answers to output array
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
       // }
     // );
      // turns output array into string and adds it to the page
      quizWrapper.innerHTML = output.join('');
      // Displaying current score
      document.getElementById("scoreDisplay").innerHTML = (`Current Score: ${numCorrect}/5`)

  };

// Starts quiz from question 1
var questionIndex = 0

// Creates function for next button to go through questions one by one
$('#nextBtn').on('click', function() { 
  if (questionIndex < quizQuestions.length -1) {
    // increments to next question
    trackScore(questionIndex)
    questionIndex++
    // builds next question
    buildQuiz()
  } else {
    $('#nextBtn').hide()
    $('#submit').show()
  }
});
  
// variable to store number of correct answers
var numCorrect = 0;

function trackScore(index){
  // creates constant named 'answerWrappers'
  // holds value of everything in quizWrapper named 'answers'
  const answerWrappers = quizWrapper.querySelectorAll('.answers');
  const selector = `input[name=question${index}]:checked`;
  const userSelection = $(selector).val();
    // if the selection is the correct answer, it will:
    // increment 'numCorrect' by 1 
    if(userSelection === quizQuestions[index].correctAnswer){
      numCorrect++;
    }
};


function storeScores(newEntry) {
    // Store final score in local storage
      // Gets past scores from local storage
      if(localStorage.getItem('scores')) {
        console.log('About to add to existing array!!')
        // Parses past scores from strings to numbers
        var pastScore = JSON.parse(localStorage.getItem('scores'))
        // Adds new score to past score array
        pastScore.push(newEntry);
        // Adds updated scores array to local storage
        // Parses scores array as strings
        localStorage.setItem("scores", JSON.stringify(pastScore));
        // If there are no past scores it creates an array for scores
      } else {
        console.log('about to start new array')
        var newScoreArray = []
        // Adds new score to array
        newScoreArray.push(newEntry)
        // Sets array in local storage
        // Parses array as strings
        localStorage.setItem("scores", JSON.stringify(newScoreArray));
      };
      // Shows array on results page?
      window.location = 'file:///Users/ashtonwalden/UUBC/homework-4/results.html' 
};




// Calls build quiz function to start application
  buildQuiz();

  
// Event listener added to submit button
document.getElementById("submit").onclick = function() {

    // Prompts user to enter name
    var name = prompt("Please enter your name");

    // Stores name and score
    var newEntry = {
      name: name,
      score: numCorrect
    }

    storeScores(newEntry);

    // Links to results page
    location.href = "results.html";
  };



// Countdown timer
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      // Adds tens place for seconds and minutes
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      
      // Populates 'time' span on html with minutes and seconds
      display.textContent = ` ${minutes}:${seconds}`;

      // If the timer runs out, it will alert the user and force them to submit the quiz
      if (--timer == 0) {
          alert('out of time')
          function outOfTimeSubmit() {
            // Prompts user to enter name
            var name = prompt("Please enter your name");

            // Stores name and score
            var newEntry = {
              name: name,
              score: numCorrect
            }

            storeScores(newEntry);

            // Links to results page
            location.href = "results.html";
          }
          outOfTimeSubmit();
      }
  }, 1000);
}

// Page alerts user and then begins timer after the user acknowledges the alert
window.onload = function () {
  alert("You have 2 minutes to complete this quiz.")
  var twoMin = 60 * 2,
      timeDisplay = document.querySelector('#time');
  startTimer(twoMin, timeDisplay);
};


