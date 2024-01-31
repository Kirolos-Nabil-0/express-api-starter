-- DropIndex
DROP INDEX `Child_regionId_fkey` ON `child`;

-- DropIndex
DROP INDEX `childAttendance_childId_fkey` ON `childattendance`;

-- DropIndex
DROP INDEX `Childservant_servantId_fkey` ON `childservant`;

-- DropIndex
DROP INDEX `servant_regionId_fkey` ON `servant`;

-- AddForeignKey
ALTER TABLE `servant` ADD CONSTRAINT `servant_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Childservant` ADD CONSTRAINT `Childservant_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `Child`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Childservant` ADD CONSTRAINT `Childservant_servantId_fkey` FOREIGN KEY (`servantId`) REFERENCES `servant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `childAttendance` ADD CONSTRAINT `childAttendance_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `Child`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
