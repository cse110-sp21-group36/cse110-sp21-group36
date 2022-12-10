# 🌐 Code Avengers ⍟  - Main Branch

## Team Agenda (Week 10)

## Website: [My Recipe App](https://cse110-sp21-group36.github.io/cse110-sp21-group36/source/recipe_manager.html)  
**Link to Team Page:** [Team Page](https://github.com/cse110-sp21-group36/cse110-sp21-group36/blob/main/admin/team.md)

**Note**: The "[Live-Deployment](https://github.com/cse110-sp21-group36/cse110-sp21-group36/tree/Live-Deployment)" Branch is the "official" branch for users to access and where the pages are deployed from, but main is the one with all of the commit history.

__Next Meeting__: ???

### Assignments:
- [Current Project Diagram](https://github.com/cse110-sp21-group36/cse110-sp21-group36/blob/main/specs/Project%20Structure%20Diagram.PNG)
+ Completing the last features to meet our Minimum Viable Product Requirements: [✅]
  + ~~View Page: Add a Recipe Delete Option (Miko, Justin)~~
  + ~~Home Page: Add an option to Sort by Favorites (Andy, Triston)~~
  + ~~Home Page: Get Navbar working on all other pages (Duc)~~
  + ~~Edit Page: Fill Text fields with the currRecipe data (Edit Page Team: Ettore, Thanh, Kinson, Meron)~~
  + ~~Edit Page: Make it so that when Save Recipe is clicked, the button will redirect back to the Home Page. Should be a one-line (Ettore already)~~
  + ~~CSS Styling: Make the website look as pretty as possible (Julia, Rappel).~~
    + ~~Note: Styling doesn’t need to be completely done, just make progress by Thursday meeting~~

### Recipe Object Structure:
```
Recipe {
      "imgSrc": "This is an absolute path on user's cpu",    // String that needs parsed to get URL
      "recipeName": "String",                        // Single String
      "mealType": [Multiple Values],                 // Array of Strings, but specifily limited to ["Breakfast", "Lunch", etc.], if you get passed ["Dinner"], then that is the only meal type for that specific recipe; they can also have more than one.
      "totalTime": num#,                             // Number
      "ingredients": [String Array],                 // An array of Strings e.g. ["Carrots", "
       “steps”: [String Array]                       // An array of Strings e.g. ["Step 1: Add Water", "Step 2: Boil", ... ]
       "favorite": True/False                        // Boolean
       "tools": [String Array]                       // Tools: ["Frying Pan", "Beaker", "Blow Torch", ... ]
       "difficulty": "String"                        // A string, under <30 Characters e.g. "Medium", "Hard", etc.
       "notes": "String"                             // Single String, stores additional notes
}
```

### Team Roles:
- Triston Babers __Team Lead__ [Home Page Team]
- Meron Asfaw __Team Lead__ [Recipe Editor Team]
- Ettore Hidoux __Developer__ [Recipe Editor Team]
- Jiancheng Liang __Designer__ [Recipe Editor Team]
- Miko Brown __Developer__ [Home Page Team]
- Andrew Schade __Developer__ [Home Page Team]
- Rappel Ricafort __Developer__ [Recipe View Page]
- Duc Vo __Developer__ [Home Page Team]
- Thanh Phan __Developer__ [Recipe Editor Page]
- Justin Lau __Developer__ [Recipe View Page]
- Julia Le __Planner__ [Recipe View Page]

### Meeting Note-Taking:
Duc > Justin > Julia > Jiancheng > Rappel > Miko > Andrew > Ettore > Thanh
