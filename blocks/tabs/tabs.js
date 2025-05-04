// import {
//   decorateBlock,
//   decorateBlocks,
//   loadBlock,
// } from '../../scripts/aem.js';

// export default async function decorate(block) {
//   console.log('TABS BLOCK: ', block);

//   // Get all direct children that are tab components
//   // const tabBlocks = [...block.children].filter((child) => child.dataset?.aueModel === 'tab');

//   // console.log(tabBlocks);
//   // tabBlocks.forEach((tab) => {
//   //   // Ensure correct block-like behavior
//   //   tab.classList.add('tab', 'block');
//   //   tab.dataset.blockName = 'tab';
//   //   tab.dataset.blockStatus = 'initialized';

//   //   // Set AEM editing attributes
//   //   tab.dataset.aueType = 'container';
//   //   tab.dataset.aueBehavior = 'component';

//   //   // Add expected wrapping if inner content isn't inside <p>
//   //   const firstChild = tab.querySelector('div');
//   //   if (firstChild && firstChild.childNodes.length && !firstChild.querySelector('p')) {
//   //     const wrapper = document.createElement('p');
//   //     wrapper.append(...firstChild.childNodes);
//   //     firstChild.appendChild(wrapper);
//   //   }

//   //   // Treat tab as a block and decorate its children blocks
//   //   // decorateBlock(tab);
//   //   // decorateBlocks(tab);
//   // });

//   // await Promise.all(tabBlocks.map(loadBlock));
// }

export default async function decorate(block) {
  console.log('TABS BLOCK: ', block); // Log the block for debugging

  // Check if block exists and has a .tabs block class
  if (block && block.classList.contains('tabs') && block.classList.contains('block')) {
    console.log('Found valid tabs block.');

    // Find all tab components within the block
    const tabBlocks = Array.from(block.querySelectorAll('[data-aue-model="tab"]'));

    if (tabBlocks.length === 0) {
      console.warn('No tab blocks found inside the tabs block');
      return;
    }

    console.log('Tab blocks found:', tabBlocks);

    // Create a wrapper for each tab block and append it back to the block
    tabBlocks.forEach((tabBlock) => {
      const wrapperDiv = document.createElement('div');
      wrapperDiv.classList.add('tab-wrapper'); // Optionally add a class to the wrapper

      // eslint-disable-next-line max-len
      wrapperDiv.appendChild(tabBlock.cloneNode(true)); // Clone and move the tab block inside the wrapper
      block.appendChild(wrapperDiv); // Append the wrapper div to the tabs block
    });

    console.log('Tabs block structure updated:', block);
  } else {
    console.warn('No valid tabs block found');
  }
}
