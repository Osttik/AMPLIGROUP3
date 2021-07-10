import React from 'react';
import Card from '../card/Card';
import ColumnPopover from '../popover/columnPopover';
import Popup from '../popup/Popup';
import ConfirmationColumnPopup from '../popup/ConfirmationColumnPopup';
import { WriteColumn } from '../../data/dataWorker';

import './styles.css';
import '../popup/Popup';

interface IProps {
	id: number;
	removeColumn: (id: number) => void;
	editColumn: (id: number, newName: string) => void;
	cards: any[];
	name: string;
}

interface IState {
	cards: any[];
	isOpenPopup: boolean;
	isOpenDeleteColumnPopup: boolean;
	isOpenColumnPopover: boolean;
	isOpenEditColumnPopup: boolean;
}

export default class Column extends React.Component<IProps, IState> {
	constructor(props: IProps){
		super(props);

		this.state = {
			cards: [],
			isOpenPopup: false,
			isOpenDeleteColumnPopup:false,
			isOpenColumnPopover:false,
			isOpenEditColumnPopup:false
		}
	}

	handleConfirmColumn = () => {
		this.props.removeColumn(this.props.id)

		this.handleCloseDeleteColumnPopup()
	}

	handleEditColumn = (newName: string) => {
		this.props.editColumn(this.props.id, newName);

		this.handleCloseEditColumnPopup();
	}

	handleOpenDeleteColumnPopup = () => {
		this.setState({
			isOpenDeleteColumnPopup: true
		})
	}

	handleCloseDeleteColumnPopup = () => {
		this.setState({
			isOpenDeleteColumnPopup: false
		})
	}
////////////////////////////////////////////
	handleOpenColumnPopover = () => {
		this.setState({
			isOpenColumnPopover: true
		})
	}

	handleCloseColumnPopover = () => {
		this.setState({
			isOpenColumnPopover: false
		})
	}
///////////////////////////////////////
	handleOpenEditColumnPopup = () => {
	this.setState({
		isOpenEditColumnPopup: true
	})
	}

	handleCloseEditColumnPopup = () => {
	this.setState({
		isOpenEditColumnPopup: false
	})
	}
////////////////////////////////////////////






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

	addNewCard = (text: string) => {
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

	removeCard = (cardId: number) => {
		const { cards } = this.state

		cards.splice(cardId, 1)

		WriteColumn({
			name: this.props.name,
			cards: cards
		})

		this.setState({
			cards: cards
		})
	}

	editCard = (cardId: number, newText: string) => {
		const { cards } = this.state

		cards[cardId].text = newText

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
					<div className="ColumnName">
						{name}
					</div>
					<div>
						<svg onClick={this.handleOpenColumnPopover} className="ColumnMenu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/></svg>
						{ this.state.isOpenColumnPopover && <ColumnPopover close={this.handleCloseColumnPopover} delete={this.handleOpenDeleteColumnPopup} edit={this.handleOpenEditColumnPopup} /> }
					</div>
				</div>
				
				<div className="columnContent">
					{
						cards.map((item, index) => (
							<Card
								text={item.text}
								id={index}
								removeMySelf={this.removeCard}
								edit={this.editCard}
							/>
						))
					}
				</div>
				<div onClick={this.handleAddCard} className="columnFooter">
					<svg className="addSVG" viewBox="0 0 24 24" ><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
					Add card ...
				</div>
				
				{ this.state.isOpenPopup && <Popup close={this.handleClosePopup} addNewCard={this.addNewCard} /> }
				{ this.state.isOpenDeleteColumnPopup && <ConfirmationColumnPopup close={this.handleCloseDeleteColumnPopup} ok={this.handleConfirmColumn} text={"Are you shure to delete this column?"} />}
				{ this.state.isOpenEditColumnPopup && <Popup close={this.handleCloseEditColumnPopup} addNewCard={this.handleEditColumn} />}
			</div>
		)
	}
}