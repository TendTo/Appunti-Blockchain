# Bitcoin

## Blockchain

La blockchain è una struttura dati ordinata, immutabile e condivisa che mantiene una traccia di tutte le transazioni effettuate. Questa soluzione, se ben implementata, evita pratiche quali double spending e la modifica di transazioni precedenti.

Ogni full-node Bitcoin possiede una copia personale dell'intera blockchain, validata blocco per blocco. Se più nodi possiedono una copia conforme della stessa blockchain, essi sono in **consenso**. Perché ciò avvenga, devono essere stabilite delle regole comuni, definite **regole di consenso**.

## Blocchi

La blockchain è composta da blocchi a cui sono associate un gruppo di transazioni. In realtà, queste vanno poi a comporre un **Merkle tree**, e solo la **Merkle root** viene salvata nel **block header**, al fine di ridurre al minimo lo spazio utilizzato senza compromettere la sicurezza della struttura. Nel **block header** viene salvato anche l'hash del blocco precedente,  per assicurare che una qualsiasi parte della catena non possa essere modificata senza che ciò invalidi tutti i blocchi successivi.

![blocks](./img/en-blockchain-overview.svg)

### Block header

Il block header contine le informazioni essenziali usate per validare il blocco stesso e stabilire se può essere aggiunto alla blockchain. I valori che seguono caratterizzano il blocco e non sono modificabili, ad eccezione della **nonce**. É proprio quella che viene usata dal miner che, modificandola di volta in volta, spera di riuscire ad ottenere un hash del block header che sia sotto il valor indicato in **nBits**.

```json
{
    "version": 2,
    "previousblockhash": "0000000000000002a7bbd25a417c0374cc55261021e8a9ca74442b01284f05",
    "hash": "0000000000000001b6b9a13b095e96db41c4a928b97ef2d944a9b31b2cc7bdc4",
    "merkleroot": "c91c008c26e50763e9f548bb8b2fc323735f73577effbc55502c51eb4cc7cf2e",
    "nBits": "1903a30c",
    "time": 1388185914,
    "nonce": 924591752
}
```

### Transazioni in un blocco

Ogni blocco, per essere creato, deve comprendere almeno la **coinbase transaction**. Questa transazione speciale assegna la ricompensa prevista in quel momento al miner, con la condizione straordinaria che l'**UTXO** non potrà essere speso se non fra 100 blocchi, per dare il tempo alla chain di assicurarsi che il blocco sia definitivo.

Sebbene sia sufficiente includere solo questa singola transazione, è nell'interesse dei miner provare a saturare il blocco con altre transazioni, in quanto queste potrebbero includere delle fee addizionali che il miner potrebbe intascarsi, rendendole ancora più appetibili ai suoi occhi.

Tutte le transazioni sono salvate in formato binario, e il valore ottenuto viene poi hashato per ottenere il **TxID**. Tutti i TxIDs, accoppiati a due a due, vengono usati per costruire il **Merkle tree**. Un eventuale TxID dispari viene accoppiato con una copia di se stesso. Il processo si conclude con il calcolo della **Merkle root**. L'utilizzo di un Merkle tree rende anche molto efficiente verificare la presenza di una determinata transazione nel blocco senza doverle scaricare tutte. Ad esempio, per verificare che D è stato aggiunto nel blocco, un nodo light necessita solo delle TxID *C*, *AB*, and *EEEE*, oltre che alla Merkle root, presente nel block header.

```
       ABCDEEEE .......Merkle root
      /        \
   ABCD        EEEE
  /    \      /
 AB    CD    EE .......E is paired with itself
/  \  /  \  /
A  B  C  D  E .........Transactions
```

### Hard e soft forks

Nel momento in cui viene cambiato l'algoritmo di consenso, qualsiasi sia il motivo, si viene a creare una situazione particolare, in cui si possono avere risvolti diversi a seconda del tipo di cambiamento.

- **Hard fork:** un blocco prodotto con il nuovo protollo viene accettato dai nodi aggiornati ma rigettato da quelli vecchi. Si crea una incompatibilità irrisolvibile e si sdoppia la blockchain
- **Soft fork:** un blocco che prodotto con il nuovo protocollo è comunque un blocco valido agli occhi dei nodi vecchi, e viene quindi accettato da tutti. Al contrario, un blocco che segue il vecchio protocollo verrà rigettato dai nodi nuovi. Se i nodi aggiornati sono la maggioranza, la catena proseguirà con il protocollo aggiornato

