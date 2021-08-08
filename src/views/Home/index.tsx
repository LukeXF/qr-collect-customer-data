import React, {useState, useEffect} from 'react';
import {useLocation} from '@reach/router';
import {Link, Container, Divider, Button} from '@material-ui/core';
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

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

const Home: React.FC = () => {
    const theme = useTheme();
    const location = useLocation();
    const [openSnackbar] = useSnackbar();

    const handleSubmit = async (values) => {
        console.log('test')
        try {
            const {data} = await axios.post('/', encode({"form-name": "contact-form", ...values}),
                {headers: {"Content-Type": "application/x-www-form-urlencoded"}},
            );
            openSnackbar(`Successfully logged in, welcome ${values.name}`);
        } catch (error) {
            openSnackbar(error?.errorMessage ?? 'An error occurred attempting to log in.', 'error');
        }
    };

    const initialValues: {
        email: string;
        // password: string
    } = {
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
                        {values.email}
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
                            type="email"
                            name="email"
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
