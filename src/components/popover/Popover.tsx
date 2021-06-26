import React from 'react';

import './styles.css';

interface IProps {
    edit: () => void;
    delete: () => void;
    close: () => void;
}

interface IState {

}

export default class Popover extends React.Component<IProps, IState> {
    wrapperRef: any;
    
    constructor(props: IProps) {
        super(props)

        this.state = {

        }
        
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event: any) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.close();
        }
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="popoverContent">
                <button onClick={this.props.edit}>
                    Edit
                </button>
                <button onClick={this.props.delete}>
                    Delete
                </button>
            </div>
        )
    }
}