-- CreateTable
CREATE TABLE `Reproducteur` (
    `id` VARCHAR(10) NOT NULL,
    `nom` VARCHAR(35) NOT NULL,
    `race` VARCHAR(10) NOT NULL,
    `sexe` VARCHAR(10) NOT NULL,
    `date_naissance` DATE NOT NULL,
    `date_ajout` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lapin` (
    `id` VARCHAR(10) NOT NULL,
    `nbre` VARCHAR(15) NOT NULL,
    `race` VARCHAR(15) NOT NULL,
    `sexe` VARCHAR(15) NOT NULL,
    `date_naissance` DATE NOT NULL,
    `id_mere` INTEGER NULL,
    `id_pere` INTEGER NULL,
    `statut` VARCHAR(15) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Repro` (
    `id` VARCHAR(10) NOT NULL,
    `id_male` INTEGER NULL,
    `id_femelle` INTEGER NULL,
    `diagnostic` VARCHAR(191) NULL,
    `startnid` DATE NOT NULL,
    `date_parturition` DATE NOT NULL,
    `lap_nes` VARCHAR(15) NOT NULL,
    `designation` VARCHAR(191) NULL,
    `lap_mort` VARCHAR(15) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cage` (
    `id` VARCHAR(10) NOT NULL,
    `nom` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aliment` (
    `id` VARCHAR(10) NOT NULL,
    `nom` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vente` (
    `id` VARCHAR(10) NOT NULL,
    `nomcli` VARCHAR(191) NULL,
    `numcli` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LapinToRepro` (
    `A` VARCHAR(10) NOT NULL,
    `B` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `_LapinToRepro_AB_unique`(`A`, `B`),
    INDEX `_LapinToRepro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lapin` ADD CONSTRAINT `Lapin_cageId_fkey` FOREIGN KEY (`cageId`) REFERENCES `Cage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LapinToRepro` ADD CONSTRAINT `_LapinToRepro_A_fkey` FOREIGN KEY (`A`) REFERENCES `Lapin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LapinToRepro` ADD CONSTRAINT `_LapinToRepro_B_fkey` FOREIGN KEY (`B`) REFERENCES `Repro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
