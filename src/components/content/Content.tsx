import React from 'react';
import Column from '../column/Column';
import ColumnCreator from '../columnCreator/ColumnCreator';
import { ChangeColumnName, DeleteKey, ReadData } from '../../data/dataWorker';

import './styles.css';

interface IProps {
	
}

interface IState {
	columns: { 
		name: string; 
		cards: any[];
	}[];
}

class Content extends React.Component<IProps, IState> {
	constructor(props: IProps){
		super(props)
		this.state = ReadData();
	}


	handleAddColumn = (newColumn: any) => {
		const { columns } = this.state;

		columns.push(newColumn);

		this.setState({
			columns: columns
		});
	}

	editColumn = (columnId: number, newName: string) => {
		const { columns } = this.state;
		const oldName = columns[columnId].name;

		columns[columnId].name = newName;

		ChangeColumnName(columns[columnId], oldName);

		this.setState({
			columns: columns
		});
	}

	deleteColumn = (columnId: number) => {
		const { columns } = this.state;
		const columnToDelete = columns.splice(columnId, 1);

		DeleteKey(columnToDelete[0].name);

		this.setState({
			columns: columns
		});
	}

	render(){
		const { columns } = this.state;

		return (
			<div className="content">
				{
					columns.map((item, index) => (
						<Column 
							name={item.name}
							cards={item.cards}
							id={index}
							removeColumn={this.deleteColumn}
							editColumn={this.editColumn}
						/>
					))

				}
				<ColumnCreator AddColumn={this.handleAddColumn} />
			</div>
		)
	}
}

export default Content;