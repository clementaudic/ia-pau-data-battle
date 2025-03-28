# Variables
PYTHON = python3
VENV = venv

# Commande pour vérifier si un environnement virtuel existe
VENV_EXISTS = [ -d $(VENV) ]

.PHONY: install run clean db embed

all: install run

## 📍 3. Installation complète
install: clean
	@echo "🔧 Création et activation de l'environnement virtuel..."
	$(VENV_EXISTS) || $(PYTHON) -m venv $(VENV)
	@echo "✅ Environnement virtuel créé !"
	@echo "📦 Installation des dépendances..."
	. $(VENV)/bin/activate
	pip install -r requirements.txt
	make db
	@echo "✅ Backend installé !"

db:
	prisma db push --schema=libs/database/schema.prisma

embed:
	@echo "📦 Embedding documents..."
	flask embed-documents

## 📍 4. Lancer le backend (Flask)
run:
	@echo "🚀 Démarrage du backend..."
	FLASK_APP=app.py flask run --port 5000 --reload

## 📍 7. Nettoyer les fichiers inutiles
clean:
	@echo "🧹 Nettoyage des fichiers temporaires..."
	rm -rf $(VENV)
	@echo "✅ Nettoyage terminé !"
