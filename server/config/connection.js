//importing needed packages
const { createClient } = require("@supabase/supabase-js")
const OpenAI = require('openai')
require('dotenv').config()

//OpenAi setup
export const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY
})


//supabase setup
const supabaseUrl = process.env.SUPABASE_PROJECT_URL
const supabaseApiKey = process.env.SUPABASE_API_KEY

export const supabase = createClient(supabaseUrl, supabaseApiKey)
