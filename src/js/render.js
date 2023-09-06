export function fillSelectBreeds(arr, container) {
  const markup = arr
    .map(
      item => `<option value="${item.id}" class="breed">${item.name}</option>`
    )
    .join('');
  container.insertAdjacentHTML('afterbegin', markup);
}

export function renderingCatInfo(link, name, textAbout, list, container) {
  container.innerHTML = `<div class="cat-info-thumb"><img src='${link}' class='cat-info-img' alt='cat' width='320'></div><div class='cat-info-container'><h2 class='cat-info-title'>${name}</h2><p class='cat-info-desc'>${textAbout}</p><p class='cat-info-temp'><span class='cat-info-temp-span'>Temperament:</span> ${list}</p></div>`;
}
