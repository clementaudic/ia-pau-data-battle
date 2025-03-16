# ia-pau-data-battle


Every PDFs in

```
data/
    |_ raw/
        |_ first.pdf
        |_ second.pdf
        |_ ...
services/
...
```

Architecture du backend : 

server/
│── app.py                # Fichier principal du serveur Flask
│── config.py             # Configuration de l'application (ex: API keys, DB)
│── requirements.txt      # Dépendances Python
│── run.sh                # Script pour lancer le serveur
│
├── models/               # Contient les modèles d'IA entraînés
│   ├── model.py         # Code du modèle IA
│   ├── train.py         # Script d'entraînement
│   ├── model.pkl        # Modèle entraîné (si sérialisé en pickle)
│
├── routes/               # Contient les routes API
│   ├── __init__.py      # Initialise le module routes
│   ├── ai.py           # Routes liées à l'IA (génération de questions, correction)
│   ├── user.py         # Routes liées aux utilisateurs (si nécessaire)
│
├── services/             # Services et logique métier
│   ├── ai_service.py    # Fonctions pour interagir avec l'IA
│   ├── db_service.py    # Connexion et gestion de la base de données
│
├── utils/                # Fonctions utilitaires
│   ├── preprocessing.py # Nettoyage et préparation des données
│   ├── helpers.py       # Fonctions utilitaires diverses



Proposition d'une autre architecture pour tout le projet : 

/legal-chatbot-rag
│── backend/                      # Backend en Flask (Python)
│   ├── app.py                    # Serveur principal Flask
│   ├── models/                    # Modèles IA & NLP
│   │   ├── rag_model.py           # Pipeline RAG (embedding + retrieval)
│   │   ├── llm_model.py           # Interface avec un LLM (GPT, Llama, etc.)
│   │   ├── question_generator.py  # Génération de questions
│   ├── routes/                    # Routes API Flask
│   │   ├── chatbot.py             # Endpoints pour la conversation IA
│   │   ├── documents.py           # Upload et extraction de documents
│   ├── utils/                     # Fonctions utilitaires
│   │   ├── pdf_processing.py      # Extraction de texte des PDF
│   │   ├── embedding.py           # Génération d’embeddings (vecteurs)
│   │   ├── retrieval.py           # Recherche documentaire (vecteurs)
│   ├── data/                      # Fichiers de données
│   │   ├── legal_docs/            # Tous les PDF légaux
│   ├── requirements.txt           # Dépendances Python
│
│── frontend/                      # Frontend en Next.js (React)
│   ├── pages/                     # Pages principales
│   │   ├── index.js               # Page principale avec le chatbot
│   │   ├── ask.js                 # Page pour poser des questions
│   │   ├── generate.js            # Page pour générer des questions
│   ├── components/                 # Composants React
│   │   ├── Chatbot.js             # Interface du chatbot
│   │   ├── UploadDocs.js          # Upload de fichiers
│   ├── services/                   # Gestion des requêtes API
│   │   ├── api.js                  # Fonctions pour interagir avec Flask
│   ├── package.json                # Dépendances Next.js
│
│── .gitignore
│── README.md


