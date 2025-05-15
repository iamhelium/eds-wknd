export default function decorate(block) {
  block.innerHTML = '';

  const signInTrigger = document.createElement('p');
  signInTrigger.className = 'signin-trigger';
  signInTrigger.textContent = 'SIGN IN';

  // Language selector wrapper (flag + code + dropdown arrow)
  const languageWrapper = document.createElement('div');
  languageWrapper.className = 'language-wrapper';

  // Flag image
  const flagImg = document.createElement('img');
  flagImg.className = 'flag-icon';
  flagImg.src = 'https://flagcdn.com/us.svg';// US flag SVG from flagcdn
  flagImg.alt = 'US Flag';

  // Language code text
  const langCode = document.createElement('span');
  langCode.className = 'language-code';
  langCode.textContent = 'EN-US';

  // Dropdown arrow
  const dropdownArrow = document.createElement('span');
  dropdownArrow.className = 'dropdown-arrow';
  dropdownArrow.textContent = '▼';

  languageWrapper.appendChild(flagImg);
  languageWrapper.appendChild(langCode);
  languageWrapper.appendChild(dropdownArrow);

  // Subnav wrapper holding sign in and language selector
  const navWrapper = document.createElement('div');
  navWrapper.className = 'subnav-wrapper';

  navWrapper.appendChild(signInTrigger);
  navWrapper.appendChild(languageWrapper);

  // Dropdown card for languages
  const languageDropdown = document.createElement('div');
  languageDropdown.className = 'language-dropdown';
  languageDropdown.style.display = 'none';

  // Language list data
  const languages = [
    { country: 'United States', code: 'EN-US', flag: 'https://flagcdn.com/us.svg' },
    { country: 'France', code: 'FR-FR', flag: 'https://flagcdn.com/fr.svg' },
    { country: 'Germany', code: 'DE-DE', flag: 'https://flagcdn.com/de.svg' },
    { country: 'Spain', code: 'ES-ES', flag: 'https://flagcdn.com/es.svg' },
  ];

  // Build language list items
  languages.forEach(({ country, code, flag }) => {
    const item = document.createElement('div');
    item.className = 'language-item';

    const itemFlag = document.createElement('img');
    itemFlag.className = 'flag-icon';
    itemFlag.src = flag;
    itemFlag.alt = `${country} Flag`;

    const itemText = document.createElement('div');
    itemText.className = 'language-text';

    const countryName = document.createElement('div');
    countryName.className = 'country-name';
    countryName.textContent = country;

    const langCodeItem = document.createElement('div');
    langCodeItem.className = 'lang-code-item';
    langCodeItem.textContent = code;

    itemText.appendChild(countryName);
    itemText.appendChild(langCodeItem);

    item.appendChild(itemFlag);
    item.appendChild(itemText);

    // Optional: click event to select language
    item.addEventListener('click', () => {
      flagImg.src = flag;
      langCode.textContent = code;
      languageDropdown.style.display = 'none';
    });

    languageDropdown.appendChild(item);
  });

  // Toggle dropdown on clicking languageWrapper
  languageWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.style.display = languageDropdown.style.display === 'flex' ? 'none' : 'flex';
  });

  // Close dropdown clicking outside
  document.addEventListener('click', () => {
    languageDropdown.style.display = 'none';
  });

  block.appendChild(navWrapper);
  block.appendChild(languageDropdown);
}
