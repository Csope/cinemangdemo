import React, { useEffect, useState } from 'react';
import TriangleDivider from '../../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../../common/elements/TriangleDividerNextItem';
import FiveColSwiper from '../../common/swiper/FiveColSwiper';
import ClassDescription from '../../common/site/ClassDescription';
import { SessionType } from '../../types';
import { isEmpty } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';

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

	console.log(sessions);

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
								`${process.env.NEXT_PUBLIC_ASSETS_ROUTE}/${session.class.preview_url}`
						)}
						hasFavorite={true}
					/>
				</div>
			)}

			<TriangleDivider bgClass="bg-site-3" mTop={-20} />
			<TriangleDividerNextItem>
				{!isEmpty(sessions) && (
					<AnimatePresence>
						<motion.h1
							initial={{ x: -100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							// exit={{ x: 200, opacity: 0 }}
							className="h1-shadow h1-shadow--white mt-4"
							key={selectedSession?.class.id}
						>
							{selectedSession?.class.title}
						</motion.h1>
					</AnimatePresence>
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
