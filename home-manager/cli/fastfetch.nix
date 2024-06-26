{ pkgs, lib, config, ... }: {

  options = {
    cli.fastfetch.enable =
      lib.mkEnableOption "Fastfetch";
  };

  config = lib.mkIf config.cli.fastfetch.enable {
    home.packages = with pkgs; [
        fastfetch
        ];
  };
}
