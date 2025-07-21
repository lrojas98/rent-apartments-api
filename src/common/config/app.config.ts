import { IEnvironment } from "../interfaces";

export const envConfig = (): IEnvironment => ({
  // Envs
  port: +process.env.PORT,

  // Database
  database:{
    dbPort: +process.env.DB_PORT,
    dbHost: process.env.DB_HOST,
    dbPass: process.env.DB_PASS,
    dbUser: process.env.DB_USER,
    db: process.env.DB,
  },

  databaseContent:{
    dbCPort: +process.env.DBC_PORT,
    dbCHost: process.env.DBC_HOST,
    dbCPass: process.env.DBC_PASS,
    dbCUser: process.env.DBC_USER,
    dbC: process.env.DBC,
  }
});

export default envConfig;
