-- user
CREATE TABLE IF NOT EXISTS `user` (
    `userid` VARCHAR(255) NOT NULL,
    `username` VARCHAR(16) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- configure_user
-- CREATE TABLE IF NOT EXISTS `configure_user` (
--     `userid` VARCHAR(255) NOT NULL,
--     PRIMARY KEY (`username`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;