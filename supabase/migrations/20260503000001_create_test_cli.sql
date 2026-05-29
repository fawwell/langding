CREATE TABLE test_cli (
  id SERIAL PRIMARY KEY,
  name TEXT DEFAULT 'created via cli',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);