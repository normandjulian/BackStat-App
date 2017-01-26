export interface AppConfig {
  apiEndpoint: string;
  title: string;
}

export const BACKSTAT_CONFIG: AppConfig = {
  apiEndpoint: 'http://127.0.0.1:8080',
  title: 'Dependency Injection'
};
