const bttns = document.querySelectorAll('.book');
// console.log(bttns);

bttns.forEach((btn => {
  btn.addEventListener('click', async (e) => {
    console.log(btn);
    e.preventDefault();

    const itemId = e.target.getAttribute('data-id');

    // console.log();
    const response = await fetch(`/spaces/book/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        booked: true
      }),
    });

    const result = await response.json();
    // console.log('result', result);

    const area = document.querySelector(`.area-${itemId}`);
    // area.classList.add('area');
    // const element = document.querySelector('.element');
    // btn.append(newDiv);

    area.innerText = result.mes;

    // if (result.success) {
    //   divToDel.remove();
    // } else {
    //   alert(result.message);
    // }

  })
}))

