# AutoFleet - Vehicle Management System

## 🚀 Funkcionalnosti

### 🔐 Autentifikacija

- **Prijava/odjava**: Sigurna autentifikacija korisnika
- **Zaštićene rute**: Kontrola pristupa za upravljanje vozilima
- **Fake podaci**: admin/Ad123456

### 🚗 Upravljanje vozilima

- **CRUD operacije**: Dodavanje, pregled, izmena i brisanje vozila
- **Detaljni pregled**: Kompletne informacije o vozilima
- **Responsive grid**: Optimizovan prikaz za sve uređaje

### 🔧 Evidencija servisa

- **Servisi po vozilu**: Povezivanje servisa sa vozilima
- **Tipovi servisa**: Redovni servis i kvar
- **CRUD operacije**: Dodavanje, izmena i brisanje servisa
- **Sortiranje**: Po datumu (najnoviji prvi)

### 📋 Javna lista vozila

- **Paginacija**: 8 vozila po stranici
- **Filtriranje**: Po marki, modelu i godini

### ♿ Pristupačnost

- **ARIA atribute**: Potpuna podrška za screen readere
- **Keyboard navigation**: Navigacija tastaturom
- **Mobile menu**: Pristupačan mobile navigation
- **Form validacija**: Detaljne poruke o greškama

## 🛠️ Tehnologije

- **Frontend**: React 19 + TypeScript
- **State Management**: Zustand + TanStack Query
- **Form Handling**: React Hook Form + Zod validacija
- **Styling**: Tailwind CSS
- **Backend**: JSON Server
- **Routing**: React Router DOM
- **Error Handling**: Error Boundaries
- **Performance**: React.memo, useMemo, useCallback

## 📋 Preduslovi

Pre nego što počnete, proverite da li imate instalirano:

- [Node.js](https://nodejs.org/) (verzija 16 ili novija)
- [npm](https://www.npmjs.com/) ili [yarn](https://yarnpkg.com/)

## 🚀 Instalacija

**Klonirajte repozitorijum**

```
git clone https://github.com/A-Cdeveloper/AutoFleet.git
cd autofleet
```

**Instalirajte zavisnosti**

```
npm install
# ili
yarn install
```

**Pokrenite aplikaciju (React + JSON Server)**

```
npm run dev
# ili
yarn dev
```

Ova komanda pokreće i React aplikaciju i JSON Server istovremeno.

**Otvorite aplikaciju**

Aplikacija će biti dostupna na: `http://localhost:5173`

JSON Server će biti dostupan na: `http://localhost:3001`

### Alternativno pokretanje

Ako želite da pokrenete samo JSON Server:

```
npm run dev:api
```

## 📁 Struktura projekta

```
src/
├── features/           # Feature-based organizacija
│   ├── vehicle/       # Vehicle management
│   ├── login/         # Authentication
│   └── services/      # Service management
├── hooks/             # Custom React hooks
├── pages/             # Page komponente
├── store/             # Zustand stores
├── types/             # TypeScript tipovi
├── ui/                # Reusable UI komponente
├── utils/             # Utility funkcije
└── config/            # Konfiguracija
```

## 🔧 Konfiguracija

### Environment Variables

Kreirajte `.env` fajl u root direktorijumu:

```
VITE_API_BASE_URL=http://localhost:3001
```

### JSON Server Data

Podaci se čuvaju u `data/db.json` fajlu. Možete modifikovati početne podatke pre pokretanja.
