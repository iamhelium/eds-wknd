export default function decorate(block) {
  block.innerHTML = '';

  // Create SIGN IN and Language text
  const signInTrigger = document.createElement('p');
  signInTrigger.className = 'signin-trigger';
  signInTrigger.textContent = 'SIGN IN';

  const languageText = document.createElement('p');
  languageText.className = 'language-text';
  languageText.textContent = 'EN-US';

  const navWrapper = document.createElement('div');
  navWrapper.className = 'subnav-wrapper';
  navWrapper.appendChild(signInTrigger);
  navWrapper.appendChild(languageText);

  // ========== LANGUAGE DROPDOWN ==========
  const languageDropdown = document.createElement('div');
  languageDropdown.className = 'language-dropdown';
  languageDropdown.style.display = 'none';

  const languages = [
    {
      code: 'en-us',
      flag: 'https://flagcdn.com/us.svg',
      country: 'United States',
      languages: 'EN-US | ES-US',
    },
    {
      code: 'en-ca',
      flag: 'https://flagcdn.com/ca.svg',
      country: 'Canada',
      languages: 'EN-CA | FR-CA',
    },
    {
      code: 'en-au',
      flag: 'https://flagcdn.com/au.svg',
      country: 'Australia',
      languages: 'EN-AU',
    },
  ];

  languages.forEach((lang) => {
    const item = document.createElement('div');
    item.className = 'language-item';
    item.innerHTML = `
        <img src="${lang.flag}" alt="${lang.country} Flag" class="flag-icon"/>
        <div class="language-info">
          <div class="country-name">${lang.country}</div>
          <div class="language-codes">${lang.languages}</div>
        </div>
      `;
    languageDropdown.appendChild(item);
  });

  // Toggle dropdown on languageText click
  languageText.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Hide dropdown when clicking elsewhere
  document.addEventListener('click', () => {
    languageDropdown.style.display = 'none';
  });

  // ========== MODAL ==========
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.style.display = 'none';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.innerHTML = `
      <span class="modal-close">&times;</span>
      <h3>Sign In</h3>
      <p class="subheading">Welcome back</p>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <a href="#" class="forgot-link">Forgot password?</a>
      <button class="signin-btn">Sign In</button>
      <hr class="signin-separator">
    `;

  modalOverlay.appendChild(modalContent);

  signInTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    modalOverlay.style.display = 'flex';
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });

  modalContent.querySelector('.modal-close').addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });

  // Append all elements to the block
  block.appendChild(navWrapper);
  block.appendChild(languageDropdown);
  block.appendChild(modalOverlay);
}