Per evitare disservizi e mantenere tutti i nodi aggiornati, cambiamenti significativi di questo tipo sono programmati con largo anticipo inserendo una flag all'interno del software che verrà attivata all'unisono al momento stabilito. Si tratta delle **[User Activated Soft Forks](https://developer.bitcoin.org/glossary.html#term-UASF) (UASF).** Un'altra metodologia è attendere che la maggior parte dei miner si dica pronta al passaggio. Ciò dà vita alle **[Miner Activated Soft Forks](https://developer.bitcoin.org/glossary.html#term-MASF) (MASF)**.

### Accorgersi delle fork

Poiché le fork possono essere estremamente dannose per gli utenti Bitcoin, con potenziali perdite economiche, i software hanno dei sistemi per accorgersi se una fork è in atto, allertando il proprietario. Ciò avviene, ad esempio, se un nodo riceve diversi blocchi più aggiornati del proprio che però non riesce a validare, oppure se la transaction number ricevuta inizia a divergere parecchio da quella usata. Un light node può anche rendersi conto del problema interpellando molti full node che iniziano a fornire altezze dei blocchi molto diverse, segno che sono in disaccordo sull'algoritmo di consenso.

## Transazioni

Sebbene si possa avere l'impressione di possedere un account con un bilancio ben stabilito e facilmente consultabile, la verità è che i bitcoin si muovono transazione per transazione. In effetti, ogni bitcoin speso, che diventa l'**output** della transazione, diverrà poi l'**input** di una transazione successiva. Una transazione può creare multipli output, ma uno specifico output può essere usato come input una sola volta in tutta la blockchain. Provare ad utilizzarlo successivamente sarebbe un tentativo di double spending.

Gli output sono identificati da i **[transaction identifiers](https://developer.bitcoin.org/glossary.html#term-Txid) (TxIDs)**. Si tratta degli hash delle transazioni firmate. Gli output delle transazioni in un determinato istante di vita della blockchain posso essere suddivisi in **[Unspent Transaction Outputs (UTXOs)](https://developer.bitcoin.org/glossary.html#term-UTXO)** o **Spent Transaction Outputs**. Dire che un indirizzo ha una certa quantità di bitcoin vuol dire che ci sono quel numero di bitcoin in uno o più UTXOs a suo nome.

Ogni output prodotto da una transazione ha un indice in basa alla sua posizione nel vettore degli output, anche chiamato **vout**. Il valore che contiene potrà essere speso da chiunque sia in grado di soddisfare le condizione specificate del **pubkey script**. 

Per essere usato come input di una transazione successiva, è necessario specificare la TxID e la posizione dell'output che si intende sfruttare. Viene anche specificato uno **signature script** che viene utilizzato, in combinazione con il pubkey script, per validare la transazione, ammesso che soddisfi le condizioni previste.

Per essere valida, una transazione deve contenere come input unicamente **UTXOs**. Inoltre, ovviamente, la somma degli  input deve essere maggiore o uguale alla somma degli output. La differenza fra output e input, necessariamente non negativa, potrà essere reclamata come **transaction fee** dal **miner**. Ad esempio, tutte le transazioni rappresentate in figura stanno pagando 10k satoshi come transaction fee.

![en-transaction-propagation](./img/en-transaction-propagation.svg)

## Bitcoin scripts

Bitcoin fornisce un semplice linguaggio basato su una macchina con stack. Non dispone di istruzioni di salto, il che rende impossibile implementare cicli. La limitatezza di questo linguaggio, nemmeno Turing completo, è intenzionale, e serve ad impedire che sia abusato da un agente malevolo. Nella pratica, solo un gruppo ristretto di script viene accettato ed eseguito dai nodi.

### Composizione

Uno script si compone di due parti:

- **locking script (scriptPubkey):** creato dal mittente della transazione, viene inserito negli output della stessa. Per poter spendere l'UTXO è necessario che questa parte dello script si concluda senza errori e con un valore **1** sullo stack
- **unlocking script (scriptSig):** inserito dall'utente che intende spendere l'output. Viene eseguito prima del locking script, e deve fornirgli gli input necessari per terminare correttamente 

![en-signing-output-to-spend](./img/en-signing-output-to-spend.svg)




### Pay-To-Public-Key-Hash (P2PKH)

Questo tipo di script è il più utilizzato per mandare un semplice pagamento all'indirizzo desiderato.

```mermaid
stateDiagram-v2
direction LR
a : < sign >
b : < pk >
c : OP_DUP
d : OP_HASH160
e : < address >
f : OP_EQUALVERIFY
g : OP_CHECKSIG

state SignScript {
    [*] --> a
    a --> b
}
b --> PubkeyScript
state PubkeyScript {
direction LR
    c --> d
    d --> e
    e --> f
    f --> g
    g --> [*]
}
```

Le operazioni vengono eseguite nell'ordine:

- il destinatario produce la firma la transazione e la pusha sullo stack
- il destinatario pusha la sua chiave pubblica sullo stack
- la chiave viene duplicata sullo stack
- viene hashata e diviene un indirizzo bitcoin
- viene verificato che l'indirizzo prodotto da queste operazioni e quello specificato dal mittente corriposndono
- si controlla che la firma sia valida

![en-p2pkh-stack](./img/en-p2pkh-stack.svg)


### Pay To Script Hash (P2SH)

P2SH è usato per eseguire uno script arbitrario. Qualsiasi script valido può essere passato come input nel sign script, e, una volta verificata la sua correttezza nel pubkey script, verrà eseguito al suo posto.

Alcuni script utilizzati in questo ambito sono script che scrivono testo sulla blockchain, fino a 1.5 kb, oppure multisignature scripts.

### Multisig

Sebbene ora come ora sia comune utilizzare P2SH per svolgere questa funzione, anche gli script base supportano il multisign. In questo tipo di script, chiamati m-of-n, *m* è il numero minimo di firme valide necessarie, fornite *n* public keys.

A causa di un bug nell'implementazione, mantenuto per retro compatibilità, OP_CHECKMULTISIG consuma un input in più del necessario, cosa che va compensata ogni volta aggiungendo un valore OP_0 in aggiuntivo.

```yaml
Pubkey script: <m> <A pubkey> [B pubkey] [C pubkey...] <n> OP_CHECKMULTISIG
Signature script: OP_0 <A sig> [B sig] [C sig...]
```

Lo stesso obiettivo può essere raggiunto con un P2SH di questo tipo:

```yaml
Pubkey script: OP_HASH160 <Hash160(redeemScript)> OP_EQUAL
Redeem script: <OP_2> <A pubkey> <B pubkey> <C pubkey> <OP_3> OP_CHECKMULTISIG
Signature script: OP_0 <A sig> <C sig> <redeemScript>
```

### Script a tempo

Uno script può anche specificare un tempo di blocco, per cui la transazione viene validata solo se il timestamp o l'altezza del blocco sono state superate. Fino a quando non diviene spendibile, il mittente ha la possibilità di ri-approriarsi dell'output, e dato che il double spending non è consentito, di fatto annulla la transazione.

### Casi di utilizzo

#### Escrow

Si può immaginare un contratto multisign che interpella un intermediario, magari promettendo una percentuale sulla transazione. Il mittente prepara una transazione che può essere sbloccata da due dei tre agenti in causa: se stesso, il destinatario da cui si aspetta di ricevere il servizio o la terza parte. Nel caso uno fra il mittente e il destinatario violi gli accordi presi, la terza parte può decidere, in maniera estranea a qualsiasi protocollo, da che parte schierarsi e sbloccare i fondi a favore di una delle due parti, senza dover interpellare l'altra.

```mermaid
flowchart LR
A[Sender]
B[Receiver]
J[Judge]
T{{Transaction 2-of-3}}

J -.->|Il giudice interviene<br>se una delle due parti<br>non rispetta gli accordi| T
B -->|Service| A
A --> T
T --> B
T -.-> B
T -.->A
```

#### Green address

Dato che per avere la certezza che una transazione non venga invalidata da un tentativo di **double spending** bisogna attendere almeno 6 round, che per Bitcoin si traducono in circa un'ora, un eseciente che fornisce un servizio deperibile e che quindi non può permettersi di aspettare le necessarie conferme potrebbe comunque accettare pagamenti provenienti da un indirizzo fidato, il **green address**, intestato ad un ente garante. L'acquirente quindi paga l'ente con qualsiasi mezzo sia accettato, e questo a sua volta fa da tramite verso il destinatario originale, che invierà subito la merce fidandosi del fatto che l'intermediario non farà double spending.

```mermaid
flowchart LR
A[Sender]
B[Receiver]
J[Trusted Bank]
T{{Transaction}}

B -->|Immediate service| A
A -->|Payement| J
J --> T
T --> B
```

#### Micro pagamenti

Per effettuare micro pagamenti rapidi con Bitcoin, ad esempio per una chiamata con costi al minuto, la strategia adoperata prevede di usare una transazione che rappresenta la caparra da parte del sender con uno script multisig, che necessita l'approvazione del sender e del receiver per essere sbloccato. Per essere sicuro di non perdere il capitale, il sender potrebbe aggiungere anche una transazione a tempo che gli restituisca il tutto se non è stato ancora riscosso.
Man mano che riceve il servizio viene erogato, il sender manda privatamente una transazione al receiver, senza inviarla però alla blockchain. Il pagamento cresce al ritmo stabilito dal contratto fra i due. Nel momento in cui il sender smette di inviare transazioni o il receiver si ritiene soddisfatto, quest'ultimo riscuote l'ultima transazione facendone il **broadcast**.

```mermaid
sequenceDiagram
participant a as Sender
participant b as Blockchain
participant r as Receiver

a ->> b : | pay 100 | <br> unlock script needs sign <br> from Sender and Receiver
loop untill the money runs out or service ends
    r ->> a : service
    a ->> r : sign 1->Reveiver 99->Sender
end
r ->> b : collect the last signed transaction
a ->> b : collect back the first transaction <br> if it has not yet been collected
```

## Proof of work

Poiché la blockchain è pubblica e potenzialmente vulnerabile ad un qualsiasi agente che voglia minarne la sicurezza e validità, è stato necessario introdurre un sistema che assicuri che un agente malevolo si trovi a dover svolgere un lavoro fin troppo oneroso per riuscire a raggiungere il suo obiettivo. Poiché la modifica di un singolo blocco richiede la modifica in cascata di tutti i successivi, questa operazione diventa sempre più dispendiosa man mano che la catena si allunga.

La proof of work usata da Bitcoin sfrutta la natura apparentemente randomica delle funzioni hash crittografiche. Per fare in modo che il nuovo blocco proposto da un nodo sia accettato come valido da tutti gli altri, l'hash del block header deve essere inferiore, come valore numerico, ad una soglia stabilita, che sancisce anche la difficoltà del puzzle. Questa soglia viene infatti aggiustata periodicamente al fine di garantire una tempistica prestabilita di produzione di nuovi blocchi, circa 10 minuti.
Più precisamente, basandosi sui timestamp salvati nei blocchi, ogni 2016 blocchi aggiunti si controlla che l'intervallo fra il primo e l'ultimo sia di circa 1,209,600 seconds (due settimane). Se questo vincolo non è rispettato, la difficoltà è aumentata o diminuita in proporzione allo squilibrio (fino al 300% o fino al 75%).

### Block height e forking

Ogni volta che una proof of work viene superata con successo, il miner acquisisce il diritto di pubblicare il nuovo blocco e appenderlo alla chain. I blocchi sono spesso indicati facendo riferimento alla loro altezza dal primo blocco, detto anche **genesis block**.

Poiché il minin è un processo asincrono, è comune che più di un blocco venga aggiunto alla blockchain nello stesso slot. Questo genera una **fork**. Tuttavia, seguendo la regola che solo la catena più lunga viene portata avanti, queste temporanee deviazioni vengono presto riassorbite ed eliminate quando una delle catene diventa molto più lunga delle altre. Proprio per questo motivo è bene attendere un numero sufficiente di blocchi prima di essere sicuri che una transazione sia stata effettuata e sia ormai salvata permanentemente nella blockchain.

![en-blockchain-fork](./img/en-blockchain-fork.svg)

## Rete P2P

La rete Bitcoin è veramente p2p, e non ci sono nodi centralizzati a cui rivolgersi: tutti i nodi hanno uguale importanza. Se un nodo non dà segni di vita per più di 3 ore, è considerato disconnesso.
Le transazioni sono trasmessi tramite flooding, per cui il mittente comunica la transazione a tutti i nodi a cui è connesso, che a loro volta la inoltrano agli altri nodi. Questo tipo di protocollo non dà nessuna garanzia di tipo*at least once* o *at most once*. Il che vuol dire che i miner possono benissimo essere a lavoro su blocchi con transazioni diverse e quindi con puzzle diversi.

## Limitazioni e punti deboli

### Limiti hard-coded

- 10 minuti fra un blocco e l'altro 
- dimensione massima di un blocco di 1 Mb
- 20,000 operazioni massime di firma per blocco
- 100 M satoshi per blocco
- 23 M bitocoin massimi
- mining reward in costante diminuzione
- funzioni crittografiche fisse

La prima e la seconda limitazione in particolare impongono un limite forte di 7 transazioni/s, molto basso rispetto a quelli di altri tipi di piattaforme come PayPal (50-100) o Visa (2,000-10,000).

Sebbene gli strumenti crittografiche sono ancora estremamente sicure, si dovesse scoprire una vulnerabilità o se col passare del tempo le dimensioni di input e output non fossero più sufficienti a garantirne la sicurezza, non sarebbe facile individuare una soluzione, se non tramite **hard forks**.



