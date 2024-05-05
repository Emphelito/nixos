{ inputs, ... }: {
  imports = [
    ../../home-manager
  ];

  home = {
    username = "emph";
    homeDirectory = "/home/emph";
    stateVersion = "23.11";
  };


  steam.enable = true;


  nixpkgs.config.allowUnfree = true;
}
