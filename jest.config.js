import { defaults } from 'jest-config';

const config = {
    transform: {
        "^.+\\.(ts|js|tsx|jsx)?$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub"
    },
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    testEnvironment: 'jsdom',
    globals: {
        window: {
            location: {}
        }
    }

};

export default config;