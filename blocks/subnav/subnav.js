export default function decorate(block) {
  const subnavWrapper = document.createElement('div');
  subnavWrapper.classList.add('subnav-wrapper');
  const signInText = block.linkText || 'Sign In';
  const signOutText = block.buttonText || 'Sign Out';
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
  block.prepend(subnavWrapper);

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close" id="modal-close">&times;</span>
        <h2>Welcome to Sign In</h2>
        <p>Please enter your details to sign in.</p>
        <!-- You can add form fields or any other content here -->
      </div>
    `;
  document.body.appendChild(modal);

  document.getElementById('sign-in').addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  document.getElementById('modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}
