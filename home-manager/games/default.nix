{ pkgs, lib, config, ... }: {

  imports = [
    ./steam.nix
    ./emulator.nix
  ];
  options = {
    games.enable =
      lib.mkEnableOption "Games Enabled";
  };

  config = lib.mkIf config.games.enable {
    games = {
      steam.enable =
        lib.mkDefault true;

      emulator.enable = 
        lib.mkDefault true;
    };
  };

}
