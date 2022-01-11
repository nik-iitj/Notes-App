
showNotes();


let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    let radioButtons = document.querySelectorAll('input[name="size"]');

   


    let currTag="";

    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            currTag = radioButton.value;
            break;
        }
    }
    if(addTitle .value==="" || currTag==="") console.log("Can't leave these fields empty");

    else {

        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: addTitle.value,
            text: addTxt.value,
            tag: currTag
        }
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        addTitle.value = "";
    
        showNotes();

    }



});


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
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <small style="opacity: 0;" class="tag">#${element.tag}</small><br>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Notes Empty! Use "Add Note" section to save your work :)`;
    }
}


function deleteNote(index) {
  

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


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
      
    })
})

function favTutorial() {
    var mylist = document.getElementById("myList");
    let val = mylist.options[mylist.selectedIndex].text.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');

    
    Array.from(noteCards).forEach(function (element) {

    
        
        let cardTxt = element.getElementsByTagName("small")[0].innerText.toLowerCase();
        
        if(val=="highlights")showNotes();

        else if (cardTxt.includes(val)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
       
    })

    }






