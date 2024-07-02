pipeline {
    agent { label 'docker-environment'  }
   
    stages {
        
        stage('stage1checkout') {
            steps{
                echo 'to checkout'
                git branch: 'main', url: 'https://github.com/nitish-appt/new-proj.git'
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

