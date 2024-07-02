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
                    // Pull a Docker image with Docker pre-installed
                    docker.image('docker:stable').inside {
                        // Run Docker commands inside the Docker container
                        sh 'docker --version'
                        sh 'docker pull hello-world'
                        sh 'docker run hello-world'
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

