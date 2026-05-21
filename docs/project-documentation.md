# WheelyRent - dokumentacja projektu

## 1. Opis projektu

WheelyRent to aplikacja mobilna do wynajmu samochodow. Uzytkownik moze zalozyc konto, zalogowac sie, przegladac dostepne auta, sprawdzac szczegoly pojazdu, zobaczyc lokalizacje aut na mapie oraz dokonac rezerwacji na wybrana liczbe dni. Administrator moze zarzadzac ofertami samochodow: dodawac, edytowac i usuwac auta.

## 2. Analiza problemu

### Cel projektu

Celem projektu jest stworzenie prostego systemu do szybkiego wynajmu samochodu z poziomu aplikacji mobilnej.

### Problem

Klient potrzebuje wygodnego sposobu na szybkie znalezienie samochodu, sprawdzenie ceny, lokalizacji i dokonanie rezerwacji bez kontaktu telefonicznego. Firma wynajmujaca auta potrzebuje panelu do zarzadzania oferta.

### Uzytkownicy systemu

- Klient - rejestruje sie, loguje, przeglada auta, sprawdza szczegoly i tworzy rezerwacje.
- Administrator - zarzadza lista samochodow przez dodawanie, edycje i usuwanie ofert.

### Funkcjonalnosci

- Rejestracja i logowanie uzytkownika.
- Pobieranie listy aut z backendu.
- Wyszukiwanie samochodow.
- Szczegoly auta.
- Mapa z lokalizacja samochodow.
- Rezerwacja auta.
- CRUD samochodow dla administratora.
- Walidacja danych po stronie aplikacji i API.

## 3. Architektura systemu

System ma architekture klient-serwer.

```mermaid
flowchart LR
  A["Aplikacja mobilna React Native / Expo"] -->|HTTP JSON| B["Backend Node.js / Express"]
  B -->|Prisma ORM| C["PostgreSQL"]
  B --> D["JWT auth"]
```

### Frontend

- React Native
- Expo
- React Navigation
- WebView + Leaflet do mapy

### Backend

- Node.js
- Express
- Prisma
- JWT
- bcrypt

### Baza danych

- PostgreSQL

## 4. Model danych

```mermaid
erDiagram
  User ||--o{ Booking : creates
  Car ||--o{ Booking : booked_in

  User {
    int id PK
    string name
    string email
    string password
    Role role
    datetime createdAt
  }

  Car {
    int id PK
    string brand
    string model
    int year
    float pricePerDay
    string imageUrl
    boolean available
    string fuelType
    int seats
    string transmission
    string description
    string source
    string externalId
    float latitude
    float longitude
    datetime createdAt
    datetime updatedAt
  }

  Booking {
    int id PK
    int userId FK
    int carId FK
    datetime startDate
    datetime endDate
    BookingStatus status
    float totalPrice
    datetime createdAt
  }
```

## 5. Diagram przypadkow uzycia

```mermaid
flowchart TB
  Client["Klient"]
  Admin["Administrator"]

  UC1["Rejestracja"]
  UC2["Logowanie"]
  UC3["Przegladanie aut"]
  UC4["Wyszukiwanie aut"]
  UC5["Podglad szczegolow auta"]
  UC6["Podglad mapy"]
  UC7["Rezerwacja auta"]
  UC8["Dodanie auta"]
  UC9["Edycja auta"]
  UC10["Usuniecie auta"]

  Client --> UC1
  Client --> UC2
  Client --> UC3
  Client --> UC4
  Client --> UC5
  Client --> UC6
  Client --> UC7

  Admin --> UC2
  Admin --> UC8
  Admin --> UC9
  Admin --> UC10
```

## 6. Diagram sekwencji - rezerwacja samochodu

```mermaid
sequenceDiagram
  actor U as Uzytkownik
  participant M as Mobile App
  participant API as Express API
  participant DB as PostgreSQL

  U->>M: Wybiera auto i liczbe dni
  M->>API: POST /bookings z tokenem JWT
  API->>API: Walidacja tokenu i dat
  API->>DB: Sprawdzenie auta
  API->>DB: Sprawdzenie konfliktu rezerwacji
  DB-->>API: Brak konfliktu
  API->>DB: Utworzenie rezerwacji
  DB-->>API: Rezerwacja
  API-->>M: 201 Created
  M-->>U: Potwierdzenie rezerwacji
```

## 7. API

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`
- `POST /auth/change-password`

### Users

- `PUT /users/me`

### Cars

- `GET /cars`
- `GET /cars/:id`
- `POST /cars` - admin
- `PUT /cars/:id` - admin
- `DELETE /cars/:id` - admin
- `POST /cars/import` - admin

### Bookings

- `POST /bookings`
- `GET /bookings/my`
- `GET /bookings/all` - admin
- `DELETE /bookings/:id`

## 8. Instrukcja uruchomienia

### Frontend

```bash
npm install
npm start
```

Uruchomienie Android:

```bash
npm run android
```

### Backend

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm start
```

Wymagany plik `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/rentcar"
JWT_SECRET="secret"
PORT=3000
```

## 9. Testowanie

### Testy funkcjonalne

- Rejestracja nowego uzytkownika.
- Logowanie poprawnymi i niepoprawnymi danymi.
- Pobranie listy samochodow z API.
- Wyszukiwanie samochodu w aplikacji.
- Wyswietlenie szczegolow samochodu.
- Wyswietlenie lokalizacji na mapie.
- Utworzenie rezerwacji.
- Proba rezerwacji w niepoprawnym terminie.
- Dodanie auta jako administrator.
- Edycja auta jako administrator.
- Usuniecie auta jako administrator.

### Walidacja

- Haslo musi miec co najmniej 6 znakow.
- Email musi miec poprawny format.
- Rezerwacja wymaga zalogowanego uzytkownika.
- Data konca rezerwacji musi byc pozniejsza niz data poczatku.
- Auto nie moze byc zarezerwowane w tym samym terminie dwa razy.

## 10. Podzial pracy w zespole

- Project Manager - planowanie zadan, koordynacja i prezentacja postepow.
- Backend Developer - API, Prisma, PostgreSQL, JWT, walidacja danych.
- Frontend / Mobile Developer - ekrany React Native, nawigacja, mapa, formularze.
- QA / Tester - testowanie przeplywow, sprawdzanie walidacji i przygotowanie scenariuszy testowych.

W malym zespole jedna osoba moze laczyc kilka rol.

## 11. Stan realizacji wymagan

| Wymaganie | Status |
|---|---|
| Analiza problemu | Zrobione |
| Opis architektury | Zrobione |
| Diagramy projektowe | Zrobione |
| Model danych | Zrobione |
| Opis technologii | Zrobione |
| Rejestracja / logowanie | Zrobione |
| CRUD danych | Zrobione dla samochodow |
| Interfejs uzytkownika | Zrobione |
| Przechowywanie danych | Zrobione - PostgreSQL |
| Walidacja danych | Zrobione |
| Testowanie funkcjonalnosci | Scenariusze opisane |
| Instrukcja uruchomienia | Zrobione |
