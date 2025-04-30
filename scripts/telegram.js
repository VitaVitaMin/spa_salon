// Простая обфускация токена + отправка через Telegram Bot API
const STORAGE_KEY = 'tg_token';

// Функция для загрузки зашифрованного токена (base64) из файла или переменной
async function loadToken() {
  let token = localStorage.getItem(STORAGE_KEY);
  if (!token) {
    const res = await fetch('token.enc'); // файл token.enc в корне
    token = await res.text();
    localStorage.setItem(STORAGE_KEY, token);
  }
  return atob(token); // простая децода base64
}

export async function sendTelegram({ name, phone, message }) {
  const BOT_TOKEN = await loadToken();
  const CHAT_ID   = '<ваш_зашифрованный_CHAT_ID>'; // сюда подставьте ваш base64
  const text = `📩 *Новая заявка*:\n👤 ${name}\n📞 ${phone}\n💬 ${message}`;
  const payload = { chat_id: atob(CHAT_ID), text, parse_mode: 'Markdown' };
  const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return resp.json();
}
