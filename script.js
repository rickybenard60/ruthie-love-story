/* =========================================================
   RUTHIE LOVE STORY
   CLEAN MASTER JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const screens = document.querySelectorAll(".screen");
const nextButtons = document.querySelectorAll(".next-screen");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const choiceButtons = document.querySelectorAll(".choice-btn");
const answerMessage = document.getElementById("answerMessage");
const finalNextButton = document.querySelector(".final-next");

const replayButton = document.getElementById("replayBtn");

const interactiveNotes =
    document.querySelectorAll(".interactive-note");


/* =========================================================
   STORY STATE
========================================================= */

let currentScreen = 1;

const totalScreens = screens.length;


/* =========================================================
   SHOW SCREEN
========================================================= */

function showScreen(screenNumber) {

    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    const target =
        document.getElementById(`screen-${screenNumber}`);

    if (!target) {
        console.error(
            `Screen ${screenNumber} haipo.`
        );
        return;
    }

    target.classList.add("active");

    currentScreen = screenNumber;

    updateProgress();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress() {

    const percentage =
        (currentScreen / totalScreens) * 100;

    if (progressBar) {
        progressBar.style.width =
            `${percentage}%`;
    }

    if (progressText) {

        const current =
            String(currentScreen).padStart(2, "0");

        const total =
            String(totalScreens).padStart(2, "0");

        progressText.textContent =
            `${current} / ${total}`;
    }
}


/* =========================================================
   NEXT SCREEN BUTTONS
========================================================= */

nextButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const nextScreenId =
            button.dataset.next;

        if (!nextScreenId) {
            console.warn(
                "Button haina data-next:",
                button
            );
            return;
        }

        const nextNumber =
            Number(
                nextScreenId.replace(
                    "screen-",
                    ""
                )
            );

        if (!Number.isNaN(nextNumber)) {
            showScreen(nextNumber);
        }

    });

});


/* =========================================================
   SCREEN 4 — INTERACTIVE NOTES
========================================================= */

interactiveNotes.forEach((note) => {

    note.addEventListener("click", () => {

        const wasOpen =
            note.classList.contains("open");

        interactiveNotes.forEach((otherNote) => {
            otherNote.classList.remove("open");
        });

        if (!wasOpen) {
            note.classList.add("open");
        }

    });

});


/* =========================================================
   SCREEN 6 — SMILE QUESTION
========================================================= */

choiceButtons.forEach((button) => {

    button.addEventListener("click", () => {

        choiceButtons.forEach((item) => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        const answer =
            button.dataset.answer;

        let message = "";

        switch (answer) {

            case "yes":

                message =
                    "😂 Kidogo tu? Sawa... nitakubali hiyo answer.";

                break;

            case "more":

                message =
                    "❤️ Basi mission yangu ndogo ya leo imefanikiwa.";

                break;

            case "lying":

                message =
                    "🙈 Hii answer nimeitarajia kabisa kutoka kwako.";

                break;

            default:

                message =
                    "😌 Nadhani nimepata jibu langu.";
        }

        if (answerMessage) {
            answerMessage.textContent = message;
        }

        if (finalNextButton) {
            finalNextButton.disabled = false;
        }

    });

});


/* =========================================================
   SECOND READ MODE
========================================================= */

function applySecondRead() {

    /* -----------------------------------------
       SCREEN 1
    ----------------------------------------- */

    const heroTitle =
        document.querySelector("#screen-1 h1");

    const heroLead =
        document.querySelector("#screen-1 .lead");

    const heroButton =
        document.querySelector(
            "#screen-1 .next-screen"
        );

    const tinyNote =
        document.querySelector(
            "#screen-1 .tiny-note"
        );


    if (heroTitle) {

        heroTitle.innerHTML = `
            You came
            <span>back, Ruthie.</span>
        `;
    }


    if (heroLead) {

        heroLead.innerHTML = `
            Nilijua huenda usingemaliza
            hapa mara moja...
            <br><br>
            Labda kuna sentence uliipenda.
            Labda ulitabasamu.
            Au labda ulikuwa curious tu. 😌
        `;
    }


    if (heroButton) {
        heroButton.textContent =
            "Soma tena ❤️";
    }


    if (tinyNote) {

        tinyNote.textContent =
            "This time, read a little slower.";
    }


    /* -----------------------------------------
       SCREEN 2
    ----------------------------------------- */

    const screen2Message =
        document.querySelector(
            "#screen-2 .message-box"
        );

    if (screen2Message) {

        screen2Message.innerHTML = `

            <p>
                Kuna watu tunakutana nao,
                tunaishi nao kwenye kipindi fulani
                cha maisha,
                halafu maisha yanaendelea.
            </p>

            <p>
                Lakini kuna baadhi ya watu
                ambao wakishawahi kuwa muhimu,
                kumbukumbu zao haziondoki
                kwa sababu tu muda umepita.
            </p>

            <p class="emphasis">
                Na, Ruthie...
                labda safari hii umeelewa
                kwa nini niliandika hivi. ❤️
            </p>

        `;
    }


    /* -----------------------------------------
       SCREEN 3
    ----------------------------------------- */

    const screen3Intro =
        document.querySelector(
            "#screen-3 .fun-intro"
        );

    const screen3Emphasis =
        document.querySelector(
            "#screen-3 .emphasis"
        );


    if (screen3Intro) {

        screen3Intro.textContent =
            "Okay... mara hii sitajifanya serious kabisa. 😂";
    }


    if (screen3Emphasis) {

        screen3Emphasis.textContent =
            "Very unfair, Ruthie. Bado. 😂❤️";
    }


    /* -----------------------------------------
       SCREEN 5
    ----------------------------------------- */

    const letterHighlight =
        document.querySelector(
            "#screen-5 .letter-highlight"
        );


    if (letterHighlight) {

        letterHighlight.textContent =
            "Na pengine, ukisoma mara ya pili, utaona kwamba nilimaanisha zaidi ya nilivyoandika. ❤️";
    }

}


/* =========================================================
   REPLAY
========================================================= */

if (replayButton) {

    replayButton.addEventListener("click", () => {

        localStorage.setItem(
            "ruthieReplay",
            "true"
        );

        applySecondRead();

        showScreen(1);

    });

}


/* =========================================================
   REMEMBER VISIT
========================================================= */

function handleVisit() {

    const visited =
        localStorage.getItem("ruthieVisited");

    if (visited === "true") {

        applySecondRead();

    } else {

        localStorage.setItem(
            "ruthieVisited",
            "true"
        );

    }

}


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowRight" &&
            currentScreen < totalScreens
        ) {

            showScreen(
                currentScreen + 1
            );
        }


        if (
            event.key === "ArrowLeft" &&
            currentScreen > 1
        ) {

            showScreen(
                currentScreen - 1
            );
        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

handleVisit();

updateProgress();

showScreen(1);