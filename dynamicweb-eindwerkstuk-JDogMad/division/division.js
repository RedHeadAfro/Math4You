//DIVISION

// enkele variablenen initializeren
let score = 0;
let highscore = localStorage.getItem('highscore_div');
let plays = 10;
let dummyAnswer1, dummyAnswer2
let answer, opt1, opt2, opt3, num1, num2;
let arr = [];



// START PAGE
// on window reload, omdat de button anders te veel tijd nam en deze moest telkens gebeuren
// wanneer men de page refreshed en dus voor alle andere functies
window.onload = function toggleStartPage() {
    // dit toont de startpagina bij het refreshen en 
    // nadat men op start drukt verdwijnt het ook
    let startpage = document.getElementById('start_page');
    let gamepage = document.getElementById('game_page');

    function showPage() {
        startpage.style.display = "block";
        gamepage.style.display = "none";
    }

    function hidePage() {
        document.getElementById('start').addEventListener('click', function () {
            console.log("button works");
            startpage.style.display = "none";
            gamepage.style.display = "block";
        });
    }

    showPage();
    hidePage();
}

// MAIN PAGE
// Deze kleine functie is gwn om de score te resetten als het onder de gaat
// Eens de speler meer fouten heeft dan het aantal spelen wordt het naar 0 gereset
function resetScore() {
    score = 0;
}

// Randomizer --> geeft een random getal tussen twee gekozen getallen. 
function randomizer(min, max) {
    return Math.ceil(Math.random() * (max - min + 1) + min);
}

// getCalculating --> doet de bewerking en returnd de antwoord
function getCalculating(int1, int2) {
    while (int1 % int2 == 0) {
        return int1 / int2;
    }

    num1 = randomizer(0, 10) + 1;
    num2 = randomizer(0, 10) + 1;
    return getCalculating(num1, num2);
}

// generateEquation --> maakt twee getallen dmv de randomizer, haalt het antwoord van 
// de functie getCalculating en zet ze in de html pagina. 
function generateEquation() {
    num1 = randomizer(0, 10);
    num2 = randomizer(1, 10);
    answer = getCalculating(num1, num2)

    document.getElementById("num1").innerHTML = num1;
    document.getElementById("num2").innerHTML = num2;
    document.getElementById("answer").innerHTML = answer;

    // Als de continue in de localstorage gelijk staat aan true 
    // dan wordt de num1 en num2 hun max waarde verhoogt 
    // belangrijk op te merken is dat ik hier een stricte vergelijking maakt 
    // omdat men in localstorages geen booleans kan opslaan
    if (localStorage.getItem('continue_div') === 'true') {
        num1 = randomizer(0, 20);
        num2 = randomizer(1, 20);

        answer = getCalculating(num1, num2);

        document.getElementById("num1").innerHTML = num1;
        document.getElementById("num2").innerHTML = num2;
        document.getElementById("answer").innerHTML = answer;
    }
}

// setDummyAnswers --> maakt twee dummy variabelen aan. 
// Daarna een array met 3 mogelijke antwoorden, met de for-loop kan je het randomizen 
// nadien zetten we de waarden terug naar html.
function setDummyAnswers() {
    dummyAnswer1 = randomizer(0, 20);
    dummyAnswer2 = randomizer(0, 20);

    arr = [dummyAnswer1, dummyAnswer2, answer];
    for (let i = 0; i < arr.length; i++) {
        arr.sort(() => Math.random() - 0.5);
    }

    document.getElementById("opt1").innerHTML = arr[0];
    document.getElementById("opt2").innerHTML = arr[1];
    document.getElementById("opt3").innerHTML = arr[2];
}

