#!/bin/bash

echo "Installation du projet..."
make install

echo "Mise à jour des dépendances..."
make update

echo "Lancement de l'application..."
make run
