import React from 'react';
import SnackbarProvider from './src/components/Snackbar';

export const wrapRootElement = ({ element }) => {
	return (
		<SnackbarProvider>{element}</SnackbarProvider>
	);
};

