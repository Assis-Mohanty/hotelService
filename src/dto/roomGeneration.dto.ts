import {z } from 'zod';

export const RoomGenerationRequestSchema = z.object({
    roomCategoryId : z.number().positive(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    scheduleType: z.enum(['immediate','scheduled']).default('immediate'),
    scheduledAt: z.string().datetime().optional(),
    priceOverride: z.number().positive().optional()
});

export type RoomGenerationRequestDTO = z.infer<typeof RoomGenerationRequestSchema>;

export const RoomGenerationJobSchema = z.object({
    roomCategoryId : z.number().positive(),
    startDate: z.string().date(),
    endDate: z.string().date(),
    priceOverride: z.number().positive().optional(),
    batchSize: z.number().positive().default(100)
});

export type RoomGenerationJobDTO = z.infer<typeof RoomGenerationJobSchema>;

export interface RoomGenerationResponse{
    success:boolean;
    totalRoomsCreated:number;
    totalDatesProcessed:number;
    error:string[];
    jobId:string;
}