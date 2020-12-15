/*
  Warnings:

  - You are about to drop the column `storyId` on the `line` table. All the data in the column will be lost.
  - You are about to drop the column `lineId` on the `period` table. All the data in the column will be lost.
  - You are about to drop the column `isHeartBreak` on the `period` table. All the data in the column will be lost.
  - Added the required column `story_id` to the `line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `line_id` to the `period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_heart_break` to the `period` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "line" DROP CONSTRAINT "line_storyId_fkey";

-- DropForeignKey
ALTER TABLE "period" DROP CONSTRAINT "period_lineId_fkey";

-- AlterTable
ALTER TABLE "line" DROP COLUMN "storyId",
ADD COLUMN     "story_id" INTEGER NOT NULL,
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "period" DROP COLUMN "lineId",
DROP COLUMN "isHeartBreak",
ADD COLUMN     "line_id" INTEGER NOT NULL,
ADD COLUMN     "is_heart_break" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "story" ALTER COLUMN "created_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "modified_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "deleted_date" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "idx_line_story_id" ON "line"("story_id");

-- CreateIndex
CREATE INDEX "idx_line_deleted_date" ON "line"("deleted_date");

-- CreateIndex
CREATE INDEX "idx_period_is_heart_break" ON "period"("is_heart_break");

-- CreateIndex
CREATE INDEX "idx_period_date_desc" ON "period"("date");

-- CreateIndex
CREATE INDEX "idx_period_line" ON "period"("line_id");

-- CreateIndex
CREATE INDEX "idx_story_person_id" ON "story"("pesron_id");

-- CreateIndex
CREATE INDEX "idx_story_deleted_date" ON "story"("deleted_date");

-- AddForeignKey
ALTER TABLE "line" ADD FOREIGN KEY("story_id")REFERENCES "story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "period" ADD FOREIGN KEY("line_id")REFERENCES "line"("id") ON DELETE CASCADE ON UPDATE CASCADE;
