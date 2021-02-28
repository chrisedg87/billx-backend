// import * as dotenv from 'dotenv'

// dotenv.config();

// import express from 'express';
// import { Application } from 'express';

// import Server from './src/server';

// const app: Application = express();
// const server: Server = new Server(app);
// const port: number = parseInt(process.env.port, 10) || 3000;

// app.listen(port, () => {
//   console.log(`Server running http://localhost:${port}`);
// })

  import "./src/infra/http/app";
  import "./src/infra/database";

