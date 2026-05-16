const routes = {
    '/': 'index.html',
    '/browses_courses': 'browses_courses.html',
    '/contact': 'contact.html'
};

function navigate(path) {
    const route = routes[path] || 'index.html';
    window.history.pushState({}, '', path);
    loadContent(route);
}

function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.querySelector('#content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.querySelector('#content').innerHTML = '<p>Error loading content.</p>';
        });
        
}

window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const route = routes[path] || 'index.html';
    loadContent(route);
});