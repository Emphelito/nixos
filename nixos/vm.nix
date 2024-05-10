{ pkgs, lib, config, ... }: {

  options = {
    vmMod.enable =
      lib.mkEnableOption "Virt Enabled";
  };

  config = lib.mkIf config.vmMod.enable {
    programs.virt-manager.enable = true;
    virtualisation = {
      docker.enable = true;
      libvirtd.enable = true;
    };
  };
}
