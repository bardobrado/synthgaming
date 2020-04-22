'use strict';
import { Vector3, Color3, Color4 } from "../node_modules/@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "../node_modules/@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "../node_modules/@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "../node_modules/@babylonjs/core/Meshes/mesh";
import { GridMaterial } from "../node_modules/@babylonjs/materials/grid/index";
import { HighlightLayer, StandardMaterial, Texture, ParticleSystem } from "../node_modules/@babylonjs/core/index";
import { AdvancedDynamicTexture } from "../node_modules/@babylonjs/gui/2D/advancedDynamicTexture";
import { Image } from "../node_modules/@babylonjs/gui/2D/controls/index";
import { Scene } from "../node_modules/@babylonjs/core/scene";
import { Control } from "../node_modules/@babylonjs/gui/2D/controls/index";
import { Button } from "../node_modules/@babylonjs/gui/2D/controls/button";
import { TextBlock } from "../node_modules/@babylonjs/gui/2D/controls/textBlock";
import { AssetContainer } from "../node_modules/@babylonjs/core/assetContainer";
export default class Game {
    constructor() {
        this.clickedBJ = false;
    }
    createBackgroundScene(_engine) {
        this.scene = new Scene(_engine);
        // this.scene.ambientColor = new Color3(1, 1, 1);
        let _camera = new ArcRotateCamera("gameCamera", 0, 0, 0, new Vector3(0, 5, -10), this.scene);
        _camera.setPosition(new Vector3(0, 1, -40));
        _camera.setTarget(Vector3.Zero());
        let _light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
        _light.intensity = 0.5;
        let tetraMaterial = new GridMaterial("TetraGrid", this.scene);
        // var tetraMaterial = new StandardMaterial("myMaterial", this.scene);
        // tetraMaterial.diffuseColor = new Color3(2.5, 2.5, 2.5);
        // tetraMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
        // tetraMaterial.emissiveColor = new Color3(1, 1, 1);
        // tetraMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
        let tetra = Mesh.CreatePolyhedron("tetra", { type: 0, size: 3 }, this.scene);
        tetra.position.y = 4.8;
        tetra.position.z = -15;
        tetra.rotation.z = Math.PI / 2;
        tetra.rotation.x = 4 * Math.PI / 3;
        this.hl1 = new HighlightLayer("hl1", this.scene);
        tetra.material = tetraMaterial;
        this.particleSystem = new ParticleSystem("particles", 3000, this.scene);
        this.particleSystem.particleTexture = new Texture("./../res/particle.png", this.scene);
        this.particleSystem.textureMask = new Color4(0, 0, 0, 1.0);
        this.particleSystem.emitter = new Vector3(-70, 10, 0); // the starting object, the emitter
        this.particleSystem.minEmitBox = new Vector3(-100, 5, -20); // Starting all from
        this.particleSystem.maxEmitBox = new Vector3(100, 100, 70); // To...
        this.particleSystem.direction1 = new Vector3(-70, 8, 3);
        this.particleSystem.direction2 = new Vector3(70, 8, -3);
        this.particleSystem.minLifeTime = 3;
        this.particleSystem.maxLifeTime = 4;
        this.particleSystem.minSize = .3;
        this.particleSystem.maxSize = .5;
        this.particleSystem.color1 = new Color4(0.1, 0.1, 0.1, 1.0);
        this.particleSystem.color2 = new Color4(0.2, 0.2, 0.2, 1.0);
        this.particleSystem.colorDead = new Color4(0, 0, 0.0, 1);
        this.particleSystem.gravity = new Vector3(0, -9.81, 0);
        this.particleSystem.minEmitPower = 2;
        this.particleSystem.maxEmitPower = 4;
        this.particleSystem.updateSpeed = 0.005;
        this.particleSystem.start();
        let groundMaterial = new GridMaterial("grid", this.scene);
        // groundMaterial.lineColor = new Color3(.9, .9, .9);
        // groundMaterial.mainColor = new Color3(.8, .8, .8);;
        groundMaterial.lineColor = new Color3(2, 2, 4);
        let ground = Mesh.CreateGround("ground", 600, 600, 3, this.scene);
        ground.material = groundMaterial;
        this.hl1.addMesh(ground, Color3.Gray());
        let _advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UIMenu", true, this.scene);
        let titleImageTech = new Image("title", "./../res/Title2.png");
        titleImageTech.width = "800px";
        titleImageTech.height = "300px";
        titleImageTech.top = "-50px";
        titleImageTech.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        titleImageTech.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        let titleImageRetro = new Image("title", "./../res/Title.png");
        titleImageRetro.width = "800px";
        titleImageRetro.height = "300px";
        titleImageRetro.top = "-50px";
        titleImageRetro.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        titleImageRetro.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.materialCard = new StandardMaterial('mat', this.scene);
        let texture = new Texture("../res/Deck5.png", this.scene);
        this.materialCard.diffuseTexture = texture;
        this.materialCard.diffuseTexture.hasAlpha = false;
        this.materialCard.backFaceCulling = false;
        this.container = new AssetContainer(this.scene);
        // let backMusic = new Sound("Music", "./../res/raia-bellzy.wav", scene, null, {
        //     loop: true,
        //     autoplay: true
        // });
        let alpha = 0;
        let beta = 0;
        this.scene.registerBeforeRender(() => {
            // console.log(((Math.cos(alpha)) * 100) % 10 );
            if (((Math.cos(alpha)) * 100) % 10 > 8) {
                _advancedTexture.removeControl(titleImageTech);
                _advancedTexture.addControl(titleImageRetro);
                // this.scene.clearColor = new Color4(0, 0, 0, 1);
                // this.scene.ambientColor = new Color3(0, 0, 0);
                // groundMaterial.lineColor = new Color3(2, 2, 4);
                // groundMaterial.mainColor = new Color3(0, 0, 0);
                tetraMaterial.lineColor = new Color3(0, .9, .9);
                tetraMaterial.mainColor = new Color3(0, 0, 0);
                this.hl1.addMesh(tetra, Color3.Magenta());
            }
            else {
                _advancedTexture.removeControl(titleImageRetro);
                _advancedTexture.addControl(titleImageTech);
                this.scene.clearColor = new Color4(0, 0, 0, .1);
                this.scene.ambientColor = new Color3(0, 0, 0);
                groundMaterial.lineColor = new Color3(.9, .9, .9);
                groundMaterial.mainColor = new Color3(.8, .8, .8);
                ;
                tetraMaterial.lineColor = new Color3(.7, .7, .7);
                tetraMaterial.mainColor = new Color3(.7, .7, .7);
                this.hl1.addMesh(tetra, Color3.Gray());
            }
            // _camera.rotation.y -= 0.005;
            ground.rotation.y += 0.003;
            tetra.rotation.y -= 0.005;
            alpha += 0.01;
            if (alpha > 0) {
                alpha = -90;
            }
            else if (alpha < -10) {
                alpha = -10;
            }
            beta += 0.03;
            this.hl1.blurHorizontalSize = 0.3 + Math.cos(beta) * 0.6 + 0.6;
            this.hl1.blurVerticalSize = 0.3 + Math.sin(beta / 3) * 0.6 + 0.6;
        });
    }
    createNewScene(_engine) {
        var scene = new Scene(_engine);
        scene.autoClear = false;
        var camera = new ArcRotateCamera("gameCamera", 0, 0, 0, new Vector3(0, 5, -10), scene);
        camera.setPosition(new Vector3(0, 1, -40));
        camera.setTarget(Vector3.Zero());
        var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        light.intensity = 2;
        // let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UIMenu", true, this.scene);
        return scene;
    }
    createPrimaryMenu(scene) {
        var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("PrimaryUI", true, scene);
        this.buttonBJ = Button.CreateSimpleButton("butBJ", "BlackJack");
        this.buttonBJ.width = "250px";
        this.buttonBJ.height = "80px";
        this.buttonBJ.color = "Black";
        this.buttonBJ.fontFamily = "Monospace";
        this.buttonBJ.fontSizeInPixels = 30;
        this.buttonBJ.fontStyle = "bold";
        this.buttonBJ.cornerRadius = 3;
        this.buttonBJ.background = "gray";
        this.buttonBJ.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.buttonBJ.left = "-200px";
        this.buttonBJ.onPointerMoveObservable.add(function () {
            textblock.text = "Click to Play BlackJack";
        });
        this.buttonBJ.onPointerOutObservable.add(function () {
            textblock.text = "";
        });
        advancedTexture.addControl(this.buttonBJ);
        this.buttonPkr = Button.CreateSimpleButton("butBJ", "Poker");
        this.buttonPkr.width = "250px";
        this.buttonPkr.height = "80px";
        this.buttonPkr.color = "Black";
        this.buttonPkr.fontFamily = "Monospace";
        this.buttonPkr.fontSizeInPixels = 30;
        this.buttonPkr.fontStyle = "bold";
        this.buttonPkr.cornerRadius = 3;
        this.buttonPkr.background = "gray";
        this.buttonPkr.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.buttonPkr.left = "200px";
        this.buttonPkr.onPointerMoveObservable.add(function () {
            textblock.text = "Click to Play Poker";
        });
        this.buttonPkr.onPointerOutObservable.add(function () {
            textblock.text = "";
        });
        advancedTexture.addControl(this.buttonPkr);
        var textblock = new TextBlock("textblock", "");
        textblock.width = "450px";
        textblock.height = "40px";
        textblock.color = "White";
        textblock.outlineWidth = 2;
        textblock.outlineColor = "black";
        textblock.fontFamily = "Monospace";
        textblock.fontSizeInPixels = 30;
        textblock.fontStyle = "bold";
        textblock.top = "-70px";
        advancedTexture.addControl(textblock);
        return scene;
    }
    removeAll() {
        this.container.removeAllFromScene();
        this.container.dispose();
        HighlightLayer.GlowingMeshStencilReference = 2;
    }
}
