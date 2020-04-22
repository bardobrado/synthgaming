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
import Player from "./player";

export default class MenuBackground {

    menuBackground: Rectangle;
    BoxMenu: Rectangle;
    ButtonMenu: Button;


    button_sign: Button;
    button_logout: Button;
    button_account: Button;
    button_lobby: Button;
    button_news: Button;

    advancedTexture: AdvancedDynamicTexture;
    constructor() {
    }

    public CreatelMenu(scene: Scene) {



        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("NewsMenuBackground", false, scene);

        this.menuBackground = new Rectangle();
        // this.menuBackground.top = "30px";
        this.menuBackground.width = window.innerWidth;
        this.menuBackground.height = "80px";
        this.menuBackground.cornerRadius = 0;
        this.menuBackground.color = "Black";
        this.menuBackground.thickness = 0;
        this.menuBackground.background = "Black";
        this.menuBackground.alpha = .7;
        this.menuBackground.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.advancedTexture.addControl(this.menuBackground);


        this.ButtonMenu = Button.CreateImageButton("ButtomMenu", "", "./../res/ButtonMenu.png");
        this.ButtonMenu.width = "80px";
        this.ButtonMenu.height = "80px";
        this.ButtonMenu.image.width = "80px";
        this.ButtonMenu.image.alpha = 1;
        this.ButtonMenu.fontStyle = "bold";
        this.ButtonMenu.cornerRadius = 0;
        this.ButtonMenu.background = "transparent";
        this.ButtonMenu.color = 'transparent';
        this.ButtonMenu.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.ButtonMenu.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
        this.ButtonMenu.zIndex = +2;


        this.advancedTexture.addControl(this.ButtonMenu);

        // this.BoxMenu = new Rectangle();
        // // this.BoxMenu.top = "30px";
        // this.BoxMenu.width = "200px";
        // this.BoxMenu.height = "400px";
        // this.BoxMenu.cornerRadius = 0;
        // this.BoxMenu.color = "transparent";
        // this.BoxMenu.thickness = 0;
        // this.BoxMenu.background = "Black";
        // this.BoxMenu.alpha = .7;
        // this.BoxMenu.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        // this.BoxMenu.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        // // this.BoxMenu.top = "-40px"
        // this.BoxMenu.zIndex = 0;

        // this.advancedTexture.addControl(this.BoxMenu);


        return scene;
    }

    public CreateSubMenu(scene: Scene, player: Player) {
        if (player.logged()) {
            this.button_logout = Button.CreateSimpleButton("loggout", "Logout");
            this.button_logout.width = "140px"
            this.button_logout.height = "80px";
            this.button_logout.color = "Black";
            this.button_logout.fontFamily = "Monospace";
            this.button_logout.fontSizeInPixels = 30;
            this.button_logout.fontStyle = "bold";
            // this.button_logout.paddingTop = "-15px";
            this.button_logout.cornerRadius = 3;
            this.button_logout.background = "gray";
            this.button_logout.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
            this.button_logout.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
            this.button_logout.top = "-320px";
            // this.button_logout.left = "-200px";
            this.button_logout.zIndex = 1;

            this.advancedTexture.addControl(this.button_logout);



        } else {
            this.button_sign = Button.CreateSimpleButton("sign", "Sign in");
            this.button_sign.width = "140px"
            this.button_sign.height = "80px";
            this.button_sign.color = "Black";
            this.button_sign.fontFamily = "Monospace";
            this.button_sign.fontSizeInPixels = 30;
            this.button_sign.fontStyle = "bold";
            // this.button_sign.paddingTop = "-15px";
            this.button_sign.cornerRadius = 3;
            this.button_sign.background = "gray";
            this.button_sign.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
            this.button_sign.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
            this.button_sign.top = "-320px";
            this.button_sign.zIndex = 1;
            // this.button_sign.left = "-200px";

            this.advancedTexture.addControl(this.button_sign);
        }

        this.button_account = Button.CreateSimpleButton("account", "Account");
        this.button_account.width = "140px"
        this.button_account.height = "80px";
        this.button_account.color = "Black";
        this.button_account.fontFamily = "Monospace";
        this.button_account.fontSizeInPixels = 30;
        this.button_account.fontStyle = "bold";
        // this.button_account.paddingTop = "-15px";
        this.button_account.cornerRadius = 3;
        this.button_account.background = "gray";
        this.button_account.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.button_account.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.button_account.top = "-240px";
        // this.button_account.left = "-200px";
        this.button_account.zIndex = 1;

        this.advancedTexture.addControl(this.button_account);

        this.button_lobby = Button.CreateSimpleButton("Lobby", "Lobby");
        this.button_lobby.width = "140px"
        this.button_lobby.height = "80px";
        this.button_lobby.color = "Black";
        this.button_lobby.fontFamily = "Monospace";
        this.button_lobby.fontSizeInPixels = 30;
        this.button_lobby.fontStyle = "bold";
        // this.button_lobby.paddingTop = "-15px";
        this.button_lobby.cornerRadius = 3;
        this.button_lobby.background = "gray";
        this.button_lobby.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.button_lobby.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.button_lobby.top = "-160px";
        // this.button_lobby.left = "-200px";
        this.button_lobby.zIndex = 1;

        this.advancedTexture.addControl(this.button_lobby);

        this.button_news = Button.CreateSimpleButton("news", "News");
        this.button_news.width = "140px"
        this.button_news.height = "80px";
        this.button_news.color = "Black";
        this.button_news.fontFamily = "Monospace";
        this.button_news.fontSizeInPixels = 30;
        this.button_news.fontStyle = "bold";
        // this.button_news.paddingTop = "-15px";
        this.button_news.cornerRadius = 3;
        this.button_news.background = "gray";
        this.button_news.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.button_news.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.button_news.top = "-80px";
        // this.button_news.left = "-200px";
        this.button_news.zIndex = 1;

        this.advancedTexture.addControl(this.button_news);

    }
    public RemoveSubMenu(player : Player) {
        if (this.button_lobby) {
            if (player.logged()) {
                this.advancedTexture.removeControl(this.button_logout);
            } else {
                this.advancedTexture.removeControl(this.button_sign);
            }
            
            
            this.advancedTexture.removeControl(this.button_account);
            this.advancedTexture.removeControl(this.button_lobby);
            this.advancedTexture.removeControl(this.button_news);
        }


    }
    public RunRenderLoop() {

    }
}