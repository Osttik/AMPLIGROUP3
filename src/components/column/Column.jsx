import React from 'react';
import Card from '../card/Card';
import Popup from '../popup/Popup';
import { WriteColumn } from '../../data/dataWorker';

import './styles.css';
import '../popup/Popup';

export default class Column extends React.Component {
	constructor(){
		super();

		this.state = {
			cards: [],
			isOpenPopup: false
		}
	}

	componentDidMount(){
		this.setState({
			cards: this.props.cards
		})
	}

	handleAddCard = () => {
		this.setState({
			isOpenPopup: true
		})
	}

	addNewCard = (text) => {
		const { cards } = this.state
		
		cards.push({
			text: text
		})

		WriteColumn({
			name: this.props.name,
			cards: cards
		})

		this.setState({
			cards: cards
		})
	}

	handleClosePopup = () => {
		this.setState({
			isOpenPopup: false
		})
	}

	render(){
		const { name, cards } = this.props;
		
		return (
			<div className="column">
				<div className="columnHeader">
					{name}
				</div>
				<div className="columnContent">
					{
						cards.map(item => (
							<Card
								text={item.text}
							/>
						))
					}
				</div>
				<div onClick={this.handleAddCard} className="columnFooter">
					<svg className="addSVG" viewBox="0 0 24 24"  tabindex="-1" ><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
					Add card ...
				</div>
				{ this.state.isOpenPopup && <Popup close={this.handleClosePopup} addNewCard={this.addNewCard} /> }
			</div>
		)
	}
}