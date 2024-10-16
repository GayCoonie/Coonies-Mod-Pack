local function init()
    local loc_text = {
        name = "Demon Prison",
        text = {
            "You may disable curses."
        }
    }

    local data ={
        name = "DemonPrison",
        slug = tpmakeID("demonprison"),
        config = {
            extra = {
                
            }
        },
        pos = {
            x = 0,
            y = 0
        },
        loc_text = loc_text,
        cost = 6,
        discovered = false,
        requires = {
            tpvoucherSlug("emptycage")
        }

    }

    local DemonPrison = SMODS.Voucher:new(data.name, data.slug, data.config, data.pos, data.loc_text, data.cost, true, data.discovered, nil , data.requires)


    Tetrapak.Vouchers[tpvoucherSlug("demonprison")] = DemonPrison
    
    
end

local function load_effect()


    


end

return {
    init = init,
    load_effect = load_effect,
    after = "EmptyCage",
}