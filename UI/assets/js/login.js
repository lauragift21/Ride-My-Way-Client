// select all input fields
const submit = document.getElementById('submit');
const email = document.getElementById('email');
const password = document.getElementById('password');
//  select all error tags
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// validate data sent in form
const checkValidation = () => {
  if (!email.value) {
    emailError.innerHTML = 'Email address is required';
    email.setAttribute('style', 'border: 1px solid #cc0033;');
  }
  if (!password.value) {
    passwordError.innerHTML = 'Password is required';
    password.setAttribute('style', 'border: 1px solid #cc0033;');
  }
};

const removeErrorMsg = (input, inputError) => {
  inputError.setAttribute('style', 'display: none;');
  input.setAttribute('style', 'border: 1px solid #dddddd;');
};

const login = () => {
  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/auth/login';

  // insert values into req body
  const body = {
    email: email.value,
    password: password.value,
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'rides.html';
      }
    });
};

submit.onclick = (e) => {
  e.preventDefault();
  checkValidation();
  if (email.value && password.value) {
    login();
  }
};

// delete error messages
email.onkeydown = () => {
  removeErrorMsg(email, emailError);
};

password.onkeydown = () => {
  removeErrorMsg(password, passwordError);
};
