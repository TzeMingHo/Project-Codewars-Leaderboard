import test from "node:test";
import assert from "node:assert";
import nock from "nock";
import {
  makeFetchRequest,
  invalidUserNameRequest,
  emptyUserNameRequest,
} from "./index.mjs";

test("mocks a fetch function", async () => {
  const scope = nock("https://example.com")
    .get("/test")
    .reply(200, JSON.stringify({ user: "someone" }));

  const response = await makeFetchRequest();
  const parsedResponse = await response.json();
  assert(parsedResponse.user === "someone");

  assert(scope.isDone() === true, "No matching fetch request has been made");
});

test("mocks a invalid username for CodeWars api", async () => {
  const scope = nock("https://www.codewars.com")
    .get("/api/v1/users/invalidUserName")
    .reply(
      404,
      JSON.stringify({
        success: false,
        reason: "not found",
      }),
    );
  const response = await invalidUserNameRequest();
  const parsedResponse = await response.json();
  assert(response.status === 404);
  assert(
    parsedResponse.success === false && parsedResponse.reason === "not found",
  );

  assert(scope.isDone() === true, "No matching fetch request has been made");
});

test("mocks an empty username for CodeWars api", async () => {
  const scope = nock("https://www.codewars.com")
    .get("/api/v1/users/")
    .reply(404);
  const response = await emptyUserNameRequest();
  assert(response.status === 404);
  assert(scope.isDone() === true, "No matching fetch request has been made");
});

test.afterEach(() => {
  nock.cleanAll();
});
