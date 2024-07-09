pipeline {
    agent any
    environment {
        POSTGRES_USER: postgres 
        POSTGRES_DB: db-test-generated-api
        POSTGRES_PASSWORD: postgres 
    }
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
