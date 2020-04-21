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
    HighlightLayer, StandardMaterial, Texture
} from "../node_modules/@babylonjs/core/index"

import {
    AdvancedDynamicTexture
} from "../node_modules/@babylonjs/gui/2D/advancedDynamicTexture";

import {
    Image
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

import {AssetContainer} from "../node_modules/@babylonjs/core/assetContainer"

import BlackJack from "./blackjack.js"

export default class Game {
    scene: Scene;
    // private _advancedTexture: AdvancedDynamicTexture;
    public buttonBJ: Button;
    clickedBJ: boolean = false;
    // public clickedBJ : boolean = false;
    public hl1 : HighlightLayer;
    public materialCard: StandardMaterial;
    public container : AssetContainer;


    public createBackgroundScene(_engine: Engine) {

        this.scene = new Scene(_engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);

        let _camera = new ArcRotateCamera("gameCamera", 0, 0, 0, new Vector3(0, 5, -10), this.scene);
        _camera.setPosition(new Vector3(0, 1, -40));
        _camera.setTarget(Vector3.Zero());

        let _light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
        _light.intensity = 0.49;

        let tetraMaterial = new GridMaterial("TetraGrid", this.scene);

        let tetra = Mesh.CreatePolyhedron("tetra", { type: 0, size: 3 }, this.scene);

        tetra.position.y = 4.8;
        tetra.position.z = -15;
        tetra.rotation.z = Math.PI / 2;
        tetra.rotation.x = 4 * Math.PI / 3;

        this.hl1 = new HighlightLayer("hl1", this.scene);
        this.hl1.addMesh(tetra, Color3.Magenta());

        tetra.material = tetraMaterial;

        let groundMaterial = new GridMaterial("grid", this.scene);
        groundMaterial.lineColor = new Color3(2, 2, 4);

        let ground = Mesh.CreateGround("ground", 600, 600, 3, this.scene);
        ground.material = groundMaterial;

        let _advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UIMenu", true, this.scene);

        let titleImage = new Image("title", "./../res/Title.png");

        titleImage.width = "800px";
        titleImage.height = "300px";
        titleImage.top = "-50px";
        titleImage.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        titleImage.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        _advancedTexture.addControl(titleImage);

        this.materialCard = new StandardMaterial('mat', this.scene);
        let texture = new Texture("../res/Deck3.png", this.scene);
        this.materialCard.diffuseTexture = texture;
        this.materialCard.diffuseTexture.hasAlpha = false;
        this.materialCard.backFaceCulling = false;

        this.container = new AssetContainer(this.scene);

        // let backMusic = new Sound("Music", "./../res/raia-bellzy.wav", scene, null, {
        //     loop: true,
        //     autoplay: true
        // });

        let alpha = 0;

        this.scene.registerBeforeRender(() => {



            tetra.rotation.y += 0.005;

            alpha += 0.03;
            this.hl1.blurHorizontalSize = 0.3 + Math.cos(alpha) * 0.6 + 0.6;
            this.hl1.blurVerticalSize = 0.3 + Math.sin(alpha / 3) * 0.6 + 0.6;
        });

    }

    public createNewScene(_engine: Engine) {
        var scene = new Scene(_engine);
        scene.autoClear = false;

        var camera = new ArcRotateCamera("gameCamera", 0, 0, 0, new Vector3(0, 5, -10), scene);
        camera.setPosition(new Vector3(0, 1, -40));
        camera.setTarget(Vector3.Zero());

        var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        light.intensity = 0.49;

        // let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UIMenu", true, this.scene);

        return scene;
    }

    public createPrimaryMenu(scene: Scene) {

        var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("PrimaryUI", true, scene);

        this.buttonBJ = Button.CreateSimpleButton("butBJ", "BlackJack");
        this.buttonBJ.width = "250px";
        this.buttonBJ.height = "80px";
        this.buttonBJ.color = "Black";
        this.buttonBJ.cornerRadius = 3;
        this.buttonBJ.background = "magenta";
        this.buttonBJ.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.buttonBJ.left = "50px";

        this.buttonBJ.onPointerMoveObservable.add(function () {
            textblock.text = "Click to Play BlackJack"
        });
        this.buttonBJ.onPointerOutObservable.add(function () {
            textblock.text = "";
        });

        advancedTexture.addControl(this.buttonBJ);

        var textblock = new TextBlock("textblock", "");
        textblock.width = 0.2;
        textblock.height = "40px";
        textblock.color = "White";
        advancedTexture.addControl(textblock);

        return scene;

    }

    public removeAll () {
        this.container.removeAllFromScene();
        this.container.dispose();
        HighlightLayer.GlowingMeshStencilReference = 2;
    }

}