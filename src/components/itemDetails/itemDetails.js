import { ListGroup, ListGroupItem } from 'reactstrap';
import React, {Component} from 'react';

import GotService from '../../services/gotService';
import styled from 'styled-components';

const CharDetailsBlock = styled.div.attrs({
    className: "item-details rounded"
})`
    &.item-details {
        background-color: #fff;
        padding: 25px 25px 15px 25px;
        margin-bottom: 40px;
    }

    &.item-details h4 {
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

const Field = ({item, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </ListGroupItem>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {
    // gotService = new GotService();
    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId} = this.props;
        
        if (!itemId) {
            return;
        }
        this.props.getItem(itemId)
            .then((item) => {
                this.setState({item})
            })
    }

    render() {

        if (!this.state.item) {
            return <SelectError>Please select {this.props.title}</SelectError>
        }
        const {item} = this.state;
        const {name} = item;

        return (
            <CharDetailsBlock>
                <h4>{name}</h4>
                <ListGroup className="list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ListGroup>
            </CharDetailsBlock>
        );
    }
}