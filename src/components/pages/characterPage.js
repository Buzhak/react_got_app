import ItemDetails, { Field } from "../itemDetails";
import React, { Component } from "react";

import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import ItemList from "../itemList";
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {
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
                    getData={this.gotService.getAllCharacters}
                    renderItem={(item) => `${item.name} (${item.gender})`}/>
        )

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedItem} getItem={this.gotService.getCharecter} title={'character'}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}