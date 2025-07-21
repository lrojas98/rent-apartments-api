export enum DBs {
  main = 'apartments_db',
  content = 'apartments_content_db',
}

export interface IEnvironment {
  port: number;
  
  // Database
  database: IDatabase;
  databaseContent: IDatabaseContent;
}

export interface IDatabase {
  dbHost: string;
  dbPort: number;
  db: string;
  dbUser: string;
  dbPass: string;
}

export interface IDatabaseContent {
  dbCHost: string;
  dbCPort: number;
  dbC: string;
  dbCUser: string;
  dbCPass: string;
}

export interface DataConnection {
  host: string;
  port: number;
  db: string;
  user: string;
  pass: string;
}

export interface IPagination {
  page?: number;
  limit?: number;
  offset?: number;
}