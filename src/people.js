
let NumOfPeople = 0;

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

let addPerson = () => {
    let PersonAge = document.getElementById("PersonAge");
    NumOfPeople++;
    addPersonDiv(PersonAge.value,NumOfPeople,"person");

}