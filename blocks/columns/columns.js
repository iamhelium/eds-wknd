import { loadBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  const columns = [...block.querySelectorAll(':scope > div > div')];

  console.log(columns);

  await Promise.all(columns.map(async (column) => {
    const childNodes = [...column.childNodes];

    // Map over child nodes and identify fragment blocks button containers
    const orderedChildren = childNodes
      .map((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE
          && node.matches('p.button-container')
          && node.querySelector('a')
        ) {
          // === Construct fragment block to initialize with loadBlock ===
          const fragmentWrapper = document.createElement('div');
          fragmentWrapper.className = 'fragment-wrapper';

          const fragmentBlock = document.createElement('div');
          fragmentBlock.className = 'fragment block';
          fragmentBlock.dataset.blockName = 'fragment';

          // Nested div structure for proper placement
          const innerDiv1 = document.createElement('div');
          const innerDiv2 = document.createElement('div');

          innerDiv2.appendChild(node); // move <p> into structure
          innerDiv1.appendChild(innerDiv2);
          fragmentBlock.appendChild(innerDiv1);
          fragmentWrapper.appendChild(fragmentBlock);

          // Defer loadBlock until after DOM is rebuilt
          fragmentWrapper.loadBlockData = fragmentBlock;

          return fragmentWrapper;
        }

        // Return the node if it does not match the condition
        return node;
      })
      .filter(Boolean); // Remove any null or undefined entries

    // Clear existing content in the column and re-append children in order
    column.textContent = ''; // Clear without breaking event listeners
    orderedChildren.forEach((child) => column.appendChild(child));

    // Load fragment blocks that need to be processed
    await Promise.all(
      orderedChildren
        .filter((el) => el.loadBlockData) // Only process elements that need loading
        .map((el) => loadBlock(el.loadBlockData)), // Load block asynchronously
    );

    // Image column styling: Apply 'columns-img-col' class if there is a single picture
    const picWrapper = column.querySelector('picture')?.closest('div');
    if (picWrapper && picWrapper.children.length === 1) {
      picWrapper.classList.add('columns-img-col');
    }
  }));
}
