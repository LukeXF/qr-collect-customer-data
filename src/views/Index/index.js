import * as React from "react"
import styles from './styles';
import { useTheme } from "@material-ui/core";

// markup
const IndexPage = () => {
	const theme = useTheme();

	return (
		<div css={styles(theme)}>
		hi</div>
	)
}

export default IndexPage
