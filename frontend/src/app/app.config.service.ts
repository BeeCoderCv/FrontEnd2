import { Injectable } from '@angular/core';
import { AppConfig } from './app.config';

@Injectable()
export class AppConfigService {

    private baseApiUrl: string="";

    constructor(private appConfig: AppConfig) { }

    public get API_BASE(): string {

        this.baseApiUrl = this.appConfig.get('baseApiUrl');

        return this.baseApiUrl;
    }
    public set API_BASE(val: string) {
        this.baseApiUrl = val;
    }
    
}