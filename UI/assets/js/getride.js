const allRides = document.getElementById('rides');
const modalTable = document.querySelector('#details');
const modal = document.querySelector('.modal');
const span = document.querySelector('.close');
const spinner = document.querySelector('#spinner');
const alertMsg = document.getElementById('alert');
const errMessage = document.querySelector('#errMessage');

// Get all rides
const getAllRides = () => {
  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/rides';

  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'index.html';
  }

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((data) => {
      spinner.style.display = 'none';
      if (data.rides.length < 1) {
        alertMsg.innerHTML = 'No Ride available at the moment.';
      }
      else {
        const rideOffer = data.rides;
        return rideOffer.map((ride) => {
          let rideDetails = '';
          rideDetails += `
          <table class="ride-table">
            <tr class="row">
              <td> ${ride.location}</td>
              <td> ${ride.destination}</td>
              <td> ${moment(ride.departure).format('MMM Do YY')}</td>
              <td> ${ride.seats}</td>
              <td>
                <button class="button" onclick="getSpecificRide(${ride.id})">View Details</button>
              </td>
                </tr>
            </table>
            `;
          allRides.innerHTML += rideDetails;
        });
      }
    });
};
window.onload = getAllRides('#rides');

// Get details of one ride
const getSpecificRide = (rideId) => {
  let rideDetails = '';
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
  }

  modal.style.display = 'block';
  errMessage.style.display = 'none';
  modalTable.innerHTML = '';
  span.onclick = () => {
    modal.style.display = 'none';
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };
  const url = `https://ride-my-way-server.herokuapp.com/api/v1/rides/${rideId}`;
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (data.success) {
        const ride = data.ride[0];
        rideDetails = `
        <table class="ride-table">
          <tr>
            <td>Location:</td>
            <td>${ride.location}</td>
          </tr>
          <tr>
            <td>Destination: </td>
            <td>${ride.destination}</td>
          </tr>
          <tr>
            <td> Departure: </td>
            <td> ${moment(ride.departure).format('MMM Do YY')}</td>
          </tr>
          <tr>
            <td> Seats: </td>
            <td>${ride.seats}</td>
          </tr>
        </table>
          <button class="trip-btn modal-btn" onclick="requestRide(${rideId})">Request Ride</button>
        `;
        modalTable.innerHTML = rideDetails;
      }
    });
};

//  Join a ride
const requestRide = (rideId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
  }
  const url = `https://ride-my-way-server.herokuapp.com/api/v1/rides/${rideId}/requests`;
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        errMessage.setAttribute('style', 'display: none;');
        swal({
          title: 'Hurray!',
          text: data.message,
          icon: 'success',
        });
      } else {
        errMessage.setAttribute('style', 'display: block; margin: 5px;');
        errMessage.innerHTML = '<i class="fa fa-times"></i> You cannot request for a ride you created';
      }
    });
};
