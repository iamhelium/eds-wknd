/* eslint-disable linebreak-style */
export default async function decorate(block) {
  try {
    const response = await fetch('graphql/execute.json/eds-wknd/about-us;variation=our-contributors');
    const data = await response.json();

    const items = data?.data?.aboutUsModelList?.items || [];

    block.replaceChildren();

    const dropdown = document.createElement('select');
    dropdown.classList.add('custom-dropdown');

    items.forEach((item) => {
      const option = document.createElement('option');
      option.textContent = item.name ?? '';
      option.value = item.title ?? '';
      dropdown.appendChild(option);
    });

    const titleHeading = document.createElement('h4');
    titleHeading.classList.add('title-heading');
    titleHeading.textContent = 'Select a name to see the title';

    dropdown.addEventListener('change', (event) => {
      titleHeading.textContent = event.target.value || 'No title available';
    });

    block.replaceChildren(dropdown);
    block.appendChild(titleHeading);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
