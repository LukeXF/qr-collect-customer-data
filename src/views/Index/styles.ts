import { css } from '@emotion/react';
import { Theme } from '@material-ui/core';

export default (theme: Theme) => css`
	.submit {
		margin: ${theme.spacing(3, 0, 1)};
	}
`;
