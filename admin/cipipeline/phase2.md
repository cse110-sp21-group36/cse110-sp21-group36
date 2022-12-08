# Phase 2 CI CD Pipeline

## Current Functionality
- All Functionality from Phase 1 Pipeline
- We have added JS Docs to our Pipeline
- More Updated Procedures for Deploying to Live-Deployment

## JS Docs
### [View Our JS Docs](https://cse110-sp21-group36.github.io/cse110-sp21-group36/source/out/)
- To update the JS Docs website, simply navigate to cse110-sp21-group36/source/assets on your local system with JS Docs already installed. Then run jsdocs ./scripts, this should result in the /source/out/ folder automatically being updated with the latest JS Docs Information.

## Expanded Procedure for Deploying to Live-Deployment
- The Branch structure is the same: Main still used for development, Live-Deployment used for Releases. The process to combine the two is a bit tricky so I will explain it here; first clone the latest version of Main that you want to deploy locally, then in another folder clone the latest version of Live-Deployment. Afterwards, delete all files in Live-Deployment except for README.md, /Live-Deployment Assets/, and .git (if you delete that the branch wont work). Then copy every file from Main into the Live-Deployment (again except the README.md and .git). If done correctly you should be able to push to Live-Deployment with everything from Main added into it. This is probably automatable, but this is much easier than trying to deal with the merge conflicts from using Git commands, in my opinon.

## Releases
- You can create a new Release tag by clicking on the right side of the Git Hub interface, make sure to set the branch of the release to Live-Deployment, and the rest should be self-explanatory.
