import 'whatwg-fetch';
import 'setimmediate';

require('dotenv').config({
    path: 'test.env'
})

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnviroments: () => ({...process.env})
}))
