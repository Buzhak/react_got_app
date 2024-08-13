import { BookPage, CharacterPage, HousePage } from '../pages';
import {Button, Col, Container, Row} from 'reactstrap';
import React, { Component } from 'react';

import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components'

const Main = styled.div`
    .buttonCloseRandom {
        margin-bottom: 40px;
    }
`

export default class App extends Component {
    gotService = new GotService();

    constructor(props) {
        super(props);
        this.state = {
            showRandomChar: true,
            error: false
        }
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    _changeShowRandomChar = () => {
        this.setState((prevState) => ({
            showRandomChar: !prevState.showRandomChar 
        }))        
    }

    render() {
        const showRandomChar = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Main> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {showRandomChar}
                            <Button 
                                color='primary'
                                className='buttonCloseRandom'
                                onClick={() => {
                                    this._changeShowRandomChar()
                                }}>
                                    Close Random Character
                            </Button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BookPage/>
                    <HousePage/>
                </Container>
            </Main>
        );
    }
};
