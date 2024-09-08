import express, { Request, Response } from 'express';
import { dbConnection } from './lib/db';

// server Init
const app = express();
const port = process.env.PORT || 6875;

app.use(express.json());

const db = dbConnection();
db.init();

// BASE Route - redirect to listing of users
app.get('/', (req: Request, res: Response) => {
  console.log('hit: `/`');
  res.redirect('/list');
});

// list out all users
app.get('/list', async (req: Request, res: Response) => {
  console.log('hit: `/list`');
  try{  
    const data = await db.getUsers();
    if (data){
      return res.json(data);      
    }
  } catch(e){
    console.trace('internal issue returning 500: \n', e);
    return res.status(500);
  }

  console.trace('Reached expected unreachable code, returning 500');
  return res.status(500);
});


// Example Dynamic Route
app.get('/thing/:id', (req: Request, res: Response) => {
  console.log('hit: `/thing/:id`');
  const id = Number(req.params.id || 0);

  if ((id % 3) !== 0 ){
    return res.status(418).send("Don't like left over thirds");
  }
  
  res.status(200).send("A clean plate is good mate");
});


// Example Dynamic Route
app.post('/more', (req: Request, res: Response) => {
  console.log('hit: `/more`');
  
  res.status(200)
});

// Console report that we are up and alive
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});