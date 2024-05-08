{ config
, lib
, pkgs
, ...
}: {
  options = {
    apps.discord.enable =
      lib.mkEnableOption "Discord";
  };

  config = lib.mkIf config.apps.discord.enable {
    home.packages = with pkgs; [
      discord
    ];

  };
}
