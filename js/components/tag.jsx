import React from 'react'
import {connect} from 'react-redux'

class Tag extends React.Component {
	constructor() {
	    super()
	    this.addItem = this.addItem.bind(this)
	}

	addItem(event) {
		event.preventDefault()
		let type = `apply${this.props.what}`
		let tag = this.props.name
		this.props.dispatch({
      		type: type,
      		data: {
        		item: tag
      		}
    	})
    }

	render() {
		return <li className="output-item" key={this.props.number} onClick={this.addItem}>{this.props.name}</li>;
	}
}

module.exports = connect()(Tag);