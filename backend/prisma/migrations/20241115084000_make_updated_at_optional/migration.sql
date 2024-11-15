-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable: Drop the old column and add a new column with the correct name
ALTER TABLE "User" DROP COLUMN "updateAt",
ADD COLUMN "updatedAt" TIMESTAMP(0);

-- Set a default value for existing rows in the "User" table
UPDATE "User" SET "updatedAt" = NOW();

-- If the foreign key needs to be restored after alteration, add it back
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
