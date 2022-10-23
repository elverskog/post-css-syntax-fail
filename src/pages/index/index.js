import template from "./index.marko";

export default async (app) => {
  app.get("/", (request, reply) => {
    reply.marko(template, { session: request.session });
  });
};