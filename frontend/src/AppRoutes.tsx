import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const NoteIndex = React.lazy(() => import('@/pages/NoteIndex'));
const NoteDetails = React.lazy(() => import('@/pages/NoteDetails'));

export const AppRoutes = (): React.ReactElement => {
	return (
		<Routes>
			<Route path="notes" element={<NoteIndex />} />
			<Route path="notes/:id" element={<NoteDetails />} />
			<Route path="" element={<Navigate to="/notes" replace />} />
		</Routes>
	);
};
