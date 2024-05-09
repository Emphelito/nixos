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

  users.users."emph" = {
    isNormalUser = true;
    extraGroups = [ "wheel" "audio" "power" ];
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
      desktop.enable = true;
    };
  };

  networking.hostName = "loki";

  nixpkgs.config.allowUnfree = true;

  system.stateVersion = "23.11";
}
