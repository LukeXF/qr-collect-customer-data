import React, { createContext, useState } from 'react';
import { Alert } from '@material-ui/lab';
import { default as MuiSnackbar, SnackbarOrigin } from '@material-ui/core/Snackbar';
import { Color } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import styles from '@components/Snackbar/styles';

// Snackbar default values
export const defaultSeverity = undefined;
export const defaultPosition: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' };
export const defaultDuration = 4000;
export const defaultInterval = 250;

// Context used by the hook useSnackbar() and HoC withSnackbar()
export const SnackbarContext = createContext<{
	openSnackbar: (text: any, severity: any, duration: any, position: any) => void;
	closeSnackbar: () => void;
}>({ openSnackbar: () => null, closeSnackbar: () => null });

const Snackbar = ({ children }) => {
	const theme = useTheme();
	// Current open state
	const [open, setOpen] = useState(false);
	// Current timeout ID
	const [timeoutId, setTimeoutId] = useState(null);
	// Snackbar's text
	const [text, setText] = useState('');
	// Snackbar's duration
	const [duration, setDuration] = useState(defaultDuration);
	// Snackbar's position
	const [position, setPosition] = useState<SnackbarOrigin>(defaultPosition);

	const [severity, setSeverity] = useState<Color | undefined>(defaultSeverity);
	// // Custom styles for the snackbar itself
	// const [customStyles, setCustomStyles] = useState({});
	// // Custom styles for the close button
	// const [closeCustomStyles, setCloseCustomStyles] = useState({});

	const triggerSnackbar = (text, severity, duration, position) => {
		setText(text);
		setSeverity(severity || defaultSeverity);
		setDuration(duration || defaultDuration);
		setPosition(position || defaultPosition);
		setOpen(true);
	};

	// Manages all the snackbar's opening process
	const openSnackbar = (text, severity, duration, position) => {
		// Closes the snackbar if it is already open
		if (open) {
			setOpen(false);
			setTimeout(() => {
				triggerSnackbar(text, severity, duration, position);
			}, defaultInterval);
		} else {
			triggerSnackbar(text, severity, duration, position);
		}
	};

	// Closes the snackbar just by setting the "open" state to false
	const closeSnackbar = () => {
		setOpen(false);
	};

	return (
		<SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
			{children}

			<MuiSnackbar
				open={open}
				autoHideDuration={duration}
				onClose={closeSnackbar}
				aria-describedby="snackbar"
				anchorOrigin={position}
				css={styles(theme)}
			>
				<Alert onClose={closeSnackbar} severity={severity}>
					{text}
				</Alert>
			</MuiSnackbar>
		</SnackbarContext.Provider>
	);
};

export default Snackbar;
