/*
  Warnings:

  - You are about to drop the column `date` on the `period` table. All the data in the column will be lost.
  - Added the required column `year_month` to the `period` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "idx_period_date_desc";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- AlterTable
ALTER TABLE "period" DROP COLUMN "date",
ADD COLUMN     "year_month" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "idx_period_year_month" ON "period"("year_month");
