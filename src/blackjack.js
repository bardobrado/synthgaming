'use strict';
import { Vector3, Color3, Vector4 } from "../node_modules/@babylonjs/core/Maths/math";
import { HighlightLayer } from "../node_modules/@babylonjs/core/index";
import { AdvancedDynamicTexture } from "../node_modules/@babylonjs/gui/2D/advancedDynamicTexture";
import { Rectangle } from "../node_modules/@babylonjs/gui/2D/controls/index";
import { Control } from "../node_modules/@babylonjs/gui/2D/controls/index";
import { Button } from "../node_modules/@babylonjs/gui/2D/controls/button";
import { TextBlock } from "../node_modules/@babylonjs/gui/2D/controls/textBlock";
import { BoxBuilder } from "../node_modules/@babylonjs/core/Meshes/Builders/boxBuilder";
import Deck from "./deck";
export default class Blackjack {
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
        this.alpha = 0;
    }
    createPrimaryMenu(scene) {
        var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("GameBJMenu", true, scene);
        this.menuLayer = new Rectangle();
        // this.menuLayer.top = "30px";
        this.menuLayer.width = "600px";
        this.menuLayer.height = "200px";
        this.menuLayer.cornerRadius = 3;
        this.menuLayer.color = "Black";
        this.menuLayer.thickness = 2;
        this.menuLayer.background = "White";
        this.menuLayer.alpha = .9;
        this.menuLayer.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.menuLayer.top = "350px";
        advancedTexture.addControl(this.menuLayer);
        this.button_exit = Button.CreateSimpleButton("button_exit", "Exit");
        this.button_exit.width = "125px";
        this.button_exit.height = "50px";
        this.button_exit.color = "Black";
        this.button_exit.fontFamily = "Monospace";
        this.button_exit.fontSizeInPixels = 30;
        this.button_exit.fontStyle = "bold";
        this.button_exit.paddingTop = "-15px";
        this.button_exit.cornerRadius = 3;
        this.button_exit.background = "gray";
        this.button_exit.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.button_exit.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.button_exit.top = "400px";
        this.button_exit.left = "210px";
        advancedTexture.addControl(this.button_exit);
        this.button_restart = Button.CreateSimpleButton("but", "New");
        this.button_restart.width = "125px";
        this.button_restart.height = "50px";
        this.button_restart.color = "Black";
        this.button_restart.fontFamily = "Monospace";
        this.button_restart.fontSizeInPixels = 30;
        this.button_restart.fontStyle = "bold";
        this.button_restart.paddingTop = "-15px";
        this.button_restart.cornerRadius = 3;
        this.button_restart.background = "gray";
        this.button_restart.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.button_restart.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.button_restart.top = "400px";
        this.button_restart.left = "70px";
        advancedTexture.addControl(this.button_restart);
        this.button_stay = Button.CreateSimpleButton("but", "Stay");
        this.button_stay.width = "125px";
        this.button_stay.height = "50px";
        this.button_stay.color = "Black";
        this.button_stay.fontFamily = "Monospace";
        this.button_stay.fontSizeInPixels = 30;
        this.button_stay.fontStyle = "bold";
        this.button_stay.paddingTop = "-15px";
        this.button_stay.cornerRadius = 3;
        this.button_stay.background = "gray";
        this.button_stay.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.button_stay.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.button_stay.top = "400px";
        this.button_stay.left = "-70x";
        advancedTexture.addControl(this.button_stay);
        this.button_hit = Button.CreateSimpleButton("but", "Hit");
        this.button_hit.width = "125px";
        this.button_hit.height = "50px";
        this.button_hit.color = "Black";
        this.button_hit.fontFamily = "Monospace";
        this.button_hit.fontSizeInPixels = 30;
        this.button_hit.fontStyle = "bold";
        this.button_hit.paddingTop = "-15px";
        this.button_hit.cornerRadius = 3;
        this.button_hit.background = "gray";
        this.button_hit.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.button_hit.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.button_hit.top = "400px";
        this.button_hit.left = "-210px";
        advancedTexture.addControl(this.button_hit);
        return scene;
    }
    addDisplayRecords(scene, npc, player) {
        let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UIMenu", true, scene);
        this.backLayer = new Rectangle();
        this.backLayer.width = "420px";
        this.backLayer.height = "120px";
        this.backLayer.cornerRadius = 3;
        this.backLayer.color = "Black";
        this.backLayer.thickness = 2;
        this.backLayer.background = "White";
        this.backLayer.alpha = .7;
        this.backLayer.isVisible = false;
        advancedTexture.addControl(this.backLayer);
        this.textStatus = new TextBlock();
        this.textStatus.text = "";
        this.textStatus.color = "gray";
        this.textStatus.fontFamily = "Monospace";
        this.textStatus.fontSize = 30;
        this.textStatus.left = -0;
        this.textStatus.top = 20;
        this.textStatus.outlineWidth = 2;
        this.textStatus.outlineColor = "black";
        advancedTexture.addControl(this.textStatus);
        this.textPointsPlayer = new TextBlock();
        this.textPointsPlayer.text = "Points: " + player.tempPoints();
        this.textPointsPlayer.color = "gray";
        this.textPointsPlayer.fontFamily = "Monospace";
        this.textPointsPlayer.fontSize = 30;
        this.textPointsPlayer.left = 0;
        this.textPointsPlayer.top = "300px";
        this.textPointsPlayer.outlineWidth = 2;
        this.textPointsPlayer.outlineColor = "black";
        advancedTexture.addControl(this.textPointsPlayer);
        this.textPointsNpc = new TextBlock();
        this.textPointsNpc.text = "Computer Points: " + npc.tempPoints();
        this.textPointsNpc.color = "gray";
        this.textPointsNpc.fontFamily = "Monospace";
        this.textPointsNpc.fontSize = 30;
        this.textPointsNpc.left = 0;
        this.textPointsNpc.top = -30;
        this.textPointsNpc.outlineWidth = 2;
        this.textPointsNpc.outlineColor = "black";
        this.textPointsNpc.isVisible = false;
        advancedTexture.addControl(this.textPointsNpc);
    }
    createNewGameBJ(hl1, player, scene, material, container) {
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
        this.backLayer.isVisible = false;
        this.textStatus.text = "";
        this.textPointsNpc.text = "";
        this.gameStatus = true;
        this.hit_bt = 0;
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
    createBoxCard(hl1, code, phit, hit_bt, deck, scene, material, container) {
        let options = {
            width: 3,
            height: 4.3,
            depth: 0.1,
            faceUV: deck[hit_bt].getFaceUV()
        };
        let box = BoxBuilder.CreateBox("0", options, scene);
        box.material = material;
        hl1 = new HighlightLayer("hl1", scene);
        if (deck[hit_bt].getSequence() <= 25) {
            hl1.addMesh(box, Color3.White());
        }
        else {
            hl1.addMesh(box, Color3.White());
        }
        container.effectLayers.push(hl1);
        container.meshes.push(box);
        deck[hit_bt].setBox(box);
        deck[hit_bt].getBox().isVisible = true;
        if (code == 0) {
            if (hit_bt < 4) {
                deck[hit_bt].getBox().position = new Vector3(((hit_bt) * 4) - 10, -3, 25);
            }
            else {
                deck[hit_bt].getBox().position = new Vector3(((hit_bt - 2) * 4) - 10, -3, 25);
            }
        }
        else {
            deck[hit_bt].getBox().rotation.y = Math.PI;
            deck[hit_bt].getBox().position = new Vector3((((hit_bt - phit) * 4) - 10), 3, 25);
        }
        return deck[hit_bt];
    }
    calculatePlayerPoints(player) {
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
                }
                else {
                    player.setTmpPoints(player.tempPoints() + 1);
                }
            }
            else if (this.playerCards[i].getValue() === "10" ||
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
    calculateNewHit(hl1, player, scene, material, container) {
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
    calculateNpcPoints(npc) {
        let npcAses = 0;
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
                }
                else {
                    npc.setTmpPoints(npc.tempPoints() + 1);
                }
            }
            else if (this.npcCards[i].getValue() === "10" ||
                this.npcCards[i].getValue() === "J" ||
                this.npcCards[i].getValue() === "Q" ||
                this.npcCards[i].getValue() === "K") {
                npc.setTmpPoints(npc.tempPoints() + 10);
            }
            else {
                npc.setTmpPoints(npc.tempPoints() + parseInt(this.npcCards[i].getValue()));
            }
        }
        if (npc.tempPoints() > 21 && npcAses == 1) {
            npc.setTmpPoints(npc.tempPoints() - 10);
        }
    }
    RunNpc(hl1, npc, scene, material, container) {
        this.cant_hit = true;
        while (npc.tempPoints() < 21) {
            var diff = ((21 - npc.tempPoints()) * 100) / 21;
            npc.setChanceToStayBj(Math.floor(Math.random() * ((diff * 1.2) - diff) + diff));
            if (npc.chanceToStayBj > 20) {
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
    calculateWinner(player, npc) {
        if (npc.tempPoints() <= 21 && npc.tempPoints() >= player.tempPoints()) {
            if (this.npcCards[0].getBox().rotation.y <= 0) {
                this.backLayer.isVisible = true;
                this.textStatus.text = "YOU LOSE!";
            }
        }
        else {
            if (player.tempPoints() <= 21) {
                if (this.npcCards[0].getBox().rotation.y <= 0) {
                    this.backLayer.isVisible = true;
                    this.textStatus.text = "YOU WIN!!!";
                }
            }
            else {
                if (this.npcCards[0].getBox().rotation.y <= 0) {
                    this.backLayer.isVisible = true;
                    this.textStatus.text = "YOU LOSE!";
                }
            }
        }
        this.textPointsNpc.text = "Computer Points: " + npc.tempPoints();
    }
    RunRenderLoop(scene, hl1, player, npc) {
        // HighlightLayer.GlowingMeshStencilReference = 2;
        this.alpha += 0.01;
        if (!this.gameStatus) {
            for (var i = 0; i < this.npcCards.length; i++) {
                if (this.npcCards[i].getBox().rotation.y > 0) {
                    this.npcCards[i].getBox().isVisible = true;
                    this.npcCards[i].getBox().rotation.y -= 0.32;
                }
            }
            this.calculateNpcPoints(npc);
            this.calculateWinner(player, npc);
        }
        else {
            this.textPointsPlayer.text = "Points: : " + this.calculatePlayerPoints(player);
        }
    }
}
