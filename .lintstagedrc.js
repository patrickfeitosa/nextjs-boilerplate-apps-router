module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'npm run lint:js',
    'npm run lint:css',
    'npm run test --findRelatedTests --bail'
  ],
};
