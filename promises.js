function getData(uId) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, 4000)
    }).then(function () {
        return "skc@gmail.com"
    })
}
console.log("start")
getData("skc").then(data => {
    console.log("Email id of the user id is: " + data)
})
console.log("end")