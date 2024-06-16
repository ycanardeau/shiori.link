import { ReactElement, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { bottomBarHeight } from '@/components/BottomBar';
import { Header } from '@/components/Header';
import { miniPlayerSize } from '@/components/MiniPlayer';
import { Player } from '@/components/Player';
import { ScrollToTop } from '@aigamo/route-sphere';
import { EuiPageTemplate, EuiSpacer } from '@elastic/eui';
import { useAuthentication } from '@/components/AuthenticationProvider';

const NoteIndex = lazy(() => import('@/pages/NoteIndex'));
const NoteDetails = lazy(() => import('@/pages/NoteDetails'));
const ContactIndex = lazy(() => import('@/pages/ContactIndex'));
const ContactDetails = lazy(() => import('@/pages/ContactDetails'));
const NotebookIndex = lazy(() => import('@/pages/NotebookIndex'));
const NotebookDetails = lazy(() => import('@/pages/NotebookDetails'));

const AuthenticatedRoutes = (): ReactElement => {
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
				<Suspense fallback={null}>
					<Routes>
						<Route path="/notes" element={<NoteIndex />} />
						<Route path="/notes/:id" element={<NoteDetails />} />
						<Route path="/contacts" element={<ContactIndex />} />
						<Route
							path="/contacts/:id"
							element={<ContactDetails />}
						/>
						<Route path="/notebooks" element={<NotebookIndex />} />
						<Route
							path="/notebooks/:id"
							element={<NotebookDetails />}
						/>
						<Route
							path="/login"
							element={<Navigate to="/" replace />}
						/>
						<Route
							path="/"
							element={<Navigate to="/notes" replace />}
						/>
					</Routes>
				</Suspense>

				<EuiSpacer style={{ blockSize: miniPlayerSize.height }} />
			</EuiPageTemplate>

			<Player />
		</>
	);
};

const UserSignUp = lazy(() => import('@/pages/UserSignUp'));
const UserLogin = lazy(() => import('@/pages/UserLogin'));

const UnauthenticatedRoutes = (): ReactElement => {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route path="/signup" element={<UserSignUp />} />
				<Route path="/login" element={<UserLogin />} />
				<Route path="/*" element={<Navigate to="/login" />} />
			</Routes>
		</Suspense>
	);
};

export const AppRoutes = (): ReactElement => {
	const authentication = useAuthentication();

	return authentication.user ? (
		<AuthenticatedRoutes />
	) : (
		<UnauthenticatedRoutes />
	);
};
