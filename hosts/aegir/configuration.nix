{ inputs
, lib
, config
, pkgs
, ...
}: {
  imports = [
    /etc/nixos/hardware-configuration.nix
    inputs.home-manager.nixosModules.default
    ./../../nixos
  ];

  environment.systemPackages = with pkgs; [
    home-manager
    neovim
    git
    wget
    curl
  ];

  programs = {
    home-manager.enable = true;
  };

  programs.virt-manager.enable = true;
  virtualisation = {
    docker.enable = true;
    libvirtd.enable = true;
  };

  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  hardware.bluetooth = {
    enable = true;
    powerOnBoot = false;
  };

  nix = {
    settings = {
      experimental-features = "nix-command flakes";
    };
  };

  programs.zsh.enable = true;

  users.users."emph" = {
    isNormalUser = true;
    shell = pkgs.zsh;
    extraGroups = [ "wheel" "audio" "power" "video" "libvirtd" "docker" ];
  };

  home-manager = {
    extraSpecialArgs = { inherit inputs; };
    users."emph" = {
      home = {
        username = "emph";
        homeDirectory = "/home/emph";
        stateVersion = "23.11";
      };
      imports = [
        ./../../home-manager
      ];
      nvidiaMod.enable = true;
      cli = {
        kitty.enable = true;
      };
      desktop.enable = true;
      game.enable = true;
    };
  };

  networking.hostName = "aegir";

  nixpkgs.config.allowUnfree = true;

  system.stateVersion = "23.11";
}
