#!/bin/bash

DEPLOYMENT_DIR=$(dirname $0)

echo -e -n "\n>> PostgreSQL password: "
read -s POSTGRES_PASSWORD
echo -e -n "\n>> AWS access key ID: "
read -s AWS_ACCESS_KEY_ID
echo -e -n "\n>> AWS secret access key: "
read -s AWS_SECRET_ACCESS_KEY
echo -e "\n"

echo -e "\n>> Copying files to the production server ..\n"
scp -r ${DEPLOYMENT_DIR}/studentmeals ec2-user@ec2-16-16-187-196.eu-north-1.compute.amazonaws.com:~

echo -e "\n>> Starting up the servers ..\n"
ssh ec2-user@ec2-16-16-187-196.eu-north-1.compute.amazonaws.com \
    "sed -i 's/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=${POSTGRES_PASSWORD}/' ~/studentmeals/.env && " \
    "sed -i 's/AWS_ACCESS_KEY_ID=.*/AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}/' ~/studentmeals/.env && " \
    "sed -i 's,AWS_SECRET_ACCESS_KEY=.*,AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY},' ~/studentmeals/.env && " \
    "cd ~/studentmeals && " \
    "docker pull public.ecr.aws/o6b6o8s4/studentmeals && " \
    "docker-compose up -d"

echo -e "\n>> Waiting for PostgreSQL to start up ...\n"
sleep 10

POSTGRES_PASSWORD=${POSTGRES_PASSWORD} ${DEPLOYMENT_DIR}/migrate-db.sh

echo -e "\n\n>> Student Meals production system installation completed.\n"
