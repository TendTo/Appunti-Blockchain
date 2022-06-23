/*
    Corso Blockchain e Cryptocurrencies - Compito di laboratorio del 12/07/2021

    Scrivere un contratto `CorporateManagement` che implementi l'interfaccia `CorporateManagementSpecs`
    per la gestione delle decisioni di una società sulla piattaforma Ethereum usando il linguaggio Solidity.

    All'interno della società ci possono essere una serie di soci (associates): il primo è il fondatore che
    crea il contratto stesso con relativa quota (share). Gli altri soci si possono auto-candidare depositando
    una quota sufficiente: tale candidatura viene considerata accettata solo se accettata a maggioranza dai
    soci attuali. Ogni socio può depositare una generica proposta, consistente in una semplice descrizione
    testuale: essa sarà considerata accettata se votata a maggioranza dai soci. Il voto per maggioranza (50% + 1)
    tiene conto del peso della quota in ETH depositata da ogni socio.
    La società, su proposta di qualche socio, può essere anche sciolta purché la risoluzione venga votata 
    all'unanimità.

    Di seguito alcuni dettagli sui singoli elementi obbligatori dell'interfaccia:
    - tutti i casi illustrati sopra vengono considerti come proposte da accettare: le tipologie di proposte 
      corrispondono all'enumerazione `ProposalCategory`;
    - il primo socio (fondatore) crea il contratto specificando la quota minima e versando, contestualmente, la
      propria di quota sufficiente;
    - il metodo `depositFunds` può essere usato da chiunque per auto-candidarsi a socio, versando la relativa
      sufficiente quota; il metodo può essere usato sia dai soci che da candidati-soci per aumentare la propria 
      quota;
    - il metodo `voteProposal`, utilizzabile solo dai soci effettivi, può essere usato per aderire, con la propria
      quota, all'accettazione della proposta tramite l'apposito identificativo; ovviamente un socio può votare una
      sola volta per ogni singola proposta, tale metodo dovrà anche verificare se la proposta ha raggiunto i voti 
      necessari e far scaturire i relativi effetti;
    - i metodi `depositGenericProposal` e `depositDissolutionProposal` permettono, unicamente ai soci, di depositare,
      rispettivamente, una generica proposta con descrizione testuale o una proposta di scioglimento;
    - nel caso in cui una proposta di scioglimento venga accettata all'unanimità la società va in liquidazione e pertanto
      nessuna funzionalità avrà più effetti ad eccezione del metodo `requestShareRefunding` che permette al singolo
      socio di riscuotere la propria quota;
    - i predicati `isAssociated` e `isDissoluted` permettono, rispettivamente, di verificare se un indirizzo specificato
      corrisponde ad un socio effettivo o se la società è in scioglimento;
    - gli eventi di tipo `New...` dovranno essere generati quando una proposta viene creata a seguito di un'azione 
      esterna; depositare dei fondi sufficienti da parte di un non-socio rappresenta una proposta di candidatura;
    - gli eventi di tipo `Accepted....` dovranno essere generati ogniqualvolta una relativa proposta viene accettata;
      notare che all'atto della creazione della società il socio fondatore è implicitamente accettato.
    
    Il contratto dovrà occuparsi di validare gli input ricevuti secondo criteri ovvi di sensatezza.

*/

// SPDX-License-Identifier: None

pragma solidity ^0.8.0;

import "./CorporateManagementSpecs.sol";

