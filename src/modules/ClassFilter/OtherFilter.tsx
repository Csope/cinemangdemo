import React from 'react';
import ListCloseIcon from '../../common/icons/ListCloseIcon';

interface PropTypes {
	show: boolean;
	clickEvent: () => void;
}

function OtherFilter({ show, clickEvent }: PropTypes) {
	return (
		<div>
			<div className="text-site-4 uppercase text-sm text-center mb-4 select-none">
				Egyéb
			</div>
			<div>
				<ListCloseIcon status={show} clickEvent={clickEvent} />
			</div>
		</div>
	);
}

export default OtherFilter;
