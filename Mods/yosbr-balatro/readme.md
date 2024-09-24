# YOSBR Balatro

A remake of [YOSBR](https://modrinth.com/mod/yosbr) for balatro. Useful for modpack creators.

## Usage

1. Install the code into your mods folder (requires [lovely](https://github.com/ethangreen-dev/lovely-injector))
2. Make a folder named `yosbr` in your balatro appdata folder
3. Put any files you want copied to the main appdata folder into the `yosbr` folder
  - E.G. To make a custom settings file, put your settings file in `yosbr/settings.jkr`
  - E.G. 2 To make a custom config file for Cryptid, put it in `yosbr/config/Cryptid.jkr`
4. Run the game
5. YOSBR will copy the files to the main appdata folder, only if they don't already exist. This means that you can update the files in the `yosbr` folder and they will be copied over when updated, but will not overwrite the user's custom config files.
