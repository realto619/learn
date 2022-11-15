const whole_note = `<img src="https://notation.netcentrx.net/learn/img/whole_note.svg" height="19" />`;
const debug = 1;
const footer = document.querySelector(".footer");
const set_question_number = document.querySelector('.qst_num');
const current_quiz_question = document.getElementById('current_quiz_question');
const newNote = document.getElementsByClassName("newNote");
const quiz_btn = document.getElementById('quiz');

const lastNote = document.getElementById("lastNote");
const quiz_questions_total = document.getElementById('quiz_questions_total');
const consoled = document.querySelector('.console');

if(!localStorage.getItem('quiz_questions_total')) {
  localStorage.setItem('quiz_questions_total', 2);
  console.log("1) localStorage.getItem('quiz_questions_total') = "+ localStorage.getItem('quiz_questions_total'));
}
if(localStorage.getItem('quiz_questions_total') && parseInt(localStorage.getItem('quiz_questions_total'))>0) {
  quiz_questions_total.value = localStorage.getItem('quiz_questions_total');
  console.log("2) localStorage.getItem('quiz_questions_total') = "+ localStorage.getItem('quiz_questions_total'));
}

const quiz_question_number = document.getElementById('quiz_question_number');
const quiz_questions_correct = document.getElementById('quiz_questions_correct');
const A = document.getElementById('A');
const B = document.getElementById('B');
const C = document.getElementById('C');
const D = document.getElementById('D');
const E = document.getElementById('E');
const F = document.getElementById('F');
const G = document.getElementById('G');
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

function getValues(desc) {
  consoled.innerHTML += `
  <br>${desc}: QQN = ${quiz_question_number.value} 
  <br>${desc}: QQC = ${quiz_questions_correct.value}
  <br>${desc}: CQQ = ${current_quiz_question.value}
  <br>${desc}: QQT = ${quiz_questions_total.value}
  <hr>`;
}


function setRWDwidth() {
  if(vw < 600) {
    let lrCols = (vw-320)/2;
    if(debug === 1) console.log('vw = '+vw+'\nvh = '+vh+'\nlrCols = '+lrCols);
    document.querySelector('section').setAttribute('style',`width: ${vw}px;border-radius:0`); 
    document.querySelector('.container').setAttribute('style',`grid-template-columns: ${lrCols}px 80px 240px ${lrCols}px`); 
  } else if(vw < 800) {
    document.querySelector('section').setAttribute('style',`width: ${vw}px;border-radius:0`); 
    document.querySelector('.container').setAttribute('style','grid-template-columns: 1fr 80px 240px 1fr'); 
  } else {
    document.querySelector('section').setAttribute('style','width: 600px'); 
    document.querySelector('.container').setAttribute('style','grid-template-columns: 1fr 80px 240px 1fr'); 
  }
}

function addLedger(val) {
  let ledger = noteLookup(val);
  document.querySelector(`.${ledger}_2`).classList.add("ledger");
  document
    .querySelector(`.${ledger}_2`)
    .setAttribute("title", `${ledger.toUpperCase()}`);
}

function addAllLedgers(val) {
  // only show ledgers for values between 2 sets of values
  // set 1: 36-44
  if (val >= 36 && val < 44) {
    // footer.innerHTML += `val = ${val}`;
    for (let i = 43; i >= val; i--) {
      // footer.innerHTML += `<br>i = ${i}`;
      // only use odd values
      if (i % 2 !== 0) {
        addLedger(i);
      }
    }
    // set 2: 55-71
  } else if (val > 54 && val < 72) {
    for (i = val; i > 54; i--) {
      if (i % 2 !== 0) {
        addLedger(i);
      }
    }
  }
}

function playNote(file){
  var audio = document.createElement('audio');
  // audio.src = '/_media/'+file+'.mp3';
  audio.src = 'https://js.netcentrx.net/_media/'+file.toUpperCase()+'.mp3';
  // console.log(audio.src);
  document.body.appendChild(audio);
  audio.play();
  
  audio.onended = function () {
    this.parentNode.removeChild(this);
  }
}

