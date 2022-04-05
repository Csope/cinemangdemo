import axios from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React, { useEffect, useState } from 'react';
import ContentLoader from '../../common/elements/ContentLoader';
import { useToasts, useUser } from '../../hooks';
import { ResType } from '../../types';

type PropTypes = {
	valid: boolean;
	message?: string;
	hash?: string;
};

const ForgottenPasword = ({ valid, message, hash }: PropTypes) => {
	const { notify } = useToasts();
	const { doVerifyEmail } = useUser();
	const router = useRouter();

	const verifyEmail = async () => {
		const res = await doVerifyEmail(hash || '');
		router.push('/');
		notify('INFO', res.message || '');
		return;
	};

	useEffect(() => {
		if (!valid) {
			router.push('/');
			notify('INFO', message || '');
			return;
		}

		verifyEmail();
	}, []);

	return (
		<div className="page">
			<div className="pb-8">
				<div className=" flex justify-center items-center py-20 rounded-xl bg-opacity-70">
					<ContentLoader />
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { hash } = context.query;

	if (hash && hash !== '') {
		try {
			const { data } = await axios.get<ResType<[]>>(
				`${process.env.NEXT_PUBLIC_USER_SERVICE_ROUTE}/users/email-verify/${hash}`
			);

			if (data.status) {
				return {
					props: {
						valid: true,
						hash,
					},
				};
			} else {
				return {
					props: {
						valid: false,
						message: data.message || '',
					},
				};
			}
		} catch (error) {
			return {
				redirect: {
					permanent: false,
					destination: '/404',
				},
			};
		}
	}

	return {
		redirect: {
			permanent: false,
			destination: '/404',
		},
	};
};

export default ForgottenPasword;
