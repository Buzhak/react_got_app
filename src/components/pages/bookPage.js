import React, { Component } from "react";

import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import ItemList from "../itemList";
import { useNavigate } from 'react-router-dom';

class BookPage extends Component {
    gotService = new GotService();

    state = {
        selectedItem: null
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id,
            error: false
        })
        this.props.navigate(`${id}`)
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllBooks}
                    renderItem={(item) => `${item.name}`}/>
        )
    }
}

function BookPageWrapper() {
    const navigate = useNavigate();
    return <BookPage navigate={navigate} />;
}

export default BookPageWrapper;