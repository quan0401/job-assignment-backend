#!/bin/bash

function program_is_installed {
  local return_=1

  type $1 >/dev/null 2>&1 || { local return_=0; }
  echo "$return_"
}

# Install CodeDeploy agent
sudo yum update -y
cd /home/ec2-user

if [ $(program_is_installed docker) == 0 ]; then
  # sudo amazon-linux-extras install docker -y: this command is for amazon linux 2
  sudo yum install docker -y
  sudo systemctl start docker
  sudo chmod 666 /var/run/docker.sock # add execution permission

  # install docker-compose
  sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m) -o /usr/bin/docker-compose && sudo chmod 755 /usr/bin/docker-compose && docker-compose --version.

fi
