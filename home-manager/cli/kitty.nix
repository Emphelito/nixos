{ pkgs, lib, config, ... }: {

  options = {
    cli.kitty.enable =
      lib.mkEnableOption "Kitty";
  };

  config = lib.mkIf config.cli.kitty.enable {
    home.packages = with pkgs; [
      kitty
    ];
  };
}
