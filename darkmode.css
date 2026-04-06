const toggleBtn = document.getElementById('theme-toggle');
const body = document.documentElement;

toggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved user preference
if (localStorage.getItem('theme') === 'dark') {
    body.setAttribute('data-theme', 'dark');
}
