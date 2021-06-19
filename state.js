class State {
    constructor(display, actors) {
        this.display = display;
        this.actors = actors;
    }

    update(time) {

        /**
         * Provide an update ID to let actors
         * update other actors only once.
         **/
        const updateId = Math.floor(Math.random() * 1000000);
        const actors = this.actors.map(actor => {
            return actor.update(this, time, updateId);
        });
        return new State(this.display, actors);
    }
}