1.  Öppna projektet via browser: https://starlit-croquembouche-eed511.netlify.app/

    Via VSCode: öppna terminal -> gå in i rätt map (cd Recipe-frontend) -> ng serve -o

***Sidan är inte säker så när du skapar ny användare gör det med mail och lösenord som inte används någon annanstan eller har någon betydelse***

***Med andra ord använd en hittepå mail och lösenord***

Sidor som finns: *Login*, *Registrera användare*, *Sök recept*, *Recept med mer info* och *Hem sida*


* När man kommer till första sidan (hem) får man ett antal förslag på rätter

* Hittar man inget där kan man *söka på recept* via
    * recept eller ingredienser
    * typ av rätt
    * allergier
    * Diet
    Man kan välja en eller flera av dessa för att få fram en lista med recept

* I listan på recept man får upp kan man klicka på det för att få mer information om rätten

* Registrera användare: registrera en ny användare med 
    * *namn*
    * *mail*
    * *lösenord*
    Man blir sedan skickad till första sidan för att därefter får man logga in (man blir med andra ord inte inloggad när man registrerar ett nytt konto)

* Logga in
    * När man trycker på knappen logga in kommer man till ett login formulär där man får fylla i *mail* och *lösenord*

    Därefter kommer ditt namn komma upp istället för login samt att du får en dropdown där du har tre länkar
    * *Profil* (är planerad för nästa version(sprint))
    * *MyRecipe list* (är planerad för nästa version(sprint))
    * *Logga ut* (blir då omdirigerat till första sidan)


    
---------------------------------------------------------------------------------------------------

    
Nästkommande funktioner eller funktioner jag arbetat med men som jag inte han bli klar med:

*skickar med vad jag tänkt och vad jag har gjort med det hittills*


**Modal:**

hade tänkt att använda mig av en modal och ett typ av popup fönster för att logga in. Slutresultatet just nu var inte som jag ville så 
som en senare funktion skulle jag kunna fortsätta med den. Men i nuläget blir man omdirigerad till /login för att kunna logga in

modal.servise.ts:

export class ModalService {

  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  constructor() {}

  openModal() {
    this.modalOpenSubject.next(true);
  }

  closeModal() {
    this.modalOpenSubject.next(false);
  }

  // handleModalClick(event: MouseEvent){
  //   let modalDropdown = document.getElementById("modalDrop");
  //   if (!modalDropdown?.contains(event.target as Node)) {
  //     this.modalOpenSubject.next(true);
  //   }
  // }
}

-----

app.component.html:

![app component html](https://github.com/chas-academy/u06-fullstack-recipe-app-MatildaAK/assets/117752722/9b769d8e-901a-4a8c-87ba-e7963a7ffe00)

-----

app.component.ts:

  openModal(){
    this.modalService.openModal();
  }

-----
login.component.html

![login component html](https://github.com/chas-academy/u06-fullstack-recipe-app-MatildaAK/assets/117752722/294832dc-7e6a-47c5-b8fb-301603578ea9)

------

login.component.ts:

  closeModal() {
   this.modalService.closeModal();
  }

-------------------------------------------

**Rerouting:**

Försökte att koppla app-recipes till min "hem" sida för att samtidigt som du klickar på sök hamnar på /recipes och får upp datan samtidigt.
Jag fick antingen upp datan direkt på förstasidan eller så blev jag reroutad till /recipes men såg inte datan på sidan, 
då den hämtade datan men då sidan blev uppdaterad i samma veva förlorade jag datan.


------

home.component.html:

![home c app-recipes](https://github.com/chas-academy/u06-fullstack-recipe-app-MatildaAK/assets/117752722/596faffe-f4c6-4550-a80e-7e833db9e10a)

-----

recipes.component.ts:

  ngOnInit(): void{
    this.route.url.subscribe(url => {    
        if (url[0] !== undefined && url[0].path === 'recipes') {
          this.searchRecipe();
        }
    })
  }

-----

recipes.component.html:

![recipes component html](https://github.com/chas-academy/u06-fullstack-recipe-app-MatildaAK/assets/117752722/b4a5ea48-7723-4f5f-8d79-959f16e0f24d)

-----

