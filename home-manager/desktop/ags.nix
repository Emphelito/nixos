{ pkgs, lib, config, ... }: {

  options = {
    desktop.ags.enable =
      lib.mkEnableOption "AGS";
  };

  config = lib.mkIf config.desktop.ags.enable {
    
    programs.ags = {
        enable = true;
        configDir = ../../.config/ags;
    };
  };
}
