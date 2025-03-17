# ia-pau-data-battle



# Run

To run a specific service:

```shell
docker compose up -d <service_name>

# Exemple: docker compose up -d database
#          docker compose up -d llm
```

To stop the service:

```shell
docker compose down <service_name>

# Exemple: docker compose down database
```

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

│── server/                      # Backend en Flask (Python)
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


