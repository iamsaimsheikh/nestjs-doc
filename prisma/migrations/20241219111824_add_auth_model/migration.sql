-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_accessToken_key" ON "Auth"("accessToken");
