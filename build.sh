#!/bin/bash
npm install pnpm --save-dev
npm create vitepress@latest my-vitepress-docs
npm.cmd i vitepress-plugin-shiki-twoslash

npm run docs:build
npm run docs:serve