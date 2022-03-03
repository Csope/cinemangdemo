import Link from 'next/link';
import React from 'react';
import BrandLogo from '../../common/site/BrandLogo';

const HeaderLogo = (): JSX.Element => {
	return (
		<div className="w-full flex justify-center pb-3 md:pd-0 md:p-4">
			<Link href="/">
				<div className="w-44 md:w-96 cursor-pointer">
					<BrandLogo fillColor="#680b65" />
				</div>
			</Link>
		</div>
	);
};

export default HeaderLogo;
