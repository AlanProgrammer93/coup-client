import React from 'react'
import './SelectOponent.css'

const SelectOponent = ({gamers}) => {
    return (
        <div className="selectOponent">
            {
                gamers.map(g => (
                    <div className="oponent">
                        {g.user}
                    </div>
                ))
            }
        </div>
    )
}

export default SelectOponent
