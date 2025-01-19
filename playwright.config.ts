import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://qauto.forstudy.space',
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
    headless: false, // Запуск браузера с интерфейсом
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          slowMo: 500,
        },
      },
    },
  ], // Closing the array here
});


