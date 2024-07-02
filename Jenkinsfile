pipeline {
    agent any
     
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
                    // Install Docker on Debian/Ubuntu
                    sh 'apt-get update'
                    sh 'apt-get install -y docker.io'
                    
                    // Start Docker service
                    sh 'service docker start'
                    
                    // Verify Docker installation
                    sh 'docker --version'
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

