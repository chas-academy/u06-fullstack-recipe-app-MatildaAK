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

    <!-- <div id="modalDrop">

      <div class=" fixed flex top-0 right-0">
        <div class="relative">
          <button (click)="openModal()" class="border border-2 rounded-lg mr-4 lg:mr-12 mt-4 p-1 flex bg-yellow" type="button" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6 mr-1 mt-1 lg:mr-2" stroke="sky-600" fill="#082f49" viewBox="0 0 448 512"> -->
              <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
              <!-- <path  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
            </svg>
            Login
          </button>
        </div>
      </div>

      <div id="modal" class="flex justify-center items-center" [class.hidden]="!(modalService.modalOpen$ | async)">

        <app-login></app-login>

      </div>

    </div> -->

-----

app.component.ts:

  openModal(){
    this.modalService.openModal();
  }

------

login.component.ts:

  closeModal() {
   this.modalService.closeModal();
  }

-----


-------------------------------------------

**Rerouting:**

Försökte att koppla app-recipes till min "hem" sida för att samtidigt som du klickar på sök hamnar på /recipes och får upp datan samtidigt.
Jag fick antingen upp datan direkt på förstasidan eller så blev jag reroutad till /recipes men såg inte datan på sidan, 
då den hämtade datan men då sidan blev uppdaterad i samma veva förlorade jag datan.


------

home.component.html:

<!-- <app-recipes></app-recipes> -->

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

   <button [routerLink]="['/recipes']" type="button" (click)="searchRecipe()" class="bg-buttonbg w-10 rounded-lg ml-80 p-2">
      <img src="../../assets/searchicon.svg" alt="search icon" class="h-6 ms:ml-2">
    </button>

-----

