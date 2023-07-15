import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const NoteIndex = React.lazy(() => import('@/pages/NoteIndex'));

export const AppRoutes = (): React.ReactElement => {
	return (
		<Routes>
			<Route path="notes" element={<NoteIndex />} />
			<Route path="" element={<Navigate to="/notes" replace />} />
		</Routes>
	);
};
