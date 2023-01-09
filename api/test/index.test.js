
const fs = require("fs");
const path = require("path");
const nock = require("nock");
const { Probot, ProbotOctokit } = require("probot");

const gitHubEventsRelay = require("../GitHubEventsRelay");
const payload = require("./fixtures/any.event");

const privateKey = fs.readFileSync(
  path.join(__dirname, "fixtures/mock-cert.pem"),
  "utf-8"
);

describe("Secure Event Forwarding", () => {
  let probot;

  beforeEach(() => {
    nock.disableNetConnect();

    probot = new Probot({
      appId: 123,
      privateKey,
      // disable request throttling and retries for testing
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    });

    probot.load(gitHubEventsRelay);
  });

  test("Forward an event", async () => {
    const { origin, pathname } = new URL(process.env.HTTP_EVENT_COLLECTOR_URL);
    nock(origin)
      .post(pathname, (body) => {
        expect(body).toMatchObject(payload);
        return true;
      })
      .reply(200, { text: "Forwarded payload" });

    // Receive a webhook event
    await probot.receive({ name: "code_scanning_alert", payload });

    expect(nock.isDone()).toBe(true);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about testing with Nock see:
// https://github.com/nock/nock
