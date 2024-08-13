import {Button, Col, Container, Row} from 'reactstrap';
import React, { Component } from 'react';

import CharacterPage from '../pages';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import Header from '../header';
import ItemDetails from '../itemDetails';
import ItemList from '../itemList';
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
                    {/* <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllBooks}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllHouses}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row> */}
                </Container>
            </Main>
        );
    }
};
