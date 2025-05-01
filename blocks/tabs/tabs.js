import {
  decorateBlock,
  decorateBlocks,
  loadBlock,
} from '../../scripts/aem.js';

export default async function decorate(block) {
  console.log('TABS BLOCK: ', block);

  // Get all direct children that are tab components
  const tabBlocks = [...block.children].filter((child) => child.dataset?.aueModel === 'tab');

  tabBlocks.forEach((tab) => {
    // Ensure correct block-like behavior
    tab.classList.add('tab', 'block');
    tab.dataset.blockName = 'tab';
    tab.dataset.blockStatus = 'initialized';

    // Set AEM editing attributes
    tab.dataset.aueType = 'container';
    tab.dataset.aueBehavior = 'component';

    // Add expected wrapping if inner content isn't inside <p>
    const firstChild = tab.querySelector('div');
    if (firstChild && firstChild.childNodes.length && !firstChild.querySelector('p')) {
      const wrapper = document.createElement('p');
      wrapper.append(...firstChild.childNodes);
      firstChild.appendChild(wrapper);
    }

    // Treat tab as a block and decorate its children blocks
    decorateBlock(tab);
    decorateBlocks(tab);
  });

  await Promise.all(tabBlocks.map(loadBlock));
}
