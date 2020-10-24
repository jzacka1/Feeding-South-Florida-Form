// my variables
let middleThird = document.getElementById('middleThird');
let input = document.createElement("INPUT"); 
let lowerThird = document.getElementById('lowerThird');



let addButton=(word,css)=>{
      /* Create an button element */ 
var word = document.createElement("button"); 
              
/* Set the type class */ 
word.setAttribute("class", css);

word.setAttribute('value',word)
/* Append node to the body */ 
lowerThird.appendChild(word); 

}

let inputFill = (placeholder,css,type)=>{
/* Create an input element */ 
let placeholder1 = document.createElement("INPUT"); 
              
/* Set the type attribute */ 
placeholder1.setAttribute("type", type); 
  
/* Set the value to the PLACEHOLDER */ 
placeholder1.setAttribute("placeholder", placeholder); 
  
/* Set the value to the class */ 
placeholder1.setAttribute("class", css); 

/* Append node to the body */ 
middleThird.appendChild(placeholder1);



}


let removeAllChildNodes=(parent)=> {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }


let Slide1 = () =>{
removeAllChildNodes(middleThird);
inputFill('First Name');
inputFill('Last Name');

 }