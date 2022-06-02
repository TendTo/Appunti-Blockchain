# Blockchain

La blockchain sembra essere una soluzione promettente per risolvere il problema della centralizzazione e permettere un sistema che sia davvero distribuito. Ma ci sono diverse challenge da affrontare.

## Consensus

Il protocollo di consenso che verifica la validità delle transazioni, e quindi dei blocchi, deve essere condiviso e accettato da tutti i nodi della blockchain. Ci sono diversi ostacoli da superare:

- un nodo potrebbe essere temporaneamente non disponibile
- un nodo potrebbe essere malevolo
- non c'è un concetto globale di tempo
- la rete non è sempre affidabile

Ci sono molti teoremi che parlano di come questo prolema sia delicato, come il *Byzantine generals problem*, che afferma che tutto va a rotoli se più di un terzo di nodi sono malevoli e il *Fischer-Lynch-Paterson*, che afferma che il consenso è impossibile con anche un solo nodo malevolo.

Nonostante questi risultati poco promettenti, nella pratica il protocollo sembra funzionare, e tuttora non si sono verificati attacchi che ne minino la fiducia.

## Nodi malevoli

### Rubare

Non è possibile creare e firmare transazioni a nome di un altro utente sotto l'ipotesi che la cittografia sia sicura

### Denial of service

Per quanto un nodo si possa precludere il diritto di evitare di inserire transazioni di un determinato utente nei blocchi che produce, finchè ci sarà un sufficiente numero di nodi onesti prima o poi la transazione farà parte della blockchain.

### Double spending

Il nodo malevolo effettua una transazione verso un altro utente, da cui riceve il bene. Potrebbe poi produrre il blocco in cui quella transazione andrebbe registrata, ma eliminandola, di fatto cancellandola dalla blockchain. 
Per evitare questo tipo di attacco, le blockchain applicano il principio di continuare la catena più lunga. Quindi, se il nodo malevolo è l'unico a tentare questo attacco, dovrebbe essere in grado di proseguire la sua catena "alternativa" da solo, contro l'intera rete, che proseguirà la catena più lunga. La garanzia che ciò non sia fattibile per un attaccante è probabilistica e dipende dall'algorimo di consenso
