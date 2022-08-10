import Link from 'next/link';
import React from 'react';
import BrandLogo from '../../common/site/BrandLogo';

const HeaderLogo = (): JSX.Element => {
	return (
		<div className="w-8/12 md:w-full flex justify-center md:py-4">
			<Link href="/">
				<div className="w-52 md:w-72 cursor-pointer justify-center text-white">
					<BrandLogo fillColor="#ffffff" />
				</div>
			</Link>
		</div>
	);
};

export default HeaderLogo;
