//function that builds the list of questions and ability to choose from list of options
   function buildQuiz(){
      // array for HTML output
      const output = [];

      quizQuestions.forEach(
        (currentQuestion, questionNumber) => {
          // variable for list of possible selections
          const answers = [];
  
          // each possible selection
          for(letter in currentQuestion.answers){
  
            //radio button - allows user to make selection from predefined list of options
            //adding selection to 'answers' array
            //adding radio button to each possible option (letter)
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
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
        }
      );
      // turns output array into string and adds it to the page
      quizWrapper.innerHTML = output.join('');
    };

//function that displays results when the submit button is clicked
    function showResults(){
  
      // creates constant named 'answerWrappers'
      // holds value of everything in quizWrapper named 'answers'
      const answerWrappers = quizWrapper.querySelectorAll('.answers');
  
      // holds number of user's correct answers
      let numCorrect = 0;

      quizQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // looks in list of possible answers for each question
        // finds user selected answer ('checked')
        // takes selected option and adds it to 'userSelection' from 'selector'
        const answerWrapper = answerWrappers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userSelection = (answerWrapper.querySelector(selector) || {}).value;
  
        // if the selection is the correct answer, it will:
             // increment 'numCorrect' by 1 
             // color the list of options green
        if(userSelection === currentQuestion.correctAnswer){
          numCorrect++;
          answerWrappers[questionNumber].style.color = 'lightgreen';
        }

        // if the selection is incorrect or blank, it will:
            //color the list of options red
        else{
          answerWrappers[questionNumber].style.color = 'red';
        }
      });
  
      // displays the number of correct selections out of total questions
      // innerHTML adds to HTML and displays
      resultsWrapper.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
    };

    // gets html div element 'quiz'
    const quizWrapper = document.getElementById('quiz');
    // gets html div element 'results'
    const resultsWrapper = document.getElementById('results');
    // gets html button element 'submit
    const submitButton = document.getElementById('submit');

    // creates array 'quizQuestions' and stores questions, options, and correctAnswers
    // 'questions', 'answers', and 'correctAnswer' stored as elements?
    const quizQuestions = [
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
  
    // Calls build quiz function to start application
    buildQuiz();
  
    // Event listener added to submit button
    // When clicked it will call the 'showResults' function
    submitButton.addEventListener('click', showResults);