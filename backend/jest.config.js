module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest' , 
        "^.+\\.(js|jsx)$": "babel-jest" 
    },
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  };