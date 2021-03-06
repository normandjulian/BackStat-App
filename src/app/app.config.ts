import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export class IAppConfig {
    apiEndpoint: string;
    network: boolean;
}

export const AppConfig: IAppConfig = {
    apiEndpoint: 'http://127.0.0.1:8080/',
    network: false
};
