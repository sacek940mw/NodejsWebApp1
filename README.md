# NodejsWebApp1

Kryteria oceny: CRUD w chmurze + CI/CD

Wybrana chmura: Microsoft Azure
Adres: https://mongoapka.azurewebsites.net
(Czase czas oczekiwania na odpowiedź serwera może wynosić powyżej minuty).
Kod przechowywany na GitHub: https://github.com/sacek940mw/NodejsWebApp1.

Pliki z kodem aplikacji: server.js, strona.js, mongo.js.
Aplikacja służy do zarządzania hasłami do witryn. (dodawanie, edytowaie, usuwanie).
Przy pomocy Azure Shell doinstalowane dodatkowe pakiety: mongodb.
Składa się z 2 kontenerów:
- baza danych mongoDB
- aplikacja node.js
rzyporządkowanych do tej samej grupy zasobów.
Respozytorium w kontenerze aplikacji automatycznie synchronizuje się po wykryciu zmian w repozytorium GitHub.
Następnie kod jest automatycznie kompilowany i wdrażany.
