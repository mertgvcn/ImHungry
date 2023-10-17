import React, { useState } from 'react'
//css
import "./styles/IngredientCard.css"

type IngredientCardProps = {
    name: string,
}

const IngredientCard = (props: IngredientCardProps) => {
    const [isActive, setIsActive] = useState(true)

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(isActive) {
            e.currentTarget.style.textDecoration = 'line-through'
            e.currentTarget.style.backgroundColor = '#cba68f'
        }
        else {
            e.currentTarget.style.textDecoration = 'none'
            e.currentTarget.style.backgroundColor = '#e4cbbb'
        }

        setIsActive(!isActive)
    }

    return (
        <div className='ingredient-card-wrapper' onClick={handleClick}>
            <p>{props.name}</p>
        </div>
    )
}

export default IngredientCard