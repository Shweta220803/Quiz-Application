document.addEventListener("DOMContentLoaded", () => {
  const enterButton = document.querySelector(".enter");
  const nameInput = document.querySelector("input");
  const categoryButtons = document.querySelectorAll(".btn");
  const mainContainer = document.querySelector(".main_container");

  let userName = "";
  let category = "";
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 10;
  let totalTimeTaken = 0;

  const questionSets = {
    "Pipes and Cistern": [
      {
        question:
          "Three taps A, B and C can fill a tank in 12, 15 and 20 hours respectively. If A is open all the time and B, C are open for one hour each alternatively, the tank will be full in:",
        options: ["6 HRS", "20/3 HRS", "7 HRS", "15/2 HRS"],
        answer: "7 HRS",
      },
      {
        question:
          "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. Both pipes are opened together. The tank will be full in:",
        options: ["12 MIN", "15 MIN", "25 MIN", "50 MIN"],
        answer: "12 MIN",
      },
      {
        question:
          "Pipe A can fill a tank in 8 hours and pipe B can fill the same tank in 12 hours. If both the pipes are opened together, the tank will be filled in:",
        options: ["4.8 HRS", "5.6 HRS", "7.2 HRS", "9.6 HRS"],
        answer: "4.8 HRS",
      },
      {
        question:
          "A tank is normally filled in 9 hours, but takes 10 hours due to a leak in the bottom. If the tank is full, the leak will empty it in:",
        options: ["45 HRS", "60 HRS", "90 HRS", "110 HRS"],
        answer: "90 HRS",
      },
      {
        question:
          "Two pipes A and B can fill a tank in 10 hours and 15 hours respectively. If both pipes are opened together, but after 4 hours pipe A is turned off, how much more time will it take for the tank to be full?",
        options: ["2 HRS", "3 HRS", "4 HRS", "5 HRS"],
        answer: "5 HRS",
      },
      {
        question:
          "A pipe can fill a tank in 12 hours. Due to a leak, it took 20 hours to fill the tank. If the tank is full, the leak can empty it in:",
        options: ["15 HRS", "20 HRS", "30 HRS", "60 HRS"],
        answer: "30 HRS",
      },
      {
        question:
          "A tank has two pipes. One can fill it in 5 hours, and the other can empty it in 6 hours. If both pipes are open, how long will it take to fill the tank?",
        options: ["15 HRS", "25 HRS", "30 HRS", "35 HRS"],
        answer: "30 HRS",
      },
      {
        question:
          "Two pipes A and B can fill a tank in 36 minutes and 45 minutes respectively. A pipe C can empty it in 30 minutes. If all pipes are opened together, how long will it take to fill the tank?",
        options: ["5 HRS", "10 HRS", "15 HRS", "20 HRS"],
        answer: "15 HRS",
      },
      {
        question:
          "A tap can fill a cistern in 10 hours. After half the cistern is filled, three more similar taps are opened. What is the total time taken to fill the cistern completely?",
        options: ["2 HRS", "2.5 HRS", "3 HRS", "3.5 HRS"],
        answer: "2.5 HRS",
      },
      {
        question:
          "A tank is filled in 6 hours by three pipes A, B and C. The pipe C is twice as fast as B, and B is twice as fast as A. How much time will pipe A alone take to fill the tank?",
        options: ["10 HRS", "20 HRS", "30 HRS", "40 HRS"],
        answer: "40 HRS",
      },
      // Add more questions here
    ],
    "Probability": [
      {
        question:
          "A bag contains 2 red, 3 green, and 2 blue balls. If two balls are drawn at random, what is the probability that none of the balls drawn is blue?",
        options: ["10/21", "11/21", "2/7", "5/7"],
        answer: "10/21",
      },
      {
        question:
          "In a lottery, there are 10 prizes and 25 blanks. A lottery is drawn at random. What is the probability of getting a prize?",
        options: ["1/7", "2/7", "3/7", "4/7"],
        answer: "2/7",
      },
      {
        question:
          "A box contains 5 white, 7 red, and 4 black balls. If one ball is drawn at random, what is the probability that it is either white or black?",
        options: ["2/3", "3/5", "7/16", "11/16"],
        answer: "11/16",
      },
      {
        question:
          "A card is drawn at random from a well-shuffled pack of 52 cards. What is the probability of drawing a face card?",
        options: ["1/13", "3/13", "1/4", "9/52"],
        answer: "3/13",
      },
      {
        question:
          "Two dice are thrown simultaneously. What is the probability of getting two numbers whose product is even?",
        options: ["1/2", "1/4", "3/4", "1/8"],
        answer: "3/4",
      },
      {
        question:
          "A committee of 5 persons is to be formed from 6 men and 4 women. What is the probability that the committee contains exactly 3 men?",
        options: ["1/6", "3/8", "5/14", "7/14"],
        answer: "5/14",
      },
      {
        question:
          "A bag contains 5 red balls and 5 blue balls. If two balls are drawn at random, what is the probability that one ball is red and the other is blue?",
        options: ["1/2", "5/9", "5/18", "5/21"],
        answer: "5/9",
      },
      {
        question:
          "The probability that a number selected at random from the first 15 natural numbers is a multiple of 4 is:",
        options: ["1/3", "1/4", "1/5", "2/5"],
        answer: "1/5",
      },
      {
        question:
          "A die is thrown. What is the probability of getting a number greater than 4?",
        options: ["1/2", "1/3", "1/4", "1/6"],
        answer: "1/3",
      },
      {
        question:
          "What is the probability of drawing an ace from a standard deck of cards?",
        options: ["1/13", "1/52", "1/4", "1/26"],
        answer: "1/13",
      },
      // Add more questions here
    ],
    "Problems on Age": [
      {
        question:
          "The sum of the ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
        options: ["4 years", "5 years", "6 years", "7 years"],
        answer: "4 years",
      },
      {
        question:
          "A father said to his son, 'I was as old as you are at present at the time of your birth'. If the father's age is 38 years now, what was the son's age five years back?",
        options: ["14 years", "19 years", "33 years", "38 years"],
        answer: "14 years",
      },
      {
        question:
          "The present ages of three persons are in proportions 4:7:9. Eight years ago, the sum of their ages was 56. Find their present ages.",
        options: ["8, 14, 18", "16, 28, 36", "20, 35, 45", "None of these"],
        answer: "16, 28, 36",
      },
      {
        question:
          "The age of the father is 3 times that of his son. After 5 years, the father's age will be twice that of his son's age. What is the present age of the son?",
        options: ["10 years", "12 years", "15 years", "18 years"],
        answer: "10 years",
      },
      {
        question:
          "Mary is twice as old as Peter. Five years ago, Mary was 3 times as old as Peter. How old is Mary now?",
        options: ["20 years", "25 years", "30 years", "35 years"],
        answer: "30 years",
      },
      {
        question:
          "The sum of the ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
        options: ["4 years", "5 years", "6 years", "7 years"],
        answer: "4 years",
      },
      {
        question:
          "If the present age of a father is three times that of his son, and after 5 years, his age will be twice that of his son. What are their present ages?",
        options: [
          "Father: 30 years, Son: 10 years",
          "Father: 40 years, Son: 15 years",
          "Father: 45 years, Son: 20 years",
          "None of these",
        ],
        answer: "Father: 30 years, Son: 10 years",
      },
      {
        question:
          "The present ages of A and B are in the ratio 5:6. Seven years hence, the ratio of their ages will be 6:7. Find the present age of A.",
        options: ["25 years", "30 years", "35 years", "40 years"],
        answer: "35 years",
      },
      {
        question:
          "Ten years ago, P was half of Q's age. If the ratio of their present ages is 3:4, what will be the total of their present ages?",
        options: ["45 years", "50 years", "55 years", "60 years"],
        answer: "55 years",
      },
      {
        question:
          "The sum of the ages of 5 children born at intervals of 3 years each is 50 years. What is the age of the youngest child?",
        options: ["4 years", "5 years", "6 years", "7 years"],
        answer: "4 years",
      },

      // Add more questions here
    ],
    "Profit and Loss": [
      {
        question:
          "A shopkeeper bought 10 kg of rice for $100 and sold it for $120. What is the profit percentage?",
        options: ["10%", "15%", "20%", "25%"],
        answer: "20%",
      },
      {
        question:
          "If the cost price of 20 articles is equal to the selling price of 16 articles, what is the profit percentage?",
        options: ["20%", "25%", "30%", "35%"],
        answer: "25%",
      },
      {
        question:
          "A man buys a bicycle for $300 and sells it at a loss of 10%. What is the selling price of the bicycle?",
        options: ["$260", "$270", "$280", "$290"],
        answer: "$270",
      },
      {
        question:
          "If an article is sold at a gain of 15% instead of a loss of 15%, the seller gets $30 more. What is the cost price of the article?",
        options: ["$80", "$100", "$120", "$150"],
        answer: "$100",
      },
      {
        question:
          "A trader marks his goods at 25% above the cost price and gives a discount of 20% on the marked price. What is his profit percentage?",
        options: ["2%", "4%", "5%", "10%"],
        answer: "4%",
      },
      {
        question:
          "A man sells two articles for $300 each. On one, he gains 20% and on the other, he loses 20%. What is his overall gain or loss percentage?",
        options: ["No profit no loss", "2% loss", "4% loss", "5% loss"],
        answer: "4% loss",
      },
      {
        question:
          "A person sold a chair for $480, gaining 20% on its cost price. What was the cost price of the chair?",
        options: ["$400", "$420", "$440", "$460"],
        answer: "$400",
      },
      {
        question:
          "If selling price is doubled, the profit triples. Find the profit percentage.",
        options: ["100%", "150%", "200%", "300%"],
        answer: "100%",
      },
      {
        question:
          "A shopkeeper bought a watch for $500 and sold it for $600. What is the percentage profit?",
        options: ["10%", "15%", "20%", "25%"],
        answer: "20%",
      },
      {
        question:
          "A trader bought an article for $100 and sold it at a loss of 10%. What was the selling price?",
        options: ["$80", "$85", "$90", "$95"],
        answer: "$90",
      },

      // Add more questions here
    ],

  };

  enterButton.addEventListener("click", () => {
    userName = nameInput.value.trim();
    if (userName) {
      alert("Now you can start the quiz!");
      document.querySelector(".main").style.display = "block";
      categoryButtons.forEach((button) => {
        button.disabled = false;
      });
    } else {
      alert("Please enter your name.");
    }
  });

  categoryButtons.forEach((button) => {
    button.disabled = true; // Disable buttons initially
    button.addEventListener("click", (event) => {
      category = event.target.textContent;
      questions = questionSets[category];
      startQuiz();
    });
  });

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalTimeTaken = 0;
    mainContainer.innerHTML = `
      <div class="quiz-container">
         <h4>Quiz Category - ${category}</h4> 
        <div class="timer-container">
          <p>Time left: <span id="timer">10</span> seconds</p>
        </div>
        <div class="score-container">
          <p>Score: <span id="score">0</span></p>
        </div>
        <div class="question-container">
          <h5 id="question"></h5>
        </div>
        <div class="options-container">
          <button class="option" data-option="A"></button>
          <button class="option" data-option="B"></button>
          <button class="option" data-option="C"></button>
          <button class="option" data-option="D"></button>
        </div>
        <button id="next-button">Next Question</button>
      </div>
    `;
    displayQuestion();
    startTimer();
    document.getElementById("next-button").addEventListener("click", nextQuestion);
  }

  function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      document.getElementById("question").textContent = currentQuestion.question;
      document.querySelectorAll(".option").forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.addEventListener("click", checkAnswer);
      });
    } else {
      endQuiz();
    }
  }

  function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    if (selectedOption === questions[currentQuestionIndex].answer) {
      score++;
      document.getElementById("score").textContent = score;
    }
    document.querySelectorAll(".option").forEach((button) => {
      button.removeEventListener("click", checkAnswer);
    });
  }

  function nextQuestion() {
    totalTimeTaken += (10 - timeLeft); // Added the time taken for the current question to total time taken
    currentQuestionIndex++;
    clearInterval(timer);
    startTimer();
    displayQuestion();
  }

  function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timer);
    const totalQuestions = questions.length;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - score;
    const percentage = (score / totalQuestions) * 100;
    mainContainer.innerHTML = `
      <div class="result-main-container">
        <div class="result-container">
          <h4>Quiz Result</h4>
          <p><span>${userName}</span>, your result is:</p>
          <p>Total Time Taken: <span>${totalTimeTaken} </span> seconds</p>
          <p>Total Questions: <span>${totalQuestions}</span></p>
          <p>Attempted: <span>${totalQuestions}</span></p>
          <p>Correct: <span>${correctAnswers}</span></p>
          <p>Wrong: <span>${wrongAnswers}</span></p>
          <p>Percentage: <span>${percentage.toFixed(2)}%</span></p>
          <button onclick="location.reload()">Start Again</button>
          <button onclick="window.location.href='index.html'">Go To Home</button>
        </div>
      </div>
    `;
  }
});
