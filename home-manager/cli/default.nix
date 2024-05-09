{ pkgs, lib, ... }: {
  imports = [
    ./fastfetch.nix
    ./kitty.nix
    ./nvim.nix
    ./zsh.nix
    ./git.nix
  ];
  cli = {
    fastfetch.enable =
      lib.mkDefault true;

    zsh.enable =
      lib.mkDefault true;

    nvim.enable =
      lib.mkDefault true;
  };
}
