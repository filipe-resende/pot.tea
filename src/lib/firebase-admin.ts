import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Configuração da conta de serviço
const serviceAccount = {
  type: "service_account",
  project_id: "toe-pot",
  private_key_id: "944ad2031dbf3c9610365cb01bdfd3d94ef0c787",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC81Nif9rsiTO+I\nUKVubMCelReCGAimUmpSIAWSIvlpmsuPvLMraUeiytWucRxPdcArp446LTojelmB\nHhaemI0AeW/NmaDBQl+kZEDFZDsHsk5sUwqPKmqTQI/9KtPE4Qc5xaAVkuZ8kGpf\nZ3QfqeTsb6esCCdRFu/aRFeF0DvFad69twb/qw3S7zUqlrsbFXXUMbSJqziVrVt/\nNxXv1ClKVv7m87w7RTbH571xTUw86w2Fs0x7i+1NIkLgvszrZN0Xd13ZuRxTRkqA\nuBw2ByGtQKAvRP34YR+5P9HuLJ/wzwSuWkUG5ncPwURVvBEaus7PeIclz+ZghHvp\nc3PSUsIpAgMBAAECggEAFgqLMZrRa5bK4+Cz+rB3iFszSARpqA5ZKjZiKBVsgvrm\nVWQLjt7mVXZzHD5INW8za/UOKTTDw0XiAiwCrGb2mG5UUk2jIcPPWac5F0FUkZiq\nxkKoKh9jmsYPuJeh6epxVzk97x67SCFsRTAUcii4169NxUsbWcABZbsR80Tj4S4/\n0mKg+4zypz/FRaqJBQ6+LYA1Oz5JCOjQL44A6kS4ukJhaU4H/F9rRvWpWM3vybpa\nm1Ke7YCRJ90aoAMOAfwvgWHPssvT7jBCWe3QLOgkgsZR1tST5rXkieIm0CTPFPPq\nrJDG19dE1egpQsTySUejoktZo5gre0mhlgQaNVMvvQKBgQDgqNo2U3/lS6zwB45J\n9BQmz3plagIsl+o6GoLml37/DpiDo6BdIKZy3wFNTRphiGqnT47SE1DSdAtCNCCg\nIT9Wa2lUcCWmklh0kVNe6Jo/meiyAProDw27/s1///E1k2opF4XImilnsENMgklC\n1KMTd9CNwn/SqV85brViWpSEPQKBgQDXLHtz5I0jLx9hxtnvmw2u0iu32r8mThmz\nm2VzaZRSe/XG5Xl+zHcrxd07tgWrOXy/rLXTXJw7b+AHNFizXk6a10f8wkyy3mny\nvgkIeXrbiTA0FaDcgC1BjRhM832LHlISOuC4eVnjeB9dZ0Pz47DhKyouUJ7cGytJ\notX0cG0YXQKBgGNEeNcUYijRHWMaE5c90EGt36k8BCXsIkT2Pezh9+1/Z4iTHmLH\n8IRFYW/kp8l825N+Jd9RRZ8YQ3lHSzs2NaRb5bi3rQtDEu6+4BXJtY5w1U8B+9vZ\n+vmchvUOBGjl8Dyj9itDYxQ74CDIWNK83inWAUMCNDTDPh5EesUwvPsJAoGBALm+\n/nsW6vdacF65h9ydHvyxFWhK/wOUG/+9v6AXniBuPcaKxYy9+Ini7o3jHZWntJbK\nAtQIeB2e/+d4OrHsUTK9cLkzCX7HHPKdNbMJGxN0pBXyLcDrLSYPJNEYyGFVtUdj\naCYXK49/XKQGxtQ8064s0ubUVa5wDbgtR0ER5DtJAoGAIR/C162SsgSTHnRghjsD\nkbjgNYzrAPgi1/fcP7cTCvL10/OOugOc92Urv6bUJLE9kCUzyKZ0Nr+IiQBjDyiv\nu7epGrAFDhdwGJWPlbo2mdtcMM+OJGOw8CxwJVAf0UDCUGVCc58K9WzEaWNMSYXd\nuHtJ0St/SCrLOweBbFetWwk=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@toe-pot.iam.gserviceaccount.com",
  client_id: "110577735377981707781",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40toe-pot.iam.gserviceaccount.com"
};


// Inicializar Firebase Admin (apenas se ainda não foi inicializado)
const adminApp = getApps().length === 0 
  ? initializeApp({
      credential: cert(serviceAccount as any),
      projectId: "toe-pot"
    })
  : getApps()[0];

// Obter instância do Firestore Admin
export const adminDb = getFirestore(adminApp);

export default adminApp;
