-- lksdjafhlk

local crosshair_image = nil
local crosshair_active = nil

local cfg = {
    -- Change your resolution here to your playing resolution, e.g. this is 1440p:
    resx = 2560,
    resy = 1440,

    size = 100,
    key = "Shift-I",
    path = os.getenv("HOME") .. "/.config/waywall/resources/crosshair.png",
}
config.actions[cfg.key] = function()
    if crosshair_image then
        crosshair_image:close(); crosshair_image = nil
    end
    if crosshair_active then
        crosshair_active = false
    else
        crosshair_active = true
        crosshair_image = waywall.image(cfg.path, {
            dst = {
                x = (cfg.resx - cfg.size) / 2,
                y = (cfg.resy - cfg.size) / 2,
                w = cfg.size,
                h = cfg.size,
            }
        })
    end
end

-- ksldjfh
return config -- make sure the code is placed BEFORE return config. do not include this if you're adding it to the ~/.config/waywall/extras.lua (add only the code between the first 2 comments)
