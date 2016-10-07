import React from 'react'
import {connect} from 'react-redux'
import {reset} from 'redux-form';

import Tag from './tag'

class TagsSearchBar extends React.Component {
	render() {
	    let tags = this.props.output
	    tags = tags.map((tag, index) => {
			return <Tag name={tag} what={this.props.what} key={index + 1} number={index + 1} />;
	   	});
	    return (
			<div className="search-bar">
				<form ref='myForm'>
					<input type="text" placeholder={this.props.text} onChange={this.props.onInput}/>
				</form>
				<ul>{tags}</ul>
			</div>
	    );
	}
}

module.exports = connect()(TagsSearchBar);