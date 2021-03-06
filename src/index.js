// my variables
let middleThird = document.getElementById('middleThird');
let input = document.createElement("INPUT");
let lowerThird = document.getElementById('lowerThird');
let breadcrumbs = document.getElementById('breadcrumbs');

let buttonid = 0;
let form1 = {
};

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
    document.getElementById(buttonid).innerHTML = text;
    return textSpan;
}

let addButton = (word, css, onclick, TomiddleThird) => {
    /* Create an button element */
    let word1 = document.createElement("button");

    /* Set the type class */
    word1.setAttribute("class", css);

    /* Add name of btn as unique value for attribute to be referenced in stylesheet */
    word1.setAttribute("btnName", word);

    if (onclick) {
        word1.setAttribute("onclick", onclick);
    }
    buttonid++;
    word1.setAttribute('id', buttonid)

    /* Append node to the body */
    if (TomiddleThird) {
        middleThird.appendChild(word1);
    } else {
        lowerThird.appendChild(word1);
    }
    document.getElementById(buttonid).innerHTML = word;
}


let inputFill = (placeholder, css, type, id,key) => {
    /* Create an input element */
    let placeholder1 = document.createElement("INPUT");
    let idthingy = placeholder.replaceAll(" ", "");
    //console.log(idthingy);
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
        placeholder1.setAttribute('id', idthingy);
    }
    console.clear();
    console.log("idthingy", idthingy);
    let value1 = GetFormValue(idthingy);
    console.log("value", value1);

    if (value1) {
        placeholder1.value = value1;
    }

    /* Append node to the body */
    middleThird.appendChild(placeholder1);

    if (idthingy != "PersonAge") // add a listener EXCEP for the Age which has it's own
    {
        placeholder1.setAttribute("onkeyup", `saveChangeof('${idthingy}')`);
    }

    return placeholder1;
}

//Add name for all btns before adding labels.
function addRadioBtns(name) {
    let pram = Array.from(arguments);

    for (var i = 0; i < pram.length; i++) {
        let radiobtn = document.createElement('input');
        radiobtn.type = 'radio';
        radiobtn.name = name;
        radiobtn.id = 'Your' + pram[i] + 'Radio';
        radiobtn.value = pram[i];

        middleThird.appendChild(radiobtn);
        middleThird.appendChild(addText(pram[i]));
    }
}



let saveChangeof = (key) => {
    let InputValue = document.getElementById(key).value;
    AddToForm(key, InputValue);
}


let AddToForm = (key, InputValue) => {
  
    form1[key]=(`${InputValue}`);
}



let removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


let UpdateProgressBar = (imgsrc, css) => {
    removeAllChildNodes(breadcrumbs);
    let progressbar = document.createElement("img");
    progressbar.setAttribute("src", "assests/images/" + imgsrc);
    progressbar.setAttribute("class", css);

    //Added aria label and role
    progressbar.setAttribute("role", "progressbar");

    //Calculate percentage mark
    let max = 7;
    let now = ((parseInt(imgsrc.match(/\d+/))/max)*100);

    progressbar.setAttribute("aria-valuemin", "0");
    progressbar.setAttribute("aria-valuemax", "100");
    progressbar.setAttribute("aria-valuenow", now);

    breadcrumbs.appendChild(progressbar);
}


/* People */
let NumOfPeople = 0;
let PeopleArr = [];

let addPersonDiv = (ages, id, css) => {
    let people = document.getElementById('people');
    /* Create an button element */
    let person = document.createElement("img");
    /* Set the type class */
    person.setAttribute("class", css);

    /* Set height of the person */
    switch (true) {
        case ages < 10:
            // person.style.height = "50px";
            person.setAttribute("src", "assests/images/Grain-Child.png");
            person.setAttribute('id', id)
            people.appendChild(person);
            break;
        case 10 < ages && ages < 65:
            // person.style.height = "70px";
            person.setAttribute("src", "assests/images/Grain-Adult.png");
            person.setAttribute('id', id)
            people.appendChild(person);
            break;
        case ages >= 65:
            // person.style.height = "100px";
            person.setAttribute("src", "assests/images/Grain-Senior.png");
            person.setAttribute('id', id);
            people.appendChild(person);
            break;
    }

    

}
//test for the adding a person

let ShowPeople = (PeopleArr) => {
    PeopleArr.map(x => {
        addPersonDiv(x.age, x.PersonID, "person");

    });
}



let addPerson = () => {
    let personAge = document.getElementById("personAge").value;
    console.log("adding person age",personAge)
    NumOfPeople++;
    let newPerson = { PersonID: NumOfPeople, age: personAge };
    PeopleArr.push(newPerson);
    AddToForm("People", PeopleArr);
    addPersonDiv(personAge, NumOfPeople, "person");
    console.log("",  personAge)


}

/* END People */

let GetFormValue = (key) => {
    let value = null
    Object.keys(form1).map(x => {
        //console.log("x.key",x.key)
        if (x.key == key) {
            value = x.value
        }
    })
    return value;
}
function limecheck(pram) {
    serviceFood.style.borderColor = '#f28c3c';
    serviceOther.style.borderColor = '#f28c3c';
    serviceSnap.style.borderColor = '#f28c3c';
    serviceMed.style.borderColor = '#f28c3c';

    pram.style.borderColor == 'lime'
        ? pram.style.borderColor = '#f28c3c'
        : pram.style.borderColor = 'lime';


}

