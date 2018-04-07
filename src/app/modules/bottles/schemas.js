import { BEARER_AUTH, REQUIRED, LENGTH_REQUIRED  } from '../../configs/constants';

export default {
    addBottle: {
        authentication: BEARER_AUTH,
        validation: {
            'firstName': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('First name')
                }
            },
            'lastName': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('First name')
                }
            },
            'message': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Message')
                },
                isLength: {
                    options: [{ max: 200 }],
                    errorMessage: LENGTH_REQUIRED('Message', { max: 200 })
                },
            },
            'state': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('State')
                }
            },
            'city': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('City')
                }
            },
            'title': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Title')
                }
            },
        }
    }
}
