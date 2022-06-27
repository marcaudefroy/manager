import { simpleParser } from 'mailparser';
import Imap from 'imap';

const imapConfig = {
  user: process.env.USER_EMAIL_ID,
  password: process.env.USER_EMAIL_PWD,
  host: 'ssl0.ovh.net',
  port: 993,
  tls: true,
};

// inside each body we look for the terminate url and push them to the promiseArray
async function parseEmailBody(stream, promiseArray) {
  const parsed = await simpleParser(stream);
  const emailContent = parsed.textAsHtml;
  const stringSplit = emailContent.match(
    /https:\/\/www.ovh.com\/manager\/#\/billing\/confirmTerminate.id=(.*)/,
  );
  const stringTwo = stringSplit[0].split('">');
  promiseArray.push(stringTwo[0]);
}

async function checkInbox(imap, parserPromises) {
  // we look inside the INBOX
  imap.openBox('INBOX', false, () => {
    // we search for the unseen messages of the day
    imap.search(
      [
        'UNSEEN',
        [
          'SUBJECT',
          '[tf259429-ovh] Suppression de votre projet Public Cloud !',
        ],
      ],
      async (err, results) => {
        const f = imap.fetch(results, { bodies: '' });
        f.on('message', (msg) => {
          msg.on('body', async (stream) => {
            await parseEmailBody(stream, parserPromises);
          });

          msg.once('attributes', (attrs) => {
            const { uid } = attrs;
            imap.addFlags(uid, ['\\Seen']);
          });
        });

        f.once('end', () => {
          imap.end();
        });
      },
    );
  });
}

export default function getTerminateConfirmationLinkFromEmail() {
  const imap = new Imap(imapConfig);
  const parserPromises = [];

  return new Promise((resolve, reject) => {
    imap.once('ready', () => {
      checkInbox(imap, parserPromises);
    });

    imap.once('end', () => {
      Promise.all(parserPromises)
        .then((urls) => {
          resolve(urls.filter((url) => !!url));
        })
        .catch((error) => {
          reject(error);
        });
    });

    imap.connect();
  });
}
