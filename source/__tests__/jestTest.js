describe('Basic user flow for Website', () => {
    // First, visit the website
    //TODO: insert page URL 
    beforeAll(async () => {
      await page.goto('');
    });
    // 1. check that local storage is correct: recipes is empty 
    it('1. Check recipes object is empty', async () => {
        let recipes = await page.evaluate(() => {
            let recipesLS = localStorage.getItem("recipes");
            return recipesLS;
          });
          expect(recipes).toBe('[]');
    });

    // 2. Click create new recipe: check that page URL is Editor Page 
    it('2. Check ', async () => {
        //expect().toBe();
      });

    // 3. Fill in recipe Form and submit: check local storage is updated with new recipe
    it('3. Check ', async () => {
        //TODO: fill and submit form 
        let recipes = await page.evaluate(() => {
            let recipesLS = localStorage.getItem("recipes");
            return recipesLS;
        });
        expect(recipes).toBe('[]'); // TODO: fill in with expected recipe object
      });

    // 4. Navigate back to home page: check URL is View Page
    it('4. Check ', async () => {
        //expect().toBe();
      });

    // 5. Click to view recipe: check that currRecipe is set correctly
    it('5. Check ', async () => {
        let currRecipe = await page.evaluate(() => {
            let currRecipeLS = localStorage.getItem("currRecipe");
            return currRecipesLS;
        });
        expect(currRecipe).toBe(""); // TODO: fill in with expected currRecipe object
      });

    //...
    
});