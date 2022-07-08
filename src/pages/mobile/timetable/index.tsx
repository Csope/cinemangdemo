import axios from 'axios';
import { format, addDays } from 'date-fns';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ContentLoader from '../../../common/elements/ContentLoader';
import IconCard from '../../../common/icons/IconCard';
import IconList from '../../../common/icons/IconList';
import LoginSection from '../../../common/site/LoginSection';
import {
	useClassFilter,
	useSelectedSession,
	useSiteStates,
	useToasts,
} from '../../../hooks';
import ReservationDialog from '../../../modules/Actions/Reservation/ReservationDialog';
import ReservationResponse from '../../../modules/Actions/Reservation/ReservationResponse';
import ActiveFilters from '../../../modules/ClassFilter/ActiveFilters';
import ClassFilter from '../../../modules/MobileApp/ClassFilter/ClassFilter';
import { OrderType, ResType, SessionType } from '../../../types';
import { ViewList } from '../../../types/ClassFilterTypes';

type PropTypes = {
	sessions: SessionType[];
	inPurchase: OrderType | false;
	hashPass?: string;
};

const MobileTimetable = ({ sessions, inPurchase, hashPass }: PropTypes) => {
	const [_sessions, setSessions] = useState([...sessions]);
	const router = useRouter();
	const {
		doShowReservationPurchaseResponse,
		reservationPurchaseInProgress,
		showLogin,
		doHideLogin,
	} = useSiteStates();
	const { selectedSessionDispatch } = useSelectedSession();
	const {
		classFilterState: { view, startDate },
		classFilterDispatch,
	} = useClassFilter();

	const filterClick = (type: ViewList): void => {
		const newStarDate = startDate[0] ? [startDate[0]] : [];
		classFilterDispatch({ type: 'SET_START_DATE', payload: newStarDate });
		classFilterDispatch({ type: 'SET_VIEW', payload: type });
	};

	const updateSession = async (sessionId: number) => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/sessions/${sessionId}`
			);

			if (res.data.data && res.data.status && res.data.data.session) {
				const newSessions = [..._sessions];

				const index = _sessions.findIndex(
					(session) => session.id === sessionId
				);

				newSessions[index].current_headcount =
					res.data.data.session.current_headcount;

				setSessions([...newSessions]);
			}
		} catch (error) {
			console.log('Error on updating session');
		}
	};

	useEffect(() => {
		if (inPurchase) {
			doShowReservationPurchaseResponse(inPurchase);
		}

		return () => {
			selectedSessionDispatch({ type: 'SET_SELECTED', payload: null });
		};
	}, []);

	if (hashPass) {
		router.push(`/mobile/prices?hash=${hashPass}`);
		return (
			<div className="flex items-center justify-center pt-20 pb-28">
				<ContentLoader />
			</div>
		);
	}

	return (
		<>
			<div className="page">
				{!reservationPurchaseInProgress ? (
					<div className="container">
						<div
							className={`fixed z-10 bottom-20 cursor-pointer -mb-2 text-3xl rounded-full left-4 transition-transform`}
						>
							<div>
								{view === ViewList.SWIPER && (
									<div
										className={`rounded-full p-3 bg-site-4 cursor-pointer flex items-center justify-center`}
										onClick={() => filterClick(ViewList.LIST)}
										style={{
											border: '1px solid #6d457f',
										}}
									>
										<IconList fillColor="#fff" />
									</div>
								)}
								{view === ViewList.LIST && (
									<div
										className={`rounded-full p-3 bg-site-4 cursor-pointer`}
										onClick={() => filterClick(ViewList.SWIPER)}
										style={{
											border: '1px solid #6d457f',
										}}
									>
										<IconCard fillColor="#fff" />
									</div>
								)}
							</div>
						</div>

						<div>
							<ActiveFilters bgColor="bg-transparent" />
						</div>
						<div>
							<ClassFilter updateSession={updateSession} sessions={sessions} />
						</div>
					</div>
				) : (
					<div className="flex items-center justify-center pt-20 pb-28">
						<ContentLoader />
					</div>
				)}

				<ReservationDialog
					updateSession={(id: number) => updateSession(id)}
					mobileApp={true}
				/>
				<ReservationResponse />

				{showLogin && (
					<LoginSection
						showLogin={showLogin}
						hideLogin={doHideLogin}
						mobileApp={true}
					/>
				)}
			</div>
		</>
	);
};

MobileTimetable.layout = 'mobile';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let inPurchase: OrderType | false = false;
	const { hash, hashpass } = context.query;

	if (hashpass && hashpass !== '' && typeof hashpass === 'string') {
		console.log('PASS HASH FOUND ! REDIRECTING');

		return {
			props: {
				sessions: [],
				hashPass: hashpass,
			},
		};
	}

	if (hash && hash !== '') {
		console.log('HASH FOUND:');
		console.log(hash);

		try {
			const { data } = await axios.get<ResType<OrderType>>(
				`${process.env.NEXT_PUBLIC_ORDER_SERVICE_ROUTE}/orders/by_hash/${hash}`
			);

			console.log('hash res data:');
			console.log(data);

			if (data.status) {
				inPurchase = data.data.order || false;
			} else {
				return {
					redirect: {
						permanent: false,
						destination: '/mobile/404',
					},
				};
			}
		} catch (error) {
			console.log('error on checking hash');
			console.log(error);
			return {
				redirect: {
					permanent: false,
					destination: '/mobile/404',
				},
			};
		}
	}

	const fromDate = format(new Date(), 'yyyy-MM-dd');
	const toDate = format(addDays(new Date(), 6), 'yyyy-MM-dd');

	try {
		const {
			data: {
				data: { sessions },
			},
		} = await axios.post<ResType<SessionType[]>>(
			`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/sessions/filtered`,
			{
				by_date: {
					from: fromDate,
					to: toDate,
				},
			},
			{
				timeout: 12000,
			}
		);

		return {
			props: {
				sessions: sessions || [],
				inPurchase,
			},
		};
	} catch (error) {
		console.log(error);

		return {
			props: {
				sessions: [],
			},
		};
	}
};

export default MobileTimetable;
