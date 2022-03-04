import { BsViewList } from 'react-icons/bs';
import { GoCalendar } from 'react-icons/go';
import { HiMap } from 'react-icons/hi';
import ClassFilter from '../../modules/ClassFilter/ClassFilter';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { addDays, format } from 'date-fns';
import { ResType, SessionType } from '../../types';
import type { NextPage } from 'next';
import { ViewList } from '../../types/ClassFilterTypes';
import { useClassFilter } from '../../hooks';
import testSessionData from '../../static/testSessionData.json';

type PropTypes = {
	sessions: SessionType[];
};

const Timetable: NextPage<PropTypes> = ({ sessions }: PropTypes) => {
	const {
		classFilterState: { view },
		classFilterDispatch,
	} = useClassFilter();

	const filterClick = (type: ViewList): void => {
		classFilterDispatch({ type: 'SET_VIEW', payload: type });
	};

	return (
		<div className="Timetable_page page ">
			<div className="relative container">
				<h1 className="px-4 h1-shadow h1-shadow--purple text-center">
					Csoportos órakereső
				</h1>
				<div className="flex mt-4 md:mt-0 justify-center text-xl text-site-1 md:absolute md:right-5 md:top-1/2 md:-translate-y-1/2">
					<div
						className={`pl-3 pr-2 py-2 rounded-tl-2xl rounded-bl-2xl cursor-pointer ${
							view === ViewList.SWIPER ? 'bg-site-4' : 'bg-site-6'
						} `}
						onClick={() => filterClick(ViewList.SWIPER)}
					>
						<HiMap />
					</div>
					<div
						className={`px-3 py-2 border-l-site-1 border-l border-r border-r-site-1 cursor-pointer ${
							view === ViewList.CALENDAR ? 'bg-site-4' : 'bg-site-6'
						}`}
						onClick={() => filterClick(ViewList.CALENDAR)}
					>
						<GoCalendar />
					</div>
					<div
						className={`pl-2 pr-3 py-2 rounded-tr-2xl rounded-br-2xl cursor-pointer ${
							view === ViewList.LIST ? 'bg-site-4' : 'bg-site-6'
						}`}
						onClick={() => filterClick(ViewList.LIST)}
					>
						<BsViewList />
					</div>
				</div>
			</div>
			<ClassFilter sessions={sessions} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const fromDate = format(new Date(), 'yyyy-MM-dd');
	const toDate = format(addDays(new Date(), 7), 'yyyy-MM-dd');

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
			}
		);

		/**
		 * FIXME: TEST DATA DONT FORGET TO CHANGE BACK
		 */
		return {
			props: {
				sessions: testSessionData.data.sessions,
			},
		};
	} catch (error) {
		return {
			props: {
				sessions: testSessionData,
			},
		};
	}
};

export default Timetable;
