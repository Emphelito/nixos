{ pkgs, lib, config, ... }: {
  imports = [
    ./hyprland.nix
    ./ags.nix
    ./extras.nix
    ./rofi.nix
  ];
  options = {
    desktop.enable =
      lib.mkEnableOption "Desktop Enabled";
  };

  config = lib.mkIf config.desktop.enable {
    desktop = {
      hypr.enable =
        lib.mkDefault true;

      extras.enable = 
        lib.mkDefault true;

      ags.enable = 
        lib.mkDefault true;
    };
  };
}
