const form = document.getElementById('form');
const submit = document.getElementById('submit');

const name = document.getElementById('name');
const locate = document.getElementById('location');
const destination = document.getElementById('destination');
const departure = document.getElementById('departure');
const seats = document.getElementById('seats');
const serverError = document.getElementById('serverError');

const nameError = document.getElementById('nameError');
const locationError = document.getElementById('locationError');
const destinationError = document.getElementById('destinationError');
const departureError = document.getElementById('departureError');
const seatsError = document.getElementById('seatsError');

const checkValidation = () => {
  if (!name.value) {
    nameError.innerHTML = 'Name is required';
    name.setAttribute('style', 'border: 1px solid #cc0033;');
  }
  if (!locate.value) {
    locationError.innerHTML = 'Location is required';
    locate.setAttribute('style', 'border: 1px solid #cc0033;');
  }
  if (!destination.value) {
    destinationError.innerHTML = 'Destination is required';
    destination.setAttribute('style', 'border: 1px solid #cc0033;');
  }
  if (!departure.value) {
    departureError.innerHTML = 'Departure date is required';
    departure.setAttribute('style', 'border: 1px solid #cc0033;');
  }
  if (!seats.value) {
    seatsError.innerHTML = 'Number of Seats is required';
    seats.setAttribute('style', 'border: 1px solid #cc0033;');
  }
};

const createRide = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'index.html';
  }
  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/users/rides';

  const data = {
    location: locate.value,
    destination: destination.value,
    departure: departure.value,
    seats: seats.value,
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => {
        data.success === 'true';
        swal({
          title: 'Whoop!! Whoop!!',
          text: data.message,
          closeModal: true,
        })
    }).catch((err) => {
      console.log(err);
    })
}

const removeErrorMsg = (input, inputError) => {
  inputError.setAttribute('style', 'display: none;');
  input.setAttribute('style', 'border: 1px solid #dddddd;');
};

name.onKeyDown = () => {
  clearError(name, nameError);
}

locate.onKeyDown = () => {
  clearError(name, nameError);
}

submit.onclick = (e) => {
  event.preventDefault();
  checkValidation();
  createRide();
};


// delete error messages
locate.onkeydown = () => {
  removeErrorMsg(locate, locationError);
};

destination.onkeydown = () => {
  removeErrorMsg(destination, destinationError);
};

departure.onkeydown = () => {
  removeErrorMsg(departure, departureError);
};

seats.onkeydown = () => {
  removeErrorMsg(seats, seatsError);
};