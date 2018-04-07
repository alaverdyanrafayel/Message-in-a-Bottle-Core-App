import {
    REQUIRED,
    INVALID, MIN_LENGTH, EMAIL_MAX_LENGTH, LENGTH_REQUIRED, PASSWORD_MAX_LENGTH, INVALID_PASSWORD, PASSWORD_MIN_LENGTH
} from '../../configs/constants';

export default {
    signup: {
        validation: {
            'email': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Email')
                },
                isEmail: {
                    errorMessage: INVALID('Email')
                },
                isLength: {
                    options: [{ min: MIN_LENGTH, max: EMAIL_MAX_LENGTH }],
                    errorMessage: LENGTH_REQUIRED('Email', { max: EMAIL_MAX_LENGTH })
                }
            },
            'password': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Password')
                },
                matches: {
                    options: [/^(?=.*?[a-zA-Z])(?=.*?[0-9])[\w@#$%^?~-]{0,128}$/],
                    errorMessage: INVALID_PASSWORD
                },
                isLength: {
                    options: [{ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH }],
                    errorMessage: LENGTH_REQUIRED('Password', { min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
                }
            }
        },
        authentication: false
    },
    login: {
        validation: {
            'email': {
                in: 'body',
                isEmail: {
                    errorMessage: INVALID('Email')
                },
                notEmpty: {
                    errorMessage: REQUIRED('Email')
                }
            },
            'password': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Password')
                }
            }
        },
        authentication: false
    }
};
