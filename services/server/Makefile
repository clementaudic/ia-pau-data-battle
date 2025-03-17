# Variables
PYTHON = python3
VENV = venv

# Commande pour vérifier si un environnement virtuel existe
VENV_EXISTS = [ -d $(VENV) ]

.PHONY: install run clean

all: install run

## 📍 3. Installation complète
install: clean
	@echo "🔧 Création et activation de l'environnement virtuel..."
	$(VENV_EXISTS) || $(PYTHON) -m venv $(VENV)
	@echo "✅ Environnement virtuel créé !"
	@echo "📦 Installation des dépendances..."
	. $(VENV)/bin/activate
	pip install -r requirements.txt
	prisma db push --schema=libs/database/schema.prisma
	@echo "✅ Backend installé !"

## 📍 4. Lancer le backend (Flask)
run:
	@echo "🚀 Démarrage du backend..."
	python app.py

## 📍 7. Nettoyer les fichiers inutiles
clean:
	@echo "🧹 Nettoyage des fichiers temporaires..."
	rm -rf $(VENV)
	@echo "✅ Nettoyage terminé !"
