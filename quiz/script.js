const questions = [
    {
        title: "In CSS, what property is used to set the background color?",
        options: ["color", "bgcolor", "background-color", "background-image"],
        answer: "background-color",
        answered: false
    },
    {
        title:
            "The border-image CSS property is shorthand for which five properties?",
        options: [
            "border-image-size, border-image-repeat,border-image-offset, border-image-file, border-image-slice",
            "border-image-color, border-image-height, border-image-width, border-image-file, border-image-offset",
            "border-image-style, border-image-range, border-image-width, border-image-resize, border-image-end",
            "border-image-outset, border-image-repeat, border-image-slice, border-image-source, border-image-width"
        ],
        answer: "border-image-outset, border-image-repeat, border-image-slice, border-image-source, border-image-width",
        answered: false
    },
    {
        title: "What is the HTML data-* global attribute used for?",
        options: [
            "Sending submitted form content to a database",
            "Formatting user input as tabular data",
            "Storing extra information that is not part of standard HTML attributes",
            "Accepting a file upload in a standard data format (.csv, .xls, .tsv, etc. )"
        ],
        answer: "Storing extra information that is not part of standard HTML attributes",
        answered: false
    },
    {
        title:
            "True or False: In JavaScript, the forEach() method can modify the array it's iterating over.",
        options: ["True", "False"],
        answer: "False",
        answered: false
    },
    {
        title: "What does 'DOM' stand for?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Object Module",
            "Document Output Method"
        ],
        answer: "Document Object Model",
        answered: false
    }
];

// Pages
const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const finishPage = document.getElementById("finish-page");

// Start page elements
const startBtn = document.getElementById("start-btn");

// Quiz page elements
const questionTitle = document.getElementById("question-title");
const optionsList = document.getElementById("options-list");
const previousBtn = document.getElementById("previous-question");
const nextBtn = document.getElementById("next-question");
const scoreField = document.getElementById("user-score");
const progressField = document.getElementById("progress-indicator");

// Finish page elements
const finishMessage = document.getElementById("finish-message");
const finishScoreField = document.getElementById("finish-score");
const restartBtn = document.getElementById("restart-btn");

// Global variables
let currentIndex = 0;
let score = 0;

startBtn.addEventListener("click", () => {
    toggleVisibility(startPage);
    toggleVisibility(quizPage);
    clearParameters();
    populateQuestion(currentIndex);

})

previousBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        console.log("current index before clicking:", currentIndex)
        currentIndex -= 1;
        console.log("current index after clicking:", currentIndex)
        populateQuestion(currentIndex);
    }

})

nextBtn.addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
        console.log("current index before clicking:", currentIndex)
        currentIndex += 1;
        console.log("current index after clicking:", currentIndex)
        populateQuestion(currentIndex);
    }
    else {
        displayFinishPage();
    }
})

restartBtn.addEventListener("click", () => {
    clearParameters();
    toggleVisibility(finishPage);
    toggleVisibility(startPage);
})

function populateQuestion(index) {

    populateProgress(index);
    populateQuestionInfo(index);
    addClassToListItems(index);
    
}

function populateProgress(index) {
    progressField.innerText = "";
    progressField.innerText = `Question ${index + 1} of ${questions.length}`;
}

function populateQuestionInfo(index) {
    optionsList.innerHTML = "";

    questionTitle.innerText = questions[index].title;
    questions[index].options.forEach((option) => {
        let listItemContent = "";

        if (questions[index].answered == true) {
            if (option == questions[index].answer) {
                listItemContent = `<li class="option correct">${option}</li>`
            }
            else {
                listItemContent = `<li class="option incorrect">${option}</li>`
            }

        }
        else {
            listItemContent = `<li class="option">${option}</li>`
        }

        optionsList.innerHTML += listItemContent;
    })
}

function addClassToListItems(index) {
    const listItems = Array.from(document.querySelectorAll("#options-list li"));

    listItems.forEach((listItem) => {
        listItem.addEventListener("click", () => {

            if (listItem.innerText == questions[index].answer) {
                listItem.classList.add("correct")
                // currentIndex += 1;

                if (questions[index].answered == false) {
                    score += 1;
                    scoreField.innerText = `Your score: ${score}`;
                    questions[index].answered = true
                }

            }
            else {
                listItem.classList.add("incorrect")

            }

        })
    })
}

function toggleVisibility(page) {
    page.classList.toggle("hide");
}

function displayFinishPage() {
    toggleVisibility(quizPage);
    toggleVisibility(finishPage);

    let scorePercentage = Math.floor(score / questions.length * 100);
    let message = ""
    switch (true) {
        case (scorePercentage < 25):
            message = "You can do better...";
            break;
        case (scorePercentage >= 25 && scorePercentage < 50):
            message = "You still need to polish some concepts...";
            break;
        case (scorePercentage >= 50 && scorePercentage < 75):
            message = "You're good at this!";
            break;
        case (scorePercentage >= 75 && scorePercentage < 100):
            message = "Wow! You got most of them correct!";
            break;
        default:
            message = "Awesome! You aced the test :)"
            break;
    }

    finishMessage.innerText = message;
    finishScoreField.innerText = `Your score: ${scorePercentage}`;

}

function clearParameters() {
    currentIndex = 0;
    score = 0;
    scoreField.innerText = "Your score: 0"
    progressField.innerText = `Question 1 of ${questions.length}`;

    questions.forEach((question) => {
        question.answered = false;
    })
}