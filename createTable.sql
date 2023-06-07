CREATE TABLE `flatList`
(
    `id`           INT(20),
    `flat_id`      INT(20),
    `floor`        TINYINT(20),
    `pos_on_floor` TINYINT(20),
    `price`        INT(20),
    `rooms`        TINYINT(20),
    `area_total`   INT(20),
    `area_kitchen` FLOAT(20),
    `area_live`    FLOAT(20),
    `layout_image` VARCHAR(100),
    PRIMARY KEY (`id`)
);