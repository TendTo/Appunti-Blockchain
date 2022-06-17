# Appunti - Blockchain

### Smart-contracts - TrustworthyRockPaperScissorsTournament

DApp realizzata in [React](https://reactjs.org/) per interagire con lo smart-contract [_TrustworthyRockPaperScissorsTournament_](./contracts/contracts/TrustworthyRockPaperScissorsTournament.sol).  
È presente anche un contratto proxy, [_TrustworthyRockPaperScissorsTournamentGenerator_](./contracts/contracts/TrustworthyRockPaperScissorsTournamentGenerator.sol), al fine di avviare più tornei. Lo smart contract è attualmente sulla rete [Ropsten](https://ropsten.etherscan.io/) all'indirizzo [0x0E3b5a1CfFC7f946cdF4BAB1F1D39ECa5C7E30BC](https://ropsten.etherscan.io/address/0x0E3b5a1CfFC7f946cdF4BAB1F1D39ECa5C7E30BC).  
La consegna era la [seguente](./contracts/contracts/TrustworthyRockPaperScissorsTournamentSpecs.sol):

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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
