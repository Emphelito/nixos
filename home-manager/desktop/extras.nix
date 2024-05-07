{ pkgs, lib, config, ... }: {

  options = {
    desktop.extras.enable =
      lib.mkEnableOption "Extras";
  };

  config = lib.mkIf config.desktop.extras.enable {
    home.packages = with pkgs; [
        swww
        gtk3
        accountsservice
        ];
  };
}
