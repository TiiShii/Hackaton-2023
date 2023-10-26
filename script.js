/**
 * Tableau d'objets avec les questions et leur bonne réponse
 **/
const questions = [
    {
        question: "Que signifie 天菜 — <i>tiān cài</i> — (légume du ciel)?",
        choix: [
            { text: "Etoile brillante", correct: false },
            { text: "C'est mon type d'homme/de femme", correct: true },
            { text: "C'est un plat chinois", correct: false },
        ]
    },
    {
        question: "Que signifie 芭比Q了 — <i>bā bǐ Q le</i> — (BBQ)?",
        choix: [
            { text: "C'est mort", correct: true },
            { text: "Coucher de solei", correct: false },
            { text: "C'est une fête en plein air", correct: false },
        ]
    },
    {
        question: "Que signifie 自肥 — <i>zì féi</i> — (s'engraisser)?",
        choix: [
            { text: "Améliorer ses compétences artistiques", correct: false },
            { text: "Chercher à s'enrichir personnellement", correct: true },
            { text: "Se lancer dans une carrière personnelle", correct: false },
        ]
    },
    {
        question: "Que signifie 吃瓜群眾 — <i>chī guā qún zhòng</i> — (le groupe de personnes qui mangent des concombres)?",
        choix: [
            { text: "C'est un groupe de personnes qui surveillent les potins en ligne", correct: true },
            { text: "C'est un groupe de personnes qui explorent des endroits mystérieux", correct: false },
            { text: "C'est un groupe de personnes qui cultivent des légumes rares", correct: false },
        ],
        explication: "Ce terme décrit l'acte de se rassembler sur Internet pour observer ou écouter des potins, en particulier concernant des événements sensationnels ou des potins populaires. C'est une expression courante utilisée pour décrire la participation à la surveillance de potins ou de drames en ligne, souvent avec un ton humoristique.",
    },
];

const reponsesDeUtilisateur = [];
let qstDuMoment = 1;

function qstSuivante(questionId) {
    // chopper la réponse de l'utilisateur depuis l'input
    const repUser = document.querySelector(`input[name="reponse"]:checked`).value;
    let qstDuMomentData = questions[qstDuMoment - 1];

    // push réponse de l'utilisateur au tableau
    reponsesDeUtilisateur.push(repUser);

    // màj de la réponse de l'utilisateur dans la liste des résultats
    document.getElementById(`rep${qstDuMoment}`).textContent = repUser;

    // cache la rep pour passer à la suivante
    document.getElementById(`qst${qstDuMoment}`).style.display = "none";
    qstDuMoment++;

    if (qstDuMoment <= questions.length) {
        // Affichez la question suivante
        qstDuMomentData = questions[qstDuMoment - 1];
        document.getElementById(`qst${qstDuMoment}`).style.display = "block";
    } else {
        // Toutes les questions ont été répondues, affichez les résultats
        montrerLeScore();
    }
}

let score = 0;

// quand l'utilisateur rep à la derniere qst j'affiche les résultats
function montrerLeScore() {
    document.getElementById("qst1").style.display = "none";
    document.getElementById("qst2").style.display = "none";
    document.getElementById("qst3").style.display = "none";
    document.getElementById("qst4").style.display = "none";

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (reponsesDeUtilisateur[i] === questions[i].choix.find(choix => choix.correct).text) {
            score++; // Incrémente le score si la réponse de l'utilisateur est correcte
        }
    }

    // Affiche le score total à l'utilisateur
    document.getElementById("score").textContent = score;

    // Affiche la liste des questions, les réponses de l'utilisateur et les réponses correctes
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const reponseUtilisateur = reponsesDeUtilisateur[i];
        const reponseCorrecte = question.choix.find(choix => choix.correct).text;
        const questionContainer = document.getElementById(`qst${i + 1}`);

        // Met en forme et affiche les informations de la question
        questionContainer.innerHTML += `
        <p><strong>Question ${i + 1}:</strong> ${question.question}</p>
        <p><strong>Réponse de l'utilisateur:</strong> ${reponseUtilisateur}</p>
        <p><strong>Réponse correcte:</strong> ${reponseCorrecte}</p>
        <p><strong>D'où vient cette expression?</strong> ${question.explication}</p>
        `;
    }

    document.getElementById("resultat-container").style.display = "block";
}
