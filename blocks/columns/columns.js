import { loadBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  const isAuthor = block.hasAttribute('data-aue-resource');

  // Determine number of columns based on children count
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // Get all column containers
  const columns = isAuthor
    ? [...block.querySelectorAll(':scope > div > div > p[data-aue-filter="column"]')]
    : [...block.querySelectorAll(':scope > div > div')];

  await Promise.all(columns.map(async (column) => {
    const childNodes = isAuthor ? [...column.children] : [...column.childNodes];

    // Normalize children: transform and collect all fragment blocks
    const orderedChildren = isAuthor
      ? childNodes.flatMap((node) => {
        // In author mode, find all fragments inside <p> column wrapper
        if (node.nodeType === Node.ELEMENT_NODE) {
          const fragments = [...node.querySelectorAll('.fragment[data-aue-model="fragment"]')];

          fragments.forEach((fragment) => {
            fragment.classList.add('block');
            fragment.dataset.blockName = 'fragment';
            fragment.dataset.blockStatus = 'initialized';
            fragment.loadBlockData = fragment; // Custom property to mark for loading
          });

          console.log(fragments);
          return fragments;
        }
        return [];
      })
      : childNodes.map((node) => {
        // In published mode, wrap button-container <p> into a fragment structure
        if (
          node.nodeType === Node.ELEMENT_NODE
          && node.matches('p.button-container')
          && node.querySelector('a')
        ) {
          const fragmentWrapper = document.createElement('div');
          fragmentWrapper.className = 'fragment-wrapper';

          const fragmentBlock = document.createElement('div');
          fragmentBlock.className = 'fragment block';
          fragmentBlock.dataset.blockName = 'fragment';
          fragmentBlock.dataset.blockStatus = 'initialized';

          const innerDiv1 = document.createElement('div');
          const innerDiv2 = document.createElement('div');
          innerDiv2.appendChild(node);
          innerDiv1.appendChild(innerDiv2);
          fragmentBlock.appendChild(innerDiv1);
          fragmentWrapper.appendChild(fragmentBlock);

          fragmentWrapper.loadBlockData = fragmentBlock;
          return fragmentWrapper;
        }

        // Return non-fragment nodes as-is
        return node;
      }).filter(Boolean); // Filter out any null/undefined returns

    // Clear the current column DOM and re-insert transformed children
    column.textContent = '';
    orderedChildren.forEach((child) => column.appendChild(child));

    // Load all fragments marked for loading
    await Promise.all(
      orderedChildren
        .filter((el) => el.loadBlockData)
        .map((el) => loadBlock(el.loadBlockData)),
    );

    // If column contains only an image, apply styling
    const picWrapper = column.querySelector('picture')?.closest('div');
    if (picWrapper && picWrapper.children.length === 1) {
      picWrapper.classList.add('columns-img-col');
    }
  }));
}
