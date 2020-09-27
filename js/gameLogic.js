function get_points_list() {
    // corresponding number of points is the first element of each list
    let points = [
        [1, "E", "A", "I", "O", "N", "R", "T", "L", "S", "U"],
        [2, "D", "G"],
        [3, "B", "C", "M", "P"],
        [4, "F", "H", "V", "W", "Y"],
        [5, "K"],
        [8, "J", "X"],
        [10, "Q", "Z"]
    ];

    return points;
}

// This function counts the number of times a correctly guessed letter appears in word
function count_letter(letter) {
    let letters = document.getElementsByClassName(letter);
    return Math.floor(letters.length / 2);
}

// This function should be called only when user guesses the correct letter
function correct_guess(user_guess) {
    let current_score = document.getElementById("score");
    let points = get_points_list();

    for (let i = 0; i < points.length; i++) {
        if (points[i].includes(user_guess)) {
            let count = count_letter(user_guess);
            score_tracker += points[i][0] * count;
            total_correct += count;
            current_score.innerHTML = "SCORE: " + score_tracker;
            break;
        }
    }

    if (total_correct == word.length) {
        // WIN FUNCTION --> SAVE TO LEADERBOARD
        document.getElementById("win_score").innerHTML += score_tracker
        score_form("win_screen");
    }
}

// This function should be called only when user guesses the wrong letter
function wrong_guess() {
    let current_lives = document.getElementById("lives");
    num_of_lives -= 1;
    current_lives.innerHTML = "LIVES: " + num_of_lives;
    if (num_of_lives == 0) {
        // GAME OVER FUNCTION
        document.getElementById("lose_score").innerHTML += score_tracker
        document.getElementById("lose_screen").style.display = "block";
        score_form("lose_screen");
    }
}


function reset_score() {
    let current_score = document.getElementById("score");
    current_score.innerHTML = "SCORE: 0";
    score_tracker = 0;
}


function reset_lives() {
    let current_lives = document.getElementById("lives");
    current_lives.innerHTML = "LIVES: 7";
    num_of_lives = 7;
}


function reset_buttons() {
    let current_buttons = document.getElementById("buttons");
    current_buttons.innerHTML = "";
    make_buttons();  // from buttons_logic.js
}


function clear_word_and_def() {
    let current_word = document.getElementById("word");
    let current_def = document.getElementById("definition");

    // Clear the current words and definition
    current_word.innerHTML = "";
    current_def.innerHTML = "";
}


function generate_word_and_def() {
    // From generateWord.js, choose random word and its definition
    choice = Math.floor(Math.random() * 12);
    word = chooseWord(choice);
    definition = chooseDefinition(choice);
    placeHiddenWord();
    displayDefinition();
}

// This function is called after clicking the "reset" button
function reset_game() {
    reset_score();
    reset_lives();
    reset_buttons();
    clear_word_and_def();
    generate_word_and_def();
    total_correct = 0;

    document.getElementById("lose_screen").style.display = "none";
    document.getElementById("leader_board").style.display = "none";
}


// Leader Board
function score_form(div) {
    document.getElementById(div).style.display = "block";
    let score_form = document.createElement("form");
    score_form.setAttribute("method", "post");
    score_form.setAttribute("action", "javascript:add_score()");
    score_form.setAttribute("id", "form")

    let submit_name = document.createElement("input");
    submit_name.setAttribute("type", "text");
    submit_name.setAttribute("name", "Name");
    submit_name.setAttribute("placeholder", "Enter Name");
    submit_name.setAttribute("id", "submit_name");

    let submit_button = document.createElement("input");
    submit_button.setAttribute('type', "submit");
    submit_button.setAttribute('value', "Submit");
    submit_button.setAttribute("id", "submit_button");

    score_form.appendChild(submit_name);
    score_form.appendChild(submit_button);

    document.getElementById(div).appendChild(score_form);
}

function add_score() {
    let form = document.getElementById("form");
    let name = form.elements[0].value;

    high_score = { name: name, score: score_tracker };
    firebase.database().ref('/result').push(high_score);
    display_leaderboard();
}

function display_leaderboard() {
    document.getElementById("leader_board").style.display = "block";
    document.getElementById("win_screen").style.display = "none";
    document.getElementById("lose_screen").style.display = "none";
    let dbref = firebase.database().ref("result/");
    dbref.once("value", function (snapshot) {
        let list = snapshot.val();
        let user_names = Object.keys(list);
        let score = [];
        let score_ordered = [];
        let user_names_ordered = [];
        let user_len = user_names.length;

        for (let i = 0; i < user_len; i++) {
            score.push(parseInt(list[user_names[i]].score));
        }
        if (user_len > 15) {
            user_len = 15;
        }

        for (let i = 0; i < user_len; i++) {
            let max_value_index = score.indexOf(Math.max.apply(null, score));
            score_ordered.push(score[max_value_index]);
            user_names_ordered.push(user_names[max_value_index]);

            score.splice(max_value_index, 1);
            user_names.splice(max_value_index, 1);
        }
        // Create "Play Again" button at the top
        create_play_again_button();
        for (let i = 0; i < score_ordered.length; i++) {
            let user_name_and_score = document.createElement("p");
            user_name_and_score.style.fontSize = "2rem";
            user_name_and_score.innerHTML = list[user_names_ordered[i]].name + ": " + score_ordered[i];
            document.getElementById("leader_board").appendChild(user_name_and_score);
        }

        // Create "Play Again" button at the bottom
        // create_play_again_button();

        // Create whitespace for bottom
        create_whitespace();
    });

}

function create_play_again_button(){
    // Create "Play Again" button
    let play_again_btn = document.createElement("button");
    play_again_btn.id = "play_again_button";
    play_again_btn.innerHTML = "Play Again";
    play_again_btn.onclick = function (){
        window.location = "index.html";
    }
    document.getElementById("leader_board").appendChild(play_again_btn);
}

function create_whitespace(){
    let whitespace = document.createElement("p");
        whitespace.innerHTML = "(This is whitespace. It is not suppsoed to be seen)";
        whitespace.style.fontSize = "2rem";
        whitespace.style.visibility = "hidden";
        document.getElementById("leader_board").appendChild(whitespace);
}

let choice = Math.floor(Math.random() * 12);
let word = chooseWord(choice);
let definition = chooseDefinition(choice);
document.getElementById("leader_board").style.height = window.innerHeight;
placeHiddenWord();
displayDefinition();
let r_btn = document.getElementById("restart_button");
r_btn.onclick = reset_game;
let score_tracker = 0;
let num_of_lives = 7;
let total_correct = 0;