// checkForGoodAnswer --> checkt op basis van een click of het de juiste antwoord is 
// Als het goed is dan wordt er een nieuwe bewerking getoond 
// Als het fout is dan toont men een text en een afbeelding en wordt de score vermindert
function checkForGoodAnswer() {
    // OPTIE 1
    document.getElementById("opt1").addEventListener("click", function () {
        if (document.getElementById("opt1").innerHTML == answer) {
            // test purposes
            console.log("gud");

            score++;

            document.getElementById('wrong_answer').style.display = "none";
            document.getElementById('wrong_answer_text').style.display = "none";

            generateEquation();
            setDummyAnswers();
            keepPlays();
        } else {
            // test purposes
            console.log("wrong");

            document.getElementById('wrong_answer').style.display = "block";
            document.getElementById('wrong_answer_text').style.display = "block";

            score--;
        }
    });

    // OPTIE 2
    document.getElementById("opt2").addEventListener("click", function () {
        if (document.getElementById("opt2").innerHTML == answer) {
            // test purposes
            console.log("gud");

            score++;

            document.getElementById('wrong_answer').style.display = "none";
            document.getElementById('wrong_answer_text').style.display = "none";

            generateEquation();
            setDummyAnswers();
            keepPlays();
        } else {
            // test purposes
            console.log("wrong");

            document.getElementById('wrong_answer').style.display = "block";
            document.getElementById('wrong_answer_text').style.display = "block";

            score--;
        }
    });

    // OPTIE 3
    document.getElementById("opt3").addEventListener("click", function () {
        if (document.getElementById("opt3").innerHTML == answer) {
            // test purposes
            console.log("gud");

            score++;

            document.getElementById('wrong_answer').style.display = "none";
            document.getElementById('wrong_answer_text').style.display = "none";

            generateEquation();
            setDummyAnswers();
            keepPlays();
        } else {
            // test purposes
            console.log("wrong");

            document.getElementById('wrong_answer').style.display = "block";
            document.getElementById('wrong_answer_text').style.display = "block";

            score--;
        }
    });
}

// keepPlays --> telt af, en eindigt het spel. 
function keepPlays() {
    plays--;

    // Als de score onder de nul komt dan wordt de functie resetScore opgeroept
    if (score < 0) resetScore();

    // Als de plays gelijk is aan 0, dan wordt het spel gestopt 
    if (plays == 0) {
        // score wordt toegevoegd aan de localStorage
        localStorage.setItem('score_div', score);

        // test purposes
        console.log("Game has ended");
        console.log(score);

        // Als de score hoger is dan de opgeslagen score in de localstorage dan wordt het verandert
        // ander niet 
        if (score > highscore) highscore = score;
        localStorage.setItem('highscore_div', highscore);

        // Als men op de continue button drukt dan slaan we in de localstorage de waarde true in
        // zodat eigenlijk de niveau hoger gaat
        document.getElementById('continue').addEventListener('click', function () {
            localStorage.setItem('continue_div', true);
        });

        // Hier wordt de functie showExtraMessage opgeroepn
        showExtraMessage();
        // Hier wordt de functie stopTheGame opgeroepen
        stopTheGame();
    }
}


// Dit dient eerder als een extra, feedback van mijn jongste zus was dat bij het afbeelden 
// van de score er een tekst moeest afgebeeld worden.
// Gemakkelijkste manier was door middel van een switch-case
function showExtraMessage() {
    switch (score) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            document.getElementById('extra_info').innerHTML = "Try again";
            break;
        case 5:
            document.getElementById('extra_info').innerHTML = "You somehow did it!";
            break;
        case 6:
        case 7:
        case 8:
            document.getElementById('extra_info').innerHTML = "Good job";
            break;
        case 9:
            document.getElementById('extra_info').innerHTML = "You were so close!";
            break;
        case 10:
            document.getElementById('extra_info').innerHTML = "You are a smart Cookie";
            break;
        default:
            document.getElementById('extra_info').innerHTML = "Sorry, there must be an error"
            break;
    }
}

// END PAGE (GAME OVER)
//Stopt de game en toont een soort game over pagina 
//toont de score als de highscore en dan 
// geeft het men 3 keuzes; continue, replay en exit
function stopTheGame() {
    let endpage = document.getElementById('end_page');
    let gamepage = document.getElementById('game_page');
    let endscore = document.getElementById('end_score');
    let high_score = document.getElementById('high_score');

    function showEndPage() {
        endpage.style.display = "block";
        gamepage.style.display = "none";
    }

    function hideEndPage() {
        document.getElementById('start').addEventListener('click', function () {
            // test purposes
            console.log("button works");

            endpage.style.display = "none";
            gamepage.style.display = "none";
        });
    }

    endscore.innerHTML = score;
    high_score.innerHTML = highscore;
    showEndPage();
    hideEndPage();

    // Hier zetten we de continue button gelijk aan false 
    // zodat bij eerste aanmelding de game gemakkelijk is en ook telkens als men klaar is 
    // het weer op false staat 
    localStorage.setItem('continue_div', false)
}


// Algemene functies die vooral nodig zijn bij het eerst openen van het spel
generateEquation();
setDummyAnswers();
checkForGoodAnswer();