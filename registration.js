function register() {
    let user = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    console.log(user.username);
    if (user.username == "" || user.email == "" || user.password == "") {
        alert("Please Fill The Missing Fields");
    }
    else if (user.username in localStorage) {
        alert("User Name Already Exists")
    }
    else {
        localStorage.setItem(user.username, JSON.stringify(user));
        alert("Registration Sucess");
        window.location = './login.html'
    }
}