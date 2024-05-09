{ inputs
, lib
, config
, pkgs
, ...
}: {
  imports = [
    ./hardware-configuration.nix
    inputs.home-manager.nixosModules.default
    ./../../nixos
  ];

  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  nix = {
    settings = {
      experimental-features = "nix-command flakes";
    };
  };

  home-manager = {
    users."emph" = {
      home = {
        username = "emph";
        homeDirectory = "/home/emph";
        stateVersion = "23.11";
      };
      imports = [
        ./../../home-manager
      ];
      cli = {
          kitty.enable = true;
      };
      desktop = {
          hypr.enable = true; 
      };
    };
  };

  users.users."emph" = {
    isNormalUser = true;
    programs.zsh.enable = true;
    shell = pkgs.zsh;
    extraGroups = [ "wheel" "audio" "power" ];
  };

  networking.hostName = "loki";

  nixpkgs.config.allowUnfree = true;

  system.stateVersion = "23.11";
}
