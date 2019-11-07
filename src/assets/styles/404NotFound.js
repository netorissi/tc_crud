export default theme => ({
    root: {
        minHeight: '100vh',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: theme.spacing(3),
        '& img': {
            maxWidth: 300,
            marginTop: 10
        },
        '& p': {
            fontSize: 25
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            '& img': {
                maxWidth: 200,
                marginTop: 0
            },
            '& p': {
                fontSize: 15
            }
        }
    },
    button: {
        marginTop: theme.spacing(2)
    }
})