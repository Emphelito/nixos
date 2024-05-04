{ pkgs, lib, ...}: {

    imports = [ 
     ./nvidia.nix
     ./sddm.nix
     ./vm.nix
    ];
}