contract CorporateManagement is CorporateManagementSpecs {
    struct Associate {
        bool accepted;
        uint256 share;
    }

    struct Proposal {
        ProposalCategory category;
        string description;
        address associate;
        address[] voters;
        bool pending;
    }

    mapping(address => Associate) public associates;
    mapping(uint256 => Proposal) public proposals;
    uint256 public immutable minShare;
    address payable immutable founder;
    uint256 public totalShares;
    bool private dissoluted;
    uint256 private nProposals;

    modifier isAssociate() {
        require(
            this.isAssociated(msg.sender),
            "You must be an associate to perform this operation"
        );
        _;
    }

    modifier isNotDissoluted() {
        require(
            !dissoluted,
            "The association has been dissoluted. You can still recover your share"
        );
        _;
    }

    modifier isFirstVote(uint256 proposalId) {
        Proposal storage p = proposals[proposalId];
        require(p.pending, "The proposal has ended or is invalid");
        for (uint256 i = 0; i < p.voters.length; ++i)
            if (p.voters[i] == msg.sender)
                revert("You have already voted for this proposal");
        _;
    }

    /* constructor(uint minimumAssociatingShare) payable */
    constructor(uint256 minimumAssociatingShare) payable {
        require(
            minimumAssociatingShare > 0,
            "The minimumAssociatingShare must be greater than 0"
        );
        require(
            msg.value >= minimumAssociatingShare,
            "The initial share must be greater or equal to the minShare provided"
        );
        founder = payable(msg.sender);
        minShare = minimumAssociatingShare;
        associates[msg.sender] = Associate(true, msg.value);
        totalShares = msg.value;
        dissoluted = false;
        nProposals = 0;
        emit AcceptedAssociate(msg.sender);
    }

    function depositFunds() external payable override isNotDissoluted {
        Associate storage a = associates[msg.sender];
        // New Associate proposal
        if (a.share < minShare) {
            require(
                msg.value >= minShare,
                "The operation requires a payment greater or equal to the minShare"
            );
            associates[msg.sender] = Associate(false, msg.value);
            proposals[nProposals] = Proposal(
                ProposalCategory.NewAssociationAcceptance,
                "",
                msg.sender,
                new address[](0),
                true
            );
            emit NewAssociateCandidate(nProposals, msg.sender);
            nProposals++;
            // Update share of old associate
        } else {
            a.share += msg.value;
        }
        if (this.isAssociated(msg.sender)) totalShares += msg.value;
    }

    function voteProposal(uint256 proposalId)
        external
        override
        isAssociate
        isNotDissoluted
        isFirstVote(proposalId)
    {
        proposals[proposalId].voters.push(msg.sender);
        uint256 voteShares = getVoteShares(proposalId);
        checkProposal(proposalId, voteShares);
    }

    function depositGenericProposal(string calldata description)
        external
        override
        isAssociate
        isNotDissoluted
    {
        proposals[nProposals] = Proposal(
            ProposalCategory.Generic,
            description,
            address(0),
            new address[](0),
            true
        );
        emit NewGenericProposal(nProposals, description);
        nProposals++;
    }

    function depositDissolutionProposal()
        external
        override
        isAssociate
        isNotDissoluted
    {
        proposals[nProposals] = Proposal(
            ProposalCategory.CorporateDissolution,
            "",
            address(0),
            new address[](0),
            true
        );
        emit NewDissolutionProposal(nProposals);
        nProposals++;
    }

    function requestShareRefunding() external override {
        uint256 share = associates[msg.sender].share;
        assert(address(this).balance >= share);
        payable(msg.sender).transfer(share);
        if (this.isAssociated(msg.sender)) totalShares -= share;
        if (address(this).balance == 0) selfdestruct(founder);
        associates[msg.sender].share = 0;
        associates[msg.sender].accepted = false;
    }

    function isAssociated(address id) external view override returns (bool) {
        return associates[id].share >= minShare && associates[id].accepted;
    }

    function isDissoluted() external view override returns (bool) {
        return dissoluted;
    }

    function getVoteShares(uint256 proposalId)
        internal
        view
        returns (uint256 voteShares)
    {
        Proposal storage p = proposals[proposalId];
        for (uint256 i = 0; i < p.voters.length; ++i)
            voteShares += associates[p.voters[i]].share;
    }

    function checkProposal(uint256 proposalId, uint256 voteShares) internal {
        Proposal storage p = proposals[proposalId];
        ProposalCategory category = p.category;

        if (
            category == ProposalCategory.NewAssociationAcceptance &&
            voteShares > totalShares / 2
        ) {
            p.pending = false;
            associates[p.associate].accepted = true;
            totalShares += associates[p.associate].share;
            emit AcceptedAssociate(p.associate);
        } else if (
            category == ProposalCategory.Generic && voteShares > totalShares / 2
        ) {
            p.pending = false;
            emit AcceptedGenericProposal(p.description);
        } else if (
            category == ProposalCategory.CorporateDissolution &&
            voteShares == totalShares
        ) {
            p.pending = false;
            dissoluted = true;
            emit AcceptedCorporateDissolution();
        }
    }
}
