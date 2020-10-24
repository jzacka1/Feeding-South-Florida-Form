let people = document.getElementById('people');

let addPerson = (age,id, css) => {
    /* Create an button element */
    let person = document.createElement("div");

    /* Set the type class */
    person.setAttribute("class", css);

    let stock = document.createElement("img");
    stock.src="assests/images/grain.png";
        /* Set height of the person */
        switch(true) {
            case age < 10:
                stock.style.height = "50px";
                break;
            case age < 20:
                stock.style.height = "70px";
                break;
            default: 
                stock.style.height = "70px";
                break;
        }
    person.appendChild(stock);
    person.setAttribute('id', id)
    /* Append node to the body */
    people.appendChild(person);
}
//test for the adding a person

