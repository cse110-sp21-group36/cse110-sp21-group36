describe('Basic user flow for Website', () => {
    // First, visit the website
    beforeAll(async () => {
      await page.goto('https://cse110-f2021.github.io/Lab8_Website');
    });
    // 1. check that local storage is correct: recipes is empty 
    it('1. Check recipes object is empty', async () => {
        let recipes = await page.evaluate(() => {
            let recipesLS = localStorage.getItem("recipes");
            return recipesLS;
          });
          expect(recipes).toBe('[]');
    });

    // 2. Click create new recipe: check that page URL is to Editor Page 
    it('2. Check ', async () => {
        //expect().toBe();
      });

    // 3. 
    it('3. Check ', async () => {
        //expect().toBe();
      });

    // 4. 
    it('3. Check ', async () => {
        //expect().toBe();
      });
    
});