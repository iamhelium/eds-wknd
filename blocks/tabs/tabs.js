// import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log(block);
  // const tabDiv = block.querySelector(':scope > div');

  // if (!tabDiv) return;

  // Clone node to avoid issues during attribute overwrite
  // const updatedDiv = tabDiv.cloneNode(true);

  // updatedDiv.className = 'tab block';
  // updatedDiv.dataset.aueType = 'container';
  // updatedDiv.dataset.aueBehavior = 'component';
  // updatedDiv.dataset.blockName = 'tab';
  // updatedDiv.dataset.blockStatus = 'loaded';

  // Move AEM instrumentation attributes from old to new div
  // moveInstrumentation(tabDiv, updatedDiv);

  // block.replaceChild(updatedDiv, tabDiv);
}
