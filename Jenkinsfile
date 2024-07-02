pipeline {
    agent any
    environment {
        COMPOSE_VERSION = '1.29.2' // Specify the Docker Compose version
    }
    stages {
        
        stage('stage1checkout') {
            steps{
                echo 'to checkout'
                git branch: 'main', url: 'https://github.com/nitish-appt/new-proj.git'
            }
            

        }
        stage('Install Docker') {
            steps {
                script {
                    sh "curl -L https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose"
                    sh 'chmod +x /usr/local/bin/docker-compose'
                    sh 'docker-compose --version' // Verify Docker Compose installation
                }
            }
        }
        
        stage('stage3'){
            steps {
                echo 'build'
                sh 'docker compose build'
            }
            

        }
        stage('stage4'){
            steps{
                echo 'up'
                sh 'docker compose up'

            }
            

        }
        stage('stage5') {
            steps {
                echo 'clean up'
            }
        }
    }
}

