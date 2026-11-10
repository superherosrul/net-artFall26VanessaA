function sayHello() {
    console.log("Hi! It's me Vanessa A.");
}

sayHello();

function greeting(name) {
    console.log("Welcome" + name +"to my First JS Page");
}

greeting("Net Art Class");

function changeStyle() {
    let textElement = document.querySelector("#jsText");
    textElement.style.cssText = "color: green; font-size:50px; font-style: oblique; fontWeight: bold; background-color: pink";
}