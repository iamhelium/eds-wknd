import { loadBlock } from '../../scripts/aem.js';
import { generateUID } from '../../scripts/helper.js';

export default async function decorate(block) {
  const tabsId = `tabs-${generateUID()}`;
  const tabContainer = document.createElement('div');
  tabContainer.id = tabsId;
  tabContainer.className = 'cmp-tabs';

  const tabList = document.createElement('ol');
  tabList.className = 'cmp-tabs__tablist';
  tabList.setAttribute('role', 'tablist');
  tabList.setAttribute('aria-multiselectable', 'false');

  const tabItems = [...block.children].slice(1);
  const label = block.children[0]?.querySelector('p')?.textContent?.trim();
  if (label) tabList.setAttribute('aria-label', label);

  const tabs = [];
  const panels = [];
  const loadPromises = [];

  tabItems.forEach((tabItem, index) => {
    const [titleDiv, buttonDiv] = tabItem.children;
    const tabTitle = titleDiv?.textContent.trim();
    const link = buttonDiv?.querySelector('a');
    if (!link || !tabTitle) return;

    const uid = generateUID();
    const tabId = `${tabsId}-item-${uid}-tab`;
    const panelId = `${tabsId}-item-${uid}-tabpanel`;

    // --- Tab Element ---
    const tabEl = document.createElement('li');
    tabEl.id = tabId;
    tabEl.className = `cmp-tabs__tab${index === 0 ? ' cmp-tabs__tab--active' : ''}`;
    tabEl.setAttribute('role', 'tab');
    tabEl.setAttribute('aria-controls', panelId);
    tabEl.setAttribute('tabindex', index === 0 ? '0' : '-1');
    tabEl.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    tabEl.setAttribute('data-cmp-hook-tabs', 'tab');
    tabEl.textContent = tabTitle;
    tabs.push(tabEl);
    tabList.appendChild(tabEl);

    // --- Fragment Block ---
    const fragmentBlock = document.createElement('div');
    fragmentBlock.className = 'fragment block';
    fragmentBlock.dataset.blockName = 'fragment';
    fragmentBlock.dataset.blockStatus = 'initialized';

    const p = document.createElement('p');
    p.appendChild(link.cloneNode(true));
    const wrapperDiv = document.createElement('div');
    wrapperDiv.appendChild(p);
    const outerDiv = document.createElement('div');
    outerDiv.appendChild(wrapperDiv);
    fragmentBlock.appendChild(outerDiv);

    const fragmentWrapper = document.createElement('div');
    fragmentWrapper.className = 'fragment-wrapper';
    fragmentWrapper.appendChild(fragmentBlock);

    // --- Panel Element ---
    const panelEl = document.createElement('div');
    panelEl.id = panelId;
    panelEl.className = `cmp-tabs__tabpanel${index === 0 ? ' cmp-tabs__tabpanel--active' : ''}`;
    panelEl.setAttribute('role', 'tabpanel');
    panelEl.setAttribute('aria-labelledby', tabId);
    panelEl.setAttribute('tabindex', '0');
    panelEl.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    panelEl.appendChild(fragmentWrapper);

    panels.push(panelEl);
    loadPromises.push(loadBlock(fragmentBlock));
  });

  await Promise.all(loadPromises);

  // --- Final DOM Insertion ---
  tabContainer.appendChild(tabList);
  panels.forEach((panel) => tabContainer.appendChild(panel));
  block.textContent = '';
  block.appendChild(tabContainer);

  // --- Tab Switching ---
  tabs.forEach((tab, activeIndex) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t, i) => {
        const isActive = i === activeIndex;
        const panel = panels[i];

        t.classList.toggle('cmp-tabs__tab--active', isActive);
        t.setAttribute('aria-selected', isActive);
        t.setAttribute('tabindex', isActive ? '0' : '-1');

        panel.classList.toggle('cmp-tabs__tabpanel--active', isActive);
        panel.setAttribute('aria-hidden', !isActive);
      });
    });
  });
}
