import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

const useFavorites = () => {
	const {
		favoritesState: { favorites },
		favoritesDispatch,
	} = useContext(FavoritesContext);

	const addItemToFavorites = (id: string) => {
		favoritesDispatch({ type: 'ADD', payload: id });
	};

	const removeItemFromFavorites = (id: string) => {
		favoritesDispatch({ type: 'REMOVE', payload: id });
	};

	const emptyFavorites = () => {
		favoritesDispatch({ type: 'EMPTY' });
	};

	return {
		favorites,
		addItemToFavorites,
		removeItemFromFavorites,
		emptyFavorites,
	};
};

export default useFavorites;
