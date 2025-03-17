.PHONY: install run clean

all: install run

## 📍 2. Installer le frontend (Next.js)
install: clean
	@echo "📦 Installation des dépendances frontend..."
	yarn install
	@echo "✅ Frontend installé !"

## 📍 5. Lancer le frontend (Next.js)
run:
	@echo "🚀 Démarrage du frontend..."
	yarn dev

## 📍 7. Nettoyer les fichiers inutiles
clean:
	@echo "🧹 Nettoyage des fichiers temporaires..."
	rm -rf node_modules .next
	@echo "✅ Nettoyage terminé !"
