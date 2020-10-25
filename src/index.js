// my variables
let middleThird = document.getElementById('middleThird');
let input = document.createElement("INPUT"); 
let lowerThird = document.getElementById('lowerThird');
let breadcrumbs = document.getElementById('breadcrumbs');

let buttonid=0;
let form = [];

let addDiv = (divName) => {
    let Div = document.createElement("div");
    Div.setAttribute('id', divName);
    middleThird.appendChild(Div);
}

let addText = (text) => {
    let textSpan = document.createElement("span");
    buttonid++;
    textSpan.setAttribute('id', buttonid)
    middleThird.appendChild(textSpan);
    document.getElementById(buttonid).innerHTML=text;
}

let addButton = (word, css, onclick,TomiddleThird) => {
    /* Create an button element */
    let word1 = document.createElement("button");

    /* Set the type class */
    word1.setAttribute("class", css);
    if (onclick) {
        word1.setAttribute("onclick",onclick);
    }
    buttonid++;
    word1.setAttribute('id', buttonid)

    /* Append node to the body */
    if (TomiddleThird) {
        middleThird.appendChild(word1);
    } else {
        lowerThird.appendChild(word1);
    }
    document.getElementById(buttonid).innerHTML=word;
}


let inputFill = (placeholder,css,type,id)=>{
    /* Create an input element */ 
    let placeholder1 = document.createElement("INPUT"); 
    let inputButtonID = placeholder.replaceAll(" ","");
    //console.log(inputButtonID);
    /* Set the type attribute */ 
    placeholder1.setAttribute("type", type); 
    //placeholder1.setAttribute("required", ""); 

    /* Set the value to the PLACEHOLDER */ 
    placeholder1.setAttribute("placeholder", placeholder); 
    
    /* Set the value to the class */ 
    placeholder1.setAttribute("class", css); 
    if (id) {
        placeholder1.setAttribute('id', id);
    } else {
        placeholder1.setAttribute('id', inputButtonID);
    }
    console.clear();
    console.log("inputButtonID",inputButtonID);
    let value1 = GetFormValue(inputButtonID);
    console.log("value",value1);

    if (value1) {
        placeholder1.value = value1;
    }
    
    /* Append node to the body */ 
    middleThird.appendChild(placeholder1);

    if (inputButtonID != "PersonAge") // add a listener EXCEP for the Age which has it's own
    {
        placeholder1.setAttribute("onkeyup",`saveChangeof('${inputButtonID}')`);
    }


}

let saveChangeof = (labelID) => {
    let InputValue = document.getElementById(labelID).value;
    AddToForm(labelID,InputValue);
}


let AddToForm = (labelID,InputValue) => {
    console.log("labelID",labelID);
    console.log("value of",InputValue);
    let found = false;
    form.map(x=> {
        if (x.labelID == labelID) {
            x.value=InputValue;
            found = true;
        }
    })

    if (!found) {
        let newInput = {labelID:labelID, value:InputValue}; 
        form.push(newInput);
    }
}



let removeAllChildNodes=(parent)=> {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }


let UpdateProgressBar = (imgsrc,css) => {
    removeAllChildNodes(breadcrumbs);
    let progressbar = document.createElement("img"); 
    progressbar.setAttribute("src", "assests/images/"+imgsrc);
    progressbar.setAttribute("class", css); 
    breadcrumbs.appendChild(progressbar);
}


/* People */
let NumOfPeople = 0;
let PeopleArr = [];
 
let addPersonDiv = (age,id, css) => {
    let people = document.getElementById('people');
    /* Create an button element */
    let person = document.createElement("img");

    /* Set the type class */
    person.setAttribute("class", css);

    
        /* Set height of the person */
        switch(true) {
            case age < 10:
                //person.style.height = "50px";
                person.setAttribute("src", "assests/images/Grain-Child.png");
                break;
            case age < 65:
                //person.style.height = "70px";
                person.setAttribute("src", "assests/images/Grain-Adult.png");
                break;
            default: 
                //person.style.height = "100px";
                person.setAttribute("src", "assests/images/Grain-Senior.png");
                break;
        }
    person.setAttribute('id', id)
    /* Append node to the body */
    people.appendChild(person);
}
//test for the adding a person

let ShowPeople = (PeopleArr) => {
    PeopleArr.map(x=> {
        addPersonDiv(x.age,x.PersonID,"person");
    });
}



let addPerson = () => {
    let PersonAge = document.getElementById("PersonAge").value;
    NumOfPeople++;
    addPersonDiv(PersonAge.value,NumOfPeople,"person");
    let newPerson = {PersonID: NumOfPeople,age:PersonAge};
    PeopleArr.push(newPerson);
    AddToForm("People",PeopleArr);
}

/* END People */
  
let GetFormValue =(labelID) => {
    let value = null
    form.map(x=> {
        //console.log("x.labelID",x.labelID)
        if (x.labelID==labelID) {
            value = x.value
        }
    })
    return value;
}


// Next Slides
let NextSlide = (slideId) => {
    let nextBackButtons = () => {
        addButton('Next','smallBar',`NextSlide(${slideId+1})`)
        addButton('Back','smallBar',`NextSlide(${slideId-1})`)
      }
    switch(slideId) {
        case 1: 
            UpdateProgressBar("ProgressBar1.png",'progressbar');
            removeAllChildNodes(middleThird);
            inputFill('First Name',null,'text');
            inputFill('Last Name',null,'text');
            removeAllChildNodes(lowerThird);
            addButton('Next','smallBar',`NextSlide(${slideId+1})`)
            break;

        case 2: 
            UpdateProgressBar("ProgressBar2.png",'progressbar');
            removeAllChildNodes(middleThird);
            inputFill('Your Email Adress',null,'email');
            inputFill('Your Primary Phone  Number',null,'text');
            inputFill('Any Other Form of Contact',null,'text');
            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;
        case 3:   // people
            UpdateProgressBar("ProgressBar3.png",'progressbar'); 
            removeAllChildNodes(middleThird);
            addText("Adding a person:")
            inputFill('PersonAge',null,'number','PersonAge');
            addButton('Add a person','smallBar','addPerson()',true);
            addDiv("people");
            console.log("ShowPeople",form.people)
            let currentPeople = GetFormValue("People");
            if (currentPeople) {
                ShowPeople(currentPeople);
            }
            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;

        case 4:       
            UpdateProgressBar("ProgressBar4.png",'progressbar');
            removeAllChildNodes(middleThird);
            inputFill('Your Adress Lane',null,'text');
            inputFill('Your Adress Lane 2',null,'text');
            inputFill('State',null,'text');
            inputFill('City',null,'text');
            inputFill('Zip',null,'text');
            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;

        case 5: 
            UpdateProgressBar("ProgressBar5.png",'progressbar');
            removeAllChildNodes(middleThird);
            // TODO step 5
            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;

        case 6: 
            UpdateProgressBar("ProgressBar6.png",'progressbar');
            removeAllChildNodes(middleThird);
            inputFill('How did you hear about us?',null,'text');
            inputFill('Please ask as many questions as you need!',null,'text');
            removeAllChildNodes(lowerThird);
            addButton('Send Form','smallBar',`SendForm()`);
        break;

    }

}  


let SendForm = () => {
    removeAllChildNodes(middleThird);
    removeAllChildNodes(lowerThird);
    addText("Your Form has been succesfully submited.<BR> Thank you.")
}