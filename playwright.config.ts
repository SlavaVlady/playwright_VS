import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL, 
    httpCredentials: {
      username: process.env.HTTP_USERNAME, 
      password: process.env.HTTP_PASSWORD, 
    },
    headless: false, 
  },
  projects: [
    {
      name: 'regression',
      use: {
        browserName: 'chromium',
        launchOptions: {
          slowMo: 500,
        },
      },
      dependencies: ['setup'],
    },
    {
      name: 'setup',
      use: {...devices ['Desktop Chrome']},
      testMatch: '*setup/*.ts'
    },
  ],
});