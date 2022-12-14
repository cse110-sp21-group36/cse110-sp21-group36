# Sprint 1 Retrospective (Week 8)
### Meeting Details
**Meeting Location:** Zoom  
**Meeting Time:** 11/14/2022, 7:00-8:30 PM (PST)  
**Previous Meeting:** [11/10/2022 Sprint 1 Review (Week 7)](https://github.com/cse110-sp21-group36/cse110-sp21-group36/blob/main/admin/meetings/111022-Sprint-Review-01-Week7.md)  
**Meeting Slides:** [Meeting 11_14_22](https://github.com/cse110-sp21-group36/cse110-sp21-group36/blob/main/admin/meeting%20slides/Group%2036%20Meeting%2011_14_22.pdf)  

## Meeting Attendance
| Role | Name | Present? |
| --- | --- | --- |
| Team Lead | Triston Babers |✅|
| Team Lead | Meron Asfaw |✅|
| Designer | Jiancheng Liang |✅|
| Developer | Rappel Ricafort |✅|
| Developer | Andrew Schade |❌|
| Developer | Miko Brown |✅|
| Developer | Duc Vo |✅|
| Developer | Thanh Phan |✅|
| Developer | Justin Lau |✅|
| Developer | Ettore Hidoux |✅|
| Planner | Julia Le |❌|

## Meeting Agenda
- Take attendance
- Discuss recipe object structure
- Review Progress of Editor, Home, and View page teams

## Recipe Object Format (Javascript)
- Since all of our project web pages will be accessing a recipe data object in some shape or form, we wanted to come up with a definitive recipe object data type, this way our javascript will have less conflicts.
- We reworked the recipe object to thist new format:

```
Recipe {
      imgSrc": "This is an absolute path on user's cpu",    // String that needs parsed to get URL
      recipeName": "String",                         // Single String
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

## Testing
- Added HTML markup validation to testing
- Could test with Selenium to simulate user navigating page
- Using github super-linter

## Testing Pyramid
- From Base of pyramid to Peak:
- Unit tests, service test, UI tests

## Project Timeline
- We are on schedule, but in danger of falling behind if we don't keep making steady progress

## Code Reviews
- We will do full team code reviews each meeting monday and thursday instead of something like pair programming

