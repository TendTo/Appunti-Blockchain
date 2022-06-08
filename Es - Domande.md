# Domande

### 1) Bitcoin è anonimo? Se no, indicare alcuni possibili approcci per migliorarne l'anonimato.

Bitcoin, allo stato attuale, non è anonimo. Sebbene la definizione di anonimato lascia un po' di spazio all'interpretazione, resta il fatto che per interagire con la blockchain è necessario dotarsi di una identità, rappresentata dal proprio indirizzo pubblico. Poiché questo indirizzo non è immediatamente riconducibile alla persona che lo possiede, è possibile parlare di **pseudoanonimato**. Per potersi definire davvero anonimo, sarebbe necessario dimostrare anche la **unlinkability** delle identità, cioè dovrebbe essere impossibile creare un collegamento fra azioni diverse intraprese da uno stesso agente.
Si ricordi inoltre che ogni transazione sulla blockchain è immutabile e **pubblica**. Se un indirizzo fosse associato ad una identità reale, sarebbe possibile per chiunque conoscere tutti i movimenti effettuati da quella persona mentre utilizzava il suddetto indirizzo.
Un collegamento indirizzo-persona può essere scoperto attraverso numerosi **side channels**. Ad esempio, usando un indirizzo per comprare un servizio, banalmente sto rivelando informazioni su di me alla persona dalla quale sto acquistando il bene. Si potrebbero fare anche indagini più minuziose, come gli orari di attività, la mole di transazioni, l'ammontare medio in ognuna di queste, pagamenti combinati, indirizzi usati per ricevere il "resto" di una transazione, **idioms of use** dei software che implementano i wallet, versamenti periodici etc...

Alcune proposte con lo scopo di migliorare il livello di anonimato sono state l'utilizzo di **TOR** o le **mix net**. Il primo, sebbene funzioni, non è lo strumento più adatto allo scopo. TOR è stato pensato per attività low-latency come il web browsing, e il suo utilizzo diffuso rallenterebbe ulteriormente, come già fa, la rete, senza contare che un numero sufficiente di agenti malevoli potrebbe comunque riuscire a tracciare il movimento della transazione, vanificando gli sforzi.
La  mix net effettuano un miscelamento ripetuto dei pacchetti rendendo impossibile qualsiasi tracciamento, ma sebbene sembra essere un approccio promettente, ma è ancora lontano dal soppiantare TOR.

Il mixing può essere utilizzato anche a livello applicativo. Ad esempio,  miscelando più volte le transazioni creando nuovi input e output, purché i mixer siano onesti, viene distrutto il collegamento tra la transazione originale e la sua destinazione. Un approccio simile però avrebbe bisogno di un entità centralizzata affidabile. Per ovviare a ciò, si può anche utilizzare un sistema decentralizzato, in cui un gruppo di utenti raccoglie le proprie transazioni in un unica transazione che le ingloba tutte e i cui output vanno ai destinatari originali. Se i tagli usati sono uguali per tutti, è impossibile dall'esterno stabilire quale indirizzo sta pagando un altro.

Si possono anche implementare soluzioni di **merge avoidance**. Queste prevedono che il venditore fornisca tanti indirizzi di pagamento quanti sono gli output appartenenti ad indirizzi diversi che l'acquirente vuole usare. Questo rende più difficile associare i vari indirizzi alla stessa persona.

### 2) Cosa sono le Zero Knowledge proof?

Le Zero Knowledge Proof (ZKP) sono degli strumenti crittografici che, individuati due agenti, rispettivamente un prover e un verifier, permettono al prover di dimostrare una proprietà d'interesse al verifier senza fornire ulteriori informazioni.

Per essere definita tale, una ZKP deve garantire le seguenti proprietà: 

- completezza: tutte le proposizioni valide della tipologia prevista dal protocollo devono essere verificabili
- soundness: le preposizioni false devono essere riconosciute come tale dal verifier a meno di una possibilità che il verifier stesso può abbassare a piacere, al costo di un protocollo più lungo
- zero knowledge. gli scambi necessari a portare a termine il protocollo non forniscono alcuna nuova conoscenza al verifier

Alcuni esempi di ZKP riguardano l'siomorfismo dei grafi o la validità di una chiave ottenuta dal protocolo DIffie-Helman.

### 3) Quali caratteristiche deve avere un buon puzzle da usare come proof of work?