function addNote(val) {
  clearNotes();
  document.getElementById('user_input').innerHTML = '?';
  if(debug === 1) console.log(`noteLookup(${val})`);
  let note = noteLookup(val);
  footer.innerHTML += `<br>note = ${note}`;
  document.querySelector(`.${note}_2`).innerHTML = whole_note;
  if(debug === 1) console.log('note = ' + note);
  playNote(note);
  document
    .querySelector(`.${note}_2`)
    .setAttribute("title", `${note.toUpperCase()} (${val})`);
  addAllLedgers(val);

  lastNote.value = note.toUpperCase();
  updateQuiz();
  footer.innerHTML += `<span class="shadow"><br>Qcorrect=${quiz_questions_correct.value}<br>quiz_question_number=${quiz_question_number.value}<br>quiz_questions_total=${quiz_questions_total.value}<br></span>`;
  // footer.innerHTML += `<br>lastNote.value = ${document.getElementById('lastNote').value}`;
}

function clearNotes() {
  document.querySelectorAll(".note").forEach((item) => {
    //footer.innerHTML += `<br>item.innerText = ${item.innerText}`;
    item.innerText = "";
    item.classList.remove("ledger");
  });
}

function clearNote() {
  let id = document.getElementById("lastNote").value;
  footer.innerHTML += `<br>id = ${id}`;
  document.querySelector(`.${id}_2`).innerHTML = "";
}

function noteLookup(val) {
  let lookup = {
    71: "c8",
    70: "b7",
    69: "a7",
    68: "g7",
    67: "f7",
    66: "e7",
    65: "d7",
    64: "c7",
   /* oct7 = 64-71 */
    63: "b6",
    62: "a6",
    61: "g6",
    60: "f6",
    59: "e6",
    58: "d6",
    57: "c6",
   /* oct6 = 57-63 */
    56: "b5",
    55: "a5",
    54: "g5",
    53: "f5",
    52: "e5",
    51: "d5",
    50: "c5",
   /* oct5 = 50-56 */
    49: "b4",
    48: "a4",
    47: "g4",
    46: "f4",
    45: "e4",
    44: "d4",
    43: "c4",
    /* oct4 = 43-49 */
    42: "b3",
    41: "a3",
    40: "g3",
    39: "f3",
    38: "e3",
    37: "d3",
    36: "c3",
    /* oct3 = 36-42 */
    /*=====*/
    35: "b2",
    34: "a2",
    33: "g2",
    32: "f2",
    31: "e2",
    30: "d2",
    29: "c2",
    28: "b1",
    27: "a1",
    26: "g1",
    25: "f1",
    24: "e1",
    23: "d1",
    22: "c1",
    21: "b0",
    20: "a0",
    19: "g0",
    18: "f0",
    17: "e0",
    16: "d0",
    15: "c0",
    14: "b_1",
    13: "a_1",
    12: "g_1",
    11: "f_1",
    10: "e_1",
    9: "d_1",
    8: "c_1",
    7: "b_2",
    6: "a_2",
    5: "g_2",
    4: "f_2",
    3: "e_2",
    2: "d_2",
    1: "c_2"
  };
  let result = lookup[val];
  if(debug === 1) console.log("result = " + result);
  return result;
}


function showOctArr() {
  let octArr = [];
  let octArrOff = [];
  if (localStorage.getItem("oct3") === "on") {
    octArr.push(36, 37, 38, 39, 40, 41, 42);
  } else { 
    octArrOff.push(3);
  }
  if (localStorage.getItem("oct4") === "on") {
    octArr.push(43, 44, 45, 46, 47, 48, 49);
  } else { 
    octArrOff.push(4);
  }
  if (localStorage.getItem("oct5") === "on") {
    octArr.push(50, 51, 52, 53, 54, 55, 56);
  } else { 
    octArrOff.push(5);
  }
  if (localStorage.getItem("oct6") === "on") {
    octArr.push(57, 58, 59, 60, 61, 62, 63);
  } else { 
    octArrOff.push(6);
  }
  if (localStorage.getItem("oct7") === "on") {
    octArr.push(64, 65, 66, 67, 68, 69, 70, 71);
  } else { 
    octArrOff.push(7);
  }
  // in case none of the octaves are checked, set oct4 as the default;
  if(debug === 1) console.log('octArrOff = '+ octArrOff);
  if(debug === 1) console.log(getRandomDifferent(octArr, localStorage.getItem('last_rnd_num')));
  return getRandomDifferent(octArr, localStorage.getItem('last_rnd_num'));
}

