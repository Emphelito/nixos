{ pkgs, lib, ... }: {
  imports = [
    ./hyprland.nix
    #./ags.nix
    ./extras.nix
  ];
}
