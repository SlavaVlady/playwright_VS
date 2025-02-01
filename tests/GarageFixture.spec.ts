
import { test } from '../fixtures/userGaragePage'


test.describe('Garage Page Add with fixture', () => {
    
test('Add BMW X6', async ({ userGaragePage }) => {
    await userGaragePage.addCarByBrandAndModel('BMW', 'X6', '500');
    await userGaragePage.verifyLastAddedCar('BMW X6');
  
});

})