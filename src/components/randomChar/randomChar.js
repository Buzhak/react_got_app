import { ListGroup, ListGroupItem } from 'reactstrap';
import React, {Component} from 'react';

import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import styled from 'styled-components';

const RandomBlock = styled.div.attrs({
    className: "random-block rounded"
})`
    &.random-block {
        background-color: #fff;
        padding: 25px 25px 15px 25px;
        margin-bottom: 40px;
    }
    &.random-block h4 {
        margin-bottom: 20px;
        text-align: center;
    }
    .term {
        font-weight: bold;
    }
`

export default class RandomChar extends Component {
    constructor() {
        super();
        this.updateChar();
    }
    gotService = new GotService();
    state = {
        char: {},
        loading: true
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        const id = Math.floor(Math.random()*140 + 25); //25-140
        this.gotService.getCharecter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ?  <Viev char={char}/> : null;
  
        return (
            <RandomBlock>
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}

const Viev = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ListGroup className="list-group-flush">
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}
