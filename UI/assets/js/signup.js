// select all input fields
const form = document.getElementById('form');
const submit = document.getElementById('submit');

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const locate = document.getElementById('location');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

//  select all error tags
const firstError = document.getElementById('firstError');
const lastError = document.getElementById('lastError');
const emailError = document.getElementById('emailError');
const locationError = document.getElementById('locationError');
const passwordError = document.getElementById('passwordError');
const passwordConfirmError = document.getElementById('passwordConfirmError');
const serverError = document.getElementsByClassName('serverError');

// validate data sent in form
const checkValidation = () => {
  if (!firstName.value) {
    firstError.innerHTML = 'First name is required';
    firstName.setAttribute('style', 'border: 1px solid #cc0033;');
  }
  if (!lastName.value) {
    lastError.innerHTML = 'Last name is required';
    lastName.setAttribute('style', 'border: 1px solid #cc0033;');
  }
  if (!email.value) {
    emailError.innerHTML = 'Email address is required';
    email.setAttribute('style', 'border: 1px solid #cc0033;');
  }
  if (!locate.value) {
    locationError.innerHTML = 'Location is required';
    locate.setAttribute('style', 'border: 1px solid #cc0033;');
  }
};

//  check if password match
const checkPassword = () => {
  if (password.value !== confirmPassword.value) {
    passwordConfirmError.innerHTML = 'Password does not match';
    confirmPassword.setAttribute('style', 'border: 1px solid #cc0033;');
  }
};

const removeErrorMsg = (input, inputError) => {
  inputError.setAttribute('style', 'display: none;');
  input.setAttribute('style', 'border: 1px solid #dddddd;');
};

const signup = () => {
  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/auth/signup';

  // insert values into req body
  const data = {
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    location: locate.value,
    password: password.value
  };

  fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc,
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json; charset utf-8',
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(data => {
      data.success === 'true';
      window.localStorage.setItem('token', data.token);
      window.location.href = 'rides.html';
    })
    .catch(err => {
      console.log(err);
    });
};

submit.onclick = (e) => {
  event.preventDefault();
  checkValidation();
  checkPassword();
  signup();
};

// delete error messages
firstName.onkeydown = () => {
  removeErrorMsg(firstName, firstError);
};

lastName.onkeydown = () => {
  removeErrorMsg(lastName, lastError);
};

locate.onkeydown = () => {
  removeErrorMsg(locate, locationError);
};

email.onkeydown = () => {
  removeErrorMsg(email, emailError);
};

password.onkeydown = () => {
  removeErrorMsg(password, passwordError);
};