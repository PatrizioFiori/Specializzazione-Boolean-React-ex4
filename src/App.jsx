
import { useState, useEffect, useCallback } from 'react'

const App = () => {

  const listaSuggerimentiInitialState = [];

  const [query, setQuery] = useState("")
  const [listaSuggerimenti, setListaSuggerimenti] = useState(listaSuggerimentiInitialState)

  async function fetchDataAndJson(query) {
    try {
      const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      if (!res.ok) {
        throw new Error("nessun risultato trovato")
      }
      const data = await res.json()
      setListaSuggerimenti(data)
      console.log(data)
    } catch (err) {
      console.error("Errore nel fetch dei dati:", err.message);
      setListaSuggerimenti(listaSuggerimentiInitialState);
    }
  }



  useEffect(() => {
    if (query.trim() === "") {
      setListaSuggerimenti([]); // Se query è vuota, svuota la lista
      return; // Non chiamare il server
    }
    fetchDataAndJson(query);
  }, [query]);

  return (
    <>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>
        {listaSuggerimenti.length === 0 ? (
          <h2>Nessun risultato trovato</h2>
        ) : (
          <ul>
            {listaSuggerimenti.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>


    </>
  )
}

export default App

/*


📌 Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti
Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente.
- campo input in cui ricercare (<input type="text">)
- Effettuare chiamata API all'indirizzo in base alla ricerca nel campo input
https://boolean-spec-frontend.vercel.app/freetestapi/products?search=[query]
- Mostrare i risultati API sotto l'input in una tendina di suggerimenti
- Se l'utente cancella il testo, la tendina scompare.


📌 Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.

Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.


🎯 Bonus: Caricare i Dettagli del Prodotto Selezionato
Obiettivo: Aggiungere interattività permettendo di visualizzare le informazioni complete di un prodotto.

Quando l’utente clicca su un prodotto nella tendina, nascondi 
la tendina e carica i dettagli completi del prodotto sotto il campo di ricerca.
Effettua una richiesta API per ottenere i dettagli completi:
https://boolean-spec-frontend.vercel.app/freetestapi/products/{id}
Mostra i dettagli del prodotto selezionato (es. image, name, description, price).

*/