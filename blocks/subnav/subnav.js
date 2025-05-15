export default function decorate(block) {
  block.innerHTML = '';

  const signInTrigger = document.createElement('p');
  signInTrigger.className = 'signin-trigger';
  signInTrigger.textContent = 'SIGN IN';

  const languageText = document.createElement('p');
  languageText.className = 'language-text';
  languageText.textContent = 'EN-US';

  const languageDropdown = document.createElement('div');
  languageDropdown.className = 'language-dropdown';
  languageDropdown.innerHTML = `
<div class="language-option">
<div><img src="us-flag.png" alt="US Flag" class="flag-icon"> UNITED STATES</div>
<div class="language-codes">EN-US | ES-US</div>
</div>
<div class="language-option">
<div><img src="canada-flag.png" alt="Canada Flag" class="flag-icon"> CANADA</div>
<div class="language-codes">EN-CA | FR-CA</div>
</div>
<div class="language-option">
<div><img src="switzerland-flag.png" alt="Swiss Flag" class="flag-icon"> SWITZERLAND</div>
<div class="language-codes">DE-CH | FR-CH | IT-CH</div>
</div>
<div class="language-option">
<div><img src="germany-flag.png" alt="German Flag" class="flag-icon"> GERMANY</div>
<div class="language-codes">DE-DE</div>
</div>
<div class="language-option">
<div><img src="france-flag.png" alt="France Flag" class="flag-icon"> FRANCE</div>
<div class="language-codes">FR-FR</div>
</div>
<div class="language-option">
<div><img src="spain-flag.png" alt="Spain Flag" class="flag-icon"> SPAIN</div>
<div class="language-codes">ES-ES</div>
</div>
<div class="language-option">
<div><img src="italy-flag.png" alt="Italy Flag" class="flag-icon"> ITALY</div>
<div class="language-codes">IT-IT</div>
</div>
`;

  languageDropdown.style.display = 'none';
  // eslint-disable-next-line no-use-before-define
  navWrapper.appendChild(languageDropdown);
  // Toggle dropdown
  languageText.addEventListener('click', () => {
    const isVisible = languageDropdown.style.display === 'block';
    languageDropdown.style.display = isVisible ? 'none' : 'block';
  });
  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!languageText.contains(e.target) && !languageDropdown.contains(e.target)) {
      languageDropdown.style.display = 'none';
    }
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'subnav-wrapper';

  navWrapper.appendChild(signInTrigger);
  navWrapper.appendChild(languageText);

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
