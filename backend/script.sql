-- MySQL Script generated by MySQL Workbench
-- Fri Aug  5 14:29:04 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `workstation` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) NULL,
  `email` VARCHAR(150) NOT NULL,
  `hasright` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`post` ;

CREATE TABLE IF NOT EXISTS `mydb`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` LONGTEXT NOT NULL,
  `postdate` DATETIME NOT NULL,
  `postimg` VARCHAR(255) NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_post_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`likeposts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`likeposts` ;

CREATE TABLE IF NOT EXISTS `mydb`.`likeposts` (
  `value` TINYINT NULL,
  `users_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  INDEX `fk_likeposts_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_likeposts_post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_likeposts_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_likeposts_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `mydb`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`comments` ;

CREATE TABLE IF NOT EXISTS `mydb`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `commentcontent` LONGTEXT NOT NULL,
  `commentdate` DATETIME NOT NULL,
  `commentimg` VARCHAR(255) NULL,
  `users_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_comments_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_comments_post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `mydb`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`likecomments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`likecomments` ;

CREATE TABLE IF NOT EXISTS `mydb`.`likecomments` (
  `value` TINYINT NULL,
  `comments_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  INDEX `fk_likecomments_comments1_idx` (`comments_id` ASC) VISIBLE,
  INDEX `fk_likecomments_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_likecomments_comments1`
    FOREIGN KEY (`comments_id`)
    REFERENCES `mydb`.`comments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_likecomments_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
