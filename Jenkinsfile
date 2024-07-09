pipeline {
    agent any

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
                sh 'docker compose up -d'
                echo 'done'
                
            }
            

        }
        
        stage('stage5') {
            steps {
                echo 'clean up'
            }
        }
    }
}
