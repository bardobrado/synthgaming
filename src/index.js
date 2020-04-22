'use strict';
import { Engine } from "../node_modules/@babylonjs/core/Engines/engine";
import Game from "./gameCore";
import News from "./news";
import Menu from "./menu";
import BlackJack from "./blackjack";
import Player from "./player";
import Npc from "./npc";
export const MyGame = (player) => {
    let BJButton;
    let ExitButton;
    let RestartButtonBj;
    let HitBtBj;
    let StayBtBj;
    let subMenu = false;
    let subSubMenu = false;
    let game;
    let actualGame;
    let actualGameScene;
    let secondaryMenuScene;
    // Get the canvas element from the DOM.
    const canvas = document.getElementById("renderCanvas");
    // Associate a Babylon Engine to it.
    const engine = new Engine(canvas);
    // let scene = new Scene(engine);
    game = new Game();
    game.createBackgroundScene(engine);
    let primaryMenuScene = game.createPrimaryMenu(game.createNewScene(engine));
    let news = new News();
    news.CreateCarrouselMenu(primaryMenuScene);
    let menu = new Menu();
    let menuScene = menu.CreatelMenu(primaryMenuScene);
    // Render every frame
    engine.runRenderLoop(() => {
        game.buttonBJ.onPointerClickObservable.addOnce(() => {
            BJButton = true;
        });
        if (BJButton) {
            actualGame = new BlackJack();
            actualGameScene = game.createNewScene(engine);
            secondaryMenuScene = actualGame.createPrimaryMenu(game.createNewScene(engine));
            menuScene = menu.CreatelMenu(secondaryMenuScene);
            actualGame.addDisplayRecords(actualGameScene, npc, player);
            actualGame.createNewGameBJ(game.hl1, player, actualGameScene, game.materialCard, game.container);
            primaryMenuScene = null;
            BJButton = false;
        }
        if (actualGame) {
            actualGame.button_exit.onPointerClickObservable.addOnce(() => {
                ExitButton = true;
            });
            actualGame.button_restart.onPointerClickObservable.addOnce(() => {
                RestartButtonBj = true;
            });
            actualGame.button_hit.onPointerClickObservable.addOnce(() => {
                HitBtBj = true;
            });
            actualGame.button_stay.onPointerClickObservable.addOnce(() => {
                StayBtBj = true;
            });
            actualGame.RunRenderLoop(actualGameScene, game.hl1, player, npc);
        }
        if (HitBtBj) {
            actualGame.calculateNewHit(game.hl1, player, actualGameScene, game.materialCard, game.container);
            HitBtBj = false;
        }
        if (StayBtBj) {
            if (!actualGame.cant_stay) {
                actualGame.cant_hit = true;
                actualGame.RunNpc(game.hl1, npc, actualGameScene, game.materialCard, game.container);
                StayBtBj = false;
            }
        }
        if (RestartButtonBj) {
            game.removeAll();
            actualGame.createNewGameBJ(game.hl1, player, actualGameScene, game.materialCard, game.container);
            RestartButtonBj = false;
        }
        if (ExitButton) {
            game.removeAll();
            primaryMenuScene = game.createPrimaryMenu(game.createNewScene(engine));
            news.CreateCarrouselMenu(primaryMenuScene);
            menuScene = menu.CreatelMenu(primaryMenuScene);
            actualGameScene = null;
            secondaryMenuScene = null;
            actualGame = null;
            ExitButton = false;
        }
        game.scene.render();
        if (primaryMenuScene) {
            primaryMenuScene.render();
        }
        if (secondaryMenuScene) {
            secondaryMenuScene.render();
        }
        if (actualGameScene) {
            actualGameScene.render();
        }
        if (menuScene) {
            menu.ButtonMenu.onPointerClickObservable.addOnce(() => {
                subSubMenu = true;
            });
            if (subSubMenu) {
                if (subMenu == false) {
                    subMenu = true;
                    menu.CreateSubMenu(menuScene, player);
                }
                else {
                    subMenu = false;
                    menu.RemoveSubMenu(player);
                }
                subSubMenu = false;
            }
        }
    });
};
let player = new Player("aaa", "aaa", false);
let npc = new Npc("aaa", "aaa", true);
MyGame(player);
