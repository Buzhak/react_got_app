import {Button, Col, Container, Row} from 'reactstrap';
import React, { Component } from 'react';

import CharDetails from '../charDetails';
import Header from '../header';
import ItemList from '../itemList';
import RandomChar from '../randomChar';
import styled from 'styled-components'

const Main = styled.div`
    .buttonCloseRandom {
        margin-bottom: 40px;
    }
`

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRandomChar: true
        }
    }

    _changeShowRandomChar = () => {
        this.setState((prevState) => ({
            showRandomChar: !prevState.showRandomChar 
        }))        
    }

    render() {
        const showRandomChar = this.state.showRandomChar ? <RandomChar/> : null;
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
                                    Close Random Characte
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </Main>
        );
    }
};
