import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("todos")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect();
    },
});

export const add = mutation({
    args: { 
        text: v.string(),
        userId: v.id("users")
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false,
            userId: args.userId
        });
    },
});

export const toggle = mutation({
    args: {
        id: v.id("todos"),
        isCompleted: v.boolean()
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            isCompleted: args.isCompleted,
        });
    },
});

export const remove = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
