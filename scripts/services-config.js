// scripts/service-config.js

/**
 * Массив услуг.
 * Чтобы добавить новую услугу — просто вызовите addService({ ... })
 */
export const services = [];

/**
 * Пример структуры одной услуги:
 * {
 *   id: 'swedish',
 *   title: 'Шведский массаж',
 *   description: 'Снимает мышечное напряжение и улучшает кровообращение.',
 *   img: 'service-swedish.jpg',
 *   duration: '60 мин',
 *   price: 2500,
 *   category: 'massage',
 *   tags: ['релакс', 'классика']
 * }
 */

/**
 * Добавляет услугу в глобальный массив services.
 * Проверяет, чтобы id не дублировался.
 * @param {Object} svc — объект услуги по указанной выше структуре
 */
export function addService(svc) {
  if (!svc.id || services.find(s => s.id === svc.id)) {
    console.warn(`Service with id="${svc.id}" already exists or id is empty.`);
    return false;
  }
  services.push({
    id:          svc.id,
    title:       svc.title,
    description: svc.description,
    img:         svc.img,
    duration:    svc.duration || '',
    price:       typeof svc.price === 'number' ? svc.price : 0,
    category:    svc.category || 'default',
    tags:        Array.isArray(svc.tags) ? svc.tags : []
  });
  return true;
}

// === Пример добавления услуг ===

addService({
  id:          'swedish',
  title:       'Шведский массаж',
  description: 'Снимает мышечное напряжение и улучшает кровообращение.',
  img:         'service-swedish.jpg',
  duration:    '60 мин',
  price:       2500,
  category:    'massage',
  tags:        ['релакс', 'классика']
});

addService({
  id:          'deep-tissue',
  title:       'Глубокий массаж',
  description: 'Работа с глубокими слоями мышц для максимального расслабления.',
  img:         'service-deep.jpg',
  duration:    '90 мин',
  price:       3500,
  category:    'massage',
  tags:        ['глубокий', 'терапия']
});

addService({
  id:          'hot-stone',
  title:       'Стоун-терапия',
  description: 'Тёплые камни для глубокого прогрева мышц.',
  img:         'service-hotstone.jpg',
  duration:    '75 мин',
  price:       3000,
  category:    'spa',
  tags:        ['камни', 'тепло']
});

// …добавляйте новые так же, без дублирования id
