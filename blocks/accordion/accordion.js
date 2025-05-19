/* eslint-disable no-console */
import { getAEMDomain } from '../../scripts/helper.js';

export default async function decorate(block) {
  try {
    const domain = getAEMDomain();
    const endpoint = '/graphql/execute.json/eds-wknd/faqs';
    const url = domain ? `https://${domain}${endpoint}` : endpoint;

    const response = await fetch(url);
    const data = await response?.json();

    const faqs = data?.data?.faqModelList?.items || [];

    block.replaceChildren();
    const accordionContainer = document.createElement('div');
    accordionContainer.classList.add('accordion-container');

    faqs.forEach((faq, index) => {
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');

      const questionButton = document.createElement('button');
      questionButton.classList.add('accordion-question');
      questionButton.textContent = faq.question ?? `Question ${index + 1}`;
      questionButton.setAttribute('aria-expanded', 'false');

      const answerDiv = document.createElement('div');
      answerDiv.classList.add('accordion-answer');
      answerDiv.textContent = faq.answer?.plaintext ?? 'No answer available';

      questionButton.addEventListener('click', () => {
        const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';

        block.querySelectorAll('.accordion-question').forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
        block.querySelectorAll('.accordion-answer').forEach((ans) => {
          ans.style.display = 'none';
        });

        if (!isExpanded) {
          questionButton.setAttribute('aria-expanded', 'true');
          answerDiv.style.display = 'block';
        }
      });

      accordionItem.appendChild(questionButton);
      accordionItem.appendChild(answerDiv);
      accordionContainer.appendChild(accordionItem);
    });

    block.appendChild(accordionContainer);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
  }
}
