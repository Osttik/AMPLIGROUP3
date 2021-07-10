import React from 'react';

import './styles.css';

interface IProps {
	text?: string;
	addNewCard: (value: string) => void;
	close: () => void;
}

interface IState {
	text: string;
	canClose: boolean;
}

class Popup extends React.Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
		
		this.state = {
			text: props.text === undefined ? "" : props.text,
			canClose: true
		};
	}

	handleOnTextChange = (event: { target: { value: string; }; }) => {
		this.setState({
			text: event.target.value
		});
	}

	handleAddCardById = () => {
		const value = (window.document.getElementById("popupTextarea")! as any).value ?? "Error with text";

		this.props.addNewCard(value)

		this.props.close()
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
					className="popupContent"
				>
					<textarea value={this.state.text} onChange={this.handleOnTextChange} id="popupTextarea" className="popupTextarea" />
					<div className="popupPagination">
						<button onClick={this.handleAddCardById}>
							Add
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Popup;