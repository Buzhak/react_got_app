import { ListGroup, ListGroupItem } from 'reactstrap';
import React, {Component} from 'react';

import PropTypes from 'prop-types'
import Spinner from '../spinner';
import styled from 'styled-components';

const ItemListBlock = styled.div`
    .item-list .list-group-item {
        cursor: pointer;
    }
`

class ItemList extends Component {
    
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
        const {data} = this.props;
        const items = this.renderItems(data);

        return (
            <ItemListBlock>
                <ListGroup className="item-list">
                    {items}
                </ListGroup>
            </ItemListBlock>
        );
    }
}

ItemList.defaultProps = {
    onItemSelected: () => {}
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

const withData = (Viev)  => {

    return class extends Component {
        state = {
            data: null
        }
    
        componentDidMount() {
            const {getData} = this.props;
    
            getData()
                .then( (data) => {
                    this.setState({
                        data: data
                    })
                })
        }

        render() {
            const {data} = this.state;

            if (!data) {
                return <Spinner/>
            }

            return <Viev {...this.props} data={data}/>
        }
    }
}

export default withData(ItemList);