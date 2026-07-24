for i = 0, 3, 1 do
    helpers.res_mirror( -- mob_spawner
        {
            src = { x = 1827, y = 859 + 8 * i, w = 33, h = 9 },
            dst = { x = 1618, y = 720, w = 33 * 8, h = 9 * 8 },
            depth = 3,
            color_key = { input = "#4de1ca", output = "#FFFFFF" }
        },
        0, 0
    )
    helpers.res_mirror( -- mob_spawner
        {
            src = { x = 1827, y = 859 + 8 * i, w = 33, h = 9 },
            dst = { x = 1618 + 8, y = 720 + 8, w = 33 * 8, h = 9 * 8 },
            depth = 2,
            color_key = { input = "#4de1ca", output = "#000000" }
        },
        0, 0
    )
end