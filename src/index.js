import fastify from "fastify";
import zlib from "zlib";
import path from "path";
import markoPlugin from "@marko/fastify";
export const app = fastify();

app.register(markoPlugin);

//register/configure prod specific plugins
if (process.env.NODE_ENV === "production") {

  app.register(import("@fastify/compress"), {
    zlibOptions: {
      flush: zlib.constants.Z_SYNC_FLUSH,
    },
    brotliOptions: {
      flush: zlib.constants.BROTLI_OPERATION_FLUSH,
    },
  });

  app.register(import("@fastify/static"), {
    root: path.resolve("dist/assets"),
    prefix: "/assets",
  });

}

//plugins for routes
app.register(import("./pages/index"));
