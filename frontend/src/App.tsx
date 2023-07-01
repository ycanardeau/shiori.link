import '@/icons';
import { EuiProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_dark.css';
import createCache from '@emotion/cache';
import React from 'react';

const NoteIndex = React.lazy(() => import('@/pages/NoteIndex'));

// https://elastic.github.io/eui/#/utilities/provider
const euiCache = createCache({
	key: 'eui',
	container: document.querySelector('meta[name="eui-style-insert"]') as Node,
});
euiCache.compat = true;

const App = (): React.ReactElement => {
	return (
		<EuiProvider colorMode="dark" cache={euiCache}>
			<React.Suspense fallback={null}>
				<NoteIndex />
			</React.Suspense>
		</EuiProvider>
	);
};

export default App;
