# school-management
Parfait 👍 Voici le **code complet prêt à coller directement** dans ton fichier `README.md` :

---

````markdown
# 🪟 GUIDE WINDOWS – PLATEFORME SCOLAIRE (MVP)

## 📋 Prérequis

### 1️⃣ Installer Node.js
1. Télécharge depuis [https://nodejs.org](https://nodejs.org) (**version LTS recommandée**).  
2. Exécute l’installateur `.msi`.  
3. Coche **"Add to PATH"** ✅  
4. Redémarre ton PC après l’installation.  

Vérifie l’installation :
```bash
node --version
npm --version
````

---

### 2️⃣ Installer MongoDB

#### Option A – MongoDB Local (recommandé)

1. Télécharge depuis : [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Exécute l’installateur.
3. Coche **"Install MongoDB as a Service"** ✅
4. Termine l’installation par défaut.
5. MongoDB démarre automatiquement.

Pour démarrer manuellement :

```bash
# Ouvre PowerShell en tant qu'administrateur
net start MongoDB
```

#### Option B – MongoDB Atlas (Cloud)

1. Va sur [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crée un compte gratuit.
3. Crée un cluster gratuit.
4. Copie ta **connection string** (tu l’utiliseras plus tard).

---

## 🚀 Installation Étape par Étape

### 🧩 Étape 1 – Préparer les dossiers

1. Crée un dossier sur ton bureau : **school-management**
2. Ouvre PowerShell dans ce dossier :

   * `Shift + clic droit` → *Ouvrir PowerShell ici*
   * ou tape `powershell` dans la barre d’adresse.

```bash
cd C:\Users\TonNom\Desktop\school-management
```

---

### ⚙️ Étape 2 – Configuration du Backend

```bash
# Crée le dossier backend
mkdir backend
cd backend

# Initialise le projet Node
npm init -y

# Installe les dépendances
npm install express mongoose jsonwebtoken cors dotenv nodemon
```

Crée les fichiers suivants :

#### `backend/package.json`

```json
{
  "name": "school-management-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "seed": "node seeds/seedDB.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

#### `backend/.env`

```env
MONGODB_URI=mongodb://localhost:27017/school_db
JWT_SECRET=your_super_secret_key_12345
PORT=5000
```

Crée les dossiers :

```bash
mkdir config routes middleware seeds
```

Copie les fichiers correspondants :

```
server.js → backend/
config/db.js → backend/config/
middleware/auth.js → backend/middleware/
routes/auth.js → backend/routes/
routes/notes.js → backend/routes/
routes/absences.js → backend/routes/
seeds/seedDB.js → backend/seeds/
```

Lance le backend :

```bash
npm run seed
npm run dev
```

✅ Tu dois voir :

```
🚀 Server running on http://localhost:5000
```

---

### 🖥️ Étape 3 – Configuration du Frontend

Ouvre un **nouveau PowerShell** dans le dossier `school-management` :

```bash
cd C:\Users\TonNom\Desktop\school-management
mkdir frontend
cd frontend

npm init -y
npm install react react-dom react-router-dom axios
npm install -D vite @vitejs/plugin-react tailwindcss autoprefixer postcss
```

Crée les dossiers :

```bash
mkdir src src\pages src\components src\context src\utils
```

Crée les fichiers :

```
frontend/vite.config.js
frontend/tailwind.config.js
frontend/postcss.config.js
frontend/index.html
frontend/src/index.css
frontend/src/main.jsx
frontend/src/App.jsx
```

Structure :

```
src/
  ├── context/AuthContext.jsx
  ├── utils/api.js
  ├── pages/Login.jsx
  ├── pages/DashboardParent.jsx
  ├── pages/DashboardProf.jsx
  ├── components/TableNotes.jsx
  └── components/TableAbsences.jsx
```

Lance le frontend :

```bash
npm run dev
```

✅ Tu dois voir :

```
Local:   http://localhost:5173/
```

---

## 🎯 Tester l’application

Ouvre deux PowerShell :

**Terminal 1 :**

```bash
cd backend
npm run dev
```

**Terminal 2 :**

```bash
cd frontend
npm run dev
```

Ensuite, va sur : [http://localhost:5173](http://localhost:5173)

Connexion de test :

```
Email: parent1@gmail.com
Mot de passe: parent1@123
```

---

## ⚠️ Dépannage (Windows)

### ❌ MongoDB n’a pas démarré

```bash
# Ouvre PowerShell en ADMIN
net start MongoDB
```

### ❌ Port 5000 ou 5173 déjà utilisé

```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ Commande `npm` introuvable

* Node.js n’est pas bien installé.
* Redémarre ton PC ou réinstalle Node.js avec **"Add to PATH"** coché.

### ❌ "Cannot find module"

```bash
rm -r node_modules
rm package-lock.json
npm install
```

### ❌ Problème avec MongoDB Atlas

Dans `.env`, remplace :

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/school_db
```

(Remplace `user` et `password` par tes identifiants Atlas.)

---

## 📁 Structure finale

```
C:\Users\TonNom\Desktop\school-management\
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   ├── routes/
│   ├── middleware/
│   └── seeds/
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
```

---

## 🎉 C’est prêt !

Une fois les deux serveurs lancés, tu peux :

✅ Te connecter en tant que **parent**
✅ Consulter les **notes** et **absences**
✅ Te connecter en tant que **professeur**
✅ Créer / modifier / supprimer des notes et absences

---

💬 **Besoin d’aide ?**
Ouvre une *issue* sur GitHub ou pose ta question ici !

```

---

Souhaites-tu que je t’ajoute en haut un petit **titre stylisé** avec badges GitHub (Node.js, React, MongoDB, License, etc.) pour rendre ton `README.md` plus pro ?
```
