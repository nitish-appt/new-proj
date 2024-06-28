# Configure the AWS provider
provider "aws" {
  region = "var.AWS_REGION"
}

# Create an EC2 instance
resource "aws_instance" "aws_instance_ntier" {
  ami           = "var.AMI"
  instance_type = "t2.micro"
  key_name      = "var.KEY_NAME"
  security_groups = [
    "default",
    "allow-ssh"
  ]

# Provision Docker
user_data = <<-EOF
#!/bin/bash
yum update -y
yum install -y docker
service docker start
usermod -a -G docker ec2-user
EOF
}

terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

# Configure the Docker provider
provider "docker" {
    host = "tcp://${aws_instance.aws_instance_ntier.private_ip}:2375/"
    registry_auth {
        address  = "https://hub.docker.com/repositories/apptDevOps"
        username = "var.DOCKER_SERVER_NAME"
        password = "var.DOCKER_PASSWORD"
      }
}

 
resource "docker_registry_image" "web" {
    name = "apptDevOps/web:latest"
}
 
resource "docker_registry_image" "mobile" {
    name = "apptDevOps/mobile:latest"
}
 
resource "docker_registry_image" "api" {
    name = "apptDevOps/api:latest"
}
 
resource "docker_registry_image" "postgres" {
    name = "apptDevOps/postgres:latest"
}


# Create a named volume
resource "docker_volume" "postgres_data" {
    name = "postgres-data"
} 


# Create a Docker network
resource "docker_network" "ntier" {
    name = "ntier"
}

    
# Create the Postgres Container
resource "docker_container" "postgres" {
    image = docker_registry_image.postgres.name
    name = "postgres"
    env = [
        "POSTGRES_USER=",
        "POSTGRES_PASSWORD=",
        "POSTGRES_DB="
        ] 

    ports {
        internal = 5432
        external = 5432
        }
    volumes {
        host_path = docker_volume.postgres_data.name
        container_path = "/var/lib/postgresql/data"
        }
    networks_advanced {
        name = docker_network.ntier.name
        }
}  
    
   
# Create the Api Container
resource "docker_container" "api" {
    image = docker_registry_image.api.name
    name = "api"
    ports {
        internal = 4000
        external = 4000
    }
    networks_advanced {
        name = docker_network.ntier.name
    }
    volumes {
        host_path = docker_volume.postgres_data.name
        container_path = "/var/lib/postgresql/data"
    }
    depends_on = [docker_container.postgres]
}   

 
# Create the Web Container
resource "docker_container" "web" {
    image = docker_registry_image.web.name
    name = "web"
    ports {
        internal = 3000
        external = 3000
    }
    networks_advanced {
        name = docker_network.ntier.name
    }
}  
 
# Create the Mobile Container
resource "docker_container" "mobile" {
    image = docker_registry_image.mobile.name
    name = "mobile"
    ports {
        internal = 2000
        external = 2000
    }
    networks_advanced {
        name = docker_network.ntier.name
    }
}  
 
 



