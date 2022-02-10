import React from 'react';

interface PropTypes {
	clickEvent: () => void;
	status: boolean;
}

function ListCloseIcon({ clickEvent, status }: PropTypes): JSX.Element {
	return (
		<div
			className={`ListCloseIcon mx-auto ${status ? 'marked' : ''}`}
			onClick={() => clickEvent()}
		>
			<div className="ListCloseIcon__first"></div>
			<div className="ListCloseIcon__second"></div>
			<div className="ListCloseIcon__third"></div>
		</div>
	);
}

export default ListCloseIcon;
