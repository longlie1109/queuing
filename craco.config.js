const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#FF9138",

              "@height-lg": "44px",
              "@border-width-base": "1.5px",
              //control
              "@control-border-radius": "8px",
              //btn
              "@btn-border-radius-base": "8px",
              "@btn-font-weight": 700,
              //input
              "@input-border-color": "#D4D4D7",
              "@input-disabled-bg": "#EAEAEC",
              //select
              "@select-single-item-height-lg": "44px",
              "@select-multiple-item-height-lg": "44px",
              "@select-dropdown-height": "44px",
              "@select-dropdown-line-height": "44px",
              "@select-dropdown-font-size": "16px",
              //layout
              "@layout-body-background": "#F6F6F6",
              "@layout-header-background": "#ffffff",
              //form
              "@form-item-label-font-size": "18px",
              //menu
              "@menu-item-color": "#7E7D88",
              "@menu-item-active-bg": "#FF7506",
              "@menu-item-font-size": "16px",
              "@menu-item-height": "48px",
              "@menu-item-boundary-margin": 0,
              //typography
              "@typography-title-font-weight": 700,
              //table
              "@table-header-bg": "#FF9138",
              "@table-header-color": "#FFFFFF ",
              "@table-border-radius-base": "10px",
              "@table-padding-horizontal": "32px",
              //card
              "@card-radius": "16px",
              //checkBox
              "@checkbox-size": "20px",
              "@checkbox-color": "#4277FF",
              "@checkbox-border-radius": "4px",
              //List
              "@list-header-background": "#FF9138",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
