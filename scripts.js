// 1) Загрузка JSON с товарами
fetch('config/products.json')
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById('services-grid');
    products.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bg-white text-gray-900 rounded-lg overflow-hidden shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl';
      card.innerHTML = `
        <picture>
          <source srcset="${item.image.webp}" type="image/webp">
          <img src="${item.image.jpeg}" alt="${item.name}" loading="lazy">
        </picture>
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">${item.name}</h3>
          <p class="mb-4">${item.description}</p>
          <p class="font-bold">Цена: ${item.price} ₽</p>
        </div>`;
      grid.append(card);
    });
  })
  .catch(err => console.error('Ошибка загрузки товаров:', err));

// 2) IntersectionObserver для плавного появления секций
document.querySelectorAll('section').forEach(sec => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      sec.classList.add('opacity-100', 'translate-y-0');
      obs.disconnect();
    }
  }, { threshold: 0.2 });
  obs.observe(sec);
});

// 3) Умное скрытие/показ header
let lastY = 0;
const header = document.getElementById('page-header');
window.addEventListener('scroll', () => {
  const curr = window.scrollY;
  header.classList.toggle('hidden', curr > lastY && curr > 100);
  lastY = curr;
});

// 4) Активная ссылка меню по секции
const links = document.querySelectorAll('.nav-link');
function updateActive() {
  let idx = 0;
  document.querySelectorAll('section').forEach((sec,i) => {
    if (window.scrollY >= sec.offsetTop - sec.clientHeight/2) idx = i;
  });
  links.forEach((a,i) => a.classList.toggle('active', i === idx));
}
window.addEventListener('scroll', updateActive);
updateActive();
