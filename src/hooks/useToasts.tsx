import { toast } from 'react-toastify';

const useToasts = () => {
	const notify = (type: 'INFO' | 'SUCCESS' | 'ERROR', text: string) => {
		switch (type) {
			case 'INFO':
				toast.info(text, {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			case 'SUCCESS':
				toast.success(text, {
					position: toast.POSITION.TOP_CENTER,
				});
				break;
			case 'ERROR':
				toast.error(text, {
					position: toast.POSITION.TOP_CENTER,
				});
				break;

			default:
				break;
		}
	};

	return { notify };
};

export default useToasts;
