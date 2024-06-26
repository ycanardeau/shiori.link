import usePreviousDistinct from '@/components/usePreviousDistinct';
import NProgress from 'nprogress';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import './nprogress.css';

NProgress.configure({ showSpinner: false });

export const useProgressBar = (): [
	boolean,
	Dispatch<SetStateAction<boolean>>,
] => {
	const [loading, setLoading] = useState(false);
	const previousLoading = usePreviousDistinct(loading);

	useEffect(() => {
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
