import { test, expect } from '@playwright/test';
import HomePage from '../page-object/pages/HomePage';
import SignInForm from '../page-object/forms/SignInForm';
import GaragePage from '../page-object/pages/GaragePage';

test.describe('Garage Page', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.openPage();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials(credentials.userOne.email, credentials.userOne.password);
    })
    test('Add BMW X6', async () => {
        await garagePage.addCarByBrandAndModel('BMW', 'X6', '500');
        await garagePage.verifyLastAddedCar('BMW X6');
    });

    test('Add Audi TT', async () => {
        await garagePage.addCarByBrandAndModel('Audi', 'TT', '500');
        await garagePage.verifyLastAddedCar('Audi TT');
    });

    test('Add Ford Fiesta', async () => {
        await garagePage.addCarByBrandAndModel('Ford', 'Fiesta', '500');
        await garagePage.verifyLastAddedCar('Ford Fiesta');
    });

    test.afterEach(async () => {
        await garagePage.removeLastAddedCar();
    })
})

test.describe('Garage Page for a guest user', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await page.goto('/');
        await page. getByText ('Guest log in').click();
        await expect (page.locator ('//h1[text() = "Garage"]')).toBeVisible();
      
    })
    test.only ('Add BMW', async ({page})=> {
        await garagePage.addCarByBrandAndModel('BMW', 'X6', '500');
        await garagePage.verifyLastAddedCar('BMW X6');
        
        const parsedData = await page.evaluate (async () => {
            return window.sessionStorage.getItem('guestData');
        })

        console.log(parsedData);
        await page.waitForTimeout (5000);

    })
})
