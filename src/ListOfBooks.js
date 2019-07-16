import React from 'react';
import NoBookCover from './img/nobookcover.jpg';

class BookRow extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {}
        }

         componentWillMount() { 
            this.BookCover()
         }

           BookCover = () => {
            
               try {
                return (<img src={this.props.book.volumeInfo.imageLinks.smallThumbnail} width="50"/>);
               } catch (error) {
                return (<img src={NoBookCover} width="50"/>);
               }
           }

        RetailPrice = () => {
               try {
                
                  return <td>{this.props.book.saleInfo.retailPrice.currencyCode} {this.props.book.saleInfo.retailPrice.amount}</td>
                } catch (error) {
                    return <td style={{color: 'red'}}>No Price available</td>
                }
           }

    render(){
        return <table key="this.props.book.id">
            <tbody>
                <tr>
                    <td>
                      
                        {this.BookCover()}
                       
                    </td>
                    <td>
                        <p style={{color: 'black', fontSize: '25px'}}>{this.props.book.volumeInfo.title}</p>
                        {this.RetailPrice()}
                        
                    </td>
                </tr>
            </tbody>
     </table>
    }
}

export default BookRow

