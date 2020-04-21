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
    HighlightLayer, StandardMaterial, Texture, AssetContainer, Material
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

import { BoxBuilder } from "../node_modules/@babylonjs/core/Meshes/Builders/boxBuilder";


import Game from "./gameCore.js";

import Deck from "./deck";

import Player from "./player";

import Card from "./card";
import Npc from "./npc";

export default class Blackjack {

    public button_exit: Button;
    public button_restart: Button;
    public button_stay: Button;
    public button_hit: Button;

    public cant_hit: boolean;
    public cant_stay: boolean;

    public HitBtBj: boolean;
    public StayBtBj: boolean;

    public deck0: Array<Card>;

    public columns: number;
    public rows: number;

    public phit: number;
    public hit_bt: number;
    public playerCards: Array<Card>;
    public npcCards: Array<Card>;

    public textStatus: TextBlock;
    public textPointsPlayer: TextBlock;
    public textPointsNpc: TextBlock;

    public gameStatus: boolean;

    constructor() {
        this.HitBtBj = false;
        this.StayBtBj = false;
        this.gameStatus = true;
        this.columns = 13;
        this.rows = 4;
        this.phit = 0;
        this.hit_bt = 0;
        this.cant_hit = false;
        this.cant_stay = false;

    }


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

    public addDisplayRecords(scene: Scene, npc: Npc, player: Player) {
        let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UIMenu", true, scene);

        this.textStatus = new TextBlock();
        this.textStatus.text = "";
        this.textStatus.color = "white";
        this.textStatus.fontSize = 24;
        this.textStatus.left = - 0;
        this.textStatus.top = -0;
        advancedTexture.addControl(this.textStatus);


        this.textPointsPlayer = new TextBlock();
        this.textPointsPlayer.text = "Points: " + player.tempPoints();
        this.textPointsPlayer.color = "white";
        this.textPointsPlayer.fontSize = 24;
        this.textPointsPlayer.left = 0;
        this.textPointsPlayer.top = 180;
        advancedTexture.addControl(this.textPointsPlayer);

        this.textPointsNpc = new TextBlock();
        this.textPointsNpc.text = "Computer Points: " + npc.tempPoints();
        this.textPointsNpc.color = "white";
        this.textPointsNpc.fontSize = 24;
        this.textPointsNpc.left = 0;
        this.textPointsNpc.top = -180;
        this.textPointsNpc.isVisible = false;
        advancedTexture.addControl(this.textPointsNpc);
    }



    public createNewGameBJ(hl1: HighlightLayer, player: Player, scene: Scene, material: StandardMaterial, container: AssetContainer) {

        let deckOfCards = new Deck(new Vector4(0 / (this.columns + 1), 0, 1 / (this.columns + 1), 1 / this.rows));
        this.deck0 = deckOfCards.getDeck();

        var j = 0;
        for (var i = 0; i < this.rows; i++) {

            for (var x = 1; x < this.columns + 1; x++) {

                var FaceUV = new Array(6);
                FaceUV[0] = new Vector4(0 / (this.columns + 1), 0, 1 / (this.columns + 1), 1 / this.rows);
                FaceUV[1] = new Vector4((x) * (1 / (this.columns + 1)), i * (1 / this.rows), (x + 1) * (1 / (this.columns + 1)), (i + 1) * (1 / this.rows));
                this.deck0[j].setFaceUV(FaceUV);
                j++;

            }
        }

        this.deck0 = deckOfCards.shuffle(this.deck0);

        player.setTmpPoints(0);

        this.textStatus.text = "";
        this.textPointsNpc.text = "";
        this.gameStatus = true;
        this.hit_bt = 0
        this.phit = 0;
        this.cant_hit = false;
        this.cant_stay = false;

        this.playerCards = new Array();
        this.npcCards = new Array();

        this.playerCards.push(this.createBoxCard(hl1, 0, 1, 0, this.deck0, scene, material, container));
        this.hit_bt++;
        this.phit++;
        this.playerCards.push(this.createBoxCard(hl1, 0, 2, 1, this.deck0, scene, material, container));
        this.hit_bt++;
        this.phit++;
        this.npcCards.push(this.createBoxCard(hl1, 1, 2, 2, this.deck0, scene, material, container));
        this.hit_bt++;
        this.npcCards.push(this.createBoxCard(hl1, 1, 2, 3, this.deck0, scene, material, container));
        this.hit_bt++;

    }

    public createBoxCard(hl1: HighlightLayer, code: number, phit: number, hit_bt: number, deck: Array<Card>, scene: Scene, material: StandardMaterial, container: AssetContainer) {

        let options = {
            width: 3,
            height: 4.3,
            depth: 0.1,
            faceUV: deck[hit_bt].getFaceUV()
        };

        let box = BoxBuilder.CreateBox("0", options, scene);
        box.material = material;

        hl1 = new HighlightLayer("hl1", scene);
        if (deck[hit_bt].getSequence() <= 26) {
            hl1.addMesh(box, Color3.Magenta());
        } else {
            hl1.addMesh(box, new Color3(0, 255, 255));
        }
        container.effectLayers.push(hl1);
        container.meshes.push(box);

        deck[hit_bt].setBox(box);
        deck[hit_bt].getBox().isVisible = true;
        if (code == 0) {
            if (hit_bt < 4) {
                deck[hit_bt].getBox().position = new Vector3(((hit_bt) * 4) - 5, -3, 0);
            } else {
                deck[hit_bt].getBox().position = new Vector3(((hit_bt - 2) * 4) - 5, -3, 0);
            }
        } else {

            deck[hit_bt].getBox().rotation.y = Math.PI;
            deck[hit_bt].getBox().position = new Vector3((((hit_bt-phit) * 4) - 5), 3, 0);
            
        }

        return deck[hit_bt];
    }

