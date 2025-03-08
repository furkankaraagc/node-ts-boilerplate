import express from 'express';

const app = express();

const PORT = 3000;

app.listen(() => {
  console.log(`server listening on prot ${PORT}`);
});
