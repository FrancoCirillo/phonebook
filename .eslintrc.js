module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
	"eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
        "error", "always"
    		],
    	"arrow-spacing": [
        	"error", { "before": true, "after": true }
    	],
        'semi': [
            'error',
            'never'
        ],
	"no-console": 0
    }
}
