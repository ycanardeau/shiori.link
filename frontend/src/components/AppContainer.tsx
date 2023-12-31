import { AppRoutes } from '@/AppRoutes';
import { bottomBarHeight } from '@/components/BottomBar';
import { Header } from '@/components/Header';
import { miniPlayerSize } from '@/components/MiniPlayer';
import { Player } from '@/components/Player';
import { ScrollToTop } from '@aigamo/route-sphere';
import { EuiPageTemplate, EuiSpacer } from '@elastic/eui';
import React from 'react';

export const AppContainer = (): React.ReactElement => {
	return (
		<>
			<ScrollToTop />

			<Header />

			<EuiPageTemplate
				panelled
				style={{
					minBlockSize: `max(460px, 100vh - ${bottomBarHeight}px)`,
				}}
			>
				<React.Suspense fallback={null}>
					<AppRoutes />
				</React.Suspense>

				<EuiSpacer style={{ blockSize: miniPlayerSize.height }} />
			</EuiPageTemplate>

			<Player />
		</>
	);
};
