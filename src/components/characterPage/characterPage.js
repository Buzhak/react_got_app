import { Col, Row } from 'reactstrap';
import React, { Component } from "react";

import CharDetails from "../charDetails";
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import ItemList from "../itemList";
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {
    gotService = new GotService();

    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
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
                    onCharSelected={this.onCharSelected}
                    getData={this.gotService.getAllCharacters}
                    renderItem={(item) => `${item.name} (${item.gender})`}/>
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedChar}/>
        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}