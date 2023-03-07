// Q1. Write a program to demonstrate how a function can be passed as a parameter to another function.
// function which takes addition function as a parameter with two arguments
function result(add) {
    console.log(add(15, 20))
}
function addition(a, b) {
    return a + b
}
// call the result function which takes other function
result(addition)

// Q2. An arrow function takes two arguments firstName and lastName and returns a 2 letter string that 
// represents the first letter of both the arguments. 
// For the arguments Roger and Waters, the function returns ‘RW’. Write this function.
const arguments = (firstName, lastName) => {
    const firstLetter = firstName[0]
    const secondLetter = lastName[0]
    return firstLetter + secondLetter
}
console.log(arguments('Rogers', 'Waters'))

