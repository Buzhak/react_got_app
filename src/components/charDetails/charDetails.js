import { ListGroup, ListGroupItem } from 'reactstrap';
import React, {Component} from 'react';

import GotService from '../../services/gotService';
import styled from 'styled-components';

const CharDetailsBlock = styled.div.attrs({
    className: "char-details rounded"
})`
    &.char-details {
        background-color: #fff;
        padding: 25px 25px 15px 25px;
        margin-bottom: 40px;
    }

    &.char-details h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`

const SelectError = styled.span.attrs({
    className: "select-error"
})`
    &.select-error {
        color: white;
        text-align: center;
        font-size: 26px;
    }
`

export default class CharDetails extends Component {
    gotService = new GotService();
    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        
        if (!charId) {
            return;
        }
        this.gotService.getCharecter(charId)
            .then((char) => {
                this.setState({char})
            })
    }

    render() {

        if (!this.state.char) {
            return <SelectError>Please select a charecter</SelectError>
        }

        const {name, gender, born, died, culture} = this.state.char;

        return (
            <CharDetailsBlock>
                <h4>{name}</h4>
                <ListGroup className="list-group-flush">
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </ListGroupItem>
                </ListGroup>
            </CharDetailsBlock>
        );
    }
}