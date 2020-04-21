import Player from "./player";

export default class Npc extends Player {
    chanceToStayBj: number;

    getChanceToStayBj() {
        return this.chanceToStayBj;
    }
    setChanceToStayBj(number: number) {
        this.chanceToStayBj = number;
    }
}