const encryptBtn = document.querySelector('#encrypt-button');
const decryptBtn = document.querySelector('#decrypt-button');
let copyBtn = document.querySelector('#copy-button');
const asideText = document.querySelector('.aside__text');
const inputText = document.querySelector('#input-text');
const asideContent = document.querySelector('.aside__content');
const regex = /^[a-z\s]+$/;
const encryptedArray = ['ai', 'enter', 'imes', 'ober', 'ufat'];
const decryptedArray = ['a', 'e', 'i', 'o', 'u'];

// function to update aside's text and the visibility of the content
function updateAsideText(text, isValid) {
  if (isValid) {
    asideText.textContent = text;
    asideContent.classList.add('hide');
    copyBtn.classList.remove('hide');

    copyBtn.replaceWith(copyBtn.cloneNode(true));
    copyBtn = document.querySelector('#copy-button');

    copyBtn.addEventListener('click', () => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log('text copied');
        })
        .catch((err) => {
          console.error('Error copying text: ', err);
        });
      selectText(asideText);
    });
  } else {
    alert('Solo letras minúsculas y sin acentos');
    asideText.textContent = '';
    inputText.value = '';
    asideContent.classList.remove('hide');
    copyBtn.classList.add('hide');
  }
}

encryptBtn.addEventListener('click', () => {
  const value = inputText.value.trim();
  const isValid = regex.test(value);
  updateAsideText(isValid ? encryptText(value) : '', isValid);
});

decryptBtn.addEventListener('click', () => {
  const value = inputText.value.trim();
  const isValid = regex.test(value);
  updateAsideText(isValid ? decryptText(value) : '', isValid);
});

copyBtn.addEventListener('click', (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('text copied');
    })
    .catch((err) => {
      console.error('Error copying text: ', err);
    });
});

// input event to detect when there is no text, go back to how it was
inputText.addEventListener('input', () => {
  if (inputText.value.trim() === '') {
    asideText.textContent = '';
    asideContent.classList.remove('hide');
    copyBtn.classList.add('hide');
  }
});

function encryptText(value) {
  return value
    .split('')
    .map((x) => {
      const index = decryptedArray.indexOf(x);
      return index !== -1 ? encryptedArray[index] : x;
    })
    .join('');
}

function decryptText(value) {
  let decryptedText = value;
  encryptedArray.forEach((encryptedChar, index) => {
    const decryptedChar = decryptedArray[index];
    const regex = new RegExp(encryptedChar, 'g');
    decryptedText = decryptedText.replace(regex, decryptedChar);
  });
  return decryptedText;
}

function selectText(elemento) {
  const range = document.createRange();
  range.selectNodeContents(elemento);

  const seleccion = window.getSelection();
  seleccion.removeAllRanges();
  seleccion.addRange(range);
}
