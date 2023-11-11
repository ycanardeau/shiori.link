import { AppRoutes } from '@/AppRoutes';
import { AuthenticationProvider } from '@/components/AuthenticationProvider';
import { Compose } from '@/components/Compose';
import { Header } from '@/components/Header';
import { Player } from '@/components/Player';
import { PlayerProvider } from '@/components/PlayerProvider';
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

interface EuiProviderWrapperProps {
	children?: React.ReactNode;
}

const EuiProviderWrapper = ({
	children,
}: EuiProviderWrapperProps): React.ReactElement => {
	return (
		<EuiProvider colorMode="dark" cache={euiCache}>
			{children}
		</EuiProvider>
	);
};

const App = (): React.ReactElement => {
	return (
		<Compose
			components={[
				BrowserRouter,
				EuiProviderWrapper,
				AuthenticationProvider,
				PlayerProvider,
			]}
		>
			<ScrollToTop />

			<Header />

			<React.Suspense fallback={null}>
				<AppRoutes />
			</React.Suspense>

			<Player />
		</Compose>
	);
};

export default App;
