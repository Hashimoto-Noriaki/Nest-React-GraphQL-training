-- Rename existing columns to new names
ALTER TABLE "User"
RENAME COLUMN "createAt" TO "created_at";

ALTER TABLE "User"
RENAME COLUMN "updatedAt" TO "updated_at";

-- Ensure `updated_at` column has the `NOT NULL` constraint and a default value for new records
ALTER TABLE "User"
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;
