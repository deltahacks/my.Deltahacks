module.exports = {
    "extends": "airbnb-base",
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'max-len': 'off',
        "indent": ["error", "tab"],
        "no-tabs": 0,
    },
};