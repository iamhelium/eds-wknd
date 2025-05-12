/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-mixed-operators */

import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const variation =
    block.classList.contains('custom-profile') && 'custom-profile' ||
    block.classList.contains('our-contributors') && 'our-contributors' ||
    block.classList.contains('wknd-guides') && 'wknd-guides';

  if (!variation) return;

  if (variation === 'custom-profile') {
    // Handle inline HTML structure
    const divs = [...block.children];
    if (divs.length < 6) return;

    const picture = divs[0].querySelector('picture');
    const name = divs[1].textContent.trim();
    const description = divs[2].textContent.trim();
    const facebookLink = divs[3].querySelector('a')?.getAttribute('href') || '#';
    const twitterLink = divs[4].querySelector('a')?.getAttribute('href') || '#';
    const instagramLink = divs[5].querySelector('a')?.getAttribute('href') || '#';

    block.textContent = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'profile-wrapper';

    const content = document.createElement('div');
    content.className = 'profile--content';

    const imageDiv = document.createElement('div');
    imageDiv.className = 'profile-image';
    const imageInner = document.createElement('div');
    imageInner.className = 'image';
    if (picture) imageInner.append(picture);
    imageDiv.append(imageInner);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'profile-title';
    titleDiv.innerHTML = `<h3 class="title">${name}</h3>`;

    const descDiv = document.createElement('div');
    descDiv.className = 'profile-description';
    descDiv.innerHTML = `<p class="description">${description}</p>`;

    content.append(imageDiv, titleDiv, descDiv);

    const socials = document.createElement('div');
    socials.className = 'profile--socials';

    socials.innerHTML = `
      <p class="button-container social-container">
        <a href="${facebookLink}" title="Facebook" class="button social-icon social-button">
          <i class="wknd-icon wkndicon-facebook"></i>
        </a>
      </p>
      <p class="button-container social-container">
        <a href="${twitterLink}" title="Twitter" class="button social-icon social-button">
          <i class="wknd-icon wkndicon-twitter"></i>
        </a>
      </p>
      <p class="button-container social-container">
        <a href="${instagramLink}" title="Instagram" class="button social-icon social-button">
          <i class="wknd-icon wkndicon-instagram"></i>
        </a>
      </p>
    `;

    wrapper.append(content, socials);
    block.append(wrapper);
  } else {
    // Fetch GraphQL data
    try {
      const resp = await fetch(`/graphql/execute.json/eds-wknd/about-us;variation=${variation}`);
      const json = await resp.json();
      const profiles = json?.data?.aboutUsModelList?.items || [];

      block.textContent = '';

      profiles.forEach((profile) => {
        const {
          image,
          alt,
          name,
          title,
          facebookLink = '#',
          twitterLink = '#',
          instagramLink = '#',
        } = profile;

        const wrapper = document.createElement('div');
        wrapper.className = 'profile-wrapper';

        const content = document.createElement('div');
        content.className = 'profile--content';

        const imageDiv = document.createElement('div');
        imageDiv.className = 'profile-image';
        const imageInner = document.createElement('div');
        imageInner.className = 'image';
        imageInner.append(createOptimizedPicture(image._path, alt || '', false));
        imageDiv.append(imageInner);

        const titleDiv = document.createElement('div');
        titleDiv.className = 'profile-title';
        titleDiv.innerHTML = `<h3 class="title">${name}</h3>`;

        const descDiv = document.createElement('div');
        descDiv.className = 'profile-description';
        descDiv.innerHTML = `<p class="description">${title}</p>`;

        content.append(imageDiv, titleDiv, descDiv);

        const socials = document.createElement('div');
        socials.className = 'profile--socials';

        socials.innerHTML = `
          <p class="button-container social-container">
            <a href="${facebookLink}" title="Facebook" class="button social-icon social-button">
              <i class="wknd-icon wkndicon-facebook"></i>
            </a>
          </p>
          <p class="button-container social-container">
            <a href="${twitterLink}" title="Twitter" class="button social-icon social-button">
              <i class="wknd-icon wkndicon-twitter"></i>
            </a>
          </p>
          <p class="button-container social-container">
            <a href="${instagramLink}" title="Instagram" class="button social-icon social-button">
              <i class="wknd-icon wkndicon-instagram"></i>
            </a>
          </p>
        `;

        wrapper.append(content, socials);
        block.append(wrapper);
      });
    } catch (e) {
      console.error('Failed to load profiles:', e);
    }
  }
}
