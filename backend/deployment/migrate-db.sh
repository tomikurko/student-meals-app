#!/bin/bash

BACKEND_DIR=$(dirname $0)/..
export POSTGRES_URL=jdbc:postgresql://ec2-16-16-187-196.eu-north-1.compute.amazonaws.com:54321/studentmeals

cd ${BACKEND_DIR} && \
  echo -e "\n>> Migrating production database in URL: ${POSTGRES_URL} ..\n" && \
  ./gradlew flywayMigrate
