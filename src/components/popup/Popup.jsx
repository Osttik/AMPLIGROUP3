import React from 'react';

import './styles.css';

class Popup extends React.Component {

	constructor(props) {
		super(props)
		
		this.state = {
			text: props.text,
			canClose: true
		}
	}

	handleOnTextChange = (event) => {
		this.setState({
			text: event.target.value
		})
	}

	handleAddCardById = () => {
		const value = document.getElementById("popupTextarea").value

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