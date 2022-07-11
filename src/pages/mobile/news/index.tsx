import CardWithImage from '../../../common/elements/cards/CardWithImage';
import { unescape } from 'lodash';
import { useGetEvents } from '../../../queries';
import ContentLoader from '../../../common/elements/ContentLoader';

const MobileNews = () => {
	const {
		isLoading,
		data: { events },
	} = useGetEvents();

	if (isLoading) {
		return (
			<div className="w-full mt-10 mb-20 flex justify-center">
				<ContentLoader />
			</div>
		);
	}

	return (
		<div className="SalesAndEvents page pb-12">
			<div className="container">
				<div className="mx-4 flex flex-col gap-10">
					{events &&
						events.map((event, i) => (
							<CardWithImage
								mobileApp={true}
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
				</div>
			</div>
		</div>
	);
};

MobileNews.layout = 'mobile';

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	try {
// 		const {
// 			data: {
// 				data: { events },
// 			},
// 		} = await axios.get<ResType<EventType[]>>(
// 			`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/events`
// 		);

// 		return {
// 			props: {
// 				events: events || [],
// 			},
// 		};
// 	} catch (error) {
// 		return {
// 			props: {
// 				events: [],
// 			},
// 		};
// 	}
// };

export default MobileNews;
