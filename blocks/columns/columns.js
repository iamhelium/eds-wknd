/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
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
        // Check if this node or any child contains a .fragment block
        const fragment = node.nodeType === Node.ELEMENT_NODE
          ? node.matches('.fragment[data-aue-model="fragment"]')
            ? node
            : node.querySelector?.('.fragment[data-aue-model="fragment"]')
          : null;

        if (fragment) {
          // Normalize fragment DOM to match expected structure
          fragment.classList.add('block');
          fragment.dataset.blockName = 'fragment';
          fragment.dataset.blockStatus = 'initialized';
          fragment.loadBlockData = fragment;
          return fragment;
        }
      } else {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.matches('p.button-container') &&
          node.querySelector('a')
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

      // Default return
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
