import React from 'react';
import ConfirmationPopup from '../popup/ConfirmationPopup';
import Popover from '../popover/Popover';
import Popup from '../popup/Popup';

import './styles.css';

interface IProps {
	text: string;
	id: number;
	removeMySelf: (id: number) => void;
	edit: (id: number, newText: string) => void;
}

interface IState {
	isOpenPopup: boolean;
	isOpenPopover: boolean;
	isOpenEditPopup: boolean;
}

export default class Card extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			isOpenPopup: false,
			isOpenPopover: false,
			isOpenEditPopup: false
		};
	}

	handleEdit = (newText: string) => {
		this.props.edit(this.props.id, newText);

		this.handleCloseEditPopup();
	}

	handleConfirm = () => {
		this.props.removeMySelf(this.props.id)

		this.handleClosePopup()
	}

	handleOpenPopup = () => {
		this.setState({
			isOpenPopup: true
		})
	}

	handleClosePopup = () => {
		this.setState({
			isOpenPopup: false
		})
	}

	handleOpenPopover = () => {
		this.setState({
			isOpenPopover: true
		})
	}

	handleClosePopover = () => {
		this.setState({
			isOpenPopover: false
		})
	}

	handleOpenEditPopup = () => {
		this.setState({
			isOpenEditPopup: true
		})
	}

	handleCloseEditPopup = () => {
		this.setState({
			isOpenEditPopup: false
		})
	}

	render(){
		return(
			<div className="card">
				<div className="cardContent">
					<div>{this.props.text}</div>
					<div>
						<svg onClick={this.handleOpenPopover} className="removeSVG" viewBox="0 0 24 24" ><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
						{this.state.isOpenPopover && <Popover close={this.handleClosePopover} delete={this.handleOpenPopup} edit={this.handleOpenEditPopup} /> }
					</div>
				</div>
				{this.state.isOpenPopup && <ConfirmationPopup close={this.handleClosePopup} ok={this.handleConfirm} text={"Are you shure to delete this card?"} />}
				{this.state.isOpenEditPopup && <Popup text={this.props.text} close={this.handleCloseEditPopup} addNewCard={this.handleEdit} />}
			</div>
		)
	}
}