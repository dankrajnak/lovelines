/*
  Warnings:

  - Added the required column `year` to the `period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `period` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "period" ADD COLUMN     "year" INTEGER NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL;
