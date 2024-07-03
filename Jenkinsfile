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
                script{
                    sh 'apt-get update'
                    sh 'apt-get install -y ca-certificates curl'
                    sh 'install -m 0755 -d /etc/apt/keyrings'
                    sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc'
                    sh 'chmod a+r /etc/apt/keyrings/docker.asc'
                    sh '''echo \\
                      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \\
                      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \\ tee /etc/apt/sources.list.d/docker.list > /dev/null'''
                    sh 'apt-get update'
                    sh 'apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin'
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

