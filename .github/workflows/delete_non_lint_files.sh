#!/bin/bash

# Important Note:
# This will only run on the virtual Linux Distro that gitHub uses to Lint our code.

cd ..

# Delete all directories we don't want to lint so we don't get warnings.
rm README.md
rm -rf admin
rm -rf specs
rm -rf
