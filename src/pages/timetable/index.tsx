import { BsViewList } from 'react-icons/bs';
import { GoCalendar } from 'react-icons/go';
import { HiMap } from 'react-icons/hi';

import type { NextPage } from 'next';
import ClassFilter from '../../modules/ClassFilter/ClassFilter';

const Timetable: NextPage = () => {
	return (
		<div className="Timetable_page page bg-site-1">
			<div className="relative">
				<h1 className="px-4 h1-shadow h1-shadow--purple text-center">
					Csoportos órakereső
				</h1>
				<div className="flex mt-4 md:mt-0 justify-center text-2xl text-site-1 md:absolute md:right-5 md:top-1/2 md:-translate-y-1/2">
					<div className="pl-3 pr-2 py-2 bg-site-4 rounded-tl-2xl rounded-bl-2xl">
						<HiMap />
					</div>
					<div className="px-3 py-2 bg-site-6 border-l-site-1 border-l border-r border-r-site-1">
						<GoCalendar />
					</div>
					<div className="pl-2 pr-3 py-2 bg-site-6 rounded-tr-2xl rounded-br-2xl">
						<BsViewList />
					</div>
				</div>
			</div>
			<ClassFilter />
		</div>
	);
};

export default Timetable;
