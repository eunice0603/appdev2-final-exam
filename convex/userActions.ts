"use node";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const login = action({
    args: { username: v.string(), password: v.string() },
    handler: async (ctx, args): Promise<{ success: boolean; message?: string; userId?: any }> => {
        const user = await ctx.runQuery(internal.users.findUser, { username: args.username });
        if (!user) return { success: false, message: "User not found!" };
        const passwordCorrect = bcrypt.compareSync(args.password, user.password);
        if (!passwordCorrect) return { success: false, message: "Invalid credentials!" };
        return { success: true, userId: user._id };
    }
});

export const register = action({
    args: { username: v.string(), password: v.string(), fullname: v.string() },
    // Updated to accept and save fullname alongside username and hashed password
    handler: async (ctx, args): Promise<any> => {
        const user = await ctx.runQuery(internal.users.findUser, { username: args.username });
        if (user) return { success: false, message: "User already exists!" };
        const hashedPassword = bcrypt.hashSync(args.password, 10);
        const userId = await ctx.runMutation(internal.users.insertUser, {
            username: args.username,
            password: hashedPassword,
            fullname: args.fullname
        });
        return userId;
    }
});