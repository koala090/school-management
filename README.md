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

🚀 Installation Étape par Étape
🧩 Étape 1 – Cloner le projet depuis GitHub

Au lieu de créer les dossiers à la main, vous pouvez directement récupérer tout le projet depuis ce dépôt :

# Va dans le dossier où tu veux installer le projet
cd C:\Users\TonNom\Desktop

# Clone le dépôt GitHub
git clone https://github.com/koala090/school-management.git

# Entre dans le dossier du projet
cd school-management


✅ Le projet est maintenant téléchargé avec la structure complète :
backend/ + frontend/ déjà prêts à être utilisés.

⚙️ Étape 2 – Installer le Backend
cd backend

# Installe les dépendances
npm install


Vérifie le fichier .env (tu peux le modifier si besoin) :

MONGODB_URI=mongodb://localhost:27017/school_db
JWT_SECRET=your_super_secret_key_12345
PORT=5000


Lance le backend :

npm run seed
npm run dev


✅ Tu dois voir :

🚀 Server running on http://localhost:5000

🖥️ Étape 3 – Installer le Frontend

Dans un nouveau terminal :

cd frontend

# Installe les dépendances du frontend
npm install

# Lance le serveur de développement
npm run dev


✅ Tu dois voir :

Local:   http://localhost:5173/

🎯 Tester l’application

Ouvre deux PowerShell :

Terminal 1 :

cd backend
npm run dev


Terminal 2 :

cd frontend
npm run dev


Ensuite, va sur : http://localhost:5173

Connexion de test :

Email: parent1@gmail.com
Mot de passe: parent1@123

⚠️ Dépannage (Windows)
❌ MongoDB n’a pas démarré
# Ouvre PowerShell en ADMIN
net start MongoDB

❌ Port 5000 ou 5173 déjà utilisé
netstat -ano | findstr :5000
taskkill /PID <PID> /F

❌ Commande npm introuvable

Node.js n’est pas bien installé.

Redémarre ton PC ou réinstalle Node.js avec "Add to PATH" coché.

❌ "Cannot find module"
rm -r node_modules
rm package-lock.json
npm install

❌ Problème avec MongoDB Atlas

Dans .env, remplace :

MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/school_db


(Remplace user et password par tes identifiants Atlas.)

## 📁 Structure détaillée du projet



C:\Users\TonNom\Desktop\school-management
├── backend
│ ├── server.js
│ ├── package.json
│ ├── .env
│ ├── config
│ │ └── db.js
│ │
│ ├── routes
│ │ ├── auth.js
│ │ ├── notes.js
│ │ └── absences.js
│ │
│ ├── middleware
│ │ └── auth.js
│ │
│ ├── models
│ │ ├── User.js
│ │ ├── Note.js
│ │ └── Absence.js
│ │
│ ├── controllers
│ │ ├── authController.js
│ │ ├── noteController.js
│ │ └── absenceController.js
│ │
│ └── seeds
│ └── seedDB.js
│
└── frontend
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
└── src
├── main.jsx
├── App.jsx
├── index.css
│
├── assets
│ └── logo.png
│
├── components
│ ├── Navbar.jsx
│ ├── Sidebar.jsx
│ ├── TableNotes.jsx
│ ├── TableAbsences.jsx
│ └── ProtectedRoute.jsx
│
├── context
│ └── AuthContext.jsx
│
├── pages
│ ├── Login.jsx
│ ├── DashboardParent.jsx
│ ├── DashboardProf.jsx
│ ├── Notes.jsx
│ └── Absences.jsx
│
└── utils
└── api.js


---

### 🧠 Description rapide

#### 🗄️ Backend
- **server.js** → point d’entrée du serveur Express.  
- **config/db.js** → configuration et connexion à MongoDB.  
- **routes/** → toutes les routes de l’API (`auth`, `notes`, `absences`).  
- **middleware/** → middlewares personnalisés, comme l’authentification JWT.  
- **models/** → schémas Mongoose (User, Note, Absence).  
- **controllers/** → logique métier de chaque fonctionnalité.  
- **seeds/** → scripts pour insérer des données de test.  
- **.env** → variables d’environnement (clé JWT, URI MongoDB, port).  

#### 💻 Frontend
- **index.html** → fichier racine du projet React (Vite).  
- **src/** → dossier principal du code source React.  
  - **App.jsx** → structure principale de l’application.  
  - **components/** → éléments réutilisables (tableaux, navigation, etc.).  
  - **context/** → gestion du contexte d’authentification.  
  - **pages/** → pages principales de l’application (login, dashboard, etc.).  
  - **utils/api.js** → configuration Axios pour l’API backend.  
- **tailwind.config.js** et **postcss.config.js** → configuration du style.  
- **vite.config.js** → configuration de Vite (serveur de dev, plugins).  

---


🎉 C’est prêt !

Une fois les deux serveurs lancés, tu peux :

✅ Te connecter en tant que parent
✅ Consulter les notes et absences
✅ Te connecter en tant que professeur
✅ Créer / modifier / supprimer des notes et absences

💬 Besoin d’aide ?
Ouvre une issue sur GitHub ou pose ta question ici !
