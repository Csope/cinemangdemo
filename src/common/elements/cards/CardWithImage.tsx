import Image from 'next/image';
import { genSvgImageLoader } from '../../../utils';

type PropTypes = {
	/**
	 * Source of the header image
	 */
	imgSrc: string;

	/**
	 * Body content
	 */
	bodyContent: JSX.Element;

	mobileApp?: boolean;
};

const svgBG = genSvgImageLoader(700, 475);

const CardWithImage = ({
	imgSrc,
	bodyContent,
	mobileApp = false,
}: PropTypes) => {
	return (
		<div className="CardWithImage rounded-xl md:rounded-none">
			<div>
				<div className="CardWithImage__header">
					<div className="relative lazy-img-container lazy-img-container__card">
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
				<div className="CardWithImage__body overflow-hidden">
					<div style={{ padding: '18px 16px' }}>{bodyContent}</div>
				</div>
			</div>
		</div>
	);
};

export default CardWithImage;
