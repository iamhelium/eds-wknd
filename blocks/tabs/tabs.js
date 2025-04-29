export default function decorate(block) {
  const tabDiv = block.querySelector(':scope > div');

  if (tabDiv) {
    tabDiv.setAttribute('data-aue-type', 'container');
    tabDiv.setAttribute('data-aue-behavior', 'component');
    tabDiv.setAttribute('data-block-name', 'tab');
    tabDiv.setAttribute('data-block-status', 'loaded');
    tabDiv.className = 'tab block';
  }
}
