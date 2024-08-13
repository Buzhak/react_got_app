import ItemDetails, { Field } from "../charDetails";
import React, { Component } from "react";

import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import ItemList from "../itemList";
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {
    gotService = new GotService();

    state = {
        selectedChar: null
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id,
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

        const charDetails = (
            <ItemDetails itemId={this.state.selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}