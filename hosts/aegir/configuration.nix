{ inputs
, lib
, config
, pkgs
, ...
}: {
  imports = [
    ./hardware-configuration.nix
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
    shell = pkgs.zsh;
    extraGroups = [ "wheel, audio, power" ];
  };

  home-manager = {
    users."emph" = import ./home.nix;
    };

  networking.hostName = "aegir";

  nixpkgs.config.allowUnfree = true;

  system.stateVersion = "23.11";
}
