import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';
import NextServer from 'next/dist/next-server/server/next-server';

@Injectable()
export class ViewService implements OnModuleInit {
    private server: NextServer;

    async onModuleInit() : Promise<void> {
        try {
            //@ts-ignore
            this.server = next({dev:process.env.NODE_ENV!=='production', dir: './src'});
            await this.server.prepare();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    getNextServer() : NextServer {
        return this.server;
    }
}