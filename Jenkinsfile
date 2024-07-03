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

                    // Ensure necessary packages are installed
                    sh 'apt-get update'
                    sh 'apt-get install -y apt-transport-https ca-certificates curl software-properties-common'

                    // Add Docker GPG key
                    sh 'mkdir -p /etc/apt/keyrings'
                    sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker-archive-keyring.gpg'

                    // Add Docker repository
                    sh '''
                        echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
                       '''

                    // Update apt-get and install Docker packages
                    sh 'apt-get update'
                    sh 'apt-get install -y docker-ce docker-ce-cli containerd.io'

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

