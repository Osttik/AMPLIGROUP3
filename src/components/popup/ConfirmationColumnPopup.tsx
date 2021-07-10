  
import React from 'react';

import './styles.css';


interface IProps {
	text: string;
	close: () => void;
	ok: () => void;
}

interface IState {
	canClose: boolean;
}

class ConfirmationColumnPopup extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props)
		
		this.state = {
			canClose: true
		}
	}

	handleClose = () => {
		if(this.state.canClose)
			this.props.close()
	}

	render(){
		return (
			<div onClick={this.handleClose} className="popup">
				<div 
					onMouseOver={() => this.setState({canClose: false})} 
					onMouseLeave={() => this.setState({canClose: true})}
					className="confirmationPopup"
				>
                    <h3>{this.props.text}</h3>
					<div className="popupPagination">
						<button className="paginationButton" onClick={this.props.close}>
							Cancel
						</button>
						<button className="paginationButton" onClick={this.props.ok}>
							Ok
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default ConfirmationColumnPopup;