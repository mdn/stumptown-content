#!/bin/bash -e
npm install -g
npm run lint-md
npm run spell-md -- -r
