export default {
    passwordReGex : /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
    usernameReGex : /^[a-zA-Z0-9]*$/,
    emailReGex : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
}