import { useState, useEffect } from 'react'
import countriesService from '../services/countries'

const Searchbox = ({setMatches, matches}) => {
    const [search, setSearch] = useState('')

    const handleChange = (event) => {
        const str = event.target.value
        setSearch(str)

        if(str.trim().length === 0) setMatches(matches)
        else setMatches(matches.filter( country => country.name.common.toLowerCase().includes(str.toLowerCase())))
    }

    return(
        <div>
            find countries: <input value={search} onChange={handleChange}/>
        </div>
    )

}

export default Searchbox