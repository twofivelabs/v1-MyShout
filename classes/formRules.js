// const usernamePattern = /[^\\@\\!\\#\\$\\%\\^\\&\\*\\(\\)\\+\\{\\}\\:\\"\\<\\>\\?\\~\\,\\.\\;]/g

export default {
    email: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters'
    ],
    phone: [
        v => !!v || 'Phone is required',
        v => (v && v.length >= 10) || 'Phone must be valid'
    ],
    message: [
        v => !!v || 'Message is required'
    ],
    username: [
        v => !!v || 'Username is required',
        v => (v && v.length > 2) || 'Username must be a least 3 characters',
        // v => usernamePattern.test(v) || 'Using invalid characters'
    ],
    name: [
        v => !!v || 'Is required'
    ],
    title: [
        v => !!v || 'Is required'
    ]
}
