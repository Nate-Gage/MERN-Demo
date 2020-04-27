import React from 'react';
import PropTypes from 'prop-types';

const Recipe = (props) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <p>Cooktime: {props.cooktime} minutes</p>
            <p>{props.description}</p>
            <p>{props.id}</p>
            <button onClick={() => { props.deleteRecipe(props.id) }}>delete</button>
        </div>
    );
}

Recipe.propTypes = {
    title: PropTypes.string.isRequired,
    cooktime: PropTypes.number.isRequired
}

export default Recipe;
