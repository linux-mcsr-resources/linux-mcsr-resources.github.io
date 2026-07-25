config.actions["*-C"] = function()
    if waywall.get_key("F3") then
        waywall.show_floating(true)
        return false
    else
        return false
    end
end