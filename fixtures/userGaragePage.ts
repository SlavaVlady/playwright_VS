import { test as base } from '@playwright/test';
import GaragePage from '../page-object/pages/GaragePage';

export const test = base.extend<{ userGaragePage: GaragePage }>({
  userGaragePage: async ({ page }, use) => {
    await page.context().storageState({ path: './test-data/states/userOne.json' });
    await page.goto('https://qauto.forstudy.space/panel/garage');
    const garagePage = new GaragePage(page);
    await use(garagePage);
   
    await garagePage.logout();
  },
});

export { expect } from '@playwright/test';








  


  