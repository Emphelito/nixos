{ pkgs, lib, config, ... }: {

  options = {
    games.steam.enable =
      lib.mkEnableOption "enables Steam";
  };

  config = lib.mkIf config.games.steam.enable {
    home.packages = with pkgs; [
      steam-run
      mangohud
      protonup
      #bottles
    ];

    home.sessionVariables = {
      STEAM_EXTRA_COMPAT_TOOLS_PATHS =
        "/home/emph/.steam/root/compatibilitytools.d";
    };
  };
}
