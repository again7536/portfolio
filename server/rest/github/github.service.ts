import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class GithubService {
    autoBuild() {
        exec('npm run build');
    }
}