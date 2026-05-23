#!/bin/bash
set -e
cd packages/web
npm install --legacy-peer-deps
npx vite build
