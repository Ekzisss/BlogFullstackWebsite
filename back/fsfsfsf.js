import express from 'express';

const app = express();

app.use('/', (req, res) => {
  res.send('fsafasfa24123fasfas!');
});

app.listen(80, () => {
  console.log('Server OK');
});
