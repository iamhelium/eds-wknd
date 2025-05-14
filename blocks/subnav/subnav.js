export default function decorate(block) {
  // Create the wrapper element for the subnav
  const subnavWrapper = document.createElement('div');
  subnavWrapper.classList.add('subnav-wrapper');
  // Get the Sign In and Sign Out text from the block object (populated from JSON)
  const signInText = block.linkText || 'Sign In'; // Fallback text if not provided
  const signOutText = block.buttonText || 'Sign Out'; // Fallback text if not provided
  // Add the Sign In and Sign Out elements (using the block data)
  subnavWrapper.innerHTML = `
      <div>
        <div class="sign-in-out" id="sign-in">${signInText}</div>
        <div class="sign-in-out" id="sign-out">${signOutText}</div>
      </div>
      <div class="header-markets">
        <span class="icon icon-flag-us"></span>EN-US
        <span class="header-chevron-down"></span>
      </div>
    `;
  // Prepend the subnav wrapper to the block element
  block.prepend(subnavWrapper);
  // Create the modal (popup card)
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
    modal.style.display = 'flex'; // Display the modal
  });
  // Hide the modal when the close button is clicked
  document.getElementById('modal-close').addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal
  });

  // Hide the modal if clicked outside of the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none'; // Hide the modal if clicked outside
    }
  });
}
