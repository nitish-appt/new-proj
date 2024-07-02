pipeline {
    agent any
   
    stages {
        
        stage('stage1checkout') {
            steps{
                echo 'to checkout'
                git branch: 'main', url: 'https://github.com/nitish-appt/new-proj.git'
            }
            

        }
        stage('stage2'){
            steps {

                echo 'install if dependencies'
                script {
                    // Download Docker installation script
                    sh 'curl -fsSL https://get.docker.com -o get-docker.sh'
                    
                    // Install Docker using the downloaded script
                    sh 'sh get-docker.sh'
                    
                    // Verify Docker installation
                    sh 'docker --version'
                }

            }
            
        }
        stage('stage3'){
            steps {
                echo 'build'
                sh 'docker-compose build'
            }
            

        }
        stage('stage4'){
            steps{
                echo 'up'
                sh 'docker-compose up'

            }
            

        }
        stage('stage5') {
            steps {
                echo 'clean up'
            }
        }
    }
}

