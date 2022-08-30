#!/bin/bash

# Build Image
docker build -f ./docker/Dockerfile.prod -t zulfikar4568/notification-service .

# Push Image
docker push zulfikar4568/notification-service:latest