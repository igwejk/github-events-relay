/**
 * GitHub event forwarder Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
    app.log.info("Starting GitHub Events Relay");

    const HTTP_EVENT_COLLECTOR_TOKEN = process.env.HTTP_EVENT_COLLECTOR_TOKEN;
    const HTTP_EVENT_COLLECTOR_URL = process.env.HTTP_EVENT_COLLECTOR_URL;

    app.onAny(async (context) => {

        app.log.info({ event: context.name, action: context.payload.action });

        try {
            const response = await fetch(HTTP_EVENT_COLLECTOR_URL, {
                body: JSON.stringify(context.payload),
                headers: new Headers({
                    "Authorization": `${HTTP_EVENT_COLLECTOR_AUTH_SCHEME} ${HTTP_EVENT_COLLECTOR_TOKEN}`,
                    "Content-Type": "application/json",
                }),
                method: "POST"
            });

            const responseText = await response.text();
            const responseStatus = response.status;

            app.log.info(
                `HTTP_EVENT_COLLECTOR response: ${responseStatus}\n${responseText}\n\n`
            );
        } catch (error) {
            app.log.error(`HTTP_EVENT_COLLECTOR error: ${error}`);
        }
    });
};
