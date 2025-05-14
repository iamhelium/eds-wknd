export default function decorate(block) {
  block.innerHTML = '';

  const signInTrigger = document.createElement('p');
  signInTrigger.className = 'signin-trigger';
  signInTrigger.textContent = 'SIGN IN';

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

  block.appendChild(signInTrigger);
  block.appendChild(modalOverlay);
}
