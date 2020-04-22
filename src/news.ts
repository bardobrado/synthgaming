'use strict';
import {
    Engine
} from "../node_modules/@babylonjs/core/Engines/engine";
import {
    Vector3, Color3, Color4
} from "../node_modules/@babylonjs/core/Maths/math";
import {
    ArcRotateCamera
} from "../node_modules/@babylonjs/core/Cameras/arcRotateCamera";
import {
    HemisphericLight
} from "../node_modules/@babylonjs/core/Lights/hemisphericLight";
import {
    Mesh
} from "../node_modules/@babylonjs/core/Meshes/mesh";

import {
    GridMaterial
} from "../node_modules/@babylonjs/materials/grid/index";

import {
    Sound
} from "../node_modules/@babylonjs/core/Audio/index"

import {
    HighlightLayer, StandardMaterial, Texture, ParticleSystem
} from "../node_modules/@babylonjs/core/index"

import {
    AdvancedDynamicTexture
} from "../node_modules/@babylonjs/gui/2D/advancedDynamicTexture";

import {
    Image, Rectangle
} from "../node_modules/@babylonjs/gui/2D/controls/index";

import {
    Scene
} from "../node_modules/@babylonjs/core/scene";

import {
    Control
} from "../node_modules/@babylonjs/gui/2D/controls/index"

import {
    Button
} from "../node_modules/@babylonjs/gui/2D/controls/button"

import {
    TextBlock
} from "../node_modules/@babylonjs/gui/2D/controls/textBlock"

import { AssetContainer } from "../node_modules/@babylonjs/core/assetContainer"

export default class News {
    
    menuLayer : Rectangle;
    advancedTexture: AdvancedDynamicTexture;
    constructor(){

    }

    public CreateCarrouselMenu(scene: Scene) {

        

        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("NewsMenu", false, scene);

        this.menuLayer = new Rectangle();
        // this.menuLayer.top = "30px";
        this.menuLayer.width = "650px";
        this.menuLayer.height = "300px";
        this.menuLayer.cornerRadius =3;
        this.menuLayer.color = "Black";
        this.menuLayer.thickness = 2;
        this.menuLayer.background = "White";
        this.menuLayer.alpha = .4;
        this.menuLayer.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.menuLayer.top = "250px";

        this.advancedTexture.addControl(this.menuLayer)

    }
}