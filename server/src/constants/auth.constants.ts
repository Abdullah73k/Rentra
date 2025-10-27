import { config } from "dotenv";

config()

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? ""
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? ""
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET ?? ""
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? ""
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID ?? ""
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET ?? ""
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD ?? ""
export const GMAIL_USER = process.env.GMAIL_USER ?? ""