export default function decorateTripDetail(block) {
  const dl = document.createElement('dl');
  dl.classList.add('cmp-trip-detail');

  // Loop through each direct child of the block
  [...block.children].forEach((item) => {
    const labelDiv = item.children[0];
    const valueDiv = item.children[1];

    if (labelDiv && valueDiv) {
      const labelText = labelDiv.textContent.trim();
      const valueText = valueDiv.textContent.trim();

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cmp-trip-detail__item');

      const dt = document.createElement('dt');
      dt.classList.add('cmp-trip-detail__label');
      dt.textContent = labelText;

      const dd = document.createElement('dd');
      dd.classList.add('cmp-trip-detail__value');
      dd.textContent = valueText;

      itemDiv.append(dt, dd);
      dl.appendChild(itemDiv);
    }
  });

  block.innerHTML = '';
  block.appendChild(dl);
}
