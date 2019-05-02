(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-apollo"));
	else if(typeof define === 'function' && define.amd)
		define("@binpar/jest-gql", ["react-apollo"], factory);
	else if(typeof exports === 'object')
		exports["@binpar/jest-gql"] = factory(require("react-apollo"));
	else
		root["@binpar/jest-gql"] = factory(root["react-apollo"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createApolloClient = __webpack_require__(2);

var _createApolloClient2 = _interopRequireDefault(_createApolloClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const {
  describe,
  test,
  expect
} = global;

const runGQLTest = (() => {
  var _ref = _asyncToGenerator(function* (testToRun) {
    let data = {
      endPoint: testToRun.endPoint
    };
    describe('GraphQL Tests', function () {
      const executeGQLCommand = (() => {
        var _ref2 = _asyncToGenerator(function* (executionPlan) {
          const apolloClient = (0, _createApolloClient2.default)(data);
          const testInfo = executionPlan.pop();

          if (testInfo.gql.definitions.length !== 1) {
            throw Error('Only one GQL operation is allowed in a runGQLTest.');
          }

          const definition = testInfo.gql.definitions[0];
          let result = null;

          if (!definition.operation) {
            throw Error(`Unknown GQL operation ${definition.operation}.`);
          }

          const expectTestToBeTrue = (() => {
            var _ref3 = _asyncToGenerator(function* (operation) {
              const operations = {
                mutation: 'mutate',
                query: 'query'
              };
              const params = {
                [`${operation}`]: testInfo.gql
              };

              if (testInfo.vars) {
                params.variables = yield testInfo.vars(data);
              }

              result = yield apolloClient[operations[operation]](params);

              if (testInfo.result) {
                data = _objectSpread({}, data, (yield testInfo.result(result.data)));
              }

              expect(testInfo.test(data)).toBe(true);
            });

            return function expectTestToBeTrue(_x3) {
              return _ref3.apply(this, arguments);
            };
          })();

          const {
            operation
          } = definition;

          switch (operation) {
            case 'mutation':
              {
                yield expectTestToBeTrue(operation);
                break;
              }

            case 'query':
              {
                yield expectTestToBeTrue(operation);
                break;
              }

            default:
              throw Error(`Unknown GQL operation ${definition.operation}.`);
          }

          if (executionPlan.length) yield executeGQLCommand(executionPlan);
        });

        return function executeGQLCommand(_x2) {
          return _ref2.apply(this, arguments);
        };
      })();

      const getExecutionPlan = function (testInfo, executionPlan) {
        executionPlan.push(testInfo);

        if (testInfo.previous) {
          const prev = [...testInfo.previous];

          while (prev.length) {
            getExecutionPlan(prev.pop(), executionPlan);
          }
        }
      };

      const executeTest = (() => {
        var _ref4 = _asyncToGenerator(function* (testInfo, num) {
          const executionPlan = [];
          getExecutionPlan(testInfo, executionPlan);
          test(`${testInfo.name}${num !== undefined ? ` ${num}` : ''}`, _asyncToGenerator(function* () {
            expect.assertions(executionPlan.length);
            yield executeGQLCommand(executionPlan);
          }));
        });

        return function executeTest(_x4, _x5) {
          return _ref4.apply(this, arguments);
        };
      })();

      const main = (() => {
        var _ref6 = _asyncToGenerator(function* () {
          if (testToRun.repeat) {
            yield Promise.all(new Array(testToRun.repeat).fill(0).map(function (_, i) {
              return executeTest(testToRun, i + 1);
            }));
          } else {
            yield executeTest(testToRun);
          }
        });

        return function main() {
          return _ref6.apply(this, arguments);
        };
      })();

      main();
    });
    return data;
  });

  return function runGQLTest(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = runGQLTest;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactApollo = __webpack_require__(3);

function create(data) {
  const networkInterface = (0, _reactApollo.createNetworkInterface)({
    uri: data.endPoint
  });
  const middleWares = [{
    applyMiddleware(req, next) {
      const token = data.oAuthToken;

      if (token) {
        req.options.headers = {};
        req.options.headers.authorization = `Bearer ${token}`;
      }

      next();
    }

  }];
  networkInterface.use(middleWares);
  const severNetworkInterface = (0, _reactApollo.createNetworkInterface)({
    uri: data.endPoint
  });
  severNetworkInterface.use(middleWares);
  return new _reactApollo.ApolloClient({
    ssrMode: true,
    networkInterface: severNetworkInterface
  });
}

exports.default = create;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=jest-gql.js.map