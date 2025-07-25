const Imap = require('imap');
const express = require('express');
const cors =- require('cors');

const app = express();
app.use(cors());

let newEmail = false;

const imapConfig = {
    user: 'kanda@heap.phys.waseda.ac.jp',
    password: 'xK7-59g-THP-YqS',
    host: 'https://webmail.m.mse.waseda.ac.jp/cpsess0576877607/3rdparty/roundcube/',
    port: 993,
    tls: true,
};

const imap = new Imap(imapConfig);

imap.once('ready', () => {
    console.log('IMAP connection ready.');
    imap.openBox('INBOX', true, (err, box) => {
        if (err) throw err;
        console.log('INBOX opened.');
        imap.on('mail', () => {
            console.log('New mail received!');
            newEmail = true;
        });
    });
});

imap.once('error', (err) => {
    console.log(err);
});

imap.once('end', () => {
    console.log('IMAP connection ended.');
});

imap.connect();

app.get('/check-email', (req, res) => {
    if (newEmail) {
        newEmail = false; // Reset after notifying
        res.json({ newMail: true, message: 'You have a new email!' });
    } else {
        res.json({ newMail: false, message: 'No new email.' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});