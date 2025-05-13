/* eslint-disable no-console, no-underscore-dangle */
import { createOptimizedPicture } from '../../scripts/aem.js';
import { getAEMDomain } from '../../scripts/helper.js';

function createSocialIcon(link, title, iconClass) {
  return `
    <p class="button-container social-container">
      <a href="${link || '#'}" title="${title}" class="button social-icon social-button">
        <i class="wknd-icon wkndicon-${iconClass}"></i>
      </a>
    </p>
  `;
}

function createProfileBlock({
  imagePath,
  alt = '',
  name,
  title,
  isHTML = false,
  facebookLink,
  twitterLink,
  instagramLink,
}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'profile-wrapper';

  const content = document.createElement('div');
  content.className = 'profile--content';

  const imageDiv = document.createElement('div');
  imageDiv.className = 'profile-image';
  const imageInner = document.createElement('div');
  imageInner.className = 'image';

  if (isHTML && imagePath instanceof HTMLElement) {
    imageInner.append(imagePath);
  } else if (typeof imagePath === 'string') {
    imageInner.append(createOptimizedPicture(imagePath, alt, false));
  }

  imageDiv.append(imageInner);

  const titleDiv = document.createElement('div');
  titleDiv.className = 'profile-title';
  titleDiv.innerHTML = `<h3 class="title">${name}</h3>`;

  const descDiv = document.createElement('div');
  descDiv.className = 'profile-description';
  descDiv.innerHTML = `<${isHTML ? 'p' : 'h5'} class="description">${title}</${isHTML ? 'p' : 'h5'}>`;

  content.append(imageDiv, titleDiv, descDiv);

  const socials = document.createElement('div');
  socials.className = 'profile--socials';
  socials.innerHTML = createSocialIcon(facebookLink, 'Facebook', 'facebook')
    + createSocialIcon(twitterLink, 'Twitter', 'twitter')
    + createSocialIcon(instagramLink, 'Instagram', 'instagram');

  wrapper.append(content, socials);
  return wrapper;
}

export default async function decorate(block) {
  const variation = (block.classList.contains('custom-profile') && 'custom-profile')
    || (block.classList.contains('our-contributors') && 'our-contributors')
    || (block.classList.contains('wknd-guides') && 'wknd-guides');

  if (!variation) return;

  if (variation === 'custom-profile') {
    const divs = [...block.children];
    if (divs.length < 6) return;

    const [picDiv, nameDiv, descDiv, fbDiv, twDiv, igDiv] = divs;

    const profile = {
      imagePath: picDiv.querySelector('picture'),
      name: nameDiv.textContent.trim(),
      title: descDiv.textContent.trim(),
      facebookLink: fbDiv.querySelector('a')?.href,
      twitterLink: twDiv.querySelector('a')?.href,
      instagramLink: igDiv.querySelector('a')?.href,
      isHTML: true,
    };

    block.textContent = '';
    block.append(createProfileBlock(profile));
  } else {
    try {
      const domain = getAEMDomain();
      const endpoint = `/graphql/execute.json/eds-wknd/about-us;variation=${variation}`;
      const url = domain ? `https://${domain}${endpoint}` : endpoint;

      const resp = await fetch(url);
      const json = await resp.json();
      const profiles = json?.data?.aboutUsModelList?.items || [];

      profiles.forEach(({
        image, alt, name, title, facebookLink, twitterLink, instagramLink,
      }) => {
        const profile = {
          imagePath: image._path,
          alt,
          name,
          title,
          facebookLink,
          twitterLink,
          instagramLink,
        };
        block.append(createProfileBlock(profile));
      });
    } catch (e) {
      console.error('Failed to load profiles:', e);
    }
  }
}
