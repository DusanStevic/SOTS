# SOTS
Modern educational technologies and standards

Predmetni projekat iz predmeta "Savremene obrazovane tehnologije i standardi"

Tim 19:
 - Dušan Stević R2 33/2020
 - Milica Vojnović R2 44/2020

# FUNKCIONALNOSTI
Aplikacija omogućava testiranje učenika uz pomoć različitih testova. Razlikujemo tri različita tipa korisnika: administratora, profesora i studente. Na samom početku je potrebno i da se profesori, kao i studenti uloguju na platformu, unoseći svoje korisničko ime i lozinku. Nakon toga, njima će biti omogućene različite funkcionalnosti. 

  - Funkcionalnosti profesor:
    - Pregled svih predmeta na kojima je dodeljen kao profesor
    - Pregled svih testova za određeni predmet
    - Dodavanje novih testova, što podrazumeva da se jedan test sastoji od jednog ili više pitanja koje je vezano za tačno jedan problem, gde svako pitanje ima jedan ili više odgovora. Prilikom kreiranja novog testa, on će biti eksportovan u IMS QTI format.
    - Definisanje prostora znanja u vidu grafa
    - Pregled grafa očekivanog i realnog prostora znanja
    
   - Funkcionalnosti student:
     - Pregled svih predmeta koje trenutno sluša
     - U okviru jednog predmeta, može da pogleda testove koje je već rešavao ili spisak onih koje tek treba da reši
     - Rešavanje testova
     
# POKRETANJE:

Aplikacija se sastoji iz dva dela:
  - Za pokretanje serverskog dela aplikacije:
    - U backend folderu napraviti virtuelno okruzenje komandom:
        python -m venv venv
    - Aktivirati napravljeno okruzenje komandom:
        venv\Scripts\activate.bat
    - Eksportovati requirements.txt u backend folder:
        pip freeze > requirements.txt
    - Instalirati sledece zavisnosti komandama:
        pip install django i
        pip install djangorestframework
    - Pozicionirati se u folder etesting i pre samog pokretanja izvršiti migraciju sledećim komandama:
        python manage.py makemigrations i
        python manage.py migrate
    - Pokrenuti projekat sledećom komandom:
        python manage.py runserver
    - Nakon ovoga, serverska aplikacija je dostupna na adresi http://localhost:8080.
  
  - Za pokretanje klijentskog dela aplikacije:
    - Pozicionirati se u folder frontend i izvršiti sledeće komande:
        npm install i
        ng serve
    - Nakon toga, klijentska aplikacija je dostupna na adresi http://localhost:4200.
        
