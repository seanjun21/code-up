import React from 'react'
import Tag from './tag'

class TagsSearchBar extends React.Component {
	render() {
	    let tags = this.props.output
	    tags = tags.map((tag, index) => {
			return <Tag name={tag} what={this.props.what} number={index + 1} />;
	   	});
	    return (
			<div>
				<input type="text" placeholder={this.props.text} onChange={this.props.onInput} />
				<ul>{tags}</ul>
			</div>
	    );
	}
}

module.exports = TagsSearchBar;