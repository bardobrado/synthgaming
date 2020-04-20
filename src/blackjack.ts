'use strict';
import {
    Engine
} from "../node_modules/@babylonjs/core/Engines/engine";
import {
    Vector3, Color3, Color4, Vector4
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
    HighlightLayer, StandardMaterial, Texture, AssetContainer
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

import { BoxBuilder } from  "../node_modules/@babylonjs/core/Meshes/Builders/boxBuilder";


import Game from "./gameCore.js";

import Deck from "./deck";

import Player from "./player";

import Card from "./card";

export default class Blackjack {

    public button_exit: Button;
    public button_restart: Button;
    public button_stay: Button;
    public button_hit: Button;

    public columns: number = 13;
    public rows: number = 4;

    public phit : number = 0;
    public hit_bt : number = 0;
    public playerCards : Array<Card>;
    public npcCards : Array<Card>;


    public createPrimaryMenu(scene: Scene) {

        var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("GameBJMenu", true, scene);

        this.button_exit = Button.CreateSimpleButton("button_exit", "Exit");
        this.button_exit.width = "100px"
        this.button_exit.height = "40px";
        this.button_exit.color = "Black";
        this.button_exit.cornerRadius = 3;
        this.button_exit.background = "magenta";
        this.button_exit.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.button_exit.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.button_exit.top = "-120px";
        this.button_exit.left = "80px";

        advancedTexture.addControl(this.button_exit);

        this.button_restart = Button.CreateSimpleButton("but", "Restart");
        this.button_restart.width = "100px"
        this.button_restart.height = "40px";
        this.button_restart.color = "Black";
        this.button_restart.cornerRadius = 3;
        this.button_restart.background = "magenta";
        this.button_restart.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.button_restart.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.button_restart.top = "-120px";
        this.button_restart.left = "-80px";

        advancedTexture.addControl(this.button_restart);

        this.button_stay = Button.CreateSimpleButton("but", "Stay");
        this.button_stay.width = "100px"
        this.button_stay.height = "40px";
        this.button_stay.color = "Black";
        this.button_stay.cornerRadius = 3;
        this.button_stay.background = "magenta";
        this.button_stay.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.button_stay.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.button_stay.top = "-190px";
        this.button_stay.left = "200px";

        advancedTexture.addControl(this.button_stay);

        this.button_hit = Button.CreateSimpleButton("but", "Hit");
        this.button_hit.width = "100px"
        this.button_hit.height = "40px";
        this.button_hit.color = "Black";
        this.button_hit.cornerRadius = 3;
        this.button_hit.background = "magenta";
        this.button_hit.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.button_hit.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.button_hit.top = "-190px";
        this.button_hit.left = "-200px";

        advancedTexture.addControl(this.button_hit);

        return scene;

    }

    public createNewGameBJ(player : Player, scene : Scene, material : StandardMaterial, container : AssetContainer) {

        let deckOfCards = new Deck(new Vector4(0 / (this.columns + 1), 0, 1 / (this.columns + 1), 1 / this.rows));
        let deck0 = deckOfCards.getDeck();

        var j = 0;
        for (var i = 0; i < this.rows; i++) {

            for (var x = 1; x < this.columns + 1; x++) {

                var FaceUV = new Array(6);
                FaceUV[0] = new Vector4(0 / (this.columns + 1), 0, 1 / (this.columns + 1), 1 / this.rows);
                FaceUV[1] = new Vector4((x) * (1 / (this.columns + 1)), i * (1 / this.rows), (x + 1) * (1 / (this.columns + 1)), (i + 1) * (1 / this.rows));
                deck0[j].setFaceUV(FaceUV);
                j++;

            }
        }

        deck0 = deckOfCards.shuffle(deck0);

        player.setTmpPoints(0);

        this.hit_bt = 0

        this.playerCards = new Array();
        this.npcCards = new Array();

        this.playerCards.push(this.createBoxCard(0,1,0,deck0, material, scene, container));
        this.hit_bt++;
        this.phit++;
        this.playerCards.push(this.createBoxCard(0,2,1,deck0, material, scene, container));
        this.hit_bt++;
        this.phit++;
        this.npcCards.push(this.createBoxCard(1,2,2,deck0, material, scene, container));
        this.hit_bt++;
        this.npcCards.push(this.createBoxCard(1,2,3,deck0, material, scene, container));
        this.hit_bt++;

    }

    public createBoxCard(code: number, phit : number, hit_bt: number, deck : Array<Card>, material: StandardMaterial, scene : Scene, container : AssetContainer) {
        
        let options = {
            width: 3,
            height: 4.3,
            depth: 0.1,
            faceUV: deck[hit_bt].getFaceUV()
        };

        let box = BoxBuilder.CreateBox("0", options,scene);
        box.material = material;

        let hl1 = new HighlightLayer("hl1", scene);
        if (deck[hit_bt].getSequence() <= 26) {
            hl1.addMesh(box, Color3.Magenta());
        } else {
            hl1.addMesh(box, new Color3(0,255,255));
        }

        container.meshes.push(box);
        deck[hit_bt].setBox(box);
        deck[hit_bt].getBox().isVisible = true;
        if (code == 0) {
            deck[hit_bt].getBox().position = new Vector3(((hit_bt)*4)-4,-3,0);
        } else
        {
            deck[hit_bt].getBox().position = new Vector3(((hit_bt-phit)*4)-4,3,0);
        }
        

        return deck[hit_bt];
    }

    public RunRenderLoop(engine: Engine) {
    
    }
}