function random_item(items) {
  let rnd = items[Math.floor(Math.random() * items.length)];
  if(rnd === undefined) { rnd = 36; }
  // result.innerHTML = rnd;
  return rnd;
}

function getRndInt(min, max) {
  // (max+1) below ensures that the max number is included as a selection
  let rndInt = Math.floor(Math.random() * (max + 1 - min) + min);
  footer.innerHTML += `rndInt = ${rndInt}`;
  return rndInt;
}


function getRandomDifferent(arr, last = 35) {
  if (arr.length === 0) {
    // alert("Please select an Octave range to test.");
    arr.push(43, 44, 45, 46, 47, 48, 49);
    oct4.checked = true;
    // return 36;
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    let num = 0;
    do {
      num = Math.floor(Math.random() * arr.length);
      if(debug === 1) console.log('arr = '+arr+ '\nnum = ' + num + '\nlast = ' + parseInt(last));
    } while (arr[num] === parseInt(last));
    localStorage.setItem('last_rnd_num', parseInt(arr[num]));
    return arr[num];
  }
}


function updateQuiz() {
  getValues('updateQuiz(top)');
  if(debug===1) console.log('updateQuiz()\nquiz_question_number.value = '+quiz_question_number.value + '\nquiz_questions_total.value = '+quiz_questions_total.value);
  if(quiz_question_number.value === quiz_questions_total.value) { 
    showQuizResults("updateQuiz()"); 
  }
  if(quiz_question_number.value > quiz_questions_total.value) {
    quiz_question_number.value = 1;
    set_question_number.innerText = 1 + '/' + quiz_questions_total.value;
  } else {
    ++quiz_question_number.value;
    set_question_number.innerText = quiz_question_number.value + '/' + quiz_questions_total.value;
  }
  if (quiz_question_number.value > 0 || quiz_question_number.value > 0) {
    quiz_btn.innerHTML = "Next <br>&#9834;";
  } else {
    quiz_btn.innerHTML = "Start<br>Quiz";
  }
  getValues('updateQuiz(end)');
}

function showQuizResults(trigger="default"){
  alert('Quiz Results: <whatever> \nTriggered By: '+trigger);
}

function storeQuizResults(results) {
  let quiz_num = 0;
  if(!localStorage.getItem('quiz_result_last')) {
    localStorage.setItem('quiz_result_1', `${results}|${showDate()}`);
    localStorage.setItem('quiz_result_last', ++quiz_num);
  } else {
    quiz_num = parseInt(localStorage.getItem('quiz_result_last'))+1;
    localStorage.setItem(`quiz_result_${quiz_num}`, `${results}|${showDate()}`);
    localStorage.setItem('quiz_result_last', quiz_num);
  }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date = new Date()) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('/');
}

function formatTime(date = new Date()) {
  return [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
  ].join(':');
}

function showDate() {
	return [formatDate(),formatTime()].join(' ');
}

