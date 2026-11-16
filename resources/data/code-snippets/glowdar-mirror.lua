local resolution = { x = 1920, y = 1080 }
local glowdar = { x = 1618, y = 720, size = 8, shadow = 8 }

for i = 0, 3, 1 do
    helpers.res_mirror( -- mob_spawner
        {
            src = { x = resolution.x - 93, y = resolution.y - 221 + 8 * i, w = 33, h = 9 },
            dst = { x = glowdar.x, y = glowdar.y, w = 33 * glowdar.size, h = 9 * glowdar.size },
            depth = 3,
            color_key = { input = "#4de1ca", output = "#FFFFFF" }
        },
        0, 0,
    )
        helpers.res_mirror( -- mob_spawner
        {
            src = { x = resolution.x - 93, y = resolution.y - 221 + 8 * i, w = 33, h = 9 },
            dst = { x = glowdar.x + glowdar.shadow, y = glowdar.y + glowdar.shadow, w = 33 * glowdar.size, h = 9 * glowdar.size },
            depth = 2,
            color_key = { input = "#4de1ca", output = "#000000" }
        },
        0, 0,
    )
end
