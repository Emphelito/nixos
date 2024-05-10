return {
    "nvim-treesitter/nvim-treesitter",
    config = function()
        local config = require("nvim-treesitter.configs")
        config.setup({
            ensure_installed = { "c", "lua", "vim", "vimdoc", "query", "regex", "bash", "markdown", "markdown_inline", "nix" },
            sync_install = false,
            auto_install = true,
            ignore_install = { "latex" },

            indent = { enable = true },
            highlight = { enable = true },
        })
    end,
}
