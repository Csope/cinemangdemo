import React, { useEffect, useState } from 'react';
import NormalDarkButton from '../../common/elements/buttons/NormalDarkButton';
import TriangleDivider from '../../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../../common/elements/TriangleDividerNextItem';
import { FiAlertCircle } from 'react-icons/fi';
import FiveColSwiper from '../../common/swiper/FiveColSwiper';
import ClassDescription from '../../common/site/ClassDescription';
import { SessionType } from '../../types';
import { isEmpty } from 'lodash';

type PropTypes = {
	sessions: SessionType[];
};

function FilteredClassesSwiperView({ sessions }: PropTypes) {
	const [selectedSession, setSelectedSession] = useState<
		SessionType | undefined
	>(undefined);

	useEffect(() => {
		setSelectedSession(sessions[0]);
	}, [sessions]);

	return (
		<div className="FilteredClassesSwiperView bg-site-1">
			{isEmpty(sessions) ? (
				<div className="text-center py-20">Nincs találat TODO: new message</div>
			) : (
				<div className="container pt-6">
					<FiveColSwiper
						onSlideChange={(swiper) =>
							setSelectedSession(sessions[swiper.snapIndex])
						}
						initialSlide={0}
						imgSrcs={sessions.map(
							(session) =>
								'https://geocdn.fotex.net/static.sugarfitness.hu/files/1603/preview.jpg'
						)}
					/>
				</div>
			)}

			<TriangleDivider bgClass="bg-site-3" mTop={-20} />
			<TriangleDividerNextItem>
				<h1 className="h1-shadow h1-shadow--white mt-4">
					{selectedSession?.class.title}
				</h1>
			</TriangleDividerNextItem>

			{!isEmpty(sessions) && (
				<div className="bg-site-2 text-white pb-8">
					<div className="container">
						<ClassDescription session={selectedSession} />
					</div>
				</div>
			)}
		</div>
	);
}

export default FilteredClassesSwiperView;
