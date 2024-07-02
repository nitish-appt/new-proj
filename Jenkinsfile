pipeline {
    
     environment {
        DOCKER_VERSION = '20.10.7'  // Specify the Docker version to install (optional)
        HOME = "/home/jenkins"      // Define Jenkins user's home directory
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
                    // Download Docker installation script
                    sh 'curl -fsSL https://get.docker.com -o get-docker.sh'
                    
                    // Install Docker using the downloaded script
                    dir("$HOME") {
                        sh 'sh get-docker.sh'
                    }
                    
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

