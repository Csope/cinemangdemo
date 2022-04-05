import React, { useEffect, useState } from 'react';
import TriangleDivider from '../../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../../common/elements/TriangleDividerNextItem';
import FiveColSwiper from '../../common/swiper/FiveColSwiper';
import ClassDescription from '../../common/site/ClassDescription';
import { SessionType } from '../../types';
import { isEmpty } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import FavoriteMark from '../../common/site/FavoriteMark';
import DefaultClass from '../../../public/images/defaults/oratipus_default.jpg';

type PropTypes = {
	sessions: SessionType[];
};

function FilteredClassesSwiperView({ sessions }: PropTypes) {
	const [selectedSession, setSelectedSession] = useState<
		SessionType | undefined
	>(undefined);

	const swiperData = sessions.map((session) => ({
		src: session.class.preview_url
			? session.class.preview_url
			: DefaultClass.src,
		favoriteId: session.class.title,
		info: format(new Date(session.start), 'HH:mm'),
	}));

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
						imgSrcs={swiperData.map((data) => `${data.src}`)}
						hasFavorite={swiperData.map((data) => data.favoriteId)}
						hasInfo={swiperData.map((data) => data.info)}
					/>
				</div>
			)}

			<TriangleDivider bgClass="bg-site-3" mTop={-20} />
			<TriangleDividerNextItem>
				{!isEmpty(sessions) && (
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						// exit={{ x: 200, opacity: 0 }}
						className="h1-shadow h1-shadow--white mt-4 flex"
						key={selectedSession?.class.id}
					>
						{selectedSession?.class.title}
						<FavoriteMark
							id={selectedSession?.class.title as string}
							customClasses="ml-4 text-3xl"
						/>
					</motion.h1>
				)}
			</TriangleDividerNextItem>

			{!isEmpty(sessions) && (
				<div className="bg-site-2 text-white pb-8">
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						initial={{ opacity: 0.3, scale: 0.95 }}
						className="container"
						key={selectedSession?.id}
					>
						<ClassDescription session={selectedSession} />
					</motion.div>
				</div>
			)}
		</div>
	);
}

export default FilteredClassesSwiperView;
