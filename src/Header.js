import React, { Component } from 'react';
import './Header.css';
import icart from './cart.png';
import iaccount from './account.png';

export class Header extends Component{
	constructor(props){
		super(props);

		this.state = {
			inputValue: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
     handleChange(event){
         const value = event.target.value;
         this.setState({
         	inputValue: value
         });
         this.props.onInputChange(this.state.inputValue);
     }
     handleClick(e){
      alert('Your cart');
     }
	render(){
		return(
			<div className = "container">
			<img className = "logo-account" src = { iaccount } />
			<img className = "logo-cart" src = { icart } onClick = {this.handleClick} />

			<input className = "header-search" type = "text" placeholder = "Search by Title or Author ....."
			 onChange = {this.handleChange} />

			<button className = "btn-categories">Categories</button>
			<h1 className = "title">NZ BOOKS SHOP</h1>
			</div>
			);
	}
}