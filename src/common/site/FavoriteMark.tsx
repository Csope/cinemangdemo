import React, { MouseEvent, useEffect, useState } from 'react';
import { useFavorites } from '../../hooks';
import { BsFillStarFill } from 'react-icons/bs';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
interface PropTypes {
	id: string;
	customClasses: string;
}

const FavoriteMark = ({ id, customClasses }: PropTypes) => {
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
		<button
			onClick={markOnClick}
			className={`text-white text-2xl ${customClasses}`}
		>
			{isFavorite ? <AiFillStar /> : <AiOutlineStar />}
		</button>
	);
};

export default FavoriteMark;
