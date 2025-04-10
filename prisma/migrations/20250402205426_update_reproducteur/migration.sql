/*
  Warnings:

  - You are about to alter the column `nom` on the `reproducteur` table. The data in that column could be lost. The data in that column will be cast from `VarChar(35)` to `VarChar(5)`.

*/
-- DropIndex
DROP INDEX `Lapin_cageId_fkey` ON `lapin`;

-- AlterTable
ALTER TABLE `reproducteur` MODIFY `nom` VARCHAR(5) NOT NULL,
    MODIFY `race` VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE `Lapin` ADD CONSTRAINT `Lapin_cageId_fkey` FOREIGN KEY (`cageId`) REFERENCES `Cage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LapinToRepro` ADD CONSTRAINT `_LapinToRepro_A_fkey` FOREIGN KEY (`A`) REFERENCES `Lapin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LapinToRepro` ADD CONSTRAINT `_LapinToRepro_B_fkey` FOREIGN KEY (`B`) REFERENCES `Repro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
