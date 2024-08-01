-- Drop Tasks table if it exists
DROP TABLE IF EXISTS tasks;

-- Drop Lists table if it exists
DROP TABLE IF EXISTS lists;

-- Drop TaskStatus type if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
        DROP TYPE task_status;
    END IF;
END $$;

-- Drop ListStatus type if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'list_status') THEN
        DROP TYPE list_status;
    END IF;
END $$;