function testInput(note2test,noteEntered) {
  getValues('testInput(top)');
  if (set_question_number.value > 0 || quiz_question_number.value > 0) {
      quiz_btn.innerHTML = "Next <br>&#9834;";
  } else {
    quiz_btn.innerHTML = "Start<br>Quiz";
  }
  let noteCorrect = 0, octaveCorrect = 0;
  let quiz_results = '';
  if(quiz_question_number.value === quiz_questions_total.value) { 
    quiz_results = `<table align="center"><tr><th colspan="3" class="large center">Quiz Results</th></tr><tr><th class="center">Correct</th><th class="center"> </th><th class="center">Total</th></tr><tr><td width="40%" class="large center">${quiz_questions_correct.value}</td><td class="center">/</td><td width="40%" class="large center">${quiz_questions_total.value}</td></tr></table>`;
    quiz_question_number.value = 1;
    set_question_number.value = 1;
    quiz_btn.innerHTML = "Start<br>Quiz";
  }
  if(note2test.charAt(0) === noteEntered.charAt(0)) {
        // setCompletedQuestions();
        let oct_msg = "";
        // if(test_octaves) { oct_msg = `<br>But not the octave. Better luck next time!`;} else {}
        ++quiz_questions_correct.value;
        if(debug===1) console.log('testInput()\nquiz_question_number.value = '+quiz_question_number.value+'\nquiz_questions_correct.value = '+quiz_questions_correct.value+'\nquiz_questions_total.value = '+quiz_questions_total.value);
        if(quiz_question_number.value > quiz_questions_total.value) {
          quiz_question_number.value = 1;
          set_question_number.innerText = 1 + '/' + quiz_questions_total.value;
        } else {
          // ++quiz_question_number.value;
          set_question_number.innerText = quiz_question_number.value + '/' + quiz_questions_total.value;
          if(debug===1) console.log('quiz_question_number.value = '+quiz_question_number.value);
        }
        msgbox.showMsgBox(
          "correct",
          "Your answer was correct!",
          "",
        `<div class="msgbox_results">
          <div class="correct_answer center">Correct Answer</div>
          <div class="user_answer center">Your Answer</div>
          <div class="mt center">Current Score</div>
          <div class="correct_answer_displayed center">
            <div id="user_input" class="user_input center">${note2test.charAt(0)}</div> 
          </div>
          <div class="user_answer_displayed center">
            <div id="user_input" class="user_input center">${noteEntered.charAt(0)}</div>
          </div>
          <div class="choices center">
            ${quiz_questions_correct.value}/${quiz_question_number.value}
            <button class="newNote" onclick="return false">New&nbsp;Note</button><br>
            <button class="newNote" id="start_over" onclick="return false">Start Over</button><br>
          </div>
          <div class="quiz_results">${quiz_results}</div>
        </div>`);
        clearNotes();
        noteCorrect = 1;
        octaveCorrect = 0;
  } else {
    // setCompletedQuestions();
    msgbox.showMsgBox(
      'incorrect',
      "WRONG!",
      "Your answer was incorrect!",
    `<div class="msgbox_results">
        <div class="correct_answer">Correct Answer</div>
        <div class="user_answer">Your Answer</div>
        <div class="mt">Current Score</div>
        <div class="correct_answer_displayed">
          <div id="user_input" class="user_input">${note2test.charAt(0)}</div> 
        </div>
        <div class="user_answer_displayed">
          <div id="user_input" class="user_input">${noteEntered.charAt(0)}</div>
        </div>
        <div class="choices">
        ${quiz_questions_correct.value}/${quiz_question_number.value}
        <button class="newNote">New&nbsp;Note</button><br>
        <button id="start_over">Start Over</button><br>
        </div>
        <div class="quiz_results">${quiz_results}</div>
      </div>`);
      clearNotes();
      noteCorrect = 0;
      octaveCorrect = 0;
  }
  if(quiz_results.length > 0) {
    storeQuizResults(`${quiz_questions_correct.value}/${quiz_questions_total.value}`);
    quiz_btn.innerHTML = "Start<br>Quiz";
    set_question_number.innerText = "";
    setTimeout(function() { location.reload();},10000);
  }
  getValues('testInput(end)');
}

document.body.addEventListener('click', function(e) {
  if ([...newNote].includes(e.target)) {
    if (document.querySelector(".msgbox_alert")) {
      document.querySelector(".msgbox_alert").remove();
    }
    console.log('1) just got clicked...');
    let newRnd = showOctArr();
    // comment next line out for production
    footer.innerHTML = `<br>newRnd = ${newRnd}`;
    addNote(newRnd);
  }
});


// triggers the "Check It?" button to test user input
checkIt.addEventListener('click', function(e) {
  testInput(document.getElementById('lastNote').value, document.getElementById('user_input').innerText);
});

A.addEventListener('dblclick', function(e) {
  testInput(document.getElementById('lastNote').value, document.getElementById('user_input').innerText);
});

B.addEventListener('dblclick', function(e) {
  testInput(document.getElementById('lastNote').value, document.getElementById('user_input').innerText);
});

C.addEventListener('dblclick', function(e) {
  testInput(document.getElementById('lastNote').value, document.getElementById('user_input').innerText);
});

