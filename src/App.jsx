
import { useState, useEffect, useCallback } from 'react'

const App = () => {


  const [query, setQuery] = useState("")
  const [listaSuggerimenti, setListaSuggerimenti] = useState([])

  const fetchDataAndJson = useCallback(async (query) => {
    console.log("Delay del debounce concluso. Ricerca in corso...");

    try {
      const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`);
      if (res.status == 500) { // L'API da error500 e non funziona va trovata un'altra API
        throw new Error("Error 500, API offline")
      } else if (!res.ok) {
        throw new Error("Nessun risultato trovato");
      }
      const data = await res.json();
      setListaSuggerimenti(data);
      console.log(data);

    } catch (err) {
      console.error("Errore nel fetch dei dati =>", err.message);
      setListaSuggerimenti([]);
    }
  }, []);


  function Debounce(callback, delay) {
    let timer
    return (value) => {
      clearTimeout(timer)
      console.log(`Attesa del delay...`)
      timer = setTimeout(() => callback(value), delay)
    }
  }

  const handleSearch = useCallback(Debounce(fetchDataAndJson, 700), [fetchDataAndJson])


  return (
    <>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value)
          }}
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

📌 Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.

🎯 Bonus: Caricare i Dettagli del Prodotto Selezionato
Obiettivo: Aggiungere interattività permettendo di visualizzare le informazioni complete di un prodotto.

Quando l’utente clicca su un prodotto nella tendina, nascondi 
la tendina e carica i dettagli completi del prodotto sotto il campo di ricerca.
Effettua una richiesta API per ottenere i dettagli completi:
https://boolean-spec-frontend.vercel.app/freetestapi/products/{id}
Mostra i dettagli del prodotto selezionato (es. image, name, description, price).

*/