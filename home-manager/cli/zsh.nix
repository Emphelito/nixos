{ config
, lib
, pkgs
, ...
}: {
  options = {
    cli.zsh = {
      enable =
        lib.mkEnableOption "zsh" true;
      enableNixShellPlugin =
        lib.mkEnableOption "zsh nix shell plugin" true;
    };
  };

  config = lib.mkIf config.shell.zsh.enable {
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
            name = "fzf-tab";
            file = "share/fzf-tab/fzf-tab.plugin.zsh";
            src = pkgs.zsh-fzf-tab;
          }
          {
            name = "fast-syntax-highlighting";
            file = "share/zsh/site-functions/fast-syntax-highlighting.plugin.zsh";
            src = pkgs.zsh-fast-syntax-highlighting;
          }
        ]
        ++ (
          if config.shell.zsh.enableNixShellPlugin
          then [
            {
              name = "nix-shell";
              file = "share/zsh-nix-shell/nix-shell.plugin.zsh";
              src = pkgs.zsh-nix-shell;
            }
          ]
          else [ ]
        );
    };
  };
  }
