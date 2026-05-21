# WheelyRent - plan prezentacji koncowej

## Czas prezentacji

Około 10-15 minut.

## 1. Wprowadzenie - 1 min

- Nazwa projektu: WheelyRent.
- Temat: aplikacja mobilna do wynajmu samochodow.
- Problem: szybkie znalezienie auta, sprawdzenie szczegolow i rezerwacja bez kontaktu telefonicznego.

## 2. Uzytkownicy i funkcjonalnosci - 2 min

- Klient:
  - rejestracja i logowanie,
  - przegladanie aut,
  - wyszukiwanie,
  - szczegoly auta,
  - mapa lokalizacji,
  - rezerwacja.
- Administrator:
  - dodawanie auta,
  - edycja auta,
  - usuwanie auta.

## 3. Architektura - 2 min

- Frontend: React Native + Expo.
- Backend: Node.js + Express.
- Baza danych: PostgreSQL.
- ORM: Prisma.
- Autoryzacja: JWT.
- Komunikacja: REST API w formacie JSON.

## 4. Model danych - 1 min

- User - konto uzytkownika i rola.
- Car - dane samochodu, cena, dostepnosc, wspolrzedne.
- Booking - rezerwacja auta przez uzytkownika.

## 5. Demonstracja aplikacji - 5 min

Proponowana kolejnosc:

1. Ekran startowy.
2. Rejestracja lub logowanie.
3. Lista samochodow pobrana z API.
4. Wyszukiwanie samochodu.
5. Szczegoly auta.
6. Mapa z lokalizacjami samochodow.
7. Wybór opcji dodatkowych.
8. Podsumowanie i platnosc.
9. Potwierdzenie rezerwacji.
10. Logowanie jako administrator i pokaz CRUD samochodow.

Konto administratora do demonstracji:

```text
email: admin@rentcar.pl
haslo: admin123
```

## 6. Testowanie - 1 min

- Sprawdzenie logowania i rejestracji.
- Sprawdzenie pobierania aut z API.
- Sprawdzenie mapy i wspolrzednych.
- Sprawdzenie rezerwacji.
- Sprawdzenie CRUD dla administratora.
- Sprawdzenie walidacji danych.

## 7. Problemy i rozwiazania - 1 min

- Rozdzielenie danych lokalnych i serwerowych.
- Przeniesienie listy aut i wspolrzednych do PostgreSQL.
- Integracja aplikacji mobilnej z backendem.
- Dodanie panelu administratora.

## 8. Podsumowanie - 1 min

- Projekt spelnia minimalne wymagania: logowanie, CRUD, UI, baza danych, walidacja i dokumentacja.
- System ma dzialajaca aplikacje mobilna, backend REST API oraz baze PostgreSQL.
