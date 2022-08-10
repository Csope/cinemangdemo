import Image from 'next/image';
import { genSvgImageLoader } from '../../../utils';

type PropTypes = {
	/**
	 * Source of the header image
	 */
	imgSrc: string;
	customClass?: string;

	/**
	 * Body content
	 */
	bodyContent: string;

	mobileApp?: boolean;
};

const svgBG = genSvgImageLoader(700, 475);

const CardWithImage = ({
	imgSrc,
	bodyContent,
	mobileApp = false,
	customClass,
}: PropTypes) => {
	return (
		<div className="CardWithImage md:rounded-xl bg-site-4 w-50">
			<div className="CardWithImage__header">
				<div className="relative lazy-img-container lazy-img-container__card h-36">
					<Image
						src={imgSrc || svgBG}
						alt="card-img"
						layout="fill"
						className="lazy-img lazy-img__right"
						placeholder="blur"
						blurDataURL={svgBG}
					/>
				</div>
			</div>
			<div className="CardWithImage__body overflow-hidden text-center">
				<div style={{ padding: '8px 8px' }} className={`text-mon ${customClass}`} >{bodyContent}</div>
			</div>
		</div>
	);
};

export default CardWithImage;
