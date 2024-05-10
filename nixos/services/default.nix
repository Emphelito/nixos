{ pkgs, lib, ... }: {
  imports = [
  ./network.nix
  ./pipewire.nix
  ./polkit.nix
  ./xdg-portal.nix
  ];
}
