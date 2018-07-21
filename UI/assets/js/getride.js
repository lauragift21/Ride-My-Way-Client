const search = document.getElementById('search');
const alertMsg = document.querySelector('#alertError');
const row = document.getElementsByClassName('row');
const allRides = document.getElementById('rides');
const specificRide = document.getElementById('details');

const getAllRides = () => {
  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/rides';

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
  .then((data) => {
    if (data.rides.length < 1) {
        alertMsg.innerHTML = 'No Ride available at the moment.';
      }
      else {
        const rideOffer = data.rides;
        return rideOffer.map((ride) => {
          let rideDetails = '';
          rideDetails += `
          <table>
            <tr class="row">
              <td> ${ride.location}</td>
              <td> ${ride.destination}</td>
              <td> ${moment(ride.departure).format('MMM Do YY')}</td>
              <td> ${ride.seats}</td>
              <td>
                <a href="ride-details.html?${ride.id}">
                  <button class="ride-success detail" onclick="getSpecificRide(${ride.id})">Ride Details</button>
                </a>
                </td>
                </tr>
            </table>
            `;
            allRides.innerHTML += rideDetails;
          })
      }
    });
  };
window.onload = getAllRides('#ride');


// Get details of one ride
const getSpecificRide = (rideId) => {
  let rideDetails = '';
  const url = `https://ride-my-way-server.herokuapp.com/api/v1/rides/${rideId}`;
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
  }

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.ride > 1) {
        rideDetails = `
        <div class="trip">
        <h1>Ride Information</h1>
        <table>
          <tr>
            <td>Location:</td>
            <td>${data}</td>
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
        specificRide.innerHTML = rideDetails;
  }
    });
  };

window.onload = getSpecificRide('#ride-details');

