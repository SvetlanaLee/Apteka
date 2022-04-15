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

document.querySelector('.allCards')?.addEventListener('click', addToBasket);
