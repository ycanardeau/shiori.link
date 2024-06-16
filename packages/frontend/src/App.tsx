import { AppContainer } from '@/AppContainer';
import { AuthenticationProvider } from '@/components/AuthenticationProvider';
import { Compose } from '@/components/Compose';
import { PlayerStoreProvider } from '@/components/PlayerStoreProvider';
import '@/icons';
import { NostalgicDivaProvider } from '@aigamo/nostalgic-diva';
import { EuiProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_dark.css';
import createCache from '@emotion/cache';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

// https://elastic.github.io/eui/#/utilities/provider
const euiCache = createCache({
	key: 'eui',
	container: document.querySelector('meta[name="eui-style-insert"]') as Node,
});
euiCache.compat = true;

interface EuiProviderWrapperProps {
	children?: ReactNode;
}

const EuiProviderWrapper = ({
	children,
}: EuiProviderWrapperProps): ReactElement => {
	return (
		<EuiProvider colorMode="dark" cache={euiCache}>
			{children}
		</EuiProvider>
	);
};

const App = (): ReactElement => {
	return (
		<Compose
			components={[
				BrowserRouter,
				EuiProviderWrapper,
				AuthenticationProvider,
				PlayerStoreProvider,
				NostalgicDivaProvider,
			]}
		>
			<AppContainer />
		</Compose>
	);
};

export default App;
