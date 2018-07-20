const search = document.getElementById('search');
const alertMsg = document.querySelector('.alert');
const row = document.getElementsByClassName('row');

const getAllRides = () => {
  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/rides';

  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'index.html';
  }

  const allRides = document.querySelector('#allRides');

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then((data) => {
    if (data.success === 'false') {
        alertMsg.innerHTML = data.message;
        setTimeout(() => {
          window.location.href('signin.html');
        }, 1000);
      }
      else {
        const rideOffer = data.rides;
        rideOffer.map((ride) => {
          allRides.innerHTML += `
          <table>
            <tr class="row">
              <td> ${ride.location}</td>
              <td> ${ride.destination}</td>
              <td>  ${moment(ride.departure).format('MMM Do YY')}</td>
              <td> ${ride.seats}</td>
              <td>
                <a href="./ride-details.html?${ride.id}">
                <button class="ride-success">Ride Details</button>
                </a>
              </td>
            </tr>
          </table>
            `;
          allRides.setAttribute('style', 'text-align:center');
          })
      }
    });
};

const getARide = (id) => {
  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/rides/${rideId}';
  const ride = document.querySelector('#ride')

  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'index.html';
  }

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.success === 'false') {
        alertMsg.innerHTML = data.message;
        setTimeout(() => {
          window.location.href('signin.html');
        }, 1000);
      }
      else {
        ride.innerHTML += `
        <div class="trip">
        <h1>Ride Information</h1>
        <table>
          <tr>
            <td>Location:</td>
            <td>${data.location}</td>
          </tr>
          <tr>
            <td>Destination: </td>
            <td>${data.destination}</td>
          </tr>
          <tr>
            <td> Departure: </td>
            <td>${data.departure}</td>
          </tr>
          <tr>
            <td> Seats: </td>
            <td>${data.seats}</td>
          </tr>
        </table>
        <a href="#">
          <button class="trip-btn">Request Ride</button>
        </a>
      </div>
        `;
      }
    })
  }

  window.onload = getAllRides('#ride');
  window.onload = getARide('#ride');

