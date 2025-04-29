 <!-- Скрипт -->
  <script>
    // Telegram Bot Credentials
    const BOT_TOKEN = '7577231841:AAFuxU7qKica-U5CVTl684kigyjuE92uzEg';
    const CHAT_ID   = '1459592080';

    // Smooth scroll nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector(btn.dataset.target)
          .scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Intersection Observer for active nav link
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const btn = document.querySelector(
          `.nav-btn[data-target="#${entry.target.id}"]`
        );
        btn.classList.toggle('active', entry.isIntersecting);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));

    // Form submission
    document.getElementById('bookingForm').addEventListener('submit', async e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const text = `📩 *Новая заявка на массаж:*
👤 Имя: ${data.get('name')}
📞 Телефон: ${data.get('phone')}
✉️ Email: ${data.get('email')}
💬 Комментарий: ${data.get('message')}`;
      try {
        const res = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' })
          }
        );
        const json = await res.json();
        document.getElementById('statusMsg').textContent =
          json.ok ? '✅ Заявка отправлена!' : '❌ Ошибка отправки.';
        if (json.ok) e.target.reset();
      } catch {
        document.getElementById('statusMsg').textContent = '❌ Ошибка отправки.';
      }
    });
  </script>
</body>
</html>
