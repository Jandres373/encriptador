document.addEventListener('DOMContentLoaded', () => {
  const textSpace = document.querySelector('#text_space textarea');
  const encryptBtn = document.querySelector('#encrypt_btn');
  const decryptBtn = document.querySelector('#decrypt_btn');
  const copyBtn = document.querySelector('#copy_btn');
  const showSpace = document.querySelector('#show_space');

  const encryptionKey = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
  };

  const decryptionKey = Object.fromEntries(
    Object.entries(encryptionKey).map(([k, v]) => [v, k])
  );

  function isValidText(text) {
    return /^[a-z\s]+$/.test(text);
  }

  function encryptText(text) {
    return text.split('').map(char => encryptionKey[char] || char).join('');
  }

  function decryptText(text) {
    let decryptedText = text;
    for (let [key, value] of Object.entries(decryptionKey)) {
      decryptedText = decryptedText.replace(new RegExp(key, 'g'), value);
    }
    return decryptedText;
  }

  function updateCopyButtonVisibility() {
    copyBtn.style.display = showSpace.textContent ? 'block' : 'none';
  }

  encryptBtn.addEventListener('click', () => {
    const text = textSpace.value.trim();
    if (!isValidText(text)) {
      alert('Por favor, ingrese solo letras minúsculas y sin acentos ni caracteres especiales.');
      return;
    }
    const encryptedText = encryptText(text);
    showSpace.textContent = encryptedText;
    updateCopyButtonVisibility();
  });

  decryptBtn.addEventListener('click', () => {
    const text = textSpace.value.trim();
    if (!isValidText(text)) {
      alert('Por favor, ingrese solo letras minúsculas y sin acentos ni caracteres especiales.');
      return;
    }
    const decryptedText = decryptText(text);
    showSpace.textContent = decryptedText;
    updateCopyButtonVisibility();
  });

  copyBtn.addEventListener('click', () => {
    const textToCopy = showSpace.textContent;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Texto copiado al portapapeles.');
      }).catch(err => {
        console.error('Error al copiar el texto: ', err);
      });
    }
  });
});