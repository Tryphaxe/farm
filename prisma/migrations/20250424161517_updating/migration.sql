-- DropIndex
DROP INDEX `Lapin_cageId_fkey` ON `lapin`;

-- AlterTable
ALTER TABLE `repro` MODIFY `startnid` DATE NULL,
    MODIFY `date_parturition` DATE NULL,
    MODIFY `lap_nes` VARCHAR(15) NULL,
    MODIFY `lap_mort` VARCHAR(15) NULL;

-- AddForeignKey
ALTER TABLE `Lapin` ADD CONSTRAINT `Lapin_cageId_fkey` FOREIGN KEY (`cageId`) REFERENCES `Cage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repro` ADD CONSTRAINT `Repro_id_male_fkey` FOREIGN KEY (`id_male`) REFERENCES `Reproducteur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repro` ADD CONSTRAINT `Repro_id_femelle_fkey` FOREIGN KEY (`id_femelle`) REFERENCES `Reproducteur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LapinToRepro` ADD CONSTRAINT `_LapinToRepro_A_fkey` FOREIGN KEY (`A`) REFERENCES `Lapin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LapinToRepro` ADD CONSTRAINT `_LapinToRepro_B_fkey` FOREIGN KEY (`B`) REFERENCES `Repro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
