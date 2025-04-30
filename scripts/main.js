// scripts/main.js

import { services } from '../service-config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Мобильное меню
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu    = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Рендер карточек услуг
  const container = document.getElementById('services-container');
  services.forEach(svc => {
    const card = document.createElement('div');
    card.className = 'service-card glass p-6 transition-transform duration-500 ease-in-out';
    card.innerHTML = `
      <img src="${svc.img}"
           alt="${svc.title}"
           loading="lazy"
           class="w-full h-48 object-cover rounded-lg mb-4">
      <h3 class="text-2xl font-semibold mb-2">${svc.title}</h3>
      <p class="text-gray-200">${svc.description}</p>
    `;
    container.appendChild(card);
  });
});