Un puzzle da usare come proof of work deve avere una probabilità di essere vinto proporzionata ad una caratteristica stabilita a priori. Questa può essere individuata nella potenza di calcolo, nel proprio patrimonio in criptovaluta o nello spazio messo a disposizione per il protocollo. È importante, però, che ciò non si traduca in una vittoria assicurata per chi possiede la quantitò maggiore della risorsa, ma solo in un vantaggio proporzionato.
Deve essere possibile varirare la difficoltà del puzzle, così da poter reagire ad un numero diverso di partecipanti o a delle condizioni esterne che alterino il ritmo di produzione di nuovi blocchi, accelerandolo o rallentandolo e facendolo quindi divergere da quello previsto.
Infine, deve essere facile ed efficiente da verificare da chiunque, per assicurarsi che la soluzione proposta sia quella corretta, e che il miner si sia guadagnato il diritto di produrre il blocco.

### 4) Come si può gestire un segreto condiviso fra più agenti?

### 5) Che problema risolve la threshold cryptography? Indicarne una possibile implementazione.

### 6) Come funzionano i Bitcoin script?

I bitcoin script sono utilizzato per redimere gli output creati da una transazione. Verificare uno script permette infatti di usare lecitamente l'output corrispondente come input in un'altra transazione. Uno script è composto da due parti: il pulickey script (lock script), scritto dal mittente, e il sign Script (unlock script), che permette al destinatario della transazione di spendere i Bitcoin ricevuti. Alcuni degli script più utilizzati sono P2PKH, P2SH e multisignature.

### 7) Quali sono le caratteristiche di Zero-Coin?

Esistono anche delle critptovalute, come **ZeroCoin** e **ZeroCash**, che si propongono di risolvere il problema dell'anonimato alla radice. 
Sebbene Zerocoin potrebbe essere teoricamente resa compatibile con Bitcoin tramite un hardfork di quest'utilmo, le difficoltà pratiche rimuovono questa possibilità. L'idea alla base è quella di usare Zerocoin in maniera simile alle fishes di un casinò. Possedere Zerocoin vuol dire essere in grado, al momento opportuno, di scambiarle per un'altra cryptovaluta per lo stesso valore e viceversa, distruggendo qualsiasi legame fra le valute originali e quelle appena ottenute. Ovviamente è necessario che la possibilità di riscattare la valute a partire da Zerocoin possa essere effettuata una volta sola per token. 
Per produrre una Zerocoin, è necessario procedere nella seguente maniera:

1. Si genera una coppia $(S, r)$, rispettivamente un numero seriale univoco e un segreto casuale
2. Si crea un commitment della coppia appena prodotta
3. Il commitment viene aggiunto alla blockchain. Perché la transazione venga riconosciuta valida, è necessario bruciare il valore equivalente in basecoin a quello che si vuole produrre in Zerocoin

Per poter riscattare i token appena prodotti è necessario provare che questi siano effettivamente registrati sulla blockchain. Sarebbe possibile rivelare i valori di $(S, r)$, ma ciò renderebbe tracciabile tutto il processo. Invece si utilizza una Zero Knowledge proof che riguarda gli accumulatori $RSA$. I passaggi sono i seguenti:

1. Viene annunciato il numero seriale $S$ appartenente alla transazione di minting che si vuole riscattare
2. Si dimostra, tramite Zero Knowledge proof, di conoscere il valore di $r$ che produce un commitment fra quelli presenti sulla blockchain
3. Dopo aver verificato la validità della prova e l'unicità del numero seriale, la transazione viene approvata

### 8) Quali sono alcune possibili applicazioni degli alberi di Merkle?

Gli alberi di Merkle sono alberi binari aventi come foglie gli hash dei valori che si vogliono committare. Ogni nodo padre contiene un hash che combina quello dei due nodi figli, fino ad arrivare alla radice, che è l'unico valore che è necessario memorizzare. Infatti, nel caso una delle foglie venga modificata, questa alterazione risalirebbe l'albero ed andrebbe a modificare anche la radice, che non corrisponderebbe più, rivelando il misfatto.
Inoltre è possibile anche utilizzare i Merkle tree per verificare se una determiata foglia è presente. Basta infatti rivelare solo gli hash fratelli che si incotrerebbero risalendo l'albero a partire dalla foglia incriminata per permettere la risostruzione della radice dell'albero. Nel caso questa coincida con quella nota, si ha la certezza che la foglia effettivamente fa parte del Merkle tree.
