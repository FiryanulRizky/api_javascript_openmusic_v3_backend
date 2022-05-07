require('dotenv').config();
const amqp = require('amqplib');
const PlaylistsService_subm_v2 = require('./PlaylistsService_subm_v2');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const playlistsService_subm_v2 = new PlaylistsService_subm_v2();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService_subm_v2, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:playlists', listener.listen, { noAck: true });
};

init();
