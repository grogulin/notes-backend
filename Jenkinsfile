pipeline {
  agent any
  
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'git_credentials',
                    url: 'https://github.com/grogulin/notes-backend.git'
            }
        }
     
        stage('Deploy') {
            
            steps {
                withCredentials([usernamePassword(credentialsId: 'postgresql_prod', usernameVariable: 'DB_USER', passwordVariable: 'DB_PASSWORD')]) {
                    
                    script {
                        
                        def envContent = """
                            PORT=7000
                            DB_HOST=152.67.72.136
                            DB_PORT=5432
                            DB_NAME=notesapp_prod
                            DB_USER=$DB_USER
                            DB_PASSWORD=$DB_PASSWORD
                        """
                        
                        sh "echo '${envContent}' > .env"

                        
                    }
                    
                    sshagent(['oracle']) {
                        sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "pm2 stop notes-backend || true && rm -rf apps/notes-backend/*"'
                        sh 'scp -o StrictHostKeyChecking=no -r ./* ubuntu@152.67.72.136:apps/notes-backend/'
                        sh 'scp -o StrictHostKeyChecking=no -r ./.env ubuntu@152.67.72.136:apps/notes-backend/'
                    }
        
                    sshagent(['oracle']) {
                        sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "cd apps/notes-backend/ && npm install --production"'
                        sh 'ssh -o StrictHostKeyChecking=no ubuntu@152.67.72.136 "cd apps/notes-backend/ && pm2 start server.js --name notes-backend"'
                    }
                }
            }
        }
    }
}