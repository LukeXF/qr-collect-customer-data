import React from 'react';
import Alert from '@material-ui/lab/Alert';


const AlertComp = (props) => {
	return (
		<Alert {...props} style={{ width: '100%' }}>
			{props?.children}
		</Alert>
	);
};
export default AlertComp;
