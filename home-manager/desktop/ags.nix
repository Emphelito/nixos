{ pkgs, lib, config, inputs, ... }: {

  imports = [ inputs.ags.homeManagerModules.default ];

  options = {
    desktop.ags.enable =
      lib.mkEnableOption "AGS";
  };

  config = lib.mkIf config.desktop.ags.enable {

    programs.ags = {
      enable = true;
      configDir = ../../.config/ags;

      extraPackages = with pkgs; [
        gtksourceview
        webkitgtk
        accountsservice
      ];
    };
  };
}
