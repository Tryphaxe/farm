-- DropIndex
DROP INDEX `Lapin_cageId_fkey` ON `lapin`;

-- AddForeignKey
ALTER TABLE `Lapin` ADD CONSTRAINT `Lapin_cageId_fkey` FOREIGN KEY (`cageId`) REFERENCES `Cage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LapinToRepro` ADD CONSTRAINT `_LapinToRepro_A_fkey` FOREIGN KEY (`A`) REFERENCES `Lapin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LapinToRepro` ADD CONSTRAINT `_LapinToRepro_B_fkey` FOREIGN KEY (`B`) REFERENCES `Repro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
