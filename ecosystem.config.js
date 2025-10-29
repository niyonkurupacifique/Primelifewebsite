module.exports = {
  apps: [
    {
      name: 'life-website',
      cwd: 'C:/Users/Administrator/Primelifewebsite',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
