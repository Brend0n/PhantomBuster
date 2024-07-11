module.exports = {
    presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
        '@babel/plugin-proposal-private-property-in-object'
    ],
};