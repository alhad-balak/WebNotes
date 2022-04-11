console.log("This is Web.JS");


showNotes();

//Clear Text area in Runtime.
let addNote = document.getElementById('addTxt');
addNote.value = 'Write Your Note Here!';
addNote.addEventListener('click', function () {
    if (addNote.value == 'Write Your Note Here!') { addNote.value = ''; }
    if (addNote.value == 'Write Another Note Here!') { addNote.value = ''; }
});

//Adding editable Title
let addTitle= document.getElementById('addTitle');
addTitle.value='Write Your Title Here.'
addTitle.addEventListener("click", function(){
    if(addTitle.value == 'Write Your Title Here.'){addTitle.value='';}
})
//Function to add Notes in Your Notes for Runtime only
// function addNote(noteText, titleText) {
//     yourNotes = document.getElementById('yournotes');
//     let note = document.createElement('div');
//     note.setAttribute('class', 'mx-1 my-2 card');
//     note.setAttribute('style', 'width: 21.5rem;');

//     let subNote1 = document.createElement('div');
//     subNote1.setAttribute('class', 'card-body');

//     let cardTitle = document.createElement('h5');
//     cardTitle.setAttribute('class', 'card-title');
//     cardTitle.appendChild(titleText);

//     let cardText = document.createElement('p');
//     cardText.appendChild(noteText);

//     let deleteButton = document.createElement('button');
//     deleteButton.setAttribute('href', '#');
//     deleteButton.setAttribute('class', 'btn btn-primary');
//     deleteButton.setAttribute('onclick', 'deleteNote(this.id');
//     deleteButton.setAttribute('id', '${index}');
//     let deleteText = document.createTextNode('Delete');
//     deleteButton.appendChild(deleteText);

//     subNote1.appendChild(cardTitle);
//     subNote1.appendChild(cardText);
//     subNote1.appendChild(deleteButton);
//     yourNotes.appendChild(note);
//     note.appendChild(subNote1);
// }

//Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
              <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title">${element.txtTitle}</h5>
                          <p class="card-text"> ${element.txtNote}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                      </div>
                  </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add Note" section.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//Adding Notes section in 'Your Notes' section and localStorage after click on button "Add".
let addBtn = document.getElementById('addbtn');
addBtn.addEventListener('click', function () {
    // let text = document.createTextNode('This is Note');
    // let title = document.createTextNode('Title');
    // addNote(text, title);
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let ObjVal={
        txtNote : addTxt.value,
        txtTitle : addTitle.value,
    };
    notesObj.push(ObjVal);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = 'Write Another Note Here!';
    addTitle.value='Write Your Title Here.'
    showNotes();
    // console.log(addTxt);
});

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
});