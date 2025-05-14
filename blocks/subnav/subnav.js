export default function decorate(block) {
  const subnavWrapper = document.createElement('div');
  subnavWrapper.className = 'subnav-wrapper';

  // Read the text from the model (Universal Editor)
  const linkText = block.querySelector('div')?.textContent?.trim() || 'Sign In';

  const signInLink = document.createElement('p');
  signInLink.className = 'sign-in-link';
  signInLink.textContent = linkText;

  // Create sign-in popup container
  const popup = document.createElement('div');
  popup.className = 'sign-in-popup hidden';
  popup.innerHTML = `
    <h2>Sign In</h2>
    <p>Welcome Back</p>
    <input type="text" placeholder="Username" />
    <input type="password" placeholder="Password" />
    <a href="#">Forgot your password?</a>
    <button>SIGN IN</button>
  `;

  // Append the sign-in link and popup to wrapper
  subnavWrapper.appendChild(signInLink);
  subnavWrapper.appendChild(popup);

  // Add click toggle
  signInLink.addEventListener('click', () => {
    popup.classList.toggle('hidden');
  });

  // Clear block and add wrapper
  block.textContent = '';
  block.appendChild(subnavWrapper);
}
