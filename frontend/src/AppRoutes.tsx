import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const NoteIndex = React.lazy(() => import('@/pages/NoteIndex'));
const NoteDetails = React.lazy(() => import('@/pages/NoteDetails'));
const ContactIndex = React.lazy(() => import('@/pages/ContactIndex'));
const NotebookIndex = React.lazy(() => import('@/pages/NotebookIndex'));

export const AppRoutes = (): React.ReactElement => {
	return (
		<Routes>
			<Route path="notes" element={<NoteIndex />} />
			<Route path="notes/:id" element={<NoteDetails />} />
			<Route path="contacts" element={<ContactIndex />} />
			<Route path="notebooks" element={<NotebookIndex />} />
			<Route path="" element={<Navigate to="/notes" replace />} />
		</Routes>
	);
};
