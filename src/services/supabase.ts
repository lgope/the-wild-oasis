import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

console.log({ supabaseUrl, supabaseKey });
const supabase = createClient(supabaseUrl, supabaseKey);

export const imageBucketName = "wild-oasis-images";

export default supabase;
