import React, { Component } from 'react';
import axios from 'axios';
import '../App';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Recipe = props => {

    return (
        <div>
            <h3>{props.title}</h3>
            <p>Cooktime: {props.cooktime} minutes</p>
            <p>{props.description}</p>
            <p>{props.id}</p>
            <span><a href='#' onClick={() => { props.deleteRecipe(props.id) }}>DELETE</a> | <Link to={'/edit/' + props.id}>EDIT</Link></span>
        </div>
    );
}

class RecipesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };

        this.deleteRecipe = this.deleteRecipe.bind(this);
    };

    componentDidMount() {
        axios.get('http://localhost:5000/recipes')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        recipes: res.data.map(recipe => {
                            return recipe
                        })
                    });
                    console.log(this.state.recipes);
                } else {
                    console.log('There was an error getting the recipes');
                }
            });
    }

    deleteRecipe(id) {
        console.log('ID: ' + id);
        axios.delete('http://localhost:5000/recipes/' + id)
            .then(
                this.setState({
                    recipes: this.state.recipes.filter(recipe => recipe._id !== id)
                }));
    }

    render() {
        return (
            <div>
                <h1 className="header">My Recipes</h1>
                <h2>Click on a recipe below to view and edit details</h2>
                {this.state.recipes.map(recipe => (
                    <Recipe
                        deleteRecipe={this.deleteRecipe}
                        key={recipe.title}
                        recipe={recipe}
                        title={recipe.title}
                        cooktime={recipe.cooktime}
                        description={recipe.description}
                        id={recipe._id}
                    />
                ))}
            </div>
        );
    }
};

Recipe.propTypes = {
    title: PropTypes.string.isRequired,
    cooktime: PropTypes.number.isRequired
}

export default RecipesList;

