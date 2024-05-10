{ pkgs, input, lib, config, ... }: {

  options = {
    desktop.rofi.enable =
      lib.mkEnableOption "enables Rofi-Wayland";
  };

  config = lib.mkIf config.desktop.rofi.enable {
    home.packages = with pkgs; [
      rofi-wayland
    ];
  };
}
