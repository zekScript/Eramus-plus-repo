/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "followersCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "followingCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "postsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profilePic" TEXT DEFAULT 'https://i.pinimg.com/564x/9f/e2/43/9fe24317d8363d84b3eb3b93b9c756ae.jpg';

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "theme" TEXT DEFAULT 'dark',
    "notifications" BOOLEAN NOT NULL DEFAULT true,
    "basicDetails" BOOLEAN NOT NULL DEFAULT true,
    "myProfileDetails" TEXT NOT NULL DEFAULT 'Public',
    "postDetails" TEXT NOT NULL DEFAULT 'Public',
    "friendsList" TEXT NOT NULL DEFAULT 'Public',
    "postComments" TEXT NOT NULL DEFAULT 'Public',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
