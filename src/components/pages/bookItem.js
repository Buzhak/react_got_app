import ItemDetails, { Field } from "../itemDetails";
import React, { Component } from "react";

import GotService from "../../services/gotService";
import { useParams } from "react-router-dom";

const BooksItemWrapper = () => {
    const { id } = useParams();  // Получаем id из параметров маршрута

    return <BooksItem id={id} />; // Передаем id в классовый компонент как пропс
};

export default BooksItemWrapper;

 class BooksItem extends Component {
    gotService = new GotService();

    render() {
        const { id } = this.props;
        
        return (
            <ItemDetails itemId={id} getItem={this.gotService.getBook} title={'book'}>
                <Field field='name' label='Title'/>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Published'/>
                <Field field='released' label='Released'/>
            </ItemDetails> 
        )
    }
}   