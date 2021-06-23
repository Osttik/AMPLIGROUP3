import React from 'react';
import Column from '../column/Column';
import ColumnCreator from '../columnCreator/ColumnCreator';
import { ReadData } from '../../data/dataWorker';

import './styles.css';

class Content extends React.Component {
	constructor(){
		super()
		this.state = ReadData();
	}

	handleAddColumn = (newColumn) => {
		const { columns } = this.state;

		columns.push(newColumn);

		this.setState({
			columns: columns
		})
	}

	render(){
		const { columns } = this.state;

		return (
			<div className="content">
				{
					columns.map(item => (
						<Column 
							name={item.name}
							cards={item.cards}
							saveData={this.handleSaveData}
						/>
					))
				}
				<ColumnCreator AddColumn={this.handleAddColumn} />
			</div>
		)
	}
}

export default Content;