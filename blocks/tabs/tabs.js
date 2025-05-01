import {
  decorateBlock,
  loadBlock,
} from '../../scripts/aem.js';

export default async function decorate(block) {
  console.log('TAB BLOCK: ', block);

  // Get all direct children that are tab components
  const tabBlocks = [...block.children].filter((child) => child.dataset?.aueModel === 'tab');

  tabBlocks.forEach((tab) => {
    // Ensure correct block-like behavior
    tab.classList.add('tab', 'block');
    tab.dataset.blockName = 'tab';
    tab.dataset.blockStatus = 'initialized';

    // Ensure data-aue-type includes "container"
    if (!tab.dataset.aueType?.includes('container')) {
      tab.dataset.aueType = 'container';
    }

    // If data-aue-type was already "component", we append both
    if (!tab.dataset.aueType.includes('component')) {
      tab.dataset.aueType += ' component';
    }

    // Add expected wrapping if inner content isn't inside <p>
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
