# 🔥 Configuração do Firebase - Conta de Serviço

## 📋 Pré-requisitos

1. Projeto Firebase criado no [Firebase Console](https://console.firebase.google.com)
2. Firestore Database ativado
3. Conta de serviço criada

## 🔑 Configuração da Conta de Serviço

### 1. Baixar a Chave da Conta de Serviço

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto: **toe-pot**
3. Vá em **Configurações do Projeto** (ícone de engrenagem)
4. Clique na aba **Contas de serviço**
5. Clique em **Gerar nova chave privada**
6. Baixe o arquivo JSON

### 2. Extrair as Credenciais

Do arquivo JSON baixado, extraia os seguintes valores:

```json
{
  "type": "service_account",
  "project_id": "toe-pot",
  "private_key_id": "SEU_PRIVATE_KEY_ID",
  "private_key": "-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@toe-pot.iam.gserviceaccount.com",
  "client_id": "SEU_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40toe-pot.iam.gserviceaccount.com"
}
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
# Firebase Configuration (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=toe-pot.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=toe-pot
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=toe-pot.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id

# Firebase Admin SDK Configuration (Server-side)
FIREBASE_PROJECT_ID=toe-pot
FIREBASE_PRIVATE_KEY_ID=seu_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nsua_chave_privada_aqui\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@toe-pot.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=seu_client_id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40toe-pot.iam.gserviceaccount.com
```

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
pnpm install
```

### 2. Executar o Projeto

```bash
pnpm dev
```

### 3. Acessar as Páginas

- **Lista de Presentes**: `http://localhost:3000/presentes`
- **Painel Admin**: `http://localhost:3000/admin`

## 🎯 Funcionalidades

### Lista de Presentes (`/presentes`)
- ✅ Visualizar todos os presentes disponíveis
- ✅ Marcar presentes como dados
- ✅ Prevenção de duplicatas
- ✅ Interface responsiva com imagens

### Painel Administrativo (`/admin`)
- 📊 Estatísticas dos presentes dados
- 📋 Lista completa de presentes dados
- 🗑️ Remover presentes individuais
- 🧹 Limpar todos os presentes
- 🔄 Atualizar dados em tempo real

## 🔒 Segurança

- A conta de serviço tem acesso completo ao Firestore
- Mantenha as credenciais seguras
- Nunca commite o arquivo `.env.local`
- Use apenas em ambiente de desenvolvimento/produção seguro

## 🛠️ Estrutura do Banco de Dados

### Coleção: `gifts`

```typescript
interface Gift {
  id?: string;                    // ID do documento
  name: string;                   // Nome do presente
  category: string;               // Categoria (cozinha, quarto, lavanderia)
  givenBy?: string;               // Quem vai dar (opcional)
  givenAt?: Timestamp;            // Quando foi confirmado
  createdAt: Timestamp;           // Quando foi criado no sistema
}
```

## 🚨 Solução de Problemas

### Erro: "Firebase App named '[DEFAULT]' already exists"
- O Firebase já foi inicializado
- Verifique se não há múltiplas inicializações

### Erro: "Permission denied"
- Verifique as regras do Firestore
- Confirme se a conta de serviço tem as permissões corretas

### Erro: "Invalid private key"
- Verifique se a chave privada está correta
- Confirme se as quebras de linha (`\n`) estão preservadas

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todas as variáveis de ambiente estão corretas
2. Confirme se o Firestore está ativado
3. Teste as credenciais no Firebase Console
