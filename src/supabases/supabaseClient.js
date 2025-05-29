import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ovfmsyjuufxqziuklgom.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92Zm1zeWp1dWZ4cXppdWtsZ29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NDIxMjgsImV4cCI6MjA2NDExODEyOH0.ivIfIyVicMZX3Dmn9a4dy3wVMoOF3dv4NbOiNvFAVwg'

export const supabase = createClient(supabaseUrl, supabaseKey)