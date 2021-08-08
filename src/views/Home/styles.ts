import { css } from '@emotion/react';
import { Theme } from '@material-ui/core';

export default (theme: Theme) => css`
    .logo {
        margin: auto;
        display: block;
        max-width: 150px;
    }
	.submit {
		margin: ${theme.spacing(3, 0, 1)};
	}
`;
