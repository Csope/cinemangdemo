import React from 'react';
import SimpleButton from '../../common/elements/buttons/SimpleButton';
import { useClassFilter } from '../../hooks';
import { CategoryTypes } from '../../types/ClassFilterTypes';

function CategoryFilter() {
	const {
		classFilterState: { category },
		classFilterDispatch,
	} = useClassFilter();

	const setCategory = (type: CategoryTypes) => {
		if (category === type) {
			classFilterDispatch({ type: 'SET_CATEGORY', payload: null });
		} else {
			classFilterDispatch({ type: 'SET_CATEGORY', payload: type });
		}
	};

	return (
		<div>
			<div className="text-site-4 uppercase text-sm text-center mb-4 select-none">
				Kategória
			</div>
			<div className="flex justify-center xl:justify-around gap-1 flex-wrap">
				<SimpleButton
					text="Cardio"
					customClasses={`${
						category === CategoryTypes.CARDIO
							? 'bg-site-2 text-white'
							: 'bg-white text-black'
					} `}
					clickEvent={() => setCategory(CategoryTypes.CARDIO)}
				/>
				<SimpleButton
					text="Erősítő"
					customClasses={`${
						category === CategoryTypes.AMPLIFIER
							? 'bg-site-2 text-white'
							: 'bg-white text-black'
					} `}
					clickEvent={() => setCategory(CategoryTypes.AMPLIFIER)}
				/>
				<SimpleButton
					text="Mobilitás"
					customClasses={`${
						category === CategoryTypes.MOBILITY
							? 'bg-site-2 text-white'
							: 'bg-white text-black'
					} `}
					clickEvent={() => setCategory(CategoryTypes.MOBILITY)}
				/>
			</div>
		</div>
	);
}

export default CategoryFilter;
