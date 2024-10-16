

local function init()
    local loc_text = {
        name = "Echoing Joker",
        text = {
            "High Cards count as the last hand played",
            "{C:inactive}Currently: #1#{}"
        }
    }
    local echoingjoker = SMODS.Joker:new(
        "Echoing Joker",
        tpmakeID("echoing_joker"),
        {
            
            extra = {

            }
        },
        {
            x = 0,
            y = 0
        },
        loc_text,
        3, -- rarity
        7, -- cost
        true,
        false,
        false,
        true,
        "Echoing Joker"
    )
    
    
    Tetrapak.Jokers["j_" .. tpmakeID("echoing_joker")] = echoingjoker
    
end

local function load_effect()

    

    SMODS.Jokers[tpjokerSlug("echoing_joker")].loc_def = function (self, player)
        return {
            G.GAME.last_hand_played or "None"
        }
    end



    local eval_hand_ref = evaluate_poker_hand
    function evaluate_poker_hand(hand)
        
        local hand = eval_hand_ref(hand)
        local echoingjoker = next(find_joker("Echoing Joker"))
        if echoingjoker and G.GAME.last_hand_played then
            
            -- if hand["High Card"] and top is the only entry in the table, then it is the only hand played
            print(table.tostring(hand))
            local num = 0
            for k, v in pairs(hand) do
                if #v ~= 0 then
                    num = num + 1
                end
            end
            if num == 2 then
                hand[G.GAME.last_hand_played] = hand["High Card"]
            end


        end
        return hand
    end


    
end

return {
    init = init,
    load_effect = load_effect
    
}