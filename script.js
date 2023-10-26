// Définition des questions, des réponses, et des explications
const questions = [
    {
        question: "Que signifie 天菜 — <i>tiān cài</i> — (légume du ciel)?",
        choices: [
            { text: "Etoile brillante", correct: false },
            { text: "C'est mon type d'homme/de femme", correct: true },
            { text: "C'est un plat chinois", correct: false },
        ],
        explanation: "C'est un terme populaire sur internet qui est généralement utilisé pour mettre l'accent sur le fait qu'une personne est extrêmement attirante",
    },
    {
        question: "Que signifie 芭比Q了 — <i>bā bǐ Q le</i> — (BBQ)?",
        choices: [
            { text: "C'est mort", correct: true },
            { text: "Coucher de soleil", correct: false },
            { text: "C'est une fête en plein air", correct: false },
        ],
        explanation: "Il est utilisé pour exprimer des sentiments tels que 'c'est fini', 'c'est foutu' ou 'c'est la catastrophe.'",
    },

    {
        question: "Que signifie 自肥 — <i>zì féi</i> — (s'engraisser)?",
        choices: [
            { text: "Améliorer ses compétences artistiques", correct: false },
            { text: "Chercher à s'enrichir personnellement", correct: true },
            { text: "Se lancer dans une carrière personnelle", correct: false },
        ],
        explanation: "Ce terme avait initialement une connotation négative, se référant à l'action de chercher à s'enrichir personnellement en utilisant des ressources ou des opportunités pour des gains personnels.",
    },

    {
        question: "Que signifie 吃瓜群眾 — <i>chī guā qún zhòng</i> — (le groupe de personnes qui mangent des concombres)?",
        choices: [
            { text: "C'est un groupe de personnes qui surveillent les potins en ligne", correct: true },
            { text: "C'est un groupe de personnes qui explorent des endroits mystérieux", correct: false },
            { text: "C'est un groupe de personnes qui cultivent des légumes rares", correct: false },
        ],
        explanation: "Ce terme décrit l'acte de se rassembler sur Internet pour observer ou écouter des potins, en particulier concernant des événements sensationnels ou des potins populaires. C'est une expression courante utilisée pour décrire la participation à la surveillance de potins ou de drames en ligne, souvent avec un ton humoristique.",
    },
];

// Initialisation des variables pour suivre l'état du quiz
let currentQuestion = 0; // Index de la question en cours
let score = 0; // Score du joueur
let incorrectAnswers = []; // Tableau pour stocker les réponses incorrectes
let correctAnswers = []; // Tableau pour stocker les bonnes réponses

// Sélection des éléments HTML
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");

// Fonction pour afficher la question en cours
function showQuestion() {
    if (currentQuestion < questions.length) {
        // Obtention des données de la question actuelle
        const questionData = questions[currentQuestion];
        const choices = questionData.choices.map((choice, index) => {
            return `<label class="theme-btn btn-style-two"><input type="radio" name="reponse" value="${choice.text}"> ${choice.text}</label>`;
        });

        // Affichage de la question et des choix possibles
        questionContainer.innerHTML = `
            <p>${questionData.question}</p>
            <form>${choices.join("<br>")}</form>
        `;

        // Écoute des changements de sélection de réponse
        const answerInputs = document.querySelectorAll('input[name="reponse"]');
        answerInputs.forEach(input => {
            input.addEventListener("change", submitAnswer);
        });
    } else {
        // Toutes les questions ont été répondues, affiche les résultats
        showResults();
    }
}

// Fonction pour soumettre une réponse
function submitAnswer() {
    const selectedChoice = document.querySelector('input[name="reponse"]:checked');
    if (selectedChoice) {
        const userAnswer = selectedChoice.value;
        const correctAnswer = questions[currentQuestion].choices.find(choice => choice.correct);
        if (userAnswer === correctAnswer.text) {
            score++; // Réponse correcte, ajoute 1 point au score
            correctAnswers.push({ question: questions[currentQuestion].question, explanation: questions[currentQuestion].explanation });
        } else {
            incorrectAnswers.push({ question: questions[currentQuestion].question, userAnswer, correctAnswer: correctAnswer.text, explanation: questions[currentQuestion].explanation });
        }
        currentQuestion++;
        showQuestion();
    }
}

// Fonction pour afficher les résultats du quiz
function showResults() {
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = `
        <h2>Résultats</h2>
        <p>Score : ${score} / ${questions.length}</p>
    `;

    if (incorrectAnswers.length > 0) {
        resultContainer.innerHTML += "<p>Réponses incorrectes : </p>";
        incorrectAnswers.forEach((incorrect, index) => {
            resultContainer.innerHTML += `
                <p>${index + 1}. ${incorrect.question}</p>
                <p>Votre réponse : ${incorrect.userAnswer}</p>
                <p>Réponse correcte : ${incorrect.correctAnswer}</p>
                <p>Explication : ${incorrect.explanation}</p>
            `;
        });
    }

    if (score === questions.length) {
        resultContainer.innerHTML += "<p>Félicitations ! Vous avez obtenu un score parfait !</p>";
    } else {
        resultContainer.innerHTML += `
            <p>Vous pouvez recommencer le quiz en cliquant sur le bouton ci-dessous :</p>
            <button onclick="restartQuiz()">Recommencer</button>
        `;
    }

    resultContainer.style.display = "block";
}

// Fonction pour recommencer le quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    correctAnswers = [];
    resultContainer.style.display = "none";
    showQuestion();
}

// Affiche la première question au chargement de la page
showQuestion();