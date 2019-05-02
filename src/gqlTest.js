import createApolloClient from './createApolloClient';

const { describe, test, expect } = global;

const runGQLTest = async (testToRun) => {
  let data = { endPoint: testToRun.endPoint };

  describe('GraphQL Tests', () => {
    const executeGQLCommand = async (executionPlan) => {
      const apolloClient = createApolloClient(data);
      const testInfo = executionPlan.pop();

      if (testInfo.gql.definitions.length !== 1) {
        throw Error('Only one GQL operation is allowed in a runGQLTest.');
      }
      const definition = testInfo.gql.definitions[0];
      let result = null;
      if (!definition.operation) {
        throw Error(`Unknown GQL operation ${definition.operation}.`);
      }

      const expectTestToBeTrue = async (operation) => {
        const operations = { mutation: 'mutate', query: 'query' };
        const params = { [`${operation}`]: testInfo.gql };

        if (testInfo.vars) {
          params.variables = await testInfo.vars(data);
        }

        result = await apolloClient[operations[operation]](params);

        if (testInfo.result) {
          data = { ...data, ...(await testInfo.result(result.data)) };
        }

        expect(testInfo.test(data)).toBe(true);
      };

      const { operation } = definition;
      switch (operation) {
        case 'mutation': {
          await expectTestToBeTrue(operation);
          break;
        }
        case 'query': {
          await expectTestToBeTrue(operation);
          break;
        }
        default:
          throw Error(`Unknown GQL operation ${definition.operation}.`);
      }

      if (executionPlan.length) await executeGQLCommand(executionPlan);
    };

    const getExecutionPlan = (testInfo, executionPlan) => {
      executionPlan.push(testInfo);
      if (testInfo.previous) {
        const prev = [...testInfo.previous];
        while (prev.length) {
          getExecutionPlan(prev.pop(), executionPlan);
        }
      }
    };

    const executeTest = async (testInfo, num) => {
      const executionPlan = [];
      getExecutionPlan(testInfo, executionPlan);
      test(`${testInfo.name}${num !== undefined ? ` ${num}` : ''}`, async () => {
        expect.assertions(executionPlan.length);
        await executeGQLCommand(executionPlan);
      });
    };

    const main = async () => {
      if (testToRun.repeat) {
        await Promise.all(
          new Array(testToRun.repeat).fill(0).map((_, i) => executeTest(testToRun, i + 1)),
        );
      } else {
        await executeTest(testToRun);
      }
    };

    main();
  });

  return data;
};

export default runGQLTest;
