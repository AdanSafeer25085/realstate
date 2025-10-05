import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qdwolmgskvsrdznfnplz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd29sbWdza3ZzcmR6bmZucGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2Njc1NTgsImV4cCI6MjA3NTI0MzU1OH0.75DdNdprhBKMwtUgrt7H5Oyj4x9KElrH8RXgNIBzbaw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;