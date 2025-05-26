import { loadBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Check if we are in author mode
  const isAuthor = block.hasAttribute('data-aue-resource');

  // Determine number of columns and add a class like "columns-3-cols"
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // Select columns differently for author and publish mode
  const columns = isAuthor
    ? [...block.querySelectorAll(':scope > div > div > p[data-aue-filter="column"]')]
    : [...block.querySelectorAll(':scope > div > div')];

  await Promise.all(columns.map(async (column) => {
    // Get child nodes differently for author vs publish mode
    const childNodes = isAuthor ? [...column.children] : [...column.childNodes];

    const orderedChildren = childNodes.map((node) => {
      if (isAuthor) {
        // In author mode, find fragment either on node itself or inside node
        let fragment = null;

        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches('.fragment[data-aue-model="fragment"]')) {
            fragment = node;
          } else {
            fragment = node.querySelector?.('.fragment[data-aue-model="fragment"]') || null;
          }
        }

        if (fragment) {
          fragment.classList.add('block');
          fragment.dataset.blockName = 'fragment';
          fragment.dataset.blockStatus = 'initialized';
          fragment.loadBlockData = fragment; // Mark fragment for block loading
          return fragment;
        }

        // Return node as is if no fragment found
        return node;
      }

      // Publish mode: wrap <p class="button-container"> with fragment block structure
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

        // Nest original node inside two div wrappers for styling and structure
        const innerDiv1 = document.createElement('div');
        const innerDiv2 = document.createElement('div');
        innerDiv2.appendChild(node);
        innerDiv1.appendChild(innerDiv2);
        fragmentBlock.appendChild(innerDiv1);
        fragmentWrapper.appendChild(fragmentBlock);

        fragmentWrapper.loadBlockData = fragmentBlock; // Flag for loading
        return fragmentWrapper;
      }

      // Return node as is if no special conditions met
      return node;
    }).filter(Boolean);

    // Clear existing column content and append processed children
    column.textContent = '';
    orderedChildren.forEach((child) => column.appendChild(child));

    // Load all fragment blocks flagged for loading
    await Promise.all(
      orderedChildren
        .filter((el) => el.loadBlockData)
        .map((el) => loadBlock(el.loadBlockData)),
    );

    // Add styling class if the column contains exactly one picture element
    const picWrapper = column.querySelector('picture')?.closest('div');
    if (picWrapper && picWrapper.children.length === 1) {
      picWrapper.classList.add('columns-img-col');
    }
  }));
}
