import React from 'react'
import {connect} from 'react-redux'

class Tag extends React.Component {
	constructor() {
	    super()
	    this.addItem = this.addItem.bind(this)
	}

	addItem(event) {
		event.preventDefault()
		let data = {}
		data[this.props.what] = this.props.name;
		this.props.dispatch({
      		type: 'updateQuestionFeed',
      		data: data
		});
		if (this.props.what === 'filter') {
			this.props.dispatch({
				type: 'server/filterQuestions',
				data: {
					filters: this.props.appliedFilters
				}
			});
		}
    }

	render() {
		return <li className="output-item" key={this.props.number} onClick={this.addItem}>{this.props.name}</li>;
	}
}

const mapStateToProps = (state) => {
  return {
  	appliedFilters: state.questionFeed.appliedFilters
  }
};

module.exports = connect(mapStateToProps)(Tag);