-- Enable the uuid-ossp extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create database if it doesn't exist
DO
$$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'task-manager') THEN
      PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE task-manager');
   END IF;
END
$$;

-- Create ListStatus type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'list_status') THEN
        CREATE TYPE list_status AS ENUM ('ACTIVE', 'ARCHIVED');
    END IF;
END $$;

-- Create TaskStatus type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
        CREATE TYPE task_status AS ENUM ('TODO', 'IN-PROGRESS', 'DONE');
    END IF;
END $$;

-- Create Lists table
CREATE TABLE IF NOT EXISTS lists (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL CHECK (char_length(title) >= 3),
    status list_status NOT NULL,
    user_id UUID NOT NULL
);

-- Create Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL CHECK (char_length(title) >= 3),
    description VARCHAR(1000),
    status task_status NOT NULL,
    list_id UUID NOT NULL,
    user_id UUID NOT NULL,
    CONSTRAINT fk_list
        FOREIGN KEY(list_id) 
        REFERENCES lists(id)
);
