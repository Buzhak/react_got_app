import {Button, Col, Container, Row} from 'reactstrap';
import React, { Component } from 'react';

import CharDetails from '../charDetails';
import CharacterPage from '../characterPage';
import ErrorMessage from '../errorMessage';
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
                </Container>
            </Main>
        );
    }
};
