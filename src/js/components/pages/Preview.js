import React from 'react';

import PreviewList from '../../components/list/PreviewList';

const List = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' class')} id="class">
		<PreviewList />
	</div>
);

List.propTypes = {
	mixClass: React.PropTypes.string,
};

export default List;
