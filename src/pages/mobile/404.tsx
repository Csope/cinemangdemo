import { useRouter } from 'next/router';
import BgImg from '../../../public/images/404-bg.jpg';

const Custom404Mobile = () => {
	const router = useRouter();
	console.log(router);
	return (
		<div
			style={{
				background: `url(${BgImg.src})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center bottom',
			}}
			className="flex items-center justify-center h-full"
		>
			<div className="text-center font-bold text-white py-44">
				<h1 style={{ fontSize: 120, lineHeight: 0.8 }}>404</h1>
				<h2 className="uppercase text-xl">Az oldal nem található!!!</h2>
				<div>{router.asPath}</div>
			</div>
		</div>
	);
};

Custom404Mobile.layout = 'mobile';

export default Custom404Mobile;
