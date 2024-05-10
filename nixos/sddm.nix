{ pkgs, config, lib, ... }: {

  options = {
    sddmMod.enable =
      lib.mkEnableOption "SDDM Enabled";
  };

  config = lib.mkIf config.sddmMod.enable {

    services.xserver.displayManager.sddm.enable = true;
  };

}
