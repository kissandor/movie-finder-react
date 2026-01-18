//Component = függvény + JSX
import { useState } from 'react'
import '../style/components.css'

function SearchBar({ onSearch}) {

    const [query, setQuery] = useState("");
    // const [key, setKey] = useState("");

    return (
        <div className="searchbar">
            <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e)=>{
                    if (e.key === 'Enter') onSearch(query)
                }}
            >
            </input>
            <button className="search-btn btn" onClick={() => {
                if (!query.trim()) return
                onSearch(query)
            }}
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar