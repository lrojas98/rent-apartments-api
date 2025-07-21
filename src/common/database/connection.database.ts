import {
    SequelizeModuleOptions,
    SequelizeOptionsFactory,
} from '@nestjs/sequelize';

import { CommonService } from '../common.service';
import { DataConnection, DBs, IDatabase, IDatabaseContent } from '../interfaces';
import { Dependencies, Injectable } from '@nestjs/common';
import { entitiesContent, entitiesMain } from './entities.database';

export interface SequelizeConfigOptions {
    dbType: DBs;
}

@Dependencies(CommonService)
@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
    constructor(private readonly commonService: CommonService) { }

    async createSequelizeOptions(connectionName?: DBs): Promise<SequelizeModuleOptions> {
        const dbType = connectionName || DBs.main;

        const config = this.getDatabaseConfig(dbType);

        let entities = [];
        dbType == DBs.main ? entities.push(...entitiesMain) : entities.push(...entitiesContent);

        return {
            name: dbType,
            dialect: 'mysql',
            host: config.host,
            port: config.port,
            username: config.user,
            password: config.pass,
            database: config.db,
            models: [...entities],
            logging: console.log,
            // autoLoadModels: false,
        };
    }

    private getDatabaseConfig(dbType: DBs): DataConnection {
        if (dbType === DBs.main) {
          const db = this.commonService.getEnv<IDatabase>('database');
          return {
            host: db.dbHost,
            port: db.dbPort,
            db: db.db,
            user: db.dbUser,
            pass: db.dbPass,
          };
        }

        const dbC = this.commonService.getEnv<IDatabaseContent>('databaseContent');
        return {
            host: dbC.dbCHost,
            port: dbC.dbCPort,
            db: dbC.dbC,
            user: dbC.dbCUser,
            pass: dbC.dbCPass,
        };
    }
}