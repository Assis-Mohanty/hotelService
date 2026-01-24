import { Queue } from "bullmq";
export const queueName:string ='roomqueue'
import { ConnectionOptions } from "bullmq";

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
};

export const queue = new Queue(queueName,{
    connection:redisConnection
})
