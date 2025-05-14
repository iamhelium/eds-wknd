export default function decorate(block) {
  // Create the wrapper element for the subnav
  const subnavWrapper = document.createElement('div');
  subnavWrapper.classList.add('subnav-wrapper');
  // Get the Sign In and Sign Out text from the block object (populated from JSON)
  const signInText = block.linkText || 'Sign In';
  const signOutText = block.buttonText || 'Sign Out';
  // Add the Sign In and Sign Out elements
  subnavWrapper.innerHTML = `
      <div>
        <div class="sign-in-out" id="sign-in">${signInText}</div>
        <div class="sign-in-out" id="sign-out">${signOutText}</div>
      </div>
      <div class="header-markets">
        <span class="icon icon-flag-us"></span>EN-US
        <span class="header-chevron-down" id="langNavToggle"></span>
      </div>
    `;
  block.prepend(subnavWrapper);
  // Create the modal (popup card) for sign-in
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close" id="modal-close">&times;</span>
        <h2>Welcome to Sign In</h2>
        <p>Please enter your details to sign in.</p>
        <!-- Add additional content like form fields here if needed -->
      </div>
    `;
  document.body.appendChild(modal);
  // Show the modal when Sign In is clicked
  document.getElementById('sign-in').addEventListener('click', () => {
    modal.style.display = 'flex';// Display the modal
  });
  // Hide the modal when the close button is clicked
  document.getElementById('modal-close').addEventListener('click', () => {
    modal.style.display = 'none';// Hide the modal
  });
  // Hide the modal if clicked outside of the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';// Hide the modal if clicked outside
    }
  });
  // Handle language toggle dropdown visibility
  const langNavToggle = document.getElementById('langNavToggle');
  const headerMarkets = document.querySelector('.header-markets');
  langNavToggle.addEventListener('click', () => {
    // Toggle the language selection dropdown
    const langDropdown = document.createElement('div');
    langDropdown.classList.add('lang-dropdown');
    langDropdown.innerHTML = `
        <ul>
          <li><a href="#">EN-US</a></li>
          <li><a href="#">ES-ES</a></li>
          <li><a href="#">FR-FR</a></li>
        </ul>
      `;
    headerMarkets.appendChild(langDropdown);
    // Close dropdown when a language is selected
    langDropdown.addEventListener('click', (e) => {
      const selectedLang = e.target.textContent;
      langNavToggle.innerHTML = `${selectedLang}<span class="header-chevron-down"></span>`; // Update language displayed
      langDropdown.remove(); // Remove dropdown after selection
    });
    // Close dropdown if clicked outside
    window.addEventListener('click', (e) => {
      if (!headerMarkets.contains(e.target)) {
        langDropdown.remove();
      }
    });
  });
}
