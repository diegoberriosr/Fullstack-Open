import { useState } from 'react'

// Component imports
import Card from './Card'

const Country = ({country}) => {
    const [ showInfo, setShowInfo] = useState(false)
    
    return(
        <li>
            <div>{country.name.common} <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'close' : 'show'}</button></div>
            {showInfo && <Card country={country} />}
        </li>
    )
}

export default Country