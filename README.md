## Multi Environment Node.js Deployment

This project demonstrates a complete multi-environment deployment pipeline for a Node.js backend, using:

- GitHub Actions (CI/CD)
- PM2 process manager
- Nginx reverse proxy
- Linux (Ubuntu)
- Branch-based deployments (dev → dev server, main → prod server)
- Optional Docker images (for containerized workflows)

## CI/CD Pipeline

### Push to dev branch

- Pulls latest code into /home/ubuntu/dev
- Installs dependencies
- Restarts app-dev via PM2

### Push to main branch

- Pulls code into /home/ubuntu/production-server
- Installs dependencies
- Restarts app-prod

## Docker Support (Optional)

The project includes two Dockerfiles:

- Dockerfile.dev → development image
- Dockerfile.prod → production image

## Tech Used

- Node.js / Express
- PM2
- Nginx
- GitHub Actions
- Docker (optional)
- Linux (Ubuntu)
