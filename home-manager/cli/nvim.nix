{ pkgs, lib, config, ... }: {

  options = {
    cli.nvim.enable =
      lib.mkEnableOption "Nvim";
  };

  config = lib.mkIf config.cli.nvim.enable {
      programs.neovim = {
          enable = true;
      };
     };
}
