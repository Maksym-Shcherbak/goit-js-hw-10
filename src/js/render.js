export default function fillSelectBreeds(arr) {
  return arr
    .map(
      item => `<option value="${item.id}" class="breed">${item.name}</option>`
    )
    .join('');
}
