export const openUrl = (url: string) => {
	console.log('OPEN URL:' + url);

	try {
		var message = { command: 'openUrl', data: { url: url } };
		// @ts-ignore
		if (window?.receiveMessage) {
			// @ts-ignore
			window.receiveMessage(JSON.stringify(message));
		}
	} catch (error) {
		console.log(error);
		console.log('"openUrl" only works on mobile devices!');
	}
};
