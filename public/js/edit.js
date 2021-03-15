const formUpd = document.querySelector('.form-update');
// console.log(formUpd);
formUpd.addEventListener('submit', async (e) => {
  e.preventDefault();

  const { chNumber, chPass, chInfo, chPrice, 
          chBooked, chOccupied, chActive } = e.target;

  const spaceId = e.target.getAttribute('data-id');
// console.log();
  const response = await fetch(`/spaces/${spaceId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id: spaceId, number: chNumber.value, 
      pass: chPass.value, info: chInfo.value, price: chPrice.value, 
      booked: chBooked.value, occupied: chOccupied.value, active: chActive.value }),
  });

  const result = await response.json();
  // console.log('result', result);

  const newDiv = document.createElement('div');
  const div = document.querySelector('#edit-form');
  div.append(newDiv);

  newDiv.innerText = result.mes;

  // if (result.success) {
  //   divToDel.remove();
  // } else {
  //   alert(result.message);
  // }

})
