import Player from "./player";
export default class Npc extends Player {
    getChanceToStayBj() {
        return this.chanceToStayBj;
    }
    setChanceToStayBj(number) {
        this.chanceToStayBj = number;
    }
}
