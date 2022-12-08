# Phase 1 CI CD Pipeline

## Current Functionality
### CSS Linting 
 - We have via a GitHub Actions Workflow called Super Linter. Its specific filepath is:
```
github/super-linter@v4.9.7
```
 - This is accessed using the GitHub Actions tab and clicking "lint", then clicking ⭐ Super Linter ⭐.
 - We have run into issues with this in the past, where it gets too agressive with the syntax highlighting, in the future we might consider adjusting so it doesn't produce a million "missing indentation 2 spaces" errors.

### HTML Validation
 - For HTML 5 Validation we use a GitHub Actions Workflow called html5validator. Its specific filepath is:
```
uses: Cyb3r-Jak3/html5validator-action@v7.2.0
```
 - Likewise, this is accessed using the GitHub Actions tab and clicking "validate", then clicking 🟥 HTML5 Validator 🟥.
From what we've tested it provides near identical results to the [W3 Validator](https://validator.w3.org/) we used in Lab 2.

### Pull Request (Manual Testing)
Our current process for reviewing code quality is to have Code Reviews done manually by both team leads: Meron & Triston, whom manually review the changes being added when a branch is pulled to main. We have also experimented with merging Pull Requests during our Team Meetings, that way everyone can feel like they have final say on the quality of code that goes into our project.

### Pushing to Live Deployment (Continuous Delivery)
We do most of our development and testing on the main branch, but we will use the Live-Deployment branch as our main source of "Quality Code", so we can continue to test things out on main before sending our finished product to the Live-Deployment branch for commercial use.

## CI CD Timing
 - It's important that our Validation and Linting process occur quickly, here you can see that our automated Continouos Integration proceses run in under 2 and a half minutes:
 <img src="https://github.com/cse110-sp21-group36/cse110-sp21-group36/blob/main/admin/cipipeline/phase1.png" width="1400" height="800">

## CI CD Phase 1 Diagram
<img src="https://github.com/cse110-sp21-group36/cse110-sp21-group36/blob/main/admin/cipipeline/CICD%20Assets/CICDTiming.PNG" width="800" height="500">

## Using the Pipeline
 - Since our Pipeline is done entirely through GitHub actions, you can just click on the Actions tab at the top of GitHub and go to "lint" or "validate" depending on which one you want to check. Everything happens automatically whenever a commit or pull request to the main branch occurs thanks to our GitHub Actions workflow file called "Main_Build.yml". Here are some photos showing how to access these features:
  - **Super Linter:**
  <img src="https://github.com/cse110-sp21-group36/cse110-sp21-group36/blob/main/admin/cipipeline/CICD%20Assets/CICDsuperlinter.PNG" width="600" height="500">

  - **Html 5 Validator:**
  <img src="https://github.com/cse110-sp21-group36/cse110-sp21-group36/blob/main/admin/cipipeline/CICD%20Assets/CICDvalidator.PNG" width="600" height="500">

## Planned Features
 - **Jest** - We decided in our latest team meeting, on 11/28/22, to add end-to-end testing using Jest once the project is fully complete, in order to run basic test cases that will ensure our web app's minimum functionality requirements are being met. 
We noted that it is not preferable to have testing run at the very end, as testing throughout development makes the process of bug-fixing much smoother. However, due to time constraints this is the best we could do. On the flip side though, running tests later in development has some marginal benefits, as we have the exact web app functionality worked out beforehand; thus we don't waste time automating testing for a process that isn't even possible by hand yet. Finally, we decided to do Jest specically because it's testing output in console is very satisfying, and when done correctly it gives us more warrant to declare the project as finished if have a nice testing screen like this after:
- ~~(Likely won't happen)~~ **JS Doc** - We already have most of our Javascript comments written in JS Doc format, so we might be able to install a module to auto-generate JS Documentation. We're pretty late in the game right now though, so this is more of a considered feature than something we want to prioritize.

## Summary
We currently have 3 main methods of code verification via linting, validating, and manual review. What's convenient is that all parts of our code verifier occur strictly within GitHub itself, which allows our developers to quickly check whether their latest commit had issues, and then take care of the issues within a timely manner. We considered using external methods of verification, but decided they were too difficult to work with to be worth the trouble of a small-scale project like ours. Finally, we do a final manual verification within our pull requests to make sure standards are met before merging to the main branch; which is then merged to our Live-Deployment branch for deployment and use by all users.
