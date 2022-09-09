module.exports = {
    projects: [
        './profilegg',
        {
            root: './profilegg',
            package: './package.json',
            tsconfig: './tsconfig.json',
            globalComponents: [
                './src/components/**/*.vue'
            ]
        },
    ],
}
