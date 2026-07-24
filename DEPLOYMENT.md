# 🚀 Instrukcja Wdrożenia na GitHub Pages

Ten przewodnik krok po kroku pokazuje, jak opublikować Twoje portfolio na GitHub Pages.

## 📋 Wymagania Wstępne

- Konto na GitHub
- Git zainstalowany lokalnie
- Node.js i npm zainstalowane

## 🔧 Krok 1: Konfiguracja Vite

Plik `vite.config.js` został już skonfigurowany z odpowiednim `base` path. 

**WAŻNE:** Zmień wartość `base` w `vite.config.js`:

```javascript
base: '/nazwa-twojego-repo/', // Zmień to na nazwę swojego repozytorium
```

### Przykłady:

- **Jeśli repozytorium nazywa się `portfolio`:**  
  ```javascript
  base: '/portfolio/',
  ```

- **Jeśli używasz domeny niestandardowej lub `<username>.github.io`:**  
  ```javascript
  base: '/',
  ```

## 📦 Krok 2: Zbuduj Projekt dla Produkcji

Otwórz terminal w folderze projektu i uruchom:

```bash
npm run build
```

To polecenie utworzy folder `dist/` z zoptymalizowaną wersją produkcyjną Twojego portfolio.

## 📁 Krok 3: Utworzenie Repozytorium GitHub

### Opcja A: Nowe Repozytorium

1. Przejdź na [github.com](https://github.com)
2. Kliknij "+" w prawym górnym rogu → "New repository"
3. Nazwij repozytorium (np. `portfolio`)
4. Ustaw jako **Public**
5. **NIE** dodawaj README, .gitignore ani licencji (już je masz)
6. Kliknij "Create repository"

### Opcja B: Istniejące Repozytorium

Jeśli już masz repozytorium, upewnij się że jest publiczne i przejdź do kroku 4.

## 🔗 Krok 4: Połącz Lokalne Repozytorium z GitHub

**Jeśli jeszcze nie zainicjowałeś Git:**

```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
git branch -M main
git remote add origin https://github.com/TWOJA-NAZWA-UŻYTKOWNIKA/NAZWA-REPO.git
git push -u origin main
```

**Jeśli już masz repozytorium Git:**

```bash
git add .
git commit -m "Add portfolio files"
git push
```

## 🌐 Krok 5: Wdrożenie na GitHub Pages

### Metoda 1: Ręczne Wdrożenie (Proste)

1. **Usuń `dist` z `.gitignore`** (tymczasowo):
   - Otwórz plik `.gitignore`
   - Zakomentuj lub usuń linię `dist`

2. **Wyślij folder `dist` na GitHub:**
   ```bash
   git add dist -f
   git commit -m "Add dist folder for GitHub Pages"
   git push
   ```

3. **Skonfiguruj GitHub Pages:**
   - Przejdź do swojego repozytorium na GitHub
   - Kliknij **Settings** → **Pages** (w lewym menu)
   - W sekcji **Source** wybierz `main` branch
   - W folderze wybierz `/dist` (jeśli dostępne) lub `/root`
   - Kliknij **Save**

4. **Poczekaj 1-2 minuty** i Twoje portfolio będzie dostępne pod:
   ```
   https://TWOJA-NAZWA-UŻYTKOWNIKA.github.io/NAZWA-REPO/
   ```

### Metoda 2: Użycie `gh-pages` Branch (Recommandowana)

Ta metoda automatyzuje proces i nie wymaga commitowania folderu `dist`.

1. **Zainstaluj `gh-pages`:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Dodaj skrypty do `package.json`:**
   
   Otwórz `package.json` i dodaj następujące skrypty w sekcji `"scripts"`:
   
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Wdróż na GitHub Pages:**
   ```bash
   npm run deploy
   ```

   To polecenie:
   - Zbuduje projekt (`npm run build`)
   - Utworzy branch `gh-pages`
   - Wrzuci zawartość `dist/` na branch `gh-pages`
   - Automatycznie wyśle na GitHub

4. **Skonfiguruj GitHub Pages:**
   - Przejdź do **Settings** → **Pages**
   - Wybierz branch `gh-pages` jako źródło
   - Folder: `/ (root)`
   - Kliknij **Save**

5. **Portfolio będzie dostępne pod:**
   ```
   https://TWOJA-NAZWA-UŻYTKOWNIKA.github.io/NAZWA-REPO/
   ```

## ✅ Krok 6: Weryfikacja

1. Odwiedź URL swojego GitHub Pages
2. Sprawdź czy:
   - ✅ Strona się ładuje poprawnie
   - ✅ Wszystkie obrazy są widoczne
   - ✅ Animacje działają
   - ✅ Przycisk zmiany języka działa
   - ✅ Linki kontaktowe działają

## 🔄 Aktualizacja Portfolio

### Przy użyciu Metody 1 (Ręczne):
```bash
npm run build
git add dist
git commit -m "Update portfolio"
git push
```

### Przy użyciu Metody 2 (gh-pages):
```bash
npm run deploy
```

Zmiany pojawią się w ciągu 1-2 minut!

## ⚠️ Częste Problemy i Rozwiązania

### Problem: Strona pokazuje 404
**Rozwiązanie:** 
- Sprawdź czy `base` w `vite.config.js` odpowiada nazwie repo
- Upewnij się że GitHub Pages jest włączone w Settings

### Problem: Obrazy lub style się nie ładują
**Rozwiązanie:**
- Sprawdź czy `base` path jest poprawnie ustawiony
- Zbuduj projekt ponownie: `npm run build`
- Wdróż ponownie

## 🎯 Domena Niestandardowa (Opcjonalnie)

Jeśli chcesz użyć własnej domeny (np. `jakubkolkowski.com`):

1. Kup domenę (np. na nazwa.pl, GoDaddy, etc.)
2. W repozytorium, utwórz plik `public/CNAME` z Twoją domeną:
   ```
   jakubkolkowski.com
   ```
3. W ustawieniach DNS dodaj rekord:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   ```
4. Dla `www` subdomen:
   ```
   Type: CNAME
   Name: www
   Value: TWOJA-NAZWA.github.io
   ```
5. W GitHub Pages settings dodaj swoją domenę

## 📚 Dodatkowe Zasoby

- [Oficjalna dokumentacja GitHub Pages](https://docs.github.com/en/pages)
- [Vite - Deploying Static Site](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages npm package](https://www.npmjs.com/package/gh-pages)

## 🎉 Gotowe!

Twoje portfolio jest teraz live na GitHub Pages! 🚀

Możesz udostępnić link:
```
https://dj-kolkol2002.github.io/portfolio/
```

---

**Pytania?** Skontaktuj się: jakubkolkowski5@gmail.com
