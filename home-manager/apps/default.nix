{ pkgs, lib, config, ... }: {
  imports = [
    ./discord.nix
    ./spotify.nix
    ./firefox.nix
    ./gnome-apps.nix
  ];
  options = {
    apps.enable =
      lib.mkEnableOption "Apps Enabled";
  };

  config = lib.mkIf config.apps.enable {
    apps = {
      spotify.enable =
        lib.mkDefault true;

      discord.enable = 
        lib.mkDefault true;

      firefox.enable = 
        lib.mkDefault true;

      gnome.enable = 
        lib.mkDefault true;
    };
  };

}
