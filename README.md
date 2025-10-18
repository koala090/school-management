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

## 🚀 Installation — Étape par Étape

### 🧩 Étape 1 — Cloner le projet depuis GitHub
Au lieu de créer manuellement les dossiers, clonez directement le dépôt :

```bash
# Place-toi dans le dossier où tu veux installer le projet (ex. Bureau)
cd C:\Users\TonNom\Desktop

# Clone le dépôt
git clone https://github.com/koala090/school-management.git

# Entre dans le dossier du projet
cd school-management
✅ Le projet est maintenant téléchargé avec la structure complète (backend/ + frontend/).```


### ⚙️ Étape 2 — Installer le backend
``` bash
Copy code
# Va dans le dossier backend
cd backend

# Installe les dépendances
npm install
👉 Vérifie (ou crée) le fichier .env à la racine de backend/ :

env
Copy code
MONGODB_URI=mongodb://localhost:27017/school_db
JWT_SECRET=your_super_secret_key_12345
PORT=5000
Modifie MONGODB_URI si tu utilises MongoDB Atlas.

Lance le backend :

bash
Copy code
# (optionnel) insère les données de test
npm run seed

# démarre le serveur en dev
npm run dev
✅ Tu dois voir un message du type :

arduino
Copy code
🚀 Server running on http://localhost:5000
### 🖥️ Étape 3 — Installer le frontend
Ouvre un nouveau terminal (pour garder le backend en cours) puis :

bash
Copy code
# Va dans le dossier frontend
cd frontend

# Installe les dépendances
npm install

# Lance le serveur de développement
npm run dev
✅ Tu dois voir :

arduino
Copy code
Local:   http://localhost:5173/
🎯 Tester l’application (mode rapide)
Ouvre deux terminaux (ou onglets) :

Terminal 1

bash
Copy code
cd school-management\backend
npm run dev
Terminal 2

bash
Copy code
cd school-management\frontend
npm run dev
Ouvre ton navigateur à : http://localhost:5173

Compte de test :

graphql
Copy code
Email: parent1@gmail.com
Mot de passe: parent1@123
⚠️ Dépannage (Windows)
MongoDB n’a pas démarré

bash
Copy code
# Ouvrir PowerShell en tant qu'administrateur
net start MongoDB
Le port 5000 ou 5173 est déjà utilisé

bash
Copy code
netstat -ano | findstr :5000
# puis, si nécessaire
taskkill /PID <PID> /F
Commande npm introuvable

Node.js n’est pas correctement installé : redémarre le PC ou réinstalle Node.js en cochant "Add to PATH".

Erreur Cannot find module

bash
Copy code
# Supprime et réinstalle les dépendances
rm -r node_modules
rm package-lock.json
npm install
Utilisation de MongoDB Atlas

Dans backend/.env, remplace MONGODB_URI par ta chaîne Atlas :

env
Copy code
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/school_db
Remplace user et password par tes identifiants Atlas.

📁 Structure détaillée du projet
pgsql
Copy code
C:\Users\TonNom\Desktop\school-management
├── backend
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config
│   │   └── db.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── notes.js
│   │   └── absences.js
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   ├── User.js
│   │   ├── Note.js
│   │   └── Absence.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── noteController.js
│   │   └── absenceController.js
│   └── seeds
│       └── seedDB.js
└── frontend
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── assets
        │   └── logo.png
        ├── components
        │   ├── Navbar.jsx
        │   ├── Sidebar.jsx
        │   ├── TableNotes.jsx
        │   ├── TableAbsences.jsx
        │   └── ProtectedRoute.jsx
        ├── context
        │   └── AuthContext.jsx
        ├── pages
        │   ├── Login.jsx
        │   ├── DashboardParent.jsx
        │   ├── DashboardProf.jsx
        │   ├── Notes.jsx
        │   └── Absences.jsx
        └── utils
            └── api.js

