const search = document.querySelector('#article-search');
const filters = [...document.querySelectorAll('[data-filter]')];
const articles = [...document.querySelectorAll('.article-card')];
const count = document.querySelector('#result-count');
const empty = document.querySelector('.empty-state');
const clear = document.querySelector('#clear-search');
let activeTopic = 'all';
filters[0].querySelector('span').textContent = String(articles.length).padStart(2, '0');

function updateArticles() {
  const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let visible = 0;
  articles.forEach(article => {
    const content = article.textContent.toLocaleLowerCase();
    const matches = (activeTopic === 'all' || article.dataset.topic === activeTopic)
      && terms.every(term => content.includes(term));
    article.hidden = !matches;
    if (matches) visible++;
  });
  count.textContent = `${visible} ${visible === 1 ? 'article' : 'articles'}`;
  empty.hidden = visible !== 0;
  clear.hidden = search.value.length === 0;
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === activeTopic)));
}

filters.forEach(button => button.addEventListener('click', () => {
  activeTopic = button.dataset.filter;
  updateArticles();
}));
search.addEventListener('input', updateArticles);
clear.addEventListener('click', () => {
  search.value = '';
  updateArticles();
  search.focus();
});
document.querySelector('#reset-filters').addEventListener('click', () => {
  activeTopic = 'all';
  search.value = '';
  updateArticles();
  filters[0].focus();
});

updateArticles();
