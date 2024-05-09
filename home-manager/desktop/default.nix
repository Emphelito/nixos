{ pkgs, lib, config, ... }: {
  imports = [
    ./hyprland.nix
    #./ags.nix
    ./extras.nix
  ];
  options = {
    desktop.enable =
      lib.mkEnableOption "Desktop Enabled";
  };

  config = lib.mkIf config.desktop.enable {
    desktop = {
      hypr.enable =
        lib.mkDefault true;
    };
  };
}
