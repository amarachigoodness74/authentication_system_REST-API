/* eslint-disable @typescript-eslint/no-var-requires */
import session from 'express-session';
import RedisStore from "connect-redis"
import logger from './logger';
import redisClient from './redisClient';

const store = new RedisStore({ client: redisClient });

store.on('error', (error: any) => {
  logger.error(`sessionStore Error: ${error}`);
});

export default store;
