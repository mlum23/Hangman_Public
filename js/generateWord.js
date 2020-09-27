// create list of 10 words to choose
function chooseWord(choice){
    let words = [
        'COMMITTEE',
        'PREVAIL',
        'MILITIATE',
        'EXIGUOUS',
        'SUPINATION',
        'GUERDON',
        'FULIGINOUS',
        'DELAMINATE',
        'TERRACEOUS',
        'CALENTURE',
        'ELECTRICITY',
        'TATTOO'
    ]
    return words[choice];
}

// create list of 10 definitions
function chooseDefinition(choice){
    let definitions = [
        'a group of people appointed for a specific function, typically consisting of members of a larger group.',
        'prove more powerful than opposing forces; be victorious.',
        'to carry on or prepare for war.',
        'very small in size or amount.',
        'rotation of the forearm and hand so that the palm faces forward or upward.',
        'a reward or recompense.',
        'sooty; dusky.',
        'to split into layers.',
        'earthen.',
        'tropical fever due to heat exposure.',
        'is the set of physical phenomena associated with the presence and motion of electric charge.',
        'a form of body modification where a design is made by inserting ink.'
    ]
    return definitions[choice];
}

// place number of dashes according to word length
function placeHiddenWord(){
    for (i=0; i<word.length; i++){
        let letter = document.createElement("span");
        document.getElementById("word").appendChild(letter);
        letter.innerHTML = word[i];
        letter.className = word[i];
        letter.style.display = "none";
        let dash = document.createElement("span");
        document.getElementById("word").appendChild(dash);
        dash.innerHTML = "_";
        dash.className = word[i];
    }
}

// display definition below the hidden word
function displayDefinition(){
    let def = document.getElementById("definition");
    def.innerHTML = definition;
}

// display specific letter of hidden word
function displayLetter(letter){
    list = document.getElementsByClassName(letter);
    for(i=0; i<list.length; i+=2){
        list[i].style.display = "inline-block";
        list[i+1].style.display = "none";
    };
}

// choose random word
// let choice = Math.floor(Math.random()*10);
// let word = chooseWord(choice);
// let definition = chooseDefinition(choice);

// place word/def into html body
// placeHiddenWord();
// displayDefinition();
// displayLetter('a');
// displayLetter('e');
// displayLetter('i');
// displayLetter('o');
// displayLetter('u');
// console.log(word);
// console.log(definition);
