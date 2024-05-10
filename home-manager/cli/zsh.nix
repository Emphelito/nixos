{ config
, lib
, pkgs
, ...
}: {
  options = {
    cli.zsh.enable =
      lib.mkEnableOption "zsh";
  };
  config = lib.mkIf config.cli.zsh.enable {
    programs.zsh = {
      enable = true;
      autocd = true;
      dotDir = ".config/zsh";
      defaultKeymap = "viins";
      autosuggestion = {
        enable = true;
      };
      history = {
        save = 1000000;
        size = 1000000;
        expireDuplicatesFirst = true;
        path = "${config.xdg.dataHome}/zsh/zsh_history";
      };
      initExtra = ''
        source ~/.config/zsh/zsh-settings.zsh
      '';
      plugins =
        [
          {
            name = "fast-syntax-highlighting";
            file = "~/.config/zsh/fsh/fast-syntax-highlighting.plugin.zsh";
            src = pkgs.zsh-fast-syntax-highlighting;
          }
        ];
    };
    home.packages = with pkgs; [
        zathura
        fzf
        lf
        curl
        wget
        unzip
    ];
  };
}
