import { services } from './service-config.js';

document.addEventListener('DOMContentLoaded', () => {
  // навигация
  const menuBtn = document.getElementById('navToggle');
  const menu    = document.getElementById('navList');
  menuBtn.addEventListener('click', () => menu.classList.toggle('open'));

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(btn.dataset.target)
              .scrollIntoView({ behavior:'smooth', block:'center' });
    });
  });

  // AOS
  if (window.AOS) AOS.init({ duration:800, once:true });

  // Input mask
  if (window.Inputmask) {
    Inputmask('+7 (999) 999-99-99').mask(document.getElementById('phoneInput'));
  }

  // рендер услуг
  const cont = document.getElementById('services-container');
  if (cont) {
    services.forEach(svc => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <img src="img/${svc.img}" alt="${svc.title}" loading="lazy">
        <div class="content">
          <h3 class="text-2xl mb-2">${svc.title}</h3>
          <p>${svc.description}</p>
        </div>`;
      cont.append(card);
    });
  }

  // обработка формы
  const form = document.getElementById('bookingForm');
  if (form) {
    const btnText = document.getElementById('btnText');
    const spinner = document.getElementById('spinner');
    const status  = document.getElementById('statusMsg');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      status.textContent = '';
      ['name','phoneInput','message'].forEach(id => {
        document.getElementById(id).classList.remove('error');
      });
      btnText.textContent = '';
      spinner.classList.remove('hidden');
      form.querySelector('button').disabled = true;

      const data = new FormData(form);
      // валидация
      const n = data.get('name').trim();
      const p = data.get('phone').replace(/\D/g,'');
      const m = data.get('message').trim();
      let err = null;
      if (!/^[А-ЯЁ][а-яё]+(\s[А-ЯЁ][а-яё]+)*$/.test(n))
        err = { f:'name', t:'Введите корректное имя' };
      else if (!/^7\d{10}$/.test(p))
        err = { f:'phoneInput', t:'Телефон в формате +7 (XXX) XXX-XX-XX' };
      else if (m && m.length < 5)
        err = { f:'message', t:'Комментарий не менее 5 символов' };

      if (err) {
        const fld = document.getElementById(err.f);
        fld.classList.add('error');
        fld.focus();
        status.textContent = err.t;
        status.classList.add('text-red-500');
        spinner.classList.add('hidden');
        btnText.textContent = 'Отправить заявку';
        form.querySelector('button').disabled = false;
        return;
      }

      // TODO: заменить на ваш backend endpoint
      const BOT_TOKEN = 'ENCRYPTED_TOKEN';
      const CHAT_ID   = 'ENCRYPTED_CHAT_ID';
      const text = `📩 *Новая заявка*:\n👤 ${n}\n📞 ${data.get('phone')}\n💬 ${m || '-'}`;
      try {
        const res = await fetch(`/api/send`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ text })
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || 'Ошибка');
        status.classList.replace('text-red-500','text-green-500');
        status.textContent = 'Заявка отправлена!';
        form.reset();
      } catch {
        status.classList.replace('text-green-500','text-red-500');
        status.textContent = 'Ошибка отправки.';
      } finally {
        spinner.classList.add('hidden');
        btnText.textContent = 'Отправить заявку';
        form.querySelector('button').disabled = false;
      }
    });
  }
});
