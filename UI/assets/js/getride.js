const search = document.getElementById('search');
const alertMsg = document.querySelector('alert');
const allRides = document.getElementById('allRides');

const getAllRides = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'index.html';
  }

  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/rides';

  fetch(url, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      if (data.success === 'true') {
        alertMsg.innerHTML = data.data.message;
        data.data.rides.map((ride) => {
          allRides.innerHTML += `
          <div class="rides-list">
          <table class="table">
            <tr class="row" id="rides">
              <th>Name</th>
              <th>Location</th>
              <th>Destination</th>
              <th>Departure time</th>
              <th>Seat Available</th>
              <th>Request Ride</th>
            </tr>
            <tr class="row">
              <td>${name}</td>
              <td>${ride.location} </td>
              <td>${ride.destination}</td>
              <td>${ride.departure}</td>
              <td>${ride.seats}</td>
              <td>
                <button href="/${ride.id}" class="ride-success">Request</button>
              </td>
            </tr>
          </table>
        </div>
          `;
        });
      }
    });
};



