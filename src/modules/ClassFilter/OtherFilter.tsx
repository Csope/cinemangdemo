import React, { useState } from 'react';
import ListCloseIcon from '../../common/elements/icons/ListCloseIcon';

function OtherFilter() {
	const [active, setActive] = useState(false);

	return (
		<div>
			<div className="text-site-4 uppercase text-sm text-center mb-4">
				Egyéb
			</div>
			<div>
				<ListCloseIcon status={active} clickEvent={() => setActive(!active)} />
			</div>
		</div>
	);
}

export default OtherFilter;
