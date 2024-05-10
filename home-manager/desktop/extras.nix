{ pkgs, lib, config, ... }: {

  options = {
    desktop.extras.enable =
      lib.mkEnableOption "Extras";
  };

  config = lib.mkIf config.desktop.extras.enable {
    home.packages = with pkgs; [
      gtk3
      accountsservice
      font-awesome
      dconf
    ];
    gtk = {
      enable = true;
    };
    qt = {
      enable = true;
    };
  };
}
