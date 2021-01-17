//dichiaro funzione per generare numeri casuali
function randomNumber(min, max) {
  var result = Math.floor(Math.random() * (max + 1 - min) + min);
  return result;
}

//dichiaro variabili globali
var timing;
var numeriDaIndovinare;
var numeroGenerato;
var numeriGenerati = [];
var numeroUtente;
var numeriGeneratiAlert = [];
var numeriGeneratiStringa;
var countDown;
var difficoltaUtente;

  $(document).ready(function() {//quando il DOM è stato caricato, eseguo il codice

    //al click del pulsante avvio funzione anonima che contiene il gioco
    $('section .btn').click(function() {

      //nascondo la schermata di benvenuto e mostro schermata impostazioni
      $('section.messaggio').addClass('hide').next().removeClass('hide');

      //richiamo callback con selezione difficoltà e algoritmo di gioco(per ritardare prompt).
      setTimeout(function() {
        difficoltaUtente = parseInt(prompt('Scegli un livello di difficoltà: 0 = facile | 1 = normale | 2 = difficile. Inserisci un numero.'));
        if(difficoltaUtente > 2 || difficoltaUtente < 0 || isNaN(difficoltaUtente)) {//verifico che l'utente inserisca un numero valido.
        alert('Attenzione! Inserire un numero compreso tra 0 e 2. La pagina verrà ricaricata.')
        location.reload()
        } else {
        //popolo le variabili a seconda del livello di difficoltà selezionato
          switch (difficoltaUtente) {
            case 0:
              alert('Hai scelto la difficoltà 0: facile');
              timing = 60;
              numeriDaIndovinare = 5;
              break;
            case 1:
              alert('Hai scelto la difficoltà 1: normale');
              timing = 45;
              numeriDaIndovinare = 6;
              break;
            default:
              alert('Hai scelto la difficoltà 2: difficile');
              timing = 30;
              numeriDaIndovinare = 7;
          }
        }

        //nascondo la schermata di benvenuto e mostro countdown
        $('section.selezione-limiti').addClass('hide').next().removeClass('hide');
        $('section.timer .second').text(timing + ' secondi');

        //genero numeri casuali
        while(numeriGenerati.length < numeriDaIndovinare) {
          numeroGenerato = randomNumber(1, 1000);
          if(!numeriGenerati.includes(numeroGenerato)) {
            numeriGenerati.push(numeroGenerato);
            numeriGeneratiAlert.push('  ' + numeroGenerato);
          }
        }
        console.log(numeriGenerati);

        //mostro all'utente i numeri casuali
        numeriGeneratiStringa = numeriGeneratiAlert.toString();
        $('section.number').removeClass('hide').find('.display-number').text('I tuoi numeri: ' + numeriGeneratiStringa);

        //(asincrono)alla chiusura della selezione della difficoltà, si avvia il timer
        countDown = setInterval(function() {
          timing--;
          $('section.timer .second').text(timing + ' secondi');
          if(timing === 0) {
            $('section.timer, section.number').addClass('hide');
            $('section.inserisci').removeClass('hide');
            clearInterval(countDown)
          }
        }, 1000);

        //(asincrono)imposto callback algoritmo di gioco per input utente, che sarà richiamata allo scadere del timer
        setTimeout(function() {
          //dichiaro variabili locali
          var numeriInseriti = [];
          var numeriIndovinati = [];
          var numeriIndovinatiAlert = [];

          //mostro schermata inserimento numeri
          while(numeriInseriti.length < numeriDaIndovinare) {//finchè numeriInseriti = numeri da indovinare, resto nel ciclo while
            numeroUtente = parseInt(prompt('Inserisci un numero'));
            console.log(numeroUtente);
            if(isNaN(numeroUtente)) {
              alert('Inserisci un numero!');
            } else {
              numeriInseriti.push(numeroUtente);
              if(numeriGenerati.includes(numeroUtente)) {
                numeriIndovinati.push(numeroUtente);
                numeriIndovinatiAlert.push('  ' + numeroUtente);
              }
            }
          }

          if(numeriIndovinati.length === 0) {
            $('section.inserisci').addClass('hide');
            $('section.punteggio').removeClass('hide').find('.risultato').text('Hai perso! Nessun numero indovinato!');
          } else {
            $('section.inserisci').addClass('hide');
            $('section.punteggio').removeClass('hide').find('.risultato').append(' ' + numeriIndovinatiAlert);
            $('section.punteggio').removeClass('hide').find('.punti').text('Punteggio finale: ' + numeriIndovinati.length + ' / ' + numeriDaIndovinare);
          }
        }, timing * 1050);
      }, 500)//end first timeout
    })//end click
  })//end document
