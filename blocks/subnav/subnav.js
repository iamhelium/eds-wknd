// subnav.js
export default function decorate(block) {
  block.innerHTML = ''; // Clear the block first
  const wrapper = document.createElement('div');
  wrapper.classList.add('signin-card-wrapper');
  const signInTrigger = document.createElement('p');
  signInTrigger.className = 'signin-trigger';
  signInTrigger.textContent = 'SIGN IN';
  const card = document.createElement('div');
  card.className = 'signin-card';
  card.style.display = 'none'; // hidden by default
  card.innerHTML = `
      <h3>Sign In</h3>
      <p class="subheading">Welcome back</p>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <a href="#" class="forgot-link">Forgot password?</a>
      <button class="signin-btn">Sign In </button>
    `;
  signInTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = card.style.display === 'block';
    card.style.display = isVisible ? 'none' : 'block';
  });
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      card.style.display = 'none';
    }
  });
  wrapper.appendChild(signInTrigger);
  wrapper.appendChild(card);
  block.appendChild(wrapper);
}
