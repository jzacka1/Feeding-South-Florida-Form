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

    return Div;
}

let addHeader_3 = (value, header) => {
    let h3 = document.createElement("h3");
    h3.setAttribute('id', header);
    h3.innerHTML = value;
    middleThird.appendChild(h3);
    return h3;
}

let addText = (text) => {
    let textSpan = document.createElement("span");
    buttonid++;
    textSpan.setAttribute('id', buttonid)
    middleThird.appendChild(textSpan);
    document.getElementById(buttonid).innerHTML=text;
    return textSpan;
}

let addButton = (word, css, onclick,TomiddleThird) => {
    /* Create an button element */
    let word1 = document.createElement("button");

    /* Set the type class */
    word1.setAttribute("class", css);

    /* Add name of btn as unique value for attribute to be referenced in stylesheet */
    word1.setAttribute("btnName", word);

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

    return placeholder1;
}

//Add name for all btns before adding labels.
function addRadioBtns(name) {
    let args = Array.from(arguments);

    for(var i = 0; i < args.length; i++){
        let radiobtn = document.createElement('input');
        radiobtn.type = 'radio';
        radiobtn.name = name;
        radiobtn.id = 'Your' + args[i] + 'Radio';
        radiobtn.value = args[i];

        middleThird.appendChild(radiobtn);
        middleThird.appendChild(addText(args[i]));
    }
}

function addChckBxs(name) {
    let args = Array.from(arguments);

    for(var i = 0; i < args.length; i++){
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = name;
        checkbox.id = 'Your' + args[i] + 'Checkbox';
        checkbox.value = args[i];

        middleThird.appendChild(checkbox);
        middleThird.appendChild(addText(args[i]));
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
 
let addPersonDiv = (ages,id, css) => {
    let people = document.getElementById('people');
    /* Create an button element */
    let person = document.createElement("img");

    /* Set the type class */
    person.setAttribute("class", css);
    
        /* Set height of the person */
        switch(ages) {
            case ages < 10:
                // person.style.height = "50px";
                person.setAttribute("src", "assests/images/Grain-Child.png");
                person.setAttribute('id', id)
                people.appendChild(person);
                // let fig = document.createElement("FIGCAPTION");
                // let text = document.createTextNode("Child");
                // fig.appendChild(text);
                // person.appendChild(fig)
                break;
            case 10<ages && ages < 65:
                // person.style.height = "70px";
                person.setAttribute("src", "assests/images/Grain-Adult.png");
                person.setAttribute('id', id)
                people.appendChild(person);
                break;
            case ages < 65: 
                // person.style.height = "100px";
                person.setAttribute("src", "assests/images/Grain-Senior.png");
                person.setAttribute('id', id);
                people.appendChild(person);
                break;
        }

}
//test for the adding a person

let ShowPeople = (PeopleArr) => {
    PeopleArr.map(x=> {
        addPersonDiv(x.age,x.PersonID,"person");

    });
}



let addPerson = () => {
    let personAge = document.getElementById("PersonAge").value;
    NumOfPeople++;
    let newPerson = {PersonID: NumOfPeople,age:personAge};
    PeopleArr.push(newPerson);
    AddToForm("People",PeopleArr);    
    addPersonDiv(personAge,NumOfPeople,"person");


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
        addButton('Back','smallBar',`NextSlide(${slideId-1})`);
        addButton('Next','smallBar',`NextSlide(${slideId+1})`);
      }
    switch(slideId) {
        /* Added extra case to generate layout for first page */
        case 1: 
            UpdateProgressBar("ProgressBar1.png",'progressbar');
            removeAllChildNodes(middleThird);
            addHeader_3('COVID-19 EMERGENCY SERVICES FORM', 'CovidFrmHd');
            removeAllChildNodes(lowerThird);
            addButton('Continue','smallBar',`NextSlide(${slideId+1})`)
            break;
        case 2: 
            UpdateProgressBar("ProgressBar2.png",'progressbar');
            removeAllChildNodes(middleThird);
            addHeader_3('Language', 'Language');
            addRadioBtns('English', 'Spanish');
            inputFill('First Name',null,'text');
            inputFill('Last Name',null,'text');
            removeAllChildNodes(lowerThird);
            nextBackButtons();
            break;

        case 3: 
            UpdateProgressBar("ProgressBar3.png",'progressbar');
            removeAllChildNodes(middleThird);

            addHeader_3('Contacts', 'Contacts');

            /* Generated DIV tags and appended INPUT controls inside DIV tags */
            let contacts = addDiv('contacts');
            contacts.append(
                inputFill('Your Email Adress',null,'email')
            );
            contacts.append(
                inputFill('Your Primary Phone  Number',null,'text')
            );
            contacts.append(
                inputFill('Any Other Form of Contact',null,'text')
            );
            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;
        case 4:   // people
            UpdateProgressBar("ProgressBar4.png",'progressbar'); 
            removeAllChildNodes(middleThird);
            // addText("Adding a person:");
            addHeader_3('Adding a Person', 'PersonAdd');
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

        case 5:       
            UpdateProgressBar("ProgressBar5.png",'progressbar');

            removeAllChildNodes(middleThird);
            addHeader_3('Address', 'Address');
            let address = addDiv('address');
            address.append(
                inputFill('Your Adress Lane',null,'text')
            );
            address.append(
                inputFill('Your Adress Lane 2',null,'text')
            );
            address.append(
                inputFill('State',null,'text')
            );
            address.append(
                inputFill('City',null,'text')
            );
            address.append(
                inputFill('Zip',null,'text')
            );
            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;

        case 6: 
            UpdateProgressBar("ProgressBar6.png",'progressbar');
            removeAllChildNodes(middleThird);
            // TODO step 5

            addHeader_3('Requesting Assistance For:', 'Assistance');

            // addChckBxs('Medicaid Application Assistance', 'SNAP', 'FOOD', 'Other');
            addButton('Medicaid Application Assistance','smallBar',null,true);
            addButton('SNAP','smallBar',null,true);
            addButton('Food','smallBar',null,true);
            addButton('Other','smallBar',null,true);

            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;

        case 7: 
            UpdateProgressBar("ProgressBar7.png",'progressbar');
            removeAllChildNodes(middleThird);
            addHeader_3('Referral Source', 'Referral');
            inputFill('How did you hear about us?',null,'text');
            inputFill('Please ask as many questions as you need!',null,'text');
            removeAllChildNodes(lowerThird);
            addButton('Back','smallBar',`NextSlide(${slideId-1})`);
            addButton('Send Form','smallBar',`SendForm()`);
        break;

    }

}  


let SendForm = () => {
    removeAllChildNodes(middleThird);
    removeAllChildNodes(lowerThird);
    addText("Your Form has been succesfully submited.<BR> Thank you.")
}