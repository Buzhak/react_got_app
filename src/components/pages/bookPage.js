import ItemDetails, { Field } from "../itemDetails";
import React, { Component } from "react";

import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import ItemList from "../itemList";
import RowBlock from '../rowBlock';

export default class BookPage extends Component {
    gotService = new GotService();

    state = {
        selectedItem: null
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id,
            error: false
        })
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

        const itemList = (
            <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllBooks}
                    renderItem={(item) => `${item.name}`}/>
        )

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedItem} getItem={this.gotService.getBook} title={'book'}>
                <Field field='name' label='Title'/>
                <Field field='numberOfpages' label='Size of pages'/>
                <Field field='publiser' label='Published'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}