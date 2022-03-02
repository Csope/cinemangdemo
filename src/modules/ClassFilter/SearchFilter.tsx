import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useClassFilter, useDebounce } from '../../hooks';

export default function SearchFilter() {
	const [searchValue, setSearchValue] = useState('');
	const debouncedSearchValue = useDebounce(searchValue, 2000);
	const { classFilterDispatch } = useClassFilter();

	useEffect(() => {
		classFilterDispatch({ type: 'SET_SEARCH', payload: debouncedSearchValue });
	}, [debouncedSearchValue]);

	return (
		<div>
			<div className="text-site-4 uppercase text-sm text-center mb-4 select-none">
				Keresés
			</div>
			<div className="relative">
				<div className="absolute inset-y-0 left-3 flex justify-center items-center text-site-4">
					<FaSearch />
				</div>
				<input
					type="text"
					placeholder="Óra neve, Oktató neve, stb."
					className="w-full block rounded-2xl py-1 pl-10 pr-7 focus:outline-site-2 "
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>
		</div>
	);
}
