#!/bin/bash
set -e
cd packages/web
npm install
npx vite build
