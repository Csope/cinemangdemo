import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';

interface PropTypes {
	active: boolean;
	clickEvent: () => void;
}

function FavoritesFilter({ active, clickEvent }: PropTypes) {
	return (
		<div>
			<div className="text-site-4 uppercase text-sm text-center mb-4 select-none">
				Kedvencek
			</div>
			<div
				className={`text-3xl cursor-pointer ${
					active ? 'text-yellow-300' : ' text-white'
				}`}
			>
				<BsFillStarFill className="mx-auto" onClick={clickEvent} />
			</div>
		</div>
	);
}

export default FavoritesFilter;
