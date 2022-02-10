import React from 'react';
import NormalLightButton from '../../common/elements/buttons/NormalLightButton';
import TransformedSwiper from '../../common/swiper/TransformedSwiper';
import { ButtonPropType } from '../../types';

interface PropType {
	classTitle: string;
	classDescription: string;
	imgSrcs: string[];
	buttonInfo: ButtonPropType;
	direction: 'text-img' | 'img-text';
}

const TwoColClassSection = ({
	classTitle,
	classDescription,
	imgSrcs,
	buttonInfo,
	direction,
}: PropType) => {
	return (
		<div
			className={`flex items-center flex-col text-center md:text-left px-10 md:px-4 ${
				direction === 'text-img' ? 'md:flex-row' : 'md:flex-row-reverse'
			}`}
		>
			<div className="w-full md:w-1/2">
				<h3 className="h3 mb-4">{classTitle}</h3>
				<div className="mb-10 text-white leading-7">{classDescription}</div>
				<div className="text-center md:text-right">
					<NormalLightButton
						text={buttonInfo.text}
						isLink={buttonInfo.isLink}
						linkHref={buttonInfo.linkHref}
						customClasses='mb-14 md:mb-0'
					/>
				</div>
			</div>
			<div className="w-full md:w-1/2">
				<TransformedSwiper initialSlide={1} imgSrcs={imgSrcs} />
			</div>
		</div>
	);
};

export default TwoColClassSection;
