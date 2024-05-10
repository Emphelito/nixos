{pkgs, ... }: {
    home.packages = with pkgs; [
      font-awesome
      fira-code-symbols
      material-design-icons
      (nerdfonts.override {fonts = ["FiraMono" "JetBrainsMono"];})
      powerline-symbols
    ];
}
