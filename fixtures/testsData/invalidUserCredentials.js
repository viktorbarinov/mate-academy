import {USERS} from "../variables/users";

export const INVALID_USER_CREDENTIALS = {

    emptyEmail: {
        name: 'empty email',
        email: '',
        password: USERS.regular_user.password,
        error_message: 'email:can\'t be blank'
    },

    emptyPassword: {
        name: 'empty password',
        email: USERS.regular_user.email,
        password: '',
        error_message: 'password:can\'t be blank'
    },

    unregisteredEmail: {
        name: 'unregistered email',
        email: 'unregistered@gmail.com',
        password: USERS.regular_user.password,
        error_message: 'email or password:is invalid'
    },
    wrongPassword: {
        name: 'wrong password',
        email: USERS.regular_user.email,
        password: 'ok123456!',
        error_message: 'email or password:is invalid'
    }
}
