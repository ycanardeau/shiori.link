import usePreviousDistinct from '@/components/usePreviousDistinct';
import NProgress from 'nprogress';
import React from 'react';

import './nprogress.css';

NProgress.configure({ showSpinner: false });

export const useProgressBar = (): [
	boolean,
	React.Dispatch<React.SetStateAction<boolean>>,
] => {
	const [loading, setLoading] = React.useState(false);
	const previousLoading = usePreviousDistinct(loading);

	React.useEffect(() => {
		if (previousLoading === false && loading === true) {
			NProgress.start();
		}

		if (previousLoading === true && loading === false) {
			NProgress.done();
		}

		return (): void => {
			NProgress.done();
		};
	}, [loading, previousLoading]);

	return [loading, setLoading];
};
