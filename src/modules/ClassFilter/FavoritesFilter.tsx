import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

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
			<div className={`text-3xl cursor-pointer text-white`}>
				{active ? (
					<AiFillStar className="mx-auto" onClick={clickEvent} />
				) : (
					<AiOutlineStar className="mx-auto" onClick={clickEvent} />
				)}
			</div>
		</div>
	);
}

export default FavoritesFilter;
