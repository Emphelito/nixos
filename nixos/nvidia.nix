{pkgs, lib, config, ...}: {

    options = {
        nvidiaMod.enable = 
            lib.mkEnableOption "enable nvidiaMod";
    };

    config = lib.mkIf config.nvidiaMod.enable {
        hardware.opengl = {
            enable = true;
            driSupport = true;
            driSupport32Bit = true;
        };

        services.xserver.videoDrivers = ["nvidia"];
        hardware.nvidia.modesetting.enable = true;
    };
} 
