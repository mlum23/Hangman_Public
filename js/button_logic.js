function make_buttons() {/*create list of alphabet*/
    let letter = [];

    for (let i = 0; i < 26; i++) {
        alpha = String.fromCharCode(65 + i);
        letter.push(alpha);
    }

    // document.write(letter);
    // document.write(letter[0]);

    // dynamically create buttons
    for (let i = 0; i < 26; i++) {
        let btn = document.createElement("BUTTON");
        btn.innerHTML = letter[i];
        btn.className = "button";
        // onclick to check if letter is in word
        btn.onclick = function () {
            btn.style.visibility= "hidden";
            if(word.includes(letter[i])){  // Checks if the word contains the letter
                displayLetter(btn.innerHTML);
                correct_guess(btn.innerHTML);
            }
            else{
                wrong_guess();
            }
        };
        /*this assigns the onclick function to each button*/
        let mybr = document.createElement("br");
        if (btn.innerHTML == "P") {
        document.getElementById("buttons").appendChild(mybr);
        }
        document.getElementById("buttons").appendChild(btn);
    }
}


function count(old_w, new_w){
    let counter = 0;
    for(let i = 0 ; i < old_w.length; i ++){
        if(old_w[i] == new_w[i]){
            counter += 1;
        }
    }
    return counter;
}



make_buttons();
