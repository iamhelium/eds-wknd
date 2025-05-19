/* eslint-disable no-lonely-if */
import { loadBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  const isAuthor = block.hasAttribute('data-aue-resource');
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  const columns = [...block.querySelectorAll(':scope > div > div')];

  await Promise.all(columns.map(async (column) => {
    const childNodes = [...column.childNodes];

    const orderedChildren = childNodes.map((node) => {
      if (isAuthor) {
        // AUTHOR: Fragment is already present in DOM
        if (
          node.nodeType === Node.ELEMENT_NODE
          && node.matches('[data-aue-model="fragment"].fragment')
        ) {
          node.loadBlockData = node; // Point directly to the existing fragment
          return node;
        }
      } else {
        // PUBLISH: Detect <p.button-container><a>...</a></p> and build fragment
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
      }

      return node;
    }).filter(Boolean);

    column.textContent = '';
    orderedChildren.forEach((child) => column.appendChild(child));

    await Promise.all(
      orderedChildren
        .filter((el) => el.loadBlockData)
        .map((el) => loadBlock(el.loadBlockData)),
    );

    const picWrapper = column.querySelector('picture')?.closest('div');
    if (picWrapper && picWrapper.children.length === 1) {
      picWrapper.classList.add('columns-img-col');
    }
  }));
}
