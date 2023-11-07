#!/bin/bash

BACKEND_DIR=`pwd`/$(dirname $0)/..

echo -e -n "\n>> PostgreSQL password: "
read -s POSTGRES_PASSWORD
echo -e "\n"

sed -i "" "s/spring\.datasource\.password=.*/spring.datasource.password=${POSTGRES_PASSWORD}/" "${BACKEND_DIR}/src/main/resources/application.properties"

cd ${BACKEND_DIR} && \
  echo -e "\n>> Building image ..\n" &&
  ./gradlew bootBuildImage --imageName=studentmeals/server && \
  echo -e "\n\n>> Pushing image to AWS Elastic Container Registry ..\n" &&
  aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/o6b6o8s4 &&
  docker image tag studentmeals/server:latest public.ecr.aws/o6b6o8s4/studentmeals:latest && \
  docker image push public.ecr.aws/o6b6o8s4/studentmeals:latest

sed -i "" "s/spring\.datasource\.password=.*/spring.datasource.password=studentmeals-secret/" "${BACKEND_DIR}/src/main/resources/application.properties"

echo -e "\n>> Done.\n"
