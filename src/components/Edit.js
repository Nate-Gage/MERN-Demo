import React from 'react';
import axios from 'axios';

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCooktime = this.onChangeCooktime.bind(this);
        this.onChangeDescrip = this.onChangeDescrip.bind(this);
        this.addRecipe = this.addRecipe.bind(this);

        this.state = {
            title: '',
            cooktime: 0,
            description: ''
        };
    };

    componentDidMount() {
        axios.get('http://localhost:5000/recipes/' + this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data.title,
                    cooktime: res.data.cooktime,
                    description: res.data.description
                })
            })
            .catch(error => console.log('Error: ' + error));
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeCooktime(e) {
        this.setState({
            cooktime: e.target.value
        });
    }
    onChangeDescrip(e) {
        this.setState({
            description: e.target.value
        });
    }
    addRecipe(e) {
        e.preventDefault();

        const recipe = {
            title: this.state.title,
            cooktime: this.state.cooktime,
            description: this.state.description
        };

        console.log(recipe);

        //second argument in axios.post is the object
        axios.post('http://localhost:5000/recipes/' + this.props.match.params.id, recipe)
            .then(res => console.log(res.data));

        window.location = '/recipes';
    }
    render() {
        return (
            <div className="addForm">
                <h1 className="header">Edit Recipe</h1>
                <form onSubmit={this.addRecipe}>
                    <label className="addRecipe__subheading">Recipe Name</label>
                    <input type="text" placeholder="e.g. 'Pizza'" className="addRecipe__input" value={this.state.title} onChange={this.onChangeTitle} />
                    <br />
                    <label className="addRecipe__subheading">Cooktime (in minutes)</label>
                    <input type="text" className="addRecipe__input" value={this.state.cooktime} onChange={this.onChangeCooktime} />
                    <br />
                    <h5 className="addRecipe__subheading">Add Instructions</h5>
                    <textarea className="addRecipe__input" value={this.state.description} onChange={this.onChangeDescrip}></textarea>
                    <br />
                    <button value="Edit Recipe">Submit</button>
                </form>
            </div>
        );
    }
};

export default EditRecipe;
