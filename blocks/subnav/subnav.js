export default function decorate(block) {
  block.innerHTML = '';

  // Sign In trigger
  const signInTrigger = document.createElement('p');
  signInTrigger.className = 'signin-trigger';
  signInTrigger.textContent = 'SIGN IN';

  // Language selector container
  const languageText = document.createElement('p');
  languageText.className = 'language-text';
  languageText.setAttribute('tabindex', '0'); // make it focusable for accessibility

  // Add flag + country + code to languageText
  const flagImg = document.createElement('img');
  flagImg.className = 'language-flag';
  flagImg.src = 'https://flagcdn.com/us.svg'; // US flag URL (can be changed)
  flagImg.alt = 'US Flag';

  const countryName = document.createElement('span');
  countryName.textContent = 'United States';

  const langCode = document.createElement('span');
  langCode.textContent = 'EN-US';
  langCode.style.marginLeft = '6px';
  langCode.style.fontWeight = 'bold';

  languageText.appendChild(flagImg);
  languageText.appendChild(countryName);
  languageText.appendChild(langCode);

  // Dropdown list for other languages
  const languageDropdown = document.createElement('ul');
  languageDropdown.className = 'language-dropdown';

  const languages = [
    { country: 'United States', code: 'EN-US', flag: 'https://flagcdn.com/us.svg' },
    { country: 'Germany', code: 'DE-DE', flag: 'https://flagcdn.com/de.svg' },
    { country: 'France', code: 'FR-FR', flag: 'https://flagcdn.com/fr.svg' },
    { country: 'Japan', code: 'JA-JP', flag: 'https://flagcdn.com/jp.svg' },
  ];

  languages.forEach(({ country, code, flag }) => {
    const li = document.createElement('li');
    const liFlag = document.createElement('img');
    liFlag.className = 'language-flag';
    liFlag.src = flag;
    liFlag.alt = `${country} Flag`;

    li.appendChild(liFlag);
    li.appendChild(document.createTextNode(`${country} ${code}`));

    li.addEventListener('click', () => {
      // Update the main language display
      flagImg.src = flag;
      flagImg.alt = `${country} Flag`;
      countryName.textContent = country;
      langCode.textContent = code;

      languageDropdown.classList.remove('show');
    });

    languageDropdown.appendChild(li);
  });

  // Toggle dropdown on click
  languageText.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('show');
  });

  // Close dropdown if clicked outside
  document.addEventListener('click', () => {
    languageDropdown.classList.remove('show');
  });

  // Keyboard accessibility (close on Escape key)
  languageText.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      languageDropdown.classList.remove('show');
      languageText.blur();
    }
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'subnav-wrapper';

  navWrapper.appendChild(signInTrigger);
  navWrapper.appendChild(languageText);
  languageText.appendChild(languageDropdown);

  // Modal for sign in
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

  block.appendChild(navWrapper);
  block.appendChild(modalOverlay);
}
