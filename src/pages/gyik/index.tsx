import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import { ResType } from '../../types';
import { unescape } from 'lodash';

const GyikIndex = ({ faq }: any) => {
	console.log(faq);
	return (
		<div className="page">
			<div className="container">
				<div className="bg-white rounded-xl md:rounded-3xl px-4 mx-4 md:mx-0 md:px-10 pb-6 pt-10 drop-shadow-md mb-10">
					<h1 className="h1-shadow h1-shadow--purple mb-6 text-center md:text-left">
						Gyakran ismételt kérdések
					</h1>

					<div dangerouslySetInnerHTML={{ __html: unescape(faq) }}></div>
				</div>
			</div>
		</div>
	);
};

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
		console.log(faq);
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

export default GyikIndex;
