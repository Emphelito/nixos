{ pkgs
, config
, lib
, ...
}: {
  options = {
    apps.firefox.enable =
      lib.mkEnableOption "Firefox";
  };

  config = lib.mkIf config.apps.firefox.enable {
    programs.firefox = {
      enable = true;
    };

    home.sessionVariables = {
      BROWSER = "firefox";
    };

  };
}