    public calculatePlayerPoints(player: Player) {

        let playerAses = 0;
        player.setTmpPoints(0);

        for (let i = 0; i < this.playerCards.length; i++) {
            if (this.playerCards[i].getValue() === "A") {
                playerAses++;
            }
        }

        for (let i = 0; i < this.playerCards.length; i++) {
            if (this.playerCards[i].getValue() === "A") {
                if (playerAses == 1) {
                    player.setTmpPoints(player.tempPoints() + 11);

                } else {
                    player.setTmpPoints(player.tempPoints() + 1);
                }

            } else if (this.playerCards[i].getValue() === "10" ||
                this.playerCards[i].getValue() === "J" ||
                this.playerCards[i].getValue() === "Q" ||
                this.playerCards[i].getValue() === "K") {

                player.setTmpPoints(player.tempPoints() + 10);


            }
            else {
                player.setTmpPoints(player.tempPoints() + parseInt(this.playerCards[i].getValue()));
            }
        }
        if (player.tempPoints() > 21 && playerAses == 1) {
            player.setTmpPoints(player.tempPoints() - 10);
        }

        return player.tempPoints();

    }

    public calculateNewHit(hl1: HighlightLayer, player: Player, scene: Scene, material: StandardMaterial, container: AssetContainer) {
        if (!this.cant_hit) {
            if (player.tempPoints() < 21 && !this.StayBtBj) {
                this.playerCards.push(this.createBoxCard(hl1, 0, this.phit, this.hit_bt, this.deck0, scene, material, container));
                this.hit_bt++;
                this.phit++;

            }



            if (this.calculatePlayerPoints(player) > 21) {
                this.textPointsPlayer.text = "Points: " + player.tempPoints();
                this.cant_stay = true;
                this.gameStatus = false;
            }
        }
    }

    public calculateNpcPoints(npc: Npc) {
        let npcAses: number = 0;
        npc.setTmpPoints(0);
        this.textPointsNpc.isVisible = true;

        for (var i = 0; i < this.npcCards.length; i++) {
            if (this.npcCards[i].getValue() == "A") {
                npcAses++;
            }
        }
        for (var i = 0; i < this.npcCards.length; i++) {

            if (this.npcCards[i].getValue() === "A") {
                if (npcAses == 1) {
                    npc.setTmpPoints(npc.tempPoints() + 11);
                } else {
                    npc.setTmpPoints(npc.tempPoints() + 1);
                }

            } else if (this.npcCards[i].getValue() === "10" ||
                this.npcCards[i].getValue() === "J" ||
                this.npcCards[i].getValue() === "Q" ||
                this.npcCards[i].getValue() === "K") {
                npc.setTmpPoints(npc.tempPoints() + 10);
            } else {
                npc.setTmpPoints(npc.tempPoints() + parseInt(this.npcCards[i].getValue()));
            }

        }
        if (npc.tempPoints() > 21 && npcAses == 1) {
            npc.setTmpPoints(npc.tempPoints() - 10);
        }

    }

    public RunNpc(hl1: HighlightLayer, npc: Npc, scene: Scene, material: StandardMaterial, container: AssetContainer) {

        
        this.cant_hit = true;

        while (npc.tempPoints() < 21) {
            var diff = ((21 - npc.tempPoints()) * 100) / 21;
            npc.setChanceToStayBj(Math.floor(Math.random() * ((diff * 1.5) - diff) + diff));
           
            if (Math.floor(Math.random() * ((npc.getChanceToStayBj() * 1.2) - npc.getChanceToStayBj()) + npc.getChanceToStayBj()) > 20) {
                this.npcCards.push(this.createBoxCard(hl1, 1, this.phit, this.hit_bt, this.deck0, scene, material, container));
                this.hit_bt++;

                this.calculateNpcPoints(npc);
            }
            else {
                break;
            }
        }

        this.gameStatus = false;

    }

    public calculateWinner(player: Player, npc: Npc) {
        if (npc.tempPoints() <= 21 && npc.tempPoints() >= player.tempPoints()) {
            this.textStatus.text = "YOU LOSE!";
        } else {
            if (player.tempPoints() <= 21) {

                this.textStatus.text = "YOU WIN!!!"
            } else {
                this.textStatus.text = "YOU LOSE!"
            }
        }

        this.textPointsNpc.text = "Computer Points: " + npc.tempPoints();
    }

    public RunRenderLoop(engine: Engine, player: Player, npc: Npc) {
        if (!this.gameStatus) {
            for (var i = 0; i < this.npcCards.length; i++) {
                if (this.npcCards[i].getBox().rotation.y > 0) {
                    this.npcCards[i].getBox().isVisible = true;
                    this.npcCards[i].getBox().rotation.y -= 0.32;
                }
            }
            this.calculateNpcPoints(npc);
            this.calculateWinner(player, npc);
        } else {

            this.textPointsPlayer.text = "Points: : " + this.calculatePlayerPoints(player);
        }
    }
}