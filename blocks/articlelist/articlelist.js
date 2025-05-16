export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'cmp-list';

  const items = block.querySelectorAll(':scope > div');

  items.forEach((item) => {
    const title = item.querySelector(':scope > div:nth-child(1) p')?.textContent.trim();
    const description = item.querySelector(':scope > div:nth-child(2) p')?.textContent.trim();
    const linkEl = item.querySelector(':scope > div:nth-child(3) a');
    const href = linkEl?.getAttribute('href');

    if (title && description && href) {
      const li = document.createElement('li');
      li.className = 'cmp-list__item';

      const a = document.createElement('a');
      a.className = 'cmp-list__item-link';
      a.setAttribute('href', href);

      const spanTitle = document.createElement('span');
      spanTitle.className = 'cmp-list__item-title';
      spanTitle.textContent = title;

      const spanDesc = document.createElement('span');
      spanDesc.className = 'cmp-list__item-description';
      spanDesc.textContent = description;

      a.append(spanTitle, spanDesc);
      li.append(a);
      list.append(li);
    }
  });

  block.innerHTML = '';
  block.append(list);
}
