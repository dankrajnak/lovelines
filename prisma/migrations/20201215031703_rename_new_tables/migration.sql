/*
  Warnings:

  - You are about to drop the `Line` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Period` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Story` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Line" DROP CONSTRAINT "Line_storyId_fkey";

-- DropForeignKey
ALTER TABLE "Period" DROP CONSTRAINT "Period_lineId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_pesron_id_fkey";

-- CreateTable
CREATE TABLE "period" (
"id" SERIAL,
    "date" TIMESTAMP(3) NOT NULL,
    "lineId" INTEGER NOT NULL,
    "isHeartBreak" BOOLEAN NOT NULL,
    "intensity" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "line" (
"id" SERIAL,
    "storyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story" (
"id" SERIAL,
    "pesron_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL,
    "modified_date" TIMESTAMP(3) NOT NULL,
    "deleted_date" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Line";

-- DropTable
DROP TABLE "Period";

-- DropTable
DROP TABLE "Story";

-- AddForeignKey
ALTER TABLE "period" ADD FOREIGN KEY("lineId")REFERENCES "line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "line" ADD FOREIGN KEY("storyId")REFERENCES "story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story" ADD FOREIGN KEY("pesron_id")REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
