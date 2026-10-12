const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
authStrategy: new LocalAuth(),
puppeteer: {
headless: true,
args: ['--no-sandbox', '--disable-setuid-sandbox']
}
});

const PREFIX = '!';

client.on('qr', (qr) => {
console.log('Escaneie este QR Code com o WhatsApp:');
qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
console.log('Bot conectado ao WhatsApp!');
});

client.on('message', async (msg) => {
const texto = msg.body.trim();
if (!texto.startsWith(PREFIX)) return;

const partes = texto.slice(PREFIX.length).trim().split(/\s+/);
const comando = (partes.shift() || '').toLowerCase();

if (comando === 'ping') {
await msg.reply('🏓 Pong! O bot está funcionando.');
}

if (comando === 'menu') {
await msg.reply(
'🤖 MENU DO BOT\n\n' +
'!ping - Testar o bot\n' +
'!menu - Mostrar comandos\n' +
'!dado - Jogar um dado\n' +
'!moeda - Jogar cara ou coroa'
);
}

if (comando === 'dado') {
await msg.reply('🎲 Resultado: ' + (Math.floor(Math.random() * 6) + 1));
}

if (comando === 'moeda') {
await msg.reply(Math.random() < 0.5 ? '🪙 Cara!' : '🪙 Coroa!');
}
});

client.initialize();
