# NodejsWebApp1

Aplikacja służy do zarządzania hasłami do witryn. (dodawanie, edytowaie, usuwanie).

Wybrana chmura: Microsoft Azure
Adres: https://mongoapka.azurewebsites.net
Przy pomocy Azure Shell doinstalowane dodatkowe pakiety: mongodb.

Składa się z 2 kontenerów:
- baza danych mongoDB
- aplikacja node.js
Kontenery zostały przyporządkowane do tej samej grupy zasobów.

Kod przechowywany w respozytorium:https://github.com/sacek940mw/NodejsWebApp1.
Respozytorium w kontenerze aplikacji automatycznie synchronizuje się po wykryciu zmian w repozytorium github.
Następnie kod jest automatycznie kompilowany.
