function login() {
    let key = username.value;
    let user = JSON.parse(localStorage.getItem(key));
    if (username.value == "" || password.value == "") {
        alert("Please Fill The Missing Fields");
    }
    else if (user && username.value == user.username && password.value == user.password) {
        alert("Login Successful");
        localStorage.setItem('logined', username.value);
        window.location = './home.html'
    } else {
        alert("Wrong Account Number or Password");
    }
}