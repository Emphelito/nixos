{ pkgs, lib, ... }: {
  imports = [
    ./apps
    ./cli
    ./games
    #./scripts
    ./desktop
  ];
}
