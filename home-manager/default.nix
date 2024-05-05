{ pkgs, lib, ... }: {
  imports = [
    ./apps
    ./cli
    ./games
    #./scripts
    #./wm
  ];
}
