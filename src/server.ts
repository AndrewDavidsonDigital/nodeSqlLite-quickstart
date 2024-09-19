import express, { Request, Response } from 'express';
import { dbConnection } from './lib/db';
import { exit } from 'node:process';
import { IQueryParams } from './interfaces';

export function bootServer(){
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
      return res.sendStatus(500);
    }

    console.trace('Reached expected unreachable code, returning 500');
    return res.sendStatus(500);
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
  app.get('/volatile/:id', async (req: Request, res: Response) => {
    console.log('hit: `/volatile/:id`');
    const id = Number(req.params.id || 0);
    try{
      const data = await db.getVolatile(id);
      if (data){
        return res.json(data);      
      } else {
        return res.sendStatus(400);
      }
    } catch(e){
      console.trace('internal issue returning 500: \n', e);
      return res.sendStatus(500);
    }
  });

  // Example post adding db data
  app.post('/more', async (req: Request, res: Response) => {
    console.log('hit: `/more`');
    try{
      console.log(req.query);
      const jsonParams: IQueryParams[] = []
      Object.keys(req.query).forEach(key => {
        const newObj = {
          key: key,
          value: (req.query[key] as string),
        }
        jsonParams.push(newObj);
      });
      await db.addVolatile(jsonParams);
      return res.sendStatus(200);
    } catch(e){
      console.trace('internal issue returning 500: \n', e);
      return res.sendStatus(500);
    }
  });

  // Console report that we are up and alive
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  // 10mins in ms
  const EXPECTED_LIFETIME = 600000;

  // add shut down timer so we don't live forever.
  console.log(`Auto Shutdown in: '${EXPECTED_LIFETIME / 1000 / 60}minutes'`);
  setTimeout(
    () => {
      console.log(`Shutting down server due over extended lifetime: '${EXPECTED_LIFETIME}ms'`);
      exit(1);
    }, 
    EXPECTED_LIFETIME,
  );
}