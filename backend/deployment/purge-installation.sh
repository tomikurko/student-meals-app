#!/bin/bash

echo -e -n "\n>> REMOVING STUDENT MEALS PRODUCTION SYSTEM AND ALL ITS DATA. Are you sure? [YES|NO] "
read answer

if [ "$answer" == "YES" ]; then
    echo -e "\n"
    ssh ec2-user@ec2-16-16-187-196.eu-north-1.compute.amazonaws.com "cd ~/studentmeals && docker-compose down --volumes && cd && rm -rf ~/studentmeals"
    echo -e "\n>> Removed.\n"
else
    echo -e "\n>> Canceled.\n"
fi
