{ config
, lib
, pkgs
, ...
}: {
  options = {
    apps.spotify.enable =
      lib.mkEnableOption "Spotify";
  };

  config = lib.mkIf config.apps.spotify.enable {
    home.packages = with pkgs; [
      spotify
    ];

    home.persistence."/persist/home" = {
      allowOther = true;
      directories = [
        {
          directory = ".config/spotify";
          method = "symlink";
        }
      ];
    };
  };
}
