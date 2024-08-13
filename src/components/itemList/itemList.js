import { ListGroup, ListGroupItem } from 'reactstrap';
import React, {Component} from 'react';

import Spinner from '../spinner';
import styled from 'styled-components';

const ItemListBlock = styled.div`
    .item-list .list-group-item {
        cursor: pointer;
    }
`

export default class ItemList extends Component {
    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList: itemList
                })
            })
    }

    renderItems(arr) {
        return  arr.map((item) => {
            const {id} = item;
            
            const label = this.props.renderItem(item);
            return (
                <ListGroupItem 
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList)

        return (
            <ItemListBlock>
                <ListGroup className="item-list">
                    {items}
                </ListGroup>
            </ItemListBlock>
        );
    }
}