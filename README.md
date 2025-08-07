# AutoFleet - Vehicle Management System

## 🚀 Funkcionalnosti

- **Upravljanje vozilima**: Dodavanje, izmena i brisanje vozila
- **Detaljni pregled**: Prikaz informacija o vozilima sa servisima
- **Filtriranje i pretraga**: Pretraga vozila po marki, modelu i godini
- **Paginacija**: Organizovan prikaz sa straničenjem
- **Servisi**: Povezivanje vozila sa servisima
- **Responsive dizajn**: Optimizovan za sve uređaje

## 🛠️ Tehnologije

- **Frontend**: React 19 + TypeScript
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod validacija
- **Styling**: Tailwind CSS
- **Backend**: JSON Server
- **Routing**: React Router DOM

## 📋 Preduslovi

Pre nego što počnete, proverite da li imate instalirano:

- [Node.js](https://nodejs.org/) (verzija 16 ili novija)
- [npm](https://www.npmjs.com/) ili [yarn](https://yarnpkg.com/)

## 🚀 Instalacija

1. **Klonirajte repozitorijum**

   ```bash
   git clone <repository-url>
   cd autofleet
   ```

2. **Instalirajte zavisnosti**

   ```bash
   npm install
   # ili
   yarn install
   ```

3. **Pokrenite aplikaciju (React + JSON Server)**

   ```bash
   npm run dev
   # ili
   yarn dev
   ```

   Ova komanda pokreće i React aplikaciju i JSON Server istovremeno.

4. **Otvorite aplikaciju**

   Aplikacija će biti dostupna na: `http://localhost:5173`

   JSON Server će biti dostupan na: `http://localhost:3001`

### Alternativno pokretanje

Ako želite da pokrenete samo JSON Server:

```bash
npm run dev:api
```

## 📁 Struktura projekta

```
src/
├── components/          # UI komponente
├── features/           # Feature-based organizacija
│   ├── vehicle/       # Vehicle management
│   └── services/      # Service management
├── hooks/             # Custom React hooks
├── pages/             # Page komponente
├── types/             # TypeScript tipovi
├── ui/                # Reusable UI komponente
└── utils/             # Utility funkcije
```

## 🔧 Konfiguracija

### Environment Variables

Kreirajte `.env` fajl u root direktorijumu:

```env
VITE_API_BASE_URL=http://localhost:3001
```

### JSON Server Data

Podaci se čuvaju u `data/db.json` fajlu. Možete modifikovati početne podatke pre pokretanja.

## 📖 Korišćenje

## 📝 API Endpoints

JSON Server automatski kreira REST API:

- `GET /vehicles` - Lista svih vozila
- `GET /vehicles/:id` - Detalji vozila
- `POST /vehicles` - Dodavanje vozila
- `PUT /vehicles/:id` - Izmena vozila
- `DELETE /vehicles/:id` - Brisanje vozila
- `GET /services` - Lista servisa
