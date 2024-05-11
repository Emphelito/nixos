{ pkgs
, config
, lib
, ...
}: {
  options = {
    apps.gnome.enable =
      lib.mkEnableOption "Gnome-apps Enabled";
  };

  config = lib.mkIf config.apps.gnome.enable {
    home.packages = with pkgs; [
      gnome-calendar
      gnome-boxes
      gnome-system-monitor
      gnome-control-center
      gnome-weather
      gnome-calculator
      gnome-clocks
      gnome-software
    ];
  };
}
