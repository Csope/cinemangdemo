import React, { useEffect, useRef, useState } from 'react';
import TransformedImage from '../../common/elements/TransformedImage';
import test1 from '../../../public/images/cks_kezdoBerlet.jpg';
import test2 from '../../../public/images/cks_ujraNyitva2.jpg';
import test3 from '../../../public/images/cks_villam12.jpg';

const HeroSection = () => {
	const firstPicRef = useRef<HTMLInputElement>(null);
	const [degree, setDegree] = useState({
		first: 0,
	});

	const transformImageOnScroll = () => {
		const firstPicToptop = firstPicRef.current?.offsetTop;
		const firstPicHeight = firstPicRef.current?.clientHeight;
		const scrollPosition = window.pageYOffset;

		if (firstPicHeight && firstPicToptop) {
			const firstPicMaxVisiblePxFromTop = firstPicToptop + firstPicHeight;

			const firstPicScrollInPercentage =
				(scrollPosition / firstPicMaxVisiblePxFromTop) * 100;

			const firstPicDegreeInPercentage = firstPicScrollInPercentage / 5;

			if (firstPicDegreeInPercentage > 18) {
				setDegree((prev) => {
					return {
						...prev,
						first: 18,
					};
				});
			} else {
				setDegree((prev) => {
					return {
						...prev,
						first: firstPicDegreeInPercentage,
					};
				});
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', transformImageOnScroll);

		return () => window.removeEventListener('scroll', transformImageOnScroll);
	}, []);

	return (
		<div style={{ marginBottom: `-${8 * degree.first}px` }}>
			<div ref={firstPicRef}>
				<TransformedImage
					imgAlt="image"
					imgSrc={test1.src}
					transform={`rotateX(-${4 + degree.first}deg) scale(${
						0.95 - degree.first / 300
					})`}
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 mt-3 md:-mt-10">
				<div>
					<TransformedImage
						imgAlt="image"
						imgSrc={test2.src}
						transform={`rotateY(3deg) rotateX(-${
							9 + degree.first * 2
						}deg) rotateZ(-${3 + degree.first / 3}deg) scale(${
							0.94 - degree.first / 100
						}) translateX(${15 + degree.first * 0.5}px) translateY(${
							4 + -10 * degree.first
						}px)`}
					/>
				</div>

				<div>
					<TransformedImage
						imgAlt="image"
						imgSrc={test3.src}
						transform={`rotateY(-3deg) rotateX(-${
							9 + degree.first * 2
						}deg) rotateZ(${3 + degree.first / 3}deg) scale(${
							0.94 - degree.first / 100
						}) translateX(-${15 + degree.first * 0.5}px) translateY(${
							4 + -10 * degree.first
						}px)`}
					/>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
