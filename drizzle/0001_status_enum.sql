-- Create the task_status enum type
DO $$ BEGIN
    CREATE TYPE task_status AS ENUM ('todo', 'inprogress', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Drop the completed column and add the status column
ALTER TABLE "tasks" DROP COLUMN IF EXISTS "completed";
ALTER TABLE "tasks" ADD COLUMN IF NOT EXISTS "status" task_status DEFAULT 'todo' NOT NULL; 