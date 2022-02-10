import React from 'react';
import NormalLightButton from '../../common/elements/buttons/NormalLightButton';
import SimpleButton from '../../common/elements/buttons/SimpleButton';

function CategoryFilter() {
	return (
		<div>
			<div className="text-site-4 uppercase text-sm text-center mb-4">
				Kategória
			</div>
			<div className="flex justify-center xl:justify-around gap-4 flex-wrap">
				<SimpleButton text="Cardio" customClasses="bg-site-2 text-white" />
				<SimpleButton text="Erősítő" customClasses="bg-white text-black" />
				<SimpleButton text="Mobilitás" customClasses="bg-white text-black" />
			</div>
		</div>
	);
}

export default CategoryFilter;
