# Appunti - Blockchain

### Appunti - Table of contents

- Slides

  - [001 - Introduzione Crittografica](./appunti/001%20-%20Introduzione%20crittografica.md)
  - [002 - Blockchain](./appunti/002%20-%20Blockchain.md)
  - [003 - Bitcoin](./appunti/003%20-%20Bitcoin.md)

- Exercises
  - [8 Giugno 2020](./appunti/Es%20-%208%20Giugno%202020.md)
  - [Domande](./appunti/Es%20-%20Domande.md)

### Smart-contracts - TrustworthyRockPaperScissorsTournament

DApp realizzata in [React](https://reactjs.org/) per interagire con lo smart-contract [_TrustworthyRockPaperScissorsTournament_](./smart-contracts/contracts/contracts/TrustworthyRockPaperScissorsTournament.sol).  
È presente anche un contratto proxy, [_TrustworthyRockPaperScissorsTournamentGenerator_](./smart-contracts/contracts/contracts/TrustworthyRockPaperScissorsTournamentGenerator.sol), al fine di avviare più tornei. Lo smart contract è attualmente sulla rete [Ropsten](https://ropsten.etherscan.io/) all'indirizzo [0x0E3b5a1CfFC7f946cdF4BAB1F1D39ECa5C7E30BC](https://ropsten.etherscan.io/address/0x0E3b5a1CfFC7f946cdF4BAB1F1D39ECa5C7E30BC)
La consegna era la seguente:

```solidity
/*
    Corso Blockchain e Cryptocurrencies - Compito di laboratorio del 22/06/2021
    Scrivere un contratto `TrustworthyRockPaperScissorsTournament` che implementi l'interfaccia
    `TrustworthyRockPaperScissorsTournamentSpecs` per la gestione di un torneo di Morra Cinese
    sulla piattaforma Ethereum usando il linguaggio Solidity. Il gioco assume un comportamento
    onesto da parte dei giocatori: questi rispetteranno la privacy della mossa altrui, se questa
    è stata fatta per prima, e completeranno tutti i match richiesti affinché il torneo si
    possa finalizzare.
    In fase di setup del contratto è necessario indicare gli indirizzi dei due giocatori, il
    numero di partite che il vincitore dovrà raggiungere per primo per essere tale e la
    commissione minima che ogni giocatore deve inviare per poter disputare ogni singola
    partita/mossa : questa potrebbe anche essere nulla rendendo la commissione stessa opzionale.
    Ogni giocatore può usare i metodi di "tipo move*" per specificare la sequenza delle mosse per
    ogni partita necessaria; non si deve assumere alcun ordine di gioco (entrambi possono muovere
    per primi). Se possibile, si deve poter permettere ad un giocatore di esprimere una ulteriore
    mossa nella sequenza ancora prima che si sia conclusa la partita precedente.
    Non appena la vincita di una singola partita porta per primo un giocatore al numero
    specificato di partite da vincere, il contratto dovrà dichiarare chiuso il torneo e versare
    l'intero ammontare delle commissioni versate allo stesso. Il contratto in tal caso si dovrà
    anche auto-distruggere versando il rimborso al creatore originale del contratto.
    Il contratto dovrà occuparsi di validare gli input ricevuti secondo criteri ovvi di sensatezza.
    Gli eventi specificati nell'interfaccia dovranno essere opportunamente inviati durante lo
    svolgimento del torneo.
*/
// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

interface TrustworthyRockPaperScissorsTournamentSpecs {
    /* constructor(
        address payable firstPlayer,
        address payable secondPlayer,
        uint8 targetWins,
        uint256 singleMatchFee
    ); */
    function moveRock() external payable;

    function movePaper() external payable;

    function moveScissor() external payable;

    function disputedMatches() external returns (uint8);

    enum Player {
        First,
        Second
    }
    event MatchWonBy(Player winner, uint8 numMatch);
    event TournamentWonBy(Player winner);
}
```
