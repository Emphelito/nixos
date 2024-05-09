{
  description = "Emph`s nix config";

  inputs = {
    # Nixpkgs
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    hyprland.url = "github:hyprwm/Hyprland";
    hyprland-plugins = {
      url = "github:hyprwm/hyprland-plugins";
      inputs.hyprland.follows = "hyprland";
    };

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    catppuccin-palette = {
      url = "github:catppuccin/palette";
      flake = false;
    };

    catppuccin-zathura = {
      url = "github:catppuccin/zathura";
      flake = false;
    };

    catppuccin-zsh-fsh = {
      url = "github:catppuccin/zsh-fsh";
      flake = false;
    };
    matugen = {
      url = "github:/InioX/Matugen";
    };

    ags.url = "github:Aylur/ags";
  };

  outputs =
    { self
    , nixpkgs
    , home-manager
    , ...
    } @ inputs:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      specialArgs = { inherit inputs; };
    in
    {
      nixosConfigurations = {
        aegir = nixpkgs.lib.nixosSystem {
          specialArgs = { inherit inputs; };
          modules = [
            ./hosts/aegir/configuration.nix
          ];
        };
        loki = nixpkgs.lib.nixosSystem {
          #specialArgs = { inherit inputs; };
          #pkgs = import nixpkgs { inherit system; };
          modules = [
            ./hosts/loki/configuration.nix
            home-manager.nixosModules.home-manager{
                home-manager.extraSpecialArgs = specialArgs;
            }
          ];
        };
      };
    };
}
