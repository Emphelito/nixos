{ pkgs, lib, config, ... }: {

  options = {
    games.emulator.enable =
      lib.mkEnableOption "Emulator";
  };

  config = lib.mkIf config.games.emulator.enable {
    home.packages = with pkgs; [
      retroarch
    ];
  };
}
