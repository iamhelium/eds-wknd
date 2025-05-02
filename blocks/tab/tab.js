import {
  decorateBlocks,
  loadBlock,
} from '../../scripts/aem.js';

/**
 * Decorates a single `tab` block and its children.
 * This allows nested EDS blocks (e.g., Teaser, Carousel) inside each tab to initialize correctly.
 *
 * @param {Element} block - The DOM element for this tab block.
 */
export default async function decorate(block) {
  // console.log('TAB :', block);

  // Apply EDS block logic to children
  decorateBlocks(block);

  // Load any nested blocks inside this tab
  await loadBlock(block);
}
