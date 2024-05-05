{ pkgs, lib, ... }: {

  imports = [
    # ./nvidia.nix
    #./sddm.nix
    #./vm.nix
  ];

  environment.systemPackages = with pkgs; [
    git
    vim
  ];
}
