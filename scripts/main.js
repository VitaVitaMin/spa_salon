// toggling mobile menu + smooth scroll + form validation + spinner
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => menu.classList.toggle('hidden'));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))
              .scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Input mask for phone
  Inputmask('+7 (999) 999-99-99').mask(document.getElementById('phone'));

  // Form submission
  const form = document.getElementById('bookingForm');
  const btnText = document.getElementById('btnText');
  const spinner = document.getElementById('spinner');
  const statusMsg = document.getElementById('statusMsg');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    statusMsg.textContent = '';
    form.querySelectorAll('input,textarea').forEach(f => f.classList.remove('ring-2','ring-red-500'));

    // Validation
    const name = form.name.value.trim();
    const phone = form.phone.value.replace(/\D/g, '');
    if (!/^[А-ЯЁ][а-яё]+(?:\s[А-ЯЁ][а-яё]+)*$/.test(name)) {
      form.name.classList.add('ring-2','ring-red-500');
      statusMsg.textContent = 'Введите корректное имя';
      return;
    }
    if (!/^7\d{10}$/.test(phone)) {
      form.phone.classList.add('ring-2','ring-red-500');
      statusMsg.textContent = 'Телефон в формате +7 (XXX) XXX-XX-XX';
      return;
    }

    // Show spinner
    btnText.textContent = '';
    spinner.classList.remove('hidden');
    form.querySelector('button').disabled = true;

    // Send via telegram.js
    try {
      const res = await sendTelegram({
        name, phone: form.phone.value, message: form.message.value.trim() || '-'
      });
      if (res.ok) {
        statusMsg.classList.add('text-green-400');
        statusMsg.textContent = 'Заявка отправлена!';
        form.reset();
      } else {
        throw new Error(res.error || 'Ошибка');
      }
    } catch {
      statusMsg.classList.add('text-red-500');
      statusMsg.textContent = 'Ошибка отправки.';
    } finally {
      spinner.classList.add('hidden');
      btnText.textContent = 'Отправить заявку';
      form.querySelector('button').disabled = false;
    }
  });
});
