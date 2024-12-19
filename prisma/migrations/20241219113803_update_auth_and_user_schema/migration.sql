/*
  Warnings:

  - Added the required column `userId` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "recordStatus" "RecordStatus" NOT NULL DEFAULT 'active',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "recordStatus" "RecordStatus" NOT NULL DEFAULT 'active';

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
