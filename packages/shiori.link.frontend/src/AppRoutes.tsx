import { ReactElement, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const NoteIndex = lazy(() => import('@/pages/NoteIndex'));
const NoteDetails = lazy(() => import('@/pages/NoteDetails'));
const ContactIndex = lazy(() => import('@/pages/ContactIndex'));
const ContactDetails = lazy(() => import('@/pages/ContactDetails'));
const NotebookIndex = lazy(() => import('@/pages/NotebookIndex'));
const NotebookDetails = lazy(() => import('@/pages/NotebookDetails'));

export const AppRoutes = (): ReactElement => {
	return (
		<Routes>
			<Route path="/notes" element={<NoteIndex />} />
			<Route path="/notes/:id" element={<NoteDetails />} />
			<Route path="/contacts" element={<ContactIndex />} />
			<Route path="/contacts/:id" element={<ContactDetails />} />
			<Route path="/notebooks" element={<NotebookIndex />} />
			<Route path="/notebooks/:id" element={<NotebookDetails />} />
			<Route path="/" element={<Navigate to="/notes" replace />} />
		</Routes>
	);
};
