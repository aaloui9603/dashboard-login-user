# Projektbezeichnung 
Dashboard-Login-User

## Projektbeschreibung 
Dieses Projekt beinhaltet eine rollenbezogene Dashboard-App mit Login, Admin-und User-Bereich. 


## Tech-Stacks
- **Vue 3**: Composition API 
- **Vite**: Build-Tool & Dev-Server
- **Vue Router 4**: Navigation-Guards, verschachtelte Routen
- **Pinia** + **pinia-plugin-persistedstate**: Auth-State, LocalStorage-Persistenz
- **Tailwind CSS v3** + **SCSS**: Design-Struktur über CSS Custom Properties
- **Google Fonts**: Montserrat

## Features 
- Login mit Mockdaten 
- Validierung und Fehlermeldung bei Falscheingaben 
- Hinweis auf 404-Seite bei unbekannten Routen 
- Darstellung der Profilkarten mit Aufgabenliste
- Rollenbezogener Routenschutz über `beforeEach`-Guard
- Eigenständige Profilseiten für beide Rollen
- Responsive: ausklappbarer Burger-Slider unter 768px
- Admin-Bereich: Usertabelle mit Live-Statistiken  


## Design
- **Login-Seite**: Aurora Glassmorphism
- **Dashboard-Bereich**: Admin, User und Profil
- **Dark- und Lightmode**

## Setup & Terminal-Befehle
- `npm install create vite@latest dashboard-login-user`
- `npm install`
- `npm run dev`
- `npm install vue-router pinia pinia-plugin-persistedstate`
- `npm install -D sass tailwindcss@3 postcss autoprefixer`
- `npx install tailwindcss init -p`
