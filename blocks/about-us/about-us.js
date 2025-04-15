/* eslint-disable linebreak-style */
export default async function decorate(block) {
  try {
    const variation = block.dataset.variation || 'our-contributors';
    const graphqlURL = `/graphql/execute.json/eds-wknd/about-us;variation=${variation}`;

    const response = await fetch(graphqlURL);
    const data = await response.json();

    const contributors = data?.data?.aboutUsModelList?.items || [];

    block.replaceChildren();

    contributors.forEach((person) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('contributor');

      // Image
      const image = document.createElement('img');
      // eslint-disable-next-line no-underscore-dangle
      image.src = person.image?._path || 'https://via.placeholder.com/120';
      image.alt = person.name || 'Contributor Image';

      // Name
      const name = document.createElement('h3');
      name.textContent = person.name || 'No Name';

      // Title
      const title = document.createElement('p');
      title.textContent = person.title || 'No Title';

      // Social links
      const linksContainer = document.createElement('div');
      linksContainer.classList.add('links');

      const socialLinks = [
        { label: 'Facebook', url: person.facebookLink },
        { label: 'Twitter', url: person.twitterLink },
        { label: 'Instagram', url: person.instagramLink },
      ];

      socialLinks.forEach(({ label, url }) => {
        if (url) {
          const a = document.createElement('a');
          a.href = url;
          a.textContent = label;
          a.target = '_blank';
          linksContainer.appendChild(a);
        }
      });

      // Combine all
      wrapper.appendChild(image);
      wrapper.appendChild(name);
      wrapper.appendChild(title);
      wrapper.appendChild(linksContainer);

      block.appendChild(wrapper);
    });
  } catch (error) {
    console.error('Error loading contributors:', error);
  }
}
