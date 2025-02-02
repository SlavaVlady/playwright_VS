import { test, expect } from '@playwright/test';
import HomePage from '../page-object/pages/HomePage';
import SignInForm from '../page-object/forms/SignInForm';

test.describe('Set Up users and intercept profile API', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);

        await page.goto('/');
        await homePage.openPage();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials('test1734889756918vs@mailinator.com', 'Test1234!');

      
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('Intercept profile API and modify response', async ({ page }) => {
     
        await page.route('/api/users/profile', async (route) => {
            const fakeResponse = {
                "status": "ok",
                "data": {
                    "userId": 166152,
                    "photoFilename": "default-user.png",
                    "name": "HIP",
                    "lastName": "HOP"
                }
            };

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(fakeResponse),
            });
        });

    
        await page.goto('https://qauto.forstudy.space/panel/profile');


        const profileNameLocator = page.locator('//*[@class="profile_name display-4"]');
        await expect(profileNameLocator).toHaveText('HIP HOP');
        console.log('Profile UI displays modified data successfully');
    });
});


