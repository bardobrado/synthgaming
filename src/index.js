'use strict';
import { Engine } from "../node_modules/@babylonjs/core/Engines/engine";
import { Scene } from "../node_modules/@babylonjs/core/scene";
import Game from "./gameCore.js";
import BlackJack from "./blackjack";
import Player from "./player";
export const coisa = (player) => {
    let ExitButton;
    let BJButton;
    let RestartButtonBj;
    let game;
    let actualGame;
    let actualGameScene;
    let secondaryMenuScene;
    // Get the canvas element from the DOM.
    const canvas = document.getElementById("renderCanvas");
    // Associate a Babylon Engine to it.
    const engine = new Engine(canvas);
    let scene = new Scene(engine);
    game = new Game();
    game.createBackgroundScene(engine);
    let primaryMenuScene = game.createPrimaryMenu(game.createNewScene(engine));
    // Render every frame
    engine.runRenderLoop(() => {
        game.buttonBJ.onPointerClickObservable.addOnce(() => {
            BJButton = true;
        });
        if (BJButton) {
            actualGame = new BlackJack();
            actualGameScene = game.createNewScene(engine);
            secondaryMenuScene = actualGame.createPrimaryMenu(game.createNewScene(engine));
            actualGame.createNewGameBJ(player, actualGameScene, game.materialCard, game.container);
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
            actualGame.RunRenderLoop(engine);
        }
        if (RestartButtonBj) {
            game.removeAll();
            console.log("oi");
            actualGame.createNewGameBJ(player, actualGameScene, game.materialCard, game.container);
            RestartButtonBj = false;
        }
        if (ExitButton) {
            primaryMenuScene = game.createPrimaryMenu(game.createNewScene(engine));
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
    });
};
let player = new Player("aaa", "aaa");
coisa(player);
