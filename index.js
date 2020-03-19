const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const cors = require('cors');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const conn = require('./routes/connection');
const userRouter = require('./routes/userRouter');
const pollRouter = require('./routes/pollRouter');

require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(requestIp.mw());

conn.once('open', (err, db) => {
  if (err) {
    throw err;
  }
  console.log('Conneted to MongoDB...');
});

app.use('/api/user', userRouter);
app.use('/api/poll', pollRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(port, () => {
  console.log(`Sever started on port ${port}`);
});
