-- CreateTable
CREATE TABLE "Period" (
"id" SERIAL,
    "date" TIMESTAMP(3) NOT NULL,
    "lineId" INTEGER NOT NULL,
    "isHeartBreak" BOOLEAN NOT NULL,
    "intensity" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Line" (
"id" SERIAL,
    "storyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
"id" SERIAL,
    "pesron_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL,
    "modified_date" TIMESTAMP(3) NOT NULL,
    "deleted_date" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Period" ADD FOREIGN KEY("lineId")REFERENCES "Line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Line" ADD FOREIGN KEY("storyId")REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD FOREIGN KEY("pesron_id")REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD FOREIGN KEY("user_id")REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
