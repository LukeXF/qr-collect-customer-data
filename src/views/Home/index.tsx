import React, {useState} from 'react';
import {useLocation} from '@reach/router';
import {Container, Button, Box} from '@material-ui/core';
import * as Yup from 'yup';
import {useTheme} from '@material-ui/core/styles';
import {Formik, Form, Field} from 'formik';
import axios from 'axios';
// @ts-ignore
import Logo from "@images/logo.jpeg";
import {TextField} from 'formik-material-ui';

import {Typography} from '@material-ui/core';
import {useSnackbar} from '@components/Snackbar';
import styles from './styles';
import {Link} from "gatsby";

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

const Home: React.FC = () => {
    const theme = useTheme();
    const location = useLocation();
    const [openSnackbar] = useSnackbar();
    const [complete, setComplete] = useState<boolean>(false)

    const handleSubmit = async (values) => {
        console.log('test')
        try {
            const {data} = await axios.post('/', encode({"form-name": "contact-form", ...values}),
                {headers: {"Content-Type": "application/x-www-form-urlencoded"}},
            );
            openSnackbar(`Thanks ${values.firstName}, we have received your details!`);
            setComplete(true);
        } catch (error) {
            openSnackbar(error?.errorMessage ?? 'An error occurred attempting to send details, please tell A to B Tyres.', 'error');
        }
    };

    const initialValues: {
        firstName: string;
        lastName: string;
        carReg?: string;
        email: string;
        // password: string
    } = {
        firstName: '',
        lastName: '',
        carReg: '',
        email: '',
        // password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Must be an email address')
            .lowercase()
            .required('Email Address is required'),
        // password: Yup.string().required('Password is required'),
    });

    if (complete) {
        return <Container css={styles(theme)} maxWidth="sm">
            <img src={Logo} alt="logo" className="logo"/>
            <Typography
                gutterBottom
                variant="h5"
                component="h1"
                align="center"
            >
               Thank you for sending your details!

            </Typography>
            <Typography
                gutterBottom
                variant="h6"
                component="h2"
                align="center"
            >
                You can now close this page
            </Typography>
                <Box mt={2}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    component={Link}
                    to={"https://atobtyres.co.uk"}
                >
                    View main website
                </Button>
        </Container>
    }
    return (
        <Container css={styles(theme)} maxWidth="sm">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({isSubmitting, setFieldValue, errors, values}) => (
                    <Form
                        className="form"
                        method="post"
                        data-netlify="true"
                        name="contact-form"
                        netlify-honeypot="bot-field"
                        encType="application/x-www-form-urlencoded"
                    >
                        {console.log({errors, values})}
                        <img src={Logo} alt="logo" className="logo"/>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h1"
                            align="center"
                        >
                            Send customer details to A to B tyres
                        </Typography>
                        <Field
                            component={TextField}
                            type="text"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            margin="normal"
                            required
                        /> <Field
                        component={TextField}
                        type="text"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        required
                    /> <Field
                        component={TextField}
                        type="email"
                        name="email"
                        label="Email Address"
                        fullWidth
                        margin="normal"
                        required
                    /> <Field
                        component={TextField}
                        type="text"
                        name="carReg"
                        label="Vehicle Reg Number"
                        fullWidth
                        margin="normal"
                    />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Continue
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Home;
