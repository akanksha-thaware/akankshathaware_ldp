
let local_value = localStorage.getItem('counter') ?? 0
let session_value = sessionStorage.getItem('counter') ?? 0
document.getElementById('local').innerText = local_value
document.getElementById('session').innerText = session_value

localStorage.setItem('counter', local_value)
sessionStorage.setItem('counter', session_value)

function increment() {
    local_value++
    session_value++
    document.getElementById('local').innerText = local_value
    document.getElementById('session').innerText = session_value

    localStorage.setItem('counter', local_value)
    sessionStorage.setItem('counter', session_value)
}
