module.exports = {
  apps: [
    {
      name: "app-dev",
      cwd: "/home/ubuntu/dev",
      script: "server.js",
      env: {
        NODE_ENV: "development",
        PORT: 3001,
      },
    },
    {
      name: "app-prod",
      cwd: "/home/ubuntu/production-server",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
