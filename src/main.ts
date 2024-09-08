import express, { Request, Response } from 'express';

// server Init
const app = express();
const port = process.env.PORT || 6875;

app.use(express.json());

// DB Init
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./.db/quickstart.db');

// BASE Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});


// Example Dynamic Route
app.get('/thing/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id || 0);

  if ((id % 3) !== 0 ){
     return res.status(418).send("Don't like left over thirds");
  }
  
  res.status(200).send("A clean plate is good mate");
});


// Example Dynamic Route
app.post('/more', (req: Request, res: Response) => {
  
  res.status(200)
});

// Console report that we are up and alive
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});