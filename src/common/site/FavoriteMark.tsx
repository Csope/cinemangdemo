import React, { MouseEvent, useEffect, useState } from 'react';
import { useFavorites } from '../../hooks';
import { BsFillStarFill } from 'react-icons/bs';

interface PropTypes {
	id: string;
}

const FavoriteMark = ({ id }: PropTypes) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const { favorites, addItemToFavorites, removeItemFromFavorites } =
		useFavorites();

	const markOnClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (isFavorite) {
			removeItemFromFavorites(id);
		} else {
			addItemToFavorites(id);
		}
	};

	useEffect(() => {
		if (favorites.includes(id)) {
			setIsFavorite(true);
		} else {
			setIsFavorite(false);
		}
	}, [favorites]);

	return (
		<div className="absolute bottom-3 right-4">
			<button
				onClick={markOnClick}
				className={`${isFavorite ? 'text-yellow-300' : 'text-white'} text-2xl`}
			>
				<BsFillStarFill />
			</button>
		</div>
	);
};

export default FavoriteMark;
