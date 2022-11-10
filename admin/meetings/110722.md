# Group 36 Sprint Planning Meeting (Week 7)
### Meeting Details
**Meeting Location:** In-Person (Geisel West Library)  
**Meeting Time:** 11/7/2022, 6:00-7:30 PM (PST)  
**Previous Meeting:** [Weekly Meeting (Week 6)](https://github.com/cse110-sp21-group36/cse110-sp21-group36/blob/main/admin/meetings/110322-Week6.md)


## Meeting Attendance
| Role | Name | Present? |
| --- | --- | --- |
| Team Lead | Triston Babers |✅|
| Team Lead | Meron Asfaw |❌|
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

## Recipe Object Format (Javascript
- Since all of our project web pages will be accessing a recipe data object in some shape or form, we wanted to come up with a definitive recipe object data type, this way our javascript will have less conflicts.
- Using Lab 6's Recipe object as a starting point, we have decided to cut the image link form, as that will not be displayed to the user, as well as removing the title link as recipes will be created on our website.
- This resulted in the following current format:

```
Recipe {
	imgSrc": "./assets/images/1_spooky-ghost-cookies.jpeg",
      "imgAlt": "Spooky Ghost Cookies",
      "title": "",
      “Author”: ____
      "Favorite”
      "lengthTime": "2 hr",
      "ingredients": "
       “Steps”: "
}
```
- We also discussed possibly adding an attributes array for our sorting code to use labels on the home page, but we decided to not add more than we need to get our minimum viable product web page to work.
Possibly Later Add: 
```
       “Attributes”: String array
```
## Teams Review
### Recipe Editor Page
- Has text fields implemented on the page

**Goals for next Meeting:**
- Drag and drop for images
- Grabbing Information from text forms

#### Recipe Viewer Page:
- Has a basic layout of the page design displaying to the page.

**Goals for next Meeting:**
- They need the recipe editor page to send their data so they can test displaying it from CSS.

## Recipe Home Page:
- Has a basic layout of the page design displaying to the page.
- Has a CSS banner display the text "Home Page".

**Goals for next Meeting:**
- Rework the home page to fit the previous GitHub Architecture _(read more down below_.

### We broke GitHub (Ahhhh!!!!)
- So the Home Page team didn't create a branch and made major changes to the main repo, renaming the file structure and now there are merge conflicts for the other team's branches.
- Long story short, we spent an hour reverting the changes of the Home Page team, and then pulled in the other branches to main so we have a good backup incase it happens again.

