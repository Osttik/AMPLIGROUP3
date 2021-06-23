import React from 'react';
import Popup from '../popup/Popup';
import { WriteColumn } from '../../data/dataWorker';

import './styles.css';

export default class Column extends React.Component {
	constructor(){
		super();

		this.state = {
			isOpenPopup: false
		}
	}

    addNewColumn = (text) => {
        const newColumn = {
			name: text,
			cards: []
		}

		WriteColumn(newColumn)
        
        this.props.AddColumn(newColumn)
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
		return (
			<div className="columnCreator">
                <div onClick={this.handleOpenPopup} className="columnCreatorFooter">
					<svg className="addSVG" viewBox="0 0 24 24"  tabindex="-1" ><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
					Add another column
				</div>
				{ this.state.isOpenPopup && <Popup close={this.handleClosePopup} addNewCard={this.addNewColumn} /> }
			</div>
		)
	}
}