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

  programs.zsh.enable = true;

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
    extraGroups = [ "wheel" "audio" "power" "video" "networkmanager" ];
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
    };
  };

  networking.hostName = "loki";

  nixpkgs.config.allowUnfree = true;

  system.stateVersion = "23.11";
}
