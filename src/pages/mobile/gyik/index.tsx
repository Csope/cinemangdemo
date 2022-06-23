import axios from 'axios';
import { GetServerSideProps } from 'next';
import { ResType } from '../../../types';
import { unescape } from 'lodash';

const MobileGyik = ({ faq }: any) => {
	return (
		<div className="page">
			<div className="container">
				<div className="bg-white rounded-xl md:rounded-3xl px-4 mx-4 md:mx-0 md:px-10 pb-6 pt-10 drop-shadow-md mb-10">
					<div dangerouslySetInnerHTML={{ __html: unescape(faq) }}></div>
				</div>
			</div>
		</div>
	);
};

MobileGyik.layout = 'mobile';

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const {
			data: {
				// @ts-ignore
				data: { faq },
			},
		} = await axios.get<ResType<{ faq: any }>>(
			`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/page_data/faq`
		);

		return {
			props: {
				faq: faq || '',
			},
		};
	} catch (error) {
		console.log(error);

		return {
			props: {
				faq: '',
			},
		};
	}
};

export default MobileGyik;
