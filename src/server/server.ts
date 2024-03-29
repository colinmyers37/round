import { getPayloadClient } from "../util/get-payload";
import { nextApp, nextHandler } from "../util/next-utils";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "../trpc";

//test commit

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js start");

    app.listen(PORT, () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_APP_URL}`
      );
    });
  });
};

start();
