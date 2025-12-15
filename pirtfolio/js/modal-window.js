console.log("modal-window.js")

const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.icon').forEach(button => {
    button.addEventListener('click', () => {
        const icon = button.dataset.icon;
        openModal(icon);
    });
});

function openModal(icon) {
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    modalContent.innerHTML = '<p>Загрузка...</p>';

    fetch('php/modal-content.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `icon=${icon}`
    })
    .then(res => res.text())
    .then(html => {
        modalContent.innerHTML = html;
    })
    .catch(() => {
        modalContent.innerHTML = '<p>Ошибка загрузки</p>';
    });
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});
