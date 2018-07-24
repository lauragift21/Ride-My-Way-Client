const firstName = document.querySelector('.username');
const lastName = document.querySelector('.lastname');
const state = document.querySelector('.location');
const rideOffer = document.querySelector('#given');
const rideTaken = document.querySelector('#taken');


getUserDetails = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  if (!token) {
    window.location.href = 'signin.html';
  }
  firstName.innerHTML = user.firstname;
  lastName.innerHTML = user.lastname;
  state.innerHTML = user.location;
};
window.onload = getUserDetails();

getRideOffers = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'signin.html';
  }
  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/rides';
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.json())
    .then((data) => { 
      console.log(data);
      rideOffer.innerHTML = data.rides.length;
    });
};
window.onload = getRideOffers;
