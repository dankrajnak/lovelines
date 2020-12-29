/*
  Warnings:

  - You are about to drop the column `pesron_id` on the `story` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_story_person_id";

-- DropForeignKey
ALTER TABLE "story" DROP CONSTRAINT "story_pesron_id_fkey";

-- AlterTable
ALTER TABLE "person" ADD COLUMN     "story_id" INTEGER;

-- AlterTable
ALTER TABLE "story" DROP COLUMN "pesron_id";

-- CreateIndex
CREATE INDEX "idx_person_story_id" ON "person"("story_id");

-- AddForeignKey
ALTER TABLE "person" ADD FOREIGN KEY("story_id")REFERENCES "story"("id") ON DELETE SET NULL ON UPDATE CASCADE;
