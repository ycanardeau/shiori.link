import { AppRoutes } from '@/AppRoutes';
import { Header } from '@/components/Header';
import '@/icons';
import { ScrollToTop } from '@aigamo/route-sphere';
import { EuiProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_dark.css';
import createCache from '@emotion/cache';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// https://elastic.github.io/eui/#/utilities/provider
const euiCache = createCache({
	key: 'eui',
	container: document.querySelector('meta[name="eui-style-insert"]') as Node,
});
euiCache.compat = true;

const App = (): React.ReactElement => {
	return (
		<BrowserRouter>
			<EuiProvider colorMode="dark" cache={euiCache}>
				<ScrollToTop />

				<Header />

				<React.Suspense fallback={null}>
					<AppRoutes />
				</React.Suspense>
			</EuiProvider>
		</BrowserRouter>
	);
};

export default App;
