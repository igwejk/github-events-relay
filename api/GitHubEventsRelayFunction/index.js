const {
    createProbot,
    createAzureFunction,
} = require("@probot/adapter-azure-functions");

const gitHubEventsRelayApp = require("../GitHubEventsRelayApp");

const gitHubEventsRelayFunction = createAzureFunction(
    gitHubEventsRelayApp,
    { probot: createProbot() }
);

module.exports = async function (context, req) {
    context.log(`${Date.now()}: GitHubEventsRelayFunction call \n ${JSON.stringify(req.body, undefined, 4)}}`);

    try {
        const result = await gitHubEventsRelayFunction.apply(this, Array.from(arguments));
        context.log(`${Date.now()}: GitHubEventsRelayFunction call is successfully exiting`);
        return { status: 200, body: (result && JSON.stringify(result)) || "OK 👍" };
    } catch (error) {
        context.log.error(`${Date.now()}: GitHubEventsRelayFunction is failing with error: ${error}`);
        return { status: 200, body: `Not OK 🫤:\n${error.message}` };
    }
};