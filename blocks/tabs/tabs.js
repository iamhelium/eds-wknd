import {
  decorateBlock,
  loadBlock,
} from '../../scripts/aem.js';

export default async function decorate(block) {
  console.log('TAB BLOCK: ', block);
  // Select all direct children that are "tab" components inside the tabs block
  const tabBlocks = [...block.children].filter((child) => child.dataset?.aueModel === 'tab');

  tabBlocks.forEach((tab) => {
    // Add necessary classes and dataset for block behavior
    tab.classList.add('tab', 'block');
    tab.dataset.blockName = 'tab';
    tab.dataset.blockStatus = 'initialized';

    // Wrap inline text and buttons inside <p> if needed
    // This simulates block preparation from decorateBlock
    const firstChild = tab.querySelector('div');
    if (firstChild && firstChild.childNodes.length && !firstChild.querySelector('p')) {
      const wrapper = document.createElement('p');
      wrapper.append(...firstChild.childNodes);
      firstChild.appendChild(wrapper);
    }

    // Now decorate this nested tab as a block
    decorateBlock(tab);
  });

  // Load each tab block asynchronously
  await Promise.all(tabBlocks.map(loadBlock));
}
