import React from 'react';
import ConfirmationPopup from '../popup/ConfirmationPopup';

import './styles.css';

interface IProps {
	text: string;
}

interface IState {
	isOpenPopup: boolean;
}

export default class Card extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			isOpenPopup: false
		};
	}

	handleConfirm = () => {
		// here a code
			
		//

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

	render(){
		return(
			<div className="card">
				<div className="cardContent">
					{this.props.text}
					<svg onClick={this.handleOpenPopup} className="removeSVG" viewBox="0 0 24 24" ><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
				</div>
				{this.state.isOpenPopup && <ConfirmationPopup close={this.handleClosePopup} ok={this.handleConfirm} text={"Are you shure to delete this card?"} />}
			</div>
		)
	}
}