import { GetServerSideProps } from 'next';
import React from 'react';
import CardWithImage from '../../common/elements/cards/CardWithImage';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import { EventType, ResType } from '../../types';
import { unescape } from 'lodash';

type PropTypes = {
	events: EventType[];
};

const SalesAndEvents = ({ events }: PropTypes) => {
	return (
		<div className="SalesAndEvents page">
			<div className="container pb-6 md:pb-10">
				<h1 className="text-center h1-shadow h1-shadow--purple mb-8 md:mb-12 hidden md:block">
					Akciók / események
				</h1>

				<div className="mx-4 md:mx-0">
					<Masonry
						breakpointCols={{
							default: 2,
							768: 1,
						}}
						className="SalesAndEvents__masonry-grid"
						columnClassName="SalesAndEvents__masonry-grid_column"
					>
						{events &&
							events.map((event) => (
								<CardWithImage
									key={event.event_id}
									imgSrc={event?.preview_url || ''}
									bodyContent={
										<div>
											<h1>{event?.title}</h1>
											<div
												className="content text-justify md:text-left"
												dangerouslySetInnerHTML={{
													__html: unescape(event?.description),
												}}
											></div>
										</div>
									}
								/>
							))}
					</Masonry>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const {
			data: {
				data: { events },
			},
		} = await axios.get<ResType<EventType[]>>(
			`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/events`
		);

		return {
			props: {
				events: events || [],
			},
		};
	} catch (error) {
		return {
			props: {
				events: [],
			},
		};
	}
};

export default SalesAndEvents;