D.addEventListener('dblclick', function(e) {
  testInput(document.getElementById('lastNote').value, document.getElementById('user_input').innerText);
});

E.addEventListener('dblclick', function(e) {
  testInput(document.getElementById('lastNote').value, document.getElementById('user_input').innerText);
});

F.addEventListener('dblclick', function(e) {
  testInput(document.getElementById('lastNote').value, document.getElementById('user_input').innerText);
});

G.addEventListener('dblclick', function(e) {
  testInput(document.getElementById('lastNote').value, document.getElementById('user_input').innerText);
});

/*====================== showNotes functionality ===============*/
function showNotes(which) {
  let note = "",
  count = 0;
  document.querySelectorAll(".shownote").forEach((item) => {
    if (which === 1) {
      note = item.getAttribute("class");
      if(note.includes("shownote-top")) { 
        item.classList.add("top-border"); 
        item.classList.add("left-border"); 
        item.classList.add("right-border"); 
      } else if(note.includes("shownote-bottom")) { 
        item.classList.add("bottom-border"); 
        item.classList.add("left-border"); 
        item.classList.add("right-border"); 
      }

      note = note.replace(" shownote", "").replace("_3", "").replace(" shownote-bottom", "").replace(" shownote-top", "").toUpperCase();
      count++;
      if (count % 2 === 1) {
        item.classList.add("left");
        item.classList.add("brd-btm");
        item.classList.add("left-border"); 
        item.classList.add("right-border"); 
        item.classList.add("gray-bkgd"); 
        item.innerHTML = "&nbsp;" + note;
      } else {
        item.classList.add("right");
        item.classList.add("left-border"); 
        item.classList.add("right-border"); 
        item.classList.add("gray-bkgd"); 
        item.innerHTML = note + "&nbsp;";
      }
      console.log(note);
    } else {
      item.innerHTML = "";
      item.classList.remove("left");
      item.classList.remove("right");
      item.classList.remove("brd-btm");
      item.classList.remove("left-border"); 
      item.classList.remove("right-border"); 
      item.classList.remove("top-border"); 
      item.classList.remove("bottom-border"); 
      item.classList.remove("gray-bkgd"); 
    }
  });
}
// this toggles the note overlay on the right side of the interface
document.getElementById("showNotes").addEventListener("click", function (e) {
  if (document.getElementById("showNotes").checked) {
    showNotes(1);
  } else {
    showNotes(0);
  }
});
/*----------------------- showNotes functionality -----------------------*/
// this sends the A-G button selected to user_input
document.querySelectorAll('.select_note').forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById('user_input').innerText = e.target.dataset.note;
  });
});

function localStorageChkbox(getID, val_on, val_off) {
  if(localStorage.getItem(getID)===null) { localStorage.setItem(getID, val_off); }
  if (localStorage.getItem(getID) && localStorage.getItem(getID) === val_on) {
    document.getElementById(getID).checked = true;
  }

  if(document.getElementById(getID)) {
    document.getElementById(getID).addEventListener("click", function (e) {
      if (debug === 1) {
        console.log(
          `${getID}.checked = ${document.getElementById(getID).checked}`
        );
      }
      if (document.getElementById(getID).checked === true) {
        localStorage.setItem(getID, val_on);
      } else {
        localStorage.setItem(getID, val_off);
      }
      if (debug === 1) {
        console.log(
          `localStorage.getItem(${getID}) = ` + localStorage.getItem(getID)
        );
      }
    });
  }
  if (debug === 1) {
      console.log(
        "localStorage.getItem(" + getID + ") = " + localStorage.getItem(getID)
      );
  }
}

localStorageChkbox('oct3', 'on', 'off');
localStorageChkbox('oct4', 'on', 'off');
localStorageChkbox('oct5', 'on', 'off');
localStorageChkbox('oct6', 'on', 'off');
localStorageChkbox('oct7', 'on', 'off');
localStorageChkbox('oct8', 'on', 'off');


setRWDwidth();
window.addEventListener("orientationchange", function() { setRWDwidth(); }, false);
window.addEventListener("resize", function() {	setRWDwidth(); }, false);