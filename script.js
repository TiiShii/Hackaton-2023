// Définition des questions, des réponses, et des explications
const questions = [{
    question: "Que signifie 天菜 — <i>tiān cài</i> — (légume du ciel)?",
    choices: [{
        text: "Etoile brillante",
        correct: false
    },
    {
        text: "C'est mon type d'homme/de femme",
        correct: true
    },
    {
        text: "C'est un plat chinois",
        correct: false
    },
    ],
    explanation: "C'est un terme populaire sur internet qui est généralement utilisé pour mettre l'accent sur le fait qu'une personne est extrêmement attirante",
},
{
    question: "Que signifie 芭比Q了 — <i>bā bǐ Q le</i> — (BBQ)?",
    choices: [{
        text: "C'est 'mort'",
        correct: true
    },
    {
        text: "Coucher de soleil",
        correct: false
    },
    {
        text: "C'est une fête en plein air",
        correct: false
    },
    ],
    explanation: "Il est utilisé pour exprimer des sentiments tels que 'c'est fini', 'c'est foutu' ou 'c'est la catastrophe.'",
},

{
    question: "Que signifie 自肥 — <i>zì féi</i> — (s'engraisser)?",
    choices: [{
        text: "Améliorer ses compétences artistiques",
        correct: false
    },
    {
        text: "Chercher à s'enrichir personnellement",
        correct: true
    },
    {
        text: "Se lancer dans une carrière personnelle",
        correct: false
    },
    ],
    explanation: "Ce terme avait initialement une connotation négative, se référant à l'action de chercher à s'enrichir personnellement en utilisant des ressources ou des opportunités pour des gains personnels.",
},

{
    question: "Que signifie 吃瓜群眾 — <i>chī guā qún zhòng</i> — (le groupe de personnes qui mangent des concombres)?",
    choices: [{
        text: "C'est un groupe de personnes qui surveillent les potins en ligne",
        correct: true
    },
    {
        text: "C'est un groupe de personnes qui explorent des endroits mystérieux",
        correct: false
    },
    {
        text: "C'est un groupe de personnes qui cultivent des légumes rares",
        correct: false
    },
    ],
    explanation: "Ce terme décrit l'acte de se rassembler sur Internet pour observer ou écouter des potins, en particulier concernant des événements sensationnels ou des potins populaires. C'est une expression courante utilisée pour décrire la participation à la surveillance de potins ou de drames en ligne, souvent avec un ton humoristique.",
},
];

// Initialisation des variables pour suivre l'état du quiz
let currentQuestion = 0; // Index de la question en cours
let score = 0; // Score du joueur
let incorrectAnswers = []; // Tableau pour stocker les réponses incorrectes
let correctAnswers = []; // Tableau pour stocker les bonnes réponses
let showExplanations = true;


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

// Fonction pour afficher les résultats du quiz
function showResults() {
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = "";

    // Vérifie si l'utilisateur n'a pas obtenu un score parfait
    if (score !== questions.length) {
        // Affiche un message en haut pour indiquer que toutes les réponses ne sont pas correctes
        resultContainer.innerHTML += "<h2>Dommage, tu n'as pas tout répondu correctement...</h2>";

        if (incorrectAnswers.length > 0) {
            // Affiche les questions avec réponses incorrectes et explications
            incorrectAnswers.forEach((incorrect, index) => {
                const questionIndex = index + 1;
                const explanationId = `explanation-${questionIndex}`;
                resultContainer.innerHTML += `
                <p>${questionIndex}. ${incorrect.question}</p>
                <button onclick="toggleExplanations(document.getElementById('${explanationId}'))">Révéler les réponses</button>
                <div id="${explanationId}" class="explanation" style="display: none">
                    <p>Votre réponse : ${incorrect.userAnswer}</p>
                    <p>Réponse correcte : ${incorrect.correctAnswer}</p>
                    <p>Explication : ${incorrect.explanation}</p>
                </div>
            `;
            });
        }

        // Bouton pour recommencer le quiz
        resultContainer.innerHTML += `
        <button onclick="restartQuiz()">Recommencer</button>
    `;
    } else {
        // Si l'utilisateur a obtenu un score parfait
        resultContainer.innerHTML += "<h2>Super! Tu as obtenu le score max! !</h2>";

        // Bouton pour retourner au menu
        resultContainer.innerHTML += `
        <button onclick="returnToMenu()">Retourner au Menu</button>
    `;

    }

    resultContainer.style.display = "block";
}



// Fonction pour afficher/masquer les explications
function toggleExplanations(explanationElement) {
    if (explanationElement.style.display === "none") {
        explanationElement.style.display = "block";
    } else {
        explanationElement.style.display = "none";
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

            // Crée un élément d'explication avec un ID unique pour chaque explication
            const explanationId = `explanation-${currentQuestion}`;
            const explanation = document.createElement("div");
            explanation.id = explanationId;
            explanation.classList.add("explanation");
            explanation.style.display = "none"; // L'explication est initialement masquée
            explanation.innerHTML = `Explication : ${questions[currentQuestion].explanation}`;
            resultContainer.appendChild(explanation);

            // Crée un bouton pour afficher/masquer l'explication
            const toggleButton = document.createElement("button");
            toggleButton.textContent = "Afficher Explication";
            toggleButton.addEventListener("click", () => {
                toggleExplanations(document.getElementById(explanationId));
            });
            resultContainer.appendChild(toggleButton);
        } else {
            incorrectAnswers.push({
                question: questions[currentQuestion].question,
                userAnswer,
                correctAnswer: correctAnswer.text,
                explanation: questions[currentQuestion].explanation
            });
        }

        currentQuestion++;
        showQuestion();

        // Met à jour le contenu de la page pour afficher le score actuel
        resultContainer.innerHTML += `<p>Score : ${score} / ${questions.length}</p>`;
    }
}


// Fonction pour recommencer le quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    correctAnswers = [];
    resultContainer.style.display = "none";

    const explanations = document.querySelectorAll(".explanation");
    explanations.forEach(explanation => {
        explanation.remove();
    });

    showQuestion();
}

// Affiche la première question au chargement de la page
showQuestion();