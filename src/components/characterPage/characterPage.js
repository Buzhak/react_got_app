import { Col, Row } from 'reactstrap';
import React, { Component } from "react";

import CharDetails from "../charDetails";
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import ItemList from "../itemList";

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
        return (
            <Row>
                <Col md='6'>
                    <ItemList 
                    onCharSelected={this.onCharSelected}
                    getData={
                        this.gotService.getAllCharacters
                    }/>
                </Col>
                <Col md='6'>
                    <CharDetails charId={this.state.selectedChar}/>
                </Col>
            </Row>
        )
    }
}