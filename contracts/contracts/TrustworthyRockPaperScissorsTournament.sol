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
import "./TrustworthyRockPaperScissorsTournamentGenerator.sol";
import "./TrustworthyRockPaperScissorsTournamentSpecs.sol";

contract TrustworthyRockPaperScissorsTournament is
    TrustworthyRockPaperScissorsTournamentSpecs
{
    enum Move {
        None,
        Rock,
        Paper,
        Scissors
    }
    struct PlayerStat {
        address payable addr;
        uint256 wins;
        Move currentMove;
    }
    PlayerStat[2] private players;
    uint8 public targetWins;
    uint256 public singleMatchFee;
    uint8 public numMatch;
    // [Improvement]
    TrustworthyRockPaperScissorsTournamentGenerator generator;

    modifier validConstructorInputs(
        address payable _player0,
        address payable _player1,
        uint8 _targetWins
    ) {
        require(_player0 != _player1, "Players must be different");
        require(
            _player0 != address(0) && _player1 != address(0),
            "Both players must be specified"
        );
        require(_targetWins > 0, "Target wins must be greater than 0");
        _;
    }

    modifier isPlayer() {
        require(
            msg.sender == players[0].addr || msg.sender == players[1].addr,
            "Only players can call this function"
        );
        _;
    }

    modifier isOverMinFee() {
        require(msg.value >= singleMatchFee, "Minimum fee not met");
        _;
    }

    constructor(
        address payable _player0,
        address payable _player1,
        uint8 _targetWins,
        uint256 _singleMatchFee,
        TrustworthyRockPaperScissorsTournamentGenerator _generator // [Improvement]
    ) validConstructorInputs(_player0, _player1, _targetWins) {
        players[0] = PlayerStat(_player0, 0, Move.None);
        players[1] = PlayerStat(_player1, 0, Move.None);
        targetWins = _targetWins;
        singleMatchFee = _singleMatchFee;
        numMatch = 0;
        // [Improvement]
        generator = _generator;

        assert(players[0].addr == _player0 && players[1].addr == _player1);
    }

    function getPlayers() external view returns (address payable[2] memory) {
        return [players[0].addr, players[1].addr];
    }

    function getPlayersWins() external view returns (uint256[2] memory) {
        return [players[0].wins, players[1].wins];
    }

    function moveRock() external payable override isPlayer isOverMinFee {
        handleMove(Move.Rock);
    }

    function movePaper() external payable override isPlayer isOverMinFee {
        handleMove(Move.Paper);
    }

    function moveScissor() external payable override isPlayer isOverMinFee {
        handleMove(Move.Scissors);
    }

    function handleMove(Move move) internal {
        uint8 playerIdx = msg.sender == players[0].addr ? 0 : 1;
        uint8 opponentIdx = 1 - playerIdx;

        if (Move.None != players[playerIdx].currentMove) {
            revert("Player already made a move");
        } else if (Move.None == players[opponentIdx].currentMove) {
            players[playerIdx].currentMove = move;
        } else {
            // The value 2 means the match has been a draw
            uint8 winner = playerIdx == 0
                ? getMatchWinner(move, players[opponentIdx].currentMove)
                : getMatchWinner(players[opponentIdx].currentMove, move);
            // Update and reset for the next match
            players[playerIdx].currentMove = Move.None;
            players[opponentIdx].currentMove = Move.None;
            numMatch++;
            // The match has a winner
            if (winner < 2) {
                emit MatchWonBy(
                    winner == 0 ? Player.First : Player.Second,
                    numMatch
                );
                players[winner].wins++;
            }

            checkTournamentWin();
        }
    }

    function getMatchWinner(Move move0, Move move1)
        internal
        pure
        returns (uint8)
    {
        if (move0 == Move.Rock) {
            if (move1 == Move.Scissors) return 0;
            else if (move1 == Move.Paper) return 1;
        } else if (move0 == Move.Scissors) {
            if (move1 == Move.Paper) return 0;
            else if (move1 == Move.Rock) return 1;
        } else {
            if (move1 == Move.Rock) return 0;
            else if (move1 == Move.Scissors) return 1;
        }
        return 2;
    }

    function checkTournamentWin() internal {
        if (players[0].wins >= targetWins) {
            emit TournamentWonBy(Player.First);
            // [Improment]
            generator.endTournament(players[0].addr);
            selfdestruct(players[0].addr);
        } else if (players[1].wins >= targetWins) {
            emit TournamentWonBy(Player.Second);
            // [Improment]
            generator.endTournament(players[1].addr);
            selfdestruct(players[1].addr);
        }
    }

    function disputedMatches() external view override returns (uint8) {
        return numMatch;
    }
}
