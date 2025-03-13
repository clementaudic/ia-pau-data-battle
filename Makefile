# Variables
PYTHON = python
VENV = services/server/venv
FRONTEND_DIR = services/ui
BACKEND_DIR = services/server
PORT_BACKEND = 5000
PORT_FRONTEND = 3000

# Commande pour vérifier si un environnement virtuel existe
VENV_EXISTS = [ -d $(VENV) ]

.PHONY: setup-backend setup-frontend install run-backend run-frontend run clean update

all: install run

## 📍 1. Installer le backend (Flask)
setup-backend:
	@echo "🔧 Création et activation de l'environnement virtuel..."
	$(VENV_EXISTS) || $(PYTHON) -m venv $(VENV)
	@echo "✅ Environnement virtuel créé !"
	@echo "📦 Installation des dépendances..."
	. $(VENV)/bin/activate && pip install -r $(BACKEND_DIR)/requirements.txt
	@echo "✅ Backend installé !"

## 📍 2. Installer le frontend (Next.js)
setup-frontend:
	@echo "📦 Installation des dépendances frontend..."
	cd $(FRONTEND_DIR) && yarn install
	@echo "✅ Frontend installé !"

## 📍 3. Installation complète
install: setup-backend setup-frontend
	@echo "🚀 Installation terminée ! Utilisez 'make run' pour démarrer l'application."

## 📍 4. Lancer le backend (Flask)
run-backend:
	@echo "🚀 Démarrage du backend Flask sur le port $(PORT_BACKEND)..."
	. $(VENV)/bin/activate && cd $(BACKEND_DIR) && python app.py

## 📍 5. Lancer le frontend (Next.js)
run-frontend:
	@echo "🚀 Démarrage du frontend Next.js sur le port $(PORT_FRONTEND)..."
	cd $(FRONTEND_DIR) && yarn dev

## 📍 6. Lancer toute l'application (backend + frontend)
run:
	@echo "🚀 Démarrage complet de l'application..."
	make -j2 run-backend run-frontend

## 📍 7. Nettoyer les fichiers inutiles
clean:
	@echo "🧹 Nettoyage des fichiers temporaires..."
	rm -rf $(VENV) $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/.next
	@echo "✅ Nettoyage terminé !"
