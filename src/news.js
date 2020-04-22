'use strict';
import { AdvancedDynamicTexture } from "../node_modules/@babylonjs/gui/2D/advancedDynamicTexture";
import { Rectangle } from "../node_modules/@babylonjs/gui/2D/controls/index";
import { Control } from "../node_modules/@babylonjs/gui/2D/controls/index";
export default class News {
    constructor() {
    }
    CreateCarrouselMenu(scene) {
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("NewsMenu", false, scene);
        this.menuLayer = new Rectangle();
        // this.menuLayer.top = "30px";
        this.menuLayer.width = "650px";
        this.menuLayer.height = "300px";
        this.menuLayer.cornerRadius = 3;
        this.menuLayer.color = "Black";
        this.menuLayer.thickness = 2;
        this.menuLayer.background = "White";
        this.menuLayer.alpha = .4;
        this.menuLayer.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.menuLayer.top = "250px";
        this.advancedTexture.addControl(this.menuLayer);
    }
}
