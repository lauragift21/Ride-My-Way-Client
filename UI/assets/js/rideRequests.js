const allRides = document.getElementById('rides');
const modalTable = document.querySelector('#details');
const modal = document.querySelector('.modal');
const span = document.querySelector('.close');
const errMessage = document.querySelector('#errMessage');
const spinner = document.querySelector('#spinner');

// Get all rides requests
const getRides = () => {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  if (!token) {
    window.location.href = 'signin.html';
  }
  const url = 'https://ride-my-way-server.herokuapp.com/api/v1/rides';
  const userId = decoded.id;
  errMessage.style.display = 'none';
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((data) => {
      spinner.style.display = 'none';
      const rideRequests = data.rides.filter(ride => ride.userid === userId);
      console.log(rideRequests);
      if (data.success) {
        if (rideRequests.length < 1) {
          errMessage.style.display = 'block';
          errMessage.innerHTML = '<i class="fa fa-info"></i> No ride available at the moment. Go ahead and create a new ride!';
        } else {
          return rideRequests.map((ride) => {
            let rideDetails = '';
            rideDetails += `
            <table>
              <tr class="row">
                <td> ${ride.location}</td>
                <td> ${ride.destination}</td>
                <td> ${moment(ride.departure).format('MMM Do YY')}</td>
                <td> ${ride.seats}</td>
                <td>
                  <button class="button" onclick="getRideRequest(${ride.id})">Ride Details</button>
                </td>
                  </tr>
              </table>
              `;
            allRides.innerHTML += rideDetails;
          });
        }
      }
    });
};
window.onload = getRides('#rides');

// Get details of a ride request
const getRideRequest = (rideId) => {
  let rideDetails = '';
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
  }
  errMessage.setAttribute('style', 'display: none;');
  modal.style.display = 'block';
  modalTable.innerHTML = '';
  span.onclick = () => {
    modal.style.display = 'none';
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (e) =>  {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };
  const url = `https://ride-my-way-server.herokuapp.com/api/v1/users/rides/${rideId}/requests`;
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
      console.log(data);
      if (data.success) {
        errMessage.setAttribute('style', 'display: none;');
        const ride = data.rides[0];
        console.log(ride);
        rideDetails = `
          <table>
            <tr>
              <td> status: </td>
              <td>${ride.status}</td>
            </tr>
          </table>  
            <button class="req-btn" onclick="respondRequest(${rideId}, ${ride.id}, 'accepted')">Accept Request</button>
            <button class="req-btn" onclick="respondRequest(${rideId}, ${ride.id}, 'rejected')">Reject Request</button>
          `;
        modalTable.innerHTML = rideDetails;
      } else {
        errMessage.setAttribute('style', 'display: block;');
        errMessage.innerHTML = '<i class="fa fa-times"></i> No ride request available for this ride.';
      }
    });
};

//  Accept or reject a ride
const respondRequest = (rideId, requestId, status) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
  }
  const url = `https://ride-my-way-server.herokuapp.com/api/v1/users/rides/${rideId}/requests/${requestId}`;
  const reqData = { status };
  console.log(reqData);
  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqData),
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        console.log(data.message);
        swal({
          title: 'Hurray!',
          text: data.message,
          icon: 'success',
        });
      }
    });
};
