/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[email]` on the table `person`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "person.email_unique" ON "person"("email");
