export default function decorate(block) {
  const isAuthorMode = block.hasAttribute('data-aue-resource');
  const dl = document.createElement('dl');
  dl.classList.add('cmp-trip-detail');

  [...block.children].forEach((item) => {
    const labelDiv = item.children[0];
    const valueDiv = item.children[1];

    const labelText = labelDiv?.textContent.trim();
    const valueText = valueDiv?.textContent.trim();

    // Skip if no real content and not in author mode
    const hasContent = labelText || valueText;
    if (hasContent || isAuthorMode) {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cmp-trip-detail__item');

      // Preserve authoring attributes if in author mode
      if (isAuthorMode) {
        [...item.attributes].forEach((attr) => {
          if (attr.name.startsWith('data-aue')) {
            itemDiv.setAttribute(attr.name, attr.value);
          }
        });
      }

      const dt = document.createElement('dt');
      dt.classList.add('cmp-trip-detail__label');
      dt.textContent = labelText || '';

      const dd = document.createElement('dd');
      dd.classList.add('cmp-trip-detail__value');
      dd.textContent = valueText || '';

      itemDiv.append(dt, dd);
      dl.appendChild(itemDiv);
    }
  });

  block.innerHTML = '';
  block.appendChild(dl);
}
