import ItemDetails, { Field } from "../itemDetails";
import React, { Component } from "react";

import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import ItemList from "../itemList";
import RowBlock from '../rowBlock';

export default class HousePage extends Component {
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
                    getData={this.gotService.getAllHouses}
                    renderItem={(item) => `${item.name}`}/>
        )

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedItem} getItem={this.gotService.getHouse} title={'house'}>
                <Field field='name' label='House name'/>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}