// Next Slides
let NextSlide = (slideId) => {
    let nextBackButtons = () => {
        addButton('Back', 'smallBar', `NextSlide(${slideId - 1})`);
        addButton('Next', 'smallBar', `NextSlide(${slideId + 1})`);
    }
    switch (slideId) {
        /* Added extra case to generate layout for first page */
        case 1:
            UpdateProgressBar("ProgressBar1.png", 'progressbar');
            removeAllChildNodes(middleThird);
            addHeader_3('COVID-19 EMERGENCY SERVICES FORM', 'CovidFrmHd');
            removeAllChildNodes(lowerThird);
            addButton('Continue', 'smallBar', `NextSlide(${slideId + 1})`)
            break;
        case 2:
            UpdateProgressBar("ProgressBar2.png", 'progressbar');
            removeAllChildNodes(middleThird);
            addDiv('language');
            addDiv('language1');
            addDiv('language2');
            language.appendChild(language1);
            language.appendChild(language2);

            addRadioBtns('English', 'Spanish');
            language1.appendChild(document.querySelector("#\\3" + (buttonid - 1)));
            language1.appendChild(YourEnglishRadio);
            language2.appendChild(document.querySelector("#\\3" + buttonid));
            language2.appendChild(YourSpanishRadio);
            addText('<h3>Please fill this form:</h3>');

            inputFill('First Name', null, 'text');
            inputFill('Last Name', null, 'text');
            removeAllChildNodes(lowerThird);
            nextBackButtons();
            break;

        case 3:
            UpdateProgressBar("ProgressBar3.png", 'progressbar');
            removeAllChildNodes(middleThird);
            addText('<h3>Contact Information:</h3>');
            /* Generated DIV tags and appended INPUT controls inside DIV tags */
            let contacts = addDiv('contacts');
            contacts.append(
                inputFill('Your Email Adress', null, 'email')
            );
            contacts.append(
                inputFill('Your Primary Phone  Number', null, 'text')
            );
            contacts.append(
                inputFill('Any Other Form of Contact', null, 'text')
            );
            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;
        case 4:   // people
            UpdateProgressBar("ProgressBar4.png", 'progressbar');
            removeAllChildNodes(middleThird);
            addText("<h3>Adding a person:</h3>")
            inputFill('PersonAge', null, 'number', 'personAge');
            addButton('Add a person', 'smallBar', 'addPerson()', true);
            addDiv("people");
            console.log("ShowPeople", form1.people)
            let currentPeople = GetFormValue("People");
            if (currentPeople) {
                ShowPeople(currentPeople);
            }
            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;

        case 5:
            UpdateProgressBar("ProgressBar5.png", 'progressbar');

            removeAllChildNodes(middleThird);
            addText('<h3>Your Location:</h3>')
            let address = addDiv('address');
            address.append(
                inputFill('Your Adress Lane', null, 'text')
            );
            address.append(
                inputFill('Your Adress Lane 2', null, 'text')
            );
            address.append(
                inputFill('State', null, 'text')
            );
            address.append(
                inputFill('City', null, 'text')
            );
            address.append(
                inputFill('Zip', null, 'text')
            );
            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;

        case 6:
            UpdateProgressBar("ProgressBar6.png", 'progressbar');
            removeAllChildNodes(middleThird);
            addText('<h3>Which services do you require?</h3>')
            addDiv('bigDiv')
            addDiv('topDiv')
            addDiv('bottomDiv')
            inputFill('food', 'clickInput', 'text', 'serviceFood')
            inputFill('Snap', 'clickInput', 'text', 'serviceSnap')
            inputFill('Medicad', 'clickInput', 'text', 'serviceMed')
            inputFill('other', 'clickInput', 'text', 'serviceOther')

            serviceFood.setAttribute('readOnly', 'enable')
            serviceSnap.setAttribute('readOnly', 'enable')
            serviceMed.setAttribute('readOnly', 'enable')
            serviceOther.setAttribute('readOnly', 'enable')

            // addText('Request Services:')
            bigDiv.appendChild(topDiv)
            bigDiv.appendChild(topDiv)
            bigDiv.appendChild(bottomDiv)
            topDiv.appendChild(serviceFood)
            topDiv.appendChild(serviceSnap)
            bottomDiv.appendChild(serviceMed)
            bottomDiv.appendChild(serviceOther)
            serviceFood.addEventListener("click", e => {
                AddToForm('service', 'Food');
                limecheck(serviceFood)
            });
            serviceOther.addEventListener("click", e => {
                AddToForm('service', 'other');
                limecheck(serviceOther)
            });
            serviceSnap.addEventListener("click", e => {
                AddToForm('service', 'snap');
                limecheck(serviceSnap)
            });
            serviceMed.addEventListener("click", e => {
                AddToForm('service', 'med');
                limecheck(serviceMed)
            });


            removeAllChildNodes(lowerThird);
            nextBackButtons()
            break;

        case 7:
            UpdateProgressBar("ProgressBar7.png", 'progressbar');
            removeAllChildNodes(middleThird);
            addText('<h3>Help us help you:</h3>')
            inputFill('How did you hear about us?', null, 'text');
            inputFill('Please ask as many questions as you need!', null, 'text');
            removeAllChildNodes(lowerThird);
            addButton('Send Form', 'smallBar', `SendForm()`);
            break;

    }

}


let SendForm = () => {
    removeAllChildNodes(middleThird);
    removeAllChildNodes(lowerThird);
    addText("Your Form has been succesfully submited.<BR> Thank you.")
}