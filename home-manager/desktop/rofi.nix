{pkgs, input, lib, config, ... }: {
    home.packages = with pkgs; [
    rofi-wayland 
    ];
}
