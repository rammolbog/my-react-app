import React from 'react';
import './App.css';
import ListOfBooks from './ListOfBooks.js';
import $ from 'jquery';

  
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () => {
      this.handleSearch("harry potter")
    }

   SearchChange = (event) => {
      console.log(event.target.value)
      let boundObject = this 
      let searchterm = event.target.value
      boundObject.handleSearch(searchterm)
    }
    
    handleSearch = (searchterm) => { 
        console.log('Search using google book api')
        let urlString = "https://www.googleapis.com/books/v1/volumes?q=" + searchterm
                 
        $.ajax({
            url: urlString,
            success: (searchResults) => {
                console.log('Data collected successfully')
                console.log(searchResults, 'ListOfBooks')
                let books = searchResults.items;
                let bookRows = [];

              try {
                books.map((book) => {

                   let bookRow = <ListOfBooks key={book.id} book={book}/>
                    bookRows.push(bookRow)
                })
              } catch (error) {
                console.error('Error occured!')
               
                bookRows.push(<p style={{ 
                    color: 'black', 
                    paddingLeft: '50px', 
                    textAlign: 'center'
                    }}>No results found!</p>)
              }
                
                this.setState({rows: bookRows})
            },
            error: (xhr, status, err) => {
                console.error('Data failed to be collected')
            }
        })
    }
    

render () {
  return (
    <body style={

      {

         backgroundColor: '#E4E2E9'
      }
    }>
      
       

      <div>
          <table style={
            {
              
              backgroundColor: '#515689',
              display: 'block',
              fontFamily: 'Comic San Ms',
              fontSize: 29,
              textAlign: 'left',
              padding: 16,
              color: '#E4E2E9',
              marginRight: "1100px",
             
          }
        }>
            <tbody>
                <tr>
                    
                    <td width="8">
                    </td>
                    <td>
                      <h2>READ <br/> WHAT <br/> YOU <br/> LOVE!</h2>
                    </td>
                  </tr>
            </tbody>
        </table>
       
          <input style =
          {
            {
              fontSize: 24,
              color: 'black',
              display: 'block',
              width: '100%',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
            }
          } 
          onChange={this.SearchChange.bind(this)} 
               placeholder="Search Book here.."
               maxLength="50"
               />
               {this.state.rows}
      </div>
      </body>
    );
  }
}


export default App;
