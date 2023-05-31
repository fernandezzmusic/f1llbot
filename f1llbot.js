
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} Está online.`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === 'f1.help')
  {
    message.reply('``Estes são meus comandos: \n f1.spotify: Te passo o Spotify do Malandro \n f1.mix: Te envio o último mix postado``');
  }

  if (message.content === 'f1.spotify') {
    message.reply('https://open.spotify.com/artist/7dSVNCAcK2p5OpEkZ1usPt?si=qpwOzf-6TpSKN-eD4So2MA');
  }

  if (message.content === 'f1.mix') {
    message.reply('https://www.youtube.com/watch?v=9McxypsPNNA');
  }

});

client.login(process.env.TKN);