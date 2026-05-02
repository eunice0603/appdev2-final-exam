import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const findUser = internalQuery({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("users")
            .filter((q) => q.eq(q.field("username"), args.username))
            .unique();
    }
});

export const insertUser = internalMutation({
    args: { username: v.string(), password: v.string(), fullname: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.insert("users", {
            username: args.username,
            password: args.password,
            fullname: args.fullname
        });
    }
});