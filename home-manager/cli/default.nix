{ pkgs, lib, ... }: {
  imports = [
    ./fastfetch.nix
    ./kitty.nix
    #./nvim.nix
    ./zsh.nix
  ];
  cli = {
      fastfetch.enable =
        mkDefault true;
        };
}
