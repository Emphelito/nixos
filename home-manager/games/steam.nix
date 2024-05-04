{ pkgs, lib, config, ... }: {

  options = {
    steamMod.enable =
      lib.mkEnableOption "enables steamMod";
  };

  config = lib.mkIf config.steamMod.enable {
    programs.steam.enable = true;
    programs.steam.gamescopeSession.enable = true;

    environment.systemPackages = with pkgs; [
      protonup
    ];
    environment.sessionVariables = {
        STEAM_EXTRA_COMPAT_TOOLS_PATHS =
            "/home/emph/.steam/root/compatibilitytools.d";
    };
  };
}
