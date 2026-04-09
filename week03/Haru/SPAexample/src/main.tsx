type Routes = {
  [key: string]: string;
};

const routes: Routes = {
  '/': '<h1>Home Page</h1>',
  '/about': '<h1>About Page</h1>'
};

const render = (path: string): void => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = routes[path] || '<h1>404 Not Found</h1>';
  }
};

const navigateTo = (path: string): void => {
  window.history.pushState({}, '', path);
  render(path);
};

window.addEventListener('popstate', () => {
  render(window.location.pathname);
});

window.addEventListener('DOMContentLoaded', () => {

  render(window.location.pathname);

  const homeBtn = document.getElementById('home-btn');
  const aboutBtn = document.getElementById('about-btn');

  homeBtn?.addEventListener('click', () => navigateTo('/'));
  aboutBtn?.addEventListener('click', () => navigateTo('/about'));
});