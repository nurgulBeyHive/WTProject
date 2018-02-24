import React, { Component } from 'react';
import './App.css';
import { Header } from './Header.js';
import { Cart } from './Cart.js';
import { Book } from './Book.js';
import  Carousel  from './Carousel.js';
import Main from './3main/Main';
import b3 from './b3.jpg';

var BOOKS = [
{
  id: 1,
  image: '',
  title: 'New moon',
  author: 'Stephenie Meyer',
  price: '20',
  category: 'romance',
  quantity: 1,
  isInCart: false
},
{
  id: 2,
  image: '../src/account.jpg',
  title: 'Vampire',
  author: 'Andrew Meyer',
  price: '15',
  category: 'fantasy',
  quantity: 1,
  isInCart: false
},
{
  id: 3,
  image: '../src/account.jpg',
  title: 'Monte Cristo',
  author: 'Alexandre Dumas',
  price: '25',
  category: 'fantasy',
  quantity: 1,
  isInCart: false
}
];


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayedBooks: BOOKS,
      cartList:[],
      nextId: 0,
      isCartMode: true
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onAddToCartClicked = this.onAddToCartClicked.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
 onInputChange(inputValue){
  if(inputValue.length > 0){
    let searchQuery = inputValue.toLowerCase();  
    let displayedBooks = BOOKS.filter((el) => {
      let searchValue = el.title.toLowerCase();
      let searchAuthor = el.author.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1 || searchAuthor.indexOf(searchQuery) !== -1;     
                      // indexOf returns -1 if element is not found
    });
    if(displayedBooks.length > 0){
    this.setState({
      displayedBooks: displayedBooks
    });
   }
  } else{
    this.setState({
      displayedBooks: BOOKS
    });
  }
 }
 onAddToCartClicked(index){    // add Book to Cart
    this.state.cartList.push( {id: this.state.nextId,
                               title: BOOKS[index].title,
                               image: BOOKS[index].image,
                               author: BOOKS[index].author,
                               price: BOOKS[index].price, 
                               quantity: 1,
                               indexOfBook: index});
    this.setState({
       nextId: ++this.state.nextId
    });
    BOOKS[index].isInCart = true;
 }
 removeItem(id, index) {   // remove Book from Cart
    this.setState({
        cartList: this.state.cartList.filter((cartItem) => cartItem.id !== id) 
      });
    BOOKS[index].isInCart = false;
}
render(){
  return(
    <div className = "app">
    <Header onInputChange = {this.onInputChange} />
    <Carousel />
    <div className = "books">
    <ul className = "book-list">
            {
              this.state.displayedBooks.map((book, index) => {    
                return <Book
                 key = {book.id}
                 id = {book.id}
                 index = {index}
                 image = {book.image}
                 title = {book.title}
                 author = {book.author}
                 price = {book.price}
                 onAddToCartClicked = {this.onAddToCartClicked}
                 isInCart = {book.isInCart}
                 /> 
               }
              )}
         </ul>
       </div>

       <div className = "cartMode">
       <Cart cartList = {this.state.cartList} removeItem = {this.removeItem} />
       </div>

    </div>
    );
}

}

export default App;
