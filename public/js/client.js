// async function getPay(event) {
//   console.log('hi');
//   event.preventDefault();
//   const data = {
//     adress: event.target.adress.value,
//     tel: event.target.tel.value,
//     total: event.target.dataset.summa,
//   };
//   console.log(data);
//   await fetch('/order/status', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
// }

async function addToBasket(event) {
  event.preventDefault();
  if (event.target.classList.contains('jsBtn')) {
    console.log('click', event.target.dataset.id);

    const id = {
      id: event.target.dataset.id,
    };

    await fetch('/addToBasket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
  }
}

async function getOrder(event) {
  event.preventDefault();
  if (event.target.classList.contains('orderBtn')) {
    console.log(event.target.dataset.total);
    const total = {
      total: event.target.dataset.total,
    };

    const response = await fetch('/addToOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(total),
    });

    window.location.href = '/order';
    // const resHTML = await response.text();
    // console.log(resHTML);
    // document.querySelector('.js-order').innerHTML = resHTML;
  }
}

// document.payOrder?.addEventListener('click', getPay);

document.querySelector('.allCards')?.addEventListener('click', addToBasket);

document.querySelector('.js-order')?.addEventListener('click', getOrder);
