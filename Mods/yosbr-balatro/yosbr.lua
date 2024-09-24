do 
    local function joinPath(one, two) 
        if one == "" then return two end
        return one .. "/" .. two 
    end
    local function recursiveCopy(from, to)
        local files = love.filesystem.getDirectoryItems(from)
        for _, f in ipairs(files) do
            local oldPath = joinPath(from, f)
            local info = love.filesystem.getInfo(oldPath) print("[YOSBR]", oldPath)
            if info.type == "file" then
                local newPath = joinPath(to, f)
                local info = love.filesystem.getInfo(newPath)
                if not info then 
                    local data, err = love.filesystem.read(oldPath)
                    if not data then
                        print("[YOSBR] Error reading from '" .. oldPath .. "'.", err)
                    else
                        local succ, err = love.filesystem.write(newPath, data)
                        if not succ then
                            print("[YOSBR] Error writing to '" .. newPath .. "'.", err)
                        end
                    end
                end
            elseif info.type == "directory" then
                local newPath = joinPath(to, f)
                local info = love.filesystem.getInfo(newPath)
                if not info then 
                    local succ = love.filesystem.createDirectory(newPath)
                    if not succ then
                        print("[YOSBR] Error creating directory '" .. newPath .. "'.")
                    else
                        recursiveCopy(oldPath, newPath)
                    end
                elseif info.type ~= "directory" then
                    print("[YOSBR] Error '" .. newPath .. "' exists and is not a directory.")
                else
                    recursiveCopy(oldPath, newPath)
                end
            end
        end
    end
   local succ, err = pcall(recursiveCopy, "/Mods/yosbr-config", "")
    if not succ then 
        print("[YOSBR] Error running YOSBR.", err)
    end
end
