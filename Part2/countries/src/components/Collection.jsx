import Card from "./Card"
import Country from './Country'

const Collection = ({countries}) => {
    if(countries.length > 5) return(<div>Too many matches, be more specific.</div>)
    if(countries.length === 1) return <Card country={countries[0]}/>
    if(countries.length === 0) return <div>No matches found</div>

    return(
        <ul>
            {countries.map(country => <Country key={country.name.common} country={country}/>)}
        </ul>
    )
}

export default Collection