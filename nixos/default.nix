{ pkgs, lib, ... }: {

  imports = [
    ./services
    ./font.nix
    ./locale.nix
    ./nvidia.nix
    #./sddm.nix
    #./vm.nix
  ];
}
