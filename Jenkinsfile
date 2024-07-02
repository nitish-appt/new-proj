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
                    apt-get update
                    sh 'apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin'
                    
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

