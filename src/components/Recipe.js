import React from 'react';

const Recipe = (props) => {
    return (
        <div>
            <h5>{props.title}</h5>
            <p>Cooktime: {props.cooktime}</p>
            <p>{props.description}</p>
        </div>
    )
};

export default Recipe;
