{ pkgs, lib, ... }: {
  fonts.packages = with pkgs; [
    (pkgs.nerdfonts.override { fonts = [ "JetBrainsMono" "FiraCode" ]; })
    cm_unicode
    corefonts
  ];

  fonts.enableDefaultPackages = true;
  fonts.fontconfig = {
    defaultFonts = {
      monospace = [ "JetBrainsMono Nerd Font Mono" ];
      sansSerif = [ "JetBrainsMono Nerd Font" ];
      serif = [ "JetBrainsMono Nerd Font" ];
    };
  };
}
