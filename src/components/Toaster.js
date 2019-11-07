import React from 'react';
import clsx from 'clsx';

// ## --------- MATERIAL-UI --------- ## //
import { orange, teal, red, cyan } from '@material-ui/core/colors';
import { Snackbar, SnackbarContent, makeStyles } from '@material-ui/core';

// ## --------- ICONS --------- ## //
import { MdCheckCircle, MdCancel, MdInfo, MdWarning } from 'react-icons/md';

const variantIcon = {
	success: MdCheckCircle,
	warning: MdWarning,
	error: MdCancel,
	info: MdInfo,
}

const useStyles1 = makeStyles(theme => ({
	success: {
		backgroundColor: teal[600],
	},
	error: {
		backgroundColor: red[700],
	},
	info: {
		backgroundColor: cyan[700],
	},
	warning: {
		backgroundColor: orange[500],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
		fontSize: 14,
		fontWeight: 'bold'
	},
}));

function SnackbarContentWrapper(props) {

	const classes = useStyles1();
	const { className, message, variant } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={clsx(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					{Icon && <Icon className={clsx(classes.icon, classes.iconVariant)} />}
					{message}
				</span>
			}
		/>
	);
}

const useStyles2 = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

export default props => {

	const classes = useStyles2();

	return (
		<Snackbar
			anchorOrigin={{
				vertical: props.vertical || 'top',
				horizontal: props.horizontal || 'center',
			}}
			open={props.open}
		>
			<SnackbarContentWrapper
				className={classes.margin}
				variant={props.variant}
				message={props.message}
			/>
		</Snackbar>
	);
}
